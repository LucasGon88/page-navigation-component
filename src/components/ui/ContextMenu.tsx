'use client';

import React, { useEffect, useRef } from 'react';
import FlagIcon from '../icons/flag-icon';
import PencilIcon from '../icons/pencil-icon';
import ClipboardIcon from '../icons/clipboard-icon';
import DuplicateIcon from '../icons/duplicate-icon';
import TrashIcon from '../icons/trash-icon';

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  onClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ul
      ref={menuRef}
      className="absolute z-[3] bg-white rounded-lg shadow-xl border border-gray-200 py-1 min-w-[180px] animate-appear min-w-[240px]  px-4"
      style={{
        left: `5px`,
        top: `0px`,
        transform: 'translateY(-102%)',
      }}
    >
      <li>
      <button
        onClick={() => {}}
        className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      >
        <FlagIcon />
        Set as first page
      </button>
      </li>
     
      <li>
      <button
        onClick={() => {}}
        className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      >
        <PencilIcon />
        Rename
      </button>
      </li>
      <li>
      <button
        onClick={() => {}}
        className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      >
        <ClipboardIcon />
        Copy
      </button>
      </li>
      <li>
      <button
        onClick={() => {}}
        className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
      >
        <DuplicateIcon />
        Duplicate
      </button>
      </li>
      <li>
      <div className="border-t border-gray-200 my-[14px]"></div>
      </li>
      
      <li>
      <button
        onClick={() => {}}
        className="w-full pb-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
      >
        <TrashIcon /> 
        Delete
      </button>
      </li>
    </ul>
  );
}; 