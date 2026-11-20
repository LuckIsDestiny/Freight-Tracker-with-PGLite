import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  Bars,
  HamburgerMenu,
  Nav,
  NavButton,
  NavButtonLink,
  NavLink,
  NavMenu,
  NavToggle,
} from "./NavBarElements";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <Nav>
      <NavToggle
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Bars />
      </NavToggle>
      <HamburgerMenu $isOpen={isOpen}>
        <NavMenu $isOpen={isOpen} onClick={() => setIsOpen(false)}>
          <NavLink to={"/"}>Home</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to={"/loads"}>Loads</NavLink>
              <NavLink to={"/carrier"}>Carrier</NavLink>
              <NavLink to={"/shipper"}>Shipper</NavLink>
            </>
          )}
          {!isAuthenticated && <NavLink to={"/register"}>Register</NavLink>}
        </NavMenu>
        {!isAuthenticated && (
          <NavButton $isOpen={isOpen} onClick={() => setIsOpen(false)}>
            <NavButtonLink to={"/login"}>Login</NavButtonLink>
          </NavButton>
        )}
        {isAuthenticated && (
          <NavButton onClick={handleLogout} $isOpen={isOpen}>
            <NavButtonLink to={"/login"}>Logout</NavButtonLink>
          </NavButton>
        )}
      </HamburgerMenu>
    </Nav>
  );
};
