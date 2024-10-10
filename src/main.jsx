import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from './services/store.js';
import { Provider } from 'react-redux';
import App from './components/app/App.jsx';
import './index.css'

const store = configureStore();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
