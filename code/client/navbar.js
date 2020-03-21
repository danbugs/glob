let login;
if(sessionStorage.getItem("username") === 'admin'){
    login = `<a href="./admin.html">${sessionStorage.getItem("username")}</a>
    <button class="btn btn-danger" onClick='logout()'><i class="fas fa-sign-out-alt"></i></button>`
}else if(sessionStorage.getItem("username")){
    login = `<a href="./my_blog.html">${sessionStorage.getItem("username")}</a>
    <button class="btn btn-danger" onClick='logout()'><i class="fas fa-sign-out-alt"></i></button>`
}else{
    login = `<a href="./login.html">Login</a>`;
}

let navbar = 
`<nav>
<a href="./index.html"><img width="32" height="32" src="icon.ico"/></a>
<form id="search">
    <fieldset>
        <input type="text" name="search" placeholder="Search users..."/>
        <button type="submit" class="btn btn-info"><i class="fas fa-search"></i></button>
    </fieldset>
</form>
<div class="right">
    ${login}
</div>
</nav>`;

document.write(navbar);

function logout(){
    sessionStorage.removeItem("username");
    location.reload();
}

let nav_form = document.querySelector('form#search');

nav_form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form_data = new FormData(nav_form);
    let search = {
        search: form_data.get("search"),
    }
    fetch('https://glob-server.now.sh/search', {
        method: 'POST',
        body: JSON.stringify(search),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        if(result.length > 0){
            $('main').html(
                `
                <div class="container">
                <table class="table" id="search_result">
                    <legend>Results</legend>
                    <tr>
                        <th>globber</th>
                    </tr>
                </table>
                </div>
                `
            );
            for(let i = 0; i < result.length; i++){
                if(result[i].username !== 'admin'){
                    $('table#search_result').append(
                        `
                            <tr><td><a href="./blog.html?username=${result[i].username}"'>${result[i].username}</a></td>/tr>
                        `
                    );
                }
            }
        }
        else{
            $('main').html(`
            <div class="text-center">
                <h1>Nope! ッ</h1>
                <p>Nothing matched your search ~</p>
            </div>
            `);
        }
    })
})