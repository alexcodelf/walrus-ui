import _ from 'lodash';
import i18n from '@/locale';
import FIELD_TYPE from '../config/field-type';
import { FieldSchema } from '../interface';
import { getConditionValue } from '../../form-create/config/utils';
import { parseExpression } from '../../form-create/config/experssion-parser';

export const isSelect = (schema: FieldSchema) => {
  const { type, enum: enumList, items } = schema;
  if (items && type === FIELD_TYPE.ARRAY) {
    return true;
  }
  return type === FIELD_TYPE.STRING && enumList && enumList.length > 0;
};

export const isBoolean = (schema: FieldSchema) => {
  const { type } = schema;
  return type === FIELD_TYPE.BOOLEAN;
};

export const isMuliSelect = (schema: FieldSchema) => {
  const { type, enum: enumList } = schema;
  return type === FIELD_TYPE.ARRAY && enumList && enumList.length > 0;
};

export const isNumber = (schema: FieldSchema) => {
  const { type } = schema;
  return type === FIELD_TYPE.INTEGER || type === FIELD_TYPE.NUMBER;
};

export const isPassword = (schema: FieldSchema) => {
  const { type } = schema;
  return type === FIELD_TYPE.STRING && schema.format === 'password';
};

export const isDatePicker = (schema: FieldSchema) => {
  const { type } = schema;
  return (
    type === FIELD_TYPE.STRING &&
    _.includes(['date', 'date-time', 'time'], schema.format)
  );
};

export const getShowIfValue = (showif, formData) => {
  const conditions = parseExpression(showif);
  const isShow = getConditionValue(
    {
      conditions,
      showIf: showif
    },
    formData
  );
  return isShow;
};
export const initFieldDefaultValue = (item) => {
  if (item.default) {
    return item.default;
  }
  const { type } = item;
  if (type === FIELD_TYPE.ARRAY) {
    return [];
  }
  if (type === FIELD_TYPE.OBJECT) {
    return {};
  }
  if (type === FIELD_TYPE.BOOLEAN) {
    return false;
  }
  if (type === FIELD_TYPE.NUMBER || type === FIELD_TYPE.INTEGER) {
    return null;
  }
  return '';
};

export const calcFieldSpan = ({ parentSpan, colSpan, parentHalfGrid }) => {
  if (parentHalfGrid) {
    return {
      span: colSpan || 6,
      halfGird: true
    };
  }
  if (parentSpan === 12) {
    const span = colSpan || 6;
    return {
      span,
      halfGird: span >= 6
    };
  }

  return {
    span: 12,
    halfGird: false
  };
};

export const genObjectFieldProperties = ({
  schema,
  fieldPath,
  grandParentHalfGrid,
  parentSpan
}: {
  schema: FieldSchema;
  formData: any;
  parentSpan?: number;
  grandParentHalfGrid?: boolean; // when has items,need pass it
  fieldPath: string[];
}) => {
  if (!_.keys(schema?.properties).length) {
    return [];
  }
  const { properties } = schema;
  // const { required: requiredFlag } = schema;
  const resultList: FieldSchema[] = [];
  const defaultOrder = 9999;
  const keys = _.keys(properties);
  _.each(keys, (key) => {
    const property = _.get(properties, key);
    const { type } = property;
    const order = property['x-walrus-ui']?.order || defaultOrder;
    const colSpanData = calcFieldSpan({
      parentSpan,
      colSpan: property['x-walrus-ui']?.colSpan,
      parentHalfGrid: schema.halfGrid || grandParentHalfGrid
    });
    // const required = _.includes(requiredFlag, key);
    const fieldSchema = {
      ...property,
      name: key,
      fieldPath: [...fieldPath, key],
      required: property.required || [],
      parentRequired: schema.required || [],
      colSpan: colSpanData.span,
      halfGrid: colSpanData.halfGird,
      order
    };
    console.log('fieldSchema>>>>22>>>>', fieldSchema, colSpanData);
    resultList.push(fieldSchema);
  });

  return _.sortBy(resultList, 'order');
};

