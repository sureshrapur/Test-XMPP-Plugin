(function () {
        // store a reference to the application object that will be created
        // later on so that we can use it if need be
        var app = {
            data: {}
        };

        var bootstrap = function () {
            $(function () {
                app.mobileApp = new kendo.mobile.Application(document.body, {

                    // you can change the default transition (slide, zoom or fade)
                    transition: 'slide',
                    // comment out the following line to get a UI which matches the look
                    // and feel of the operating system
                    skin: 'flat',
                    // the application needs to know which view to load first
                    initial: 'home/view.html',
                    statusBarStyle: 'black-translucent'
                });
            });
        };

        var onDeviceReady = function () {

            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }

            bootstrap();                 
            var connection = new Strophe.Connection('tcp://sjs-ubuntu01.cloudapp.net') ;
            
            //var connection = new Strophe.Connection('tcp://104.215.199.141') ;
            connection.connect('testuser3@localhost', 'pwd', onConnectionCallback);
            
            
       
        };

        var onConnectionCallback = function (status) {
            alert(status);
            if (status == Strophe.Status.CONNECTED) {
                alert('XMPP connection successful!');

                connection.addHandler(on_chat_message, null, 'message', 'chat');
                connection.addHandler(on_presence, null, 'presence');
                connection.addHandler(on_error_iq, null, 'iq', 'error');

               connection.send($pres());
               
            }
        };

        var on_chat_message = function (stanza) {
            alert('New chat message from: ' + $(stanza).attr('from'))
        };

        var on_presence = function (stanza) {
            alert('Presence from contact: ' + $(stanza).attr('from'))
        };

        var on_error_iq = function (stanza) {
            $(stanza).find('error').each(function () {
                alert('Info query error code: ' + $(this).attr('code'))
            })
        };


        if (window.cordova) {
            // this function is called by Cordova when the application is loaded by the device
            /*            
                        document.addEventListener('deviceready', function () {
                            // hide the splash screen as soon as the app is ready. otherwise
                            // Cordova will wait 5 very long seconds to do it for you.
                            if (navigator && navigator.splashscreen) {
                                navigator.splashscreen.hide();
                            }

                            bootstrap();
                        }, false);
            */
            document.addEventListener('deviceready', onDeviceReady, false);

        } else {
            bootstrap();
        }

        window.app = app;
    }

)();