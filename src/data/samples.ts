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
    id: 'sample-iphone-13-pro',
    name: 'Apple iPhone 13 Pro 128GB Grafito',
    tagline: 'Gama alta muy buscado en Facebook Marketplace y Mercado Libre',
    category: 'Smartphones & Telefonía',
    imagePath: '/src/assets/images/sample_iphone_1793599980253.jpg',
    apparentCondition: 'Como nuevo',
    description: 'iPhone 13 Pro de 128GB color Grafito, estética 9.5/10 sin rayones en pantalla, batería 88%, libre para cualquier compañía en México con cable original.',
    initialResult: {
      product: {
        brand: 'Apple',
        model: 'iPhone 13 Pro (128GB)',
        exactName: 'Apple iPhone 13 Pro 128GB Grafito',
        apparentCondition: 'Como nuevo',
        confidence: 96,
        category: 'Smartphones',
        keySpecs: ['128GB Almacenamiento', 'Pantalla Super Retina XDR 120Hz', 'Cámara Triple 12MP Telefoto', 'Chip A15 Bionic'],
        notes: 'Chasis de acero inoxidable sin abolladuras, módulo de cámaras impecable.',
      },
      microCheck: [
        {
          id: 'storage',
          question: '¿Qué capacidad de almacenamiento tiene tu iPhone?',
          options: ['128 GB', '256 GB', '512 GB', '1 TB'],
          selectedAnswer: '128 GB',
        },
        {
          id: 'battery_health',
          question: '¿Cuál es el porcentaje de condición de la batería?',
          options: ['90% o más (Excelente)', '84% a 89% (Buena)', 'Menos de 80% (Mantenimiento)'],
          selectedAnswer: '84% a 89% (Buena)',
        },
        {
          id: 'box_accessories',
          question: '¿Incluye caja y accesorios originales?',
          options: ['Caja + Cable original', 'Solo equipo suelto', 'Caja + Cubo 20W + Fundas'],
          selectedAnswer: 'Caja + Cable original',
        },
      ],
      marketRadiography: {
        retailNewMin: 18999,
        retailNewMax: 21999,
        usedMin: 8500,
        usedMax: 11800,
        usedAverage: 9800,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 10400,
          amazon: 11200,
          marketplace: 9400,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 8200,
          fairPrice: 9800,
          patientSalePrice: 11200,
          listingTitle: 'iPhone 13 Pro 128GB Grafito Libre Fábrica Impecable Con Caja',
          listingDescription: 'iPhone 13 Pro 128GB Grafito en excelente estado estético (9.5/10). Pantalla y cámaras intactas, batería al 88%, libre para cualquier compañía nacional. Se entrega con caja y cable USB-C a Lightning original. Trato serio y directo.',
          tips: ['Publica fotos con la pantalla encendida mostrando el IMEI y condición de batería', 'Evita transferencias falsas; entrega en plaza comercial vigilada'],
        },
        flipping: {
          maxPurchasePrice: 4900,
          targetResalePrice: 9800,
          grossProfit: 4900,
          refurbBuffer: 600,
          platformFee: 950,
          netProfit: 3350,
          roiPercentage: 68,
          negotiationScript: 'Te ofrezco $4,800 MXN en efectivo inmediato hoy mismo sin vueltas, tomando en cuenta la salud de batería y comisiones de venta.',
        },
        buyer: {
          targetMin: 8500,
          targetMax: 9900,
          scamWarningThreshold: 5880,
          antiFraudAdvice: 'Desconfía de publicaciones por debajo de $5,900 MXN. Exige ver la cuenta iCloud desvinculada enfrente de ti y prueba chip Telcel/AT&T.',
          verificationChecklist: ['Cerrar sesión de iCloud y formatear en persona', 'Revisar pantalla original en Ajustes (Pieza desconocida)', 'Probar Face ID y cámaras x0.5, x1, x3', 'Verificar que no tenga reporte de robo o bloqueo de operadora'],
        },
        research: {
          trend: 'Estable con alta liquidez',
          annualDepreciationRate: '12% anual (muy resistente a depreciación)',
          liquidityIndex: 'Alta',
          marketNotes: 'Los modelos Pro de Apple conservan el valor más alto del mercado mexicano. Tiempo promedio de venta: 3 a 6 días.',
          bestTimeToSell: 'Antes de los lanzamientos de septiembre de Apple.',
        },
      },
      formattedReport: `#### 📸 Identificación del Producto
- **Producto:** Apple iPhone 13 Pro (128GB) Grafito
- **Estado Aparente:** Usado - Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Salud de batería arriba del 85%? ¿Caja original incluida?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $18,999 MXN – $21,999 MXN
- **Usado (Rango de mercado):** $8,500 MXN – $11,800 MXN
- **Promedio Usado Real:** **$9,800 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$8,200 MXN** (Ideal para cerrar trato en menos de 48-72 hrs).
- ⚖️ **Precio Justo:** **$9,800 MXN** (Recomendado para Mercado Libre / Marketplace).
- ⏳ **Venta Paciente:** **$11,200 MXN** (Si cuentas con caja, accesorios y cero prisa).
- 📝 **Ficha para Publicar (Copia y Pega):**
  - **Título SEO sugerido:** iPhone 13 Pro 128GB Grafito Libre Fábrica Impecable Con Caja
  - **Descripción corta:** iPhone 13 Pro 128GB Grafito estética 9.5/10. Libre de fábrica para cualquier chip. Batería al 88%, incluye caja original y cable. Trato en plaza comercial.`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_iphone_1793599980253.jpg',
    },
  },
  {
    id: 'sample-ps5-digital',
    name: 'Sony PlayStation 5 Edición Digital',
    tagline: 'Consola con alta rotación en el mercado gamer mexicano',
    category: 'Consolas & Videojuegos',
    imagePath: '/src/assets/images/sample_ps5_1793599980617.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Consola PS5 Digital color blanco con control DualSense, cable HDMI de alta velocidad, cable de corriente y base original.',
    initialResult: {
      product: {
        brand: 'Sony',
        model: 'PlayStation 5 Edición Digital (825GB)',
        exactName: 'Sony PlayStation 5 Digital Edition con DualSense',
        apparentCondition: 'Como nuevo',
        confidence: 98,
        category: 'Consolas',
        keySpecs: ['825GB SSD Ultrarrápido', 'Gráficos 4K HDR Ray Tracing', 'Mando DualSense con retroalimentación háptica', 'Sin lector de disco'],
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
          question: '¿Se entrega con o sin juegos/suscripción?',
          options: ['Solo consola reseteada de fábrica', 'Incluye cuenta con juegos digitales'],
          selectedAnswer: 'Solo consola reseteada de fábrica',
        },
      ],
      marketRadiography: {
        retailNewMin: 9499,
        retailNewMax: 11299,
        usedMin: 6500,
        usedMax: 8200,
        usedAverage: 7300,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 7600,
          amazon: 8999,
          marketplace: 6900,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 6100,
          fairPrice: 7300,
          patientSalePrice: 8100,
          listingTitle: 'Sony PS5 PlayStation 5 Digital Impecable Con Control DualSense y Base',
          listingDescription: 'Consola Sony PlayStation 5 Edición Digital en perfecto estado 10/10. Incluye mando inalámbrico DualSense blanco sin drift, cables HDMI y de poder originales más base. Lista para conectar y jugar.',
          tips: ['Graba un video corto encendiendo y navegando en la PlayStation Store', 'Entrega en punto neutro con corriente para probar si el comprador lo solicita'],
        },
        flipping: {
          maxPurchasePrice: 3650,
          targetResalePrice: 7300,
          grossProfit: 3650,
          refurbBuffer: 300,
          platformFee: 650,
          netProfit: 2700,
          roiPercentage: 74,
          negotiationScript: 'Ofrezco $3,600 MXN en efectivo inmediato hoy mismo, pago seguro en persona.',
        },
        buyer: {
          targetMin: 6400,
          targetMax: 7400,
          scamWarningThreshold: 4380,
          antiFraudAdvice: 'Alerta de estafa: Cualquier PS5 por menos de $4,500 MXN suele ser anticipo fantasma. Jamás deposites antes de tenerla en las manos.',
          verificationChecklist: ['Probar conexión a internet y acceso a PlayStation Network (que no esté baneada)', 'Revisar drift en los sticks del control', 'Verificar puertos USB y conector HDMI'],
        },
        research: {
          trend: 'Alta demanda sostenida en México',
          annualDepreciationRate: '8% anual',
          liquidityIndex: 'Alta',
          marketNotes: 'De las consolas más fáciles de vender en México en menos de 5 días si está a buen precio.',
          bestTimeToSell: 'Días previos a quincena, Navidad o Día del Niño.',
        },
      },
      formattedReport: `#### 📸 Identificación del Producto
- **Producto:** Sony PlayStation 5 Edición Digital (825GB)
- **Estado Aparente:** Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Incluye 1 o 2 mandos DualSense?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $9,499 MXN – $11,299 MXN
- **Usado (Rango de mercado):** $6,500 MXN – $8,200 MXN
- **Promedio Usado Real:** **$7,300 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$6,100 MXN** (Ideal para cerrar trato en pocos días).
- ⚖️ **Precio Justo:** **$7,300 MXN** (Recomendado para Mercado Libre / Marketplace).
- ⏳ **Venta Paciente:** **$8,100 MXN** (Si cuentas con caja, accesorios y cero prisa).
- 📝 **Ficha para Publicar (Copia y Pega):**
  - **Título SEO sugerido:** Sony PS5 PlayStation 5 Digital Impecable Con Control DualSense y Base
  - **Descripción corta:** PS5 Digital en estado impecable. Control DualSense sin drift, cables y base original. Lista para entrega en plaza comercial.`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_ps5_1793599980617.jpg',
    },
  },
  {
    id: 'sample-macbook-air-m1',
    name: 'Apple MacBook Air M1 (2020) 256GB Gris Espacial',
    tagline: 'La laptop preferida para estudiantes y profesionales en México',
    category: 'Computadoras & Laptops',
    imagePath: '/src/assets/images/sample_macbook_1793599981272.jpg',
    apparentCondition: 'Usado - Bueno',
    description: 'MacBook Air con chip Apple Silicon M1, 8GB de memoria RAM unificada y 256GB SSD, teclado en español con Touch ID.',
    initialResult: {
      product: {
        brand: 'Apple',
        model: 'MacBook Air M1 (8GB / 256GB SSD)',
        exactName: 'Apple MacBook Air 13" Chip M1 Gris Espacial',
        apparentCondition: 'Usado - Bueno',
        confidence: 97,
        category: 'Laptops',
        keySpecs: ['Chip Apple M1 8 núcleos CPU', '8GB Memoria Unificada', '256GB SSD PCIe', 'Pantalla Retina True Tone de 13.3"'],
        notes: 'Teclado y trackpad impecables, ligeros roces de uso en esquinas inferiores.',
      },
      microCheck: [
        {
          id: 'battery_cycles',
          question: '¿Cuántos ciclos de batería tiene la MacBook?',
          options: ['Menos de 200 ciclos (Excelente)', '200 a 500 ciclos (Normal)', 'Más de 500 ciclos'],
          selectedAnswer: '200 a 500 ciclos (Normal)',
        },
        {
          id: 'keyboard_layout',
          question: '¿La distribución del teclado tiene la letra Ñ (Español)?',
          options: ['Sí, teclado en Español con tecla Ñ', 'No, teclado en Inglés (US)'],
          selectedAnswer: 'Sí, teclado en Español con tecla Ñ',
        },
      ],
      marketRadiography: {
        retailNewMin: 13999,
        retailNewMax: 16999,
        usedMin: 8800,
        usedMax: 11900,
        usedAverage: 10200,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 10800,
          amazon: 12400,
          marketplace: 9600,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 8600,
          fairPrice: 10200,
          patientSalePrice: 11800,
          listingTitle: 'MacBook Air M1 8GB 256GB Gris Espacial Teclado Español Con Cargador Original',
          listingDescription: 'Apple MacBook Air M1 Gris Espacial de 13 pulgadas, 8GB RAM y 256GB SSD. Batería con excelente autonomía, teclado en español con tecla Ñ y Touch ID. Incluye cargador Apple original USB-C de 30W.',
          tips: ['Muestra captura de pantalla con los ciclos de batería y número de serie en Acerca de esta Mac', 'Aclara si tienes la caja original para defender el precio'],
        },
        flipping: {
          maxPurchasePrice: 5100,
          targetResalePrice: 10200,
          grossProfit: 5100,
          refurbBuffer: 500,
          platformFee: 900,
          netProfit: 3700,
          roiPercentage: 72,
          negotiationScript: 'Tengo $5,000 MXN en mano para compra el día de hoy, pago de contado en efectivo.',
        },
        buyer: {
          targetMin: 8800,
          targetMax: 10500,
          scamWarningThreshold: 6120,
          antiFraudAdvice: '¡Cuidado con computadoras con bloqueo empresarial (MDM / DEP / Jamf) o bloqueo de activación de iCloud! Siempre formatea desde cero con Wi-Fi.',
          verificationChecklist: ['Iniciar modo recuperación y verificar que no tenga candado EFI / MDM', 'Probar todos los puertos Thunderbolt y conector de audífonos', 'Revisar que la pantalla no tenga manchas en el revestimiento antireflejante'],
        },
        research: {
          trend: 'Estable con demanda muy alta en ciclo escolar',
          annualDepreciationRate: '10% anual',
          liquidityIndex: 'Alta',
          marketNotes: 'El MacBook Air M1 sigue siendo el equipo más cotizado de Apple por su relación potencia/batería/precio.',
          bestTimeToSell: 'Agosto/Septiembre (Regreso a clases) y Enero.',
        },
      },
      formattedReport: `#### 📸 Identificación del Producto
- **Producto:** Apple MacBook Air M1 13" (8GB / 256GB SSD)
- **Estado Aparente:** Usado - Grado Bueno
- *“Para afinar el precio exacto, indícame: ¿Ciclos de batería menores a 300? ¿Teclado en español con Ñ?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $13,999 MXN – $16,999 MXN
- **Usado (Rango de mercado):** $8,800 MXN – $11,900 MXN
- **Promedio Usado Real:** **$10,200 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$8,600 MXN** (Ideal para cerrar trato en pocos días).
- ⚖️ **Precio Justo:** **$10,200 MXN** (Recomendado para Mercado Libre / Marketplace).
- ⏳ **Venta Paciente:** **$11,800 MXN** (Si cuentas con caja, accesorios y cero prisa).
- 📝 **Ficha para Publicar (Copia y Pega):**
  - **Título SEO sugerido:** MacBook Air M1 8GB 256GB Gris Espacial Teclado Español Con Cargador Original
  - **Descripción corta:** MacBook Air M1 8GB/256GB en gran estado. Teclado español con Ñ, batería al 89%. Incluye cargador original Apple de 30W. Trato seguro.`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_macbook_1793599981272.jpg',
    },
  },
  {
    id: 'sample-sony-camera',
    name: 'Cámara Sony Alpha a7 IV Mirrorless Kit 28-70mm',
    tagline: 'Cámara profesional full-frame de alta gama para creadores y fotógrafos',
    category: 'Fotografía & Video',
    imagePath: '/src/assets/images/sample_camera_1793599980915.jpg',
    apparentCondition: 'Como nuevo',
    description: 'Cámara Sony Alpha 7 IV de 33MP con lente zoom FE 28-70mm F3.5-5.6 OSS, batería Sony NP-FZ100 original, correa y cargador.',
    initialResult: {
      product: {
        brand: 'Sony',
        model: 'Alpha 7 IV (ILCE-7M4) con Kit 28-70mm',
        exactName: 'Sony Alpha 7 IV Full-Frame Mirrorless Kit',
        apparentCondition: 'Como nuevo',
        confidence: 95,
        category: 'Cámaras',
        keySpecs: ['Sensor Exmor R CMOS 33 Megapíxeles', 'Grabación 4K 60p 10-bit 4:2:2', 'Enfoque automático Eye AF en tiempo real', 'Estabilización de imagen en cuerpo de 5 ejes'],
        notes: 'Sensor limpio sin motas de polvo, montura metálica sin desgaste, pantalla abatible sin arañazos.',
      },
      microCheck: [
        {
          id: 'shutter_count',
          question: '¿Cuál es el conteo aproximado de disparos (Shutter count)?',
          options: ['Menos de 10,000 disparos', '10,000 a 40,000 disparos', 'Más de 50,000 disparos'],
          selectedAnswer: 'Menos de 10,000 disparos',
        },
        {
          id: 'included_lens',
          question: '¿Incluye el lente zoom kit 28-70mm o solo cuerpo?',
          options: ['Cuerpo + Lente 28-70mm', 'Solo el cuerpo (Body only)', 'Cuerpo + Lente Prime 50mm'],
          selectedAnswer: 'Cuerpo + Lente 28-70mm',
        },
      ],
      marketRadiography: {
        retailNewMin: 44999,
        retailNewMax: 52999,
        usedMin: 32000,
        usedMax: 41000,
        usedAverage: 36500,
        currency: 'MXN',
        platformEstimates: {
          mercadoLibre: 38200,
          amazon: 46000,
          marketplace: 34500,
        },
      },
      strategies: {
        c2c: {
          fastSalePrice: 30500,
          fairPrice: 36500,
          patientSalePrice: 40500,
          listingTitle: 'Sony Alpha A7 IV Kit Lente 28-70mm Impecable Pocos Disparos Con Caja',
          listingDescription: 'Sony Alpha a7 IV de 33MP en estado impecable 9.8/10. Muy bajo número de disparos (<8,000). Sensor completamente libre de polvo. Incluye objetivo FE 28-70mm OSS, batería original Sony y cargador. Ideal para video 4K 10-bit profesional.',
          tips: ['Sube captura del reporte de Shutter Count de camera-shutter-count.com', 'Permite inspección de sensor en persona antes del pago'],
        },
        flipping: {
          maxPurchasePrice: 17500,
          targetResalePrice: 36500,
          grossProfit: 19000,
          refurbBuffer: 1200,
          platformFee: 2800,
          netProfit: 15000,
          roiPercentage: 85,
          negotiationScript: 'Ofrezco $17,000 MXN en transferencia inmediata o efectivo para fotógrafos que busquen liquidar equipo rápido.',
        },
        buyer: {
          targetMin: 32000,
          targetMax: 37500,
          scamWarningThreshold: 21900,
          antiFraudAdvice: 'En equipo fotográfico abundan perfiles falsos que piden depósito de apartado. NUNCA transfieras sin probar el sensor con una foto a F/22 a una pared blanca.',
          verificationChecklist: ['Disparar a F/22 a una superficie blanca para detectar hongos o rayaduras en el sensor', 'Verificar funcionamiento del enfoque continuo en video', 'Comprobar que ambas ranuras SD / CFexpress lean correctamente'],
        },
        research: {
          trend: 'Estable con alta retención de valor en mercado pro',
          annualDepreciationRate: '9% anual',
          liquidityIndex: 'Media',
          marketNotes: 'Equipo de gama alta para nicho profesional. La venta suele tardar entre 10 y 20 días pero el margen es muy amplio.',
          bestTimeToSell: 'Temporada de bodas y graduaciones (Marzo a Mayo / Noviembre a Diciembre).',
        },
      },
      formattedReport: `#### 📸 Identificación del Producto
- **Producto:** Sony Alpha 7 IV Kit 28-70mm OSS
- **Estado Aparente:** Como nuevo
- *“Para afinar el precio exacto, indícame: ¿Menos de 15,000 disparos? ¿Incluye el lente kit?”*

#### 📊 Radiografía de Mercado (México)
- **Nuevo (Retail):** $44,999 MXN – $52,999 MXN
- **Usado (Rango de mercado):** $32,000 MXN – $41,000 MXN
- **Promedio Usado Real:** **$36,500 MXN**

---

#### 🎯 Estrategia Recomendada (Venta Particular)
- ⚡ **Venta Rápida:** **$30,500 MXN** (Ideal para cerrar trato en pocos días).
- ⚖️ **Precio Justo:** **$36,500 MXN** (Recomendado para Mercado Libre / Marketplace).
- ⏳ **Venta Paciente:** **$40,500 MXN** (Si cuentas con caja, accesorios y cero prisa).
- 📝 **Ficha para Publicar (Copia y Pega):**
  - **Título SEO sugerido:** Sony Alpha A7 IV Kit Lente 28-70mm Impecable Pocos Disparos Con Caja
  - **Descripción corta:** Sony Alpha a7 IV de 33MP en estado impecable. Sensor limpio, bajo conteo de disparos. Incluye objetivo 28-70mm OSS y batería original.`,
      timestamp: new Date().toISOString(),
      imagePreviewUrl: '/src/assets/images/sample_camera_1793599980915.jpg',
    },
  },
];
