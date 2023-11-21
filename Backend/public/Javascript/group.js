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
                     <button class="btn btn-color1" type="button" data-bs-toggle="modal" data-bs-target="#checkingModal">View Group</button>
                  </div>
                  <a data-bs-toggle="modal" data-bs-target="#addModal" ><img src="/images/plus.png"
                  height="35px" width="35px" onclick="addm(${element[i].groupcode})"></a>
                  <!-- for edit -->
                  <a data-bs-toggle="modal" data-bs-target="#editModal"><img src="/images/pen (1).png"
                  height="35px" width="35px" onclick="editg(${element[i].groupcode})"></a>
                  <!-- end of edit -->
                  <a  data-bs-toggle="modal" data-bs-target="#viewModal"><img src="/images/user (1).png" height="35px" width = "35px" onclick="displaygmem(${element[i].groupcode})"></a>
                  <a href=""><img src="/images/logout.png" height="35px" width = "35px" alt=""></a>
                  <a><img src="/images/delete.png" height="35px" width="35px"></a>
                  </div>
                  </a>`;
          } else if (element[i].memberid != element[i].ownername) {
            ans += `<a class="click-div">
                  <div class="card">
                  <h2 class="category"><b>${element[i].groupname}</b></h2>
                  <p class="remark">Created By - ${Created}</p>
                  <p class="remark"><i>No of Member - ${element2[0].count}</i></p>
                  <div class=" gap-2 mb-2">
                     <button class="btn btn-color1" type="button" data-bs-toggle="modal" data-bs-target="#checkingModal">View Group</button>
                  </div>                 
                  <a data-bs-toggle="modal" data-bs-target="#viewModal"><img src="/images/user (1).png" height="35px" width = "35px" onclick="displaygmem(${element[i].groupcode})"></a>
                  <a href=""><img src="/images/logout.png" height="35px" width = "35px" alt=""></a> 
                  </div>
                  </a>`;
          }
        }
        output.innerHTML = ans;
      }
    });
}

function activate() {
  document.getElementById("unit").toggleAttribute("disabled");
}

// ------------ Add member Customization ----------
function addm(code) {
  document.getElementById("code").innerHTML = code;
}
// ------xxxx------ Add member Customization -----xxx-----

// ------------ Edit Member Customization ----------
function editg(code) {
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
          <input type="email" class="form-control" value="${element[i].memberid}" disabled style="font-size:17px; font-weight:600;">
          </div>
          <div class="del-image">
          <img src="/images/delete.png" height="35px" width="35px" alt="">
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
