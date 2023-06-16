import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { MailData } from './DataType'
dotenv.config()

const email = process.env.NODE_MAILER_EMAIL || ''
const password = process.env.NODE_MAILER_PASS || ''

console.log(email)
console.log(password)

// adding authentication to mailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

export async function sendMail(mailData: MailData) {
    let status = await transporter.sendMail(mailData)
    if(status.pending){
        return 'pending'
    }else if(status.accepted){
        return 'accepted'
    }else{
        return 'rejected'
    }
}