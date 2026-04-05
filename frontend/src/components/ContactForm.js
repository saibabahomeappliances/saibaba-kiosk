import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name') || '';
        const phone = formData.get('phone') || '';
        const product = formData.get('product') || '';
        const message = formData.get('message') || '';

        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/enquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, phone, product, message })
            });

            if (res.ok) {
                setSubmitted(true);
                e.target.reset();
            } else {
                console.error('Failed to submit enquiry');
            }
        } catch (error) {
            console.error('Error submitting enquiry:', error);
        }
    };

    return (
        <section id="contact" className="py-20 bg-brand-blue text-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Contact Us
                </h2>
                <p className="text-gray-300 mb-12">
                    Have a question about a product? Fill out the form below or message us directly.
                </p>

                {submitted ? (
                    <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Enquiry Sent!</h3>
                        <p className="text-gray-300">We have received your message and will be in touch shortly.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="mt-6 text-brand-orange hover:text-white underline"
                        >
                            Send another message
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl text-left text-gray-900">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Interested In</label>
                                <select name="product" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange">
                                    <option value="">Select a Category</option>
                                    <option value="Refrigerator">Refrigerator</option>
                                    <option value="Washing Machine">Washing Machine</option>
                                    <option value="Air Conditioner">Air Conditioner</option>
                                    <option value="Television">Television</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea name="message" required rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-orange text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send Enquiry
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default ContactForm;
