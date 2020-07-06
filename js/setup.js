'use strict';
var WIZARD_FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

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
var similarWizardFirstNameArray = WIZARD_FIRST_NAME.slice();
var similarWizardLastNameArray = WIZARD_LAST_NAME.slice();
var similarWizardCoatColorArray = WIZARD_COAT_COLOR.slice();
var similarWizardEyesColorArray = WIZARD_EYES_COLOR.slice();


var wizards = gamerList(similarWizardFirstNameArray, similarWizardLastNameArray, similarWizardCoatColorArray, similarWizardEyesColorArray, WIZARD_QUANTITY);

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

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopUpEscPress = function (evt) {
  var setupUserName = setup.querySelector('.setup-user-name');
  if (setupUserName !== document.activeElement) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopUpEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopUpEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});

var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var coatColorInput = setup.querySelector('input[name="coat-color"]');

var wizardCoatHandler = function () {
  var randomWizardCoatIndex = Math.floor(Math.random() * 10);
  if (randomWizardCoatIndex >= (WIZARD_COAT_COLOR.length)) {
    setupWizardCoat.style.fill = WIZARD_COAT_COLOR[9 - randomWizardCoatIndex];
  } else {
    setupWizardCoat.style.fill = WIZARD_COAT_COLOR[randomWizardCoatIndex];
  }
  coatColorInput.value = setupWizardCoat.style.fill;
};

setupWizardCoat.addEventListener('click', wizardCoatHandler);

var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var eyesColorInput = setup.querySelector('input[name="eyes-color"]');

var wizardEyesHandler = function () {
  var randomWizardEyesIndex = Math.floor(Math.random() * 10);
  if (randomWizardEyesIndex >= (WIZARD_EYES_COLOR.length)) {
    setupWizardEyes.style.fill = WIZARD_EYES_COLOR[9 - randomWizardEyesIndex];
  } else {
    setupWizardEyes.style.fill = WIZARD_EYES_COLOR[randomWizardEyesIndex];
  }
  eyesColorInput.value = setupWizardEyes.style.fill;
};

setupWizardEyes.addEventListener('click', wizardEyesHandler);

var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setup.querySelector('input[name="fireball-color"]');

var wizardFireballHandler = function () {
  var randomWizardFireballIndex = Math.floor(Math.random() * 10);
  if (randomWizardFireballIndex >= (WIZARD_FIREBALL_COLOR.length)) {
    setupWizardFireball.style.background = WIZARD_FIREBALL_COLOR[9 - randomWizardFireballIndex];
  } else {
    setupWizardFireball.style.background = WIZARD_FIREBALL_COLOR[randomWizardFireballIndex];
  }
  fireballInput.value = setupWizardFireball.style.background;
};

setupWizardFireball.addEventListener('click', wizardFireballHandler);


