/**
 * The socket object is a singleton which provides the server connection
 *
 * @class Socket
 * @namespace Webster
 * @extends Ember.Object
 */
Webster.Socket = Ember.Object.create({

    /**
     * Determines the online state of the socket
     *
     * @type {boolean}
     * @property online
     */
    online: false,

    /**
     * @type {WebSocket}
     * @property socket
     */
    socket: null,

    /**
     * Opens the socket connection
     *
     * @method connect
     */
    connect: function(host, path) {
        var _this = this;
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        // if browser does not support WebSockets
        if (!window.WebSocket) {
            Ember.warn("Browser does not support WebSockets");
            return;
        }

        // create socket
        var socket = new WebSocket('ws://' + host + '/' + path);
        // bind event listeners
        socket.onopen = function () {
            _this.onOpen();
        };
        socket.onerror = function (error) {
            socket.close();
            _this.onError(error);
        };
        socket.onclose = function () {
            _this.onClose();
        };
        socket.onmessage = function (message) {
            _this.onMessage(message);
        };
        // set object property
        this.set('socket', socket);
    },

    /**
     * Sends a message
     *
     * @param message
     * @method sendMessage
     */
    sendMessage: function(message) {
        if(this.get('online')){
            this.get('socket').send(message);
        }
    },

    /**
     * @event onOpen
     */
    onOpen: function() {
        console.log('onOpen');
        this.set('online', true);
        Ember.Instrumentation.instrument("signal.connected");
    },

    /**
     * @event onError
     * @param error
     */
    onError: function(error) {
        Ember.warn("Socket error: " + error);
        console.dir(error);
        this.set('online', false);
    },

    /**
     * @event onClose
     */
    onClose: function() {
        this.set('online', false);
    },

    /**
     * @event onMessage
     * @param message
     */
    onMessage: function(message) {
        Webster.MessageProcessor.processIncoming(message);
    }
});