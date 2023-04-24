import styles from "./Button.module.scss";

function Button({ imgUrl = "", text = "" }) {
  return (
    <div className={styles.button}>
      {String(imgUrl).length > 0 ? <img src={imgUrl} alt="button" /> : null}
      {String(text).length > 0 ? <h2>{text}</h2> : null}
    </div>
  );
}

export default Button;
