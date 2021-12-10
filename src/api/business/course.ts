import { UploadImgResult } from './model/course';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { defHttp } from '/@/utils/request';

enum Api {
  GetCourseList = '/course/getQueryCourses',
  ChangeCourseState = '/course/changeState',
  UploadImg = '/course/upload',
}

const { apiUrl } = useGlobSetting();

export const getCourseList = (data) => defHttp.post({ url: Api.GetCourseList, data });

export const changeCourseState = (id: number, status: 1 | 0) =>
  defHttp.get({ url: Api.ChangeCourseState, params: { courseId: id, status } });

export const uploadImg = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defHttp.uploadFile<UploadImgResult>(
    { url: `${apiUrl}/boss${Api.UploadImg}`, onUploadProgress },
    params,
  );
