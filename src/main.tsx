import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { configureStore } from './services/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import App from './components/app/app';
//@ts-ignore
import './index.css';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </StrictMode>,
)
