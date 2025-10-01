export function formatCurrency(n: number, currency: string = 'MXN') {
  try { return new Intl.NumberFormat('es-MX',{style:'currency',currency}).format(Number(n)||0) }
  catch { return '$' + Number(n||0).toLocaleString('es-MX') }
}
export function irrSimple(annualRatePct: number, months: number) {
  const r = (annualRatePct||0)/100; const years = (months||0)/12; return Math.pow(1+r, years)-1
}
export function netAfterTax(grossReturn: number, taxRatePct: number) {
  const t = (taxRatePct||0)/100; return grossReturn * (1 - t)
}
