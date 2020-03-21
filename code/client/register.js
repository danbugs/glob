let form = document.querySelector('form#register');
let server = 'https://glob-server.now.sh/register';
if(!sessionStorage.getItem("username")){
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
        .then(result => {
            let form_data = new FormData(form);
            sessionStorage.setItem("username", form_data.get("username"));
            location.reload();
        })
        .catch(e => {
            $('#register_message').html(`~ couldn't register`);
        })
    })
}else{
    $('main#register').html(
        `
        <div class="text-center">
            <h1>You are logged in! ッ</h1>
        </div>
        `
    )
}