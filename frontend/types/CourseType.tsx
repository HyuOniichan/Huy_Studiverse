import { UserType } from "./UserType";

export type LessonType = {
    _id: string; 
    title: string;
    description: string;
    thumbnail: string; 
    video_url: string; 
    content: string; 
    course: CourseType;
    order: number; 
    createdAt: Date;
    updatedAt: Date;
}

export type CourseType = {
    _id: string; 
    title: string;
    description: string;
    price: string;
    thumbnail: string;
    tags: string[];
    creator: UserType; 
    lessons: LessonType[]; 
    createdAt: Date;
    updatedAt: Date;
}