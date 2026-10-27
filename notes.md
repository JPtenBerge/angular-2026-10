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
