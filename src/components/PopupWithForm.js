import React from 'react';

export default function PopupWithForm(props) {
    return(
      <section className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ''}`}>
        <div className="popup__container">
          <h3 className="popup__header">{props.title}</h3>
          <form action="#" name={props.name} className="form form_add" noValidate>
            {props.children}
            <button type="submit" name="submit" className="form__submit">{props.button}</button>
          </form>
          <button type="button" className="popup__close-button" onClick={props.onClose}></button>  
        </div>
      </section>        
    )
}