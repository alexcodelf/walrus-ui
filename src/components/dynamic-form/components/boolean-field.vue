<script lang="tsx">
  import _ from 'lodash';
  import i18n from '@/locale';
  import { defineComponent, toRefs, inject, ref, watch } from 'vue';
  import { InjectSchemaFormStatusKey, PageAction } from '@/views/config';
  import SealViewItemWrap from '@/components/seal-form/components/seal-view-item-wrap.vue';
  import schemaFieldProps from '../fields/schema-field-props';
  import {
    isEmptyvalue,
    initFieldValue,
    viewFieldValue,
    unsetFieldValue,
    parentObjectExsits,
    isRequiredInitField,
    initFieldDefaultValue,
    genFieldPropsAndRules
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

      const { type } = toRefs(props.schema);

      const handleUnsetField = () => {
        if (
          isEmptyvalue(_.get(props.formData, props.fieldPath)) &&
          !props.schema.default
        ) {
          _.unset(props.formData, props.fieldPath);
        }
      };

      const { fieldProps, rules } = genFieldPropsAndRules({
        schema: props.schema,
        requiredFields: props.requiredFields
      });

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
            required: fieldProps.required
          });
        } else {
          viewFieldValue({
            schema: props.schema,
            formData: props.formData,
            uiFormData: props.uiFormData,
            fieldPath: props.fieldPath,
            required: fieldProps.required
          });
        }
      };

      // initValue();
      const renderEdit = () => {
        return (
          <a-form-item
            hide-label={true}
            rules={[
              ...rules,
              {
                validator: (value, callback) => {
                  if (
                    !parentObjectExsits(props.formData, props.fieldPath) ||
                    !fieldProps.required
                  ) {
                    callback();
                  }
                }
              }
            ]}
            label={fieldProps.label}
            field={_.join(props.fieldPath, '.')}
            validate-trigger={['change']}
          >
            <seal-checkbox
              {...fieldProps}
              required={fieldProps.required}
              label={fieldProps.label}
              style="width: 100%"
              allow-search={false}
              disabled={
                fieldProps.readonly ||
                (fieldProps.immutable &&
                  schemaFormStatus.value !== PageAction.CREATE)
              }
              popupInfo={props.schema.description}
              modelValue={_.get(props.uiFormData, props.fieldPath)}
              onChange={(val) => {
                _.set(props.formData, props.fieldPath, val);
                _.set(props.uiFormData, props.fieldPath, val);
                if (val === !!props.schema.default) {
                  unsetFieldValue({
                    schema: props.schema,
                    formData: props.formData,
                    fieldPath: props.fieldPath,
                    required: fieldProps.required
                  });
                }
                handleChange(props.formData);
                validateField();
                console.log(
                  'checkbox+++++++++++++++',
                  props.fieldPath,
                  _.get(props.uiFormData, props.fieldPath),
                  props.formData,
                  props.uiFormData
                );
              }}
            ></seal-checkbox>
          </a-form-item>
        );
      };

      return () => (
        <a-grid-item
          span={{ lg: props.schema.colSpan, md: 12, sm: 12, xs: 12 }}
        >
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
                <a-checkbox
                  modelValue={_.get(props.uiFormData, props.fieldPath)}
                  size="small"
                ></a-checkbox>
              </SealViewItemWrap>
            </a-form-item>
          )}
        </a-grid-item>
      );
    }
  });
</script>
