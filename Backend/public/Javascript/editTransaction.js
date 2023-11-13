async function deletedata(a) {
  const ans = confirm("Do you want to delete Transaction ? ");

  if (ans) {
    const Tid = document.getElementById("deleteTid" + a).innerHTML;

    const add_entry = {
      email: document.getElementById("pagemail").innerHTML,
      Tid: Tid,
    };
    await fetch("/dashboard/deleteTransaction", {
      method: "POST",
      body: JSON.stringify(add_entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      //read es .json
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        console.log(data.status);
      });
  }
  window.location.href = "/spending";
}

async function editdata(a) {
  let id1 = "row" + a;
  const element = document.getElementById(id1).firstElementChild;
  const date = element.nextElementSibling.innerHTML;
  const category = element.nextElementSibling.nextElementSibling.innerHTML;
  const remark =
    element.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
  const mode =
    element.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling.innerHTML;
  const amount =
    element.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling.nextElementSibling.innerHTML;

  document.getElementById("date").value = date;
  document.getElementById("Category").value = category;
  document.getElementById("remarks").value = remark;
  document.getElementById("amount").value = amount;
  document.getElementById("paymode").value = mode;
  document.getElementById("tranid").value = a;
}

const form = document.getElementById("updateform");
form.addEventListener("submit", () => {
  const add_entry = {
    date: document.getElementById("date").value,
    Category: document.getElementById("Category").value,
    remarks: document.getElementById("remarks").value,
    amount: document.getElementById("amount").value,
    isgroup: document.getElementById("isgroup").value,
    grpmem: document.getElementById("grp-mem").value,
    paymode: document.getElementById("paymode").value,
    Tid: document.getElementById("tranid").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  fetch("/dashboard/updateTransaction", {
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
