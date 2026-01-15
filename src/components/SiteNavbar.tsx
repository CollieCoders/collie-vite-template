import collieLogo from "../assets/collie-logo.svg";
import viteLogo from "../assets/Vite-logo.png";
import githubLogo from "../assets/github-logo.png";
import { CrateModal } from "./CrateModal";

export function SiteNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg px-2 py-1">
            <img
              src={collieLogo}
              alt="Collie logo"
              className="h-[50px] w-auto"
            />
            <span className="text-xl font-semibold text-slate-400">+</span>
            <img
              src={viteLogo}
              alt="Vite logo"
              className="h-[50px] w-auto"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CrateModal />
          <a
            href="https://github.com/CollieCoders/collie-vite-template"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the Collie Vite Template repository on GitHub"
            className="github-button rounded-lg p-2 transition hover:bg-slate-900/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <img
              src={githubLogo}
              alt="GitHub logo"
              className="h-[30px] w-auto"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
