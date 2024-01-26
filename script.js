let stack = [];
let redoStack = [];

function addText() {
  const textInput = document.getElementById('textInput');
  const fontSelect = document.getElementById('fontSelect');
  const sizeSelect = document.getElementById('sizeSelect');
  const colorSelect = document.getElementById('colorSelect');
 
  const text = textInput.value;
  const font = fontSelect.value;
  const size = sizeSelect.value + 'px';
  const color = colorSelect.value;

  const textBox = document.createElement('div');
  textBox.className = 'text-box';
  textBox.innerHTML = text;
  textBox.style.fontFamily = font;
  textBox.style.fontSize = size;
  textBox.style.color = color;
  textBox.style.left = '50px';
  textBox.style.top = '50px';

  textBox.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    selectText(this);
  });

  document.getElementById('canvas').appendChild(textBox);

  stack.push({ action: 'add', element: textBox });
  redoStack = [];
}

function selectText(element) {
  const textboxes = document.querySelectorAll('.text-box');
  textboxes.forEach((textbox) => {
    textbox.classList.remove('selected');
  });

  if (element) {
    element.classList.add('selected');
  }
}

function changeFont() {
  const fontSelect = document.getElementById('fontSelect');
  const selectedText = document.querySelector('.text-box.selected');
 
  if (selectedText) {
    selectedText.style.fontFamily = fontSelect.value;
    stack.push({ action: 'update', element: selectedText });
    redoStack = [];
  }
}

function changeSize() {
  const sizeSelect = document.getElementById('sizeSelect');
  const selectedText = document.querySelector('.text-box.selected');
 
  if (selectedText) {
    selectedText.style.fontSize = sizeSelect.value + 'px';
    stack.push({ action: 'update', element: selectedText });
    redoStack = [];
  }
}

function changeColor() {
  const colorSelect = document.getElementById('colorSelect');
  const selectedText = document.querySelector('.text-box.selected');
 
  if (selectedText) {
    selectedText.style.color = colorSelect.value;
    stack.push({ action: 'update', element: selectedText });
    redoStack = [];
  }
}

function undo() {
  if (stack.length > 0) {
    const action = stack.pop();
    redoStack.push(action);

    if (action.action === 'add') {
      action.element.remove();
    } else if (action.action === 'update') {
      const { element } = action;
      element.style.fontFamily = element.style.fontSize = element.style.color = '';
    }
  }
}

function redo() {
  if (redoStack.length > 0) {
    const action = redoStack.pop();
    stack.push(action);

    if (action.action === 'add') {
      document.getElementById('canvas').appendChild(action.element);
    } else if (action.action === 'update') {
      const { element } = action;
      element.style.fontFamily = action.font;
      element.style.fontSize = action.size;
      element.style.color = action.color;
    }
  }
}