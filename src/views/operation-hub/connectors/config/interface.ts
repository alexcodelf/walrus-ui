export interface ConnectorRowData {
  name: string;
  type: string;
  status: string;
  statusMessage: string;
  configData: object;
  enableFinOps: boolean;
  finOpsStatus: string;
  finOpsStatusMessage: string;
  createTime: string;
  project?: object;
  edges: object;
  id: string;
  label?: string;
  value?: string;
}

export interface CustomAttrbute {
  key: string;
  value: any;
  type: string;
  default?: any;
  extraCom?: string;
  visible?: boolean;
  extraProps?: any;
  error?: string;
  style?: object;
}

export interface ConnectorFormData {
  project?: { id: string };
  id?: string;
  name: string;
  description?: string;
  type: string;
  applicableEnvironmentType: string;
  configData: {
    [k: string]: {
      visible?: boolean;
      value: string;
      type?: string;
    };
  };
  configVersion: string;
  enableFinOps: boolean;
}

export interface ConnectorTypeData {
  label: string;
  enable: boolean;
  value: string;
  com: string;
  route: string;
  globalRoute: string;
  icon: string;
}
