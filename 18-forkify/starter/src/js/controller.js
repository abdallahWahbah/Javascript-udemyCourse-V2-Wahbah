import 'core-js/stable'; 
import 'regenerator-runtime/runtime'; 
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

if(module.hot) module.hot.accept();


// present the food in the big screen
const controlRecipes = async() =>
{
  try
  {

    const id = window.location.hash.slice(1); // #5ed6604591c37cdc054bc89a and it will remove the "#" because of slice(1)
    console.log(id);
    if(!id) return;

    recipeView.renderSPinner();

    // 0) Update results view to mark selected search result
    // you will find error text in the result search view in hte browser .. the solution is to remove the 1st (is statement) in render method ... but this is not okay with us ... or use update method
    // resultsView.render(model.getSearchResultsPage()); 
    resultsView.update(model.getSearchResultsPage());// better using update .. but if you don't understant what it does, just ignore it

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading the recipe
    await model.loadRecipe(id);

    // 3) Rendering the recipe
    recipeView.render(model.state.recipe);

    

  }
  catch(error)
  {
    // console.log(`${error} ssssssssssssssssssssssss`);
    recipeView.renderError();
  }
};


const controlSearchResults = async () =>
{
  try
  {

    resultsView.renderSPinner();

    const query = searchView.getQuery();
    if(!query) return;
    
    // 1) Load search results
    await model.loadSearchResults(query);

    // 2) render results
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage()); // render 10 meals per page

    // 3) render pagination buttons
    paginationView.render(model.state.search); 
  }
  catch(error)
  {
    console.log(error);
  }
}

const controlPagination = (goToPage)=>
{
  // console.log(goToPage);
  // 2) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage)); // render 10 meals per page

  // 3) render NEW pagination buttons
  paginationView.render(model.state.search); 
}


const controlServings = (udpateTo) =>
{
  // Update the recipe servings (in state)
  model.updateServings(udpateTo);

  // Update the recipe view
  // recipeView.render(model.state.recipe); // use this method or just read the below one ... see video #18 ... however, it is important
  recipeView.update(model.state.recipe);
};


const controlAddBookmark = ()=>
{
  // 1) Add/Remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  // 2) Update recipe view
  recipeView.update(model.state.recipe); // recipeView.render(.......)

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = ()=>
{
  bookmarksView.render(model.state.bookmarks);
}


// something wrong with adding a recipe
const controlAddRecipe = async (newRecipe)=>
{
  try
  {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
  }
  catch(error)
  {
    console.error(error);
    addRecipeView.renderError(error);
  }
}











// ['hachchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
// // window.addEventListener("hashchange", controlRecipes);
// // window.addEventListener("load", controlRecipes);
// we want this code to be executed in recipeView
const init = () =>
{
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  // addRecipeView.addHandlerUpload(controlAddRecipe);// something wrong with adding a recipe
}
init();