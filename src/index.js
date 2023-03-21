import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

//  getting a refence to id root
const el = document.getElementById('root');
// making React take control of the element
const root = createRoot(el);
// showing the component on the screen
root.render(<App />);
