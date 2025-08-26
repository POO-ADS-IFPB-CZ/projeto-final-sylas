import React from 'react';

function About() {
  return (
    <div className='About'>
      <h2>O Sylas</h2>
      <p>
        Sylas é um prjeto desenvovido para a disciplina de Programação Orientada 
        a Objetos do curso de Análise e Desenvolvimento de Sistemas do Instituto 
        Federal de Educação, Ciência e Tecnologia da Paraíba(IFPB).
      </p>

      <p>
        O objetivo final do Sylas é ser um sistema operacional completo em nuvem, podendo ser acessado
        de qualquer lugar com acesso a internet. O Sylas conta com um sistema de autenticação(atualmente apenas como prova de conceito),
        um sistema de arquivos, um editor de texto, um terminal, uma interface de interação com IA e uma interface gráfica.
      </p>
      <p>
        O projeto está em constante desenvolvimento e melhorias são feitas constantemente.
      </p>

      <h2>Desenvolvedores</h2>
      <ul>
        <li><a href="https://github.com/LhRaphael" target='_blank'>Rafael de Sousa</a></li>
        <li><a href="https://github.com/DreamEater360" target='_blank'>Francisco Erlyson</a></li>
        <li><a href="https://github.com/Samuelpuck5" target='_blank'>Samuel Videres</a></li>
        <li><a href="https://github.com/WashingtonWas" target='_blank'>Washington Júnior</a></li>
      </ul>
    </div>
  );
}

export default About;
