# a11y-analytics-demo-extension
A demo for how this could work, similar in spirit to the Google Analytics and OpenTelemetry ones

## Local Development

[This Chrome Extension doc goes over how to sideload an extension into Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) for testing.

This can't solely be done from a container-based or VM-based Cloud Development Environment (CDE) because they don't have a way to run a browser or adjust the local files it needs to read from.

The closest option that avoids working on a local machine is to use a Desktop as a Service (Daas) platform (e.g. Microsoft Dev Box, Azure Virtual Desktop, AWS App Stream, AWS Workspaces, etc...)
