import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-800">KloptDat.be</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <Link href="/" className="text-gray-900 hover:text-blue-800 font-medium">Home</Link>
              <Link href="/topics/politiek" className="text-gray-600 hover:text-blue-800">Politiek</Link>
              <Link href="/topics/economie" className="text-gray-600 hover:text-blue-800">Economie</Link>
              <Link href="/topics/europa" className="text-gray-600 hover:text-blue-800">Europa</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-800">Over Ons</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Abonneren
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Featured Fact Check */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 md:w-1/2">
                <Image 
                  src="/images/featured-check.jpg" 
                  alt="Featured fact check" 
                  width={800} 
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="flex items-center mb-4">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">NIET WAAR</span>
                  <span className="ml-2 text-gray-500 text-sm">23 April 2025</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  "Belastinghervorming zal gemiddelde Vlaming 500 euro per maand kosten"
                </h2>
                <p className="text-gray-600 mb-4">
                  Deze bewering, gedaan door parlementslid Janssen tijdens een televisiedebat, klopt niet volgens onze analyse van de officiële cijfers.
                </p>
                <Link href="/articles/belastinghervorming" className="text-blue-800 font-medium hover:underline">
                  Lees de volledige analyse →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Fact Checks Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recente Factchecks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fact Check 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src="/images/chocolade.jpg" 
                alt="Chocolade" 
                width={400} 
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">GEDEELTELIJK WAAR</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  "Chocolade is gezond voor je hart"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Pure chocolade in kleine hoeveelheden heeft voordelen, maar de meeste chocolade bevat te veel suiker.
                </p>
                <Link href="/articles/chocolade" className="text-blue-800 text-sm font-medium hover:underline">
                  Lees meer →
                </Link>
              </div>
            </div>

            {/* Fact Check 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src="/images/begroting.jpg" 
                alt="Begroting" 
                width={400} 
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">WAAR</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  "Vlaams begrotingstekort is historisch laag"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Officiële cijfers bevestigen dat het tekort inderdaad gedaald is naar het laagste niveau sinds 2008.
                </p>
                <Link href="/articles/begroting" className="text-blue-800 text-sm font-medium hover:underline">
                  Lees meer →
                </Link>
              </div>
            </div>

            {/* Fact Check 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src="/images/eu-quote.jpg" 
                alt="EU Quote" 
                width={400} 
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">NIET WAAR</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  "EU verplicht lidstaten om 500.000 migranten op te nemen"
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Dit citaat dat viraal ging op sociale media is een onjuiste interpretatie van het nieuwe EU-migratiepact.
                </p>
                <Link href="/articles/eu-migratie" className="text-blue-800 text-sm font-medium hover:underline">
                  Lees meer →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Newsletter */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Categorieën</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/topics/politiek" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900">Politiek</h3>
                <p className="text-sm text-gray-600">Factchecks over uitspraken van politici</p>
              </Link>
              <Link href="/topics/economie" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900">Economie</h3>
                <p className="text-sm text-gray-600">Beweringen over jobs, belastingen en financiën</p>
              </Link>
              <Link href="/topics/europa" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900">Europa</h3>
                <p className="text-sm text-gray-600">Claims over de Europese Unie</p>
              </Link>
              <Link href="/topics/social" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-gray-900">Sociale Media</h3>
                <p className="text-sm text-gray-600">Virale berichten en desinformatie</p>
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Blijf op de hoogte</h2>
            <p className="text-gray-600 mb-4">Ontvang wekelijks de belangrijkste factchecks in je mailbox.</p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="E-mailadres"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="w-full bg-blue-800 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700">
                Inschrijven
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Je kunt je altijd uitschrijven. Privacybeleid.
            </p>
          </div>
        </div>

        {/* Support Banner */}
        <div className="mt-12 bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Steun Onafhankelijke Journalistiek</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            KloptDat.be is onafhankelijk en niet verbonden aan politieke partijen. Help ons om feiten te blijven controleren.
          </p>
          <button className="bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700">
            Steun Ons
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">KloptDat.be</h3>
              <p className="text-gray-400">
                Onafhankelijke factchecking voor Vlaanderen sinds 2025.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Navigatie</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">Over Ons</Link></li>
                <li><Link href="/methodology" className="text-gray-400 hover:text-white">Methodologie</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                info@kloptdat.be<br />
                Brussel, België
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Volg Ons</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
            <p>© 2025 KloptDat.be - Alle rechten voorbehouden</p>
          </div>
        </div>
      </footer>
    </div>
  );
}