import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
    const [value, setValue] = useState("");
    const [message, setMessage] = useState(null);
    const [previousChats, setPreviousChats] = useState([]);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentModel, setCurrentModel] = useState(null);

    const createNewChat = () => {
        setMessage(null);
        setCurrentTitle(null);
        setValue("");
        setCurrentModel(null);
    }

    const handleClick = (uniqueTitle) => {
        setCurrentTitle(uniqueTitle)
    }

    const getMessages = async () => {
        if (value !== "" && !!(value.trim())) {
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
                setCurrentModel(data.model);
                setMessage(data.choices[0].message)
    
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        //console.log(currentTitle, currentModel, value, message);
        if (!currentTitle && value && message) {
            setCurrentTitle(value);
        }
        if (currentTitle && value && message) {
            setPreviousChats(prevChats => (
                [...prevChats, {
                    title: currentTitle,
                    role: "user",
                    content: value
                }, {
                    title: currentTitle,
                    role: currentModel ? currentModel + " : " + message.role : message.role,
                    content: message.content,
                    //model: 
                }]
            ))
        }
    }, [message] )

    useEffect(() => {
        for (const mybuttons of document.querySelectorAll("button")) {
            mybuttons.onmousemove = e => handleOnMouseMove(e);
        }
    })    

    const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
    console.log(currentTitle);
    const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)));

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            getMessages();
        }
    }

    return (
    <>
    
        <div className="app">
            <section className="side-bar">
                <button onClick={createNewChat}>＋ New Chat</button>
                <ul className="history">
                    {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
                </ul>
                <nav>
                    <h1>Handle with care</h1>
                </nav>
            </section>
            <section className="main">
                <h1>RytoniusGTP</h1>
                <ul className="feed">
                    {currentChat?.map((chatMessage, index) => <li key={index}>
                        <p className="role">{chatMessage.role}</p>
                        <p>{chatMessage.content}</p>
                        
                        </li>)}
                </ul>
                <div className="bottom-section">
                    <div className="input-container">
                        <input  value={value} 
                                onChange={(e) => setValue(e.target.value)}
                                onKeyDown={handleEnter}/>
                        <div id="submit" onClick={getMessages}>ॵ</div>

                    </div>
                    <p className="logo">All Your bases are belong to us</p>
                </div>
            </section>
        </div>

    </>
    )
}

const handleOnMouseMove = async e => {

    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}






export default App

// Create a custom Button component and set the 'handleOnMouseMove ' function directly. Than use the Button wherever you want.

// Button.ts

// const handleOnMouseMove = e => {
//     const { currentTarget: target } = e;

//     const rect = target.getBoundingClientRect(),
//         x = e.clientX - rect.left,
//         y = e.clientY - rect.top;

//     target.style.setProperty("--mouse-x", `${x}px`);
//     target.style.setProperty("--mouse-y", `${y}px`);
// }

// const Button = (props) => {
//   return <button {...props} onMouseMove={handleOnMouseMove } />
// }


// You run your loop which goes over all buttons on page right away when page loads. At this point your React app isn't mounted, thus document.querySelectorAll("button") will return empty NodeList. But when you change file, Vite will hot-reload it, which will execute this loop again. And since at this moment app is mounted and there is button, it will work.

// But in general this approach isn't something you do in React. Better solution will be to remove for of loop at all and attach event handler to button in component, like you do with onClick:

// <button onMouseMove={handleOnMouseMove} onClick={() => setCount((count) => count + 1)}>
//     count is {count}
// </button>