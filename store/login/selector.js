import { createSelector } from 'reselect';


const selectlogin = state => state.login;

export const selectToken = createSelector(
 [selectlogin],
 (login) => login.accessToken
)