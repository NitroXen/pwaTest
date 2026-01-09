let timeNow = new Date(Date.now());
// let timeTomorrow = new Date(timeNow + 86400000);
// let timePast = new Date(timeNow + 86400000 * 2);
// let timeFourthDay = new Date(timeNow + 86400000 * 3);
// // let dataDesdeTimestamp = new Date(1672531200000);
const wheatherImages = document.getElementById("wheather");
const template = document.getElementById("weather-template");
const wheater_content = document.querySelector(".time-weather");
let dates = [];

const backgroundTemplate = {
  day: {
    text: "hsl(320, 80%, 20%)",
    secondary: "hsl(20, 50%, 10%)",
    background: "hsl(20, 50%, 90%)",
  },
  night: {
    text: "hsl(165, 50%, 90%)",
    secondary: "hsl(165, 50%, 90%)",
    background: "hsl(165, 50%, 10%)",
  },
};

function wheatherTemplate(day, date, month, year, hour, img) {
  let div = document.createElement("div");
  div.classList.add("wheatherImage");
  let h3 = document.createElement("h3");
  h3.innerText = `${week(day)} ${date} de ${months(
    month
  )} de ${year} | ${hour}:00`;
  let image = document.createElement("img");
  image.src = img;
  div.appendChild(h3);
  div.appendChild(image);
  return div;
}

// `<div class="wheatherImage"><h3>${day} ${hour}:00</h3><img src="${img}" alt="tiempo"/></div>`;

function week(day) {
  switch (day) {
    case 0:
      return "Domingo";
    case 1:
      return "Luns";
    case 2:
      return "Martes";
    case 3:
      return "Mercoles";
    case 4:
      return "Xoves";
    case 5:
      return "Venres";
    case 6:
      return "Sabado";
  }
}

function months(month) {
  switch (month) {
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
  }
}

