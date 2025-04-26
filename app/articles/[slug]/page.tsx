// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles } from '@/lib/mdx';
import { useMDXComponents } from '@/mdx-components';
import Image from 'next/image';
import Link from 'next/link';

// Generate static paths based on the actual articles
export async function generateStaticParams() {
  try {
    const articles = getAllArticles();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return known article slugs as a fallback
    return [
      { slug: 'belastinghervorming' },
      { slug: 'eu-migratie' },
      { slug: 'begroting' },
      { slug: 'chocolade' }
    ];
  }
}

// Helper function to display rating badge
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

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    if (!fs.existsSync(fullPath)) {
      notFound();
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    // Extract rating from content to display badge
    let rating = 'MISLEIDEND';
    if (content.includes('**WAAR.**')) rating = 'WAAR';
    else if (content.includes('**GEDEELTELIJK WAAR.**')) rating = 'GEDEELTELIJK WAAR';
    else if (content.includes('**NIET WAAR.**')) rating = 'NIET WAAR';
    
    // Extract image URL for header image
    const imageMatch = content.match(/!\[.+\]\((.+)\)/);
    const imageUrl = imageMatch ? imageMatch[1] : '/images/default.svg';
    
    // Extract title from content
    const titleMatch = content.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    // Extract publication date
    const dateMatch = content.match(/\*\*Gepubliceerd op: (.+?)\*\*/);
    const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('nl-BE');
    
    // Use the components defined in mdx-components.tsx
    const components = useMDXComponents({});
    
    return (
      <div>
        {/* Add a header section before the main content for better styling */}
        <div className="mb-8 mt-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <RatingBadge rating={rating} />
              <span className="text-gray-500 text-sm">{date}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mt-2">
              "{title}"
            </h1>
            
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mt-4 mb-8">
              <Image 
                src={imageUrl} 
                alt={title} 
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Apply prose styling to the MDX content */}
        <div className="prose prose-lg prose-blue max-w-none">
          <MDXRemote source={content} components={components} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    if (!fs.existsSync(fullPath)) {
      return {
        title: 'Artikel niet gevonden',
        description: 'De pagina kon niet worden geladen'
      };
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const titleMatch = fileContents.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    // Extract excerpt for metadata description
    const beweringSection = fileContents.split('## De bewering:')[1];
    const nextSectionIndex = beweringSection ? beweringSection.indexOf('##') : -1;
    let excerpt = '';
    
    if (beweringSection) {
      excerpt = nextSectionIndex > -1 
        ? beweringSection.substring(0, nextSectionIndex) 
        : beweringSection;
      
      excerpt = excerpt.replace(/[\r\n]+/g, ' ').trim();
    }
    
    return {
      title,
      description: excerpt || `Factcheck: ${title}`
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Artikel niet gevonden',
      description: 'De pagina kon niet worden geladen'
    };
  }
}