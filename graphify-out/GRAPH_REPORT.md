# Graph Report - .  (2026-07-03)

## Corpus Check
- 90 files · ~61,729 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 308 nodes · 318 edges · 38 communities (26 shown, 12 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.86)
- Token cost: 84,411 input · 84,411 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Astro Components & Pages|Astro Components & Pages]]
- [[_COMMUNITY_NPM Dependencies|NPM Dependencies]]
- [[_COMMUNITY_Notes Content Schema|Notes Content Schema]]
- [[_COMMUNITY_Astro Content Type System|Astro Content Type System]]
- [[_COMMUNITY_Layout & Global Styles|Layout & Global Styles]]
- [[_COMMUNITY_Essays Content Schema|Essays Content Schema]]
- [[_COMMUNITY_Patterns Content Schema|Patterns Content Schema]]
- [[_COMMUNITY_Talks Content Schema|Talks Content Schema]]
- [[_COMMUNITY_Books Content Schema|Books Content Schema]]
- [[_COMMUNITY_Design System ↔ Implementation Bridge|Design System ↔ Implementation Bridge]]
- [[_COMMUNITY_Content Collections Config|Content Collections Config]]
- [[_COMMUNITY_Anthropology & Documentation Patterns|Anthropology & Documentation Patterns]]
- [[_COMMUNITY_Design Grammar & Web Patterns|Design Grammar & Web Patterns]]
- [[_COMMUNITY_Calm Defaults & Progressive Disclosure|Calm Defaults & Progressive Disclosure]]
- [[_COMMUNITY_TypeScript & Path Aliases|TypeScript & Path Aliases]]
- [[_COMMUNITY_Boring Tech & Data Locality|Boring Tech & Data Locality]]
- [[_COMMUNITY_Senior Engineering & Context Windows|Senior Engineering & Context Windows]]
- [[_COMMUNITY_Typography as Functional Discipline|Typography as Functional Discipline]]
- [[_COMMUNITY_Design Systems as Grammar|Design Systems as Grammar]]
- [[_COMMUNITY_Systems Thinking & Failure Surfaces|Systems Thinking & Failure Surfaces]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 37|Community 37]]

