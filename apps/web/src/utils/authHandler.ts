import { getCookie, deleteCookie } from 'cookies-next';
import { IUser } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';

export const AuthHandler = async (
  onAuthSuccess: (user: IUser | null) => void,
) => {
  try {
    const access_token = (await getCookie('access_token')) || '';

    if (access_token) {
      const user: IUser = jwtDecode(access_token);

      onAuthSuccess(user);
    }

    return;
  } catch (err) {
    deleteCookie('access_token');
    throw err;
  }
};
