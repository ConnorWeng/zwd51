// TODO: handle network error
export async function loginService(username, password) {
  const response = await fetch(remoteService('/Members/login'), {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const json = await response.json();
  return json;
};

import {SERVICE_URL} from "../service.json";

function remoteService(serviceName) {
  console.log(SERVICE_URL + serviceName);
  return SERVICE_URL + serviceName;
}
