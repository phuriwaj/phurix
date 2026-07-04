# Personal Site References — Design × Writing × Technology × Anthropology

A field guide to 12 exemplary personal sites gathered to inform a redesign of a writer's personal publication. Sites span the dominant archetypes: stream/blog, digital garden, designer's writing room, personal-essay + working-out-loud, and magazine-style.

> **Note on CSS specificity.** WebFetch of rendered HTML returns markup, not computed styles, so most pixel-precise claims are anchored to well-documented public choices by these authors (RSS/colophon pages, prior design interviews, source code releases) or to visible markup conventions. Where a specific number is asserted it is a public/canonical figure, not an inference.

---

## 1. Robin Sloan — robinsloan.com

- **URL**: https://www.robinsloan.com
- **Author context**: Author of *Mr. Penumbra's 24-Hour Bookstore* and *Moonbound*; co-founder of The Atavist Magazine. Writes "lab" posts that braid fiction craft, software, and product. Treats his site as a low-noise front porch and his newsletter as a separate surface.
- **Archetype**: Designer's writing room (with a touch of working-out-loud).

### What it does well
1. **The home page is a directory, not a feed.** It organizes the site into named buckets — *Basics*, *Newsletter archives*, *Novels*, *Novellas*, *Special projects*, *Short stories*, *Notable essays*, *The waybacklist* — instead of dumping reverse-chronological posts. Each entry is a one-line description, not a teaser.
2. **A single accent glyph (★) does all the curation work.** A star marks Moonbound, the newest story, and a few "from the archive" picks. No badges, no "Editor's Pick," no "Popular" labels — just a star.
3. **A "Colophon" page that is the design statement.** The site publishes the font choices, hosting, and a privacy note inline; the colophon is one click from the footer.
4. **The "Waybacklist" is a moving anti-archive.** Robin rotates older posts back into visibility on a schedule, which prevents the home page from ossifying into a 2020 museum.

### What to steal
- **A directory-style home page** organized by *kind* of thing (essay, note, project, talk) rather than date. For a writer working across design + writing + tech + anthropology, this is more honest than a blog stream because the work is not uniform.
- **One-glyph curation.** A single character (★, ✦, ◐ — pick a vibe) marks "currently featured." Don't build a featured-posts system. Build a glyph.

### What to avoid
- **The home page is almost too quiet.** New visitors do not get a single piece of writing in front of them. There is no opening gambit, no "start here" link above the fold. For a writer without Sloan's name recognition this is a generosity problem disguised as restraint.

### Visual description
- Off-white background, near-black body text, very few images.
- The wordmark is set in a humanist sans-serif, generously letterspaced, in title case.
- Headings on essay pages are serif and large; body is sans-serif. Measure is comfortable (~60–70ch). Long pages are single-column with no sidebar.
- Whitespace is the dominant design element; it is the most "page-like" blog in this set.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Home / About / Moonbound — three links in the header, nothing else.
- **RSS**: `/feed.xml` linked from the colophon.
- **Subscribe**: A "Newsletter" section on the home page (but it is *not* the first thing). Subscribes via a Substack-like external form.
- **Archive**: Implicit — every essay is on the home page, in a "Directory." There is no separate `/archive`.
- **About**: 4–5 short paragraphs, written in Sloan's voice, not third-person bio.
- **Contact**: Email link in the colophon; no contact form.

---

## 2. Craig Mod — craigmod.com

- **URL**: https://www.craigmod.com
- **Author context**: Writer, photographer, book author (*Things Become Other Things*, *Kissa by Kissa*). Runs two paid newsletters (Roden, monthly; Ridgeline, weekly). The site doubles as a portfolio for his books and a front door to the newsletters.
- **Archetype**: Designer's writing room (with a working-out-loud newsletter attached).

### What it does well
1. **Two-tier information hierarchy that actually works.** A top tier for the books (large image left, description right, with two books side-by-side), a bottom tier for the essays. Books and writing get equal real estate because they are equal products.
2. **Subscriber count and product differentiation are stated openly.** The newsletter form says "Roden (monthly)" and "Ridgeline (weekly)" with separate CTAs. The form does not pretend to be a single "newsletter." This is a model for writers who run multiple publications.
3. **Photography and prose share a visual register.** Book covers, photo essays, and the headshot all use the same muted, paper-toned palette. The site reads as a single object, not a blog with a sidebar.
4. **"Whacked together by Craig Mod since 2002."** That footer line is the entire about-page substitute. It is honest, dated, and does not try to brand.

