### Observação
  Este repositório é uma cópia de outro repositório já existente, localizado em https://github.com/LhRaphael/Sylas-java as alterações foram feitas no mesmo, esté é apenas o resultado final pois houve descuido dos participantes em notar que deveria haver um time no github classroom. No entanto, todos participaram da criação do projeto.

# Sylas - Sistema Operacional em Nuvem

Sylas é um projeto de sistema operacional completo baseado na web, desenvolvido como um trabalho acadêmico para a disciplina de Programação Orientada a Objetos. O objetivo é fornecer um ambiente de desktop acessível de qualquer lugar, com sistema de arquivos, aplicações interativas e uma interface gráfica intuitiva.

## ✨ Principais Funcionalidades

* **🖥️ Interface Gráfica Web:** Ambiente de desktop com janelas, barra de tarefas e aplicativos que podem ser abertos, minimizados e maximizados.

* **👤 Autenticação de Usuário:** Sistema completo de criação de conta, login e alteração de senha, com senhas criptografadas no backend.

* **🗂️ Sistema de Arquivos Virtual:** Cada usuário possui um diretório raiz onde pode criar, remover e navegar por diretórios, além de criar e editar arquivos de texto.

* **⌨️ Terminal Interativo (Shell):** Um aplicativo de terminal com suporte a comandos como:

  * `ls`: Listar arquivos e diretórios.

  * `cd`: Navegar entre diretórios.

  * `mkdir`: Criar novos diretórios.

  * `rmdir`: Remover diretórios.

  * `syfile`: Abrir um editor de texto para criar ou modificar arquivos.

  * `cat`: Exibir o conteúdo de um arquivo.

  * `calc`: Realizar cálculos matemáticos complexos.

  * E outros como `echo`, `clear`, `pwd` e `exit`.

* **🤖 Integração com IA:** Um aplicativo de chat que se conecta à API do Google Gemini para responder a prompts de texto.

* **📄 Documentação Integrada:** Uma página de documentação dentro do próprio projeto para fácil consulta.

## 🛠️ Tecnologias Utilizadas

### Backend

* **Java 17+**

* **Spring Boot:** Framework principal para a construção da API REST.

* **MongoDB:** Banco de dados NoSQL para persistência de dados de usuários, diretórios e arquivos.

* **Spring Data MongoDB:** Para facilitar o acesso aos dados.

* **Spring Security (BCrypt):** Para a criptografia de senhas.

* **Lombok:** Para reduzir código boilerplate em modelos e outras classes.

### Frontend

* **React.js:** Biblioteca para a construção da interface de usuário.

* **React Router:** Para o gerenciamento de rotas e navegação na aplicação.

* **Axios:** Para realizar requisições HTTP ao backend.

* **SCSS/Sass:** Para estilização avançada e organizada dos componentes.

* **Nerdamer:** Biblioteca para processamento de cálculos matemáticos no terminal.


