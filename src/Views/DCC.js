import React, { Component } from "react";
import axios from 'axios';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';

 
class Dcc extends Component {
  componentDidMount () {
    // this.getClientToken();
    this.createPayPalButton();
  }

  getClientToken = async () => {
    console.log('getClientToken');
    const CLIENT_AUTHORIZATION = await axios.get('http://localhost:3333/get-client-token');
    return CLIENT_AUTHORIZATION.data.clientToken;
  }

  createPayPalButton = async () => {
    // console.log('createPayPalButton');
    // let clientToken = document.getElementById('clientToken').innerHTML;

    var button = document.querySelector('#submit-button');
    const CLIENT_AUTHORIZATION =  await this.getClientToken();
    // console.log(CLIENT_AUTHORIZATION);
    // braintree.dropin.create({
    window.braintree.dropin.create({
      authorization: CLIENT_AUTHORIZATION,
      // authorization: clientToken,
      container: '#dropin-container',
      locale: 'pt_BR',
      paypal: {
        flow: 'vault'
      },
      paypalCredit: {
        flow: 'checkout',
        amount: '10.00',
        currency: 'USD'
      },
      card: {
        cardholderName: {
            required: true
        }
      },



    }, function (createErr, instance) {
      button.addEventListener('click', function () {
        instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
          // Submit payload.nonce to your server
          console.log(payload.nonce);
          console.log(payload);
          // ajax
              // $(document).ready(function(){
              window.$(document).ready(function(){
                // $.ajax({
                window.$.ajax({
                	type: "POST",
                // 	url: "EC-VAULT-BT/payment.php",
                  url: "http://localhost:3333/create-customer",
                	data: {
                	    payment_method_nonce:payload.nonce,
                	    amount:10,
                	},
                	dataType: "JSON"
                })
                .done(function(response) {
                	alert( "success" );
                	console.log( "success" );
                	console.log(response);
                })
                .fail(function (jqXHR, exception) {
                  console.log(exception)
                  console.log(jqXHR)
                	var msg_err = "";
                	if (jqXHR.status === 0) {
                		msg_err = "Not connect. Verify Network.";
                	} else if (jqXHR.status === 404) {
                		msg_err = "Requested page not found. [404]";
                	} else if (jqXHR.status === 500) {
                		msg_err = "Internal Server Error [500].";
                	} else if (exception === "parsererror") {
                		msg_err = "Requested JSON parse failed.";
                	} else if (exception === "timeout") {
                		msg_err = "Time out error.";
                	} else if (exception === "abort") {
                		msg_err = "Ajax request aborted.";
                	} else {
                		msg_err = "Uncaught Error. "+ jqXHR.responseText;
                	}
                	alert(msg_err);
                	console.log('fail');
                })
                .always(function() {
                	alert("complete");
                	console.log('always');
                });
            });

        // ajax
        });
      });
    });

  }

  render() {
    return (
        <>

          {/*
            // Be sure to have PayPal's checkout.js library loaded on your page.
            // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
          */}
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <br/>
                <br/>
                <br/>

                <div id="dropin-container"></div>
                <button id="submit-button">Request payment method</button>

              </div>
            </div>
          </div>
       </>
    );
  }
}
 
export default Dcc;
