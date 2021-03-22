let container = document.querySelector(".slider");

let render = (data) => {
  data.forEach((element) => {
    let cont = document.createElement("div");
    let img = document.createElement("img");
    img.src = element.images.downsized.url;
    img.alt = "not found";

    let containerRect = container.getBoundingClientRect();
    let containerHeight = containerRect.height;

    let imgWidth =
      (containerHeight / parseInt(element.images.downsized.height)) *
      parseInt(element.images.downsized.width);

    if (imgWidth + 44 > window.screen.width) {
      imgWidth = window.screen.width - 44;
      img.style.height =
        (imgWidth / parseInt(element.images.downsized.width)) *
        parseInt(element.images.downsized.height);
    }
    img.style.width = imgWidth.toString() + "px";
    img.style.backgroundColor = "black";
    container.appendChild(cont);
    cont.appendChild(img);

    console.log(imgWidth);
    console.log(containerRect);
    console.log(containerRect.width);
  });
};

getTrendings(3).then(render);
