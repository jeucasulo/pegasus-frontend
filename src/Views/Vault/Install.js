import React, { Component } from "react";
// import axios from 'axios';

import flowImg from '../../assets/Installflow.png';
// import 'https://js.braintreegateway.com/web/3.58.0/js/client.min.js';
// import 'https://www.paypalobjects.com/api/checkout.js';
// import 'https://js.braintreegateway.com/web/3.57.0/js/paypal-checkout.min.js';



class Install extends Component {
  
  renderInstallsScriptSwitch = {
    // Node(){alert('node')},
    Node(language){
      return(
        <>
          <div className='codeBlock'>
            <div className='codeBlockHeader'>
              {language}
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
          <br/>
          <p><a className='btn btn-primary' href="https://developers.braintreepayments.com/start/hello-server/node" target="_blank" rel='noopener noreferrer' >See more</a></p>
          </>
        )
    },
    PHP(language){
      return(
          <div className='codeBlock'>
            <div className='codeBlockHeader'>
              {language}
            </div>
            <div className='codeBlockBody'>
              <p><span className='codeBlockVarPhp'>$gateway</span> = <span className='codeBlockVar'>new</span> Braintree_Gateway([</p>
              <p>&emsp;<span className='codeBlockString'>'environment'</span> => <span className='codeBlockString'>'sandbox'</span>,</p>
              <p>&emsp;<span className='codeBlockString'>'merchantId'</span> => <span className='codeBlockString'>'use_your_merchant_id'</span>,</p>
              <p>&emsp;<span className='codeBlockString'>'publicKey'</span> => <span className='codeBlockString'>'use_your_public_key'</span>,</p>
              <p>&emsp;<span className='codeBlockString'>'privateKey'</span> => <span className='codeBlockString'>'use_your_private_key'</span></p>
              <p>]);</p>
            </div>
          </div>
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
              <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                &emsp;
                <svg className="bi bi-info" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 17a7 7 0 100-14 7 7 0 000 14zm8-7a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"></path>
                <path d="M10.93 8.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533l1.002-4.705z"></path>
                <circle cx="10" cy="6.5" r="1"></circle>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-install-tab" data-toggle="tab" href="#nav-install" role="tab" aria-controls="nav-install" aria-selected="false">
                &emsp;
                <svg className="bi bi-braces" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.114 10.063V9.9c1.005-.102 1.497-.615 1.497-1.6V6.503c0-1.094.39-1.538 1.354-1.538h.273V4h-.376C5.25 4 4.49 4.759 4.49 6.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538v-1.798c0-.984-.492-1.497-1.497-1.6zM15.886 9.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V9.332c-1.114 0-1.49-.362-1.49-1.456V6.352C15.51 4.759 14.75 4 13.138 4h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V8.3c0 .984.492 1.497 1.497 1.6z"></path>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-response-tab" data-toggle="tab" href="#nav-response" role="tab" aria-controls="nav-response" aria-selected="false">
                &emsp;
                <svg className="bi bi-reply-all" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.002 7.013a.144.144 0 00-.202.134V8.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876 1.02-.983 2.185-1.516 3.205-1.799a8.745 8.745 0 011.921-.306 7.47 7.47 0 01.798.008h.013l.005.001h.001L9.3 11.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.522.522 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028l-3.984-2.933zM8.8 12.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clipRule="evenodd"></path>
                  <path fillRule="evenodd" d="M12.868 6.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 11-.593-.805l4.012-2.954a.523.523 0 01.042-.028.147.147 0 000-.252.512.512 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clipRule="evenodd"></path>
                </svg>
                &emsp;
              </a>
              <a className="nav-item nav-link" id="nav-config-tab" data-toggle="tab" href="#nav-config" role="tab" aria-controls="nav-config" aria-selected="false">
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
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
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

            <div className="tab-pane fade" id="nav-install" role="tabpanel" aria-labelledby="nav-install-tab">
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

            <div className="tab-pane fade" id="nav-response" role="tabpanel" aria-labelledby="nav-response-tab">    
              {/* {JSON.stringify(this.props.response)} */}
              <textarea className="form-control textareaResponse" id="installTextAreaJsonResponse" cols="30" rows="10" ></textarea>
            </div>

            <div className="tab-pane fade" id="nav-config" role="tabpanel" aria-labelledby="nav-config-tab">
              N/A
            </div>
          </div>


       </>
    );
  }
}
 
export default Install;
