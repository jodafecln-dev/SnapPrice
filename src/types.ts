export type UserIntent = 'c2c' | 'flipping' | 'buyer' | 'research';

export type ProductCondition =
  'Nuevo' | 'Como nuevo' | 'Usado - Bueno' | 'Desgaste visible' | 'Dañado';

export interface MicroQuestion {
  id: string;
  question: string;
  options: string[];
  selectedAnswer?: string;
}

export interface PlatformEstimate {
  name: string;
  price: number;
  badge: string;
}

/**
 * RealMarketSample
 * Muestra representativa y transparente de una publicación activa o venta reciente
 * en plataformas de comercio electrónico mexicanas (Mercado Libre, Marketplace, Amazon, eBay).
 */
export interface RealMarketSample {
  platform: 'Mercado Libre MX' | 'Facebook Marketplace' | 'Amazon México' | 'eBay México';
  title: string;
  price: number;
  condition: string;
  sellerReputation?: string;
  url: string;
  isSold?: boolean;
  dateReported?: string;
}

/**
 * FairMarketCalculation
 * Desglose transparente de la fórmula matemática para calcular el Valor de Mercado Justo (FMV)
 * a partir de la muestra de publicaciones, eliminando valores atípicos (estafas y sobreprecios).
 */
export interface FairMarketCalculation {
  sampleCount: number;
  outliersExcluded: number;
  medianPrice: number;
  standardDeviation?: number;
  formulaNotes: string;
  confidenceScore: number;
}

/**
 * TodayRecommendation
 * Sugerencia dinámica y en tiempo real de venta calculada para el día de hoy
 * (ej. viernes 6 de noviembre de 2026), considerando la liquidez del mercado gamer.
 */
export interface TodayRecommendation {
  todayDate: string;
  recommendedSellPriceToday: number;
  expectedSaleVelocity:
    'Venta rápida (24 a 48 hrs)' | 'Venta regular (3 a 5 días)' | 'Venta paciente (1 a 2 semanas)';
  marketMomentum: string;
  optimalListingTime: string;
  gamingDemandIndex: 'Muy Alta' | 'Alta' | 'Media' | 'Baja';
  cashInHandFast: number;
}

export type CameraGuideMode = 'console' | 'game_box' | 'controller' | 'serial_label' | 'general';

export interface ValuationResult {
  product: {
    brand: string;
    model: string;
    exactName: string;
    apparentCondition: ProductCondition;
    confidence: number;
    category: string;
    keySpecs: string[];
    notes?: string;
  };
  microCheck: MicroQuestion[];
  marketRadiography: {
    retailNewMin: number;
    retailNewMax: number;
    usedMin: number;
    usedMax: number;
    usedAverage: number;
    currency: 'MXN';
    platformEstimates: {
      mercadoLibre: number;
      amazon: number;
      marketplace: number;
    };
  };
  strategies: {
    c2c: {
      fastSalePrice: number;
      fairPrice: number;
      patientSalePrice: number;
      listingTitle: string;
      listingDescription: string;
      tips: string[];
    };
    flipping: {
      maxPurchasePrice: number;
      targetResalePrice: number;
      grossProfit: number;
      refurbBuffer: number;
      platformFee: number;
      netProfit: number;
      roiPercentage: number;
      negotiationScript: string;
    };
    buyer: {
      targetMin: number;
      targetMax: number;
      scamWarningThreshold: number;
      antiFraudAdvice: string;
      verificationChecklist: string[];
    };
    research: {
      trend: string;
      annualDepreciationRate: string;
      liquidityIndex: 'Alta' | 'Media' | 'Baja';
      marketNotes: string;
      bestTimeToSell: string;
    };
  };
  formattedReport: string;
  timestamp: string;
  imagePreviewUrl?: string;
  // Enhanced Transparency and Gaming Intelligence Fields
  realMarketSamples?: RealMarketSample[];
  fairMarketCalculation?: FairMarketCalculation;
  todayRecommendation?: TodayRecommendation;
}

export interface HistoryItem {
  id: string;
  productName: string;
  condition: string;
  averageUsedPrice: number;
  fastSalePrice: number;
  userIntent: UserIntent;
  timestamp: string;
  imageUrl?: string;
  result: ValuationResult;
}
