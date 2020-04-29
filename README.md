# `@chappy/use-document-title`

[![CircleCI](https://circleci.com/gh/peterchappy/useDocumentTitle.svg?style=svg)](https://circleci.com/gh/peterchappy/useDocumentTitle)

React hook for setting the document title

## Install

```sh
yarn add @chappy/use-document-title
npm install @chappy/use-document-title
```

## Usage

```ts
import { useDocumentTitle } from "@chappy/use-document-title";

const Foo = () => {
  useDocumentTitle({ title: "Page Title" });
  return <div />;
};
```

## Arguments

```ts
useDocumentTitle({
  title: string
  revertOnUnmount: boolean
})
```

- `title: string` The title you want to set the document to. `useDocumentTitle` observers this as a dependency.
- `revertOnUnmount: boolean` Will revert to previous title on unmount.
