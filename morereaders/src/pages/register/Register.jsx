import { Link } from "react-router-dom";
import "./reg.scss";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>SignUp</h1>
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Signup</button>
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