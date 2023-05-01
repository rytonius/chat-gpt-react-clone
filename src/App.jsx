import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//const buttonElement = document.querySelector('button');

const App = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState(null);

    const getMessages = async () => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                messages: value
            }),
            headers: {
                'Content-Type': "application/json"
            }
        };
        try {
            const response = await fetch('http://127.0.0.1:9001/completions', options);
            const data =  await response.json();
            console.log(data);
            setMessage(data.choices[0].message)

        } catch (error) {
            console.log(error);
        }
    }
    //console.log(value);
    //console.log(message);
    
    return (
    <>
        <div className="app">
            <section className="side-bar">
                <button>＋ New Chat</button>
                <ul className="history">
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ul>

                <nav>
                    <h1>Handle with care</h1>
                </nav>
            </section>
            <section className="main">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

                <h1>RytoniusGTP</h1>
                <ul className="feed">

                </ul>
                <div className="bottom-section">
                    <div className="input-container">
                        <input value={value} onChange={(e) => setValue(e.target.value)}/>
                        <div id="submit" onClick={getMessages}>ॵ</div>

                    </div>
                    <p className="logo">All Your bases are belong to us</p>
                </div>
            </section>


        </div>

    </>
    )
}

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for (const mybuttons of document.querySelectorAll("button")) {
    mybuttons.onmousemove = e => handleOnMouseMove(e);
}


export default App
