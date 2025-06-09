import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface UseFocusManagementOptions {
  focusOnMount?: boolean;
  restoreFocusOnUnmount?: boolean;
  skipToMainContent?: boolean;
}

export function useFocusManagement(options: UseFocusManagementOptions = {}) {
  const {
    focusOnMount = false,
    restoreFocusOnUnmount = false,
    skipToMainContent = false
  } = options;
  
  const previousActiveElement = useRef<Element | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Store the currently focused element
    if (restoreFocusOnUnmount) {
      previousActiveElement.current = document.activeElement;
    }

    // Focus management on mount
    if (focusOnMount) {
      const focusTarget = document.querySelector('[data-focus-on-mount]') as HTMLElement;
      if (focusTarget) {
        focusTarget.focus();
      }
    }

    if (skipToMainContent) {
      const mainContent = document.querySelector('main[aria-label="Dashboard content"]') as HTMLElement;
      if (mainContent) {
        mainContent.focus();
      }
    }

    return () => {
      // Restore focus on unmount
      if (restoreFocusOnUnmount && previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [focusOnMount, restoreFocusOnUnmount, skipToMainContent]);

  // Handle route changes
  useEffect(() => {
    // Announce route changes to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Navegando a ${getPageTitle(pathname)}`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after a short delay
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    // Focus main content area on route change
    setTimeout(() => {
      const mainContent = document.querySelector('main[aria-label="Dashboard content"]') as HTMLElement;
      if (mainContent) {
        mainContent.focus();
      }
    }, 100);
  }, [pathname]);

  // Utility functions
  const focusFirstFocusableElement = (container?: HTMLElement) => {
    const focusableContainer = container || document;
    const focusableElements = focusableContainer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  };

  const focusLastFocusableElement = (container?: HTMLElement) => {
    const focusableContainer = container || document;
    const focusableElements = focusableContainer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  return {
    focusFirstFocusableElement,
    focusLastFocusableElement,
    trapFocus
  };
}

// Helper function to get page title from pathname
function getPageTitle(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 1 && segments[0] === 'dashboard') {
    return 'Dashboard';
  }
  
  if (segments[1] === 'subjectdata') {
    if (segments.length === 2) {
      return 'Lista de asignaturas';
    }
    if (segments[3] === 'info') {
      return 'Información de asignatura';
    }
    return 'Análisis de asignatura';
  }
  
  if (segments[1] === 'profile') {
    return 'Perfil de usuario';
  }
  
  if (segments[1] === 'settings') {
    return 'Configuración';
  }
  
  return 'Página';
}