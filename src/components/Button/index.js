import styles from "./Button.module.scss";

function Button({ imgUrl = "", text = "", ...rest }) {
  return (
    <button className={styles.button} {...rest}>
      {String(imgUrl).length > 0 ? <img src={imgUrl} alt="button" /> : null}
      {String(text).length > 0 ? <h2>{text}</h2> : null}
    </button>
  );
}

export default Button;
