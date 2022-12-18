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
        <h3>${movie.title}</h3>
        <p>Release : ${movie.release_date}</p>
        <h4>Rating : ${movie.vote_average} ⭐️</h4>
        `
         document.getElementById('container').append(movieEl)
    })
}

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
    },2000)
}
makeslideshow('slides')