import Link from 'next/link';
import { ReactNode } from 'react';

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky modern nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-black tracking-tight text-blue-800">
                KloptDat<span className="text-blue-600">.be</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
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

      {/* Article content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <div className="prose prose-lg prose-blue max-w-none">
          {children}
        </div>
      </article>
      
      {/* Related articles section - Can be dynamically populated later */}
      <div className="bg-gray-50 py-12 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Gerelateerde factchecks</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full w-max mb-4">NIET WAAR</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Andere politieke beweringen</h3>
              <p className="text-gray-600 text-sm mb-4">Bekijk meer factchecks over politieke uitspraken en bewering in Vlaanderen.</p>
              <Link href="/topics/politiek" className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center">
                <span>Alle politiek factchecks</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full w-max mb-4">WAAR</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">Economische factchecks</h3>
              <p className="text-gray-600 text-sm mb-4">Ontdek de waarheid achter beweringen over de Vlaamse en Belgische economie.</p>
              <Link href="/topics/economie" className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center">
                <span>Alle economie factchecks</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full w-max mb-4">GEDEELTELIJK WAAR</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">EU gerelateerde claims</h3>
              <p className="text-gray-600 text-sm mb-4">Beweringen over de Europese Unie en beleid geanalyseerd en gefactcheckt.</p>
              <Link href="/topics/europa" className="text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center">
                <span>Alle EU factchecks</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Share and support banner */}
      <div className="bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <div className="sm:flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Deel deze factcheck</h3>
                <p className="text-blue-100 mb-4 sm:mb-0">Help mee desinformatie tegen te gaan. Deel feiten, geen fictie.</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-blue-700 hover:bg-blue-50 p-3 rounded-full shadow-sm transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </button>
                <button className="bg-white text-blue-700 hover:bg-blue-50 p-3 rounded-full shadow-sm transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="bg-white text-blue-700 hover:bg-blue-50 p-3 rounded-full shadow-sm transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                  </svg>
                </button>
                <button className="bg-white text-blue-700 hover:bg-blue-50 p-3 rounded-full shadow-sm transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.478 5.559A1.5 1.5 0 016.912 4.5H9A.75.75 0 009 3H6.912a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H15a.75.75 0 000 1.5h2.088a1.5 1.5 0 011.434 1.059l2.213 7.191H17.89a3 3 0 00-2.684 1.658l-.256.513a1.5 1.5 0 01-1.342.829h-3.218a1.5 1.5 0 01-1.342-.83l-.256-.512a3 3 0 00-2.684-1.658H3.265l2.213-7.191z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v6.44l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l1.72 1.72V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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