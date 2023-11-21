async function sendnotification() {
  const entry1 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  //   console.log();
  fetch("/dashboard/sendreminder", {
    method: "POST",
    body: JSON.stringify(entry1),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {});
}
