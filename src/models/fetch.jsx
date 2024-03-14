const myFetch = async (
  url,
  { method = "GET", body = null, onLoad = null } = {}
) => {
  const URL =
    "https://development.exabyte-eg.com/explorer/__/elshall/BeyondQuality-Api/";
  const uId = "?UID=SGhoT1k2em9VMkh0dkp0MjozaHdmcnlxdWxhSS9uN0V3WWtZRUpRPT0=";
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
