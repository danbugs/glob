let form = document.querySelector('form#make_post');
let server = 'https://glob-server.now.sh/make_post';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form_data = new FormData(form);
    let post = {
        username: sessionStorage.getItem('username'),
        title: form_data.get("title"),
        pcontent: form_data.get("content")
    }
    fetch(server, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
        location.reload();
    });
})