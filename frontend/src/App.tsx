import { useEffect, useState } from "react";
import "./App.css";
import { HelloService } from "./api";
import type { models_HelloResponse } from "./api/models/models_HelloResponse";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import frontenderImg from "./assets/frontPng.png";
import backenderImg from "./assets/backPng.png";
import goLang from "./assets/goLang.png";
import postgresSql from "./assets/postgresSql.png";
import reactImg from "./assets/react.png";
import tsImg from "./assets/tsImg.png";
import gsapImg from "./assets/gsapImg.png";
import gitHubLogo from "./assets/github.svg";
import Test from "./pages/Test.tsx";
import PartnerFind from "./pages/PartnerFind.tsx";
import Community from "./pages/Community.tsx";
import Profile from "./pages/Profile.tsx";
import mailImg from "./assets/mail.svg";

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

function App() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("Loading...");
  const width = useWidth();
  const [isMailOpen, setIsMailOpen] = useState(false);
  useEffect(() => {
    HelloService.getHello()
      .then((res: models_HelloResponse) =>
        setMessage(res.message || "No message received")
      )
      .catch((err: any) => console.error(err));
  }, []);
  // useEffect(() => {
  //   HelloService.getHello()
  //     .then((res: models_HelloResponse) =>
  //       setMessage(res.message || "No message received")
  //     )
  //     .catch((err: any) => console.error(err));
  // }, []);

  return (
    <div
      style={{
        width: "100%",
        marginTop: "80px",
        marginBottom: "108px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 80,
          borderRadius: "0px 0px 16px 16px",
          backgroundColor: "#083536",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "24px", marginLeft: 24 }}>
          <a href="/" style={{ color: "#ffffff", textDecoration: "none" }}>
            Home
          </a>
          <a
            href="/partner-find"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Find a Partner
          </a>
          <a
            href="/community"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Community
          </a>
        </div>
        <div
          onClick={() => {
            setIsMailOpen(!isMailOpen);
          }}
          style={{
            marginLeft: "auto",
            marginRight: 24,
            position: "relative",
            cursor: "pointer",
          }}
        >
          <img src={mailImg} alt="mail" style={{ height: 58, width: 58 }} />
          <div
            style={{
              position: "absolute",
              top: 35,
              right: 0.5,
              width: 16,
              height: 16,
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          >
            <p className="text" style={{ color: "#ffffff", fontSize: 12 }}>
              1
            </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/profile")}
          style={{ marginLeft: "30px", marginRight: 24 }}
        >
          <img
            style={{ height: 42, aspectRatio: 1 / 1, borderRadius: "50%" }}
            src={frontenderImg}
            alt="logo"
          />
        </div>
      </header>
      {isMailOpen && (
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 0,
            width: 300,
            backgroundColor: "#083536",
            borderRadius: "16px",
          }}
        >
          <p>Mail</p>
        </div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/partner-find" element={<PartnerFind />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={
            <>
              <header>
                <h1>DevMatch</h1>
                <p>
                  Find your perfect dev partner. Team up, collaborate, and build
                  together.
                </p>
                <div className="cta">
                  <a href="/login">Get Started</a>
                </div>
              </header>

              <section className="features">
                <div className="feature">
                  <h2>🔍 Match by Skills</h2>
                  <p>Filter by languages, frameworks, experience, or goals.</p>
                </div>
                <div className="feature">
                  <h2>🤝 Project Partnering</h2>
                  <p>Team up with like-minded devs on real-world ideas.</p>
                </div>
                <div className="feature">
                  <h2>💬 Instant Chat</h2>
                  <p>
                    Built-in real-time chat for fast collaboration and bonding.
                  </p>
                </div>
                <div className="feature">
                  <h2>🌍 Global Community</h2>
                  <p>Connect with developers from around the world, anytime.</p>
                </div>
              </section>
              {message && <h1>{message}</h1>}
            </>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 108,
          borderRadius: "16px 16px 0px 0px",
          backgroundColor: "#083536",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "24px", marginLeft: 24 }}>
          <a
            href="/terms.html"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Terms of Use
          </a>
          <a
            href="/privacy.html"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
          <a
            href="mailto:realpingvinchyk@gmail.com"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Contact Us
          </a>
        </div>

        <div
          onClick={() =>
            window.open("https://github.com/pingvinchyk/pingvinchyk", "_blank")
          }
          className="github-link"
          style={{
            display: "flex",
            gap: "12px",
            marginLeft: 24,
            height: 36,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <img
            src={gitHubLogo}
            alt="GitHub"
            style={{ width: 24, height: 24, marginLeft: 6 }}
          />
          <p className="text" style={{ marginRight: 6 }}>
            Star Project
          </p>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 16,
            height: "100%",
            marginRight: 16,
          }}
        >
          {width > 1080 && (
            <p
              className="text"
              style={{
                color: "#777",
                fontSize: 10,
                transform: "translateY(100%)",
                height: "50%",
              }}
            >
              &copy; 2025 DevMatch. Built by devs, for devs.
            </p>
          )}

          <div
            onClick={() =>
              window.open("https://github.com/Vasyl-Trefilov", "_blank")
            }
            style={{
              display: "flex",
              height: "48px",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={frontenderImg}
              style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
            />
            {width > 1080 && (
              <div>
                <img
                  src={reactImg}
                  style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
                />
                <img
                  src={tsImg}
                  style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
                />
                <img
                  src={gsapImg}
                  style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
                />
              </div>
            )}
            <p className="text">backend dev</p>
          </div>
          <div
            onClick={() =>
              window.open("https://github.com/andrew-pavlov-ua", "_blank")
            }
            style={{
              display: "flex",
              height: "48px",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={backenderImg}
              style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
            />
            {width > 1080 && (
              <div>
                <img
                  src={goLang}
                  style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
                />
                <img
                  src={postgresSql}
                  style={{ width: 32, aspectRatio: 1 / 1, borderRadius: "50%" }}
                />
              </div>
            )}

            <p className="text">backend dev</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
