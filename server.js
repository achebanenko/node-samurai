const http = require('http')
const fs = require('fs')

const delay = (ms = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (request, response) => {
    switch(request.url) {
        case '/':
            try {
                const data = await readFile('pages/index.html')
                response.write(data)
            } catch(err) {
                response.write('500 error')
            }
            response.end()
            break
        case '/about':
            await delay(1000)
            response.write('about')
            response.end()
            break
        default:
            response.write('404')
            response.end()
    }
})

server.listen(3003)
