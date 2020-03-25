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

setInterval(() => fetch(server + '/fetch_comments', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(response => response.json())
.then(result => {
    $('#fetch_comments').html('');
    for(let i = 0; i < result.length; i++){
        $('#fetch_comments').append(
            `
            <div class="comment">
                <p><b>${result[i].username}</b> said:</p>
                <p>${result[i].content}</p>
            </div>
            `
        )
    }
}), 2000);

if(sessionStorage.getItem('username')){
    $('#render_comment').html(
        `
        <form id="comment" class="form-group">
            <textarea class="form-control" name="comment" placeholder="Enter comment..."></textarea>
            <br>
            <button type="Submit" class="btn btn-success">Comment</button>
        </form>
        `
    )
    let form = document.querySelector('form#comment');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let form_data = new FormData(form);
        let comment = {
            content: form_data.get('comment'),
            postID: pid,
            username: sessionStorage.getItem('username')
        }
        fetch(server + '/comment', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(_ => location.reload());
    })
}
