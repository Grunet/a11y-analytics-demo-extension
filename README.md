# a11y-analytics-demo-extension

A demo for how this could work, similar in spirit to the Google Analytics and OpenTelemetry ones

Based in part off of [Eric Bailey's excellent overview of Operating System and Browser Accessibility Display Modes](https://www.a11yproject.com/posts/operating-system-and-browser-accessibility-display-modes/) and [Kilian Valkhof's excellent overview of media query detection](https://kilianvalkhof.com/2021/web/detecting-media-query-support-in-css-and-javascript/)

## Local Development

[This Chrome Extension doc goes over how to sideload an extension into Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked) for testing.

This can't solely be done from a container-based or VM-based Cloud Development Environment (CDE) because they don't have a way to run a browser or adjust the local files it needs to read from.

The closest option that avoids working on a local machine and avoids needing to use a local Remote Desktop Protocol (RDP) client to a vanilla Virtual Machine (VM) in the cloud is to use a Desktop as a Service (Daas) platform (e.g. Microsoft Dev Box, Azure Virtual Desktop, AWS App Stream, AWS Workspaces, etc...)

The desktop can be underpowered, as long as it can run a browser fine. Combining vscode.dev for a lightweight, yet familiar way to edit local files and github.dev for copying those changes over into Git is clunky but works.

## Publishing the Extension

The `Package Artifact` Github Workflow will take care of creating the zip file the Chrome Web Store needs.

[This doc on publishing to the Chrome Web Store](https://developer.chrome.com/docs/webstore/publish/) covers the remaining (manual) steps to upload the zip file and ultimately publish the extension.

## Supply Chain Security Considerations

- The desktop used at every stage should ideally be ephemeral, to reduce the risk of long-lived compromised working environments.
- There does not appear to be a way to sign the packaged zip in a way that the Chrome Web Store can validate downstream that it hasn't been tampered with post-creation, so no signing is done.
- Automating the process of publishing the zip file is non-trivial, and the manual alternative is only as good as the person performing the process on top of the security of the desktop they're working on
- A new, dedicated Google account should be used to manage the publishing process, with 2FA and a recovery email set up
