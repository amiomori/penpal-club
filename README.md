# Penpal Club — website with Supabase login

This bundle preserves the forest-themed website and adds a member page.

## Deploy to GitHub Pages
Upload these files and the `assets` folder into the **root** of `amiomori/penpal-club` on the `main` branch. Replace `index.html` and retain the existing `CNAME` file containing `thepenpal.club`. Do not upload the ZIP as a single file.

Files: `index.html`, `member.html`, `config.js`, `membership.js`, `member-page.js`, `assets/`.

## Supabase
`config.js` contains only the public Project URL and publishable key, not a secret key.
Supabase Authentication > URL Configuration:
- Site URL: `https://thepenpal.club`
- Redirect URL: `https://thepenpal.club/**`

The `profiles` table, RLS policies, and signup trigger must already exist from the earlier SQL setup. The site is not an operational letter exchange or address-handling service.

## Test
1. Visit https://thepenpal.club/member.html
2. Sign up with a test email and a password of at least 12 characters.
3. Follow the email confirmation link.
4. Log in and check the plant-based Penpal ID.
5. Test log out and password reset.

Supabase's default email service may have sending restrictions. Production email delivery may need custom SMTP configuration.


## Photo & video update
The homepage hero automatically crossfades between original photographs and two muted videos every 6.5 seconds. The photo journal rotates every 8 seconds and has manual arrows. Motion respects reduced-motion preferences. All files are under assets/. Upload the entire contents of this folder (including assets, HTML and JS) to the root of the GitHub repository, preserving CNAME. The public Supabase publishable key is in config.js; never place secret/service_role keys here.
