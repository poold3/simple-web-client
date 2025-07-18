import { Value } from "/__src__/value.js";

describe("Value", () => {
  let value: Value<string>;
  let header: HTMLHeadElement;

  beforeEach(() => {
    value = new Value("Hello world!");
    header = document.createElement("h1");
  });

  it("should create", () => {
    expect(value).toBeTruthy();
    expect(value.value).toBe("Hello world!");
    expect(header).toBeTruthy();
  });

  it("should bind a property on an Element", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementProperty(header, "innerText");
    expect(value["elements"].length).toBe(1);
    expect(header.innerText).toBe("Hello world!");
    value.value = "New value!";
    expect(header.innerText).toBe("New value!");
  });

  it("should bind an attribute on an Element", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementAttribute(header, "id");
    expect(value["elements"].length).toBe(1);
    expect(header.getAttribute("id")).toBe("Hello world!");
    value.value = "New value!";
    expect(header.getAttribute("id")).toBe("New value!");
  });

  it("should bind a non-string value to an attribute on an Element", () => {
    const numValue = new Value(12);
    expect(numValue["elements"].length).toBe(0);
    numValue.bindElementAttribute(header, "id");
    expect(numValue["elements"].length).toBe(1);
    expect(header.getAttribute("id")).toBe("12");
    numValue.value = 15;
    expect(header.getAttribute("id")).toBe("15");
  });

  it("should bind a class on an Element", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementClass(header, "bold", (value) => value === "Hello world!");
    expect(value["elements"].length).toBe(1);
    expect(header.classList.contains("bold")).toBeTrue();
    value.value = "New value!";
    expect(header.classList.contains("bold")).toBeFalse();
  });

  it("should bind multiple properties on an Element", () => {
    value.bindElementProperty(header, "innerText");
    value.bindElementProperty(
      header,
      "hidden",
      (value) => value === "Hello world!"
    );
    expect(header.innerText).toBe("Hello world!");
    expect(header.hidden).toBeTrue();
    value.value = "New value!";
    expect(header.innerText).toBe("New value!");
    expect(header.hidden).toBeFalse();
  });

  it("should bind multiple attributes on an Element", () => {
    value.bindElementAttribute(header, "id");
    value.bindElementAttribute(header, "title", (value) =>
      value === "Hello world!" ? "true" : "false"
    );
    expect(header.getAttribute("id")).toBe("Hello world!");
    expect(header.getAttribute("title")).toBe("true");
    value.value = "New value!";
    expect(header.getAttribute("id")).toBe("New value!");
    expect(header.getAttribute("title")).toBe("false");
  });

  it("should bind a property on an Element while setting with the set method", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementProperty(header, "innerText");
    expect(value["elements"].length).toBe(1);
    expect(header.innerText).toBe("Hello world!");
    value.set((currentValue) => currentValue + "!");
    expect(header.innerText).toBe("Hello world!!");
  });

  it("should bind an attribute on an Element while setting with the set method", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementAttribute(header, "id");
    expect(value["elements"].length).toBe(1);
    expect(header.getAttribute("id")).toBe("Hello world!");
    value.set((currentValue) => currentValue + "!");
    expect(header.getAttribute("id")).toBe("Hello world!!");
  });

  it("should bind a class on an Element while setting with the set method", () => {
    expect(value["elements"].length).toBe(0);
    value.bindElementClass(header, "bold", (value) => value === "Hello world!");
    expect(value["elements"].length).toBe(1);
    expect(header.classList.contains("bold")).toBeTrue();
    value.set((currentValue) => currentValue + "!");
    expect(header.classList.contains("bold")).toBeFalse();
  });

  it("should bind multiple properties on an Element while setting with the set method", () => {
    value.bindElementProperty(header, "innerText");
    value.bindElementProperty(
      header,
      "hidden",
      (value) => value === "Hello world!"
    );
    expect(header.innerText).toBe("Hello world!");
    expect(header.hidden).toBeTrue();
    value.set((currentValue) => currentValue + "!");
    expect(header.innerText).toBe("Hello world!!");
    expect(header.hidden).toBeFalse();
  });

  it("should bind multiple attributes on an Element while setting with the set method", () => {
    value.bindElementAttribute(header, "id");
    value.bindElementAttribute(header, "title", (value) =>
      value === "Hello world!" ? "true" : "false"
    );
    expect(header.getAttribute("id")).toBe("Hello world!");
    expect(header.getAttribute("title")).toBe("true");
    value.set((currentValue) => currentValue + "!");
    expect(header.getAttribute("id")).toBe("Hello world!!");
    expect(header.getAttribute("title")).toBe("false");
  });

  it("should bind multiple properties on multiple Elements", () => {
    expect(value["elements"].length).toBe(0);
    value.value = "test";
    value.bindElementProperty(header, "innerText");
    value.bindElementProperty(
      header,
      "hidden",
      (value) => value === "new-test"
    );
    expect(header.innerText).toBe("test");
    expect(header.hidden).toBeFalse();
    expect(value["elements"].length).toBe(1);

    const link = document.createElement("a");
    value.bindElementProperty(link, "innerText");
    value.bindElementProperty(
      link,
      "href",
      (value) => `https://test.com/${value}`
    );
    expect(link.innerText).toBe("test");
    expect(link.href).toBe("https://test.com/test");
    expect(value["elements"].length).toBe(2);

    value.value = "new-test";
    expect(header.innerText).toBe("new-test");
    expect(header.hidden).toBeTrue();
    expect(link.innerText).toBe("new-test");
    expect(link.href).toBe("https://test.com/new-test");
  });

  it("should bind multiple attributes on multiple Elements", () => {
    expect(value["elements"].length).toBe(0);
    value.value = "test";
    value.bindElementAttribute(header, "id");
    value.bindElementAttribute(header, "title", (value) =>
      value === "new-test" ? "true" : "false"
    );
    expect(header.getAttribute("id")).toBe("test");
    expect(header.getAttribute("title")).toBe("false");
    expect(value["elements"].length).toBe(1);

    const link = document.createElement("a");
    value.bindElementAttribute(link, "id");
    value.bindElementAttribute(
      link,
      "href",
      (value) => `https://test.com/${value}`
    );
    expect(link.getAttribute("id")).toBe("test");
    expect(link.getAttribute("href")).toBe("https://test.com/test");
    expect(value["elements"].length).toBe(2);

    value.value = "new-test";
    expect(header.getAttribute("id")).toBe("new-test");
    expect(header.getAttribute("title")).toBe("true");
    expect(link.getAttribute("id")).toBe("new-test");
    expect(link.getAttribute("href")).toBe("https://test.com/new-test");
  });

  it("should unbind a template property", () => {
    spyOn(value["elements"], "splice").and.callThrough();
    value.bindElementProperty(header, "innerText");
    value.bindElementProperty(
      header,
      "hidden",
      (value) => value === "Hello world!"
    );
    expect(header.innerText).toBe("Hello world!");
    expect(header.hidden).toBeTrue();

    value.unbindElementProperty(header, "hidden");

    value.value = "new value";
    expect(header.innerText).toBe("new value");
    expect(header.hidden).toBeTrue();

    expect(value["elements"].length).toBe(1);
    value.unbindElementProperty(header, "innerText");
    expect(value["elements"].length).toBe(0);

    value.value = "new value 2";
    expect(header.innerText).toBe("new value");
    expect(header.hidden).toBeTrue();
    expect(value["elements"].splice).toHaveBeenCalledTimes(1);
  });

  it("should unbind a template attribute", () => {
    spyOn(value["elements"], "splice").and.callThrough();
    value.bindElementAttribute(header, "id");
    value.bindElementAttribute(header, "title", (value) =>
      value === "Hello world!" ? "true" : "false"
    );
    expect(header.getAttribute("id")).toBe("Hello world!");
    expect(header.getAttribute("title")).toBe("true");

    value.unbindElementAttribute(header, "title");

    value.value = "new value";
    expect(header.getAttribute("id")).toBe("new value");
    expect(header.getAttribute("title")).toBe("true");

    expect(value["elements"].length).toBe(1);
    value.unbindElementAttribute(header, "id");
    expect(value["elements"].length).toBe(0);

    value.value = "new value 2";
    expect(header.getAttribute("id")).toBe("new value");
    expect(header.getAttribute("title")).toBe("true");
    expect(value["elements"].splice).toHaveBeenCalledTimes(1);
  });

  it("should unbind a template class", () => {
    spyOn(value["elements"], "splice").and.callThrough();
    value.bindElementClass(header, "bold", (value) => value === "Hello world!");
    value.bindElementClass(
      header,
      "underlined",
      (value) => value !== "Hello world!"
    );

    expect(header.classList.contains("bold")).toBeTrue();
    expect(header.classList.contains("underlined")).toBeFalse();

    value.unbindElementClass(header, "bold");

    value.value = "new value";
    expect(header.classList.contains("bold")).toBeTrue();
    expect(header.classList.contains("underlined")).toBeTrue();

    expect(value["elements"].length).toBe(1);
    value.unbindElementClass(header, "underlined");
    expect(value["elements"].length).toBe(0);

    value.value = "Hello world!";
    expect(header.classList.contains("bold")).toBeTrue();
    expect(header.classList.contains("underlined")).toBeTrue();
    expect(value["elements"].splice).toHaveBeenCalledTimes(1);
  });

  it("should do nothing if unbinding a property that does not exist", () => {
    value.bindElementProperty(header, "innerText");
    spyOn(value["elements"], "splice").and.callThrough();
    value.unbindElementProperty(header, "onclick");
    expect(value["elements"].splice).toHaveBeenCalledTimes(0);
  });

  it("should do nothing if unbinding an attribute that does not exist", () => {
    value.bindElementAttribute(header, "id");
    spyOn(value["elements"], "splice").and.callThrough();
    value.unbindElementAttribute(header, "title");
    expect(value["elements"].splice).toHaveBeenCalledTimes(0);
  });

  it("should only remove an element if it has no more bindings", () => {
    spyOn(value["elements"], "splice").and.callThrough();
    expect(value["elements"].length).toBe(0);
    value.bindElementProperty(header, "innerText");
    value.bindElementAttribute(header, "id");
    value.bindElementClass(header, "bold", () => true);
    expect(value["elements"].length).toBe(1);

    value.unbindElementProperty(header, "innerText");
    expect(value["elements"].splice).toHaveBeenCalledTimes(0);
    expect(value["elements"].length).toBe(1);

    value.unbindElementAttribute(header, "id");
    expect(value["elements"].splice).toHaveBeenCalledTimes(0);
    expect(value["elements"].length).toBe(1);

    value.unbindElementClass(header, "bold");
    expect(value["elements"].splice).toHaveBeenCalledTimes(1);
    expect(value["elements"].length).toBe(0);
  });

  it("should unbind all properties and attributes", () => {
    value.bindElementProperty(header, "innerText");
    value.bindElementAttribute(header, "id");
    const link = document.createElement("a");
    value.bindElementProperty(link, "innerText");
    value.bindElementAttribute(link, "id");
    expect(header.innerText).toBe("Hello world!");
    expect(header.getAttribute("id")).toBe("Hello world!");
    expect(link.innerText).toBe("Hello world!");
    expect(link.getAttribute("id")).toBe("Hello world!");
    expect(value["elements"].length).toBe(2);

    value.unbindAllElementValues();
    value.value = "new value";
    expect(header.innerText).toBe("Hello world!");
    expect(header.getAttribute("id")).toBe("Hello world!");
    expect(link.innerText).toBe("Hello world!");
    expect(link.getAttribute("id")).toBe("Hello world!");
    expect(value["elements"].length).toBe(0);
  });
});
