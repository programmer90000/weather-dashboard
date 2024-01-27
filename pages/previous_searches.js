let cityArray = localStorage.getItem("cityArray");
cityArray = cityArray.split(",");

for (let i = 0; i < cityArray.length; i++) {
    let previousSearches = document.getElementById("previous_searches");
    let h1 = document.createElement("h1");
    h1.append(`${cityArray[i]}`);
    h1.style.marginLeft = "30px";
    h1.style.marginTop = "30px";
    h1.style.width = "fit-content";
    h1.style.breakInside = "avoid";
    h1.addEventListener("mouseover", () => { h1.style.cursor = "pointer" });
    h1.addEventListener("click", function () { localStorage.setItem("cityToSearchFor", h1.innerText) });
    previousSearches.append(h1);
}