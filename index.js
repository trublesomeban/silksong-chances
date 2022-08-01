window.allowSubmit = false;
window.globalDate = new Date();
window.chanceType = "today";
window.dateType = null;
const hover = () => {
  document.getElementsByClassName("dropbtn").item(0).innerText =
    "select period";
};
const unhover = () => {
  const month = window.globalDate.getMonth();
  const year = window.globalDate.getFullYear();
  const period =
    window.dateType == "custom"
      ? `on ${month + 1}/${window.globalDate.getDate()}/${year}`
      : window.chanceType;
  document.getElementsByClassName("dropbtn").item(0).innerText = `${period}`;
};
const preventClick = () => {
  window.allowSubmit = false;
};
const allowClick = () => {
  window.allowSubmit = true;
};
const right_now = () => {
  window.chanceType = "right now";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const today = () => {
  window.chanceType = "today";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const tomorrow = () => {
  window.chanceType = "tomorrow";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const thisWeek = () => {
  window.chanceType = "this week";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const thisMonth = () => {
  window.chanceType = "this month";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const thisYear = () => {
  window.chanceType = "this year";
  window.dateType = null;
  window.globalDate = new Date();
  refresh();
};
const onDate = () => {
  if (!window.allowSubmit) return false;
  window.chanceType = "today";
  window.dateType = "custom";
  const month = document.getElementById("date.month").value;
  const day = document.getElementById("date.day").value;
  const year = document.getElementById("date.year").value;
  window.globalDate = new Date(`${month}/${day}/${year}`);
  refresh();
};
const upDate = () => {
  const date = [
    document.getElementById("date.month"),
    document.getElementById("date.day"),
    document.getElementById("date.year"),
  ];
  let month = date[0].value;
  let day = date[1].value;
  let year = date[2].value;
  const maxMonth = year == 2022 ? 12 : 6;
  const minDay = year == 2022 && month == 6 ? 12 : 1;
  date[0].min = 1;
  date[0].max = maxMonth;
  date[1].min = minDay;
  date[1].max = year == 2023 && month == 6 ? 12 : daysInMonth(month);
  date[2].min = 2022;
  date[2].max = 2023;
  for (item of date) {
    let value = parseInt(item.value);
    let min = parseInt(item.min);
    let max = parseInt(item.max);
    if (value < min) {
      console.log(value < min);
      console.log(`${value} -> ${min} (too low)`);
      item.value = min;
    } else if (value > max) {
      console.log(typeof value, typeof max);
      console.log(`${value} -> ${max} (too high)`);
      item.value = max;
    }
  }
  month = date[0].value;
  day = date[1].value;
  year = date[2].value;
  window.globalDate = new Date(`${month}/${day}/${year}`);
  if (dateType == "custom") {
    refresh(false);
  }
};
const num = Math.floor(Math.random() * 11) + 1;
document.body.background = `images/${num}.jpg`;
const daysInMonth = (month) => {
  return month == 2 ? 28 : !(month % 2) && month != 8 ? 30 : 31;
};
const refresh = (recompile = true) => {
  document.getElementById("refresh").innerText = "Recalculating...";
  setTimeout(
    () => (document.getElementById("refresh").innerText = "Recalculate"),
    250
  );
  const date1 = window.globalDate;
  // let date1 = new Date("06/12/2023");
  const date2 = new Date("06/13/2023");
  let diffT = date2.getTime() - date1.getTime();
  let chance = 0;
  let precision = 5;
  let unit = 0;
  const day = 1000 * 3600 * 24;
  const month = date1.getMonth();
  const days = daysInMonth(month + 1);
  const year = date1.getFullYear();
  switch (window.chanceType) {
    case "right now":
      unit = diffT / 1000;
      chance = (1 / unit) * 100;
      precision = 14;
      break;
    case "today":
      unit = Math.ceil(diffT / day);
      chance = (1 / unit) * 100;
      precision = 3;
      break;
    case "tomorrow":
      date1.setDate(date1.getDate() + 1);
      diffT = date2.getTime() - date1.getTime();
      unit = Math.ceil(diffT / day);
      chance = (1 / unit) * 100;
      precision = 3;
      break;
    case "this week":
      unit = Math.ceil(diffT / 7 - date1.getDay());
      chance = (1 / unit) * 100;
      precision = 2;
      break;
    case "this month":
      unit = Math.ceil(
        diffT /
          (new Date(`${month + 1}/${days}/${date1.getFullYear()}`).getTime() -
            date1.getTime())
      );
      chance = (1 / unit) * 100;
      precision = 2;
      break;
    case "this year":
      if (year == 2022) {
        unit = Math.ceil(
          diffT / (new Date("01/1/2023").getTime() - date1.getTime())
        );
        chance = (1 / unit) * 100;
        precision = 2;
      } else {
        chance = 100;
      }
      break;
  }
  if (chance >= 100) {
    precision = 0;
    chance = 100;
  }
  if (chance <= 0) {
    precision = 0;
    chance = 0;
  }
  const maxMonth = year == 2022 ? 12 : 6;
  const minDay = month == 6 ? 12 : 1;
  const period =
    window.dateType == "custom"
      ? `on ${month + 1}/${date1.getDate()}/${year}`
      : window.chanceType;
  let counter = document.getElementById("counter");
  if (!recompile) {
    document.getElementById(
      "chance"
    ).innerHTML = `<a id="chance">${chance.toFixed(precision)}%</a>`;
  } else {
    let text = `It is <a id="chance">${chance.toFixed(
      precision
    )}%</a> likely that Silksong will release `;
    if (window.chanceType == "")
      text =
        "I'm working on how to determine the likelyness of Silksong releasing ";
    counter.innerHTML = `${text}<div onmouseover="hover()" onmouseleave="unhover()" class="dropdown">
        <button class="dropbtn" >${period}</button>
        <div class="dropdown-content">
          <button class="dropbtn" onclick="right_now()">right now</button><br>
          <button class="dropbtn" onclick="today()">today</button><br>
	  <button class="dropbtn" onclick="tomorrow()">tomorrow</button><br>
	  <button class="dropbtn" onclick="thisWeek()">this week</button><br>
          <button class="dropbtn" onclick="thisMonth()">this month</button><br>
          <button class="dropbtn" onclick="thisYear()">this year</button><br>
          <button class="dropbtn" onclick="onDate()" style="height:10%">
          <form class="dropbtn" id="dateForm">
              on 
              <input onmouseenter="preventClick()" onmouseleave="allowClick()" onchange="upDate()" id="date.month" class="month" type="number" value="${
                month + 1
              }" min="6" max="${maxMonth}">
              /<input onmouseenter="preventClick()" onmouseleave="allowClick()" onchange="upDate()" id="date.day" class="day" type="number" value="${date1.getDate()}" min="${minDay}" max="${days}">
              /<input onmouseenter="preventClick()" onmouseleave="allowClick()" onchange="upDate()" id="date.year" class="year" type="number" value="${year}" min="2022" max="2023">
          </form>
        </button>
        </div>
      </div>.`;
    const num = Math.floor(Math.random() * 11) + 1;
    document.body.background = `images/${num}.jpg`;
  }
  let form = document.getElementById("dateForm");
  const handleForm = (event) => {
    event.preventDefault();
  };
  form.addEventListener("submit", handleForm);
  return false;
};
refresh();
upDate();
