import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'app/articles');

export type ArticleMetadata = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  rating: 'WAAR' | 'GEDEELTELIJK WAAR' | 'NIET WAAR' | 'MISLEIDEND';
  imageUrl: string;
  category: string;
};

export function getAllArticles(): ArticleMetadata[] {
  // Get all subdirectories in the articles directory
  const articleSlugs = fs.readdirSync(articlesDirectory).filter(file => 
    fs.statSync(path.join(articlesDirectory, file)).isDirectory()
  );
  
  const articles = articleSlugs.map(slug => {
    // Read the MDX file
    const fullPath = path.join(articlesDirectory, slug, 'page.mdx');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the article metadata
    const { data, content } = matter(fileContents);
    
    // Extract the title from the first line (# Title)
    const titleMatch = content.match(/^# [""](.+)[""]/m);
    const title = titleMatch ? titleMatch[1] : slug;
    
    // Extract the rating from a line containing "WAAR", "NIET WAAR", etc.
    let rating: ArticleMetadata['rating'] = 'MISLEIDEND';
    if (content.includes('**WAAR.**')) rating = 'WAAR';
    else if (content.includes('**GEDEELTELIJK WAAR.**')) rating = 'GEDEELTELIJK WAAR';
    else if (content.includes('**NIET WAAR.**')) rating = 'NIET WAAR';
    
    // Extract the image URL from the markdown
    const imageMatch = content.match(/!\[.+\]\((.+)\)/);
    const imageUrl = imageMatch ? imageMatch[1] : '/images/default.svg';
    
    // Extract the first paragraph as excerpt
    const excerptMatch = content.match(/## De bewering:\s*(.+?)(?=\s*##|$)/s);
    const excerpt = excerptMatch 
      ? excerptMatch[1].replace(/[\r\n]+/g, ' ').trim() 
      : '';
    
    // Determine the category based on content or slug
    let category = 'politiek';
    if (slug.includes('eu-') || slug.includes('europa')) category = 'europa';
    if (slug.includes('economie') || slug.includes('begroting')) category = 'economie';
    if (slug.includes('sociaal') || slug.includes('media')) category = 'social';

    // Get the publish date from the content
    const dateMatch = content.match(/\*\*Gepubliceerd op: (.+?)\*\*/);
    const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('nl-BE');
    
    return {
      slug,
      title,
      date,
      excerpt,
      rating,
      imageUrl,
      category,
      ...data // Include any frontmatter data if present
    };
  });
  
  // Sort by date (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date.split(' ').reverse().join(' '));
    const dateB = new Date(b.date.split(' ').reverse().join(' '));
    return dateB.getTime() - dateA.getTime();
  });
}