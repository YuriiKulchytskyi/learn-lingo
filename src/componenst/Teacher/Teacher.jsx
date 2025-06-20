import { useState } from "react";
import style from "./Teacher.module.scss";
import { Review } from "./Review";
import { useSelector } from "react-redux";
import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";

import { auth } from "../../firebase";

export const Teacher = ({ teacher = {}, teacherId }) => {
  const {
    like = false,
    avatar_url = "",
    name = "",
    surname = "",
    lessons_done = 0,
    rating = 0,
    price_per_hour = 0,
    languages = [],
    lesson_info = "",
    conditions = [],
    experience = "",
    reviews = [],
    levels = [],
  } = teacher;

  const user = auth.currentUser;

  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(like);

  const loggedIn = useSelector((state) => state.auth.auth);

  const handleOpen = () => setOpen(!open);

  const handleLikeToggle = async () => {
    if (user) {
      try {
        const newLikeStatus = !liked;
        const teacherRef = ref(database, `teachers/${teacherId}`);
        await update(teacherRef, { like: newLikeStatus });
        setLiked(newLikeStatus);
      } catch (error) {
        console.error("Like", error);
      }
    }
    else{
      alert('Log in first')
    }
  };

  return (
    <div className={style.teacherWrapper}>
      <div className={style.teacherImgWrapper}>
        <div className={style.teacherImg}>
          <img src={avatar_url} loading="lazy" alt={`${name} ${surname}`} />
        </div>
      </div>
      <div className={style.teacherInfoWrapper}>
        <div className={style.nameProductivity}>
          <div className={style.name}>
            <p className={style.p}>Language</p>
            <h2 className={style.teacherName}>
              {name} {surname}
            </h2>
          </div>

          <div className={style.productivity}>
            <ul className={style.productivityList}>
              <li>
                <FiBookOpen />
                Lessons online
              </li>
              <li>Lessons done: {lessons_done}</li>
              <li>
                <FaStar style={{ fill: "yellow" }} />
                Rating: {rating}
              </li>
              <li>
                Price / 1 hour: {price_per_hour}
                <span>$</span>
              </li>
            </ul>
            <button className={style.heartBtn} onClick={handleLikeToggle}>
              {liked ? <FaHeart /> : <CiHeart />}
            </button>
          </div>
        </div>
        <ul className={style.teacherInfo}>
          <li>
            <span>Speaks: </span>
            <span className={style.underlinedSpan}>
              {Array.isArray(languages) && languages.length > 0
                ? languages.join(", ")
                : "none"}
            </span>
          </li>
          <li>
            <span>Lesson Info:</span> {lesson_info || "No info"}
          </li>
          <li>
            <span>Conditions:</span>{" "}
            {Array.isArray(conditions) && conditions.length > 0
              ? conditions.join(" ")
              : "none"}
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
                {experience || "No experience info"}
              </p>

              <ul className={style.reviews}>
                {Array.isArray(reviews) && reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <li key={index}>
                      <Review review={review} />
                    </li>
                  ))
                ) : (
                  <li>No reviews yet</li>
                )}
              </ul>
            </div>
          )}
          <div className={style.commentsWrapper}></div>
        </div>
        <div className={style.leveslBook}>
          <ul className={style.levels}>
            {Array.isArray(levels) && levels.length > 0 ? (
              levels.map((level) => (
                <li key={level}>
                  <span>#{level}</span>
                </li>
              ))
            ) : (
              <li>No levels specified</li>
            )}
          </ul>
          {open && (
            <button
              className={loggedIn ? style.book : style.bookLight}
              disabled={!loggedIn}
            >
              {loggedIn ? `Book trial lesson` : `Log in first`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
