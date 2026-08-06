# Graph Report - .  (2026-07-08)

## Corpus Check
- 149 files · ~127,538 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 372 nodes · 587 edges · 38 communities (20 shown, 18 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 58 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Redesign Page Briefs|Redesign Page Briefs]]
- [[_COMMUNITY_View Transitions & Perf Refactors|View Transitions & Perf Refactors]]
- [[_COMMUNITY_Design Tokens & Color System|Design Tokens & Color System]]
- [[_COMMUNITY_SDD Phases 125 (Foundation)|SDD Phases 1/2/5 (Foundation)]]
- [[_COMMUNITY_Topic System & Assets|Topic System & Assets]]
- [[_COMMUNITY_Collection Grids & Garden|Collection Grids & Garden]]
- [[_COMMUNITY_Site Search|Site Search]]
- [[_COMMUNITY_Manifesto Pillars & Content|Manifesto Pillars & Content]]
- [[_COMMUNITY_Package Manifest & Deps|Package Manifest & Deps]]
- [[_COMMUNITY_Topic Graph Builder|Topic Graph Builder]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Wikilink Remark Plugin|Wikilink Remark Plugin]]
- [[_COMMUNITY_Editorial Design Patterns|Editorial Design Patterns]]
- [[_COMMUNITY_QA Defect Memory|QA Defect Memory]]
- [[_COMMUNITY_Seniority & Context Windows|Seniority & Context Windows]]
- [[_COMMUNITY_Typography Essays|Typography Essays]]
- [[_COMMUNITY_Calm  Quiet UX Principles|Calm / Quiet UX Principles]]
- [[_COMMUNITY_Design-as-Grammar Concepts|Design-as-Grammar Concepts]]
- [[_COMMUNITY_Boring Technology|Boring Technology]]
- [[_COMMUNITY_AI Topic|AI Topic]]
- [[_COMMUNITY_Anthropology Topic|Anthropology Topic]]
- [[_COMMUNITY_Design Topic|Design Topic]]
- [[_COMMUNITY_Systems Topic|Systems Topic]]
- [[_COMMUNITY_Tools Topic|Tools Topic]]
- [[_COMMUNITY_Web Development Topic|Web Development Topic]]
- [[_COMMUNITY_Writing Topic|Writing Topic]]
- [[_COMMUNITY_Design System Grammar|Design System Grammar]]
- [[_COMMUNITY_Bounded Contexts|Bounded Contexts]]
- [[_COMMUNITY_Failure & Friction Budgets|Failure & Friction Budgets]]
- [[_COMMUNITY_Blogroll Weekly Dish|Blogroll: Weekly Dish]]
- [[_COMMUNITY_Book Refactoring UI|Book: Refactoring UI]]
- [[_COMMUNITY_Book Staff Engineer|Book: Staff Engineer]]
- [[_COMMUNITY_Book Everyday Things|Book: Everyday Things]]
- [[_COMMUNITY_Figma Variables Workflow|Figma Variables Workflow]]
- [[_COMMUNITY_Project Steam Notes|Project: Steam Notes]]
- [[_COMMUNITY_Recognized Topics List|Recognized Topics List]]

