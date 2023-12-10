import http from "node:http"
import fs from "node:fs/promises"
import path from "node:path"

async function getFileContent(filePath) {
  try {
    const data = await fs.readFile(path.resolve(filePath), { encoding: "utf8" })
    return [, data]
  } catch (e) {
    return [e]
  }
}
async function respond(res, filePath) {
  if (filePath === "/") {
    const [error, content] = await getFileContent("./client/index.html");
    if (!error) {
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(content),
      }).end(content, "utf8");
    } else {
      res.writeHead(500, "WTF Happened", {'Content-Type': 'application/json'}).end(JSON.stringify({message: error.message}))
    }
  } else {
    // other files, point to assets
    const [error, content] = await getFileContent(`./client/assets${filePath}`)
    if(!error) {
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(content),
      }).end(content, "utf8");
    } else {
      res.writeHead(404, "Not Found")
    }
  }
}
const server = http.createServer((req, res) => {
  respond(res, req.url)
})

server.listen(5000, "127.0.0.1", () => {
  console.log("Started listening to port 5000")
})
