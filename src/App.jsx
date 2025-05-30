import { useState } from "react";
import style from "./App.module.scss";
import { TeacherList } from "./componenst/TeacherList/TeacherList";
import { Modal } from "./componenst/Modal/Modal";
import { RegistrationForm } from "./componenst/RegistrationForm/RegistrationForm";
import { LogInForm } from "./componenst/LogInForm/LogInForm";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalWindow, setModalWindow] = useState(null)

  const handleCloseModal = () => {
    setOpenModal(false)
    setModalWindow(null);
  };

  const handleOpenLogInModal = () => {
    setModalWindow(<LogInForm onClick={handleCloseModal}/>)
    setOpenModal(true)
  }

  const handleOpenRegistrationModal = () => {
    setModalWindow(<RegistrationForm onClick={handleCloseModal}/>)
    setOpenModal(true);
  };


  return (
    <main className={style.app}>
      <button onClick={handleOpenRegistrationModal}>Registration</button>
      <button onClick={handleOpenLogInModal}>Log In</button>
      <TeacherList />

      {openModal && <Modal window={modalWindow} />}
    </main>
  );
}

export default App;
