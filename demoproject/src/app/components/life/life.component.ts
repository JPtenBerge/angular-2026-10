import { Component, input, OnDestroy, OnInit } from "@angular/core";


@Component({
    selector: 'app-life',
    templateUrl: 'life.component.html'
})
export class LifeComponent implements OnInit, OnDestroy {
    intervalId!: number;
    message = input();

    constructor() {
        console.log('[life] constructor', this.message());
    }

    ngOnInit() {
        console.log('[life] ngOnInit', this.message());

        this.intervalId = setInterval(() => console.log('hallo vanaf interval!'), 1000)
    }

    ngOnDestroy() {
        console.log('[life] ngOnDestroy');

        clearInterval(this.intervalId);

        // memory leaks voorkomen??? / zooi opruimen
        // - subscriptions  .subscribe()
        // - .addEventListener()   .removeEventListener()
        // - files
        // - WebAssembly container?
        // - camera API
        // - bluetooth API
        // - indexed database
        // - websockets
        // - timeouts/intervals

    }
    
}