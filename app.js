/**
 * Alvin Naufal
 */
const http = require("http");
const fs = require("fs");
require("dotenv").config(); // load .env file

const hostname = process.env.HOST;
const port = process.env.PORT;

let data = [
    {
        tugas: "tugas MTK 1",
        siswa: "Siswa 1",
    },
    {
        tugas: "tugas MTK 2",
        siswa: "Siswa 2",
    },
    {
        tugas: "tugas MTK 3",
        siswa: "Siswa 3",
    },
];


/** Home */
const getHome = (req, res, reqUrl) => {
    fs.createReadStream("./views/index.html").pipe(res);
    return;
}

const getTugas = (req, res, reqUrl) => {
    res.writeHead(200);
    res.write(JSON.stringify({
        message: "GET request to /tugas",
        data: data
    }));
    res.end();
}

const postTugas = (req, res, reqUrl) => {
    req.setEncoding("utf8");
    
    req.on("data", (chunk) => {
        const params = new URLSearchParams(chunk);
        const newData = {
            tugas: params.get("tugas"),
            siswa: params.get("siswa"),
        };

        data.unshift(newData);

        res.writeHead(200);
        res.write(JSON.stringify({
            message: "POST request to /tugas",
            data: newData,
        }));
        res.end();
    });
}

const noResponse = (req, res) => {
    res.writeHead(404);
    res.write("Error not found..\n");
    res.end();
}

http.createServer((req, res) => {
    const router = {
        "GET/": getHome,
        "GET/tugas": getTugas,
        "POST/tugas": postTugas,
        default: noResponse,
    };
    let reqUrl = new URL(req.url, `http://${hostname}`)
    console.log(reqUrl);

    let selectRoute =
        router[req.method + reqUrl.pathname] || router["default"]
    selectRoute(req, res, reqUrl);
}).listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
