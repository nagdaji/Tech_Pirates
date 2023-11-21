async function livegold() {
  //   const Tid = document.getElementById("deleteTid" + a).innerHTML;

  //   const add_entry = {
  //     email: document.getElementById("pagemail").innerHTML,
  //     // Tid: Tid,
  //   };
  //   gold
  await fetch(
    "https://api.metalpriceapi.com/v1/latest?api_key=c2f8020136e0a556d37d0fd9332a095e&base=XAU&currencies=INR",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const AUG = data.rates.INR;
      console.log(data.rates.INR);
      const gold10gm = ((AUG / 31.29) * 10 + 10000).toFixed(2);
      console.log(gold10gm);

      document.getElementById("livegold").innerHTML = gold10gm;
    });
}
async function livesilver() {
  // Silver
  await fetch(
    "https://api.metalpriceapi.com/v1/latest?api_key=c2f8020136e0a556d37d0fd9332a095e&base=XAG&currencies=INR",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const XAG = data.rates.INR;
      const silverkg = ((XAG / 26.6) * 1000).toFixed(2);
      document.getElementById("livesilver").innerHTML = silverkg;
    });
}

// update monthly income

const form1 = document.getElementById("incomeform");
form1.addEventListener("submit", () => {
  const add_entry = {
    income: document.getElementById("editincome").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  fetch("/dashboard/updateincome", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        document.getElementById("success").style.display = "block";
        document.getElementById("successmsg").innerHTML = data.message;
      }
    });
});
// update monthly income

const form2 = document.getElementById("savingupdate");
form2.addEventListener("submit", () => {
  const add_entry = {
    saving: document.getElementById("updsaving").value,
    email: document.getElementById("pagemail").innerHTML,
  };
  fetch("/dashboard/updatesaving", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        document.getElementById("success10").style.display = "block";
        document.getElementById("successmsg10").innerHTML = data.message;
      }
    });
});

async function showdetails() {
  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
  };
  fetch("/dashboard/showincome", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      var income = data.results[0]["income"];
      const expecsaving = data.results[0]["expectedsaving"];

      document.getElementById("monthlyincome").innerHTML = income;
      document.getElementById("expectedsaving").innerHTML = expecsaving;

      ///// fetching total expences /////

      const add_entry1 = {
        email: document.getElementById("pagemail").innerHTML,
      };
      fetch("/dashboard/showexpences", {
        method: "POST",
        body: JSON.stringify(add_entry1),
        headers: {
          "Content-Type": "application/json",
        },
      })
        //read es .json
        .then((res) => res.json())
        .then((data1) => {
          document.getElementById("totalexpences").innerHTML = Number(
            data1.results[0]["SUM(amount)"]
          ).toFixed(2);
          const savingam = (income - data1.results[0]["SUM(amount)"]).toFixed(
            2
          );
          document.getElementById("savingamount").innerHTML = savingam;

          if (savingam < expecsaving) {
            document.getElementById("redimg").style.display = "block";
          }
          if (savingam >= expecsaving) {
            document.getElementById("greenimg").style.display = "block";
          }

          // ------ Find Crypto expences -------
          const add_entry3 = {
            email: document.getElementById("pagemail").innerHTML,
          };
          fetch("/dashboard/showcryptoexpence", {
            method: "POST",
            body: JSON.stringify(add_entry3),
            headers: {
              "Content-Type": "application/json",
            },
          })
            //read es .json
            .then((res) => res.json())
            .then((data3) => {
              const cryptoamount = Number(
                data3.results[0]["SUM(amount)"]
              ).toFixed(2);
              document.getElementById("cryptoamount").innerHTML = cryptoamount;

              // ------ Find Stocks expences -------
              const add_entry4 = {
                email: document.getElementById("pagemail").innerHTML,
              };
              fetch("/dashboard/showstocksexpence", {
                method: "POST",
                body: JSON.stringify(add_entry4),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                //read es .json
                .then((res) => res.json())
                .then((data4) => {
                  const stocksamount = Number(
                    data4.results[0]["SUM(amount)"]
                  ).toFixed(2);
                  document.getElementById("stocksamount").innerHTML =
                    stocksamount;
                });
            });
        });
    });
}

function displayformincome() {
  const value = document.getElementById("monthlyincome").innerHTML;
  document.getElementById("editincome").value = value;
}
function displayformsaving() {
  const value = document.getElementById("expectedsaving").innerHTML;
  document.getElementById("updsaving").value = value;
}
