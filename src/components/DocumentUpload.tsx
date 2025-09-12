import { useState } from 'react';
import { Upload, FileText, User, X, CheckCircle, Building, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const DocumentUpload = () => {
  const [investorType, setInvestorType] = useState<'individual' | 'company'>('individual');
  const [uploadedDocuments, setUploadedDocuments] = useState<{[key: string]: File | null}>({
    identity: null,
    photo: null,
    proofOfAddress: null,
    passport: null,
    companyRegistration: null,
    memorandum: null,
    directorIds: null,
    taxClearance: null
  });
  
  const [kycData, setKycData] = useState({
    // Individual fields
    firstName: '',
    lastName: '',
    idNumber: '',
    passportNumber: '',
    dateOfBirth: '',
    nationality: '',
    occupation: '',
    sourceOfFunds: '',
    // Company fields
    companyName: '',
    registrationNumber: '',
    taxNumber: '',
    businessType: '',
    yearsInOperation: '',
    numberOfDirectors: '',
    authorizedCapital: '',
    // Address fields
    streetAddress: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Zimbabwe',
    // Contact fields
    phoneNumber: '',
    alternativePhone: '',
    email: '',
    // Financial fields
    bankName: '',
    accountNumber: '',
    accountType: '',
    expectedInvestmentAmount: '',
    riskTolerance: ''
  });

  const { toast } = useToast();

  const handleFileUpload = (type: string, file: File) => {
    setUploadedDocuments(prev => ({ ...prev, [type]: file }));
    toast({
      title: "File Uploaded",
      description: `${file.name} uploaded successfully`,
    });
  };

  const handleFileRemove = (type: string) => {
    setUploadedDocuments(prev => ({ ...prev, [type]: null }));
    toast({
      title: "File Removed",
      description: "Document removed successfully",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setKycData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitKYC = () => {
    // Validation logic here
    const requiredFields = investorType === 'individual' 
      ? ['firstName', 'lastName', 'idNumber', 'phoneNumber', 'email', 'streetAddress']
      : ['companyName', 'registrationNumber', 'taxNumber', 'phoneNumber', 'email', 'streetAddress'];
    
    const missingFields = requiredFields.filter(field => !kycData[field as keyof typeof kycData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in all required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    // Check required documents
    const requiredDocs = investorType === 'individual'
      ? ['identity', 'photo', 'proofOfAddress']
      : ['companyRegistration', 'memorandum', 'directorIds', 'taxClearance'];
    
    const missingDocs = requiredDocs.filter(doc => !uploadedDocuments[doc]);
    
    if (missingDocs.length > 0) {
      toast({
        title: "Missing Documents",
        description: `Please upload all required documents: ${missingDocs.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "KYC Submitted",
      description: "Your KYC documents have been submitted for review. You will be notified within 2-3 business days.",
    });
  };
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-2">KYC Verification</h3>
        <p className="text-muted-foreground">Complete your Know Your Customer verification to start investing</p>
      </div>

      {/* Investor Type Selection */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">Investor Type</h4>
          <RadioGroup value={investorType} onValueChange={(value: 'individual' | 'company') => setInvestorType(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="individual" id="individual" />
              <Label htmlFor="individual" className="flex items-center cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Individual Investor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="company" id="company" />
              <Label htmlFor="company" className="flex items-center cursor-pointer">
                <Building className="w-4 h-4 mr-2" />
                Company/Entity Investor
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Personal/Company Information */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">
            {investorType === 'individual' ? 'Personal Information' : 'Company Information'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investorType === 'individual' ? (
              <>
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={kycData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={kycData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <Label htmlFor="idNumber">National ID Number *</Label>
                  <Input
                    id="idNumber"
                    value={kycData.idNumber}
                    onChange={(e) => handleInputChange('idNumber', e.target.value)}
                    placeholder="63-123456-A-12"
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">Passport Number (if applicable)</Label>
                  <Input
                    id="passportNumber"
                    value={kycData.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    placeholder="Enter passport number"
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={kycData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select value={kycData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zimbabwean">Zimbabwean</SelectItem>
                      <SelectItem value="South African">South African</SelectItem>
                      <SelectItem value="Botswanan">Botswanan</SelectItem>
                      <SelectItem value="Zambian">Zambian</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={kycData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    placeholder="Your profession/occupation"
                  />
                </div>
                <div>
                  <Label htmlFor="sourceOfFunds">Source of Funds *</Label>
                  <Select value={kycData.sourceOfFunds} onValueChange={(value) => handleInputChange('sourceOfFunds', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source of funds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employment Income">Employment Income</SelectItem>
                      <SelectItem value="Business Income">Business Income</SelectItem>
                      <SelectItem value="Investment Returns">Investment Returns</SelectItem>
                      <SelectItem value="Inheritance">Inheritance</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={kycData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={kycData.registrationNumber}
                    onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                    placeholder="Company registration number"
                  />
                </div>
                <div>
                  <Label htmlFor="taxNumber">Tax Number *</Label>
                  <Input
                    id="taxNumber"
                    value={kycData.taxNumber}
                    onChange={(e) => handleInputChange('taxNumber', e.target.value)}
                    placeholder="Tax identification number"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={kycData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Trading">Trading</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Mining">Mining</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsInOperation">Years in Operation *</Label>
                  <Input
                    id="yearsInOperation"
                    type="number"
                    value={kycData.yearsInOperation}
                    onChange={(e) => handleInputChange('yearsInOperation', e.target.value)}
                    placeholder="Number of years"
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfDirectors">Number of Directors *</Label>
                  <Input
                    id="numberOfDirectors"
                    type="number"
                    value={kycData.numberOfDirectors}
                    onChange={(e) => handleInputChange('numberOfDirectors', e.target.value)}
                    placeholder="Number of directors"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="authorizedCapital">Authorized Capital *</Label>
                  <Input
                    id="authorizedCapital"
                    value={kycData.authorizedCapital}
                    onChange={(e) => handleInputChange('authorizedCapital', e.target.value)}
                    placeholder="Authorized capital amount"
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">Address Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="streetAddress">Street Address *</Label>
              <Input
                id="streetAddress"
                value={kycData.streetAddress}
                onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                placeholder="Enter full street address"
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={kycData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <Label htmlFor="province">Province *</Label>
              <Select value={kycData.province} onValueChange={(value) => handleInputChange('province', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Harare">Harare</SelectItem>
                  <SelectItem value="Bulawayo">Bulawayo</SelectItem>
                  <SelectItem value="Mashonaland Central">Mashonaland Central</SelectItem>
                  <SelectItem value="Mashonaland East">Mashonaland East</SelectItem>
                  <SelectItem value="Mashonaland West">Mashonaland West</SelectItem>
                  <SelectItem value="Matabeleland North">Matabeleland North</SelectItem>
                  <SelectItem value="Matabeleland South">Matabeleland South</SelectItem>
                  <SelectItem value="Midlands">Midlands</SelectItem>
                  <SelectItem value="Manicaland">Manicaland</SelectItem>
                  <SelectItem value="Masvingo">Masvingo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={kycData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="Postal code"
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={kycData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="Botswana">Botswana</SelectItem>
                  <SelectItem value="Zambia">Zambia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={kycData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="+263 77 123 4567"
              />
            </div>
            <div>
              <Label htmlFor="alternativePhone">Alternative Phone</Label>
              <Input
                id="alternativePhone"
                value={kycData.alternativePhone}
                onChange={(e) => handleInputChange('alternativePhone', e.target.value)}
                placeholder="Alternative contact number"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={kycData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">Financial Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Select value={kycData.bankName} onValueChange={(value) => handleInputChange('bankName', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBZ Bank">CBZ Bank</SelectItem>
                  <SelectItem value="Steward Bank">Steward Bank</SelectItem>
                  <SelectItem value="First Capital Bank">First Capital Bank</SelectItem>
                  <SelectItem value="Standard Chartered">Standard Chartered</SelectItem>
                  <SelectItem value="Barclays Bank">Barclays Bank</SelectItem>
                  <SelectItem value="NMB Bank">NMB Bank</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="accountType">Account Type *</Label>
              <Select value={kycData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings Account</SelectItem>
                  <SelectItem value="Current">Current Account</SelectItem>
                  <SelectItem value="Business">Business Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expectedInvestmentAmount">Expected Investment Amount (USD) *</Label>
              <Select value={kycData.expectedInvestmentAmount} onValueChange={(value) => handleInputChange('expectedInvestmentAmount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$250 - $1,000">$250 - $1,000</SelectItem>
                  <SelectItem value="$1,000 - $5,000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="$5,000 - $25,000">$5,000 - $25,000</SelectItem>
                  <SelectItem value="$25,000 - $100,000">$25,000 - $100,000</SelectItem>
                  <SelectItem value="$100,000+">$100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="riskTolerance">Risk Tolerance *</Label>
              <Select value={kycData.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative (Low Risk)</SelectItem>
                  <SelectItem value="Moderate">Moderate (Medium Risk)</SelectItem>
                  <SelectItem value="Aggressive">Aggressive (High Risk)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Section */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4">Required Documents</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investorType === 'individual' ? (
              <>
                {/* National ID */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.identity ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">National ID/Passport</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.identity.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('identity')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">National ID/Passport *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Front and back copy</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('identity', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.photo ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Profile Photo</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.photo.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('photo')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <User className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Profile Photo *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Clear passport-style photo</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('photo', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Proof of Address */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.proofOfAddress ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Proof of Address</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.proofOfAddress.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('proofOfAddress')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Proof of Address *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Utility bill or bank statement</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('proofOfAddress', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Company Registration */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.companyRegistration ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Company Registration</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.companyRegistration.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('companyRegistration')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Building className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Company Registration *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Certificate of incorporation</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('companyRegistration', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Memorandum */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.memorandum ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Memorandum</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.memorandum.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('memorandum')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Memorandum *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Memorandum and Articles</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('memorandum', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Director IDs */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.directorIds ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Director IDs</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.directorIds.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('directorIds')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Users className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Director IDs *</h4>
                        <p className="text-sm text-muted-foreground mb-4">All directors' ID copies</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('directorIds', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Tax Clearance */}
                <div className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer rounded-lg">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {uploadedDocuments.taxClearance ? (
                      <div className="w-full">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="font-medium mb-2">Tax Clearance</h4>
                        <p className="text-sm text-green-600 mb-4">{uploadedDocuments.taxClearance.name}</p>
                        <Button variant="outline" size="sm" onClick={() => handleFileRemove('taxClearance')}>
                          <X className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">Tax Clearance *</h4>
                        <p className="text-sm text-muted-foreground mb-4">Valid tax clearance certificate</p>
                        <Button variant="outline" size="sm" className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload('taxClearance', file);
                            }}
                          />
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button size="lg" onClick={handleSubmitKYC} className="px-12">
          Submit KYC Application
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;