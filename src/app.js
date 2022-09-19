import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./assets/globalstyle";
import Cadastro from "./Register";
import Login from "./Login";

function App() {
  return (
    <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Cadastro />} />
            <Route path="/" element={<Login />} />
            <Route path="/logadocomsucesso"  />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
