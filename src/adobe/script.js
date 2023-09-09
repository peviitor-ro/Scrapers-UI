const apiObj = {
  file: "adobe.py",
};

// fetch api
const fetchApi = async (apiObj) => {
  const response = await fetch(
    "https://dev.laurentiumarian.ro/scraper/based_scraper_py/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObj),
    }
  );
  const data = await response.json();
  return data;
};

const button = document.querySelector("button");
const svg = document.querySelector("svg");

button.addEventListener("click", () => {
  svg.classList.toggle("rotate");
  button.disabled = true;
  fetchApi(apiObj).then((data) => {
    svg.classList.toggle("rotate");
    button.disabled = false;
    if (data.succes) {
      document.querySelector("#status").innerHTML = "Active";
      document.querySelector("#jobs").innerHTML = data.Total;
    } else {
      document.querySelector("#status").innerHTML = "Inactive";
    }
  }).catch(() => {
    svg.classList.toggle("rotate");
    button.disabled = false;
    document.querySelector("#status").innerHTML = "Api Error";
  });
});