## God Nodes (most connected - your core abstractions)
1. `@/layouts/Layout.astro` - 19 edges
2. `@/components/GardenCard.astro` - 13 edges
3. `@/components/Button.astro` - 7 edges
4. `@/lib/topics` - 7 edges
5. `scripts` - 6 edges
6. `@/components/TopicPhoto.astro` - 6 edges
7. `@/components/Card.astro` - 5 edges
8. `@/components/CollectionGrid.astro` - 5 edges
9. `pickArtTopic()` - 5 edges
10. `topics` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Design System as Grammar Metaphor` --semantically_similar_to--> `Design Tokens`  [INFERRED] [semantically similar]
  src/content/essays/design-systems-are-grammar.mdx → DESIGN_GUIDE.md
- `Anthropology Human Behavior Photo` --conceptually_related_to--> `Borrowed Type`  [INFERRED]
  public/photos/anthropology.jpg → src/content/patterns/borrowed-type.mdx
- `Systems Photo` --conceptually_related_to--> `Friction Budgets`  [INFERRED]
  public/photos/systems.jpg → src/content/patterns/friction-budgets.mdx
- `Tools Photo` --conceptually_related_to--> `Progressive Sharpening`  [INFERRED]
  public/photos/tools.jpg → src/content/patterns/progressive-sharpening.mdx
- `Writing Photo` --conceptually_related_to--> `Quiet APIs`  [INFERRED]
  public/photos/writing.jpg → src/content/patterns/quiet-api.mdx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Starbucks Brand Identity System** — four_tier_green_system, gold_reserved_for_rewards, warm_neutral_canvas, tight_tracking_minus_0_01em [INFERRED 0.85]
- **Component Implementation of Design Tokens** — src_components_button_astro, src_components_card_astro, src_components_feature_band_astro, src_components_frap_astro, src_styles_theme_css [INFERRED 0.90]
- **Typography as Persuasive Argument** — typography_is_argument, tight_tracking_minus_0_01em, src_content_books_the_elements_of_typographic_style_md [EXTRACTED 1.00]
- **Progressive Disclosure Design Philosophy** — src_content_patterns_calm_defaults_calm_defaults, src_content_patterns_progressive_sharpening_progressive_sharpening, src_content_patterns_quiet_power_user_modes_quiet_power_user_modes, src_content_patterns_failure_surfaces_failure_surfaces, src_content_patterns_friction_budgets_friction_budgets [INFERRED 0.85]
- **Design System Grammar and Communication** — src_content_patterns_token_as_grammar_token_as_grammar, src_content_talks_the_grammar_of_design_the_grammar_of_design, src_content_talks_design_tokens_at_scale_design_tokens_at_scale, src_content_talks_components_are_communication_components_are_communication [INFERRED 0.85]
- **Typographic Convention Patterns** — src_content_patterns_borrowed_type_borrowed_type, src_content_patterns_editorial_hierarchies_editorial_hierarchies, src_content_patterns_witnessed_drafts_witnessed_drafts [INFERRED 0.75]

## Communities (38 total, 12 thin omitted)

### Community 0 - "Astro Components & Pages"
Cohesion: 0.06
Nodes (35): @/components/BookTile.astro, titleWords, @/components/CollectionGrid.astro, @/components/Frap.astro, @/components/GardenCard.astro, formattedDate, typeLabels, @/components/GrowthBadge.astro (+27 more)

### Community 1 - "NPM Dependencies"
Cohesion: 0.08
Nodes (25): dependencies, astro, @astrojs/mdx, @astrojs/react, @astrojs/rss, @astrojs/sitemap, react, react-dom (+17 more)

### Community 2 - "Notes Content Schema"
Cohesion: 0.08
Nodes (24): format, type, type, default, enum, type, type, properties (+16 more)

### Community 3 - "Astro Content Type System"
Cohesion: 0.08
Nodes (24): AllValuesOf, CollectionEntry, CollectionKey, ContentConfig, DataEntryMap, ExtractCollectionFilterType, ExtractDataType, ExtractEntryFilterType (+16 more)

### Community 4 - "Layout & Global Styles"
Cohesion: 0.11
Nodes (16): @/styles/global.css, @fontsource-variable/inter, @/components/Button.astro, classes, @/components/Card.astro, classes, @/components/Footer.astro, year (+8 more)

### Community 5 - "Essays Content Schema"
Cohesion: 0.10
Nodes (20): format, type, type, type, properties, date, lede, $schema (+12 more)

### Community 6 - "Patterns Content Schema"
Cohesion: 0.10
Nodes (20): format, type, type, type, properties, date, lede, $schema (+12 more)

### Community 7 - "Talks Content Schema"
Cohesion: 0.11
Nodes (17): format, type, type, type, type, properties, date, description (+9 more)

### Community 8 - "Books Content Schema"
Cohesion: 0.13
Nodes (14): type, type, properties, author, coverColor, $schema, title, year (+6 more)

### Community 9 - "Design System ↔ Implementation Bridge"
Cohesion: 0.17
Nodes (8): 50px Pill Radius (Universal), Four-Tier Green System, Frap — Floating Circular CTA, Gold Reserved for Rewards Ceremony, Layered Whisper-Soft Shadows, Quiet APIs (Restraint as Design Principle), scale(0.95) Active State, Warm Neutral Canvas

### Community 10 - "Content Collections Config"
Cohesion: 0.29
Nodes (6): books, collections, essays, notes, patterns, talks

### Community 11 - "Anthropology & Documentation Patterns"
Cohesion: 0.33
Nodes (6): Anthropology Human Behavior Photo, Borrowed Type, Editorial Hierarchies, Provenance Stamps, Soft Handoffs, Witnessed Drafts

### Community 12 - "Design Grammar & Web Patterns"
Cohesion: 0.40
Nodes (6): Design Photo, Web Development Photo, Token-as-Grammar, Components Are Communication, Design Tokens at Scale, The Grammar of Design

### Community 13 - "Calm Defaults & Progressive Disclosure"
Cohesion: 0.40
Nodes (6): Tools Photo, Writing Photo, Calm Defaults, Progressive Sharpening, Quiet APIs, Quiet Power-User Modes

### Community 14 - "TypeScript & Path Aliases"
Cohesion: 0.33
Nodes (5): compilerOptions, baseUrl, paths, extends, @/*

### Community 15 - "Boring Tech & Data Locality"
Cohesion: 0.50
Nodes (4): Boring Technology Choice, Edge Functions as Data-Locality Optimization, The Case for Boring Technology, Edge Functions, Mental Model

### Community 16 - "Senior Engineering & Context Windows"
Cohesion: 0.50
Nodes (4): Seniority as Knowledge Calibration, What Senior Actually Means, AI Assistants and the Context Window, Structured Omission for Context Windows

### Community 17 - "Typography as Functional Discipline"
Cohesion: 0.50
Nodes (4): The Elements of Typographic Style, On Typography, and the Trust It Quietly Asks For, Typography Is Not Decoration, Typography Is Argument, Not Decoration

### Community 18 - "Design Systems as Grammar"
Cohesion: 0.67
Nodes (3): Design System as Grammar Metaphor, Design Tokens, Design Systems Are Grammar, Not Paint

### Community 19 - "Systems Thinking & Failure Surfaces"
Cohesion: 0.67
Nodes (3): Systems Photo, Failure Surfaces, Friction Budgets

## Knowledge Gaps
- **184 isolated node(s):** `$schema`, `type`, `type`, `type`, `type` (+179 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@/layouts/Layout.astro` connect `Layout & Global Styles` to `Astro Components & Pages`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `@/components/Button.astro` connect `Layout & Global Styles` to `Astro Components & Pages`, `Design System ↔ Implementation Bridge`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `@/components/GardenCard.astro` connect `Astro Components & Pages` to `Layout & Global Styles`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `$schema`, `type`, `type` to the rest of the system?**
  _188 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Astro Components & Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.06205673758865248 - nodes in this community are weakly interconnected._
- **Should `NPM Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `Notes Content Schema` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._