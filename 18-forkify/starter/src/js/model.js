import {getJSON, sendJSON} from './helpers.js';
import {API_URL, RES_PER_PAGE, KEY} from './config.js';

export const state = 
{
    recipe: {},
    search: 
    {
        query: '',
        results: [],
        page: 1,
        resutlsPerPage: RES_PER_PAGE
    },
    bookmarks: []
};

const createRecipeObject = (data) =>
{
    const recipe = data.data.recipe;
    // console.log(recipe);
    return  { // you can call it anything not just recipe

    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients
    }
    // console.log(state.recipe);
}

export const loadRecipe = async (id) => // async func always returns a promise which yu need to handle it with await 
{
    // https://forkify-api.herokuapp.com/v2
    try
    {
        const data = await getJSON(`${API_URL}${id}`); // id: 5ed6604591c37cdc054bcd81
        state.recipe = createRecipeObject(data);

        
        
        if(state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    }
    catch(error)
    {
        console.error(`${error.message} hello from the other side`);
        // if we loged the error here...it will be printed in the console...but i want to print the error in the function which is using this function (controoller.js)
        // and if left the code above ... it will be executed also
        throw error;
    }
};


export const loadSearchResults = async (query) =>
{
    try
    {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        // console.log(data);
        // console.log(data.data.recipes);
        state.search.results = data.data.recipes.map(el =>
            {
                return {
                    id: el.id,
                    title: el.title,
                    publisher: el.publisher,
                    image: el.image_url
                }
            });
        // console.log(state.search.results);
        state.search.page = 1;
    }
    catch(error)
    {
        console.error(`${error.message} hello from the other side`);
        throw error;
    }
}



export const getSearchResultsPage = (page = state.search.page)=>
{
    state.search.page = page;
    const start = (page - 1) * state.search.resutlsPerPage; // 0: for the first page
    const end = (page * state.search.resutlsPerPage); // 9 ... remember that slice excludes the second param    
    return state.search.results.slice(start, end);
}


export const updateServings = (newServings)=>
{
    // console.log(state.recipe);
    state.recipe.ingredients.forEach(ing =>
    {
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
}

const persistBookmarks = () =>
{
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}


export const addBookmark = (recipe) =>
{
    // Add bookmark to the recipe
    state.bookmarks.push(recipe);

    // mark current recipe as bookmarked
    if(state.recipe.id === recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
}


export const deleteBookmark = (id)=>
{
    // delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // mark current recipe as NOT bookmarked
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmarks();
}

const init = ()=>
{
    const storage = localStorage.getItem("bookmarks");
    if(storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBookmarks = ()=>
{
    localStorage.clear("bookmarks");
}


export const uploadRecipe= async (newRecipe)=>
{
    // console.log(Object.entries(newRecipe));// convert object to array

    try
    {
        const ingredients = Object.entries(newRecipe).filter(ing =>
        {
            return ing[0].startsWith("ingredient") && ing[1] !== '';
        });
        // console.log(ingredients);
        const mapping = ingredients.map(ing =>
        {
            const ingArr = ing[1].replaceAll(" ", "").split(",");
            // console.log(ingArr);
            if(ingArr.length !== 3) throw new Error("Wrong ingredient format!, please input the correct format");
            const [quantity, unit, description] = ingArr;
            return {quantity: quantity ? +quantity : null, unit, description}; // return {unit:unit, .....}
        });
        // console.log(mapping);

        const recipe = 
        {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        };

        console.log(recipe);
        // const data = await sendJSON(`https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=${KEY}`, recipe);
        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
        // console.log(data);
        state.recipe = createRecipeObject(data);
    
    }
    catch(err) {throw err}
}