### What to steal
- **Two product surfaces, two subscribe CTAs, no fake "single newsletter"** for writers who publish at different cadences on different subjects.
- **The book grid is a thesis.** If you write books, the home page should foreground the book, not the latest post about the book. The books are the artifacts; the essays are the workshop.

### What to avoid
- **The two-column book grid is a tight squeeze on tablets.** The books are not always full-size at common breakpoints and there is no good fallback. Designers should not assume a desktop measure.

### Visual description
- Cream/off-white background; charcoal type; a small palette of warm grays.
- Typography: a confident sans for navigation, a humanist serif for body. Body measure ~62ch, line-height ~1.55.
- Book covers at roughly 240–280px wide, presented on the same warm off-white as the page, with thin neutral shadows.
- One accent color (a brick red / rust) used only for hover and active states — very sparingly.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: About / Books / Essays / Membership / Shop. Five items; clean and ungrouped.
- **RSS**: `/index.xml` linked from footer with the words "RSS subscription."
- **Subscribe**: Two forms inline (Roden and Ridgeline), each with their own copy and cadence.
- **Archive**: Reverse-chronological essay list with featured/popular/recent sub-sections.
- **About**: Identity and contact are on a single page — no separate `/bio`.
- **Contact**: Email + social (Bluesky, Instagram, Threads).

---

## 3. Maggie Appleton — maggieappleton.com

- **URL**: https://maggieappleton.com
- **Author context**: Designer, anthropologist, mediocre developer (her own self-description). Former GitHub Next. The site is a digital garden with essays, notes, and *patterns* — a category she invented.
- **Archetype**: Digital garden.

### What it does well
1. **Seven content types, named honestly.** Home, Garden, Essays, Notes, Patterns, Smidgeons, Talks, Podcasts, Library, Now, About. Each label is short and the function of each is obvious from the name. No "Blog / Articles / Posts" generic naming.
2. **"Notes" and "Patterns" are different objects.** Notes are short, dated observations. Patterns are reusable design primitives with their own template. The site is honest that not every idea is an essay and not every snippet is a note.
3. **"Smidgeons" is a public capture log.** Tiny observations with no expectation of elaboration. The site is willing to publish three-line posts. This is rare.
4. **The Garden is metaphor, not a section.** The "digital garden" framing is consistent across nav labels, copy, and the About page, and it appears in the visual language (small plant/leaf motifs in section dividers, hand-drawn accents in the meta).

### What to steal
- **Name your content types after their function** ("patterns," "smidgeons," "notes," "now"), not their shape ("short post," "long post"). For a writer at the design × writing × tech × anthropology intersection, the function distinction (e.g., "field notes" vs. "patterns" vs. "essays") is the actual taxonomy.
- **An "On this day" / "Now" page.** A page that states what you are currently working on, with no expectation of being evergreen.

### What to avoid
- **There is no main feed.** The home page is a curated index. Visitors who want a stream have to build one themselves. For a smaller audience, the home page *should* show the latest thing by default.

### Visual description
- Warm off-white background; the body type appears to be a humanist sans (system stack with display fallbacks).
- Hand-illustrated accents: small SVG leaves, marginal doodles, and circular "thumbnail" cards for the patterns.
- The library section uses book-cover thumbnails at consistent aspect ratios.
- WebP throughout, with `@2x` retina variants. The whole thing is built on Astro (the asset pipeline is visible in the class names).

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Eleven items. Yes, eleven. But they are arranged in two rows and the secondary nav is in the footer.
- **RSS**: `/rss.xml` linked from footer.
- **Subscribe**: Implicit — the RSS link *is* the subscription model.
- **Archive**: Each content type has its own archive page; dates are relative ("9 months ago," "over 1 year ago"), not absolute. This is a deliberate choice to de-emphasize recency.
- **About**: A single short page with a photo, current role, and links.
- **Contact**: Social links only (Bluesky, GitHub, LinkedIn, Dribbble, Twitter, Mastodon). No email.

---

## 4. Andy Matuschak — notes.andymatuschak.org

- **URL**: https://notes.andymatuschak.org
- **Author context**: Researcher working on tools for thought. His public notes site is the canonical example of a *working with the garage door open* digital garden. The site has influenced the design of basically every "evergreen notes" tool that followed.
- **Archetype**: Digital garden (the canonical one).

