// title : https://www.omdbapi.com/?s=avengers&apikey=a290d9f8
// details : https://www.omdbapi.com/?i=tt0848228&apikey=a290d9f8

const moviesearch = document.getElementById('search');
const search = document.getElementById('search-list');
const reasultgrid = document.getElementById('reasult-grid');

async function loadmovies(searchterm){
    const URL = `https://www.omdbapi.com/?s=${searchterm}&page=1&apikey=a290d9f8`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
        if(data.Response == "True")
        {
            displaymovies(data.Search)
        }
}
function findmovies(){
    let searchterm = (moviesearch.value).trim();
    if(searchterm.length > 0){
        search.classList.remove('hide-search-list');
        loadmovies(searchterm)
    }else{
        search.classList.add('hide-search-list')
    }
}
function displaymovies(movies){
    // console.log(v)
    search.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        let movielist = document.createElement('div');
        movielist.dataset.id = movies[i].imdbID;
        movielist.classList.add('search-list-item')
        if(movies[i].Poster != "N/A"){
            moviePoster = movies[i].Poster;
        }
        else{
            moviePoster = "https://www.sunflowerhospital.in/assets/img/bg/404-error-dribbble-800x600.gif"
        }
        movielist.innerHTML =  
        `<div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>`
        search.appendChild(movielist);
    }
    loadmoviesdetails();
}
function loadmoviesdetails(){
    const searchmovie = search.querySelectorAll('.search-list-item');
    searchmovie.forEach(movies =>{
        movies.addEventListener('click',async () =>{
            search.classList.add('hide-search-list');
            moviesearch.value = "";
            const reasult = await fetch(`https://www.omdbapi.com/?i=${movies.dataset.id}&apikey=a290d9f8`);
            const moviedetails = await reasult.json()
            displaymoviesdetails(moviedetails);
        })
    })
}
function displaymoviesdetails(details){
    reasultgrid.innerHTML = 
    ` <div class="movie-poster">
        <img src= "${(details.Poster != 'N/A') ? details.Poster:"https://www.sunflowerhospital.in/assets/img/bg/404-error-dribbble-800x600.gif"}">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year Of Release : ${details.Year}</li>
            <li class="rated">IMBD Ratings : ${details.imdbRating}</li>
            <li class="released">Released : ${details.Released}</li>
        </ul>
        <class="year">Genre : ${details.Genre}</class=>
        <p class="actors"><b>Actors : </b>${details.Actors}</p>
        <p class="language"><b>Language : </b>${details.Language}</p>
        <p class="plot"><b>Description : </b>${details.Plot}</p>
    </div> `
    document.getElementById('slides').style.display="none"
    document.getElementById('container2').style.marginTop="5%"
}

window.addEventListener('click',function(event){
    if(event.target.className != "search"){
        search.classList.add('hide-search-list')
    }
})

function makeslideshow(slidesID){
    const slides = document.getElementById(slidesID);
    const slidesInner = slides.querySelector('.slides-inner');
    const images = slidesInner.querySelectorAll('img');

    let index = 0

    setInterval(function(){
        index += 1;
        if(index == images.length){
            index = 0
        }
        slidesInner.style.transform = `translate3d(${index * -1200}px,0,0)`
    },3000)
}
makeslideshow('slides')


let url = 'https://api.themoviedb.org/3/movie/popular?api_key=832a24ee27d5b78932675dd9b9fd247a&language=en-US&page=1&region=IN';

async function getmovie(){
    let api = fetch(url);
    let res = await api;
    let data = await res.json()
    showmovie(data.results)
}
getmovie(url)
function showmovie(movies){
    // console.log(movies)
    movies.forEach((movie)=>{
        // console.log(movie)
        let movieEl = document.createElement('div');
        movieEl.setAttribute('class','movie');
        movieEl.innerHTML = `<img src='https://image.tmdb.org/t/p/original/${movie.poster_path}' alt="">
        <h3 id="h31">${movie.title}</h3>
        <p id="p1">Release : ${movie.release_date}</p>
        <h4 id="h41">Rating : ${movie.vote_average} ⭐️</h4>
        `
         document.getElementById('container2').append(movieEl)
    })
}