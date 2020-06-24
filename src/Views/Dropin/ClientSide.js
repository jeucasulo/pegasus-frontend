import React, { Component } from "react";
// import axios from 'axios';

import flowImg from '../../assets/clientFlow.png';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';



class ClientSide extends Component {
  
  renderInstallsScriptSwitch = {
    // Node(){alert('node')},
    Node(language){
      return(
          // <div className='codeBlock'>
          //   <div className='codeBlockHeader'>
          //     {language}
          //   </div>
          //   <div className='codeBlockBody'>
          //     <p><span className='codeBlockVar'>var</span> braintree = <span className='codeBlockRequire'>require</span>(<span className='codeBlockString'>"braintree"</span>);</p>
          //     <p><span className='codeBlockVar'>var</span> gateway = braintree.connect(&#123;	</p>
          //     <p>&emsp;environment: braintree.Environment.Sandbox,</p>
          //     <p>&emsp;merchantId: <span className='codeBlockString'>"useYourMerchantId"</span>,</p>
          //     <p>&emsp;publicKey: <span className='codeBlockString'>"useYourPublicKey"</span>,</p>
          //     <p>&emsp;privateKey: <span className='codeBlockString'>"useYourPrivateKey"</span></p>
          //     <p>&#125;);</p>
          //   </div>
          // </div>
          <>
            <br/>
            <h3>Include the Braintree client SDK</h3>

            <p>For this tutorial, we'll use the latest Braintree JavaScript SDK. Add the following code just above the closing &lt;/head&gt; tag in views/layout.hbs.</p>

            <div className='codeBlock'>
              <div className='codeBlockHeader'>
                HTML
              </div>
              <div className='codeBlockBody'>
                <p className='commentLine'>&lt;!-- includes the Braintree JS client SDK --></p>                
                <p><span className='propCode'>&lt;script src=</span><span className='codeBlockString'>"https://js.braintreegateway.com/web/dropin/1.22.1/js/dropin.min.js"</span> <span className='propCode'>>&lt;/script></span></p>                

                <p className='commentLine'>&lt;!-- includes jQuery --></p>
                <p><span className='propCode'>&lt;script src=</span><span className='codeBlockString'>"http://code.jquery.com/jquery-3.2.1.min.js"</span> <span className='propCode'>crossorigin</span>=<span className='codeBlockString'>"anonymous"> </span><span className='propCode'>&lt;/script></span></p>

              </div>
            </div>
            <br/>
            <p>Regardless of which method you use to load files, create a div element. This is where your PayPal button will appear.</p>



<div className='codeBlock'>
              <div className='codeBlockHeader'>
                HTML
              </div>
              <div className='codeBlockBody'>

                {/* here */}

<p>&lt;div id=<span className='codeBlockString'>"dropin-wrapper"</span>&gt;</p>
<p>&emsp;  &lt;div id=<span className='codeBlockString'>"checkout-message"</span>&gt;&lt;/div&gt;</p>
<p>&emsp;  &lt;div id=<span className='codeBlockString'>"dropin-container"</span>&gt;&lt;/div&gt;</p>
<p>&emsp;  &lt;button id=<span className='codeBlockString'>"submit-button"</span>&gt;Submit payment&lt;/button&gt;</p>
<p>&lt;/div&gt;</p>
<p>&lt;script&gt;</p>
<p>&emsp;  <span className='codeBlockVar'>var</span> button = <span className='codeBlockRequire'></span>document.querySelector(<span className='codeBlockString'>'#submit-button'</span>);</p>
<p></p>
<p>&emsp;  braintree.dropin.create(&#123;</p>
<p>&emsp;&emsp;    // Insert your tokenization key here</p>
<p>&emsp;&emsp;    authorization: <span className='codeBlockString'>'&lt;use_your_tokenization_key&gt;'</span>,</p>
<p>&emsp;&emsp;    container: <span className='codeBlockString'>'#dropin-container'</span></p>
<p>&emsp;  &#125;, <span className='codeBlockVar'>function</span> (<span className='codeBlockRequire'>createErr, instance</span>) &#123;</p>
<p>&emsp;&emsp;    button.addEventListener(<span className='codeBlockString'>'click'</span>, <span className='codeBlockVar'>function</span> () &#123;</p>
<p>&emsp;&emsp;&emsp;      instance.requestPaymentMethod(<span className='codeBlockVar'>function</span> (<span className='codeBlockRequire'>requestPaymentMethodErr, payload</span>) &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;        // When the user clicks on the 'Submit payment' button this code will send the</p>
<p>&emsp;&emsp;&emsp;&emsp;        // encrypted payment information in a variable called a payment method nonce</p>
<p>&emsp;&emsp;&emsp;&emsp;        $.ajax(&#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;         type: <span className='codeBlockString'>'POST'</span>,</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;         url: <span className='codeBlockString'>'/checkout'</span>,</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;         data: &#123;<span className='codeBlockString'>'paymentMethodNonce'</span>: payload.nonce&#125;</p>
<p>&emsp;&emsp;&emsp;&emsp;        &#125;).done(<span className='codeBlockVar'>function</span>(<span className='codeBlockRequire'>result</span>) &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;          // Tear down the Drop-in UI</p>
<p>&emsp;&emsp;&emsp;&emsp;          instance.teardown(function (teardownErr) &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            <span className='codeBlockVar'>if</span> (<span className='codeBlockRequire'>teardownErr</span>) &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;              <span className='codeBlockRequire'>console</span>.error(<span className='codeBlockString'>'Could not tear down Drop-in UI!'</span>);</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            &#125; <span className='codeBlockVar'>else</span> &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;              <span className='codeBlockRequire'>console</span>.info(<span className='codeBlockString'>'Drop-in UI has been torn down!'</span>);</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;              // Remove the 'Submit payment' button</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;              $(<span className='codeBlockString'>'#submit-button'</span>).remove();</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            &#125;</p>
<p>&emsp;&emsp;&emsp;&emsp;          &#125;);</p>
<p></p>
<p>&emsp;&emsp;&emsp;&emsp;          <span className='codeBlockVar'>if</span> (result.success) &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            $('#checkout-message').html(<span className='codeBlockString'>'&lt;h1&gt;Success&lt;/h1&gt;&lt;p&gt;Your Drop-in UI is working! </span></p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            <span className='codeBlockString'>Check your &lt;a href="https://sandbox.braintreegateway.com/login"&gt;sandbox Control Panel&lt;/a&gt; </span></p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            <span className='codeBlockString'>for your test transactions.&lt;/p&gt;&lt;p&gt;Refresh to try another transaction.&lt;/p&gt;'</span>);</p>
<p>&emsp;&emsp;&emsp;&emsp;          &#125; <span className='codeBlockVar'>else</span> &#123;</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            <span className='codeBlockRequire'>console</span>.log(result);</p>
<p>&emsp;&emsp;&emsp;&emsp;&emsp;            $(<span className='codeBlockString'>'#checkout-message'</span>).html(<span className='codeBlockString'>'&lt;h1&gt;Error&lt;/h1&gt;&lt;p&gt;Check your console.&lt;/p&gt;'</span>);</p>
<p>&emsp;&emsp;&emsp;&emsp;          &#125;</p>
<p>&emsp;&emsp;&emsp;        &#125;);</p>
<p>&emsp;&emsp;      &#125;);</p>
<p>&emsp;    &#125;);</p>
<p>  &#125;);</p>
<p>&lt;/script&gt;</p>


                

 {/* here */}
                
              </div>
            </div>

            <br/>

            <h3>PayPal</h3>
            <p> If you have PayPal configured in your gateway, include a PayPal configuration object in your create call to render a PayPal option. To use our Vault flow, include flow: 'vault' in your PayPal configuration:</p>

            <div className='codeBlock'>
              <div className='codeBlockHeader'>
                Callbacks
              </div>
              <div className='codeBlockBody'>

                <p>braintree.dropin.create(&#123;</p>
                <p>&emsp;  authorization: <span className='codeBlockString'>'CLIENT_AUTHORIZATION'</span>,</p>
                <p>&emsp;  container: <span className='codeBlockString'>'#dropin-container'</span>,</p>
                <p>&emsp;  paypal: &#123;</p>
                <p>&emsp;&emsp;    flow: <span className='codeBlockString'>'vault'</span></p>
                <p>&emsp;  &#125;</p>
                <p>&#125;, callback);</p>

              </div>
            </div>

<br/>
<br/>
            <p> To use Checkout with PayPal, include flow: 'checkout' as well as an amount and currency.</p>


            <div className='codeBlock'>
              <div className='codeBlockHeader'>
                Callbacks
              </div>
              <div className='codeBlockBody'>

                <p>braintree.dropin.create(&#123;</p>
                <p>&emsp;  authorization: <span className='codeBlockString'>'CLIENT_AUTHORIZATION'</span>,</p>
                <p>&emsp;  container: <span className='codeBlockString'>'#dropin-container'</span>,</p>
                <p>&emsp;  paypal: &#123;</p>
                <p>&emsp;&emsp;    flow: <span className='codeBlockString'>'checkout'</span>,</p>
                <p>&emsp;&emsp;    amount: <span className='codeBlockString'>'10.00'</span>,</p>
                <p>&emsp;&emsp;    currency: <span className='codeBlockString'>'USD'</span></p>
                <p>&emsp;  &#125;</p>
                <p>&#125;, callback);</p>

              </div>
            </div>


            


            
            <br/>
            <p>
              <a className='btn btn-primary' href="https://developers.braintreepayments.com/start/tutorial-drop-in-node" target="_blank" rel='noopener noreferrer' >Client side</a>
              <a className='btn btn-primary float-right' href="https://developers.braintreepayments.com/guides/drop-in/setup-and-integration/javascript/v3" target="_blank" rel='noopener noreferrer' >DropIn</a>              
            </p>
            
            {/* <p></p> */}

            

          </>
        )
    },
    PHP(language){
      return(
        <>
        <br/>
        <h3>Basic configuration</h3>

        <p>If you are using script tags to load files, be sure to at least include:</p>

        <div className='codeBlock'>
          <div className='codeBlockHeader'>
            HTML
          </div>
          <div className='codeBlockBody'>
            <p className='commentLine'>&lt;!-- Load PayPal's checkout.js Library. --></p>                
            <p><span className='propCode'>&lt;script src=</span><span className='codeBlockString'>"https://www.paypalobjects.com/api/checkout.js"</span> <span className='propCode'>data-version-4 log-level=</span><span className='codeBlockString'>"warn"</span><span className='propCode'>>&lt;/script></span></p>

            <p className='commentLine'>&lt;!-- Load the client component. --></p>
            <p><span className='propCode'>&lt;script src=</span><span className='codeBlockString'>"https://js.braintreegateway.com/web/3.62.0/js/client.min.js"</span><span className='propCode'>&lt;/script></span></p>

            <p className='commentLine'>&lt;!-- Load the PayPal Checkout component. --></p>
            <p><span className='propCode'>&lt;script src=</span><span className='codeBlockString'>"https://js.braintreegateway.com/web/3.62.0/js/paypal-checkout.min.js"</span><span className='propCode'>&lt;/script></span></p>

          </div>
        </div>

        <br/>
        <p>Regardless of which method you use to load files, create a div element. This is where your PayPal button will appear.</p>


        <div className='codeBlock'>
          <div className='codeBlockHeader'>
            HTML
          </div>
          <div className='codeBlockBody'>
            <p><span className='propCode'>&lt;div id=</span><span className='codeBlockString'>"paypal-button"</span><span className='propCode'>>&lt;/div></span></p>                
          </div>
        </div>

        <br/>
        <h4>Initialize components</h4>
        <p>Every integration requires a client. Once you've created one, you can pass it to the PayPal Checkout component to accept your payments.</p>

        
        
        
        <div className='codeBlock'>
          <div className='codeBlockHeader'>
            Callbacks
            {/* <br/>1&nbsp; 1  */}
            {/* <br/>1&thinsp; 1 */}
            {/* <br/>1&ensp; 2 */}
            {/* <br/>1&emsp; 4 */}
          </div>
          <div className='codeBlockBody'>
            {/*  */}

              <p className='commentLine'>// Create a client.</p>
              <p>braintree.client.create(&#123;</p>
              <p>&ensp;authorization: CLIENT_AUTHORIZATION</p>
              <p>}, <span className='codeBlockVar'>function</span> <span className='codeBlockString'>(</span><span className='codeBlockRequire'>clientErr, clientInstance</span><span className='codeBlockString'>)</span> &#123;	</p>

                <p className='commentLine'>&ensp;// Stop if there was a problem creating the client.</p>
                <p className='commentLine'>&ensp;// This could happen if there is a network error or if the authorization</p>
                <p className='commentLine'>&ensp;// is invalid.</p>
                <p><span className='codeBlockVar'>&ensp;if</span> (clientErr) &#123;	</p>
                  <p><span className='codeBlockRequire'>&ensp;&ensp;console</span>.error(<span className='codeBlockString'>'Error creating client:'</span>, clientErr);</p>
                  <p><span className='codeBlockVar'>&ensp;&ensp;return;</span></p>
                  <p>&ensp;}</p>
                <p></p>
                <p className='commentLine'> &ensp;// Create a PayPal Checkout component.</p>
                <p>&ensp;braintree.paypalCheckout.create(&#123;	</p>
                  <p>&ensp;&ensp;client: clientInstance</p>
                  <p>&ensp;}, <span className='codeBlockVar'>function</span> <span className='codeBlockString'>(</span><span className='codeBlockRequire'>paypalCheckoutErr, paypalCheckoutInstance</span><span className='codeBlockString'>)</span> &#123;	</p>

                    <p className='commentLine'>&ensp;// Stop if there was a problem creating PayPal Checkout.</p>
                    <p className='commentLine'>&ensp;// This could happen if there was a network error or if it's incorrectly</p>
                    <p className='commentLine'>&ensp;// configured.</p>
                    <p><span className='codeBlockVar'>&ensp;if</span> (paypalCheckoutErr) &#123;	</p>
                      <p><span className='codeBlockRequire'>&ensp;&ensp;console</span>.error('Error creating PayPal Checkout:', paypalCheckoutErr);</p>
                      <p><span className='codeBlockVar'>&ensp;&ensp;return;</span></p>
                      <p>&ensp;}</p>
                  <p></p>
                  <p className='commentLine'>&ensp;// Set up PayPal with the checkout.js library</p>
                  <p>&ensp;paypal.Button.render(&#123;	</p>
                    <p>&ensp;&ensp;env: <span className='codeBlockString'>'production'</span>, // or 'sandbox'</p>
                    <p>&ensp;&ensp;commit: <span className='codeBlockRequire'>true</span>, <span className='commentLine'>// This will add the transaction amount to the PayPal button</span></p>

                    <p>&ensp;&ensp;payment: <span className='codeBlockVar'>function</span> <span className='codeBlockString'>()</span> &#123;	</p>
                      <p><span className='codeBlockVar'>&ensp;&ensp;&ensp;return</span> paypalCheckoutInstance.createPayment(&#123;	</p>
                        {/* <p className='commentLine'>&ensp;&ensp;&ensp;&ensp;// Your PayPal options here. For available options, see</p>
                        <p className='commentLine'>&ensp;&ensp;&ensp;&ensp;// http://braintree.github.io/braintree-web/current/PayPalCheckout.html#createPayment</p> */}
                        <p>&ensp;&ensp;&ensp;&ensp;flow: <span className='codeBlockString'>'vault'</span>, <span className='commentLine'>// Required</span></p>
                        <p>&ensp;&ensp;&ensp;&ensp;amount: 10.00, <span className='commentLine'>// Required</span></p>
                        <p>&ensp;&ensp;&ensp;&ensp;currency: <span className='codeBlockString'>'USD'</span>, <span className='commentLine'>// Required</span></p>
                        <p>&ensp;&ensp;&ensp;&ensp;enableShippingAddress: <span className='codeBlockRequire'>true</span>,</p>
                        <p>&ensp;&ensp;&ensp;&ensp;shippingAddressEditable: <span className='codeBlockRequire'>false</span>,</p>
                        <p>&ensp;&ensp;&ensp;&ensp;shippingAddressOverride: &#123;</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;recipientName: <span className='codeBlockString'>'Scruff McGruff'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;line1: <span className='codeBlockString'>'1234 Main St.'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;line2: <span className='codeBlockString'>'Unit 1'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;city: <span className='codeBlockString'>'Chicago'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;countryCode: <span className='codeBlockString'>'US'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;postalCode: <span className='codeBlockString'>'60652'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;state: <span className='codeBlockString'>'IL'</span>,</p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;phone: <span className='codeBlockString'>'123.456.7890'</span></p>
                          <p>&ensp;&ensp;&ensp;&ensp;&ensp;}</p>                            
                        <p>&ensp;&ensp;&ensp;});</p>
                        <p>&ensp;&ensp;},</p>

                        <p>&ensp;onAuthorize: <span className='codeBlockVar'>function</span> <span className='codeBlockString'>(</span><span className='codeBlockRequire'>data, actions</span><span className='codeBlockString'>)</span> &#123;	</p>
                          <p>&ensp;&ensp;return paypalCheckoutInstance.tokenizePayment(data, function <span className='codeBlockString'>(</span><span className='codeBlockRequire'>err, payload</span><span className='codeBlockString'>)</span> &#123;	</p>
                            <p className='commentLine'>&ensp;&ensp;&ensp;// Submit `payload.nonce` to your server.</p>
                          <p>&ensp;&ensp;});</p>
                        <p>&ensp;},</p>
                    <p></p>
                    <p>&ensp;onCancel: <span className='codeBlockVar'>function</span> <span className='codeBlockString'>(</span><span className='codeBlockRequire'>data</span>) &#123;	</p>
                      <p>&ensp;&ensp;console.log(<span className='codeBlockString'>'checkout.js payment cancelled'</span>, <span className='codeBlockRequire'>JSON</span>.stringify(data, <span className='codeBlockRequire'>0</span>, <span className='codeBlockRequire'>2</span>));</p>
                      <p>&ensp;},</p>

                      <p>&ensp;onError: <span className='codeBlockVar'>function</span> <span className='codeBlockString'>(</span><span className='codeBlockRequire'>err</span>) &#123;	</p>
                        <p>&ensp;&ensp;<span className='codeBlockRequire'>console</span>.error(<span className='codeBlockString'>'checkout.js error'</span>, err);</p>
                        <p>&ensp;}</p>
                        <p>&ensp;&ensp;}, <span className='codeBlockString'>'#paypal-button'</span>).then(<span className='codeBlockVar'>function</span> <span className='codeBlockString'>()</span> &#123;	</p>
                          <p className='commentLine'>&ensp;&ensp;&ensp;// The PayPal button will be rendered in an html element with the id</p>
                          <p className='commentLine'>&ensp;&ensp;&ensp;// `paypal-button`. This function will be called when the PayPal button</p>
                          <p className='commentLine'>&ensp;&ensp;&ensp;// is set up and ready to be used.</p>
                          <p>&ensp;&ensp;});</p>

              <p>&ensp;});</p>

              <p>});</p>


            
            {/*  */}
          </div>
        </div>



        
        <br/>
        <p>
          <a className='btn btn-primary' href="https://developers.braintreepayments.com/guides/paypal/client-side/javascript/v3" target="_blank" rel='noopener noreferrer' >Client side</a>
          <a className='btn btn-primary float-right' href="https://developers.braintreepayments.com/guides/paypal/checkout-with-paypal/javascript/v3" target="_blank" rel='noopener noreferrer' >Checkout</a>
        </p>
        
        {/* <p></p> */}

        

      </>
    )
    },
  }


  // apagar depois
  renderInstallScript = function() {
      return(
      <div className='codeBlock'>
        <div className='codeBlockHeader'>
          {this.props.language}
        </div>
        <div className='codeBlockBody'>
          <p><span className='codeBlockVar'>var</span> braintree = <span className='codeBlockRequire'>require</span>(<span className='codeBlockString'>"braintree"</span>);</p>
          <p><span className='codeBlockVar'>var</span> gateway = braintree.connect(&#123;	</p>
          <p>&emsp;environment: braintree.Environment.Sandbox,</p>
          <p>&emsp;merchantId: <span className='codeBlockString'>"useYourMerchantId"</span>,</p>
          <p>&emsp;publicKey: <span className='codeBlockString'>"useYourPublicKey"</span>,</p>
          <p>&emsp;privateKey: <span className='codeBlockString'>"useYourPrivateKey"</span></p>
          <p>&#125;);</p>
        </div>
      </div>

    )
  }
  // apagar depois


  render() {
  // this.teste();
    console.log('this.props');
    console.log(this.props);
    // const {product, language} = this.props;
    return (
        <>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a className="nav-item nav-link active" id="nav-client-home-tab" data-toggle="tab" href="#nav-client-home" role="tab" aria-controls="nav-client-home" aria-selected="true">
                &emsp;
                <svg className="bi bi-info" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm8-7a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"></path>
                <path d="M10.93 8.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705z"></path>
                <circle cx="10" cy="6.5" r="1"></circle>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-client-install-tab" data-toggle="tab" href="#nav-client-install" role="tab" aria-controls="nav-client-install" aria-selected="false">
                &emsp;
                <svg className="bi bi-braces" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.114 10.063V9.9c1.005-.102 1.497-.615 1.497-1.6V6.503c0-1.094.39-1.538 1.354-1.538h.273V4h-.376C5.25 4 4.49 4.759 4.49 6.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538v-1.798c0-.984-.492-1.497-1.497-1.6zM15.886 9.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V9.332c-1.114 0-1.49-.362-1.49-1.456V6.352C15.51 4.759 14.75 4 13.138 4h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V8.3c0 .984.492 1.497 1.497 1.6z"></path>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-client-response-tab" data-toggle="tab" href="#nav-client-response" role="tab" aria-controls="nav-client-response" aria-selected="false">
                &emsp;
                <svg className="bi bi-reply-all" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.002 7.013a.144.144 0 00-.202.134V8.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876 1.02-.983 2.185-1.516 3.205-1.799a8.745 8.745 0 011.921-.306 7.47 7.47 0 01.798.008h.013l.005.001h.001L9.3 11.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.522.522 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028l-3.984-2.933zM8.8 12.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M12.868 6.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 11-.593-.805l4.012-2.954a.523.523 0 01.042-.028.147.147 0 000-.252.512.512 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clipRule="evenodd"></path>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-client-config-tab" data-toggle="tab" href="#nav-client-config" role="tab" aria-controls="nav-client-config" aria-selected="false">
              &emsp;
              <svg className="bi bi-gear" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.837 3.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 016.377 5.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.115l.094.319c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.115-2.693l.319-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159a1.873 1.873 0 01-2.693-1.115l-.094-.319zm-2.633-.283c.527-1.79 3.064-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.064 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.901-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M10 7.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM6.754 10a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" clipRule="evenodd"></path>
              </svg>
              &emsp;
              </a>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-client-home" role="tabpanel" aria-labelledby="nav-client-home-tab">
              {/* {this.props.language} / {this.props.product}  */}
              <img src={flowImg} width={700} alt=""/>
              <br/>
              <h5>Step 1</h5>
              <p>Your front-end requests a client token from your server and initializes the client SDK.</p>

              <h5>Step 2</h5>
              <p>Your server generates and sends a client token back to your client using the server SDK.</p>

              
              <h5>  Step 3</h5>
              <p>The customer submits payment information, the client SDK communicates that information to Braintree and returns a payment method nonce.</p>

              <h5>Step 4</h5>
              <p>Your front-end sends the payment method nonce to your server.</p>

              <h5>Step 5</h5>
              <p>Your server code receives the payment method nonce and then uses the server SDK to create a transaction.</p>

              <br/>
              
              <p><a className='btn btn-primary' href="https://developers.braintreepayments.com/start/overview" target="_blank" rel='noopener noreferrer' >See more</a></p>



              {/* C:\Users\jjunior\Google Drive\PayPal\Pegasus\frontend\src\assets\flow.png 
              */}

            </div>

            <div className="tab-pane fade" id="nav-client-install" role="tabpanel" aria-labelledby="nav-client-install-tab">
              {
                /*
                {this.renderInstallScript(this.props.language)}
                */
              }
              {
                /*
                this['renderInstallScript'].this.props.language(this.props.language)
                */
              }
              {this.renderInstallsScriptSwitch[this.props.language](this.props.language)}
            </div>

            <div className="tab-pane fade" id="nav-client-response" role="tabpanel" aria-labelledby="nav-client-response-tab">    
              <br/>
              Renders the PayPal button
            </div>

            <div className="tab-pane fade" id="nav-client-config" role="tabpanel" aria-labelledby="nav-client-config-tab">
              N/A              
            </div>
          </div>


       </>
    );
  }
}
 
export default ClientSide;
