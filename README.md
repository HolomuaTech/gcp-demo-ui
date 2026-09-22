## Overview
This is part of the demonstration of building a hello world application on Google Cloud Run using Holomua Tech's Google Cloud Infrastructure as Code and portable CI/CD tooling.  This repository is the front end UI for the application.

## Belay Build Grouping

Cloud Build runs Portage before the image is pushed and deployed to Cloud Run. Portage passes three values to Belay as an all-or-none contract. A build group is scoped to one Belay-managed repository:

- `PORTAGE_BUILD_GROUP_ID` identifies one complete Cloud Build invocation. This build maps it to `gcp:$PROJECT_ID:$BUILD_ID`.
- `PORTAGE_IMAGE_NAME` identifies the image built by the current Portage invocation. It is the complete Artifact Registry path without a mutable tag such as `:latest`.
- `PORTAGE_BUILD_IMAGE_NAMES` is the comma-delimited list of every tagless image name expected in the build group.

This repository builds one image, so the two image-name values are identical. If one Cloud Build invocation builds multiple images, every Portage step must receive the same group ID and complete image list while receiving its own image name. A retry that starts a new Cloud Build invocation receives a new `BUILD_ID` and creates a new build group.

Separate Cloud Build invocations do not share a `BUILD_ID`. When separate builds submit images for the same Belay-managed repository, their orchestrator must generate one shared identifier, pass it to each build as a custom substitution such as `_PORTAGE_BUILD_GROUP_ID`, and pass the same complete image list to every Portage invocation. `gcp-demo-ui` and `gcp-demo-api` are separate managed repositories, so they remain separate singleton build groups and cannot be joined with a shared ID today.


## To run unit tests and generate coverage report
```
npm run test
npm run coverage
```

## To run the application
```
npm run dev
```

## For docker image build
```
docker build -t doe-demo-ui .
```

## For docker image run
```
docker run -p 3000:3000 doe-demo-ui
```
Trigger prod build Mon Feb 24 11:49:47 HST 2025
Trigger prod build Mon Feb 24 12:45:17 HST 2025

Trigger prod build Mon Feb 24 19:15:13 HST 2025
## Build Status
Last Updated: Tue Feb 25 13:52:22 HST 2025
Last Updated: Tue Feb 25 14:40:02 HST 2025 - Testing prod pipeline
