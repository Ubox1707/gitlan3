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

        // Kiểm tra ô nhập và xử lý các điều kiện
        const name = document.getElementById('username').value;
        const pass = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const country = document.getElementById('country').value;
        const city = document.getElementById('city').value;
        const phone = document.getElementById('phone').value;
        //Lỗi
        const nameError = document.getElementById('username-error');
        const passError = document.getElementById('pass-error');
        const emailError = document.getElementById('email-error');
        const countryError = document.getElementById('country-error');
        const cityError = document.getElementById('city-error');
        const phoneError = document.getElementById('phone-error');

        //Set error
        nameError.textContent = '';
        passError.textContent = '';
        emailError.textContent = '';
        countryError.textContent = '';
        cityError.textContent = '';
        phoneError.textContent = '';
        

        if (!name) {
            nameError.textContent = 'Vui lòng nhập tên tài khoản.';
            nameError.style.display = 'block';
            return;
        }
        if (!pass) {
            passError.textContent = 'Vui lòng nhập mật khẩu.';
            passError.style.display = 'block';
            return;
        }


        if (!email) {
            emailError.textContent = 'Vui lòng nhập email.';
            emailError.style.display = 'block';
            return;
        }
        if (!country) {
            countryError.textContent = 'Vui lòng nhập quốc gia.';
            countryError.style.display = 'block';
            return;
        }
        if (!city) {
            cityError.textContent = 'Vui lòng nhập thành phố.';
            cityError.style.display = 'block';
            return;
        }
        if (!phone) {
            phoneError.textContent = 'Vui lòng nhập số điện thoại.';
            phoneError.style.display = 'block';
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = 'Email không hợp lệ.';
            emailError.style.display = 'block';
            return;
        }

        

        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            phoneError.textContent = 'Số điện thoại không hợp lệ.';
            phoneError.style.display = 'block';
            return;
        }
        dispatch({type: "REGISTER_START"});
        try {
            const res = await axios.post("/auth/register", credentials);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data});
            navigate("/login");
            console.log();
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
                <span id="username-error" class="error-message"></span>
                <input 
                    type="password" 
                    placeholder="Mật khẩu" 
                    id="password" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <span id="pass-error" class="error-message"></span>
                <input 
                    type="text" 
                    placeholder="Email" 
                    id="email" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <span id="email-error" class="error-message"></span>
                <input 
                    type="text" 
                    placeholder="Quốc Gia" 
                    id="country" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <span id="country-error" class="error-message"></span>
                <input 
                    type="text" 
                    placeholder="Thành phố" 
                    id="city" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <span id="city-error" class="error-message"></span>
                <input 
                    type="text" 
                    placeholder="Số điện thoại" 
                    id="phone" 
                    onChange={handleChange} 
                    className="rInput" 
                    required
                />
                <span id="phone-error" class="error-message"></span>
                
                <button disabled={loading} onClick={handleClick} className="rButton">Đăng ký</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
  )
};

export default Register
