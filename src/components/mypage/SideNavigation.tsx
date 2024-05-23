interface SideNavigationProps {
  onNavigate: (component: string) => void;
}

const SideNavigation = ({ onNavigate }: SideNavigationProps) => {
  return (
    <nav className="side-nav">
      <ul className="side-nav__items">
        <li onClick={() => onNavigate("password")} className="side-nav__item">
          Password
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
