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

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});

//window.addEventListener('load', controlRecipe);
//['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


// edamam app ID d26d84fc
// edamam app key 9e62db7f574bd8b3f3f8cd64b869ca06
// https://api.edamam.com/search 

