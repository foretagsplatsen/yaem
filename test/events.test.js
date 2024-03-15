import event from "../src/event.js";
import eventCategory from "../src/eventCategory.js";
import events from "../src/eventManager.js";

describe("events", () => {
	it("Bind callback to event", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = jasmine.createSpy("callback");

		// Act: bind a callback
		anEvent.register(spy);

		// and execute
		anEvent.trigger();

		// Assert
		expect(spy).toHaveBeenCalled();
	});

	it("Bind multiple callbacks to an event", () => {
		// Arrange: an event
		let anEvent = event();
		let spy1 = jasmine.createSpy("callback1");
		let spy2 = jasmine.createSpy("callback2");

		// Act: bind two callbacks and trigger event
		anEvent.register(spy1);
		anEvent.register(spy2);

		anEvent.trigger();

		// Assert: that both where executed
		expect(spy1).toHaveBeenCalledTimes(1);
		expect(spy2).toHaveBeenCalledTimes(1);
	});

	it("Bind same callback only once", () => {
		// Arrange: an event
		let anEvent = event();

		let spy = jasmine.createSpy("callback");

		// Act: bind two callbacks and trigger event
		anEvent.register(spy);
		anEvent.register(spy);

		anEvent.trigger();

		// Assert: that both where executed
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("Bind same callback with anonymous functions", () => {
		// Arrange: an event
		let anEvent = event();

		let spy = jasmine.createSpy("callback");

		// Act: bind two callbacks and trigger event
		anEvent.register(() => {
			spy();
		});

		anEvent.register(() => {
			spy();
		});

		anEvent.trigger();

		// Assert: that both where executed
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it("Trigger pass values to callbacks", () => {
		// Arrange: an event
		let anEvent = event();
		let spy1 = jasmine.createSpy("callback1");
		let spy2 = jasmine.createSpy("callback2");

		// Act: bind two callbacks and trigger event
		anEvent.register(spy1);
		anEvent.register(spy2);

		anEvent.trigger(2, "text");

		// Assert: that both where executed
		expect(spy1).toHaveBeenCalledWith(2, "text");
		expect(spy2).toHaveBeenCalledWith(2, "text");
	});

	it("Bind and trigger callback only once using registerOnce", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = jasmine.createSpy("callback");

		// Act: bind a callback
		anEvent.registerOnce(spy);

		// and trigger twice
		anEvent.trigger();
		anEvent.trigger();

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("Event Category can bind callback to named event using register", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");

		// bind a callback
		someEvents.register("namedEvent", () => {
			expect(true).toBeTruthy();
		});

		// Act: trigger named event
		anEvent.trigger("namedEvent");
	});

	it("Event Category can bind and trigger named event callback only once using registerOnce", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");
		let spy = jasmine.createSpy("callback");

		// Act: bind a callback
		someEvents.registerOnce("namedEvent", spy);

		// and trigger twice
		anEvent.trigger("namedEvent");
		anEvent.trigger("namedEvent");

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("Event Manager keeps list of named event categories", () => {
		let triggered = false;

		events.at("c1").register("foo", () => {
			triggered = true;
		});

		expect(!triggered).toBeTruthy();

		events.at("c1").trigger("bar");

		expect(!triggered).toBeTruthy();

		events.at("c2").trigger("foo");

		expect(!triggered).toBeTruthy();

		events.at("c1").trigger("foo");

		expect(triggered).toBeTruthy();
	});
});

describe("deprecated", () => {
	/* eslint-disable no-console */
	let originalConsoleWarn;

	beforeEach(() => {
		console.warn = jasmine.createSpy("console.warn");
	});

	beforeAll(() => {
		originalConsoleWarn = console.warn;
	});

	afterAll(() => {
		console.warn = originalConsoleWarn;
	});

	it("off() category method delegates to unregister", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let spy = jasmine.createSpy("unregister");

		someEvents.unregister = spy;

		someEvents.off("namedEvent", "something else");

		expect(spy).toHaveBeenCalledWith("namedEvent", "something else");
		expect(console.warn).toHaveBeenCalled();
	});

	it("onceOn() category method delegates to registerOnce", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let spy = jasmine.createSpy("registerOnce");

		someEvents.registerOnce = spy;

		someEvents.onceOn("namedEvent", "something else");

		expect(spy).toHaveBeenCalledWith("namedEvent", "something else");
		expect(console.warn).toHaveBeenCalled();
	});
});
