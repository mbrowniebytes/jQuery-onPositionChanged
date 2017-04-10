jQuery onPositionChanged Plugin
======================
This jQuery plugin will trigger a callback function when a selected element's position or offset changes.


usage and options
========
````
var options = {
	interval: 250,						// how often to check, in ms
	changed: function(changed) {		// triggered when position or offset changed
		// changed = {changed:'offset'|'position', lastOff:lastOff, newOff:newOff, lastPos:lastPos, newPos:newPos}
		console.log(changed);
	}
};

$('#dom').onPositionChanged(options);
````


change log
========
2017-04-10 version 0.1.0
* Modified into a jQuery plugin,
* Caller takes an object
* Callback returns an object
* Callback only triggered on position or offset change, not both

2014-10-11 version 0
* Original source from StackOverflow
http://stackoverflow.com/questions/18743144/jquery-event-listen-on-position-changed


requirements
========
* [jQuery](http://jquery.com/) v. 1.11+


license
========
http://opensource.org/licenses/MIT
