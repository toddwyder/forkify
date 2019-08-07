import axios from 'axios';

async function getResults (query) {
    const apiID = 'd26d84fc';
    const apiKey = '9e62db7f574bd8b3f3f8cd64b869ca06';
    try {
        const res = await axios(`https://api.edamam.com/search?q=${query}&app_id=${apiID}&app_key=${apiKey}`);
        const recipes = res.data.hits;
        console.log(recipes);
    } catch(error) {
        alert(error);
    }
}

getResults('tomato pasta');



// edamam app ID d26d84fc
// edamam app key 9e62db7f574bd8b3f3f8cd64b869ca06
// https://api.edamam.com/search

//import search model
//import Search from './models/Search';
//import * as searchView from './views/searchView';
//import {elements} from './views/base';
/*
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
 */

//  const state = {}

// const controlSearch = async () => {
//    //  1) Get query from view
//    const query = searchView.getInput();

//    if (query) {
//        // 2) New search object and add to state
//        state.search = new Search(query);
//        console.log(query);
//        console.log(state.search);

//        // 3) Prepare UI for results

//        // 4) Search for recipes
//        await state.search.getResults();

//        // 5) Render results on UI
//        searchView.renderResults(state.search.results); 
//    }
// }

// elements.searchForm.addEventListener('submit', e => {
//     e.preventDefault();
//     controlSearch();
// });

//search recipe database
//const search = new Search('pizza');
//  console.log(search);  
//  search.getResults();