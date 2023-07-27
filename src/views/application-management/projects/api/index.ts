import axios from 'axios';
import qs from 'query-string';
import { Pagination, ListResult } from '@/types/global';
import {
  ProjectRowData,
  ProjectFormData,
  ProjectRolesRowData
} from '../config/interface';

export const PROJECT_API = '/projects';
export interface QueryType extends Pagination {
  sort?: string[];
}

export interface ResultType {
  items: ProjectRowData[];
  pagination: Pagination;
}

export const queryProjects = (params: QueryType) => {
  return axios.get<ResultType>('/projects', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    }
  });
};

export const createProject = (data: ProjectFormData) => {
  return axios.post(`/projects`, data);
};
export const deleteProjects = (data) => {
  return axios.delete(`/projects`, { data });
};

export const updateProject = (data: ProjectFormData) => {
  return axios.put(`/projects/${data.id}`, data);
};

export const queryItemProject = (params) => {
  return axios.get(`/projects/${params.id}`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    }
  });
};

export const querySubjectRoles = (params: { projectID: string }) => {
  return axios.get<ListResult<ProjectRolesRowData>>(`/subject-roles`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    }
  });
};
export const addSubjectRoles = (data) => {
  return axios.post(`/subject-roles?projectID=${data.project.id}`, data);
};

export const deleteSubjectRoles = (data) => {
  return axios.delete(`/subject-roles/${data.id}?projectID=${data.projectID}`);
};
