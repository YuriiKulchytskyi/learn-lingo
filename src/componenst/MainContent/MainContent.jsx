import style from "./MainContent.module.scss";

export const MainContent = () => {
  return (
    <section className={style.mainWrapper}>
      <div className={style.getStartedPic}>
        <div className={style.getStarted}>
          <div className={style.textWrapper}>
            <h2>Unlock your potential with the best {' '}<span>language</span>{' '}tutors
</h2>

            <p>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
          </div>
          <button>Get started</button>
        </div>
        <div className={style.pic}></div>
      </div>
      <ul className={style.descList}>
        <li>32,000+ <p>Experienced tutors</p></li>
        <li>300,00+ <p>5-star tutor reviews</p></li>
        <li>120+ <p>Subjects taught</p></li>
        <li>200+ <p>Tutor nationalities</p></li>
      </ul>
    </section>
  );
};
