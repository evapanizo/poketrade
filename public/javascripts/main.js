'use strict';

const main = function () {
  const pokemonName = document.querySelector('input[name="pokemon"]');
  const pokemonButton = document.querySelector('button');

  pokemonButton.addEventListener('click', () => {
    axios.get(`/api/trades/pokemon?q=${pokemonName.value}`)
      .then(({ data }) => {
        if (data.data) {
          // Elements
          const formElement = document.getElementById('checkbox-form');
          const checkboxElement = document.createElement('input');
          const labelElement = document.createElement('label');
          const messageElement = document.getElementById('error-message');
          const hiddenButton = document.getElementById('hidden-btn');
          const name = data.data.name;
          // Reset
          messageElement.innerText = '';
          hiddenButton.classList.remove('hidden');
          // Checkbox attributes
          checkboxElement.setAttribute('type', 'checkbox');
          checkboxElement.setAttribute('checked', true);
          checkboxElement.setAttribute('value', name);
          // Label attributes
          labelElement.innerText = name;
          // Append elements
          formElement.insertBefore(checkboxElement, hiddenButton);
          formElement.insertBefore(labelElement, hiddenButton);
        } else {
          // Elements
          const messageElement = document.getElementById('error-message');
          messageElement.innerText = 'The pokemon does not exist';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

window.addEventListener('load', main);
