// hooks/useUserType.ts
import { useState } from 'react';

function useUserType(initialType = ''): [string, (type: string) => void] {
  const [userType, setUserType] = useState<string>(initialType);

  const updateUserType = (type: string) => {
    setUserType(type);
  };

  return [userType, updateUserType];
}

export default useUserType;
