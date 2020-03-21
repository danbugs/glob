let form = document.querySelector('form#make_post');
let server = 'https://glob-server.now.sh/make_post';
if(sessionStorage.getItem("username")){
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
            location.reload();
        });
    })
}else{
    $('#make_post').html(`
    <div class="text-center">
        <h1>Nope! ッ</h1>
        <p>You have to login to make a post ~</p>
    </div>
    `);
}