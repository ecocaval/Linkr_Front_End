import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import GlobalColors from './styles/GlobalColors';
import GlobalStyle from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalColors />
    <App />
  </React.StrictMode>
);

