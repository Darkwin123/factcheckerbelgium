// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles } from '@/lib/mdx';

// Generate static paths based on the actual articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Type definition for params
type Params = {
  slug: string;
};

export default async function Page({ params }: { params: Params }) {
  const { slug } = params;
  
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

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = params;
  
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