import Search from './models/search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base'; 
import Recipe from './models/recipe';

/* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
 */
const state ={};

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getinput();
    // console.log(query);

    if (query) {
        //2)  New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
        } catch (err) {
            alert ('Ut Oh, something went wrong with the search...');
            clearLoader();
        }
    }
}

// User clicked on search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// User clicked on previous or next search results button
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
    
});

/**
 *  RECIPE CONTROLLER    
 */
const controlRecipe = () => {
    let id = window.location.hash.slice(1);
    console.log(id);
        
    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();   
        renderLoader(elements.recipe);

        // Hightlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Get recipe data and parse ingredients
        
       let recID = state.search.result.filter(result => {
            return id === result.recipe.uri;
       
           
            // state.recipe.parseIngredients();
        })
        state.recipe = new Recipe(recID); 
        state.recipe.parseIngredients();
        // console.log(state.recipe);
        // console.log(state.recipe[0].recipe.source); 
         ;
        
        // Calculate servings and time

        // Render Recipe
         clearLoader();
         recipeView.renderRecipe(state.recipe);
    }
};


window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// edamam app ID d26d84fc
// edamam app key 9e62db7f574bd8b3f3f8cd64b869ca06
// https://api.edamam.com/search 

//import search model
//import Search from './models/Search';
//import * as searchView from './views/searchView';
//import {elements} from './views/base';


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