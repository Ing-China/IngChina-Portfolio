"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  dracula,
  nightOwl,
  materialDark,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck, FaTerminal } from "react-icons/fa";

interface TerminalCodeBlockProps {
  children: string;
  language?: string;
  theme?: "github" | "dracula" | "nightowl" | "material" | "atom";
}

// Terminal theme configurations
const terminalThemes = {
  github: {
    background: "#0d1117",
    headerBg: "#161b22",
    borderColor: "#30363d",
    syntaxTheme: oneDark,
  },
  dracula: {
    background: "#282a36",
    headerBg: "#44475a",
    borderColor: "#6272a4",
    syntaxTheme: dracula,
  },
  nightowl: {
    background: "#011627",
    headerBg: "#1d3b53",
    borderColor: "#5f7e97",
    syntaxTheme: nightOwl,
  },
  material: {
    background: "#263238",
    headerBg: "#37474f",
    borderColor: "#546e7a",
    syntaxTheme: materialDark,
  },
  atom: {
    background: "#1d1f21",
    headerBg: "#373b41",
    borderColor: "#969896",
    syntaxTheme: atomDark,
  },
};

export default function TerminalCodeBlock({
  children,
  language = "javascript",
  theme = "github",
}: TerminalCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const currentTheme = terminalThemes[theme];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      className="my-6 rounded-lg overflow-hidden border"
      style={{
        backgroundColor: currentTheme.background,
        borderColor: currentTheme.borderColor,
      }}
    >
      {/* Terminal Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          backgroundColor: currentTheme.headerBg,
          borderBottomColor: currentTheme.borderColor,
        }}
      >
        <div className="flex items-center gap-3">
          {/* Terminal Dots */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Terminal Icon and Language */}
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <FaTerminal className="w-3 h-3" />
            <span className="font-mono">{language}</span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <FaCheck className="w-3 h-3" />
              Copied!
            </>
          ) : (
            <>
              <FaCopy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={currentTheme.syntaxTheme}
          customStyle={{
            margin: 0,
            background: currentTheme.background,
            padding: "1.5rem",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            color: "#484f58",
            backgroundColor: currentTheme.background,
            paddingRight: "1rem",
            marginRight: "1rem",
            borderRight: `1px solid ${currentTheme.borderColor}`,
            minWidth: "2.5rem",
            textAlign: "right",
          }}
          wrapLines={true}
          wrapLongLines={true}
        >
          {children}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
