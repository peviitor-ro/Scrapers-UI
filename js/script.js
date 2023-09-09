function search() {
  let input = document.getElementById("search");
  let filter = input.value.toUpperCase();
  let container = document.querySelector(".container");
  let scrapers = container.querySelectorAll(".scraper-container");
  for (let i = 0; i < scrapers.length; i++) {
    let name = scrapers[i].id;
    if (name.toUpperCase().indexOf(filter) > -1) {
      scrapers[i].style.display = "";
    } else {
      scrapers[i].style.display = "none";
    }
  }
}

document.getElementById("search").addEventListener("keyup", search);

function create_company(data) {
  const scraperContainer = document.createElement("a");
  scraperContainer.id = data.name;
  scraperContainer.href = "src/" + data.name + "/index.html";
  scraperContainer.classList.add("scraper-container");
  const scraperDiv = document.createElement("div");
  scraperDiv.classList.add("scraper");
  const scraperLogo = document.createElement("div");
  scraperLogo.classList.add("scraper-logo");
  scraperLogo.innerHTML = `
    <svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
        <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/>
        <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/>
    </svg>
`;
  const scraperInfo = document.createElement("div");
  scraperInfo.classList.add("scraper-info");
  const scraperName = document.createElement("div");
  scraperName.classList.add("scraper-name");
  const name = document.createElement("h2");
  name.innerText = data.name;
  scraperName.appendChild(name);
  scraperInfo.appendChild(scraperName);
  scraperDiv.appendChild(scraperLogo);
  scraperDiv.appendChild(scraperInfo);
  scraperContainer.appendChild(scraperDiv);
  return scraperContainer;
}

const container = document.querySelector(".container");
scrapers.forEach((scraper) => {
  container.appendChild(create_company(scraper));
});
