if(sessionStorage.getItem('username')){
    let server = 'https://glob-server.now.sh';
    let user = {
        username: sessionStorage.getItem('username'),
    }
    fetch(server + '/my_blog', {
        method: 'POST',
        body: JSON.stringify(user),
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json())
    .then(result => {
        $(document).ready(() => {
            for(let i = 0; i < result.length; i++){
                let post = $(`
                <tr>
                    <td>${result[i].title}</td>
                    <td>${result[i].views}</td>
                    <td>
                        <button id='${result[i].postid}' class="btn btn-danger" onClick='deletePost(this)'>Delete</button>
                    </td>
                </tr>
                `)
                $('#posts').append(post);
            }
        })
    })
    .catch((e) => console.log(e));
    
    function deletePost(e){
        let to_delete = {
            postid:  $(e).attr('id')
        };
        
        fetch(server + '/delete_post', {
            method: 'POST',
            body : JSON.stringify(to_delete),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(_ => location.reload());
    }
    
        
}
else{
    $('#my_blog').html(`
    <div class="text-center">
        <h1>Nope! ッ</h1>
        <p>You don't have permission to see this page ~</p>
    </div>
    `);
}