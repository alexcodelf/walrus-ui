<template>
  <ModuleWrapper
    :status="true"
    :show-delete="showDelete"
    @delete="handleDelete"
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <div>
      <div>
        <a-form
          ref="formref"
          :model="formData"
          auto-label-width
          layout="vertical"
        >
          <a-form-item
            field="name"
            hide-label
            :label="$t('common.table.name')"
            :rules="[
              {
                required: true,
                match: validateLabelNameRegx,
                message: $t('common.validate.labelName')
              },
              {
                validator: validateNameuniq,
                message: $t('applications.applications.rule.modules.name')
              }
            ]"
          >
            <seal-input
              v-if="pageAction === PageAction.EDIT"
              v-model="formData.name"
              allow-clear
              :required="true"
              :placeholder="$t('common.table.name')"
              :style="{ width: `${InputWidth.LARGE}px` }"
              :max-length="63"
              show-word-limit
            ></seal-input>
            <SealFormItemWrap
              v-else
              :label="$t('common.table.name')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              {{ formData.name }}
            </SealFormItemWrap>
            <template #extra>
              <div
                class="tips"
                :style="{ 'max-width': `${InputWidth.LARGE}px` }"
                >{{ $t('common.validate.labelName') }}</div
              >
            </template>
          </a-form-item>
          <GroupTitle
            :bordered="false"
            :title="$t('resource.definition.detail.seletor')"
            flex-start
          >
            <template #title>
              <span>{{ $t('resource.definition.detail.seletor') }}</span>
              <primaryButtonGroup
                v-if="pageAction === PageAction.EDIT"
                :action-list="actionList"
                @select="handleAddSelector"
              >
                <a-link class="m-l-10">
                  <icon-plus class="size-14" style="stroke-width: 4" />
                  <span class="mleft-5">{{ $t('common.button.add') }}</span>
                </a-link>
              </primaryButtonGroup>
            </template>
          </GroupTitle>
          <a-form-item
            v-if="selectors.has('projectName')"
            field="selector.projectName"
            hide-label
            :label="$t('resource.definition.detail.projectName')"
            :rules="[
              {
                required: true,
                match: validateLabelNameRegx,
                message: $t('common.validate.labelName')
              },
              {
                validator: validateNameuniq,
                message: $t('applications.applications.rule.modules.name')
              }
            ]"
          >
            <div v-if="pageAction === PageAction.EDIT">
              <seal-input
                v-model="formData.selector.projectName"
                allow-clear
                :required="true"
                :label="$t('resource.definition.detail.projectName')"
                :style="{ width: `${InputWidth.LARGE}px` }"
                :max-length="63"
                show-word-limit
              ></seal-input>
              <a-button
                type="text"
                status="danger"
                @click="handleDeleteSelector('projectName')"
              >
                <template #icon>
                  <icon-delete class="size-16" />
                </template>
              </a-button>
            </div>
            <SealFormItemWrap
              v-else
              :label="$t('resource.definition.detail.projectName')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              {{ formData.selector.projectName }}
            </SealFormItemWrap>
            <template #extra>
              <div
                class="tips"
                :style="{ 'max-width': `${InputWidth.LARGE}px` }"
                >{{ $t('common.validate.labelName') }}</div
              >
            </template>
          </a-form-item>
          <a-form-item
            v-if="selectors.has('environmentName')"
            field="selector.environmentName"
            hide-label
            :label="$t('resource.definition.detail.envName')"
            :rules="[
              {
                required: true,
                match: validateLabelNameRegx,
                message: $t('common.validate.labelName')
              },
              {
                validator: validateNameuniq,
                message: $t('applications.applications.rule.modules.name')
              }
            ]"
          >
            <div v-if="pageAction === PageAction.EDIT">
              <seal-input
                v-model="formData.selector.environmentName"
                allow-clear
                :required="true"
                :label="$t('resource.definition.detail.envName')"
                :style="{ width: `${InputWidth.LARGE}px` }"
                :max-length="63"
                show-word-limit
              ></seal-input>
              <a-button
                type="text"
                status="danger"
                @click="handleDeleteSelector('environmentName')"
              >
                <template #icon>
                  <icon-delete class="size-16" />
                </template>
              </a-button>
            </div>
            <SealFormItemWrap
              v-else
              :label="$t('resource.definition.detail.envName')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              {{ formData.selector.environmentName }}
            </SealFormItemWrap>
            <template #extra>
              <div
                class="tips"
                :style="{ 'max-width': `${InputWidth.LARGE}px` }"
                >{{ $t('common.validate.labelName') }}</div
              >
            </template>
          </a-form-item>
          <a-form-item
            v-if="selectors.has('environmentType')"
            hide-label
            field="selector.environmentType"
            :label="$t('applications.environment.type')"
            :rules="[
              {
                required: true,
                message: $t('applications.applications.rules.versions')
              }
            ]"
          >
            <div v-if="pageAction === PageAction.EDIT">
              <seal-select
                v-model="formData.selector.environmentType"
                :options="[]"
                :required="true"
                :label="$t('applications.environment.type')"
                :style="{ width: `${InputWidth.LARGE}px` }"
              >
                <a-option
                  v-for="item in EnvironmentTypeList"
                  :key="item.value"
                  :value="item.value"
                  :label="$t(item.label)"
                ></a-option>
              </seal-select>
              <a-button
                type="text"
                status="danger"
                @click="handleDeleteSelector('environmentType')"
              >
                <template #icon>
                  <icon-delete class="size-16" />
                </template>
              </a-button>
            </div>
            <SealFormItemWrap
              v-else
              :label="$t('applications.environment.type')"
              :style="{ width: `${InputWidth.LARGE}px` }"
              >{{
                $t(
                  _.get(
                    EnvironmentTypeMap,
                    formData.selector.environmentType || '',
                    ''
                  )
                )
              }}</SealFormItemWrap
            >
          </a-form-item>
          <a-form-item
            v-if="selectors.has('environmentLabels')"
            field="selector.environmentLabels"
            :label="$t('resource.definition.detail.envTag')"
            hide-label
            :rules="[
              {
                validator: validateLabels,
                message: $t('resource.definition.detail.rules.labelKey')
              }
            ]"
          >
            <SealFormItemWrap
              :label="$t('resource.definition.detail.envTag')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              <keyValueLabels
                v-model:value="formData.selector.environmentLabels"
                labels-key="environmentLabels"
                :validate-trigger="validateTrigger"
                :labels="formData.selector"
                :page-action="pageAction"
              ></keyValueLabels>
            </SealFormItemWrap>
            <a-button
              v-if="pageAction === PageAction.EDIT"
              type="text"
              status="danger"
              @click="handleDeleteSelector('environmentLabels')"
            >
              <template #icon>
                <icon-delete class="size-16" />
              </template>
            </a-button>
          </a-form-item>
          <a-form-item
            v-if="selectors.has('resourceLabels')"
            field="selector.resourceLabels"
            :label="$t('resource.definition.detail.resourceTag')"
            hide-label
            :rules="[
              {
                validator: validateLabels,
                message: $t('resource.definition.detail.rules.labelKey')
              }
            ]"
          >
            <SealFormItemWrap
              :label="$t('resource.definition.detail.resourceTag')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              <keyValueLabels
                v-model:value="formData.selector.resourceLabels"
                labels-key="resourceLabels"
                :validate-trigger="validateTrigger"
                :labels="formData.selector"
                :page-action="pageAction"
              ></keyValueLabels>
            </SealFormItemWrap>
            <a-button
              v-if="pageAction === PageAction.EDIT"
              type="text"
              status="danger"
              @click="handleDeleteSelector('resourceLabels')"
            >
              <template #icon>
                <icon-delete class="size-16" />
              </template>
            </a-button>
          </a-form-item>

          <div style="display: flex; justify-content: flex-start">
            <GroupTitle
              :bordered="false"
              :title="$t('applications.applications.detail.configuration')"
            >
              <template #title>
                <div>
                  <span>{{ $t('menu.operatorHub.module') }}</span>
                </div>
              </template>
            </GroupTitle>
          </div>
          <a-form-item
            hide-label
            field="template.template.id"
            :label="$t('applications.applications.table.module')"
            :rules="[
              {
                required: true,
                message: $t('applications.applications.rules.modules')
              }
            ]"
          >
            <div v-if="pageAction === PageAction.EDIT">
              <seal-select
                v-model="formData.template.template.id"
                :placeholder="$t('applications.applications.table.module')"
                :required="true"
                :virtual-list-props="virtualListProps"
                :options="templateList"
                :style="{ width: `${InputWidth.LARGE}px` }"
                allow-search
                @change="handleTemplateChange"
              >
              </seal-select>
            </div>
            <SealFormItemWrap
              v-else
              :label="$t('applications.applications.table.module')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              {{ formData.template.name }}
            </SealFormItemWrap>
          </a-form-item>
          <a-form-item
            hide-label
            field="template.version"
            :label="$t('applications.applications.history.version')"
            :rules="[
              {
                required: true,
                message: $t('applications.applications.rules.versions')
              }
            ]"
          >
            <div v-if="pageAction === PageAction.EDIT">
              <seal-select
                v-model="formData.template.version"
                :options="[]"
                :required="true"
                :placeholder="$t('applications.applications.history.version')"
                :style="{ width: `${InputWidth.LARGE}px` }"
                :loading="asyncLoading"
                allow-search
                @popup-visible-change="handleVersionPopupVisibleChange"
                @change="handleVersionChange"
              >
                <a-option
                  v-for="item in templateVersionList"
                  :key="item.value"
                  :value="item.label"
                  >{{ item.label }}</a-option
                >
              </seal-select>
            </div>
            <SealFormItemWrap
              v-else
              :label="$t('applications.applications.history.version')"
              :style="{ width: `${InputWidth.LARGE}px` }"
            >
              {{ formData.template.version }}
            </SealFormItemWrap>
          </a-form-item>
        </a-form>
      </div>
      <ModuleWrapper :show-delete="false" class="config-wrapper">
        <template #title>
          <span>{{ $t('common.title.config') }}</span>
        </template>
        <a-spin
          class="variables"
          style="width: 100%"
          :loading="asyncLoading"
          fill
        >
          <GroupForm
            ref="groupForm"
            v-model:form-data="formData.attributes"
            :ui-form-data="uiFormData"
            class="group-form"
            style="width: 100%"
            :schema="schemaVariables"
            @change="handleAttributeChange"
          ></GroupForm>
        </a-spin>
      </ModuleWrapper>
    </div>
  </ModuleWrapper>
