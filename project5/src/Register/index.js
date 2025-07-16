import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generateToken } from "../helpers/generateToken";
import { checkExists, register } from "../services/userService";
import { checklogin } from "../actions/login";
import "./register.css";
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullName = e.target[0].value.trim();
        const email = e.target[1].value.trim();
        const password = e.target[2].value.trim();

        const checkExistsEmail = await checkExists("email", email);
        if (checkExistsEmail.length > 0) {
            alert("Email đã tồn tại");
            return;
        }

        const options = {
            fullName,
            email,
            password,
            token: generateToken(),
        };

        const response = await register(options);
        if (response > 0) {
            dispatch(checklogin(true));
            navigate("/login");
        } else {
            alert("Đăng ký không thành công");
        }
    };

    return (
        <>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-title">Register</h2>
                <div className="register-input-group">
                    <input className="register-input" type="text" placeholder="Nhập họ tên" required />
                </div>
                <div className="register-input-group">
                    <input className="register-input" type="email" placeholder="Nhập email" required />
                </div>
                <div className="register-input-group">
                    <input className="register-input" type="password" placeholder="Nhập mật khẩu" required />
                </div>
                <button className="register-button" type="submit">Đăng ký</button>
            </form>
        </>
    );
}

export default Register;