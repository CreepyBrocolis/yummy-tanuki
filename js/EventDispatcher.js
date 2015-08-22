function EventDispatcher() {
    var map = {};

    var addEventListener = function (event, callback) {
        var eventCallbacks = map[event];

        if (eventCallbacks === undefined) {
            map[event] = [callback];
        } else {
            eventCallbacks.push(callback);
        }
    };

    var dispatch = function (event) {
        if (map[event] === undefined)
            return;

        map[event].forEach(function (callback) {
            callback();
        });
    };

    return {
        addEventListener: addEventListener,
        dispatchEvent: dispatch
    };
}