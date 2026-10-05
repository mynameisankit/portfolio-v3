# Editing the experience page

Open Sanity Studio → Portfolio → Experience page. Edit the page introduction, company headings, contributions, design narrative, captions, and career heading. Reorder contributions by dragging them. Career roles still use the existing Career journey fields on Portfolio.

New documents receive the current copy as initial values. An existing document will keep showing the repository defaults until its Experience page fields are filled. To populate those fields without overwriting an existing experience page, run a dry run:

```powershell
yarn exec sanity exec src/sanity/seedExperiencePage.ts --with-user-token
```

Then, to explicitly save the initial content to a draft:

```powershell
yarn exec sanity exec src/sanity/seedExperiencePage.ts --with-user-token -- --apply
```

This requires a signed-in Sanity CLI account with write access. It preserves existing Portfolio fields and creates or patches only the draft; review and publish it in Studio. The script has not been run as part of this implementation.

## Illustrations

Built-in illustration labels and the current experience copy use the shared five-language catalog in `src/localization/translations.json`. For new English copy entered in Sanity, add matching entries to that catalog or use the existing Sanity Translation documents (source text, locale, translation). An uploaded SVG contains its own baked-in text; it is not automatically translated by the page.

- **Built-in illustration:** choose a repository SVG template per contribution. Captions and template selection are editable in Sanity; template geometry and animation remain in code.
- **Custom SVG illustration:** upload a standalone SVG to replace the template. Embed CSS/vector animations inside the file; do not rely on JavaScript, external fonts, or other external resources. It is rendered as an image, never injected as inline SVG markup.
- **Reduced-motion illustration:** upload a static SVG, PNG, JPG, or WebP companion. If absent, reduced-motion visitors see the selected built-in template with animation disabled. Choosing `none` without a static companion leaves only the caption in reduced-motion mode.

The site is statically exported. Publishing in Sanity does not update a deployed page until the portfolio is rebuilt and redeployed. A Sanity webhook can trigger the hosting build workflow later; none is configured by these changes.
