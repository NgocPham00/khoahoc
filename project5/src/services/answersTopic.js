import { getCookie } from "../helpers/cookie";
import { get } from "../utils/request";

export const getAnswers = async () => { 
    const userId = parseInt(getCookie("id"));
    if (isNaN(userId)) return [];
    
    const result = await get(`/answers?userId=${userId}`);  
    return result;
}
