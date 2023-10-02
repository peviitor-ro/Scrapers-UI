// NavBar
const openNav = document.querySelector(".open-nav");
const closeNav = document.querySelector(".close-nav");
const aside = document.querySelector(".aside");

function OpenNavBar() {
  openNav.classList.toggle("hidden");
  aside.classList.toggle("block");
}

openNav.addEventListener("click", OpenNavBar);
closeNav.addEventListener("click", OpenNavBar);

// ============================   aside        ====================================

const nav = document.querySelector(".aside-nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allsection = document.querySelectorAll(".section"),
  totalSection = allsection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    OpenNavBar();
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
  });
}
function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allsection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allsection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allsection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
