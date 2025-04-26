/* eslint-disable @typescript-eslint/no-explicit-any */
// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Use the simplest possible approach
export default async function ArticlePage({ params }: any) {
  try {
    // We know that params will eventually contain slug
    // Resolve it if it's a promise
    const slug = params instanceof Promise ? (await params).slug : params.slug;
    
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    return (
      <div>
        <MDXRemote source={content} />
      </div>
    );
  } catch {
    notFound();
  }
}

// Same simplified approach for metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    const slug = params instanceof Promise ? (await params).slug : params.slug;
    
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    const titleMatch = fileContents.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    return {
      title: title,
      description: data.description || 'Factcheck artikel op KloptDat.be'
    };
  } catch {
    return {
      title: 'Artikel niet gevonden',
      description: 'De pagina kon niet worden geladen'
    };
  }
}