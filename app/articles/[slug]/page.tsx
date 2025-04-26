// app/articles/[slug]/page.tsx
import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// This function is fine as is
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Update the page component to handle params as a Promise
export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string }
}) {
  // Handle params whether it's a Promise or a direct object
  const resolvedParams = params instanceof Promise ? await params : params;
  
  try {
    // Construct the path to the MDX file
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, resolvedParams.slug, 'page.mdx');
    
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

// Also update the metadata function with the same approach
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, resolvedParams.slug, 'page.mdx');
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    // Extract title from the first line of the content
    const titleMatch = fileContents.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : resolvedParams.slug;
    
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