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

  // console.log(document.querySelector('.option-active > .rectangle'));

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

  console.log(burgerButton.children);

  burgerButton.addEventListener("click", () => {
    navElement.classList.toggle("active");
    mainEl.classList.toggle("active");
    if (navElement.classList.contains("active")) {
      // burgerButton.children[0].src = "../assets/images/close.svg";
    }
  });
};

getPlanet();
