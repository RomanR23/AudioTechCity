import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducer";

function Register() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const dispatch = useDispatch();

  function register() {
    axios
      .post("/api/auth/register", { username, firstname, lastname, password })
      .then((res) => {
        if (res.data.username) {
          history.push("/");
          window.location.reload();
          dispatch(updateUser(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register-container-main">
      <div className="register-content-box">
        <div>
          <p>Register</p>
        </div>

        <div className="register-inputs-div">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></input>
          <input
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></input>
          <input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="register-signIn-div">
          <button onClick={() => register()}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
