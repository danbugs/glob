let form = document.querySelector('form#register');
let server = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://glob-server.now.sh/register';
console.log(`Hello, ${server}`);

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