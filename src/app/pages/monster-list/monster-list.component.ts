import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MonsterType } from '../../utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster-list',
  standalone: true,
  imports: [CommonModule, PlayingCardComponent, SearchBarComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css',
})
export class MonsterListComponent {
  monsters = signal<Monster[]>([]);
  search = model('');

  private router = inject(Router);

  private monsterService = inject(MonsterService);

  filteredMonsters = computed(() => {
    return this.monsters().filter((monster) =>
      monster.name.includes(this.search())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addMonster() {
    this.router.navigate(['monster']);
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster', monster.id]);
  }
}
