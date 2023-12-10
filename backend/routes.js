// routes.js

const express = require('express');
const router = express.Router();
const request = require('request');
// const fetch = require('node-fetch');
const config = require('./configuration');
//默认路由显示hello world
router.get('/', (req, res) => {
    res.render('search-form');
});


router.post('/api/sendData3', (req, res) => {

    const requestData = req.body.city;

    const options = {
        method: 'GET',
        url: `${config.apiUrl}${requestData}`,
        headers: {
            'X-RapidAPI-Key': config.apiKey,
            'X-RapidAPI-Host': config.apiHost
        }
    };

    // 使用 request 发送异步 POST 请求
    request(
        options,
        (error, response, body) => {
            if (error) {
                console.error('Error sending data to the API:', error.message);
                return res.status(500).json({ error: 'Failed to send data to the API' });
            }

            if (response.statusCode !== 200) {
                return res.status(response.statusCode).json({ error: `HTTP error! Status: ${response.statusCode}` });
            }

            // 在这里可以对 body 进行进一步处理
            const data = JSON.parse(body);

            // 返回数据给客户端
            res.json(data);

        }
    );
});




module.exports = router;