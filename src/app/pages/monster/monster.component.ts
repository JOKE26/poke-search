import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule, PlayingCardComponent, MatButtonModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css',
})
export class MonsterComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private formValueSubscription: Subscription | null = null;

  private fb = inject(FormBuilder);

  private monsterService = inject(MonsterService);

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figcaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);

  monsterTypes = Object.values(MonsterType);

  monsterId = -1;

  routeSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.formValueSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(new Monster(), data);
      }
    );

    this.routeSubscription = this.route.params.subscribe((params) => {
      if (params['id']) {
        this.monsterId = parseInt(params['id']);
        const monsterFound = this.monsterService.get(this.monsterId);
        if (monsterFound) {
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.formValueSubscription?.unsubscribe;
    this.routeSubscription?.unsubscribe;
  }

  // next() {
  //   let nextId = this.monsterId() || 0;
  //   nextId++;
  //   this.router.navigate(['/monster/' + nextId]);
  // }

  submit(event: Event) {
    event.preventDefault();
    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  isFieldValid(name: string) {
    const formControl = this.formGroup.get(name);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }
}
