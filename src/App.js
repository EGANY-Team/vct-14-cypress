import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { NavBar } from "./components";
import Routes from "./routes";

function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const _auth = localStorage.getItem("vct-14");

    if (_auth && typeof _auth === "string" && _auth.trim().length > 0) {
      try {
        const auth = JSON.parse(_auth);
        setAuth(auth);
      } catch (error) {
        console.log(error);
        setAuth(null);
      }
    } else {
      setAuth(null);
    }
  }, []);

  if (typeof auth === "undefined") return null;
  return (
    <BrowserRouter>
      {auth && <NavBar setAuth={setAuth} />}
      <Routes auth={auth} setAuth={setAuth} />
    </BrowserRouter>
  );
}

export default App;
