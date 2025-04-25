import { Metadata } from 'next';
import { getAllArticles } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Dynamic route to render individual articles
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
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

// Generate metadata dynamically
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
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