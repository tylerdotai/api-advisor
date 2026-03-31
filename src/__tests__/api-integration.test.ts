import { describe, it, expect } from 'vitest'
import integrationResults from '../../integration-test-results.json' assert { type: 'json' }

function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '... (truncated)'
}

interface TestResult { id: string; name: string; status: string; statusCode?: number; responseTime: number; hasValidData: boolean; dataFields: string[]; error?: string }

const results: TestResult[] = []

async function testApi(id: string, name: string, url: string, requiresKey: boolean, expectedFields?: string[]): Promise<TestResult> {
  const start = Date.now()
  try {
    const response = await fetch(url)
    const responseTime = Date.now() - start
    const text = await response.text()
    const statusCode = response.status

    if (!response.ok) {
      return { id, name, status: statusCode === 401 || statusCode === 403 || statusCode === 429 ? 'RED' : 'RED', statusCode, responseTime, hasValidData: false, dataFields: [], error: `HTTP ${statusCode}` }
    }

    let dataFields: string[] = []
    let hasValidData = false
    try {
      const json = JSON.parse(text)
      dataFields = Object.keys(json).slice(0, 10)
      hasValidData = expectedFields ? expectedFields.every(f => json[f] !== undefined) : Object.keys(json).length > 0
    } catch {
      hasValidData = text.length > 0
    }

    return { id, name, status: 'GREEN', statusCode, responseTime, hasValidData, dataFields }
  } catch (err) {
    return { id, name, status: 'RED', responseTime: Date.now() - start, hasValidData: false, dataFields: [], error: err instanceof Error ? err.message : 'Request failed' }
  }
}

