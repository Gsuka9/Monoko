# MONOKO Food & Catering Website

A professional, mobile-first WhatsApp ordering website for MONOKO Food & Catering, a Tanzanian restaurant brand located in Tanga, Tanzania.

## Features

### 🎨 Design & UX
- **Mobile-first responsive design** optimized for low-bandwidth users
- **Elegant Swahili coastal theme** with deep red, gold, and warm brown color palette
- **Smooth animations** including entrance animations, scroll-triggered reveals, and parallax effects
- **Micro-interactions** on buttons and cards with hover effects and ripple animations
- **Sticky WhatsApp floating button** for instant ordering

### 🍛 Menu & Ordering
- **Complete categorized menu** featuring:
  - Main Dishes (Biryani, Pilau, Ugali & Fish)
  - Swahili Specials (Mishkaki, Chips Mayai)
  - Snacks & Savories (Vitumbua, Mandazi)
  - Fresh Juices & Drinks (Passion, Mango, Tamarind, Ginger Lemon)
- **Interactive shopping cart** with real-time updates
- **WhatsApp integration** - automatically generates structured English order messages
- **Catering services** section for events and special occasions

### ⚡ Performance & SEO
- **Optimized for speed** with lazy loading images and Intersection Observer
- **SEO optimized** with proper meta tags, structured content, and semantic HTML5
- **Lightweight vanilla JavaScript** - no heavy frameworks
- **Tailwind CSS** for efficient styling
- **Accessible design** following web standards

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No dependencies, lightweight
- **WhatsApp API** - Order integration

## Contact Information

### WhatsApp Numbers
- **Main**: +255 769 506 654
- **Alternative**: +255 620 731 283

### Phone
- **Main**: +255 769 506 654

### Address
- **Location**: Mkwakwani Street, Tanga City, Tanga, Tanzania

### Business Hours
- **Monday - Friday**: 8:00 AM - 10:00 PM
- **Saturday - Sunday**: 10:00 AM - 11:00 PM

## Key Features

### WhatsApp Ordering System
The website automatically generates structured English order messages when users click "Order Now". The message includes:
- Selected items with quantities and prices
- Total order amount
- Template for customer information
- Professional formatting with emojis

### Dual WhatsApp Numbers
- **Primary WhatsApp**: +255 769 506 654 (used for cart checkout)
- **Alternative WhatsApp**: +255 620 731 283 (backup contact option)

### Performance Optimizations
- **Lazy Loading**: Images load only when needed
- **Intersection Observer**: Efficient scroll-based animations
- **Debounced Events**: Optimized scroll handling
- **Minimal JavaScript**: Fast loading and execution
- **Optimized Images**: Uses CDN images with proper sizing

### Mobile Optimization
- **Touch-friendly interface** with appropriately sized buttons
- **Responsive navigation** with mobile menu
- **Optimized layouts** for small screens
- **Fast loading** for low-bandwidth connections

## File Structure

```
Monoko/
├── index.html          # Main website file
├── README.md          # This file
└── assets/            # Static assets (if needed)
```

## Getting Started

1. **Open the website**: Simply open `index.html` in a web browser
2. **No setup required**: Everything is self-contained in a single HTML file
3. **WhatsApp integration**: Both numbers are already configured

## Customization

### Updating WhatsApp Numbers
Replace the WhatsApp numbers in the HTML file:
- Main number: `+255769506654` (appears in cart checkout and primary contact)
- Alternative number: `+255620731283` (appears as backup contact option)

### Adding Menu Items
To add new menu items, follow the existing pattern:

```html
<div class="bg-white p-6 rounded-lg shadow hover-scale">
    <div class="flex justify-between items-center">
        <div>
            <h4 class="font-bold text-lg">Item Name</h4>
            <p class="text-gray-600 text-sm">Item description</p>
        </div>
        <div class="text-right">
            <span class="font-bold text-lg" style="color: var(--monoko-gold);">TSh Price</span>
            <button class="add-to-cart block mt-2 bg-red-800 text-white px-3 py-1 rounded text-sm hover:bg-red-700" data-item="Item Name" data-price="price">
                Add
            </button>
        </div>
    </div>
</div>
```

### Color Scheme
The color palette is defined in CSS variables:
- `--monoko-red`: #8B0000 (Deep red)
- `--monoko-gold`: #D4AF37 (Gold)
- `--monoko-brown`: #8B4513 (Warm brown)
- `--monoko-dark`: #2C1810 (Dark brown)

## Language

The website is currently configured for **English language** with:
- English menu items and descriptions
- English user interface text
- English WhatsApp order messages
- English navigation and contact information

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Progressive enhancement**: Works without JavaScript but with limited functionality

## SEO Features

- **Semantic HTML5** structure
- **Meta tags** for search engines
- **Open Graph** tags for social sharing
- **Structured content** for better indexing
- **Mobile-friendly** responsive design
- **Fast loading** for better search rankings

## Performance Metrics

- **First Contentful Paint**: Optimized for quick initial render
- **Largest Contentful Paint**: Lazy loading for faster perceived performance
- **Cumulative Layout Shift**: Minimal layout shifts with proper sizing
- **First Input Delay**: Lightweight JavaScript for responsive interactions

## License

This project is proprietary to MONOKO Food & Catering. All rights reserved.

---

**MONOKO Food & Catering** - Authentic African Cuisine
