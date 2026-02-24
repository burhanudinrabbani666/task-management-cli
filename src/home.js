const features = [
  { id: 1, feature: "Add Task" },
  { id: 2, feature: "View all task" },
  { id: 3, feature: "Close" },
];

export function renderFeatures() {
  features.forEach((feature) =>
    console.log(`${feature.id}. ${feature.feature}`),
  );
  console.log(""); // Spacing
}
