import { useState } from "react";
import ErrorPage from "../pages/ErrorPage";

export const withErrorApi = (View) => {
  return (props) => {
    const [errorApi, setErrorApi] = useState(false);

    return (
      <>
        {errorApi ? (
          <ErrorPage />
        ) : (
          <View setErrorApi={setErrorApi} {...props} />
        )}
      </>
    );
  };
};
