// app/articles/[slug]/page.tsx
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
// Import the components directly instead of using the hook
import { useMDXComponents } from '@/mdx-components';
import { getAllArticles } from '@/lib/mdx';

// Generate static paths based only on articles that actually exist
export async function generateStaticParams() {
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    // Only include folders that have a page.mdx file
    const articleSlugs = fs.readdirSync(articlesDirectory)
      .filter(file => {
        try {
          const fullPath = path.join(articlesDirectory, file, 'page.mdx');
          return fs.statSync(path.join(articlesDirectory, file)).isDirectory() && 
                 file !== '[slug]' && 
                 fs.existsSync(fullPath);
        } catch (e) {
          return false;
        }
      });
    
    return articleSlugs.map(slug => ({ slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return only article slugs we're absolutely sure about
    const knownArticles = [];
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    
    for (const slug of ['belastinghervorming', 'eu-migratie', 'begroting', 'chocolade']) {
      try {
        const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
        if (fs.existsSync(fullPath)) {
          knownArticles.push({ slug });
        }
      } catch (e) {
        // Skip if there's an error
      }
    }
    
    return knownArticles;
  }
}

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

export default async function Page({ params, searchParams }: Props) {
  // Get the MDX components before any conditional returns
  const mdxComponents = useMDXComponents({});
  const { slug } = await params;
  
  try {
    const articlesDirectory = path.join(process.cwd(), 'app/articles');
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Article not found: ${slug}`);
      return notFound();
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { content } = matter(fileContents);
    
    return (
      <div className="prose prose-lg prose-blue max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    );
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return notFound();
  }
}