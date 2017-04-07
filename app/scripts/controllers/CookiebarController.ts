import { Controller } from '../lib/Controller';

export class CookiebarController extends Controller {

    static selector: string = '[data-cookiebar]';
    private cookiebar: HTMLElement;
    private nav: HTMLElement;

    get isCookieSet() {
        return document.cookie.indexOf('cookieAccepted=true') >= 0;
    }

    constructor (element: HTMLElement) {
        super(element);
        this.cookiebar = this.$();
        this.nav = <HTMLElement>document.querySelector('.header__bar');
        this.initCookiebar();
    }

    initCookiebar() {
        if (!this.isCookieSet) {
            this.cookiebar.classList.remove('uk-hidden');
            this.$('[data-cookie-accept]')[0].addEventListener('click',
                (event: Event) => { event.preventDefault(); this.setCookie(); });
        }
    }

    onResize() {
        this.cookiebar.style.top = this.nav.offsetHeight + 'px';
    }

    setCookie() {
        let cookie = 'cookieAccepted=true;';
        let expires = '';
        let days = 365;
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = 'expires=' + date.toUTCString() + ';';

        let path = 'path=/';

        document.cookie = cookie + expires + path;
        /* example: cookieAccepted=true;expires=Sat, 23 Sep 2017 08:32:27 GMT;path=/ */

        this.cookiebar.classList.add('uk-hidden');
    }


    gaOptout() {
        const gaProperty = 'UA-XXXXXXXX-X';
        let disableStr = 'ga-disable-' + gaProperty;

        if (document.cookie.indexOf(disableStr + '=true') > -1) {
            window[disableStr] = true;
        }
        document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
        window[disableStr] = true;
    }
}
