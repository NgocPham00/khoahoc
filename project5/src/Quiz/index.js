import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../services/topicService";
import { getQuestion, getAnswers } from "../services/question"; // Add getAnswers here
import { getCookie } from "../helpers/cookie";
import { createAnswer } from "../services/quizServices";
import "./quizz.css";

function Quiz() {
  const params = useParams();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestion, setDataQuestion] = useState([]);
  const [result, setResult] = useState(null); // State to hold result
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy chủ đề
  useEffect(() => {
    const fetchTopic = async () => {
      const response = await getTopic(params.id);
      setDataTopic(response);
    };
    fetchTopic();
  }, [params.id]);

  // Lấy danh sách câu hỏi
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestion(params.id);
      setDataQuestion(response);
    };
    fetchQuestions();
  }, [params.id]);

  // Xử lý nộp bài
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedAnswers = [];

    // Lặp qua các radio đã chọn
    for (let i = 0; i < e.target.elements.length; i++) {
      const el = e.target.elements[i];
      if (el.checked && el.type === "radio") {
        const name = el.name; // ví dụ: "question-3"
        const questionId = parseInt(name.split("-")[1]); // lấy số 3
        const answer = parseInt(el.value);

        selectedAnswers.push({
          questionId,
          answer,
        });
      }
    }

    if (selectedAnswers.length === 0) {
      alert("Vui lòng chọn ít nhất một đáp án!");
      setLoading(false);
      return;
    }

    const payload = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };

    try {
      const response = await createAnswer(payload);
      console.log("Server response:", response);

      if (response && response.id) {
        // Fetch result data instead of navigating
        const resultData = await fetchResult(response.id);
        setResult(resultData);
      } else {
        alert("Gửi bài thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đáp án:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm lấy dữ liệu kết quả
  const fetchResult = async (id) => {
    const dataAnswers = await getAnswers(id); // Now defined
    const topicId = dataAnswers.topicId;
    const dataQuestions = await getQuestion(topicId);
    return dataQuestions.map((question) => {
      const userAnswer = dataAnswers.answers.find(
        (ans) => Number(ans.questionId) === Number(question.id)
      );
      return {
        ...question,
        selectedAnswer: userAnswer?.answer ?? null,
      };
    });
  };

  return (
    <>
      <h2>Bài Quiz thuộc chủ đề: {dataTopic && dataTopic.name}</h2>
      <div className="form-quiz">
        {!result ? (
          <form onSubmit={handleSubmit}>
            {dataQuestion.map((item, index) => (
              <div className="form-quiz__item" key={item.id}>
                <p>
                  Câu {index + 1}: {item.question}
                </p>
                {item.answers.map((itemAns, indexAns) => (
                  <div className="form-quiz__ans" key={indexAns}>
                    <input
                      type="radio"
                      name={`question-${item.id}`}
                      value={indexAns}
                      id={`quiz-${item.id}-${indexAns}`}
                    />
                    <label htmlFor={`quiz-${item.id}-${indexAns}`}>
                      {itemAns}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" disabled={loading}>
              {loading ? "Đang nộp..." : "Nộp bài"}
            </button>
          </form>
        ) : (
          <div>
            <h2>Kết quả bài làm</h2>
            {result.map((item, index) => (
              <div className="form-quiz__item" key={item.id}>
                <p>
                  Câu {index + 1}: {item.question}{" "}
                  {item.selectedAnswer === null ? (
                    <span>Không trả lời</span>
                  ) : item.correctAnswer === item.selectedAnswer ? (
                    <span>✅ Đúng</span>
                  ) : (
                    <span>❌ Sai</span>
                  )}
                </p>
                {item.answers.map((itemAns, indexAns) => (
                  <div className="form-quiz__ans" key={indexAns}>
                    <input
                      type="radio"
                      checked={item.selectedAnswer === indexAns}
                      disabled
                    />
                    <label>{itemAns}</label>
                    {indexAns === item.correctAnswer && (
                      <span style={{ color: "green" }}>(Đáp án đúng)</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Quiz;