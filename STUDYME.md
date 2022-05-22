# Back-end Путь Самурая

https://www.youtube.com/playlist?list=PLcvhF2Wqh7DP4tZ851CauQ8GqgqlCocjk


## 08 Express, Nodemon, TS

### Yarn

Install yarn via npm `$ npm install --global yarn` or via homebrew  
Check installation, version `$ yarn -v`  
Create project (file package.json) `$ yarn init`  


### Express

Install express `$ yarn add express`  
Check post method from browser console  `fetch('http://localhost:3000/samurais', { method: 'post' })`  

index.js
```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/samurais', (req, res) => {
    res.send('Hello Samurai!')
})
app.post('/samurais', (req, res) => {
    res.send('Created Samurai')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```


### Nodemon

https://www.npmjs.com/package/nodemon  

Install globally `$ npm install {--globally|-g} nodemon`  
then run `$ nodemon server.js`

Or install locally `$ npm i {--save-dev|-D} nodemon` or with yarn `$ yarn add {--dev|-D} nodemon`  
then run by yarn `$ yarn nodemon index.js`  
?or by npx `$ npx nodemon index.js`  

Run with Chrome Node.js DevTools  
`$ {node|nodemon} --inspect index.js`
if local package `$ {npx|yarn} nodemon --inspect index.js`  
Then press f10 to jump between lines in Sources tab  


### TypeScript

Install packages to devdependencies  
`$ yarn add --dev typescript ts-node @types/node @types/express`  

Create tsconfig.json file manually or by command  
`$ yarn tsc --init`  

tsconfig.json
```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */

    "module": "commonjs",                                /* Specify what module code is generated. */
    
    "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */

    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    "strict": true,                                      /* Enable all strict type-checking options. */

    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

src/index.ts  
```ts
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World')
})
app.get('/samurais', (req, res) => {
    res.send('Hello Samurai!')
})
app.post('/samurais', (req, res) => {
    res.send('Created Samurai')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
```

**Commands**  
Start ts-node monitoring `$ yarn nodemon src/index.ts`  
Or compile in watch mode `$ yarn tsc {--watch|-w}`  
and start nodemon inspecting js file `$ yarn nodemon --inspect dist/index.js` (? .\dist\index.js)  

**Scripts**  
Under package.json  
```json
{
  "scripts": {
    "watch": "tsc --watch",
    "dev": "nodemon --inspect dist/index.js"
  }
  ...
}
```

Then run by  
`$ yarn watch` and `$ yarn dev`  




## 07 Rest

browser console

```js
fetch('http://localhost:3003/api/users/322/books', { method: 'POST', body: JSON.stringify({ title: 'JS - Samurai Way', author: 'Dimych' }), headers: { 'Content-Type': 'application/json' } }).then(res => console.log(res))

// Promise {<pending>}
// Response {type: 'basic', url: 'http://localhost:3003/api/users/322/books', redirected: false, status: 200, ok: true, …}
```



## 06 Async and promisification

```js
...
const server = http.createServer((request, response) => {
    switch(request.url) {
        case '/':
            const start = new Date()
            while(new Date() - start < 100) {
                console.log(new Date() - start)
            }
            response.write('index')
            break
        default:
            response.write('404')
    }

    response.end()
})
...
```


```js
...
const server = http.createServer((request, response) => {
    switch(request.url) {
        case '/':
            setTimeout(() => {
                response.write('index')
                response.end()
            }, 100)
            break
        default:
            response.write('404')
            response.end()
    }

    // NodeError writeAfterEnd
    // response.end()
})
...
```

```js
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
            // const data = fs.readFileSync('pages/index.html')
            // fs.readFile('pages/index.html', (err, data) => {
            //     if (err) response.write('500 error')
            //     else response.write(data)
            //     response.end()
            // })
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
```



## 05 Simple server

server.js
```js
const http = require('http')

let requestCount = 0

const server = http.createServer((request, response) => {
    requestCount++
    response.write(`it-kamasutra ${requestCount}\n`)

    response.write(`${request.url}\n`)
    switch(request.url) {
        case '/':
            response.write('index')
            break
        case '/fe':
            response.write('frontend')
            break
        case '/be':
            response.write('backend')
            break
        default:
            response.write('404')
    }

    response.end()
})

server.listen(3003)
```
