import { useState, useEffect } from 'react';
import { UsageData } from '@/types/app';

const STORAGE_KEY = 'whatShouldWeEat_usage';
const FREE_USAGE_LIMIT = 3;

export function useUsageTracking() {
  const [usageData, setUsageData] = useState<UsageData>({ count: 0, lastUsed: '' });
  const [canUse, setCanUse] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setUsageData(data);
      setCanUse(data.count < FREE_USAGE_LIMIT);
    }
  }, []);

  const incrementUsage = () => {
    const newUsageData = {
      count: usageData.count + 1,
      lastUsed: new Date().toISOString()
    };
    
    setUsageData(newUsageData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsageData));
    setCanUse(newUsageData.count < FREE_USAGE_LIMIT);
  };

  const getRemainingUses = () => {
    return Math.max(0, FREE_USAGE_LIMIT - usageData.count);
  };

  const resetUsage = () => {
    const resetData = { count: 0, lastUsed: '' };
    setUsageData(resetData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
    setCanUse(true);
  };

  return {
    usageData,
    canUse,
    remainingUses: getRemainingUses(),
    incrementUsage,
    resetUsage,
    isAtLimit: usageData.count >= FREE_USAGE_LIMIT
  };
}