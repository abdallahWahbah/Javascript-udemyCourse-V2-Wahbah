import icons from '../../img/icons.svg'; // parcel1

export default class View 
{
    _data;
    

   /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */

    render(data)
    {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const markup = this._generateMarkup(this._data);
        // console.log(this._data);
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data)
    {
        // the idea is comparing the DOM that will be converted to the actual DOM in the page

        this._data = data;
        const newMarkup = this._generateMarkup(this._data);

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));
        // console.log(newElements);
        // console.log(curElements);

        newElements.forEach((newEl, i) => 
        {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));
      
            // Updates changed TEXT
            if (
              !newEl.isEqualNode(curEl) &&
              newEl.firstChild?.nodeValue.trim() !== ''
            ) {
              // console.log('💥', newEl.firstChild.nodeValue.trim());
              curEl.textContent = newEl.textContent;
            }
      
            // Updates changed ATTRIBUES
            if (!newEl.isEqualNode(curEl))
              Array.from(newEl.attributes).forEach(attr =>
                curEl.setAttribute(attr.name, attr.value)
              );
          });
    }
    // will convert the string to real DOM node object

    _clear()
    {
        this._parentElement.innerHTML = '';
    }
    renderSPinner()
    {
        const markup =
        `
            <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    renderError(message = this._errorMessage)
    {
        const markup = 
        `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    renderMessage(message = this._message)
    {
        const markup = 
        `
        <div class="message">
            <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
}