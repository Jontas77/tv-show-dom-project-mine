//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const allShows = getAllShows();

// const EPISODES_API = `https://api.tvmaze.com/shows/2/episodes`;
const SHOWS_API = ` https://api.tvmaze.com/shows`;


let API_URL = [];
function setup() {
  fetch(SHOWS_API)
    .then((response) => response.json())
    .then((showIds) => {
      showIds.forEach((showID) => {
        let url = (`${SHOWS_API}/${showID.id}/episodes`);
        fetch(url)
        .then(response => response.json())
        .then(data => {
          makePageForEpisodes(data);
          dropdownMenuEpisode(data);
        })
       
      });
    });

    
    
  }

function zero(num) {
  return num < 10 ? "0" + num : num;
}


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${episodeList.length} episode(s)`;
  rootElem.textContent = "";
  episodeList.forEach((item) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.setAttribute("class", "episode");
    episodeDiv.setAttribute("id", `${item.id}`);
    rootElem.appendChild(episodeDiv);
    let pTag = document.createElement("p");
    episodeDiv.appendChild(pTag);
    pTag.setAttribute("class", "title");
    pTag.innerHTML = `<a href=${item.url} class="title-link"><strong>${
      item.name
    } - S${zero(item.season)}E${zero(item.number)}</strong></a> `;
    let imgTag = document.createElement("img");
    episodeDiv.appendChild(imgTag);
    imgTag.src = `${item.image.medium}`;
    let pSummary = document.createElement("p");
    episodeDiv.appendChild(pSummary);
    pSummary.innerHTML = `${item.summary}`;
    let link = document.createElement("a");
    episodeDiv.appendChild(link);
    link.setAttribute("href", `${item.url}`);
    link.innerText = "See full episode here";
  });
}

// Search Bar
const searchBar = document.getElementById("searchBar");
let episodeResult = [];

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  // fetch(`${EPISODE_API}`)
  //   .then((response) => response.json())
  //   .then((data) => (episodeResult = data));
  episodeResult = allEpisodes;
  let filterEpisodes = episodeResult.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });

  makePageForEpisodes(filterEpisodes);
});

// Dropdown menu for episode list
const containerDiv = document.getElementById("search-container");
const selectTag = document.createElement("select");
containerDiv.appendChild(selectTag);

function dropdownMenuEpisode(epList) {
  epList.forEach((element) => {
    const optionTag = document.createElement("option");
    selectTag.appendChild(optionTag);
    selectTag.setAttribute("id", "dropdownMenu");
    selectTag.setAttribute("onchange", "location = this.value");
    optionTag.setAttribute("value", `#${element.id}`);
    optionTag.innerText = `S${zero(element.season)}E${zero(element.number)} - ${
      element.name
    }`;
  });
}

// function dropdownMenu(select) {
//   const dropDownDiv = document.createElement("div");
//   containerDiv.appendChild(dropDownDiv);
//   dropDownDiv.setAttribute("class", "dropdown");

//   select.forEach((show) => {
//     const ulTag = document.createElement("ul");
//     dropDownDiv.appendChild(ulTag);
//     ulTag.setAttribute("class", "dropdown-list");
//     const liTag = document.createElement("li");
//     ulTag.appendChild(liTag);
//     liTag.setAttribute("class", "dropdown-item");
//     const linkTag = document.createElement("a");
//     liTag.appendChild(linkTag);
//     linkTag.setAttribute("href", `${show.name}`);
//     linkTag.innerText = `S${zero(show.season)}E${zero(show.number)} - ${
//       show.name
//     }`;
//   });
// }
let sorted = [];
let result;
// Get all shows
function setupShows() {
  dropdownMenuShow(allShows);
  // fetchID(allShows);
}

const selectTag2 = document.createElement("select");
containerDiv.appendChild(selectTag2);

function dropdownMenuShow(showList) {
  showList.forEach((item) => {
    let names = `${item.name}`;
    sorted.push(names);
  });
  let sortedArr = sorted.sort();
  result = sortedArr.forEach((show) => {
    const optionTag = document.createElement("option");
    selectTag2.appendChild(optionTag);
    selectTag2.setAttribute("id", "dropdownShow");
    // selectTag2.setAttribute("onchange", "location = this.value");
    // optionTag.setAttribute("value", `${item.id}`);
    optionTag.innerText = `${show}`;
  });
}
// let idArr = [];
// let idResult;

// function fetchID(showID) {
//   showID.forEach((element) => {
//     let id = `${element.id}`;
//     idArr.push(id);
//   });
//   let idSorted = idArr.sort((a, b) => a - b);
//   return idSorted;
// }

// selectTag2.addEventListener("click", fetchID);

setup();
setupShows();
// window.onload = setup;
