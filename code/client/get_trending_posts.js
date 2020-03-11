let server = 'https://404-server.now.sh/get_trending_posts';
fetch(server, {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
})
.then(response => console.log(response));
