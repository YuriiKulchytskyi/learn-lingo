import { useState } from "react";
import style from "./RegistrationForm.module.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";

export const RegistrationForm = ({ onClick }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, {
          displayName: name,
        });
      })
      .then(() => {
        console.log("User registered and name updated.");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.error("Registration error:", error.message));

      onClick()
  };

  return (
    <form className={style.registrationWrapper} onSubmit={handleRegister}>
      <button className={style.closeBtn} onClick={onClick}>
        X
      </button>

      <div className={style.descriptionWrapper}>
        <h2>Registration</h2>
        <p>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>

      <div className={style.inputWrapper}>
        <label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={style.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </p>
        </label>
      </div>

      <button className={style.submitButton} type="submit">
        Sign Up
      </button>
    </form>
  );
};
