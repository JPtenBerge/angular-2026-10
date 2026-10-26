import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './pipes/euro.pipe';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { createFramework } from './factories/framework.factory';
import { Framework } from './entities/framework';

@Component({
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe,
    UpperCasePipe,
    LowerCasePipe,
    DatePipe,
    CurrencyPipe,
    EuroPipe,
    FormField,
  ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  naam = 'JP';
  naamSignal = signal('JP');

  newFramework = createFramework();
  frameworks: Framework[] = [
    {
      id: 4,
      name: 'Svelte',
      rating: 9.5,
      logoUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F1b%2FSvelte_Logo.svg%2F1280px-Svelte_Logo.svg.png&f=1&nofb=1&ipt=ad20d0c31bd8cdb5f363043859681163256767df93d12826839509afaeb6db6f&ipo=images',
    },
    {
      id: 8,
      name: 'Angular',
      rating: 8.5,
      logoUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gilsys.com%2F_astro%2Fangular-logo.CvhGd5ym.png&f=1&nofb=1&ipt=16b0619389fc96cf6db8e2d02bec3f7ff6df3905d05ee91cb9fb225b25567f64&ipo=images',
    },
    {
      id: 15,
      name: 'React',
      rating: 4,
      logoUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Freact-1-logo-png-transparent.png&f=1&nofb=1&ipt=8d8e4658ad2daa4de20ef33b1965a63a5ce192bc934e5fbe5661a3f33bc811f6&ipo=images',
    },
  ];

  addFrameworkForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      nonNullable: true,
    }),
    rating: new FormControl<number>(0, { nonNullable: true }),
    logoUrl: new FormControl<string>('', { nonNullable: true }),
  });

  addFrameworkValue = signal(createFramework());
  addFrameworkDef = form(this.addFrameworkValue, (p) => {
    required(p.name);
    pattern(p.name, /^[a-zA-Z0-9]+$/);
  });

  changeName() {
    setTimeout(() => {
      this.naamSignal.update((currentValue) => `${currentValue} Marnix`);
      this.naam += ' Marnix';
    }, 1000);
  }

  addFrameworkReactive() {
    let fullFramework: Framework = {
      id: 4,
      ...this.addFrameworkForm.getRawValue(),
    };
    this.frameworks.push(fullFramework);
    this.addFrameworkForm.reset();
  }

  addFrameworkTemplate(form: NgForm) {
    // newFramework clonen
    // let clone = JSON.parse(JSON.stringify(this.newFramework)); // voor simpele objecten (wat door JSON ondersteund wordt, geen bigints/functies/DOM-objecten)
    // let clone2 = { ...this.newFramework }; // voor simpele objecten / shallow copy
    let besteClone = structuredClone(this.newFramework);

    this.frameworks.push(besteClone);
    form.reset();
  }

  addFrameworkSignal() {
    let fullFramework: Framework = {
      // id: 4,
      ...this.addFrameworkValue(),
    };
    this.frameworks.push(fullFramework);
    this.addFrameworkValue.set(createFramework());
    this.addFrameworkDef().reset();
  }
}
