import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { setUnauthorizedHandler } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";

type SessionHandlerProps = {
  children: ReactNode;
};

export const SessionHandler = ({ children }: SessionHandlerProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      navigate("/login");
    });
  }, [navigate, logout]);

  return <>{children}</>;
};
