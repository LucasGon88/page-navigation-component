'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NavigationItem } from './NavigationItem';
import { NavigationMenuItem } from '@/hooks/useNavigationMenu';

interface SortableNavigationItemProps {
  item: NavigationMenuItem;
  isActive: boolean;
  onClick: () => void;
}

export const SortableNavigationItem: React.FC<SortableNavigationItemProps> = ({
  item,
  isActive,
  onClick,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <NavigationItem
        item={item}
        isActive={isActive}
        onClick={onClick}
        isDragging={isDragging}
      />
    </div>
  );
}; 