import React from "react";

import LoginButton  from "./components/LoginButton/LoginButton";
import LoginInput  from "./components/LoginInput/LoginInput";

import logo from "../../../assets/logo.png";

import './Login.css';

class Login extends React.Component {
    render() {
        return (
            <div className="white-container">
                <>
                    <img src={logo} alt="RAS Logo" className="ras-logo"/>
                    <div className="input-column">
                        <LoginInput type="text" placeholder="Usuário" maxLength={35}/>
                        <LoginInput type="password" placeholder="Senha" maxLength={20}/>
                    </div>
                    <LoginButton/>
                </>
            </div>
            
        );
    }
}

export default Login;