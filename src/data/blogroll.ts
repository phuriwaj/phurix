/**
 * Blogroll — 20 hand-picked sites the author reads.
 * Rendered inside the footer as a <details> collapse.
 * Cite as: DESIGN.md §4 (Layout — footer blogroll data).
 * TODO: author curates further post-build.
 */

export interface BlogrollEntry {
  /** Display name. */
  name: string;
  /** URL (external). */
  url: string;
  /** Optional one-line description. */
  blurb?: string;
}

export const blogroll: BlogrollEntry[] = [
  { name: 'Andy Matuschak', url: 'https://notes.andymatuschak.org', blurb: 'Evergreen notes. The canonical working-out-loud site.' },
  { name: 'Adrian Hon', url: 'https://adrianhon.substack.com', blurb: 'Games, narrative, design history.' },
  { name: 'Andrew Sullivan', url: 'https://andrewsullivan.substack.com', blurb: 'The Weekly Dish. Long-form essays and linkblog.' },
  { name: 'Austin Kleon', url: 'https://austinkleon.com', blurb: 'Steal like an artist. Newspaper-blackout poetry.' },
  { name: 'Craig Mod', url: 'https://www.craigmod.com', blurb: 'Books, essays, photo-essays. A walking library.' },
  { name: 'Derek Sivers', url: 'https://sive.rs', blurb: 'Personal database of short posts. Hell yeah or no.' },
  { name: 'Erika Hall', url: 'https://conversationaldesign.com', blurb: 'Conversational design; Just Enough Research.' },
  { name: 'Frank Chimero', url: 'https://frankchimero.com', blurb: "The Shape of Design; the web's grain." },
  { name: 'Gwern.net', url: 'https://www.gwern.net', blurb: 'Encyclopedic essays. The dark-mode standard.' },
  { name: 'Jason Kottke', url: 'https://kottke.org', blurb: 'Home of fine hypertext products since 1998.' },
  { name: 'Maggie Appleton', url: 'https://maggieappleton.com', blurb: 'Digital garden; invented the patterns genre.' },
  { name: 'Manuel Moreale', url: 'https://manuelmoreale.com', blurb: 'People and Blogs interview series.' },
  { name: 'Maria Popova', url: 'https://themarginalian.org', blurb: 'Culture, books, art.' },
  { name: 'Michael Caillou', url: 'https://michaelcaillou.com', blurb: 'Design and product writing.' },
  { name: 'Paul Graham', url: 'https://paulgraham.com', blurb: 'Essays since 1998. The ur-stream.' },
  { name: 'Quinn Tonkin', url: 'https://tonesandtones.com', blurb: 'Design, semiotics, being a generalist.' },
  { name: 'Robin Sloan', url: 'https://www.robinsloan.com', blurb: 'Lab notes from the author of Mr. Penumbra.' },
  { name: 'Simone Cicero', url: 'https://boundaryless.io', blurb: 'Platform thinking; communities of practice.' },
  { name: 'Stratechery', url: 'https://stratechery.com', blurb: 'Tech strategy newsletter; pays for itself.' },
  { name: 'Tom Critchlow', url: 'https://tomcritchlow.com', blurb: 'Move. Think. Create.' },
];
