// routes.js

const express = require('express');
const router = express.Router();
const request = require('request');
// const fetch = require('node-fetch');
const config = require('./configuration');
//默认路由显示表单页面
router.get('/', (req, res) => {
    res.render('search-form');
});


// 封装 request 函数为 Promise
const makeRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve({ response, body });
            }
        });
    });
};

router.post('/api/sendData1', async (req, res) => {

    const requestData = req.body;

    const options = {
        method: 'GET',
        url: `${config.apiUrl}${requestData}`,
        headers: {
            'X-RapidAPI-Key': config.apiKey,
            'X-RapidAPI-Host': config.apiHost
        }
    };

    try {
        // 发送 HTTP 请求并等待 Promise 解析
        const { response, body } = await makeRequest(options);

        // 使用 res.render 将数据传递给模板
        res.render('result', { apiResult: JSON.parse(body).data });

    } catch (error) {
        console.error('Error sending data to the API:', error.message);
        res.status(500).json({ error: 'Failed to send data to the API' });
    }
});


router.post('/api/sendData2', async (req, res) => {

    const requestData = req.body.city;

    const url = `${config.apiUrl}${requestData}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.apiKey,
            'X-RapidAPI-Host': config.apiHost
        }
    };
    try {
        // 使用 fetch 发送异步 POST 请求
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // 解析 JSON 数据
        const responseBody = await response.json();

        // 使用 res.render 将数据传递给模板
        res.render('result', { apiResult: responseBody.data });
    } catch (error) {
        console.error('Error sending data to the API:', error.message);
        res.status(500).json({ error: 'Failed to send data to the API' });
    }
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

            // 使用 res.render 将数据传递给模板
            res.render('result', { apiResult: JSON.parse(body).data });
        }
    );
});




module.exports = router;