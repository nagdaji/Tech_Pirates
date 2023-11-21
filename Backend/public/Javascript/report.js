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
      //   const data1 = [data];
      //   const length = data1[0].results.length;
      //   const element = data1[0].results;
      let value = [];
      let category = [];
      for (let i = 0; i < data.results.length; i++) {
        // console.log(data.results[i]);
        // console.log(data.results[i]["SUM(amount)"]);
        value.push(data.results[i]["SUM(amount)"]);
        category.push(data.results[i]["category"]);
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
              label: "Amount ",
              data: value,
              backgroundColor: [
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
              ],
              borderWidth: 3,
            },
          ],
        },

        options: {
          responsive: false,
          layout: {
            padding: { top: 10, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Date Wise Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
        },
      });
    });
});

// =============== Weekly Expence ===========

async function printgraph() {
  ////////// daily ///////////////
  const date1 = new Date();

  let day = date1.getDate();
  let month = date1.getMonth() + 1;
  let year = date1.getFullYear();

  var searchdate = `${year}-${month}-${day}`;
  // console.log(searchdate);
  const add_entry1 = {
    email: document.getElementById("pagemail").innerHTML,
    searchdate: searchdate,
  };
  // console.log(searchdate);
  await fetch("/dashboard/dailyreport", {
    method: "POST",
    body: JSON.stringify(add_entry1),
    headers: {
      "Content-Type": "application/json",
    },
  })
    //read es .json
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
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

      let ctx9 = document.getElementById("myChart").getContext("2d");

      var graphie9 = Chart.getChart("myChart");
      if (graphie9) {
        graphie9.destroy();
      }
      graphie9 = new Chart(ctx9, {
        type: "doughnut",
        data: {
          labels: category,
          datasets: [
            {
              label: "Amount  ",
              data: value,
              backgroundColor: [
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "#2D728F",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
              ],
              borderColor: "silver",
              borderWidth: 1,
            },
          ],
        },

        options: {
          responsive: false,
          layout: {
            padding: { top: 10, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Today's Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
        },
      });
    });

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
              label: "Amount ",
              data: value,
              hoverBackgroundColor: ["#565656"],
              backgroundColor: [
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        },

        options: {
          responsive: false,
          layout: {
            padding: { top: 40, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Weekly Date Wise Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
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
      // console.log(data.results);
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
              label: "Amount ",
              data: value,
              hoverBackgroundColor: ["#565656"],
              backgroundColor: [
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        },

        options: {
          responsive: false,
          layout: {
            padding: { top: 40, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
              // callbacks: {
              //   labelTextColor: (context) => {
              //     return "red";
              //   },
              // },
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Weekly Category Wise Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
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
      // console.log(data.results);
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
              label: "Amount  ",
              data: value,
              hoverBackgroundColor: ["#565656"],
              backgroundColor: [
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        },

        options: {
          responsive: false,
          layout: {
            padding: { top: 40, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Monthly Date Wise Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
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
      // console.log(data.results);
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
              label: "Amount  ",
              data: value,
              hoverBackgroundColor: ["#565656"],
              backgroundColor: [
                "#2D728F",
                "#C1FF9B",
                "#6457A6",
                "#FFACE4",
                "orange",
                "teal",
                "darkgray",
                "#95B46A",
                "blue",
                "purple",
              ],
              borderColor: "black",
              borderWidth: 2,
            },
          ],
        },

        options: {
          responsive: false,

          layout: {
            padding: { top: 40, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Monthly Category Wise Expences",
              },
              position: "top",
            },
            animation: {
              duration: 9000,
              easing: "easyInOutBounce",
            },
          },
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
      // console.log(data.results);
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
              label: "Amount ",
              data: value,

              backgroundColor: ["skyblue"],
              borderColor: "#003366",
              tension: 0.3,
              fill: true,
            },
          ],
        },

        options: {
          responsive: false,

          elements: {
            point: {
              pointRadius: 5.5,
              pointHoverRadius: 10,
              pointBackgroundColor: "pink",
            },
          },
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 0.5,
              to: 0.2,
              loop: true,
            },
          },
          layout: {
            padding: { top: 40, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Yearly Category Wise Expences",
              },
              position: "top",
            },
          },
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
      // console.log(data.results);
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
              label: "Amount ",
              data: value,
              backgroundColor: ["skyblue"],
              borderColor: "#003366",
              tension: 0.3,
              fill: true,
            },
          ],
        },

        options: {
          responsive: false,
          elements: {
            point: {
              pointRadius: 5.5,
              pointHoverRadius: 10,
              pointBackgroundColor: "pink",
            },
          },
          animations: {
            tension: {
              duration: 1000,
              easing: "linear",
              from: 0.5,
              to: 0.2,
              loop: true,
            },
          },
          layout: {
            padding: { top: 50, bottom: 60 },
          },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: "black",
            },
            legend: {
              labels: {
                usePointStyle: true,
              },
              title: {
                display: true,
                text: "Yearly Category Wise Expences",
              },
              position: "top",
            },
          },
        },
      });
    });
}
