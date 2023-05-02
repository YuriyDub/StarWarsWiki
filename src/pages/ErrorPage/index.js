import styles from "./ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <img src="/img/icons/error-404.png" alt="NetworkError" />
    </div>
  );
}

export default ErrorPage;
