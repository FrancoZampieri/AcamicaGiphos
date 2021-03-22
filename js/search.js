let searchRender = (data) => {
  data.forEach((element) => {
    let contenedor = document.querySelector(".searchResultContainer");
    createCardOfGif(element, contenedor);
  });
};

document.getElementById("searchBtn").addEventListener("click", () => {
  let inputSearch = document.querySelector("#searchBox").value;
  console.log(inputSearch);
  getSearch(inputSearch).then(searchRender);
});

let createCardOfGif = (gif, parent) => {
  let card = document.createElement("div");
  let imgContainer = document.createElement("div");
  let img = document.createElement("img");
  let backgroundHover = document.createElement("div");
  let actionBtnList = document.createElement("ul");
  let imgClases = ["like", "download", "maximize"];
  let aClases = ["aLike", "aDownload", "aMaximize"];
  let textContainer = document.createElement("div");
  let userName = document.createElement("h6");
  let GifTitle = document.createElement("h4");

  imgContainer.className = "imgContainer";
  card.className = "card";
  backgroundHover.className = "cardBackground";
  textContainer.className = "cardTextContainer";
  userName.className = "userName";
  GifTitle.className = "gifTitle";
  img.src = gif.images.downsized.url;
  img.alt = "not found";

  parent.appendChild(card);
  card.appendChild(imgContainer);
  appendChildren(imgContainer, [img, backgroundHover]);

  backgroundHover.appendChild(actionBtnList);
  GifTitle.textContent = gif.title;
  console.log(gif.title);
  userName.textContent = gif.username;

  console.log(gif.username);

  for (let i = 0; i < imgClases.length; i++) {
    let element = document.createElement("li");
    let a = document.createElement("a");
    a.className = aClases[i];
    let btnImg = document.createElement("img");
    btnImg.className = imgClases[i];
    actionBtnList.appendChild(element);
    element.appendChild(a);
    if (aClases[i] == "aMaximize") {
      // a.addEventListener("click", maximize.bind(this, gif));
      a.addEventListener("click", () => maximize(gif));
    }
    if (aClases[i] == "aDownload") {
    }
    if (aClases[i] == "aLike") {
      a.addEventListener("click", () => likeGif(gif, a));
    }

    a.appendChild(btnImg);
  }

  backgroundHover.appendChild(textContainer);
  appendChildren(textContainer, [userName, GifTitle]);
};

let maximize = (gif) => {
  let body = document.getElementsByTagName("body")[0];
  let modal = document.getElementById("modal");
  modal.className = "open";
  let modalContainer = document.createElement("div");
  modalContainer.id = "modalContainer";
  let modalHeader = document.createElement("div");
  modalHeader.className = "modalHeader";
  let img = document.createElement("img");
  img.src = gif.images.downsized.url;

  let aLike = document.createElement("a");
  let aDownload = document.createElement("a");
  let btnLike = document.createElement("img");
  let btnDownload = document.createElement("img");
  let aClose = document.createElement("a");
  let btnClose = document.createElement("img");
  let textContainer = document.createElement("div");
  let userName = document.createElement("h6");
  let GifTitle = document.createElement("h4");

  aLike.className = "aLike";
  aDownload.className = "aDownload";
  aClose.className = "aClose";
  aClose.addEventListener("click", closeModal);
  console.log("modal");
  btnLike.className = "like";
  btnDownload.className = "download";
  btnClose.className = "close";
  textContainer.className = "cardTextContainer";
  userName.className = "userName";
  GifTitle.className = "gifTitle";
  GifTitle.textContent = gif.title;
  userName.textContent = gif.username;

  body.appendChild(modal);
  modal.appendChild(modalHeader);
  modal.appendChild(modalContainer);
  appendChildren(modalContainer, [img, textContainer, aLike, aDownload]);
  resizeGif(modalContainer, img, gif, screen.width / 10);
  modalHeader.appendChild(aClose);
  appendChildren(textContainer, [userName, GifTitle]);
  aLike.appendChild(btnLike);
  aDownload.appendChild(btnDownload);
  aClose.appendChild(btnClose);
};

let likesIds = [];

let likeGif = (gif, a) => {
  let gifId = gif.id;

  if (localStorage.getItem("idArray")) {
    likesIds = localStorage.getItem("idArray").split(",");
  }

  console.log(likesIds);
  if (a.className == "aLike") {
    a.className = "liked";
    likesIds.push(gifId);
    localStorage.setItem("idArray", likesIds.toString());
  } else {
    let idIndex = likesIds.indexOf(gifId);
    let aux1 = likesIds
      .slice(0, idIndex)
      .concat(likesIds.slice(idIndex + 1, likesIds.length));
    console.log(aux1);
    a.className = "aLike";
    localStorage.setItem("idArray", aux1.toString());
  }

  console.log(a.className);
  console.log(a);
};

let resizeGif = (container, img, gif, margin) => {
  if (margin === undefined) {
    margin = 0;
    console.log(margin);
  }
  let containerRect = container.getBoundingClientRect();
  let containerHeight = containerRect.height;

  let imgWidth =
    (containerHeight / parseInt(gif.images.downsized.height)) *
    parseInt(gif.images.downsized.width);

  if (imgWidth + margin > window.screen.width) {
    imgWidth = window.screen.width - margin;
    img.style.height =
      (imgWidth / parseInt(gif.images.downsized.width)) *
        parseInt(gif.images.downsized.height).toString() +
      "px";
  }
  img.style.width = imgWidth.toString() + "px";
  img.style.backgroundColor = "black";

  console.log(gif.images.downsized.width);
  console.log(gif.images.downsized.height);

  return img;
};

let closeModal = () => {
  let modal = document.getElementById("modal");
  modal.innerHTML = "";
  modal.className = "";
};
