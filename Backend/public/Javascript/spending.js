async function getdata() {
  const output = document.getElementById("output");
  // const ele = document.getElementById("table");
  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/spending", {
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
      // console.log(data1);
      const length = data1[0].results.length;
      // console.log(length);
      const element = data1[0].results;
      // console.log(data1[0].results[0].date);
      var ans = "";
      let totalamount = 0;
      for (let i = 0; i < length; i++) {
        const d = element[i].date;
        console.log(d);
        // const d = new Date(element[i].date);
        totalamount += Number(element[i].amount);
        let Tid1 = "deleteTid" + `${element[i].Tid}`;
        let Tid2 = "editTid" + `${element[i].Tid}`;
        let id1 = "row" + `${element[i].Tid}`;
        ans += `<tr id=${id1}>
              <td>${i + 1}</td>
              <td>${element[i].date}</td>
              <td>${element[i].category}</td>
              <td>${element[i].remark}</td>
              <td>${element[i].mode}</td>
              <td class="amount">${element[i].amount}</td>
              <td>
              <button class="btn btn-sm btn-primary edit mx-2 " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editdata(${
                element[i].Tid
              })">Edit <span id=${Tid2} style="display:none;">${
          element[i].Tid
        }</span></button>
              <button class="btn btn-sm btn-primary delete" data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick="deletedata(${
                element[i].Tid
              })">Delete <span id=${Tid1} style="display:none;">${
          element[i].Tid
        }</span></button></td></td>`;
        output.innerHTML = ans;
        let finalamount = totalamount.toFixed(2);
        document.getElementById("grandtotal").innerHTML = finalamount;

        $(document).ready(function () {
          $("#mytable").DataTable();
        });
      }
    });
}

////// Filer by category /////////////
function filter1() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  // let grandtotal1 = 0;
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter1").innerHTML;

    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });

  // document.getElementById("filter1").style.background = red;
  disablebutton();
  document.getElementById("filter1").disabled = false;
  document.getElementById("filter1").style.background = "#003366";
  document.getElementById("filter1").style.color = "white";
}
function disablebutton() {
  document.getElementById("filter1").disabled = true;
  document.getElementById("filter2").disabled = true;
  document.getElementById("filter3").disabled = true;
  document.getElementById("filter4").disabled = true;
  document.getElementById("filter5").disabled = true;
  document.getElementById("filter6").disabled = true;
  document.getElementById("filter7").disabled = true;
  document.getElementById("filter8").disabled = true;
  document.getElementById("filter9").disabled = true;
  document.getElementById("filter10").disabled = true;
  document.getElementById("filter11").disabled = true;

  $(document).ready(function () {
    let totalsum = 0;
    $("tr").each(function () {
      var num = $(this).find(".amount").text();

      console.log(typeof num);
      if (num.length != 0) {
        totalsum += Number(num);
      }
    });
    $(this).find("#grandtotal").html(totalsum);
  });
}
////// Filer by category /////////////

function filter2() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter2").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////
    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter2").disabled = false;
  document.getElementById("filter2").style.background = "#003366";
  document.getElementById("filter2").style.color = "white";
}
function filter10() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter10").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////
    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter10").disabled = false;
  document.getElementById("filter10").style.background = "#003366";
  document.getElementById("filter10").style.color = "white";
}
function filter11() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter11").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////
    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter11").disabled = false;
  document.getElementById("filter11").style.background = "#003366";
  document.getElementById("filter11").style.color = "white";
}

////// Filer by category /////////////
function filter3() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter3").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter3").disabled = false;
  document.getElementById("filter3").style.background = "#003366";
  document.getElementById("filter3").style.color = "white";
}

////// Filer by category /////////////
function filter4() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter4").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter4").disabled = false;
  document.getElementById("filter4").style.background = "#003366";
  document.getElementById("filter4").style.color = "white";
}

////// Filer by category /////////////
function filter5() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter5").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter5").disabled = false;
  document.getElementById("filter5").style.background = "#003366";
  document.getElementById("filter5").style.color = "white";
}

////// Filer by category /////////////
function filter6() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter6").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter6").disabled = false;
  document.getElementById("filter6").style.background = "#003366";
  document.getElementById("filter6").style.color = "white";
}
////// Filer by category /////////////
function filter7() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter7").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter7").disabled = false;
  document.getElementById("filter7").style.background = "#003366";
  document.getElementById("filter7").style.color = "white";
}

////// Filer by category /////////////
function filter8() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter8").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter8").disabled = false;
  document.getElementById("filter8").style.background = "#003366";
  document.getElementById("filter8").style.color = "white";
}

////// Filer by category /////////////
function filter9() {
  $(document).ready(function () {
    const table = $("#mytable").DataTable();
    table.draw();
  });
  $.fn.dataTableExt.afnFiltering.push(function (settings, data, index) {
    const val = document.getElementById("filter9").innerHTML;
    const tableColumnValue = data[2];
    /////////for amount ////////////

    if (tableColumnValue == val) {
      return true;
    }
  });
  disablebutton();
  document.getElementById("filter9").disabled = false;
  document.getElementById("filter9").style.background = "#003366";
  document.getElementById("filter9").style.color = "white";
}

function exportcsv() {
  var table = document.getElementById("mytable");

  const name = document.getElementById("username").innerHTML;
  const filename = name + ".csv";
  var rows = [];
  for (var i = 0; i < table.rows.length; i++) {
    var row = [];
    for (var j = 0; j < table.rows[i].cells.length - 1; j++) {
      row.push(table.rows[i].cells[j].innerText);
    }
    rows.push(row.join(","));
  }

  var csvData = rows.join("\n");

  var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  saveAs(blob, filename);
}
