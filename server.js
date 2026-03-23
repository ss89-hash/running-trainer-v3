const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Qwen API Configuration
const QWEN_API_KEY = process.env.QWEN_API_KEY;
const QWEN_API_URL = process.env.QWEN_API_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
const QWEN_MODEL = process.env.QWEN_MODEL || 'qwen-plus';

// === ADD THIS DEBUG SECTION ===
console.log('\n=== 🔍 DEBUG INFO ===');
console.log('API Key loaded:', QWEN_API_KEY ? `Yes (${QWEN_API_KEY.length} chars)` : 'NO');
console.log('API Key value:', QWEN_API_KEY);
console.log('API URL:', QWEN_API_URL);
console.log('Model:', QWEN_MODEL);
console.log('===================\n');
// ===============================

// Generate training plan using Qwen API
app.post('/api/generate-plan', async (req, res) => {
    try {
        const { raceType, experienceLevel, weeksAvailable, runningDaysPerWeek, currentMileage, goal } = req.body;

        // Validate required fields
        if (!raceType || !experienceLevel || !weeksAvailable) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create prompt for Qwen
        const prompt = `You are an expert running coach. Create a detailed, customized running training plan with the following parameters:

- Race Type: ${raceType}
- Experience Level: ${experienceLevel}
- Weeks Available for Training: ${weeksAvailable}
- Running Days Per Week: ${runningDaysPerWeek || '4-5'}
- Current Weekly Mileage: ${currentMileage || 'Not specified'}
- Goal: ${goal || 'Finish the race'}

Please provide a comprehensive training plan that includes:
1. A brief overview and key principles
2. Weekly breakdown with specific workouts for each running day
3. Types of runs (easy runs, tempo runs, intervals, long runs, recovery runs)
4. Weekly mileage progression
5. Taper week before the race
6. Key tips for success
7. Injury prevention advice

Format the response in a clear, structured way with markdown-style headers and bullet points. Be specific about paces, distances, and workout descriptions.`;

        // Call Qwen API
        const response = await axios.post(
            QWEN_API_URL,
            {
                model: QWEN_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert running coach specializing in 5K, 10K, Half Marathon, and Marathon training. Create personalized, safe, and effective training plans.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            },
            {
                headers: {
                    'Authorization': `Bearer ${QWEN_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const trainingPlan = response.data.choices[0].message.content;

        res.json({ success: true, plan: trainingPlan });

    } catch (error) {
        console.error('Error generating training plan:', error.message);
        
        if (error.response) {
            console.error('API Response:', error.response.data);
            res.status(error.response.status).json({ 
                error: 'Failed to generate training plan', 
                details: error.response.data 
            });
        } else {
            res.status(500).json({ 
                error: 'Failed to generate training plan', 
                details: error.message 
            });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Running Trainer API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏃 Running Trainer server running on http://localhost:${PORT}`);
    console.log(`📡 Using Qwen Model: ${QWEN_MODEL}`);
});
