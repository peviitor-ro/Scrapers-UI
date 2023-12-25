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
    data[keyword].startsWith("http")
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
  if (
    (jobType && jobType.includes("Remote")) ||
    (jobType && jobType.includes("remote"))
  ) {
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
    if (
      city.name
        .toLowerCase()
        .includes(removeDiacritics(data.country.toLowerCase()))
    ) {
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
      <div class="container-JobLocation">
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
            <div class="${
              data.remote && data.remote.length ? "validate" : "invalid"
            }">
                ${
                  data.remote &&
                  data.remote.length &&
                  Array.isArray(data.remote)
                    ? data.remote.map((remote) => remote).join(", ")
                    : data.remote && data.remote.length
                    ? data.remote
                    : "No job type"
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

const closeConsole = () => {
  document.querySelector(".console").classList.toggle("hidden");
};

const button = document.querySelector("button");
const svg = document.querySelector(".bi-gear");

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
const minutes = today.getMinutes();
const minutesIF = minutes > 9 ? minutes : "0" + minutes;
const time = today.getHours() + ":" + minutesIF + ":" + today.getSeconds();
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

// Alerts

const alertPopUp = document.querySelector(".alertPopUp");
const closeIcon = document.querySelector(".close");
const progress = document.querySelector(".progress");
const alertText = document.querySelector(".alert-text-1");
const alertText2 = document.querySelector(".alert-text-2");
const alertImage = document.querySelector("#image-alert");

let timer1, timer2;

const alertShow = () => {
  alertPopUp.style.display = "block";
  alertPopUp.classList.add("active");
  progress.classList.add("active");

  timer1 = setTimeout(() => {
    alertPopUp.classList.remove("active");
  }, 3000);

  timer2 = setTimeout(() => {
    progress.classList.remove("active");
  }, 3000);
};

const alertModalSuccess = () => {
  alertImage.src = "../../images/alert/check.png";
  alertText.innerHTML = "Success";
  alertText2.innerHTML = "The number of jobs has been updated.";
  alertShow();
};

const alertModalInvalid = () => {
  alertImage.src = "../../images/alert/invalid.png";
  alertText.innerHTML = "Status Inactive";
  alertText2.innerHTML = "Something went wrong";
  alertShow();
};

const alertModalError = (e) => {
  alertImage.src = "../../images/alert/error.png";
  alertText.innerHTML = "Error";
  alertText2.innerHTML = `${e}`;
  alertShow();
};
const alertModalDelete = (e) => {
  alertImage.src = "../../images/alert/check.png";
  alertText.innerHTML = "Success";
  alertText2.innerHTML = "Local Storage was deleted successfully";
  alertShow();
};

closeIcon.addEventListener("click", () => {
  alertPopUp.classList.remove("active");

  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);

  clearTimeout(timer1);
  clearTimeout(timer2);
});

button.addEventListener("click", () => {
  svg.classList.toggle("rotate");
  button.disabled = true;
  document.querySelector(".jobs").innerHTML = "";
  container.style.display = "flex";
  fetchApi(apiObj)
    .then((data) => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      container.style.display = "none";

      if (data.succes) {
        document.querySelector("#status").innerHTML = "Active";
        document.querySelector("#status").classList.add("validate");
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
        alertModalSuccess();
      } else if (data.error) {
        document.querySelector("#status").classList.remove("validate");
        localStorage.setItem(`status-${companyName}`, "Inactive");
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#last-update").innerHTML = dateTime;
        document.querySelector("#status").innerHTML = "Inactive";
        document.querySelector("#status").classList.add("warning");
        document.querySelector(".jobs").innerHTML = noDataImage;

        document.querySelector(".console-content").innerHTML = "";
        data.error.forEach((error) => {
          // replace spaces with html space
          document.querySelector(".console-content").innerHTML +=
            error.replace(/ /g, "&nbsp;") + "</br>";
        });
        document.querySelector(".console").classList.remove("hidden");
        alertModalInvalid();
      } else {
        document.querySelector("#status").classList.remove("validate");
        localStorage.setItem(`status-${companyName}`, "Inactive");
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#last-update").innerHTML = dateTime;
        document.querySelector("#status").innerHTML = "Inactive";
        document.querySelector("#status").classList.add("warning");
        document.querySelector(".jobs").innerHTML = noDataImage;

        alertModalInvalid();
      }
    })
    .catch((e) => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      document.querySelector("#status").innerHTML = "Api Error";
      document.querySelector("#status").classList.add("error");
      document.querySelector(".console").classList.remove("hidden");
      document.querySelector(".console-content").innerHTML = e + "</br>";
      document.querySelector(".console-content").innerHTML +=
        "Gettin data from peviitor database! </br>";
      alertModalError(e);

      const peviitorUrl = "https://dev.laurentiumarian.ro";
      const data = { company: companyName };

      fetch(peviitorUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.succes) {
            document.querySelector("#status").innerHTML = "Database";
            document.querySelector("#status").classList.add("validate");
            document.querySelector("#jobs").innerHTML = data.Total;
            document.querySelector("#last-update").innerHTML = dateTime;
            data.succes.forEach((job) => {
              const editedJob = {
                job_title: job.job_title[0],
                company: job.company[0],
                city: job.city,
                country: removeDiacritics(job.country[0]),
                remote: job.remote,
                job_link: job.job_link[0],
              };
              create_job(editedJob);
            });
            container.style.display = "none";
            setTimeout(() => {
              alertModalSuccess();
            }, 3000);
          }
        })
        .catch((error) => {
          document.querySelector("#status").innerHTML = "Database Error";
          document.querySelector("#status").classList.add("error");
          document.querySelector(".console").classList.remove("hidden");
          document.querySelector(".console-content").innerHTML =
            error + "</br>";
          alertModalError(error);
        });
    });
});

