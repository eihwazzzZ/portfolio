import { Action } from "./action";

export class Card {
    id: number;
    name: string;
    img: string;
    hp: string;
    actions: Action[];

    constructor(id: number, name: string, img: string, hp: number, actions: Action[]) {
      this.id = id;
      this.name = name;
      this.img = img;
      this.hp = `${hp} HP`;
      this.actions = actions;
    }
    
    getCardInfo(): string {
        const actionNames = this.actions.map(action => `${action.name} (${action.type})`).join(', ');
        return `Card: ${this.name}, HP: ${this.hp}, Actions: ${actionNames}`;
    }
}  