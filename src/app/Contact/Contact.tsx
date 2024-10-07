import { SendSharp } from "react-ionicons";
import emailjs from '@emailjs/browser';
import { useRef } from "react";

interface NavBarProps {
  setCurrentPage: (page: string) => void; 
}

export const Contact: React.FC<NavBarProps> = ({ setCurrentPage}) => {
  const form = useRef<HTMLFormElement | null>(null);
  

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm('service_2pqx0u1', 'template_my2xqif', form.current, 'kc3e4_a8EsRdyRu6D') // Updated to use userId
        .then(
          () => {
            setCurrentPage('about');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
  };

  return (
    <article className="contact active" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6751.161886455712!2d-7.942607406133407!3d32.21552074561304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf7bde5eb73b2f%3A0x76ccb4e830ba305d!2sSTARTGATE!5e0!3m2!1sen!2sma!4v1720262758250!5m2!1sen!2sma"
            width="400"
            height="300"
            loading="lazy"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <form method="POST" onSubmit={sendEmail} ref={form} className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="fullname"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />

            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>

          <button className="form-btn" type="submit"  data-form-btn>
            <SendSharp color={"#000"} height="30px" width="30px" />

            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
}
