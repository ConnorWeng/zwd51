import {SERVICE_URL} from "../service.json";

export function serviceAction(serviceName, path, method, params) {
  return async (dispatch) => {
    dispatch({
      type: serviceName + '_REQUEST',
    });
    let json;
    if (method === 'GET') {
      json = await callGetService(path, params);
    } else if (method === 'POST') {
      json = await callPostService(path, params);
    }
    dispatch({
      type: serviceName + '_CHECK',
      json: json,
    });
    setTimeout(() => {
      dispatch({
        type: serviceName + '_CLEAR_MESSAGE',
      });
    }, 5000);
  };
}

async function callGetService(path, params) {
  let json;
  try {
    const response = await fetch(
      remoteService(path) + buildQueryString(params));
    json = await response.json();
  } catch (e) {
    json = {
      error: true,
      message: e.message,
    };
  }
  return json;
}

async function callPostService(path, params) {
  let json;
  try {
    const response = await fetch(remoteService(path), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: buildQueryString(params),
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
}

function buildQueryString(params) {
  let query = '';
  for (var key in params) {
    query += `&${key}=${params[key]}`;
  }
  return query;
}

function remoteService(serviceName) {
  const parts = serviceName.split('/');
  return SERVICE_URL + '/index.php?app=' + parts[1] + '&act=' + parts[2];
}
