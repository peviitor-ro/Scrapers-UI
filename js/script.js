const cardContainer = document.querySelector(".container");
const selectScrapere = document.querySelector(".count-scrapere");
const companiesLength = document.querySelector(".companies-length");
let scrapereFiltrati;
let onpage_scrapere = [];
let scrapere = [];
let step = 48;

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

const scraperCardTemplate = document.querySelector("[data-scraper-template]");
const scraperCardContainer = document.querySelector("[data-scraper-container]");
const searchInput = document.querySelector("[data-search]");

// Search
let scrapersArray = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase().replace(/\s+/g, "");

  scrapersArray.forEach((e) => {
    const isVisible = e.title.toLowerCase().replace(/\s+/g, "").includes(value);

    scraperCardContainer.append(e.element);
    e.element.classList.toggle("hideScraper", !isVisible);
  });

  scrapereFiltrati = scrapersArray.filter((scraper) =>
    scraper.title.toLowerCase().replace(/\s+/g, "").includes(value)
  );

  if (scrapereFiltrati.length == 1) {
    companiesLength.innerHTML = `${scrapereFiltrati.length} rezultat`;
  } else {
    companiesLength.innerHTML = `${scrapereFiltrati.length} rezultate`;
  }

  const noScraper = document.querySelector(".container-no-scraper");

  if (scrapereFiltrati.length == 0) {
    noScraper.innerHTML = `<h1 class="not-found">Nu am gasit nimic pentru ${value} !</h1>`;
  } else {
    noScraper.innerHTML = "";
  }
});

// Fetch Data

fetch("https://api.peviitor.ro/v1/logo/")
  .then((response) => response.json())
  .then((data) => {
    companiesLength.innerHTML = `${data.companies.length} rezultate`;
    selectScrapere.innerHTML = `Gaseste listinguri de la ${data.companies.length} companii scrapuite`;
    scrapere = data.companies;
    scrapersArray = scrapere.map((scraper) => {
      const card = scraperCardTemplate.content.cloneNode(true).children[0];
      const title = card.querySelector("[data-title]");
      const description = card.querySelector("[data-description]");
      const image = card.querySelector("[data-image]");
      const linkScraperUI = card.querySelector("[data-scraperUi-link]");
      const linkWebSite = card.querySelector("[data-website-link]");
      title.textContent = scraper.name;
      description.textContent =
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sint eligendi ";
      linkScraperUI.href = "src/" + scraper.name + "/index.html";
      linkScraperUI.textContent = "Vizualizeaza Scraper";
      linkWebSite.textContent = "Viziteaza WebSite";

      const allToLowerCase = scraper.name.replace(/\s+/g, "");
      const assetPath = `./images/assets/${allToLowerCase}.png`;
      image.src = scraper.logo;
      if (scraper.logo === null) {
        image.src = assetPath;
      } else {
        image.src = scraper.logo;
      }

      image.alt = scraper.name;
      image.onerror = () => {
        image.src = "./images/assets/logonotfound.png";
      };

      // scraperCardContainer.append(card);

      onpage_scrapere.push(card);
      return { title: scraper.name, element: card };
    });
  })
  .then(() => {
    for (let i = 0; i < step; i++) {
      scraperCardContainer.appendChild(onpage_scrapere[i]);
    }

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 10
      ) {
        for (let i = step; i < step + 48; i++) {
          if (i < onpage_scrapere.length) {
            scraperCardContainer.appendChild(onpage_scrapere[i]);
          }
        }
        step += 48;
      }
    });
  });

function optionsFilter() {
  const judet = document.querySelector("#judet");
  const oras = document.querySelector("#oras");
  const industrie = document.querySelector("#industrie");
  const angajati = document.querySelector("#angajati");

  const judetContainer = document.querySelector(".judet");
  const orasContainer = document.querySelector(".oras");
  const industrieContainer = document.querySelector(".industrie");
  const angajatiContainer = document.querySelector(".angajati");
  const close2 = `<img src="./images/icons/close-black.png" alt="close" class="removeOptions"/>`;

  // add filters

  judet.addEventListener("change", () => {
    let option = judet.options[judet.selectedIndex].text;
    judetContainer.classList.add("show-filters");
    judetContainer.innerHTML = option + close2;
  });

  oras.addEventListener("change", () => {
    let option = oras.options[oras.selectedIndex].text;
    orasContainer.classList.add("show-filters");
    orasContainer.innerHTML = option + close2;
  });

  industrie.addEventListener("change", () => {
    let option = industrie.options[industrie.selectedIndex].text;
    industrieContainer.classList.add("show-filters");
    industrieContainer.innerHTML = option + close2;
  });

  angajati.addEventListener("change", () => {
    let option = angajati.options[angajati.selectedIndex].text;
    angajatiContainer.classList.add("show-filters");
    angajatiContainer.innerHTML = option + close2;
  });

  // remove filters

  judetContainer.addEventListener("click", () => {
    judet.selectedIndex = 0;
    judetContainer.classList.remove("show-filters");
    judetContainer.innerHTML = "";
  });

  orasContainer.addEventListener("click", () => {
    oras.selectedIndex = 0;
    orasContainer.classList.remove("show-filters");
    orasContainer.innerHTML = "";
  });

  industrieContainer.addEventListener("click", () => {
    industrie.selectedIndex = 0;
    industrieContainer.classList.remove("show-filters");
    industrieContainer.innerHTML = "";
  });

  angajatiContainer.addEventListener("click", () => {
    angajati.selectedIndex = 0;
    angajatiContainer.classList.remove("show-filters");
    angajatiContainer.innerHTML = "";
  });
}

optionsFilter();
