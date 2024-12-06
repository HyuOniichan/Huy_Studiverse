import { CourseType } from "./CourseType";

export type UserType = {
    _id: string;
    about: string;
    avatar: string;
    username: string;
    email: string;
    role: 'admin' | 'teacher' | 'student', 
    created_courses: CourseType[];
    enrolled_courses: CourseType[];
    createdAt: Date;
    updatedAt: Date;
}