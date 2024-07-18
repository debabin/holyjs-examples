import React, { useMemo } from 'react';

import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  defaultSession?: boolean;
  children: React.ReactNode;
}

export const SessionProvider = ({ children, defaultSession = false }: SessionProviderProps) => {
  const [session, setSession] = React.useState(defaultSession);

  const value = useMemo(() => ({ session, setSession }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
