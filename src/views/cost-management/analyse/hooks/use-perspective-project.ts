import { ref, reactive, computed } from 'vue';
import dayjs from 'dayjs';
import useCallCommon from '@/hooks/use-call-common';
import {
  find,
  get,
  omit,
  map,
  each,
  sortBy,
  reduce,
  cloneDeep,
  keys,
  assignIn
} from 'lodash';
import { getTimeRange, projectCostOverview } from '../config';
import { CostAnalyRow, ChartData } from '../config/interface';
import {
  queryItemPerspective,
  queryPerspectiveData,
  queryProjectPerspectiveSummary,
  queryPerspectiveFieldValues
} from '../api';
// import testData, { statckLineData } from '../config/testData';

export default function usePerspectiveCost(props) {
  const { route } = useCallCommon();
  const { query } = route;
  const projectCostFilters = ref<any>({});
  const projectList = ref<{ label: string; value: string }[]>([]);
  const projectCostChart = ref<ChartData>({
    xAxis: [],
    line: [],
    bar: [],
    dataConfig: []
  });

  const projectloading = ref(false);
  const loading = ref(false);
  const apploading = ref(false);
  const overviewloading = ref(false);

  const projectName = ref('');
  const queryParams = reactive({
    startTime: '',
    endTime: '',
    project: ''
  });

  const overData = ref({});
  const pageId = computed(() => {
    return query.id || props.viewId;
  });
  const summaryData = computed(() => {
    const list = map(projectCostOverview, (item) => {
      item.value = get(overData.value, item.key) || 0;
      return item;
    });
    return list;
  });
  const getProjectList = async () => {
    try {
      projectloading.value = true;
      const params = {
        ...omit(queryParams, ['project']),
        fieldName: 'label:project',
        startTime: dayjs(queryParams.startTime).format('YYYY-MM-DDTHH:mm:ssZ'),
        endTime: dayjs(queryParams.endTime).format('YYYY-MM-DDT23:59:59Z')
      };
      const { data } = await queryPerspectiveFieldValues(params);
      projectList.value = data?.items || [];
      queryParams.project = get(data, 'items.0.value') || '';
      projectName.value = get(data, 'items.0.label') || 'Project';
      // set filter value
      const projectData = get(data, 'items.0') || {};
      projectName.value = projectData?.label || 'Project';
      each(get(projectCostFilters.value, 'filters') || [], (fItem) => {
        each(fItem, (sItem) => {
          sItem.values = [queryParams.project];
        });
      });
      projectloading.value = false;
    } catch (error) {
      projectloading.value = false;
      projectList.value = [];
      console.log(error);
    }
  };
  const getSummaryData = async () => {
    try {
      overviewloading.value = true;
      const params = {
        project: queryParams.project,
        startTime: dayjs(queryParams.startTime).format('YYYY-MM-DDTHH:mm:ssZ'),
        endTime: dayjs(queryParams.endTime).format('YYYY-MM-DDT23:59:59Z')
      };
      const { data } = await queryProjectPerspectiveSummary(params);
      overData.value = data || {};
      overviewloading.value = false;
    } catch (error) {
      overviewloading.value = false;
      overData.value = {};
      console.log(error);
    }
  };
  const getProjectCostChart = async () => {
    try {
      apploading.value = true;
      const params = {
        ...omit(projectCostFilters.value, 'paging'),
        ...queryParams,
        startTime: dayjs(queryParams.startTime).format('YYYY-MM-DDTHH:mm:ssZ'),
        endTime: dayjs(queryParams.endTime).format('YYYY-MM-DDT23:59:59Z')
      };
      const { data } = await queryPerspectiveData(params);
      let list = data?.items || [];
      // let list = statckLineData;
      projectCostChart.value = { xAxis: [], line: [], bar: [], dataConfig: [] };
      list = sortBy(list, (d) => d.startTime);
      const dataObj = reduce(
        list,
        (obj, o) => {
          const item: any = {};
          each(keys(o), (key) => {
            if (key !== 'itemName') {
              item[key] = [o[key]];
            } else {
              item[key] = o[key];
            }
          });
          if (obj[item.itemName]) {
            each(keys(item), (k) => {
              if (k !== 'itemName') {
                obj[item.itemName][k] = [...obj[item.itemName][k], ...item[k]];
              }
            });
          } else {
            obj[item.itemName] = cloneDeep(item);
          }
          return obj;
        },
        {}
      );

      each(keys(dataObj), (pKey) => {
        projectCostChart.value.line.push({
          name: pKey,
          value: dataObj[pKey]['totalCost']
        });
        projectCostChart.value.dataConfig.push({
          name: pKey,
          label: pKey
        });
        projectCostChart.value.xAxis = dataObj[pKey]['startTime'];
      });
      projectCostChart.value.xAxis = map(
        projectCostChart.value.xAxis,
        (kItem) => {
          return dayjs(kItem).format('YYYY.MM.DD');
        }
      );
      apploading.value = false;
    } catch (error) {
      apploading.value = false;
      projectCostChart.value = { xAxis: [], line: [], bar: [], dataConfig: [] };
      console.log(error);
    }
  };

  const getPerspectiveItemInfo = async () => {
    try {
      loading.value = true;
      const id = route.query.id || props.viewId;
      const { data } = await queryItemPerspective({ id });
      const allocationQueries = get(data, 'allocationQueries') || [];
      const startTime = get(data, 'startTime');
      const timeRange = getTimeRange(startTime) || [];
      queryParams.startTime = get(timeRange, '0');
      queryParams.endTime = get(timeRange, '1');
      const projectFilter = find(
        allocationQueries,
        (item) => item.groupBy === 'label:app'
      );

      projectCostFilters.value = {
        ...projectFilter,
        ...queryParams
      };
      loading.value = false;
    } catch (error) {
      loading.value = false;
      console.log(error);
    }
  };
  return {
    getPerspectiveItemInfo,
    getProjectCostChart,
    getSummaryData,
    getProjectList,
    projectList,
    projectCostFilters,
    projectCostChart,
    summaryData,
    projectName,
    queryParams,
    projectloading,
    apploading,
    id: pageId,
    loading,
    overviewloading
  };
}