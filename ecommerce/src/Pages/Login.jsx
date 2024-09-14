import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "../../src/Styles/Login.css";
import Logo from "../../src/assets/logo.png";
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuthContext();

  if (user){
    navigate("/")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Form validation
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@metropolia.fi$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      setLoading(false);
      return;
    }

    try {
      // Call your backend API
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email and password to backend
      });

      const data = await response.json();

      if (response.ok) {
        signIn(data.user);

        navigate("/");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-image">
        <img src={Logo} alt="logo" />
      </div>
      <div className="signin-form-container">
        <h2 className="signin-title">Sign in</h2>
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}
        <Form className="signin-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="signin-label">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your metropolia email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signin-input"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="signin-label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signin-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="signin-button">
            {loading ? <Spinner animation="border" size="sm" /> : "Sign in"}
          </Button>
        </Form>

        <div className="signin-footer">
          <div className="help-text">
            <span>New to Metrade?</span>
          </div>
          <Button className="signup-button">Create your Metrade account</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;