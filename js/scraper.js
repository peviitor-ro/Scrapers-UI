const companyName = apiObj.file.split(".")[0];
const capitelizedCompanyName =
  companyName.charAt(0).toUpperCase() + companyName.slice(1);

const htmlTitle = document.querySelector("title");
const company = document.querySelector("#company");
htmlTitle.innerHTML = `Scraper-${capitelizedCompanyName}`;
company.innerHTML = capitelizedCompanyName;

const jobs_container = document.querySelector(".jobs");
const status_container = document.querySelector("#status");

const validator_data = {
  company: companyName,
};

const getJobs = async () => {
  const response = await fetch(validator_url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(validator_data),
  });
  const data = await response.json();
  return data;
};

let apiJobs = getJobs();

apiJobs.then((data) => {
  if (data.detail) {
    alertModalError(data.detail);
  } else if (data) {
    jobs_container.innerHTML = "";
    data.forEach((job_obj) => {
      create_job.initialize(job_obj);
    });
  }
});

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
    headers: headers,
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
      if (country.includes("Romania")) {
        citys.forEach((city) => {
          let isValidate = false;
          if (city === "All") {
            isValidate = true;
          } else {
            isValidate = getTownAndCounty(cityInRomania(city)).foudedTown;
          }
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
    } else if (typeof citys === "string" && citys !== "") {
      if (removeDiacritics(country) === "Romania") {
        let htmlDiv = document.createElement("div");

        let isValidate = false;

        if (citys === "All") {
          isValidate = true;
        } else {
          isValidate = getTownAndCounty(cityInRomania(citys)).foudedTown;
        }

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
  data.country.forEach((country) => {
    for (let countryObj of countries_list) {
      if (
        countryObj
          .toLowerCase()
          .includes(removeDiacritics(country.toLowerCase()))
      ) {
        isValidate = true;
        break;
      }
    }
  });
  return isValidate;
};

//  Create Cards for Jobs + Search Functionality
const dataJobsTemplate = document.querySelector("[data-jobs-template]");
const dataJobsContainer = document.querySelector("[data-jobs-container]");

const create_job = {
  create_tag: (tag_, class_ = null, attrs_ = null) => {
    const tag = document.createElement(tag_);
    if (attrs_) {
      for (let attr of attrs_) {
        tag.setAttribute(attr.name, attr.value);
      }
    }
    if (class_) {
      class_.split(" ").forEach((class__) => {
        tag.classList.add(class__);
      });
    }

    return tag;
  },
  initialize: (data) => {
    const card = dataJobsTemplate.content.cloneNode(true).children[0];
    const jobTitle = card.querySelector("[data-job-title]");
    const jobCompany = card.querySelector("[data-job-company]");
    const jobLocation = card.querySelector("[data-location]");
    const jobCountry = card.querySelector("[data-country]");
    const jobType = card.querySelector("[data-job-type]");
    const jobLink = card.querySelector("[data-job-link]");
    const editJobButton = card.querySelector(".edit-job");
    const statusJob = card.querySelector("[status-job]");

    // Images
    const jobCompanySvg = card.querySelector("[data-company-image]");
    const jobLocationSvg = card.querySelector("[data-location-image]");
    const jobCountrySvg = card.querySelector("[data-country-image]");
    const jobTypeSvg = card.querySelector("[data-type-image]");

    jobCompanySvg.src = "../../images/iconsScrapers/company.png";
    jobLocationSvg.src = "../../images/iconsScrapers/location.png";
    jobCountrySvg.src = "../../images/iconsScrapers/globe.png";
    jobTypeSvg.src = "../../images/iconsScrapers/freelance.png";

    card.setAttribute("data", JSON.stringify(data));

    // edit buton
    editJobButton.addEventListener("click", () => {
      const data = JSON.parse(card.getAttribute("data"));
      dataFormContainer.innerHTML = "";
      if (is_authenticated) {
        create_form.initialize(data);
        dataFormContainer.classList.toggle("hidden");
        document.body.style.overflowY = "hidden";
      } else {
        alertModalError("You are not authorized to use this scraper");
      }
    });

    // check status jobs
    if (data.edited) {
      statusJob.innerHTML +=
        "<p class='label-status edited'>This job was edited</p>";
    }
    if (data.deleted) {
      statusJob.innerHTML +=
        "<p class='label-status deleted'>This job was deleted</p>";
    }
    if (data.published) {
      statusJob.innerHTML +=
        "<p class='label-status published'>This job was published</p>";
    }

    // TITLE
    jobTitle.textContent = validate_data(data, "job_title")
      ? data.job_title
      : "No job title";

    jobTitle.classList.add(
      validate_data(data, "job_title") ? "validate" : "invalid"
    );

    // Company
    jobCompany.textContent = validate_data(data, "company")
      ? data.company
      : "No company";

    jobCompany.classList.add(
      validate_city(data, "company") ? "validate" : "invalid"
    );

    // Location
    jobLocation.innerHTML = validate_city(data)
      ? validate_city(data).map(
          (city) => (jobLocation.innerHTML = `<p>${city.innerText}</p>`)
        )
      : "No city";

    jobLocation.classList.add(validate_city(data) ? "validate" : "invalid");

    // Country
    jobCountry.textContent = validate_country(data, "country")
      ? data.country
      : data.country + " is not a country";

    jobCountry.classList.add(
      validate_country(data, "country") ? "validate" : "invalid"
    );

    // Type
    jobType.textContent =
      data.remote && data.remote.length && Array.isArray(data.remote)
        ? data.remote.map((remote) => remote).join(", ")
        : data.remote && data.remote.length
        ? data.remote
        : "No job type";

    jobType.classList.add(
      data.remote && data.remote.length ? "validate" : "invalid"
    );

    // Link
    jobLink.href = data.job_link;
    jobLink.textContent = "Vezi Postul";

    jobLink.classList.add(
      validate_link(data, "job_link") ? "validate" : "invalid"
    );

    // Set attribute
    jobLocation.setAttribute("title", "Location");

    jobCountry.setAttribute("title", "Country");

    jobType.setAttribute("title", "Job Type");

    dataJobsContainer.append(card);
  },
};

const toTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeConsole = () => {
  document.querySelector(".console").classList.toggle("hidden");
};

const button = document.querySelector("button");
const svg = document.querySelector(".bi-gear");

const status = (status_container.innerHTML = localStorage.getItem(
  `status-${companyName}`
));
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

const alertModalSuccess = (e) => {
  alertImage.src = "../../images/alert/check.png";
  alertText.innerHTML = "Success";
  if (e) {
    alertText2.innerHTML = e;
  } else {
    alertText2.innerHTML = "The number of jobs has been updated.";
  }
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
  jobs_container.innerHTML = "";
  container.style.display = "flex";
  fetchApi(apiObj)
    .then((data) => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      container.style.display = "none";

      if (data.succes) {
        fetch(validator_url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(validator_data),
        })
          .then((response) => {
            if (response.status === 401) {
              alertModalError("You are not authorized to use this scraper");
            }
            return response.json();
          })
          .then(async (data) => {
            status_container.innerHTML = "Active";
            status_container.classList.add("validate");
            document.querySelector("#jobs").innerHTML = data.length;
            document.querySelector("#last-update").innerHTML = dateTime;
            data.forEach((job) => {
              create_job.initialize(job);
            });
            localStorage.setItem(`status-${companyName}`, "Active");
            localStorage.setItem(`jobs-${companyName}`, data.length);
            localStorage.setItem(`lastUpdate-${companyName}`, dateTime);

            alertModalSuccess();
          });
      } else if (data.error) {
        status_container.classList.remove("validate");
        localStorage.setItem(`status-${companyName}`, "Inactive");
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#last-update").innerHTML = dateTime;
        status_container.innerHTML = "Inactive";
        status_container.classList.add("warning");
        jobs_container.innerHTML = noDataImage;

        document.querySelector(".console-content").innerHTML = "";
        data.error.forEach((error) => {
          // replace spaces with html space
          document.querySelector(".console-content").innerHTML +=
            error.replace(/ /g, "&nbsp;") + "</br>";
        });
        document.querySelector(".console").classList.remove("hidden");
        alertModalInvalid();
      } else if (data.detail) {
        status_container.classList.remove("validate");
        localStorage.setItem(`status-${companyName}`, data.detail);
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#last-update").innerHTML = dateTime;
        status_container.innerHTML = data.detail;
        status_container.classList.add("warning");
        jobs_container.innerHTML = noDataImage;

        document.querySelector(".console-content").innerHTML = "";
        document.querySelector(".console-content").innerHTML +=
          data.detail + "</br>";
        document.querySelector(".console").classList.remove("hidden");
        alertModalInvalid();
      } else {
        status_container.classList.remove("validate");
        localStorage.setItem(`status-${companyName}`, "Inactive");
        localStorage.setItem(`lastUpdate-${companyName}`, dateTime);
        document.querySelector("#last-update").innerHTML = dateTime;
        status_container.innerHTML = "Inactive";
        status_container.classList.add("warning");
        jobs_container.innerHTML = noDataImage;

        alertModalInvalid();
      }
    })
    .catch((e) => {
      svg.classList.toggle("rotate");
      button.disabled = false;
      status_container.innerHTML = "Api Error";
      status_container.classList.add("error");
      document.querySelector(".console").classList.remove("hidden");
      document.querySelector(".console-content").innerHTML = e + "</br>";
      document.querySelector(".console-content").innerHTML +=
        "Gettin data from peviitor database! </br>";
      alertModalError(e);

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
            status_container.innerHTML = "Database";
            status_container.classList.add("validate");
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
          status_container.innerHTML = "Database Error";
          status_container.classList.add("error");
          document.querySelector(".console").classList.remove("hidden");
          document.querySelector(".console-content").innerHTML =
            error + "</br>";
          alertModalError(error);
        });
    });
});

