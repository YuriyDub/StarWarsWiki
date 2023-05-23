export const getApiResource = async (url, abortController) => {
  try {
    const res = await fetch(url, { signal: abortController?.signal });

    if (!res.ok) {
      console.error("Couldn't fetch.", res.status);
      return false;
    }

    return await res.json();
  } catch (error) {
    console.error("Couldn't fetch.", error.message);
    return false;
  }
};
