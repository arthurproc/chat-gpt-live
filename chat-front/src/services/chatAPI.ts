const URL = 'http://localhost:3000';

// {
//   "id": "cmpl-7Ku6Np8PLVzTlDV7ozFgWQvOK5a5w",
//   "object": "text_completion",
//   "created": 1685216571,
//   "model": "text-davinci-003",
//   "choices": [
//       {
//           "text": " É pra desenhar a bola, é pra desenhar a bola!",
//           "index": 0,
//           "logprobs": null,
//           "finish_reason": "stop"
//       }
//   ],
//   "usage": {
//       "prompt_tokens": 119,
//       "completion_tokens": 18,
//       "total_tokens": 137
//   }
// }

function extractChoice(response: any): string | null {
  const { choices } = response;
  if (choices && choices.length > 0) {
    return choices[0].text;
  }
  return null;
}

export async function askToSilvio(question: string): Promise<string | null> {
  const response = await fetch(`${URL}/silvio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: question }),
  });

  if (response.ok) {
    const data = await response.json();
    return extractChoice(data);
  }

  throw new Error('Network response was not ok.');
}

export async function recommentMovie(favoriteMovies: string[]): Promise<string[]> {
  const response = await fetch(`${URL}/filmes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movies: favoriteMovies }),
  });

  if (response.ok) {
    const data = await response.json();
    const choice = extractChoice(data);
    if (choice) {
      return choice.split(',');
    }
  }

  throw new Error('Network response was not ok.');
}
