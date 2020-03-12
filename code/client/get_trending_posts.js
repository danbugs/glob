let server = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://glob-server.now.sh/get_trending_posts';
fetch(server, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => response.json())
.then(result => console.log(result));
