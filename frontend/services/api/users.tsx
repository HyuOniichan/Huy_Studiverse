import { UserType } from "@/types";
import { apiRequest } from ".";

const UserApi = {
    index: '/user',
    show: '/user/all',
    showOne: (username: string) => `/user/${username}`
}

export const getCurrentUser = (): Promise<UserType> => apiRequest<UserType>(UserApi.index, { method: 'GET' });

export const getUser = (username: string): Promise<UserType> => apiRequest<UserType>(UserApi.showOne(username), { method: 'GET' });

export const getAllUsers = (): Promise<UserType[]> => apiRequest<UserType[]>(UserApi.show, { method: 'GET' }); 
