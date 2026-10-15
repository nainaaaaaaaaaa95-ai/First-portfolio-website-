const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    let filePath;

    // Serve static files (images, pdf, etc.)
    const extname = path.extname(req.url);
    if (extname) {
        filePath = path.join(__dirname, decodeURIComponent(req.url));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 Not Found");
            } else {
                // Set correct content type for images, pdf, etc.
                let contentType = "application/octet-stream";
                if (extname === ".jpg" || extname === ".jpeg") contentType = "image/jpeg";
                else if (extname === ".png") contentType = "image/png";
                else if (extname === ".gif") contentType = "image/gif";
                else if (extname === ".pdf") contentType = "application/pdf";
                else if (extname === ".css") contentType = "text/css";
                else if (extname === ".js") contentType = "application/javascript";
                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
            }
        });
        return;
    }

    if (req.url === "/" || req.url === "/home") {
        filePath = path.join(__dirname, "HomePage.html");
    } else if (req.url === "/portfolio") {
        filePath = path.join(__dirname, "Portofolio.html");
    }else if (req.url === "/services") {
        filePath = path.join(__dirname, "ServicePage.html");
    }else if (req.url === "/contact-us") {
        filePath = path.join(__dirname, "ContactPage.html");
    }

    if (filePath) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error"+err.toString());
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(8000, () => {
    console.log("Server listening on port 8000");
});
