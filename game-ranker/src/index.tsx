import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
// import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
// import { TracingInstrumentation } from '@grafana/faro-web-tracing';

// var faro = initializeFaro({
//   url: 'https://faro-collector-prod-us-east-0.grafana.net/collect/11abbc1dd4b1246799efec79afc7e6be',
//   app: {
//     name: 'Group Game Rankings',
//     version: '1.0.0',
//     environment: 'production'
//   },
//   instrumentations: [
//     // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
//     ...getWebInstrumentations(),

//     // Initialization of the tracing package.
//     // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
//     new TracingInstrumentation(),
//   ],
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
