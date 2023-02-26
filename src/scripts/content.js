
console.log(`A11y Analytics Demo - Start time: ${performance.now()}`);
captureAndEmitData();
console.log(`A11y Analytics Demo - End time: ${performance.now()}`);

function captureAndEmitData() {
    console.log("Attributes to segment by");

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
    logMediaFeatureBasedPreference({
        mediaFeature: "prefers-reduced-motion", 
        possibleValues: ["no-preference", "reduce"]
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
    logMediaFeatureBasedPreference({
        mediaFeature: "prefers-color-scheme", 
        possibleValues: ["light", "dark"]
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors - Safari only currently
    logMediaFeatureBasedPreference({
        mediaFeature: "inverted-colors", 
        possibleValues: ["none", "inverted"]
    });

    // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
    logMediaFeatureBasedPreference({
        mediaFeature: "forced-colors", 
        possibleValues: ["none", "active"]
    });
}

function logMediaFeatureBasedPreference({mediaFeature, possibleValues}) {
    if (checkIfBrowserSupportsMediaFeature({mediaFeature}) === false) {
        return;
    }

    const resolvedMediaQueries = possibleValues.map((possibleValue) => {
        return {
            possibleValue, 
            mediaQueryResult: window.matchMedia(`(${mediaFeature}: ${possibleValue})`).matches
        };
    });

    const mediaQueryThatResolvedToTrue = resolvedMediaQueries.find(({possibleValue, mediaQueryResult}) => mediaQueryResult === true);

    if (mediaQueryThatResolvedToTrue === undefined) {
        console.log(`Something went wrong. Is there a new ${mediaFeature} allowed value not accounted for here?`);
        return;
    }

    const preferredValue = mediaQueryThatResolvedToTrue.possibleValue;

    console.log(`${mediaFeature}: ${preferredValue}`);
}

function checkIfBrowserSupportsMediaFeature({mediaFeature}) {
    const isMediaFeatureSupportedByTheBrowser = window.matchMedia(
        `not all and (${mediaFeature}), (${mediaFeature})`
    ).matches;

    if (!isMediaFeatureSupportedByTheBrowser) {
        console.log(`Your browser doesn't support ${mediaFeature} yet`);

        return false;
    }

    return true;
}
