//App.js

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
    {
        id: '0',
        message: 'Hey there! Welcome to FinBot!',
        trigger: '1',
    }, 
    {
        id: '1',
        message: 'What’s your name?',
        trigger: '2'
    }, 
    {
        id: '2',
        user: true,
        trigger: '3',
    }, 
    {
        id: '3',
        message: "Nice to meet you, {previousValue}! How can I help you today?",
        trigger: '4',
    }, 
    {
        id: '4',
        options: [
            { value: 1, label: 'Get Financial Tips 💰' ,trigger : '5'}, 
            { value: 2, label: 'Read Articles 🤓',trigger : '5' },
            { value: 3, label: 'Scan Links 🔒',trigger : '5' }, // New option
        ],
    },
    {
        id: '5',
        message: 'Good choice! Let me load that for you...',
        end: true,
    }
];

// Creating a blue theme
const theme = {
    background: '#E0F7FA',
    headerBgColor: '#0288D1',
    headerFontSize: '20px',
    botBubbleColor: '#0277BD',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#01579B',
    userFontColor: 'white',
};

// Set some properties of the bot
const config = {
    botAvatar: "../public/cbotfinal.jpg",
    floating: true,
};

function Chatbot() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="Bean"
                    steps={steps}
                    {...config} // Spread operator here passes all config props
                />
            </ThemeProvider>
        </div>
    );
}

export default Chatbot;