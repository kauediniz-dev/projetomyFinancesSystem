import type { Movement } from "../Movement/Movement";

export interface BalaceProps {
    emitMovement: (movement: Movement) => void;
    currentBalance: number;
}