// TODO: handle network error
export async function loginService(username, password) {
  let json;
  try {
    const response = await fetch(remoteService('/mobile_member/login'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${username}&password=${password}`,
    });
    json = await response.json();
  } catch (e) {
    // TODO: log error and send later?
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
};

import {SERVICE_URL} from "../service.json";

function remoteService(serviceName) {
  const parts = serviceName.split('/');
  return SERVICE_URL + '/index.php?app=' + parts[1] + '&act=' + parts[2];
}
