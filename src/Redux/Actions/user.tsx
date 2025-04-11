/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:24:19
 * @modify date 2024-10-25 11:24:19
 * @desc User Login and Logout Action Creators
 */

export const login_success = (data: any) => ({ type: 'LOGIN_SUCCESS', data });
export const logout = () => ({ type: 'LOG_OUT' });