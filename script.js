const btn = document.querySelector("#btn");
const county_container = document.querySelector(".county-container");
const map = document.querySelector("#map");
/*
http://api.positionstack.com/v1/forward
    ? access_key = 0021a388fddba98b24ed385b9926d250
    & query = 40.7638435,-73.9729691
*/
//0021a388fddba98b24ed385b9926d250
//Geolocation API

function geo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      map.innerHTML = `<iframe
      src="https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed"
      width="100%"
      height="100%"
      frameborder="0"
      style="border:0"
      allowfullscreen
    ></iframe>`;
      getLocation(lat, long);
    });
  }
}
const getLocation = async (lat, long) => {
  try {
    const response = await fetch(
      `http://api.positionstack.com/v1/reverse?access_key=0021a388fddba98b24ed385b9926d250&query=${lat},${long}`
    );
    const data = await response.json();
    console.log(data);
    const country = data.data[0];

    county_container.innerHTML = `
    <div class="content">
    <h2>Continent</h2>
    <p>${country.continent}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.region}</p>
  </div>
  <div class="street">
    <h2>Street</h2>
    <p>${country.street}</p>
  </div>
  <div class="region">
    <h2>Region</h2>
    <p>${country.county}</p>
  </div>
  <div class="Address">
    <h2>Address</h2>
    <p>${country.label}</p>
  </div>`;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
btn.addEventListener("click", geo);
