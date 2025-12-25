### Phase 2 – Content Enrichment Pipeline

Phase 2 is implemented as a Node.js pipeline that:
- Fetches the latest article from Laravel APIs
- Retrieves reference articles via Google Search (mocked)
- Scrapes reference content (mocked)
- Enhances the original article using an LLM-based rewriting step
- Publishes the updated article back via Laravel CRUD APIs

Google scraping and LLM calls are intentionally mocked to focus
on system design, data flow, and API integration under time constraints.
