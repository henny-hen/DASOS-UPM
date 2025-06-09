'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { shortcuts } = useKeyboardShortcuts();

  useEffect(() => {
    const handleShowShortcuts = () => setIsOpen(true);
    document.addEventListener('showKeyboardShortcuts', handleShowShortcuts);
    return () => document.removeEventListener('showKeyboardShortcuts', handleShowShortcuts);
  }, []);

  const handleClose = () => setIsOpen(false);

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  // Format key combination for display
  const formatKeyCombo = (shortcut: any) => {
    const keys = [];
    if (shortcut.ctrlKey) keys.push('Ctrl');
    if (shortcut.metaKey) keys.push('⌘');
    if (shortcut.altKey) keys.push('Alt');
    if (shortcut.shiftKey) keys.push('Shift');
    
    // Format special keys
    let key = shortcut.key;
    if (key === ' ') key = 'Space';
    if (key === 'Escape') key = 'Esc';
    if (key === 'comma') key = ',';
    if (key === '/') key = '/';
    if (key === '?') key = '?';
    
    keys.push(key.toUpperCase());
    return keys;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-fuchsia-950 bg-opacity-40 backdrop-blur-sm"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl  max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-fuchsia-950 font-outfit">
                Atajos de teclado
              </h2>
              <button
                onClick={handleClose}
                className="text-fuchsia-700 hover:text-white transition-colors p-2"
                aria-label="Cerrar modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-purple-900 mb-3 font-outfit">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 transition-colors"
                      >
                        <span className="text-fuchsia-950 text-sm">
                          {shortcut.description}
                        </span>
                        <div className="flex gap-1">
                          {formatKeyCombo(shortcut).map((key, keyIndex) => (
                            <span
                              key={keyIndex}
                              className="px-2 py-1 bg-fuchsia-800 bg-opacity-60 text-white text-xs font-mono rounded border border-fuchsia-600 border-opacity-30"
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-purple-300 border-opacity-20">
              <p className="text-center text-purple-800 text-sm">
                Presiona <span className="px-2 py-1 bg-fuchsia-900 text-white bg-opacity-60 rounded text-xs font-mono">Esc</span> para cerrar
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}