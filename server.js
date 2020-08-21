var http = require("http")
var fs = require("fs")
var url = require("url")
var port = process.argv[2]

if (!port) {
  console.log("请指定端口号好不啦？\nnode server.js 8888 这样不会吗？")
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ""
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

///////////////////////

  console.log("发请求过来啦！路径（带查询参数）为：" + pathWithQuery)


  response.statusCode = 200


  //根据请求的路径，自动拼成本地的文件路径
  //默认首页
  const filePath = (path=== '/' ? '/index.html ' : path)

  //获取文件格式
  const index =filePath.indexOf('.')
  // suffix（后缀）
  const suffix = filePath.substring(index)
  console.log(suffix)
  // 哈希
  const fileTypes = {
    '.html':'text/html',
    '.js':'text/javascript',
    '.css':'text/css',
    '.json':'text/json'

  }
  response.setHeader("Content-Type",
    `${fileTypes[suffix]} || 'text/html';charset=utf-8`)


  let content
  //错误处理
try{
    content = fs.readFileSync(`./public${filePath}`)

}catch (error){
    content = '文件不存在!'
  response.statusCode = 404
}


  response.write(content)
  response.end()
})


//////////////////


server.listen(port)
console.log("监听 " + port + " 成功\n请打开 http://localhost:" + port)
