import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checklogin } from "../actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteAllCookies(); // ✅ Xóa cookie trong effect
    dispatch(checklogin(false)); // ✅ Gửi action với false
    navigate("/login");
  }, [dispatch, navigate]); // ✅ Thêm dependency để tránh warning

  return <></>;
}

export default Logout;
