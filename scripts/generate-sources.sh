#!/usr/bin/env bash
set -euo pipefail

SDK_SRC="$(cd "$(dirname "$0")/../src" && pwd)"

# ── Presets ──────────────────────────────────────────────────────────
cat > "$SDK_SRC/providers/generated/presets/restaurant.ts" << 'ENDOFFILE'
import type { SiteraBusinessCategory } from "../../../types/common.js";
export interface CategoryPreset {
  category: SiteraBusinessCategory;
  subcategory: string;
  industry: string;
  names: string[];
  taglines: string[];
  serviceCategories: string[];
  serviceNames: string[];
  productCategories: string[];
  productNames: string[];
  teamRoles: string[];
  facilities: string[];
  faqCategories: string[];
  galleryCategories: string[];
  bookingMode: string;
  locationTypes: string[];
  deliveryTypes: string[];
  paymentTypes: string[];
}
export const restaurantPreset: CategoryPreset = {
  category: "restaurant",
  subcategory: "Indonesian Cuisine",
  industry: "Food & Beverage",
  names: ["Warung Nusantara", "Rasa Kita", "Saung Bambu", "Dapur Ibu", "Rempah Rasa"],
  taglines: ["Cita rasa autentik Nusantara", "Masakan rumahan yang menggugah selera"],
  serviceCategories: ["Dine-in", "Catering", "Private Dining"],
  serviceNames: ["Prasmanan", "Paket Catering", "Private Room", "Cooking Class", "Delivery", "Takeaway", "Reservation", "Birthday Package"],
  productCategories: ["Makanan Utama", "Appetizer", "Minuman", "Dessert"],
  productNames: ["Nasi Goreng Spesial", "Rendang Padang", "Sate Ayam", "Soto Betawi", "Es Teh Manis", "Gado-Gado", "Bakso Urat", "Nasi Tumpeng", "Es Cendol", "Pisang Goreng", "Mie Goreng", "Ayam Bakar"],
  teamRoles: ["Head Chef", "Sous Chef", "Pastry Chef", "Restaurant Manager", "Waiter", "Barista"],
  facilities: ["Wi-Fi Gratis", "Parkir Luas", "Musholla", "AC", "Area Outdoor", "Area Anak", "Live Music", "Private Room"],
  faqCategories: ["Reservasi", "Menu", "Halal", "Delivery"],
  galleryCategories: ["Makanan", "Interior", "Suasana", "Event"],
  bookingMode: "reservation",
  locationTypes: ["store", "branch"],
  deliveryTypes: ["dine-in", "pickup", "local-delivery", "courier"],
  paymentTypes: ["cash", "qris", "bank-transfer", "e-wallet"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/cafe.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const cafePreset: CategoryPreset = {
  category: "cafe",
  subcategory: "Coffee Shop",
  industry: "Food & Beverage",
  names: ["Kopi Kita", "Kedai Senja", "Ruang Kopi", "Cerita Kopi", "Bean & Brew"],
  taglines: ["Tempat ngopi yang nyaman", "Kopi berkualitas, suasana hangat"],
  serviceCategories: ["Beverages", "Workspace", "Event"],
  serviceNames: ["Manual Brew", "Espresso Bar", "Coffee Workshop", "Meeting Room", "Co-Working Space", "Private Event", "Catering Kopi", "Latte Art Class"],
  productCategories: ["Kopi", "Non-Kopi", "Pastry", "Light Meal"],
  productNames: ["V60 Single Origin", "Cappuccino", "Matcha Latte", "Croissant", "Banana Bread", "Iced Americano", "Affogato", "Cold Brew", "Chai Latte", "Brownies", "Toast Avocado", "Smoothie Bowl"],
  teamRoles: ["Head Barista", "Barista", "Cafe Manager", "Pastry Chef", "Kitchen Staff", "Cashier"],
  facilities: ["Wi-Fi Cepat", "Stop Kontak", "AC", "Outdoor Seating", "Parkir Motor", "Board Games", "Buku Bacaan", "Pet Friendly"],
  faqCategories: ["Menu", "Wifi", "Reservasi", "Jam Operasional"],
  galleryCategories: ["Kopi", "Interior", "Makanan", "Suasana"],
  bookingMode: "reservation",
  locationTypes: ["store", "branch"],
  deliveryTypes: ["dine-in", "pickup", "local-delivery"],
  paymentTypes: ["cash", "qris", "e-wallet", "bank-transfer"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/professional-service.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const professionalServicePreset: CategoryPreset = {
  category: "professional-service",
  subcategory: "IT Consulting",
  industry: "Technology",
  names: ["Solusi Digital", "Karya Teknologi", "Mitra Inovasi", "TechPro Indonesia", "Digital Nusantara"],
  taglines: ["Solusi digital untuk bisnis modern", "Partner teknologi terpercaya Anda"],
  serviceCategories: ["Consulting", "Development", "Design", "Support"],
  serviceNames: ["Web Development", "Mobile App", "UI/UX Design", "IT Consulting", "Cloud Migration", "SEO Optimization", "Digital Marketing", "Maintenance Support"],
  productCategories: ["Paket Layanan", "Template", "Plugin"],
  productNames: ["Starter Package", "Business Package", "Enterprise Package", "Landing Page Template", "E-Commerce Template", "SEO Audit", "Brand Identity Kit", "Social Media Kit", "Custom Dashboard", "API Integration", "Security Audit", "Performance Optimization"],
  teamRoles: ["CEO", "CTO", "Project Manager", "Senior Developer", "UI/UX Designer", "Marketing Lead"],
  facilities: ["Meeting Room", "Video Conference", "Wi-Fi", "Parkir", "Pantry", "Lounge"],
  faqCategories: ["Layanan", "Harga", "Proses", "Support"],
  galleryCategories: ["Portfolio", "Kantor", "Tim", "Event"],
  bookingMode: "consultation",
  locationTypes: ["head-office", "branch"],
  deliveryTypes: ["digital-delivery"],
  paymentTypes: ["bank-transfer", "credit-card", "payment-link"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/beauty.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const beautyPreset: CategoryPreset = {
  category: "beauty",
  subcategory: "Salon & Spa",
  industry: "Beauty & Wellness",
  names: ["Cantik Alami", "Pesona Spa", "Glow Studio", "Kecantikan Bunda", "Ayu Beauty"],
  taglines: ["Kecantikan alami dari dalam", "Perawatan premium untuk Anda"],
  serviceCategories: ["Hair", "Facial", "Body", "Nail"],
  serviceNames: ["Haircut & Styling", "Hair Coloring", "Facial Treatment", "Body Massage", "Manicure Pedicure", "Eyelash Extension", "Hair Spa", "Bridal Package"],
  productCategories: ["Perawatan Rambut", "Perawatan Kulit", "Makeup"],
  productNames: ["Serum Wajah", "Hair Mask", "Body Lotion", "Lip Cream", "Sunscreen", "Cleanser", "Toner", "Moisturizer", "Eye Cream", "Hair Oil", "Nail Polish Set", "Makeup Kit"],
  teamRoles: ["Head Stylist", "Senior Therapist", "Beauty Consultant", "Nail Artist", "Makeup Artist", "Spa Therapist"],
  facilities: ["AC", "Parkir", "Musholla", "Wi-Fi", "Private Room", "Locker", "Shower", "Waiting Area"],
  faqCategories: ["Perawatan", "Booking", "Produk", "Harga"],
  galleryCategories: ["Before After", "Salon", "Treatment", "Produk"],
  bookingMode: "appointment",
  locationTypes: ["store", "branch"],
  deliveryTypes: ["pickup", "courier"],
  paymentTypes: ["cash", "qris", "bank-transfer", "e-wallet"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/education.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const educationPreset: CategoryPreset = {
  category: "education",
  subcategory: "Course Center",
  industry: "Education",
  names: ["Cerdas Bersama", "Akademi Pintar", "Rumah Belajar", "EduPro Indonesia", "Sekolah Kreatif"],
  taglines: ["Belajar tanpa batas", "Pendidikan berkualitas untuk semua"],
  serviceCategories: ["Program", "Workshop", "Private"],
  serviceNames: ["Kelas Bahasa Inggris", "Kelas Matematika", "Coding Bootcamp", "IELTS Preparation", "Les Privat", "Kelas Seni", "Public Speaking", "Leadership Training"],
  productCategories: ["Buku", "Modul", "Aksesoris"],
  productNames: ["Modul Bahasa", "Buku Latihan", "Flashcard Set", "Workbook", "E-Book Premium", "Study Planner", "Vocabulary Cards", "Grammar Guide", "Math Toolkit", "Science Kit", "Art Supply Set", "Digital Course"],
  teamRoles: ["Kepala Sekolah", "Guru Senior", "Instruktur", "Tutor", "Admin Akademik", "Counselor"],
  facilities: ["Ruang Kelas AC", "Lab Komputer", "Perpustakaan", "Musholla", "Kantin", "Parkir", "Wi-Fi", "Taman Bermain"],
  faqCategories: ["Pendaftaran", "Biaya", "Jadwal", "Sertifikat"],
  galleryCategories: ["Kelas", "Fasilitas", "Kegiatan", "Wisuda"],
  bookingMode: "class-registration",
  locationTypes: ["school", "branch"],
  deliveryTypes: ["digital-delivery"],
  paymentTypes: ["bank-transfer", "cash", "qris"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/property.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const propertyPreset: CategoryPreset = {
  category: "property",
  subcategory: "Real Estate",
  industry: "Property & Real Estate",
  names: ["Griya Nusantara", "Rumah Impian", "PropMax Indonesia", "Hunian Idaman", "Realty Prima"],
  taglines: ["Wujudkan rumah impian Anda", "Investasi properti terpercaya"],
  serviceCategories: ["Jual", "Sewa", "Konsultasi"],
  serviceNames: ["Jual Rumah", "Sewa Apartemen", "Konsultasi Properti", "Survey Lokasi", "KPR Assistance", "Interior Design", "Property Management", "Legal Consultation"],
  productCategories: ["Rumah", "Apartemen", "Ruko", "Tanah"],
  productNames: ["Rumah Type 36", "Rumah Type 45", "Rumah Type 70", "Apartemen Studio", "Apartemen 2BR", "Ruko 2 Lantai", "Tanah Kavling", "Villa Resort", "Townhouse", "Rumah Mewah", "Penthouse", "Kost Eksklusif"],
  teamRoles: ["Principal Agent", "Senior Agent", "Property Consultant", "Marketing Manager", "Legal Officer", "Finance Advisor"],
  facilities: ["Security 24 Jam", "Kolam Renang", "Taman", "Parkir", "CCTV", "Playground", "Clubhouse", "Jogging Track"],
  faqCategories: ["KPR", "Legalitas", "Fasilitas", "Lokasi"],
  galleryCategories: ["Eksterior", "Interior", "Fasilitas", "Lingkungan"],
  bookingMode: "property-visit",
  locationTypes: ["head-office", "branch"],
  deliveryTypes: ["digital-delivery"],
  paymentTypes: ["bank-transfer", "credit-card", "payment-link"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/healthcare.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const healthcarePreset: CategoryPreset = {
  category: "healthcare",
  subcategory: "Klinik Umum",
  industry: "Healthcare",
  names: ["Klinik Sehat Sentosa", "Medika Prima", "Klinik Kasih", "Sehat Bersama", "Klinik Pratama Husada"],
  taglines: ["Kesehatan Anda prioritas kami", "Pelayanan kesehatan profesional"],
  serviceCategories: ["Pemeriksaan", "Perawatan", "Laboratorium"],
  serviceNames: ["Konsultasi Umum", "Medical Check Up", "Vaksinasi", "Fisioterapi", "Tes Laboratorium", "Konsultasi Gizi", "Perawatan Gigi", "Rawat Jalan"],
  productCategories: ["Suplemen", "Alat Kesehatan"],
  productNames: ["Vitamin C", "Multivitamin", "Masker Medis", "Hand Sanitizer", "Tensimeter", "Termometer Digital", "Oximeter", "First Aid Kit", "Vitamin D3", "Probiotik", "Omega 3", "Kolagen"],
  teamRoles: ["Dokter Umum", "Dokter Spesialis", "Perawat Senior", "Apoteker", "Lab Analyst", "Admin Medis"],
  facilities: ["Ruang Tunggu AC", "Apotek", "Lab", "Parkir", "Musholla", "Wheelchair Access", "UGD", "Ambulance"],
  faqCategories: ["Jadwal Dokter", "Pendaftaran", "BPJS", "Layanan"],
  galleryCategories: ["Fasilitas", "Tim Medis", "Ruang Perawatan", "Laboratorium"],
  bookingMode: "appointment",
  locationTypes: ["clinic", "branch"],
  deliveryTypes: ["pickup"],
  paymentTypes: ["cash", "bank-transfer", "qris", "debit-card"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/automotive.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const automotivePreset: CategoryPreset = {
  category: "automotive",
  subcategory: "Bengkel & Service",
  industry: "Automotive",
  names: ["Bengkel Jaya Motor", "AutoCare Pro", "Maju Motor", "Bengkel Sentosa", "Tune Up Garage"],
  taglines: ["Perawatan kendaraan terpercaya", "Servis berkualitas, harga bersahabat"],
  serviceCategories: ["Service Rutin", "Perbaikan", "Modifikasi"],
  serviceNames: ["Ganti Oli", "Tune Up", "Balancing", "Spooring", "AC Service", "Body Repair", "Cat Mobil", "Detailing"],
  productCategories: ["Oli", "Spare Part", "Aksesoris"],
  productNames: ["Oli Mesin 5W-30", "Filter Oli", "Busi", "Kampas Rem", "Air Filter", "Coolant", "Shockbreaker", "Aki Mobil", "Wiper Blade", "Ban Mobil", "Lampu LED", "Cover Jok"],
  teamRoles: ["Kepala Bengkel", "Mekanik Senior", "Mekanik", "Service Advisor", "Spare Part Admin", "Kasir"],
  facilities: ["Ruang Tunggu AC", "Wi-Fi", "Musholla", "Kantin", "Parkir Luas", "Cuci Mobil", "CCTV", "Toilet"],
  faqCategories: ["Servis", "Harga", "Garansi", "Booking"],
  galleryCategories: ["Before After", "Bengkel", "Hasil Kerja", "Fasilitas"],
  bookingMode: "appointment",
  locationTypes: ["store", "branch"],
  deliveryTypes: ["pickup"],
  paymentTypes: ["cash", "qris", "bank-transfer", "debit-card"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/hospitality.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const hospitalityPreset: CategoryPreset = {
  category: "hospitality",
  subcategory: "Hotel & Resort",
  industry: "Hospitality",
  names: ["Hotel Nusantara", "Pesona Resort", "Bintang Hotel", "Villa Harmoni", "Grand Orchid Hotel"],
  taglines: ["Pengalaman menginap tak terlupakan", "Kenyamanan seperti di rumah"],
  serviceCategories: ["Kamar", "F&B", "Fasilitas"],
  serviceNames: ["Standard Room", "Deluxe Room", "Suite Room", "Meeting Room", "Spa & Massage", "Restaurant", "Laundry", "Airport Transfer"],
  productCategories: ["Room Package", "F&B Package", "Experience"],
  productNames: ["Paket Honeymoon", "Paket Staycation", "Family Package", "Meeting Package", "Breakfast Buffet", "Dinner Set", "Spa Package", "Adventure Tour", "Cultural Tour", "Yoga Class", "Cooking Class", "Diving Package"],
  teamRoles: ["General Manager", "Front Office Manager", "Concierge", "Housekeeper", "Chef", "Spa Therapist"],
  facilities: ["Kolam Renang", "Spa", "Gym", "Restaurant", "Meeting Room", "Parkir", "Wi-Fi", "Laundry"],
  faqCategories: ["Check-in", "Fasilitas", "Booking", "Pembatalan"],
  galleryCategories: ["Kamar", "Fasilitas", "Pemandangan", "Restoran"],
  bookingMode: "room-booking",
  locationTypes: ["head-office", "branch"],
  deliveryTypes: ["dine-in", "pickup"],
  paymentTypes: ["bank-transfer", "credit-card", "debit-card", "qris"],
};
ENDOFFILE

cat > "$SDK_SRC/providers/generated/presets/local-brand.ts" << 'ENDOFFILE'
import type { CategoryPreset } from "./restaurant.js";
export const localBrandPreset: CategoryPreset = {
  category: "local-brand",
  subcategory: "Fashion & Accessories",
  industry: "Retail",
  names: ["Nusantara Brand", "Batik Kita", "Kreasi Lokal", "Karya Anak Bangsa", "Rupa Rupa"],
  taglines: ["Produk lokal berkualitas dunia", "Bangga buatan Indonesia"],
  serviceCategories: ["Custom Order", "Wholesale", "Reseller"],
  serviceNames: ["Custom Design", "Bulk Order", "Reseller Program", "Gift Wrapping", "Personal Shopper", "Consultation", "Workshop", "Brand Collaboration"],
  productCategories: ["Fashion", "Aksesoris", "Home Decor", "Gift"],
  productNames: ["Batik Shirt", "Tote Bag", "Scarf Premium", "Earring Set", "Candle Aromatherapy", "Hampers Gift", "Pouch Kulit", "Sandal Handmade", "Mug Keramik", "Dompet Tenun", "Gelang Manik", "Tas Rajut"],
  teamRoles: ["Founder", "Creative Director", "Production Manager", "Marketing", "Customer Service", "Designer"],
  facilities: ["Showroom", "Workshop", "Parkir", "Wi-Fi", "Fitting Room", "Gift Wrapping Station"],
  faqCategories: ["Produk", "Pengiriman", "Reseller", "Custom Order"],
  galleryCategories: ["Produk", "Behind The Scene", "Event", "Customer"],
  bookingMode: "custom",
  locationTypes: ["store", "warehouse"],
  deliveryTypes: ["pickup", "courier", "shipping"],
  paymentTypes: ["bank-transfer", "qris", "e-wallet", "marketplace"],
};
ENDOFFILE

echo "Presets created successfully"
