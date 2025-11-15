"use client";

import { useState, useEffect } from 'react';
import { QrCode, Music, Users, Church, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// Tabs removed — using a two-column layout instead
import { accentGold } from '../utils/theme';
import { useTranslation } from 'react-i18next';

export function DonatePage() {
  const { t } = useTranslation('donate');

  const [upiList, setUpiList] = useState<any[]>([]);
  const [bankList, setBankList] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/donations?type=all');
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setUpiList(json.data.upi || []);
            setBankList(json.data.bank || []);
            return;
          }
        }

        // fallback to admin endpoints
        const [uRes, bRes] = await Promise.all([
          fetch('/api/admin/donations?type=upi'),
          fetch('/api/admin/donations?type=bank')
        ]);
        const ujson = uRes.ok ? await uRes.json().catch(() => ({ success: false })) : { success: false };
        const bjson = bRes.ok ? await bRes.json().catch(() => ({ success: false })) : { success: false };
        if (ujson && ujson.success) {
          setUpiList(ujson.data || []);
        }
        if (bjson && bjson.success) setBankList(bjson.data || []);
      } catch (err) {
        console.error('Failed to fetch donations', err);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000', color: '#fff' }}>
      <section className="pt-24 md:pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="w-full">
              <div className="mb-8 text-center pt-6 md:pt-10">
                <h1 className="text-3xl font-bold" style={{ color: '#fff' }}>Donate to YBH Ministries</h1>
                <p className="mt-2 text-sm" style={{ color: '#ccc' }}>Your contribution supports music education, community outreach, and ministry growth.</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Left column: Bank details */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>{t('paymentMethods.bank.title')}</h3>
                    <p className="text-sm" style={{ color: '#ccc' }}>{t('paymentMethods.bank.description')}</p>
                  </div>
                  <Card className="w-full" style={{ backgroundColor: '#0f0f0f', border: '1px solid #222', boxSizing: 'border-box', width: '100%' }}>
                    <CardContent className="pt-6">
                      {bankList.length === 0 ? (
                        <p style={{ color: '#ccc' }}>No Bank Details available</p>
                      ) : (
                        <div className="space-y-4">
                          {bankList.map((b) => (
                            <div key={b.id} className="rounded-xl p-6 w-full" style={{ backgroundColor: '#373737', boxSizing: 'border-box' }}>
                                <div className="mb-2">
                                <div className="text-xl font-semibold" style={{ color: accentGold }}>{b.account_name}</div>
                              </div>

                              <div className="text-sm mb-2" style={{ color: '#e6e6e6' }}>
                                {b.account_name ? (
                                  <div className="mb-3">
                                    <div className="text-xs text-gray-300 mb-1">Account Holder</div>
                                    <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                      <div className="text-sm text-white truncate">{b.account_name}</div>
                                      <button
                                        onClick={async () => {
                                          try {
                                            await navigator.clipboard.writeText(String(b.account_name));
                                            toast.success('Account holder copied');
                                          } catch (e) {
                                            console.error('copy failed', e);
                                            toast.error('Copy failed');
                                          }
                                        }}
                                        aria-label="Copy account holder"
                                        className="ml-3 p-1 rounded bg-transparent"
                                        title="Copy account holder"
                                      >
                                        <Copy size={16} style={{ color: accentGold }} />
                                      </button>
                                    </div>
                                  </div>
                                ) : null}

                                {b.bank_name ? (
                                  <div className="mb-3">
                                    <div className="text-xs text-gray-300 mb-1">Bank</div>
                                    <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                      <div className="text-sm text-white truncate">{b.bank_name}{b.branch_name ? ` — ${b.branch_name}` : ''}</div>
                                      <button
                                        onClick={async () => {
                                          try {
                                            await navigator.clipboard.writeText(String(b.bank_name) + (b.branch_name ? ` — ${b.branch_name}` : ''));
                                            toast.success('Bank copied');
                                          } catch (e) {
                                            console.error('copy failed', e);
                                            toast.error('Copy failed');
                                          }
                                        }}
                                        aria-label="Copy bank"
                                        className="ml-3 p-1 rounded bg-transparent"
                                        title="Copy bank"
                                      >
                                        <Copy size={16} style={{ color: accentGold }} />
                                      </button>
                                    </div>
                                  </div>
                                ) : null}

                                {b.account_number ? (
                                  <div className="mb-3">
                                    <div className="text-xs text-gray-300 mb-1">Account Number</div>
                                    <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                      <div className="text-sm text-white truncate">{b.account_number}</div>
                                      <button
                                        onClick={async () => {
                                          try {
                                            await navigator.clipboard.writeText(String(b.account_number));
                                            toast.success('Account number copied');
                                          } catch (e) {
                                            console.error('copy failed', e);
                                            toast.error('Copy failed');
                                          }
                                        }}
                                        aria-label="Copy account number"
                                        className="ml-3 p-1 rounded bg-transparent"
                                        title="Copy account number"
                                      >
                                        <Copy size={16} style={{ color: accentGold }} />
                                      </button>
                                    </div>
                                  </div>
                                ) : null}

                                {b.ifsc_code ? (
                                  <div className="mb-3">
                                    <div className="text-xs text-gray-300 mb-1">IFSC Code</div>
                                    <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                      <div className="text-sm text-white truncate">{b.ifsc_code}</div>
                                      <button
                                        onClick={async () => {
                                          try {
                                            await navigator.clipboard.writeText(String(b.ifsc_code));
                                            toast.success('IFSC copied');
                                          } catch (e) {
                                            console.error('copy failed', e);
                                            toast.error('Copy failed');
                                          }
                                        }}
                                        aria-label="Copy IFSC"
                                        className="ml-3 p-1 rounded bg-transparent"
                                        title="Copy IFSC"
                                      >
                                        <Copy size={16} style={{ color: accentGold }} />
                                      </button>
                                    </div>
                                  </div>
                                ) : null}

                                  {b.swift_code ? (
                                    <div className="mb-3">
                                      <div className="text-xs text-gray-300 mb-1">SWIFT Code</div>
                                      <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                        <div className="text-sm text-white truncate">{b.swift_code}</div>
                                        <button
                                          onClick={async () => {
                                            try {
                                              await navigator.clipboard.writeText(String(b.swift_code));
                                              toast.success('SWIFT copied');
                                            } catch (e) {
                                              console.error('copy failed', e);
                                              toast.error('Copy failed');
                                            }
                                          }}
                                          aria-label="Copy SWIFT"
                                          className="ml-3 p-1 rounded bg-transparent"
                                          title="Copy SWIFT"
                                        >
                                          <Copy size={16} style={{ color: accentGold }} />
                                        </button>
                                      </div>
                                    </div>
                                  ) : null}
                              </div>

                              <div className="mt-2 text-sm text-gray-400">Please include your name and contact information in the transaction reference</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Right column: QR codes */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold" style={{ color: '#fff' }}>QR Codes</h3>
                    <p className="text-sm" style={{ color: '#ccc' }}>Scan a UPI QR code below to donate using your UPI app.</p>
                  </div>

                  <Card className="w-full" style={{ backgroundColor: '#0f0f0f', border: '1px solid #222', boxSizing: 'border-box', width: '100%' }}>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold" style={{ color: '#fff' }}>{t('paymentMethods.qr.title')}</CardTitle>
                      <CardDescription style={{ color: '#ccc' }}>{t('paymentMethods.qr.description')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6 py-8 pb-12" style={{ overflow: 'hidden' }}>
                      {upiList.length === 0 ? (
                        <div className="p-6 rounded-xl" style={{ backgroundColor: '#373737', color: '#ccc', textAlign: 'center' }}>
                          <div className="text-lg font-medium mb-2">No QR Code available</div>
                          <div className="text-sm">We don't have any public UPI QR codes available right now. Please check the Bank details for transfer information or try again later.</div>
                        </div>
                      ) : (
                        <div className="w-full px-6 pb-6 flex flex-col items-center">
                          {upiList.map((u, idx) => {
                            const qrSrc = u.qr_image_url || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${encodeURIComponent(
                              u.upi_id
                            )}&pn=${encodeURIComponent('YBH Ministries')}&cu=INR`;

                            return (
                              <div key={u.id} className="w-full flex flex-col items-center my-6">
                                <div className="flex justify-center w-full">
                                  <div
                                    className="rounded-xl p-6 flex flex-col items-center"
                                    style={{ backgroundColor: '#373737', boxSizing: 'border-box', width: '100%', maxWidth: 320 }}
                                  >
                                    <div className="w-full">
                                      <div className="text-xl font-semibold text-center" style={{ color: '#fff' }}>Scan to Pay</div>
                                    </div>

                                    <div className="w-full flex items-center justify-center mt-4">
                                      <div className="bg-white rounded-md" style={{ width: '100%', maxWidth: 260, aspectRatio: '1 / 1', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                          src={qrSrc}
                                          alt={u.label || 'UPI QR'}
                                          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                                        />
                                      </div>
                                    </div>

                                    {u.upi_id ? (
                                      <div className="mt-4 w-full">
                                        <div className="text-xs text-gray-300 mb-1 text-center">UPI ID</div>
                                        <div className="flex items-center justify-between bg-black px-3 py-2 rounded-md">
                                          <div className="text-sm text-white truncate">{u.upi_id}</div>
                                          <button
                                            onClick={async () => {
                                              try {
                                                await navigator.clipboard.writeText(String(u.upi_id));
                                                toast.success('UPI ID copied');
                                              } catch (e) {
                                                console.error('copy failed', e);
                                                toast.error('Copy failed');
                                              }
                                            }}
                                            aria-label="Copy UPI ID"
                                            className="ml-3 p-1 rounded bg-transparent"
                                            title="Copy UPI ID"
                                          >
                                            <Copy size={18} style={{ color: accentGold }} />
                                          </button>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Tax Deductible Notice removed */}

            {/* Impact Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6 pb-12">
              <Card className="text-center" style={{ backgroundColor: '#2e2e2e', border: '1px solid #444' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Music className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#fff' }}>{t('impact.musicEducation.title')}</h3>
                  <p className="text-sm" style={{ color: '#ccc' }}>
                    {t('impact.musicEducation.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center" style={{ backgroundColor: '#2e2e2e', border: '1px solid #444' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Users className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#fff' }}>{t('impact.communityOutreach.title')}</h3>
                  <p className="text-sm" style={{ color: '#ccc' }}>
                    {t('impact.communityOutreach.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center" style={{ backgroundColor: '#2e2e2e', border: '1px solid #444' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Church className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#fff' }}>{t('impact.ministryGrowth.title')}</h3>
                  <p className="text-sm" style={{ color: '#ccc' }}>
                    {t('impact.ministryGrowth.description')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Debug panel removed */}

          </div>
        </div>
      </section>
    </div>
  );
}
