import { useState } from 'react';
import { Save, DollarSign, CreditCard, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  swiftCode: string;
  upiId: string;
}

interface DonationInfo {
  title: string;
  description: string;
  impactMessage: string;
  taxBenefits: string;
}

export function DonateManager() {
  const [donationInfo, setDonationInfo] = useState<DonationInfo>({
    title: 'Support Our Ministry',
    description: 'Your generous donations help us continue our mission of spreading worship and training worshipers worldwide.',
    impactMessage: 'Every contribution makes a difference in transforming lives through worship and spiritual education.',
    taxBenefits: 'All donations are eligible for tax benefits under Section 80G of the Income Tax Act.'
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: 'Yeshua Beth Hallel Ministries',
    accountNumber: '1234567890',
    bankName: 'State Bank of India',
    branchName: 'Hyderabad Main Branch',
    ifscCode: 'SBIN0001234',
    swiftCode: 'SBININBB123',
    upiId: 'ybhministries@sbi'
  });

  const [paymentMethods, setPaymentMethods] = useState({
    bankTransfer: true,
    upi: true,
    onlinePayment: true,
    cheque: true,
    cash: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Donation page information saved successfully!');
  };

  const updateDonationInfo = (field: keyof DonationInfo, value: string) => {
    setDonationInfo({ ...donationInfo, [field]: value });
  };

  const updateBankDetails = (field: keyof BankDetails, value: string) => {
    setBankDetails({ ...bankDetails, [field]: value });
  };

  const togglePaymentMethod = (method: keyof typeof paymentMethods) => {
    setPaymentMethods({ ...paymentMethods, [method]: !paymentMethods[method] });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl text-white mb-2">Donation Page Management</h2>
          <p className="text-gray-300">Manage donation information and payment methods</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
        >
          <Save size={16} className="mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Donation Information */}
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="text-[#FDB813]" size={20} />
            <h3 className="text-lg text-white">Donation Information</h3>
          </div>
          <div className="space-y-3">
            <Input
              value={donationInfo.title}
              onChange={(e) => updateDonationInfo('title', e.target.value)}
              placeholder="Page Title"
              className="bg-black border-gray-600 text-white"
            />
            <Textarea
              value={donationInfo.description}
              onChange={(e) => updateDonationInfo('description', e.target.value)}
              placeholder="Description"
              className="bg-black border-gray-600 text-white"
              rows={3}
            />
            <Textarea
              value={donationInfo.impactMessage}
              onChange={(e) => updateDonationInfo('impactMessage', e.target.value)}
              placeholder="Impact Message"
              className="bg-black border-gray-600 text-white"
              rows={2}
            />
            <Textarea
              value={donationInfo.taxBenefits}
              onChange={(e) => updateDonationInfo('taxBenefits', e.target.value)}
              placeholder="Tax Benefits Information"
              className="bg-black border-gray-600 text-white"
              rows={2}
            />
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="text-[#FDB813]" size={20} />
            <h3 className="text-lg text-white">Bank Account Details</h3>
          </div>
          <div className="space-y-3">
            <Input
              value={bankDetails.accountName}
              onChange={(e) => updateBankDetails('accountName', e.target.value)}
              placeholder="Account Name"
              className="bg-black border-gray-600 text-white"
            />
            <Input
              value={bankDetails.accountNumber}
              onChange={(e) => updateBankDetails('accountNumber', e.target.value)}
              placeholder="Account Number"
              className="bg-black border-gray-600 text-white"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                value={bankDetails.bankName}
                onChange={(e) => updateBankDetails('bankName', e.target.value)}
                placeholder="Bank Name"
                className="bg-black border-gray-600 text-white"
              />
              <Input
                value={bankDetails.branchName}
                onChange={(e) => updateBankDetails('branchName', e.target.value)}
                placeholder="Branch Name"
                className="bg-black border-gray-600 text-white"
              />
              <Input
                value={bankDetails.ifscCode}
                onChange={(e) => updateBankDetails('ifscCode', e.target.value)}
                placeholder="IFSC Code"
                className="bg-black border-gray-600 text-white"
              />
              <Input
                value={bankDetails.swiftCode}
                onChange={(e) => updateBankDetails('swiftCode', e.target.value)}
                placeholder="SWIFT Code"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            <Input
              value={bankDetails.upiId}
              onChange={(e) => updateBankDetails('upiId', e.target.value)}
              placeholder="UPI ID"
              className="bg-black border-gray-600 text-white"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-[#2E2E2E] p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="text-[#FDB813]" size={20} />
            <h3 className="text-lg text-white">Accepted Payment Methods</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(paymentMethods).map(([method, enabled]) => (
              <label key={method} className="flex items-center gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => togglePaymentMethod(method as keyof typeof paymentMethods)}
                  className="w-4 h-4"
                />
                <span className="capitalize">{method.replace(/([A-Z])/g, ' $1').trim()}</span>
                {enabled && <span className="text-[#FDB813] text-sm ml-auto">✓ Enabled</span>}
              </label>
            ))}
          </div>
        </div>

        {/* Information Notice */}
        <div className="bg-[#2E2E2E] border-l-4 border-[#FDB813] p-4 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong className="text-[#FDB813]">Note:</strong> Ensure all bank details are accurate before publishing. For security reasons, consider implementing payment gateway integration for online donations.
          </p>
        </div>
      </div>
    </div>
  );
}
