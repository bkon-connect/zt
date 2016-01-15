
export default function unpack (string) {
  const data = string.split('|')
  const abbrs = data[1].split(' ')
  const offsets = data[2].split(' ').map(unpackBase60)
  const indices = data[3].split('').map(unpackBase60)
  const untils = data[4].split(' ').map(unpackBase60)
    .slice(0, indices.length - 1)
    .reduce((m, v) => {
      const n = Math.round(m[0] + v * 6e4)
      return [n, m[1].concat(n)]
    }, [0, []]).pop()
    .concat(Infinity)

  return {
    name: data[0],
    abbrs: indices.map(i => abbrs[i]),
    offsets: indices.map(i => offsets[i]),
    untils
  }
}

const charCodeToInt = c => c - (c > 96 ? 87 : c > 64 ? 29 : 48)

function unpackBase60 (string) {
  const neg = string.charCodeAt(0) === 45
  const parts = string.split('.')
  const whole = parts[0]
  const fractional = parts[1] || ''
  let multiplier = 1
  let out = 0
  let num
  for (let i = neg ? 1 : 0; i < whole.length; i++) {
    num = charCodeToInt(whole.charCodeAt(i))
    out = 60 * out + num
  }
  for (let i = 0; i < fractional.length; i++) {
    multiplier = multiplier / 60
    num = charCodeToInt(fractional.charCodeAt(i))
    out += num * multiplier
  }
  return out * (neg ? -1 : 1)
}
