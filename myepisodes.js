const allEpisodes = getAllEpisodes();

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
    episodeDiv.setAttribute('id', `${item.id}`);
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
// const searchBar = document.getElementById("searchBar");
// let episodeResult = [];

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

// Dropdown
// const containerDiv = document.getElementById("search-container");
const selectTag = document.createElement("select");
containerDiv.appendChild(selectTag);

function dropdownMenu(list) {
  list.forEach((element) => {
    const optionTag = document.createElement("option");
    selectTag.appendChild(optionTag);
    selectTag.setAttribute("id", "dropdownMenu");
    selectTag.setAttribute("onchange", "location = this.value");
    optionTag.setAttribute("value", `#${element.id}`);
    // optionTag.placeholder = 'Select Episodes';
    // optionTag.innerText = `S${zero(element.season)}E${zero(element.number)} - ${
    //   element.name
    // }`;
  });
}
dropdownMenu(allEpisodes);
// window.onload = setup;