import { get, post } from "../utils/request"; // Import đúng hàm post

export const login = async (email, password) => {  
    const result = await get(`/users?email=${email}&password=${password}`);  
    return result;
};
export const register = async (option) => {  
    const result = await post(`/users`, option);  
    return result;
};
export const checkExists = async (key, value) => {  
    const result = await get(`/users?${key}=${value}`);  
    return result;
};
