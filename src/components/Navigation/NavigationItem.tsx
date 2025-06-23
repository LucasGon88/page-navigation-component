import React, { useState } from 'react';
import { NavigationItemType, NavigationMenuItem } from '@/hooks/useNavigationMenu';
import { ContextMenu } from '@/components/ui/ContextMenu';
import PageIcon from './icons/page-icon';
import DocumentIcon from './icons/document-icon';
import EndingIcon from './icons/ending-icon';
import DotsIcon from './icons/dots-icon';
import PlusIcon from './icons/plus-icon';

interface NavigationItemProps {
  item: NavigationMenuItem;
  isActive: boolean;
  onClick: () => void;
  isDragging: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  isActive,
  onClick,
  isDragging,
}) => {
  const [showMenu, setShowMenu] = useState(false);


  const handleMenuClose = () => {
    setShowMenu(false);
  };

  const renderIcon = (type: NavigationItemType, isActive?: boolean) => {
    switch (type) {
      case 'page':
        return <PageIcon color={isActive ? '#F59D0E' : '#8C93A1'} />;
      case 'document':
        return <DocumentIcon color={isActive ? '#F59D0E' : '#8C93A1'} />;
    case 'end':
        return <EndingIcon color={isActive ? '#F59D0E' : '#8C93A1'} />;
        case 'plus':
        return null;
    default:
        throw new Error(`Unknown item type: ${type}`);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`px-[10px] py-2 text-sm justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer select-none text-center mx-1 flex items-center gap-[6px] relative after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:w-[17px] after:h-px after:border-[#C0C0C0] after:border-t-2 after:border-dashed
            ${item.type !== 'plus' ? 'bg-[#9DA4B2]/15 hover:bg-[#9DA4B2]/35 rounded-[8px]' : 'rounded-full !border-[#E1E1E1] !border-[0.5px] h-[16px] w-[16px] !px-0 text-black'}
            ${isActive ? 'bg-white border-[0.5] border-[#2F72E2] text-[#1A1A1A]' : 'border border-transparent text-[#677289]'}
            ${isDragging ? 'after:hidden' : ''}
            `}
      >
        {renderIcon(item.type, isActive)}
        {item.type !== 'plus' ? (
          <span>{item.label}</span>
        ) : (
          <PlusIcon className="w-3 h-3 text-black font-bold" />
        )}
        {isActive && item.type !== 'plus' && (
          <span
            onClick={() => setShowMenu(true)}
            className="text-[#9DA4B2] text-sm font-bold cursor-pointer pl-2"
            title="More options"
          >
            <DotsIcon />
          </span>
        )}
      </button>

      {showMenu && (
        <ContextMenu
          isOpen={showMenu}
          onClose={handleMenuClose}
        />
      )}

    </div>
  );
}; 