if (status === "Active") {
  status_container.innerHTML = localStorage.getItem(`status-${companyName}`);
  status_container.classList.add("validate");
  document.querySelector("#jobs").innerHTML = localStorage.getItem(
    `jobs-${companyName}`
  );
  document.querySelector("#last-update").innerHTML = localStorage.getItem(
    `lastUpdate-${companyName}`
  );
} else if (status === "Inactive") {
  status_container.innerHTML = localStorage.getItem(`status-${companyName}`);
  status_container.classList.add("warning");
  document.querySelector("#last-update").innerHTML = localStorage.getItem(
    `lastUpdate-${companyName}`
  );
  jobs_container.innerHTML = noDataImage;
  document.querySelector("#jobs").innerHTML = "Uknown";
} else {
  status_container.innerHTML = "Uknown";
  document.querySelector("#jobs").innerHTML = "Uknown";
  document.querySelector("#last-update").innerHTML = "Uknown";
  jobs_container.innerHTML = noDataImage;
}

// URL-ul API-ului GitHub pentru a obține contribuitorii unui repozitoriu
// const contribuitori = [];
// const testers = [];
// let uniqueTesters = [];

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

const options = ["Judet", "All"];
options.forEach((option, idx) => {
  const countyElement = document.createElement("option");
  countyElement.innerHTML = option;
  if (idx === 0) {
    countyElement.selected = true;
    countyElement.disabled = true;
  }
  judet.appendChild(countyElement);
});

