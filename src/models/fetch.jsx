const myFetch = async (
  url,
  {
    method = "GET",
    body = null,
    onLoad = null,
    onError = null,
    onSuccess = null,
  } = {}
) => {
  const URL =
    "https://development.exabyte-eg.com/explorer/__/elshall/BeyondQuality-Api/";
  const uId =
    "?UID=bmcyaC82T0NPNkYwS080Mlk4RT06NDVZRDMxVnNmV3RNSW54aWcrWW9IUT09=";
  const res = await fetch(URL + url + uId, {
    method: method === "GET" && body ? "POST" : method,
    body,
  });
  const data = await res.json();
  if (onError || onSuccess) {
    if (!res.ok) {
      if (onError) onError(`${res.status}: request error!`);
      return;
    }
    if (data.status !== 200) {
      if (onError) onError(`${data.statusText}: ${data.message}`);
      return;
    }
    onSuccess(data);
  }
  if (onLoad) {
    onLoad(res, data);
  }
  return { res, data };
};
export default myFetch;
