export const maskPrice = (valor: string) => {
  const v = (
    (parseInt(valor.replace(/\D/g, ''), 10) / 100).toFixed(2) + ''
  ).split('.')

  const m = v[0]
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
  if (m) {
    for (let i = 0; i < m.length; i++)
      m[i] = m[i].split('').reverse().join('') + '.'

    const r = m.reverse().join('')

    return r.substring(0, r.lastIndexOf('.')) + ',' + v[1]
  }

  return ''
}