export const setFieldValue = (formData, fieldPath, schema) => {
  return _.get(formData, fieldPath, initFieldDefaultValue(schema));
};
// set field schema value
export const setHiddenFieldValue = ({
  schema,
  formData,
  fieldPath
}: {
  schema: FieldSchema;
  formData: any;
  fieldPath: string[];
}) => {
  const { properties } = schema;
  const { required: requiredFlag } = schema;
  const keys = _.keys(properties);
  _.each(keys, (key) => {
    const property = _.get(properties, key);
    const { type } = property;
    const required = _.includes(requiredFlag, key);
    const fieldSchema = {
      ...property,
      name: key,
      fieldPath: [...fieldPath, key],
      required: property.required || required
    };
    if (type === FIELD_TYPE.OBJECT) {
      const value = setFieldValue(formData, [...fieldPath, key], fieldSchema);
      _.set(formData, [...fieldPath, key], value);
      setHiddenFieldValue({
        schema: fieldSchema,
        formData,
        fieldPath: [...fieldPath, key]
      });
    } else {
      const value = setFieldValue(formData, [...fieldPath, key], fieldSchema);
      _.set(formData, [...fieldPath, key], value);
    }
  });
};

// real component
export const genFieldPropsAndRules = ({
  requiredFields,
  schema
}: {
  requiredFields: string[];
  schema: FieldSchema;
}) => {
  // const { additionalProperties, items } = schema;
  const uiExtensions = schema['x-walrus-ui'] || {};
  const {
    type,
    title,
    name,
    readOnly,
    maximum,
    minimum,
    externalDocs,
    default: defaultValue,
    enum: enumList,
    maxLength,
    minLength,
    description,
    items
  } = schema;
  const {
    required: requiredFlag,
    immutable,
    hidden,
    showIf,
    message,
    widget
  } = uiExtensions;

  const required = _.includes(requiredFields, name);
  const commonProps = {
    label: title || name,
    disabled: readOnly || immutable,
    hidden: hidden || false,
    showIf: showIf || '',
    doc: externalDocs || '',
    required: requiredFlag || required || false,
    password: isPassword(schema),
    description
  };

  // boolean
  if (type === FIELD_TYPE.BOOLEAN) {
    return {
      fieldProps: {
        trueValue: true,
        falseValue: false,
        ...commonProps
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.select', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }
  // number
  if (type === FIELD_TYPE.INTEGER || type === FIELD_TYPE.NUMBER) {
    return {
      fieldProps: {
        min: minimum,
        max: maximum,
        ...commonProps
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.input', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }

  // string

  if (type === FIELD_TYPE.STRING && !enumList?.length) {
    return {
      fieldProps: {
        maxLength,
        minLength,
        showWordLimit: !!maxLength,
        ...commonProps
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.input', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }
  // select
  if (type === FIELD_TYPE.STRING && enumList?.length) {
    return {
      fieldProps: {
        ...commonProps,
        maxTagCount: 3
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.select', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }

  if (isMuliSelect(schema)) {
    return {
      fieldProps: {
        ...commonProps,
        maxTagCount: 3,
        multiple: true
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.select', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }

  if (type === FIELD_TYPE.ARRAY && (items || !enumList?.length)) {
    return {
      fieldProps: {
        ...commonProps,
        allowCreate: true,
        maxTagCount: 3,
        multiple: true
      },
      rules: [
        {
          required: requiredFlag || required || false,
          message:
            message ||
            i18n.global.t('common.form.rule.input', { name: title || name })
        }
      ],
      default: defaultValue
    };
  }
  return {
    fieldProps: {
      ...commonProps
    },
    rules: [
      {
        required: requiredFlag || required || false,
        message:
          message ||
          i18n.global.t('common.form.rule.input', { name: title || name })
      }
    ],
    default: defaultValue
  };
};

export default {};
