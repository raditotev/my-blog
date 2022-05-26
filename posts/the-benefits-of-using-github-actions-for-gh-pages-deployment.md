---
title: The Benefits of Using GitHub Actions for gh-pages Deployment
date: 2022-05-26
description: Using GitHub workflows can greatly simplify how you deploy your web apps to gh-pages. With the use of actions from the marketplace it also reduces the work one might have to do.
categories:
  - github
  - devops
---

Using GitHub actions or any other similar tool in that regard can be challenging especially if you want to test your workflows locally as you can see in this [post](https://stackoverflow.com/questions/59241249/how-to-run-github-actions-workflows-locally) in stackoverflow. The top rated answer as of the date of this writing suggests to:

> - avoid functionalities provided by your CI tools (GitHub Actions, Gitlab CI, etc)
> - write as much as possible in CI-agnostic way (BASH scripts, PowerShell scripts, Gradle scripts, NPM scripts, Dockerfiles, Ansible scripts - anything you know)
> - invoke those scripts from your CI tool. In GitHub actions: run: your command to run

This might be true for large projects, however in my case using GitHub actions to deploy small web apps to gh-pages solved all my problems in a really neat way.

Before implementing GitHub workflow I had to add a deploy script in my `package.json` and it was looking like this:

```json
"deploy": "next build && next export && touch out/.nojekyll && echo 'blog.radi.pro' > out/CNAME && git add out/ && git commit -m \"Deploy gh-pages\" && git subtree push --prefix out origin gh-pages"
```

Let's do a breakdown of the work done by this script.

- First it builds and exports my app in a `/out` folder.
- Then it creates a `.nojekyll` file in the same build folder. Without this file in the root of the `gh-pages` branch all generated content starting with `_` will be ignored and as result it will be lost in production.
- After that it creates a CNAME file with the subdomain - required because I use a custom domain instead of `<github-acount>.github.io`. It has to be added every time since all content in `gh-pages` is replaced after every run of the deploy script.
- It then stages all changes in the `/out` folder, commits and pushes it to `gh-pages`.

Using this script did the job but I didn't like how it was polluting my git log in the `main` branch with extra `Deploy gh-pages` commits; overall it wasn't looking very nice and it was doing extra operations every time it ran.

As a result I've decided to try the GitHub workflow with a deploy step using JamesIves' action: `JamesIves/github-pages-deploy-action` and I was very pleased with the result. It did solve all the problems listed above:

- it didn't add extra commits in the `main` branch
- it was replacing only files with changes in the `gh-pages`, hence there is no need anymore to add the CNAME on each deploy
- it added automatically `.nojekyll`

Furthermore the GitHub workflow allowed me to add caching and as result build time was reduced almost by half.

Here is the workflow I ended up using for a number of repos with some variations:

```yml
name: Build & Deploy

on:
  push:
    branches:
      - main
permissions:
  contents: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Caching
        uses: actions/cache@v2
        with:
          path: |
            ~/.npm
            ${{ github.workspace }}/.next/cache
          # Generate a new cache whenever packages or source files change.
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          # If source files changed but packages didn't, rebuild from a prior cache.
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-

      - name: Install and Build
        uses: actions/setup-node@v3
        with:
          node-version: '16.x'
      - run: |
          npm ci
          npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          branch: gh-pages
          folder: out
```
