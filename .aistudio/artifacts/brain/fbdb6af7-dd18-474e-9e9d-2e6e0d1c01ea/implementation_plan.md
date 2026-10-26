# Implementation Plan - Login Button Design & Auth Modal Integration

## Completed Changes
1. **Login Button Design Update (`src/components/DetailWorkspace.tsx`)**:
   - Replaced rectangular button styling with the attached capsule/pill design (`rounded-full`, bright cyan `#00dfef`, black text `Login`, padding `px-4 py-1`).
   - Referenced local asset `/assets/aistudio/image_e97235d9.png`.

2. **Login Modal Integration (`src/components/DetailWorkspace.tsx`)**:
   - Imported `AuthModal` component into `DetailWorkspace`.
   - Wired `onClick` on the Login button to trigger `setIsAuthModalOpen(true)` in `login` mode.
   - Users can now sign in with email/password, switch between Login and Join, or authenticate via Apple/Google.
