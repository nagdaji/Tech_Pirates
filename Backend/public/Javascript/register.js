const form = document.getElementById("form");
form.addEventListener("submit", () => {
  const register = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("pin").value,
    cnfpassword: document.getElementById("pin1").value,
  };
  fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(register),
    headers: {
      "Content-Type": "application/json",
    },
  })
  //read es .json 
    .then((res) => res.json())
    .then((data) => {
      // console.log("hello2");
      const success = document.getElementById("success");
      const error = document.getElementById("danger");
      const errormsg = document.getElementById("errormsg");
      const successmsg = document.getElementById("successmsg");
      // console.log(success);
      // console.log(data.status);
      if (data.status == "error") {
        success.style.display = "none";
        error.style.display = "block";
        errormsg.innerHTML = data.message;
        // console.log("error");
      } else {
        success.style.display = "block";
        error.style.display = "none";
        successmsg.innerHTML = data.message;
        // console.log("success  in javascript register");
        // document.write("adfffdff");
      }
    });
});
