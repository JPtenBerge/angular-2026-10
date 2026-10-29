# Notes

## Paradigmas der webapplicaties

- **SPA - Single Page Application**
  - geen/heel weinig volledige paginarefreshes
  - content wordt vervangen met andere content
  - veel XHR/fetch/API calls naar backend
  - libs/frameworks: Angular Vue React Svelte Solid Qwik Lit Blazor
  - nadeel: SEO. bij een pure SPA ontvangt de browser in eerste instantie een kale, lege pagina met daarop wat JavaScript-scriptjes
    - bundle size - .js  Blazor 7MB "hello world"
  - hoog niveau van interactie/gebruiksvriendelijkheid
  - hip leuk
- **SSR - Server-side rendering**
  - altijd complementair aan de SPA
    - om de SEO te verbeteren.
    - om sneller de eerste pagina te tonen richting de gebruiker
  - de initiele pagina die men bezoekt wordt op de server gerenderd
    - op de achtergrond moet dan nog even al die .js scriptjes moeten nog worden opgestuurd
      => hydration. streaming hydration  progressive hydration
  - libs/frameworks: Next.js (React)  Nuxt.js (Vue)  @angular/ssr  ASP.NET Core  QwikCity SolidStart SvelteKit  htmx
  - complexiteit++
  - hip leuk
- **SSG - static site generator**
  - vooraf heul veul pagina's genereren
  - bol.com / wehkamp / amazon
    /product/375723848 => API product => database => template renderen met productinfo
    - pipeline   .html-bestandjes
  - libs/frameworks: Astro Gatsby Eleventy Next.js @angular/ssr
  - hip leuk
- **MPA - Multi Page Application**
  - content wordt op de server gerenderd
    - goed voor SEO
  - heel veel hyperlinkjes naar andere pagina's
    - soms complete form submits
  - heel veel full-pagina refreshes
  - libs/frameworks/platformen: ASP.NET WebForms/MVC/Core PHP Java Spring
  - niet hip

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

## Dependency injection

- een vorm van Inversion of Control
- het makkelijk kunnen injecteren van afhankelijkheden
- zodat je niet [                                    ] zo'n class hebt
- herbruikbaarheid
- flexibiliteit om andere implementaties erin te kunnen schuiven
- "low coupling, high cohesion"
- testbaarheid
  - mocken met name

### Wat voor services kun je zoal maken?

- DAL voor API calls
- businesslogica
- helper functions
- "code wegzetten"
- state bijhouden
  - store pattern

Maak een ContactService die de lijst van contacten bijhoudt en bijwerkt. Deze service injecteren bij zowel form als list en laten werken.

## Routing

SPA

1. alle templates van alle pagina's gewoon inladen in de DOM
    ```html
    <div id="page1" hidden>...</div>
    <div id="page2" hidden>...</div>
    <div id="page29">...</div>
    <div id="page45" hidden>...</div>
    <div id="page46" hidden>...</div>
    ```
2. alle templates van alle pagina's gewoon inladen in-memory
    ```ts
    let page1 = `...`;
    let page2 = `...`;
    let page3 = `...`;
    // ...
    let page61 = `...`;
    let page62 = `...`;
    let page63 = `...`;
    ```
3. paginatemplates ophalen wanneer de gebruiker ze wil bezoeken - "lazy loading"

Stappenplan routing doorvoeren:

1. routes  `"product/{id}"` => `ProductDetailsComponent`
2. `<router-outlet />` => waar iedere pagina z'n template in wordt gedumpt
3. alle content opsplitsen in pagina's
4. navigatiemenuutje maken

Verder, de router qua features:

- basic routing
- parameters  `/frameworks/:id`
- guards: afschermen van pagina's
- children
- resolvers
- let op: momenteel nog GEEN SIGNALS

## Observables

### Levels Observables begrijpen

1. Observables, `.subscribe()`, verschillende subjects, reactivity flow snappen
2. basic veelgebruikte operators: `map`, `filter`, `debounceTime`, `skip`/`take`/`first`/`last`/`min`/`max`/`count`
3. unittesten met observables: `of()`
4. samenwerken/synchronizeren/"wanneer wat" met promises/signals  `toSignal()`, `lastValueFrom()`
5. principes: geen `.subscribe()` in component (`| async` gebruiken), opruimen met `takeUntilDestroyed()` en `DestroyRef`
6. advanced operators en meerdere observables met elkaar mengen: `switchMap`, `mergeMap`, `iif`

## Hoe ververs ik mijn lijstje?

1. gewoon alles weer ophalen
   - traagste
   - wacht de POST af, daarna moet je een nieuwe GET afwachten
   - maximaal de server belasten
   - qua implementatie vaak het makkelijkst - `getAll()`
   - meest in sync met server
2. meteen toevoegen aan in-memory lijstje
   - geen id
   - kan heel gebruiksvriendelijk zijn. kost moeite.
   - heerlijk snel.
   - optimistic UI
3. respons van je POST gebruiken
   - redelijk in sync met server
   - redelijk snel
   - belast je server iets minder

Store pattern kan hier bij helpen. Meer nodig? State management library:

- ngrx
- ngxs

## Overig

- [RxMarbles](https://rxmarbles.com/), leuke visualisatie van RxJS operators
- [](https://softwaremill.com/learn-reactive-programming-with-rx-playground/)
- [ngx-oneforall](https://www.npmjs.com/package/ngx-oneforall), veel utilities, paar coole signals/services/validators.
  - heel weinig downloads, wellicht gewoon de broncode overnemen in je project ipv project als dependency opnemen
- [@signals-toolkit/core](https://dev.to/piipe800/i-built-a-utility-library-for-angular-signals-heres-what-i-learned-28e)
  - zelfde als hierboven, ook heel weinig downloads. Maar die `signalStorage()` klinkt mij bijv. als erg nuttig

### Playwright vs Cypress

Playwright:

- gratis / open source
- TypeScript volledig hand-in-hand
- chromium webkit firefox
- echte promises
- awaiten
- debugger
- fraaie UI mode `playwright test --ui`

Cypress:

- minder gratis / open source
- cy.get('https://mijndomein.nl')
- architectuur
  - hoeveel rijen heb ik nu in de tabel? => 3
  - form invullen [submit]
  - expect(aantalrijen).toBe(wathetnetwas + 1)
- Promises
  - await
- cy.get('element').should('haveq.text', 'Hoi')
- TypeScript ondersteuning is mwoa   .d.ts
- vroegah enkel Chromium
- hun testrunner met tijdreizen door de state van de UI is mooi
  - maar ook dat heeft Playwright inmiddels

### Object clonen in JavaScript

```ts
let clone1 = JSON.parse(JSON.stringify(this.newFramework)); // voor simpele objecten (wat door JSON ondersteund wordt, geen bigints/functies/DOM-objecten)
let clone2 = { ...this.newFramework }; // voor simpele objecten, let wel: dit maakt een shallow copy (nested objecten/arrays worden by reference overgenomen)
let besteClone = structuredClone(this.newFramework);
```
