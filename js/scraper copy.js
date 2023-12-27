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

//  Create Cards for Jobs + Search Functionality
const dataJobsTemplate = document.querySelector("[data-jobs-template]");
const dataJobsContainer = document.querySelector("[data-jobs-container]");
const searchInput = document.querySelector("[data-search]");
const searchNoFound = document.querySelector(".search-noFound");

let filtrareJoburi = [];

searchInput.addEventListener("input", (e) => {
  const checkData = JSON.parse(localStorage.getItem(`data-${companyName}`));
  let value = e.target.value.toLowerCase().replace(/\s+/g, "");
  if (!checkData) {
    alertModalError("No data in Local Storage please scrape the data first");
  } else {
    let nrJobs = filtrareJoburi.filter((e) => {
      const isVisible = e.title
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(value);
      e.card.classList.toggle("hideJobsCard", !isVisible);
      return isVisible;
    });

    if (nrJobs.length == 0) {
      searchNoFound.innerHTML = `Nu am gasit nici un job cu numele <strong>${value}</strong> !`;
    } else {
      searchNoFound.innerHTML = "";
    }
  }
});

//

const judet = document.querySelector("#judet");
const oras = document.querySelector("#oras");
let toateJudetele = "";

counties.forEach((e) => {
  const dropdownJudete = Object.keys(e).map((key) => {
    return (toateJudetele += `<option value="${key}"> ${key}</option>`);
  });

  judet.innerHTML =
    "<option disabled selected hidden>Judet</option>" +
    "<option value='all'>All</option>" +
    dropdownJudete.join("");
});

judet.addEventListener("change", () => {
  const checkData = JSON.parse(localStorage.getItem(`data-${companyName}`));
  if (!checkData) {
    judet.selectedIndex = 0;
    alertModalError("No data in Local Storage please scrape the data first");
  } else {
    filtrareJoburi.forEach((e) => {
      if (judet.value == "all") {
        e.card.classList.remove("hideJobsCard");
      } else {
        const isVisible = e.county
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(judet.value.toLowerCase().replace(/\s+/g, ""));
        e.card.classList.toggle("hideJobsCard", !isVisible);
      }
    });
  }
});
//

// asdasds
// const judet = document.querySelector("#judet");

// const options = ["Judet", "All"];
// options.forEach((option, idx) => {
//   const countyElement = document.createElement("option");
//   countyElement.innerHTML = option;
//   if (idx === 0) {
//     countyElement.selected = true;
//     countyElement.disabled = true;
//   }
//   judet.appendChild(countyElement);
// });

// counties.forEach((county) => {
//   const countyElement = document.createElement("option");
//   countyElement.innerHTML = Object.keys(county)[0];
//   judet.appendChild(countyElement);
// });

// const oras = document.querySelector("#oras");

// judet.addEventListener("change", () => {
//   oras.innerHTML = "";
//   const options = ["Oras", "All"];

//   options.forEach((option, idx) => {
//     const cityElement = document.createElement("option");
//     cityElement.innerHTML = option;
//     if (idx === 0) {
//       cityElement.selected = true;
//       cityElement.disabled = true;
//     }
//     oras.appendChild(cityElement);
//   });

//   counties.forEach((county) => {
//     if (Object.keys(county)[0] === judet.value) {
//       county[Object.keys(county)[0]].forEach((city) => {
//         const cityElement = document.createElement("option");
//         cityElement.innerHTML = city;
//         oras.appendChild(cityElement);
//       });
//     }
//   });

//   data = JSON.parse(localStorage.getItem(`data-${companyName}`));

//   if (!data) {
//     alertModalError("No data in Local Storage please scrape the data first");
//   } else {
//     document.querySelector(".jobs").innerHTML = "";
//     data.forEach((job) => {
//       if (job.county.includes(judet.value)) {
//         create_job(job);
//       }
//     });
//   }
// });

// oras.addEventListener("change", () => {
//   data = JSON.parse(localStorage.getItem(`data-${companyName}`));

