import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, ArticleMetadata } from '@/lib/mdx';

export default function Home() {
  let allArticles: ArticleMetadata[] = [];
  
  try {
    allArticles = getAllArticles();
  } catch (error) {
    console.error('Error loading articles:', error);
    // Continue with empty articles list
  }
  
  const featuredArticle = allArticles.length > 0 ? allArticles[0] : null; 
  const recentArticles = allArticles.slice(1, 7); // Next 6 articles or empty array
  
  // Group articles by category
  const categories = {
    politiek: allArticles.filter(article => article.category === 'politiek'),
    economie: allArticles.filter(article => article.category === 'economie'),
    europa: allArticles.filter(article => article.category === 'europa'),
    social: allArticles.filter(article => article.category === 'social'),
  };

  // Add a fallback UI for when no articles are available
  if (allArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">KloptDat.be</h1>
          <p className="text-xl text-gray-600">
            Onze artikelen worden momenteel geladen. Probeer het later opnieuw.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky modern nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-blue-800">KloptDat<span className="text-blue-600">.be</span></span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 font-medium border-b-2 border-blue-500 pb-1">Home</Link>
              <Link href="/topics/politiek" className="text-gray-600 hover:text-gray-900 font-medium">Politiek</Link>
              <Link href="/topics/economie" className="text-gray-600 hover:text-gray-900 font-medium">Economie</Link>
              <Link href="/topics/europa" className="text-gray-600 hover:text-gray-900 font-medium">Europa</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">Over Ons</Link>
              <Link href="#" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors shadow-sm">
                Abonneren
              </Link>
            </nav>
            <div className="md:hidden flex items-center">
              <button className="text-gray-800 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with modern asymmetric layout */}
        {featuredArticle && (
          <div className="mb-16 mt-4">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-7 order-2 md:order-1">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-4 flex items-center space-x-2">
                      <RatingBadge rating={featuredArticle.rating} />
                      <span className="text-gray-500 text-sm font-medium">{featuredArticle.date}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                      &ldquo;{featuredArticle.title}&rdquo;
                    </h1>
                    <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <Link href={`/articles/${featuredArticle.slug}`} 
                    className="group inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    <span>Lees de volledige analyse</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div className="relative h-80 md:h-full min-h-[320px] rounded-xl overflow-hidden shadow-xl">
                  <Image 
                    src={featuredArticle.imageUrl} 
                    alt={featuredArticle.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs - Modern horizontal scrolling tabs */}
        <div className="mb-12 border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto pb-1 scrollbar-hide">
            <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 whitespace-nowrap">
              Meest Recent
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium pb-2 whitespace-nowrap">
              Politiek
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium pb-2 whitespace-nowrap">
              Economie
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium pb-2 whitespace-nowrap">
              Europa
            </button>
            <button className="text-gray-600 hover:text-gray-900 font-medium pb-2 whitespace-nowrap">
              Sociale Media
            </button>
          </div>
        </div>

        {/* Recent Stories - Modern varied grid layout */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main content area - First 2 larger stories */}
            <div className="md:col-span-8 space-y-12">
              {recentArticles.slice(0, 2).map((article) => (
                <div key={article.slug} className="group">
                  <div className="grid sm:grid-cols-2 gap-6 items-center">
                    <div className="relative h-56 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                      <Image 
                        src={article.imageUrl} 
                        alt={article.title} 
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2 space-x-2">
                        <RatingBadge rating={article.rating} />
                        <span className="text-gray-500 text-sm">{article.date}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        &ldquo;{article.title}&rdquo;
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <Link href={`/articles/${article.slug}`} 
                        className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center">
                        <span>Lees meer</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar with smaller stories */}
            <div className="md:col-span-4">
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Trending Factchecks
                </h2>
                <div className="space-y-4">
                  {recentArticles.slice(2, 6).map((article, idx) => (
                    <Link href={`/articles/${article.slug}`} key={article.slug} className="block group">
                      <div className="flex items-start">
                        <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-600 mr-4 transition-colors">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            &ldquo;{article.title}&rdquo;
                          </h3>
                          <div className="flex items-center mt-1">
                            <RatingBadgeSmall rating={article.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter signup card with modern design */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-md text-white">
                <h2 className="text-lg font-bold mb-3">Krijg de waarheid in je inbox</h2>
                <p className="text-blue-100 mb-4 text-sm">
                  Ontvang wekelijks de belangrijkste factchecks direct in je mailbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 text-sm focus:ring-2 focus:ring-white focus:outline-none"
                  />
                  <button className="w-full bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                    Inschrijven
                  </button>
                </form>
                <p className="text-xs text-blue-200 mt-3">
                  Je kunt je altijd uitschrijven. Privacybeleid.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Section - Modern card design */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            Ontdek factchecks per categorie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/topics/politiek" className="group">
              <div className="bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Politiek</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {categories.politiek.length} factchecks over uitspraken van politici
                </p>
                <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                  Bekijk alle
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/topics/economie" className="group">
              <div className="bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Economie</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {categories.economie.length} beweringen over jobs, belastingen en financiën
                </p>
                <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                  Bekijk alle
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/topics/europa" className="group">
              <div className="bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Europa</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {categories.europa.length} claims over de Europese Unie
                </p>
                <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                  Bekijk alle
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            
            <Link href="/topics/social" className="group">
              <div className="bg-white border border-gray-100 hover:border-blue-200 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Sociale Media</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {categories.social.length} virale berichten en desinformatie
                </p>
                <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                  Bekijk alle
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Support Banner with gradient and modern CTA */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
            <div className="relative z-10 md:max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Steun onafhankelijke factchecking</h2>
              <p className="text-gray-300 mb-8">
                KloptDat.be is een onafhankelijk platform dat niet verbonden is aan politieke partijen of commerciële belangen. Help ons om de waarheid te blijven controleren.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold shadow-sm transition-colors">
                  Word lid
                </button>
                <button className="bg-transparent text-white border border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium transition-colors">
                  Eenmalige donatie
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with modern design */}
      <footer className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-xl font-black mb-4 text-blue-400">KloptDat<span className="text-white">.be</span></h3>
              <p className="text-gray-400 text-sm mb-6">
                Onafhankelijke factchecking voor Vlaanderen sinds 2025. Wij controleren beweringen van politici, nieuws en sociale media.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Navigatie</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-base text-gray-300 hover:text-white">Home</Link></li>
                <li><Link href="/topics/politiek" className="text-base text-gray-300 hover:text-white">Politiek</Link></li>
                <li><Link href="/topics/economie" className="text-base text-gray-300 hover:text-white">Economie</Link></li>
                <li><Link href="/topics/europa" className="text-base text-gray-300 hover:text-white">Europa</Link></li>
                <li><Link href="/topics/social" className="text-base text-gray-300 hover:text-white">Sociale Media</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Over Ons</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-base text-gray-300 hover:text-white">Over KloptDat</Link></li>
                <li><Link href="/methodology" className="text-base text-gray-300 hover:text-white">Methodologie</Link></li>
                <li><Link href="/team" className="text-base text-gray-300 hover:text-white">Ons Team</Link></li>
                <li><Link href="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
                <li><Link href="/faq" className="text-base text-gray-300 hover:text-white">Veelgestelde vragen</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Juridisch</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-base text-gray-300 hover:text-white">Privacybeleid</Link></li>
                <li><Link href="/terms" className="text-base text-gray-300 hover:text-white">Gebruiksvoorwaarden</Link></li>
                <li><Link href="/cookie-policy" className="text-base text-gray-300 hover:text-white">Cookiebeleid</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              © 2025 KloptDat.be - Alle rechten voorbehouden
            </p>
            <p className="text-sm text-gray-500 mt-4 md:mt-0">
              Gemaakt in Vlaanderen 🇧🇪
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Modern badge with subtle animation
function RatingBadge({ rating }: { rating: string }) {
  switch (rating) {
    case 'WAAR':
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
          WAAR
        </span>
      );
    case 'GEDEELTELIJK WAAR':
      return (
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5 animate-pulse"></span>
          GEDEELTELIJK WAAR
        </span>
      );
    case 'NIET WAAR':
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
          NIET WAAR
        </span>
      );
    default:
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5 animate-pulse"></span>
          MISLEIDEND
        </span>
      );
  }
}

// Smaller badge variant for the trending sidebar
function RatingBadgeSmall({ rating }: { rating: string }) {
  switch (rating) {
    case 'WAAR':
      return <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-sm">WAAR</span>;
    case 'GEDEELTELIJK WAAR':
      return <span className="text-xs px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded-sm">GEDEELTELIJK</span>;
    case 'NIET WAAR':
      return <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded-sm">NIET WAAR</span>;
    default:
      return <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-sm">MISLEIDEND</span>;
  }
}