## God Nodes (most connected - your core abstractions)
1. `@/layouts/Layout.astro` - 39 edges
2. `design-proposal.md (redesign proposal)` - 38 edges
3. `Shared Moves — Cross-cutting Redesign Decisions` - 27 edges
4. `DESIGN.md §2 Colors` - 27 edges
5. `@/components/TopicPhoto.astro` - 26 edges
6. `@/components/GardenCard.astro` - 21 edges
7. `@/lib/topics` - 15 edges
8. `Implementation Order — Parallel Astro-Coder Map` - 12 edges
9. `@/lib/graph` - 11 edges
10. `@/lib/onThisDay` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Brief — /about` --references--> `@/components/Timeline.astro`  [EXTRACTED]
  .superpowers/redesign/briefs/about.md → src/components/Timeline.astro
- `@/components/BookTile.astro` --references--> `theme.css (design tokens)`  [INFERRED]
  src/components/BookTile.astro → .superpowers/redesign/design-proposal.md
- `Single accent glyph ✦ (U+2726)` --implements--> `./CuratedMark.astro`  [INFERRED]
  .superpowers/redesign/design-proposal.md → src/components/CuratedMark.astro
- `./CuratedMark.astro` --implements--> `Curated mark glyph ✦ (single accent, DESIGN §7)`  [EXTRACTED]
  src/components/CuratedMark.astro → .superpowers/redesign/briefs/_shared-moves.md
- `Brief — /essays (Index)` --references--> `@/components/CuratedPicks.astro`  [EXTRACTED]
  .superpowers/redesign/briefs/essays-index.md → src/components/CuratedPicks.astro

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Typography as Persuasive Argument** — typography_is_argument, tight_tracking_minus_0_01em, src_content_books_the_elements_of_typographic_style_md [EXTRACTED 1.00]
- **Typographic Convention Patterns** — src_content_patterns_borrowed_type_borrowed_type, src_content_patterns_editorial_hierarchies_editorial_hierarchies, src_content_patterns_witnessed_drafts_witnessed_drafts [INFERRED 0.75]
- **Progressive Disclosure Design Philosophy** — src_content_patterns_calm_defaults_calm_defaults, src_content_patterns_progressive_sharpening_progressive_sharpening, src_content_patterns_quiet_power_user_modes_quiet_power_user_modes, src_content_patterns_failure_surfaces_failure_surfaces, src_content_patterns_friction_budgets_friction_budgets [INFERRED 0.85]
- **Design System Grammar and Communication** — src_content_patterns_token_as_grammar_token_as_grammar, src_content_talks_the_grammar_of_design_the_grammar_of_design, src_content_talks_design_tokens_at_scale_design_tokens_at_scale, src_content_talks_components_are_communication_components_are_communication [INFERRED 0.85]
- **Phase 0 foundation artifacts (blocks all page briefs)** — src_components_curatedmark, src_components_curatedpicks, src_components_newsletterband, src_styles_global_prose_utility, src_styles_theme_text_prose_token, src_components_nav, src_components_footer [EXTRACTED 0.95]
- **Shared prose surface (detail pages + .prose + --text-prose)** — _superpowers_redesign_briefs_essays_slug_brief, _superpowers_redesign_briefs_notes_slug_brief, src_styles_global_prose_utility, src_styles_theme_text_prose_token [EXTRACTED 0.85]
- **Design authority chain (proposal → DESIGN.md → shared-moves)** — _superpowers_redesign_design_proposal, design_md, _superpowers_redesign_briefs__shared_moves [EXTRACTED 0.85]
- **July 2026 accessibility audit color fixes** — design_guide_color_heading, design_guide_color_muted_slate, design_guide_color_action_blue, design_guide_color_coral_text, design_guide_color_evergreen_text [EXTRACTED 1.00]
- **Systems-thinking thread** — src_content_books_thinking_in_systems, src_content_notes_systems_thinking_without_drawings, src_content_notes_server_components_hypothesis [INFERRED 0.75]
- **Attention & focus practices** — src_content_practices_morning_walk_before_screens, src_content_practices_shut_up_and_read, src_content_practices_weekly_sunday_review [INFERRED 0.85]
- **Redesign design flow: references → proposal → briefs → reviews → QA** — _superpowers_redesign_site_references, _superpowers_redesign_design_proposal, _superpowers_redesign_briefs__shared_moves, _superpowers_redesign_reviews_system_review, _superpowers_redesign_qa_report [INFERRED 0.85]
- **SDD phased implementation plan (briefs across phases 1-5)** — docs_superpowers_plans_2026_07_04_phurix_improvements, _superpowers_sdd_phase_1_brief, _superpowers_sdd_phase_2_brief, _superpowers_sdd_phase_3_brief, _superpowers_sdd_phase_4_brief, _superpowers_sdd_phase_5_brief [EXTRACTED 1.00]
- **Frap visibility contract (Layout gate + QA defect + proposal tension)** — src_components_frap, src_layouts_layout, _superpowers_redesign_qa_report, _superpowers_redesign_design_proposal [INFERRED 0.75]

## Communities (38 total, 18 thin omitted)

### Community 0 - "Redesign Page Briefs"
Cohesion: 0.07
Nodes (58): Brief — /404, Implementation Order — Parallel Astro-Coder Map, Shared Moves — Cross-cutting Redesign Decisions, Curated mark glyph ✦ (single accent, DESIGN §7), Brief — /about, Brief — /colophon, Brief — /concepts, Digital garden (glossary concept) (+50 more)

### Community 1 - "View Transitions & Perf Refactors"
Cohesion: 0.06
Nodes (27): Phase 3 Brief — SEO, Meta & View Transitions, Phase 3 Report — SEO, Meta & View Transitions, Phase 4 Brief — Performance Refactors, Phase 4 Report — Performance Refactors, astro.config.mjs, [], @/styles/dark.css, @/styles/global.css (+19 more)

### Community 2 - "Design Tokens & Color System"
Cohesion: 0.06
Nodes (38): CLAUDE.md (repo guidance), DESIGN.md (Cohere-inspired design rationale), DESIGN_GUIDE.md (Developer Token Reference), --color-action-blue, --color-border-light, --color-canvas, --color-card-border, --color-cohere-black (+30 more)

### Community 3 - "SDD Phases 1/2/5 (Foundation)"
Cohesion: 0.08
Nodes (30): Brief — Blogroll Data Module, Brief — /random, Phase 1 Brief — Foundation & Correctness, Phase 1 Implementation Report, Phase 2 Brief — Schema Tightening & Type Safety, Phase 2 Report — Schema Tightening & Type Safety, Phase 5 Brief — Cleanup, Accessibility & Polish, Phase 5 Report — Cleanup, Accessibility & Polish (+22 more)

### Community 4 - "Topic System & Assets"
Cohesion: 0.10
Nodes (22): @/assets/photos/ai.jpg, @/assets/photos/anthropology.jpg, @/assets/photos/design.jpg, @/assets/photos/systems.jpg, @/assets/photos/tools.jpg, @/assets/photos/web-development.jpg, @/assets/photos/writing.jpg, @/components/GrowthBadge.astro (+14 more)

### Community 5 - "Collection Grids & Garden"
Cohesion: 0.08
Nodes (28): Brief — /essays (Index), Phase 1 Cleanup Brief — TypeScript errors, Phase 1 Cleanup Report, [], [], @/components/CollectionGrid.astro, @/components/GardenCard.astro, formattedDate (+20 more)

### Community 6 - "Site Search"
Cohesion: 0.14
Nodes (14): dependencies, astro, @astrojs/mdx, @astrojs/rss, @astrojs/sitemap, minisearch, @tailwindcss/vite, entriesJson (+6 more)

### Community 7 - "Manifesto Pillars & Content"
Cohesion: 0.12
Nodes (17): --color-evergreen-text, Growth markers (seedling / growing / evergreen), Pillar: Field Notes, Pillar: Living Well, Pillar: Meaning, Pillar: Tech & Craft, Thinking in Systems (book), The Anthropology of Code Review (note) (+9 more)

### Community 8 - "Package Manifest & Deps"
Cohesion: 0.12
Nodes (16): devDependencies, @astrojs/check, @fontsource-variable/inter, tailwindcss, typescript, engines, node, name (+8 more)

### Community 9 - "Topic Graph Builder"
Cohesion: 0.21
Nodes (8): @/lib/graph, buildGraphData(), CollectionName, GraphData, GraphEdge, GraphNode, safeGetCollection(), topicsFor()

### Community 10 - "TypeScript Config"
Cohesion: 0.29
Nodes (6): compilerOptions, baseUrl, ignoreDeprecations, paths, extends, @/*

### Community 11 - "Wikilink Remark Plugin"
Cohesion: 0.60
Nodes (3): escapeHtml(), remarkWikilink(), walk()

### Community 12 - "Editorial Design Patterns"
Cohesion: 0.40
Nodes (5): Borrowed Type, Editorial Hierarchies, Provenance Stamps, Soft Handoffs, Witnessed Drafts

### Community 13 - "QA Defect Memory"
Cohesion: 0.67
Nodes (4): corpusx migration ruff-exclude known flake, DEF-001 (prefix-mismatch 404 bypass of not_found_handler), DEF-002 (ruff F841 in seed migration fails CI), QA-Tester Memory Index

### Community 14 - "Seniority & Context Windows"
Cohesion: 0.50
Nodes (4): Seniority as Knowledge Calibration, What Senior Actually Means, AI Assistants and the Context Window, Structured Omission for Context Windows

### Community 15 - "Typography Essays"
Cohesion: 0.50
Nodes (4): The Elements of Typographic Style, On Typography, and the Trust It Quietly Asks For, Typography Is Not Decoration, Typography Is Argument, Not Decoration

### Community 16 - "Calm / Quiet UX Principles"
Cohesion: 0.67
Nodes (4): Calm Defaults, Progressive Sharpening, Quiet APIs, Quiet Power-User Modes

### Community 17 - "Design-as-Grammar Concepts"
Cohesion: 0.67
Nodes (4): Token-as-Grammar, Components Are Communication, Design Tokens at Scale, The Grammar of Design

## Knowledge Gaps
- **178 isolated node(s):** `name`, `type`, `version`, `node`, `dev` (+173 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Phurix Improvements Phased Plan` connect `SDD Phases 1/2/5 (Foundation)` to `View Transitions & Perf Refactors`, `Design Tokens & Color System`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `DESIGN.md (Cohere-inspired design rationale)` connect `Design Tokens & Color System` to `SDD Phases 1/2/5 (Foundation)`?**
  _High betweenness centrality (0.206) - this node is a cross-community bridge._
- **Why does `@/layouts/Layout.astro` connect `View Transitions & Perf Refactors` to `Redesign Page Briefs`, `SDD Phases 1/2/5 (Foundation)`, `Topic System & Assets`, `Collection Grids & Garden`, `Site Search`, `Topic Graph Builder`?**
  _High betweenness centrality (0.184) - this node is a cross-community bridge._
- **What connects `name`, `type`, `version` to the rest of the system?**
  _181 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Redesign Page Briefs` be split into smaller, more focused modules?**
  _Cohesion score 0.07305669199298656 - nodes in this community are weakly interconnected._
- **Should `View Transitions & Perf Refactors` be split into smaller, more focused modules?**
  _Cohesion score 0.06072874493927125 - nodes in this community are weakly interconnected._
- **Should `Design Tokens & Color System` be split into smaller, more focused modules?**
  _Cohesion score 0.05689900426742532 - nodes in this community are weakly interconnected._