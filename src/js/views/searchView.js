import { elements } from './base';

export const getinput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = ' ';
};

const renderRecipe = hit => {
    const markup = `
        <li>
            <a class="results__link" href="#${hit.recipe.uri}">
                <figure class="results__fig">
                    <img src="${hit.recipe.image}" alt="${hit.recipe.label}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${hit.recipe.label}</h4>
                    <p class="results__author">${hit.recipe.source}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
  console.log(recipes);
  recipes.forEach(renderRecipe);  
};








//  import {elements} from  './base';

//  export const getInput = () => elements.searchInput.value;

//  const renderRecipe = recipe  => {
//    const markup = `
//     <li>
//       <a class="results__link" href="#${recipe.recipe_id}">
//           <figure class="results__fig">
//               <img src="$[recipe.image_url}" alt="${recipe.title}">
//           </figure>
//           <div class="results__data">
//               <h4 class="results__name">${recipe.title}</h4>
//               <p class="results__author">${recipe.publisher}</p>
//           </div>
//       </a>
//     </li>
//    `;
//    elements.searchResList.insertAdjacentHTML('beforeend', markup);
//  }

//  export const renderResults = recipes => {
//   console.log(recipes); 
//   recipes.forEach(renderRecipe);
     
//   }
 