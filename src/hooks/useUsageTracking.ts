import { useCallback } from 'react';

interface UsageData {
  sessionId: string;
  answers: Record<string, string>;
  recommendation?: any;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export const useUsageTracking = () => {
  const trackSession = useCallback(async (data: UsageData) => {
    try {
      const response = await fetch('/api/track-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionData: {
            ...data,
            userAgent: navigator.userAgent,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track usage');
      }

      console.log('Usage tracked successfully');
    } catch (error) {
      console.error('Usage tracking failed:', error);
    }
  }, []);

  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  return {
    trackSession,
    generateSessionId,
  };
};