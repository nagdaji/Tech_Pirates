// ==========  Create Group ======
const creategrp = document.getElementById("creategroupform");
creategrp.addEventListener("submit", () => {
  const add_entry = {
    grpname: document.getElementById("grpname").value,
    email: document.getElementById("pagemail").innerHTML,
    teamcode: Date.now(),
  };
  fetch("/dashboard/creategroup", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
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

// -------- Add Member --------
const addmember = document.getElementById("addmember");
addmember.addEventListener("submit", () => {
  const add_entry = {
    mememail: document.getElementById("email").value,
    email: document.getElementById("pagemail").innerHTML,
    code: document.getElementById("code").innerHTML,
  };

  let mememail = document.getElementById("email").value;
  let email = document.getElementById("pagemail").innerHTML;
  console.log(mememail);
  console.log(email);
  checkuser();
  if (mememail != email) {
    fetch("/dashboard/addmember", {
      method: "POST",
      body: JSON.stringify(add_entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const success = document.getElementById("success2");
        const successmsg = document.getElementById("successmsg2");
        if (data.status == "success") {
          success.style.display = "block";
          successmsg.innerHTML = data.message;
        }
      });
  } else {
    const success = document.getElementById("success2");
    const successmsg = document.getElementById("successmsg2");
    success.style.display = "block";
    successmsg.innerHTML = "Cannot Add this email";
  }
});

//  ----------- verify User ------------

function checkuser() {
  const add_entry = {
    mememail: document.getElementById("email").value,
    email: document.getElementById("pagemail").innerHTML,
    code: document.getElementById("code").innerHTML,
  };

  fetch("/dashboard/verifygroupuser", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const success = document.getElementById("success2");
      const successmsg = document.getElementById("successmsg2");
      if (data.status == "success") {
        success.style.display = "block";
        successmsg.innerHTML = data.message;
      }
    });
}

async function printgroups() {
  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/printgroups", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then(async (data) => {
      // console.log(data);
      // console.log(typeof data.results);

      const data1 = [data];
      //   console.log(data1);
      const length = data1[0].results.length;
      const element = data1[0].results;
      //   console.log(length);
      let output = document.getElementById("output");
      if (length == 0) {
        output.innerHTML = `<div class="card">
              <h2 class="category"><b></b></h2>
              <p id="remark"><i>No Group Found!</i></p>
              <div class=" gap-2 mb-2">
              </div>
          </div>`;
      } else {
        const element = data1[0].results;
        // // console.log(data1[0].results[0].date);
        var ans = "";
        var element2;
        var element3;
        var Created;

        for (let i = 0; i < length; i++) {
          // --------------------- finding no of member -----------
          const add_entry1 = {
            groupname: element[i].groupname,
          };
          //   console.log(element[i].groupname);
          await fetch("/dashboard/countMembers", {
            method: "POST",
            body: JSON.stringify(add_entry1),
            headers: {
              "Content-Type": "application/json",
            },
          })
            //read es .json
            .then((res) => res.json())
            .then((data2) => {
              const data3 = [data2];
              element2 = data3[0].results;
            });
          // --------------------- finding no of member -----------
          // --------------------- Finding name of creator-----------
          const add_entry3 = {
            ownername: element[i].ownername,
          };
          await fetch("/dashboard/getcreatorname", {
            method: "POST",
            body: JSON.stringify(add_entry3),
            headers: {
              "Content-Type": "application/json",
            },
          })
            //read es .json
            .then((res) => res.json())
            .then((data4) => {
              const data5 = [data4];
              element3 = data5[0].results;
            });
          // --------------------- Finding name of creator-----------
          if (element[i].ownername == element[i].memberid) {
            Created = "You";
          } else {
            Created = element3[0].fullname;
          }

          //   console.log(element2[0].count);
          if (element[i].memberid == element[i].ownername) {
            ans += `<a class="click-div">
            <div class="card">
                  <h2 class="category"><b>${element[i].groupname}</b></h2>
                  <p class="remark">Created By - ${Created}</p>
                  <p class="remark"><i>No of Member - ${element2[0].count}</i></p>
                  <div class=" gap-2 mb-2">
                     <button class="btn btn-color1" type="button" id data-bs-toggle="modal" data-bs-target="#checkingModal" onclick="showtransaction(${element[i].groupcode})">View Group</button>
                  </div>
                  <a data-bs-toggle="modal" data-bs-target="#addModal" class="pointer" ><img src="/images/plus.png"
                  height="35px" width="35px" onclick="addm2(${element[i].groupcode})"></a>
                  <!-- for edit -->
                  <a data-bs-toggle="modal" data-bs-target="#editModal" class="pointer"><img src="/images/pen (1).png"
                  height="35px" width="35px" onclick="editg(${element[i].groupcode})"></a>
                  <!-- end of edit -->
                  <a  data-bs-toggle="modal" data-bs-target="#viewModal" class="pointer"><img src="/images/user (1).png" height="35px" width = "35px" onclick="displaygmem(${element[i].groupcode})"></a>
                  </div>
                  </a>`;
          } else if (element[i].memberid != element[i].ownername) {
            ans += `<a class="click-div">
                  <div class="card">
                  <h2 class="category"><b>${element[i].groupname}</b></h2>
                  <p class="remark">Created By - ${Created}</p>
                  <p class="remark"><i>No of Member - ${element2[0].count}</i></p>
                  <div class=" gap-2 mb-2">
                     <button class="btn btn-color1" type="button" data-bs-toggle="modal" data-bs-target="#checkingModal" onclick="showtransaction(${element[i].groupcode})">View Group</button>
                  </div>                 
                  <a data-bs-toggle="modal" data-bs-target="#viewModal" class="pointer"><img src="/images/user (1).png" height="35px" width = "35px" onclick="displaygmem(${element[i].groupcode})"></a>
                  </div>
                  </a>`;
          }
        }
        output.innerHTML = ans;
      }
    });
}

function activate(mail) {
  const id = "enable" + mail;
  //   console.log(id);
  document.getElementById(id).toggleAttribute("disabled");
}

// ------------ Add member Customization ----------
function addm2(code) {
  document.getElementById("code").innerHTML = code;
}
// ------xxxx------ Add member Customization -----xxx-----

// ------------ Edit Member Customization ----------
function editg(code) {
  document.getElementById("code").innerHTML = code;

  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
    code: code,
  };
  var ans = "";
  fetch("/dashboard/showeditmodal", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const data1 = [data];
      const length = data1[0].result.length;
      const element = data1[0].result;
      ans = ` <div class="col-md-12">
      <label for="edit-name" class="form-label">Group Name</label>
      <input type="text" class="form-control" value="${element[0].groupname}" disabled style="font-size:17px; font-weight:600;">
      </div>`;

      for (let i = 0; i < length; i++) {
        ans += `<div class="box">
          <div class="member-email">
          <label for="mememail" class="form-label ">Member E-mail</label>
          <input type="email" class="form-control" value="${
            element[i].memberid
          }" disabled style="font-size:17px; font-weight:600;" id="memdelid${
          i + 1
        }">
          </div>
          <div class="del-image">
          <img src="/images/delete.png" height="35px" width="35px" onclick="deletemember(${
            i + 1
          })">
          </div>
          
          </div>`;
      }
      document.getElementById("editmodalvalue").innerHTML = ans;
    });
}
// ------------ Edit Member Customization ----------
// ------------ Display Member ----------
function displaygmem(code) {
  const add_entry = {
    code: code,
  };
  var ans = "";
  var element3 = "";
  fetch("/dashboard/showeditmodal", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      const data1 = [data];
      const length = data1[0].result.length;
      const element = data1[0].result;
      //   console.log(element);
      document.getElementById("gname").innerHTML = element[0].groupname;
      for (let i = 0; i < length; i++) {
        // --------------------- Finding name of creator-----------
        const add_entry3 = {
          ownername: element[i].memberid,
        };
        await fetch("/dashboard/getcreatorname", {
          method: "POST",
          body: JSON.stringify(add_entry3),
          headers: {
            "Content-Type": "application/json",
          },
        })
          //read es .json
          .then((res) => res.json())
          .then((data4) => {
            const data5 = [data4];
            element3 = data5[0].results;
          });

        ans += `<hr style="border-top: 3px solid black"><p>${element3[0].fullname} (${element[i].memberid})</p>`;
      }
      document.getElementById("viewgroupmembers").innerHTML = ans;
    });
}
// ------xxxx------ Display Member -----xxx-----

