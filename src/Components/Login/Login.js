import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  function login() {
    axios
      .post("/api/auth/login", { username, password })
      .then((res) => {
        if (res.data.username) {
          history.push("/");
          window.location.reload();
          dispatch(updateUser(res.data));
        } else {
          alert("Username or Password Incorrect!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login-container-main">
      <div className="login-content-box">
        <div>
          <p>Log In</p>
        </div>

        <div className="login-inputs-div">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="login-signIn-div">
          <button onClick={() => login()}>Sign In</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
