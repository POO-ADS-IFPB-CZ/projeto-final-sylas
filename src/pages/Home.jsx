// Home.jsx
import React from 'react';
import { DisplayProvider, useDisplay } from '../services/DisplayProvider';
import { userNullVerify } from '../services/UserUpdate';
import Display from '../components/Display';
import Bar from '../components/Bar';
import IA from '../apps/IA';
import Shell from '../apps/Shell'; // Import the Shell app
import { useUser } from '../services/UserProvider';
import { useNavigate } from 'react-router-dom';

function HomeContent() {
  const { appsAtivos, appsMinimizados, appMaximizado } = useDisplay();

  return (
    <>
      <Display>
        {/* Carrega apps que estão minimizados em uma barra especifica */}
        <nav className={Object.values(appsMinimizados).some(v => v)? "minAppsBar":""}>
          {appsAtivos['IA'] && appsMinimizados['IA'] && <IA min={appsMinimizados['IA']}/>}
          {appsAtivos['Shell'] && appsMinimizados['Shell'] && <Shell min={appsMinimizados['Shell']}/>}
        </nav>

        {/* carrega apps normalmente */}
        {appsAtivos['IA'] && !appsMinimizados['IA'] && <IA max={appMaximizado['IA']}/>}
        {appsAtivos['Shell'] && !appsMinimizados['Shell'] && <Shell max={appMaximizado['Shell']}/>}

        {/* Adicione outros apps aqui conforme forem criados */}
      </Display>
      <Bar />
    </>
  );
}
function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userNullVerify(user.email)) {
      navigate('/'); // redireciona só depois do render inicial
    }
  }, [user, navigate]);

  if (userNullVerify(user.email)) {
    return (
      <main className="Home-main">
        <DisplayProvider>
          <HomeContent />
        </DisplayProvider>
      </main>
    );
  }

  // Retorna null enquanto redireciona
  return null;
}


export default Home;
