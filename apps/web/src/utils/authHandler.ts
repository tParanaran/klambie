import { getCookie, deleteCookie } from 'cookies-next';
import { IUser } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export const AuthHandler = async (
  router: ReturnType<typeof useRouter>,
  onAuthSuccess: (user: IUser | null) => void,
) => {
  try {
    const access_token = (await getCookie('access_token')) || '';

    if (access_token) {
      const user: IUser = jwtDecode(access_token);

      onAuthSuccess(user);
      if (user.role === 6690) {
        router.push('/cart');
      } else {
        router.push('/dashboard');
      }
    }

    return;
  } catch (err) {
    deleteCookie('access_token');
    throw err;
  }
};
