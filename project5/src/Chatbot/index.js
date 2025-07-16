import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";

function Chatbot({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Chào bạn, bạn muốn tìm khóa học nào hôm nay?" },
  ]);

  const messagesEndRef = useRef(null);

  // Tự động scroll xuống tin nhắn mới nhất
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Mock logic phản hồi
    const lower = input.trim().toLowerCase();
    const found = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.shortDescription.toLowerCase().includes(lower) ||
        (p.longDescription?.toLowerCase() || "").includes(lower)
    );

    let botReply;
    if (found.length > 0) {
      botReply = `🔍 Mình gợi ý cho bạn:\n${found
        .slice(0, 3)
        .map((p) => `👉 ${p.name} (${p.price.toLocaleString()} VND)`)
        .join("\n")}`;
    } else {
      botReply =
        "😢 Xin lỗi, mình chưa tìm thấy khóa học phù hợp với từ khóa bạn nhập.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 300);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
             AI Tư Vấn Sản Phẩm
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <label htmlFor="chatbotInput">Nhập nội dung:</label>
            <input
              id="chatbotInput"
              type="text"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬 Chat AI
        </button>
      )}
    </div>
  );
}

export default Chatbot;
