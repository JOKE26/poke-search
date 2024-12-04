import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  monsters: Monster[] = [];
  currentIndex: number = 1;

  constructor() {
    this.monsters = [];

    const monster1 = new Monster();
    monster1.name = 'pikachu';
    monster1.hp = 50;
    monster1.figcaption = 'N°001 Pikachu';
    this.monsters.push(monster1);
    const monster2 = new Monster();
    monster2.name = 'bulbizarre';
    monster2.image = 'assets/bulbizarre.png';
    monster2.type = MonsterType.PLANT;
    monster2.hp = 80;
    monster2.figcaption = 'N°002 Bulbizarre';
    this.monsters.push(monster2);
    const monster3 = new Monster();
    monster3.name = 'dracofeu';
    monster3.image = 'assets/dracofeu.png';
    monster3.type = MonsterType.FIRE;
    monster3.hp = 85;
    monster3.figcaption = 'N°003 Dracofeu';
    this.monsters.push(monster3);
    const monster4 = new Monster();
    monster4.name = 'hypocean';
    monster4.image = 'assets/hypocean.png';
    monster4.type = MonsterType.WATER;
    monster4.hp = 65;
    monster4.figcaption = 'N°004 Hypocean';
    this.monsters.push(monster4);
  }

  private save() {
    localStorage.setItem('monster', JSON.stringify(this.monsters));
  }

  private load() {
    const monsterData = localStorage.getItem('monsters');
    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) =>
        Object.assign(new Monster(), monsterJSON)
      );
      this.currentIndex = Math.max(
        ...this.monsters.map((monster) => monster.id)
      );
    }
  }

  getAll(): Monster[] {
    return this.monsters.map((monster) => monster.copy());
  }

  get(id: number): Monster | undefined {
    const monster = this.monsters.find((monster) => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster: Monster): Monster {
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;

    return monsterCopy;
  }

  update(monster: Monster): Monster {
    const monsterCopy = monster.copy();

    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === monster.id
    );
    if (monsterIndex != -1) {
      this.monsters[monsterIndex] = monsterCopy.copy();
    }

    return monsterCopy;
  }

  delete(id: number) {
    const monsterIndex = this.monsters.findIndex(
      (originalMonster) => originalMonster.id === id
    );
    if (monsterIndex != -1) {
      this.monsters.splice(monsterIndex, 1);
    }
  }
}
