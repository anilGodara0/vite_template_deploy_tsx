/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:26:20
 * @modify date 2024-10-25 11:26:20
 * @desc Here we can define the Route Config 
 */
// src/Route/routeConfig.js
// protected: true, // Add this line to indicate this route is protected


const routeConfig = [
  {
    path: '/',
    element: 'Home',
    filePath: 'Home/index',
    exact: true,
    renderLayout: true,
    protected: true,
  },

  {
    path: '/login',
    element: 'Login',
    filePath: 'Auth/Login',
    exact: true,
  },
  {
    path: '/signup',
    element: 'Signup',
    filePath: 'Auth/Signup',
    exact: true,
  },
  {
    path: '/reset-password',
    element: 'Reset',

    filePath: 'Auth/Reset',
    exact: true,
  },
  {
    path: '/forgot-password',
    element: 'Forgot',
    filePath: 'Auth/Forgot',
    exact: true,
  },
  {
    path: '/profile',
    element: 'Profile',
    filePath: 'Profile/Profile',
    protected: true,
    renderLayout: true,
    exact: true,
  },


] as const

export type RoutePath = typeof routeConfig[number]['path']; // This will give you a union of all paths


const componentMap: any = {
  Home: () => import('../components/Home/index.tsx'),
  Login: () => import('../components/Auth/Login.tsx'),
  Signup: () => import('../components/Auth/Signup.tsx'),
  Reset: () => import('../components/Auth/Reset.tsx'),
  Forgot: () => import('../components/Auth/Forgot.tsx'),
  Profile: () => import('../components/Profile/Profile.tsx'),

};

export default routeConfig;
export { componentMap };
