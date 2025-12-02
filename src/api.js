const API_BASE = "http://localhost:8080/api";

async function request(path, { method = "GET", body, headers = {} } = {}) {
  const token = localStorage.getItem("token");
  const opts = { method, headers: { ...headers } };

  if (token) opts.headers["Authorization"] = "Bearer " + token;
  if (body) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(API_BASE + path, opts);
  const text = await res.text();

  try {
    return { status: res.status, body: text ? JSON.parse(text) : null };
  } catch {
    return { status: res.status, body: text };
  }
}


export default {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};