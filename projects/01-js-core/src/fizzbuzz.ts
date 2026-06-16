const rules: [divisor: number, word: string][] = [[3, "Fizz"], [5, "Buzz"] ]
const fizzbuzz = (n: number, rules: [divisor: number, word: string][]): string => {

  const matched = rules.filter((rule) =>  n % rule[0] === 0 ).map(([, word]) => word).join("")

  return matched === "" ? String(n) : matched;

}

const fizzbuzzFunction = (numberOfIterations: string | undefined, rules: [divisor: number, word: string][] | undefined): string => {
  const input = Number(numberOfIterations)

  const lines: string[] = []

  if(Number.isInteger(input) && input > 0 && rules && rules.length > 0) {
    
   for(let i = 1; i <= input; i++) {
      lines.push(fizzbuzz(i, rules))
    } 
  } else {
      console.error('input is not an integer or not a number')
      process.exit(1)
    }

  return lines.join("\n")
}


console.log(fizzbuzzFunction(process.argv[2], rules))
