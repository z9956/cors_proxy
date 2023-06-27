const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(
    '/api',
    createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        }
    })
);

app.listen(1234);

// proxy and change the base path from "/api" to "/secret"
// http://127.0.0.1:3000/api/foo/bar -> http://www.example.org/secret/foo/bar