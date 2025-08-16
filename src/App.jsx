import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [advice, setAdvice] = useState(
    "Always double check you actually attached the file to the email."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = function () {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    setError(null);
    
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch advice');
        }
        return res.json();
      })
      .then((data) => {
        console.log("running ");
        setAdvice(data.slip.advice);
      })
      .catch((error) => {
        console.error('Error fetching advice:', error);
        setError('Failed to fetch new advice. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function getData() {
    fetchAdvice();
  }

  function copyAdvice() {
    navigator.clipboard.writeText(advice).then(() => {
      alert("Text has been copied to the clipboard!");
    }).catch(() => {
      alert("Failed to copy text to clipboard.");
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h1 className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'
          }`}>
            {error ? error : advice}
          </h1>
          {isLoading && (
            <div className="mt-6">
              <div className="inline-flex items-center text-blue-600 dark:text-blue-400">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading new advice...
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={getData} 
            disabled={isLoading}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0'
            }`}
          >
            {isLoading ? 'Loading...' : '🎲 Next Advice'}
          </button>
          <button 
            onClick={copyAdvice}
            disabled={isLoading}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0'
            }`}
          >
            📋 Copy Advice
          </button>
        </div>
        
        <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Get inspired with random pieces of wisdom
        </p>
      </div>
    </div>
  );
}

export default App;
