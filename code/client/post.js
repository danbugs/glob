let server = 'https://glob-server.now.sh/post';
let post = {
    postid: sessionStorage.getItem("postid"),
}
console.log(sessionStorage.getItem('postid'));
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
    $('#likes').append(result.likes);
    $('#dislikes').append(result.dislikes);
})
.catch((e) => console.log(e));