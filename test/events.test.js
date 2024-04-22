import event from "../src/event.js";
import eventCategory from "../src/eventCategory.js";
import events from "../src/eventManager.js";
import { expect, describe, it, vi } from "vitest";

describe("events", () => {
	it("bind callback to event", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = vi.fn();

		// Act: bind a callback
		anEvent.register(spy);

		// and execute
		anEvent.trigger();

		// Assert
		expect(spy).toHaveBeenCalledWith();
	});

	it("bind multiple callbacks to an event", () => {
		// Arrange: an event
		let anEvent = event();
		let spy1 = vi.fn();
		let spy2 = vi.fn();

		// Act: bind two callbacks and trigger event
		anEvent.register(spy1);
		anEvent.register(spy2);

		anEvent.trigger();

		// Assert: that both where executed
		expect(spy1).toHaveBeenCalledOnce();
		expect(spy2).toHaveBeenCalledOnce();
	});

	it("bind same callback only once", () => {
		// Arrange: an event
		let anEvent = event();

		let spy = vi.fn();

		// Act: bind two callbacks and trigger event
		anEvent.register(spy);
		anEvent.register(spy);

		anEvent.trigger();

		// Assert: that both where executed
		expect(spy).toHaveBeenCalledOnce();
	});

	it("bind same callback with anonymous functions", () => {
		// Arrange: an event
		let anEvent = event();

		let spy = vi.fn();

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

	it("trigger pass values to callbacks", () => {
		// Arrange: an event
		let anEvent = event();
		let spy1 = vi.fn();
		let spy2 = vi.fn();

		// Act: bind two callbacks and trigger event
		anEvent.register(spy1);
		anEvent.register(spy2);

		anEvent.trigger(2, "text");

		// Assert: that both where executed
		expect(spy1).toHaveBeenCalledWith(2, "text");
		expect(spy2).toHaveBeenCalledWith(2, "text");
	});

	it("un-Bind callback using unregister", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = vi.fn();

		// bind a callback
		let eventBinding = anEvent.register(spy);

		// unbind
		anEvent.unregister(eventBinding);

		anEvent.trigger();

		expect(spy).not.toHaveBeenCalled();
	});

	it("un-Bind callback using unbind", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = vi.fn();

		// bind a callback
		let eventBinding = anEvent.register(spy);

		// Unbind
		eventBinding.unbind();

		anEvent.trigger();

		expect(spy).not.toHaveBeenCalled();
	});

	it("bind and trigger callback only once using registerOnce", () => {
		// Arrange: an event
		let anEvent = event();
		let spy = vi.fn();

		// Act: bind a callback
		anEvent.registerOnce(spy);

		// and trigger twice
		anEvent.trigger();
		anEvent.trigger();

		expect(spy).toHaveBeenCalledOnce();
	});

	it("event dispose unbinds all callbacks", () => {
		// Arrange: an event
		let anEvent = event();

		// Act: bind two callbacks and trigger event
		let firstBinding = anEvent.register(() => {});
		let secondBinding = anEvent.register(() => {});

		anEvent.dispose();

		// Assert: that both where unbound
		expect(firstBinding.isBound()).toBeFalsy();
		expect(secondBinding.isBound()).toBeFalsy();
	});

	it("event Category keeps a list of events", () => {
		// Act: create an event handler ans some events
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent();
		let anotherEvent = someEvents.createEvent();

		// Assert: events created
		expect(anEvent.register).toBeTruthy();
		expect(anotherEvent.register).toBeTruthy();
	});

	it("event Category can keep named events", () => {
		// Act: create an event handler ans some events
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");

		// Assert: events created
		expect(anEvent.register).toBeTruthy();
	});

	it("event Category can bind callback to named event using register", () => {
		expect.assertions(1);

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

	it("event Category can un-bind named event callbacks using unregister", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");
		let spy = vi.fn();

		// bind a callback
		let eventBinding = someEvents.register("namedEvent", spy);

		// unbind
		someEvents.unregister("namedEvent", eventBinding);

		anEvent.trigger("namedEvent");

		expect(spy).not.toHaveBeenCalled();
	});

	it("event Category can bind and trigger named event callback only once using registerOnce", () => {
		// Arrange: an event
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");
		let spy = vi.fn();

		// Act: bind a callback
		someEvents.registerOnce("namedEvent", spy);

		// and trigger twice
		anEvent.trigger("namedEvent");
		anEvent.trigger("namedEvent");

		expect(spy).toHaveBeenCalledOnce();
	});

	it("event Category can bind dispose unbinds all events and there callbacks", () => {
		// Arrange: two events in a event handler
		let someEvents = eventCategory();
		let anEvent = someEvents.createEvent("namedEvent");
		let anotherEvent = someEvents.createEvent("namedEvent");

		// Act: bind two callbacks and trigger event
		let firstBinding = anEvent.register(() => {});
		let secondBinding = anEvent.register(() => {});
		let thirdBinding = anotherEvent.register(() => {});
		let fourthBinding = anotherEvent.register(() => {});

		someEvents.dispose();

		// Assert: that all where unbound
		expect(firstBinding.isBound()).toBeFalsy();
		expect(secondBinding.isBound()).toBeFalsy();
		expect(thirdBinding.isBound()).toBeFalsy();
		expect(fourthBinding.isBound()).toBeFalsy();
	});

	it("event Manager keeps list of named event categories", () => {
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
