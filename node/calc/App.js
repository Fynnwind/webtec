// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [arg1, setArg1] = useState('');
    const [arg2, setArg2] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('');

    const baseURL = 'http://<ipv4address>:8080';

    const handleOperation = async (op) => {
        try {
            const url = `${baseURL}/${op}?arg1=${encodeURIComponent(arg1)}&arg2=${encodeURIComponent(arg2)}`;
            const response = await axios.get(url);
            console.log(`http://:10.30.81.26:8080/${op}?arg1=${arg1}&arg2=${arg2}`);
            setResult(response.data);
            setOperation(op);
        } catch (error) {
            console.error("Error executing operation:", error);
        }
    };

    return (
        <div className="App">
        <h1>Calculator</h1>
        <input
        type="number"
        placeholder="Enter first number"
        value={arg1}
        onChange={(e) => setArg1(e.target.value)}
        />
        <input
        type="number"
        placeholder="Enter second number"
        value={arg2}
        onChange={(e) => setArg2(e.target.value)}
        />
        <button onClick={() => handleOperation('add')}>Add</button>
        <button onClick={() => handleOperation('sub')}>Subtract</button>
        <button onClick={() => handleOperation('mul')}>Multiply</button>
        <button onClick={() => handleOperation('div')}>Divide</button>

        {result && (
            <div>
            <h2>Result of {arg1} {operation} {arg2} is:</h2>
            <p>{result}</p>
            </div>
        )}
        </div>
    );
}

export default App;

