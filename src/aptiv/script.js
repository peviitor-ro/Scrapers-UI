// De Modificat
const apiObj = {
  file: "aptiv.js",
  url: "https://dev.laurentiumarian.ro/scraper/based_scraper_js/",
};
// ##########################################

const companyName = apiObj.file.split(".")[0];
const capitelizedCompanyName =
  companyName.charAt(0).toUpperCase() + companyName.slice(1);

const htmlTitle = document.querySelector("title");
const company = document.querySelector("#company");
htmlTitle.innerHTML = `Scraper-${capitelizedCompanyName}`;
company.innerHTML = capitelizedCompanyName;

// fetch api
const fetchApi = async (apiObj) => {
  const response = await fetch(
    apiObj.url,
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

const validate_data = (data, keyword) => {
  let isValidate = false;
  if (
    data[keyword] !== undefined &&
    data[keyword] !== null &&
    data[keyword] !== ""
  ) {
    isValidate = true;
  }
  return isValidate;
};

const validate_link = (data, keyword) => {
  let isValidate = false;
  if (
    data[keyword] !== undefined &&
    data[keyword] !== null &&
    data[keyword] !== "" &&
    data[keyword].includes("https://")
  ) {
    isValidate = true;
  }
  return isValidate;
};

const validate_country = (data, keyword) => {
  let isValidate = false;
  for (let city of countries) {
    if (city.name.toLowerCase().includes(data.country.toLowerCase())) {
      isValidate = true;
      break;
    }
  }
  return isValidate;
};

const create_job = (data) => {
  let jobElement = document.createElement("div");
  jobElement.classList.add("job");
  jobElement.innerHTML = `
  <div class="details-container">
      <h2 class="job-title ${
        validate_data(data, "job_title") ? "validate" : "invalid"
      }">
          ${validate_data(data, "job_title") ? data.job_title : "No job title"}
      </h2>
      <div class="job-company ${
        validate_data(data, "company") ? "validate" : "invalid"
      }">
          ${validate_data(data, "company") ? data.company : "No company"}
      </div>
      <div class="job-location">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34421 3.29018 4.43656 4.6967 3.03003C6.10322 1.62351 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62351 15.3033 3.03003C16.7098 4.43656 17.5 6.34421 17.5 8.33334Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95262 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95262 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="${
              validate_data(data, "city") ? "validate" : "invalid"
            }">
                ${validate_data(data, "city") ? data.city : "No city"}
            </div>,
            <div class="${
              validate_country(data, "country") ? "validate" : "invalid"
            }">
                ${
                  validate_country(data, "country")
                    ? data.country
                    : data.country + " is not a country"
                }
            </div> 
      </div>
    </div>
      <div class="job_link-container">
      <a href="${data.job_link}" class="
      ${validate_link(data, "job_link") ? "validate" : "invalid"}"
      target="_blank"
      ">
          Vezi Postul 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 4.99988M19 12L12 18.9999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </a>
      </div>
  `;
  document.querySelector(".jobs").appendChild(jobElement);
};

const toTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const button = document.querySelector("button");
const svg = document.querySelector("svg");

const status = (document.querySelector("#status").innerHTML =
  localStorage.getItem(`status-${companyName}`));
const jobsTotal = (document.querySelector("#jobs").innerHTML =
  localStorage.getItem(`jobs-${companyName}`));
const lastUpdate = (document.querySelector("#last-update").innerHTML =
  localStorage.getItem(`lastUpdate-${companyName}`));
const datasave = JSON.parse(localStorage.getItem(`data-${companyName}`));

const container = document.querySelector(".skeleton-jobs");
const cardTemplate = document.getElementById("card-template");

const today = new Date();
const date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + " " + time;

for (let i = 0; i < 9; i++) {
  container.append(cardTemplate.content.cloneNode(true));
}

button.addEventListener("click", () => {
  svg.classList.toggle("rotate");
  button.disabled = true;
  document.querySelector(".jobs").innerHTML = "";
  container.style.display = "grid";
  fetchApi(apiObj)
    .then((data) => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      container.style.display = "none";
      if (data.succes) {
        document.querySelector("#status").innerHTML = "Active";
        document.querySelector("#jobs").innerHTML = data.Total;
        document.querySelector("#last-update").innerHTML = dateTime;
        data.succes.forEach((job) => {
          create_job(job);
        });
        localStorage.setItem(
          `data-${companyName}`,
          JSON.stringify(data.succes)
        );
        localStorage.setItem(`status-${companyName}`, "Active");
        localStorage.setItem(`jobs-${companyName}`, data.Total);
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
      } else {
        localStorage.setItem(`status-${companyName}`, "Inactive");
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#status").innerHTML = "Inactive";
      }
    })
    .catch(() => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      document.querySelector("#status").innerHTML = "Api Error";
    });
});

const noDataImage = `
<div class='no-data'>
  <img src="https://icon-library.com/images/no-data-icon/no-data-icon-4.jpg" alt="no-data"/>
   <p>No data in Local Storage</p>
</div>
`;

if (datasave !== null) {
  datasave.forEach((post) => {
    create_job(post);
  });
} else {
  document.querySelector("#status").innerHTML = "Uknown";
  document.querySelector("#jobs").innerHTML = "Uknown";
  document.querySelector("#last-update").innerHTML = "Uknown";
  document.querySelector(".jobs").innerHTML = noDataImage;
}

const removeLocalStorage = document.querySelector(".delete-storage");

removeLocalStorage.addEventListener("click", () => {
  localStorage.removeItem(`data-${companyName}`);
  localStorage.removeItem(`status-${companyName}`);
  localStorage.removeItem(`jobs-${companyName}`);
  localStorage.removeItem(`lastUpdate-${companyName}`);
  document.querySelector(".jobs").innerHTML = noDataImage;
  document.querySelector("#status").innerHTML = "Uknown";
  document.querySelector("#jobs").innerHTML = "Uknown";
  document.querySelector("#last-update").innerHTML = "Uknown";
});
