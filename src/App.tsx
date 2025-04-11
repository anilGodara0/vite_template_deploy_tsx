/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:26:39
 * @modify date 2024-10-25 11:26:39
 * @desc App.tsx file
 */

import { SnackbarProvider } from 'notistack'
import CreateRoutes from './Routes/RouteCreator'
import { useSelector } from 'react-redux'
import { useLoader } from './libs/Loader'
import LoaderHtml from './LoaderHtml'
import { selectUser } from './libs/UserStore'
import { useEffect } from 'react'
import socket from './Global/Apiclient/SocketClient'
import { AppWrapper } from './components/AppWrapper'
import { ModalProvider } from './libs/ModalContext'

function App() {
  const { loading, setLoading } = useLoader()
  const isAuthenticated = useSelector(selectUser)?.loggedIn

  useEffect(() => {
    // Listen for events from the server
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
    });
    socket.on(`notification-sent`, (data) => {
      console.log('Notification Data Recieved', data)
    })
    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);
  return (
    <>

      <SnackbarProvider maxSnack={3} // limits the number of snackbars displayed at once
        anchorOrigin={{
          vertical: 'top', // position on the page
          horizontal: 'center',
        }}

      >
        <AppWrapper>
          <ModalProvider>
            <CreateRoutes isAuthenticated={isAuthenticated} />
          </ModalProvider>
        </AppWrapper>
      </SnackbarProvider>
      {loading &&
        <LoaderHtml />}
      <div className='absolute top-0 h-1'>
        <button id='loaderTrue' className='h-0 ' style={{ 'visibility': 'hidden' }} onClick={() => setLoading(true)}>Loader</button>
        <button id='loaderFalse' className='h-0' style={{ 'visibility': 'hidden' }} onClick={() => setLoading(false)}>Loader</button>
      </div>


    </>
  )
}

export default App
