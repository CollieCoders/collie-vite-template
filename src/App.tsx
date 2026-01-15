import "./App.css";
import { AdoptionShop } from "./components/AdoptionShop";
import { SiteNavbar } from "./components/SiteNavbar";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen w-full bg-slate-950 text-left text-slate-100">
        <SiteNavbar />
        <AdoptionShop />
      </div>
    </AppProvider>
  );
}

export default App;
