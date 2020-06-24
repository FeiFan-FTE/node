let cheerio = require("cheerio")
let axios = require("axios")
let fs = require("fs")
let url = require("url")
let path = require("path")
// 爬虫
async function spider() {
    let allPageNum = 50
    for (let i = 1; i < allPageNum; i++) {
        await delayTime(4000*i)
        getListPage(i)
    }
}
spider()
async function getListPage(pageNum) {
    let httpURL = 'https://www.doutula.com/article/list/?page=' + pageNum
    let res = await axios.get(httpURL)
    let $ = cheerio.load(res.data)
    $("#home .col-sm-9>a").each((i, element) => {
        let title = $(element).find(".random_title").text()
        let reg = /(.*?)\d/igs
        title = reg.exec(title)[1]
        fs.mkdir("./img/" + title, function (err) {
            if (err) {
                // console.log()
            } else {
                console.log('目录创建完成:' + title)
            }
        })
        parsePage($(element).attr('href'), title)
    })
}

async function parsePage(url, title) {
    let res = await axios.get(url)
    let $ = cheerio.load(res.data)
    $(".pic-content img").each((i, ele) => {
        let imgUrl = $(ele).attr('src')
        let extname = path.extname(imgUrl)
        let imagesPath = `./img/${title}/${title}-${i}${extname}`
        let ws = fs.createWriteStream(imagesPath)
        axios.get(imgUrl, {
            responseType: 'stream'
        }).then((res) => {
            res.data.pipe(ws)
            console.log('图片获取完成:' + imagesPath)
            res.data.on('close', function () {
                ws.close()
            })
        })
        // ws.close()
    })
}

// 延迟
async function delayTime(minSecondes) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, minSecondes);
    })
}