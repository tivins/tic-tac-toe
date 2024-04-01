import './style.css'
import {TicTacToe} from "./tic-tac-toe/TicTacToe.ts";
import {TTTStatus} from "./tic-tac-toe/TTTStatus.ts";
import {UI} from "./tic-tac-toe/UI.ts";
import {Intl} from "./core/Intl.ts";

document.addEventListener('DOMContentLoaded', () => {

    if (window.navigator.language.substring(0,2) === "fr") {
        Intl.set("game_draw", "Match nul");
        Intl.set("play_again", "Cliquer pour rejouer");
        Intl.set("game_lost", "Vous avez perdu");
        Intl.set("game_win", "Vous &ecirc;tes vainqueur&nbsp;!");
    } else {
        Intl.set("game_draw", "Draw");
        Intl.set("play_again", "Click to play again");
        Intl.set("game_lost", "You've lost");
        Intl.set("game_win", "You are the winner!");
    }


    const ui = new UI(document.querySelector<HTMLDivElement>('#app')!);
    const scores = [0, 0, 0];
    const ticTacToe = new TicTacToe();

    ticTacToe.onPlayerTOPlay = () => {
        if (ticTacToe.winner !== null) {
            return;
        }
        const freeCells = ticTacToe.grid.getEmptyCellsIndices();
        if (freeCells.length === 1) {
            setUsed(ui.queryCell(freeCells[0]));
        }
    };
    ticTacToe.onIASelect = (index: number) => {
        setUsedDisplay(ui.queryCell(index));
    }
    ticTacToe.onFinish = (indices: number[] | null) => {
        ui.setWinCell(ticTacToe.winner!, indices);
        ui.updateWinButton(ticTacToe.winner);
        ui.setFinishState();
        scores[ticTacToe.winner ?? 0]++;
    };

    ui.nodes.forEach(cell => {
        cell.addEventListener('mouseover', () => {
            if (cell.classList.contains('used')) {
                return;
            }
            if (!ticTacToe.turnToX) {
                cell.firstElementChild!.className = 'fa-regular fa-fw fa-circle';
            } else {
                cell.firstElementChild!.className = 'fa fa-fw fa-times';
            }
        });
        cell.addEventListener('click', () => {
            if (cell.classList.contains('used') || !ticTacToe.turnToX) {
                return;
            }
            setUsed(cell);
            ticTacToe.toggleTurn();
        });
    });
    ui.setResetFunction(reset);
    ui.updateScores(scores);
    registerTimer();

    function reset() {
        ticTacToe.init();
        ui.updateScores(scores);
        ui.reset();
    }

    function registerTimer() {
        setInterval(() => {
            let diff = Math.floor((Date.now() - ticTacToe.start.getTime()) / 1000);
            const diffInMinutes = Math.floor(diff / 60);
            diff -= diffInMinutes * 60;
            ui.setTime(diffInMinutes + ':' + (diff < 10 ? '0' : '') + diff);

            if (ui.log) ui.log.innerHTML = JSON.stringify(ticTacToe.history,null,2);
        }, 1000);
    }

    function setUsedDisplay(cell: Element) {
        cell.classList.add('used');
        if (!ticTacToe.turnToX) {
            cell.firstElementChild!.className = 'fa-regular fa-fw fa-circle';
        }
    }

    function setUsed(cell: Element) {
        setUsedDisplay(cell);
        ticTacToe.setUsed(parseInt(cell.getAttribute('data-index') ?? ''), ticTacToe.turnToX ? TTTStatus.X : TTTStatus.O);
    }

});
