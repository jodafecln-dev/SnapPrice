import { useState, useCallback } from 'react';
import { ValuationResult, UserIntent, ProductCondition } from '../types';
import { evaluateProduct, EvaluateRequestPayload } from '../services/api';

export function useValuation() {
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performEvaluation = useCallback(
    async (payload: EvaluateRequestPayload, onSuccess?: (data: ValuationResult) => void) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await evaluateProduct(payload);
        setResult(data);
        if (onSuccess) onSuccess(data);
        return data;
      } catch (err: any) {
        const errorMsg = err?.message || 'Error al procesar la valuación.';
        setError(errorMsg);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const resetValuation = useCallback(() => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    result,
    setResult,
    isLoading,
    error,
    setError,
    performEvaluation,
    resetValuation,
  };
}
