---
title: Define Type of Legacy Modules
date: 2023-03-25
description: The blog post explains the concept of declaration files in TypeScript and how to use them to provide TypeScript with the necessary type information for modules that are not written in TypeScript.
categories:
  - typescript
---

When working with TypeScript, you may sometimes encounter errors when importing modules that are not written in TypeScript. These errors can occur because TypeScript does not know about the types and interfaces of the module, making it difficult to use the module in your code.

In this post, we'll look at how you can use declaration files to fix these errors and provide TypeScript with the necessary type information.

## What are declaration files?

A declaration file tells TypeScript about the types and interfaces of a module that is not written in TypeScript. By providing this information, TypeScript can properly type-check your code and prevent errors that may occur when using the module.

Declaration files have the extension `.d.ts` and contain TypeScript type definitions for the module. These files do not contain any executable code, but only provide the necessary type information to the TypeScript compiler.

## Example: fixing an error when importing a module

Let's say you are working on a TypeScript project that uses a module called `sitar-encryption`. This module is not written in TypeScript, but you want to use it in your TypeScript code.

Here's an example of how you might import and use the module:

```ts
import axios from 'axios'
import sitarEncryption from 'sitar-encryption'

const api = axios.create({ /** options */ })

const config = {
  role: 'client',
  // add any other properties your config may have
}

const sitar = sitarEncryption(config)
sitar(api)
```

When you try to compile this code with TypeScript, you might encounter an error like this:

```lua
error TS7016: Could not find a declaration file for module 'sitar-encryption'.

```

This error occurs because TypeScript does not know about the types and interfaces of the `sitar-encryption` module.

To fix this error, we need to create a declaration file for the module.

```ts
declare module 'sitar-encryption' {
  import { AxiosInstance } from 'axios'

  interface Config {
    role: 'client' | 'server';
    // define any other properties your config may have
  }

  interface Sitar {
    (axios: AxiosInstance): unknown;
  }

  function sitarEncryption(config: Config): Sitar;
  export = sitarEncryption;
}
```

This file defines the `Config` and `Sitar` interfaces, as well as the `sitarEncryption` function. It also exports the sitarEncryption function so that it can be imported by other modules.

Save this file in your project as `sitar-encryption.d.ts`.

## Using the declaration file

Now that we have created the declaration file, we can use it in our TypeScript code to provide TypeScript with the necessary type information.

Here's an example of how we can import and use the `sitar-encryption` module with the declaration file:

```ts
import axios from 'axios'
import sitarEncryption from 'sitar-encryption'

const api = axios.create({ /** options */ })

const config = {
  role: 'client',
  // add any other properties your config may have
}

const sitar: Sitar = sitarEncryption(config)
sitar(api)
```

By adding the declaration file, we have provided TypeScript with the necessary type information and we can now use the module in our typescript project.

---
*This post was created with the help of ChatGPT.*