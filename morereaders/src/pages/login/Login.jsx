import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <div className="login">
      <div className="left">
      <h1>Welcome to MoreReaders!</h1>
      <h2>Post, read and download your Favourite books for free!</h2>
      </div>
      <div className="card">
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <span>Don't have an account?
          <Link to="/register">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;