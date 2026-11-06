/**
 * SnapPrice MX - Cliente de Servicios API Centralizado
 * Gestiona las llamadas tipadas y con tolerancia a fallos a los endpoints del servidor Express.
 */

import { ValuationResult, UserIntent, ProductCondition } from '../types';

export interface EvaluateRequestPayload {
  imageBase64?: string;
  mimeType?: string;
  description: string;
  userIntent: UserIntent;
  selectedCondition?: ProductCondition;
  microAnswers?: Record<string, string>;
}

export interface HealthResponse {
  status: string;
  service: string;
  hasKey: boolean;
  currency: string;
  marketplaces: string[];
  timestamp: string;
}

/**
 * Consulta el estado operativo del servicio
 */
export async function checkApiHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error(`Health check failed with status: ${res.status}`);
  }
  return res.json();
}

/**
 * Envía la solicitud de valuación multimodal al backend
 */
export async function evaluateProduct(payload: EvaluateRequestPayload): Promise<ValuationResult> {
  const res = await fetch('/api/evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Error en el servidor (${res.status})`);
  }

  return res.json();
}
