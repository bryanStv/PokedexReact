import { Generation } from '../models/Pokemon';

export class PokemonUtils {
  static readonly MAX_STATS = {
    hp: 255, // Blissey
    attack: 181, // Kartana
    defense: 250, // Eternamax
    specialAttack: 194, // Mega Mewtwo Y
    specialDefense: 250, // Eternamax
    speed: 200, // Regieleki
  };

  private static generations: Generation[] = [
    { id: 1, label: 'Gen I', startId: 1, endId: 151 },
    { id: 2, label: 'Gen II', startId: 152, endId: 251 },
    { id: 3, label: 'Gen III', startId: 252, endId: 386 },
    { id: 4, label: 'Gen IV', startId: 387, endId: 493 },
    { id: 5, label: 'Gen V', startId: 494, endId: 649 },
    { id: 6, label: 'Gen VI', startId: 650, endId: 721 },
    { id: 7, label: 'Gen VII', startId: 722, endId: 809 },
    { id: 8, label: 'Gen VIII', startId: 810, endId: 905 },
    { id: 9, label: 'Gen IX', startId: 906, endId: Infinity },
  ];

  static getGenerationFromId(pokemonId: number): number {
    const generation = this.generations.find(
      (gen) => pokemonId >= gen.startId && pokemonId <= gen.endId
    );
    return generation?.id || 1;
  }

  static getGenerationStartId(generationId: number): number {
    return (
      this.generations.find((gen) => gen.id === generationId)?.startId || 1
    );
  }

  static getAllGenerations(): Generation[] {
    return this.generations;
  }

  static getGenerationData(): Array<{ label: string; id: number }> {
    return this.generations.map((gen) => ({
      label: gen.label,
      id: gen.startId,
    }));
  }

  static getImagenFromEnum = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  static getKgFromHg = (hectograms: number): number => {
    return hectograms / 10;
  };

  static getRandomPokemonId: () => number = () => {
    const max: number = 1025; // número total de pokémon
    const randomId: number = Math.floor(Math.random() * max) + 1;
    return randomId;
  };

  static getColorMap = (colorName: string): string => {
    const colorMap: Record<string, string> = {
      red: '#ffebee',
      blue: '#e3f2fd',
      yellow: '#fffde7',
      green: '#e8f5e9',
      black: '#eeeeee',
      brown: '#efebe9',
      gray: '#f5f5f5',
      pink: '#fce4ec',
      purple: '#f3e5f5',
      white: '#ffffff',
    };

    return colorMap[colorName] || '#f9f9f9';
  };

  static getTypeColor(type: string) {
    const colors: Record<string, string> = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    if (!type) return '#777';
    return colors[type?.toLowerCase()] || '#777';
  }

  static getTypeInSpanish(type: string): string {
    const translations: Record<string, string> = {
      normal: 'Normal',
      fire: 'Fuego',
      water: 'Agua',
      electric: 'Eléctrico',
      grass: 'Planta',
      ice: 'Hielo',
      fighting: 'Lucha',
      poison: 'Veneno',
      ground: 'Tierra',
      flying: 'Volador',
      psychic: 'Psíquico',
      bug: 'Bicho',
      rock: 'Roca',
      ghost: 'Fantasma',
      dragon: 'Dragón',
      dark: 'Siniestro',
      steel: 'Acero',
      fairy: 'Hada',
    };

    if (!type) return 'Desconocido';
    return translations[type.toLowerCase()] || 'Desconocido';
  }

  static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getSafeTypeColor(type?: string): string {
    return this.getTypeColor(type || 'normal');
  }

  static translateShapeToSpanish(shapeName: string): string {
    const shapeTranslations: Record<string, string> = {
      ball: 'Bola',
      squiggle: 'Serpenteante',
      fish: 'Pez',
      arms: 'Con brazos',
      blob: 'Masa',
      upright: 'Erguido',
      legs: 'Con piernas',
      quadruped: 'Cuadrúpedo',
      wings: 'Alado',
      tentacles: 'Con tentáculos',
      heads: 'Con varias cabezas',
      humanoid: 'Humanoide',
      'bug-wings': 'Insecto con alas',
      armor: 'Acorazado',
    };

    return shapeTranslations[shapeName] || shapeName;
  }

  static calculateStatPercentage(
    stat: number,
    statType: keyof typeof this.MAX_STATS
  ): number {
    const max = this.MAX_STATS[statType];
    return parseFloat(((stat / max) * 100).toFixed(2));
  }
}
