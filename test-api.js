require('dotenv').config();
const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing API with key:', process.env.QWEN_API_KEY?.substring(0, 10) + '...');
        
        const response = await axios.post(
            'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
            {
                model: 'qwen-plus',
                messages: [{ role: 'user', content: 'Hello' }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.QWEN_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('✅ SUCCESS! API works:', response.data);
    } catch (error) {
        console.log('❌ FAILED!');
        console.log('Error:', error.response?.data || error.message);
    }
}

testAPI();