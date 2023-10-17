const companyName = apiObj.file.split(".")[0];
const capitelizedCompanyName =
  companyName.charAt(0).toUpperCase() + companyName.slice(1);

const htmlTitle = document.querySelector("title");
const company = document.querySelector("#company");
htmlTitle.innerHTML = `Scraper-${capitelizedCompanyName}`;
company.innerHTML = capitelizedCompanyName;

const cityInRomania = (city) => {
  const cities = {
    bucharest: "Bucuresti",
  };

  if (cities[city.toLowerCase()]) {
    return cities[city.toLowerCase()];
  }
  return city;
};

// fetch api
const fetchApi = async (apiObj) => {
  const response = await fetch(apiObj.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiObj),
  });
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

const validate_city = (data) => {
  let validatedData = [];
  let citys = data.city;
  let jobType = data.remote;
  let country = data.country;
  if (jobType && jobType.includes("Remote")) {
    if (typeof citys === "object") {
      citys.forEach((city) => {
        let htmlDiv = document.createElement("div");
        htmlDiv.classList.add("validate");
        htmlDiv.innerHTML = city;
        validatedData.push(htmlDiv);
      });
    } else if (typeof citys === "string") {
      let htmlDiv = document.createElement("div");
      htmlDiv.classList.add("validate");
      htmlDiv.innerHTML = citys;
      validatedData.push(htmlDiv);
    }
  } else {
    if (typeof citys === "object") {
      if (removeDiacritics(country) === "Romania") {
        citys.forEach((city) => {
          let isValidate = getTownAndCounty(cityInRomania(city)).foudedTown;
          let htmlDiv = document.createElement("div");
          if (isValidate) {
            htmlDiv.classList.add("validate");
            htmlDiv.innerHTML = city;
            validatedData.push(htmlDiv);
          } else {
            htmlDiv.classList.add("invalid");
            htmlDiv.innerHTML = `${city} is not a city in Romania`;
            validatedData.push(htmlDiv);
          }
        });
      } else {
        citys.forEach((city) => {
          let htmlDiv = document.createElement("div");
          htmlDiv.classList.add("validate");
          htmlDiv.innerHTML = city;
          validatedData.push(htmlDiv);
        });
      }
    } else if (typeof citys === "string") {
      if (removeDiacritics(country) === "Romania") {
        let htmlDiv = document.createElement("div");
        let isValidate = getTownAndCounty(cityInRomania(citys)).foudedTown;
        if (isValidate) {
          htmlDiv.classList.add("validate");
          htmlDiv.innerHTML = citys;
          validatedData.push(htmlDiv);
        } else {
          if (citys === "") {
            htmlDiv.classList.add("invalid");
            htmlDiv.innerHTML = `No city`;
            validatedData.push(htmlDiv);
          } else {
            htmlDiv.classList.add("invalid");
            htmlDiv.innerHTML = `${citys} is not a city in Romania`;
            validatedData.push(htmlDiv);
          }
        }
      } else {
        if (citys === "") {
          let htmlDiv = document.createElement("div");
          htmlDiv.classList.add("invalid");
          htmlDiv.innerHTML = `No city`;
          validatedData.push(htmlDiv);
        } else {
          let htmlDiv = document.createElement("div");
          htmlDiv.classList.add("validate");
          htmlDiv.innerHTML = citys;
          validatedData.push(htmlDiv);
        }
      }
    }
  }

  return validatedData;
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
    <div>
      <h2 class="job-title ${
        validate_data(data, "job_title") ? "validate" : "invalid"
      }">
            ${
              validate_data(data, "job_title") ? data.job_title : "No job title"
            }
      </h2>
      <div class="job-company ${
        validate_data(data, "company") ? "validate" : "invalid"
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#979c9e" class="bi bi-buildings" viewBox="0 0 16 16" >
          <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
          <path d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
        </svg>
          ${validate_data(data, "company") ? data.company : "No company"}
      </div>
      </div>
      <div>
      <div class="job-location" title="Location">
          <div class="location-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34421 3.29018 4.43656 4.6967 3.03003C6.10322 1.62351 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62351 15.3033 3.03003C16.7098 4.43656 17.5 6.34421 17.5 8.33334Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95262 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95262 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${
              validate_city(data)
                ? validate_city(data).map((city) => city.outerHTML)
                : "<div class='invalid'>No city</div>"
            }
          </div>
          <div class="country-container" title="Country">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-globe-americas" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z"/>
            </svg>
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
          <div class="job-type-container" title="Job Type">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-workspace" viewBox="0 0 16 16">
              <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
              <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z"/>
            </svg>
            <div class="${data.remote && data.remote.length ? "validate" : "invalid"}">
                ${data.remote && data.remote.length ? data.remote.map((remote) => remote).join(", ") : "No job type"}
            </div>
          </div>
      </div>
      <div class="job_link-container">
        <a href="${data.job_link}" class="
          ${validate_link(data, "job_link") ? "validate" : "invalid"}"
          target="_blank"
          ">
              Vezi Postul 
        </a>
      </div>
      </div>
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
  today.getDate() +
  "-" +
  today.toLocaleString("en", { month: "long" }) +
  "-" +
  today.getFullYear();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = time + "<br>" + date;

for (let i = 0; i < 9; i++) {
  container.append(cardTemplate.content.cloneNode(true));
}

const noDataImage = `
        <div class='no-data'>
        <img src="https://icon-library.com/images/no-data-icon/no-data-icon-4.jpg" alt="no-data"/>
        <p>No data in Local Storage</p>
        </div>
        `;

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
        document.querySelector("#last-update").innerHTML = dateTime;
        document.querySelector("#status").innerHTML = "Inactive";
        document.querySelector(".jobs").innerHTML = noDataImage;
      }
    })
    .catch((e) => {
      console.log(e);
      svg.classList.toggle("rotate");
      button.disabled = false;
      document.querySelector("#status").innerHTML = "Api Error";
    });
});

if (datasave !== null) {
  datasave.forEach((post) => {
    create_job(post);
  });
} else if (status === "Inactive") {
  document.querySelector("#status").innerHTML = localStorage.getItem(
    `status-${companyName}`
  );
  document.querySelector("#last-update").innerHTML = localStorage.getItem(
    `lastUpdate-${companyName}`
  );
  document.querySelector(".jobs").innerHTML = noDataImage;
  document.querySelector("#jobs").innerHTML = "Uknown";
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

// Show more Content

const showMore = document.querySelector(".show-more");
const content = document.querySelector("#text-company");

if (content.innerText.length > 400) {
  showMore.addEventListener("click", () => {
    if (showMore.innerText === "Show More") {
      content.classList.add("content");
      content.classList.remove("hideContent");
      showMore.innerText = "Show Less";
    } else {
      content.classList.remove("content");
      content.classList.add("hideContent");
      showMore.innerText = "Show More";
    }
  });
} else {
  content.classList.add("content");
  content.classList.remove("hideContent");
  showMore.style.display = "none";
}
