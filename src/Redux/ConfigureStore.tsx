/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:25:02
 * @modify date 2024-10-25 11:25:02
 * @desc Configuring the store and encryptor added in the presist
 */


import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { encryptTransform } from 'redux-persist-transform-encrypt';

// Import your reducers
// @ts-ignore
import user from './Reducers/user';

//  THE ENCRYPTOR IS ADDED TO PREVENT THE CROSS SITE ATTACK SO OUR DATA WILL BE ENCRYPTED and Stored in Local Storage
const encryptor = encryptTransform({
  secretKey: 'VITE-frontend-anilProject-vite@#R',
  onError: function (error: any) {
    console.log(error, "Error while  Transforming the Persist Data")
  },
});
const rootReducer: any = combineReducers({
  user,
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor]
};

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
