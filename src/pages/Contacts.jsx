import { useRef, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { usePageMeta } from '../hooks/usePageMeta';

export function Contacts() {
  const formRef = useRef(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  usePageMeta({
    page: 'contacts',
    title: 'Nar Patisserie - Contacts',
    description: 'Nar Patisserie contacts: Baku location, phone number, working hours, delivery, Google map, and feedback form.'
  });

  const handleFeedbackSubmit = event => {
    event.preventDefault();

    if (!event.currentTarget.checkValidity()) {
      setMessage({ text: 'Please check the form fields.', type: 'error' });
      return;
    }

    setMessage({ text: 'Message sent. Thank you for your feedback!', type: 'success' });
    formRef.current?.reset();
  };

  return (
    <main>
      <PageHero eyebrow="Contacts" title="Address, Hours, and Feedback">
        We are available every day: we can confirm dessert availability, help with an order, and suggest the most convenient pickup or delivery option.
      </PageHero>

      <section className="section contact-page-section">
        <div className="container">
          <div className="contact-cards contact-cards-row">
            <article className="contact-card">
              <span>Address</span>
              <strong>Baku, Azerbaijan</strong>
              <p>A convenient pickup location. You can open the exact point on the map below.</p>
            </article>
            <article className="contact-card">
              <span>Phone</span>
              <strong>+994 50 123 45 67</strong>
              <p>We accept requests, confirm dessert availability, and agree on delivery time.</p>
            </article>
            <article className="contact-card">
              <span>Hours</span>
              <strong>Mon-Sun: 09:00 - 21:00</strong>
              <p>Delivery and pickup are available every day during working hours.</p>
            </article>
          </div>

          <div className="contact-window">
            <div className="contact-form-panel">
              <p className="eyebrow">Feedback</p>
              <h2>Message Us</h2>
              <p className="contact-window-text">Leave a message if you want to ask about dessert ingredients, item availability, delivery terms, or an order for a specific time.</p>

              <form className="feedback-form" ref={formRef} onSubmit={handleFeedbackSubmit} noValidate>
                <label>
                  <span>Name</span>
                  <input type="text" name="name" placeholder="Enter your name" required minLength="2" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" placeholder="example@mail.com" required />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows="5" placeholder="Your question or comment" required minLength="10" />
                </label>
                <button className="btn btn-primary" type="submit">Send</button>
                <p className={`form-message${message.type ? ` ${message.type}` : ''}`}>{message.text}</p>
              </form>
            </div>

            <div className="map-card contact-window-map" aria-label="Patisserie location map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5661.972435182331!2d49.85404141817858!3d40.37965738129314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d1b32e523f9%3A0xb8595a0a6206ad79!2sAZZA!5e0!3m2!1sru!2saz!4v1778158183530!5m2!1sru!2saz"
                title="Nar Patisserie location map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