// ------------- Delete Member ----------
function deletemember(i) {
  let id = "memdelid" + i;
  const add_entry = {
    email: document.getElementById(id).value,
    code: document.getElementById("code").innerHTML,
  };
  fetch("/dashboard/deletegroupmember", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (data) => {
      const success = document.getElementById("success4");
      const successmsg = document.getElementById("successmsg4");
      if (data.status == "success") {
        success.style.display = "block";
        successmsg.innerHTML = data.message;
      }
    });
}

// -------xxx------ Delete Member ----xxxx------

// --------------------- Add Group Entry -------------------
async function showdetailingroupentry() {
  const add_entry3 = {
    code: document.getElementById("code").innerHTML,
  };
  let useremail = document.getElementById("pagemail").innerHTML;
  await fetch("/dashboard/showeditmodal", {
    method: "POST",
    body: JSON.stringify(add_entry3),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then(async (data4) => {
      //   console.log(data4);
      const data = [data4];
      const length = data[0].result.length;
      const element = data[0].result;

      let ans = "";
      for (let i = 0; i < length; i++) {
        const add_entry = {
          ownername: element[i].memberid,
        };
        await fetch("/dashboard/getcreatorname", {
          method: "POST",
          body: JSON.stringify(add_entry),
          headers: {
            "Content-Type": "application/json",
          },
        })
          //read es .json
          .then((res) => res.json())
          .then((data8) => {
            const data5 = [data8];
            const element5 = data5[0].results;

            // console.log(element[i].memberid);
            const uid = element[i].memberid;
            ans += ` <div class="row my-4">
                        <div class="col-md-6">
                            
                            <input type="checkbox" onclick="activate('${uid}')">
                            <label class="">${element5[0].fullname}</label><br>
                            <input type="text" class="Memberid" value="${element[i].memberid}" style="display:none;">
                        </div>
                        <div class="col-md-6">
                            <input type="number" class="form-control Member" id="enable${element[i].memberid}" disabled required>
                        </div>
                    </div>`;
          });
        document.getElementById("entrylist").innerHTML = ans;
      }
    });
}

const addgroupentry = document.getElementById("addgroupentry");
addgroupentry.addEventListener("submit", async () => {
  const inputFields = document.querySelectorAll(".Member");
  const Memberid = document.querySelectorAll(".Memberid");
  const inputdate = document.querySelectorAll(".inputdate");
  const values = [];
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value != "") {
      const entry = {
        mail: Memberid[i].value,
        amount: inputFields[i].value,
        inputdate: inputdate[0].value,
      };
      values.push(entry);
    }
  }
  const length = values.length;
  // console.log(values);
  for (let i = 0; i < length; i++) {
    const email = values[i].mail;
    const amount = values[i].amount;
    const date = values[i].inputdate;

    const add_entry = {
      mail: email,
      amount: amount,
      usermail: document.getElementById("pagemail").innerHTML,
      groupcode: document.getElementById("code").innerHTML,
      date: date,
    };
    console.log(add_entry);
    await fetch("/dashboard/insertgrouptransaction", {
      method: "POST",
      body: JSON.stringify(add_entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      //read es .json
      .then((res) => res.json())
      .then(async (data) => {
        const success = document.getElementById("success5");
        const successmsg = document.getElementById("successmsg5");
        if (data.status == "success") {
          success.style.display = "block";
          successmsg.innerHTML = data.message;
        }
      });
  }
});

async function showtransaction(code) {
  document.getElementById("code").innerHTML = code;
  var mainname;
  const output = document.getElementById("trasactionout");
  const shareoutput = document.getElementById("shareoutput");
  const mainuser = document.getElementById("pagemail").innerHTML;
  // =========== find ownername ===========
  const add_entry2 = {
    ownername: mainuser,
  };
  //   console.log(element[i].groupname);
  await fetch("/dashboard/getcreatorname", {
    method: "POST",
    body: JSON.stringify(add_entry2),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data9) => {
      const data8 = [data9];
      mainname = data8[0].results;
    });

  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
    code: document.getElementById("code").innerHTML,
  };
  var element2;
  var element4;
  var ans = "";
  var ans2 = "";
  await fetch("/dashboard/Printgrouptransaction", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then(async (data) => {
      // console.log(data);
      const data1 = [data];
      const length = data1[0].results.length;
      const element = data1[0].results;
      console.log(element);
      for (let i = 0; i < length; i++) {
        // =========== find givername ===========
        const add_entry2 = {
          ownername: element[i].giver,
        };
        //   console.log(element[i].groupname);
        await fetch("/dashboard/getcreatorname", {
          method: "POST",
          body: JSON.stringify(add_entry2),
          headers: {
            "Content-Type": "application/json",
          },
        })
          //read es .json
          .then((res) => res.json())
          .then((data2) => {
            const data3 = [data2];
            element2 = data3[0].results;
            // console.log(element2);
          });
        // =========== find recievername ===========
        const add_entry3 = {
          ownername: element[i].reciever,
        };
        //   console.log(element[i].groupname);
        await fetch("/dashboard/getcreatorname", {
          method: "POST",
          body: JSON.stringify(add_entry3),
          headers: {
            "Content-Type": "application/json",
          },
        })
          //read es .json
          .then((res) => res.json())
          .then((data3) => {
            const data4 = [data3];
            element4 = data4[0].results;
            // console.log(element2);
          });
        var recievername = element4[0].fullname;
        var givername = element2[0].fullname;
        if (recievername == mainname[0].fullname) {
          recievername = "You";
        }
        if (givername == mainname[0].fullname) {
          givername = "You";
        }
        ans += `<div class="card w-75 mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Date : ${element[i].date}</h5>
                        <p class="card-text"><b>Who Paid:</b>&emsp;<span>${recievername}</span></p>
                        <p class="card-text"><b>For Whom:</b>&emsp;<span>${givername}</span></p>
                        <p class="card-text" style="font-size:25px">
                            <b>Amount:</b>&emsp;<span> &#8377; ${element[i].amount}</span>
                        </p>
                    </div>
                </div>`;
        ans2 += `<div class="container text-center my-2">
        <div class="row">
            <div class="col">
                ${givername}
            </div>
            <div class="col">
                ${recievername}
            </div>
            <div class="col">
            &#8377; ${element[i].amount}
            </div>
        </div>
    </div>`;
      }
      shareoutput.innerHTML = ans2;
      output.innerHTML = ans;
    });
}
