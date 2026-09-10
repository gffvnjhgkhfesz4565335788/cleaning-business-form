import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const home: nextpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('submitted');
        setFormData({ name: '', email: '', address: '', phone: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>Cleaning Service Request</title>
      </Head>

      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Request Cleaning Detail</h1>
        {status === 'submitted' && <p style={{ color: 'green' }}>Thank you for your request! We will contact you soon.</p>}
        {status === 'error' && <p style={{ color: 'red' }}>There was an error with your submission. Please try again.</p>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email Address:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="address" style={{ display: 'block', marginBottom: '5px' }}>Service Address:</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={4} style={{ width: '100%', padding: '8px' }}></textarea>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '8px' }} />
          </div>

          <button type="submit" disabled={status === 'submitting'} style={{ padding: '10px 15px', cursor: 'pointer' }}>
            {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Home;
