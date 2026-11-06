import { describe, it, expect } from 'vitest';
import { generateHeuristicValuation } from '../src/utils/heuristics';
import { validateImageMagicBytes } from '../src/utils/imageSecurity';

describe('SnapPrice MX - Pruebas del Motor Heurístico y Seguridad Binaria', () => {
  describe('generateHeuristicValuation', () => {
    it('debe valuar correctamente una Nintendo Switch OLED en MXN', () => {
      const result = generateHeuristicValuation('Nintendo Switch OLED', 'c2c', 'Como nuevo');
      expect(result.product.brand).toBe('Nintendo');
      expect(result.product.model).toContain('Switch OLED');
      expect(result.marketRadiography.currency).toBe('MXN');
      expect(result.marketRadiography.usedAverage).toBeGreaterThan(4000);
      expect(result.strategies.c2c.fastSalePrice).toBeLessThan(result.marketRadiography.usedAverage);
      expect(result.realMarketSamples).toHaveLength(4);
      expect(result.todayRecommendation.suggestedPriceToday).toBe(result.strategies.c2c.fastSalePrice);
    });

    it('debe calcular márgenes de revendedor para PlayStation 5 Pro', () => {
      const result = generateHeuristicValuation('PS5 Pro', 'flipping', 'Nuevo');
      expect(result.product.brand).toBe('Sony');
      expect(result.strategies.flipping.maxPurchasePrice).toBeLessThan(result.marketRadiography.usedAverage);
      expect(result.strategies.flipping.grossProfit).toBeGreaterThan(0);
      expect(result.strategies.flipping.negotiationScript).toContain('efectivo');
    });

    it('debe degradar el precio coherentemente ante condición de daño', () => {
      const normalResult = generateHeuristicValuation('Xbox Series X', 'c2c', 'Como nuevo');
      const damagedResult = generateHeuristicValuation('Xbox Series X', 'c2c', 'Dañado');
      expect(damagedResult.marketRadiography.usedAverage).toBeLessThan(normalResult.marketRadiography.usedAverage * 0.5);
    });
  });

  describe('validateImageMagicBytes (Inspección Binaria de Cabeceras)', () => {
    it('debe detectar y autorizar una firma JPEG válida (0xFF, 0xD8, 0xFF)', () => {
      // Buffer con cabecera JPEG
      const jpegBuffer = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
      const base64Jpeg = jpegBuffer.toString('base64');
      const validation = validateImageMagicBytes(base64Jpeg);

      expect(validation.valid).toBe(true);
      expect(validation.detectedMime).toBe('image/jpeg');
    });

    it('debe detectar y autorizar una firma PNG válida (89 50 4E 47)', () => {
      // Buffer con cabecera PNG
      const pngBuffer = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      const base64Png = pngBuffer.toString('base64');
      const validation = validateImageMagicBytes(base64Png);

      expect(validation.valid).toBe(true);
      expect(validation.detectedMime).toBe('image/png');
    });

    it('debe detectar y autorizar una firma WebP válida (RIFF....WEBP)', () => {
      const webpHeader = Buffer.from('RIFF1234WEBPVP8 ');
      const base64Webp = webpHeader.toString('base64');
      const validation = validateImageMagicBytes(base64Webp);

      expect(validation.valid).toBe(true);
      expect(validation.detectedMime).toBe('image/webp');
    });

    it('debe rechazar archivos no autorizados (ej. scripts o binarios ejecutables)', () => {
      // Cabecera ELF o texto plano
      const fakeBuffer = Buffer.from('console.log("malicious payload");');
      const base64Fake = fakeBuffer.toString('base64');
      const validation = validateImageMagicBytes(base64Fake);

      expect(validation.valid).toBe(false);
      expect(validation.error).toContain('La firma binaria del archivo no corresponde a una imagen válida');
    });
  });
});
