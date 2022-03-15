import React from "react";
import "./App.css";
import NavBar from "./components/nav-bar";
import Services from "./components/services";
import Transactions from "./components/transactions";
import Welcome from "./components/welcome";
import Footer from "./components/footer";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
}

export default App;
