// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Generate static params is fine
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Define the props according to Next.js 15.x App Router
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ArticlePage({ params, searchParams }: Props) {
  try {
    // Construct the path to the MDX file
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, params.slug, 'page.mdx');
    
    // Read the file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Parse the MDX file with gray-matter
    const { content, data: _frontmatter } = matter(fileContents);
    
    return (
      <div>
        <MDXRemote source={content} />
      </div>
    );
  } catch {
    // If the article is not found, show 404
    notFound();
  }
}

// Update metadata function with the same Props type
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, params.slug, 'page.mdx');
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Extract title from the first line of the content
    const titleMatch = fileContents.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : params.slug;
    
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