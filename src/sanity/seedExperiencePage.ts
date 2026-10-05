import { sanityProject } from '../config/sanityConfig';
import { experiencePageInitialValue } from './schemas/experiencePage';
import { getCliClient } from 'sanity/cli';

const PORTFOLIO_DOCUMENT_ID = 'portfolio';
const DRAFT_DOCUMENT_ID = `drafts.${PORTFOLIO_DOCUMENT_ID}`;
const SYSTEM_FIELDS = ['_id', '_rev', '_createdAt', '_updatedAt'];
const client = getCliClient({ apiVersion: sanityProject.apiVersion }).withConfig({ useCdn: false });
const isApplyRequested = process.argv.includes('--apply');
const draft = await client.getDocument(DRAFT_DOCUMENT_ID);
const source = draft ?? (await client.getDocument(PORTFOLIO_DOCUMENT_ID));

if (!source) {
  throw new Error('The Portfolio singleton does not exist. Create it in Studio first.');
}

if (source.experiencePage) {
  console.info('Experience content already exists; nothing was changed.');
} else if (!isApplyRequested) {
  console.info(
    'Dry run: would add the default experience content to the Portfolio draft. Use --apply to save it, then review and publish in Studio.',
  );
} else {
  const fields = Object.fromEntries(
    Object.entries(source).filter(([key]) => !SYSTEM_FIELDS.includes(key)),
  );

  await client
    .transaction()
    .createIfNotExists({ ...fields, _id: DRAFT_DOCUMENT_ID, _type: 'portfolioSite' })
    .patch(DRAFT_DOCUMENT_ID, (patch) =>
      patch.setIfMissing({ experiencePage: experiencePageInitialValue }),
    )
    .commit();
  console.info(
    'Default experience content added to the Portfolio draft. Review and publish it in Studio. Existing content was not overwritten.',
  );
}
