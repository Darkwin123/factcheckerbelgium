// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

type PageParams = {
  params: {
    slug: string;
  } | Promise<{ slug: string }>;
}

// Hardcode known valid slugs to avoid filesystem operations during build
export async function generateStaticParams() {
  return [
    { slug: 'belastinghervorming' },
    { slug: 'eu-migratie' },
    { slug: 'begroting' },
    { slug: 'chocolade' }
  ];
}

export default async function Page({ params }: PageParams) {
  // Handle params whether it's a Promise or not
  const paramsValue = params instanceof Promise ? await params : params;
  const { slug } = paramsValue;
  
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    if (!fs.existsSync(fullPath)) {
      notFound();
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    return (
      <div>
        <MDXRemote source={content} />
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  // Handle params whether it's a Promise or not
  const paramsValue = params instanceof Promise ? await params : params;
  const { slug } = paramsValue;
  
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
    
    return {
      title,
      description: `Factcheck: ${title}`
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Artikel niet gevonden',
      description: 'De pagina kon niet worden geladen'
    };
  }
}