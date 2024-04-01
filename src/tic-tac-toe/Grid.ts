import {TTTStatus} from "./TTTStatus.ts";

export class Grid {
    strict: boolean;
    cells: number[] = [];

    constructor(strict: boolean) {
        this.init();
        this.strict = strict;
    }

    cloneFrom(anotherGrid: Grid) {
        this.cells = [...anotherGrid.cells]
    }

    init() {
        for (let i = 0; i < 9; i++) {
            this.cells[i] = TTTStatus.None;
        }
    }

    getAt(index: number): TTTStatus {
        return this.cells[index];
    }

    setAt(index: number, by: TTTStatus) {
        if (this.strict && this.cells[index] !== TTTStatus.None) {
            throw Error("Cell is already used");
        }
        this.cells[index] = by;
    }

    isFull(): boolean {
        return this.getEmptyCellsIndices().length === 0;
    }

    getEmptyCellsIndices(): number[] {
        const emptyIndices: number[] = [];
        for (let i = 0; i < 9; i++) {
            if (this.cells[i] === TTTStatus.None) {
                emptyIndices.push(i);
            }
        }
        return emptyIndices;
    }

    /**
     * @return An array with the 3 winning indices, or null otherwise.
     */
    findSuccess() {
        const checks = [[0, 1, 2], // row1
            [3, 4, 5], // row2
            [6, 7, 8], // row3
            [0, 3, 6], // col1
            [1, 4, 7], // col2
            [2, 5, 8], // col3
            [0, 4, 8], // diag1
            [2, 4, 6], // diag2
        ];
        // for each case above,
        for (let i = 0; i < checks.length; i++) {
            // if the 3 values are equals and not 'none',
            if (this.cells[checks[i][0]] != TTTStatus.None &&
                this.cells[checks[i][0]] === this.cells[checks[i][1]] &&
                this.cells[checks[i][1]] === this.cells[checks[i][2]]) {
                return checks[i];
            }
        }
        return null;
    }
}