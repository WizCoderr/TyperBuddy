export function generateId(max = 10){
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


export function getEmailVerifyHtml(otp: string){
    return `
    <style>
        * {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            box-sizing: border-box;
            color: #210053b6;
        }

        section {
            width: 100%;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 1rem;
        }

        section img {
            width: 80px;
        }

        section h2 {
            color: #D33396;
        }

        section h1 {
            font-size: xx-large;
        }
    </style>
    <section>
        <img src="../public/email.png" alt="email">
        <h2>Verify your email address</h2>
        <p>We have sended you an OTP, don't share it with anyone. Type it on the site!</p>
        <h1>${otp}</h1>
    </section>`
}