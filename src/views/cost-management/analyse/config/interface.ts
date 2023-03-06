export interface CostAnalyRow {
  itemName: string;
  startTime: string;
  totalCost: number;
  sharedCost: number;
  cpuCost: number;
  ramCost: number;
  pvCost: number;
}

export interface FilterItem {
  fieldName: string;
  operator: string;
  values: string[];
  loading?: boolean;
  fieldValues?: { label: string; value: string }[];
  includeAll?: boolean;
}
export interface IdleCostFiltersItem {
  clusterName: string;
  connectorID: string;
  includeAll: boolean;
}
export interface ManagementCostFilters {
  clusterName: string;
  connectorID: string;
  includeAll: boolean;
}
export interface ShareCostItem {
  filters: FilterItem[];
  idleCostFilters: IdleCostFiltersItem[];
  managementCostFilters: ManagementCostFilters[];
  sharingStrategy: string;
}
export interface AllocationQueriesItem {
  filters: Array<FilterItem[]>;
  groupBy: string;
  step: string;
  paging: {
    page: number;
    perPage: number;
  };
  shareCosts: ShareCostItem[];
}
export interface PerspectiveRowData {
  id: string;
  name: string;
  label?: string;
  value?: string;
  createTime: string;
  updateTime: string;
  startTime: string;
  endTime: string;
  builtin: boolean;
  disabled?: boolean;
  allocationQueries: AllocationQueriesItem[];
}
export interface FieldsOptions {
  label: string;
  value: string;
  children?: Array<{ label: string; value: string }>;
}
export interface FilterParamsType extends AllocationQueriesItem {
  startTime: string;
  endTime: string;
}

export interface ChartData {
  xAxis: string[];
  line: Array<{ name: string; value: number[] }>;
  bar: Array<{ name: string; value: number[] }>;
  dataConfig: Array<{ name: string; label: string; color?: string }>;
}
