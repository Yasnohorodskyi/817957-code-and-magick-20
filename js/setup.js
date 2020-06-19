'use strict';
var WIZARD_FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var shuffle = function (character) {
  var temporaryIndex = 0;
  var temporaryCharacter = '';
  for (var i = character.length - 1; i > 0; i--) {
    temporaryIndex = Math.floor(Math.random() * (i + 1));
    temporaryCharacter = character[temporaryIndex];
    character[temporaryIndex] = character[i];
    character[i] = temporaryCharacter;
  }
  return character;
};

var gamerList = function (firstName, lastName, coatColor, eyesColor, quantity) {
  var firstNameShuffled = shuffle(firstName);
  var lastNameShuffled = shuffle(lastName);
  var colorCoatShuffled = shuffle(coatColor);
  var eyesColorShuffled = shuffle(eyesColor);

  var gamers = [];
  var firstLastNamePosition = 0;
  var firstLastNameCombination = '';

  for (var i = 0; i < quantity; i++) {
    firstLastNamePosition = Math.floor(10 * Math.random());
    if (firstLastNamePosition >= 5) {
      firstLastNameCombination = firstNameShuffled[i] + ' ' + lastNameShuffled[i];
    } else {
      firstLastNameCombination = lastNameShuffled[i] + ' ' + firstNameShuffled[i];
    }
    gamers[i] = {name: firstLastNameCombination, coatColor: colorCoatShuffled[i], eyesColor: eyesColorShuffled[i]};
  }
  return gamers;
};

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var usersList = document.querySelector('.setup-similar');
usersList.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = gamerList(WIZARD_FIRST_NAME, WIZARD_LAST_NAME, WIZARD_COAT_COLOR, WIZARD_EYES_COLOR, WIZARD_QUANTITY);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

