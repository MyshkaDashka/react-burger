import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { configureStore } from './services/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app.js';
//@ts-ignore
import './index.css';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
