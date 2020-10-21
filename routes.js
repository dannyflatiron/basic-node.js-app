const fs = require('fs')

const requestHandler = (request, response) => {
  const url = request.url
  const method = request.method

  if (url === '/') {
    response.write('<html>')
    response.write('<head><title>My First Node.js app</title><head>')
    response.write('<body><h1>Good stuff!</h1><form action="/create-user" method="POST"><input name="username" type="text"><button type="submit">Create a User</button></input></form></body>')
    response.write('</html>')
    return response.end()
  }

  if (url === '/users') {
    response.write('<html>')
    response.write('<head><title>Users</title><head>')
    response.write('<body><h1>List of Users</h1><ul><li>Danny</li><li>Mary</li><li>Nicky</li></ul></body>')
    response.write('</html>')
    return response.end()
  }

  if (url === '/create-user' && method === 'POST') {
    const body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    })
    return request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const user = parsedBody.split('=')[1]
      console.log(user)
      response.statusCode = 302
      response.setHeader('Location', '/')
      return response.end()
    })
  }
  response.setHeader('Content-Type', 'text/html')
  response.write('<html>')
  response.write('<head><title>My First Node.js App</title><head>')
  response.write('<body><h1>Hello from my first Node.js App!</h1></body>')
  response.write('</html>')
  response.end()
}

module.exports = {
  handler: requestHandler
}