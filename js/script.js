const cardContainer = document.querySelector(".container");
const selectScrapere = document.querySelector(".count-scrapere");
const companiesLength = document.querySelector(".companies-length");
let scrapereFiltrati;
let onpage_scrapere = [];
let scrapere = [];
let step = 48;

let last_known_scroll_position = 0;
window.addEventListener("scroll", () => {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > last_known_scroll_position) {
    document.querySelector(".header").classList.add("translate");
  } else {
    document.querySelector(".header").classList.remove("translate");
  }
  last_known_scroll_position = st <= 0 ? 0 : st;
});

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", (e) => {
  const dateInput = e.target.value.toLowerCase().replace(/\s+/g, "");
  scrapereFiltrati = onpage_scrapere.filter((scraper) =>
    scraper.textContent.toLowerCase().replace(/\s+/g, "").includes(dateInput)
  );
  cardContainer.innerHTML = "";
  scrapereFiltrati.forEach((scraper) => {
    cardContainer.appendChild(scraper);
  });

  if (scrapereFiltrati.length == 1) {
    companiesLength.innerHTML = `${scrapereFiltrati.length} rezultat`;
  } else {
    companiesLength.innerHTML = `${scrapereFiltrati.length} rezultate`;
  }

  if (scrapereFiltrati.length === 0) {
    cardContainer.innerHTML = `<h1 class="not-found">Nu am gasit nimic pentru ${dateInput} !</h1>`;
    companiesLength.innerHTML = `${scrapereFiltrati.length} rezultate`;
  }
});

const searchToggle = document.querySelector(".search-toggle");
const filtersHeader = document.querySelector(".header-filter-container");
const filtersHeader2 = document.querySelector(".header-filter-container2");

searchToggle.addEventListener("click", () => {
  if (!filtersHeader.classList.contains("header-filter-show")) {
    filtersHeader2.classList.toggle("header-filter-show2");
    setTimeout(() => {
      filtersHeader.classList.toggle("header-filter-show");
    }, "800");
  } else {
    filtersHeader.classList.toggle("header-filter-show");
    setTimeout(() => {
      filtersHeader2.classList.toggle("header-filter-show2");
    }, "100");
  }
});

searchToggle.addEventListener("click", () => {
  headerLinksMobile.classList.remove("header-links-show");
  document.body.style.overflowY = null;
});

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

fetch("https://api.peviitor.ro/v1/logo/")
  .then((response) => response.json())
  .then((data) => {
    companiesLength.innerHTML = `${data.companies.length} rezultate`;
    selectScrapere.innerHTML = `Gaseste listinguri de la ${data.companies.length} companii scrapuite`;
    scrapere = data.companies;
    displayScrapere(scrapere);
  })
  .then(() => {
    for (let i = 0; i < step; i++) {
      cardContainer.appendChild(onpage_scrapere[i]);
    }

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10
      ) {
        for (let i = step; i < step + 48; i++) {
          if (i < onpage_scrapere.length) {
            cardContainer.appendChild(onpage_scrapere[i]);
          }
        }
        step += 48;
      }
    });
  });

function displayScrapere(scrapere) {
  scrapere.forEach((collaborator) => {
    const allToLowerCase = collaborator.name.replace(/\s+/g, "");
    const scraperContainer = document.createElement("div");
    scraperContainer.classList.add("scraper-container");
    const scraperLinkContainer = document.createElement("div");
    scraperLinkContainer.classList.add("scraper-link-container");
    const scraperLink = document.createElement("a");
    scraperLink.classList.add("scraper-link");
    scraperLink.href = "src/" + collaborator.name + "/index.html";
    scraperLink.innerHTML = "Vizualizeaza Scraper";

    const checkScrapers = document.querySelector(".checkScrapers");
    const checkScrapersLoading = document.querySelector(
      ".scraper-check-loading"
    );

    checkScrapers.addEventListener("click", () => {
      checkScrapersLoading.classList.add("rotate");
      localStorage.removeItem("No Scraper-ui " + collaborator.name);
      setTimeout(() => {
        var xhr = new XMLHttpRequest();
        xhr.open("head", scraperLink, false);
        xhr.send();
        if (xhr.status == 404) {
          scraperLink.classList.add("add-class");
          localStorage.setItem(
            "No Scraper-ui " + collaborator.name,
            collaborator.name
          );
        } else {
          scraperLink.classList.remove("add-class");
        }
      }, "1000");
      setTimeout(() => checkScrapersLoading.classList.remove("rotate"), "4000");
    });

    const localStorageScrapers = localStorage.getItem(
      "No Scraper-ui " + collaborator.name
    );

    if (localStorageScrapers === collaborator.name) {
      scraperLink.classList.add("add-class");
    }

    // logo companies
    const scraperLogoContainer = document.createElement("div");
    scraperLogoContainer.classList.add("scraper-logo");
    const scraperLogo = document.createElement("img");
    scraperLogo.src = collaborator.logo;

    const assetPath = `./images/assets/${allToLowerCase}.png`;

    if (collaborator.logo === null) {
      scraperLogo.src = assetPath;
    } else {
      scraperLogo.src = collaborator.logo;
    }

    scraperLogo.alt = collaborator.name;
    scraperLogo.onerror = () => {
      scraperLogo.src = "./images/assets/logonotfound.png";
    };

    const scraperLinkSite = document.createElement("a");
    scraperLinkSite.classList.add("scraper-link-site");
    scraperLinkSite.innerHTML = "Viziteaza Website";

    const scraperInfo = document.createElement("div");
    scraperInfo.classList.add("scraper-info");
    const scraperName = document.createElement("div");
    scraperName.classList.add("scraper-name");
    const name = document.createElement("h2");
    name.innerText = collaborator.name;
    const scraperDescription = document.createElement("p");
    scraperDescription.classList.add("scraper-description");
    scraperDescription.innerHTML =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sint eligendi ";
    scraperName.appendChild(name);
    scraperInfo.appendChild(scraperName);
    scraperContainer.appendChild(scraperLogoContainer);
    scraperLogoContainer.appendChild(scraperLogo);
    scraperContainer.appendChild(scraperInfo);
    scraperInfo.appendChild(scraperDescription);

    scraperInfo.appendChild(scraperLinkContainer);
    scraperLinkContainer.appendChild(scraperLink);
    scraperLinkContainer.appendChild(scraperLinkSite);

    onpage_scrapere.push(scraperContainer);
  });
}
