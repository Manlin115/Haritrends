import React, { useState } from 'react';
import { X, CreditCard, Shield, Lock } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, selectedItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    size: 'M',
    quantity: 1
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
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

    // Calculate amount (in paise - multiply by 100)
    const amount = 2999 * formData.quantity * 100; // ₹2999 per dress

    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay Key ID
      amount: amount,
      currency: 'INR',
      name: 'Hari Trends',
      description: `${selectedItem?.title || 'Fashion Dress'} - Size: ${formData.size}`,
      image: '/logo192.png', // Your logo
      handler: function (response) {
        // Payment successful
        console.log('Payment successful:', response);
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        
        // Here you can send the payment details to your backend
        // sendPaymentDetailsToBackend(response, formData);
        
        setIsProcessing(false);
        onClose();
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: formData.address,
        size: formData.size,
        quantity: formData.quantity
      },
      theme: {
        color: '#D4AF37' // Your gold color
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Complete Your Order</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="payment-modal-content">
          {selectedItem && (
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-item">
                <img src={selectedItem.image} alt={selectedItem.title} />
                <div className="item-details">
                  <h4>{selectedItem.title}</h4>
                  <p>{selectedItem.description}</p>
                  <div className="price">₹2,999</div>
                </div>
              </div>
            </div>
          )}

          <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Customer Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="form-group">
                <label>Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete delivery address"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity</label>
                <select
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                >
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div className="total-amount">
                <strong>Total: ₹{(2999 * formData.quantity).toLocaleString()}</strong>
              </div>
            </div>
          </form>

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
                <span>All Cards Accepted</span>
              </div>
            </div>
          </div>

          <button 
            className="pay-now-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${(2999 * formData.quantity).toLocaleString()} Now`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;