export function renderFeatures(features) {
  features.forEach((feature) =>
    console.log(`${feature.id}. ${feature.feature}`),
  );
  console.log(""); // Spacing
}
