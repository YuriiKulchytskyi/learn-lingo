import { useState } from "react";
import style from "./Teacher.module.scss";
import { Review } from "./Review";
import { useSelector } from "react-redux";

export const Teacher = ({ teacher }) => {
  const [open, setOpen] = useState(false);

  const loggedIn = useSelector((state) => state.auth.auth);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={style.teacherWrapper}>
      <div className={style.teacherImgWrapper}>
        <div className={style.teacherImg}>
          <img src={teacher.avatar_url} loading="lazy" alt={teacher.name} />
        </div>
      </div>
      <div className={style.teacherInfoWrapper}>
        <div className={style.nameProductivity}>
          <div className={style.name}>
            <p className={style.p}>Language</p>
            <h2 className={style.teacherName}>
              {teacher.name} {teacher.surname}
            </h2>
          </div>

          <div className={style.productivity}>
            <ul className={style.productivityList}>
              <li>
                <svg>
                  <use></use>
                </svg>
                Lessons online
              </li>
              <li>Lessons done: {teacher.lessons_done}</li>
              <li>Rating: {teacher.rating}</li>
              <li>
                Price / 1 hour: {teacher.price_per_hour}
                <span>$</span>
              </li>
            </ul>
            <button className={style.heartBtn}>X</button>
          </div>
        </div>
        <ul className={style.teacherInfo}>
          <li>
            <span>Speaks: </span>
            <span className={style.underlinedSpan}>
              {teacher.languages.join(", ")}
            </span>
          </li>
          <li>
            <span>Lesson Info:</span>
            {teacher.lesson_info}
          </li>
          <li>
            <span>Conditions:</span>
            {teacher.conditions.join(" ")}
          </li>
        </ul>
        <div>
          {!open ? (
            <p className={style.readMore} onClick={handleOpen}>
              Read more
            </p>
          ) : (
            <div className={style.descrriptionReviews}>
              <p className={style.description} onClick={handleOpen}>
                {teacher.experience}
              </p>

              <ul className={style.reviews}>
                {teacher.reviews.map((review, index) => (
                  <li key={index}>
                    <Review review={review} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={style.commentsWrapper}></div>
        </div>
        <div className={style.leveslBook}>
          <ul className={style.levels}>
            {teacher.levels.map((level) => (
              <li key={level}>
                <span>#{level}</span>
              </li>
            ))}
          </ul>
          {open && (
            <button className={loggedIn ? style.book : style.bookLight} disabled={!loggedIn}>
              {loggedIn ? `Book trial lesson`: `Log in first` }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
