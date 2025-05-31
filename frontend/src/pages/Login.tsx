import { useState } from "react";
import "../styles/Login.css"; // Adjust the path as necessary
import gitHubLogo from "../assets/github.svg"; // Adjust the path as necessary
import telegramLogo from "../assets/telegram.svg"; // Adjust the path as necessary
import googleLogo from "../assets/google.svg"; // Adjust the path as necessary
import gitLubLogo from "../assets/gitlab.svg"; // Adjust the path as necessary

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div
      style={{
        width: "90%",

        maxWidth: "450px",
      }}
    >
      {isSignIn ? (
        <div className="container">
          <div className="heading">Sign In</div>
          <form action="" className="form">
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            <input className="login-button" type="submit" value="Sign In" />
          </form>
          <span style={{ textAlign: "center" }}>
            <p className="text" style={{ fontSize: "12px" }}>
              Don't have an account?
            </p>
            <div onClick={() => setIsSignIn(false)} className="signup-link">
              Sign Up
            </div>
          </span>
          <div className="social-account-container">
            <span className="title">Or Sign in with</span>
            <div className="social-accounts">
              <button className="social-button google">
                <img src={googleLogo} style={{ width: "100%" }} />
              </button>
              <button className="social-button apple">
                <img src={gitLubLogo} style={{ width: "100%" }} />
              </button>
              <button className="social-button twitter">
                <img src={gitHubLogo} style={{ width: "100%" }} />
              </button>
            </div>
          </div>
          <span className="agreement">
            <a href="#">Learn user licence agreement</a>
          </span>
        </div>
      ) : (
        <div className="container">
          <div className="heading">Sign Up</div>
          <form action="" className="form">
            <input
              className="input"
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              className="input"
              type="password"
              name="password"
              id="password"
              placeholder="Repeat Password"
            />
            <span className="forgot-password">
              <a href="#">Forgot Password ?</a>
            </span>
            <input className="login-button" type="submit" value="Sign Up" />
          </form>
          <span style={{ textAlign: "center" }}>
            <p className="text" style={{ fontSize: "12px" }}>
              Already have an account?
            </p>
            <div onClick={() => setIsSignIn(true)} className="signup-link">
              Sign In
            </div>
          </span>
          <div className="social-account-container">
            <span className="title">Or Sign up with</span>
            <div className="social-accounts">
              <button className="social-button google">
                <img src={googleLogo} style={{ width: "100%" }} />
              </button>
              <button className="social-button apple">
                <img src={gitLubLogo} style={{ width: "100%" }} />
              </button>
              <button className="social-button twitter">
                <img src={gitHubLogo} style={{ width: "100%" }} />
              </button>
            </div>
          </div>
          <span className="agreement">
            <a href="#">Learn user licence agreement</a>
          </span>
        </div>
      )}
    </div>
  );
}

export default Login;
