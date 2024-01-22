
const searchButton = document.querySelector(".search-bar button");
let cityInput = document.querySelector(".search-bar input");
let cityName;
let wheatherDetails = {};


let cityNamediv = document.querySelector(".city-name");
let mainTempratureShow = document.querySelector(".main-comp h1");
let humadityBox = document.querySelector(".humadity > span");
let windspeedBox = document.querySelector(".wind .value")
let precipitationBox = document.querySelector(".Precipitatin .value")
let UvIndexBox = document.querySelector(".Uv-Index .value");
let FeelsLikebox = document.querySelector(".Feels-like .value");
let dewBox = document.querySelector(".chance-of-rain .value")
let sunriseBox = document.querySelector(".sunrise");
let sunsetBox = document.querySelector(".sunset");
let dateBox = document.querySelector(".today");
let currentday = [];
let labelshours = [];
const ctx = document.getElementById('myChart');
let myChart ;
async function searchCall(cityName) {

    let result = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + cityName + "?unitGroup=metric&key=S7ZJS88J9ZZNSPNDKFUHPS6EJ&contentType=json&units=matric");
    return await result.json();
}

function jsonToObject(result) {

    console.log(result);
    wheatherDetails = {
        temprature: Math.round(result.currentConditions.feelslike),
        humadity: result.currentConditions.humidity,
        pressure: result.currentConditions.pressure,
        windspeed: result.currentConditions.windspeed,
        sunrise: (result.currentConditions.sunrise).slice(0, 5),
        sunset: (result.currentConditions.sunset).slice(0, 5),
        uvIndex: result.currentConditions.uvindex,
        conditions: result.currentConditions.conditions,
        pressure: result.currentConditions.pressure,
        dew: result.currentConditions.dew,
        cityName: result.address,
    };
}


function UIupdatation() {
    cityNamediv.innerText = wheatherDetails.cityName;
    mainTempratureShow.innerHTML = wheatherDetails.temprature + "<sup>o</sup>"
    humadityBox.innerText = wheatherDetails.humadity + "%";
    windspeedBox.innerHTML = wheatherDetails.windspeed + "kph";
    UvIndexBox.innerHTML = wheatherDetails.uvIndex;
    FeelsLikebox.innerHTML = wheatherDetails.temprature + "<sup>0</sup>";
    precipitationBox.innerHTML = wheatherDetails.pressure + "mb";
    dewBox.innerHTML = wheatherDetails.dew + "<sup>o</sup>";
    sunriseBox.innerHTML = wheatherDetails.sunrise;
    sunsetBox.innerHTML = wheatherDetails.sunset;
    dateBox.innerHTML = "Today " + (new Date()).toDateString().slice(4, 10);
}

const progressBarUpdation = () => {

    function humadity() {
        let humadityValue = wheatherDetails.humadity;
        let progressBar = document.querySelectorAll(".humadity .progress");
        for (let i = 0; i < progressBar.length; i++) {
            if (humadityValue >= 0) {
                if (humadityValue > 33) {
                    progressBar[i].children[0].style.width = 100 + "%";
                } else {
                    progressBar[i].children[0].style.width = (humadityValue / 33 * 100) + "%";
                }
                humadityValue -= 33;
            } else {
                progressBar[i].children[0].style.width = 0 + "%";
            }
        }

        progressBar = document.querySelector(".humadity .progress-for-mobile .progress");
        progressBar.children[0].style.width = wheatherDetails.humadity + "%";
    }

    function wind() {
        let windspeed = wheatherDetails.windspeed;
        let progressBar = document.querySelectorAll(".wind .progress");
        for (let i = 0; i < progressBar.length; i++) {
            if (windspeed >= 0) {
                if (windspeed >= 10) {
                    progressBar[i].children[0].style.width = 100 + "%";
                } else {
                    progressBar[i].children[0].style.width = (windspeed / 10 * 100) + "%";
                }
                windspeed -= 10;
            } else {
                progressBar[i].children[0].style.width = 0 + "%";
            }
        }
        progressBar = document.querySelector(".wind .progress-for-mobile .progress");
        progressBar.children[0].style.width = wheatherDetails.windspeed + "%";
    }

    function pressure() {
        let pressure = wheatherDetails.pressure;
        let progressBar = document.querySelectorAll(".Precipitatin .progress");
        for (let i = 0; i < progressBar.length; i++) {
            if (pressure >= 0) {
                if (pressure >= 100) {
                    progressBar[i].children[0].style.width = 100 + "%";
                } else {
                    progressBar[i].children[0].style.width = (pressure / 100 * 100) + "%";
                }
                pressure -= 100;
            } else {
                progressBar[i].children[0].style.width = 0 + "%";
            }
        }

        progressBar = document.querySelector(".Precipitatin .progress-for-mobile .progress");
        progressBar.children[0].style.width = (wheatherDetails.pressure / 1000 * 100) + "%";

    }


    function uvIndex() {
        let IndexValue = wheatherDetails.uvIndex;
        let progressBar = document.querySelectorAll(".Uv-Index .progress");
        for (let i = 0; i < progressBar.length; i++) {
            if (IndexValue >= 0) {
                if (IndexValue >= 2) {
                    progressBar[i].children[0].style.width = 100 + "%";
                } else {
                    progressBar[i].children[0].style.width = (IndexValue / 2 * 100) + "%";
                }
                IndexValue -= 2;
            } else {
                progressBar[i].children[0].style.width = 0 + "%";
            }
        }

        progressBar = document.querySelector(".Uv-Index .progress-for-mobile .progress");
        progressBar.children[0].style.width = wheatherDetails.uvIndex + "%";

    }

    function feelslike() {
        let progressBar = document.querySelectorAll(".Feels-like .progress");
        progressBar[0].children[0].style.width = wheatherDetails.feelslike + "%";

        progressBar = document.querySelector(".Feels-like  .progress-for-mobile .progress");
        progressBar.children[0].style.width = wheatherDetails.feelslike + "%";
    }

    function dew() {
        let progressBar = document.querySelectorAll(".chance-of-rain .progress");
        progressBar[0].children[0].style.width = wheatherDetails.dew + "%";

        progressBar = document.querySelector(".chance-of-rain  .progress-for-mobile .progress");
        progressBar.children[0].style.width = wheatherDetails.dew + "%";
    }

    dew();
    feelslike();
    uvIndex();
    pressure();
    wind();
    humadity();
}

for (let i = 0; i < 24; i++) {
    labelshours[i] = (i).toString() + ": 00";
}

const data = {
    labels: labelshours,
    datasets: [{
        label: 'Today',
        data: currentday,
        fill: true,
        backgroundColor: '#5C9CE5',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
};



const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            x: {
                grid: {
                    drawOnChartArea: true
                }
            },
            y: {
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    },

};



searchButton.addEventListener('click', (e) => {
    cityName = cityInput.value
    cityName = cityName.toUpperCase();
    e.preventDefault();
    searchCall(cityName).then((result) => {
        jsonToObject(result);
        UIupdatation();
        progressBarUpdation();
        for (let i = 0; i < 24; i++)
            currentday[i] = result.days[0].hours[i].feelslike;
            myChart.destroy();
            myChart =  new Chart(ctx, config)
    })
}
)


searchCall("Islamabad").then((result) => {
    jsonToObject(result);
    UIupdatation();
    progressBarUpdation();
     for (let i = 0; i < 24; i++)
            currentday[i] = result.days[0].hours[i].feelslike;
      myChart =   new Chart(ctx, config)
})
