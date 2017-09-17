const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const searchInput = document.querySelector('.search');
const proposalList = document.querySelector('.proposal');

// PURE //////////////////////////////////////////////////////////
// fillCities :: URL -> Promise [cities]
const fillCities = async (citiesURL) => {
    const data = [];
    const response = await fetch(endpoint);
    return await response.json();
    
}

// findMatches :: String -> Object -> Boolean
const findMatches = wordToMatch => place => {
    const regex = new RegExp(wordToMatch, 'gi');
    const temp = place.city.match(regex) || place.state.match(regex);
    return temp;
}

// transducer filter func
const filterT = predicate => reducer => (acc, curr) => {
    if(predicate(curr)){
      
        return reducer(acc, curr) 
    }  
    else {
        return acc;
    }
}
// numberWithCommas :: String -> String
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// IMPURE //////////////////////////////////////////////////////
// getMatchedListDOM :: string -> [] -> DOM
const displayMatches = input  => cities => () => {
    console.time('time');
    const reducer = (acc, place) => {
        const regex = new RegExp(input.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${input.value}</span>`)
        const stateName =  place.state.replace(regex, `<span class="hl">${input.value}</span>`)
        return acc+`
        <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
       </li> `
    };
    const xform = filterT(findMatches(input.value));
    const html = cities.reduce(xform(reducer), '');
    console.timeEnd('time');
    proposalList.innerHTML = html;
    
}

// main :: IO
const main = () => {
    const cities = fillCities(endpoint)
        .then(cities => {
           searchInput.addEventListener('change', displayMatches(searchInput)(cities)); 
           searchInput.addEventListener('keyup',  displayMatches(searchInput)(cities));
        })
}
main();