### What it does well
1. **Permanent links to ideas, not to posts.** Every page is a *note* with a stable ID (URLs include opaque hashes). The note is the unit, not the post.
2. **Bidirectional links rendered inline.** Bracketed references like `[[some other note]]` become real anchors; the destination page lists the inbound link in a "Linked References" panel. This makes the network visible *inside* the reading experience.
3. **Working-out-loud prose.** Notes are explicitly working drafts. The site states this in an "About these notes" page and the copy reinforces it. There is no pretense of polish.
4. **Window-into-Open mode.** When you open a note, the previously-open note moves to a side pane, so you always have two notes on screen. The interface is a small IDE for reading, not a blog reader.

### What to steal
- **The "About this thing" honesty page** that names the limitations and the half-baked nature of the content. For a working writer, an explicit "these are not finished" page is more respectful of the reader than a polished facade.
- **Inline link preview, done as a side pane.** A small reader-side affordance that reveals the context of a link without sending the reader away. For a knowledge-worker site, this is a stronger move than footnotes.

### What to avoid
- **The site is nearly unreadable to outsiders.** It assumes the reader knows what a digital garden is. There is no "Start here." If your audience is not yet primed for the format, this is a barrier, not a feature.

### Visual description
- Default to a near-white background; dark, slightly off-black text.
- A single body font, set at a comfortable reading size (~17–18px), with a wide measure (~70ch).
- Generous line-height (~1.65). The site is visually almost a long-form essay reader.
- The "Linked References" pane is the only major visual intervention; it docks on the right and uses a thinner weight to recede.
- Color is used minimally — one accent for active links, one muted color for references. No image, no logo.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: None in the traditional sense. A search affordance in the upper-left, an "About these notes" link, a "Home" link.
- **RSS**: None. This is the site that argues against an RSS feed in its About page.
- **Subscribe**: None. The site is read in-place.
- **Archive**: None in the blog sense; the index is search + a graph view.
- **About**: A clear, multi-section "About these notes" page that explains the format, the limitations, and the tools.
- **Contact**: Email + Twitter, on the About page.

---

## 5. Gwern.net — gwern.net

- **URL**: https://www.gwern.net
- **Author context**: Anonymous long-form researcher. The site is encyclopedic: essays on AI, statistics, anime, fiction, with deep footnotes, em-dashes, and a famous dark mode.
- **Archetype**: Digital garden (encyclopedic variant).

### What it does well
1. **A floating reader toolbar** in the lower-right corner (or upper-right on mobile) that toggles dark mode, reader mode, popups, search, and a help overlay. The toolbar is *always* present and is unobtrusive.
2. **Inline annotations that don't interrupt the prose.** Footnotes are numbered; clicking a number reveals the footnote in-place. A second click closes it. The reading flow is preserved.
3. **New-content indicators that do not shout.** A small black-star icon marks recently added content. A "link-modified-recently" class marks edited items. The reader can scan for change without being marketed at.
4. **Multi-column layout for the index.** The home page presents ~30+ topic sections in alphabetical columns. Each section is a stack of links with sub-items indented. It reads like an academic table of contents.

### What to steal
- **The "new" and "updated" indicators should be one pixel.** A small filled glyph (a star, a dot, a circle) is the entire change-marking system. No "NEW!" badges.
- **The "Reader mode" toggle.** A button that strips chrome and gives the reader a clean column. It is the single most reader-friendly affordance in this set.

### What to avoid
- **The information density is a wall.** For a writer whose audience has not self-selected for deep-research reading, this density is hostile. Use the principles (indicators, inline footnotes) without the volume.

### Visual description
- Light mode default; dark mode is a real, designed alternative, not a CSS flip.
- Body text is a serif (a generic stack leaning toward something like Charter / Iowan). Footnotes are a smaller size of the same family, with a tinted background.
- The page measure is moderate (~62–68ch). Color is used to mark *category* and *state* (new, modified) rather than decoration.
- The floating toolbar is small, mono-spaced iconography, lower-right.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: An abstract block at the top of the home page lists the structure. Per-page, a sidebar / top bar offers the major sections.
- **RSS**: Yes, multiple per section (per-blog and per-doc feeds).
- **Subscribe**: Substack newsletter link in the abstract.
- **Archive**: Newest / blog / doc / newsletter archive pages, plus per-section indexes.
- **About**: A multi-section "About" plus a separate "Design" page that documents the site's design choices.
- **Contact**: Email, PGP key, and an explicit warning about unsolicited pitches.

---

## 6. Paul Graham — paulgraham.com

- **URL**: https://www.paulgraham.com
- **Author context**: Founder of Y Combinator; essayist on startups, work, taste, and Lisp. The site is one of the most cited "writer sites" of the last 25 years, and the design has barely changed since the late 1990s.
- **Archetype**: Stream/blog (the ur-example).

