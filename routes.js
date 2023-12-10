// routes.js

const express = require('express');
const router = express.Router();
const request = require('request');
// const fetch = require('node-fetch');
const config = require('./configuration');
const redis = require('redis');


// 创建 Redis 客户端
const redisClient = redis.createClient();

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
    const cacheKey = `weather1:${requestData}`;
    // 尝试从 Redis 中获取缓存
    redisClient.get(cacheKey, async (err, cachedData) => {
        if (err) {
            console.error('Error fetching cache from Redis:', err);
            return res.status(500).json({ error: 'Failed to fetch data from cache' });
        }

        if (cachedData) {
            console.log('Data found in cache. Returning cached data.');
            return res.json(JSON.parse(cachedData));
        }

        // 如果缓存中没有数据，调用第三方 API 获取数据
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

            // 在这里可以对 response 和 body 进行进一步处理

            // 在这里可以对 body 进行进一步处理
            const data = JSON.parse(body);

            // 存储数据到 Redis 缓存，并设置过期时间为15秒
            redisClient.setex(cacheKey, 15, JSON.stringify(data));

            // 返回数据给客户端
            res.json(data);



        } catch (error) {
            console.error('Error sending data to the API:', error.message);
            res.status(500).json({ error: 'Failed to send data to the API' });
        }
    });

});


router.post('/api/sendData2', async (req, res) => {

    const requestData = req.body.city;
    const cacheKey = `weather2:${requestData}`;
    redisClient.get(cacheKey, async (err, cachedData) => {
        if (err) {
            console.error('Error fetching cache from Redis:', err);
            return res.status(500).json({ error: 'Failed to fetch data from cache' });
        }

        if (cachedData) {
            console.log('Data found in cache. Returning cached data.');
            return res.json(JSON.parse(cachedData));
        }

        // 如果缓存中没有数据，调用第三方 API 获取数据
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
            const body = await response.json();

            // 在这里可以对 responseBody 进行进一步处理

            // 在这里可以对 body 进行进一步处理
            const data = JSON.parse(body);

            // 存储数据到 Redis 缓存，并设置过期时间为15秒
            redisClient.setex(cacheKey, 15, JSON.stringify(data));

            // 返回数据给客户端
            res.json(data);

        } catch (error) {
            console.error('Error sending data to the API:', error.message);
            res.status(500).json({ error: 'Failed to send data to the API' });
        }
    });


});



router.post('/api/sendData3', (req, res) => {

    const requestData = req.body.city;
    const cacheKey = `weather3:${requestData}`;
    // 尝试从 Redis 中获取缓存
    redisClient.get(cacheKey, (err, cachedData) => {
        if (err) {
            console.error('Error fetching cache from Redis:', err);
            return res.status(500).json({ error: 'Failed to fetch data from cache' });
        }

        if (cachedData) {
            console.log('Data found in cache. Returning cached data.');
            const responseData = { ...cachedDataObj, source: 'cache' };
            return res.json(responseData);
        }

        // 如果缓存中没有数据，调用第三方 API 获取数据
        const options = {
            method: 'GET',
            url: `${config.apiUrl}${requestData}`,
            headers: {
                'X-RapidAPI-Key': config.apiKey,
                'X-RapidAPI-Host': config.apiHost
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error('Error sending data to the API:', error.message);
                return res.status(500).json({ error: 'Failed to send data to the API' });
            }

            if (response.statusCode !== 200) {
                return res.status(response.statusCode).json({ error: `HTTP error! Status: ${response.statusCode}` });
            }

            // 在这里可以对 body 进行进一步处理
            const data = JSON.parse(body);

            // 存储数据到 Redis 缓存，并设置过期时间为15秒
            redisClient.setex(cacheKey, 15, JSON.stringify(data));

            // 在数据中添加一个字段，指示数据的来源为第三方 API
            const responseData = { ...data, source: 'api' };

            // 返回数据给客户端
            res.json(responseData);
        });
    });

});








module.exports = router;