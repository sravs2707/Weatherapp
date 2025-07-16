function getWeather() {
  const city = document.getElementById("cityInput").value; 
  /*constant is a keyword to declare a variable.
  city is a variable storing the value entered by the user.
  .value actually grabs the text in user typed.
  so what system does is declare a constant variable city and store the 
  users input from the input box with ID cityinput.

  */
  const resultDiv = document.getElementById("weatherResult");
  /* This line gets a refernce to the html element with the ID weatherResult 
  where it displays weather info or the messages.
  */

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }
  const apiKey = "d3df3d533bf03991e8c485dcd4d7f6cb"; // replace with your real API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error("city not found");
      }
    return response.json(); })
    .then(data => {
      // Extract weather info
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      let emoji = "";

      if (condition.includes("cloud")) emoji = "☁️";
      else if (condition.includes("clear")) emoji = "☀️";
      else if (condition.includes("rain")) emoji = "🌧️";
      else if (condition.includes("thunderstorm")) emoji = "🌩️";
      else if (condition.includes("snow")) emoji = "❄️";
      else emoji = "🌡️"; // default

      resultDiv.innerHTML = `
        <h2>${city}</h2>
        <p>Temperature: ${temp}°C</p>
        <p>Condition: ${condition}${emoji}</p>
      `;
    })
    .catch(error => {
      console.error("Error:", error);
      resultDiv.innerHTML = "Something went wrong. Try again later.";
    });
}
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});



 
 