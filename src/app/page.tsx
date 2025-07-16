'use client'
import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import MiniCRM from '../app/MiniCRM';

const page = () => {
  return (
    <Provider store={store}>
      <MiniCRM />
    </Provider>
  );
};
export default page;

