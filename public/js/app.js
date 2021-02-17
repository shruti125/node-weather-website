const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    fetch('/weather?address='+ search.value).then((response) =>{
        response.json().then((data) => {
            if(data.err){
                messageOne.textContent = data.err;

            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;

            }
        })
    })
})