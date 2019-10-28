window.addEventListener("load", () => {
  let lat;
  let long;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/cb6598bb6d0ecec80ecd3abdc0d8227d/${lat},${long}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          //Set DOM elements from the API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //Degree Conversion
          let celsius = (temperature - 32) * (5 / 9);
          //Set Icons
          setIcons(icon, document.querySelector(".icon"));

          //Set Celsius / Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  } else {
    h1.textContent =
      "This browser is not supported, please update to the newest version";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
