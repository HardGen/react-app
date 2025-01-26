import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function ClockContainer() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(value)

  return (
    <div>
      <p>Current time:</p>
      <Clock value={value} className={'clock'}/>
    </div>
  );
}