### What it does well
1. **The page is the unit, the index is the archive.** Every essay has its own page with a permanent URL. The home page is a reverse-chronological list of titles, with a "what to read first" link for new readers.
2. **Pixel-precise restraint.** Small bitmap GIFs for the logo and the bullet markers; otherwise, plain HTML, default typography, no images in the body. The site has *no* ornament and is better for it.
3. **A reader-friendly on-page table of contents for long essays.** Long essays get a numbered "Contents" block at the top; the items are anchors.
4. **A footer of three things only**: copyright, "Great Hackers" / "Hackers and Painters" / "ANSI Common Lisp" links (book promos), and the essay index. No social, no newsletter, no contact form.

### What to steal
- **A two-or-three-link "if you only read three things" block** at the top of the home page. Curated by the author, not by an algorithm. The point is to make a *recommendation* to a stranger.
- **Anchor-link table of contents at the top of long essays.** It is a 1998 pattern and it still works because it gives the reader a way to choose their own depth.

### What to avoid
- **The design is on a fixed grid that does not adapt.** The text gets a fixed pixel measure (~480px) regardless of viewport. On a 4K monitor the page is a tiny column of text floating in a white field. Modern readers expect type to either grow with the viewport (fluid type) or fill the available space.

### Visual description
- Plain off-white background; near-black text; default browser sans-serif (historically Verdana at 13–15px, with a serif for body in some essay sets).
- A tiny bel-logo (a black square with a white "L") as the only ornament.
- No images, no banners, no hero. The site is structurally a list of links.
- Spacing is achieved with 1x1 transparent GIF spacers — an old-school technique that has the virtue of being unchanged since 1999.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: One link, "Home," plus the page name as title. No header menu.
- **RSS**: `http://www.aaronsw.com/2002/feeds/pgpes.txt` (the Aaron Swartz–era feed) — a footnote of the early web.
- **Subscribe**: RSS only.
- **Archive**: `articles.html` is the only archive — a single alphabetical list of titles.
- **About**: An FAQ page with bio, contact, and reader questions. Unstyled.
- **Contact**: Email, in the FAQ.

---

## 7. Stratechery — stratechery.com

- **URL**: https://stratechery.com
- **Author context**: Ben Thompson writes Stratechery, the defining newsletter on tech strategy. The site is a publication with a paywall, a podcast, a forum, and an interview series.
- **Archetype**: Stream/blog (publication-grade).

### What it does well
1. **Two parallel product surfaces, clearly labeled.** Free posts and "Stratechery Plus" posts are visually identical in the index but tagged. A non-subscriber sees the same home page; the only difference is the body of the post. This is the cleanest paywall implementation in this set.
2. **A persistent left/right rail for podcast and "concepts."** The Concepts page maps a glossary (aggregation theory, super-platforms, etc.) that anchors the writing. The site is not just a stream; it is a *referenced* stream.
3. **A weekly "Update" format.** Short, scannable items above the long essays. The Update gives the reader a low-cost entry point; the essay is the high-cost one.
4. **A member forum that is treated as a product.** Stratechery Plus includes a forum, mentioned in the nav, and the forum is where most of the community discussion happens. The site is honest that the subscription is for *the conversation*, not just the posts.

### What to steal
- **A "Concepts" or "Glossary" page** that maps the canonical terms a writer uses. For a writer at design × writing × tech × anthropology, a glossary of the recurring concepts (e.g., "affordance," "vibe shift," "second-order effect") makes the body of work navigable.
- **A short-form + long-form split**, with both on the home page and clearly labeled by length. The "Update" format is one of the cleanest short-form-with-long-form designs in publishing.

### What to avoid
- **The site is heavily optimized for subscribers.** Free readers see the same home page but get value-extracted aggressively. For a writer who is not selling subscriptions, the design pressure of a paywall is not a useful reference.

### Visual description
- Light cream background, near-black text, an orange-ish accent (used in the Plus badge, hover states, and the logo).
- A serif body face with a humanist sans for navigation. Measure is comfortable (~62–68ch).
- Article cards: title + date + author, stacked in reverse-chronological order. Excerpts are 2–3 lines.
- The "Latest Podcast" and "Stratechery Plus Update" sections are visually distinct cards on the home page, with the same typographic system.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Two nav blocks — "By Ben Thompson" (About, Email/RSS, @benthompson) and "Explore" (Concepts, Companies, Topics, Updates, Interviews, Year in Review, All Articles).
- **RSS**: Per-tag and per-author feeds. The "Email/RSS" link in the nav opens a page with options.
- **Subscribe**: Subscribe CTA in the Plus block, plus a Subscribe button in the nav. Member forum access requires login.
- **Archive**: "All Articles" page; "Companies" and "Topics" are tag-style indexes.
- **About**: One short page.
- **Contact**: Email in the nav, Twitter handle.

