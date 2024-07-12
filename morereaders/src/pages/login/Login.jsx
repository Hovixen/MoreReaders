import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
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
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
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