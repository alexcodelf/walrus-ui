import axios from 'axios';
import qs from 'query-string';
import { Pagination } from '@/types/global';
import router from '@/router';
import { EnvironmentRow, EnvironFormData } from '../config/interface';

export const ENVIRONMENT_API = '/environments';

export const PROJECT_API_PREFIX = () => {
  return `/projects/${router.currentRoute.value.params.projectId}`;
};

export const getPermissionRouteParams = () => {
  const { params } = router.currentRoute.value;
  return { projectID: params?.projectId };
};

export interface QueryType extends Pagination {
  extract?: string[];
  sort?: string[];
}

export interface ResultType {
  items: EnvironmentRow[];
  pagination: Pagination;
}
export function queryEnvironments(params: QueryType, token?) {
  return axios.get<ResultType>(`${PROJECT_API_PREFIX()}${ENVIRONMENT_API}`, {
    params,
    cancelToken: token,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    }
  });
}

export function queryItemEnvironments(params: { id: string }) {
  return axios.get(`${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${params.id}`);
}

export function createEnvironment(data: EnvironFormData) {
  return axios.post(`${PROJECT_API_PREFIX()}${ENVIRONMENT_API}`, data);
}
export function cloneEnvironment(data: EnvironFormData, environmentID: string) {
  return axios.post(
    `${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${environmentID}/clone`,
    data
  );
}
export function deleteEnvironment(data: { items: Record<string, any>[] }) {
  return axios.delete(`${PROJECT_API_PREFIX()}${ENVIRONMENT_API}`, { data });
}

export function updateEnvironment(data: EnvironFormData) {
  return axios.put(
    `${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${data.id}`,
    data
  );
}
export function stopEnvironment(data: { id: string }) {
  return axios.post(
    `${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${data.id}/stop`
  );
}
export function startEnvironment(data: { id: string }) {
  return axios.post(
    `${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${data.id}/start`
  );
}

export const queryEnvironmentAvailableDefinitions = (params: {
  environmentID: string;
}) => {
  return axios.get(
    `${PROJECT_API_PREFIX()}${ENVIRONMENT_API}/${
      params.environmentID
    }/resource-definitions?t=${Date.now()}`
  );
};

// for custom service ui
export const queryEnvironmentConnector = (
  params: {
    projectID: string;
    environmentID: string;
  },
  token?
) => {
  return axios.get(
    `/projects/${params.projectID}/environments/${params.environmentID}`,
    {
      cancelToken: token
    }
  );
};
