import "./navbar.css"
import {Link, useHistory} from "react-router-dom"
import { useContext } from "react";
import { AuthContext  } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (event) => {
    try {
      // Kiểm tra class name của nút được nhấn
      if (event.target.classList.contains("btnLogin")) {
        // Điều hướng đến trang đăng nhập
        navigate("/login");
      } else if (event.target.classList.contains("btnRegister")) {
        // Điều hướng đến trang đăng ký
        navigate("/register");
      }
    } catch (err) {}
  };
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
        <span className="logo">HotelBooking</span>
        </Link>
        {user ? (
        <div className="navItems">
          <div className="username">Xin chào, {user.username}</div>
          <button className="btnLogOut">Đăng xuất</button>
        </div>
        )  : (
        <div className="navItems">
          <button className="btnRegister" onClick={handleClick}>Đăng ký</button>
          <button className="btnLogin" onClick={handleClick}>Đăng nhập</button>
        </div>
      )}
      </div>
    </div>
  )
}

export default Navbar