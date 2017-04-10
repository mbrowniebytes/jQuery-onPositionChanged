
;(function($, window, document, undefined) {

    var pluginName = "onPositionChanged";
    var version = "0.1.0";

    //
    // plugin + defaults
    //
    var Plugin = function(element, options) {
        this.id = element.attr('id');
        this.element = element;
        this.opts = {
            interval: 250,
            changed: null,
        };

        this.lastPos = null;
        this.lastOff = null;

        this.newPos = null;
        this.newOff = null;

        this.timeouts = {monitor:{delay:null, handle:null}};

        this.init(options);

        this.monitor();
    };


    //
    // public methods
    //
    Plugin.prototype = {
        /**
         * initialize plugin
         *
         * @param object options
         */
        init: function(options) {
            var plugin = this;

            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof options.interval === 'undefined') {
                options.interval = plugin.opts.interval;
            }
            if (typeof options.changed === 'undefined') {
                options.changed = plugin.opts.changed;
            }

            plugin.lastPos = plugin.element.position();
            plugin.lastOff = plugin.element.offset();

            plugin.timeouts.monitor.delay = options.interval;

            $.extend(plugin.opts, options);
        },

        monitor: function() {
            var plugin = this;

            if (plugin.timeouts.monitor.handle) {
                resetInterval(plugin.timeouts.monitor.handle);
            }

            plugin.timeouts.monitor.handle = setInterval(function () {
                if (plugin == null || plugin.length < 1) return plugin;

                plugin.newPos = plugin.element.position();
                plugin.newOff = plugin.element.offset();

                if (plugin.lastPos.top != plugin.newPos.top || plugin.lastPos.left != plugin.newPos.left) {
                    // console.log('onPositionChanged.monitor', 'position', plugin.lastPos, plugin.newPos);
                    if (typeof plugin.opts.changed === 'function') {
                        plugin.opts.changed({changed:'position', lastOff:plugin.lastOff, newOff:plugin.newOff, lastPos:plugin.lastPos, newPos:plugin.newPos});
                    }
                    plugin.lastPos = plugin.element.position();
                    plugin.lastOff = plugin.element.offset();

                } else if (plugin.lastOff.top != plugin.newOff.top || plugin.lastOff.left != plugin.newOff.left) {
                    // console.log('onPositionChanged.monitor', 'offset', plugin.lastOff, plugin.newOff);
                    if (typeof plugin.opts.changed === 'function') {
                        plugin.opts.changed({changed:'offset', lastOff:plugin.lastOff, newOff:plugin.newOff, lastPos:plugin.lastPos, newPos:plugin.newPos});
                    }
                    plugin.lastPos = plugin.element.position();
                    plugin.lastOff = plugin.element.offset();
                }

            }, plugin.timeouts.monitor.delay);
        }

    };


    //
    // plugin core
    //

    // create instance of plugin, cache
    $.fn[pluginName] = function(options) {
        var plugin = this.data(pluginName);
        if (plugin instanceof Plugin) {
            if (typeof options !== 'undefined') {
                plugin.init(options);
            }
        } else {
            plugin = new Plugin(this, options);
            this.data(pluginName, plugin);
        }

        return plugin;
    };

}(jQuery, window, document));
