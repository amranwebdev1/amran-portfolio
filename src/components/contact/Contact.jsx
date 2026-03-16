import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import {WhileInViewText} from "@/components/common/Motion";
const Contact = ({contact}) => {
  return (
    <section className="py-24 relative">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[500px] h-[300px] bg-gradient-to-r from-[#1f87de] to-[#31d1e7] blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">

        {/* Title */}
        <WhileInViewText
          initial={{opacity:0,y:30}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
          className="text-center text-4xl md:text-5xl font-bold mb-16 text-gray-900 dark:text-gray-100"
        >
          Contact Me
        </WhileInViewText>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
        <ContactInfo contact={contact} />
          {/* Contact Form */}
        <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;