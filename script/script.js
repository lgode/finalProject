const subheaders = document.getElementsByClassName("option");
const activeSubheader = document.getElementsByClassName("option-active");
const activeRect = document.querySelectorAll("color");
const planetImage = document.getElementById("planet-img");
const planetImageSecond = document.getElementById("planet-img-second");
const planetName = document.getElementById("planet-name");
const planetInfo = document.getElementById("planet-info");
const planetSource = document.getElementById("planet-source");
const infoNumber = document.getElementsByClassName("info-number");

const burgerButton = document.getElementById("burger-menu");
const navElement = document.getElementById("navEl");
const mainEl = document.getElementById("main");

const navLinks = document.getElementsByClassName("nav-link");

const menuItems = document.getElementsByClassName("menu-items");
const textBox = document.getElementsByClassName("text-box");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", () => {
    getPlanet(navLinks[i].textContent.trim());
    navElement.classList.toggle("active");
    mainEl.classList.toggle("active");
    toggleBurger();
    console.log(navLinks[i].textContent.trim());
  });
}

for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", () => {
    getPlanet(menuItems[i].textContent.trim());
    console.log(menuItems[i].textContent.trim());
  });
}

burgerButton.addEventListener("click", () => {
  navElement.classList.toggle("active");
  mainEl.classList.toggle("active");
  toggleBurger();
});

const getPlanet = async (planet = "Mercury") => {
  const response = await fetch(
    `https://planets-api.vercel.app/api/v1/planets/${planet}`
  );
  const data = await response.json();
  console.log(data);

  for (let i = 0; i < subheaders.length; i++) {
    subheaders[i].addEventListener("click", () => {
      getSubheader(subheaders[i].textContent);
    });
  }

  for (let i = 0; i < textBox.length; i++) {
    textBox[i].addEventListener("click", () => {
      getSubheader(textBox[i].textContent);
    });
  }

  planetName.textContent = data.name;
  planetImage.src = data.images.planet;
  planetImageSecond.src = data.images.geology;
  planetImageSecond.style.display = "none";
  planetInfo.textContent = data.overview.content;
  planetSource.href = data.overview.source;

  const getSubheader = (subheader) => {
    activeSubheader[0].classList.remove("option-active");
    if (subheader.includes("OVERVIEW")) {
      planetImage.src = data.images.planet;
      planetInfo.textContent = data.overview.content;
      planetSource.href = data.overview.source;
      planetImageSecond.style.display = "none";
      subheaders[0].classList.add("option-active");
    } else if (subheader.includes("STRUCTURE")) {
      planetImage.src = data.images.internal;
      planetInfo.textContent = data.structure.content;
      planetSource.href = data.structure.source;
      planetImageSecond.style.display = "none";
      subheaders[1].classList.add("option-active");
    } else if (subheader.includes("SURFACE")) {
      planetImage.src = data.images.planet;
      planetImageSecond.src = data.images.geology;
      planetImageSecond.style.display = "block";
      planetInfo.textContent = data.geology.content;
      planetSource.href = data.geology.source;
      subheaders[2].classList.add("option-active");
    }
  };

  infoNumber[0].textContent = data.rotation;
  infoNumber[1].textContent = data.revolution;
  infoNumber[2].textContent = data.radius;
  infoNumber[3].textContent = data.temperature;
};

getPlanet();

const toggleBurger = () => {
  if (navElement.classList.contains("active")) {
    burgerButton.children[0].src = "/assets/images/close.svg";
    burgerButton.children[0].style.width = "24px";
    burgerButton.children[0].style.filter = "invert(1)";
  } else {
    burgerButton.children[0].src = "/assets/images/icon-burger.svg";
    burgerButton.children[0].style.filter = "invert(0)";
  }
};
