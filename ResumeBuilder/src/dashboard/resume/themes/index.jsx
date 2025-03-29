import { motion } from 'framer-motion';

export const resumeThemes = {
  modern: {
    name: "Modern",
    className: "theme-modern",
    preview: "/theme-previews/modern.png",
    styles: {
      headingColor: "text-blue-600",
      sectionSpacing: "space-y-6",
      borderAccent: "border-l-4 border-blue-600",
      cardStyle: "bg-white shadow-lg rounded-lg p-6"
    }
  },
  minimal: {
    name: "Minimal",
    className: "theme-minimal",
    preview: "/theme-previews/minimal.png",
    styles: {
      headingColor: "text-gray-800",
      sectionSpacing: "space-y-4",
      borderAccent: "border-t-2 border-gray-200",
      cardStyle: "bg-white p-6"
    }
  },
  professional: {
    name: "Professional",
    className: "theme-professional",
    preview: "professional-preview.jpg",
    styles: {
      headingColor: "text-indigo-800",
      sectionSpacing: "space-y-8",
      borderAccent: "border-b-2 border-indigo-800",
      cardStyle: "bg-gray-50 p-8 shadow-sm"
    }
  },
  executive: {
    name: "Executive",
    className: "theme-executive",
    preview: "executive-preview.jpg",
    styles: {
      headingColor: "text-gray-900",
      sectionSpacing: "space-y-6",
      borderAccent: "border-l-4 border-gray-900",
      cardStyle: "bg-white p-6 border border-gray-200"
    }
  },
  creative: {
    name: "Creative",
    className: "theme-creative",
    preview: "creative-preview.jpg",
    styles: {
      headingColor: "text-purple-600",
      sectionSpacing: "space-y-8",
      borderAccent: "border-t-4 border-purple-600",
      cardStyle: "bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-md"
    }
  },
  elegant: {
    name: "Elegant",
    className: "theme-elegant",
    preview: "elegant-preview.jpg",
    styles: {
      headingColor: "text-slate-800",
      sectionSpacing: "space-y-6",
      borderAccent: "border-b-2 border-slate-800",
      cardStyle: "bg-slate-50 p-6"
    }
  },
  tech: {
    name: "Tech",
    className: "theme-tech",
    preview: "tech-preview.jpg",
    styles: {
      headingColor: "text-cyan-600",
      sectionSpacing: "space-y-8",
      borderAccent: "border-l-4 border-cyan-600",
      cardStyle: "bg-gradient-to-r from-gray-900 to-cyan-900 text-white p-6"
    }
  },
  corporate: {
    name: "Corporate",
    className: "theme-corporate",
    preview: "corporate-preview.jpg",
    styles: {
      headingColor: "text-blue-900",
      sectionSpacing: "space-y-6",
      borderAccent: "border-b-4 border-blue-900",
      cardStyle: "bg-white shadow-xl p-8"
    }
  },
  compact: {
    name: "Compact",
    className: "theme-compact",
    preview: "compact-preview.jpg",
    styles: {
      headingColor: "text-emerald-700",
      sectionSpacing: "space-y-4",
      borderAccent: "border-l-2 border-emerald-700",
      cardStyle: "bg-white p-4"
    }
  },
  neon: {
    name: "Neon",
    className: "theme-neon",
    preview: "/theme-previews/neon.png",
    styles: {
      headingColor: "text-green-400",
      sectionSpacing: "space-y-8",
      borderAccent: "border-b-2 border-cyan-400",
      cardStyle: "bg-black p-6 shadow-[0_0_20px_rgba(0,255,157,0.3)]"
    }
  },
  gradient: {
    name: "Gradient",
    className: "theme-gradient",
    preview: "/theme-previews/gradient.png",
    styles: {
      headingColor: "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500",
      sectionSpacing: "space-y-6",
      borderAccent: "border-l-4 border-gradient-to-b",
      cardStyle: "bg-gradient-to-br from-yellow-100 to-pink-100 p-6 rounded-xl"
    }
  },
  nordic: {
    name: "Nordic",
    className: "theme-nordic",
    preview: "/theme-previews/nordic.png",
    styles: {
      headingColor: "text-blue-300",
      sectionSpacing: "space-y-6",
      borderAccent: "border-b-2 border-blue-400",
      cardStyle: "bg-gray-900 p-6 text-gray-100"
    }
  },
  luxury: {
    name: "Luxury",
    className: "theme-luxury",
    preview: "/theme-previews/luxury.png",
    styles: {
      headingColor: "text-yellow-500",
      sectionSpacing: "space-y-8",
      borderAccent: "border-b-2 border-yellow-600",
      cardStyle: "bg-gray-900 p-8 font-serif"
    }
  },
  "modern-plus": {
    name: "Modern Plus",
    className: "theme-modern-plus",
    preview: "/theme-previews/modern-plus.png",
    styles: {
      headingColor: "bg-gradient-to-r from-blue-600 to-purple-600",
      sectionSpacing: "space-y-8",
      borderAccent: "border-b-2 border-blue-600",
      cardStyle: "bg-white shadow-xl rounded-xl p-8"
    }
  },
  business: {
    name: "Business",
    className: "theme-business",
    preview: "/theme-previews/business.png",
    styles: {
      headingColor: "text-slate-900",
      sectionSpacing: "space-y-6",
      borderAccent: "border-l-4 border-slate-900",
      cardStyle: "bg-white p-6 border-2 border-slate-200"
    }
  },
  "minimalist-pro": {
    name: "Minimalist Pro",
    className: "theme-minimalist-pro",
    preview: "/theme-previews/minimalist-pro.png",
    styles: {
      headingColor: "text-neutral-700",
      sectionSpacing: "space-y-4",
      borderAccent: "border-t border-neutral-300",
      cardStyle: "bg-neutral-50 p-6"
    }
  },
  "creative-pro": {
    name: "Creative Pro",
    className: "theme-creative-pro",
    preview: "/theme-previews/creative-pro.png",
    styles: {
      headingColor: "bg-gradient-to-r from-pink-500 to-purple-500",
      sectionSpacing: "space-y-8",
      borderAccent: "border-l-4 border-gradient-to-b",
      cardStyle: "bg-white shadow-lg rounded-xl p-6 transform -rotate-1"
    }
  },
  // NEW THEME: Vintage
  vintage: {
    name: "Vintage",
    className: "theme-vintage",
    preview: "/theme-previews/vintage.png",
    styles: {
      headingColor: "text-yellow-700",
      sectionSpacing: "space-y-6",
      borderAccent: "border-b-2 border-yellow-700",
      cardStyle: "bg-fdf6e3 p-6 shadow-md"
    }
  },
  // NEW THEME: Futuristic
  futuristic: {
    name: "Futuristic",
    className: "theme-futuristic",
    preview: "/theme-previews/futuristic.png",
    styles: {
      headingColor: "text-green-400",
      sectionSpacing: "space-y-6",
      borderAccent: "border-b-2 border-pink-500",
      cardStyle: "bg-0b0c10 p-6 shadow-lg"
    }
  }
};

export const ThemeSelector = ({ currentTheme, onThemeSelect }) => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Choose a Theme</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(resumeThemes).map(([key, theme]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden ${
              currentTheme === key 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'hover:shadow-xl'
            }`}
            onClick={() => onThemeSelect(key)}
          >
            <div className="relative aspect-[8.5/11] bg-gray-100">
              <img
                src={theme.preview}
                alt={`${theme.name} theme preview`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 bg-white dark:bg-gray-800">
              <p className="text-sm font-medium text-center">{theme.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
