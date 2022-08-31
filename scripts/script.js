hideElement = (element) => {
  element.classList.remove('visible');
  while (element.querySelector('.notification')) {
    element.removeChild(element.querySelector('.notification'))
  }
}

showElement = (element) => element.classList.add('visible');


showAlert = (parent, text, isSuccessful = true) => {
  let notification = document.createElement('div');
  let notificationState = isSuccessful ? 'success' : 'error'

  notification.classList.add('notification', notificationState);
  notification.innerHTML = text;

  parent.append(notification)
  setTimeout(() => parent.removeChild(notification), 3000)
}

submitHandler = async (evt) => {
  evt.preventDefault();

  let name = evt.target.name.value;
  let email = evt.target.email.value;

  let parent = document.querySelector('#modal')

  while (parent.querySelector('.notification')) {
    parent.removeChild(parent.querySelector('.notification'))
  }

  try {
    await fetch('https://jsonplaceholder.typicode.com/users', {method: "POST", body: JSON.stringify({name, email})})
    parent.querySelectorAll("input").forEach((item) => {item.value = ''})
    showAlert( parent, 'Мы получили вашу заявку!')
  }
  catch (e) {
    showAlert( parent, 'Упс, ваша заявка не дошла до нас. Попробуйте еще раз', false)
  }
}

document.querySelector('#modal-form').addEventListener('submit', submitHandler);

document.querySelector('#modal-open').addEventListener('click',
  () => showElement(document.querySelector('#modal'))
);

document.querySelector('#modal-overlay').addEventListener('click',
  () => hideElement(document.querySelector('#modal'))
);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    hideElement(document.querySelector('#modal'))
  }
})

