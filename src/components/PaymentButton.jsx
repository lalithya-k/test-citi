import React from 'react';
import GooglePayButton from '@google-pay/button-react';

function PaymentButton() {
 
  return (
    <div className="App"
    // style={{height : '100px'}}
    >
      {/* <h3>Google Pay React Demo</h3>
      <hr /> */}
      <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '01234567890123456789', // Google Pay test merchant ID
      merchantName: 'Demo Merchant',
    },
    
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '100',
      currencyCode: 'INR',
      countryCode: 'IN',
    },
    shippingAddressRequired: true,
    callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('Success', paymentRequest);
  }}
  onPaymentAuthorized={paymentData => {
    console.log('Payment Authorized Success', paymentData);
    return { transactionState: 'SUCCESS' };
  }}
  onPaymentDataChanged={paymentData => {
    console.log('On Payment Data Changed', paymentData);
    return {};
  }}
  existingPaymentMethodRequired="false"
  buttonColor= "black"
  buttonType="pay"
//   style={{height:'500px'}}
/>

    </div>
  );
}

export default PaymentButton;