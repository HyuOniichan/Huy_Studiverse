import { apiRequest } from ".";
import { CourseType } from "@/types";
import { getCurrentUser } from "./users";

const CourseApi = {
    index: '/course',
    show: (courseId: string) => `/course/${courseId}/`,
    showDeleted: '/course/deleted',
    store: '/course/store',
    delete: (courseId: string) => `/course/${courseId}/delete`,
    restore: (courseId: string) => `/course/${courseId}/restore`
}


// GET 

export const getCourses = () => apiRequest<CourseType[]>(CourseApi.index, { method: 'GET' });

export const getDetailCourse = (courseId: string) => apiRequest<CourseType>(CourseApi.show(courseId), { method: 'GET' });

export const getDeletedCourses = () => apiRequest<CourseType[]>(CourseApi.showDeleted, { method: 'GET' });

export const getManagedCourses = async () => {
    try {
        const currentUser = await getCurrentUser();
        return currentUser?.created_courses || [];
    } catch (error) {
        console.error('Fail to get managed courses: ', error);
        return [];
    }
}

export const getEnrolledCourses = async () => {
    try {
        const currentUser = await getCurrentUser();
        return currentUser?.enrolled_courses || [];
    } catch (error) {
        console.error('Fail to get enrolled courses: ', error);
        return [];
    }
}


// POST

export const postCreateCourse = (data: CourseType) => apiRequest(CourseApi.store, { method: 'POST', body: data });


// PATCH

export const patchDeleteCourse = async (courseId: string) => {
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

export const patchRestoreCourse = async (courseId: string) => apiRequest(CourseApi.restore(courseId), { method: 'PATCH' })


// PUT
