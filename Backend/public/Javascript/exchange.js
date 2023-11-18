const find = document.getElementById("convert");
find.addEventListener("submit", () => {
  let value = {
    "Australian Dollar": 54.01,
    "United Arab Dirham": 22.67,
    "United States Dollar": 83.29,
    "Argentine Peso": 0.24,
    "British Pound Sterling": 103.35,
    "Brazilian Real": 17.12,
    "Israeli New Shekel": 22.34,
    "Canadian Dollar": 60.59,
    "Swiss Franc": 93.85,
    "Chinese Yuan": 11.5,
    "Japanese Yen": 0.56,
    "Russian Ruble": 0.93,
    "Singapore Dollar": 61.89,
    "Pakistani Rupee": 0.29,
    "Bangladeshi taka": 0.75,
    "Nepalese rupee": 0.63,
    "Sri Lankan rupee ": 0.25,
    "Bhutanese Ngultrum": 1,
    "Indian Rupee": 1,
  };
  const name = document.getElementById("from-convert").value;
  const base = Number(value[name]);
  //   const convert = value["Australian Dollar"];
  const val = document.getElementById("from-convert1").value;

  const result = val * base;

  document.getElementById("to-convert").value = result;
});
