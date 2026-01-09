interface ConsentModeProps {
  /**
   * Optional list of ISO 3166-2 region codes for region-specific consent settings
   * Example: ['US-CA', 'US-NY', 'GB'] for California, New York, and Great Britain
   * Leave empty or undefined for global settings only
   */
  regions?: string[];
}

/**
 * Google Consent Mode v2 component for Axeptio CMP integration
 * 
 * This component sets up default consent mode settings that must be loaded
 * BEFORE any tracking scripts (GTM, GA4, etc.) to ensure proper consent handling.
 * 
 * The consent mode will be updated by Axeptio CMP when users interact with the consent banner.
 * 
 * This is a server component that outputs a synchronous script tag in the head.
 * 
 * @param regions - Optional array of ISO 3166-2 region codes for region-specific settings
 */
export default function ConsentMode({ regions = [] }: ConsentModeProps) {
  // Build the regions array string for the script
  const regionsString = regions.length > 0 
    ? `'regions':[${regions.map(r => `'${r}'`).join(',')}]`
    : '';

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // Define dataLayer and the gtag function.
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}

          ${regions.length > 0 ? `
          // Set default consent for specific regions according to your requirements
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
            ${regionsString}
          });
          ` : ''}

          // Set default consent for all other regions according to your requirements
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });
        `,
      }}
    />
  );
}

