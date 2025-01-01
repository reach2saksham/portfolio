// import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Saksham Jain <saksham_j@ar.iitr.ac.in>',
      to: ['saksham_j@ar.iitr.ac.in'],
      subject: 'Hello world',
      react: (
      <>
      <p>Email Body</p>
      </>
     ),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
