import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';

const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'blog.radi.pro';

export default function PlausibleAnalytics() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      init({
        domain: PLAUSIBLE_DOMAIN,
        apiHost: 'https://analytics.radi.pro',
      });
    }
  }, []);

  return null;
}
