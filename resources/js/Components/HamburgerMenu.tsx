import React, { useEffect } from 'react';
import "../../css/Hamburger.css";

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle?: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onToggle }) => {
  useEffect(() => {
    const checkbox = document.getElementById('menu-toggle') as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = isOpen;
    }
  }, [isOpen]);

  return (
    <div className="nav" style={{height: '50px'}}>
      <input
        type="checkbox"
        id="menu-toggle"
        checked={isOpen}
        onChange={onToggle}
      />
      <svg>
        <use xlinkHref="#menu" />
        <use xlinkHref="#menu" />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none', height: '50px', width: '50px' }}>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 56" id="menu">
          <path d="M48.33,45.6H18a14.17,14.17,0,0,1,0-28.34H78.86a17.37,17.37,0,0,1,0,34.74H42.33l-21-21.26L47.75,4" />
        </symbol>
      </svg>
    </div>
  );
};

export default HamburgerMenu;
