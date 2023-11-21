const form1 = document.getElementById("form");
form1.addEventListener("submit", () => {
  console.log("submited");

  const entry1 = {
    date: document.getElementById("date").value,
    Category: document.getElementById("Category").value,
    remarks: document.getElementById("remarks").value,
    amount: document.getElementById("amount").value,
    cryptoname: document.getElementById("cryptoname").value,
    quantity: document.getElementById("quantity").value,
    paymode: document.getElementById("paymode").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  //   console.log();
  fetch("/dashboard/crypto", {
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

//// print data

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
      // console.log(typeof data.results);
      const data1 = [data];
      // console.log(data1);
      const length = data1[0].results.length;
      // console.log(length);
      const element = data1[0].results;
      // console.log(data1[0].results[0].date);
      var ans = "";
      let totalamount = 0;
      let sno1 = 1;
      for (let i = 0; i < length; i++) {
        if (
          (element[i].currencyname != null || element[i].quantity != null) &&
          element[i].category == "Cryptos"
        ) {
          totalamount += Number(element[i].amount);

          let id1 = "row" + `${element[i].Tid}`;
          ans += `<tr id=${id1}>
                <td>${sno1++}</td>
                <td>${element[i].date}</td>
                <td>${element[i].currencyname}</td>
                <td>${element[i].category}</td>
                <td>${element[i].quantity}</td>
                <td>${element[i].remark}</td>
                <td>${element[i].mode}</td>
                <td class="amount">${element[i].amount}</td>
                <td>15000</td>
                `;
          output.innerHTML = ans;
          let finalamount = totalamount.toFixed(2);
          document.getElementById("grandtotal").innerHTML = finalamount;

          $(document).ready(function () {
            $("#mytable").DataTable();
          });
        }
      }
    });

  //   const arr1 = {
  //     BTC: "3040695.71942535",
  //     ETH: "170338.3952610",
  //     BNB: "20408.07381900",
  //     BUSD: "83.13753625",
  //     XRP: "55.09514631",
  //     ADA: "30.52063200",
  //     SOL: "4706.16502615",
  //     DOGE: "6.20807951",
  //     MATIC: "75.67786135",
  //     UNI: "431.44697218",
  //   };
  //   for (let i in arr) {
  //     const rate = Number(arr[i]).toFixed(4);
  //     console.log(rate);
  //     const cid = "live" + i;
  //     document.getElementById(cid).innerHTML = rate;
  //   }

  // const a = `{
  //       "Realtime Currency Exchange Rate": {
  //           "1. From_Currency Code": "BTC",
  //           "2. From_Currency Name": "Bitcoin",
  //           "3. To_Currency Code": "CNY",
  //           "4. To_Currency Name": "Chinese Yuan",
  //           "5. Exchange Rate": "260095.78562000",
  //           "6. Last Refreshed": "2023-11-14 18:43:09",
  //           "7. Time Zone": "UTC",
  //           "8. Bid Price": "260095.78562000",
  //           "9. Ask Price": "260095.85851200"
  //       }
  //   }`;
  // var jsonData = JSON.parse(data);

  // // Access the exchange rate
  // var exchangeRate =
  //   jsonData["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

  // // Print or use the exchange rate
  // console.log("Exchange Rate:", exchangeRate);
}

async function getcryptorate() {
  const arr = [
    "BTC",
    "ETH",
    "BNB",
    "BUSD",
    "XRP",
    "ADA",
    "SOL",
    "DOGE",
    "MATIC",
    "UNI",
  ];

  for (let i = 0; i < arr.length; i++) {
    let idname = "live" + arr[i];
    console.log(idname);

    await fetch(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${arr[i]}&to_currency=INR&apikey=KUD66K6UJ2SP0IO0`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // var jsonData = JSON.parse(data);

        // Access the exchange rate
        var exchangeRate = Number(
          data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        const num = exchangeRate.toFixed(2);
        document.getElementById(idname).innerHTML = num;
      });
  }
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
