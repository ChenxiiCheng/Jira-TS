import * as React from "react";
import * as Auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
  username: string;
  password: string;
}

interface IAuthContext {
  user: User | null;
  register: (form: AuthForm) => Promise<void>;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const bootstrapUser = async () => {
  let user = null;
  const token = Auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (form: AuthForm) => Auth.login(form).then(setUser);
  const register = (form: AuthForm) => Auth.register(form).then(setUser);
  const logout = () => Auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error("useAuth必须在AuthProvider中使用");

  return context;
};
