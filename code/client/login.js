let form = document.querySelector('form#login');
let server = 'https://glob-server.now.sh/login';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form_data = new FormData(form);
    let user = {
        username: form_data.get("username"),
        pwd: form_data.get("pwd")
    }
    fetch(server, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        sessionStorage.setItem("username", json.username);
        location.reload();
    })
    .catch(e => {
        $('#login_message').html(`~ couldn't login`);
    })
})