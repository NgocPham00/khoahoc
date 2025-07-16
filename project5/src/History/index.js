// pages/ViewHistory.js

import { useState, useEffect } from "react";
import { getViewHistory, clearViewHistory } from "../utils/viewHistory";

function ViewHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getViewHistory());
    }, []);

    const handleClear = () => {
        clearViewHistory();
        setHistory([]);
    };

    return (
        <div className="home-container">
            <h2>Lịch sử xem</h2>
            {history.length > 0 ? (
                <>
                    <button className="btn-clear" onClick={handleClear}>Xoá lịch sử</button>
                    <div className="product-grid">
                        {history.map(item => (
                            <div key={item.id} className="product-card">
                                <img src={item.image} alt={item.name} className="product-img" />
                                <h3>{item.name}</h3>
                                <p className="price">{item.price.toLocaleString()} VND</p>
                                <p className="shortDescription">{item.shortDescription}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Bạn chưa xem sản phẩm nào.</p>
            )}
        </div>
    );
}

export default ViewHistory;
