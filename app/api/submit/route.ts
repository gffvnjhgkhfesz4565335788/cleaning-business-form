import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const formToken = process.env.FORM_TOKEN;
    const apiBaseUrl = process.env.API_BASE_URL;
    const formId = process.env.FORM_ID;

    if (!formToken || !apiBaseUrl || !formId) {
      console.error('Missing required environment variables');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const backendEndpoint = `${apiBaseUrl}/api/public/forms/${formId}/submit`;

    const response = await fetch(backendEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: formToken,
        data: data,
        email: data.email, 
      }),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Submission successful' });
    } else {
      const errorData = await response.json();
      console.error('Backend submission failed:', errorData);
      return NextResponse.json({ error: 'Failed to submit data' }, { status: response.status });
    }
  } catch (error) {
    console.error('Error handling submission:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
