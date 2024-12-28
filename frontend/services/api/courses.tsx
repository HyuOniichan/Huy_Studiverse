import { apiRequest } from ".";
import { CourseType, EditCourseType, LessonType, NewLessonType } from "@/types";
import { getCurrentUser } from "./users";
import { NewCourseType } from "@/types";

const CourseApi = {
    index: '/course',
    show: (courseId: string) => `/course/${courseId}/`,
    showDeleted: '/course/deleted',
    store: '/course/store',
    delete: (courseId: string) => `/course/${courseId}/delete`,
    restore: (courseId: string) => `/course/${courseId}/restore`,
    edit: (courseId: string) => `/course/${courseId}`
}

const LessonApi = {
    index: (courseId: string) => `/course/${courseId}/lesson`,
    show: (courseId: string, lessonId: string) => `/${courseId}/lesson/${lessonId}`,
    store: (courseId: string) => `/course/${courseId}/lesson/store`
}


// GET - courses

export const getCourses = (): Promise<CourseType[]> =>
    apiRequest<CourseType[]>(CourseApi.index, { method: 'GET' });

export const getDetailCourse = (courseId: string): Promise<CourseType> =>
    apiRequest<CourseType>(CourseApi.show(courseId), { method: 'GET' });

export const getDeletedCourses = (): Promise<CourseType[]> =>
    apiRequest<CourseType[]>(CourseApi.showDeleted, { method: 'GET' });

export const getManagedCourses = async (): Promise<CourseType[]> => {
    try {
        const currentUser = await getCurrentUser();
        return currentUser?.created_courses || [];
    } catch (error) {
        console.error('Fail to get managed courses: ', error);
        return [];
    }
}

export const getEnrolledCourses = async (): Promise<CourseType[]> => {
    try {
        const currentUser = await getCurrentUser();
        return currentUser?.enrolled_courses || [];
    } catch (error) {
        console.error('Fail to get enrolled courses: ', error);
        return [];
    }
}


// GET - lessons 

export const getLessons = (courseId: string): Promise<LessonType[]> =>
    apiRequest(LessonApi.index(courseId), { method: 'GET' }); 

export const getDetailLesson = (courseId: string, lessonId: string): Promise<LessonType> =>
    apiRequest(LessonApi.show(courseId, lessonId), { method: 'GET' }); 


// POST - courses 

export const postCreateCourse = (data: NewCourseType): Promise<void> =>
    apiRequest(CourseApi.store, { method: 'POST', body: data });


// POST - lessons 

export const postCreateLesson = (courseId: string, data: NewLessonType): Promise<void> =>
    apiRequest(LessonApi.store(courseId), { method: 'POST', body: data });


// PATCH

export const patchDeleteCourse = async (courseId: string): Promise<void> => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser._id) {
            throw new Error('Fail to authenticate');
        }

        const deletedData = {
            deleted_at: Date.now(),
            deleted_by: currentUser._id
        }

        await apiRequest<void>(CourseApi.delete(courseId), {
            method: 'PATCH',
            body: deletedData
        })
    } catch (error) {
        console.error('Fail to delete course: ', error);
        throw error;
    }
}

export const patchRestoreCourse = (courseId: string): Promise<void> =>
    apiRequest(CourseApi.restore(courseId), { method: 'PATCH' })

export const patchEditCourse = (courseId: string, data: EditCourseType): Promise<void> =>
    apiRequest(CourseApi.edit(courseId), { method: 'PATCH', body: data });


// PUT
