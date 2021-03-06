import path from 'path';
import { loadFileList } from '../util/loadFileList';
import { IProject } from '../types/index';

const service = loadFileList(path.join(__dirname, '../service'), 'service', null);

// 创建 mock API
async function createProject(ctx: any) {
  console.log(ctx.request.body);
  let rs: IProject;
  try {
    rs = await service.project.createProject(ctx.request.body);
    if (rs) {
      ctx.respond.success('项目创建成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`项目创建失败: ${error}`);
  }
}

// 获取项目列表

async function getProjectList(ctx: any) {
  let rs: IProject[];
  try {
    rs = await service.project.getAllProject();
    if (rs) {
      ctx.respond.success('获取项目列表成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`获取项目列表失败: ${error}`);
  }
}

// 查询项目
async function queryProject(ctx: any) {
  let rs: IProject;
  const { projectId } = ctx.query;
  try {
    rs = await service.project.findProject(projectId);
    if (rs) {
      ctx.respond.success('项目查询成功', rs);
    } else {
      ctx.respond.success('项目查询结果为空', {});
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`项目查询失败: ${error}`);
  }
}

// 更新项目
async function updateProject(ctx: any) {
  const { projectId } = ctx.request.body;
  if (!projectId) {
    ctx.respond.error('参数错误，缺少 projectId!');
  }
  let rs: IProject;
  try {
    rs = await service.project.updateProject(ctx.request.body);
    if (rs) {
      ctx.respond.success('项目保存成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`项目保存失败: ${error}`);
  }
}

// 删除项目
async function deleteProject(ctx: any) {
  let rs: any;
  const { projectId } = ctx.request.body;
  try {
    rs = await service.project.deleteProject(projectId);
    if (rs) {
      ctx.respond.success('删除成功', {});
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`删除失败: ${error}`);
  }
}

module.exports = {
  createProject,
  getProjectList,
  queryProject,
  updateProject,
  deleteProject
};
