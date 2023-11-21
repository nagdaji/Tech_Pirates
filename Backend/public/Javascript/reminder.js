const form = document.getElementById("reminderform");
form.addEventListener("submit", () => {
  const entry1 = {
    date: document.getElementById("datetime").value,
    Category: document.getElementById("Category").value,
    remarks: document.getElementById("remarks").value,
    amount: document.getElementById("amount").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  //   console.log();
  fetch("/dashboard/setreminder", {
    method: "POST",
    body: JSON.stringify(entry1),
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

async function printreminder() {
  // / check date -----

  const currentDate = new Date();

  // Get the date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  // console.log(inputdate);
  document.getElementById("datetime").setAttribute("min", formattedDateTime);
  // console.log(formattedDateTime);

  // / check date -----

  const output = document.getElementById("output");

  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/printreminder", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // console.log(typeof data.results);
      const data1 = [data];
      // // console.log(data1);
      const length = data1[0].results.length;
      const element = data1[0].results;
      // // console.log(length);
      if (length == 0) {
        output.innerHTML = `<div class="card">
        <h2 class="category"><b></b></h2>
        <p id="remark"><i>No Saved Reminder</i></p>
        <div class=" gap-2 mb-2">
        </div>
    </div>`;
      } else {
        const element = data1[0].results;
        // // console.log(data1[0].results[0].date);
        var ans = "";

        for (let i = 0; i < length; i++) {
          ans += `<div class="card">
        <h2 class="category"><b>${element[i].category}</b></h2>
        <p class="date">Due : <span >${element[i].date},</span>&emsp13;<span>${element[i].time}</span></p>
        <p><i>${element[i].remarks}</i></p>
        <h2 class="mb-3 category"><b>₹<span>${element[i].amount}</span></b></h2>
        <div class=" gap-2 mb-2">
            <button class="btn btn-color1" type="button" onclick="deleterem(${element[i].rid})">Delete Reminder</button>
        </div>
    </div>`;
        }
        output.innerHTML = ans;
      }
    });
}

function checkdate() {
  const currentDate = new Date();

  // Get the date components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");

  // Get the time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDateTime = `${hours}:${minutes}`;
  const formattedDate1 = `${year}-${month}-${day}`;
  // console.log(inputdate);

  // console.log(formattedDateTime);

  const inputdate = document.getElementById("datetime").value;
  const currentDate2 = new Date(inputdate);

  const year2 = currentDate2.getFullYear();
  const month2 = String(currentDate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day2 = String(currentDate2.getDate()).padStart(2, "0");
  const formattedDate = `${year2}-${month2}-${day2}`;
  // Get the time components
  const hours2 = String(currentDate2.getHours()).padStart(2, "0");
  const minutes2 = String(currentDate2.getMinutes()).padStart(2, "0");
  const formattedDateTime2 = `${hours2}:${minutes2}`;
  // console.log(formattedDateTime2);
  if (
    formattedDateTime >= formattedDateTime2 &&
    formattedDate == formattedDate1
  ) {
    document.getElementById("error").style.display = "block";
    document.getElementById("errormsg").innerHTML = "Cannot Select Past Time";
  }
}

// --------- delet raminder ---------
async function deleterem(id) {
  const ans = confirm("Sure to delete Reminder ? ");
  if (ans) {
    const rid = id;

    const add_entry = {
      rid: rid,
    };

    await fetch("/dashboard/deletereminder", {
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
  window.location.href = "/reminder";
}
