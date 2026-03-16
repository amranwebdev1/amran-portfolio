import {WhileInViewDiv} from "@/components/common/Motion"
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link"
const ContactInfo = ({contact}) => {
  return (
    <>
      <WhileInViewDiv
            initial={{opacity:0,x:-40}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:0.6}}
            className="space-y-8"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Feel free to contact me for collaboration, project discussion
              or any freelance opportunity. I'm always open to new ideas.
            </p>

            {/* Email */}
          {contact?.email && (
            <Link href={`mailto:${contact?.email}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-white shadow-lg">
                <Mail size={20}/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{contact?.email}</p>
              </div>
            </Link>)}

            {/* Phone */}
          {contact?.phone && (
            <Link href={`tel:${contact?.phone}`} className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-white shadow-lg">
                <Phone size={20}/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{contact?.phone}</p>
              </div>
            </Link>)}

            {/* Location */}
          {contact?.location && (
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#1f87de] to-[#31d1e7] text-white shadow-lg">
                <MapPin size={20}/>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{contact?.location}</p>
              </div>
            </div>)}
          </WhileInViewDiv>
    </>
  );
};

export default ContactInfo;