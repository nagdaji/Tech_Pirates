async function liverates() {
  //   const Tid = document.getElementById("deleteTid" + a).innerHTML;

  //   const add_entry = {
  //     email: document.getElementById("pagemail").innerHTML,
  //     // Tid: Tid,
  //   };
  //   gold
  await fetch(
    // "https://api.metalpriceapi.com/v1/latest?api_key=c2f8020136e0a556d37d0fd9332a095e&base=XAU&currencies=INR",
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

  // Silver
  await fetch(
    // "https://api.metalpriceapi.com/v1/latest?api_key=c2f8020136e0a556d37d0fd9332a095e&base=XAG&currencies=INR",
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
