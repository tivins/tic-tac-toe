import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from './vite.svg'
import tailwindLogo from './tailwindcss.svg'
import { setupCounter } from './counter.ts'

function onStart() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="p-4">
    <h1 class="text-3xl border-b border-gray-300 px-4 py-2 my-4">Vite + TypeScript + Tailwind</h1>
    <div class="card">
      <button id="counter" type="button" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded "></button>
    </div>
    <div class="divide-x border-t mt-4 pt-4">
        <a href="https://vitejs.dev" target="_blank" class="p-2 inline-block">
          <img src="${viteLogo}" class="h-6" alt="Vite logo"/>
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" class="p-2 inline-block">
          <img src="${typescriptLogo}" class="h-6" alt="TypeScript logo" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" class="p-2 inline-block">
          <img src="${tailwindLogo}" class="h-6" alt="TailwindCSS logo" />
        </a>
    </div>
  </div>
`

    setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

}
document.addEventListener('DOMContentLoaded', () => onStart());
