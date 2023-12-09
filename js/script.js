const cardContainer = document.querySelector(".container");
const selectScrapere = document.querySelector(".count-scrapere");
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
  const scrapereFiltrati = onpage_scrapere.filter((scraper) =>
    scraper.textContent.toLowerCase().replace(/\s+/g, "").includes(dateInput)
  );
  cardContainer.innerHTML = "";
  scrapereFiltrati.forEach((scraper) => {
    cardContainer.appendChild(scraper);
  });
  if (scrapereFiltrati.length === 0) {
    cardContainer.innerHTML = `<h1 class="not-found">Nu am gasit nimic pentru ${dateInput} !</h1>`;
  }
});

fetch("https://api.peviitor.ro/v1/logo/")
  .then((response) => response.json())
  .then((data) => {
    selectScrapere.innerHTML = `${data.companies.length} companii scrapuite!`;
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

    setTimeout(() => {
      checkFileExist(scraperLink, scraperLink);
    }, "1000");

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

    const scraperInfo = document.createElement("div");
    scraperInfo.classList.add("scraper-info");
    const scraperName = document.createElement("div");
    scraperName.classList.add("scraper-name");
    const name = document.createElement("h2");
    name.innerText = collaborator.name;
    scraperName.appendChild(name);
    scraperInfo.appendChild(scraperName);
    scraperContainer.appendChild(scraperLogoContainer);
    scraperLogoContainer.appendChild(scraperLogo);
    scraperContainer.appendChild(scraperInfo);
    scraperInfo.appendChild(scraperLinkContainer);
    scraperLinkContainer.appendChild(scraperLink);

    onpage_scrapere.push(scraperContainer);
  });
}

function checkFileExist(url, container) {
  var xhr = new XMLHttpRequest();
  xhr.open("head", url, false);
  xhr.send();
  if (xhr.status == 404) {
    container.classList.add("add-class");
  }
}
