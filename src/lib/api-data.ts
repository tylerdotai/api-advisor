import { ApiRecommendation, ApiCategory } from './types'

export const apiDatabase: ApiRecommendation[] = [
  {
    id: 'open-meteo',
    name: 'Open-Meteo',
    description: 'Open-source weather API with no API key required. Global forecast data including temperature, precipitation, wind, and weather codes.',
    category: 'weather',
    baseUrl: 'https://api.open-meteo.com/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/forecast?latitude={lat}&longitude={lon}&current_weather=true',
        description: 'Current weather for coordinates',
        requiresAuth: false
      }
    ],
    rateLimit: '10,000 requests/day',
    requiresKey: false,
    freeTier: 'Full access to all weather variables',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=32.76&longitude=-97.34&current_weather=true'
);
const data = await response.json();
console.log(data.current_weather);`,
    keywords: ['weather', 'forecast', 'temperature', 'rain', 'climate', 'meteorological']
  },
  {
    id: 'nws',
    name: 'National Weather Service',
    description: 'US government weather data. Free, no API key, covers entire US with alerts, forecasts, and observations.',
    category: 'weather',
    baseUrl: 'https://api.weather.gov',
    endpoints: [
      {
        method: 'GET',
        path: '/points/{lat},{lon}',
        description: 'Get forecast grid for location',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full US weather data',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://api.weather.gov/points/32.76,-97.34'
);
const data = await response.json();
const forecastUrl = data.properties.forecastHourly;
// Follow the forecastUrl for hourly data`,
    keywords: ['weather', 'us government', 'alerts', 'forecast', 'noaa', 'nws']
  },
  {
    id: 'nominatim',
    name: 'OpenStreetMap Nominatim',
    description: 'Geocoding and reverse geocoding via OpenStreetMap data. Convert addresses to coordinates and vice versa.',
    category: 'geocoding',
    baseUrl: 'https://nominatim.openstreetmap.org',
    endpoints: [
      {
        method: 'GET',
        path: '/search?q={address}&format=json',
        description: 'Forward geocoding',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/reverse?lat={lat}&lon={lon}&format=json',
        description: 'Reverse geocoding',
        requiresAuth: false
      }
    ],
    rateLimit: '1 request/second',
    requiresKey: false,
    freeTier: '1 request/second (requires meaningful User-Agent)',
    cors: 'unknown',
    codeExample: `const response = await fetch(
  'https://nominatim.openstreetmap.org/search?q=1600+Pennsylvania+Ave+Washington+DC&format=json',
  { headers: { 'User-Agent': 'MyApp/1.0' } }
);
const data = await response.json();
console.log(data[0].lat, data[0].lon);`,
    keywords: ['geocoding', 'maps', 'address', 'location', 'coordinates', 'lat', 'lon', 'openstreetmap']
  },
  {
    id: 'zippopotam',
    name: 'Zippopotam.us',
    description: 'Simple ZIP code to location data. Returns city, state, and coordinates for US and international postal codes.',
    category: 'geocoding',
    baseUrl: 'https://api.zippopotam.us',
    endpoints: [
      {
        method: 'GET',
        path: '/us/{zipcode}',
        description: 'US ZIP code lookup',
        requiresAuth: false
      }
    ],
    rateLimit: 'Respectful usage',
    requiresKey: false,
    freeTier: 'All US and international postal codes',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.zippopotam.us/us/76101');
const data = await response.json();
console.log(data.places[0]['place name'], data.places[0].state);`,
    keywords: ['zipcode', 'postal code', 'geocoding', 'city', 'state', 'location']
  },
  {
    id: 'coingecko',
    name: 'CoinGecko',
    description: 'Cryptocurrency prices, market data, historical charts, and exchange data. No API key required for basic usage.',
    category: 'crypto',
    baseUrl: 'https://api.coingecko.com/api/v3',
    endpoints: [
      {
        method: 'GET',
        path: '/simple/price?ids=bitcoin&vs_currencies=usd',
        description: 'Current BTC price in USD',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/coins/markets?vs_currency=usd&order=market_cap_desc',
        description: 'Top coins by market cap',
        requiresAuth: false
      }
    ],
    rateLimit: '10-50 requests/minute',
    requiresKey: false,
    freeTier: '10/min without key, 30/min with free key, 50/min paid',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
);
const prices = await response.json();
console.log('BTC:', prices.bitcoin.usd);
console.log('ETH:', prices.ethereum.usd);`,
    keywords: ['crypto', 'bitcoin', 'ethereum', 'price', 'market', 'trading', 'coin']
  },
  {
    id: 'alpha-vantage',
    name: 'Alpha Vantage',
    description: 'Stocks, forex, and crypto data with technical indicators. Free API key required.',
    category: 'finance',
    baseUrl: 'https://www.alphavantage.co/query',
    endpoints: [
      {
        method: 'GET',
        path: '?function=GLOBAL_QUOTE&symbol={SYMBOL}&apikey={KEY}',
        description: 'Stock quote',
        requiresAuth: true,
        authType: 'api-key'
      },
      {
        method: 'GET',
        path: '?function=TIME_SERIES_DAILY&symbol={SYMBOL}&apikey={KEY}',
        description: 'Daily OHLCV data',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '5 requests/minute, 500/day',
    requiresKey: true,
    keySignupUrl: 'https://www.alphavantage.co/support/#api-key',
    freeTier: '25 requests/day with free key',
    cors: 'yes',
    codeExample: `const apiKey = 'YOUR_API_KEY';
const response = await fetch(
  \`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=\${apiKey}\`
);
const data = await response.json();
console.log(data['Global Quote'].['05. price']);`,
    keywords: ['stocks', 'finance', 'trading', 'quote', 'market', 'investing', 'symbol']
  },
  {
    id: 'exchangerate-api',
    name: 'ExchangeRate-API',
    description: 'Currency exchange rates with 160+ currencies. Free tier available with API key.',
    category: 'currency',
    baseUrl: 'https://v6.exchangerate-api.com/v6',
    endpoints: [
      {
        method: 'GET',
        path: '/{API_KEY}/latest/{BASE_CURRENCY}',
        description: 'Latest exchange rates',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '1,500 requests/month (free)',
    requiresKey: true,
    keySignupUrl: 'https://www.exchangerate-api.com',
    freeTier: '1500 requests/month',
    cors: 'yes',
    codeExample: `const apiKey = 'YOUR_API_KEY';
const response = await fetch(
  \`https://v6.exchangerate-api.com/v6/\${apiKey}/latest/USD\`
);
const data = await response.json();
console.log('EUR:', data.conversion_rates.EUR);
console.log('GBP:', data.conversion_rates.GBP);`,
    keywords: ['currency', 'exchange rate', 'forex', 'conversion', 'money']
  },
  {
    id: 'frankfurter',
    name: 'Frankfurter',
    description: 'Open-source currency data. No API key, no rate limits (be reasonable). Euro-based rates for 30+ currencies.',
    category: 'currency',
    baseUrl: 'https://api.frankfurter.app',
    endpoints: [
      {
        method: 'GET',
        path: '/latest?from=USD',
        description: 'Latest rates (from USD)',
        requiresAuth: false
      }
    ],
    rateLimit: 'Be reasonable',
    requiresKey: false,
    freeTier: 'All currencies, no limits',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.frankfurter.app/latest?from=USD');
const data = await response.json();
console.log('EUR:', data.rates.EUR);
console.log('GBP:', data.rates.GBP);`,
    keywords: ['currency', 'exchange rate', 'euro', 'forex', 'free']
  },
  {
    id: 'hunter',
    name: 'Hunter',
    description: 'Email hunter and verification. Find and validate professional email addresses.',
    category: 'email',
    baseUrl: 'https://api.hunter.io/v2',
    endpoints: [
      {
        method: 'GET',
        path: '/domain-search?domain={domain}&api_key={KEY}',
        description: 'Find emails by domain',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '100 searches/month (free)',
    requiresKey: true,
    keySignupUrl: 'https://hunter.io/api',
    freeTier: '100 searches/month',
    cors: 'yes',
    codeExample: `const apiKey = 'YOUR_API_KEY';
const response = await fetch(
  \`https://api.hunter.io/v2/domain-search?domain=stripe.com&api_key=\${apiKey}\`
);
const data = await response.json();
console.log(data.data.emails);`,
    keywords: ['email', 'verification', 'lead generation', 'domain search', 'contact']
  },
  {
    id: 'qrserver',
    name: 'QRServer',
    description: 'Generate QR codes on the fly. No API key, simple GET request returns image or JSON.',
    category: 'qr-codes',
    baseUrl: 'https://api.qrserver.com/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/create-qr-code/?size=300x300&data={encoded_data}',
        description: 'Generate QR code image',
        requiresAuth: false
      }
    ],
    rateLimit: 'Respectful usage',
    requiresKey: false,
    freeTier: 'Unlimited (with attribution)',
    cors: 'yes',
    codeExample: `const data = encodeURIComponent('https://example.com');
const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${data}\`;
// Use qrUrl as image src or fetch as blob`,
    keywords: ['qr code', 'qr', 'barcode', 'generator', 'scan']
  },
  {
    id: 'quickchart',
    name: 'QuickChart',
    description: 'Generate charts, QR codes, and waveforms. Supports Chart.js config for complex visualizations.',
    category: 'qr-codes',
    baseUrl: 'https://quickchart.io',
    endpoints: [
      {
        method: 'GET',
        path: '/chart?width=500&height=300&c={encoded_config}',
        description: 'Generate chart image',
        requiresAuth: false
      }
    ],
    rateLimit: '10,000/month (free)',
    requiresKey: false,
    freeTier: '10,000 charts/month',
    cors: 'yes',
    codeExample: `const config = {
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{ label: 'Revenue', data: [12, 19, 8, 15] }]
  }
};
const encoded = encodeURIComponent(JSON.stringify(config));
const chartUrl = \`https://quickchart.io/chart?c=\${encoded}\`;`,
    keywords: ['chart', 'qr code', 'graphs', 'visualization', 'bar chart', 'line chart']
  },
  {
    id: 'randomuser',
    name: 'RandomUser',
    description: 'Generate fake user data for testing. Names, photos, addresses, emails, and more.',
    category: 'random',
    baseUrl: 'https://randomuser.me/api',
    endpoints: [
      {
        method: 'GET',
        path: '/?results=10',
        description: 'Get 10 random users',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited fake user data',
    cors: 'yes',
    codeExample: `const response = await fetch('https://randomuser.me/api/?results=10');
const data = await response.json();
data.results.forEach(user => {
  console.log(user.name.first, user.email, user.picture.thumbnail);
});`,
    keywords: ['random', 'fake', 'test data', 'user', 'mock', 'dummy', 'placeholder']
  },
  {
    id: 'official-joke',
    name: 'Official Joke API',
    description: 'Programming jokes and general jokes by type. Simple, no frills, no API key.',
    category: 'random',
    baseUrl: 'https://official-joke-api.appspot.com',
    endpoints: [
      {
        method: 'GET',
        path: '/random_joke',
        description: 'Get a random joke',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/jokes/programming/random',
        description: 'Programming jokes only',
        requiresAuth: false
      }
    ],
    rateLimit: 'Respectful usage',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch('https://official-joke-api.appspot.com/random_joke');
const joke = await response.json();
console.log(\`\${joke.setup} - \${joke.punchline}\`);`,
    keywords: ['joke', 'fun', 'humor', 'programming', 'comedy', 'entertainment']
  },
  {
    id: 'gnews',
    name: 'GNews',
    description: 'News articles from worldwide sources. Topic and keyword search with images and metadata.',
    category: 'news',
    baseUrl: 'https://gnews.io/api/v4',
    endpoints: [
      {
        method: 'GET',
        path: '/top-headlines?topic={topic}&lang=en&token={TOKEN}',
        description: 'Top headlines by topic',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '100 requests/day (free)',
    requiresKey: true,
    keySignupUrl: 'https://gnews.io/',
    freeTier: '100 requests/day',
    cors: 'yes',
    codeExample: `const token = 'YOUR_API_TOKEN';
const response = await fetch(
  \`https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&token=\${token}\`
);
const data = await response.json();
data.articles.forEach(article => {
  console.log(article.title, article.url);
});`,
    keywords: ['news', 'articles', 'headlines', 'media', 'blog', 'content']
  },
  {
    id: 'datamuse',
    name: 'Datamuse',
    description: 'Word-finding query engine. Synonyms, antonyms, rhymes, word similarity, and more for NLP applications.',
    category: 'text',
    baseUrl: 'https://api.datamuse.com',
    endpoints: [
      {
        method: 'GET',
        path: '/words?rel_syn={word}',
        description: 'Synonyms',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/words?rel_rhy={word}',
        description: 'Rhymes',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.datamuse.com/words?rel_syn=happy');
const synonyms = await response.json();
console.log(synonyms.slice(0, 10));`,
    keywords: ['words', 'synonym', 'antonym', 'rhyme', 'nlp', 'text analysis', 'dictionary']
  },
  {
    id: 'lorem-picsum',
    name: 'Lorem Picsum',
    description: 'Placeholder images with specific dimensions. Random or fixed, grayscale option.',
    category: 'images',
    baseUrl: 'https://picsum.photos',
    endpoints: [
      {
        method: 'GET',
        path: '/400/300',
        description: 'Random 400x300 image',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited placeholder images',
    cors: 'yes',
    codeExample: `// Get a random image
const imageUrl = 'https://picsum.photos/800/600';
// Get a specific seeded image (always the same)
const seededUrl = 'https://picsum.photos/seed/post-1/800/600';
// Use as image src`,
    keywords: ['images', 'placeholder', 'random', 'stock', 'lorem', 'picsum']
  },
  {
    id: 'nasa-apod',
    name: 'NASA APOD',
    description: 'Astronomy Picture of the Day from NASA. Each day a different image, with detailed explanations.',
    category: 'government',
    baseUrl: 'https://api.nasa.gov',
    endpoints: [
      {
        method: 'GET',
        path: '/planetary/apod?api_key=DEMO_KEY',
        description: "Picture of the day",
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '40 requests/hour (DEMO_KEY)',
    requiresKey: true,
    keySignupUrl: 'https://api.nasa.gov/',
    freeTier: 'DEMO_KEY works, or get free key',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
);
const data = await response.json();
console.log(data.title);
console.log(data.url); // Image URL
console.log(data.explanation);`,
    keywords: ['nasa', 'space', 'astronomy', 'image', 'picture of the day', 'science']
  },
  {
    id: 'college-scorecard',
    name: 'College Scorecard',
    description: 'US government data on colleges: costs, admissions, earnings after graduation. No API key for basic use.',
    category: 'government',
    baseUrl: 'https://api.data.gov/ed/collegescorecard/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/schools?school.city=boston&fields=school.name,latest.student.enrollment&api_key=DEMO_KEY',
        description: 'Find schools by city',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '1000 requests/day (DEMO_KEY)',
    requiresKey: true,
    keySignupUrl: 'https://api.data.gov/signup',
    freeTier: '1000 requests/day',
    cors: 'yes',
    codeExample: `const apiKey = 'DEMO_KEY'; // Register for higher limits
const response = await fetch(
  \`https://api.data.gov/ed/collegescorecard/v1/schools?\`
  + \`school.city=boston&fields=school.name,latest.student.enrollment&api_key=\${apiKey}\`
);
const data = await response.json();
console.log(data.results);`,
    keywords: ['college', 'university', 'education', 'admissions', 'schools', 'government']
  },
  {
    id: 'dog-ceo',
    name: 'Dog CEO',
    description: 'Random dog images and breed list. Fun, simple, no API key required.',
    category: 'animals',
    baseUrl: 'https://dog.ceo/api',
    endpoints: [
      {
        method: 'GET',
        path: '/breeds/image/random',
        description: 'Random dog image',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/breeds/list/all',
        description: 'All dog breeds',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch('https://dog.ceo/api/breeds/image/random');
const data = await response.json();
console.log(data.message); // Image URL`,
    keywords: ['dog', 'dogs', 'animals', 'pet', 'random', 'image']
  },
  {
    id: 'cat-as-a-service',
    name: 'Cat as a Service',
    description: 'Random cat images with categories. Fun, no API key, supports text on images.',
    category: 'animals',
    baseUrl: 'https://cataas.com',
    endpoints: [
      {
        method: 'GET',
        path: '/cat',
        description: 'Random cat image',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch('https://cataas.com/cat');
const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);`,
    keywords: ['cat', 'cats', 'animals', 'pet', 'random', 'image']
  },
  {
    id: 'open-food-facts',
    name: 'Open Food Facts',
    description: 'Open database of food products worldwide. Barcode lookup, ingredients, nutrition facts.',
    category: 'food',
    baseUrl: 'https://world.openfoodfacts.org/api/v2',
    endpoints: [
      {
        method: 'GET',
        path: '/product/{barcode}.json',
        description: 'Get product by barcode',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'unknown',
    codeExample: `const barcode = '7622210449283';
const response = await fetch(
  \`https://world.openfoodfacts.org/api/v2/product/\${barcode}.json\`
);
const data = await response.json();
console.log(data.product.product_name);`,
    keywords: ['food', 'nutrition', 'barcode', 'product', 'ingredients', 'health']
  },
  {
    id: 'advice-slip',
    name: 'Advice Slip',
    description: 'Random advice and wisdom. Simple JSON API, no key required.',
    category: 'random',
    baseUrl: 'https://api.adviceslip.com',
    endpoints: [
      {
        method: 'GET',
        path: '/advice',
        description: 'Random advice',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.adviceslip.com/advice');
const data = await response.json();
console.log(data.slip.advice);`,
    keywords: ['advice', 'wisdom', 'random', 'motivation', 'quote']
  },
  {
    id: 'api-football',
    name: 'API-Football',
    description: 'Football/soccer data. Leagues, teams, fixtures, live scores, and statistics.',
    category: 'sports',
    baseUrl: 'https://v3.football.api-sports.io',
    endpoints: [
      {
        method: 'GET',
        path: '/leagues',
        description: 'List all leagues',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '100 requests/day (free trial)',
    requiresKey: true,
    keySignupUrl: 'https://www.api-football.com/',
    freeTier: '100 requests/day (needs signup)',
    cors: 'yes',
    codeExample: `const response = await fetch('https://v3.football.api-sports.io/leagues', {
  headers: { 'x-apisports-key': 'YOUR_API_KEY' }
});
const data = await response.json();
console.log(data.response);`,
    keywords: ['football', 'soccer', 'sports', 'league', 'team', 'score', 'fixture']
  },
  {
    id: 'restcountries',
    name: 'REST Countries',
    description: 'Information about all countries. Capital, population, currencies, languages, flags.',
    category: 'government',
    baseUrl: 'https://restcountries.com/v3.1',
    endpoints: [
      {
        method: 'GET',
        path: '/all?fields=name,capital,population',
        description: 'All countries basic info',
        requiresAuth: false
      },
      {
        method: 'GET',
        path: '/name/{country}',
        description: 'Search by name',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Unlimited',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://restcountries.com/v3.1/name/united%20states?fields=name,capital,population'
);
const data = await response.json();
console.log(data[0].capital, data[0].population);`,
    keywords: ['countries', 'country data', 'capital', 'population', 'flags', 'government']
  },
  {
    id: 'themoviedb',
    name: 'The Movie Database',
    description: 'Movies, TV shows, actors, reviews. Rich entertainment data with images.',
    category: 'movies',
    baseUrl: 'https://api.themoviedb.org/3',
    endpoints: [
      {
        method: 'GET',
        path: '/movie/popular?api_key={KEY}',
        description: 'Popular movies',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: '40 requests/10 seconds',
    requiresKey: true,
    keySignupUrl: 'https://www.themoviedb.org/documentation/api',
    freeTier: 'Free tier available',
    cors: 'yes',
    codeExample: `const apiKey = 'YOUR_API_KEY';
const response = await fetch(
  \`https://api.themoviedb.org/3/movie/popular?api_key=\${apiKey}\`
);
const data = await response.json();
data.results.forEach(movie => {
  console.log(movie.title, movie.vote_average);
});`,
    keywords: ['movies', 'films', 'tv', 'actors', 'entertainment', 'reviews']
  },
  {
    id: 'spotify',
    name: 'Spotify Web API',
    description: 'Music data, playlists, artists, albums, and audio features. OAuth2 required.',
    category: 'music',
    baseUrl: 'https://api.spotify.com/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/search?q={query}&type=track',
        description: 'Search tracks',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: 'Varies by endpoint',
    requiresKey: true,
    keySignupUrl: 'https://developer.spotify.com/',
    freeTier: 'OAuth2 with client credentials',
    cors: 'yes',
    codeExample: `const token = 'YOUR_ACCESS_TOKEN';
const response = await fetch(
  'https://api.spotify.com/v1/search?q=artist:Queen&type=track',
  { headers: { Authorization: \`Bearer \${token}\` } }
);
const data = await response.json();
console.log(data.tracks.items);`,
    keywords: ['music', 'spotify', 'artist', 'album', 'track', 'playlist', 'audio']
  },
  {
    id: 'jobs-api',
    name: 'Jooble',
    description: 'Job postings API. Search jobs by keyword, location, and other filters.',
    category: 'jobs',
    baseUrl: 'https://jooble.org/api',
    endpoints: [
      {
        method: 'POST',
        path: '/',
        description: 'Search jobs',
        requiresAuth: true,
        authType: 'api-key'
      }
    ],
    rateLimit: 'Varies',
    requiresKey: true,
    keySignupUrl: 'https://www.jooble.org/developers',
    freeTier: 'Free tier available',
    cors: 'yes',
    codeExample: `const response = await fetch('https://jooble.org/api/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keywords: 'software engineer',
    location: 'Dallas, TX'
  })
});
const jobs = await response.json();
console.log(jobs.jobs);`,
    keywords: ['jobs', 'employment', 'hiring', 'career', 'work', 'job board']
  },
  {
    id: 'cat-fact',
    name: 'Cat Fact API',
    description: 'Random cat facts. No API key, no rate limit for reasonable use.',
    category: 'animals',
    baseUrl: 'https://catfact.ninja',
    endpoints: [
      {
        method: 'GET',
        path: '/fact',
        description: 'Get a random cat fact',
        requiresAuth: false
      }
    ],
    rateLimit: '100 requests/hour',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'yes',
    codeExample: `const response = await fetch('https://catfact.ninja/fact');
const data = await response.json();
console.log(data.fact);`,
    keywords: ['cat', 'cats', 'animal', 'fact', 'pet', 'random']
  },
  {
    id: 'free-dictionary',
    name: 'Free Dictionary API',
    description: 'Comprehensive word definitions, phonetics, pronunciations, examples, and synonyms. No API key required.',
    category: 'text',
    baseUrl: 'https://api.dictionaryapi.dev/api/v2',
    endpoints: [
      {
        method: 'GET',
        path: '/entries/en/{word}',
        description: 'Get word definitions and data',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
const data = await response.json();
console.log(data[0].meanings[0].definitions[0].definition);`,
    keywords: ['dictionary', 'definition', 'word', 'thesaurus', 'phonetic', 'nlp', 'text']
  },
  {
    id: 'genderize',
    name: 'Genderize.io',
    description: 'Predict gender from a first name. Returns gender and probability score.',
    category: 'text',
    baseUrl: 'https://api.genderize.io',
    endpoints: [
      {
        method: 'GET',
        path: '/?name={name}',
        description: 'Predict gender from name',
        requiresAuth: false
      }
    ],
    rateLimit: '100,000 requests/month',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'yes',
    codeExample: `const response = await fetch('https://api.genderize.io/?name=michael');
const data = await response.json();
console.log(data.gender, data.probability);`,
    keywords: ['gender', 'name', 'prediction', 'identity', 'nlp']
  },
  {
    id: 'digimon-api',
    name: 'Digimon API',
    description: 'Complete Digimon database. Get character names, images, levels, and attributes.',
    category: 'gaming',
    baseUrl: 'https://digi-api.com/api/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/digimon?page=0&pageSize=1',
        description: 'Get paginated digimon list',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'yes',
    codeExample: `const response = await fetch('https://digi-api.com/api/v1/digimon?page=0&pageSize=1');
const data = await response.json();
console.log(data.content[0].name, data.content[0].images[0].href);`,
    keywords: ['digimon', 'anime', 'gaming', 'character', 'game']
  },
  {
    id: 'company-search-api',
    name: 'Company Search API',
    description: 'French business registry (SIREN). Search companies by name, get addresses, SIREN numbers, and business data.',
    category: 'company',
    baseUrl: 'https://recherche-entreprises.api.gouv.fr',
    endpoints: [
      {
        method: 'GET',
        path: '/search?q={query}&limit=1',
        description: 'Search French companies',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access to French business registry',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://recherche-entreprises.api.gouv.fr/search?q=amazon&limit=1'
);
const data = await response.json();
console.log(data.results[0].nom_raison_sociale);`,
    keywords: ['company', 'business', 'siren', 'france', 'registry', 'search']
  },
  {
    id: 'theaudiodb',
    name: 'TheAudioDB',
    description: 'Music metadata: artists, albums, tracks, lyrics. Free tier with community data.',
    category: 'music',
    baseUrl: 'https://www.theaudiodb.com/api/v1/json/2',
    endpoints: [
      {
        method: 'GET',
        path: '/search.php?s={artist}',
        description: 'Search by artist name',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited (community API)',
    requiresKey: false,
    freeTier: 'Free tier available',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay'
);
const data = await response.json();
console.log(data.artists[0].strArtist);`,
    keywords: ['music', 'artist', 'album', 'track', 'metadata', 'audio']
  },
  {
    id: 'dragon-ball-api',
    name: 'Dragon Ball API',
    description: 'Dragon Ball characters, transformations, planets, and lore. Free to use.',
    category: 'gaming',
    baseUrl: 'https://dragonball-api.com/api',
    endpoints: [
      {
        method: 'GET',
        path: '/characters?page=0&limit=1',
        description: 'Get paginated character list',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'yes',
    codeExample: `const response = await fetch(
  'https://dragonball-api.com/api/characters?page=0&limit=1'
);
const data = await response.json();
console.log(data.data[0].name);`,
    keywords: ['dragon ball', 'anime', 'gaming', 'character', 'transformation']
  },
  {
    id: 'anapioficeandfire',
    name: 'An Api Of Ice And Fire',
    description: 'Game of Thrones books, characters, houses, and regions. Complete ASOIAF data.',
    category: 'gaming',
    baseUrl: 'https://anapioficeandfire.com/api',
    endpoints: [
      {
        method: 'GET',
        path: '/books/1',
        description: 'Get book by ID',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access',
    cors: 'unknown',
    codeExample: `const response = await fetch('https://anapioficeandfire.com/api/books/1');
const data = await response.json();
console.log(data.name, data.authors[0]);`,
    keywords: ['game of thrones', 'got', 'asoiaf', 'fantasy', 'books', 'character']
  },
  {
    id: 'air-quality-open-meteo',
    name: 'Air Quality API (Open-Meteo)',
    description: 'European Air Quality Index, pollutants (PM2.5, O3, NO2), and pollen data. 11km resolution.',
    category: 'weather',
    baseUrl: 'https://air-quality-api.open-meteo.com/v1',
    endpoints: [
      {
        method: 'GET',
        path: '/air-quality?lat={lat}&lon={lon}&current=european_aqi',
        description: 'Current air quality for coordinates',
        requiresAuth: false
      }
    ],
    rateLimit: '10,000 requests/day',
    requiresKey: false,
    freeTier: 'Full access to air quality and pollen data',
    cors: 'unknown',
    codeExample: `const response = await fetch(
  'https://air-quality-api.open-meteo.com/v1/air-quality?lat=52.52&lon=13.41&current=european_aqi'
);
const data = await response.json();
console.log(data.current.european_aqi);`,
    keywords: ['air quality', 'aqi', 'pollution', 'pm25', 'ozone', 'weather', 'pollen']
  },
  {
    id: 'abhi-api-dare',
    name: 'Abhi Dare API',
    description: 'Truth or dare game prompts. Returns random dare challenges for games.',
    category: 'random',
    baseUrl: 'https://abhi-api.vercel.app/api/game',
    endpoints: [
      {
        method: 'GET',
        path: '/dare',
        description: 'Get a random dare prompt',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Free',
    cors: 'yes',
    codeExample: `const response = await fetch('https://abhi-api.vercel.app/api/game/dare');
const data = await response.json();
console.log(data.dare);`,
    keywords: ['truth', 'dare', 'game', 'party', 'prompt', 'random']
  },
  {
    id: 'elon-musk-api',
    name: 'Elon Musk API',
    description: 'Random Elon Musk news articles and tweets. Aggregated from various sources.',
    category: 'news',
    baseUrl: 'https://elonmu.sh/api',
    endpoints: [
      {
        method: 'GET',
        path: '/random',
        description: 'Get random Elon Musk news item',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Free',
    cors: 'unknown',
    codeExample: `const response = await fetch('https://elonmu.sh/api/random');
const data = await response.json();
console.log(data.content);`,
    keywords: ['elon', 'musk', 'news', 'twitter', 'tesla', 'spacex']
  },
  {
    id: 'celestrak',
    name: 'CelesTrak GP Data',
    description: 'Real-time satellite orbital data (TLE). Track ISS, Starlink, and other satellites.',
    category: 'science',
    baseUrl: 'https://celestrak.org/NORAD/elements',
    endpoints: [
      {
        method: 'GET',
        path: '/gp.php?GROUP=stations&FORMAT=json',
        description: 'Get ISS and stations orbital data',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Full access to orbital elements',
    cors: 'unknown',
    codeExample: `const response = await fetch(
  'https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json'
);
const data = await response.json();
console.log(data[0].OBJECT_NAME);`,
    keywords: ['satellite', 'tle', 'orbital', 'nasa', 'space', 'tracking', 'iss']
  },
  {
    id: 'footer-year',
    name: 'Footer Year API',
    description: 'Returns the current year as JSON. Useful for dynamic copyright year in footers.',
    category: 'random',
    baseUrl: 'https://getfullyear.com',
    endpoints: [
      {
        method: 'GET',
        path: '/api/year',
        description: 'Get current year',
        requiresAuth: false
      }
    ],
    rateLimit: 'Unlimited',
    requiresKey: false,
    freeTier: 'Free',
    cors: 'unknown',
    codeExample: `const response = await fetch('https://getfullyear.com/api/year');
const data = await response.json();
console.log(data.year);`,
    keywords: ['year', 'footer', 'date', 'copyright', 'utility']
  }
]

export function getApisByCategory(category: ApiCategory): ApiRecommendation[] {
  return apiDatabase.filter(api => api.category === category)
}

export function getAllCategories(): ApiCategory[] {
  return [...new Set(apiDatabase.map(api => api.category))]
}

export function getApiById(id: string): ApiRecommendation | undefined {
  return apiDatabase.find(api => api.id === id)
}
