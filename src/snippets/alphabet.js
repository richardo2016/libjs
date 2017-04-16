export let alphabet = []
export let objContainer = {}

// X5 Blink kernel(chrome 37) has no Array.prototype.fill,
// see detail in
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
// or
//
// Take a step back talk, this is the pattern for iteration more effective than Array.prototype.forEach
for (let index = 0; index < 26; index++) {
  let char = String.fromCharCode(97 + index)
  alphabet.push(char)
  objContainer[char] = undefined
}

