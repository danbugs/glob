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
<a href="./index.html"><img width="32" height="32"/></a>
<form method="GET" action="http://www.randyconnolly.com/tests/process.php">
    <fieldset>
        <input type="text" name="search"/>
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