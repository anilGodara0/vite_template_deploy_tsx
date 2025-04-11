/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:24:38
 * @modify date 2024-10-25 11:24:38
 * @desc  Reducers of User Login 
 */


/******** Reducers ********/

const initialState = {
  loggedIn: false,
  notifications: [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, ...{ loggedIn: true }, ...action.data };
    case 'LOG_OUT':
      // localStorage.removeItem('token');
      return initialState;

    default:
      if (localStorage.getItem('token')) {
        return state;
      } else {
        return initialState
      }
  }
}
