import { createContext, useState, useCallback, ReactElement, ReactNode } from 'react';

export type ApiStatusType = {
  loading?: boolean,
  success?: boolean,
  error?: string
}

export type ApiStatusContextType = {
  apiStatus: ApiStatusType,
  startRequest: () => void,
  requestSuccess: () => void,
  requestError: (error: string) => void
}

const providerNotInitialized = 'ApiStatusContext Provider Not Initialized';
export const ApiStatusContext = createContext<ApiStatusContextType>({
  apiStatus: {},
  startRequest: () => { throw new Error(providerNotInitialized) },
  requestSuccess: () => { throw new Error(providerNotInitialized) },
  requestError: () => { throw new Error(providerNotInitialized) }
});

// Create the provider component
export const ApiStatusProvider = ({ children } : {children: ReactNode}) => {
  const [apiStatus, setApiStatus] = useState<ApiStatusType>({
    loading: false,
    success: false,
  });

  const startRequest = useCallback(() => {
    setApiStatus({ loading: true, success: false });
  }, []);

  const requestSuccess = useCallback(() => {
    setApiStatus({ loading: false, success: true });
  }, []);

  const requestError = useCallback((error: string) => {
    setApiStatus({ loading: false, success: false, error });
  }, []);

  return (<ApiStatusContext.Provider value={({ apiStatus, startRequest, requestSuccess, requestError })}>
    {children}
  </ApiStatusContext.Provider>)
}