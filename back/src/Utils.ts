export function generateId(max = 15){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let tempId = ''
    for (let index = 0; index < max; index++) {
        const i = Math.floor(Math.random() * characters.length)
        tempId += characters[i]
    }

    return tempId
}

export function generateOTP(){
    const chars = '0123456789'
    let otp = ''
    for (let index = 0; index < 6; index++) {

        const i = Math.floor(Math.random() * chars.length)
        otp += chars[i]
    }

    return otp
}


export function getEmailVerifyHtml(otp: string, email: string){
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            * {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                box-sizing: border-box;
                color: #210053b6;
            }
    
            
            section{
                margin: 4rem 0;
            }
            section>*{
                display: block;
                margin-left: auto;
                margin-right: auto;
                text-align: center;
            }
    
            section img {
                width: 80px;
                height: 80px;
            }
    
            section h2 {
                color: #D33396;
            }
    
            section h1 {
                font-size: xx-large;
            }
        </style>
    
    </head>
    
    <body>
        <section>
            <img src="https://cdn-icons-png.flaticon.com/512/873/873388.png" alt="email icon">
            <h2>Verify your email address</h2>
            <p>We have sent email to ${email} to confirm the validity of the email address. After receiving the email use the below OTP to verify your account.</p>
            <h1>${otp}</h1>
        </section>
    </body>
    
    </html>
    `
}