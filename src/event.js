/**
 * Keeps a list of bindings/callbacks that can be added using **push()** and
 * removed using **remove()**. *trigger()* executes all callbacks one by one in registration order.
 *
 * @param [spec] {Object}
 * @param [my] {Object}
 * @returns {event}
 */
export default function event(spec, my) {
	my ||= {};

	const bindings = [];

	// #### Public API

	const that = {};

	/**
	 * Binds callback to event. The callback will be invoked
	 * whenever the event is fired. Avoid adding the same callback
	 * twice.
	 *
	 * @param callback {function}
	 * @returns {eventBinding}
	 */
	that.register = function (callback) {
		return bindCallback(callback);
	};

	/**
	 * Binds a callback to an event
	 *
	 * @param spec.callback {function} Callback to execute on event
	 * @param spec.event {event} Event to bind callback to

	 * @returns {eventBinding}
	 */
	// eslint-disable-next-line no-shadow -- we should fix that later
	function eventBinding(spec) {
		spec ||= {};
		// eslint-disable-next-line no-shadow -- we should fix that later
		const that = {};

		const callback = spec.callback;
		// eslint-disable-next-line no-shadow -- we should fix that later
		let event = spec.event;

		/**
		 * Is bound to an event
		 * @returns {boolean}
		 */
		that.isBound = function () {
			return event !== undefined;
		};

		/**
		 * Remove itself from event, if bound.
		 */
		that.unbind = function () {
			if (!that.isBound()) return;

			event.unregister(that);
			event = undefined;
		};

		/**
		 * @param anEvent
		 */
		that.bind = function (anEvent) {
			that.unbind();
			if (anEvent) {
				event = anEvent;
			}
		};

		/**
		 * Executes connected callback
		 * @param params
		 */
		that.execute = function (params) {
			if (!callback) return;

			callback.apply(that, params);
		};

		/**
		 * Returns true if and only if the receiver is triggering
		 * the callback given as parameter.
		 *
		 * @param cb {function} callback to test against
		 * @returns {boolean}
		 */
		that.isForCallback = function (cb) {
			return callback === cb;
		};

		return that;
	}

	/**
	 * Like on() except callback will only be fired once
	 *
	 * @param callback {function}
	 * @returns {eventBinding}
	 */
	that.registerOnce = function (callback) {
		const onceBinding = eventBinding({
			callback: function () {
				my.remove(onceBinding);
				callback.apply(that, arguments);
			},
		});

		bindings.push(onceBinding);
		return onceBinding;
	};

	/**
	 * Removed "binding" attached to event.
	 * @param name {String} Name of event
	 * @param binding {eventBinding} Binding
	 */
	that.unregister = function (binding) {
		my.remove(binding);
	};

	/**
	 * Trigger event by executing all callbacks one by one in registration order.
	 *
	 * @param arguments {Object|Object[]} Arguments passed to callback of each binding
	 */
	that.trigger = function () {
		const params = Array.prototype.slice.call(arguments);

		bindings.forEach((binding) => {
			binding.execute(params);
		});
	};

	/**
	 * Unbind all callbacks bound to this event.
	 */
	that.dispose = function () {
		bindings.slice().forEach((binding) => {
			binding.unbind();
		});
	};

	/**
	 * @param binding {eventBinding}
	 */
	my.push = function (binding) {
		bindings.push(binding);
		binding.bind(that);
	};

	/**
	 * @param binding {eventBinding}
	 */
	my.remove = function (binding) {
		bindings.splice(bindings.indexOf(binding), 1);
	};

	/**
	 * Create and add callback binding to the receiver. Avoid
	 * adding the same callback twice.
	 *
	 * @param callback
	 * @returns {eventBinding}
	 */
	function bindCallback(callback) {
		// eslint-disable-next-line no-shadow -- we should fix that later
		let binding = bindings.find((binding) =>
			binding.isForCallback(callback),
		);

		// Don't register the same callback twice:
		if (binding) {
			return binding;
		}

		binding = eventBinding({ callback, event: that });
		bindings.push(binding);

		return binding;
	}

	return that;
}