---

## 8. Kottke.org — kottke.org

- **URL**: https://kottke.org
- **Author context**: Jason Kottke, one of the original bloggers ("home of fine hypertext products since 1998"). The site is a linkblog with essays, redesigned multiple times but recognizable.
- **Archetype**: Stream/blog (linkblog variant).

### What it does well
1. **A single, fixed top nav** that doesn't move as you scroll. The logo (the multi-color circles) anchors the brand; the nav is Home / Membership / Newsletter / Goods / Archive + Tags / About / Contact.
2. **A chronological stream with timestamps and tags.** Each post: timestamp in small caps, author byline, title, excerpt, optional thumbnail, tags, and reply counts. The visual rhythm is the entire design.
3. **An "Active Threads" sidebar** that surfaces ongoing discussion. The site is honest that it is conversation-driven, not monologue-driven.
4. **A blogroll ("KDO Rolodex") in the footer.** A list of other blogs. The site is a node in a network, not a destination.

### What to steal
- **A blogroll.** A footer list of 20–30 other sites the author reads. For a writer at design × writing × tech × anthropology, a blogroll is a *positioning* move — it tells the reader who the writer is adjacent to.
- **Timestamps in small caps with a consistent format** ("posted Jul 2 @ 03:25 PM"). The format is *the* metadata system. No badges, no "5 min read," no category tags as a typographic system.

### What to avoid
- **The reply-count and favorite-count UI clutter** (👍 N, reply N) is a turn-off for some readers. Comments are a feature, not a metric; the site would be quieter if the counts were de-emphasized.

### Visual description
- Light background (off-white), dark gray body text. Dark mode is a real, designed alternative.
- Body type is a serif, set at a comfortable reading size. Navigation is sans-serif. Post titles are sans-serif and bold.
- Post layout: timestamp + author above, title, optional thumbnail (left-aligned, ~120–180px), excerpt, tags, counts.
- The header is a fixed bar with the iconic multi-color circle logo on the left and nav on the right.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Fixed top bar, seven items.
- **RSS**: Yes, plus a newsletter, plus Bluesky / Mastodon links.
- **Subscribe**: Newsletter and membership (the site is paid).
- **Archive**: Tag-based archive plus full chronological index. The "Archive + Tags" nav item does both.
- **About**: One page, written in Kottke's voice.
- **Contact**: Contact form, plus email.

---

## 9. Frank Chimero — frankchimero.com

- **URL**: https://frankchimero.com
- **Author context**: Designer, illustrator, author of *The Shape of Design*. The site is a portfolio-plus-blog. Famous for "Everything Easy Is Hard Again," "The Web's Grain," and a long-running essay practice.
- **Archetype**: Designer's writing room.

### What it does well
1. **The home page is a layered identity page**, not a feed. Sections: Identity → Information → Projects → Writing → Archive. Each section is a small stack of items, not a list. The page reads top-to-bottom as a story about who Frank is.
2. **Three thumbnail cards in "Information."** Profile, Studio Frank, Contact. The site knows that the "about" page is more than one page, and it surfaces three distinct contact surfaces at the top.
3. **Six featured essays with thumbnails.** The Writing section shows the six most-representative essays, not the six most recent. This is a curation choice that mirrors the homepage-as-portfolio design.
4. **External links marked with a ↗ symbol.** The ↗ glyph makes it instantly obvious which links leave the site. The site is honest about the boundary.

### What to steal
- **The "home page is an identity page" pattern.** A writer's home page should answer: Who are you, what do you write, what are you working on, how do I get more. Not: what is your latest post.
- **A featured-essays block** — six items, handpicked, dated, with a thumbnail. The Writing section is a *table of contents*, not a *feed*.

### What to avoid
- **The Archive is a reverse-chronological list with no filtering.** For a writer with 15+ years of posts, a flat list is unhelpful. Tag or topic filtering, or a year-by-year grouping, would be kinder.

