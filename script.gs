const inch = 72;
const blockDimensions = inch / 2;
const itemDimensions = blockDimensions / 2;
const destroy2URL = 'https://i.imgur.com/DD83v43.png';
const destroy5URL = 'https://i.imgur.com/X7YMadV.png';

// Create the menu in google slides
function onOpen() {
  let ui = SlidesApp.getUi();

  ui.createMenu('Minecraft')
    .addItem('Itemize', 'itemize')
    .addItem('Blockerize', 'blockerize')
    .addItem('GriderizeItem', 'griderizeItem')
    .addItem('GriderizeBlock', 'griderizeBlock')
    .addItem('Damage2', 'damage2')
    .addItem('Damage5', 'damage5')
    .addItem('KillBlock2', 'killBlock2')
    .addToUi();
}

// Set dimensions (width & height) of selected elements to that of an item
function itemize() {
  let presentation = SlidesApp.getActivePresentation();
  let selectedElements = presentation.getSelection().getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++)
    selectedElements[i].asImage().setWidth(itemDimensions).setHeight(itemDimensions);
}

// Set dimensions (width & height) of selected elements to that of a block
function blockerize() {
  let presentation = SlidesApp.getActivePresentation();
  let selectedElements = presentation.getSelection().getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++)
    selectedElements[i].asImage().setWidth(blockDimensions).setHeight(blockDimensions);
}

// Align selected items to the item grid
function griderizeItem() {
  let presentation = SlidesApp.getActivePresentation();
  let selection = presentation.getSelection();
  let selectedElements = presentation.getSelection().getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++) {
    let left = selectedElements[i].getLeft();
    let top = selectedElements[i].getTop();
    left = Math.round(left / itemDimensions) * itemDimensions;
    top = Math.round(top / itemDimensions) * itemDimensions;
    selectedElements[i].setLeft(left);
    selectedElements[i].setTop(top);
  }
}

// Align selected blocks to the block grid
function griderizeBlock() {
  let presentation = SlidesApp.getActivePresentation();
  let selection = presentation.getSelection();
  let selectedElements = selection.getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++) {
    let left = selectedElements[i].getLeft();
    let top = selectedElements[i].getTop();
    left = Math.round(left / blockDimensions) * blockDimensions;
    top = Math.round(top / blockDimensions) * blockDimensions;
    selectedElements[i].setLeft(left);
    selectedElements[i].setTop(top);
  }
}
  
// Add damage2 decal to currently selected blocks
function damage2() {
  let presentation = SlidesApp.getActivePresentation();
  let selection = presentation.getSelection();
  let selectedElements = selection.getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++) {
    let damageImage = selection.getCurrentPage().asSlide().insertImage(destroy2URL);
    let transform = selectedElements[i].getTransform();
    damageImage.setTransform(transform);
  }
}

// Add damage5 decal to currently selected blocks
function damage5() {
  let presentation = SlidesApp.getActivePresentation();
  let selection = presentation.getSelection();
  let selectedElements = selection.getPageElementRange().getPageElements();

  for (let i = 0; i < selectedElements.length; i++) {
    let damageImage = selection.getCurrentPage().asSlide().insertImage(destroy5URL);
    let transform = selectedElements[i].getTransform();
    damageImage.setTransform(transform);
  }
}

// Break selected block over multiple slides, applying damage2, then damage5, then deleting the block
function killBlock2() {
  let presentation = SlidesApp.getActivePresentation();
  let selection = presentation.getSelection();
  let currentSlide = selection.getCurrentPage().asSlide();
  let selectedElements = selection.getPageElementRange().getPageElements();

  let slides = presentation.getSlides();
  let slideIndex = 0;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (slides[i].getObjectId() === currentSlide.getObjectId()) {
      slideIndex = i;
      break;
    }
  }
  
  let duplicatedSlide2 = currentSlide.duplicate();
  for (let i = 0; i < selectedElements.length; i++) {
    let damageImage = duplicatedSlide2.insertImage(destroy5URL);
    let transform = selectedElements[i].getTransform();
    damageImage.setTransform(transform);
  }

  let duplicatedSlide1 = currentSlide.duplicate();
  for (let i = 0; i < selectedElements.length; i++) {
    let damageImage = duplicatedSlide1.insertImage(destroy2URL);
    let transform = selectedElements[i].getTransform();
    damageImage.setTransform(transform);
  }

  currentSlide.duplicate();
  for (let i = 0; i < selectedElements.length; i++)
    selectedElements[i].remove();
  currentSlide.move(slideIndex + 4);
}
