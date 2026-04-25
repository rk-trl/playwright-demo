# US006 - Intentional Failure Demo

## Overview
Deliberately failing test to demonstrate how Playwright reports failures in the HTML report.
This test asserts an incorrect page title so it always fails — showing a red entry, trace link, and failure screenshot in the report.

## Steps
- Open the home page
- Capture screenshot before assertion
- Assert page title is an intentionally wrong value

## Screenshots
- before-failure.png

## Assertions
- Page title equals "WRONG TITLE" (deliberately incorrect — always fails)
