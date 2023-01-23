import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "src/contexts/AuthContext";
import { routes } from "./routes";

export const InitializedRoutes: ReactNode = routes.map((route, key) => {
  return <Route key={key} path={route.path} element={route.page} />;
});

export const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>{InitializedRoutes}</Routes>
      </AuthProvider>
    </Router>
  );
};
