import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from './Redux/ReduxStore';
import { Provider } from 'react-redux';
// import { CssVarsProvider } from '@mui/joy/styles'; // Import CssVarsProvider

// Add a type assertion to let TypeScript know that `rootElement` is not null.
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
      {/* <CssVarsProvider> */}
        <App />
      {/* </CssVarsProvider> */}
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}

