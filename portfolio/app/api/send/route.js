import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  console.log('=== EMAIL DEBUG START ===');
  
  try {
    // Check environment variables
    console.log('1. Environment Check:');
    console.log('   - API Key exists:', !!process.env.RESEND_API_KEY);
    console.log('   - API Key length:', process.env.RESEND_API_KEY?.length || 0);
    console.log('   - API Key starts with:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    // Get request body
    const body = await req.json();
    const { name, email, message } = body;
    
    console.log('2. Request Data:');
    console.log('   - Name:', name);
    console.log('   - Email:', email);
    console.log('   - Message length:', message?.length || 0);

    // Validate inputs
    if (!name || !email || !message) {
      console.log('3. VALIDATION FAILED - Missing fields');
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields',
        received: { name: !!name, email: !!email, message: !!message }
      }, { status: 400 });
    }

    console.log('3. Validation passed');

    // Try to send email
    console.log('4. Attempting to send email...');
    
    const emailData = {
      from: 'delivered@resend.dev',
      to: ['saksham_j@ar.iitr.ac.in'],
      subject: `TEST Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 10px; border-radius: 3px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">Sent at: ${new Date().toISOString()}</p>
        </div>
      `,
    };

    console.log('5. Email data prepared:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject
    });

    const result = await resend.emails.send(emailData);
    
    console.log('6. Resend API Response:');
    console.log('   - Success:', !!result);
    console.log('   - Result:', JSON.stringify(result, null, 2));

    console.log('=== EMAIL DEBUG END - SUCCESS ===');

    return NextResponse.json({ 
      success: true,
      message: 'Email sent successfully',
      emailId: result.data?.id || result.id,
      timestamp: new Date().toISOString(),
      debugInfo: {
        apiKeyPresent: !!process.env.RESEND_API_KEY,
        recipient: 'saksham_j@ar.iitr.ac.in',
        sender: 'delivered@resend.dev'
      }
    });

  } catch (error) {
    console.log('=== EMAIL DEBUG END - ERROR ===');
    console.error('7. DETAILED ERROR:');
    console.error('   - Error name:', error.name);
    console.error('   - Error message:', error.message);
    console.error('   - Error stack:', error.stack);
    console.error('   - Full error:', error);

    return NextResponse.json({
      success: false,
      error: 'Failed to send email',
      details: {
        name: error.name,
        message: error.message,
        timestamp: new Date().toISOString()
      }
    }, { status: 500 });
  }
}