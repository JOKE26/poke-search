import { MonsterType } from '../utils/monster.utils';

export class Monster {
  id: number = -1;
  name: string = 'My Monster';
  image: string = 'assets/pikachu.png';
  type: MonsterType = MonsterType.ELECTRIC;
  hp: number = 40;
  figcaption: string = 'N°025';
  attackName: string = 'Geo Impact';
  attackStrength: number = 60;
  attackDescription: string =
    'This is a long description of a monster capacity. Probably something to do with electricity.';

  copy(): Monster {
    return Object.assign(new Monster(), this);
  }
}
