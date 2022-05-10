---
title: Set up automation tests in CircleCI
date: 2018-12-09
description: Description of the work done integrating e2e test in the CircleCI CI/CD. Article contains also yaml file for each of the jobs discussed.
---

Recently the company I work for moved the CI/CD from Shippable to CircleCI. This is a quick guide on how to create a job and workflow.I have created two different workflows for my needs . One called **nightly** running all tests from the feature tests repo every day from Monday to Friday at 4am and one used externally from the application under test workflow called **feature-tests**.

## Nightly

First create the job. I have called mine tests. Then I specified the base docker image I want to use for the job, i.e. `circleci/ruby:2.5-browsers-legacy`. I won't go in too much detail for all the steps because they will be generated automatically for you once you add you automation tests in CircleCI (for more information see [here](https://circleci.com/docs/2.0/project-build/#section=getting-started)). The most important thing to know about the job is that you'll have to use bundle install cucumber instead of just cucumber because all gems will be installed in a custom location `bundle install --jobs=4 --retry=3 --path vendor/bundle`. The other tip is to specify the path where the test reports can be found after completion - `store_test_results: path: /tmp`. Make sure the path set is the same as the one you have in `cucumber.yml`. Also make sure the output format is junit so you can see the number of passing and failing tests at first glance in the tab **Results** after the job is finished.

```yml
# /.circleci/config.yml
# Ruby CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-ruby/ for more details
#
jobs:
  test:
    docker:
      - image: circleci/ruby:2.5-browsers-legacy
    working_directory: ~/repo
    steps:
      - checkout
      # Download and cache dependencies
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "Gemfile.lock" }}
            # fallback to using the latest cache if no exact match is found
            - v1-dependencies-

      - run:
          name: install dependencies
          command: |
            bundle install --jobs=4 --retry=3 --path vendor/bundle

      - save_cache:
          paths:
            - ./vendor/bundle
          key: v1-dependencies-{{ checksum "Gemfile.lock" }}

      # run tests!
      - run:
          name: run tests
          command: |
            bundle exec cucumber features/ -p remote LOCATION=GB

      # collect reports
      - store_test_results:
          path: /tmp
      - store_artifacts:
          path: /reports

workflows:
  version: 2
  nightly:
    triggers:
      - schedule:
          cron: '0 4 * * 1-5'
          filters:
            branches:
              only:
                - master
    jobs:
      - test:
          context: featuretests
```

After you finish with the job section, create nightly workflow that runs on a schedule. Set the time when the job should be triggered in the `cron` field and set the branch with the code you want executed. In the `job` field declare you want this workflow to run the job set up above, i.e. `test` and in the `context` field set the name set in CircleCI with all project secrets.

## Feature-tests

Just like in the example above we start with creating job which we'll use in the workflow section. But unlike in the previous example we won't run the tests from their own repo but instead they'll be called externally from the repository of the app we're testing. My first attempt was to create steps to pull, bundle and execute tests but it failed because of the way CircleCI handles ssh keys. I have tried setting up the keys in a step as described in the docs but it didn't work.

```yml
steps:
  - add_ssh_keys:
      fingerprints:
        - 'SO:ME:FIN:G:ER:PR:IN:T'
```

My assumption was that during build the job will use the ssh keys set in the circleci project secrets section if no fingerprints field present in the steps and once it gets to a step with fingerprints it will use the ones provided. It turns out that if there are ssh keys set CircleCI doesn't look for any other and uses the same set for authentications. I already had a docker image for my tests and all I had to do was to pull my image and use it to spin a container for my tests. The rest of the steps are similar to the nightly example except the caching and installation of dependencies.

```yml
feature-tests:
  docker:
    - image: name-of-your-image.xxx.xxx.eu-west-1.amazonaws.com/feature-tests:latest
  working_directory: /app
  steps:
    - run:
        name: run tests
        command: |
          bundle exec cucumber features/app_under_test
    # collect reports
    - store_test_results:
        path: /tmp
    - store_artifacts:
        path: /reports
```

Once the job was defined I was ready to include it in the project workflow. I wanted my tests to run once the application under test was deployed to staging. To do so I used the `requires` field and set it up to `deploy` and also specified in filters > branches that I only want to run the tests when the application is deployed in staging.

```yml
# /.circleci/config.yml
version: 2
workflows:
  version: 2
  build_test_deploy:
    jobs:
      - deploy:
          context: aws
          filters:
            branches:
              only:
                - staging
                - production
      - feature-tests:
          requires:
            - deploy
          context: featuretests
          filters:
            branches:
              only:
                - staging
```

When you work on the config file be very careful with the indentation. Before trying your config live you can run validation if you have CircleCI's cli installed, i.e. `circleci config validate`. Using the cli you can also run the build locally. For more information go to [local-cli](https://circleci.com/docs/2.0/local-cli/).

Complete file `config.yml`:

```yml
version: 2
workflows:
  version: 2
  build_test_deploy:
    jobs:
      - deploy:
          context: aws
          filters:
            branches:
              only:
                - staging
                - production
      - feature-tests:
          requires:
            - deploy
          context: featuretests
          filters:
            branches:
              only:
                - staging
jobs:
  deploy:
    docker:
      - image: application-image.xxx.xxx.eu-west-1.amazonaws.com/node:latest
    working_directory: ~/code
    steps:
      - checkout
      - restore_cache: # special step to restore the dependency cache
          key: dependency-cache-{{ checksum "yarn.lock" }}
      - run:
          name: yarn
          command: yarn --no-progress
      - save_cache: # special step to save the dependency cache
          key: dependency-cache-{{ checksum "yarn.lock" }}
          paths:
            - ./node_modules
      - run:
          name: node-sass
          command: npm rebuild node-sass
      - run:
          name: yarn test
          command: yarn test
      - run:
          name: yarn build
          command: NODE_ENV=$CIRCLE_BRANCH yarn build
      - run:
          name: deploy
          command: ./deploy.sh
  feature-tests:
    docker:
      - image: feat-tests-image.xxx.xxx.eu-west-1.amazonaws.com/feature-tests:latest
    working_directory: /app
    steps:
      - run:
          name: run tests
          command: |
            bundle exec cucumber features/application_under_test
      # collect reports
      - store_test_results:
          path: /tmp
      - store_artifacts:
          path: /reports
```
