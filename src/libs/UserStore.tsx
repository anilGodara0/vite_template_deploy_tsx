/**
 * @author Anil Godara
 * @github anilgodara4239@gmail.com
 * @create date 2024-10-25 11:23:58
 * @modify date 2024-10-25 11:23:58
 * @desc To prevent the Unwanted re renders
 */

import { createSelector } from 'reselect';

// Assuming the user state is inside the state.user slice And we are doing this for Prevent the Unwanted Render Calls
export const selectUser = createSelector(
    (state: any) => state.user,
    (user) => user
);
