// ====== Daily Expences Tracker =========

const form = document.getElementById("datesearch");
form.addEventListener("submit", async () => {
  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
    searchdate: document.getElementById("date1").value,
  };
  await fetch("/dashboard/dailyreport", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      //   // console.log(typeof data.results);
      //   const data1 = [data];
      //   // console.log(data1);
      //   const length = data1[0].results.length;
      //   // console.log(length);
      //   const element = data1[0].results;
      // console.log(data.results);
      let value = [];
      let category = [];
      for (let i = 0; i < data.results.length; i++) {
        // console.log(data.results[i]);
        // console.log(data.results[i]["SUM(amount)"]);
        value.push(data.results[i]["SUM(amount)"]);
        category.push(data.results[i]["category"]);
        // console.log(value);
        // console.log(category);
      }

      let ctx = document.getElementById("myChart").getContext("2d");

      var graphie = Chart.getChart("myChart");
      if (graphie) {
        graphie.destroy();
      }
      graphie = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: category,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });
});

// =============== Weekly Expence ===========

async function printgraph() {
  // /Weekly Datewiae ----------
  const add_entry = {
    email: document.getElementById("pagemail").innerHTML,
    // searchdate: document.getElementById("date1").value,
  };
  await fetch("/dashboard/weeklyreport", {
    method: "POST",
    body: JSON.stringify(add_entry),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.results);
      let value = [];
      let date = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        date.push(data.results[i]["date"]);
        // console.log(value);
        // console.log(date);
      }

      let ctx = document.getElementById("myChart1").getContext("2d");

      var graphie = Chart.getChart("myChart1");
      if (graphie) {
        graphie.destroy();
      }
      graphie = new Chart(ctx, {
        type: "bar",
        data: {
          labels: date,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });

  //
  //

  //
  //
  //

  /////////// weekly category wise

  //
  //
  //

  const data1 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/weeklyreport2", {
    method: "POST",
    body: JSON.stringify(data1),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      let value = [];
      let category = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        category.push(data.results[i]["category"]);
      }
      // console.log(value);
      // console.log(category);
      let ctx1 = document.getElementById("myChart2").getContext("2d");

      var graphie2 = Chart.getChart("myChart2");
      if (graphie2) {
        graphie2.destroy();
      }
      graphie2 = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: category,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });

  //
  //

  //
  //
  //

  /////////// Monthly date wise ///////////////////
  //
  //

  //
  //
  //

  const data2 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/monthlyreportdate", {
    method: "POST",
    body: JSON.stringify(data2),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      let value = [];
      let date = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        date.push(data.results[i]["date"]);
      }
      let ctx2 = document.getElementById("myChart3").getContext("2d");

      var graphie3 = Chart.getChart("myChart3");
      if (graphie3) {
        graphie3.destroy();
      }
      graphie3 = new Chart(ctx2, {
        type: "bar",
        data: {
          labels: date,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });
  //
  //

  //
  //
  //

  /////////// Monthly Category wise ///////////////////
  //
  //

  //
  //
  //

  const data3 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/monthlyreportcategory", {
    method: "POST",
    body: JSON.stringify(data3),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      let value = [];
      let category = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        category.push(data.results[i]["category"]);
      }
      let ctx3 = document.getElementById("myChart4").getContext("2d");

      var graphie4 = Chart.getChart("myChart4");
      if (graphie4) {
        graphie4.destroy();
      }
      graphie4 = new Chart(ctx3, {
        type: "bar",
        data: {
          labels: category,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });
  //
  //

  //
  //
  //

  /////////// Yearly date wise ///////////////////
  //
  //

  //
  //
  //

  const data4 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/yearlydate", {
    method: "POST",
    body: JSON.stringify(data4),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      let value = [];
      let date = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        date.push(data.results[i]["date"]);
      }
      let ctx4 = document.getElementById("myChart5").getContext("2d");

      var graphie5 = Chart.getChart("myChart5");
      if (graphie5) {
        graphie4.destroy();
      }
      graphie4 = new Chart(ctx4, {
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });
  //
  //

  //
  //
  //

  /////////// yearly Category wise ///////////////////
  //
  //

  //
  //
  //

  const data5 = {
    email: document.getElementById("pagemail").innerHTML,
  };
  await fetch("/dashboard/yearlycategory", {
    method: "POST",
    body: JSON.stringify(data5),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      let value = [];
      let category = [];
      for (let i = 0; i < data.results.length; i++) {
        value.push(data.results[i]["SUM(amount)"]);
        category.push(data.results[i]["category"]);
      }
      let ctx5 = document.getElementById("myChart6").getContext("2d");

      var graphie6 = Chart.getChart("myChart6");
      if (graphie6) {
        graphie6.destroy();
      }
      graphie6 = new Chart(ctx5, {
        type: "line",
        data: {
          labels: category,
          datasets: [
            {
              label: "Amount",
              data: value,
              backgroundColor: [
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange",
                "cyan",
                "violet",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
        },
      });
    });
}
