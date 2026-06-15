const countWord = (text: string) => {
  const trimmedText = text.trim();
  if (trimmedText === "") {
    return 0;
  }
  return trimmedText.split(/\s+/).length
}

const countChars = (text: string) => {
  return text.length
}

const countLines = (text: string) => {
  return text.split("\n").length
}

const countInput = (input: string[]) => {
  const text = input.slice(2).join(" ")

  if (text.length === 0) {
    console.error('there was no input')
    process.exit(1)
  }
  const chars = countChars(text);
  const words = countWord(text);
  const lines = countLines(text)

  return `
  characters: ${chars}
  words: ${words}
  lines: ${lines}
  `
}

console.log(countInput(process.argv))
