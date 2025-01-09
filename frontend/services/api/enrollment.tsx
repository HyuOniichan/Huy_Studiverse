import { apiRequest } from ".";
import {
    EnrollmentType, NewEnrollmentType, EditEnrollmentType,
} from "@/types";
import { getCurrentUser } from "./users";

const EnrollmentApi = {
    index: '/enrollment',
    show: (courseId: string, studentId: string) => `/enrollment/${courseId}/${studentId}`,
    store: `/enrollment/store`,
    update: (courseId: string, studentId: string) => `/enrollment/${courseId}/${studentId}`,
    delete: (courseId: string, studentId: string) => `/enrollment/${courseId}/${studentId}/delete`,
    updateComplete: (courseId: string, studentId: string) => `/enrollment/${courseId}/${studentId}/complete`,
}


// GET 

export const getEnrollment = (): Promise<EnrollmentType[]> =>
    apiRequest<EnrollmentType[]>(EnrollmentApi.index, { method: 'GET' });

export const getDetailEnrollment = (courseId: string, studentId: string): Promise<EnrollmentType> =>
    apiRequest<EnrollmentType>(EnrollmentApi.show(courseId, studentId), { method: 'GET' });


// POST

export const postCreateEnrollment = (data: NewEnrollmentType): Promise<void> =>
    apiRequest(EnrollmentApi.store, { method: 'POST', body: data });


// PATCH

export const patchDeleteCourse = async (courseId: string, studentId: string): Promise<void> => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser._id) {
            throw new Error('Fail to authenticate');
        }

        const deletedData = {
            deleted_at: Date.now(),
            deleted_by: currentUser._id
        }

        await apiRequest<void>(EnrollmentApi.delete(courseId, studentId), {
            method: 'PATCH',
            body: deletedData
        })
    } catch (error) {
        console.error('Fail to delete enrollment: ', error);
        throw error;
    }
}

export const patchCompleteCourse = async (courseId: string, studentId: string): Promise<void> => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser._id) {
            throw new Error('Fail to authenticate');
        }

        const completedData = {
            completed_datetime: Date.now()
        }

        await apiRequest<void>(EnrollmentApi.delete(courseId, studentId), {
            method: 'PATCH',
            body: completedData
        })
    } catch (error) {
        console.error('Fail to update enrollment - complete course: ', error);
        throw error;
    }
}

export const patchEditCourse = (courseId: string, studentId: string, data: EditEnrollmentType): Promise<void> =>
    apiRequest(EnrollmentApi.update(courseId, studentId), { method: 'PATCH', body: data });
