export const recipesOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchData = async (url, options) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};
