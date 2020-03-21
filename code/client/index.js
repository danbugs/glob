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
    result.sort((a, b) => (a.views < b.views) ? 1 : -1);
    let colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    $(document).ready(() => {
        for(let i = 0; i < result.length; i++){
            let post = $(`
            <div>
            <h2><a href="./post.html?postid=${result[i].postid}"'>${result[i].title}</a></h2>
            <h3><a href="./blog.html?username=${result[i].username}"'>by ${result[i].username}</a></h3>
            <h4><i class="fas fa-eye"></i> ${result[i].views}</h4>
            </div>
            `)
            $('#trending_posts').append(post);
            $(post).css('color', colors[Math.floor(Math.random() * colors.length)])
        }
    })
})
.catch((e) => console.log(e));