### Visual description
- Off-white background, near-black text. A single blue accent for links.
- A serif heading face (something transitional, with a slight oldstyle axis) and a sans-serif for body. Body measure ~60–65ch.
- Thumbnail images are 1:1 or 4:3, presented at ~140px wide, with thin borders.
- The site is visually almost a paper zine: heavy on whitespace, very low on chrome, photographs and illustrations do the emotional work.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: None at the top — the home page is the nav. The essay pages have a single back-to-home link.
- **RSS**: Linked in the footer.
- **Subscribe**: Newsletter signup linked in the footer.
- **Archive**: Reverse-chronological list of all posts (2009–2025).
- **About**: A profile page with a blurry portrait, three thumbnail cards (Profile / Studio / Contact).
- **Contact**: Email + a contact form.

---

## 10. Andrew Sullivan — andrewsullivan.substack.com ("The Weekly Dish")

- **URL**: https://andrewsullivan.substack.com
- **Author context**: Political columnist, former editor of *The New Republic*. Writes a weekly long-form essay plus a Sunday "Diaries" linkblog. The Substack is a high-traffic, paid publication.
- **Archetype**: Magazine-style (newsletter-publication).

### What it does well
1. **Dark mode by default.** The site is presented in a near-black, near-white-on-black palette, which makes the long-form prose read more like a print magazine.
2. **A long-form essay + a short-form linkblog on the same surface.** The Weekly Dish is a Monday essay; the Sunday "Diaries" is a linkblog. The home page mixes both, clearly labeled.
3. **Subscriber count is a public signal.** A prominent subscriber-count badge above the Subscribe button. The site treats subscriber count as a positioning statement, not a vanity metric.
4. **A short, sharp tagline quote (Orwell) in the masthead.** The site tells you, in four words, what kind of writer this is.

### What to steal
- **The "long-form + linkblog on one publication" pattern.** For a writer who wants to publish short observations without diluting the long-form archive, a labeled "Diaries" or "Links" section is a strong move.
- **The masthead quote** as a positioning device. One sentence, attributed, in the header. It is more honest than a "tagline" because it is a *quote*, not a marketing line.

### What to avoid
- **Substack's chrome is a generic publication template.** The site inherits Substack's nav, footer, and subscribe modal, which means the visual identity is partly offloaded to a third party. A writer who wants the site to feel like a primary surface should not delegate the chrome.

### Visual description
- Dark theme (near-black background, white text, subtle orange accent).
- Sans-serif body type, large, generous line-height. Measure ~62–68ch.
- The "The Weekly Dish" wordmark is set in uppercase letterspaced sans, prominently above the byline.
- Subscriber count badge is small, monospaced, near the top.
- No images in the masthead; the text *is* the design.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Substack default — Home, Archive, About, Subscribe. Plus a left-side rail with the latest posts.
- **RSS**: Yes, per Substack.
- **Subscribe**: Multiple CTAs throughout; the subscribe button is a persistent element.
- **Archive**: Full archive, paginated.
- **About**: One page, written in Sullivan's voice.
- **Contact**: Email via Substack.

---

## 11. Derek Sivers — sive.rs / derek.sivers.org

- **URL**: https://sive.rs
- **Author context**: Entrepreneur, author (*Anything You Want*, *Hell Yeah or No*), speaker. The site is a personal database of short posts, plus books, interviews, photos, and a "Tweets" archive.
- **Archetype**: Personal-essay + working-out-loud.

### What it does well
1. **One-line titles as a content style.** Sivers' post titles are often full sentences, and the posts themselves are 1–5 short paragraphs. The site has invented its own genre: the *short-form essay that is mostly aphorism*. This is anti-blog; the entries are closer to fortune-cookie wisdom with footnotes.
2. **A "Now" page** (the canonical /now page) that states current work and location. The site uses the /now convention as a primary nav item.
3. **Books are listed as physical objects, with covers, on the home page.** Sive.rs does not link to a separate book page; the books are inline. The home page is also a *shopfront*.
4. **A "Tweets" archive** of every micro-post, with full-text search. The site is a personal database with a public front end.
5. **A "Random" link** in the nav. Sive.rs has a `/random` URL that serves a random post. This is the smallest, most reader-friendly feature in this set.

### What to steal
- **A "Random" link.** A one-line `Random` button in the nav. For a writer with a long archive, this is the single best "discover something old" feature you can build.
- **The /now page** — a single page that says "this is what I am doing this month." Update it monthly. Don't date it; date the *content*, not the page.

### What to avoid
- **The information density is similar to gwern.net** — many sections, many link types, all in one place. A writer with a less-curated archive should not try to ship this much surface area at once.

