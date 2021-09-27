import View from './View';
import icons from '../../img/icons.svg'; // parcel1

class AddRecipeView extends View
{
    _parentElement = document.querySelector(".upload");
    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor()
    {
        super();
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();
    }

    _toggleWindows()
    {
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }

    _addHandlerShowWindow()
    {
        this._btnOpen.addEventListener("click",() => this._toggleWindows());
    }
    
    _addHandlerCloseWindow()
    {
        this._btnClose.addEventListener("click",this._toggleWindows.bind(this)); // the same as above
        this._overlay.addEventListener("click",this._toggleWindows.bind(this));
    }

    addHandlerUpload(handler)
    {
        this._parentElement.addEventListener("submit", (e)=>
        {
            e.preventDefault();
            const dataArr = [...new FormData(this._parentElement)];
            const data = Object.fromEntries(dataArr); // convert the array to object
            handler(data);
        })
    }
    // will return array with all fields of the parent (form) will all the values

    _generateMarkup()
    {

    }
}

export default new AddRecipeView();