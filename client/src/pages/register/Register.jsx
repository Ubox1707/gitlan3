import {useContext, useState} from "react"
import {AuthContext} from "../../context/AuthContext";
import "./register.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Register = ()=> {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined,
    });
    const { loading,error,dispatch } = useContext(AuthContext);


    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async (e) =>{
        e.preventDefault();
        dispatch({type: "REGISTER_START"});
        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data});
            navigate("/login")
        } catch (err) {
            dispatch({type: "REGISTER_FAILURE", payload:err.response.data})
            
        }
    }

    return (
        <div className="register">
            <div className="rContainer">
                <h1>Đăng ký</h1>
                <input 
                    type="text" 
                    placeholder="Tên tài khoản" 
                    id="username" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Mật khẩu" 
                    id="password" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Email" 
                    id="email" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                
                <button disabled={loading} onClick={handleClick} className="rButton">Đăng ký</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
  )
};

export default Register
