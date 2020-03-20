let server = 'https://glob-server.now.sh';
if(sessionStorage.getItem("username") === 'admin'){
    console.log(sessionStorage.getItem("username"));
    fetch(server + '/admin/get_users', {
        method: 'GET',
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response => response.json())
    .then(result => {
        $(document).ready(() => {
            for(let i = 0; i < result.length; i++){
                let user = $(`
                <tr>
                    <td>${result[i].username}</td>
                    <td>
                        <button id='${result[i].username}' class="btn btn-danger" onClick='deleteUser(this)'>Delete</button>
                    </td>
                </tr>
                `)
                $('#users').append(user);
            }
        })
    })
    .catch((e) => console.log(e));
    
    fetch(server + '/admin/get_posts', {
        method: 'GET',
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
                    <td>${result[i].username}</td>
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
    
    function deleteUser(e){
        let to_delete = {
            username:  $(e).attr('id')
        };
        
        fetch(server + '/admin/delete_user', {
            method: 'POST',
            body : JSON.stringify(to_delete),
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        .then(_ => location.reload());
    }
    
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
    
    let form = document.querySelector('form#query');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let form_data = new FormData(form);
        let sql = {
            query: form_data.get("sql"),
        }
        fetch(server + '/admin/query', {
            method: 'POST',
            body: JSON.stringify(sql),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            $('#query_results').html(JSON.stringify(json));
        })
        .catch(e => $('#query_results').html('something went wrong'));
    })
}
else{
    $('#admin').html(`
    <div class="text-center">
        <h1>Nope! ッ</h1>
        <p>You don't have permission to see this page ~</p>
    </div>
    `);
}