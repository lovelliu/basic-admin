export interface UploadImgResult {
  uid: string;
  name: string;
  status: string;
}

export interface CourseInfo {
  id: number;
  courseName: string;
  brief: string;
  teacherDTO: TeacherDTO;
  courseDescriptionMarkDown: string;
  price: number;
  discounts: number;
  priceTag: string;
  previewFirstField: string;
  previewSecondField: string;
  discountsTag: string;
  courseListImg: string;
  courseImgUrl: string;
  sortNum: number;
  status: number;
  sales: number;
  activityCourse: boolean;
  activityCourseDTO: ActivityCourseDTO;
}
interface TeacherDTO {
  id: number;
  courseId: number;
  teacherName: string;
  teacherHeadPicUrl: null;
  position: string;
  description: string;
}

interface ActivityCourseDTO {
  id: number;
  courseId: number;
  beginTime: string;
  endTime: string;
  amount: number;
  stock: number;
  status: number;
  isDel: number;
  remark: null;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
}

export interface LessonData {
  id: number;
  courseId: number;
  sectionName: string;
  description: string;
  createTime: string;
  updateTime: string;
  isVisible: boolean;
  key: number;
  isDe: boolean;
  level: number;
  orderNum: number;
  lastOperatorId: number;
  status: number;
  lessonDTOS: LessonDTOS[];
}

interface LessonDTOS {
  id: number;
  courseId: number;
  sectionId: number;
  theme: string;
  duration: string;
  durationNum: number;
  isFree: boolean;
  startImgUrl: string;
  textContent: string;
  markdownTextContent: string;
  transcode: string;
  resourceUrl: string;
  lastOperatorId: number;
  createTime: string;
  updateTime: string;
  isDel: boolean;
  fileId: string;
  orderNum: number;
  aliFileUrl: string;
  aliFileDk: string;
  aliFileEdk: string;
  aliFileVid: number;
  status: number;
  isTimingPublish: boolean;
  publishTime: string;
  mediaDTO: object;
}
