import _, { set } from 'lodash';
import { ref, reactive, ComponentPublicInstance, inject } from 'vue';
import { PageAction } from '@/views/config';
import { createAxiosToken } from '@/api/axios-chunk-request';
import useCallCommon from '@/hooks/use-call-common';
import { TemplateVersionData } from '@/views/operation-hub/templates/config/interface';
import { queryItemTemplatesVersions } from '@/views/operation-hub/templates/api';
import { initFormState } from '@/components/dynamic-form/utils/init-form-state';
import usePageAction from '@/hooks/use-page-action';
import { queryItemResourceDefinition } from '@/views/operation-hub/resource-definitions/api';
import { useServiceStore } from '@/store';
import semverEq from 'semver/functions/eq';
import semverGt from 'semver/functions/gt';

import { ServiceFormData } from '../config/interface';
import { queryItemService } from '../api';
import useCompleteData from './use-complete-data';
import { ServiceDataType, ProvideSetServiceInfoKey } from '../config';

export default function useServiceData(props?) {
  type refItem = Element | ComponentPublicInstance | null;
  interface TemplateVersion extends TemplateVersionData {
    label: string;
    value: string;
  }

  const setServiceInfo = inject(ProvideSetServiceInfoKey, {
    enable: false,
    info: {}
  });
  /**
   * Service configuration can refer to output of other services,
   * so it is necessary to obtain the schema of existing services
   */
  const {
    completeData,
    initCompleteData,
    getTemplateVersions,
    initTemplateList,
    serviceDataList,
    templateList,
    completeDataLoading,
    allTemplateVersions
  } = useCompleteData(props);
  const serviceStore = useServiceStore();
  const { pageAction, handleEdit } = usePageAction();
  const { route } = useCallCommon();
  const refMap = ref<Record<string, any>>({});
  const templateInfo = ref<any[]>([]);
  const schemaVariables = ref<any>({});
  const serviceInfo = ref<any>({}); // Store information about the active service, also be used when cloning
  const templateVersionList = ref<TemplateVersion[]>([]);
  const asyncLoading = ref(false);
  const dataType = props?.resourceType || (route.params.dataType as string);
  let templateVersionSchemaToken: any = null;

  const id = route.query.id as string;
  const uiFormData = ref<any>({});
  const formData = ref<ServiceFormData>({
    projectID: route.params.projectId as string,
    project: {
      id: route.params.projectId as string
    },
    environment: {
      id: route.params.environmentId as string
    },
    draft: false,
    description: '',
    labels: {},
    type: '',
    name: '',
    template: {
      // template version info
      name: '',
      version: '',
      id: '',
      project: { id: route.params.projectId as string },
      // template info
      template: { id: '' }
    },
    attributes: {}
  });

  const title = () => {
    if (!id) {
      return dataType === ServiceDataType.service
        ? 'applications.applications.create'
        : 'applications.applications.create.resource';
    }
    if (id && pageAction.value === PageAction.EDIT) {
      return dataType === ServiceDataType.service
        ? 'applications.applications.edit'
        : 'applications.applications.edit.resource';
    }
    return dataType === ServiceDataType.service
      ? 'applications.applications.detail'
      : 'applications.applications.detail.resource';
  };

  const setDefaultTemplate = (template) => {
    return template.name === 'webservice';
  };

  const getItemResourceDefinition = async () => {
    try {
      const { data } = await queryItemResourceDefinition({
        id: formData.value.type
      });
      return data;
    } catch (error) {
      // ignore
      return {};
    }
  };
  const getServiceItemInfo = async () => {
    // create
    if (!route.query.id) return;
    try {
      const params = {
        id: route.query.id
      };
      const { data } = await queryItemService(params);
      serviceInfo.value = data;
    } catch (error) {
      serviceInfo.value = {};
    }
  };
  const setRefMap = (el: refItem, name) => {
    if (el) {
      refMap.value[`${name}`] = el;
    }
  };

  //  change module ...
  const setFormTemplateVersion = () => {
    const moduleTemplate = _.find(
      templateVersionList.value,
      (item) =>
        item.template.template?.id === formData.value.template.template.id
    );
    formData.value.template.version =
      _.get(moduleTemplate, 'template.version') || '';
    formData.value.template.id = _.get(moduleTemplate, 'template.id') || '';
    return moduleTemplate;
  };

  // change version ...
  const getTemplateSchemaByVersion = async () => {
    if (!formData.value.template?.version) return {};
    templateVersionSchemaToken?.cancel();
    templateVersionSchemaToken = createAxiosToken();
    try {
      const params = {
        templateID: formData.value.template.template.id,
        isProjectTemplate: !!formData.value.template.project?.id,
        query: formData.value.template.version
      };
      const { data } = await queryItemTemplatesVersions(
        params,
        templateVersionSchemaToken.token
      );
      return data?.items?.[0];
    } catch (error) {
      // ignore
      return {};
    }
  };

  const setTemplateVersionList = async () => {
    try {
      if (dataType === ServiceDataType.resource) {
        return;
      }
      const list = _.filter(
        allTemplateVersions.value,
        (item) =>
          item.template.template.id === formData.value.template.template.id
      );
      let versions = _.map(list, (item) => {
        return {
          ..._.cloneDeep(item),
          label: item.template.version,
          value: item.template.version
        };
      });
      versions = _.uniqBy(versions, 'value');
      templateVersionList.value = versions.sort((v1, v2) => {
        if (semverEq(v1.value, v2.value)) {
          return 0;
        }
        if (semverGt(v1.value, v2.value)) {
          return -1;
        }
        return 1;
      }) as TemplateVersion[];
    } catch (error) {
      // ignore
    }
  };

  const setTemplateInfo = (moduleData) => {
    const variables =
      _.cloneDeep(
        _.get(moduleData, 'uiSchema.openAPISchema.components.schemas.variables')
      ) || {};
    const result = initFormState(variables);
    templateInfo.value = result.fieldSchemaList;
    schemaVariables.value = variables;
  };

  const setFormAttributes = async () => {
    formData.value = _.cloneDeep(serviceInfo.value);
    uiFormData.value = _.cloneDeep(serviceInfo.value.attributes);
    // 1. get the template meta data 2.set the default value
    console.log(
      'setFormAttributes000000>>>>>>',
      _.cloneDeep(serviceInfo.value),
      formData.value
    );
    let moduleTemplate: any = {};
    if (dataType === ServiceDataType.resource) {
      moduleTemplate = await getItemResourceDefinition();
    } else {
      await getTemplateVersions(formData.value.template);
      await setTemplateVersionList();
      moduleTemplate = await getTemplateSchemaByVersion();
      console.log('formData.value==1111===', formData.value);
    }

    setTemplateInfo(moduleTemplate);
  };
  const setFormDataTemplate = () => {
    // webservice bydefault
    let defaultTemplate = _.find(templateList.value, (item) =>
      setDefaultTemplate(item)
    );
    defaultTemplate = defaultTemplate || _.get(templateList.value, '0');
    formData.value.template.name = defaultTemplate?.name;
    formData.value.template.template.id = defaultTemplate?.id;
    formData.value.template.project = defaultTemplate?.project || {};
  };
  // for service create page
  const initFormData = async () => {
    if (id || setServiceInfo.enable) {
      console.log('initFormData>>>>>>>>>', id, setServiceInfo);
      await setFormAttributes();
    } else {
      let templateSchema: any = {};
      if (dataType === ServiceDataType.resource) {
        formData.value.type = _.get(templateList.value, '0.value', '');
        templateSchema = await getItemResourceDefinition();
      } else {
        setFormDataTemplate();
        await getTemplateVersions(formData.value.template);
        await setTemplateVersionList();
        setFormTemplateVersion();
        templateSchema = await getTemplateSchemaByVersion();
      }
      setTemplateInfo(templateSchema);
    }
  };
  // for service detail
  const initInfo = async () => {
    asyncLoading.value = true;
    await initTemplateList();
    serviceInfo.value = serviceStore.getServiceInfo(id);
    await setFormAttributes();
    asyncLoading.value = false;
  };

  // for workflow create service task
  const initSerivceInfo = async () => {
    if (!setServiceInfo.enable) return;
    serviceInfo.value = setServiceInfo.info;
  };

  // for service edit page
  const init = async () => {
    asyncLoading.value = true;
    // getServiceItemInfo would be called in create page
    await Promise.all([
      getServiceItemInfo(),
      initSerivceInfo(),
      initTemplateList()
    ]);
    await initFormData();
    asyncLoading.value = false;
    console.log(
      'ProvideSetServiceInfoKey=======',
      formData.value,
      _.cloneDeep(setServiceInfo)
    );

    /* beacuse of the init versions data do not include the all template versions,
     * but only the created service versions
     */
    await initCompleteData();
    allTemplateVersions.value = [];
  };

  return {
    id,
    init,
    setFormAttributes,
    setFormTemplateVersion,
    getTemplateSchemaByVersion,
    setTemplateVersionList,
    getTemplateVersions,
    initCompleteData,
    initInfo,
    setTemplateInfo,
    schemaVariables,
    getItemResourceDefinition,
    asyncLoading,
    completeDataLoading,
    formData,
    uiFormData,
    refMap,
    pageAction,
    handleEdit,
    templateInfo,
    serviceInfo,
    templateVersionList,
    serviceDataList,
    templateList,
    completeData,
    title,
    setRefMap
  };
}
