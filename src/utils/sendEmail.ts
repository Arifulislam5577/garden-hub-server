import nodemailer from 'nodemailer'
import config from '../config'

interface IEmailData {
  resetToken: string
  email: string
  name: string
}

export async function sendEmail(data: IEmailData) {
  const { resetToken, email, name } = data

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.SMTP_EMAIL,
      pass: config.SMTP_PASSWORD
    }
  })

  const emailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GardenHub</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: 'Inter', Arial, sans-serif;
      background-color: #f8fafc;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        padding: 10px;
        text-align: center;
        font-size: 18px;
      "
    >
      <p>Your reset password token is ${resetToken}</p>
    </div>
  </body>
</html>
`

  const mailOptions = {
    from: 'mdarifulislamm370@gmail.com',
    to: email,
    subject: 'GardenHub Reset Password',
    text: `Hello ${name},\n\n`,
    html: emailTemplate
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, messageId: 'No sender message id found' }
  }
}
