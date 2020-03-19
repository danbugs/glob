let form = document.querySelector('form#register');
let server = 'https://glob-server.now.sh/register';

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
    .then(_ => location.reload());
})