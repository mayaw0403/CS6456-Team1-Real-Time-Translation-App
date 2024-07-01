export const translate = (text, targetLanguage) => {
    const translations = {
        hello: {
            en: 'hello',
            es: 'hola',
            fr: 'bonjour',
            de: 'hallo',
          },
          Hello: {
            en: 'Hello',
            es: 'Hola',
            fr: 'Bonjour',
            de: 'Hallo',
          },
          world: {
            en: 'world',
            es: 'mundo',
            fr: 'monde',
            de: 'Welt',
          },
          World: {
            en: 'World',
            es: 'Mundo',
            fr: 'Monde',
            de: 'Welt',
          },
          how: {
            en: 'how',
            es: 'cómo',
            fr: 'comment',
            de: 'wie',
          },
          How: {
            en: 'How',
            es: 'Cómo',
            fr: 'Comment',
            de: 'Wie',
          },
          are: {
            en: 'are',
            es: 'son',
            fr: 'sont',
            de: 'sind',
          },
          Are: {
            en: 'Are',
            es: 'Son',
            fr: 'Sont',
            de: 'Sind',
          },
          you: {
            en: 'you',
            es: 'tú',
            fr: 'vous',
            de: 'du',
          },
          You: {
            en: 'You',
            es: 'Tú',
            fr: 'Vous',
            de: 'Du',
          },
          today: {
            en: 'today',
            es: 'hoy',
            fr: 'aujourd\'hui',
            de: 'heute',
          },
          Today: {
            en: 'Today',
            es: 'Hoy',
            fr: 'Aujourd\'hui',
            de: 'Heute',
          },
          plans: {
            en: 'plans',
            es: 'planes',
            fr: 'plans',
            de: 'pläne',
          },
          Plans: {
            en: 'Plans',
            es: 'Planes',
            fr: 'Plans',
            de: 'Pläne',
          },
          watch: {
            en: 'watch',
            es: 'mirar',
            fr: 'regarder',
            de: 'schauen',
          },
          Watch: {
            en: 'Watch',
            es: 'Mirar',
            fr: 'Regarder',
            de: 'Schauen',
          },
          latest: {
            en: 'latest',
            es: 'último',
            fr: 'dernier',
            de: 'neueste',
          },
          Latest: {
            en: 'Latest',
            es: 'Último',
            fr: 'Dernier',
            de: 'Neueste',
          },
          episode: {
            en: 'episode',
            es: 'episodio',
            fr: 'épisode',
            de: 'Episode',
          },
          Episode: {
            en: 'Episode',
            es: 'Episodio',
            fr: 'Épisode',
            de: 'Episode',
          },
          excited: {
            en: 'excited',
            es: 'emocionado',
            fr: 'excité',
            de: 'aufgeregt',
          },
          Excited: {
            en: 'Excited',
            es: 'Emocionado',
            fr: 'Excité',
            de: 'Aufgeregt',
          },
          trip: {
            en: 'trip',
            es: 'viaje',
            fr: 'voyage',
            de: 'Reise',
          },
          Trip: {
            en: 'Trip',
            es: 'Viaje',
            fr: 'Voyage',
            de: 'Reise',
          },
          help: {
            en: 'help',
            es: 'ayuda',
            fr: 'aider',
            de: 'helfen',
          },
          Help: {
            en: 'Help',
            es: 'Ayuda',
            fr: 'Aider',
            de: 'Helfen',
          },
          problem: {
            en: 'problem',
            es: 'problema',
            fr: 'problème',
            de: 'Problem',
          },
          Problem: {
            en: 'Problem',
            es: 'Problema',
            fr: 'Problème',
            de: 'Problem',
          },
          meet: {
            en: 'meet',
            es: 'encontrarse',
            fr: 'rencontrer',
            de: 'treffen',
          },
          Meet: {
            en: 'Meet',
            es: 'Encontrarse',
            fr: 'Rencontrer',
            de: 'Treffen',
          },
          cafe: {
            en: 'cafe',
            es: 'café',
            fr: 'café',
            de: 'Café',
          },
          Cafe: {
            en: 'Cafe',
            es: 'Café',
            fr: 'Café',
            de: 'Café',
          },
          favorite: {
            en: 'favorite',
            es: 'favorito',
            fr: 'favori',
            de: 'Lieblings-',
          },
          Favorite: {
            en: 'Favorite',
            es: 'Favorito',
            fr: 'Favori',
            de: 'Lieblings-',
          },
          book: {
            en: 'book',
            es: 'libro',
            fr: 'livre',
            de: 'Buch',
          },
          Book: {
            en: 'Book',
            es: 'Libro',
            fr: 'Livre',
            de: 'Buch',
          },
          movie: {
            en: 'movie',
            es: 'película',
            fr: 'film',
            de: 'Film',
          },
          Movie: {
            en: 'Movie',
            es: 'Película',
            fr: 'Film',
            de: 'Film',
          },
          craving: {
            en: 'craving',
            es: 'ansias',
            fr: 'envie',
            de: 'Verlangen',
          },
          Craving: {
            en: 'Craving',
            es: 'Ansias',
            fr: 'Envie',
            de: 'Verlangen',
          },
          pizza: {
            en: 'pizza',
            es: 'pizza',
            fr: 'pizza',
            de: 'Pizza',
          },
          Pizza: {
            en: 'Pizza',
            es: 'Pizza',
            fr: 'Pizza',
            de: 'Pizza',
          },
          weather: {
            en: 'weather',
            es: 'tiempo',
            fr: 'temps',
            de: 'Wetter',
          },
          Weather: {
            en: 'Weather',
            es: 'Tiempo',
            fr: 'Temps',
            de: 'Wetter',
          },
          work: {
            en: 'work',
            es: 'trabajo',
            fr: 'travail',
            de: 'Arbeit',
          },
          Work: {
            en: 'Work',
            es: 'Trabajo',
            fr: 'Travail',
            de: 'Arbeit',
          },
          school: {
            en: 'school',
            es: 'escuela',
            fr: 'école',
            de: 'Schule',
          },
          School: {
            en: 'School',
            es: 'Escuela',
            fr: 'École',
            de: 'Schule',
          },
          day: {
            en: 'day',
            es: 'día',
            fr: 'jour',
            de: 'Tag',
          },
          Day: {
            en: 'Day',
            es: 'Día',
            fr: 'Jour',
            de: 'Tag',
          },
          hobby: {
            en: 'hobby',
            es: 'pasatiempo',
            fr: 'passe-temps',
            de: 'Hobby',
          },
          Hobby: {
            en: 'Hobby',
            es: 'Pasatiempo',
            fr: 'Passe-temps',
            de: 'Hobby',
          },
      // Add more words and translations as needed
    };
  
    // Split text into words
    const words = text.split(/\b/);
  
    // Translate each word
    const translatedText = words.map(word => {
      // Remove non-alphanumeric characters from word to handle punctuation
      const cleanedWord = word.replace(/[^\w\s]/gi, '');
  
      // Translate cleaned word
      if (translations[cleanedWord] && translations[cleanedWord][targetLanguage]) {
        return translations[cleanedWord][targetLanguage];
      } else {
        return cleanedWord; // Return original word if translation not found
      }
    }).join(''); // Join translated words back into a string
  
    return translatedText;
  };