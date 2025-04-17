export function translateShapeToSpanish(shapeName: string): string {
  const shapeTranslations: Record<string, string> = {
    ball: "Bola",
    squiggle: "Serpenteante",
    fish: "Pez",
    arms: "Con brazos",
    blob: "Masa",
    upright: "Erguido",
    legs: "Con piernas",
    quadruped: "Cuadrúpedo",
    wings: "Alado",
    tentacles: "Con tentáculos",
    heads: "Con varias cabezas",
    humanoid: "Humanoide",
    "bug-wings": "Insecto con alas",
    armor: "Acorazado",
  };

  return shapeTranslations[shapeName] || shapeName;
}
