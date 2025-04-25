export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8">KloptDat.be</h1>
      <p className="text-center mb-8">Feiten checken voor Vlaanderen</p>
      
      <div className="border p-4 rounded-lg mb-6 hover:shadow-md">
        <h2 className="text-xl font-semibold">Is chocolade gezond?</h2>
        <p className="text-gray-700 mt-2">
          Wetenschappers zeggen dat pure chocolade in kleine hoeveelheden goed kan zijn...
        </p>
        <a href="/articles/chocolade" className="text-blue-500 mt-2 inline-block">
          Lees meer →
        </a>
      </div>
    </main>
  );
}