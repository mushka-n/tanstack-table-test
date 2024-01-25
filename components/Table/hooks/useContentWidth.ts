import { useEffect, useState } from 'react';

export const useContentWidth = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) =>
      setContentWidth(entries[0].contentRect.width)
    );

    observer.observe(container);
    return () => container && observer.unobserve(container);
  }, [containerRef]);

  return contentWidth;
};
