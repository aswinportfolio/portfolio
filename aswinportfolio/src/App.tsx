import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LandingChip } from './components/LandingChip';
import { ModuleDrawer } from './components/ModuleDrawer';
import { SocFloorplan } from './components/SocFloorplan';
import { ModuleId } from './data/socData';

export default function App() {
  const [view, setView] = useState<'landing' | 'inside'>(() =>
    window.location.hash === '#chip' ? 'inside' : 'landing'
  );
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#chip') {
        setView('inside');
      } else if (!window.location.hash || window.location.hash === '#package') {
        setView('landing');
        setActiveModule(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const enterChip = () => {
    setView('inside');
    window.history.replaceState(null, '', '#chip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToPackage = () => {
    setActiveModule(null);
    setView('landing');
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModule = (id: ModuleId) => {
    if (view !== 'inside') {
      setView('inside');
      window.history.replaceState(null, '', '#chip');
    }
    setActiveModule(id);
  };

  return (
    <div className="silicon-grid-bg min-h-screen flex flex-col bg-[#070A0F] text-[#F4F7FB]">
      <Header
        view={view}
        activeModule={activeModule}
        onSelectHome={returnToPackage}
        onEnterChip={enterChip}
        onOpenModule={openModule}
      />

      <main className="flex flex-1 flex-col print:hidden">
        {view === 'landing' ? (
          <LandingChip onEnterChip={enterChip} />
        ) : (
          <SocFloorplan activeModule={activeModule} onSelectModule={openModule} />
        )}
      </main>

      <Footer />

      <ModuleDrawer
        moduleId={activeModule}
        onClose={() => setActiveModule(null)}
        onNavigateModule={(id) => setActiveModule(id)}
      />
    </div>
  );
}
