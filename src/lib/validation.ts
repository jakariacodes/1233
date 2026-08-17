import { z } from 'zod';

// Sanitize HTML - remove potentially dangerous tags/attributes
export const sanitizeHtml = (html: string): string => {
  if (!html) return '';
  
  // Remove script tags and their contents
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  
  // Remove data: URLs (can be used for XSS)
  sanitized = sanitized.replace(/data\s*:[^,]*,/gi, '');
  
  return sanitized;
};

// Sanitize plain text - escape HTML entities
export const escapeHtml = (text: string): string => {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] || char);
};

// Validate URL format - allows empty, full URLs, or URLs without protocol
export const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return true; // Empty is valid (optional field)
  const trimmed = url.trim();
  
  // If it starts with http/https, validate as full URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      new URL(trimmed);
      return true;
    } catch {
      return false;
    }
  }
  
  // Allow URLs without protocol (e.g., linkedin.com/in/user)
  // Basic pattern check for domain-like structure
  const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z0-9-]+)+/;
  return domainPattern.test(trimmed);
};

// Blog Post Validation Schema
export const blogPostSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().trim().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  excerpt: z.string().max(500, 'Excerpt must be less than 500 characters').optional(),
  content: z.string().max(100000, 'Content too long').optional(),
  featured_image: z.string().max(500, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid URL format').optional(),
  meta_title: z.string().max(60, 'Meta title should be under 60 characters').optional(),
  meta_description: z.string().max(160, 'Meta description should be under 160 characters').optional(),
  tags: z.array(z.string().max(50)).max(10, 'Maximum 10 tags allowed').optional(),
});

// Team Member Validation Schema
export const teamMemberSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  role: z.string().trim().min(1, 'Role is required').max(100, 'Role must be less than 100 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  image_url: z.string().max(500, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid image URL').optional(),
  linkedin_url: z.string().max(200, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid LinkedIn URL').optional(),
  twitter_url: z.string().max(200, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid Twitter URL').optional(),
  facebook_url: z.string().max(200, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid Facebook URL').optional(),
  portfolio_url: z.string().max(200, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid portfolio URL').optional(),
});

// Portfolio Validation Schema
export const portfolioSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  slug: z.string().trim().min(1, 'Slug is required').max(200, 'Slug must be less than 200 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  long_description: z.string().max(5000, 'Long description must be less than 5000 characters').optional(),
  category: z.string().trim().min(1, 'Category is required').max(100, 'Category must be less than 100 characters'),
  client_name: z.string().max(100, 'Client name must be less than 100 characters').optional(),
  project_url: z.string().max(500, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid project URL').optional(),
  featured_image: z.string().max(500, 'URL too long').refine((val) => !val || isValidUrl(val), 'Invalid image URL').optional(),
  technologies: z.array(z.string().max(50)).max(20, 'Maximum 20 technologies').optional(),
});

// Order Validation Schema
export const orderSchema = z.object({
  customer_name: z.string().trim().min(1, 'Customer name is required').max(100, 'Name must be less than 100 characters'),
  customer_email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  customer_phone: z.string().max(20, 'Phone must be less than 20 characters').optional(),
  service_type: z.string().trim().min(1, 'Service type is required').max(100, 'Service type must be less than 100 characters'),
  service_details: z.string().max(2000, 'Details must be less than 2000 characters').optional(),
  package_name: z.string().max(100, 'Package name must be less than 100 characters').optional(),
  amount: z.number().min(0, 'Amount must be positive').max(100000000, 'Amount too large'),
  payment_method: z.string().max(50, 'Payment method must be less than 50 characters').optional(),
  notes: z.string().max(2000, 'Notes must be less than 2000 characters').optional(),
  admin_notes: z.string().max(2000, 'Admin notes must be less than 2000 characters').optional(),
});

// Category Validation Schema
export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  slug: z.string().trim().min(1, 'Slug is required').max(100, 'Slug must be less than 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

// Helper function to validate and get errors
export const validateForm = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: Record<string, string> } => {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    if (err.path[0]) {
      errors[err.path[0] as string] = err.message;
    }
  });
  
  return { success: false, errors };
};
