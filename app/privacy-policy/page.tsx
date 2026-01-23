import { PrivacyPolicy } from '@/components/PrivacyPolicy';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export default async function PrivacyPolicyPage() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return <PrivacyPolicy />;
}
