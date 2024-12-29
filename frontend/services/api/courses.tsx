import { apiRequest } from ".";
import {
    CourseType, NewCourseType, EditCourseType, 
    LessonType, NewLessonType, EditLessonType,
} from "@/types";
import { getCurrentUser } from "./users";

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
    show: (courseId: string, lessonId: string) => `/course/${courseId}/lesson/${lessonId}`,
    showDeleted: (courseId: string) => `/course/${courseId}/lesson/deleted`,
    store: (courseId: string) => `/course/${courseId}/lesson/store`, 
    delete: (courseId: string, lessonId: string) => `/course/${courseId}/lesson/${lessonId}/delete`,
    restore: (courseId: string, lessonId: string) => `/course/${courseId}/lesson/${lessonId}/restore`,
    edit: (courseId: string, lessonId: string) => `/course/${courseId}/lesson/${lessonId}`
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

export const getDeletedLessons = (courseId: string): Promise<LessonType[]> =>
    apiRequest(LessonApi.showDeleted(courseId), { method: 'GET' }); 

export const getDetailLesson = (courseId: string, lessonId: string): Promise<LessonType> =>
    apiRequest(LessonApi.show(courseId, lessonId), { method: 'GET' }); 


// POST - courses 

export const postCreateCourse = (data: NewCourseType): Promise<void> =>
    apiRequest(CourseApi.store, { method: 'POST', body: data });


// POST - lessons 

export const postCreateLesson = (courseId: string, data: NewLessonType): Promise<void> =>
    apiRequest(LessonApi.store(courseId), { method: 'POST', body: data });


// PATCH - courses 

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


// PATCH - lessons 

export const patchDeleteLesson = async (courseId: string, lessonId: string): Promise<void> => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser._id) {
            throw new Error('Fail to authenticate');
        }

        const deletedData = {
            deleted_at: Date.now(),
            deleted_by: currentUser._id
        }

        await apiRequest<void>(LessonApi.delete(courseId, lessonId), {
            method: 'PATCH',
            body: deletedData
        })
    } catch (error) {
        console.error('Fail to delete lesson: ', error);
        throw error;
    }
}

export const patchRestoreLesson = (courseId: string, lessonId: string): Promise<void> =>
    apiRequest(LessonApi.restore(courseId, lessonId), { method: 'PATCH' })

export const patchEditLesson = (courseId: string, lessonId: string, data: EditLessonType): Promise<void> =>
    apiRequest(LessonApi.edit(courseId, lessonId), { method: 'PATCH', body: data });


// PUT
