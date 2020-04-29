import React from "react";

export const tryToSetDocumentTitle = (title: string): void => {
  try {
    document.title = title;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.warn("Document is undefined");
  }
};

type Options = {
  revertOnUnmount: boolean;
};

type useDocumentTitleProps = {
  title: string;
} & Partial<Options>;

export const useDocumentTitle = ({
  title,
  revertOnUnmount = false,
}: useDocumentTitleProps) => {
  // This check is required JIC React is
  // being rendered server side -PC
  const isBrowser = typeof document !== "undefined";

  const prevPageTitleRef = React.useRef<string | null>(
    isBrowser ? document.title : null
  );

  // If being rendered server side upon hydration
  // it will store the document title on state -PC
  React.useEffect(() => {
    if (isBrowser) {
      prevPageTitleRef.current = document.title;
    }
  }, [isBrowser]);

  React.useEffect(() => {
    if (title && isBrowser) {
      tryToSetDocumentTitle(title);
    }

    return () => {
      // If revertOnUnmount is set it will set
      // the document title back the previous state
      if (isBrowser && revertOnUnmount && prevPageTitleRef.current !== null) {
        tryToSetDocumentTitle(prevPageTitleRef.current);
      }
    };
  }, [isBrowser, title, revertOnUnmount]);
};
