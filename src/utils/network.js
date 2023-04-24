export const getApiResource = async (url) => {
  try {
    const res = await fetch(url);

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
