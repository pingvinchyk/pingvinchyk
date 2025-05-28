import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const environment = import.meta.env.ENVIRONMENT;
  const endpoint =
  environment === "production"
    ? "https://domain.com:4431"
    : "http://localhost:8080";

  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch(endpoint + "/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {message && <h1>{message}</h1>}
    </>
  )
}

export default App
