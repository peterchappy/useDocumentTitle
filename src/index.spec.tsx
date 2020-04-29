/* tslint:disable no-any */
import { useDocumentTitle } from ".";
import { expect } from "chai";
import { renderHook } from "@testing-library/react-hooks";

describe("useDocumentTitle", () => {
  it("should set to new title on mount", () => {
    globalThis.document = { title: "Foo" } as any;
    renderHook(() => useDocumentTitle({ title: "bar" }));

    expect(globalThis.document.title).to.equal("bar");
  });

  it("by default should not revert on unmount", () => {
    globalThis.document = { title: "Foo" } as any;
    const { unmount } = renderHook(() => useDocumentTitle({ title: "bar" }));
    unmount();
    expect(globalThis.document.title).to.equal("bar");
  });

  it("should revert on unmount when flag is set", () => {
    globalThis.document = { title: "Foo" } as any;
    const { unmount } = renderHook(() =>
      useDocumentTitle({ title: "bar", revertOnUnmount: true })
    );
    unmount();
    expect(globalThis.document.title).to.equal("Foo");
  });

  it("should observe title changes", () => {
    globalThis.document = { title: "Foo" } as any;
    let title = "bar";
    const { rerender } = renderHook(() => useDocumentTitle({ title }));

    title = "bar1";
    rerender();
    expect(globalThis.document.title).to.equal(title);
  });

  it("should run fine without document, and then fire when document is set", () => {
    const title = "bar";
    globalThis.document = undefined as any;
    const { rerender } = renderHook(() => useDocumentTitle({ title }));
    globalThis.document = { title: "Foo" } as any;
    rerender();
    expect(globalThis.document.title).to.equal(title);
  });

  it("should revert properly if document is initially undefined", () => {
    const title = "bar";
    globalThis.document = undefined as any;
    const { rerender, unmount } = renderHook(() =>
      useDocumentTitle({ title, revertOnUnmount: true })
    );
    globalThis.document = { title: "Foo" } as any;
    rerender();
    unmount();
    expect(globalThis.document.title).to.equal("Foo");
  });
});
