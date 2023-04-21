import _ from 'lodash';
import { FieldRule } from '@arco-design/web-vue';

export interface LabelListItem {
  key?: string;
  label?: string;
  value: string | number;
}

export interface ComponentSchema {
  Name: string;
  Type: string;
  Default: any;
  ShowCondition: { key: string; value: string };
  parentCom: string;
  childCom: string;
  Required: boolean;
  Sensitive: boolean;
  Description: string;
  ShowIf?: string;
  order?: number;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  Options?: { label: string; value: string }[];
  Label?: string;
  Group?: string;
  props?: object;
  rules?: FieldRule[];
  labelList?: LabelListItem[];
}
const BASIC_TYPE = ['number', 'string', 'bool'];

const UNKNOWN_TYPE = ['dynamic'];

const COLLECTION_TYPE = ['map', 'object', 'list', 'tuple'];

export const schemaType = {
  isBasicType(type) {
    return _.includes(BASIC_TYPE, type);
  },
  isUnknownType(type) {
    return _.includes(UNKNOWN_TYPE, type);
  },
  isCollectionType(type) {
    return _.get(type, '1') && !_.isString(_.get(type, '1'));
  },
  isStringType(type) {
    return type === 'string';
  },
  isNumberType(type) {
    return type === 'number';
  },
  isBoolenType(type) {
    return type === 'bool';
  },
  isMapString(type) {
    return _.get(type, '0') === 'map' && _.get(type, '1') === 'string';
  },
  isListString(type) {
    return _.get(type, '0') === 'list' && _.get(type, '1') === 'string';
  },
  isListNumber(type) {
    return _.get(type, '0') === 'list' && _.get(type, '1') === 'number';
  }
};
// replace input width hintInput
export const parseComponentSchema = (schema: ComponentSchema) => {
  const props = {
    min: schema?.min || -Infinity,
    max: schema?.max || Infinity,
    maxLength: schema?.maxLength || 100,
    showWordLimit: schema?.maxLength,
    minLength: schema?.minLength || null
  };
  const { Type: type, Required: required, Sensitive: sensitive } = schema;

  const rules = { required };

  // string
  if (schemaType.isStringType(type) || schemaType.isNumberType(type)) {
    // =============Select======================
    if (schema?.Options?.length) {
      return {
        component: ['Select', 'Option'],
        props: {
          ...props
        },
        rules: [{ ...rules, message: 'common.form.rule.select' }]
      };
    }

    //  ===========InputPassword============
    if (sensitive && schemaType.isStringType(type)) {
      return {
        component: ['hintInput'],
        props: {
          ...props
        },
        rules: [{ ...rules, message: 'common.form.rule.input' }]
      };
    }
    // =============InputeNmber==========
    if (schemaType.isNumberType(type)) {
      return {
        component: ['InputNumber'],
        props: {
          ...props
        },
        rules: [{ ...rules, message: 'common.form.rule.input' }]
      };
    }
    //  ============Input===========
    if (!sensitive && schemaType.isStringType(type)) {
      return {
        component: ['hintInput'],
        props: { ...props },
        rules: [{ ...rules, message: 'common.form.rule.input' }]
      };
    }
  }

  // =====Input group==============
  if (schemaType.isMapString(type)) {
    return {
      component: ['XInputGroup'],
      props: { ...props, alwaysDelete: true },
      rules: [{ ...rules, message: 'common.form.rule.input' }]
    };
  }
  // ====== select ======
  if (schemaType.isListNumber(type) || schemaType.isListString(type)) {
    return {
      component: ['Select', 'Option'],
      props: {
        ...props,
        multiple: true,
        allowCreate: !schema.Options?.length
      },
      rules: [{ ...rules, message: 'common.form.rule.select' }]
    };
  }
  // boolean
  if (schemaType.isBoolenType(type)) {
    // ================Checkbox================
    return {
      component: ['Checkbox'],
      props: { ...props },
      rules: [{ ...rules, message: 'common.form.rule.select' }]
    };
  }
  if (schemaType.isCollectionType(type) || schemaType.isUnknownType(type)) {
    return {
      component: ['AceEditor'],
      props: {
        ...props,
        lang: 'json',
        showGutter: false
      },
      rules: [{ ...rules, message: 'common.form.rule.input' }]
    };
  }
  return {
    component: ['hintInput'],
    props: { ...props },
    rules: [{ ...rules, message: 'common.form.rule.input' }]
  };
};

export default {};
