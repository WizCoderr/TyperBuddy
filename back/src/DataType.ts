export interface MailData {
    from: string,
    to: string,
    subject: string,
    html: string
}



export interface AccountData {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    mode: 'none'| 'google',
    roomId: string
}

export interface PendingAccountData {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    otp: string,
    token: string
}

export interface PendingResetPassword {
    accountId: string,
    email: string,
    token: string,
    expiry: number
}



