import { z } from "zod";

// Shipping Information Schema
export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  street: z.string().min(3, "Street address must be at least 3 characters").max(150),
  city: z.string().min(2, "City is required").max(50),
  state: z.string().min(2, "State is required").max(50),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid US ZIP code format"),
  country: z.string().default("US"),
});

// Payment Information Schema
export const paymentSchema = z.object({
  cardHolder: z.string().min(2, "Cardholder name is required"),
  cardNumber: z.string().regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/, "Invalid credit card number"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiry date must be MM/YY format"),
  cvc: z.string().regex(/^\d{3,4}$/, "CVC must be 3 or 4 digits"),
});

// Booking Form Schema
export const bookingFormSchema = z.object({
  productId: z.string().min(1, "Service ID is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date format must be YYYY-MM-DD"),
  timeSlot: z.string().min(1, "Time slot selection is required"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

// User Auth Login / Register Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
