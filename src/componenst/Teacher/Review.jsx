import style from './Teacher.module.scss'

export const Review = ({ review }) => {
  return (
    <div className={style.reviewWrapper}>
      <div className={style.reviewerInfo}>
        <div className={style.reviewer}>
          {review.reviewer_name[0].toUpperCase()}
        </div>
        <div className={style.reviewerDetails}>
          <p>{review.reviewer_name}</p>
          <p>⭐️{review.reviewer_rating}</p>
        </div>
      </div>
      <div className={style.reviewerComment}>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};
