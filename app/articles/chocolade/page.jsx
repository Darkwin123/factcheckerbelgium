import React from 'react';

export default function ChocoladePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Is chocolade gezond?</h1>
      
      <p className="text-gray-500 mb-4">Gepubliceerd op: 25 April 2025</p>
      
      <img 
        src="https://picsum.photos/800/400" 
        alt="Chocolade" 
        className="w-full h-auto rounded-lg mb-6"
      />
      
      <h2 className="text-xl font-semibold mb-2">De bewering:</h2>
      <p className="mb-4">"Chocolade is goed voor je gezondheid" - Vaak gedeeld op sociale media</p>
      
      <h2 className="text-xl font-semibold mb-2">Onze analyse:</h2>
      <p className="mb-4">
        Pure chocolade (> 70% cacao) bevat antioxidanten die in beperkte mate goed kunnen 
        zijn voor je hart. Maar melkchocolade bevat veel suiker en vet, wat ongezond is 
        als je er te veel van eet.
      </p>
      
      <h2 className="text-xl font-semibold mb-2">Conclusie:</h2>
      <p className="font-bold mb-4">
        Gedeeltelijk waar. Pure chocolade in kleine hoeveelheden heeft voordelen, 
        maar de meeste chocolade die mensen eten is niet zo gezond.
      </p>
      
      <h2 className="text-xl font-semibold mb-2">Bronnen:</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li>Universiteit Gent, Studie over Voeding (2023)</li>
        <li>VlaamseVoedingscentrum.be</li>
      </ol>
      
      <a href="/" className="text-blue-500 hover:underline">
        ← Terug naar de hoofdpagina
      </a>
    </div>
  );
}