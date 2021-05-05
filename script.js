//You can edit ALL of the code here
const allShows = getAllShows();

function setup() {
  makePageForShows(allShows);
  dropdownMenuShows(allShows);
}

// All Shows
function makePageForShows(showList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${showList.length} show(s)`;
  rootElem.textContent = "";

  showList.forEach((show) => {
    const { name, image, summary, rating, genres, status, runtime, url } = show;

    // Div for the card
    let showCardDiv = document.createElement("div");
    rootElem.appendChild(showCardDiv);
    showCardDiv.className = "showcard";

    // Name of show and click on title to fetch episodes
    let showTitleDiv = document.createElement("div");
    showCardDiv.appendChild(showTitleDiv);
    showTitleDiv.className = "show-title";
    let ptagTitle = document.createElement("p");
    showTitleDiv.appendChild(ptagTitle);
    ptagTitle.setAttribute("id", "showcardName");
    ptagTitle.innerText = `${name}`;
    ptagTitle.addEventListener("click", () => {
      let ptagValue = (ptagTitle.innerText = `${name}`);
      let result;
      allShows.forEach((item) => {
        const { name, id } = item;
        if (name === ptagValue) {
          result = id;
        }
      });
      getFetchEpisodes(result);
    });

    // Content of card
    let contentDiv = document.createElement("div");
    showCardDiv.appendChild(contentDiv);
    contentDiv.className = "content-container";

    let imgDiv = document.createElement("div");
    contentDiv.appendChild(imgDiv);
    imgDiv.className = "img-container";
    let imgTag = document.createElement("img");
    imgDiv.appendChild(imgTag);
    imgTag.src = `${image != null ? image.medium : ""}`;

    let summaryDiv = document.createElement("div");
    contentDiv.appendChild(summaryDiv);
    summaryDiv.className = "summary";
    let ptagSummary = document.createElement("p");
    summaryDiv.appendChild(ptagSummary);
    ptagSummary.innerHTML = `${summary}`;

    let infoDiv = document.createElement("div");
    contentDiv.appendChild(infoDiv);
    infoDiv.className = "info";
    let ptagRating = document.createElement("p");
    let ptagGenres = document.createElement("p");
    let ptagStatus = document.createElement("p");
    let ptagRuntime = document.createElement("p");
    infoDiv.appendChild(ptagRating);
    infoDiv.appendChild(ptagGenres);
    infoDiv.appendChild(ptagStatus);
    infoDiv.appendChild(ptagRuntime);
    ptagRating.innerHTML = `<strong>Rating:</strong> ${rating.average}`;
    ptagGenres.innerHTML = `<strong>Genres:</strong> ${genres.join(" | ")}`;
    ptagStatus.innerHTML = `<strong>Status:</strong> ${status}`;
    ptagRuntime.innerHTML = `<strong>Runtime:</strong> ${runtime}`;

    let link = document.createElement("a");
    infoDiv.appendChild(link);
    link.href = `${url}`;
    link.innerText = "For More Info Visit TvMaze";
  });
}

// Dropdown Menu for  Shows
let sorted = [];
let result;

const containerDiv = document.getElementById("dropdown-container");
const selectTag2 = document.createElement("select");
containerDiv.appendChild(selectTag2);
selectTag2.setAttribute("id", "dropdownShow");

// let defaultOption2 = document.createElement("option");
// defaultOption2.text = "All Shows";
// selectTag2.add(defaultOption2);
// selectTag2.selectedIndex = 0;

function dropdownMenuShows(showList) {
 
  showList.forEach((item) => {
    let names = `${item.name}`;
    sorted.push(names);
  });
  let sortedArr = sorted.sort();
  result = sortedArr.forEach((show) => {
    const optionTag = document.createElement("option");
    selectTag2.appendChild(optionTag);
    optionTag.innerText = `${show}`;
  });
}

// Button to all Shows
// let showsBtn = document.createElement("button");
// containerDiv.appendChild(showsBtn);
// showsBtn.setAttribute("onClick", "Refresh()");
// showsBtn.className = "showBtn";
// showsBtn.innerText = "All Shows";

function Refresh() {
  window.parent.location = window.parent.location.href;
}

// Search Shows
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  showResult = getAllShows();
  let filterShows = showResult.filter((show) => {
    return (
      show.name.toLowerCase().includes(searchString) ||
      show.summary.toLowerCase().includes(searchString) ||
      show.genres.includes(searchString)
    );
  });

  makePageForShows(filterShows);
});

// Fetch data from API
function getFetchEpisodes(api) {
  const EPISODES_API = `https://api.tvmaze.com/shows`;
  fetch(`${EPISODES_API}/${api}/episodes`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        console.warn(
          "Looks like there was a problem. Status Code: " + response.status
        );
      }
    })
    .then((data) => {
      selectTag.innerHTML = "";
      makePageForEpisodes(data);
      dropdownMenu(data);

      let episodeResult = [];
      searchBar.addEventListener("keyup", (e) => {
        let searchString = e.target.value.toLowerCase();
        episodeResult = data;
        let filterEpisodes = episodeResult.filter((episode) => {
          return (
            episode.name.toLowerCase().includes(searchString) ||
            episode.summary.toLowerCase().includes(searchString)
          );
        });
        makePageForEpisodes(filterEpisodes);
      });

      selectTag.addEventListener("change", (e) => {
        let episodeName = e.target.value;
        let result = [];
        let episodes = [];
        episodes.push(data);

        episodes.forEach((element) => {
          element.forEach((episode) => {
            if (episodeName.includes(`${episode.name}`)) {
              result.push(episode);
            }
          });
        });
        makePageForEpisodes(result);
      });
    })
    .catch((err) => {
      console.error("Fetch Error -", err);
    });
}

