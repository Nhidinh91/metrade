import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Logo from "./../../src/assets/logo.png";
import Frown from "./../../src/assets/frown.png";
import "../Styles/VerifyFail.css";

const checkValidEmail = (string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@metropolia.fi$/;
  return emailRegex.test(string);
};

const containNotExist = (string) => {
  return string.toLowerCase().trim().includes("does not exist");
};

const containVerified = (string) => {
  return string.toLowerCase().trim().includes("already verified");
};
// const containFail = (string) => {
//   return string.toLowerCase().trim().includes("fail");
// };

const EMAIL_ERROR = "not valid email";
const NO_EMAIL_ERROR = "missing email";

const VerifyFail = () => {
  const location = useLocation(); // to get path info
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const emailQr = queryParams.get("email");
  const messageQr = queryParams.get("message") || "";
  // const statusQr = queryParams.get("status");
  console.log(queryParams.get("message"));
  // console.log(queryParams.get("mes"))
  // console.log("emailQr", emailQr);
  const [email, setEmail] = useState(emailQr);
  const [validEmail, setValidEmail] = useState(emailQr !== null);
  const [error, setError] = useState(messageQr || "");
  const [needRegister, setNeedRegister] = useState(
    containNotExist(messageQr) || false
  );
  const [needLogin, setNeedLogin] = useState(false);
  // console.log("email", email);
  // console.log("valid", needRegister);

  const emailObj = { email };

  const handleEmailChange = (event) => {
    setEmail((e) => event.target.value);
    if (checkValidEmail(event.target.value)) {
      setValidEmail((ve) => true);
    } else {
      setValidEmail((ve) => false);
    }
  };

  const handleClick = async () => {
    try {
      setError("");
      setNeedRegister(false);
      console.log("checking email", checkValidEmail(email));
      console.log("valid email", validEmail);
      //having this check so that I do not need to setEmail('') after submit form
      // if (checkValidEmail(email) === false && validEmail === false) {
      if (validEmail === false) {
        if (!email) {
          setError(NO_EMAIL_ERROR);
        }
        // console.log(email);
        setError(EMAIL_ERROR);
      } else {
        console.log("sending link");
        const response = await fetch(
          "http://127.0.0.1:3000/api/auth/register/resend",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailObj),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          console.log(data);
          // setEmail((e) => "");
          // setValidEmail((ve) => false);
          // setNeedRegister((nr) => false);
          throw new Error(data.message || "Something went wrong");
        } else {
          console.log("data: ", data);
          navigate("/confirm-sent");
        }
      }
    } catch (err) {
      console.error("Error during registration", err);
      setError((e) => err.message);
      if (containNotExist(err.message)) {
        setNeedRegister((ne) => true);
      }
      if (containVerified(err.message)) {
        setNeedLogin((cv) => true);
      }
    }
  };
  return (
    <div className="verify-fail-container">
      <div className="verify-fail-icon">
        <img src={Logo} alt="metrade-icon" />
      </div>
      <div className="verify-fail-content">
        <div className="fail-icon">
          <img src={Frown} alt="frown-icon" />
        </div>
        <h2>Verification Failed!</h2>
        {error != "" && (
          <>
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              <p className="signup-error-item">
                {error}{" "}
                {needRegister && (
                  <span>
                    <Link to="/signup">Register</Link>
                  </span>
                )}
                {needLogin && (
                  <span>
                    <Link to="/login">Login</Link>
                  </span>
                )}
              </p>
            </Alert>
          </>
        )}
        <p>Please type in your email and click Resend button to try again</p>
        <input
          value={email}
          type="email"
          name="email"
          id="resend-email"
          onChange={handleEmailChange}
        />
        <div className="verify-button">
          <button onClick={handleClick}>RESEND</button>
        </div>
      </div>
    </div>
  );
};
export default VerifyFail;
