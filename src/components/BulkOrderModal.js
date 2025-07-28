import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Package, Users, Calculator, Shield, Lock, CreditCard, CheckCircle, Clock, Phone } from 'lucide-react';

const BulkOrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    customAmount: '',
    currency: 'INR'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.classList.remove('modal-open');
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.classList.remove('razorpay-open');
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Handle Razorpay modal z-index - Ensure it appears on top of everything
  useEffect(() => {
    if (isRazorpayOpen) {
      // Inject comprehensive styles to ensure Razorpay is always on top
      const style = document.createElement('style');
      style.id = 'razorpay-z-index-fix';
      style.textContent = `
        /* Razorpay main container */
        .razorpay-container,
        .razorpay-checkout-frame,
        iframe[src*="razorpay"],
        div[id*="razorpay"],
        div[class*="razorpay"] {
          z-index: 2147483647 !important;
          position: fixed !important;
        }
        
        /* Razorpay backdrop */
        .razorpay-backdrop,
        div[class*="razorpay-backdrop"] {
          z-index: 2147483646 !important;
          position: fixed !important;
        }
        
        /* All Razorpay related elements */
        [id^="razorpay"],
        [class^="razorpay"],
        [class*="razorpay"] {
          z-index: 2147483647 !important;
        }
        
        /* Ensure no other elements interfere */
        body > div:not([id*="razorpay"]):not([class*="razorpay"]) {
          z-index: auto !important;
        }
        
        /* Hide all modals when Razorpay is open */
        .payment-modal-overlay[data-modal="bulk"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        const existingStyle = document.getElementById('razorpay-z-index-fix');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isRazorpayOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'AUD': 'A$',
      'CAD': 'C$',
      'SGD': 'S$',
      'AED': 'د.إ'
    };
    return symbols[currency] || currency;
  };

  const getCurrencyMultiplier = (currency) => {
    // Convert to INR equivalent for Razorpay (which processes in INR)
    const rates = {
      'INR': 1,
      'USD': 83,
      'EUR': 90,
      'GBP': 105,
      'AUD': 55,
      'CAD': 62,
      'SGD': 62,
      'AED': 23
    };
    return rates[currency] || 1;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBulkPayment = async () => {
    if (!formData.businessName || !formData.contactPerson || !formData.email || !formData.phone || !formData.customAmount) {
      alert('Please fill all required fields');
      return;
    }

    setIsProcessing(true);

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    // Calculate amount in INR for Razorpay (convert from selected currency)
    const multiplier = getCurrencyMultiplier(formData.currency);
    const amountInINR = parseFloat(formData.customAmount) * multiplier;
    const advanceAmount = Math.round(amountInINR) * 100; // Convert to paise

    const options = {
      key: 'rzp_test_mNqMMML5tW9GXI', // Your Razorpay Test Key ID
      amount: advanceAmount,
      currency: 'INR',
      name: 'Hari Trends - Bulk Orders',
      description: `Bulk Order Payment - ${formData.businessName}`,
      image: '/fav2.png',
      handler: function (response) {
        console.log('Bulk payment successful:', response);
        
        // Store payment details for success modal
        setPaymentDetails({
          paymentId: response.razorpay_payment_id,
          amount: formData.customAmount,
          currency: formData.currency,
          businessName: formData.businessName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone
        });
        
        // Here you can send the bulk order details to your backend
        // sendBulkOrderToBackend(response, formData);
        
        setIsProcessing(false);
        setIsRazorpayOpen(false);
        // Remove body class
        document.body.classList.remove('razorpay-open');
        // Show success modal instead of alert
        setShowSuccessModal(true);
      },
      prefill: {
        name: formData.contactPerson,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        business_name: formData.businessName,
        contact_person: formData.contactPerson,
        payment_amount: formData.customAmount,
        currency: formData.currency,
        amount_in_inr: amountInINR
      },
      theme: {
        color: '#D4AF37'
      },
      modal: {
        onopen: function() {
          // Hide bulk order modal when Razorpay opens
          setIsRazorpayOpen(true);
          // Add body class for additional z-index control
          document.body.classList.add('razorpay-open');
        },
        ondismiss: function() {
          // Reset processing state when payment modal is dismissed
          setIsProcessing(false);
          setIsRazorpayOpen(false);
          // Remove body class
          document.body.classList.remove('razorpay-open');
          // Don't close the bulk order modal here - let user try again or close manually
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setPaymentDetails(null);
    onClose(); // Close the main bulk order modal
  };

  const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
  ];

  // Success Modal Component
  const SuccessModal = () => {
    if (!showSuccessModal || !paymentDetails) return null;

    return createPortal(
      <div className="payment-modal-overlay success-modal-overlay" onClick={handleSuccessModalClose}>
        <div className="success-modal" onClick={(e) => e.stopPropagation()}>
          <div className="success-header">
            <div className="success-icon">
              <CheckCircle size={48} />
            </div>
            <h2>Bulk Order Payment Successful!</h2>
            <button className="close-button" onClick={handleSuccessModalClose}>
              <X size={24} />
            </button>
          </div>

          <div className="success-content">
            <div className="payment-info">
              <div className="info-row">
                <span className="label">Payment ID:</span>
                <span className="value">{paymentDetails.paymentId}</span>
              </div>
              <div className="info-row">
                <span className="label">Amount:</span>
                <span className="value amount">{getCurrencySymbol(paymentDetails.currency)}{parseFloat(paymentDetails.amount).toLocaleString()}</span>
              </div>
              <div className="info-row">
                <span className="label">Business:</span>
                <span className="value">{paymentDetails.businessName}</span>
              </div>
              <div className="info-row">
                <span className="label">Contact Person:</span>
                <span className="value">{paymentDetails.contactPerson}</span>
              </div>
            </div>

            <div className="next-steps">
              <div className="step-item">
                <Clock className="step-icon" />
                <div className="step-content">
                  <h4>What's Next?</h4>
                  <p>Our team will contact you within <strong>24 hours</strong> to finalize your bulk order details.</p>
                </div>
              </div>
              
              <div className="step-item">
                <Phone className="step-icon" />
                <div className="step-content">
                  <h4>Contact Information</h4>
                  <p>We'll reach out to <strong>{paymentDetails.email}</strong> and <strong>{paymentDetails.phone}</strong></p>
                </div>
              </div>
              
              <div className="step-item">
                <Package className="step-icon" />
                <div className="step-content">
                  <h4>Order Processing</h4>
                  <p>Your bulk order requirements will be discussed and customized according to your needs.</p>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button className="primary-button" onClick={handleSuccessModalClose}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <SuccessModal />
      {createPortal(
    <div 
      className="payment-modal-overlay" 
      data-modal="bulk" 
      onClick={isProcessing ? null : onClose}
      style={{ display: isRazorpayOpen ? 'none' : 'flex' }}
    >
      <div className="bulk-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-modal-header">
          <h2><Package size={28} /> Bulk Orders</h2>
          <button className="close-button" onClick={isProcessing ? null : onClose} disabled={isProcessing}>
            <X size={24} />
          </button>
        </div>

        <div className="bulk-order-content">
          <div className="bulk-order-intro">
            <div className="bulk-benefits">
              <div className="benefit-item">
                <Calculator className="benefit-icon" />
                <div>
                  <h4>Flexible Payments</h4>
                  <p>Multiple currency support</p>
                </div>
              </div>
              <div className="benefit-item">
                <Users className="benefit-icon" />
                <div>
                  <h4>Dedicated Support</h4>
                  <p>Personal account manager</p>
                </div>
              </div>
              <div className="benefit-item">
                <Package className="benefit-icon" />
                <div>
                  <h4>Bulk Orders</h4>
                  <p>Custom quantities available</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bulk-order-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Order Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your business name"
                />
              </div>
              
              <div className="form-group">
                <label>Contact Person *</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter contact person name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter business email"
                />
              </div>
              
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="payment-amount-section">
              <h3>Payment Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Currency *</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleInputChange}
                    required
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Payment Amount *</label>
                  <div className="amount-input-wrapper">
                    <span className="currency-symbol">{getCurrencySymbol(formData.currency)}</span>
                    <input
                      type="number"
                      name="customAmount"
                      value={formData.customAmount}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                    />
                  </div>
                  <small>Amount will be converted to INR for processing</small>
                </div>
              </div>
            </div>
          </form>

          <div className="currency-info">
            <h3>Currency Conversion</h3>
            <div className="conversion-note">
              <p>
                <strong>Selected Currency:</strong> {getCurrencySymbol(formData.currency)} {currencies.find(c => c.code === formData.currency)?.name}
              </p>
              {formData.customAmount && (
                <p>
                  <strong>Amount in INR:</strong> ₹{(parseFloat(formData.customAmount) * getCurrencyMultiplier(formData.currency)).toLocaleString()}
                </p>
              )}
              <small>* All payments are processed in Indian Rupees (INR) through Razorpay</small>
            </div>
          </div>

          <div className="payment-security">
            <div className="security-badges">
              <div className="security-item">
                <Shield size={20} />
                <span>Secure Payment</span>
              </div>
              <div className="security-item">
                <Lock size={20} />
                <span>SSL Encrypted</span>
              </div>
              <div className="security-item">
                <CreditCard size={20} />
                <span>All Payment Methods</span>
              </div>
            </div>
            <p className="advance-note">
              * Secure payment processing with multiple currency support.
            </p>
          </div>

          <div className="modal-actions">
            <button 
              className="bulk-pay-button"
              onClick={handleBulkPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 
                formData.customAmount ? 
                  `Pay ${getCurrencySymbol(formData.currency)}${parseFloat(formData.customAmount).toLocaleString()}` :
                  'Enter Amount to Pay'
              }
            </button>
            
            <button 
              className="cancel-button"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )}
    </>
  );
};

export default BulkOrderModal;