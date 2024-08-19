import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';

import MoreIcon from '@/assets/icons/MoreIcon.svg?react';

import styles from './MoreButton.module.scss';

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MoreMenuProps {
  items: MenuItem[];
  onClose: () => void;
}

const cn = classNames.bind(styles);
const MoreMenu = ({ items, onClose }: MoreMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={menuRef} className={cn('menu')}>
      {items.map((item, index) =>
        item.label ? (
          <div key={index} className={cn('menu_item')} onClick={item.onClick}>
            {item.label}
          </div>
        ) : null,
      )}
    </div>
  );
};

interface MoreMenuButtonProps {
  items: MenuItem[];
  fillColor?: string;
}

const MoreMenuButton = ({ items, fillColor }: MoreMenuButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={cn('menu_button')}>
      <button onClick={toggleMenu}>
        <MoreIcon fill={fillColor} />
      </button>
      {isMenuOpen && <MoreMenu items={items} onClose={closeMenu} />}
    </div>
  );
};

export default MoreMenuButton;
