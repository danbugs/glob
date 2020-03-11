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
    <a href="./login.html">Login</a>
</div>
</nav>`;

document.write(navbar);