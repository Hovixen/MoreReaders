import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import "./reg.scss";


const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const regSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/signup', {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
      });

      if (res.status === 201){
        navigate('/login')
      } else {
        setErrorMsg(res.data.message)
      }
    } catch (error) {
      console.error(`There was an error registering ${error}`)
      setErrorMsg('An unexpected error occured.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>SignUp</h1>
          { errorMsg && <div className="error-message">{errorMsg}</div> }
          <form onSubmit={regSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              required
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <input 
              type="text"
              placeholder="Last Name"
              value={last_name}
              required
              onChange={(e) => setLast_name(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username" value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <button type="submit" disabled={loading}>
              { loading ? <CircularProgress size={24} color="inherit"/> : "Signup" }</button>
          </form>

          <span>Already have an account?
          <Link to="/login">Login
          </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;