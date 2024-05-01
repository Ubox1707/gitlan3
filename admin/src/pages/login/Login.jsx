import {useContext, useState} from "react"
import { AuthContext } from "../../context/AuthContext"
import "./login.scss"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = ()=> {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const { loading,error,dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials);
            if(res.data.isAdmin){
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details});
              navigate("/home")
            }else{
              dispatch({type: "LOGIN_FAILURE", 
              payload:{message: "Bạn không được phép vào trang này!!!"},
            });
        }
    } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload:err.response.data})
    }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <h1>Đăng nhập</h1>
                <input 
                    type="text" 
                    placeholder="Tên tài khoản" 
                    id="username" 
                    onChange={handleChange} 
                    className="lInput" 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Mật khẩu" 
                    id="password" 
                    onChange={handleChange} 
                    className="lInput" 
                    required
                />
                
                <button disabled={loading} onClick={handleClick} className="lButton">Đăng nhập</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
  )
};

export default Login
