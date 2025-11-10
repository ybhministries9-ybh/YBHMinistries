import { useState } from 'react';
import { CreditCard, Building2, QrCode, Heart, Music, Users, Church } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { primaryBackground, accentGold, textWhite } from '../utils/theme';
import { useTranslation } from 'react-i18next';

export function DonatePage() {
  const { t } = useTranslation('donate');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  // Card form state
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const suggestedAmounts = [500, 1000, 5000, 10000, 15000, 20000];

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle card payment submission
    alert('Card payment processing will be implemented with payment gateway integration.');
  };

  const activeAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen" style={{ backgroundColor: primaryBackground }}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBkb25hdGlvbiUyMGdpdmluZ3xlbnwxfHx8fDE3NjEwMTY4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Support Our Ministry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8" style={{ color: textWhite }}>
                {t('hero.title')}
              </h1>
              <Heart className="w-16 h-16 mx-auto mb-8 text-red-400" fill="currentColor" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6" style={{ color: textWhite }}>
                {t('hero.subtitle')}
              </h2>
              <p className="text-base md:text-lg" style={{ color: '#cccccc' }}>
                {t('hero.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Amount Selection */}
            <Card className="mb-8" style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
              <CardHeader>
                <CardTitle style={{ color: '#1a1a1a' }}>{t('amountSelection.title')}</CardTitle>
                <CardDescription style={{ color: '#666' }}>
                  {t('amountSelection.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className="py-3 px-4 rounded-lg border-2 transition-all cursor-pointer"
                      style={{
                        backgroundColor: selectedAmount === amount && !customAmount ? '#1a1a1a' : 'white',
                        color: selectedAmount === amount && !customAmount ? accentGold : '#1a1a1a',
                        borderColor: selectedAmount === amount && !customAmount ? accentGold : '#d0d0d0',
                      }}
                    >
                      ₹{amount.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                <div>
                  <Label htmlFor="custom-amount" style={{ color: '#1a1a1a' }}>{t('amountSelection.customLabel')}</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder={t('amountSelection.placeholder')}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="pl-8"
                      min="1"
                      style={{ backgroundColor: '#f0f0f0' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8" style={{ backgroundColor: '#e8e8e8' }}>
                <TabsTrigger value="card" className="cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('paymentMethods.card.tab')}
                </TabsTrigger>
                <TabsTrigger value="bank" className="cursor-pointer">
                  <Building2 className="w-4 h-4 mr-2" />
                  {t('paymentMethods.bank.tab')}
                </TabsTrigger>
                <TabsTrigger value="qr" className="cursor-pointer">
                  <QrCode className="w-4 h-4 mr-2" />
                  {t('paymentMethods.qr.tab')}
                </TabsTrigger>
              </TabsList>

              {/* Card Payment */}
              <TabsContent value="card">
                <Card style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('paymentMethods.card.title')}</CardTitle>
                    <CardDescription style={{ color: '#666' }}>
                      {t('paymentMethods.card.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCardSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="card-name" className="mb-2 block" style={{ color: '#1a1a1a' }}>
                          {t('paymentMethods.card.cardholderName')}
                        </Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          required
                          style={{ backgroundColor: '#f0f0f0' }}
                        />
                      </div>

                      <div>
                        <Label htmlFor="card-number" className="mb-2 block" style={{ color: '#1a1a1a' }}>
                          {t('paymentMethods.card.cardNumber')}
                        </Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, '');
                            const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                            setCardDetails({ ...cardDetails, cardNumber: formatted });
                          }}
                          maxLength={19}
                          required
                          style={{ backgroundColor: '#f0f0f0' }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="mb-2 block" style={{ color: '#1a1a1a' }}>
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              const formatted =
                                value.length >= 2
                                  ? `${value.slice(0, 2)}/${value.slice(2, 4)}`
                                  : value;
                              setCardDetails({ ...cardDetails, expiry: formatted });
                            }}
                            maxLength={5}
                            required
                            style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="mb-2 block" style={{ color: '#1a1a1a' }}>
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({
                                ...cardDetails,
                                cvv: e.target.value.replace(/\D/g, ''),
                              })
                            }
                            maxLength={4}
                            required
                            style={{ backgroundColor: '#f0f0f0' }}
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full cursor-pointer"
                          style={{
                            backgroundColor: !activeAmount ? '#999' : '#666',
                            color: textWhite,
                          }}
                          disabled={!activeAmount}
                        >
                          {activeAmount
                            ? `Donate ₹${activeAmount.toLocaleString('en-IN')}`
                            : 'Select an amount to continue'}
                        </Button>
                      </div>

                      <p className="text-sm text-center" style={{ color: '#666' }}>
                        <span className="inline-block mr-2">🔒</span>
                        Your payment information is secure and encrypted
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bank Transfer */}
              <TabsContent value="bank">
                <Card style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('paymentMethods.bank.title')}</CardTitle>
                    <CardDescription style={{ color: '#666' }}>
                      {t('paymentMethods.bank.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p style={{ color: '#666' }}>Bank transfer details will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* QR Code */}
              <TabsContent value="qr">
                <Card style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0' }}>
                  <CardHeader>
                    <CardTitle style={{ color: '#1a1a1a' }}>{t('paymentMethods.qr.title')}</CardTitle>
                    <CardDescription style={{ color: '#666' }}>
                      {t('paymentMethods.qr.description')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center py-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-200">
                      <ImageWithFallback
                        src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=ybhministries@bank&pn=YBH%20Ministries&cu=INR"
                        alt="Donation QR Code"
                        className="w-64 h-64"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Tax Deductible Notice */}
            <div className="mt-8">
              <Card style={{ backgroundColor: '#f0f4f8', border: '1px solid #e0e0e0' }}>
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                    <h3 style={{ color: '#1a1a1a' }}>{t('taxInfo.title')}</h3>
                  </div>
                  <p style={{ color: '#555', maxWidth: '700px', margin: '0 auto' }}>
                    {t('taxInfo.description')}
                  </p>
                  <p className="text-sm mt-3" style={{ color: '#777' }}>{t('taxInfo.taxId')}: XX-XXXXXXX</p>
                </CardContent>
              </Card>
            </div>

            {/* Impact Section */}
            <div className="mt-12 grid md:grid-cols-3 gap-6 pb-12">
              <Card className="text-center" style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Music className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#1a1a1a' }}>{t('impact.musicEducation.title')}</h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    {t('impact.musicEducation.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center" style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Users className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#1a1a1a' }}>{t('impact.communityOutreach.title')}</h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    {t('impact.communityOutreach.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center" style={{ backgroundColor: 'white', border: '1px solid #e0e0e0' }}>
                <CardContent className="pt-8">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: '#1a1a1a' }}
                  >
                    <Church className="w-8 h-8" style={{ color: accentGold }} />
                  </div>
                  <h3 className="mb-2" style={{ color: '#1a1a1a' }}>{t('impact.ministryGrowth.title')}</h3>
                  <p className="text-sm" style={{ color: '#666' }}>
                    {t('impact.ministryGrowth.description')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
