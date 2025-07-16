import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../utils/favorites";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getSuggestions } from "../services/suggestionService";
import "./favorites.css";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setFavorites(getFavorites());
    }, []);

    const handleRemove = (id) => {
        removeFavorite(id);
        setFavorites(getFavorites());
        toast.info("Đã xóa khỏi yêu thích!");
    };

    const handleGetSuggestions = async () => {
        const userId = "user123"; // hardcode userId
        const data = await getSuggestions(userId);
        setSuggestions(data);
        toast.success("Đã tải gợi ý sản phẩm!");
    };

    return (
        <div className="home-container">
            <h2>Sản phẩm yêu thích</h2>

            {favorites.length > 0 ? (
                <div className="product-grid">
                    {favorites.map(item => (
                        <div className="product-card" key={item.id}>
                            <img src={item.image} alt={item.name} className="product-img" />
                            <h3>{item.name}</h3>
                            <p className="price">{item.price.toLocaleString()} VND</p>
                            <p className="shortDescription">{item.shortDescription}</p>
                            <div className="btn-group">
                                <Link to={`/course/${item.id}`} className="btn-detail">Xem chi tiết</Link>
                                <button onClick={() => handleRemove(item.id)} className="btn-remove">❌</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center", marginBottom: "20px" }}>Chưa có sản phẩm yêu thích.</p>
            )}

            <button onClick={handleGetSuggestions} className="btn-suggest">
                 Gợi ý sản phẩm phù hợp
            </button>

            {suggestions.length > 0 && (
                <>
                    <h2 style={{ marginTop: "30px" }}>Gợi ý cho bạn</h2>
                    <div className="product-grid">
                        {suggestions.map(item => (
                            <div className="product-card" key={item.id}>
                                <img src={item.image} alt={item.name} className="product-img" />
                                <h3>{item.name}</h3>
                                <p className="price">{item.price.toLocaleString()} VND</p>
                                <p className="shortDescription">{item.shortDescription}</p>
                                <div className="btn-group">
                                    <Link to={`/course/${item.id}`} className="btn-detail">Xem chi tiết</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Favorites;
