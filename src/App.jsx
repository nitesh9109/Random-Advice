import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(
    "Always double check you actually attached the file to the email."
  );

  const fetchAdvice = function () {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("running ");
        setAdvice(data.slip.advice);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  function getData() {
    fetchAdvice();
  }

  function copyAdvice(e) {
    navigator.clipboard.writeText(advice).then(() => {
      alert("Text has been copied to the clipboard!");
    });
  }

  return (
    <>
      <div>
        <h1 id="advice">{advice}</h1>
      </div>

      <div className="mt-20">
        <button onClick={getData} className="mr-4">
          Next
        </button>
        <button onClick={copyAdvice}>Copy</button>
      </div>
    </>
  );
}

export default App;
