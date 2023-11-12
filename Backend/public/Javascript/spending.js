// function changetable() {
const output = document.getElementById("output");
// const ele = document.getElementById("table");
const add_entry = {
  email: document.getElementById("pagemail").innerHTML,
};
fetch("/dashboard/spending", {
  method: "POST",
  body: JSON.stringify(add_entry),
  headers: {
    "Content-Type": "application/json",
  },
})
  //read es .json
  .then((res) => res.json())
  .then((data) => {
    // console.log(typeof data.results);
    const data1 = [data];
    // console.log(data1);
    const length = data1[0].results.length;
    // console.log(length);
    const element = data1[0].results;
    // console.log(data1[0].results[0].date);
    var ans = "";
    for (let i = 0; i < length; i++) {
      var table = document.getElementsByTagName("table")[0];
      console.log(table);
      var newrow = table.insertRow(table.rows.length);
      var cel0 = newrow.insertCell(0);
      var cel1 = newrow.insertCell(1);
      var cel2 = newrow.insertCell(2);
      var cel3 = newrow.insertCell(3);
      var cel4 = newrow.insertCell(4);
      var cel5 = newrow.insertCell(5);
      var cel6 = newrow.insertCell(6);

      cel0.innerHTML = i + 1;
      cel1.innerHTML = element[i].date;
      cel2.innerHTML = element[i].category;
      cel3.innerHTML = element[i].remark;
      cel4.innerHTML = element[i].mode;
      cel5.innerHTML = element[i].amount;
      cel6.innerHTML = `<button class="btn btn-sm btn-primary edit mx-2 ">Edit</button><button class="btn btn-sm btn-primary delete">Delete</button></td>`;

      //     var ans1 = `<tr>
      //     <td scope="row">${i + 1}</td>
      //     <td>${element[i].date}</td>
      //     <td>${element[i].category}</td>
      //     <td>${element[i].remark}</td>
      //     <td>${element[i].mode}</td>
      //     <td>${element[i].amount}</td>
      //     <td><button class="btn btn-sm btn-primary edit mx-2 ">Edit</button><button class="btn btn-sm btn-primary delete">Delete</button></td>
      // </tr>`;
      //     ans = ans.concat("", ans1);
    }
    // output.innerHTML = ans;
  });
// }
