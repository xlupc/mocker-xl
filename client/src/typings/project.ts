import { Api } from './api';

// project 接口
export interface Project {
  projectId: string;
  name: string;
  desc: string;
  baseUrl: string;
  proxy: any;
  apis: Api[];
  createTime: string;
  modifiedTime: string;
}
