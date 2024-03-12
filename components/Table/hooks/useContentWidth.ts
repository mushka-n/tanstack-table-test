import { useEffect, useState } from 'react';

export const useContentWidth = (
  containerRef: React.RefObject<HTMLDivElement>
): [number, number] => {
  const [contentSize, setContentSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) =>
      setContentSize([
        entries[0].contentRect.width,
        entries[0].contentRect.height,
      ])
    );

    observer.observe(container);
    return () => container && observer.unobserve(container);
  }, [containerRef]);

  return contentSize;
};
