# Notes

## Waarom Angular?

- blijft ongeveer hetzelfde
- TypeScript-native
- gemaakt door Google en blijft nog wel even bestaan
- echt een framework, meer features
  - routing, formvalidatie, backendcommunicatie
- meer enterprise-focused
  - meer houvast voor technische invulling van project

Daar tegenover:

- meer features, dus het is wat groter
  - en daarmee ook steilere leercurve

### Angular vs the world

De grootste concurrenten zijn view libraries:

- React (Facebook)
- Vue (Evan You)
- Svelte (Rich Harris - Vercel)

En bieden out-of-the-box niks of niet veel voor dependency injection, formvalidatie, routing. Daar moet je aanvullende/andere libraries voor inzetten.

Iets meer werk, iets minder standaardisatie, wel meer controle.

## Package managers

- npm
  - heeft wat supply chain attacks issues de laatste tijd
- pnpm
  - performant npm: installeert packages sneller dmv concurrent downloads, geen faseringen en een globale cache
  - security: voert niet zomaar post-install scripts uit
- yarn

## Angular CLI

- `ng new <projectnaam>` - nieuw project aanmaken
- `ng build` - compileren
- `ng serve` - compileren en runnen van je app
- `ng test` - unittests draaien
- `ng generate service mijn` - iets genereren

## Pipes

```html
{{naam | uppercase}}
```

ingebouwde pipes:

- `uppercase`
- `lowercase`
- `titlecase`
- `number`
- `date`
- `currency`
- `async`
- `json` (debugging)

Output van linkerpipe is input voor rechterpipe:

```html 
{{nu | date: 'd-m-Y' | dinges | hoi | iets}}
```

Bijv.:

```html
{{mijnVar | date: 'd-m-Y' | empty }}
```

Garbage In Garbage Out: als jij als pipe niks met een value, wellicht een volgende pipe wel.

## Unittesten

Qua tooling:

- Karma/jasmine
  - sinds Angular's begin in 2016, v2
  - deprecated in ~2022? maar werd nog wel standaard meegeleverd t/m 2025
- Jest had een experimental runner sinds ~2023
- Vitest had een experimental runner sinds 2026 en werd later in het jaar als stable keuze verklaard
  - API lijkt heel erg op jasmine/jest

Test runner: `ng test`. Tests runnen buiten dat commando om met bijv. een Vitest-extensie in VS Code werkt momenteel nog niet, hopelijk zeer snel wel.

### Stryker

- mutation testing
- code muteren en dan alle testen op die gemuteerde versie van je broncode loslaten
  - als het goed is, faalt er minimaal 1 test
- het testen van je tests

```ts
if (bla < 'dkksdjhjksdhjkfsdhjksdfhjk') {}
if (getal > 4) {}

if (getal > 4000) {} // mutant die het overleeft
```

## Signals

- React's `useState()`, maar dan mooi
- haakt mooi op Angular's architectuur
- reactivity primitive
- voorbode om van zones af te gaan

Angular modules worden de laatste jaren omgeschreven naar signal-varianten:
- forms
- `HttpClient`  `httpResource()`
  - kleine note: `httpResource()` is momenteel enkel nog een signal-wrapper om `HttpClient`
- Routing - moet nog.

### Signals vs Observables

- signals default keuze
- zodra het te complex wordt: observables 
  - bijv. wanneer je meerdere streams van data wil mergen



## Forms

Meerdere soorten forms!

- Vanaf v2:
  - Reactive
    - template en formdefinitie gescheiden
      - `.html` `<input formControlName="name">`
      - `.ts`  `new FormGroup({ name: ... })`
    - `[formGroup]`  `new FormGroup()` `FormBuilder`
  - Template-driven
    - meest eenvoudig
    - alles in template, alles op 1 plek
    - `<input [(ngModel)]="name">`  - banana in a box syntax
      `<input [value]="name" (keydown)="name = event.value">`
- v21+
  - Signal-based

## Components

```ts
// wat Angular doet
let comp = new LifeComponent(); // triggert constructor
comp.message = domelement.getAttribute('message');
//...meer binding en init werk

comp.ngOnInit();
```


## Integratietesten

- groter dan een unittest
- afhankelijkheden meenemen in je test
  - sommige zaken worden nog steeds gemockt, hangt even van de test af
- unittest is zo klein mogelijk
  - afhankelijkheden mock je weg
  - andere classes
  - database
  - HTTP-request
  - HTML rendereren
    - wordt overigens vaak gewoon gezien als een unittest in frontendland

Angular biedt standaard ondersteuning voor integratietesten:

```ts
let fixture = TestBed.createComponent(Autocompleter);
let element = fixture.nativeElement.querySelector('.btn') as HTMLButtonElement;
element.dispatchEvent(new CustomEvent('click'));
```

Maar:
- minder elegant elementen querien, vooral heel veel `querySelector()`
  - zelf overal aangeven wat je queriet voor enigszins type-safety
- het is heel chirurgisch: met `dispatchEvent` kun je bijv. op gedisablede knoppen gewoon een `click`-event aftrappen
  ```ts
  let btn = document.querySelector('.btn');
  btn.disabled = true;
  btn.addEventListener('click', () => console.log('geklikt'));
  btn.dispatchEvent(new CustomEvent('click'));
  ```
- weerspiegelt de realiteit van hoe de gebruiker met jouw pagina/component omgaat minder

Pro tip: [Testing Library voor Angular](https://testing-library.com/docs/angular-testing-library) doet dat beter. Elementen op een accessible manier selecteren, minder chirurgisch events opgooien dankzij user-event, meer typesafety in de API dankzij de accessible roles van bijv. `screen.getByRole('...')`.


Cool: Vitest doet standaard de DOM wegmocken met JSDom. Je kan ook Vitest's "browser mode" activeren en dat je Playwright's browser gebruikt om je integratietest in een echte browser met echte rendering te testen. => https://cookbook.marmicode.io/angular/testing/vitest-browser-mode

