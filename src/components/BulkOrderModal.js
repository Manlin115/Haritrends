import React, { useState } from 'react';
import { X, Package, Users, Calculator, Shield, Lock, CreditCard } from 'lucide-react';

const BulkOrderModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'retailer',
    address: '',
    requirements: '',
    estimatedQuantity: '50-100',
    preferredStyles: [],
    budget: '',
    deliveryDate: '',
    customAmount: '',
    useCustomAmount: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStyleChange = (style) => {
    const updatedStyles = formData.preferredStyles.includes(style)
      ? formData.preferredStyles.filter(s => s !== style)
      : [...formData.preferredStyles, style];
    
    setFormData({
      ...formData,
      preferredStyles: updatedStyles
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

  const handleBulkPayment = async () => {
    if (!formData.businessName || !formData.contactPerson || !formData.email || !formData.phone) {
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

    // Calculate bulk order amount (advance payment - 30% of estimated order or custom amount)
    let advanceAmount;
    if (formData.useCustomAmount && formData.customAmount) {
      advanceAmount = parseInt(formData.customAmount) * 100; // Custom amount in paise
    } else {
      const estimatedValue = getBulkOrderValue(formData.estimatedQuantity);
      advanceAmount = Math.round(estimatedValue * 0.3) * 100; // 30% advance in paise
    }

    const options = {
      key: 'rzp_test_mNqMMML5tW9GXI', // Your Razorpay Test Key ID
      amount: advanceAmount,
      currency: 'INR',
      name: 'Hari Trends - Bulk Orders',
      description: `Bulk Order Advance Payment - ${formData.businessName}`,
      image: '/logo192.png',
      handler: function (response) {
        console.log('Bulk payment successful:', response);
        alert(`Bulk order advance payment successful! Payment ID: ${response.razorpay_payment_id}\n\nOur team will contact you within 24 hours to finalize your bulk order details.`);
        
        // Here you can send the bulk order details to your backend
        // sendBulkOrderToBackend(response, formData);
        
        setIsProcessing(false);
        onClose();
      },
      prefill: {
        name: formData.contactPerson,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        business_name: formData.businessName,
        business_type: formData.businessType,
        estimated_quantity: formData.estimatedQuantity,
        preferred_styles: formData.preferredStyles.join(', '),
        requirements: formData.requirements,
        delivery_date: formData.deliveryDate
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

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const getBulkOrderValue = (quantity) => {
    const ranges = {
      '50-100': 75 * 2499, // Average 75 pieces at bulk price ₹2499
      '100-250': 175 * 2299,
      '250-500': 375 * 2099,
      '500-1000': 750 * 1899,
      '1000+': 1000 * 1699
    };
    return ranges[quantity] || 150000;
  };

  const styles = [
    'Evening Dresses', 'Casual Wear', 'Business Professional', 
    'Party Wear', 'Vintage Collection', 'Bridal Collection',
    'Summer Collection', 'Winter Collection', 'Ethnic Wear'
  ];

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay" onClick={onClose}>
      <div className="bulk-order-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-modal-header">
          <h2><Package size={28} /> Bulk Orders</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="bulk-order-content">
          <div className="bulk-order-intro">
            <div className="bulk-benefits">
              <div className="benefit-item">
                <Calculator className="benefit-icon" />
                <div>
                  <h4>Special Pricing</h4>
                  <p>Up to 40% discount on bulk orders</p>
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
                  <h4>Custom Packaging</h4>
                  <p>Branded packaging available</p>
                </div>
              </div>
            </div>
          </div>

          <form className="bulk-order-form" onSubmit={(e) => e.preventDefault()}>
            <h3>Business Information</h3>
            
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

            <div className="form-row">
              <div className="form-group">
                <label>Business Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                >
                  <option value="retailer">Retailer</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="distributor">Distributor</option>
                  <option value="boutique">Boutique</option>
                  <option value="online_store">Online Store</option>
                  <option value="export">Export Business</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Estimated Quantity</label>
                <select
                  name="estimatedQuantity"
                  value={formData.estimatedQuantity}
                  onChange={handleInputChange}
                >
                  <option value="50-100">50-100 pieces</option>
                  <option value="100-250">100-250 pieces</option>
                  <option value="250-500">250-500 pieces</option>
                  <option value="500-1000">500-1000 pieces</option>
                  <option value="1000+">1000+ pieces</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Business Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter complete business address"
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Preferred Styles (Select multiple)</label>
              <div className="style-checkboxes">
                {styles.map(style => (
                  <label key={style} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preferredStyles.includes(style)}
                      onChange={() => handleStyleChange(style)}
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Budget Range (₹)</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 1,00,000 - 5,00,000"
                />
              </div>
              
              <div className="form-group">
                <label>Required Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Any specific requirements, customizations, or notes..."
                rows="3"
              />
            </div>

            <div className="custom-amount-section">
              <h3>Payment Amount</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={!formData.useCustomAmount}
                    onChange={() => setFormData({...formData, useCustomAmount: false})}
                  />
                  <span>Standard Advance (30% of estimated order)</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentType"
                    checked={formData.useCustomAmount}
                    onChange={() => setFormData({...formData, useCustomAmount: true})}
                  />
                  <span>Custom Amount</span>
                </label>
              </div>
              
              {formData.useCustomAmount && (
                <div className="custom-amount-input">
                  <label>Enter Custom Amount (₹)</label>
                  <input
                    type="number"
                    name="customAmount"
                    value={formData.customAmount}
                    onChange={handleInputChange}
                    placeholder="Enter amount in rupees"
                    min="1000"
                    max="1000000"
                  />
                  <small>Minimum: ₹1,000 | Maximum: ₹10,00,000</small>
                </div>
              )}
            </div>
          </form>

          <div className="bulk-pricing-info">
            <h3>Bulk Pricing Tiers</h3>
            <div className="pricing-tiers">
              <div className="tier">
                <span className="quantity">50-100 pcs</span>
                <span className="price">₹2,499/pc</span>
                <span className="discount">15% OFF</span>
              </div>
              <div className="tier">
                <span className="quantity">100-250 pcs</span>
                <span className="price">₹2,299/pc</span>
                <span className="discount">25% OFF</span>
              </div>
              <div className="tier">
                <span className="quantity">250-500 pcs</span>
                <span className="price">₹2,099/pc</span>
                <span className="discount">30% OFF</span>
              </div>
              <div className="tier highlighted">
                <span className="quantity">500+ pcs</span>
                <span className="price">₹1,899/pc</span>
                <span className="discount">40% OFF</span>
              </div>
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
              * Pay 30% advance to confirm your bulk order. Remaining amount on delivery.
            </p>
          </div>

          <div className="modal-actions">
            <button 
              className="bulk-pay-button"
              onClick={handleBulkPayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 
                formData.useCustomAmount && formData.customAmount ? 
                  `Pay ₹${parseInt(formData.customAmount).toLocaleString()}` :
                  `Pay Advance ₹${Math.round(getBulkOrderValue(formData.estimatedQuantity) * 0.3).toLocaleString()}`
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
    </div>
  );
};

export default BulkOrderModal;