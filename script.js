//You can edit ALL of the code here
const allShows = getAllShows();
const EPISODES_API = `https://api.tvmaze.com/shows`;

function setup() {
  makePageForShows(allShows);
  dropdownMenuShows(allShows);
}

function zero(num) {
  return num < 10 ? "0" + num : num;
}

function makePageForShows(showList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${showList.length} show(s)`;
  rootElem.textContent = "";
  showList.forEach((item) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.setAttribute("class", "episode");
    rootElem.appendChild(episodeDiv);
    let pTag = document.createElement("p");
    episodeDiv.appendChild(pTag);
    pTag.setAttribute("class", "title");
    pTag.innerHTML = `<a href=${item.url} class="title-link"><strong>${item.name}</strong></a> `;
    let imgTag = document.createElement("img");
    episodeDiv.appendChild(imgTag);
    imgTag.src = `${item.image != null ? item.image.medium : ""}`;
    let pSummary = document.createElement("p");
    episodeDiv.appendChild(pSummary);
    pSummary.innerHTML = `${item.summary}`;
    let link = document.createElement("a");
    episodeDiv.appendChild(link);
    link.setAttribute("href", `${item.url}`);
    link.innerText = "Click here for episodes";
  });
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const count = document.getElementById("count");
  count.innerText = `Displaying ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  episodeList.forEach((item) => {
    let episodeDiv = document.createElement("div");
    episodeDiv.setAttribute("class", "episode");
    // episodeDiv.setAttribute("id", `${item.id}`);
    rootElem.appendChild(episodeDiv);
    let pTag = document.createElement("p");
    episodeDiv.appendChild(pTag);
    pTag.setAttribute("class", "title");
    pTag.innerHTML = `<a href=${item.url} class="title-link"><strong>${
      item.name
    } - S${zero(item.season)}E${zero(item.number)}</strong></a> `;
    let imgTag = document.createElement("img");
    episodeDiv.appendChild(imgTag);
    imgTag.src = `${item.image != null ? item.image.medium : ""}`;
    let pSummary = document.createElement("p");
    episodeDiv.appendChild(pSummary);
    pSummary.innerHTML = `${item.summary}`;
    let link = document.createElement("a");
    episodeDiv.appendChild(link);
    link.setAttribute("href", `${item.url}`);
    link.innerText = "See full episode here";
  });
}

// Search Shows
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

// Search Episodes
const searchBar2 = document.getElementById("searchBar");
let episodeResult = [];

// searchBar.addEventListener("keyup", (e) => {
//   let searchString = e.target.value.toLowerCase();
//   episodeResult = getAllEpisodes();
//   let filterEpisodes = episodeResult.filter((episode) => {
//     return (
//       episode.name.toLowerCase().includes(searchString) ||
//       episode.summary.toLowerCase().includes(searchString)
//     );
//   });

//   makePageForEpisodes(filterEpisodes);
// });

// Dropdown Shows
let sorted = [];
let result;

const containerDiv = document.getElementById("search-container");
const selectTag2 = document.createElement("select");
containerDiv.appendChild(selectTag2);
selectTag2.setAttribute("id", "dropdownShow");

// selectTag2.length = 0;

// let defaultOptionShow = document.createElement("option");
// defaultOptionShow.text = "Choose Show";

// selectTag2.add(defaultOptionShow);
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

// Dropdown Episodes
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
let epResult;


selectTag2.addEventListener("change", (e) => {
  let showName = e.target.value;
  let result;
  let showID = allShows.forEach((item) => {
    if (item.name === showName) {
      result = item.id;
    }
  });

  fetch(`${EPISODES_API}/${result}/episodes`)
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
      // for (let i = 0; i < data.length; i++) {
      //   option = document.createElement("option");
      //   option.text = data[i].name;
      //   option.value = data[i].abbreviation;
      //   selectTag.add(option);
      // }
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
        console.log(episodeName);
        let result = [];
        episodes = [];
        if (episodeName == 1) {
          return data;
        } else {
          episodes.push(data);
        }
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
});

window.onload = setup;
