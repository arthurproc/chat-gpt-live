import React, { useState } from 'react';
import styles from './SilvioChat.module.css';
import { askToSilvio } from '../../services/chatAPI';

function SilvioChat() {
  const [entrada, setEntrada] = useState('');
  const [resposta, setResposta] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await askToSilvio(entrada);
    if (response) {
      setResposta(response);
    }
  };

  return (
    <div className="container">
      <form onSubmit={ handleSubmit } className={ styles.formContainer }>
        <h1>Pergunte alguma coisa para o silvio:</h1>
        <textarea
          className={ styles.textInput }
          rows={ 5 }
          name="entrada"
          placeholder="Silvio, o que você acha de..."
          value={ entrada }
          onChange={ (event) => setEntrada(event.target.value) }
        />
        <button type="submit">Enviar</button>
      </form>
      {
        resposta && (
          <div>
            <h2>Resposta:</h2>
            <p>{resposta}</p>
          </div>
        )
      }
    </div>
  );
}

export default SilvioChat;
