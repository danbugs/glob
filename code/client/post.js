let url_search_params = new URLSearchParams(window.location.search);
let pid = url_search_params.get('postid');
let server = 'https://glob-server.now.sh/post';
let post = {
    postid: pid,
}
fetch(server, {
    method: 'POST',
    body: JSON.stringify(post),
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(result => {
        $('#pcontent').append(result.pcontent);
        $('#title').append(result.title);
        $('#username').append(result.username);
        $('#views').append(result.views);
})
.catch((e) => {
    $('#post').html(`
        <div class="text-center">
            <h1>Nope! ッ</h1>
            <p>There's nothing to see here ~</p>
        </div>
        `);
});

fetch(server + '/views', {
    method: 'POST',
    body: JSON.stringify(post),
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(result => console.log(result))
.catch((e) => console.log(e))