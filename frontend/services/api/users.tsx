import { UserType } from "@/types";
import { apiRequest } from ".";

const UserApi = {
    index: '/user',
    show: '/user/all',
    showOne: (username: string) => `/user/${username}`
}

export const getCurrentUser = () => apiRequest<UserType>(UserApi.index, { method: 'GET' });

export const getUser = (username: string) => apiRequest<UserType>(UserApi.showOne(username), { method: 'GET' });

export const getAllUsers = () => apiRequest<UserType[]>(UserApi.show, { method: 'GET' }); 
