import "./index.scss";
import { useState } from "react";

interface SideNavigationProps {
  onNavigate: (component: string) => void;
}

const SideNavigation = ({ onNavigate }: SideNavigationProps) => {
  const [activeItem, setActiveItem] = useState<string>("password");

  const handleItemClick = (component: string) => {
    onNavigate(component);
    setActiveItem(component);
  };

  return (
    <nav className="side-nav">
      <ul className="side-nav__item-list">
        <li
          onClick={() => handleItemClick("password")}
          className={`side-nav__item ${activeItem === "password" ? "side-nav__item--active" : ""}`}
        >
          Password
        </li>
        <li
          onClick={() => handleItemClick("author")}
          className={`side-nav__item ${activeItem === "author" ? "side-nav__item--active" : ""}`}
        >
          Author
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
