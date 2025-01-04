import { useProfile } from '@react-hooks-variant/utils/contexts/profile';
import { useSession } from '@react-hooks-variant/utils/contexts/session';
import { useNavigate } from '@tanstack/react-router';
import { flushSync } from 'react-dom';

import { COOKIE } from '@/utils';

export const useIndexPage = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { setSession } = useSession();

  const onLogout = () => {
    flushSync(() => {
      setSession(false);
      localStorage.removeItem(COOKIE.ACCESS_TOKEN);
    });
    navigate({
      to: '/auth',
      replace: true
    });
  };

  return { state: { profile }, functions: { onLogout } };
};
