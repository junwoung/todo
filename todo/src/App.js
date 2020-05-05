import React from 'react';
import './App.css';
import Frame from './business/frame/frame';
import { Provider } from 'react-redux'
import store from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Frame />
    </Provider>
  );
}

export default App;
