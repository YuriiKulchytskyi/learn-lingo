import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiLogout } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import style from "./AuthDetails.module.scss";

export const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        dispatch(setAuth());
        localStorage.setItem("isAuth", "true");
      } else {
        setAuthUser(null);
        dispatch(clearAuth());
        localStorage.removeItem("isAuth");
      }
    });

    return () => {
      listen();
    };
  }, [dispatch]);

  const userSignedOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out");
        navigate("/");
      })

      .catch((error) => console.error(error.message));
  };

  return (
    <>
      {authUser && (
        <div className={style.buttons}>
          <button onClick={() => navigate(`/user/${authUser.uid}`)}>
            <IoPerson />
          </button>
          <button onClick={userSignedOut}>
            <CiLogout /> Log Out
          </button>
        </div>
      )}
    </>
  );
};
