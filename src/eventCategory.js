import event from "./event.js";

/**
 * Keeps a list of events.
 */
export default function eventCategory() {
	const that = {};

	// Map of events with name as key
	let namedEvents = {};
	let events = [];

	/**
	 * Lazily makes sure that an event exists for "name".
	 *
	 * @param name {String}
	 * @returns {event} Also return the event
	 */
	function ensureEventHolderFor(name) {
		if (!hasEventNamed(name)) {
			addEvent(event(), name);
		}
		return namedEvents[name];
	}

	/**
	 * Create a new event and if name i supplied adds it to event manager
	 *
	 * @param [name] {string} Name of event in eventHandler
	 * @returns {event}
	 */
	that.createEvent = function (name) {
		return addEvent(event(), name);
	};

	/**
	 * Binds callback to a named event. The callback will be invoked whenever the event is fired.
	 *
	 * @param name {String}
	 * @param callback {function}
	 */
	that.register = function (name, callback) {
		return ensureEventHolderFor(name).register(callback);
	};

	/**
	 * Removed "binding" attached to event.
	 * @param name {String} Name of event
	 * @param binding {eventBinding} Binding
	 */
	that.unregister = function (name, binding) {
		return ensureEventHolderFor(name).unregister(binding);
	};

	/**
	 * Like on() except callback will only be fired once
	 *
	 * @param name
	 * @param callback
	 * @returns {*}
	 */
	that.registerOnce = function (name, callback) {
		return ensureEventHolderFor(name).registerOnce(callback);
	};

	/**
	 * Trigger all callbacks attached to event
	 * @param name
	 * @param arguments Any arguments to trigger is sent as arguments to callback.
	 */
	that.trigger = function (name) {
		const params = Array.prototype.slice.call(arguments, 1);
		// eslint-disable-next-line no-shadow -- we should fix that later
		const event = ensureEventHolderFor(name);
		event.trigger.apply(that, params);
	};

	/**
	 * Dispose all events.
	 */
	that.dispose = function () {
		// eslint-disable-next-line no-shadow -- we should fix that later
		events.forEach((event) => {
			event.dispose();
		});

		namedEvents = {};
		events = [];
	};

	/**
	 * Answers true if an event with name exists
	 *
	 * @param name {String}
	 * @returns {boolean}
	 */
	function hasEventNamed(name) {
		return namedEvents[name] !== undefined;
	}

	/**
	 * @param event {event}
	 * @param [name] {string}
	 * @returns {event}
	 */
	// eslint-disable-next-line no-shadow -- we should fix that later
	function addEvent(event, name) {
		events.push(event);
		if (name) {
			namedEvents[name] = event;
		}
		return event;
	}

	return that;
}
