let url_search_params = new URLSearchParams(window.location.search);
let uid = url_search_params.get('username');
let user = {
    username: uid,
}

let server = 'https://glob-server.now.sh/blog';
fetch(server, {
    method: 'POST',
    body: JSON.stringify(user),
    headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
})
.then(response => response.json())
.then(result => {
    if(result[0] != undefined){
        $(document).ready(() => {
            $('#username').html(`${result[0].username}'s blog`);
            for(let i = 0; i < result.length; i++){
                let post = $(`
                <tr>
                    <td><a href="./post.html?postid=${result[i].postid}"'>${result[i].title}</a></td>
                    <td>${result[i].views}</td>
                </tr>
                `)
                $('#posts').append(post);
            }
        })
    }else{
        $('#blog').html(`
        <div class="text-center">
            <h1>Nope! ッ</h1>
            <p>This user hasn't posted yet ~</p>
        </div>
        `);
    }
})
.catch((e) => console.log(e));