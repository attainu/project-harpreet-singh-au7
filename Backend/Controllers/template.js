import { createTokens } from "./jwt/jwt.js";

const tokens = createTokens();
const url = `http:localhost:3000/api/confirmation/${tokens}`;
const Form = (name) => {
  return `<!DOCTYPE html>
          <html style="margin:0 ; padding:0;">
  
          <head>
          <title> Promotion Form Submit Customer Enquiry </title>
          </head>
  
          <body style="margin:0 ; padding:0;">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div> Hello  ${name},
            <p> Please verify your email by clicking on below mentioned link. <div><a href="http:localhost:3000/api/confirmation/${tokens}">${url}</a>
             </p>
            
          </div>
            <br />
            <br />
  
          </body>
          </html>`;
};

export default Form;
