const validateCalc = (bill: number, percent: number) => {
  if (Number.isNaN(bill) || Number.isNaN(percent)) {
    return false
  }
  return true;
}

const calculateBill = (rawBill: number, rawPercent: number) => {
  const isValid = validateCalc(rawBill, rawPercent)

  if (!isValid) {
    console.error('bill or percent is not a number. please give a number.')
    process.exit(1)
  }

  const tip = rawBill * (rawPercent / 100)
  return `Bill: ${rawBill.toFixed(2)}$ \n Tip: ${tip.toFixed(2)}$ (${rawPercent}%) \n Total: ${(rawBill + tip).toFixed(2)}$`
}


console.log(calculateBill(Number(process.argv[2]), Number(process.argv[3])))
