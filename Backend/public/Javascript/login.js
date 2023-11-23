const form = document.getElementById("form");
form.addEventListener("submit", () => {
  const login = {
    email: document.getElementById("email").value,
    password: document.getElementById("pin").value,
  };
  // document.getElementById("email").value = "";
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const success = document.getElementById("success");
      const error = document.getElementById("danger");
      const errormsg = document.getElementById("errormsg");
      const successmsg = document.getElementById("successmsg");
      if (data.status == "error") {
        success.style.display = "none";
        error.style.display = "block";
        errormsg.innerHTML = data.message;
        // console.log("error");
      } else {
        success.style.display = "block";
        error.style.display = "none";
        successmsg.innerHTML = data.message;
        window.location.href = "/";

        // console.log("success  in javascript register");
        // document.write("adfffdff");
      }
    });
});
