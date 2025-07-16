import { get } from "../utils/request";

export const getListProduct = async () => {
    return await get('/products');
};

export const getProduct = async (id) => {
    return await get(`/products/${id}`);
};
