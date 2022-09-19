import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import qs from "query-string";
import logo from "./assets/images/logo.png";
import { useEffect } from "react/cjs/react.development";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  console.log(process.env.REACT_APP_BACKEND_URL,process.env.REACT_APP_CLIENT_ID,process.env.REACT_APP_URL)
  useEffect(()=>{
    setToken(localStorage.getItem("loginData"));
    console.log(token)
        if(token){
        console.log("Esse é seu token",token)
          navigate("/logadocomsucesso");
        }
        
    },[token,setToken]);

  function fazerLogin(event) {
    event.preventDefault();

    if (email !== "") {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/sign-in`;
      const profileData = {
        email: email,
        password: senha,
      };
      const promise = axios.post(URL, profileData);
      promise
        .then((response) => {
          const { data } = response;
          const strLoginData = JSON.stringify(data);
          window.localStorage.setItem("loginData", strLoginData);
          setToken(strLoginData)
          navigate("/teste");
        })
        .catch((err) => {
          alert("Erro no Login, dados incorretos!");
        });
    }
  }
  function logarGithub() {
    const GitHub_Url = "https://github.com/login/oauth/authorize";
    const params = {
      response_type: "code",
      scope: "user",
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_URL,
    };

    const querystrings = qs.stringify(params);
    const authURL = `${GitHub_Url}?${querystrings}`;
    window.location.href = authURL;
  }

  window.onload = async () => {
    const { code } = qs.parseUrl(window.location.href).query;
    if (code) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/sign-in/github`,
          { code }
        );

        const user = response.data;
        const strLoginData = JSON.stringify(user);
        window.localStorage.setItem("loginData", strLoginData);
        setToken(strLoginData)
      } catch (error) {
        alert("Deu ruim");
        console.log(error);
      }
    }
  };

  function montarFormularioLogin() {
    return (
      <>
        <h1 className="label">Login</h1>
        <button className="gitHub" type="submit" onClick={() => logarGithub()}>
          ENTRAR COM O GITHUB
        </button>
        <form>
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <button type="submit">Entrar</button>
        </form>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <h1>Primeira vez? Cadastre-se!</h1>
        </Link>
      </>
    );
  }

  const formularioLogin = montarFormularioLogin();
  return (
    <Container>
      <Header>
        <div>
          <img src={logo} />
        </div>
      </Header>

      <FormularioLogin onSubmit={fazerLogin}>{formularioLogin}</FormularioLogin>
    </Container>
  );
}
export default Login;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin-top: 55px;
  img {
    width: 250px;
  }
  margin-bottom: 240px;
`;
const FormularioLogin = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .label {
    font-family: Poppins;
    font-size: 24px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.15px;
    margin-bottom: 40px;
  }
  .gitHub {
    height: 56px;
    width: 464px;
    border-radius: 4px;
    background: #424445;
    font-family: Roboto;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.4px;
    color:#FAFAFA;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
       button {
    height: 44px;
    width: 88px;
    border-radius: 4px;
    box-shadow: 0px 1px 5px 0px #0000001f;
    box-shadow: 0px 2px 2px 0px #00000024;
    box-shadow: 0px 3px 1px -2px #00000033;
    background-color: #1976D2;
    font-family: Roboto;
    color:#fafafa;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.4000000059604645px;
    margin-bottom: 32px;
    width:100%
  }
  }

  input {
    height: 56px;
    width: 464px;
    font-family: Poppins;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.15px;
    margin-bottom: 10px;
    padding: 12px;
    border: 1px solid #878787;
    border-radius: 5px;
  }
  button {
    border: 0px;
    background-color: #ea8b1c;
    height: 46px;
    width: 326px;
    border-radius: 5px;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 23px;
    letter-spacing: 0em;
    color: #000000;
    margin-bottom: 32px;
  }
  h1 {
    font-family: Raleway;
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    color: #000000;
    text-align: center;
  }
`;
