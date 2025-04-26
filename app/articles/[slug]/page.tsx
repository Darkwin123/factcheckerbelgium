/* eslint-disable @typescript-eslint/no-explicit-any */
// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Fix the generateStaticParams function
export async function generateStaticParams() {
  // Only return the slugs, don't try to access files here
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Simplify the page component
export default async function ArticlePage({ params }: any) {
  try {
    // Get the slug value
    const slug = params instanceof Promise ? (await params).slug : params.slug;
    
    // Now use the slug to construct the path
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    // Read the file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    return (
      <div>
        <MDXRemote source={content} />
      </div>
    );
  } catch (error) {
    console.error('Error in ArticlePage:', error);
    notFound();
  }
}

// Simplify the metadata function
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
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Artikel niet gevonden',
      description: 'De pagina kon niet worden geladen'
    };
  }
}