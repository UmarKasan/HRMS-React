import { createContext } from 'react';

export const UserContext = createContext(null);
export const UserDispatchContext = createContext(null);

export const InitialUserInfo = {
    username: '',
    userId: '',
    userRole: '',
    employee: ''
  }
  
export function userReducer(userInfo, action) {
    switch(action.type){
      case 'login':
        return {
          ...userInfo,
          username: action.username,
          userId: action.userId,
          userRole: action.userRole,
          employee: action.employee
        }
      case 'logout':
        return {
          username: '',
          userId: '',
          userRole: '',
          employee: ''
        }
    }
  
}