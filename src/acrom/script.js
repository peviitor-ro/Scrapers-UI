const apiObj = {
  file: "acrom.py",
};

// fetch api
const fetchApi = async (apiObj) => {
  const response = await fetch(
    "http://localhost:8000/scraper/based_scraper_py/",
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
    console.log(data);
    if (data.succes) {
      document.querySelector("#status").innerHTML = "Active";
      document.querySelector("#jobs").innerHTML = data.Total;
    } else {
      document.querySelector("#status").innerHTML = "Inactive";
    }
  });
});
