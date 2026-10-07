(() => {
  "use strict";
  window.lucide?.createIcons();

  const domains = {
    finance: {
      title: "Finance & accounting",
      description:
        "Connect operating records to editable analyses and explain what the evidence can, and cannot, support.",
      examples: [
        "Reconcile deposits, clearing records, and vendor credits.",
        "Build cash-flow forecasts with explicit scenario assumptions.",
        "Prepare review workpapers and identify missing evidence.",
      ],
      materials:
        "Spreadsheets, operating records, reference documents, and analysis scripts.",
      review:
        "Numerical consistency, source traceability, editable outputs, and unresolved exceptions.",
    },
    assurance: {
      title: "Assurance & quality review",
      description:
        "Make evidence, data lineage, and review decisions traceable across a professional engagement.",
      examples: [
        "Organize source records and engagement workspaces.",
        "Trace findings back to their supporting materials.",
        "Record quality issues, evidence gaps, and follow-up owners.",
      ],
      materials:
        "Evidence registers, client-data packets, review checklists, and working notes.",
      review:
        "Source provenance, coverage of requirements, and clear review responsibilities.",
    },
    clinical: {
      title: "Clinical operations & documentation",
      description:
        "Study the information work around healthcare operations, documentation quality, and coordination.",
      examples: [
        "Review documentation for completeness and consistency.",
        "Organize referral and care-transition information.",
        "Check synthetic records against data and interoperability requirements.",
      ],
      materials:
        "Synthetic case records, documentation templates, data dictionaries, and reference guidance.",
      review:
        "Data quality, traceability, and handoff clarity; clinical decisions remain outside the simulation's authority.",
    },
    design: {
      title: "Design & creative production",
      description:
        "Connect a creative brief to production planning, technical requirements, review, and the next handoff.",
      examples: [
        "Translate a brief into requirements and a production plan.",
        "Develop visual identities, interface concepts, and campaign assets.",
        "Coordinate image, video, and spatial design revisions for delivery.",
      ],
      materials:
        "Briefs, images, editable layouts, storyboards, 3D concepts, and asset libraries.",
      review:
        "Consistency with the brief, accessibility, technical suitability, and usable handoffs.",
    },
    entertainment: {
      title: "Entertainment & event operations",
      description:
        "Coordinate the planning and information work behind events, productions, audiences, and partnerships.",
      examples: [
        "Build event plans, schedules, and responsibility lists.",
        "Analyze audience and ticketing records.",
        "Prepare partnership briefs and production review packages.",
      ],
      materials:
        "Schedules, audience data, media assets, operating plans, and partner documents.",
      review:
        "Feasible coordination, consistent records, explicit dependencies, and clear ownership.",
    },
    industrial: {
      title: "Industrial & engineering work",
      description:
        "Bring geometry, operating assumptions, calculations, and technical review into the same assignment.",
      examples: [
        "Develop and compare alternative mechanical design concepts.",
        "Check calculations against geometry and stated constraints.",
        "Package reproducible sources, annotated views, and a technical recommendation.",
      ],
      materials:
        "CAD and STEP files, feature tables, engineering references, calculation code, and technical notes.",
      review:
        "Reproducibility, geometry consistency, inspection access, and evidence for further engineering review.",
    },
    legal: {
      title: "Legal & compliance information work",
      description:
        "Organize documents and evidence so that obligations, unresolved questions, and review decisions remain visible.",
      examples: [
        "Compare document provisions and supporting records.",
        "Maintain compliance evidence and issue registers.",
        "Prepare review briefs with sources and open questions.",
      ],
      materials:
        "Reference documents, governance records, evidence registers, and advisory notes.",
      review:
        "Source-grounded analysis, explicit uncertainty, and review boundaries; not autonomous legal advice.",
    },
    research: {
      title: "Research & education",
      description:
        "Connect questions, evidence, experiments, and explanation across the research and learning process.",
      examples: [
        "Synthesize literature and keep claims linked to their sources.",
        "Prepare reproducible experiments, analyses, and research presentations.",
        "Develop lessons, diagrams, exercises, and accessible learning materials.",
      ],
      materials:
        "Papers, notebooks, datasets, experiment code, slide decks, and course materials.",
      review:
        "Evidence quality, reproducibility, attribution, and clarity for the intended audience.",
    },
    commerce: {
      title: "Marketing & commerce",
      description:
        "Carry a market insight through creative development, campaign planning, and measurement.",
      examples: [
        "Research audiences, competitors, and product positioning.",
        "Coordinate copy, images, product videos, and sales presentations.",
        "Analyze campaign performance and prepare the next experiment.",
      ],
      materials:
        "Market research, creative briefs, product catalogs, media assets, and performance data.",
      review:
        "Factual claims, brand consistency, asset rights, and traceable performance measures.",
    },
    operations: {
      title: "People & business operations",
      description:
        "Keep everyday organizational work connected across people, schedules, resources, and decisions.",
      examples: [
        "Prepare onboarding resources and maintain operating procedures.",
        "Coordinate meetings, procurement requests, and project dependencies.",
        "Turn discussions into action plans with owners and follow-up dates.",
      ],
      materials:
        "Policies, calendars, correspondence, vendor comparisons, meeting notes, and task registers.",
      review:
        "Privacy, access permissions, consistent records, and explicit human approval.",
    },
    strategy: {
      title: "Product & strategy",
      description:
        "Connect customer needs and business questions to alternatives, prototypes, and decisions.",
      examples: [
        "Synthesize interviews and develop evidence-backed requirements.",
        "Compare roadmaps, financial scenarios, and product concepts.",
        "Prepare decision briefs, interactive prototypes, and stakeholder decks.",
      ],
      materials:
        "Research notes, metrics, financial models, design files, prototypes, and planning documents.",
      review:
        "Clear assumptions, customer evidence, feasibility, and documented trade-offs.",
    },
    software: {
      title: "Software & data operations",
      description:
        "Connect requests and technical context to working code, reproducible analysis, and maintainable delivery.",
      examples: [
        "Work on API components and supporting documentation.",
        "Build or inspect data-processing and analytics scripts.",
        "Organize incident findings, tests, and follow-up work.",
      ],
      materials:
        "Repositories, scripts, API specifications, structured data, logs, and configuration files.",
      review:
        "Correctness, reproducibility, test evidence, and a clear account of changes and remaining issues.",
    },
  };

  const tabs = [...document.querySelectorAll("[data-domain]")];
  const panel = document.querySelector("#domain-panel");

  function selectDomain(key) {
    const data = domains[key];
    if (!data) return;
    for (const tab of tabs) {
      const selected = tab.dataset.domain === key;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) panel.setAttribute("aria-labelledby", tab.id);
    }
    document.querySelector("#domain-title").textContent = data.title;
    document.querySelector("#domain-description").textContent =
      data.description;
    document.querySelector("#domain-materials").textContent = data.materials;
    document.querySelector("#domain-review").textContent = data.review;
    const examples = data.examples.map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    });
    document.querySelector("#domain-examples").replaceChildren(...examples);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectDomain(tab.dataset.domain));
    tab.addEventListener("keydown", (event) => {
      const targets = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      const target = targets[event.key];
      if (target === undefined) return;
      event.preventDefault();
      selectDomain(tabs[target].dataset.domain);
      tabs[target].focus();
    });
  });
})();
