import React, { useState, useEffect } from 'react';
import { Shield, Lock, CreditCard, CheckCircle, ArrowLeft, Package, User, Mail, Phone } from 'lucide-react';

const PaymentPage = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    // Get payment data from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setPaymentData(decodedData);
      } catch (error) {
        console.error('Error parsing payment data:', error);
      }
    }
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'INR': '₹',
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return symbols[currency] || '₹';
  };

  const getCurrencyMultiplier = (currency) => {
    const multipliers = {
      'INR': 1,
      'USD': 83,
      'EUR': 90,
      'GBP': 105
    };
    return multipliers[currency] || 1;
  };

  const handlePayment = async () => {
    if (!paymentData) return;

    setIsProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Payment system failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    let amount, description, orderType;

    if (paymentData.type === 'bulk') {
      const multiplier = getCurrencyMultiplier(paymentData.currency);
      const amountInINR = parseFloat(paymentData.customAmount) * multiplier;
      amount = Math.round(amountInINR) * 100;
      description = `Bulk Order Payment - ${paymentData.businessName}`;
      orderType = 'Bulk Order';
    } else {
      amount = 2999 * paymentData.quantity * 100;
      description = `Fashion Order - ${paymentData.quantity} item(s)`;
      orderType = 'Regular Order';
    }

    const options = {
      key: 'rzp_test_mNqMMML5tW9GXI',
      amount: amount,
      currency: 'INR',
      name: 'Hari Trends',
      description: description,
      image: '/logo192.png',
      handler: function (response) {
        console.log('Payment successful:', response);
        setPaymentComplete(true);
        setIsProcessing(false);
      },
      prefill: {
        name: paymentData.type === 'bulk' ? paymentData.contactPerson : paymentData.name,
        email: paymentData.email,
        contact: paymentData.phone
      },
      theme: {
        color: '#D4AF37'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (paymentComplete) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-success">
            <CheckCircle size={80} className="success-icon" />
            <h1>Payment Successful!</h1>
            <p>Thank you for your order. We'll contact you within 24 hours.</p>
            <button 
              className="back-button"
              onClick={() => window.close()}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="payment-page">
        <div className="payment-container">
          <div className="payment-error">
            <h1>Payment Error</h1>
            <p>Invalid payment data. Please try again.</p>
            <button 
              className="back-button"
              onClick={() => window.close()}
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <div className="brand-section">
            <h1>Hari Trends</h1>
            <p>Premium Fashion Collection</p>
          </div>
          <div className="security-badges">
            <div className="security-badge">
              <Shield size={20} />
              <span>Secure</span>
            </div>
            <div className="security-badge">
              <Lock size={20} />
              <span>Encrypted</span>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        <div className="payment-content">
          <div className="payment-left">
            {/* Order Summary */}
            <div className="order-summary-section">
              <h2>
                <Package size={24} />
                Order Summary
              </h2>
              
              {paymentData.type === 'bulk' ? (
                <div className="bulk-order-details">
                  <div className="order-type">
                    <span className="label">Order Type:</span>
                    <span className="value">Bulk Order</span>
                  </div>
                  <div className="business-info">
                    <span className="label">Business:</span>
                    <span className="value">{paymentData.businessName}</span>
                  </div>
                  <div className="amount-info">
                    <span className="label">Amount:</span>
                    <span className="value amount">
                      {getCurrencySymbol(paymentData.currency)}{parseFloat(paymentData.customAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="regular-order-details">
                  <div className="order-type">
                    <span className="label">Order Type:</span>
                    <span className="value">Fashion Items</span>
                  </div>
                  <div className="quantity-info">
                    <span className="label">Quantity:</span>
                    <span className="value">{paymentData.quantity} item(s)</span>
                  </div>
                  <div className="price-info">
                    <span className="label">Price per item:</span>
                    <span className="value">₹2,999</span>
                  </div>
                  <div className="total-info">
                    <span className="label">Total Amount:</span>
                    <span className="value amount">₹{(2999 * paymentData.quantity).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="customer-details-section">
              <h2>
                <User size={24} />
                Customer Details
              </h2>
              <div className="customer-info">
                <div className="info-item">
                  <User size={18} />
                  <span>{paymentData.type === 'bulk' ? paymentData.contactPerson : paymentData.name}</span>
                </div>
                <div className="info-item">
                  <Mail size={18} />
                  <span>{paymentData.email}</span>
                </div>
                <div className="info-item">
                  <Phone size={18} />
                  <span>{paymentData.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-right">
            {/* Payment Section */}
            <div className="payment-section">
              <h2>
                <CreditCard size={24} />
                Secure Payment
              </h2>
              
              <div className="payment-amount">
                <span className="amount-label">Total Amount</span>
                <span className="amount-value">
                  {paymentData.type === 'bulk' 
                    ? `${getCurrencySymbol(paymentData.currency)}${parseFloat(paymentData.customAmount).toLocaleString()}`
                    : `₹${(2999 * paymentData.quantity).toLocaleString()}`
                  }
                </span>
              </div>

              <div className="payment-features">
                <div className="feature">
                  <CheckCircle size={16} />
                  <span>256-bit SSL Encryption</span>
                </div>
                <div className="feature">
                  <CheckCircle size={16} />
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="feature">
                  <CheckCircle size={16} />
                  <span>Multiple Payment Options</span>
                </div>
                <div className="feature">
                  <CheckCircle size={16} />
                  <span>Instant Payment Confirmation</span>
                </div>
              </div>

              <button 
                className="pay-now-button"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Pay Now
                  </>
                )}
              </button>

              <div className="payment-methods">
                <p>Accepted Payment Methods:</p>
                <div className="methods">
                  <span>Credit Card</span>
                  <span>Debit Card</span>
                  <span>UPI</span>
                  <span>Net Banking</span>
                  <span>Wallets</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="payment-footer">
          <p>© 2024 Hari Trends. All rights reserved. | Secure payments powered by Razorpay</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;