import {Person,data} from './first_module'
import * as thing from './first_module'

function getMovieData(title){
     return $.getJSON(`https://omdbapi.com?t=${title}`)
}

async function main(title){
    try {
        var movie = await getMovieData(title);
        console.log(movie);
    } catch(e) {
        console.log(e);
    }
}

console.log("before AJAX")
main('Titanic');
console.log("after AJAX - still async!")

