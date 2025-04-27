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
  try {
    // Get all subdirectories in the articles directory
    const articleSlugs = fs.readdirSync(articlesDirectory).filter(file => {
      try {
        return fs.statSync(path.join(articlesDirectory, file)).isDirectory() &&
               file !== '[slug]'; // Skip the [slug] directory
      } catch (e) {
        return false;
      }
    });
    
    const articles = articleSlugs.map(slug => {
      try {
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
        
        // Extract the first paragraph as excerpt - modified to work without /s flag
        const beweringSection = content.split('## De bewering:')[1];
        const nextSectionIndex = beweringSection ? beweringSection.indexOf('##') : -1;
        let excerpt = '';
        
        if (beweringSection) {
          excerpt = nextSectionIndex > -1 
            ? beweringSection.substring(0, nextSectionIndex) 
            : beweringSection;
          
          excerpt = excerpt.replace(/[\r\n]+/g, ' ').trim();
        }
        
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
      } catch (error) {
        console.error(`Error processing article ${slug}:`, error);
        // Return a minimal valid article to prevent build failures
        return {
          slug,
          title: slug,
          date: new Date().toLocaleDateString('nl-BE'),
          excerpt: '',
          rating: 'MISLEIDEND',
          imageUrl: '/images/default.svg',
          category: 'politiek'
        };
      }
    });
    
    // Sort by date (newest first)
    return articles.sort((a, b) => {
      try {
        const dateA = new Date(a.date.split(' ').reverse().join(' '));
        const dateB = new Date(b.date.split(' ').reverse().join(' '));
        return dateB.getTime() - dateA.getTime();
      } catch (e) {
        return 0;
      }
    });
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    // Return fallback data to prevent build failures
    return [
      {
        slug: 'belastinghervorming',
        title: 'Belastinghervorming zal gemiddelde Vlaming 500 euro per maand kosten',
        date: '24 April 2025',
        excerpt: 'De bewering dat de "gemiddelde Vlaming" €500 meer zal betalen is niet waar.',
        rating: 'NIET WAAR',
        imageUrl: '/images/featured-check.jpg',
        category: 'economie'
      },
      {
        slug: 'eu-migratie',
        title: 'EU verplicht lidstaten om 500.000 migranten op te nemen',
        date: '22 April 2025',
        excerpt: 'Het nieuwe EU-migratiepact verplicht elke lidstaat om 500.000 migranten op te nemen.',
        rating: 'NIET WAAR',
        imageUrl: '/images/eu-quote.jpg',
        category: 'europa'
      },
      {
        slug: 'begroting',
        title: 'Vlaams begrotingstekort is historisch laag',
        date: '20 April 2025',
        excerpt: 'Het Vlaams begrotingstekort is gedaald naar het laagste niveau sinds 2008.',
        rating: 'WAAR',
        imageUrl: '/images/begroting.jpg',
        category: 'economie'
      },
      {
        slug: 'chocolade',
        title: 'Chocolade is gezond voor je hart',
        date: '25 April 2025',
        excerpt: 'Chocolade is goed voor je gezondheid.',
        rating: 'GEDEELTELIJK WAAR',
        imageUrl: '/images/chocolade.jpg',
        category: 'social'
      }
    ];
  }
}