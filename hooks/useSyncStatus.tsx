// hooks/useSyncStatus.ts
import { useState, useEffect } from 'react';

export type SyncState = 'synced' | 'syncing' | 'offline';

export interface SyncStatusInfo {
    status: SyncState;
    lastSynced: Date | null;
}

export function useSyncStatus() {
  const [syncInfo, setSyncInfo] = useState<SyncStatusInfo>({
    status: 'synced',
    lastSynced: new Date(),
  });

  useEffect(() => {
    // This interval simulates network changes for demonstration
    const interval = setInterval(() => {
      setSyncInfo(prev => {
        // If we were synced, simulate going offline
        if (prev.status === 'synced') {
          return { ...prev, status: 'offline' };
        }
        // If we were offline, simulate connection returning and start syncing
        if (prev.status === 'offline') {
          return { ...prev, status: 'syncing' };
        }
        // If we were syncing, the sync is now complete
        return { status: 'synced', lastSynced: new Date() };
      });
    }, 1000000); // Cycle status every 10 seconds

    return () => clearInterval(interval);
  }, []);
  
  return syncInfo;
}