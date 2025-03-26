import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Function to send an email
export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const response = await resend.emails.send({
            from: 'NviGo <no-reply@nvigo.io>',
            to: [to],
            subject,
            html,
        });
        
        return response;
    } catch (error) {
        console.error('Resend Error:', error);
        throw new Error('Failed to send email');
    }
};
