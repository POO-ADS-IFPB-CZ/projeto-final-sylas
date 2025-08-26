import React from 'react';

function Docs() {
  return (
    <div className="bg-slate-100/80 text-slate-800">
      {/* Main Container */}
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-6xl">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-4 border-b border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900">Documentação do Projeto Sylas</h1>
          <div className="relative mt-4 sm:mt-0">
            <select className="appearance-none w-full sm:w-auto bg-white border border-slate-300 text-slate-700 py-2 pl-4 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Português (BR)</option>
              <option>English (US)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </header>

        {/* Organization Section */}
        <section id="organizacao" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <i className="fas fa-sitemap text-xl text-blue-600"></i>
            Organização do Projeto
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <div className="flex items-center mb-4">
                <i className="fab fa-react text-3xl text-cyan-500 mr-4"></i>
                <h3 className="text-xl font-bold text-slate-800">Frontend</h3>
              </div>
              <p className="text-slate-600 mb-4">
                O frontend do projeto, localizado na pasta <code className="bg-slate-100 text-slate-800 font-mono text-sm px-2 py-1 rounded-md">'src'</code>, é construído com React.js.
              </p>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li><i className="fas fa-folder-open text-yellow-500 w-5 mr-1"></i> src/</li>
                <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> apps/ - <span className="text-slate-500">Aplicações interativas do sistema (IA, Shell).</span></li>
                <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> components/ - <span className="text-slate-500">Componentes reutilizáveis da interface.</span></li>
                <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> pages/ - <span className="text-slate-500">Páginas principais da aplicação.</span></li>
                <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> services/ - <span className="text-slate-500">Lógica de comunicação com o backend e gerenciamento de estado.</span></li>
                <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> styles/ - <span className="text-slate-500">Arquivos de estilização SCSS.</span></li>
                <li className="ml-4"><i className="fab fa-react text-cyan-400 w-5 mr-1"></i> App.js - <span className="text-slate-500">Arquivo principal que configura as rotas de navegação.</span></li>
                <li className="ml-4"><i className="fab fa-js-square text-yellow-400 w-5 mr-1"></i> index.js - <span className="text-slate-500">Ponto de entrada que renderiza a aplicação React.</span></li>
              </ul>
            </div>

            {/* Backend Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
                <div className="flex items-center mb-4">
                    <i className="fas fa-server text-2xl text-green-600 mr-4"></i>
                    <h3 className="text-xl font-bold text-slate-800">Backend</h3>
                </div>
                <p className="text-slate-600 mb-4">
                    O backend, localizado na pasta <code className="bg-slate-100 text-slate-800 font-mono text-sm px-2 py-1 rounded-md">'Backend'</code>, é desenvolvido em Java com o framework Spring Boot.
                </p>
                <ul className="space-y-2 text-slate-700 text-sm">
                    <li><i className="fas fa-folder-open text-yellow-500 w-5 mr-1"></i> Backend/</li>
                    <li className="ml-4"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> src/main/java/com/example/Backend/</li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> config/ - <span className="text-slate-500">Configurações de CORS, API Externa (Gemini) e Beans.</span></li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> controller/ - <span className="text-slate-500">Controladores REST que expõem os endpoints da API.</span></li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> model/ - <span className="text-slate-500">Classes de modelo (entidades) que representam os dados.</span></li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> repository/ - <span className="text-slate-500">Interfaces que definem o acesso ao banco de dados (MongoDB).</span></li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> service/ - <span className="text-slate-500">Camada de serviço que contém a lógica de negócio.</span></li>
                    <li className="ml-8"><i className="fas fa-folder text-yellow-500 w-5 mr-1"></i> utils/ - <span className="text-slate-500">Classes utilitárias, como a de criptografia de senhas.</span></li>
                    <li className="ml-8"><i className="fab fa-java text-orange-500 w-5 mr-1"></i> BackendApplication.java - <span className="text-slate-500">Classe principal que inicia a aplicação Spring Boot.</span></li>
                </ul>
            </div>
          </div>
        </section>

        {/* Route Mapping Section */}
        <section id="rotas" className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
            <i className="fas fa-route text-xl text-indigo-600"></i>
            Mapeamento de Rotas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Frontend Routes */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Frontend (React Router)</h3>
              <p className="text-slate-600 mb-4">As rotas do frontend são definidas no arquivo <code className="bg-slate-100 text-slate-800 font-mono text-sm px-2 py-1 rounded-md">src/App.js</code>.</p>
              <ul className="space-y-3 text-slate-700">
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/</code> - <strong>Página de Login</strong>: Renderiza o componente <code className="font-mono text-sm">Login</code>.</li>
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/create</code> - <strong>Página de Criação de Usuário</strong>: Renderiza o componente <code className="font-mono text-sm">CreateUser</code>.</li>
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/changePassword</code> - <strong>Página de Alteração de Senha</strong>: Renderiza o componente <code className="font-mono text-sm">ChangePassword</code>.</li>
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/home</code> - <strong>Página Principal</strong>: Renderiza o componente <code className="font-mono text-sm">Home</code> após o login.</li>
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/about</code> - <strong>Página Sobre</strong>: Renderiza o componente <code className="font-mono text-sm">About</code>.</li>
                <li><code className="font-mono text-sm p-1 rounded-md bg-blue-100 text-blue-800">/docs</code> - <strong>Página de Documentação</strong>: Renderiza este componente <code className="font-mono text-sm">Docs</code>.</li>
              </ul>
            </div>

            {/* Backend Routes */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Backend (Spring Boot API)</h3>
              <p className="text-slate-600 mb-4">Os endpoints da API são definidos nos controladores na pasta <code className="bg-slate-100 text-slate-800 font-mono text-sm px-2 py-1 rounded-md">Backend/controller/</code>.</p>
              
              <h4 className="font-semibold text-md text-slate-700 mt-4 mb-2">UserController.java (<code className="font-mono text-sm">/user</code>)</h4>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li><code className="font-mono bg-green-100 text-green-800">GET /</code>: Lista todos os usuários.</li>
                <li><code className="font-mono bg-green-100 text-green-800">GET /{`{userEmail}`}</code>: Busca dados de um usuário específico.</li>
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /</code>: Cria um novo usuário.</li>
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /changePassword</code>: Altera a senha de um usuário.</li>
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /login</code>: Autentica um usuário.</li>
              </ul>

              <h4 className="font-semibold text-md text-slate-700 mt-4 mb-2">ArchiveController.java (<code className="font-mono text-sm">/archives</code>)</h4>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li><code className="font-mono bg-green-100 text-green-800">GET /{`{dirId}`}</code>: Retorna um diretório específico.</li>
                <li><code className="font-mono bg-green-100 text-green-800">GET /listAll</code>: Lista todos os diretórios.</li>
                <li><code className="font-mono bg-green-100 text-green-800">GET /ls/{`{dirId}`}</code>: Lista o conteúdo de um diretório.</li>
                <li><code className="font-mono bg-green-100 text-green-800">GET /cd/{`{fatherId}`}/{`{dirId}`}</code>: Muda para um diretório.</li>
                <li><code className="font-mono bg-green-100 text-green-800">GET /getFile/{`{fileId}`}</code>: Retorna o conteúdo de um arquivo.</li>
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /mkDir/{`{dirId}`}</code>: Cria um novo diretório.</li>
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /saveFile/{`{dirId}`}</code>: Salva um arquivo em um diretório.</li>
                <li><code className="font-mono bg-red-100 text-red-800">DELETE /rmdir/{`{fatherId}`}/{`{dirId}`}</code>: Remove um diretório.</li>
              </ul>

              <h4 className="font-semibold text-md text-slate-700 mt-4 mb-2">GeminiController.java (<code className="font-mono text-sm">/api</code>)</h4>
              <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
                <li><code className="font-mono bg-yellow-100 text-yellow-800">POST /gerar</code>: Envia um prompt para a API do Google Gemini e retorna a resposta.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Module Description Section */}
        <section id="modulos">
            <h2 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center gap-3">
                <i className="fas fa-puzzle-piece text-xl text-purple-600"></i>
                Descrição dos Módulos
            </h2>

            {/* Backend Modules */}
           <div className="mb-12">
                <h3 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-3 flex items-center gap-3"><i className="fab fa-java text-2xl text-orange-500"></i> Backend (Java / Spring)</h3>
                
                <h4 className="text-lg font-semibold text-slate-700 mb-4 ml-4">#service</h4>
                <div className="grid md:grid-cols-2 gap-6 mb-8 pl-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">UserService.java</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Gerencia a lógica de negócio para usuários, incluindo criação, autenticação, busca de dados e alteração de senha. Utiliza <code className="font-mono text-sm">PasswordUtils</code> para criptografia.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">DirService.java</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Centraliza a lógica para manipulação de diretórios, como criação (incluindo o diretório raiz do usuário), listagem de conteúdo, navegação (cd) e remoção (rmdir).</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">FileService.java</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Responsável pela lógica de arquivos. Permite salvar novos arquivos, atualizar existentes e buscar arquivos pelo seu ID.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">GeminiService.java</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Atua como intermediário para a API do Google Gemini, recebendo o prompt do controlador e retornando a resposta de texto gerada.</p>
                    </div>
                </div>

                <h4 className="text-lg font-semibold text-slate-700 mb-4 ml-4">#model</h4>
                <div className="grid md:grid-cols-2 gap-6 mb-8 pl-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">User, UserCredentials, UserData</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Modelos para representar o usuário no banco de dados, as credenciais para login/alteração de senha e os dados do usuário enviados ao frontend.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">Dir, File, Signature</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Estruturas de dados para o sistema de arquivos. <code className="font-mono text-sm">Dir</code> e <code className="font-mono text-sm">File</code> são as entidades principais, enquanto <code className="font-mono text-sm">Signature</code> e suas subclasses (<code className="font-mono text-sm">DirSig</code>, <code className="font-mono text-sm">FileSig</code>) armazenam referências resumidas dentro de um diretório.</p>
                    </div>
                </div>
            </div>

            {/* Frontend Modules */}
            <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-6 border-b pb-3 flex items-center gap-3"><i className="fab fa-react text-2xl text-cyan-500"></i> Frontend (React)</h3>

                <h4 className="text-lg font-semibold text-slate-700 mb-4 ml-4">#services</h4>
                <div className="grid md:grid-cols-2 gap-6 mb-8 pl-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">UserProvider.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Gerencia o estado global do usuário (dados, diretório atual, histórico de navegação) usando o Context API do React. Disponibiliza o hook <code className="font-mono text-sm">useUser</code>.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">DisplayProvider.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Controla o estado da interface principal, gerenciando quais aplicativos estão ativos, minimizados ou maximizados. Disponibiliza o hook <code className="font-mono text-sm">useDisplay</code>.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">ShellFuncs.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Contém a implementação de todos os comandos do terminal (Shell), desde simples `echo` até operações complexas de arquivo como `mkdir` e `cd`, que fazem requisições à API backend.</p>
                    </div>
                </div>

                <h4 className="text-lg font-semibold text-slate-700 mb-4 ml-4">#apps</h4>
                <div className="grid md:grid-cols-2 gap-6 mb-8 pl-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">Shell.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Componente que renderiza a interface do terminal. Ele gerencia o input do usuário, o histórico de comandos e a exibição das saídas, utilizando as funções de <code className="font-mono text-sm">ShellFuncs.jsx</code>.</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">SyfileSH.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Um editor de texto simples integrado ao terminal. É ativado pelo comando `syfile` e permite salvar (Ctrl+S) ou sair (Ctrl+X), interagindo com o backend para persistir o conteúdo do arquivo.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h5 className="font-bold text-md mb-2">IA.jsx</h5>
                        <p className="text-sm text-slate-600"><strong>Descrição:</strong> Interface de chat para interação com a IA (Google Gemini). Envia os prompts do usuário para o endpoint <code className="font-mono text-sm">/api/gerar</code> e exibe a resposta formatada em Markdown.</p>
                    </div>
                </div>

                <h4 className="text-lg font-semibold text-slate-700 mb-4 ml-4">#components</h4>
                <div className="bg-white p-6 rounded-lg shadow-sm border mb-8 ml-4">
                    <h5 className="font-bold text-md mb-2">Componentes Principais</h5>
                    <p className="text-sm text-slate-600"><strong>Descrição:</strong> O diretório <code className="font-mono text-sm">components</code> contém elementos de UI reutilizáveis como <code className="font-mono text-sm">Header.jsx</code>, <code className="font-mono text-sm">Footer.jsx</code>, <code className="font-mono text-sm">Bar.jsx</code> (barra de aplicativos), <code className="font-mono text-sm">Display.jsx</code> (área de conteúdo principal) e <code className="font-mono text-sm">TitleApp.jsx</code> (barra de título das janelas dos aplicativos).</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
}

export default Docs;