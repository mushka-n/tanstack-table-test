import { useEffect, useState } from 'react';

export const useContentWidth = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) =>
      setTableWidth(entries[0].contentRect.width)
    );

    observer.observe(container);
    return () => container && observer.unobserve(container);
  }, [containerRef]);

  return tableWidth;
};