counties.forEach((county) => {
  const countyElement = document.createElement("option");
  countyElement.innerHTML = Object.keys(county)[0];
  judet.appendChild(countyElement);
});

const oras = document.querySelector("#oras");

judet.addEventListener("change", () => {
  oras.innerHTML = "";
  const options = ["Oras", "All"];

  options.forEach((option, idx) => {
    const cityElement = document.createElement("option");
    cityElement.innerHTML = option;
    if (idx === 0) {
      cityElement.selected = true;
      cityElement.disabled = true;
    }
    oras.appendChild(cityElement);
  });

  counties.forEach((county) => {
    if (Object.keys(county)[0] === judet.value) {
      county[Object.keys(county)[0]].forEach((city) => {
        const cityElement = document.createElement("option");
        cityElement.innerHTML = city;
        oras.appendChild(cityElement);
      });
    }
  });

  apiJobs.then((data) => {
    if (!data) {
      alertModalError("No data in Local Storage please scrape the data first");
    } else {
      jobs_container.innerHTML = "";
      data.forEach((job) => {
        if (job.county.includes(judet.value)) {
          create_job.initialize(job);
        }
      });
    }
  });
});

oras.addEventListener("change", () => {
  apiJobs.then((data) => {
    if (!data) {
      alertModalError("No data in Local Storage please scrape the data first");
    } else {
      jobs_container.innerHTML = "";
      data.forEach((job) => {
        if (job.city.includes(oras.value)) {
          create_job.initialize(job);
        }
      });
    }
  });
});

