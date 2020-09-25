export function myStringFunc(str: string) {
  return `Hello ${str}`;
}

export function myNumberFunc(num: number) {
  if (num >= 100) {
    return 100;
  } else if (num <= 0) {
    return 0;
  } else {
    return num + 1;
  }
}

export function myArrayFunc(value?: string) {
  const arr = ['Leonardo', 'Raphael', 'Miguel Angel', 'Donnatello'];

  if (value) {
    arr.push(value);
    return arr;
  } else {
    return arr;
  }
}
