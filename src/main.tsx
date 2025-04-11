import { Profiler, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';
import data from './Redux/ConfigureStore.tsx'
import { LoaderProvider } from './libs/Loader.tsx'
const { store, persistor } = data();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <LoaderProvider>
            <Profiler id="MyApp" onRender={(...args) => console.log(args)} >
            <App />
            </Profiler>
          </LoaderProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)


