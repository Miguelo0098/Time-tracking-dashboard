const TIMEFRAMES = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};
let data = [];

function getData() {
  return fetch("./data/data.json")
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

function getActiveTimeframe() {
  return document.getElementsByClassName("profile__periods__nav --active")[0]
    ?.innerText;
}

function resetNavs() {
  const navs = document.getElementsByClassName("profile__periods__nav");
  for (i in navs) {
    navs[i].className = "profile__periods__nav";
  }
}

function getSuffix(value) {
  return value === 1 ? "hr" : "hrs";
}

function getPreviousTimeframeText(previous, timeframe) {
  const texts = {
    [TIMEFRAMES.DAILY]: `Yesterday - ${previous}${getSuffix(previous)}`,
    [TIMEFRAMES.WEEKLY]: `Last Week - ${previous}${getSuffix(previous)}`,
    [TIMEFRAMES.MONTHLY]: `Last Month - ${previous}${getSuffix(previous)}`,
  };

  return texts[timeframe];
}

function insertContent() {
  const list = document.getElementsByClassName("list")[0];
  list.innerHTML = "";
  data.forEach((item) => {
    const { title, timeframes } = item;
    const activeTimeframe =
      getActiveTimeframe()?.toLowerCase() || TIMEFRAMES.DAILY;
    const timeframe = timeframes[activeTimeframe];
    const currentText = `${timeframe.current}${getSuffix(timeframe.current)}`;
    const previousText = getPreviousTimeframeText(
      timeframe.previous,
      activeTimeframe
    );

    const htmlElement = `<div class="list__item ${title
      .toLowerCase()
      .replace(" ", "_")}">
        <div class="list__item__card">
          <div class="list__item__card__info">
            <h2 class="list__item__card__info__name">${title}</h2>
            <img
              class="list__item__card__info__icon"
              src="./images/icon-ellipsis.svg"
              alt=""
            />
          </div>
          <div class="list__item__card__data">
            <p class="list__item__card__data__time">${currentText}</p>
            <p class="list__item__card__data__last">${previousText}</p>
          </div>
        </div>
      </div>`;

    list.innerHTML += htmlElement;
  });
}

function handleTimeframeUpdate(id) {
  resetNavs();
  id.parentElement.className += " --active";
  insertContent();
}

const load = () => {
  getData().then((response) => {
    data = response;
    insertContent();
  });
};
