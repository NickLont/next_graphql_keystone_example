import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string) => `<div
    style={{
        border: '1px solid black';
        padding: '20px';
        font-family: sans-serif;
        font-size: 20px;
    }}
>
    <h2>Hello there!</h2>
    <p>${text}</p>
    <p>U+1F60D Nick</p>
</div>`;

export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  const info = (await transporter.sendMail({
    to,
    from: 'nlontorfos@hotmail.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`You password reset token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;
  // console.log('info: ', info);
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message sent! Preview it at: ${getTestMessageUrl(info)}`);
  }
};
