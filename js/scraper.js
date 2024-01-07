const companyName = apiObj.file.split(".")[0];
const capitelizedCompanyName =
  companyName.charAt(0).toUpperCase() + companyName.slice(1);

const htmlTitle = document.querySelector("title");
const company = document.querySelector("#company");
htmlTitle.innerHTML = `Scraper-${capitelizedCompanyName}`;
company.innerHTML = capitelizedCompanyName;

const jobs_container = document.querySelector(".jobs");
const status_container = document.querySelector("#status");

// TODO: change this to the real url
// for local testing
// const validator_url = "http://localhost:8000/validator/get/";
const validator_url = "https://api.laurentiumarian.ro/validator/get/";
const validator_data = {
  company: companyName,
};

const getJobs = async () => {
  const response = await fetch(validator_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validator_data),
  });
  const data = await response.json();
  return data;
};

let apiJobs = getJobs();

apiJobs.then((data) => {
  if (data !== null) {
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
    // job card
    const job_container = create_job.create_tag("div", "job");
    job_container.setAttribute("data", JSON.stringify(data));

    // job details
    const details_container = create_job.create_tag("div", "details-container");

    // status job
    const status_job = create_job.create_tag("div", "status-job");
    if (data.edited){
      const edited_status = create_job.create_tag("div", "label-status edited");
      edited_status.innerHTML = "This job was edited";
      status_job.appendChild(edited_status);
    } 
    if (data.deleted){
      const deleted_status = create_job.create_tag("div", "label-status deleted");
      deleted_status.innerHTML = "This job was deleted";
      status_job.appendChild(deleted_status);
    }
    if (data.published){
      const new_status = create_job.create_tag("div", "label-status published");
      new_status.innerHTML = "This job was published";
      status_job.appendChild(new_status);
    }

    details_container.appendChild(status_job);

    // job title and company
    let div = create_job.create_tag("div");
    const job_title = create_job.create_tag(
      "h2",
      `job-title ${validate_data(data, "job_title") ? "validate" : "invalid"}`
    );
    job_title.innerHTML = validate_data(data, "job_title")
      ? data.job_title
      : "No job title";
    div.appendChild(job_title);

    const job_company = create_job.create_tag(
      "div",
      `job-company ${validate_data(data, "company") ? "validate" : "invalid"}`
    );
    const svg = `
    
    `;
    job_company.innerHTML =
      svg + (validate_data(data, "company") ? data.company : "No company");
    div.appendChild(job_company);
    details_container.appendChild(div);

    // job location
    const container_JobLocation = create_job.create_tag(
      "div",
      "container-JobLocation"
    );
    const job_location = create_job.create_tag("div", "job-location", [
      { name: "title", value: "Location" },
    ]);
    const location_container = create_job.create_tag(
      "div",
      "location-container"
    );
    const location_svg = create_job.create_tag("img", null, [
      { name: "src", value: "../../images/svg/company.svg" },
      { name: "alt", value: "location" },
    ]);
    location_container.innerHTML = validate_city(data)
      ? validate_city(data)
          .map((city) => city.outerHTML)
          .join(",")
      : "<div class='invalid'>No city</div>";
    location_container.prepend(location_svg);
    job_location.appendChild(location_container);
    container_JobLocation.appendChild(job_location);
    details_container.appendChild(container_JobLocation);

    // country
    const country_container = create_job.create_tag(
      "div",
      "country-container",
      [{ name: "title", value: "Country" }]
    );
    const country_svg = create_job.create_tag("img", null, [
      { name: "src", value: "../../images/svg/globe.svg" },
      { name: "alt", value: "country" },
    ]);
    country_container.appendChild(country_svg);
    div = create_job.create_tag(
      "div",
      `${validate_country(data, "country") ? "validate" : "invalid"}`
    );
    div.innerHTML = validate_country(data, "country")
      ? data.country
      : data.country + " is not a country";

    country_container.appendChild(div);
    job_location.appendChild(country_container);

    // job type
    const job_type_container = create_job.create_tag(
      "div",
      "job-type-container",
      [{ name: "title", value: "Job Type" }]
    );
    const job_type_svg = create_job.create_tag("img", null, [
      { name: "src", value: "../../images/svg/remote.svg" },
      { name: "alt", value: "job type" },
    ]);
    job_type_container.appendChild(job_type_svg);
    div = create_job.create_tag(
      "div",
      `${data.remote && data.remote.length ? "validate" : "invalid"}`
    );
    div.innerHTML =
      data.remote && data.remote.length && Array.isArray(data.remote)
        ? data.remote.map((remote) => remote).join(", ")
        : data.remote && data.remote.length
        ? data.remote
        : "No job type";
    job_type_container.appendChild(div);
    job_location.appendChild(job_type_container);

    // functionality
    const functionality = create_job.create_tag("div", "functionality");
    const edit_job = create_job.create_tag("button", "edit-job");
    edit_job.innerHTML = "Edit Job";
    functionality.appendChild(edit_job);
    details_container.appendChild(functionality);

    edit_job.addEventListener("click", () => {
      const data = JSON.parse(job_container.getAttribute("data"));
      form.innerHTML = "";
      create_form.initialize(data);
      formContainer.classList.toggle("hidden");
    });

    // job link
    const job_link_container = create_job.create_tag(
      "div",
      "job_link-container"
    );
    const job_link = create_job.create_tag(
      "a",
      `${validate_link(data, "job_link") ? "validate" : "invalid"}`,
      [
        { name: "href", value: data.job_link },
        { name: "target", value: "_blank" },
      ]
    );
    job_link.innerHTML = "Vezi Postul";
    job_link_container.appendChild(job_link);
    details_container.appendChild(job_link_container);

    job_container.appendChild(details_container);
    jobs_container.appendChild(job_container);
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validator_data),
        })
          .then((response) => {
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
const repoOwner = "peviitor-ro";
// const repoName = apiObj.url.split("/")[4];

// const contribuitori = [];
// const testers = [];
// let uniqueTesters = [];
// const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
// const issuesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

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

// clone create_job method
const create_form = {
  create_tag: create_job.create_tag,
  initialize: (data) => {
    // container
    const container = create_form.create_tag("div", "details-container");

    // close form
    const close_form = create_form.create_tag("button", "close-form");
    close_form.innerHTML = "x";
    close_form.addEventListener("click", () => {
      formContainer.classList.toggle("hidden");
    });
    container.appendChild(close_form);

    // job title
    const job_title = create_form.create_tag("div", "job-title");
    const job_title_label = create_form.create_tag("label", null, [
      { name: "for", value: "job_title" },
    ]);
    job_title_label.innerHTML = "Job Title";
    const job_title_input = create_form.create_tag("input", null, [
      { name: "id", value: "job_title" },
      { name: "type", value: "text" },
      { name: "name", value: "job_title" },
      { name: "value", value: data.job_title },
      { name: "placeholder", value: "Job Title" },
      { name: "required", value: "" },
    ]);
    job_title.appendChild(job_title_label);
    job_title.appendChild(job_title_input);
    container.appendChild(job_title);

    // company
    const company = create_form.create_tag("div", "job-company");
    let div = create_form.create_tag("div");
    const companu_svg = create_form.create_tag("img", null, [
      { name: "src", value: "../../images/svg/company.svg" },
      { name: "alt", value: "company" },
    ]);
    const company_label = create_form.create_tag("label", null, [
      { name: "for", value: "company" },
    ]);
    company_label.innerHTML = "Company";
    div.appendChild(companu_svg);
    div.appendChild(company_label);
    const company_input = create_form.create_tag("input", null, [
      { name: "id", value: "company" },
      { name: "type", value: "text" },
      { name: "name", value: "company" },
      { name: "value", value: data.company },
      { name: "placeholder", value: "Company" },
      { name: "required", value: "" },
    ]);
    company.appendChild(div);
    company.appendChild(company_input);
    container.appendChild(company);

    // remote
    const remote = create_form.create_tag("div", "job-remote");
    div = create_form.create_tag("div");
    const remote_svg = create_form.create_tag("img", null, [
      { name: "src", value: "../../images/svg/remote.svg" },
      { name: "alt", value: "remote" },
    ]);
    const remote_label = create_form.create_tag("label", null, [
      { name: "for", value: "remote" },
    ]);
    remote_label.innerHTML = "Remote";
    div.appendChild(remote_svg);
    div.appendChild(remote_label);
    const remote_input = create_form.create_tag("input", null, [
      { name: "id", value: "remote" },
      { name: "type", value: "text" },
      { name: "name", value: "remote" },
      { name: "value", value: data.remote },
      { name: "placeholder", value: "Remote" },
      { name: "required", value: "" },
    ]);
    remote.appendChild(div);
    remote.appendChild(remote_input);
    container.appendChild(remote);

    // job link
    const job_link = create_form.create_tag("div", "job-link");
    const link_label = create_form.create_tag("label", null, [
      { name: "for", value: "job_link" },
    ]);
    link_label.innerHTML = "Job Link";
    const link_input = create_form.create_tag("input", null, [
      { name: "id", value: "job_link" },
      { name: "type", value: "text" },
      { name: "name", value: "job_link" },
      { name: "value", value: data.job_link },
      { name: "placeholder", value: "Job Link" },
      { name: "required", value: "" },
    ]);
    job_link.appendChild(link_label);
    job_link.appendChild(link_input);
    container.appendChild(job_link);

    // Country
    const job_location_country = create_form.create_tag("div", "job-location");
    const job_country = create_form.create_tag("div", "job-country");
    div = create_form.create_tag("div");
    const country_svg = create_form.create_tag("img", null, [
      { name: "src", value: "../../images/svg/globe.svg" },
      { name: "alt", value: "country" },
    ]);
    const country_label = create_form.create_tag("label", null, [
      { name: "for", value: "country" },
    ]);
    country_label.innerHTML = "Country";
    div.appendChild(country_svg);
    div.appendChild(country_label);

    const country_input = create_form.create_tag("input", null, [
      { name: "id", value: "country" },
      { name: "type", value: "text" },
      { name: "name", value: "country" },
      { name: "value", value: data.country },
      { name: "placeholder", value: "Country" },
      { name: "required", value: "" },
    ]);
    job_country.appendChild(div);
    job_country.appendChild(country_input);

    const add_country_container = create_form.create_tag(
      "div",
      "add_country hidden"
    );
    const add_country = create_form.create_tag("select", null, [
      { name: "id", value: "add_country" },
      { name: "name", value: "Country" },
      { name: "required", value: "" },
    ]);

    add_country_container.appendChild(add_country);
    job_country.appendChild(add_country_container);

    const functionality = create_form.create_tag("div", "functionality");
    const add_country_button = create_form.create_tag("button", null, [
      { name: "type", value: "button" },
    ]);

    add_country_button.innerHTML = "Add Country";
    functionality.appendChild(add_country_button);
    job_country.appendChild(functionality);

    job_location_country.appendChild(job_country);
    container.appendChild(job_location_country);

    // county and city
    const county_and_city = create_form.create_tag("div", "job-location");
    const job_city = create_form.create_tag("div", "job-city");
    div = create_form.create_tag("div");
    const city_svg = create_form.create_tag("img", null, [
      { name: "src", value: "../../images/svg/company.svg" },
      { name: "alt", value: "city" },
    ]);
    const city_label = create_form.create_tag("label", null, [
      { name: "for", value: "city" },
    ]);
    city_label.innerHTML = "City";
    div.appendChild(city_svg);
    div.appendChild(city_label);

    const city_input = create_form.create_tag("input", null, [
      { name: "id", value: "city" },
      { name: "type", value: "text" },
      { name: "name", value: "city" },
      { name: "value", value: data.city },
      { name: "placeholder", value: "City" },
      { name: "required", value: "" },
    ]);

    job_city.appendChild(div);
    job_city.appendChild(city_input);

    const job_county = create_form.create_tag("div", "job-county");
    div = create_form.create_tag("div");
    const county_svg = create_form.create_tag("img", null, [
      { name: "src", value: "../../images/svg/company.svg" },
      { name: "alt", value: "county" },
    ]);
    const county_label = create_form.create_tag("label", null, [
      { name: "for", value: "county" },
    ]);
    county_label.innerHTML = "County";
    div.appendChild(county_svg);
    div.appendChild(county_label);

    const county_input = create_form.create_tag("input", null, [
      { name: "id", value: "county" },
      { name: "type", value: "text" },
      { name: "name", value: "county" },
      { name: "value", value: data.county },
      { name: "placeholder", value: "County" },
      { name: "required", value: "" },
    ]);

    job_county.appendChild(div);
    job_county.appendChild(county_input);

    county_and_city.appendChild(job_city);
    county_and_city.appendChild(job_county);

    const add_location = create_form.create_tag("div", "add_location hidden");

    const add_county = create_form.create_tag("select", null, [
      { name: "id", value: "add_judet" },
      { name: "name", value: "judet" },
      { name: "required", value: "" },
    ]);

    const add_city = create_form.create_tag("select", null, [
      { name: "id", value: "add_oras" },
      { name: "name", value: "oras" },
      { name: "required", value: "" },
    ]);

    add_location.appendChild(add_county);
    add_location.appendChild(add_city);
    county_and_city.appendChild(add_location);

    const functionality_location = create_form.create_tag(
      "div",
      "functionality"
    );
    const add_city_button = create_form.create_tag("button", null, [
      { name: "type", value: "button" },
    ]);
    add_city_button.innerHTML = "Add City";
    const delete_city_button = create_form.create_tag("button", null, [
      { name: "type", value: "button" },
    ]);
    delete_city_button.innerHTML = "Delete Location";

    functionality_location.appendChild(add_city_button);
    functionality_location.appendChild(delete_city_button);
    county_and_city.appendChild(functionality_location);
    container.appendChild(county_and_city);

    // functionality
    const functionality_container = create_form.create_tag(
      "div",
      "functionality"
    );
    const edit_job = create_form.create_tag("button", "edit-job");
    edit_job.innerHTML = "Edit";
    const deleted_job = create_form.create_tag("button", "delete-job");
    deleted_job.innerHTML = data.deleted ? "Restore" : "Delete";
    const publish_job = create_form.create_tag("button", "publish-job");
    publish_job.innerHTML = data.published ? "Unpublish" : "Publish";

    functionality_container.appendChild(edit_job);
    functionality_container.appendChild(publish_job);
    functionality_container.appendChild(deleted_job);

    container.appendChild(functionality_container);
    form.appendChild(container);

    // finctionality buttons
    const country_options = ["Country", "All"];
    country_options.forEach((option, idx) => {
      const countryElement = document.createElement("option");
      countryElement.innerHTML = option;
      if (idx === 0) {
        countryElement.selected = true;
        countryElement.disabled = true;
      }
      add_country.appendChild(countryElement);
    });

    countries_list.forEach((country) => {
      const countryElement = document.createElement("option");
      countryElement.innerHTML = country;
      add_country.appendChild(countryElement);
    });

    if (data.country.includes("Romania")) {
      county_input.setAttribute("disabled", true);
      city_input.setAttribute("disabled", true);
    } else{
      add_city_button.classList.add("hidden");
    }

    add_country.addEventListener("change", () => {
      if (country_input.value) {
        country_input.value = country_input.value + "," + add_country.value;
      } else {
        country_input.value = add_country.value;
      }

      if (country_input.value.split(",").includes("Romania")) {
        county_input.setAttribute("disabled", true);
        city_input.setAttribute("disabled", true);
        add_city_button.classList.remove("hidden");
      } else {
        county_input.removeAttribute("disabled");
        city_input.removeAttribute("disabled");
        add_city_button.classList.remove("hidden");
        add_location.classList.add("hidden");
      }
    });

    const options_county = ["Judet", "All"];
    options_county.forEach((option, idx) => {
      const countyElement = document.createElement("option");
      countyElement.innerHTML = option;
      if (idx === 0) {
        countyElement.selected = true;
        countyElement.disabled = true;
      }
      add_county.appendChild(countyElement);
    });

    counties.forEach((county) => {
      const countyElement = document.createElement("option");
      countyElement.innerHTML = Object.keys(county)[0];
      add_county.appendChild(countyElement);
    });

    add_county.addEventListener("change", () => {
      add_city.innerHTML = "";
      const options = ["Oras", "All"];

      options.forEach((option, idx) => {
        const cityElement = document.createElement("option");
        cityElement.innerHTML = option;
        if (idx === 0) {
          cityElement.selected = true;
          cityElement.disabled = true;
        }
        add_city.appendChild(cityElement);
      });

      if (county_input.value) {
        county_input.value = county_input.value + "," + add_county.value;
      } else {
        county_input.value = add_county.value;
      }

      counties.forEach((county) => {
        if (Object.keys(county)[0] === add_county.value) {
          county[Object.keys(county)[0]].forEach((city) => {
            const cityElement = document.createElement("option");
            cityElement.innerHTML = city;
            add_city.appendChild(cityElement);
          });
        }
      });
    });

    add_city.addEventListener("change", () => {
      if (city_input.value) {
        city_input.value = city_input.value + "," + add_city.value;
      } else {
        city_input.value = add_city.value;
      }
    });

    delete_city_button.addEventListener("click", () => {
      country_input.value = "";
      county_input.value = "";
      city_input.value = "";
      county_input.removeAttribute("disabled");
      city_input.removeAttribute("disabled");
      add_location.classList.add("hidden");
    });

    add_country_button.addEventListener("click", () => {
      add_country_container.classList.toggle("hidden");
    });

    add_city_button.addEventListener("click", () => {
      add_location.classList.toggle("hidden");
    });

    // edit job
    edit_job.addEventListener("click", () => {
      // for local testing
      // const edit_url = "http://localhost:8000/validator/edit/";
      const edit_url = "https://api.laurentiumarian.ro/validator/edit/";

      const job_title = job_title_input.value;
      const company = company_input.value;
      const remote = remote_input.value;  
      const job_link = link_input.value;
      const country = country_input.value.split(",");
      const city = city_input.value.split(",");
      const county = county_input.value.split(",");

      const data = [{
        job_title,
        company,
        remote,
        job_link,
        country,
        city,
        county,
      }];

      fetch(edit_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          formContainer.classList.toggle("hidden");
          alertModalSuccess();

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alertModalError(e);
        });
    });

    // delete job
    deleted_job.addEventListener("click", () => {
      // for local testing
      // const delete_url = "http://localhost:8000/validator/delete/";
      const delete_url = "https://api.laurentiumarian.ro/validator/delete/";

      const job_title = job_title_input.value;
      const company = company_input.value;
      const remote = remote_input.value;  
      const job_link = link_input.value;
      const country = country_input.value.split(",");
      const city = city_input.value.split(",");
      const county = county_input.value.split(",");

      const data = [{
        job_title,
        company,
        remote,
        job_link,
        country,
        city,
        county,
      }];

      fetch(delete_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          formContainer.classList.toggle("hidden");
          alertModalSuccess();

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alertModalError(e);
        });
    });

    // publish job
    publish_job.addEventListener("click", () => {
      // for local testing
      // const publish_url = "http://localhost:8000/validator/publish/";
      const publish_url = "https://api.laurentiumarian.ro/validator/publish/";

      const job_title = job_title_input.value;
      const company = company_input.value;
      const remote = remote_input.value;  
      const job_link = link_input.value;
      const country = country_input.value.split(",");
      const city = city_input.value.split(",");
      const county = county_input.value.split(",");

      const data = [{
        job_title,
        company,
        remote,
        job_link,
        country,
        city,
        county,
      }];

      fetch(publish_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          formContainer.classList.toggle("hidden");
          alertModalSuccess();

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        })
        .catch((e) => {
          alertModalError(e);
        });
    });
  },
};
