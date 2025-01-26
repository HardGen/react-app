import { useState } from "react";
export default function Form() {
  const [isSent, setIsSent] = useState(false);
  const [message, sendMessage] = useState('Hi!');
  const [num, setNum] = useState(1);
  const [to, setTo] = useState('Alice');

  console.log('render');


  if (isSent) {
    return <h1>Your message is on its Way</h1>
  }
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsSent(true);
        sendMessage(message);
      }}>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => sendMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div>
        <button
          onClick={() => {
            setNum(num + 1)
            setNum(num + 1)
            setNum(num + 1)
          }}
        >+{num}</button>
      </div>
      <div>
        <button
          onClick={() => {
            setNum(num + 5)
            alert(num)
          }}
        >+{num}</button>
      </div>
      <div>
        <button
          onClick={() => {
            setNum(num + 5)
            setTimeout(() => {
              alert(num)
            }, 3000)
          }}
        >+{num}</button>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        setTimeout(() => {
          alert(`You said ${message} to ${to}`);
        }, 5000)
      }}>
        <select
          onChange={e => setTo(e.currentTarget.value)}
        >
          <option value="Alice">Alice</option>
          <option value="Tom">Tom</option>
        </select>
        <textarea
          placeholder="Message"
          value={message}
          onChange={e => sendMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