</template>

<script lang="ts" setup>
  import _, { get, find, toString } from 'lodash';
  import {
    ref,
    computed,
    provide,
    watch,
    PropType,
    onMounted,
    nextTick
  } from 'vue';
  import ModuleWrapper from '@/components/module-wrapper/index.vue';
  import useCallCommon from '@/hooks/use-call-common';
  import useScrollToView from '@/hooks/use-scroll-to-view';
  import GroupTitle from '@/components/group-title/index.vue';
  import {
    validateLabelNameRegx,
    PageAction,
    InputWidth,
    EnvironmentTypeMap,
    EnvironmentTypeList,
    InjectShowInputHintKey,
    InjectSchemaFormStatusKey
  } from '@/views/config';
  import GroupForm from '@/components/dynamic-form/group-form.vue';
  import keyValueLabels from '@/components/form-create/custom-components/key-value-labels.vue';
  import primaryButtonGroup from '@/components/drop-button-group/primary-button-group.vue';
  import semverEq from 'semver/functions/eq';
  import semverGt from 'semver/functions/gt';
  import { SelectorAction } from '../config';
  import { MatchingRule } from '../config/interface';
  import { queryItemTemplatesVersions } from '../../templates/api';

  type SelectorType =
    | 'environmentLabels'
    | 'resourceLabels'
    | 'environmentName'
    | 'environmentType'
    | 'projectName';

  const props = defineProps({
    originFormData: {
      type: Object as PropType<MatchingRule>,
      default() {
        return {};
      }
    },
    pageAction: {
      type: String,
      default() {
        return PageAction.EDIT;
      }
    },
    schemaFormAction: {
      type: String,
      default() {
        return PageAction.CREATE;
      }
    },
    templateList: {
      type: Array as PropType<{ value: string; label: string }[]>,
      default() {
        return [];
      }
    },
    ruleList: {
      type: Array,
      default() {
        return [];
      }
    },
    showDelete: {
      type: Boolean,
      default() {
        return false;
      }
    },
    dataId: {
      type: String,
      default() {
        return '';
      }
    }
  });
  const emits = defineEmits(['cancel', 'save', 'delete']);
  const { scrollToView } = useScrollToView();
  const formData = ref<MatchingRule>({
    attributes: {},
    name: '',
    selector: {
      environmentLabels: {},
      environmentName: '',
      environmentType: '',
      projectName: '',
      resourceLabels: {}
    },
    template: {
      id: '',
      name: '',
      version: '',
      template: {
        id: ''
      }
    }
  });
  const { route, router, t } = useCallCommon();
  const formref = ref();
  const groupForm = ref();
  const asyncLoading = ref(false);
  const validateTrigger = ref(false);
  const templateVersionList = ref<any[]>([]);
  const id = route.query.id as string;
  const uiSchema = ref<any>({});
  const selectors = ref<Set<string>>(new Set());
  const formDataAttributeCache = ref<any>({});
  const formAction = ref(props.schemaFormAction);
  const uiFormData = ref<any>({});

  provide(InjectShowInputHintKey, true);

  const schemaVariables = ref<any>({});

  const actionList = computed(() => {
    return _.map(SelectorAction, (item) => {
      return {
        ...item,
        disabled: selectors.value.has(item.value)
      };
    });
  });
  const virtualListProps = computed(() => {
    if (props.templateList.length > 20) {
      return {
        height: 200
      };
    }
    return undefined;
  });

  provide(InjectSchemaFormStatusKey, ref(formAction));

  const handleAttributeChange = () => {
    formDataAttributeCache.value[formData.value.template.version] = _.cloneDeep(
      formData.value.attributes
    );
  };
  const initSelectors = () => {
    selectors.value = new Set();
    if (formData.value.selector.projectName) {
      selectors.value.add('projectName');
    }
    if (formData.value.selector.environmentName) {
      selectors.value.add('environmentName');
    }
    if (formData.value.selector.environmentType) {
      selectors.value.add('environmentType');
    }
    if (_.keys(formData.value.selector.environmentLabels).length) {
      selectors.value.add('environmentLabels');
    }
    if (_.keys(formData.value.selector.resourceLabels).length) {
      selectors.value.add('resourceLabels');
    }
  };
  const handleDelete = () => {
    emits('delete');
  };
  const validateLabels = (val, callback) => {
    if (_.keys(val).length) {
      callback();
      return;
    }
    const valid = _.some(_.keys(val), (key) => {
      return !key;
    });
    if (valid) {
      callback(t('resource.definition.detail.rules.labelKey'));
      return;
    }
    callback();
  };
  const validateNameuniq = (val, callback) => {
    if ([PageAction.EDIT, PageAction.VIEW]) {
      callback();
      return;
    }
    const data = find(props.ruleList, (item) => get(item, 'name') === val);
    if (data) {
      callback(t('applications.applications.rule.modules.name'));
      return;
    }
    callback();
  };
  const handleAddSelector = (selector) => {
    selectors.value.add(selector);
  };
  const handleDeleteSelector = (selector: SelectorType) => {
    formData.value.selector = _.omit(formData.value.selector, [selector]);
    selectors.value.delete(selector);
  };
  const setTemplateInfo = (moduleData) => {
    const variables =
      _.cloneDeep(
        _.get(moduleData, 'uiSchema.openAPISchema.components.schemas.variables')
      ) || {};

    schemaVariables.value = variables;
  };

  const getTemplateVersions = async () => {
    try {
      const params = {
        templateID: formData.value.template.template.id,
        extract: ['-uiSchema', '-schema']
      };
      const { data } = await queryItemTemplatesVersions(params);
      templateVersionList.value = _.map(data.items || [], (item) => ({
        label: item.version,
        value: item.id,
        template: item
      })).sort((v1, v2) => {
        if (semverEq(v1.label, v2.label)) {
          return 0;
        }
        if (semverGt(v1.label, v2.label)) {
          return -1;
        }
        return 1;
      });
    } catch (error) {
      templateVersionList.value = [];
    }
  };
  const getTemplateSchemaByVersion = async () => {
    if (!formData.value.template.version) {
      return {};
    }
    try {
      asyncLoading.value = true;
      const params = {
        templateID: formData.value.template.template.id,
        query: formData.value.template.version,
        isProjectContext: false
      };
      const { data } = await queryItemTemplatesVersions(params);
      return get(data, 'items.0', {});
    } catch (error) {
      return {};
    } finally {
      asyncLoading.value = false;
    }
  };

  const handleVersionPopupVisibleChange = (visible) => {
    if (!formData.value.template?.template?.id) {
      return;
    }
    if (visible && !templateVersionList.value.length) {
      getTemplateVersions();
    }
  };

  const getFormDataAttributeCache = () => {
    if (
      formData.value.template.version ===
        props.originFormData.template.version &&
      formData.value.template?.template?.id ===
        props.originFormData.template?.template?.id
    ) {
      formData.value.attributes = _.cloneDeep(props.originFormData.attributes);
      formAction.value = PageAction.EDIT;
    } else if (
      _.get(formDataAttributeCache.value, [formData.value.template.version])
    ) {
      formData.value.attributes = _.cloneDeep(
        _.get(formDataAttributeCache.value, [formData.value.template.version])
      );
    } else {
      formData.value.attributes = {};
    }
    uiFormData.value = _.cloneDeep(formData.value.attributes);
  };
  const handleVersionChange = async () => {
    formAction.value = PageAction.CREATE;
    formData.value.template.id = _.get(
      _.find(
        templateVersionList.value,
        (item) => item.label === formData.value.template.version
      ),
      'value',
      ''
    );

    getFormDataAttributeCache();

    setTimeout(async () => {
      uiSchema.value = await getTemplateSchemaByVersion();
      setTemplateInfo(uiSchema.value);
    });
  };

  const handleTemplateChange = async () => {
    formDataAttributeCache.value = {};
    await getTemplateVersions();
    formData.value.template.name = _.get(
      _.find(
        props.templateList,
        (item) => item.value === formData.value.template?.template?.id
      ),
      'label',
      ''
    );
    formData.value.template.version = get(
      templateVersionList.value,
      '0.label',
      ''
    );
    await handleVersionChange();
  };

  const getSchema = () => {
    return uiSchema.value;
  };
  const submit = async () => {
    const res = await formref.value?.validate();
    const hiddenFormData = groupForm.value?.getHiddenData?.();
    validateTrigger.value = true;
    if (!res) {
      const resultData = _.cloneDeep(formData.value);
      resultData.attributes = {
        ...resultData.attributes,
        ...hiddenFormData
      };
      return resultData;
    }
    scrollToView();
    return false;
  };

  const init = async () => {
    if (!props.templateList.length) {
      return;
    }
    if (props.dataId) {
      formData.value = _.cloneDeep(props.originFormData);
      uiFormData.value = _.cloneDeep(props.originFormData?.attributes || {});
      const moduleData = await getTemplateSchemaByVersion();
      setTemplateInfo(moduleData);
      initSelectors();
    } else {
      formData.value.template.template.id = get(
        props.templateList,
        '0.value',
        ''
      );
      await handleTemplateChange();
    }
  };

  defineExpose({
    submit,
    getSchema
  });

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped>
  .config-wrapper {
    &.mo-wrap {
      border: none;

      :deep(.content) {
        // padding: 10px 0;
      }
    }

    .group-form {
      :deep(.label) {
        .star {
          display: none;
        }
      }
    }
  }
</style>
