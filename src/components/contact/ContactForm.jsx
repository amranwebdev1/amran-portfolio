"use client"
import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "motion/react";
import { createClient } from "@/lib/supabase/client";
import toast from 'react-hot-toast';

const ContactForm = () => {
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    Whatsapp: "",
    is_read: false,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // validate fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // insert into supabase
    const { data, error } = await supabase
      .from("messages") // আপনার table name
      .insert([formData]);

    if (error) {
      console.log("Supabase error:", error.message);
      toast.error("Something went wrong!");
    } else {
      console.log("Success:", data);
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        Whatsapp: "",
        is_read: false,
        message: "",
      });
      setErrors({});
      setLoading(false)
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-8 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-xl 
                 bg-gradient-to-br from-[#1f87de]/0 via-[#31d1e7]/10 to-[#24b6f9]/10 dark:from-[#1f87de]/10 dark:via-[#31d1e7]/10 dark:to-[#24b6f9]/10
                 shadow-lg"
    >
      {/* Name */}
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
        />
        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
        />
        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
      </div>

      {/* WhatsApp (optional) */}
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Your WhatsApp number (optional)"
          name="Whatsapp"
          value={formData.Whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <textarea
          rows="5"
          placeholder="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 text-gray-900 dark:text-gray-100 outline-none focus:border-[#1f87de]"
        ></textarea>
        {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white bg-gradient-to-r from-[#1f87de] to-[#31d1e7] hover:opacity-90 transition shadow-lg"
      >
        {
          loading ? (
          <>
            Sending message...
          </>
          ):<>
            Send Message
            <Send size={18} />
          </>
        }
      </button>
    </motion.form>
  );
};

export default ContactForm;