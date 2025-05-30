import style from './LogInForm.module.scss'

export const LogInForm = ({ onClick }) => {
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
          <input type="email" name="email" placeholder="Email" />
        </label>
        <label>
          <input type="password" name="password" placeholder="Password" />
          <svg>
            <use></use>
          </svg>
        </label>
      </div>
      <button className={style.submitButton}>Log In</button>
    </form>
  );
};