// prettier-ignore
describe('API Integration Tests', () => {
  it('Open-Meteo', async () => {
    const result = await testApi('open-meteo', 'Open-Meteo', 'https://api.open-meteo.com/v1/forecast?latitude=32.76&longitude=-97.34&current_weather=true', false)
    results.push(result)
  })
  it('National Weather Service', async () => {
    const result = await testApi('nws', 'National Weather Service', 'https://api.weather.gov/points/32.76,-97.34', false)
    results.push(result)
  })
  it('OpenStreetMap Nominatim', async () => {
    const result = await testApi('nominatim', 'OpenStreetMap Nominatim', 'https://nominatim.openstreetmap.org/search?q=1600+Pennsylvania+Ave&format=json', false)
    results.push(result)
  })
  it('Zippopotam.us', async () => {
    const result = await testApi('zippopotam', 'Zippopotam.us', 'https://api.zippopotam.us/us/76101', false)
    results.push(result)
  })
  it('CoinGecko', async () => {
    const result = await testApi('coingecko', 'CoinGecko', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', false)
    results.push(result)
  })
  it('Alpha Vantage', async () => {
    const result = await testApi('alpha-vantage', 'Alpha Vantage', 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=test', false)
    results.push(result)
  })
  it('ExchangeRate-API', async () => {
    const result = await testApi('exchangerate-api', 'ExchangeRate-API', 'https://v6.exchangerate-api.com/v6/test/latest/USD', true)
    results.push(result)
  })
  it('Frankfurter', async () => {
    const result = await testApi('frankfurter', 'Frankfurter', 'https://api.frankfurter.app/latest?from=USD', false)
    results.push(result)
  })
  it('Hunter', async () => {
    const result = await testApi('hunter', 'Hunter', 'https://api.hunter.io/v2/domain-search?domain=stripe.com&api_key=test', true)
    results.push(result)
  })
  it('QRServer', async () => {
    const result = await testApi('qrserver', 'QRServer', 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fexample.com', false)
    results.push(result)
  })
  it('QuickChart', async () => {
    const result = await testApi('quickchart', 'QuickChart', 'https://quickchart.io/chart?width=500&height=300&c=http%3A%2F%2Fexample.com', false)
    results.push(result)
  })
  it('RandomUser', async () => {
    const result = await testApi('randomuser', 'RandomUser', 'https://randomuser.me/api/?results=10', false)
    results.push(result)
  })
  it('Official Joke API', async () => {
    const result = await testApi('official-joke', 'Official Joke API', 'https://official-joke-api.appspot.com/random_joke', false)
    results.push(result)
  })
  it('GNews', async () => {
    const result = await testApi('gnews', 'GNews', 'https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&token=test', true)
    results.push(result)
  })
  it('Datamuse', async () => {
    const result = await testApi('datamuse', 'Datamuse', 'https://api.datamuse.com/words?rel_syn=happy', false)
    results.push(result)
  })
  it('Lorem Picsum', async () => {
    const result = await testApi('lorem-picsum', 'Lorem Picsum', 'https://picsum.photos/400/300', false)
    results.push(result)
  })
  it('NASA APOD', async () => {
    const result = await testApi('nasa-apod', 'NASA APOD', 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', true)
    results.push(result)
  })
  it('College Scorecard', async () => {
    const result = await testApi('college-scorecard', 'College Scorecard', 'https://api.data.gov/ed/collegescorecard/v1/schools?school.city=boston&fields=school.name,latest.student.enrollment&api_key=DEMO_KEY', true)
    results.push(result)
  })
  it('Dog CEO', async () => {
    const result = await testApi('dog-ceo', 'Dog CEO', 'https://dog.ceo/api/breeds/image/random', false)
    results.push(result)
  })
  it('Cat as a Service', async () => {
    const result = await testApi('cat-as-a-service', 'Cat as a Service', 'https://cataas.com/cat', false)
    results.push(result)
  })
  it('Open Food Facts', async () => {
    const result = await testApi('open-food-facts', 'Open Food Facts', 'https://world.openfoodfacts.org/api/v2/product/7622210449283.json', false)
    results.push(result)
  })
  it('Advice Slip', async () => {
    const result = await testApi('advice-slip', 'Advice Slip', 'https://api.adviceslip.com/advice', false)
    results.push(result)
  })
  it('API-Football', async () => {
    const result = await testApi('api-football', 'API-Football', 'https://v3.football.api-sports.io/leagues', true)
    results.push(result)
  })
  it('REST Countries', async () => {
    const result = await testApi('restcountries', 'REST Countries', 'https://restcountries.com/v3.1/all?fields=name,capital,population', false)
    results.push(result)
  })
  it('The Movie Database', async () => {
    const result = await testApi('themoviedb', 'The Movie Database', 'https://api.themoviedb.org/3/movie/popular?api_key=test', true)
    results.push(result)
  })
  it('Spotify Web API', async () => {
    const result = await testApi('spotify', 'Spotify Web API', 'https://api.spotify.com/v1/search?q=queen&type=track', true)
    results.push(result)
  })
  it('Jooble', async () => {
    const result = await testApi('jobs-api', 'Jooble', 'https://jooble.org/api/', true)
    results.push(result)
  })
  it('Cat Fact API', async () => {
    const result = await testApi('cat-fact', 'Cat Fact API', 'https://catfact.ninja/fact', false)
    results.push(result)
  })
  it('Free Dictionary API', async () => {
    const result = await testApi('free-dictionary', 'Free Dictionary API', 'https://api.dictionaryapi.dev/api/v2/entries/en/happy', false)
    results.push(result)
  })
  it('Genderize.io', async () => {
    const result = await testApi('genderize', 'Genderize.io', 'https://api.genderize.io/?name=michael', false)
    results.push(result)
  })
  it('Digimon API', async () => {
    const result = await testApi('digimon-api', 'Digimon API', 'https://digi-api.com/api/v1/digimon?page=0&pageSize=1', false)
    results.push(result)
  })
  it('Company Search API', async () => {
    const result = await testApi('company-search-api', 'Company Search API', 'https://recherche-entreprises.api.gouv.fr/search?q=queen&limit=1', false)
    results.push(result)
  })
  it('TheAudioDB', async () => {
    const result = await testApi('theaudiodb', 'TheAudioDB', 'https://www.theaudiodb.com/api/v1/json/2/search.php?s=queen', false)
    results.push(result)
  })
  it('Dragon Ball API', async () => {
    const result = await testApi('dragon-ball-api', 'Dragon Ball API', 'https://dragonball-api.com/api/characters?page=0&limit=1', false)
    results.push(result)
  })
  it('An Api Of Ice And Fire', async () => {
    const result = await testApi('anapioficeandfire', 'An Api Of Ice And Fire', 'https://anapioficeandfire.com/api/books/1', false)
    results.push(result)
  })
  it('Air Quality API (Open-Meteo)', async () => {
    const result = await testApi('air-quality-open-meteo', 'Air Quality API (Open-Meteo)', 'https://air-quality-api.open-meteo.com/v1/air-quality?lat=32.76&lon=-97.34&current=european_aqi', false)
    results.push(result)
  })
  it('Abhi Dare API', async () => {
    const result = await testApi('abhi-api-dare', 'Abhi Dare API', 'https://abhi-api.vercel.app/api/game/dare', false)
    results.push(result)
  })
  it('Elon Musk API', async () => {
    const result = await testApi('elon-musk-api', 'Elon Musk API', 'https://elonmu.sh/api/random', false)
    results.push(result)
  })
  it('CelesTrak GP Data', async () => {
    const result = await testApi('celestrak', 'CelesTrak GP Data', 'https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&FORMAT=json', false)
    results.push(result)
  })
})