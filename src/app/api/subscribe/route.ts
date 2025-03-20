import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import dns from 'dns';
import { promisify } from 'util';
import { sendEmail } from '@/lib/email';

const resolveMx = promisify(dns.resolveMx);
// const ABSTRACT_API_KEY = process.env.ABSTRACT_API_KEY!;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, first_name, last_name } = body;

        // 1️⃣ Check if email is not empty
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 2️⃣ Check if email format is valid (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // 3️⃣ Check MX records (Mail Server Verification)
        try {
            const domain = email.split('@')[1];
            const mxRecords = await resolveMx(domain);
            if (!mxRecords || mxRecords.length === 0) {
                return NextResponse.json({ error: 'Invalid email domain (No MX records found)' }, { status: 400 });
            }
        } catch (error) {
            console.log(error);
            
            return NextResponse.json({ error: 'Invalid email domain (MX lookup failed)' }, { status: 400 });
        }

        // 4️⃣ Check if email already exists in Supabase
        const { data: existingUser, error: dbError } = await supabase
            .from('subscribers')
            .select('email')
            .eq('email', email)
            .single();

        if (existingUser) {
            return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
        }

        if (dbError && dbError.code !== 'PGRST116') {
            return NextResponse.json({ error: 'Database error while checking email' }, { status: 500 });
        }

        // 5️⃣ Check if the email is fully valid using Abstract API
        // const response = await fetch(
        //     `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`
        // );
        // const emailData = await response.json();
        // console.log(emailData);


        // if (emailData.deliverability !== 'DELIVERABLE') {
        //     return NextResponse.json({ error: 'Email is not deliverable' }, { status: 400 });
        // }

        // if (emailData.is_disposable_email.value) {
        //     return NextResponse.json({ error: 'Disposable email addresses are not allowed' }, { status: 400 });
        // }

        // ✅ If all checks pass, store the email in Supabase
        const { error } = await supabase
            .from('subscribers')
            .insert([{ email, first_name, last_name }]);

        if (error) {
            console.log(error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // ✅ Send Welcome Email
        await sendEmail(
            email,
            '🌍 Exciting News! NVIGO is Launching Soon! 🎉',
            `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
                <h1 style="color: #0A8ED9;">Dear ${first_name || 'there'},</h1>
                <p>Thank you for subscribing! We’re thrilled to have you on board as we gear up to launch <strong>NVIGO</strong> – your go-to platform for trusted resources, vendor connections, and a supportive global community designed just for international students like you.</p>
                <p>Stay tuned for exclusive updates, early access, and special features to make your journey abroad smoother than ever!</p>
                <p>Follow us for more updates & let’s navigate this journey together.</p>
                <p>Best,</p>
                <p><strong>The NVIGO Team 🚀✈️</strong></p>
        
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="margin: 10px 0;">Connect with us:</p>
                
                <!-- Social Media Links -->
                <p>
                    <a href="https://www.linkedin.com/company/nvigoio/" target="_blank" style="text-decoration: none; margin-right: 10px;">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="24" height="24">
                    </a>
                    <a href="https://www.instagram.com/nvigoio?igsh=MWNhcTluaGRtenFzZw==" target="_blank" style="text-decoration: none;">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24">
                    </a>
                </p>
            </div>
            `
        );


        return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 200 });

    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
