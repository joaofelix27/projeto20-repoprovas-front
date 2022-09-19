import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./assets/globalstyle";
import Cadastro from "./Register";
import Login from "./Login";
// import UserContext from "./UserContext";

function App() {
//   const [login, setLogin] = useState({});
//   const [chosenProducts, setChosenProducts] = useState([]);
//   const [totalValue, setTotalValue] = useState(0);
//   const [viaCart, setViaCart] = useState(false);

//   const contextValue = {
//     login,
//     setLogin,
//     chosenProducts,
//     setChosenProducts,viaCart,setViaCart,totalValue,setTotalValue
//   };

  return (
    <>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Cadastro />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
