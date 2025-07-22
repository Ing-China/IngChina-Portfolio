"use client";
import React, { useState } from "react";
import { FaCopy, FaTerminal, FaCheck } from "react-icons/fa";

interface CodeBlockProps {
  code: string;
  language: string;
  index?: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative group my-6">
      <div className="bg-foreground/5 rounded-lg overflow-hidden border border-foreground/20 hover:border-foreground/30 transition-colors">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-3 bg-foreground/10 border-b border-foreground/20">
          <div className="flex items-center gap-3">
            <FaTerminal className="w-4 h-4 text-foreground/70" />
            <span className="text-foreground/80 text-sm font-mono">
              {language || "code"}
            </span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-foreground/40 rounded-full"></div>
              <div className="w-2 h-2 bg-foreground/30 rounded-full"></div>
              <div className="w-2 h-2 bg-foreground/20 rounded-full"></div>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`text-sm flex items-center gap-2 px-3 py-1 rounded-md border transition-all duration-200 ${
              copied
                ? "text-green-600 bg-green-50 border-green-200 hover:bg-green-100"
                : "text-foreground/60 hover:text-foreground bg-foreground/10 hover:bg-foreground/20 border-foreground/20"
            }`}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <>
                <FaCheck className="w-3 h-3" />
                <span className="text-xs font-medium">Copied!</span>
              </>
            ) : (
              <>
                <FaCopy className="w-3 h-3" />
                <span className="text-xs font-medium">Copy</span>
              </>
            )}
          </button>
        </div>
        {/* Code content */}
        <div className="relative">
          <pre className="p-4 overflow-x-auto bg-foreground/5 leading-6">
            <code className="font-mono text-sm block">
              {code.split("\n").map((line, i) => (
                <div
                  key={i}
                  className="flex hover:bg-foreground/5 px-2 rounded transition-colors min-h-[1.5rem]"
                >
                  <span className="text-foreground/40 select-none mr-4 w-8 text-right text-xs flex-shrink-0 leading-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground/90 flex-1 leading-6">
                    {line || " "}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;