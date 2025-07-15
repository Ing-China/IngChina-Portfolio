"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full bg-background/80 backdrop-blur-md z-50 h-16 transition-all duration-300 ${
        isScrolled ? "border-b border-foreground/10" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo.png"
              alt="IChina Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-foreground/70 transition-colors"
              >
                ABOUT
              </Link>
              <Link
                href="/resume"
                className="text-sm font-medium hover:text-foreground/70 transition-colors"
              >
                RESUME
              </Link>
              <Link
                href="/projects"
                className="text-sm font-medium hover:text-foreground/70 transition-colors"
              >
                PROJECTS
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium hover:text-foreground/70 transition-colors"
              >
                ARTICLES
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-foreground/70 transition-colors"
              >
                CONTACT
              </Link>
            </div>
            <div className="ml-8">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 md:hidden w-9 h-9 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
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
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 py-4 space-y-4 bg-background/95 backdrop-blur-md border-t border-foreground/10">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/resume"
              className="block text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              RESUME
            </Link>
            <Link
              href="/projects"
              className="block text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PROJECTS
            </Link>
            <Link
              href="/articles"
              className="block text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ARTICLES
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium hover:text-foreground/70 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
