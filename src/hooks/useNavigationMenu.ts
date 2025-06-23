import { useState, useCallback } from 'react';

export type NavigationItemType = 'page' | 'plus' | 'document' | 'end';

export interface NavigationMenuItem {
  type: NavigationItemType;
  label: string;
  id: string;
}

interface UseNavigationMenu {
  activePage: string;
  navigationItems: NavigationMenuItem[];
  addPageAfterPlus: () => void;
  addPageAtEnd: () => void;
  setActivePage: (pageName: string) => void;
  reorderItems: (oldIndex: number, newIndex: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
}

const initialPages: NavigationMenuItem[] = [
  { type: 'page', label: 'Info', id: 'info' },
  { type: 'plus', label: '+', id: 'plus' },
  { type: 'document', label: 'Details', id: 'details' },
  { type: 'document', label: 'Other', id: 'other' },
  { type: 'end', label: 'Ending', id: 'ending' },
];

export const useNavigationMenu = (): UseNavigationMenu => {
  const [navigationItems, setNavigationItems] = useState<NavigationMenuItem[]>(initialPages);
  const [activePage, setActivePage] = useState<string>('Info');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [nextPageNumber, setNextPageNumber] = useState<number>(1);

  const addPageAfterPlus = useCallback(() => {
    const plusIndex = navigationItems.findIndex(item => item.type === 'plus');
    if (plusIndex === -1) return;
    
    let newPageName = `Page ${nextPageNumber}`;
    let n = nextPageNumber;
    while (navigationItems.some(item => item.label === newPageName)) {
      n++;
      newPageName = `Page ${n}`;
    }
    setNextPageNumber(n + 1);
    
    const newPage: NavigationMenuItem = {
      type: 'document',
      label: newPageName,
      id: `page-${Date.now()}-${Math.random()}`
    };
    
    const newItems = [
      ...navigationItems.slice(0, plusIndex + 1),
      newPage,
      ...navigationItems.slice(plusIndex + 1),
    ];
    setNavigationItems(newItems);
    setActivePage(newPageName);
  }, [navigationItems, nextPageNumber]);

  const addPageAtEnd = useCallback(() => {
    let newPageName = `Page ${nextPageNumber}`;
    let n = nextPageNumber;
    while (navigationItems.some(item => item.label === newPageName)) {
      n++;
      newPageName = `Page ${n}`;
    }
    setNextPageNumber(n + 1);
    const newPage: NavigationMenuItem = {
      type: 'page',
      label: newPageName,
      id: `page-${Date.now()}-${Math.random()}`
    };
    setNavigationItems(prev => [...prev, newPage]);
    setActivePage(newPageName);
  }, [navigationItems, nextPageNumber]);

  const reorderItems = useCallback((oldIndex: number, newIndex: number) => {
    setNavigationItems(prevItems => {
      const newItems = [...prevItems];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      return newItems;
    });
  }, []);

  return {
    activePage,
    navigationItems,
    addPageAfterPlus,
    addPageAtEnd,
    setActivePage,
    reorderItems,
    isDragging,
    setIsDragging,
  };
}; 