// #######################################################

// form
const formContainer = document.querySelector(".form-container");
const form = document.querySelector(".form");
const dataFormTemplate = document.querySelector("[data-form-template]");
const dataFormContainer = document.querySelector("[data-form-container]");

// clone create_job method
const create_form = {
  create_tag: create_job.create_tag,
  initialize: (data) => {
    const card = dataFormTemplate.content.cloneNode(true).children[0];
    const addCountry = card.querySelector("[form-addCountry]");
    const addLocation = card.querySelector("[form-addLocation]");

    // Label And Inputs
    const labelTitle = card.querySelector("[form-title-label]");
    const inputTitle = card.querySelector("[form-title-input]");
    const labelCompany = card.querySelector("[form-company-label]");
    const inputCompany = card.querySelector("[form-company-input]");
    const labelRemote = card.querySelector("[form-remote-label]");
    const inputRemote = card.querySelector("[form-remote-input]");
    const labelLink = card.querySelector("[form-link-label]");
    const inputLink = card.querySelector("[form-link-input]");
    const labelCountry = card.querySelector("[form-locationCountry-label]");
    const inputCountry = card.querySelector("[form-locationCountry-input]");
    const buttonCountry = card.querySelector("[form-locationCountry-button]");
    const labelCity = card.querySelector("[form-locationCity-label]");
    const inputCity = card.querySelector("[form-locationCity-input]");
    const labelCounty = card.querySelector("[form-locationCounty-label]");
    const inputCounty = card.querySelector("[form-locationCounty-input]");

    // Select
    const selectCountry = card.querySelector("[form-locationCountry-select]");
    const selectCity = card.querySelector("[form-locationCity-select]");
    const selectCounty = card.querySelector("[form-locationCounty-select]");

    // Option
    const optionCountry = card.querySelector("[form-country-option]");
    const optionCity = card.querySelector("[form-city-option]");
    const optionCounty = card.querySelector("[form-county-option]");

    // Buttons
    const buttonCity = card.querySelector("[form-button-city]");
    const deleteButtonCity = card.querySelector("[form-deleteButton-city]");
    const buttonEditJob = card.querySelector("[form-button-editJob]");
    const buttonDeleteJob = card.querySelector("[form-button-deleteJob]");
    const buttonPublishJob = card.querySelector("[form-button-publishJob]");
    const closeFormButton = card.querySelector("[close-form]");

    // Images
    const imageTitle = card.querySelector("[form-title-img]");
    const imageCompany = card.querySelector("[form-company-img]");
    const imageLink = card.querySelector("[form-link-img]");
    const imageRemote = card.querySelector("[form-remote-img]");
    const imageCountry = card.querySelector("[form-country-img]");
    const imageCity = card.querySelector("[form-city-img]");
    const imageCounty = card.querySelector("[form-county-img]");

    // check Errors Form
    const errorTitle = card.querySelector(".form-error-jobTitle");
    const errorLink = card.querySelector(".form-error-jobLink");
    const errorCompany = card.querySelector(".form-error-companyName");

    // Close Form
    closeFormButton.addEventListener("click", () => {
      formContainer.classList.toggle("hidden");
      document.body.style.overflowY = null;
    });

    // All images
    imageTitle.src = "../../images/iconsScrapers/title.png";
    imageTitle.alt = "title";
    imageCompany.src = "../../images/iconsScrapers/company.png";
    imageCompany.alt = "company";
    imageLink.src = "../../images/iconsScrapers/link.png";
    imageLink.alt = "link";
    imageRemote.src = "../../images/iconsScrapers/freelance.png";
    imageRemote.alt = "remote";
    imageCountry.src = "../../images/iconsScrapers/globe.png";
    imageCountry.alt = "country";
    imageCity.src = "../../images/iconsScrapers/location.png";
    imageCity.alt = "city";
    imageCounty.src = "../../images/iconsScrapers/location.png";
    imageCounty.alt = "county";

    //  Titlte Input
    labelTitle.innerHTML = "Job Title";
    labelTitle.setAttribute("for", "job_title");

    const inputTitleAttribute = {
      id: "job_title",
      type: "text",
      name: "job_title",
      value: data.job_title,
      placeholder: "Job Title",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputTitleAttribute) {
      inputTitle.setAttribute(key, inputTitleAttribute[key]);
    }

    //  Company Input / Label
    labelCompany.innerHTML = "Company";
    labelCompany.setAttribute("for", "company");

    // attributes input
    const inputCompanyAttribute = {
      id: "company",
      type: "text",
      name: "company",
      value: data.company,
      placeholder: "Company",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputCompanyAttribute) {
      inputCompany.setAttribute(key, inputCompanyAttribute[key]);
    }

    //  Remote Input / Label
    labelRemote.innerHTML = "Job Type";
    labelRemote.setAttribute("for", "remote");

    // attributes input
    const inputRemoteAttribute = {
      id: "remote",
      type: "text",
      name: "remote",
      value: data.remote,
      placeholder: "Remote",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputRemoteAttribute) {
      inputRemote.setAttribute(key, inputRemoteAttribute[key]);
    }

    //  Link Input / Label

    labelLink.innerHTML = "Job Link";
    labelLink.setAttribute("for", "job_link");

    // attributes input
    const inputLinkAttribute = {
      id: "job_link",
      type: "text",
      name: "job_link",
      value: data.job_link,
      placeholder: "Job Link",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputLinkAttribute) {
      inputLink.setAttribute(key, inputLinkAttribute[key]);
    }

    //  Country Input / Label
    labelCountry.innerHTML = "Country";
    labelCountry.setAttribute("for", "country");

    // country attributes  input
    const inputCountryAttribute = {
      id: "country",
      type: "text",
      name: "country",
      value: data.country,
      placeholder: "Country",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputCountryAttribute) {
      inputCountry.setAttribute(key, inputCountryAttribute[key]);
    }

    // select Country attributes  input
    const inputSelectCountryAttribute = {
      id: "add_country",
      name: "Country",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputSelectCountryAttribute) {
      selectCountry.setAttribute(key, inputSelectCountryAttribute[key]);
    }

    buttonCountry.setAttribute("type", "button");
    buttonCountry.innerHTML = "Add Country";

    // City Input / Label
    labelCity.innerHTML = "City";
    labelCity.setAttribute("for", "city");

    // country attributes  input
    const inputCityAttribute = {
      id: "city",
      type: "text",
      name: "city",
      value: data.city,
      placeholder: "City",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputCityAttribute) {
      inputCity.setAttribute(key, inputCityAttribute[key]);
    }

    // County Input / Label
    labelCounty.innerHTML = "County";
    labelCounty.setAttribute("for", "county");

    // country attributes  input
    const inputCountyAttribute = {
      id: "county",
      type: "text",
      name: "county",
      value: data.county,
      placeholder: "County",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputCountyAttribute) {
      inputCounty.setAttribute(key, inputCountyAttribute[key]);
    }

    // select  city attributes  input
    const inputSelectCityAttribute = {
      id: "add_oras",
      name: "oras",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputSelectCityAttribute) {
      selectCity.setAttribute(key, inputSelectCityAttribute[key]);
    }

    // select county  attributes  input
    const inputSelectCountyAttribute = {
      id: "add_judet",
      name: "judet",
      required: "",
    };

    // Set attributes for the input element
    for (var key in inputSelectCountyAttribute) {
      selectCounty.setAttribute(key, inputSelectCountyAttribute[key]);
    }

    buttonCity.setAttribute("type", "button");
    buttonCity.innerHTML = "Add City";

    deleteButtonCity.setAttribute("type", "button");
    deleteButtonCity.innerHTML = "Delete Location";

    // Buttons Edit / Delete / Publish
    buttonEditJob.innerHTML = "Edit";
    buttonDeleteJob.innerHTML = data.deleted ? "Restore" : "Delete";
    buttonPublishJob.innerHTML = data.published ? "Unpublish" : "Publish";

    const country_options = ["Country", "All"];

    country_options.forEach((option, idx) => {
      optionCountry.innerHTML = option;
      if (idx === 0) {
        optionCountry.selected = true;
        optionCountry.disabled = true;
      }
    });

    // Countries List
    countries_list.forEach((country) => {
      if (!data.country.includes(country)) {
        selectCountry.innerHTML += `<option>${country}</option>`;
      }
    });

    if (data.country.includes("Romania")) {
      inputCounty.setAttribute("disabled", true);
      inputCity.setAttribute("disabled", true);
    } else {
      buttonCity.classList.add("hidden");
    }

    // Select Country
    selectCountry.addEventListener("change", () => {
      if (inputCountry.value) {
        inputCountry.value = inputCountry.value + "," + selectCountry.value;
      } else {
        inputCountry.value = selectCountry.value;
      }

      if (inputCountry.value.split(",").includes("Romania")) {
        inputCounty.setAttribute("disabled", true);
        inputCity.setAttribute("disabled", true);
        buttonCity.classList.remove("hidden");
      } else {
        inputCounty.removeAttribute("disabled");
        inputCity.removeAttribute("disabled");
        buttonCity.classList.add("hidden");
        addLocation.classList.add("hidden");
      }
    });

    const options_county = ["Judet", "All"];
    options_county.forEach((option, idx) => {
      optionCounty.innerHTML = option;
      if (idx === 0) {
        optionCounty.selected = true;
        optionCounty.disabled = true;
      }
    });

    // Add Judete in Select
    counties.forEach((county) => {
      selectCounty.innerHTML += `<option>${Object.keys(county)[0]}</option>`;
    });

    selectCounty.addEventListener("change", () => {
      selectCity.innerHTML = "";
      const options = ["Oras", "All"];

      options.forEach((option, idx) => {
        optionCity.innerHTML += option;
        if (idx === 0) {
          optionCity.selected = true;
          optionCity.disabled = true;
        }
      });

      // Add Judete in Input
      if (inputCounty.value) {
        const counties = inputCounty.value.split(",");
        if (!counties.includes(selectCounty.value)) {
          inputCounty.value = inputCounty.value + "," + selectCounty.value;
        }
      } else {
        inputCounty.value = selectCounty.value;
      }

      // Add Orase in Select
      counties.forEach((county) => {
        if (Object.keys(county)[0] === selectCounty.value) {
          county[Object.keys(county)[0]].forEach((city) => {
            if (!data.city.includes(city)) {
              selectCity.innerHTML += `<option>${city}</option>`;
            }
          });
        }
      });
    });

    // Add Orase in Input
    selectCity.addEventListener("change", () => {
      if (inputCity.value) {
        inputCity.value = inputCity.value + "," + selectCity.value;
      } else {
        inputCity.value = selectCity.value;
      }
    });

    //  Delete Inputs Oras,Judete,Country
    deleteButtonCity.addEventListener("click", () => {
      inputCountry.value = "";
      inputCounty.value = "";
      inputCity.value = "";
      inputCounty.removeAttribute("disabled");
      inputCity.removeAttribute("disabled");
      addLocation.classList.add("hidden");
    });

    buttonCountry.addEventListener("click", () => {
      addCountry.classList.toggle("hidden");
    });

    buttonCity.addEventListener("click", () => {
      addLocation.classList.toggle("hidden");
    });

    // Function to handle API requests
    const handleApiRequest = (url, data, alertSucces) => {
      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then(() => {
          formContainer.classList.toggle("hidden");
          alertSucces;
          showSpinner();
          setTimeout(() => {
            hideSpinner();
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alertModalError(e);
        });
    };

    // Verificare title,company,link

    function handleValidation(inputField, errorElement) {
      if (!inputField.value) {
        showError(inputField, errorElement);
        return true; // Error is present
      } else {
        hideError(inputField, errorElement);
        return false; // No error
      }
    }

    function showError(inputField, errorElement) {
      inputField.classList.add("inputError");
      errorElement.classList.add("form-errors");
    }

    function hideError(inputField, errorElement) {
      inputField.classList.remove("inputError");
      errorElement.classList.remove("form-errors");
    }

    // Edit job
    buttonEditJob.addEventListener("click", () => {
      const data = getFormData();

      const linkError = handleValidation(inputLink, errorLink);
      const companyError = handleValidation(inputCompany, errorCompany);
      const titleError = handleValidation(inputTitle, errorTitle);

      if (linkError || companyError || titleError) {
        console.log("Validation failed");
      } else {
        handleApiRequest(
          editUrl,
          data,
          alertModalSuccess("The job has been updated!")
        );
      }
    });

    // Delete job
    buttonDeleteJob.addEventListener("click", () => {
      const data = getFormData();
      const alert =
        buttonDeleteJob.innerText === "Restore"
          ? alertModalSuccess("The job has been restored!")
          : alertModalSuccess("The job has been deleted!");
      handleApiRequest(deleteUrl, data, alert);
    });

    // Publish job
    buttonPublishJob.addEventListener("click", () => {
      const data = getFormData();
      const alert =
        buttonPublishJob.innerText === "Publish"
          ? alertModalSuccess("The job has been published!")
          : alertModalSuccess("The job has been unpublished!");
      handleApiRequest(publishUrl, data, alert);
    });

    // Function to get form data
    const getFormData = () => {
      const jobTitle = inputTitle.value;
      const company = inputCompany.value;
      const remote = inputRemote.value;
      const jobLink = inputLink.value;
      const country = inputCountry.value.split(",");
      const city = inputCity.value.split(",");
      const county = inputCounty.value.split(",");

      return [
        {
          job_title: jobTitle,
          company,
          remote,
          job_link: jobLink,
          country,
          city,
          county,
        },
      ];
    };

    dataFormContainer.append(card);
  },
};

// Spinner
function showSpinner() {
  const spinnerContainer = document.createElement("div");
  spinnerContainer.id = "spinner-container";

  const spinner = document.createElement("div");
  spinner.id = "spinner";

  spinnerContainer.appendChild(spinner);
  document.body.appendChild(spinnerContainer);
}

function hideSpinner() {
  const spinnerContainer = document.getElementById("spinner-container");
  if (spinnerContainer) {
    spinnerContainer.remove();
  }
}
