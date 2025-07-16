// utils/viewHistory.js

const KEY = "viewHistory";

// Lấy danh sách đã xem
export const getViewHistory = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
};

// Thêm 1 sản phẩm đã xem
export const addViewHistory = (product) => {
    const current = getViewHistory();

    // Kiểm tra trùng
    if (!current.find(item => item.id === product.id)) {
        const updated = [product, ...current].slice(0, 20); // chỉ giữ 20 sản phẩm gần nhất
        localStorage.setItem(KEY, JSON.stringify(updated));
    }
};

// Xoá lịch sử
export const clearViewHistory = () => {
    localStorage.removeItem(KEY);
};
