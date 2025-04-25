import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Rating badge component to be used in articles
function RatingBadge({ rating }: { rating: string }) {
  switch (rating.toUpperCase()) {
    case 'WAAR':
      return (
        <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
          WAAR
        </span>
      );
    case 'GEDEELTELIJK WAAR':
      return (
        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5 animate-pulse"></span>
          GEDEELTELIJK WAAR
        </span>
      );
    case 'NIET WAAR':
      return (
        <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
          NIET WAAR
        </span>
      );
    default:
      return (
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
          MISLEIDEND
        </span>
      );
  }
}

// Custom article section container
function ArticleSection({ 
  title, 
  children, 
  icon 
}: { 
  title: string; 
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h2>
      <div className="prose prose-blue max-w-none">
        {children}
      </div>
    </section>
  );
}

// Source item styling
function SourceItem({ children }: { children: ReactNode }) {
  return (
    <li className="text-gray-700 mb-2 hover:text-blue-600 transition-colors">{children}</li>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Style the article title
    h1: ({ children }) => {
      // Extract quote marks if present
      const titleText = children?.toString() || '';
      const hasQuotes = titleText.startsWith('"') && titleText.endsWith('"');
      const cleanTitle = hasQuotes ? titleText.slice(1, -1) : titleText;
      
      return (
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight mt-6">
          {hasQuotes ? `"${cleanTitle}"` : cleanTitle}
        </h1>
      );
    },
    
    // Style subheadings for each section
    h2: ({ children }) => {
      const text = children?.toString() || '';
      
      // Special styling for conclusion section
      if (text === 'Conclusie:') {
        return (
          <div className="bg-gray-50 p-6 rounded-xl mb-8 mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conclusie
            </h2>
          </div>
        );
      }
      
      // Special styling for sources section
      if (text === 'Bronnen:') {
        return (
          <div className="border-t border-gray-200 pt-6 mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Bronnen
            </h2>
          </div>
        );
      }
      
      // Custom styling for De bewering section
      if (text === 'De bewering:') {
        return (
          <ArticleSection 
            title="De bewering" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
          >
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 text-gray-700 italic my-4">
              {/* The actual content will be rendered as children */}
            </div>
          </ArticleSection>
        );
      }
      
      // Custom styling for Onze analyse section
      if (text === 'Onze analyse:') {
        return (
          <ArticleSection 
            title="Onze analyse" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
        );
      }
      
      // Default styling for other h2 elements
      return <h2 className="text-xl md:text-2xl font-bold text-gray-900 my-4">{children}</h2>;
    },
    
    // Paragraphs with improved readability
    p: ({ children }) => {
      const text = children?.toString() || '';
      
      // Handle the publication date with special styling
      if (text.includes('Gepubliceerd op:')) {
        return (
          <p className="text-gray-500 text-sm mb-6 font-medium">{text}</p>
        );
      }
      
      // Handle conclusion text with special styling 
      if (text.startsWith('**') && (
        text.includes('**WAAR.**') || 
        text.includes('**GEDEELTELIJK WAAR.**') || 
        text.includes('**NIET WAAR.**') || 
        text.includes('**MISLEIDEND.**')
      )) {
        // Extract the rating and remaining text
        let rating = '';
        let remainingText = '';
        
        if (text.includes('**WAAR.**')) {
          rating = 'WAAR';
          remainingText = text.split('**WAAR.**')[1].trim();
        } else if (text.includes('**GEDEELTELIJK WAAR.**')) {
          rating = 'GEDEELTELIJK WAAR';
          remainingText = text.split('**GEDEELTELIJK WAAR.**')[1].trim();
        } else if (text.includes('**NIET WAAR.**')) {
          rating = 'NIET WAAR';
          remainingText = text.split('**NIET WAAR.**')[1].trim();
        } else if (text.includes('**MISLEIDEND.**')) {
          rating = 'MISLEIDEND';
          remainingText = text.split('**MISLEIDEND.**')[1].trim();
        }
        
        return (
          <div className="mb-4">
            <div className="flex items-center mb-3">
              <RatingBadge rating={rating} />
            </div>
            <p className="text-gray-700 text-lg">{remainingText}</p>
          </div>
        );
      }
      
      // Regular paragraphs
      return <p className="text-gray-700 my-4 leading-relaxed">{children}</p>;
    },
    
    // Enhanced strong text 
    strong: ({ children }) => {
      return <strong className="font-semibold text-gray-900">{children}</strong>;
    },
    
    // Lists with better styling
    ul: ({ children }) => {
      return <ul className="list-disc pl-5 my-4 space-y-2 text-gray-700">{children}</ul>;
    },
    
    ol: ({ children }) => {
      // Special styling for source lists
      const parentText = components?.toString() || '';
      if (parentText.includes('Bronnen:')) {
        return <ol className="list-decimal pl-5 my-4 space-y-2">{children}</ol>;
      }
      return <ol className="list-decimal pl-5 my-4 space-y-2 text-gray-700">{children}</ol>;
    },
    
    li: ({ children }) => {
      // Check if this is a source item
      const text = children?.toString() || '';
      if (text.includes('Persbericht') || 
          text.includes('Rapport') || 
          text.includes('Interview') || 
          text.includes('Studie') ||
          text.includes('Officiële')) {
        return <SourceItem>{children}</SourceItem>;
      }
      
      return <li className="text-gray-700">{children}</li>;
    },
    
    // Enhanced image with Next.js Image
    img: (props) => {
      const { src, alt, width = 800, height = 450 } = props;
      return (
        <div className="my-8 relative">
          <Image
            src={src as string}
            alt={alt as string || ""}
            width={parseInt(width as string, 10)} 
            height={parseInt(height as string, 10)}
            className="rounded-xl overflow-hidden shadow-md w-full"
          />
        </div>
      );
    },
    
    // Enhanced links
    a: ({ href, children }) => {
      // Check if this is the back link
      if (href === '/' && children?.toString().includes('Terug naar')) {
        return (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link href={href} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Terug naar de hoofdpagina
            </Link>
          </div>
        );
      }
      
      return (
        <Link 
          href={href || '/'} 
          className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
        >
          {children}
        </Link>
      );
    },
    
    // Include any default components
    ...components,
  };
}