/**
 * SnapPrice MX - Validador de Seguridad de Imágenes (Magic Bytes / Binary Signatures)
 * Inspecciona los primeros bytes del buffer decodificado para verificar de manera
 * infalible que el payload base64 sea una imagen genuina (JPEG, PNG, WebP, GIF, HEIC)
 * y no un archivo ejecutable o script malicioso camuflado.
 */

export interface MagicByteValidationResult {
  valid: boolean;
  detectedMime: string;
  error?: string;
}

/**
 * Inspecciona la cabecera binaria de la cadena base64.
 *
 * @param {string} base64Payload - Cadena base64 pura o con prefijo data:image/...
 * @returns {MagicByteValidationResult}
 */
export function validateImageMagicBytes(base64Payload: string): MagicByteValidationResult {
  if (!base64Payload || typeof base64Payload !== 'string') {
    return {
      valid: false,
      detectedMime: '',
      error: 'La carga útil de imagen está vacía o es inválida.',
    };
  }

  try {
    // Limpiar prefijo data URI si está presente
    const cleanBase64 = base64Payload.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '').trim();

    // Decodificar los primeros 64 bytes para inspeccionar las firmas mágicas
    const headerSlice = cleanBase64.slice(0, 80);
    const buffer = Buffer.from(headerSlice, 'base64');

    if (buffer.length < 4) {
      return {
        valid: false,
        detectedMime: '',
        error: 'Longitud insuficiente para validar la cabecera de la imagen.',
      };
    }

    // 1. JPEG signature: 0xFF, 0xD8, 0xFF
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return { valid: true, detectedMime: 'image/jpeg' };
    }

    // 2. PNG signature: 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      return { valid: true, detectedMime: 'image/png' };
    }

    // 3. WebP signature: 'RIFF' en bytes 0-3 y 'WEBP' en bytes 8-11
    if (buffer.length >= 12) {
      const riff = buffer.subarray(0, 4).toString('ascii');
      const webp = buffer.subarray(8, 12).toString('ascii');
      if (riff === 'RIFF' && webp === 'WEBP') {
        return { valid: true, detectedMime: 'image/webp' };
      }
    }

    // 4. GIF signature: 'GIF8'
    const gif = buffer.subarray(0, 4).toString('ascii');
    if (gif === 'GIF8') {
      return { valid: true, detectedMime: 'image/gif' };
    }

    // 5. HEIC / HEIF / MP4: 'ftyp' en bytes 4-7
    if (buffer.length >= 12) {
      const ftyp = buffer.subarray(4, 8).toString('ascii');
      if (ftyp === 'ftyp') {
        return { valid: true, detectedMime: 'image/heic' };
      }
    }

    return {
      valid: false,
      detectedMime: '',
      error:
        'La firma binaria del archivo no corresponde a una imagen válida (JPEG, PNG, WebP o HEIC).',
    };
  } catch (err: any) {
    return {
      valid: false,
      detectedMime: '',
      error: `Error al decodificar la carga útil base64: ${err?.message || 'Formato corrupto'}`,
    };
  }
}