### Visual description
- Off-white background, near-black text, default browser typography. Sivers' site is famously low-styled — it is "hand-built HTML."
- One accent (a muted blue) for links.
- A photo strip on the home page (4 thumbnails) gives the site a personal, not-corporate feel.
- The site reads as a *notebook*, not a publication.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: /about, /now, /contact, /blog, /i, /d, /search, /random, /feeds.
- **RSS**: Multiple feeds by category.
- **Subscribe**: RSS and newsletter.
- **Archive**: Full-text search, plus chronological and category-based browse.
- **About**: A 10-second biography plus a longer bio.
- **Contact**: Email.

---

## 12. The Marginalian (formerly Brain Pickering) — themarginalian.org

- **URL**: https://www.themarginalian.org
- **Author context**: Maria Popova's long-running essay-and-linkblog on culture, books, art, psychology, philosophy, science, history, design, illustration, poetry. Recently renamed from Brain Pickings.
- **Archetype**: Magazine-style.

### What it does well
1. **Subject-based browsing at the top of the home page.** Culture, books, art, psychology, philosophy, science, history, design, illustration, poetry. The site is organized by *subject*, not by date. New readers can pick a lane.
2. **An enormous archive, paginated to 1,664+ pages, but still browsable.** Each subject has its own page; the pagination is exposed but not aggressive.
3. **Two newsletters** — a Sunday digest and a Wednesday midweek. The site treats the newsletter cadence as a *product* with a stated rhythm.
4. **A "donating = loving" footer philosophy.** The site makes a virtue of being reader-funded. The donation CTAs are repeated but framed as a relationship, not a transaction.
5. **"Free, ad-free, AI-free, fully human"** is a four-word positioning statement. The site tells the reader exactly what it is and is not.

### What to steal
- **Subject-based home page**, with 5–10 subject labels at the top. For a writer working across design × writing × tech × anthropology, "subject" is a more honest organizational primitive than "date."
- **A stated positioning line** ("free, ad-free, AI-free, fully human") in the footer or masthead. Four adjectives, no verbs. It is more durable than a tagline.

### What to avoid
- **The footer is a wall of donation CTAs.** Three or four repeated asks in different formats makes the site feel like a fundraiser. One CTA, repeated once, is enough.

### Visual description
- Off-white background; deep near-black text; a small accent (a muted teal or maroon) for links and category labels.
- A transitional serif body face. Measure ~62–68ch.
- Each post has a square or 16:9 hero image, centered above the title.
- The home page presents posts in a vertical stream; pagination is at the bottom.
- Book covers are displayed at ~320px wide, large enough to read the cover art.

### Navigation, RSS, subscribe, archive, about, contact
- **Nav**: Home / About / Contact / donating = loving / newsletter.
- **RSS**: feedburner feed.
- **Subscribe**: Two newsletter forms.
- **Archive**: Subject-based, paginated to 1,664+ pages.
- **About**: One page.
- **Contact**: Email and social links in the footer.

---

## Honorable mentions (one line each)

- **Manuel Moreale (manuelmoreale.com)** — a personal-essay + working-out-loud site with an interview series ("People and Blogs"). Uses a clean serif body, an interview archive organized by month/year, and a small nav (Now / Blogroll / About). Best move: a blogroll in the nav.
- **Tom Critchlow (tomcritchlow.com)** — tagline-led home page ("Move. Think. Create."), Latest Writing + Projects sections, three social links in the footer. A clean model for the "tagline + two sections + footer" home page.
- **Austin Kleon (austinkleon.com)** — a magazine-style two-column layout (main content + sidebar), with a sidebar of recent posts, book covers, and an "On This Date" archive feature. Two-column home pages are a minority choice in this set; Kleon is the cleanest example.

---

# Comparative Analysis

## Common moves (what the best sites share)

Across all twelve sites, a small set of choices recurs so often that they are best understood as a *shared grammar* of the writer-publisher site:

