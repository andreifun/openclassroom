# Internationalization (i18n) Guide

This app uses a simple, lightweight i18n solution with minimal dependencies and maximum safety.

## How it works

1. **Context-based**: Uses React Context for language state management
2. **JSON translations**: All translations are stored in `/lib/i18n.tsx`
3. **Client-side only**: No build-time complications or routing changes
4. **Persistent**: Language preference is saved to localStorage
5. **Type-safe**: Full TypeScript support

## Usage

### Basic Translation

```tsx
import { useTranslation } from "@/lib/i18n";

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('upload.title')}</h1>;
}
```

### Language Switching

```tsx
import { useTranslation } from "@/lib/i18n";

function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  );
}
```

### Adding New Translations

1. Open `/lib/i18n.tsx`
2. Add your translation key to all language objects:

```tsx
const translations: Record<Language, Translations> = {
  en: {
    myPage: {
      title: "My Page Title",
      description: "My page description"
    }
  },
  es: {
    myPage: {
      title: "Mi Título de Página",
      description: "Mi descripción de página"
    }
  },
  // ... other languages
};
```

3. Use in components:

```tsx
<h1>{t('myPage.title')}</h1>
<p>{t('myPage.description')}</p>
```

### Adding New Languages

1. Add the language code to the `Language` type in `/lib/i18n.tsx`
2. Add translations object for the new language
3. Update the `LanguageSwitcher` component if needed

## Why This Approach?

✅ **Minimal risk**: No complex routing or build changes  
✅ **Simple**: Easy to understand and maintain  
✅ **Incremental**: Add translations gradually  
✅ **No breaking changes**: Existing code continues to work  
✅ **Type-safe**: Full TypeScript support  
✅ **Persistent**: User preferences are saved  

## Files Modified

- `/lib/i18n.tsx` - Main i18n logic and translations
- `/app/layout.tsx` - Added I18nProvider
- `/app/upload/page.tsx` - Example usage
- `/components/temolector.tsx` - Updated with translations
- `/components/language-switcher.tsx` - Language switcher component

## Next Steps

1. Add more translations as needed
2. Add more languages if required
3. Consider adding RTL support for Arabic/Hebrew if needed
4. Add translation management tools if the app grows significantly
