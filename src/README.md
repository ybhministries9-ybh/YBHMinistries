# Yeshua Beth Hallel Ministries Website

A modern, responsive website for Yeshua Beth Hallel Ministries with a comprehensive admin panel for content management.

> 🚀 **New here?** Check out the [Quick Start Guide](./QUICKSTART.md) to get up and running in minutes!

## Features

### Public Website
- **Home Page**: Beautiful hero section with ministry introduction
- **About Section**: Mission, vision, and community information
- **Ministries**: Showcase of all ministry programs including Hallel Music School
- **Events & Videos**: YouTube video gallery of services and events
- **Photo Gallery**: Browse through event photos with modal view
- **Awards**: Display of awards and recognitions for Hallel Music School
- **Testimonies**: Carousel of community testimonies
- **Contact**: Contact information and message form
- **Fully Responsive**: Works on all devices
- **Accessible**: Built with accessibility in mind

### Admin Panel (at `/admin`)
- **Secure Login**: Authentication required for access
- **Video Management**: Add, edit, and delete YouTube videos
- **Gallery Management**: Manage event photos
- **Awards Management**: Add and update awards information
- **Testimony Management**: Manage community testimonies
- **Modern UI**: Beautiful gradient design with intuitive interface

## Getting Started

### First Time Setup

1. **Access the Admin Panel**
   - Scroll to the bottom of the main page and click "Admin Login"
   - Or navigate directly to `/admin`

2. **Create Your First Admin Account**
   - On the login page, click "First time setup"
   - Fill in the form with:
     - Your name
     - Email address (e.g., admin@ybhministries.org)
     - A secure password (minimum 6 characters)
   - Click "Create Admin Account"
   - Once created, you can login with these credentials

3. **Start Adding Content**
   - After logging in, you'll see the admin dashboard
   - Use the sidebar to navigate between different content sections
   - Click "Add" buttons to create new content

### Adding Content

#### Videos
1. Go to the Videos section in admin panel
2. Click "Add Video"
3. Enter:
   - Title of the video
   - Full YouTube URL (e.g., https://www.youtube.com/watch?v=...)
   - Description
   - Date
4. Click "Add Video"

#### Gallery Images
1. Go to the Gallery section
2. Click "Add Image"
3. Enter:
   - Title
   - Image URL (direct link to image)
   - Event Name
   - Date
4. Click "Add Image"

**Note**: For images, you'll need to host them somewhere (like Imgur, Google Photos, or your own server) and use the direct image URL.

#### Awards
1. Go to the Awards section
2. Click "Add Award"
3. Enter:
   - Title
   - Description
   - Year
   - Image URL (optional)
4. Click "Add Award"

#### Testimonies
1. Go to the Testimonies section
2. Click "Add Testimony"
3. Enter:
   - Person's Name
   - Testimony text
   - Date
   - Image URL (optional)
4. Click "Add Testimony"

## Technical Details

### Architecture
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Local Storage (static fallback data)
- **Routing**: React Router

### File Structure
```
/App.tsx                          - Main app component with routing
/components/
  ├── Header.tsx                  - Navigation header
  ├── Hero.tsx                    - Home page hero section
  ├── About.tsx                   - About section
  ├── Ministries.tsx              - Ministries showcase
  ├── Events.tsx                  - Video gallery
  ├── GalleryNew.tsx              - Photo and video gallery with tabbed interface
  ├── Awards.tsx                  - Awards section
  ├── Testimonies.tsx             - Testimonies carousel
  ├── Contact.tsx                 - Contact section
  ├── Footer.tsx                  - Footer
  └── admin/
      ├── AdminLogin.tsx          - Login page
      ├── AdminDashboard.tsx      - Dashboard layout
      ├── VideoManager.tsx        - Video CRUD
      ├── GalleryManager.tsx      - Gallery CRUD
      ├── AwardManager.tsx        - Awards CRUD
      └── TestimonyManager.tsx    - Testimonies CRUD
```

### Data Management

All data is stored locally using browser LocalStorage with static fallback data. The admin panel allows you to manage content which persists in your browser.

## Customization

### Colors
The site uses a purple/pink gradient theme. To change colors, update the Tailwind classes in the components:
- `from-purple-600 to-pink-600` - Main gradient
- `purple-900` - Dark text
- `purple-600` - Buttons and accents

### Content
All text content can be edited directly in the component files or through the admin panel for dynamic content (videos, gallery, awards, testimonies).

### Contact Information
Update contact details in `/components/Contact.tsx`:
- Email
- Phone
- Address
- Social media links

## Support

For issues or questions:
1. Verify you're logged in to the admin panel
2. Check browser console for any errors
3. Ensure all required fields are filled when adding content
4. Clear browser cache if data doesn't appear correctly

## New Features

### Dynamic Hero Images Management
The homepage hero slideshow is now powered by Vercel Postgres and Blob Storage:
- Upload images via Vercel Blob Storage
- Manage via admin panel at `/admin` → Hero Images
- Drag-and-drop to reorder
- Toggle visibility without deleting
- Separate desktop (16:9) and mobile (9:16) images
- See `HERO_IMAGES_SETUP.md` for setup instructions

## Security Notes

- Never share your admin credentials
- The admin panel requires authentication for all content management
- Database credentials stored securely in environment variables
- API endpoints use CORS protection

---

Built with ❤️ for Yeshua Beth Hallel Ministries
