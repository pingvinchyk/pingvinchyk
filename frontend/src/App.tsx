import { useEffect, useState, type SetStateAction } from 'react'
import './App.css'
import { HelloService } from './api'
import type { models_HelloResponse } from './api/models/models_HelloResponse'

function App() {
  const environment = import.meta.env.ENVIRONMENT;
  const endpoint =
  environment === "production"
    ? "https://domain.com:4431/api"
    : "http://localhost:8080/api";

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
