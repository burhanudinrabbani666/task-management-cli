export function renderFeatures(features) {
  console.log(""); // Spacing
  features.forEach((feature) =>
    console.log(`${feature.id}. ${feature.feature}`),
  );
  console.log(""); // Spacing
}
