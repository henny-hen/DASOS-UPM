import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: (event?: KeyboardEvent) => void;
  description: string;
  category: string;
}

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { logout } = useAuth();

  // Define all keyboard shortcuts
  const shortcuts: KeyboardShortcut[] = [
    // Navigation shortcuts
    {
      key: 'h',
      altKey: true,
      action: () => router.push('/dashboard'),
      description: 'Ir al dashboard',
      category: 'Navegación'
    },
    {
      key: 's',
      altKey: true,
      action: () => router.push('/dashboard/subjectdata'),
      description: 'Ir a todas las asignaturas',
      category: 'Navegación'
    },
    {
      key: 'p',
      altKey: true,
      action: () => router.push('/dashboard/profile'),
      description: 'Ir a perfil',
      category: 'Navegación'
    },
    {
      key: 'comma',
      altKey: true,
      action: () => router.push('/dashboard/settings'),
      description: 'Ir a configuración',
      category: 'Navegación'
    },
    // Quick actions
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        // Focus search bar if it exists
        const searchInput = document.querySelector('input[placeholder*="Busca"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Enfocar barra de búsqueda',
      category: 'Acciones'
    },
    {
      key: 'k',
      metaKey: true, // For Mac users
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="Busca"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      description: 'Enfocar barra de búsqueda (Mac)',
      category: 'Acciones'
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open modals, dropdowns, or blur focus
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
        // Close search dropdown if open
        const searchContainer = document.querySelector('[data-search-container]');
        if (searchContainer) {
          const dropdown = searchContainer.querySelector('[data-search-dropdown]');
          if (dropdown) {
            (dropdown as HTMLElement).style.display = 'none';
          }
        }
      },
      description: 'Cerrar dropdowns y popups',
      category: 'Acciones'
    },
    // System shortcuts
    {
      key: 'q',
      ctrlKey: true,
      shiftKey: true,
      action: () => logout(),
      description: 'Cerrar sesión',
      category: 'General'
    },
    {
      key: '/',
      action: (e) => {
        // Prevent default only if not in an input field
        const target = e?.target as HTMLElement;
        if (target?.tagName !== 'INPUT' && target?.tagName !== 'TEXTAREA') {
          e?.preventDefault();
          const searchInput = document.querySelector('input[placeholder*="Busca"]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        }
      },
      description: 'Búsqueda rápida en página',
      category: 'Acciones'
    },
    // Help shortcut
    {
      key: '?',
      shiftKey: true,
      action: () => {
        // Show keyboard shortcuts modal
        const event = new CustomEvent('showKeyboardShortcuts');
        document.dispatchEvent(event);
      },
      description: 'Mostrar atajos de teclado',
      category: 'Ayuda'
    }
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when user is typing in inputs
    const target = event.target as HTMLElement;
    const isInputField = target.tagName === 'INPUT' || 
                        target.tagName === 'TEXTAREA' || 
                        target.contentEditable === 'true';

    // Allow Escape key even in input fields
    if (event.key !== 'Escape' && isInputField) {
      // Only allow Ctrl/Cmd+K for search in input fields
      if (!(event.key === 'k' && (event.ctrlKey || event.metaKey))) {
        return;
      }
    }

    // Find matching shortcut
    const matchingShortcut = shortcuts.find(shortcut => {
      return shortcut.key.toLowerCase() === event.key.toLowerCase() &&
             !!shortcut.ctrlKey === !!event.ctrlKey &&
             !!shortcut.altKey === !!event.altKey &&
             !!shortcut.shiftKey === !!event.shiftKey &&
             !!shortcut.metaKey === !!event.metaKey;
    });

    if (matchingShortcut) {
      event.preventDefault();
      matchingShortcut.action(event);
    }
  }, [shortcuts, logout, router]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { shortcuts };
}