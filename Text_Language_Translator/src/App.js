
import axios from 'axios';
import { useState } from 'react';
import './index.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'aad55de45bmshbbf4c364cb4e8a5p1d9c02jsn0bfe34ec578b',
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        data: {
          from: fromLang,
          to: toLang,
          text: inputText
        }
      });
      setTranslatedText(response.data.trans);
    } catch (error) {
      alert('Translation failed. Please check API key and internet.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Text Translator App</h1>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="3"
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
        <div className="flex justify-between mb-4">
          <select value={fromLang} onChange={(e) => setFromLang(e.target.value)} className="p-2 border rounded w-[48%]">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
          <select value={toLang} onChange={(e) => setToLang(e.target.value)} className="p-2 border rounded w-[48%]">
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <button onClick={handleTranslate} className="w-full bg-blue-700 text-white py-2 px-4 rounded">
          Translate
        </button>
        {translatedText && (
          <div className="mt-4 p-3 border rounded bg-gray-50">
            <strong>Translated:</strong>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
