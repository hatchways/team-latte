const authFetch = ({ url, method = "GET", body = null, isForm = false }) => {
  return (
    fetch(url, {
      method,
      headers: {
        "Content-Type": isForm
          ? "application/x-www-form-urlencoded"
          : "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`
      },
      body
    })
      //fetch(`/profile/${props.location.pathname}`) // ** URL is equivalent to /profile/:id
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
      })
  );
};

export default authFetch;
