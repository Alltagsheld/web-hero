import { useContext } from "react";
import { AuthContext, AuthState } from "src/contexts/AuthContext";

export const useAuth = (): AuthState | null => {
  return useContext(AuthContext);
};
