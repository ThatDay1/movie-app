let movieName = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let API_KEY = "761448ba";

const getMovie = () => {
    let movieNameInput = movieName.value;
    //console.log(movieNameInput);
    let API = `http://omdbapi.com/?t=${movieNameInput}&apikey=${API_KEY}`;
    //console.log(API);

    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class ="msg">Enter a movie name</h3>`
    }
    else {
        fetch(API)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                if (data.Response == "True") {
                    result.innerHTML = `
                        <div class = "info">
                            <img src = "${data.Poster}" class = "poster"/>
                            <div>
                                <h2>${data.Title}</h2>
                                <div class = "rating">
                                    <img src="/img/star.svg"/>
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class = "details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class = "genre">
                                    <div>
                                        ${data.Genre.split(",").join("</div><div>")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot: </h3>
                        <p>${data.Plot}</p>
                        <h3>Cast: </h3>
                        <p>${data.Actors}</p>
                    `
                }
                else {
                    result.innerHTML = `<h3 class = "msg">${data.Error}</h3>`
                }
            })
            .catch(() => {
                result.innerHTML = `<h3 class = "msg">Error Found</h3>`
            })
    }
}

searchBtn.addEventListener("click", getMovie)