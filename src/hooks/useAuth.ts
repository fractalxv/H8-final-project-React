import { useAppSelector, useAppDispatch } from './useReduxHooks';
import { 
  setEmail, 
  setPassword, 
  setError, 
  login, 
  loginWithCredentials, 
  logout 
} from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  return {
    ...auth,
    setEmail: (email: string) => dispatch(setEmail(email)),
    setPassword: (password: string) => dispatch(setPassword(password)),
    setError: (error: string) => dispatch(setError(error)),
    login: (user: any) => dispatch(login(user)),
    loginWithCredentials: (email: string, password: string) => 
      dispatch(loginWithCredentials({ email, password })),
    logout: () => dispatch(logout()),
  };
};