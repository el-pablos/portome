import { useState, useEffect } from 'react';

/**
 * Hook untuk mendeteksi apakah tab browser sedang aktif/visible
 * Digunakan untuk pause animasi yang berat saat tab tidak aktif
 * Ini menghemat CPU dan baterai user
 */
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Set initial state
    setIsVisible(!document.hidden);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;
