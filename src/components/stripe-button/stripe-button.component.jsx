import React from "react";
import StripeCheckout from "react-stripe-checkout";

import './stripe-button.styles.scss'

const StripeCheckoutButton =({ price }) =>{
  const priceForStripe = price *100;

  const publishablekey = 'pk_test_51KFkYaJXbmhsS7gbfjkCOdKJKISHubulTRLMT08q5XLEA7dm3w8pfhSCQNiHDY5lPMMRyX4mdL6A6HhDuKwZAo9Q00zyc15H2A';
  
  const onToken = (token) => {
    console.log(token)
    alert('Payment Successful')
  }

  return(
    <StripeCheckout 
    label="Pay Now"
    name="CRWN Clothing Ltd."
    billingAddress
    shippingAddress
    image="https://svgshare.com/i/CUz.svg"
    description={`Your total is $${price}`}
    amount = {priceForStripe}
    panelLabel="Pay Now"
    token={onToken}
    stripeKey = {publishablekey}
    />
  )

};

export default StripeCheckoutButton;