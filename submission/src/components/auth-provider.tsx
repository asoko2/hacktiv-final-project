"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  currentSession: any;
  currentGroup: any;
  currentPermissions: string[];
  switchGroup: (group: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentSession: null,
  currentGroup: null,
  switchGroup: () => {},
  currentPermissions: [],
});

export type AuthProviderProps = {
  children: React.ReactNode;
  currentSession: any;
  currentGroup: any;
};

export const AuthProvider = ({
  children,
  currentSession,
  currentGroup,
}: AuthProviderProps) => {

  const [group, setGroup] = useState<string>(currentGroup);
  const [permissions, setPermissions] = useState<string[]>(
    currentSession.groups[currentGroup]
  );

  const switchGroup = (newGroup: any) => {
    setGroup(newGroup);

    const groupPermissions = currentSession.groups[newGroup];

    if (groupPermissions) {
      setPermissions(groupPermissions);
    }
  };

  useEffect(() => {
    setPermissions(currentSession.groups[group]);
  }, [currentGroup, switchGroup]);

  return (
    <AuthContext.Provider
      value={{
        currentSession,
        currentGroup: group,
        switchGroup,
        currentPermissions: permissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
