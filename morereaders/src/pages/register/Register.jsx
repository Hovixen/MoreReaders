import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./reg.scss";
import api from '../../api';


const Register = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  
  const regSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await api.post('/signup', {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
      });

      if (res.data.success){
        navigate('/login')
      } else {
        setErrorMsg(res.data.message)
      }
    } catch (error) {
      console.error(`There was an error registering ${error}`)
      setErrorMsg('An unexpected error occured.')
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>SignUp</h1>
          <form onSubmit={regSubmit}>
            <input
              type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirst_name(e.target.value)}
            />
            <input 
              type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLast_name(e.target.value)}
            />
            <input
              type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button>Signup</button>
          </form>

          { errorMsg && <div className="error-message">{errorMsg}</div> }
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