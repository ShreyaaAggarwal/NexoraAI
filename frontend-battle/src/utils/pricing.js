import { pricingMatrix } from '../data/index.js'

/**
 * Compute the display price for a plan.
 * All price logic lives here — UI components call this, never compute inline.
 */
export function computePrice(planId, currency, billing) {
  const base        = pricingMatrix.basePrices[planId]
  const currConf    = pricingMatrix.currencyConfig[currency]
  const discount    = billing === 'annual' ? pricingMatrix.annualMultiplier : 1

  const raw = base * currConf.multiplier * discount

  // Format: INR shows no decimals above 100, others show 0 decimals
  const formatted = currency === 'INR'
    ? Math.round(raw).toLocaleString('en-IN')
    : Math.round(raw).toLocaleString('en-US')

  return {
    amount:    formatted,
    symbol:    currConf.symbol,
    currency:  currConf.label,
    perPeriod: billing === 'annual' ? '/mo, billed annually' : '/month',
  }
}