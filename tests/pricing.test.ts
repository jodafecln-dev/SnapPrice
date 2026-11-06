import { describe, it, expect } from 'vitest';
import { 
  filterMarketOutliers, 
  calculateMedian, 
  calculateFairMarketPricing, 
  validateImageFile, 
  formatCurrencyMXN 
} from '../src/utils/pricing';

describe('SnapPrice MX - Motor de Precios y Validación', () => {
  describe('calculateMedian', () => {
    it('debe calcular la mediana correcta para una lista impar de precios', () => {
      const prices = [7500, 8200, 8000];
      expect(calculateMedian(prices)).toBe(8000);
    });

    it('debe calcular el promedio de los valores centrales para una lista par', () => {
      const prices = [7000, 8000, 8500, 9500];
      // (8000 + 8500) / 2 = 8250
      expect(calculateMedian(prices)).toBe(8250);
    });

    it('debe manejar listas vacías sin arrojar error', () => {
      expect(calculateMedian([])).toBe(0);
    });
  });

  describe('filterMarketOutliers (Detección de Estafas y Especulación)', () => {
    it('debe purgar precios sospechosos de estafa (-40% o menores)', () => {
      const baseEstimate = 8000;
      // 3000 es estafa clara (< 4800)
      // 14000 es sobreprecio excesivo (> 11600)
      const rawPrices = [3000, 7800, 8100, 8300, 14000];
      const { cleanPrices, outliersCount } = filterMarketOutliers(rawPrices, baseEstimate);

      expect(cleanPrices).toEqual([7800, 8100, 8300]);
      expect(outliersCount).toBe(2);
    });
  });

  describe('calculateFairMarketPricing', () => {
    it('debe calcular el FMV, precio de venta rápida y precio paciente en MXN', () => {
      const benchmark = 8000;
      const samples = [7500, 8000, 8500];
      const result = calculateFairMarketPricing(samples, benchmark);

      expect(result.medianFMV).toBe(8000);
      expect(result.cleanedCount).toBe(3);
      expect(result.outliersRemoved).toBe(0);
      // Venta rápida esperada: ~8000 * 0.85 = 6800
      expect(result.fastSalePrice).toBe(6800);
      // Venta paciente esperada: ~8000 * 1.10 = 8800
      expect(result.patientSalePrice).toBe(8800);
    });
  });

  describe('validateImageFile', () => {
    it('debe aceptar formatos JPEG, PNG y WebP dentro del límite', () => {
      const file = new File(['dummy content'], 'switch.jpg', { type: 'image/jpeg' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('debe rechazar formatos no soportados como PDF o ejecutable', () => {
      const file = new File(['dummy content'], 'documento.pdf', { type: 'application/pdf' });
      const result = validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Formato no soportado');
    });

    it('debe rechazar archivos que excedan los 10 MB', () => {
      // Mock File con tamaño grande
      const bigFile = new File([''], 'heavy.png', { type: 'image/png' });
      Object.defineProperty(bigFile, 'size', { value: 15 * 1024 * 1024 });

      const result = validateImageFile(bigFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('excede el límite de 10 MB');
    });
  });

  describe('formatCurrencyMXN', () => {
    it('debe formatear correctamente en pesos mexicanos', () => {
      expect(formatCurrencyMXN(8500)).toContain('8,500');
      expect(formatCurrencyMXN(8500)).toContain('MXN');
      expect(formatCurrencyMXN(0)).toBe('$0 MXN');
    });
  });
});
