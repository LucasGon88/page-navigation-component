'use client';

import { useNavigationMenu } from '@/hooks/useNavigationMenu';
import { NavigationMenu } from '@/components/Navigation/NavigationMenu';

export default function Home() {
  const {
    activePage,
    navigationItems,
    addPageAfterPlus,
    addPageAtEnd,
    setActivePage,
    reorderItems,
    isDragging,
    setIsDragging,
  } = useNavigationMenu();

  return (
    <div className="min-h-screen p-4 bg-[#444444] pt-[30%]">
      <div className="max-w-fit mx-auto">
        <NavigationMenu
          items={navigationItems}
          activePage={activePage}
          onPageChange={setActivePage}
          addPageAfterPlus={addPageAfterPlus}
          addPageAtEnd={addPageAtEnd}
          reorderItems={reorderItems}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
      </div>
    </div>
  );
}
