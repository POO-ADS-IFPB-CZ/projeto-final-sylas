import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import TitleApp from '../components/TitleApp';
import { useDisplay } from '../services/DisplayProvider';

function IA({min, max}) {
  // Estado para armazenar o valor digitado no input
  const [prompt, setPrompt] = useState('');

  // Estado para exibir mensagens de sucesso ou erro
  const [mensagem, setMensagem] = useState('');

  // Estado para armazenar a resposta recebida da API
  const [resposta, setResposta] = useState(null);

  // Estado para indicar se a requisição está em andamento
  const [carregando, setCarregando] = useState(false);

  const {dialogIA, setDialogIA, ativoIA, setAtivoIA} = useDisplay(); // Hook para acessar o contexto de exibição

  // Função chamada ao clicar no botão "Enviar"
  const handleEnviar = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    // Impede envio se o campo estiver vazio ou só com espaços
    if (!prompt.trim()) return;

    // Inicia o estado de carregamento e limpa mensagens anteriores
    setCarregando(true);
    setMensagem('');
    setResposta(null);

    try {
      // Envia a requisição POST com o prompt como payload
      const resultado = await axios.post('http://127.0.0.1:8080/api/gerar', { prompt });
      setResposta(resultado.data);
      setDialogIA(prevDialog => [...prevDialog, prompt, resultado.data]); // Adiciona o prompt e a resposta ao diálogo
      setAtivoIA(true); // Define o app como ativo

    } catch (erro) {
      // Em caso de erro, mostra mensagem e loga o erro
      console.error(erro);
      setMensagem(`Erro ao enviar o prompt (${erro})`);
      
    } finally {
      // Finaliza o carregamento
      setCarregando(false);
      setPrompt(''); // Limpa o campo de input
      console.log('Dialog:', dialogIA); // Loga o diálogo para depuração
      console.log('Resposta:', resposta); // Loga a resposta para depuração
      console.log('Ativo:', ativoIA); // Loga o estado ativo para depuração
    }
  };

  return (
    <div className= {`IA-main-div ${min ? "minimized":""} ${max ? "maximized":""}`} >
      <TitleApp title="Sylas.IA" Id="IA"/>
      {/* Se houver mensagem de erro, exibe-a */}
      <section className='IA-content-div'>

        {mensagem && <div className='erro'>{mensagem}</div>}

        {(resposta || ativoIA) && dialogIA.map((item, index) => (
          <div key={index} className={index % 2 === 0 ? 'IA-prompt' : 'IA-resposta'}>
            <ReactMarkdown>{item}</ReactMarkdown>
          </div>
          
        ))}

      </section>
      {/* Formulário para enviar o prompt */}
      <form onSubmit={handleEnviar} className='IA-form'>
        <input type="text" value={prompt} onChange={(e)=> setPrompt(e.target.value)}/>
        <button type='submit' disabled={carregando}>
          {carregando ? 'Enviando...':'OK'}
        </button>
      </form>
    </div>
  );
}

export default IA;
