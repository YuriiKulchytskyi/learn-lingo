import style from "./Teacher.module.scss";

export const Teacher = ({teacher}) => {
  return (
    <div className={style.teacherWrapper}>
      <div className={style.teacherImgWrapper}>
        <div className={style.teacherImg}>
          <img src={teacher.avatar_url} alt={teacher.name} />
        </div>
      </div>
      <div className={style.teacherInfoWrapper}>
        <div className={style.nameProductivity}>
          <div className={style.name}>
            <p className={style.p}>Language</p>
            <h2 className={style.teacherName}>{teacher.name}</h2>
          </div>
          <ul>
            <li>
              <svg>
                <use></use>
              </svg>
              Lessons online
            </li>
            <li>Lessons done: </li>
            <li>Rating: </li>
            <li>
              Price / 1 hour: <span>$</span>
            </li>
          </ul>
          <button className={style.heartBtn}></button>
        </div>
        <ul>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <span></span>
          </li>
        </ul>
        <div>
          <p className={style.description}></p>
          <div className={style.commentsWrapper}></div>
        </div>
        <div>
          <ul>
            <ul>{}</ul>
          </ul>
          <button className={style.book}>Book trial lesson</button>
        </div>
      </div>
    </div>
  );
};
