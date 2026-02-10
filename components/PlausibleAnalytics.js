import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';

const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'blog.radi.pro';
const PLAUSIBLE_ENDPOINT =
  process.env.NEXT_PUBLIC_PLAUSIBLE_ENDPOINT || 'https://analytics.radi.pro/api/event';

export default function PlausibleAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      init({
        domain: PLAUSIBLE_DOMAIN,
        endpoint: PLAUSIBLE_ENDPOINT,
      });
    }
  }, []);

  return null;
}
