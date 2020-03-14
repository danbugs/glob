let server = 'https://glob-server.now.sh/get_trending_posts';
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
            <h2><a href="./make_post.html?postid="${result[i].postid}">${result[i].title}</a></h2>
            <h3 class="subtitle">by ${result[i].username}</h3>
            <p>Likes: ${result[i].likes} | Views: ${result[i].views}</p>
            </div>
            `)
            $('#trending_posts').append(post);
            $(post).css('color', colors[Math.floor(Math.random() * colors.length)])
        }
    })
    console.log(result);
})
.catch((e) => console.log(e));
