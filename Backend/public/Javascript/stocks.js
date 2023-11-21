const form1 = document.getElementById("form");
form1.addEventListener("submit", () => {
  // console.log("submited");

  const entry1 = {
    date: document.getElementById("date").value,
    Category: document.getElementById("Category").value,
    categoryname: document.getElementById("type").value,
    quantity: document.getElementById("unit").value,
    amount: document.getElementById("amount").value,
    remarks: document.getElementById("remarks").value,
    paymode: document.getElementById("mode").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  //   console.log();
  fetch("/dashboard/stocks", {
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
          element[i].category == "Stocks"
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
}

// ===== get live stocks=====
async function getstocksrate() {
  await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=RELIANCE.BSE&outputsize=compact&apikey=KUD66K6UJ2SP0IO0`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const date1 = new Date();
      let day = date1.getDate() - 1;
      let month = date1.getMonth() + 1;
      let year = date1.getFullYear();

      var searchdate = `${year}-${month}-${day}`;
      console.log(searchdate);
      var openPrice = 2357.3501;
      var highPrice = 2373.0;
      var lowPrice = 2353.0;
      var closePrice = 2355.8501;
      openPrice = data["Time Series (Daily)"]["2023-11-17"]["1. open"];
      highPrice = data["Time Series (Daily)"][searchdate]["2. high"];
      lowPrice = data["Time Series (Daily)"][searchdate]["3. low"];
      closePrice = data["Time Series (Daily)"][searchdate]["4. close"];

      //     const num = exchangeRate.toFixed(2);
      document.getElementById("open").innerHTML = openPrice;
      document.getElementById("high").innerHTML = highPrice;
      document.getElementById("low").innerHTML = lowPrice;
      document.getElementById("close").innerHTML = closePrice;
    });
}
