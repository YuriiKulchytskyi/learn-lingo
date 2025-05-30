import style from "./RegistrationForm.module.scss";

export const RegistrationForm = ({onClick}) => {
  return (
    <form className={style.registrationWrapper}>
        <button className={style.closeBtn} onClick={onClick}>X</button>
      <div className={style.descriptionWrapper}>
        <h2>Registration</h2>
        <p>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
      </div>
      <div className={style.inputWrapper}>
        <label>
          <input type="text" name="name" autoFocus placeholder="Name" />
        </label>
        <label>
          <input type="email" name="email" placeholder="Email" />
        </label>
        <label>
          <input type="password" name="password" placeholder="Password" />
          <svg>
            <use></use>
          </svg>
        </label>
      </div>
      <button className={style.submitButton}>Sign Up</button>
    </form>
  );
};
