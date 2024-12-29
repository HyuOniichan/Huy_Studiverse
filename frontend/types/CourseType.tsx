import { UserType } from "./UserType";

export type CourseType = {
    _id: string; 
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
    creator: UserType; 
    lessons: LessonType[]; 
    deleted_by: UserType | null, 
    deleted_at: Date | null; 
    createdAt: Date;
    updatedAt: Date;
}

export type NewCourseType = {
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
    creator: string; 
    lessons: string[]; 
}

export type EditCourseType = {
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
}

export type LessonType = {
    _id: string; 
    title: string;
    description: string;
    thumbnail: string; 
    video_url: string; 
    content: string; 
    course: CourseType;
    order: number; 
    deleted_by: UserType | null, 
    deleted_at: Date | null; 
    createdAt: Date;
    updatedAt: Date;
}

export type NewLessonType = {
    title: string;
    description: string;
    thumbnail: string; 
    video_url: string; 
    content: string; 
    order: number; 
}

export type EditLessonType = {
    title: string;
    description: string;
    thumbnail: string; 
    video_url: string; 
    content: string; 
    order: number; 
}
