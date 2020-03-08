console.log("Hello, Client!");
let form = document.querySelector('form#create_user');
let server = 'http://127.0.0.1:8000/create_user';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form_data = new FormData(form);
    let new_user = {
        username: form_data.get("username"),
        email: form_data.get("email"),
        pwd: form_data.get("pwd")
    }
    fetch(server, {
        method: 'POST',
        body: JSON.stringify(new_user),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log("NOTE/ Created user!");
})