function getHoursUtils(hours, minutes) {
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

// function createWheather(time) {
//   wheatherImages.appendChild(
//     wheatherTemplate(
//       ,
//       new Date(time.dt * 1000).getHours(),
//       `./assets/iconos/${time.weather[0].icon}.png`
//     )
//   );
// }
// let use = wheatherTemplate(
//   new Date(data.list[i].dt).getDay(),
//   new Date(data.list[i].dt).getHours(),
//   `./assets/iconos/${data.list[i].weather[0].icon}.png`
// );

async function obtenerDatosCiudad(city, time) {
  const APIKEY = "f9a6961a83a46abb222a23b40616ef78";
  let json = fetch(
    `https://api.openweathermap.org/data/2.5/forecast?&q=${city}&dt=${time}&lang=gl&appid=${APIKEY}&units=metric`
  );
  let data = await json.then((response) => response.json());

  document.getElementById("city").innerText = data.city.name;

  let sunrise = data.city.sunrise * 1000;
  let sunset = data.city.sunset * 1000;
  document.getElementById("abrente").innerText = getHoursUtils(
    new Date(sunrise).getHours(),
    new Date(sunrise).getMinutes()
  );
  document.getElementById("solpor").innerText = getHoursUtils(
    new Date(sunset).getHours(),
    new Date(sunset).getMinutes()
  );
  let use = wheatherTemplate(
    new Date(data.list[0].dt_txt).getDay(),
    new Date(data.list[0].dt_txt).getDate(),
    new Date(data.list[0].dt_txt).getMonth(),
    new Date(data.list[0].dt_txt).getFullYear(),
    new Date(data.list[0].dt_txt).getHours(),
    `./assets/iconos/${data.list[0].weather[0].icon}.png`
  );
  wheatherImages.appendChild(use);
  let buttons = document.getElementsByClassName("wheatherImage");

    
    
    data.list.forEach(e => {
      let clone = template.content.cloneNode(true);
      clone.querySelector("#weather-hour").textContent = `${new Date(e.dt*1000).getHours()}H`;
      clone.querySelector("#weather-image").src = `./assets/iconos/${e.weather[0].icon}.png`;
      clone.querySelector("#weather-temp").textContent = `${e.main.temp.toFixed(0)} °C`;
      wheater_content.appendChild(clone);
      
    });


  
}

// for (let time of data.list) {
//   wheatherImages.appendChild(wheatherTemplate(time));
// }

// for (let time of data.list) {
//   if (time.dt_txt.includes("2025-12-05 21:00:00")) {
//     today.push(time);
//     todayImg.src = `./assets/iconos/${time.weather[0].icon}.png`;
//   } else if (time.dt_txt.includes("2025-12-06 12:00:00")) {
//     tomorrow.push(time);
//     tomorrowImg.src = `./assets/iconos/${time.weather[0].icon}.png`;
//   } else if (time.dt_txt.includes("2025-12-07 12:00:00")) {
//     past.push(time);
//     pastImg.src = `./assets/iconos/${time.weather[0].icon}.png`;
//   } else if (time.dt_txt.includes("2025-12-08 12:00:00")) {
//     fourthDay.push(time);
//     fourthDayImg.src = `./assets/iconos/${time.weather[0].icon}.png`;
//     console.log(time.dy);
//     document.getElementById("fourthDayText").innerText =
//       Date(time.dy).getDay() === "NaN"
//         ? "Failed"
//         : week(Date(time.dy).getDay().toString());
//   }
// }

obtenerDatosCiudad("O Grove", timeNow);

// dates.forEach((time) => {
//   buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//       document.getElementById("temp").textContent = `${time.main.temp.toFixed(
//         0
//       )} °C`;
//       document.getElementById(
//         "desc"
//       ).textContent = `${time.weather[0].description}`;
//       document.getElementById("wind").textContent = `${time.wind.speed} m/s`;
//       document.getElementById("humid").textContent = `${time.main.humidity} %`;
//       document.getElementById("percentRain").textContent = time.pop
//         ? "Chove"
//         : "Non Chove";
//     });
//   });
// });

// todayButton.addEventListener("click", () => {
//   //   todayImg.src = `./assets/iconos/${today[0].weather[0].icon}.png`;
//   document.getElementById("temp").textContent = `${today[0].main.temp.toFixed(
//     0
//   )} °C`;
//   document.getElementById(
//     "desc"
//   ).textContent = `${today[0].weather[0].description}`;
//   document.getElementById("wind").textContent = `${today[0].wind.speed} m/s`;
//   document.getElementById("humid").textContent = `${today[0].main.humidity} %`;
//   document.getElementById("percentRain").textContent = today[0].pop
//     ? "Chove"
//     : "Non Chove";
// });

// tomorrowButton.addEventListener("click", () => {
//   //   tomorrowImg.src = `./assets/iconos/${tomorrow[0].weather[0].icon}.png`;
//   document.getElementById(
//     "temp"
//   ).textContent = `${tomorrow[0].main.temp.toFixed(0)} °C`;
//   document.getElementById(
//     "desc"
//   ).textContent = `${tomorrow[0].weather[0].description}`;
//   document.getElementById("wind").textContent = `${tomorrow[0].wind.speed} m/s`;
//   document.getElementById(
//     "humid"
//   ).textContent = `${tomorrow[0].main.humidity} %`;
//   document.getElementById("percentRain").textContent = tomorrow[0].pop
//     ? "Chove"
//     : "Non Chove";
// });

// pastButton.addEventListener("click", () => {
//   //   pastImg.src = `./assets/iconos/${past[0].weather[0].icon}.png`;
//   document.getElementById("temp").textContent = `${past[0].main.temp.toFixed(
//     0
//   )} °C`;
//   document.getElementById(
//     "desc"
//   ).textContent = `${past[0].weather[0].description}`;
//   document.getElementById("wind").textContent = `${past[0].wind.speed} m/s`;
//   document.getElementById("humid").textContent = `${past[0].main.humidity} %`;
//   document.getElementById("percentRain").textContent = past[0].pop
//     ? "Chove"
//     : "Non Chove";
// });

// fourthDayButton.addEventListener("click", () => {
//   //   fourthDayImg.src = `./assets/iconos/${fourthDay[0].weather[0].icon}.png`;

//   document.getElementById(
//     "temp"
//   ).textContent = `${fourthDay[0].main.temp.toFixed(0)} °C`;
//   document.getElementById(
//     "desc"
//   ).textContent = `${fourthDay[0].weather[0].description}`;
//   document.getElementById(
//     "wind"
//   ).textContent = `${fourthDay[0].wind.speed} m/s`;
//   document.getElementById(
//     "humid"
//   ).textContent = `${fourthDay[0].main.humidity} %`;
//   document.getElementById("percentRain").textContent = fourthDay[0].pop
//     ? "Chove"
//     : "Non Chove";
// })
