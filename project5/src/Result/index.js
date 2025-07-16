import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";
import "./productDetailPage.css";
import { addViewHistory } from "../utils/viewHistory";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);

        // ✅ Thêm lịch sử xem ngay sau khi lấy dữ liệu thành công
        addViewHistory({
          id: data.id,
          name: data.name,
          price: data.price,
          image: data.image,
          shortDescription: data.shortDescription,
          rating: data.rating,
        });

      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchApi();
  }, [id]);

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Không tìm thấy sản phẩm.</p>;
  }

  if (!product) {
    return <p style={{ textAlign: "center" }}>Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-card animate-slide-up">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-img"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=No+Image"; }}
        />
        <div className="product-detail-content">
          <h2>{product.name}</h2>
          <p className="product-detail-price">{product.price.toLocaleString()} VND</p>
          <p className="product-detail-rating">⭐ {product.rating}/5</p>
          <p className="product-detail-description">{product.longDescription}</p>
          <button className="btn-back" onClick={() => navigate(-1)}>🔙 Quay lại</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
