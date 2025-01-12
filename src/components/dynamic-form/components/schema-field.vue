<script lang="tsx">
  import { defineComponent, inject, ref } from 'vue';
  import _ from 'lodash';
  import { InjectSchemaFormStatusKey, PageAction } from '@/views/config';
  import schemaFieldProps from '../fields/schema-field-props';
  import {
    getShowIfValue,
    initFieldDefaultValue,
    setHiddenFieldValue,
    isRequiredInitField,
    initFieldValue,
    viewFieldValue
  } from '../utils';
  import { getSchemaFieldComponent } from '../fields/field-map';

  export default defineComponent({
    props: schemaFieldProps,
    emits: ['change'],
    setup(props, { emit }) {
      const schemaFormStatus = inject(
        InjectSchemaFormStatusKey,
        ref(PageAction.CREATE)
      );
      if (!_.keys(props.schema.properties)) {
        return null;
      }
      // hidden
      const hidden = _.get(props.schema, ['x-walrus-ui', 'hidden'], false);
      // showIf
      const showIf = _.get(props.schema, ['x-walrus-ui', 'showIf'], '');

      const handleChange = (data) => {
        emit('change', data);
      };
      const setShowIfField = () => {
        _.unset(props.formData, props.fieldPath);
        _.unset(props.uiFormData, props.fieldPath);
        emit('change', props.formData);
        return null;
      };

      //  generate field component and fieldPath
      const { component, fieldPath } = getSchemaFieldComponent({
        schema: props.schema,
        fieldPath: props.fieldPath
      });

      // init field value
      if (schemaFormStatus.value === PageAction.CREATE) {
        initFieldValue({
          schema: props.schema,
          formData: props.formData,
          uiFormData: props.uiFormData,
          fieldPath,
          required: _.includes(props.requiredFields, props.schema.name)
        });
        handleChange(props.formData);
      } else {
        viewFieldValue({
          schema: props.schema,
          formData: props.formData,
          uiFormData: props.uiFormData,
          fieldPath,
          required: _.includes(props.requiredFields, props.schema.name)
        });
      }
      console.log(
        'data+++++++++',
        schemaFormStatus.value,
        fieldPath,
        props.formData,
        props.uiFormData
      );
      // hidden field
      if (!component || hidden) return null;

      const renderComponent = () => {
        const Component = component;
        if (showIf) {
          return getShowIfValue(
            showIf,
            props.uiFormData,
            _.initial(fieldPath)
          ) ? (
            <Component
              fieldPath={fieldPath}
              formData={props.formData}
              uiFormData={props.uiFormData}
              schema={props.schema}
              requiredFields={props.requiredFields}
              onChange={(data) => handleChange(data)}
            />
          ) : (
            setShowIfField()
          );
        }
        return (
          <Component
            fieldPath={fieldPath}
            formData={props.formData}
            uiFormData={props.uiFormData}
            schema={props.schema}
            requiredFields={props.requiredFields}
            parentSpan={props.parentSpan || 12}
            level={props.schema.level || 0}
            action={props.action}
            onChange={(data) => handleChange(data)}
          />
        );
      };
      return () => {
        return <>{renderComponent()}</>;
      };
    }
  });
</script>
