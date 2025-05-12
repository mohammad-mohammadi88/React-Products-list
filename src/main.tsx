import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
import Provider from './Context/Provider.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider>
      <App />
    </Provider>
  // </StrictMode>
)
