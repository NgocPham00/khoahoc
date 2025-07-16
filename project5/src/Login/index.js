import { useDispatch } from "react-redux";
import { setCookie } from "../helpers/cookie";
import { login } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { checklogin } from "../actions/login";
import "./login.css";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);
    if (response.length > 0) {
      console.log(response);
      setCookie("id", response[0].id, 1);
      setCookie("fullname", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      dispatch(checklogin(true));
      navigate("/topics");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <div className="login-input-group">
          <input className="login-input" type="email" placeholder="Nhập email" />
        </div>
        <div className="login-input-group">
          <input className="login-input" type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button className="login-button">Login</button>
      </form>
    </>
  );
}

export default Login;