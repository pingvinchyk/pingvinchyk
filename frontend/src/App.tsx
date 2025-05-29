import { useEffect, useState } from 'react'
import './App.css'
import { HelloService } from './api'
import type { models_HelloResponse } from './api/models/models_HelloResponse'

function App() {
  const [message, setMessage] = useState<string>("Loading...");


  useEffect(() => {
    HelloService.getHello()
      .then((res: models_HelloResponse) => setMessage(res.message || "No message received"))
      .catch((err: any) => console.error(err));
  }, []);

  return (
    <>
      {message && <h1>{message}</h1>}
    </>
  )
}

export default App
