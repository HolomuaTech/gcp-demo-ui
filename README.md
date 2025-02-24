## Overview
This is part of the demonstration of building a hello world application on Google Cloud Run using Holomua Tech's Google Cloud Infrastructure as Code and portable CI/CD tooling.  This repository is the front end UI for the application.


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
