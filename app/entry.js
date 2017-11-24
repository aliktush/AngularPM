angular.module('aliktush', ['ui.router','ngCookies','ngAnimate','ui.bootstrap'])

    /**config*/
    .config(require('./config/routes.js'))
    

    /**services*/
    .service('Backend', require('./services/Backend.js'))

    /**factories*/
        
    /**directives*/

    /**filters*/



    .run(require('./run/Authentication.js')['view_restriction'])
;