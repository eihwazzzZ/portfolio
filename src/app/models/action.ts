import { ActionType } from "./enums/action-type";

export interface Action {
    id: number;
    name: string;
    energyConsumption: number;
    damage: number;
    damageToSelf?: number;
    type: ActionType;
}