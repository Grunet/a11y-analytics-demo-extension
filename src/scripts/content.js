captureAndEmitData();

function captureAndEmitData() {
  console.log("Attributes to segment by");

  captureAndEmitKeyboardData();

  captureAndEmitMediaFeatureData();
}

function captureAndEmitKeyboardData() {
  const intervalId = setInterval(function checkForKeyboardUsage() {
    // console.log(
    //   `A11y Analytics Demo - Keyboard Detection - Start time: ${performance.now()}`
    // );

    const focusedElement = document.querySelector(":focus-visible");

    if (!focusedElement) {
      return;
    }

    // Ignore common false positives for click/touch users
    const tagNameUpperCased = focusedElement.tagName.toUpperCase();
    if (tagNameUpperCased === "INPUT" || tagNameUpperCased === "TEXTAREA") {
      return;
    }

    if (focusedElement.contentEditable === "true") {
      return;
    }

    console.log(`uses-keyboard: true`);

    clearInterval(intervalId);

    // console.log(
    //   `A11y Analytics Demo - Keyboard Detection - End time: ${performance.now()}`
    // ); // Around 1 ms
  }, 500);
}

function captureAndEmitMediaFeatureData() {
  //   console.log(
  //     `A11y Analytics Demo - Media Features - Start time: ${performance.now()}`
  //   );

  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  logMediaFeatureBasedPreference({
    mediaFeature: "prefers-reduced-motion",
    possibleValues: ["no-preference", "reduce"],
  });

  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  logMediaFeatureBasedPreference({
    mediaFeature: "prefers-color-scheme",
    possibleValues: ["light", "dark"],
  });

  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors - Safari only currently
  logMediaFeatureBasedPreference({
    mediaFeature: "inverted-colors",
    possibleValues: ["none", "inverted"],
  });

  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
  logMediaFeatureBasedPreference({
    mediaFeature: "forced-colors",
    possibleValues: ["none", "active"],
  });

  //   console.log(
  //     `A11y Analytics Demo - Media Features - End time: ${performance.now()}`
  //   ); // Around 10ms
}

function logMediaFeatureBasedPreference({ mediaFeature, possibleValues }) {
  if (checkIfBrowserSupportsMediaFeature({ mediaFeature }) === false) {
    return;
  }

  const resolvedMediaQueries = possibleValues.map((possibleValue) => {
    return {
      possibleValue,
      mediaQueryResult: window.matchMedia(`(${mediaFeature}: ${possibleValue})`)
        .matches,
    };
  });

  const mediaQueryThatResolvedToTrue = resolvedMediaQueries.find(
    ({ possibleValue, mediaQueryResult }) => mediaQueryResult === true
  );

  if (mediaQueryThatResolvedToTrue === undefined) {
    console.log(
      `Something went wrong. Is there a new ${mediaFeature} allowed value not accounted for here?`
    );
    return;
  }

  const preferredValue = mediaQueryThatResolvedToTrue.possibleValue;

  console.log(`${mediaFeature}: ${preferredValue}`);
}

function checkIfBrowserSupportsMediaFeature({ mediaFeature }) {
  const isMediaFeatureSupportedByTheBrowser = window.matchMedia(
    `not all and (${mediaFeature}), (${mediaFeature})`
  ).matches;

  if (!isMediaFeatureSupportedByTheBrowser) {
    console.log(`Your browser doesn't support ${mediaFeature} yet`);

    return false;
  }

  return true;
}
