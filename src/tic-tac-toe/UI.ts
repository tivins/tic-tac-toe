import ticTacToeLogo from "./tic-tac-toe.svg";
import {TTTStatus} from "./TTTStatus.ts";
import {Intl} from "./../core/Intl.ts";

export class UI {
    nodesContainer:HTMLElement|null = null;
    winOverlay:HTMLElement|null = null;
    winButton:HTMLElement|null = null;
    gameInfo:HTMLElement|null = null;
    timer:HTMLElement|null = null;
    nodes:HTMLElement[] = [];
    log:HTMLElement|null = null;

    constructor(element:HTMLElement) {
        element!.innerHTML = this.getHTML();
        this.nodesContainer = document.getElementById('ttt-grid');
        this.winOverlay = document.getElementById('win-overlay');
        this.winButton = document.getElementById('win-button');
        this.gameInfo = document.getElementById('game-info');
        this.timer = document.getElementById('timer');
        this.log = document.getElementById('log');
        document.getElementById('btn-json')!.addEventListener('click', () => this.log!.classList.toggle('hidden'));
        const spans = this.nodesContainer?.querySelectorAll('span');
        if (spans) {
            for (let i=0;i<spans.length;i++) {
                this.nodes[i] = spans[i];
            }
        }
    }

    getHTML() {
        return `
        <div class="p-4">
            <div class="w-72 md:w-96 mx-auto mt-8">
                <div id="game-info" class=" border rounded shadow-sm p-4 mb-4 flex">
                    <img src="${ticTacToeLogo}" class="w-12 h-12 m-auto inline-block" alt="TicTacToe Logo"/>
                    <div class="flex-grow text-left pl-4">
                        <div class="font-semibold">Tic Tac Toe</div>
                        <div class="text-gray-400 text-sm flex">
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa-regular fa-fw fa-flag"></i> <span id="score-n"></span></div>
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa fa-fw fa-times"></i> <span id="score0"></span></div>
                            <div class="rounded bg-gray-200 mr-1 px-1"><i class="fa-regular fa-fw fa-circle"></i> <span id="score1"></span></div>
                            <div id="timer" class=" px-1">0:00</div>
                        </div>
                    </div>
                </div>
                
                <div id="win-button" class="border rounded shadow-sm mb-4 hidden">
                    <button class="rounded text-lg flex p-4">
                        <svg id="ico-won" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-12 h-12 m-auto">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        <svg id="ico-null" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 m-auto">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <div class="flex-grow text-left pl-4">
                            <div class="font-semibold message"></div>
                            <div class="text-sm">${Intl.get("play_again")}</div>
                        </div>
                    </button>
                </div>
                
                <div class="card border rounded shadow-sm p-8 relative">
                    <div id="ttt-grid" class="grid grid-cols-3 text-1xl gap-2">
                        <span data-index="0"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="1"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="2"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="3"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="4"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="5"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="6"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="7"><i class="fa fa-fw fa-times"></i></span>
                        <span data-index="8"><i class="fa fa-fw fa-times"></i></span>
                    </div>
                    <div id="win-overlay" class="absolute top-0 left-0 right-0 bottom-0 items-center justify-center hidden cursor-pointer"></div>
                <div id="log" 
                    class="hidden bg-white bg-opacity-75 backdrop-blur-lg overflow-y-auto absolute left-0 bottom-0 right-0 top-0 m-2 card border rounded shadow-inner p-4 text-sm font-mono whitespace-pre-wrap leading-4"></div>
                </div>
                <div class="border rounded shadow-sm mt-4 flex text-gray-400 text-sm">
                    <a href="https://github.com/tivins/tic-tac-toe" target="_blank" class="flex-grow px-2 py-1 hover:text-gray-500"><i class="fa-brands fa-github mr-2"></i>Source on GitHub</a>
                    <button id="btn-json" class="px-2 py-1 hover:text-gray-500"><i class="fa fa-code mr-2"></i>JSON</button>
                    <button id="btn-reset" class="px-2 py-1 hover:text-gray-500"><i class="fa fa-rotate mr-2"></i>Reset</button>
                </div>
            </div>
        </div>
        `
    }

    setTime(value:string) {
        if (this.timer) this.timer.innerText = value;
    }

    updateScores(scores:number[]) {
        document.getElementById('score-n')!.innerText = scores[0].toString();
        document.getElementById('score0')!.innerText = scores[1].toString();
        document.getElementById('score1')!.innerText = scores[2].toString();
    }

    queryCell(index:number) {
        return this.nodes[index];
    }

    setWinCell(winner: TTTStatus | null, indices: number[] | null) {
        if (indices !== null) {
            for (let i = 0; i < indices.length; i++) {
                const cell = this.queryCell(indices[i]);
                cell!.classList.add('finished');
                cell!.classList.toggle('win', winner === TTTStatus.X);
                cell!.classList.toggle('fail', winner !== TTTStatus.X);
            }
        }
    }

    updateWinButton(winner: TTTStatus|null) {
        let msg = "?";
        let classList = '';
        this.winButton!.querySelector('#ico-won')!.classList.add('hidden');
        this.winButton!.querySelector('#ico-null')!.classList.add('hidden');
        switch (winner) {
            case TTTStatus.None:
                msg = Intl.get("game_draw");
                classList = 'bg-gray-600 text-white';
                this.winButton!.querySelector('#ico-null')!.classList.remove('hidden');
                break
            case TTTStatus.X:
                msg = Intl.get("game_win");
                classList = 'bg-green-600 text-white';
                this.winButton!.querySelector('#ico-won')!.classList.remove('hidden');
                break
            case TTTStatus.O:
                msg = Intl.get("game_lost");
                classList = 'bg-red-800 text-white';
                this.winButton!.querySelector('#ico-null')!.classList.remove('hidden');
                break;
        }

        this.winButton!.querySelector('.message')!.innerHTML = msg;
        this.winButton!.querySelector('button')!.className = 'p-4 rounded text-lg flex w-full ' + classList;
    }

    setFinishState() {
        this.winOverlay!.classList.toggle('hidden', false);
        this.winButton!.classList.toggle('hidden', false);
        this.gameInfo!.classList.toggle('hidden', true);
    }

    reset() {
        this.winOverlay!.classList.toggle('hidden', true);
        this.winButton!.classList.toggle('hidden', true);
        this.gameInfo!.classList.toggle('hidden', false);
        this.setTime('0:00');
        this.nodes.forEach(cell => {
            cell.classList.remove('used', 'finished');
        });
    }

    setResetFunction(func:()=>void) {
        this.winButton!.addEventListener('click', func);
        this.winOverlay!.addEventListener('click', func);
        document.getElementById('btn-reset')!.addEventListener('click', func);
    }
}