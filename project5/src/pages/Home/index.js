import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #dbeafe)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", color: "#1d4ed8", fontWeight: "700" }}>
        🎓 Học Lập Trình Cùng Chúng Tôi
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "500px", color: "#374151", marginTop: "12px" }}>
        Nâng cao kỹ năng lập trình của bạn với các khóa học từ cơ bản đến nâng cao, học qua dự án thực tế.
      </p>

      <img
        src="https://cdn-icons-png.flaticon.com/512/4369/4369728.png"
        alt="Learning"
        style={{ width: "220px", marginTop: "30px" }}
      />

      <button
        onClick={() => navigate("/topics")}
        style={{
          marginTop: "30px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        🚀 Khám phá các khóa học
      </button>

      <div style={{ marginTop: "40px", maxWidth: "600px" }}>
        <h3 style={{ fontSize: "20px", color: "#1e40af", fontWeight: "600" }}>
          📚 Các chủ đề bạn có thể học:
        </h3>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            fontSize: "16px",
            color: "#374151",
            marginTop: "16px",
            lineHeight: "1.8",
          }}
        >
          <li>✔️ HTML & CSS từ Cơ bản đến Nâng cao</li>
          <li>✔️ JavaScript và ReactJS Thực Chiến</li>
          <li>✔️ Python cho Phân Tích Dữ Liệu</li>
          <li>✔️ Git, GitHub và Quản Lý Dự Án</li>
          <li>✔️ SQL và Quản Trị Cơ Sở Dữ Liệu</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
