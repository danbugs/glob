let server = 'https://glob-server.now.sh/index';
fetch(server, {
    method: 'GET',
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
})
.then(response => response.json())
.then(result => {
    let colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    $(document).ready(() => {
        for(let i = 0; i < result.length; i++){
            let post = $(`
            <div>
            <h2><a id=${result[i].postid} href="./post.html" onClick='view_post(this)'>${result[i].title}</a></h2>
            <h3 class="subtitle">by ${result[i].username}</h3>
            <p><i class="fas fa-heart"></i> ${result[i].likes} | <i class="fas fa-heart-broken"></i> ${result[i].dislikes}</p>
            </div>
            `)
            $('#trending_posts').append(post);
            $(post).css('color', colors[Math.floor(Math.random() * colors.length)])
        }
    })
    console.log(result);
})
.catch((e) => console.log(e));

function view_post(e){
    sessionStorage.removeItem("postid")
    sessionStorage.setItem("postid", $(e).attr('id'));
}