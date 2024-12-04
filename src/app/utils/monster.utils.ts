export enum MonsterType {
  PLANT = 'plant',
  ELECTRIC = 'electric',
  FIRE = 'fire',
  WATER = 'water',
}

export interface IMonsterProperties {
  imageUrl: string;
  color: string;
}

export const MonsterTypeProperties: { [key: string]: IMonsterProperties } = {
  [MonsterType.PLANT]: {
    imageUrl: 'assets/bulbizarre.png',
    color: 'rgba(135, 255, 124)',
  },
  [MonsterType.ELECTRIC]: {
    imageUrl: 'assets/pikachu.png',
    color: 'rgba(255, 255, 104)',
  },
  [MonsterType.FIRE]: {
    imageUrl: 'assets/dracofeu.png',
    color: 'rgba(255, 104, 104)',
  },
  [MonsterType.WATER]: {
    imageUrl: 'assets/hypocean.png',
    color: 'rgba(118, 235, 255)',
  },
};
