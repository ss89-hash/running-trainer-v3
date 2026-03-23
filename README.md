# 🏃 Running Training Plan Generator

An AI-powered web application that creates customized running training plans for 5K, 10K, Half Marathon, and Full Marathon races using the Qwen Model Studio API.

## Features

- 🎯 Support for 4 race distances (5K, 10K, Half Marathon, Full Marathon)
- 📊 Personalized plans based on experience level
- 📅 Flexible training durations (8-20 weeks)
- 🏃 Customizable running days per week
- 🎯 Goal-oriented training (finish, PR, time goals)
- 🖨️ Print and copy functionality for your plan
- 📱 Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- Qwen Model Studio API key from [Alibaba Cloud Model Studio](https://modelstudio.console.aliyun.com/)

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API:**
   
   Copy the `.env.example` file to `.env` and add your Qwen API key:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and replace `your_api_key_here` with your actual API key:
   ```
   QWEN_API_KEY=your_actual_api_key_here
   ```

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

3. **Fill out the form:**
   - Select your race type (5K, 10K, Half Marathon, or Full Marathon)
   - Choose your experience level
   - Select training duration
   - Optionally specify running days per week, current mileage, and goals

4. **Click "Generate Training Plan"** to receive your AI-powered customized training plan!

## Project Structure

```
running-trainer/
├── .env                 # Environment variables (API key)
├── .env.example         # Example environment file
├── server.js            # Express backend server
├── package.json         # Project dependencies
├── README.md            # This file
└── public/              # Frontend files
    ├── index.html       # Main HTML page
    ├── styles.css       # Custom styles
    └── app.js           # Frontend JavaScript
```

## API Configuration

The application uses the Qwen Model Studio API (DashScope) for generating training plans. You can configure the following in your `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `QWEN_API_KEY` | Your API key from Model Studio | Required |
| `QWEN_API_URL` | API endpoint URL | `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions` |
| `QWEN_MODEL` | Model to use | `qwen-plus` |
| `PORT` | Server port | `3000` |

## Available Models

- `qwen-turbo` - Fastest, cost-effective
- `qwen-plus` - Balanced performance (default)
- `qwen-max` - Most capable

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript
- **Styling:** Bootstrap 5
- **AI:** Qwen Model Studio API
- **Markdown Rendering:** marked.js

## License

ISC

## Support

For API-related issues, please refer to the [Qwen Model Studio documentation](https://help.aliyun.com/zh/model-studio/).
