import { Controller } from '../lib/Controller';

export class LinterController extends Controller {

    static selector: string = '[data-js-lint]';

    constructor (element: HTMLElement) {
        super(element);
        console.log('LinterController initialized.');
    }
}
