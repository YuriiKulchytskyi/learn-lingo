import style from './Modal.module.scss'

export const Modal = ({window}) => {
  return (
    <section className={style.modalBackdrop}>
        <div className={style.modal}>{window}</div>
    </section>
  )
}
