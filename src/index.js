import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'normalize.css';
import { AuthContextProvider } from './context/AuthContext';

// React 앱 랜더링
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // React에서 개발 모드에 오류 검사를 위해 사용 (배포 상태에서는 적용되지 않음)
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
