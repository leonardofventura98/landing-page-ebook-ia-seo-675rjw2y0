const A_B_TEST_STORAGE_KEY = 'ebook_cta_variant'

const variants = {
  variantA: 'https://hotm.art/rOWzIkj0',
  variantB: 'https://pay.hotmart.com/C101306500L',
}

export const DEFAULT_LINK = 'https://hotm.art/rOWzIkj0'

type VariantName = keyof typeof variants

/**
 * Gets the assigned A/B test variant for the current session.
 * If no variant is assigned, it randomly selects one and stores it in sessionStorage.
 * @returns {VariantName} The name of the assigned variant.
 */
export const getVariant = (): VariantName => {
  try {
    const storedVariant = sessionStorage.getItem(A_B_TEST_STORAGE_KEY)
    if (storedVariant && Object.keys(variants).includes(storedVariant)) {
      return storedVariant as VariantName
    }

    const variantKeys = Object.keys(variants) as VariantName[]
    const randomVariant =
      variantKeys[Math.floor(Math.random() * variantKeys.length)]

    sessionStorage.setItem(A_B_TEST_STORAGE_KEY, randomVariant)
    return randomVariant
  } catch (error) {
    console.warn('Could not access sessionStorage for A/B test. Using default.')
    // Fallback to a default variant name if sessionStorage fails
    const variantKeys = Object.keys(variants) as VariantName[]
    return variantKeys[0] || 'variantA'
  }
}

/**
 * Gets the URL for a given variant name.
 * @param {VariantName} variantName - The name of the variant.
 * @returns {string} The URL for the variant.
 */
export const getVariantLink = (variantName: VariantName): string => {
  return variants[variantName] || DEFAULT_LINK
}

/**
 * Tracks a click event for a specific variant.
 * In a real-world scenario, this would send data to an analytics service.
 * @param {VariantName} variantName - The name of the variant that was clicked.
 * @param {string} location - The location of the CTA on the page (e.g., 'Hero', 'Header').
 */
export const trackClick = (
  variantName: VariantName,
  location: string,
): void => {
  console.log(`A/B Test Click Tracked:`, {
    variant: variantName,
    link: variants[variantName],
    location: location,
    timestamp: new Date().toISOString(),
  })

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'cta_click', {
      event_category: 'ab_test',
      event_label: `${variantName} - ${location}`,
      value: 1,
    })
  }
}
