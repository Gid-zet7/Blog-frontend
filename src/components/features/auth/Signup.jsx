import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useSignupMutation } from "./authApiSlice";
import { PulseLoader } from "react-spinners";

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await signup({
        username,
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      navigate("/login");
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
  const handleFirstnameInput = (e) => setFirstname(e.target.value);
  const handleLastnameInput = (e) => setLastname(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  // const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "errMsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#BADA55"} />;

  const content = (
    <section id="signup__form">
      <div>
        <h1>Sign up</h1>
      </div>
      <div>
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <form id="auth_form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="first_name">First name:</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            ref={userRef}
            value={firstname}
            onChange={handleFirstnameInput}
            autoComplete="off"
            required
          />

          <label htmlFor="last_name">Last name:</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            ref={userRef}
            value={lastname}
            onChange={handleLastnameInput}
            autoComplete="off"
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            className={`form__input`}
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePwdInput}
            required
          />

          <button>Sign In</button>
        </form>
        <div>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </section>
  );

  return content;
};

export default Signup;
