'use strict';

const main = function () {
  const pokemonName = document.querySelector('input[name="pokemon"]');
  const pokemonButton = document.querySelector('button');
  let firstEvent = true;
  let id = 0;

  pokemonButton.addEventListener('click', () => {
    axios.get(`/api/trades/pokemon?q=${pokemonName.value}`)
      .then(({ data }) => {
        if (data.data) {
          // Reset
          const messageElement = document.getElementById('error-message');
          messageElement.innerText = '';
          // Elements
          const formElement = document.getElementById('checkbox-form');
          const checkboxElement = document.createElement('input');
          const labelElement = document.createElement('label');
          const hiddenButton = document.getElementById('hidden-btn');
          let name = data.data.name;
          name = name.charAt(0).toUpperCase() + name.substr(1);
          const pokemonId = data.data._id;
          // Checkbox attributes
          checkboxElement.setAttribute('type', 'checkbox');
          checkboxElement.setAttribute('checked', true);
          checkboxElement.setAttribute('value', pokemonId);
          checkboxElement.setAttribute('name', id);
          id++;
          // Label attributes
          labelElement.innerText = name;
          // Append elements
          formElement.insertBefore(checkboxElement, hiddenButton);
          formElement.insertBefore(labelElement, hiddenButton);
          // First Event
          if (firstEvent) {
            hiddenButton.classList.remove('hidden');
            firstEvent = false;
          }
        } else {
          // Elements
          const messageElement = document.getElementById('error-message');
          messageElement.innerText = 'The pokemon does not exist';
        }
        pokemonName.value = '';
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

window.addEventListener('load', main);
