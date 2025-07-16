// services/suggestionService.js

import { getFavorites } from "../utils/favorites";

// Giả lập API call trả về gợi ý sản phẩm dựa trên hành vi người dùng hoặc danh sách mock
export const getSuggestions = async (userId) => {
    // Danh sách mock sản phẩm
    const allProducts = [
        {
            id: 1,
            name: "Khóa học TOEIC 800+",
            price: 450000,
            image: "https://gdcenglish.edu.vn/wp-content/themes/tkw/images/mb/img11.png",
            shortDescription: "Ôn luyện TOEIC cấp tốc",
            rating: 4.3,
        },
        {
            id: 2,
            name: "Lập trình React từ A-Z",
            price: 1200000,
            image: "https://tse3.mm.bing.net/th/id/OIP.hD3NhUXSYHYKIMiLW7ueEwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            shortDescription: "Học lập trình React bài bản",
            rating: 4.8,
        },
        {
            id: 7,
            name: "Khóa học Machine Learning",
            price: 2000000,
            image: "https://tse3.mm.bing.net/th/id/OIP.kCzIpbPx6wehFPhxpz72bgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            shortDescription: "Học Machine Learning từ A-Z",
            rating: 4.9,
        },
        {
            id: 21,
            name: "Khóa học Tailwind CSS từ A-Z",
            price: 250000,
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjEi3Jia8hxRxZAhqDQRbkhn89RYBdM7UdphBp_KLk3CQYVy-gwdWtG5M5dWGny5geVKMpNfJMcxJk7r8OFiZjM9RhgK-vF9jrqsj0-NczmOUNvAoxF1i9Zb8zB9eizaawniKKpZu_Jr-vXAop-5oYjE_B3T574PfnPvaaMLHESb9zZBpFVkeokzPV/s1244/Tailwind%20CSS.png",
            shortDescription: "Thiết kế web hiện đại với Tailwind CSS",
            rating: 4.5,
        },
        {
            id: 5,
            name: "Khóa học Data Analysis",
            price: 1500000,
            image: "https://tse3.mm.bing.net/th/id/OIP.Hh8S-curDuciLKPEWpxv8AHaEc?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
            shortDescription: "Phân tích dữ liệu với Python",
            rating: 4.6,
        },
    ];

    // Mô phỏng delay API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Lấy danh sách sản phẩm đã yêu thích của user
    const favorites = getFavorites();

    // Nếu user đã có sản phẩm yêu thích, gợi ý các sản phẩm chưa có với rating cao
    if (favorites.length > 0) {
        const favoriteIds = favorites.map(item => item.id);
        const suggestions = allProducts
            .filter(item => !favoriteIds.includes(item.id))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
        return suggestions;
    }

    // Nếu user chưa yêu thích sản phẩm nào, gợi ý mặc định 3 sản phẩm phù hợp
    return [
        allProducts[3], // Tailwind CSS
        allProducts[1], // React
        allProducts[2], // Machine Learning
    ];
};
