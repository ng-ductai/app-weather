let weather = {
  apiKey: "11d382eb1b99cade43366debbcb3fb0e",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&appid=" + this.apiKey + "&units=metric&lang=vi"
        
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, feels_like, temp_min, temp_max, humidity } = data.main;
      const { speed } = data.wind;
      const { sunrise, sunset} = data.sys
      var d = new Date();       

      document.querySelector(".city").innerText =  name;
      document.querySelector(".date").innerText =  d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() ;
      document.querySelector(".icon").src =  "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = Math.round(temp) + "°";
      document.querySelector(".temp_min-max").innerText = Math.round(temp_min) + "° " + "/ " + Math.round(temp_max) + "°";
      document.querySelector(".feels_like").innerText = "Cảm giác thực: " + Math.round(feels_like) + "°";
      document.querySelector(".humidity").innerText = "Độ ẩm: " + humidity + " %";
      document.querySelector(".wind").innerText = "Sức gió: " + (speed * 3.6).toFixed(2) + " km/h";
      document.querySelector(".sunrise").innerText = "MT mọc: " + moment.unix(sunrise).format('H:mm');
      document.querySelector(".sunset").innerText = "MT lặn: " + moment.unix(sunset).format('H:mm')
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Ho Chi Minh");
