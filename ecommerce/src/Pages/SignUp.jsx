import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import Logo from "./../../src/assets/logo.png";
import Eye1 from "./../../src/assets/eye.png";
import Eye2 from "./../../src/assets/eye.jpg";
import "../Styles/SignUp.css";

const ERROR_NAME = "Missing Name";
const ERROR_PASSWORD = "Password need to be more than 8 characters";
const ERROR_EMAIL = "Must use Metropolia email";

const checkValidEmail = (string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@metropolia.fi$/;
  return emailRegex.test(string);
};

const checkValidPassword = (string) => {
  return string.length >= 8;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [errors, setErrors] = useState([]);

  const handleName = (e) => {
    // console.log(e);
    setName((n) => e.target.value);
    if (e.target.value != "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };

  const handleEmail = (event) => {
    setEmail((e) => event.target.value);
    if (checkValidEmail(event.target.value)) {
      setValidEmail((ve) => true);
    } else {
      setValidEmail((ve) => false);
    }
  };
  const handlePassword = (e) => {
    setPassword((p) => e.target.value);
    if (checkValidPassword(e.target.value)) {
      setValidPassword((vp) => true);
    } else {
      setValidPassword((vp) => false);
    }
  };

  const isvalidForm = () => {
    setErrors((e) => []);
    let check = true;
    if (!validName) {
      setErrors((e) => [...e, ERROR_NAME]);
      check = false;
    }
    if (!validEmail) {
      setErrors((e) => [...e, ERROR_EMAIL]);
      check = false;
    }
    if (!validPassword) {
      setErrors((e) => [...e, ERROR_PASSWORD]);
      check = false;
    }
    return check;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = isvalidForm();

    if (isValid) {
      const newUser = {
        name,
        email,
        password,
      };
      console.log(newUser);
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          console.log(response);
          setEmail((e) => "");
          setPassword((p) => "");
          setName((n) => "");
          setValidEmail((ve) => false);
          setValidName((vn) => false);
          setValidPassword((vp) => false);
          throw new Error(data.message || "Something went wrong");
        } else {
          console.log("data: ", data);
          navigate("/");
        }
      } catch (err) {
        console.error("Error during registration:", err);
        setErrors((e) => [...e, err.message]);
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-icon">
        <img src={Logo} alt="metrade-logo" />
      </div>
      {errors.length > 0 && (
        <Alert variant="danger" onClose={() => setErrors([])} dismissible>
          {errors.map((error, index) => {
            return (
              <p className="signup-error-item" key={index}>
                {error}
              </p>
            );
          })}
        </Alert>
      )}
      <div className="signup-form-container">
        <div className="signup-title">
          <h2>Get Started!</h2>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="signup-name"
              onChange={handleName}
              value={name}
            />
          </div>
          <div className="signup-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="signup-email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="signup-item">
            <label htmlFor="password">Pasword</label>
            <div className="password-container">
              <input
                type={passwordType}
                name="password"
                id="signup-password"
                onChange={handlePassword}
                value={password}
              />
              {/* <span>
                <img
                  src={Eye2}
                  alt="eye"
                  className="signup-eye"
                  onClick={handleShowPassWord}
                />
              </span> */}
            </div>
            {/* <i
              className="fa fa-eye"
              id="togglePassword"
              style="cursor: pointer"
            ></i> */}
          </div>
          <div className="signup-submit">
            <button type="submit" className="signup-btn">
              SIGN UP
            </button>
          </div>
        </form>
        <div className="signin-text">
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login" className="signin-link">
                <strong>Sign in</strong>
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
