/**
 * Centralized Theme Colors for Yeshua Beth Hallel Ministries
 * 
 * This file contains all the color constants used across the application.
 * Update colors here to maintain consistency across all pages.
 */

export const THEME_COLORS = {
  // Background Colors
  primaryBackground: '#000000',      // Pure Black - Main background
  secondaryBackground: '#2E2E2E',    // Dark Gray - Secondary sections
  
  // Accent Colors
  accentGold: '#FDB813',             // Golden Yellow - Accent color for underlines, highlights
  
  // Button Colors
  buttonDark: '#2E2E2E',             // Dark Gray - Button background
  
  // Gray Scale
  grayDark: '#333333',               // Dark Gray - Lines, borders
  grayMedium: '#666666',             // Medium Gray
  grayLight: '#999999',              // Light Gray
  
  // Card/Section Backgrounds
  cardDark: '#1a1a1a',               // Very dark card background
  cardMedium: '#2a2a2a',             // Medium dark card background
  
  // Border Colors
  borderGray: '#3a3a3a',             // Border color for cards/sections
  
  // Text Colors
  textWhite: '#ffffff',              // White text
  textGray: '#cccccc',               // Gray text
  textMuted: '#888888',              // Muted text
} as const;

// Export individual colors for easy import
export const {
  primaryBackground,
  secondaryBackground,
  accentGold,
  buttonDark,
  grayDark,
  grayMedium,
  grayLight,
  cardDark,
  cardMedium,
  borderGray,
  textWhite,
  textGray,
  textMuted,
} = THEME_COLORS;
