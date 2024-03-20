import Cookies from "universal-cookie";

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
  const uId = "?UID=" + (await GetUID());
  const res = await fetch(URL + url + uId, {
    method: method === "GET" && body ? "POST" : method,
    body,
    headers: {
      "User-Timezone": -new Date().getTimezoneOffset(),
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.warn(`${res.status}: request error!`);
    if (onError) onError(`${res.status}: request error!`);
    return;
  }
  if (data.status !== 200) {
    console.warn(
      `${data.statusText}: ${data.error}, ${JSON.stringify(data.data)}`,
      data
    );
    if (onError)
      onError(
        `${data.statusText}: ${data.error}, ${JSON.stringify(data.data)}`,
        data
      );
    return;
  }
  if (onSuccess) onSuccess(data);
  if (onLoad) {
    onLoad(res, data);
  }
  return { res, data };
};
export default myFetch;

const cookies = new Cookies(null, { path: "/" });
async function GetUID() {
  var now = new Date();
  now.setHours(now.getHours() + 1);
  // get from cookie
  var CUID = cookies.get("UID");
  if (CUID) {
    cookies.set("UID", CUID, { expires: now });
    return CUID;
  }
  // not in cookie then run login
  var fd = new FormData();
  fd.set("username", "mahmoudelshall292@gmail.com");
  fd.set("password", "123456");
  const URL =
    "https://development.exabyte-eg.com/explorer/__/elshall/BeyondQuality-Api/";
  const res = await fetch(URL + "admin/access/login", {
    method: "POST",
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) {
    console.log(`${res.status}: request error!`);
    return;
  }
  if (data.status !== 200) {
    console.log(`${data.statusText}: ${data.message}`);
    return;
  }
  // put in cookie
  cookies.set("UID", data.data.UID, { expires: now });
  // return
  return data.data.UID;
}
