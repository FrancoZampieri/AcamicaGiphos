let input = document.getElementById("searchBox");

let autocompleteRender = (data) => {
  let contenedor = document.querySelector(".search-input-container");
  let test = document.querySelector(".search-input-container div");
  if (test) {
    test.remove();
    console.log("borrado");
  }

  let cont = document.createElement("div");

  let ul = document.createElement("ul");
  contenedor.appendChild(cont);
  cont.appendChild(ul);
  data.forEach((element) => {
    let li = document.createElement("li");
    li.textContent = element.name;
    li.addEventListener("click", () => {
      input.value = li.textContent;
      getSearch(input.value).then(searchRender).catch(console.error);
    });
    ul.appendChild(li);
  });
};

input.addEventListener("keyup", () => {
  let value = input.value;

  getAutocomplete(value).then(autocompleteRender);
});
