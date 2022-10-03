import type { CourseInfo, LessonData, UploadImgResult } from './model/course'
import type { UploadFileParams } from '/#/axios'
import { useGlobSetting } from '/@/hooks/setting'
import { defHttp } from '/@/utils/request'

enum Api {
  GetCourseList = '/course/getQueryCourses',
  ChangeCourseState = '/course/changeState',
  UploadImg = '/course/upload',
  SaveOrUpdateCourse = '/course/saveOrUpdateCourse',
  GetCourseById = '/course/getCourseById',
  GetLessonInfoById = '/course/section/getSectionAndLesson',
  SaveOrUpdateSection = '/course/section/saveOrUpdateSection',
  SaveOrUpdateLesson = '/course/lesson/saveOrUpdate',
  AliyunUploadImg = '/course/upload/aliyunImagUploadAddressAdnAuth.json',
  AliyunUploadVideo = '/course/upload/aliyunVideoUploadAddressAdnAuth.json',
  AliyunUploadTransCode = '/course/upload/aliyunTransCode.json',
  AliyunUploadTransPercent = '/course/upload/aliyunTransCodePercent.json',
}

const { apiUrl } = useGlobSetting()

export const getCourseList = data => defHttp.post({ url: Api.GetCourseList, data })

export const changeCourseState = (id: number, status: 1 | 0) =>
  defHttp.get({ url: Api.ChangeCourseState, params: { courseId: id, status } })

export const uploadImg = (
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) =>
  defHttp.uploadFile<UploadImgResult>(
    { url: `${apiUrl}/boss${Api.UploadImg}`, onUploadProgress },
    params,
  )

export const saveOrUpdateCourse = data =>
  defHttp.post({ url: Api.SaveOrUpdateCourse, data }, { isTransformResponse: false })

export const getCourseById = id =>
  defHttp.get<CourseInfo>({ url: Api.GetCourseById, params: { courseId: id } })

export const getLessonInfoById = id =>
  defHttp.get<LessonData[]>({ url: Api.GetLessonInfoById, params: { courseId: id } })

export const saveOrUpdateSection = data =>
  defHttp.post({ url: Api.SaveOrUpdateSection, data }, { isTransformResponse: false })

export const saveOrUpdateLesson = data => defHttp.post({ url: Api.SaveOrUpdateLesson, data })

export const aliyunUploadImg = () => defHttp.get({ url: Api.AliyunUploadImg })

export const aliyunUploadVideo = params => defHttp.get({ url: Api.AliyunUploadVideo, params })

export const aliyunUploadTransCode = data =>
  defHttp.post({ url: Api.AliyunUploadTransCode, data })

export const AliyunUploadTransPercent = params =>
  defHttp.get({ url: Api.AliyunUploadTransPercent, params })
