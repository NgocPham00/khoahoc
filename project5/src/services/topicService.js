import { get, post } from "../utils/request"; // Import đúng hàm post

export const getListTopic = async () => {  
    const result = await get(`/topics`);  
    return result;
}
export const getTopic = async (id) => {  
    const result = await get(`/topics/${id}`);  
    return result;
}