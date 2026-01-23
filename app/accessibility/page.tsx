import { Metadata } from 'next';
import { Accessibility } from '@/components/Accessibility';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export default async function AccessibilityPage() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return <Accessibility />;
}
