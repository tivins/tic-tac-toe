import {Grid} from "./Grid.ts";
import {TTTStatus} from "./TTTStatus.ts";

class HistoryItem {
    time:number;
    index:number;
    by:TTTStatus;
    constructor(time:number,index:number,by:TTTStatus) {
        this.time = time;
        this.index = index;
        this.by = by;
    }
}

class History {
    date: Date = new Date();
    ended: Date|null = null;
    status: TTTStatus|null = null;
    items: HistoryItem[] = [];
    uid: string = "";
    constructor() {
        this.uid = crypto.randomUUID();
    }
}

export class TicTacToe {
    grid = new Grid(true);
    turnToX: boolean = true;
    winner: TTTStatus | null = null;
    start: Date = new Date();
    history: History = new History();

    onFinish: (index: number[] | null) => void = () => {};
    onIASelect: (index: number) => void = () => {};
    onPlayerTOPlay: () => void = () => {};

    constructor() {
        this.init();
    }

    public init() {
        this.grid.init();
        this.winner = null;
        this.turnToX = true;
        this.start = new Date();
        this.history = new History();
    }

    /**
     * Check success on the real grid and trigger callbacks if needed.
     * Update the game to "finished" state if a success was found.
     */
    checkSuccess() {
        const wonIndices = this.grid.findSuccess();
        if (wonIndices !== null) {
            this.winner = this.grid.getAt(wonIndices[0]);
            this.history.ended = new Date();
            this.history.status = this.winner;
            this.onFinish(wonIndices);
        }
        else if (this.grid.isFull()) {
            this.winner = TTTStatus.None;
            this.history.ended = new Date();
            this.history.status = this.winner;
            this.onFinish(null);
        }
    }

    setUsed(index: number, by: TTTStatus) {
        this.grid.setAt(index, by);
        this.history.items.push(new HistoryItem(Date.now()-this.start.getTime(), index, by))
        this.checkSuccess();
    }

    toggleTurn() {
        if (this.winner !== null) {
            return;
        }
        this.turnToX = !this.turnToX;
        if (!this.turnToX) {
            const iaSelect = this.iaPlay();
            this.setUsed(iaSelect, TTTStatus.O);
            this.onIASelect(iaSelect);
            this.turnToX = !this.turnToX;
            if (this.winner !== null) {
                return;
            }
            this.onPlayerTOPlay();
        }
    }

    private iaPlay() {
        const tmpGrid = new Grid(false);
        tmpGrid.cloneFrom(this.grid);
        // Check for WON direct
        for (let i = 0; i < 9; i++) {
            if (tmpGrid.getAt(i) == TTTStatus.None) {
                tmpGrid.setAt(i, TTTStatus.O);
                if (tmpGrid.findSuccess()) {
                    return i;
                }
                tmpGrid.setAt(i, TTTStatus.None);
            }
        }
        // Check for avoid to LOOSE
        for (let i = 0; i < 9; i++) {
            if (tmpGrid.getAt(i) == TTTStatus.None) {
                tmpGrid.setAt(i, TTTStatus.X);
                if (tmpGrid.findSuccess()) {
                    return i;
                }
                tmpGrid.setAt(i, TTTStatus.None);
            }
        }
        const emptyIndices = this.grid.getEmptyCellsIndices();
        if (emptyIndices.indexOf(4) !== -1) return 4;
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
}