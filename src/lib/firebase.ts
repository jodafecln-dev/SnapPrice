import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit,
  deleteDoc,
  serverTimestamp,
  getDocFromServer,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import firebaseConfigData from '../firebase-config.json';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfigData.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfigData.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfigData.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfigData.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfigData.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfigData.appId,
};

/**
 * Instancia única singleton de la aplicación Firebase.
 * Previene inicializaciones duplicadas en entornos con recarga o HMR.
 */
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * Instancia de autenticación de Firebase (Firebase Auth).
 */
export const auth = getAuth(app);

/**
 * Proveedor de autenticación Google configurado para solicitar selección de cuenta.
 */
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Instancia de la base de datos Cloud Firestore con soporte para ID específico de base de datos.
 */
const databaseId = firebaseConfigData.firestoreDatabaseId || '(default)';
export const db =
  databaseId && databaseId !== '(default)' ? getFirestore(app, databaseId) : getFirestore(app);

/**
 * testFirestoreConnection
 * Valida la conectividad con los servidores de Cloud Firestore durante el arranque.
 * Siguiendo las directrices del skill de Firebase, detecta si el cliente está fuera de línea.
 * @returns {Promise<void>}
 */
export async function testFirestoreConnection(): Promise<void> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Firestore connection verified');
  } catch (error: any) {
    if (error?.code === 'permission-denied' || error?.message?.includes('the client is offline')) {
      // Normal behavior prior to login or during offline sync
      return;
    }
    console.warn('Firestore initialization notice:', error?.message);
  }
}

/**
 * loginWithGoogle
 * Abre una ventana emergente para autenticar al usuario mediante Google Sign-In.
 * Si el usuario cancela la selección o cierra el popup voluntariamente, retorna null de forma limpia.
 * Si el inicio de sesión es exitoso, sincroniza o crea el perfil del usuario en Firestore.
 * @returns {Promise<User | null>} Objeto de usuario autenticado de Firebase o null si canceló.
 */
export async function loginWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Sincronizar documento del usuario en /users/{userId}
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Usuario SnapPrice',
          photoURL: user.photoURL || '',
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not sync user profile to Firestore:', err);
    }

    return user;
  } catch (err: any) {
    const code = err?.code;
    if (
      code === 'auth/popup-closed-by-user' ||
      code === 'auth/cancelled-popup-request' ||
      code === 'auth/user-cancelled'
    ) {
      return null;
    }
    throw err;
  }
}

/**
 * logoutUser
 * Cierra la sesión activa del usuario actual en Firebase Auth.
 * @returns {Promise<void>}
 */
export async function logoutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * saveValuationToCloud
 * Persiste una cotización o valuación generada dentro de la subcolección privada
 * del usuario autenticado en Firestore (`/users/{userId}/valuations/{valuationId}`).
 *
 * @param {string} userId - ID único del usuario autenticado (UID).
 * @param {any} valuation - Objeto con los datos del producto, precios y resultado completo.
 * @returns {Promise<void>}
 */
export async function saveValuationToCloud(userId: string, valuation: any): Promise<void> {
  if (!userId) return;
  const rawId = valuation.id || 'val-' + Date.now();
  const valuationId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
  const valRef = doc(db, 'users', userId, 'valuations', valuationId);

  // Clone result data and sanitize oversized base64 strings so document never approaches 1MB Firestore limit
  let cleanResult = valuation.result ? { ...valuation.result } : { ...valuation };
  if (cleanResult.imagePreviewUrl && cleanResult.imagePreviewUrl.length > 50000) {
    cleanResult = { ...cleanResult, imagePreviewUrl: '' };
  }

  await setDoc(valRef, {
    id: valuationId,
    userId,
    productName: valuation.productName || valuation.product?.exactName || 'Producto',
    brand: valuation.product?.brand || '',
    model: valuation.product?.model || '',
    condition: valuation.condition || valuation.product?.apparentCondition || 'Usado - Bueno',
    usedAverage: valuation.averageUsedPrice || valuation.marketRadiography?.usedAverage || 0,
    fastSalePrice: valuation.fastSalePrice || valuation.strategies?.c2c?.fastSalePrice || 0,
    userIntent: valuation.userIntent || 'c2c',
    imageUrl:
      typeof valuation.imageUrl === 'string' && valuation.imageUrl.length < 50000
        ? valuation.imageUrl
        : '',
    resultData: JSON.stringify(cleanResult),
    createdAt: new Date().toISOString(),
    timestamp: serverTimestamp(),
  });
}

/**
 * fetchUserValuationsFromCloud
 * Recupera el historial de valuaciones del usuario desde Firestore, ordenadas
 * de manera descendente por fecha de creación (últimas 30).
 *
 * @param {string} userId - ID único del usuario autenticado (UID).
 * @returns {Promise<Array<any>>} Lista de objetos de valuación formateados para el historial.
 */
export async function fetchUserValuationsFromCloud(userId: string): Promise<Array<any>> {
  if (!userId) return [];
  try {
    const valCol = collection(db, 'users', userId, 'valuations');
    const q = query(valCol, orderBy('createdAt', 'desc'), limit(30));
    const snap = await getDocs(q);

    return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => {
      const data = d.data();
      let parsedResult = null;
      try {
        if (data.resultData) {
          parsedResult = JSON.parse(data.resultData);
        }
      } catch (e) {
        console.warn('Error parsing resultData:', e);
      }

      return {
        id: d.id,
        productName: data.productName,
        condition: data.condition,
        averageUsedPrice: data.usedAverage,
        fastSalePrice: data.fastSalePrice,
        userIntent: data.userIntent,
        timestamp: data.createdAt,
        imageUrl: data.imageUrl,
        result: parsedResult || data,
      };
    });
  } catch (err) {
    console.warn('Could not fetch cloud valuations:', err);
    return [];
  }
}

/**
 * deleteValuationFromCloud
 * Elimina una valuación específica de Firestore perteneciente al usuario.
 *
 * @param {string} userId - UID del propietario del registro.
 * @param {string} valuationId - Identificador del documento a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteValuationFromCloud(userId: string, valuationId: string): Promise<void> {
  if (!userId || !valuationId) return;
  const safeId = valuationId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
  const valRef = doc(db, 'users', userId, 'valuations', safeId);
  await deleteDoc(valRef);
}
