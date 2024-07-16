import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("")
    const result = await login(email, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
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
          { error && <p className="error">{error}</p> }
          <form onSubmit={handleLogin}>
            <input 
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              required
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