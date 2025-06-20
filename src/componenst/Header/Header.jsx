import { useState } from "react";
import style from "./Header.module.scss";
import { Modal } from "../Modal/Modal";
import { RegistrationForm } from "../auth/RegistrationForm/RegistrationForm";
import { LogInForm } from "../auth/LogInForm/LogInForm";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CiLogin } from "react-icons/ci";

import { AuthDetails } from "../auth/AuthDetails";
import { database } from "../../firebase";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalWindow, setModalWindow] = useState(null);

  const isLoggedIn = useSelector((state) => state.auth.auth);

  console.log(database);

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalWindow(null);
  };

  const modals = {
    registration: <RegistrationForm onClick={handleCloseModal} />,
    login: <LogInForm onClick={handleCloseModal} />,
  };
  const handleOpenLogInModal = () => {
    setModalWindow("login");
    setOpenModal(true);
  };

  const handleOpenRegistrationModal = () => {
    setModalWindow("registration");
    setOpenModal(true);
  };
  return (
    <header className={style.header}>
      <div className={style.logoMenu}>
        <div className={style.logo}>
          <div className={style.logoCircle}>
            <div className={style.one}></div>
            <div className={style.two}></div>
          </div>
          LearnLingo
        </div>
        <nav>
          <Link to="/">home</Link>
          <Link to="/teachers">teachers</Link>
        </nav>
      </div>
      <div className={style.buttons}>
        {!isLoggedIn ? (
          <>
            <button onClick={handleOpenLogInModal} className={style.logIn}>
              <CiLogin /> Log in
            </button>
            <button
              onClick={handleOpenRegistrationModal}
              className={style.registration}
            >
              Registration
            </button>
          </>
        ) : (
          <AuthDetails />
        )}
      </div>
      {openModal && <Modal window={modals[modalWindow]} />}
    </header>
  );
};
