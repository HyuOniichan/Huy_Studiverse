import { CourseType } from "./CourseType";
import { UserType } from "./UserType";

export type EnrollmentType = {
    _id: string, 
    course_id: CourseType, 
    student_id: UserType, 
    progress: string, 
    completed_datetime: string, 
    deleted_by: UserType | null, 
    deleted_at: Date | null; 
    createdAt: Date;
    updatedAt: Date;
}

export type NewEnrollmentType = {
    courseId: string,
    studentId: string
};

export type EditEnrollmentType = {
    progress: [],
    completed_datetime: null,
    deleted_by: null,
    deleted_at: null,
};
