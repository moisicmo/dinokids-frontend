import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { onLogin, onLogout, setRoleUser } from '@/store';
import { useErrorStore } from '.';

export const useAuthStore = () => {
  const { status, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();

  const startLogin = async (body: object) => {
    try {
      console.log('INICIANDO SESION');
      console.log(body);
      const { data } = await coffeApi.post('/auth', body);
      console.log(data);
      const user = `${data.user.name} ${data.user.lastName}`;
      const role = data.user.staffs.role;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('role', JSON.stringify(role));
      dispatch(onLogin(user));
      dispatch(setRoleUser({ role }));
    } catch (error) {
      dispatch(onLogout());
      throw handleError(error);
    }
  };
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = localStorage.getItem('user');
      // console.log(user)
      return dispatch(onLogin(user));
    } else {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  return {
    //* Propiedades
    status,
    user,

    //* Métodos
    startLogin,
    checkAuthToken,
  };
};

export const useLogoutStore = () => {
  const dispatch = useDispatch();
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };
  return {
    startLogout,
  };
};
