import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import style from "./UserDashboard.module.scss";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [auth]);


const handleDeleteProfile = async () => {
  if (!user) return;

  const confirmDelete = window.confirm("Видалити профіль назавжди?");

  if (!confirmDelete) return;

  try {
    await deleteUser(user);

    toast.success("Профіль повністю видалено.");
    navigate("/");
  } catch (error) {
    console.error("Delete error:", error);
    if (error.code === "auth/requires-recent-login") {
      toast.error("Увійди ще раз, щоб видалити профіль.");
      await signOut(auth);
      navigate("/");
    } else {
      toast.error("Помилка при видаленні.");
    }
  }
};

  if (!user) return <p className={style.loading}>Завантаження...</p>;

  return (
    <div className={style.dashboard}>
      <h1 className={style.title}>👤 Personal room</h1>
      <div className={style.infoWrapper}>
        <div className={style.photo}>
          {user.photoURL ? (
            <div className={style.photoDummy}>
              <img src={user.photoURL} alt="User avatar" />
            </div>
          ) : (
            <div className={style.photoDummy}>
              {user.displayName ? user.displayName[0].toUpperCase() : "U"}
            </div>
          )}
        </div>
        <div className={style.profileInfo}>
          <p>
            <strong>Ім’я:</strong> {user.displayName || "User Name"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "email@example.com"}
          </p>
          <p>
            <strong>UID:</strong> {user.uid}
          </p>
        </div>
      </div>

      <div className={style.buttons}>
        <button className={style.logoutButton} onClick={handleDeleteProfile}>
          🚪 Delete profile
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
