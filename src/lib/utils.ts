import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import { nanoid } from 'nanoid';
import { toast } from '@/hooks/use-toast';

export const checkIfInputIsValidPrice = (input: string): boolean => {
  const regex = /^[0-9]+(\.[0-9]+)?$/;

  return regex.test(input);
}

export const toastError = (title: string, description: string) => {
  toast({title, description, variant: 'destructive'});
};

export const toastDefault = (title: string, description: string) => {
  toast({title, description, variant: 'default'});
};

export const generateProductId = async () => {
  const db = await openDatabase();
  const cachedData = await getDataFromObjectStore(db, 'cache', 'productId');

  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  const newProductId = nanoid()

  await putDataInObjectStore(db, 'cache', newProductId, 'productId');

  return newProductId
};

export const deleteProductId = async () => {
  const db = await openDatabase();

  await deleteDataFromObjectStore(db, 'cache', 'productId');

  return;
};

const openDatabase = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('cache');
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
    request.onupgradeneeded = () => {
      request.result.createObjectStore('cache', { keyPath: 'endpoint' })
    };
  });
};

const getDataFromObjectStore = async (db: IDBDatabase, name: string, key: string) => {
  return new Promise<any>((resolve, reject) => {
    const transaction = db.transaction(name, 'readonly');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.get(key);
    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    }
    request.onerror = () => {
      reject(request.error);
    }
  });
};

const putDataInObjectStore = async (db: IDBDatabase, name: string, data: any, key: string) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(name, 'readwrite');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.put({ endpoint: key, data: data });
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

const deleteDataFromObjectStore = async (db: IDBDatabase, name: string, key: string) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(name, 'readwrite');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.delete(key);
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      if (result === 'just now') return result
      return result + ' ago'
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}