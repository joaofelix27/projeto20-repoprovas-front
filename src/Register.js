import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./assets/images/logo.png";


export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaconf, setSenhaconf] = useState("");
  const navigate = useNavigate();

  function fazerCadastro(event) {
    event.preventDefault();
    if (senha !== senhaconf) {
      alert("Senhas não conferem");
      return;
    }
    if (email !== "") {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/sign-up`;
      const profileData = {
        email: email,
        password: senha,
        confirmedPassword:senhaconf
      };
      const promise = axios.post(URL, profileData);
      promise
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            alert("E-mail cadastrado!");
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert("E-mail já cadastrado!");
          } else if (err.response.status === 408) {
            alert("CPF já cadastrado!");
          } else {
            alert("Erro no cadastro!");
          }
        });
    }
  }

  function montarFormularioCadastro() {
    return (
      <>
        <form>
        <h1 className="label">Cadastro</h1>
          <input
            type="email"
            required
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            required
            placeholder="Senha"
            minLength={10}
            onChange={(e) => setSenha(e.target.value)}
          ></input>
          <input
            type="password"
            required
            placeholder="Confirme a senha"
            minLength={10}
            onChange={(e) => setSenhaconf(e.target.value)}
          ></input>
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Já tem uma conta? Entre agora!</h1>
        </Link>
      </>
    );
  }

  const formularioCadastro = montarFormularioCadastro();
  return (
    <Container>
      <Header>
      <div>
          <img src={logo} />
        </div>
      </Header>
      <FormularioCadastro onSubmit={fazerCadastro}>
        {formularioCadastro}
      </FormularioCadastro>
    </Container>
  );
}
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
const FormularioCadastro = styled.div`
  form {
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
