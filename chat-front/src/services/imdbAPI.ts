// {
//   "searchType": "string",
//   "expression": "string",
//   "results": [
//     {
//       "id": "string",
//       "resultType": "string",
//       "image": "string",
//       "title": "string",
//       "description": "string"
//     }
//   ],
//   "errorMessage": "string"
// }

const API_TOKEN = import.meta.env.VITE_IMDB_API_KEY;

function extractTitles(response: any): string[] {
  const { results } = response;
  if (results && results.length > 0) {
    return results.map((result: any) => result.title);
  }
  return [];
}

export async function searchMovies(query: string): Promise<string[]> {
  const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${API_TOKEN}/${query}`);
  if (response.ok) {
    const data = await response.json();
    return extractTitles(data);
  }
  throw new Error('Network response was not ok.');
}
