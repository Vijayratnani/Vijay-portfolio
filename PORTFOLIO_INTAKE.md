# Portfolio intake: what only Vijay can answer

The site is built, but some parts are hidden until these facts exist. Nothing below has been guessed. Short answers are fine; bullet points are fine. Each answer replaces a "To fill in" note that shows only in `npm run dev`.

## 1. Links and files (blocking)

- [ ] Resume PDF: drop it at `public/Vijay_Kumar.pdf`. The download buttons currently give a 404.
- [ ] GitHub profile URL. The GitHub links stay hidden until it's added.
- [ ] Repo links for Vocalytics and the AI Voice Agent, if they're public.
- [ ] A 60–90 second demo video of the voice agent, ideally showing barge-in.

## 2. Approval

- [ ] eDimensionz sign-off for the **Secure Deposit Workflow Backend** case study. Until then, production shows only the public summary (the same facts as on LinkedIn). After approval, set `signoff: "approved"` in `src/data/projects.ts`.

## 3. Scale numbers (for the metric tiles)

Two of the four home-page tiles are scope facts because no scale numbers exist yet. Any of these would be stronger:

- [ ] Calls handled by the voice agent (per day, or in total)
- [ ] Calls processed by Vocalytics
- [ ] Branches, users or orders on the restaurant platform
- [ ] Anything else measured: requests per second, uptime, test count

## 4. Case studies

Answer what you can. Every project is asked the same things.

### AI Voice Agent
- [ ] Team size, your role, and how long it took
- [ ] Constraints: latency target, telephony limits, cost per call
- [ ] Does a FastAPI service orchestrate the stages? Does Twilio carry audio both ways?
- [ ] What did Groq replace, and when is OpenAI used instead?
- [ ] The hardest bottleneck on the way to under 600ms, and how you fixed it
- [ ] How it was tested
- [ ] How latency was measured: start and end points, p50/p95, number of calls
- [ ] What you'd do next

### Vocalytics
- [ ] Team size, your role, how long it took, and calls processed
- [ ] Constraints: privacy rules, hardware, volume, turnaround
- [ ] Which pipeline stages use the local LLMs?
- [ ] Why stereo-channel energy works here (one party per channel?), and what you tried first
- [ ] Accuracy before your changes, and the test set and metric behind ~95%
- [ ] What the pipeline tests check, and whether they run in CI
- [ ] The hardest problem, and what you'd do next

### Secure Deposit Workflow Backend (keep it generic; no client details)
- [ ] Team size, your role and scope
- [ ] Constraints you can share at a generic level
- [ ] Why one state machine beat per-channel flows; what dual-database support cost
- [ ] How it's tested across both databases and both deployment targets
- [ ] Results you can share without confidential figures
- [ ] The hardest problem, and what you'd do next

### Restaurant Loyalty & Ops Platform (LRM)
- [ ] Where and when it was built, team size, your role
- [ ] Which two languages? What can each role do?
- [ ] Why Socket.IO, SQLite and Expo (and what you rejected)
- [ ] The hardest problem, measurable results, and what you'd do next
- [ ] Phone screenshots in both languages (dummy data)

## 5. Writing

Five post outlines are drafted in `src/content/writing/` (from the plan's blog list). Write one or two, add a date, and set `status: "published"`. The Writing section appears automatically.

## 6. People and voice

- [ ] 1–3 short testimonials from a lead, colleague or client, **with their permission**: quote, name, role. They go in `testimonials` in `src/data/profile.ts`.
- [ ] A photo for the About section.
- [ ] One personal detail for About: what you're looking for next, or something outside work.

## 7. Open consistency items (plan §10)

- [ ] The other 6 certifications. The site shows the top 3 and links LinkedIn for "all 9".
- [ ] Mention the Lincoln University College top-up or not? It's currently left out.
- [ ] Confirm the 360XpertSolutions internship type. LinkedIn says full-time.
