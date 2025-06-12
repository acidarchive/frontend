export const generateMarkerPositions = (
  totalMarkers: number,
  skippedIndex: number,
  outerRadius: number,
  markerLength: number,
) => {
  return Array.from({ length: totalMarkers }, (_, index) => {
    if (index === skippedIndex) return;

    const angleDeg = index * (360 / totalMarkers);
    const angleRad = ((angleDeg - 90) * Math.PI) / 180;

    const x1 = 50 + outerRadius * Math.cos(angleRad);
    const y1 = 50 + outerRadius * Math.sin(angleRad);

    const x2 = 50 + (outerRadius + markerLength) * Math.cos(angleRad);
    const y2 = 50 + (outerRadius + markerLength) * Math.sin(angleRad);

    return { x1, y1, x2, y2 };
  }).filter(Boolean) as { x1: number; y1: number; x2: number; y2: number }[];
};
