import { useState } from "react";
import style from "./LogInForm.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { setAuth } from "../../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const LogInForm = ({ onClick }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        onClick();
        dispatch(setAuth());
        localStorage.setItem("isAuth", "true");

        toast.success(`Welcome ${email}`);
      })
      .catch((error) => {
        console.error("Error", error);
        setEmail("");
        setPassword("");
        toast.error("Entrance error");
      });
  };



  return (
    <form className={style.registrationWrapper}>
      <button className={style.closeBtn} onClick={onClick}>
        X
      </button>
      <div className={style.descriptionWrapper}>
        <h2>Log In</h2>
        <p>
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>
      <div className={style.inputWrapper}>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg>
            <use></use>
          </svg>
        </label>
      </div>
      <button className={style.submitButton} onClick={handleLogIn}>
        Log In
      </button>
    </form>
  );
};
