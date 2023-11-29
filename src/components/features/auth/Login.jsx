import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";
import usePersist from "../../../hooks/usePersist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [persist, setPersist] = usePersist();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash/welcome");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errMsg" : "offscreen";

  if (isLoading)
    return (
      <div className="loader-container">
        <PulseLoader color={"#000"} className="pulse-loader" />
      </div>
    );

  const content = (
    <section
      id="login"
      className="auth"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form id="login_form" onSubmit={handleSubmit}>
          <div id="auth_header">
            <h1>Login</h1>
          </div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordInput}
            required
          />

          <button id="auth__btn" className="btn">
            Log In <FontAwesomeIcon icon={faSignIn} color="#fff" />
          </button>

          <label id="persist" htmlFor="persist">
            <input
              name="persist"
              type="checkbox"
              checked={persist}
              onChange={handleToggle}
            />
            Trust this Device
          </label>

          <div className="auth__container">
            Don't have an account yet?
            <Link to="/signup"> sign up</Link>
          </div>

          <div className="home-link__container">
            <Link to="/">Back to Home</Link>
          </div>
        </form>
      </div>
      <footer>
        <div className="about-footer">
          <h4>About Bincika</h4>
          <h6>About us</h6>
          <h6>Our mission</h6>
        </div>
        <div className="contact-footer">
          <h4>Contact us</h4>
          <h6>Advertise</h6>
          <h6>Whatsapp</h6>
          <h6>Email</h6>
        </div>
      </footer>
    </section>
  );

  return content;
};

export default Login;
