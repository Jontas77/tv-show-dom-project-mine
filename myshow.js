const allShows = getAllShows();
const EPISODES_API = ` https://api.tvmaze.com/shows`;

function setup() {
  makePageForShows(allShows);
  // dropdownMenuShows(allShows);
}

function makePageForShows(showList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${showList.length} show(s)`;
  rootElem.textContent = "";
  showList.forEach((item) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.setAttribute("class", "episode");
    episodeDiv.setAttribute("id", `${item.id}`);
    rootElem.appendChild(episodeDiv);
    let pTag = document.createElement("p");
    episodeDiv.appendChild(pTag);
    pTag.setAttribute("class", "title");
    pTag.innerHTML = `<a href=${item.url} class="title-link"><strong>${item.name}</strong></a> `;
    let imgTag = document.createElement("img");
    episodeDiv.appendChild(imgTag);
    imgTag.src = `${
      item.image === null ? "Image not available" : item.image.medium
    }`;
    let pSummary = document.createElement("p");
    episodeDiv.appendChild(pSummary);
    pSummary.innerHTML = `${item.summary}`;
    let link = document.createElement("a");
    episodeDiv.appendChild(link);
    link.setAttribute("href", `${item.url}`);
    link.innerText = "Click here for episodes";
  });
}

// Search Bar
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  showResult = getAllShows();
  let filterShows = showResult.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchString) ||
      show.summary.toLowerCase().includes(searchString)
    );
  });

  makePageForShows(filterShows);
});

// Dropdown

let sorted = [];
let result;

let containerDiv = document.getElementById("search-container");
const selectTag2 = document.createElement("select");
containerDiv.appendChild(selectTag2);
selectTag2.setAttribute("id", "dropdownShow");

// function dropdownMenuShows(showList) {
//   showList.forEach((item) => {
//     let names = `${item.name}`;
//     sorted.push(names);
//   });
//   let sortedArr = sorted.sort();
//   result = sortedArr.forEach((show) => {
//     const optionTag = document.createElement("option");
//     selectTag2.appendChild(optionTag);

//     optionTag.innerText = `${show}`;
//     optionTag.className = "showName";
//     optionTag.setAttribute('value', `${show}`)
//   })

//   }

let count = 0;
let idResult = [];
// function getFetchEpisodes() {
//     allShows.forEach(show => {
//       idResult.push(show.id);
//     })

//     fetch(`${EPISODES_API}/${count}/episodes`)
//     .then(response => response.json())
//     .then(data => {
//       makePageForEpisodes(data);
//       dropdownMenu(data);
//       console.log(data);
//     })
// }

// selectTag2.addEventListener('change', getFetchEpisodes);
//   let showDropdown = dropdownMenuShows(allShows);
// let episodeDropdown = dropdownMenu(allEpisodes);

//Testing
// let dropdown = document.getElementById('locality-dropdown');




fetch(`${EPISODES_API}/82/episodes`).then(function (response) {
  if (response.status !== 200) {
    console.warn(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }

  // Examine the text in the response
  response
    .json()
    .then(function (data) {
      let option;
      console.log(data);
     
        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
        	  option.text = data[i].name;
        	  option.value = data[i].abbreviation;
        	  selectTag.add(option);
        }
      });
    })
    .catch(function (err) {
      console.error("Fetch Error -", err);
    });

window.onload = setup;
