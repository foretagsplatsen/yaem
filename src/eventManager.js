import eventCategory from "./eventCategory.js";

/**
 * Singleton object that keeps a list of named event categories.
 */
let eventManager = (function () {
	let that = {};

	// Map of event categories with (category) name as key
	let categories = {};

	/**
	 * Register a new event category with "name".
	 * @param name
	 * @returns {eventCategory}
	 */
	that.register = function (name) {
		if (categories[name]) {
			throw `A event category is already registered for ${name}`;
		}
		categories[name] = eventCategory();

		return categories[name];
	};

	/**
	 * Returns event category by name. Creates a new category if not already
	 * registered.
	 * @param name
	 * @returns {*}
	 */
	that.at = function (name) {
		if (!categories[name]) {
			that.register(name);
		}

		return categories[name];
	};

	return that;
})();

export default eventManager;
