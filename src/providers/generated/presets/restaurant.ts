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
