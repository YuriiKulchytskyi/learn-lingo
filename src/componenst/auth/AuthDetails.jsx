import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { setAuth, clearAuth } from "../../redux/auth/authSlice";

export const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();

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
      .then(() => console.log("Signed out"))
      .catch((error) => console.error(error.message));
  };

  return (
    <>
      {authUser && (
        <div>
          <p>{authUser.email}</p>
          <button onClick={userSignedOut}>Sign Out</button>
        </div>
      )}
    </>
  );
};
