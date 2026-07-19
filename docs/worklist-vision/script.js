const DATA = {
  focus: [
    {
      id: 'CUST-2201', name: 'Kestrel Manufacturing', collector: 'Priya Menon',
      pastDue: 284500, band: 'Critical', action: 'Call AP for Broken P2P', cooldown: false,
      sim: { band: 'Critical', action: 'Call AP for Broken P2P' },
      why: {
        eligibility: 'Eligible — open amount $284,500, active status, has an active suggested action.',
        cooldown: 'Not suppressed. Last email logged 11 days ago, outside the 7-day cooldown window.',
        prioritization: 'Ranked 1 of 96 in Strategic Accounts. Score driven by high past-due exposure, a broken Promise-to-Pay, and no recent communication.',
        allocation: 'Assigned to Priya Menon — matched fixed rule "Strategic Accounts, West Region."',
        actions: '"Call AP for Broken P2P" — triggered by Rule 3 (P2P broken within 5 days). Sequence mode: Highest Eligible Action Wins.',
        worklist: 'In Today\'s Focus — Critical band customers fill focus before any other group.'
      }
    },
    {
      id: 'CUST-1187', name: 'Briarwood Logistics', collector: 'Priya Menon',
      pastDue: 96200, band: 'High', action: 'Send Dunning Letter 2', cooldown: false,
      sim: { band: 'Critical', action: 'Escalate to Sales Owner' },
      why: {
        eligibility: 'Eligible — past due amount exceeds the configured threshold of $10,000.',
        cooldown: 'Not suppressed. No qualifying activity logged in the last 4 days.',
        prioritization: 'Ranked 2 of 61 in Mid-Market. Score driven by upcoming past due and a slipping payment behavior trend.',
        allocation: 'Assigned to Priya Menon — same-owner continuity from prior invoice cycle.',
        actions: '"Send Dunning Letter 2" — Rule 2 (15 days past due) matched; Reminder 1 already completed.',
        worklist: 'In Today\'s Focus — High band, filled under Full Portfolio with Focus Target.'
      }
    },
    {
      id: 'CUST-3390', name: 'Solace Health Systems', collector: 'Diego Ferreira',
      pastDue: 512900, band: 'Critical', action: 'Review Dispute Documentation', cooldown: false,
      sim: { band: 'Critical', action: 'Review Dispute Documentation' },
      why: {
        eligibility: 'Eligible — override applied: "include customer with escalation tag."',
        cooldown: 'Not suppressed. Escalation tag bypasses standard cooldown.',
        prioritization: 'Ranked 1 of 74 in Enterprise. Dispute exposure and severe aging both scored above threshold.',
        allocation: 'Assigned to Diego Ferreira — matched fixed rule "Enterprise, Healthcare Vertical."',
        actions: '"Review Dispute Documentation" — mandatory task, blocks further correspondence until resolved.',
        worklist: 'In Today\'s Focus — escalation tag forces focus inclusion regardless of band fill.'
      }
    },
    {
      id: 'CUST-4471', name: 'Nimbus Retail Group', collector: 'Diego Ferreira',
      pastDue: 41750, band: 'Medium', action: 'Send Reminder 1', cooldown: true,
      sim: { band: 'Medium', action: 'Send Reminder 1' },
      why: {
        eligibility: 'Eligible — open amount $41,750, active status.',
        cooldown: 'Suppressed because an email was logged 2 days ago. Cooldown ends in 5 days. Override not triggered.',
        prioritization: 'Ranked 4 of 61 in Mid-Market. Moderate past-due exposure, no broken commitments.',
        allocation: 'Assigned to Diego Ferreira — uniform distribution within Mid-Market pool.',
        actions: '"Send Reminder 1" — Rule 1 matched (7 days past due).',
        worklist: 'Visible in Today\'s Focus as cooled-down — status shown, not hidden.'
      }
    }
  ],
  backlog: [
    {
      id: 'CUST-5510', name: 'Ferro Industrial', collector: 'Unassigned',
      pastDue: 18900, band: 'Low', action: 'No action due', cooldown: false,
      sim: { band: 'Low', action: 'No action due' },
      why: {
        eligibility: 'Eligible — open amount above zero, no active dispute.',
        cooldown: 'Not suppressed.',
        prioritization: 'Ranked 38 of 61 in Mid-Market. Low past-due exposure, healthy payment behavior.',
        allocation: 'Unassigned — no fixed rule matched; sits in Shared Pool pending claim.',
        actions: 'No matching action rule at current aging.',
        worklist: 'In Eligible Backlog — below Today\'s Focus capacity threshold.'
      }
    },
    {
      id: 'CUST-6602', name: 'Anchorpoint Freight', collector: 'Priya Menon',
      pastDue: 63400, band: 'Medium', action: 'Send Reminder 2', cooldown: false,
      sim: { band: 'High', action: 'Send Reminder 2' },
      why: {
        eligibility: 'Eligible — past due amount exceeds configured threshold.',
        cooldown: 'Not suppressed.',
        prioritization: 'Ranked 19 of 96 in Strategic Accounts. Score below the current Today\'s Focus cutoff.',
        allocation: 'Assigned to Priya Menon — matched fixed rule "Strategic Accounts, West Region."',
        actions: '"Send Reminder 2" — Rule 2 matched; Reminder 1 already completed.',
        worklist: 'In Eligible Backlog — eligible and assigned, outside today\'s focus capacity.'
      }
    },
    {
      id: 'CUST-7715', name: 'Vantage Chemicals', collector: 'Shared Pool',
      pastDue: 129800, band: 'High', action: 'Call AP', cooldown: false,
      sim: { band: 'Critical', action: 'Call AP for Broken P2P' },
      why: {
        eligibility: 'Eligible — open amount $129,800, active suggested action.',
        cooldown: 'Not suppressed.',
        prioritization: 'Ranked 11 of 74 in Enterprise. High past-due exposure, no assigned collector yet.',
        allocation: 'Unassigned — matches Focus Fill Policy source "same allocation group backlog."',
        actions: '"Call AP" — Rule 2 matched on aging threshold.',
        worklist: 'In Eligible Backlog as Shared Pool — claimable by any authorized collector.'
      }
    },
    {
      id: 'CUST-8801', name: 'Thornfield Foods', collector: 'Diego Ferreira',
      pastDue: 8200, band: 'Low', action: 'No action due', cooldown: true,
      sim: { band: 'Low', action: 'No action due' },
      why: {
        eligibility: 'Eligible — open amount above zero.',
        cooldown: 'Suppressed — call completed 1 day ago, inside the 4-day cooldown window.',
        prioritization: 'Ranked 51 of 74 in Enterprise. Minimal past-due exposure.',
        allocation: 'Assigned to Diego Ferreira — matched fixed rule "Enterprise, Healthcare Vertical" fallback.',
        actions: 'No matching action rule while cooldown is active.',
        worklist: 'In Eligible Backlog, filtered under Suppressed — visible on request, not hidden by default.'
      }
    }
  ]
};

