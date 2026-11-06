# 🎮 SnapPrice MX
### Motor de Valuación Visual con IA para Videojuegos & Consolas en México

> **¿Cuánto vale lo que tienes? Cotízalo en segundos.**  
> SnapPrice MX es la plataforma de cotización y avalúo visual impulsada por inteligencia artificial multimodal (Gemini 3.8 Flash) especializada en el mercado secundario mexicano de videojuegos, consolas y coleccionables gamer.

---

## 📌 Tabla de Contenidos
1. [Problema y Propuesta de Valor](#-problema-y-propuesta-de-valor)
2. [Características Principales](#-características-principales)
3. [Especialización Gamer](#-especialización-gamer)
4. [Arquitectura y Stack Tecnológico](#-arquitectura-y-stack-tecnológico)
5. [Endpoints de la API](#-endpoints-de-la-api)
6. [Resiliencia y Blindaje Técnico](#-resiliencia-y-blindaje-técnico)
7. [Historial de Versiones (Changelog)](#-historial-de-versiones-changelog)
8. [Roadmap y Posibles Mejoras Futuras](#-roadmap-y-posibles-mejoras-futuras)
9. [Instalación y Configuración](#-instalación-y-configuración)

---

## 💡 Problema y Propuesta de Valor

En México, el comercio entre particulares (C2C) y la reventa en plataformas como **Facebook Marketplace, Mercado Libre MX, Amazon México y eBay** sufren de:
1. **Asimetría de Precios:** Vendedores que regalan su dinero por desconocimiento o compradores que caen en sobreprecios abusivos.
2. **Estafas Recurrentes:** Comprobantes falsos de OXXO, transferencias SPEI fantasma no liquidadas o envíos fraudulentos por taxi de aplicación.
3. **Complejidad de Modelos Gamer:** Diferencias sutiles que cambian radicalmente el valor (ej. PS5 Fat vs Slim vs Pro; Nintendo Switch V1 hackeable vs V2 vs OLED; controles con o sin drift en análogos).

**SnapPrice MX resuelve esto en segundos:** el usuario solo toma una foto o escribe el modelo, y la IA analiza la condición física, consulta benchmarks reales de comercio electrónico y entrega una recomendación de precio en Pesos Mexicanos (MXN) con velocidad de venta y consejos de seguridad antifraude.

---

## ⚡ Características Principales

### 📸 1. Flujo Guiado por la Cámara (Viewfinder Asistido)
Visor con 4 retículas holográficas de encuadre láser diseñadas específicamente para hardware gamer:
* **Consola Completa:** Encuadre panorámico para evaluar carcasas, ventilas y puertos.
* **Portada / Caja:** Encuadre vertical para carátulas de juegos físicos y estado de sellos/empaque.
* **Control / Mandos:** Retícula oval centrada en los joysticks análogos para inspección visual de desgaste y drift.
* **Etiqueta de Serie:** Macro-guía para capturar números de modelo (ej. CFI-xxxx, CUH-xxxx, HAC-xxxx).

### 📅 2. Sugerencia de Venta al Día de Hoy (`TodaySaleCard`)
* Calibrada automáticamente a la **fecha dinámica de México** (ej. *Viernes, 6 de noviembre*).
* Proyecta la **velocidad de cierre en 24-48 horas**, el nivel de liquidez en el mercado gamer y el **horario pico óptimo para publicar** (6:00 PM a 9:30 PM).
* Incluye botón directo **"Oferta Express WhatsApp"** con mensaje listo para enviar a compradores interesados.

### 🔍 3. Transparencia Total y Benchmarks en Vivo (`TransparentMarketPanel`)
* Muestra de publicaciones testigo reales en **Mercado Libre, Marketplace, Amazon y eBay** con enlace directo a la fuente.
* Desglose matemático del **Valor de Mercado Justo (Fair Market Value - FMV)**:
  $$\text{FMV Limpio} = \text{Mediana}(\text{Muestra}) \quad [\text{Purgando estafas } (-40\%) \text{ y sobreprecios } (+35\%)]$$

### 🎨 4. Generador de Pósters 9:16 para Historias (`StoryCardModal`)
* Renderizado dinámico en cliente mediante **Canvas 2D** a resolución **1080 × 1920 px (9:16)**.
* Ideal para compartir en estados de WhatsApp e Historias de Instagram con ficha técnica, precio de venta rápida y sellos de condición.

### 📄 5. Certificado Oficial de Avalúo Imprimible (`ReportModal`)
* Generación de hoja de avalúo con **Folio Único Verificable**, fecha ISO, desglose por plataformas y marca de agua oficial para imprimir o exportar a PDF nativo.

### 🛡️ 6. Radar Antifraude para México (`AntiFraudSection`)
* Alertas contextuales contra estafas comunes en México: entrega en puntos seguros (plazas comerciales o estaciones concurridas de Metro/Metrobús), verificación de transferencias SPEI en la app bancaria antes de entregar, y advertencias sobre envíos forzados por paquetería express.

### ☁️ 7. Persistencia en la Nube con Firebase
* Inicio de sesión rápido con **Google One-Tap**.
* Historial de avalúos sincronizado en tiempo real mediante **Cloud Firestore**, permitiendo consultar cotizaciones pasadas desde cualquier dispositivo.

---

## 🕹️ Especialización Gamer

SnapPrice MX está afinado para identificar las especificaciones que determinan el precio en el ecosistema de videojuegos:
* **PlayStation:** PS5 Pro, PS5 Slim (con lector / digital), PS5 Fat (CFI-1000/1200), PS4 Pro, PS4 Slim, PS3 retrocompatible, PS Vita, PSP.
* **Nintendo:** Switch OLED (Edición Zelda, Pokémon, Mario), Switch V2 (batería extendida), Switch V1 (unpatched), Switch Lite, 3DS XL, 2DS, Game Boy.
* **Xbox:** Xbox Series X (1TB / 2TB Galaxy), Xbox Series S (512GB blanco / 1TB negro), Xbox One X, Xbox 360 (Slim / E).
* **Micro-Factores de Desempate:**
  * ✅ Incluye caja original con manuales (+10% a +15% de valor).
  * ✅ Mandos originales probados sin *stick drift*.
  * ✅ Cables originales (HDMI de alta velocidad / alimentación).
  * ❌ Consolas con sello de garantía violado o sin lector físico.

---

## 🛠️ Arquitectura y Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                       SNAPPRICE MX                          │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐         ┌──────────────────────────────┐
│       Frontend (Vite)        │         │       Backend (Express)      │
│  - React 19 + TypeScript     │         │  - Node.js Full-Stack        │
│  - Tailwind CSS v4           │◄───────►│  - Gemini 3.8 Flash SDK      │
│  - Motion + Lucide React     │  /api/  │  - Zero-Failure Heuristics   │
│  - HTML5 Canvas 2D           │         │  - 12s Promise.race Timeout  │
└──────────────┬───────────────┘         └──────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Firebase Services       │
│  - Google Authentication     │
│  - Cloud Firestore (DB)      │
│  - Security Rules Audited    │
└──────────────────────────────┘
```

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React, Motion.
* **Backend:** Express 4 montado sobre Node.js con Vite middleware en desarrollo.
* **Inteligencia Artificial:** `@google/genai` utilizando el modelo multimodal `gemini-3.8-flash`.
* **Nube:** Firebase Authentication & Cloud Firestore (Reglas de acceso por usuario y cuota optimizada).

---

## 🔌 Endpoints de la API

### 1. `GET /api/health`
Verifica la salud del servicio, conectividad de credenciales y parámetros de mercado.
* **Respuesta (200 OK):**
```json
{
  "status": "ok",
  "service": "snapprice-mx-valuation-engine",
  "hasKey": true,
  "currency": "MXN",
  "marketplaces": ["Mercado Libre MX", "Facebook Marketplace", "Amazon MX", "eBay MX"],
  "timestamp": "2026-11-06T17:31:40.000Z"
}
```

### 2. `POST /api/evaluate`
Procesa la imagen y/o descripción textual para generar el informe de valuación.
* **Payload:**
```json
{
  "imageBase64": "data:image/jpeg;base64,...",
  "mimeType": "image/jpeg",
  "description": "PlayStation 5 Slim con Lector 1TB",
  "userIntent": "c2c",
  "selectedCondition": "Como nuevo",
  "microAnswers": {
    "caja": "Sí, completa",
    "controles": "2 DualSense originales",
    "drift": "Sin drift"
  }
}
```
* **Respuesta (200 OK):** Objeto `ValuationResult` estructurado que incluye rangos de precio (vender hoy, precio justo, tope de mercado), confianza porcentual, lista de microfactores, comparativas por plataforma, dataset de publicaciones reales y recomendación de venta al día de hoy.

---

## 🛡️ Resiliencia y Blindaje Técnico

1. **Timeout con Carrera Asíncrona (`Promise.race`):** Las peticiones a la API de IA cuentan con un temporizador estricto de **12 segundos**. Si la red o la API externa presentan retraso, el sistema conmuta instantáneamente al motor heurístico gamer sin arrojar error al usuario.
2. **Parser JSON Inmune a Envoltorios:** Expresión regular robusta `/\{[\s\S]*\}/` que previene excepciones `SyntaxError` cuando el modelo retorna bloques de código markdown o saltos de línea.
3. **Protección de Cuota Firestore (Límite 1 MB):** Sanitizador en `saveValuationToCloud` que elimina cadenas base64 masivas del objeto `resultData` antes de la persistencia, manteniendo los registros por debajo de 50 KB.
4. **CORS y Canvas Taint:** Prevención de excepciones `SecurityError` en navegadores modernos al aislar URLs locales `data:` de banderas `crossOrigin = 'anonymous'`.

---

## 📜 Historial de Versiones (Changelog)

| Versión | Fecha | Hitos y Cambios Clave |
| :---: | :---: | :--- |
| **v1.4.1** | *Nov 2026* | **Auditoría Exhaustiva de Endpoints y Resiliencia:** Inyección de `Promise.race` de 12s, sanitización base64 para Firestore, blindaje CORS en Canvas y sincronización del recálculo dinámico. |
| **v1.4.0** | *Nov 2026* | **Especialización Gamer & Benchmarks en Vivo:** Visor guiado con 4 retículas holográficas, tarjeta de sugerencia de venta al día de hoy, tabla de transparencia con enlaces directos y atajos táctiles gamer. |
| **v1.3.0** | *Nov 2026* | **Exportación Social & Certificados:** Generador de fichas gráficas 9:16 para Historias de WhatsApp/Instagram y Certificado Oficial imprimible con Folio Único y Marca de Agua. |
| **v1.2.0** | *Nov 2026* | **Diseño Cyber-Techno Neón:** Tarjetas 3D reversibles (Flip Card), modo oscuro de alto contraste y documentación exhaustiva de funciones. |
| **v1.1.0** | *Nov 2026* | **Persistencia Cloud:** Integración de Google Auth y Cloud Firestore, compresión de imágenes en cliente (1280px). |
| **v1.0.0** | *Nov 2026* | **Lanzamiento Inicial:** Motor algorítmico base con calibración de precios en pesos mexicanos (MXN). |

---

## 🚀 Roadmap y Posibles Mejoras Futuras

A continuación se listan las mejoras prioritarias planificadas para próximas versiones:

- [ ] **Escáner de Código de Barras UPC / EAN:** Lectura instantánea de códigos de barras de cajas de videojuegos para identificar edición, región (NTSC/PAL) y año de tiraje sin necesidad de tipeo.
- [ ] **Valuador de Paquetes / Lotes Gamer (Bundle Pricing):** Algoritmo para tasar paquetes completos (ej. *Consola + 6 juegos + 2 mandos + base de carga*) con descuento sugerido por venta en bulto.
- [ ] **Calculadora de Comisiones de Comercio Electrónico:** Desglose interactivo de comisiones netas de Mercado Libre (Publicación Clásica vs Premium, costo de guía de Mercado Envíos e ISR/IVA retenido).
- [ ] **Modo Offline PWA (Progressive Web App):** Instalación como aplicación nativa en Android/iOS con funcionamiento local del motor heurístico en zonas con baja señal celular.
- [ ] **Alertas de Oportunidades (Marketplace Radar):** Notificaciones push cuando un producto objetivo baje de su Fair Market Value (FMV) para *flippers* y coleccionistas.

---

## 💻 Instalación y Configuración

### Prerrequisitos
* Node.js v20 o superior
* Cuenta y proyecto de Firebase (Authentication + Cloud Firestore)
* API Key de Google Gemini (`GEMINI_API_KEY`)

### Pasos para Ejecutar Localmente

1. **Clonar el repositorio e instalar dependencias:**
```bash
git clone https://github.com/tu-usuario/snapprice-mx.git
cd snapprice-mx
npm install
```

2. **Configurar variables de entorno (`.env`):**
Crea un archivo `.env` basado en `.env.example`:
```env
GEMINI_API_KEY=tu_api_key_de_gemini
PORT=3000
```

3. **Iniciar el servidor de desarrollo:**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

4. **Ejecutar suite de pruebas unitarias (Vitest):**
```bash
npm run test
```

5. **Compilación y ejecución para producción:**
```bash
npm run build
npm run start
```

---

## 🐳 Despliegue en Producción (Docker & Cloud Run)

El proyecto incluye un `Dockerfile` multi-etapa optimizado para producción:

```bash
# Construir la imagen Docker
docker build -t snapprice-mx .

# Ejecutar el contenedor
docker run -p 3000:3000 -e GEMINI_API_KEY="tu_clave_gemini" snapprice-mx
```

* **Google Cloud Run:** Compatible de forma nativa desplegando la imagen en Artifact Registry.
* **VPS / Node.js:** Ejecutable con `pm2 start server.ts --name "snapprice" --interpreter tsx`.
* **Archivo `metadata.json`:** Requerido por la plataforma Google AI Studio para declarar permisos del contenedor, proxy de IA del servidor (`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`) y metadatos de despliegue.

---

<p align="center">
  <b>SnapPrice MX</b> · Cotización inteligente, transparente y segura en México 🇲🇽
</p>
