"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SwiperCore from 'swiper';
import { register } from 'swiper/element/bundle';
import { Icon } from '@iconify/react';

register();

interface Testimonial {
    quote: string;
    name: string;
    image: string;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch('/testimonials.json')
            .then((response) => response.json())
            .then((data) => setTestimonials(data));
    }, []);

    return (

        <motion.section
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
            className="py-8 md:py-10"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Testimonials</h2>
            </div>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="mySwiper"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center border-2 border-black">
                            <Icon icon="mdi:format-quote-open" className="text-yellow-500" width={30} height={30} />
                            <p className="text-lg" style={{ height: '120px', overflow: 'auto' }}>
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center justify-center">
                                <div className="ml-4">
                                    <p className="text-white"><span>@</span><span>{testimonial.name}</span></p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.section>
    );
};

export default Testimonials;