const state = { tab: 'focus', sim: false, selected: null };

const bandClass = b => `band-${b.toLowerCase()}`;
const money = n => `$${n.toLocaleString()}`;

function currentRows() {
  return DATA[state.tab];
}

function render() {
  document.querySelectorAll('.wl-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === state.tab));

  const container = document.getElementById('wl-rows');
  container.innerHTML = '';

  currentRows().forEach(row => {
    const band = state.sim ? row.sim.band : row.band;
    const action = state.sim ? row.sim.action : row.action;
    const bandChanged = state.sim && row.sim.band !== row.band;
    const actionChanged = state.sim && row.sim.action !== row.action;

    const el = document.createElement('div');
    el.className = 'wl-row wl-row-body' + (state.selected === row.id ? ' selected' : '');
    el.innerHTML = `
      <div class="wl-cust"><b>${row.name}</b><small>${row.id}</small></div>
      <div class="wl-collector">${row.collector}</div>
      <div class="wl-amt overdue">${money(row.pastDue)}</div>
      <div><span class="band ${bandClass(band)}">${band}</span>${bandChanged ? `<span class="sim-tag">was ${row.band}</span>` : ''}</div>
      <div class="wl-action">${row.cooldown ? '<span class="cooldown-dot" title="Cooldown active"></span>' : ''}<span>${action}</span>${actionChanged ? `<span class="sim-tag">SIM</span>` : ''}</div>
      <div class="wl-row-arrow">›</div>
    `;
    el.addEventListener('click', () => openWhy(row));
    container.appendChild(el);
  });
}

function openWhy(row) {
  state.selected = row.id;
  render();
  const panel = document.getElementById('wl-why');
  const body = document.getElementById('wl-why-body');
  body.innerHTML = `
    <div class="why-block"><h5>Eligibility</h5><p>${row.why.eligibility}</p></div>
    <div class="why-block"><h5>Cooldown</h5><p>${row.why.cooldown}</p></div>
    <div class="why-block"><h5>Prioritization</h5><p>${row.why.prioritization}</p></div>
    <div class="why-block"><h5>Allocation</h5><p>${row.why.allocation}</p></div>
    <div class="why-block"><h5>Actions</h5><p>${row.why.actions}</p></div>
    <div class="why-block"><h5>Worklist Placement</h5><p>${row.why.worklist}</p></div>
  `;
  panel.classList.add('open');
}

document.querySelectorAll('.wl-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    state.tab = tab.dataset.tab;
    state.selected = null;
    document.getElementById('wl-why').classList.remove('open');
    render();
  });
});

document.getElementById('wl-sim-toggle').addEventListener('change', (e) => {
  state.sim = e.target.checked;
  render();
});

document.getElementById('wl-why-close').addEventListener('click', () => {
  document.getElementById('wl-why').classList.remove('open');
  state.selected = null;
  render();
});

render();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
document.querySelectorAll('.pillar, .step').forEach(el => revealObserver.observe(el));
