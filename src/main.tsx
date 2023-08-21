/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage, HomePage } from '@/pages';
import { store } from '@/store';

import './styles/css/index.css';
import './styles/css/fonts.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/404',
    element: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster position='bottom-right' reverseOrder />
  </Provider>
);
