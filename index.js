document.getElementById("search-button").addEventListener("click", () => {
  const place = document.getElementById("search-input").value;
  if (place) {
    // Fetch place Details and photos if the input is not empty
    fetchPlaceDetails(place);
    fetchPhotos(place);
  }
});

const fetchPlaceDetails = (place) => {
  const mapContainer = document.getElementById("map-container");
  const mapElement = document.getElementById("map");
  const fallbackImage = document.getElementById("fallback-image");

  mapElement.innerHTML = "";
  fallbackImage.style.display = "none";

  fetch(
    `https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const placeDetails = data[0];
        displayPlaceDetails(placeDetails);
        loadMap([placeDetails.lat, placeDetails.lon]);
      } else {
        displayFallbackImage();
      }
    })
    .catch((error) => {
      console.log("Error fetching place details:", error);
      displayFallbackImage();
    });
};

const displayPlaceDetails = (details) => {
  const placeDetailsDiv = document.getElementById("place-details");
  placeDetailsDiv.innerHTML = `
    <h2>${details.display_name}</h2>
    <p>Latitude: ${details.lat}</p>
    <p>Longitude: ${details.lon}</p>
    `;
};

const loadMap = (coordinates) => {
  const mapElement = document.getElementById("map");
  const fallbackImage = document.getElementById("fallback-image");

  fallbackImage.style.display = "none";
  const map = L.map("map").setView(coordinates, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href = "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coordinates).addTo(map);
};

const fetchPhotos = (place) => {
  const apiKey = "vt_tQacVvuZk_raty1o_WXoQxNmU7EStKB_T2ifwR70";
  const url = `https://api.unsplash.com/search/photos?query=${place}&client_id=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const photosContainer = document.getElementById("photos");

      photosContainer.innerHTML = "";
      data.results.forEach((photo) => {
        const photoElement = document.createElement("div");
        photoElement.className = "photo";
        photoElement.innerHTML = `<img src = "${photo.urls.small}" alt = "${photo.alt_description}" />`;

        photoElement.addEventListener("click", () => {
          window.open("https://youtube.com/@code-with-Bharadwaj", "_blank");
        });
        photosContainer.appendChild(photoElement);
      });
    })
    .catch((error) => console.log("error fetching photos:", error));
};

const displayFallbackImage = () => {
  const mapElement = document.getElementById("map");
  const fallbackImage = document.getElementById("fallback-image");
  // Clear map content and display the fallback image
  mapElement.innerHTML = "";
  fallbackImage.style.display = "block";
};