if (datasave !== null) {
  datasave.forEach((post) => {
    create_job(post);
  });
}
if (status === "Active") {
  document.querySelector("#status").innerHTML = localStorage.getItem(
    `status-${companyName}`
  );
  document.querySelector("#status").classList.add("validate");
  document.querySelector("#jobs").innerHTML = localStorage.getItem(
    `jobs-${companyName}`
  );
  document.querySelector("#last-update").innerHTML = localStorage.getItem(
    `lastUpdate-${companyName}`
  );
} else if (status === "Inactive") {
  document.querySelector("#status").innerHTML = localStorage.getItem(
    `status-${companyName}`
  );
  document.querySelector("#status").classList.add("warning");
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
  document.querySelector("#status").classList.remove("validate");
  document.querySelector("#status").classList.remove("warning");
  document.querySelector("#status").classList.remove("error");
  localStorage.removeItem(`data-${companyName}`);
  localStorage.removeItem(`status-${companyName}`);
  localStorage.removeItem(`jobs-${companyName}`);
  localStorage.removeItem(`lastUpdate-${companyName}`);
  document.querySelector(".jobs").innerHTML = noDataImage;
  document.querySelector("#status").innerHTML = "Uknown";
  document.querySelector("#jobs").innerHTML = "Uknown";
  document.querySelector("#last-update").innerHTML = "Uknown";
  alertModalDelete();
});

// URL-ul API-ului GitHub pentru a obține contribuitorii unui repozitoriu
const repoOwner = "peviitor-ro";
const repoName = apiObj.url.split("/")[4];

const contribuitori = [];
const testers = [];
let uniqueTesters = [];
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const issuesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

// fetch(contributorsUrl)
//   .then((response) => response.json())
//   .then((contributors) => {
//     const contributorsContainer = document.querySelector("#contributors");
//     contributors.forEach((contributor) => {
//       const contributorElement = document.createElement("p");
//       contributorElement.innerHTML = contributor.login;
//       contributorsContainer.appendChild(contributorElement);
//     });
//   })
//   .catch((error) => {
//     console.error("Eroare:", error);
//   });

