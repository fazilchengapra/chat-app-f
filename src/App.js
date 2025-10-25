import "./App.css";
import Login from "./components/Login";
import { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUserName] = useState("");

  return (
    <div className="App">
      {isLogin ? (
        <Chat username={username} />
      ) : (
        <Login setIsLogin={setIsLogin} setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
