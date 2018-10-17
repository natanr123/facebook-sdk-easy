'use strict';
export default class Facebook {
    getScript() {
        return new Promise((resolve) => {
            if (window.FB) {
                resolve(window.FB);
            }

            const id = 'facebook-jssdk';
            const fjs = document.querySelectorAll('script')[0];
            if (document.getElementById(id)) {
                return;
            }

            const js = document.createElement('script');
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";

            js.addEventListener('load', () => {
                Object.assign(this, {
                    AppEvents: window.FB.AppEvents,
                    Canvas: window.FB.Canvas,
                    Event: window.FB.Event,
                    Frictionless: window.FB.Frictionless,
                    XFBML: window.FB.XFBML,
                });

                // console.log(this);

                resolve(window.FB);
            });

            fjs.parentNode.insertBefore(js, fjs);
        });
    }

    getScriptForPlugin() {
        return new Promise((resolve) => {
            if (window.FB) {
                resolve(window.FB);
            }

            const id = 'facebook-jssdk';
            const fjs = document.querySelectorAll('script')[0];
            if (document.getElementById(id)) {
                return;
            }

            const js = document.createElement('script');
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.1';

            js.addEventListener('load', () => {
                Object.assign(this, {
                    AppEvents: window.FB.AppEvents,
                    Canvas: window.FB.Canvas,
                    Event: window.FB.Event,
                    Frictionless: window.FB.Frictionless,
                    XFBML: window.FB.XFBML,
                });
                resolve(window.FB);
            });

            fjs.parentNode.insertBefore(js, fjs);
        });
    }

    init(params = {}) {
        return new Promise(async (resolve) => {
            FB.init(params);
            resolve(FB);
        });
    }

    api(...params) {
        return new Promise(async (resolve) => {
            const callback = (response) => {
                resolve(response);
            };

            if (params.length > 3) {
                params = params.slice(0, 3);
            }

            params.push(callback);

            FB.api(...params);
        });
    }

    ui(params) {
        return new Promise(async (resolve) => {
            FB.ui(params, (response) => {
                resolve(response);
            });
        });
    }

    getLoginStatus() {
        return new Promise(async (resolve) => {
            FB.getLoginStatus((response) => {
                resolve(response);
            });
        });
    }

    login(params = { scope: '' }) {
        return new Promise(async (resolve) => {
            FB.login((response) => {
                resolve(response);
            }, params);
        });
    }

    logout() {
        return new Promise(async (resolve) => {
            FB.logout((response) => {
                resolve(response);
            });
        });
    }

    getAuthResponse() {
        return new Promise(async (resolve) => {
            resolve(FB.getAuthResponse());
        });
    }

    me() {
        return new Promise(async (resolve) => {
            const me = await this.api('/me?fields=name,email,gender,verified,link');

            resolve(me);
        });
    }
}
