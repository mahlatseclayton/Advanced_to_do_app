# AI Usage and Transparency Declaration

## Transparency Statement
In compliance with COMS3011A lab evaluation guidelines, AI assistance was utilized during the development of this project under pair-programming and pedagogical learning workflows.

## AI Roles & Responsibilities

1. Concept Explanation: Explaining Next.js Server Components, Server Actions, SQLite prepared statements, and CSS Module scoping.
2. Architecture Design: Structuring local-first database operations, dynamic overdue calculation rules, and component hierarchies.
3. Troubleshooting & Debugging: Identifying schema mismatch errors (`table tasks has no column named description`) and providing database migration reset steps.
4. User-Authored Code: All source code modifications were driven interactively and reviewed by the author for complete hands-on learning.

## Conversation Log Transcripts in Repository

The raw session transcripts and interaction logs are included directly in this repository for evaluation access:

- [Compact Session Transcript (JSONL)](../ai/transcript.jsonl)
- [Full Session Transcript (JSONL)](../ai/transcript_full.jsonl)

## Summary of AI Interactions
- Query 1: Diagnosed `SqliteError: table tasks has no column named description` and provided schema update steps.
- Query 2: Explained Turbopack workspace root detection warnings.
- Query 3: Explained Next.js Server Actions, SQL injection prevention via prepared statements (`?`), and server cache revalidation (`revalidatePath`).
- Query 4: Detailed line-by-line breakdown of TSX components, React hooks (`useState`, `useRef`), and prop passing.
- Query 5: Refactored page inline styles into scoped CSS Modules (`page.module.css`).
- Query 6: Harmonized UI design system with light page background, royal blue typography, and dark component cards.
- Query 7: Built Archived Tasks popup dialog with unarchiving / restoring capabilities.
- Query 8: Added AI session transcripts directly into `docs/transcripts/` directory.
