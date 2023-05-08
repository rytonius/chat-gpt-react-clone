import express from "express"
import cors from 'cors'


const PORT = 9001
const app = express();
app.use(express.json())
app.use(cors())

// eslint-disable-next-line no-undef
const API_KEY = process.env.API_KEY_OPENAI;

app.post('/completions', async (req, res) => {
    if (API_KEY === '') {
        console.log("API KEY IS BLANK ON SERVER.JS line 10")
    }
    else {
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: req.body.messages }],
                max_tokens: 50,
            })
    
        };
    
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', options);
            const modelData = await response.json();
            res.send(modelData);
        } catch (error) {
            console.error(error)
        }
    }

});

app.listen(PORT, () => console.log(`  Listening on http://127.0.0.1:${PORT}`));


