import { useEffect, useState } from 'react';
import './App.css'
import 'react-calendar/dist/Calendar.css';
import { Link, Route } from "wouter";
import Form from './Snapshot/Form';
import ClockContainer from './Clock';

function createConnection(options) {
  const connection = new WebSocket('wss://echo.websocket.org');
  connection.onopen = function() {
    console.log("[open] Соединение установлено");
    // connection.send('some Date')
  };
  connection.onmessage = options.onMessage;
  connection.onclose = function() {
    console.log("Соединение разорвано");
  }

  return connection
}

function fetchPosts() { 
  let abortController = new AbortController();
  async function fetching(postId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId, {signal: abortController.signal});
    return await response.json();
  }

  return {
    fetching,
    abortController,
  }
}
function Post() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  useEffect(() => {
    const { abortController, fetching } = fetchPosts();
    fetching(postId).then(setPost);

    return () => {
      abortController.abort();
    }
  }, [postId])
  return (
    <div>
      <h1>POST</h1>
      {
        post && (
          <div>{post.title}</div>
        )
      }
      {
        [1, 2, 3, 4, 5, 6, 7, 8, 10].map(i => (<button key={i} onClick={() => setPostId(i)}>{i}</button>))
      }
    </div>
  )
}

function Chat() {
  const [data, setData] = useState('');
  useEffect(() => {
    const connection = createConnection({
      onMessage(event) {
        setData(event.data)
      },
    });
    return () => {
      connection.close();
    }
  }, [])

  useEffect(() => {
    console.log('state change');
  })
  return (
    <div>
      <h1>Welcome to the chat!</h1>
      <p>{data}</p>
    </div>
  )
}

function Counter() {
  const [couter, setCounter] = useState(1);
  const onclichHandler = () => setCounter(couter + 1)
  useEffect(() => {
    console.log('code here will run every render');
  }, [couter])
  return (
    <button onClick={onclichHandler}>increment {couter}</button>
  )
}

function Profile() {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>Profile</h1>
      <Counter />
      <ClockContainer />
      <input value={value} onInput={(e) => setValue(e.currentTarget.value)} />
    </div>
  )
}


function App() {
  return (
    <div>
      <div>
        <Link href="/users/1">
          <a className="link">Profile</a>
        </Link>
      </div>
      <div>
        <Link href="/chat">
          <a className="link">chat</a>
        </Link>
      </div>
      <div>
        <Link href="/post">
          <a className="link">post</a>
        </Link>
      </div>
      <div>
        <Link href="/snapshot">
          <a className="link">Snapshot</a>
        </Link>
      </div>

      <Route path="/about">About Us</Route>
      <Route path="/chat"><Chat /></Route>
      <Route path="/post"><Post /></Route>
      <Route path="/snapshot"><Form /></Route>
      <Route path="/users/:name">
        <Profile />
      </Route>
    </div>
  )
}


export default App
