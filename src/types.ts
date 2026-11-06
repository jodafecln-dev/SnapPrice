export type UserIntent = 'c2c' | 'flipping' | 'buyer' | 'research';

export type ProductCondition = 
  | 'Nuevo' 
  | 'Como nuevo' 
  | 'Usado - Bueno' 
  | 'Desgaste visible' 
  | 'Dañado';

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
