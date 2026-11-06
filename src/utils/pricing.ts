/**
 * SnapPrice MX - Motor de Cálculo Matemático y Valuación
 * Funciones puras para determinación de Fair Market Value (FMV),
 * purga de valores atípicos y cálculo de rangos de venta en México (MXN).
 */

export interface MarketListing {
  platform: string;
  title: string;
  priceMXN: number;
  condition: string;
}

export interface FMVCalculationResult {
  medianFMV: number;
  cleanedCount: number;
  outliersRemoved: number;
  fastSalePrice: number;
  patientSalePrice: number;
}

/**
 * Filtra publicaciones sospechosas de estafa (precios absurdamente bajos)
 * o sobreprecios abusivos respecto a una estimación base.
 */
export function filterMarketOutliers(
  prices: number[],
  benchmarkEstimate: number
): { cleanPrices: number[]; outliersCount: number } {
  if (!prices || prices.length === 0) {
    return { cleanPrices: [benchmarkEstimate], outliersCount: 0 };
  }

  const minThreshold = benchmarkEstimate * 0.60; // -40% (umbral de alerta de estafa)
  const maxThreshold = benchmarkEstimate * 1.45; // +45% (umbral de sobreprecio especulativo)

  const cleanPrices = prices.filter(p => p >= minThreshold && p <= maxThreshold);
  const outliersCount = prices.length - cleanPrices.length;

  return {
    cleanPrices: cleanPrices.length > 0 ? cleanPrices : [benchmarkEstimate],
    outliersCount,
  };
}

/**
 * Calcula la mediana matemática de una lista de precios en MXN.
 */
export function calculateMedian(numbers: number[]): number {
  if (!numbers || numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
  }
  return Math.round(sorted[middle]);
}

/**
 * Calcula el Valor de Mercado Justo (FMV) y los rangos de venta rápida
 * y venta con paciencia para vendedores en México.
 */
export function calculateFairMarketPricing(
  samplePrices: number[],
  benchmarkEstimate: number
): FMVCalculationResult {
  const { cleanPrices, outliersCount } = filterMarketOutliers(samplePrices, benchmarkEstimate);
  const medianFMV = calculateMedian(cleanPrices);

  // Venta rápida (24-48 horas): 15% por debajo de la mediana
  const fastSalePrice = Math.round((medianFMV * 0.85) / 50) * 50;

  // Venta con paciencia (1-3 semanas): 10% por encima de la mediana
  const patientSalePrice = Math.round((medianFMV * 1.10) / 50) * 50;

  return {
    medianFMV,
    cleanedCount: cleanPrices.length,
    outliersRemoved: outliersCount,
    fastSalePrice,
    patientSalePrice,
  };
}

/**
 * Validador de archivos de imagen para evitar cargas no soportadas o excesivas
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato no soportado. Por favor sube una imagen JPG, PNG o WebP.',
    };
  }

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: 'La imagen excede el límite de 10 MB. Elige una imagen más ligera.',
    };
  }

  return { valid: true };
}

/**
 * Formateador de moneda oficial para México
 */
export function formatCurrencyMXN(val: number): string {
  if (!val || isNaN(val)) return '$0 MXN';
  return `$${Math.round(val).toLocaleString('es-MX')} MXN`;
}
