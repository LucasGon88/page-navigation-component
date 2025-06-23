'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NavigationItem } from './NavigationItem';
import { NavigationMenuItem } from '@/hooks/useNavigationMenu';
import { SortableNavigationItem } from './SortableNavigationItem';
import PlusIcon from './icons/plus-icon';

interface NavigationMenuProps {
  items: NavigationMenuItem[];
  activePage: string;
  onPageChange: (page: string) => void;
  addPageAfterPlus: () => void;
  addPageAtEnd: () => void;
  reorderItems: (oldIndex: number, newIndex: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  activePage,
  onPageChange,
  addPageAfterPlus,
  addPageAtEnd,
  reorderItems,
  isDragging,
  setIsDragging,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderItems(oldIndex, newIndex);
      }
    }

    setActiveId(null);
    setIsDragging(false);
  };

  const activeItem = activeId ? items.find(item => item.id === activeId) : null;

  return (
    <div className="w-full mx-auto p-4 relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-full flex scrollbar-hide items-center bg-white shadow-lg border border-gray-200 p-2 gap-2 transition-all duration-200 ease-in-out hover:shadow-xl">
          <SortableContext items={items.map(item => item.id)} strategy={horizontalListSortingStrategy}>
            {items.map((item) => (
              <SortableNavigationItem
                key={item.id}
                item={item}
                isActive={item.type !== 'plus' && activePage === item.label}
                onClick={() => {
                  if (item.type === 'plus') {
                    addPageAfterPlus();
                  } else {
                    onPageChange(item.label);
                  }
                }}
              />
            ))}
          </SortableContext>
          <button
            type="button"
            onClick={addPageAtEnd}
            style={{ flex: '0 0 auto' }}
            className={`px-4 py-2 rounded-lg text-sm justify-center font-medium transition-all duration-200 ease-in-out cursor-pointer select-none text-center mx-1 first:ml-0 last:mr-0 flex items-center gap-2 bg-white border border-[#E1E1E1] text-[#1A1A1A]`}
          >
            <PlusIcon className="w-4 h-4" />
            Add page
          </button>
        </div>
        <DragOverlay>
          {activeItem ? (
            <NavigationItem
              item={activeItem}
              isActive={activeItem.type === 'page' && activePage === activeItem.label}
              onClick={() => {}}
              isDragging={isDragging}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}; 