import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaClock, FaCalendar, FaArrowRight } from "react-icons/fa";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import TerminalCodeBlock from "@/components/TerminalCodeBlock";
import { articles } from "@/data/articles";
import { articleContents } from "@/data/articleContent";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface ArticleDetailProps {
  params: Promise<{
    slug: string;
  }>;
}

const ArticleDetail = async ({ params }: ArticleDetailProps) => {
  const { slug } = await params;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Get article content from external data file
  const articleContent = articleContents[slug] || "";

  // Navigation logic
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Static markdown components
  const markdownComponents: Components = {
    code(props) {
      const { inline, className, children, ...rest } = props as {
        inline?: boolean;
        className?: string;
        children: React.ReactNode;
        [key: string]: unknown;
      };

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "javascript";

      return !inline && match ? (
        <TerminalCodeBlock language={language} theme="github">
          {String(children).replace(/\n$/, "")}
        </TerminalCodeBlock>
      ) : (
        <code
          className="bg-foreground/10 text-foreground px-1.5 py-0.5 rounded text-sm font-mono"
          {...rest}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-8 text-foreground">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-6 mt-10 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-4 mt-8 text-foreground">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="leading-relaxed mb-4 text-foreground/80">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc space-y-2 mb-6 ml-4">{children}</ul>
    ),
    li: ({ children }) => <li className="text-foreground/80">{children}</li>,
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
    img: ({ src, alt }) => (
      <div className="my-8">
        <Image
          src={String(src || "")}
          alt={String(alt || "")}
          width={800}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
          priority
        />
      </div>
    ),
  };

  return (
    <div className="min-h-[calc(100vh-4rem-4rem)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Back Button */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors mb-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <header className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            <span className="flex items-center gap-1">
              <FaCalendar className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              {article.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-lg text-foreground/80 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Article Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={`/images/articles/article${article.id}.png`}
            alt={article.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown components={markdownComponents}>
            {articleContent}
          </ReactMarkdown>
        </div>

        {/* Article Navigation */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex justify-between items-center">
            {previousArticle ? (
              <Link
                href={`/articles/${previousArticle.slug}`}
                className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-sm text-foreground/60">Previous</div>
                  <div className="font-medium group-hover:underline">
                    {previousArticle.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <Link
                href={`/articles/${nextArticle.slug}`}
                className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <div className="text-right">
                  <div className="text-sm text-foreground/60">Next</div>
                  <div className="font-medium group-hover:underline">
                    {nextArticle.title}
                  </div>
                </div>
                <FaArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Back to Articles */}
        <div className="mt-8 pt-8 border-t border-foreground/10 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    </div>

    // <div className="min-h-[calc(100vh-4rem-4rem)] flex items-center justify-center">
    //   <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 w-full">
    //     <div className="text-center py-12">
    //       <div className="text-4xl mb-4">🚧</div>
    //       <h3 className="text-xl font-semibold mb-2">Article in Development</h3>
    //       <p className="text-foreground/60">
    //         This article is currently being written. Please check back later.
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ArticleDetail;
