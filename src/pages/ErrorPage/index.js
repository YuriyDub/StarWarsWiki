import styles from "./ErrorPage.module.scss";
import errorImage from "@icons/error-404.png";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <img src={errorImage} alt="NetworkError" />
    </div>
  );
}

export default ErrorPage;
