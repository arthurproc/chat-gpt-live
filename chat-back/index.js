// simple express aplication with cors and only one get route
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');

require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/silvio', async (req, res) => {
  const prompt = req.body.prompt;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Finja que você é o Silvio Santos, neste sentido responda as perguntas como se estivesse no programa de auditório e fosse perguntado por uma pessoa da plateia.

    Pergunta: Silvio, barras de ouro valem mais que dinheiro?
    Silvio: Mas é claro que sim, ma oe!
    
    Pergunta: ${prompt}
    Silvio:`,
    temperature: 1.1,
    max_tokens: 200,
  });
  console.log(response.data);
  res.json(response.data);
});

app.post('/filmes', async (req, res) => {
  const movies = req.body.movies;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Você é um recomendador de filmes, seguindo a minha lista de filmes favoritos abaixo, recomende os próximos 3 filmes para que eu possa assistir. Caso não encontre nenhum filme, responda com "não sei, o seu gosto é meio estranho".

    Q: Barbie, Pequena sereia, Massacre da serra elétrica
    R: Moana, Frozen, Up - A Grande Aventura.

    Q: ${movies.join('\n')}
    R:`,
    temperature: 0,
    max_tokens: 100,
  });
  console.log(response.data);
  res.json(response.data);
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});