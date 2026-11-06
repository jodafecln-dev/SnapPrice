import { ValuationResult } from '../types';

export interface SampleItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  imagePath: string;
  apparentCondition: string;
  description: string;
  initialResult: ValuationResult;
}

export const SAMPLE_PRODUCTS: SampleItem[] = [
  {
    id: 'sample-ps5-digital',
    name: 'Sony PlayStation 5 con DualSense Blanco',
    tagline: 'La consola más vendida y con mayor rotación en México',
    category: 'Consolas de Videojuegos',
    imagePath: '/src/assets/images/sample_ps5_1793599980617.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Consola Sony PlayStation 5 con mando DualSense blanco, cables originales HDMI de ultra alta velocidad, cable de corriente y base.',
    initialResult: {
      product: {
        brand: 'Sony',
        model: 'PlayStation 5 (825GB / Slim)',
        exactName: 'Sony PlayStation 5 con DualSense Blanco',
        apparentCondition: 'Como nuevo',
        confidence: 98,
        category: 'Consolas de Videojuegos',
        keySpecs: ['825GB SSD Ultrarrápido', 'Gráficos 4K HDR Ray Tracing', 'Mando DualSense Háptico', 'Puertos USB-C y HDMI 2.1'],
        notes: 'Carcasas laterales limpias sin rayones, control sin drift en análogos.',
      },
      microCheck: [
        {
          id: 'controllers_count',
          question: '¿Cuántos controles DualSense incluye?',
          options: ['1 Control original', '2 Controles originales', 'Sin control'],
          selectedAnswer: '1 Control original',
        },
        {
          id: 'digital_account',
          question: '¿Cuenta con lector de disco o es edición digital?',
          options: ['Edición Estándar (Con Lector)', 'Edición Digital'],
          selectedAnswer: 'Edición Estándar (Con Lector)',
        },
        {
          id: 'box_condition',
          question: '¿Incluye caja original y manuales?',
          options: ['Con caja y uniceles originales', 'Solo consola y cables sueltos'],
          selectedAnswer: 'Con caja y uniceles originales',
        },
      ],
      marketRadiography: {
        retailNewMin: 9899,
        retailNewMax: 11499,
        usedMin: 7200,
        usedMax: 9200,
        usedAverage: 8200,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 8600,
          amazon: 9499,
          marketplace: 7800,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 6900,
          fairPrice: 8200,
          patientSalePrice: 9100,
          listingTitle: 'Sony PS5 PlayStation 5 Impecable Con Control DualSense Caja y Cables',
          listingDescription: 'Consola Sony PlayStation 5 en excelente estado 10/10. Mando DualSense sin drift, cables originales y base. Se entrega formateada de fábrica lista para jugar. Trato serio en punto vigilado.',
          tips: ['Graba un video corto navegando en la PS Store para demostrar que no está baneada', 'Entrega en plaza comercial vigilada con acceso a corriente para probar'],
        },
        flipping: {
          maxPurchasePrice: 4100,
          targetResalePrice: 8200,
          grossProfit: 4100,
          refurbBuffer: 350,
          platformFee: 800,
          netProfit: 2950,
          roiPercentage: 72,
          negotiationScript: 'Te ofrezco $4,100 MXN en efectivo inmediato hoy mismo, trato en mano seguro y sin vueltas.',
        },
        buyer: {
          targetMin: 7200,
          targetMax: 8400,
          scamWarningThreshold: 4900,
          antiFraudAdvice: 'Alerta de estafa: Cualquier PS5 por menos de $5,000 MXN suele ser gancho para pedir apartado por OXXO. Nunca des anticipos.',
          verificationChecklist: ['Probar conexión a internet y acceso a PSN (que no esté baneada)', 'Revisar drift en sticks del control', 'Verificar puerto HDMI y lector de discos'],
        },
        research: {
          trend: 'Alta demanda sostenida en territorio nacional',
          annualDepreciationRate: '8% anual (muy resistente a pérdida de valor)',
          liquidityIndex: 'Alta',
          marketNotes: 'La consola con mayor volumen de transacciones en México. Tiempo promedio de venta: 2 a 4 días.',
          bestTimeToSell: 'Viernes de quincena o temporadas decembrinas.',
        },
      },
      formattedReport: `### 🇲🇽 SnapPrice MX - Valuación Gamer Oficial
#### 📸 Identificación del Producto
- **Producto:** Sony PlayStation 5 con DualSense Blanco
- **Estado Aparente:** Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Incluye 1 o 2 mandos DualSense?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $9,899 MXN – $11,499 MXN
- **Usado (Rango de mercado):** $7,200 MXN – $9,200 MXN
- **Promedio Usado Real:** **$8,200 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$6,900 MXN**
- ⚖️ **Precio Justo:** **$8,200 MXN**
- ⏳ **Venta Paciente:** **$9,100 MXN**`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_ps5_1793599980617.jpg',
      realMarketSamples: [
        {
          platform: 'Mercado Libre MX',
          title: 'Sony PlayStation 5 825GB Con Caja y 1 Control DualSense',
          price: 8599,
          condition: 'Usado - Como nuevo',
          sellerReputation: 'MercadoLíder Platinum (4.9★)',
          url: 'https://listado.mercadolibre.com.mx/playstation-5',
          isSold: true,
          dateReported: 'Vendido ayer',
        },
        {
          platform: 'Facebook Marketplace',
          title: 'PS5 Estándar Con Lector 1 Control Entrega CDMX',
          price: 7900,
          condition: 'Usado - Bueno',
          sellerReputation: 'Vendedor Gamer Verificado (5.0★)',
          url: 'https://www.facebook.com/marketplace/search/?query=playstation+5',
          isSold: false,
          dateReported: 'Activa hace 4 horas',
        },
        {
          platform: 'Amazon México',
          title: 'PlayStation 5 Consola Reacondicionada Certificada Renewed',
          price: 9299,
          condition: 'Reacondicionado Excelente',
          sellerReputation: 'Garantía 90 días Amazon Renewed',
          url: 'https://www.amazon.com.mx/s?k=playstation+5+renewed',
          isSold: false,
          dateReported: 'Disponible con Prime',
        },
        {
          platform: 'eBay México',
          title: 'Sony PS5 Console White Controller Complete in Box',
          price: 8450,
          condition: 'Usado - Excelente',
          sellerReputation: 'Top Rated Seller (99.6%)',
          url: 'https://www.ebay.com/sch/i.html?_nkw=playstation+5+console',
          isSold: true,
          dateReported: 'Transacción completada',
        },
      ],
      fairMarketCalculation: {
        sampleCount: 19,
        outliersExcluded: 3,
        medianPrice: 8200,
        formulaNotes: 'Mediana de 16 publicaciones válidas tras descartar 2 estafas con precio irreal (-48%) y 1 sobreprecio de importación.',
        confidenceScore: 98,
      },
      todayRecommendation: {
        todayDate: 'Viernes, 6 de noviembre de 2026',
        recommendedSellPriceToday: 6900,
        expectedSaleVelocity: 'Venta rápida (24 a 48 hrs)',
        marketMomentum: 'Fin de semana con pico de búsquedas gamer en México (+40% de tráfico)',
        optimalListingTime: 'Publicar hoy entre 6:00 PM y 9:30 PM',
        gamingDemandIndex: 'Muy Alta',
        cashInHandFast: 6900,
      },
    },
  },
  {
    id: 'sample-switch-oled',
    name: 'Nintendo Switch OLED 64GB Blanca',
    tagline: 'La consola portátil más codiciada para jugar en cualquier lugar',
    category: 'Consolas de Videojuegos',
    imagePath: '/src/assets/images/sample_ps5_1793599980617.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Nintendo Switch modelo OLED con pantalla de 7 pulgadas color blanco, Joy-Cons originales sin drift, dock con puerto LAN y cargador original.',
    initialResult: {
      product: {
        brand: 'Nintendo',
        model: 'Nintendo Switch OLED (64GB)',
        exactName: 'Nintendo Switch OLED 64GB Blanca',
        apparentCondition: 'Como nuevo',
        confidence: 97,
        category: 'Consolas Portátiles',
        keySpecs: ['Pantalla OLED vibrante de 7"', '64GB Almacenamiento Interno', 'Dock con puerto LAN Ethernet', 'Audio mejorado y soporte ancho'],
        notes: 'Pantalla OLED con mica protectora de cristal templado, Joy-Cons calibrados sin drift.',
      },
      microCheck: [
        {
          id: 'joycons_drift',
          question: '¿Los Joy-Cons presentan algún tipo de drift o desgaste?',
          options: ['100% calibrados sin drift', 'Drift leve en joystick izquierdo'],
          selectedAnswer: '100% calibrados sin drift',
        },
        {
          id: 'games_included',
          question: '¿Incluye juegos físicos o tarjeta microSD?',
          options: ['Solo consola con accesorios', 'Con 1 juego físico (Zelda/Mario)', 'Con microSD 128GB+'],
          selectedAnswer: 'Solo consola con accesorios',
        },
      ],
      marketRadiography: {
        retailNewMin: 6299,
        retailNewMax: 7699,
        usedMin: 4500,
        usedMax: 5900,
        usedAverage: 5100,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 5350,
          amazon: 6199,
          marketplace: 4800,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 4400,
          fairPrice: 5100,
          patientSalePrice: 5800,
          listingTitle: 'Nintendo Switch OLED 64GB Blanca Impecable Sin Drift En Caja',
          listingDescription: 'Nintendo Switch OLED color blanco estética 10/10 con mica de cristal. Joy-Cons al 100% sin drift. Incluye dock LAN, cargador original y caja completa. Trato serio y entrega personal.',
          tips: ['Muestra foto de la prueba de calibración de palancas en Ajustes', 'Aclara si tiene mica de cristal templado'],
        },
        flipping: {
          maxPurchasePrice: 2550,
          targetResalePrice: 5100,
          grossProfit: 2550,
          refurbBuffer: 250,
          platformFee: 500,
          netProfit: 1800,
          roiPercentage: 70,
          negotiationScript: 'Te ofrezco $2,500 MXN en efectivo inmediato hoy mismo sin intermediarios.',
        },
        buyer: {
          targetMin: 4500,
          targetMax: 5200,
          scamWarningThreshold: 3100,
          antiFraudAdvice: 'Desconfía de Switch OLED por menos de $3,500 MXN. Pide revisar el número de serie y probar ambos Joy-Cons.',
          verificationChecklist: ['Probar calibración de Joy-Cons en el menú', 'Revisar pantalla táctil y conexión al dock', 'Probar lector de tarjetas de juego'],
        },
        research: {
          trend: 'Demanda muy estable y alta reventa',
          annualDepreciationRate: '9% anual',
          liquidityIndex: 'Alta',
          marketNotes: 'Se vende en menos de 48 horas si tiene empaque y Joy-Cons sin drift.',
          bestTimeToSell: 'Días previos a vacaciones o quincena.',
        },
      },
      formattedReport: `### 🇲🇽 SnapPrice MX - Valuación Gamer Oficial
#### 📸 Identificación del Producto
- **Producto:** Nintendo Switch OLED 64GB Blanca
- **Estado Aparente:** Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Los Joy-Cons están 100% sin drift?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $6,299 MXN – $7,699 MXN
- **Usado (Rango de mercado):** $4,500 MXN – $5,900 MXN
- **Promedio Usado Real:** **$5,100 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$4,400 MXN**
- ⚖️ **Precio Justo:** **$5,100 MXN**
- ⏳ **Venta Paciente:** **$5,800 MXN**`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_ps5_1793599980617.jpg',
      realMarketSamples: [
        {
          platform: 'Mercado Libre MX',
          title: 'Nintendo Switch OLED Blanca 64GB Con Caja Impecable',
          price: 5299,
          condition: 'Usado - Como nuevo',
          sellerReputation: 'MercadoLíder Platinum (4.9★)',
          url: 'https://listado.mercadolibre.com.mx/nintendo-switch-oled',
          isSold: true,
          dateReported: 'Vendido esta semana',
        },
        {
          platform: 'Facebook Marketplace',
          title: 'Switch OLED Blanca Completa Con Dock y Cables',
          price: 4900,
          condition: 'Usado - Excelente',
          sellerReputation: 'Perfil Verificado (5★)',
          url: 'https://www.facebook.com/marketplace/search/?query=nintendo+switch+oled',
          isSold: false,
          dateReported: 'Publicado hoy',
        },
      ],
      fairMarketCalculation: {
        sampleCount: 17,
        outliersExcluded: 2,
        medianPrice: 5100,
        formulaNotes: 'Mediana de 15 publicaciones válidas en México tras eliminar sobreprecios.',
        confidenceScore: 97,
      },
      todayRecommendation: {
        todayDate: 'Viernes, 6 de noviembre de 2026',
        recommendedSellPriceToday: 4400,
        expectedSaleVelocity: 'Venta rápida (24 a 48 hrs)',
        marketMomentum: 'Excelente rotación en fines de semana',
        optimalListingTime: 'Publicar hoy entre 5:30 PM y 9:00 PM',
        gamingDemandIndex: 'Alta',
        cashInHandFast: 4400,
      },
    },
  },
  {
    id: 'sample-xbox-series-x',
    name: 'Microsoft Xbox Series X 1TB Negra',
    tagline: 'Potencia 4K 120 FPS y retrocompatibilidad total con Game Pass',
    category: 'Consolas de Videojuegos',
    imagePath: '/src/assets/images/sample_ps5_1793599980617.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Xbox Series X con 1TB de SSD NVMe de alta velocidad, lector de discos 4K UHD Blu-ray, control inalámbrico Xbox negro y cable HDMI 2.1.',
    initialResult: {
      product: {
        brand: 'Microsoft',
        model: 'Xbox Series X (1TB)',
        exactName: 'Microsoft Xbox Series X 1TB Negra',
        apparentCondition: 'Como nuevo',
        confidence: 98,
        category: 'Consolas de Videojuegos',
        keySpecs: ['12 Teraflops GPU', '1TB SSD NVMe Custom', 'Lector 4K Blu-ray Disc', 'Quick Resume & 120 FPS'],
        notes: 'Ventilador silencioso, puerto HDMI en perfecto estado, control sin desgaste en grips.',
      },
      microCheck: [
        {
          id: 'controller_series',
          question: '¿El control es el original de Series X o genérico?',
          options: ['Control original Xbox Series negro', 'Control genérico / alámbrico', '2 Controles originales'],
          selectedAnswer: 'Control original Xbox Series negro',
        },
        {
          id: 'series_box',
          question: '¿Cuenta con empaque de fábrica?',
          options: ['Con caja original', 'Solo consola con cables'],
          selectedAnswer: 'Con caja original',
        },
      ],
      marketRadiography: {
        retailNewMin: 11499,
        retailNewMax: 13299,
        usedMin: 7200,
        usedMax: 9300,
        usedAverage: 8200,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 8600,
          amazon: 9899,
          marketplace: 7800,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 6900,
          fairPrice: 8200,
          patientSalePrice: 9100,
          listingTitle: 'Xbox Series X 1TB Negra Impecable 10/10 Con Control y Caja',
          listingDescription: 'Consola Xbox Series X de 1TB en impecable estado estético y funcional. Incluye mando original inalámbrico, cable HDMI 2.1 ultra rápido y caja. Probada al 100%. Entrega en plaza comercial.',
          tips: ['Destaca si incluye meses de Game Pass activo', 'Muestra que el lector de discos lee juegos sin trabarse'],
        },
        flipping: {
          maxPurchasePrice: 4100,
          targetResalePrice: 8200,
          grossProfit: 4100,
          refurbBuffer: 300,
          platformFee: 750,
          netProfit: 3050,
          roiPercentage: 74,
          negotiationScript: 'Te ofrezco $4,000 MXN en efectivo inmediato hoy mismo sin vueltas.',
        },
        buyer: {
          targetMin: 7200,
          targetMax: 8400,
          scamWarningThreshold: 4800,
          antiFraudAdvice: 'Desconfía de ofertas por debajo de $5,000 MXN en Marketplace. Revisa que no tenga reporte de consola suspendida de Xbox Live.',
          verificationChecklist: ['Conectar a red Wi-Fi y verificar sesión de Xbox Live', 'Probar lector de discos con un juego de Xbox', 'Comprobar que el ventilador no haga ruidos extraños'],
        },
        research: {
          trend: 'Demanda constante impulsada por Xbox Game Pass',
          annualDepreciationRate: '10% anual',
          liquidityIndex: 'Alta',
          marketNotes: 'Consola muy buscada en Marketplace para jugar lanzamientos en 4K.',
          bestTimeToSell: 'Temporada de aguinaldos o quincena.',
        },
      },
      formattedReport: `### 🇲🇽 SnapPrice MX - Valuación Gamer Oficial
#### 📸 Identificación del Producto
- **Producto:** Microsoft Xbox Series X 1TB Negra
- **Estado Aparente:** Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Cuenta con caja original?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $11,499 MXN – $13,299 MXN
- **Usado (Rango de mercado):** $7,200 MXN – $9,300 MXN
- **Promedio Usado Real:** **$8,200 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$6,900 MXN**
- ⚖️ **Precio Justo:** **$8,200 MXN**
- ⏳ **Venta Paciente:** **$9,100 MXN**`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_ps5_1793599980617.jpg',
      realMarketSamples: [
        {
          platform: 'Mercado Libre MX',
          title: 'Consola Xbox Series X 1TB Con 1 Control y Cables',
          price: 8499,
          condition: 'Usado - Como nuevo',
          sellerReputation: 'MercadoLíder Platinum (4.9★)',
          url: 'https://listado.mercadolibre.com.mx/xbox-series-x',
          isSold: true,
          dateReported: 'Vendido recientemente',
        },
      ],
      fairMarketCalculation: {
        sampleCount: 15,
        outliersExcluded: 2,
        medianPrice: 8200,
        formulaNotes: 'Mediana calculada a partir de transacciones reales en México.',
        confidenceScore: 97,
      },
      todayRecommendation: {
        todayDate: 'Viernes, 6 de noviembre de 2026',
        recommendedSellPriceToday: 6900,
        expectedSaleVelocity: 'Venta rápida (24 a 48 hrs)',
        marketMomentum: 'Excelente liquidez para gamers en México',
        optimalListingTime: 'Publicar hoy entre 6:00 PM y 9:30 PM',
        gamingDemandIndex: 'Alta',
        cashInHandFast: 6900,
      },
    },
  },
  {
    id: 'sample-zelda-totk',
    name: 'The Legend of Zelda: Tears of the Kingdom (Switch Físico)',
    tagline: 'Juego físico insignia de Nintendo con el valor de reventa más alto',
    category: 'Videojuegos Físicos',
    imagePath: '/src/assets/images/sample_ps5_1793599980617.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Cartucho físico original de Nintendo Switch versión nacional/americana con caja y carátula impecables sin roturas.',
    initialResult: {
      product: {
        brand: 'Nintendo',
        model: 'Tears of the Kingdom (Edición Física Switch)',
        exactName: 'The Legend of Zelda: Tears of the Kingdom (Físico Switch)',
        apparentCondition: 'Como nuevo',
        confidence: 99,
        category: 'Videojuegos Físicos',
        keySpecs: ['Cartucho original de Nintendo', 'Caja y portada original', 'Región Americana (Compatible con cuentas de México)'],
        notes: 'Pines dorados del cartucho limpios, carátula sin dobleces ni roturas.',
      },
      microCheck: [
        {
          id: 'case_status',
          question: '¿Cuenta con su estuche plástico y portada original?',
          options: ['Con caja y portada original', 'Solo cartucho suelto'],
          selectedAnswer: 'Con caja y portada original',
        },
      ],
      marketRadiography: {
        retailNewMin: 1299,
        retailNewMax: 1599,
        usedMin: 850,
        usedMax: 1100,
        usedAverage: 950,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 1050,
          amazon: 1299,
          marketplace: 900,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 800,
          fairPrice: 950,
          patientSalePrice: 1050,
          listingTitle: 'The Legend of Zelda Tears of the Kingdom Nintendo Switch Físico Como Nuevo',
          listingDescription: 'Juego original The Legend of Zelda Tears of the Kingdom para Nintendo Switch. Estuche y cartucho en perfecto estado 10/10. Pines limpios funcionando al 100%. Entrega en punto céntrico.',
          tips: ['Fotografía los pines traseros del cartucho para comprobar que son dorados originales', 'Aclara que es compatible con cualquier modelo de Switch'],
        },
        flipping: {
          maxPurchasePrice: 450,
          targetResalePrice: 950,
          grossProfit: 500,
          refurbBuffer: 50,
          platformFee: 90,
          netProfit: 360,
          roiPercentage: 80,
          negotiationScript: 'Te ofrezco $450 MXN en efectivo inmediato hoy mismo, paso por él.',
        },
        buyer: {
          targetMin: 850,
          targetMax: 980,
          scamWarningThreshold: 550,
          antiFraudAdvice: 'Desconfía de precios menores a $550 MXN o cuentas que vendan "códigos digitales por WhatsApp". Exige cartucho físico probado.',
          verificationChecklist: ['Comprobar que el cartucho sea reconocido al insertarlo en la Switch', 'Revisar que la portada no sea una copia impresa en papel bond', 'Verificar código de región USA/MEX'],
        },
        research: {
          trend: 'Valor de reventa extremadamente estable (los juegos de Zelda no se deprecian)',
          annualDepreciationRate: '3% anual (mantiene valor como oro)',
          liquidityIndex: 'Alta',
          marketNotes: 'De los juegos más fáciles de liquidar en México en menos de 24 horas.',
          bestTimeToSell: 'Cualquier fin de semana.',
        },
      },
      formattedReport: `### 🇲🇽 SnapPrice MX - Valuación Gamer Oficial
#### 📸 Identificación del Producto
- **Producto:** The Legend of Zelda: Tears of the Kingdom (Físico Switch)
- **Estado Aparente:** Como nuevo

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $1,299 MXN – $1,599 MXN
- **Usado (Rango de mercado):** $850 MXN – $1,100 MXN
- **Promedio Usado Real:** **$950 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$800 MXN**
- ⚖️ **Precio Justo:** **$950 MXN**
- ⏳ **Venta Paciente:** **$1,050 MXN**`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_ps5_1793599980617.jpg',
      realMarketSamples: [
        {
          platform: 'Mercado Libre MX',
          title: 'Zelda Tears of the Kingdom Nintendo Switch Físico Original',
          price: 999,
          condition: 'Usado - Como nuevo',
          sellerReputation: 'MercadoLíder Platinum (4.9★)',
          url: 'https://listado.mercadolibre.com.mx/zelda-tears-of-the-kingdom',
          isSold: true,
          dateReported: 'Vendido hoy',
        },
      ],
      fairMarketCalculation: {
        sampleCount: 22,
        outliersExcluded: 3,
        medianPrice: 950,
        formulaNotes: 'Mediana de 19 ventas registradas en plataformas mexicanas.',
        confidenceScore: 99,
      },
      todayRecommendation: {
        todayDate: 'Viernes, 6 de noviembre de 2026',
        recommendedSellPriceToday: 800,
        expectedSaleVelocity: 'Venta rápida (24 a 48 hrs)',
        marketMomentum: 'Juego de culto con demanda continua en todo México',
        optimalListingTime: 'Publicar hoy entre 4:00 PM y 8:00 PM',
        gamingDemandIndex: 'Muy Alta',
        cashInHandFast: 800,
      },
    },
  },
];
