function phoneNumberFormatter(phoneNumber) {
    const numbers = phoneNumber.replace(/\D/g, '');
  
    return `+${numbers.slice(0, 2)} (${numbers.slice(2, 4)}) ${numbers.slice(4, 9)}-${numbers.slice(9, 14)}`;
  }

export {phoneNumberFormatter}