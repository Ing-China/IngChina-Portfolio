"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-foreground/10 h-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 h-full flex justify-between items-center">
        <div className="text-foreground/60 font-medium">
          <p>&copy; {new Date().getFullYear()} china</p>
        </div>
        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
