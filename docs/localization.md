# Languages and translated content

The language switcher supports English, Dutch, German, Swedish, and Japanese using next-intl. English is the authored source. Interface and current career translations live beside the localization feature in src/features/localization.

Selection persists in browser storage and is shareable through ?lang=nl (or en, de, sv, ja). Internal links preserve the selected language. Dates and numbers use the selected locale; names, game titles, and code retain their original spelling.

This implementation switches languages after hydration. The exported HTML and search metadata remain English; separate locale routes and multilingual SEO are not implemented.

## Sanity workflow

1. Write and publish content in English as usual.
2. In Studio, open Translations and create an entry with the exact English source, target language, and translated text.
3. Publish the translation and rebuild/redeploy the site.

Published Sanity translations override the bundled catalog. Matching normalizes whitespace but otherwise requires the same English text. When the source changes, an old translation no longer matches and the site falls back to English until a replacement is published. Avoid duplicate entries for the same source and language.

For rich-text articles, translations match individual text spans, preserving formatting marks and links. Code blocks remain unchanged. Blog articles show a notice when checked article copy still falls back to English.

No automatic translation service is connected, and no paid translation API is required. New content needs translated entries; publishing English alone does not generate four translations. Translation automation and review can be added later without changing the authored English source.
