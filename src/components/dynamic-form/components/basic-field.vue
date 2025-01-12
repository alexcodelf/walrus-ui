<script lang="tsx">
  import _ from 'lodash';
  import i18n from '@/locale';
  import {
    defineComponent,
    toRefs,
    inject,
    ref,
    onMounted,
    nextTick,
    watch
  } from 'vue';
  import { InjectSchemaFormStatusKey, PageAction } from '@/views/config';
  import SealViewItemWrap from '@/components/seal-form/components/seal-view-item-wrap.vue';
  import schemaFieldProps from '../fields/schema-field-props';
  import {
    BasicFieldMaps,
    CommonFieldMaps,
    FormatsFieldMaps
  } from '../fields/field-map';
  import {
    isSelect,
    isNumber,
    isBoolean,
    isDatePicker,
    isMuliSelect,
    isPassword,
    checkValidValue,
    initFieldDefaultValue,
    isRequiredInitField,
    isEmptyvalue,
    initFieldValue,
    unsetFieldValue,
    parentObjectExsits,
    viewFieldValue
  } from '../utils';
  import { ProviderFormRefKey } from '../config';

  export default defineComponent({
    props: {
      ...schemaFieldProps,
      rules: {
        type: Array,
        default: () => []
      }
    },
    emits: ['change'],
    setup(props, { emit, attrs }) {
      const schemaFormStatus = inject(
        InjectSchemaFormStatusKey,
        ref(PageAction.CREATE)
      );
      const formref = inject(ProviderFormRefKey, ref());

      const widget = _.get(props.schema, ['x-walrus-ui', 'widget'], '');
      const numberReg = /\d+/;
      const { type } = toRefs(props.schema);

      let Component = BasicFieldMaps[type.value];

      const handleChange = (data) => {
        emit('change', data);
      };

      const validateField = () => {
        setTimeout(() => {
          formref.value?.validateField(props.fieldPath);
        });
      };
      const initValue = () => {
        if (schemaFormStatus.value === PageAction.CREATE) {
          initFieldValue({
            schema: props.schema,
            formData: props.formData,
            uiFormData: props.uiFormData,
            fieldPath: props.fieldPath,
            required: props.required
          });
          handleChange(props.formData);
        } else {
          viewFieldValue({
            schema: props.schema,
            formData: props.formData,
            uiFormData: props.uiFormData,
            fieldPath: props.fieldPath,
            required: props.required
          });
        }
      };

      // textarea
      if (type.value === 'string' && widget === 'TextArea') {
        Component = CommonFieldMaps.textArea;
      }

      if (isDatePicker(props.schema) && props.schema.format) {
        Component = FormatsFieldMaps[props.schema.format];
      }

      if (isPassword(props.schema)) {
        Component = CommonFieldMaps.password;
      }

      const handleInputChange = (e: any) => {
        _.set(props.formData, props.fieldPath, e);
        _.set(props.uiFormData, props.fieldPath, e);
        handleChange(props.formData);
      };

      // initValue();

      const renderEdit = () => {
        return (
          <a-form-item
            hide-label={true}
            rules={[
              ...props.rules,
              {
                validator: (value, callback) => {
                  if (
                    !parentObjectExsits(props.formData, props.fieldPath) ||
                    !props.required
                  ) {
                    callback();
                    return;
                  }
                  if (!value) {
                    callback(
                      `${i18n.global.t('common.form.rule.input', {
                        name: props.schema.title
                      })}`
                    );
                  } else {
                    callback();
                  }
                }
              }
            ]}
            label={props.schema.title}
            field={_.join(props.fieldPath, '.')}
            validate-trigger={['change']}
          >
            <Component
              {...attrs}
              required={props.required}
              editorId={_.join(props.fieldPath, '.')}
              label={props.label}
              style="width: 100%"
              allow-search={false}
              disabled={
                props.readonly ||
                (attrs.immutable &&
                  schemaFormStatus.value !== PageAction.CREATE)
              }
              readonly={
                props.readonly ||
                (attrs.immutable &&
                  schemaFormStatus.value !== PageAction.CREATE)
              }
              allow-clear={true}
              popupInfo={props.schema.description}
              modelValue={_.get(props.uiFormData, props.fieldPath)}
              onInput={(val) => {
                console.log(
                  'group inpu+++++input========',
                  val,
                  props.formData
                );
                handleInputChange(val);
              }}
              onChange={(val) => {
                _.set(props.formData, props.fieldPath, val);
                _.set(props.uiFormData, props.fieldPath, val);
                if (isEmptyvalue(val)) {
                  unsetFieldValue({
                    schema: props.schema,
                    formData: props.formData,
                    fieldPath: props.fieldPath,
                    required: props.required
                  });
                }
                console.log(
                  'group inpu+++++change========',
                  val,
                  props.formData
                );
                handleChange(props.formData);
                validateField();
              }}
            ></Component>
          </a-form-item>
        );
      };

      return () => (
        <>
          {schemaFormStatus.value !== PageAction.VIEW ? (
            renderEdit()
          ) : (
            <a-form-item
              hide-label={true}
              rules={props.rules}
              label={props.schema.title}
              field={_.join(props.fieldPath, '.')}
              validate-trigger={['change']}
            >
              <SealViewItemWrap label={props.schema.title} style="width: 100%">
                <span>
                  {(isPassword(props.schema) || props.schema.writeOnly) &&
                  _.get(props.uiFormData, props.fieldPath)
                    ? '******'
                    : _.get(props.uiFormData, props.fieldPath)}
                </span>
              </SealViewItemWrap>
            </a-form-item>
          )}
        </>
      );
    }
  });
</script>