// fetch(issuesUrl)
//   .then((response) => response.json())
//   .then((issues) => {
//     issues.forEach((issue) => {
//       testers.push(issue.user.login);
//     });
//     uniqueTesters = [...new Set(testers)];
//   })
//   .then(() => {
//     const testersContainer = document.querySelector("#testers");
//     uniqueTesters.forEach((tester) => {
//       const testerElement = document.createElement("p");
//       testerElement.innerHTML = tester;
//       testersContainer.appendChild(testerElement);
//     });
//   })
//   .catch((error) => {
//     console.error("Eroare:", error);
//   });

// buttons on mobile

if (window.innerWidth < 640) {
  const buttons = document.querySelectorAll(".functionality-buttons");
  buttons.forEach((e) => e.classList.toggle("display-none"));
}

// NavBar on scroll
let last_known_scroll_position = 0;
const headerFilter = document.querySelector(".header-filter-container");
const headerFilter2 = document.querySelector(".header-filter-container2");

window.addEventListener("scroll", () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > last_known_scroll_position) {
    headerFilter2.classList.add("header-filter-show2");
    setTimeout(() => {
      headerFilter.classList.add("header-filter-show");
    }, "500");
  } else {
    headerFilter.classList.remove("header-filter-show");
    setTimeout(() => {
      headerFilter2.classList.remove("header-filter-show2");
    }, "200");
  }
  last_known_scroll_position = st <= 0 ? 0 : st;
});

// Navbar Mobile Open/Close
const headerLinksMobile = document.querySelector(".header-links");
const openHeaderLinks = document.querySelector(".header-mobile");
const closeHeaderLinks = document.querySelector(".close-header-links");

openHeaderLinks.addEventListener("click", () => {
  headerLinksMobile.classList.add("header-links-show");
  document.body.style.overflowY = "hidden";
});

closeHeaderLinks.addEventListener("click", () => {
  headerLinksMobile.classList.remove("header-links-show");
  document.body.style.overflowY = null;
});

const filterMobile = document.querySelector(".header-filter-mobile");
const headerFilterMobile = document.querySelector(".header-filters");
const closeFilter = document.querySelector(".close-header");

filterMobile.addEventListener("click", () => {
  headerFilterMobile.classList.add("display-flex");
  document.body.style.overflowY = "hidden";
});

closeFilter.addEventListener("click", () => {
  headerFilterMobile.classList.remove("display-flex");
  document.body.style.overflowY = null;
});

// Filters
const judet = document.querySelector("#judet");

counties.forEach((county) => {
  const countyElement = document.createElement("option");
  countyElement.innerHTML = Object.keys(county)[0];
  judet.appendChild(countyElement);
})

const oras = document.querySelector("#oras");

judet.addEventListener("change", () => {
  oras.innerHTML = "";
  const cityElement = document.createElement("option");
  cityElement.innerHTML = "Oras";
  cityElement.selected = true;
  cityElement.disabled = true;
  oras.appendChild(cityElement);
  counties.forEach((county) => {
    if (Object.keys(county)[0] === judet.value) {
      county[Object.keys(county)[0]].forEach((city) => {
        const cityElement = document.createElement("option");
        cityElement.innerHTML = city;
        oras.appendChild(cityElement);
      });
    }
  });

  data = JSON.parse(localStorage.getItem(`data-${companyName}`));

  if (!data){
    alertModalError("No data in Local Storage please scrape the data first");
  }else{
    document.querySelector(".jobs").innerHTML = "";
    data.forEach((job) => {
      if (job.county.includes(judet.value)) {
        create_job(job);
      }
    });
  }
});

oras.addEventListener("change", () => {
  data = JSON.parse(localStorage.getItem(`data-${companyName}`));

  if (!data){
    alertModalError("No data in Local Storage please scrape the data first");
  }else{
    document.querySelector(".jobs").innerHTML = "";
    data.forEach((job) => {
      if (job.city.includes(oras.value)) {
        create_job(job);
      }
    });
  }
})

// #######################################################