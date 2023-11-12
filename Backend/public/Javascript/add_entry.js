const form = document.getElementById("form");
form.addEventListener("submit", () => {
  const add_entry = {
    date: document.getElementById("date").value,
    Category: document.getElementById("Category").value,
    remarks: document.getElementById("remarks").value,
    amount: document.getElementById("amount").value,
    isgroup: document.getElementById("isgroup").value,
    grpmem: document.getElementById("grp-mem").value,
    paymode: document.getElementById("paymode").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  fetch("/dashboard/add_entry", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      const success = document.getElementById("success");
      const successmsg = document.getElementById("successmsg");
      if (data.status == "success") {
        success.style.display = "block";
        successmsg.innerHTML = data.message;
      }
    });
});
