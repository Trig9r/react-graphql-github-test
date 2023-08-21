import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import { HomePage } from '@/pages';
import { store } from '@/store';

import './styles/css/index.css';
import './styles/css/fonts.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HomePage />
    <Toaster position='bottom-right' reverseOrder />
  </Provider>
);
