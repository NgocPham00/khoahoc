import { useEffect, useState } from "react";
import { getListProduct } from "../services/productService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavorite, isFavorite, removeFavorite } from "../utils/favorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./topic.css";
import Chatbot from "../Chatbot";

function Topic() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [favoriteIds, setFavoriteIds] = useState(new Set()); // State để theo dõi ID sản phẩm yêu thích

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListProduct();
      setProducts(response);

      // Khởi tạo danh sách yêu thích từ localStorage hoặc utils
      const initialFavorites = response
        .filter((item) => isFavorite(item.id))
        .map((item) => item.id);
      setFavoriteIds(new Set(initialFavorites));
    };
    fetchApi();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === "lt500") matchesPrice = item.price < 500000;
    if (priceFilter === "500to1m")
      matchesPrice = item.price >= 500000 && item.price <= 1000000;
    if (priceFilter === "gt1m") matchesPrice = item.price > 1000000;

    return matchesSearch && matchesPrice;
  });

  const handleFavoriteClick = (item) => {
    const itemId = item.id;
    if (favoriteIds.has(itemId)) {
      // Xóa khỏi yêu thích
      removeFavorite(itemId);
      setFavoriteIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
      toast.info("Đã bỏ khỏi yêu thích!");
    } else {
      // Thêm vào yêu thích
      addFavorite(item);
      setFavoriteIds((prev) => new Set(prev).add(itemId));
      toast.success("Đã thêm vào yêu thích!");
    }
  };

  return (
    <>
      <div className="home-container">
        <h2>Danh sách khóa học</h2>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">Tất cả giá</option>
            <option value="lt500">Dưới 500K</option>
            <option value="500to1m">500K - 1 triệu</option>
            <option value="gt1m">Trên 1 triệu</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.image} alt={item.name} className="product-img" />
                <h4>{item.name}</h4>
                <p className="price">{item.price.toLocaleString()} VND</p>
                <p className="shortDescription">
                  Mô tả: {item.shortDescription.toLocaleString()}
                </p>
                <div className="action-row">
                  <Link to={`/course/${item.id}`} className="btn-detail">
                    Xem chi tiết
                  </Link>
                  <button
                    className={`btn-favorite ${favoriteIds.has(item.id) ? "active" : ""}`}
                    onClick={() => handleFavoriteClick(item)}
                    title={
                      favoriteIds.has(item.id) ? "Bỏ yêu thích" : "Thêm yêu thích"
                    }
                  >
                    {favoriteIds.has(item.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Không tìm thấy khóa học phù hợp.</p>
        )}
      </div>
      <Chatbot products={products} /> {/* ✅ Tích hợp Chatbot */}
    </>
  );
}

export default Topic;