// Episodes
function zero(num) {
  return num < 10 ? "0" + num : num;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  episodeList.forEach((episode) => {
    const { name, url, image, summary, season, number } = episode;

    let episodeDiv = document.createElement("div");
    episodeDiv.className = "episode";
    rootElem.appendChild(episodeDiv);

    let pTag = document.createElement("p");
    episodeDiv.appendChild(pTag);
    pTag.className = "title";
    pTag.innerHTML = `<a href=${url} class="title-link"><strong>${name} - S${zero(
      season
    )}E${zero(number)}</strong></a> `;

    let imgTag = document.createElement("img");
    episodeDiv.appendChild(imgTag);
    imgTag.src = `${image != null ? image.medium : ""}`;

    let pSummary = document.createElement("p");
    episodeDiv.appendChild(pSummary);
    pSummary.innerHTML = `${summary}`;

    let link = document.createElement("a");
    episodeDiv.appendChild(link);
    link.href = `${url}`;
    link.innerHTML = "<small>Watch full episode @ tvmaze.com</small>";
  });
}

// Dropdown Menu for Episodes
const selectTag = document.createElement("select");
containerDiv.appendChild(selectTag);
selectTag.setAttribute("id", "dropdownMenu");

selectTag.length = 0;

let defaultOption = document.createElement("option");
defaultOption.text = "Choose Episode";

selectTag.add(defaultOption);
selectTag.selectedIndex = 0;

function dropdownMenu(list) {
  list.forEach((element) => {
    const optionTag = document.createElement("option");
    selectTag.appendChild(optionTag);
    optionTag.innerText = `S${zero(element.season)}E${zero(element.number)} - ${
      element.name
    }`;
  });
}

// Fetch episodes to populate episode dropdown
selectTag2.addEventListener("change", (e) => {
  let showName = e.target.value;
  let result;
  let showID = allShows.forEach((item) => {
    if (item.name === showName) {
      result = item.id;
    }
  });
  getFetchEpisodes(result);
});
// const EPISODES_API = `https://api.tvmaze.com/shows`;

// fetch(`${EPISODES_API}/${result}/episodes`)
//   .then((response) => {
//     if (response.status >= 200 && response.status <= 299) {
//       return response.json();
//     } else {
//       console.warn(
//         "Looks like there was a problem. Status Code: " + response.status
//       );
//     }
//   })
//   .then((data) => {
//     // selectTag2.classList.add('dropdown');
//     selectTag.innerHTML = "";

//     makePageForEpisodes(data);
//     dropdownMenu(data);

//     let episodeResult = [];
//     searchBar.addEventListener("keyup", (e) => {
//       let searchString = e.target.value.toLowerCase();
//       episodeResult = data;
//       let filterEpisodes = episodeResult.filter((episode) => {
//         return (
//           episode.name.toLowerCase().includes(searchString) ||
//           episode.summary.toLowerCase().includes(searchString)
//         );
//       });
//       makePageForEpisodes(filterEpisodes);
//     });

//     selectTag.addEventListener("change", (e) => {
//       let episodeName = e.target.value;
//       let result = [];
//       let episodes = [];
//       episodes.push(data);

//       episodes.forEach((element) => {
//         element.forEach((episode) => {
//           if (episodeName.includes(`${episode.name}`)) {
//             result.push(episode);
//           }
//         });
//       });
//       makePageForEpisodes(result);
//     });
//   })
//   .catch((err) => {
//     console.error("Fetch Error -", err);
//   });

window.onload = setup;
