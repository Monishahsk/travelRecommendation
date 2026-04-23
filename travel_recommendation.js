// travel_recommendation.js

let data = [];

// Load JSON data
fetch("travel_recommendation_api.json")
.then(res => res.json())
.then(json => data = json);

// Show Home
function showHome(){
    document.getElementById("homePage").style.display = "block";
    document.getElementById("aboutPage").style.display = "none";
    document.getElementById("contactPage").style.display = "none";
    document.getElementById("searchBar").style.display = "block";
}

// Show About
function showAbout(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("aboutPage").style.display = "block";
    document.getElementById("contactPage").style.display = "none";
    document.getElementById("searchBar").style.display = "none";
}

// Show Contact
function showContact(){
    document.getElementById("homePage").style.display = "none";
    document.getElementById("aboutPage").style.display = "none";
    document.getElementById("contactPage").style.display = "block";
    document.getElementById("searchBar").style.display = "none";
}

// Clear results
function clearResults(){
    document.getElementById("results").innerHTML = "";
}

// Search logic
function searchPlaces(){
    let keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    resultsDiv.style.display = "grid";
    resultsDiv.style.gridTemplateColumns = "repeat(2, 300px)";
    resultsDiv.style.gap = "30px";

    let filtered = [];

    if(keyword.includes("beach")){
        filtered = data.beaches.slice(0,2);
    }
    else if(keyword.includes("temple")){
        filtered = data.temples.slice(0,2);
    }
    else if(keyword.includes("country")){
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            filtered.push({
                name: city.name,
                imageUrl: city.imageUrl,
                description: city.description
            });
        });
    });

    filtered = filtered.slice(0,2);
}

    filtered.forEach(place => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;

        resultsDiv.appendChild(card);
    });
}