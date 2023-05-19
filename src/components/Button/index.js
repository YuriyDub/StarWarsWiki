import styles from "./Button.module.scss";

function Button({ imgUrl = "", text = "", disabled = false }) {
  return (
    <button className={styles.button} disabled={disabled}>
      {String(imgUrl).length > 0 ? <img src={imgUrl} alt="button" /> : null}
      {String(text).length > 0 ? <h2>{text}</h2> : null}
    </button>
  );
}

export default Button;
