const authFetch = ({
  url,
  method = "GET",
  body = null,
  isForm = false,
  formData = null
}) => {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`
  };
  if (!isForm) {
    headers["Content-Type"] = "application/json";
  }
  const data = {
    method,
    headers
  };
  if (formData) {
    data.body = formData;
  } else if (body) {
    data.body = body;
  }

  return fetch(url, data)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      const response = res.json();
      return response;
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      return { error: err };
    });
};

export default authFetch;
