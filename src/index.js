import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(<App />);