//   if (!data) {
//     alertModalError("No data in Local Storage please scrape the data first");
//   } else {
//     document.querySelector(".jobs").innerHTML = "";
//     data.forEach((job) => {
//       if (job.city.includes(oras.value)) {
//         create_job(job);
//       }
//     });
//   }
// });

// #######################################################

const create_job = (job) => {
  filtrareJoburi = job.map((data) => {
    const card = dataJobsTemplate.content.cloneNode(true).children[0];
    const jobTitle = card.querySelector("[data-job-title]");
    const jobCompany = card.querySelector("[data-job-company]");
    const jobLocation = card.querySelector("[data-location]");
    const jobCountry = card.querySelector("[data-country]");
    const jobType = card.querySelector("[data-job-type]");
    const jobLink = card.querySelector("[data-job-link]");

    const jobCompanySvg = card.querySelector("[data-company-image]");
    const jobLocationSvg = card.querySelector("[data-location-image]");
    const jobCountrySvg = card.querySelector("[data-country-image]");
    const jobTypeSvg = card.querySelector("[data-type-image]");

    jobCompanySvg.src = "../../images/iconsScrapers/company.png";
    jobLocationSvg.src = "../../images/iconsScrapers/location.png";
    jobCountrySvg.src = "../../images/iconsScrapers/globe.png";
    jobTypeSvg.src = "../../images/iconsScrapers/freelance.png";

    jobTitle.textContent = validate_data(data, "job_title")
      ? data.job_title
      : "No job title";

    jobTitle.classList.add(
      validate_data(data, "job_title") ? "validate" : "invalid"
    );

    jobCompany.textContent = validate_data(data, "company")
      ? data.company
      : "No company";

    jobCompany.classList.add(
      validate_city(data, "company") ? "validate" : "invalid"
    );

    jobLocation.innerHTML = validate_city(data)
      ? validate_city(data).map((city) => city.outerHTML)
      : "No city";

    jobLocation.classList.add(validate_city(data) ? "validate" : "invalid");

    jobCountry.textContent = validate_country(data, "country")
      ? data.country
      : data.country + " is not a country";

    jobCountry.classList.add(
      validate_country(data, "country") ? "validate" : "invalid"
    );

    jobType.textContent =
      data.remote && data.remote.length && Array.isArray(data.remote)
        ? data.remote.map((remote) => remote).join(", ")
        : data.remote && data.remote.length
        ? data.remote
        : "No job type";

    jobType.classList.add(
      data.remote && data.remote.length ? "validate" : "invalid"
    );

    jobLink.href = data.job_link;
    jobLink.textContent = "Vezi Postul";

    jobLink.classList.add(
      validate_link(data, "job_link") ? "validate" : "invalid"
    );

    dataJobsContainer.append(card);
    return { title: data.job_title, card: card, county: data.county };
  });
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
        create_job(data.succes);
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
  create_job(datasave);
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

console.log(repoName);
const contribuitori = [];
const testers = [];
let uniqueTesters = [];
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const issuesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

fetch(contributorsUrl)
  .then((response) => response.json())
  .then((contributors) => {
    const contributorsContainer = document.querySelector("#contributors");
    contributors.forEach((contributor) => {
      const contributorElement = document.createElement("p");
      contributorElement.innerHTML = contributor.login;
      contributorsContainer.appendChild(contributorElement);
    });
  })
  .catch((error) => {
    console.error("Eroare:", error);
  });

fetch(issuesUrl)
  .then((response) => response.json())
  .then((issues) => {
    issues.forEach((issue) => {
      testers.push(issue.user.login);
    });
    uniqueTesters = [...new Set(testers)];
  })
  .then(() => {
    const testersContainer = document.querySelector("#testers");
    uniqueTesters.forEach((tester) => {
      const testerElement = document.createElement("p");
      testerElement.innerHTML = tester;
      testersContainer.appendChild(testerElement);
    });
  })
  .catch((error) => {
    console.error("Eroare:", error);
  });

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