1. **Off-white or cream background, near-black text, one accent.** The palette is almost identical across sites. None of the twelve use a colored background. The accent is used for hover and one or two specific call-to-action elements.
2. **Body type is a serif, with a humanist sans for navigation and meta.** (Kleon is sans-serif throughout; Matuschak and Sivers lean sans for body too. But the dominant pattern is serif body, sans meta.)
3. **Body measure between 60 and 70 characters per line.** None of the twelve uses a 75ch+ measure for long-form prose. None uses a measure narrower than 55ch.
4. **A single column for the essay page.** No sidebars in the reading view. The site may *have* a sidebar on the home page (Kottke, Kleon, Marginalian, Stratechery), but the essay page is single-column.
5. **A reverse-chronological list is the default archive.** Every site has one. Some (Sloan, Appleton) de-emphasize it; some (Paul Graham) make it the entire home page.
6. **A clearly stated subscriber / RSS / email surface.** Even sites that do not run a newsletter have an RSS link in the footer. Every site has at least one subscription path.
7. **An "About" or "Now" page written in first person.** No site in this set uses third-person biography. The "About" page is the author's voice, not a PR profile.
8. **A colophon or design statement.** Sites that take the design seriously publish a page that names the fonts, the stack, and the privacy choices. Sites that don't (Matuschak, Sullivan-on-Substack) inherit the platform's transparency.

## Differentiation (what makes each site itself)

The differences are almost entirely *editorial* — what each site chooses to put on the home page, and how it labels the work — rather than visual. Twelve sites, one palette, and yet they are unmistakably themselves.

- **Sloan** is itself because the home page is a *directory*, not a feed.
- **Maggie Appleton** is itself because the content types are *named after their function* (Notes, Patterns, Smidgeons).
- **Andy Matuschak** is itself because the unit is a *note*, not a post.
- **Paul Graham** is himself because the *archive is the home page*, and the design has not changed since 1999.
- **Frank Chimero** is itself because the home page is an *identity page*, layered top-to-bottom.
- **Stratechery** is itself because the *concepts* page is a first-class surface.
- **Kottke** is itself because the *timestamps* are the metadata system.
- **Craig Mod** is himself because the *books* are equal to the essays.
- **Maria Popova** is herself because the *subjects* are the navigation.
- **Derek Sivers** is himself because the *random button* is a feature.
- **Andrew Sullivan** is himself because the *masthead quote* is a positioning device.
- **Gwern** is itself because the *floating toolbar* is a reader-affordance system.

In every case, the differentiation is a *single editorial choice* that is then executed consistently. None of these sites is differentiated by visual flamboyance. They are differentiated by *what they decided was the unit of the site*.

## Top 5 patterns to steal

1. **The home page is an identity page, not a feed.** (Sloan, Chimero, Appleton, Mod.) Show who you are, what you write, what you are working on, and how to subscribe. The latest post is *not* the only thing on the home page.
2. **Name your content types after their function.** (Appleton: Notes / Patterns / Smidgeons / Now.) The function distinction (e.g., "field notes" vs. "patterns" vs. "essays") is the actual taxonomy. For a writer at design × writing × tech × anthropology, this is the single most useful move in the set.
3. **A single accent glyph for curation.** (Sloan's ★, Gwern's black star.) A one-character mark for "currently featured" or "newly added." Don't build a featured-posts system. Build a glyph.
4. **A blogroll or a "concepts" page in the footer or nav.** (Kottke's Rolodex, Stratechery's Concepts.) A list of other sites you read, or a glossary of terms you use, is a *positioning* move. It tells the reader who you are adjacent to.
5. **A "Now" page and a "Random" link.** (Sive.rs and the /now convention.) A page that says "this is what I am doing this month," updated regularly, and a URL that serves a random post. Both are tiny, both are reader-friendly, both reward return visits.

## Top 5 patterns to skip

1. **Aggressive subscribe CTAs repeated throughout the page.** (Marginalian, Substack in general.) Repeating the same ask in three different forms in the same view trains the reader to ignore it. One CTA, in one place, is enough.
2. **Third-party chrome.** (Sullivan's Substack, in part.) When the nav, footer, and subscribe modal are offloaded to a platform, the site's identity is partly the platform's. A writer who wants the site to feel like a primary surface should not delegate the chrome.
3. **A flat, reverse-chronological list as the only archive.** (Chimero's archive page.) For a writer with more than three years of posts, a single unfiltered list is unhelpful. Group by year, by topic, or by both. Or de-emphasize the archive in favor of a curated "notable essays" block.
4. **A home page with no opening gambit.** (Sloan's home page is almost too quiet; you have to know what you are looking at.) For a writer without name recognition, a single "start here" link above the fold is a generosity to the reader, not a compromise of restraint.
5. **Densely packed linkblog UI as a content style.** (gwern.net and kottke.org are deliberately dense; this is not a model for a writer with a smaller archive.) The information density of a twenty-year archive is not achievable or desirable for a working writer. Borrow the patterns (timestamps in small caps, new-item glyphs, inline footnotes) without the volume.
