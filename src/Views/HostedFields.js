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

    // var button = document.querySelector('#submit-button');
    const CLIENT_AUTHORIZATION =  await this.getClientToken();
    console.log(CLIENT_AUTHORIZATION);


    var form = document.querySelector('#my-sample-form');
    var submit = document.querySelector('input[type="submit"]');

    // braintree.client.create({
    window.braintree.client.create({
      authorization: CLIENT_AUTHORIZATION
    }, function (clientErr, clientInstance) {
      if (clientErr) {
        console.error(clientErr);
        return;
      }

      // This example shows Hosted Fields, but you can also use this
      // client instance to create additional components here, such as
      // PayPal or Data Collector.

      // braintree.hostedFields.create({
      window.braintree.hostedFields.create({
        client: clientInstance,
        styles: {
          'input': {
            'font-size': '14px'
          },
          'input.invalid': {
            'color': 'red'
          },
          'input.valid': {
            'color': 'green'
          }
        },
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111'
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123'
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: '10/2019'
          }
        }
      }, function (hostedFieldsErr, hostedFieldsInstance) {
        if (hostedFieldsErr) {
          console.error(hostedFieldsErr);
          return;
        }

        submit.removeAttribute('disabled');

        form.addEventListener('submit', function (event) {
          event.preventDefault();

          hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
            if (tokenizeErr) {
              console.error(tokenizeErr);
              return;
            }

            // If this was a real integration, this is where you would
            // send the nonce to your server.
            console.log('Got a nonce: ' + payload.nonce);
          });
        }, false);
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

                <form action="/" id="my-sample-form" method="post">
                  <label for="card-number">Card Number</label>
                  <div id="card-number"></div>

                  <label for="cvv">CVV</label>
                  <div id="cvv"></div>

                  <label for="expiration-date">Expiration Date</label>
                  <div id="expiration-date"></div>

                  <input type="submit" value="Pay" disabled />
                </form>

              </div>
            </div>
          </div>
       </>
    );
  }
}
 
export default Dcc;
