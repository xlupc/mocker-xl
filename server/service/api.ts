import mongoose from 'mongoose';
import { ApiModel } from '../model/api';
import { IApi } from '../types/index';
import { ProjectModel } from '../model/project';

async function createApi(api: IApi) {
  let result: IApi;
  const { project } = api;
  try {
    const rs = await ProjectModel.findOne(
      { projectId: mongoose.Types.ObjectId(project) },
      { apis: 1 }
    );
    if (rs) {
      result = await ApiModel.create(api);
      await ProjectModel.update({ projectId: project }, { apis: rs.apis.concat(result._id) });
      return result;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function getAllApi(url: string) {
  const reg = new RegExp(`.*${url}.*`, 'i');
  const condition = { url: reg };
  return ApiModel.findOne(condition).sort({ modifiedTime: -1 });
}

function getApiByUrl(url: string) {
  const apiUrl =
    '/' +
    url
      .split('/')
      .slice(4)
      .join('/');
  const reg = new RegExp(`.*${apiUrl}.*`, 'i');
  const condition = { url: reg, project: mongoose.Types.ObjectId(url.split('/')[2]) };
  return ApiModel.findOne(condition).sort({ modifiedTime: -1 });
}

function findApi(id: string) {
  return ApiModel.findOne({ _id: mongoose.Types.ObjectId(id) });
}

async function updateApi(api: IApi) {
  try {
    const apiRs = await ApiModel.findOne({ _id: mongoose.Types.ObjectId(api._id) });
    if (apiRs) {
      apiRs.set({ ...apiRs, ...api });
      return apiRs.save();
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function deleteApi(id: string) {
  return ApiModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
}

export { createApi, getApiByUrl, findApi, updateApi, deleteApi };
