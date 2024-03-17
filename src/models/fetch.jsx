const myFetch = async (
  url,
  { method = "GET", body = null, onLoad = null } = {}
) => {
  const URL =
    "https://development.exabyte-eg.com/explorer/__/elshall/BeyondQuality-Api/";
  const uId = "?UID=dWxtVUpZN2hacmlCQmx6N0VSZz06UEFYaDVFUFBKUjZsQ2Y2OUluMzN1QT09=";
  const res = await fetch(URL + url + uId, {
    method: method === "GET" && body ? "POST" : method,
    body,
  });
  const data = await res.json();
  if (onLoad) {
    onLoad(res, data);
  }
  return data;
};
export default myFetch;
