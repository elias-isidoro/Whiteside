import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import { nanoid } from 'nanoid';
import { toast } from '@/hooks/use-toast';

export const isValidWholeNumber = (input: string): boolean => {
  return /^\d+$/.test(input);
};

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const convertToCents = (dollarAmount: number) => {
  const centsAmount = dollarAmount * 100;
  return Math.round(centsAmount);
}

export const stringToArray = <T>(input: string): T[] => {
  try {
    const array = JSON.parse(input);
    if (Array.isArray(array)) {
      return array;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const stringToPriceFormat = (input: string): string => {

  const maxDigits = 15; 
  const maxLength = 20; 

  const dotCount = countDots(input);
  const badCommaCount = countConsecutiveCommas(input);

  const inputTail = input.slice(-1)

  if(input===''){
    return "0"
  }

  if (inputTail !== ',' && inputTail !== '.' && !/\d/.test(inputTail)) {
    return input.slice(0, input.length - 1);
  }

  if (dotCount === 1 && inputTail === ',' || dotCount > 1 || badCommaCount > 0 ) {
    return input.slice(0, input.length - 1);
  }
  if (inputTail === ',' || inputTail === '.') {
    return input;
  }
  
  // Remove commas and dots from input string
  const digitsOnly = input.replace(/[,.]/g, '');

  if (input.length > maxLength || digitsOnly.length > maxDigits) {
    return input.slice(0, input.length - 1); // Return the input, remove the addition, stop going further
  }

  const number = Number(input.replace(/,/g, ''));
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

export function numberToPriceFormat(price: number): string {
  return price.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

export const checkIfInputIsValidPrice = (input: string) => {
  const patternWithoutCommas = /^\d+(\.\d+)?$/;
  const patternWithComma = /^\d{1,3}(,\d{3})*(\.\d+)?$/;

  return patternWithComma.test(input) || patternWithoutCommas.test(input);
};

export const parsePrice = (input: string): number => {
  const withoutCommas = input.replace(/,/g, '');
  return parseFloat(withoutCommas);
};

export const countDots = (input: string): number => {
  const dots = input.match(/\./g);
  return dots ? dots.length : 0;
};

export const countCommas = (input: string) => {
  const commas = input.match(/,/g);
  return commas ? commas.length : 0;
};

export const countConsecutiveCommas = (input: string) => {
  const matches = input.match(/,{2,}/g);
  return matches ? matches.length : 0;
};


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