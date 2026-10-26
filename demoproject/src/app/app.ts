import { CurrencyPipe, DatePipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EuroPipe } from './pipes/euro.pipe';

@Component({
  imports: [RouterOutlet, UpperCasePipe, LowerCasePipe, DatePipe, CurrencyPipe, EuroPipe],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  naam = 'JP';
  naamSignal = signal('JP');

  nu = new Date('2026-10-26');
  prijs = 12345678.9;
  // nuImproved = Temporal.PlainDate.from('');

  getal = signal(42);
  dubbeleGetal = computed(() => this.getal() * 2);

  frameworks = [
    { id: 4, name: 'Svelte', rating: 9.5, logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F1b%2FSvelte_Logo.svg%2F1280px-Svelte_Logo.svg.png&f=1&nofb=1&ipt=ad20d0c31bd8cdb5f363043859681163256767df93d12826839509afaeb6db6f&ipo=images' },
    { id: 8, name: 'Angular', rating: 8.5, logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.gilsys.com%2F_astro%2Fangular-logo.CvhGd5ym.png&f=1&nofb=1&ipt=16b0619389fc96cf6db8e2d02bec3f7ff6df3905d05ee91cb9fb225b25567f64&ipo=images' },
    { id: 15, name: 'React', rating: 4, logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.freebiesupply.com%2Flogos%2Flarge%2F2x%2Freact-1-logo-png-transparent.png&f=1&nofb=1&ipt=8d8e4658ad2daa4de20ef33b1965a63a5ce192bc934e5fbe5661a3f33bc811f6&ipo=images' },
  ];

  constructor() {
    effect(() => {
      console.log('dubbel getal veranderd:', this.dubbeleGetal());
    })
  }

  changeName() {
    setTimeout(() => {
      this.naamSignal.update(currentValue => `${currentValue} Marnix`);
      this.naam += ' Marnix';
    }, 1000);
  }

  updater() {

  }
}
