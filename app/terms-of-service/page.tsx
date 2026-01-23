import { TermsOfService } from '@/components/TermsOfService';
import MaintenancePage from '../maintenance/page';
import { isMaintenanceEnabled } from '../lib/maintenance';

export default async function TermsOfServicePage() {
  if (await isMaintenanceEnabled()) return <MaintenancePage />;
  return <TermsOfService />;
}
