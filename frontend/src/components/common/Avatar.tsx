import React, { useState, useRef, useEffect, PropsWithChildren, useContext } from 'react';
import { UserContext } from "@/context/UserContext";
import { useNavigate } from 'react-router-dom';
import styles from './Avatar.module.scss';

interface AvatarProps extends PropsWithChildren {
  userName: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, userName }) => {
  const { logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.avatar} onClick={toggleDropdown} ref={dropdownRef}>
      <div className={styles.avatarImage}>
        {children}
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <p>{userName}</p>
          <a href="#profile" onClick={handleLinkClick}><strong>Profilis?</strong></a>
          <a onClick={() => navigate("/mybookings")}>My bookings</a>
          <a href="#logout" onClick={handleLogout}>Logout</a>
        </div>
      )}
    </div>
  );
};

export default Avatar;
