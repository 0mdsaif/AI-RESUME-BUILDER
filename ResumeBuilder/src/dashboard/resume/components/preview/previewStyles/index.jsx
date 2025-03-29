import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Layout, Columns, GridIcon, Layers, SplitSquareHorizontal, LayoutGrid, Sidebar, ChevronLeft, ChevronRight } from 'lucide-react';

export const previewStyles = {
  classic: {
    name: "Classic",
    icon: Layout,
    layout: "single-column",
    className: "preview-classic",
    preview: "/preview-styles/classic.png",
  },
  modern: {
    name: "Two Column",
    icon: Columns,
    layout: "two-column",
    className: "preview-modern",
    preview: "/preview-styles/modern.png",
  },
  timeline: {
    name: "Timeline",
    icon: Layers,
    layout: "timeline",
    className: "preview-timeline",
    preview: "/preview-styles/timeline.png",
  },
  minimal: {
    name: "Minimal",
    icon: Layout,
    layout: "minimal",
    className: "preview-minimal",
    preview: "/preview-styles/minimal.png",
  },
  compact: {
    name: "Compact",
    icon: Sidebar,
    layout: "compact",
    className: "preview-compact",
    preview: "/preview-styles/compact.png",
  },
  grid: {
    name: "Grid",
    icon: GridIcon,
    layout: "grid",
    className: "preview-grid",
    preview: "/preview-styles/grid.png",
  },
  split: {
    name: "Split View",
    icon: SplitSquareHorizontal,
    layout: "split",
    className: "preview-split",
    preview: "/preview-styles/split.png",
  },
  masonry: {
    name: "Masonry",
    icon: LayoutGrid,
    layout: "masonry",
    className: "preview-masonry",
    preview: "/preview-styles/masonry.png",
  },
};

export const PreviewStyleSelector = ({ currentStyle, onStyleSelect }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < (el.scrollWidth - el.clientWidth));
    }
  }, []);

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [checkScrollButtons]);

  const scroll = (direction) => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 100);
    }
  };

  return (
    <div className="relative flex items-center">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div 
        ref={scrollContainerRef}
        className="flex gap-2 p-2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg mb-4 overflow-x-auto scrollbar-hide scroll-smooth"
        onScroll={checkScrollButtons}
      >
        {Object.entries(previewStyles).map(([key, style]) => {
          const Icon = style.icon;
          return (
            <button
              key={key}
              onClick={() => onStyleSelect(key)}
              className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                currentStyle === key
                  ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500'
                  : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden md:inline">{style.name}</span>
            </button>
          );
        })}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
