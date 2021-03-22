let urlTrending = "http://api.giphy.com/v1/gifs/trending";
let apikey = "tc99nXyWNZMua72KAxBloZEgfL6OSptY";

async function getTrendings(limit) {
  let response = await fetch(urlTrending + `?api_key=${apikey}&limit=${limit}`);
  console.log(response);
  let data = await response.json();
  console.log(data);
  return data.data;
}

let urlSearch = "http://api.giphy.com/v1/gifs/search";
// let apikey = "tc99nXyWNZMua72KAxBloZEgfL6OSptY";

async function getSearch(key) {
  let response = await fetch(urlSearch + `?api_key=${apikey}&q=${key}`);
  console.log(response);
  let data = await response.json();
  console.log(data);
  return data.data;
}

async function getAutocomplete(tag) {
  let response = await fetch(
    urlSearch + "/tags" + `?api_key=${apikey}&q=${tag}`
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  return data.data;
}
