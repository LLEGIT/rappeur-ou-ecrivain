// Script pour ajouter le champ "type" aux citations
const fs = require('fs');
const path = require('path');

const rappeurs = [
  'Damso', 'Booba', 'Nekfeu', 'Oxmo Puccino', 'Orelsan', 'PNL', 'Alpha Wann',
  'Lomepal', 'Freeze Corleone', 'SCH', 'Ninho', 'Niska', 'Laylow', 'Aya Nakamura',
  'Gazo', 'Naps', 'Jul', 'Rim\'K', 'Rohff', 'IAM', 'NTM', 'MC Solaar',
  'Youssoupha', 'Kery James', 'Sopico', 'Georgio', 'Dinos', 'S.Pri Noir',
  'Vald', 'Lujipeka', 'Columbine', 'Eddy de Pretto'
];

const quotesPath = path.join(__dirname, '../data/quotes.json');
const quotes = JSON.parse(fs.readFileSync(quotesPath, 'utf-8'));

const updatedQuotes = quotes.map(quote => {
  const isRappeur = rappeurs.some(r => 
    quote.author.toLowerCase().includes(r.toLowerCase()) ||
    r.toLowerCase().includes(quote.author.toLowerCase())
  );
  
  return {
    ...quote,
    type: isRappeur ? 'rappeur' : 'ecrivain'
  };
});

fs.writeFileSync(quotesPath, JSON.stringify(updatedQuotes, null, 2));
console.log('✅ Types ajoutés avec succès !');
console.log(`Rappeurs: ${updatedQuotes.filter(q => q.type === 'rappeur').length}`);
console.log(`Écrivains: ${updatedQuotes.filter(q => q.type === 'ecrivain').length}`);
