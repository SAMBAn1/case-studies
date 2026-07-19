import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://egxpoesalxyrymhpigkv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_xUNsqpCKrBVTgDcihT2DhQ_D2EyJHwW';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const state = { rows: [], tab: 'focus', sim: false, selected: null, search: '', group: '', band: '', cooldownOnly: false, sharedOnly: false };

const bandClass = b => `band-${b.toLowerCase()}`;
const money = n => `$${Number(n).toLocaleString('en-US')}`;

async function load() {
  const indicator = document.getElementById('live-indicator');
  const { data, error } = await supabase.from('worklist_customers').select('*').order('rank_in_group', { ascending: true });
  if (error) {
    indicator.textContent = 'connection failed';
    console.error(error);
    return;
  }
  state.rows = data;
  indicator.textContent = `live · ${data.length} customers`;
  indicator.classList.add('on');

  const groups = [...new Set(data.map(r => r.customer_group))].sort();
  const groupSelect = document.getElementById('wl-group-filter');
  groups.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g; opt.textContent = g;
    groupSelect.appendChild(opt);
  });

  document.getElementById('count-focus').textContent = data.filter(r => r.tab === 'focus').length;
  document.getElementById('count-backlog').textContent = data.filter(r => r.tab === 'backlog').length;

  render();
}

function filteredRows() {
  return state.rows.filter(r => {
    if (r.tab !== state.tab) return false;
    if (state.group && r.customer_group !== state.group) return false;
    if (state.band && r.band !== state.band) return false;
    if (state.cooldownOnly && !r.cooldown) return false;
    if (state.sharedOnly && !r.shared_pool) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.id.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function render() {
  document.querySelectorAll('.wl-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === state.tab));

  const rows = filteredRows();
  const container = document.getElementById('wl-rows');
  const empty = document.getElementById('wl-empty');
  container.innerHTML = '';
  empty.hidden = rows.length > 0;

  rows.forEach(row => {
    const band = state.sim ? row.sim_band : row.band;
    const action = state.sim ? row.sim_action : row.primary_action;
    const bandChanged = state.sim && row.sim_band !== row.band;
    const actionChanged = state.sim && row.sim_action !== row.primary_action;

    const el = document.createElement('div');
    el.className = 'wl-row wl-row-body' + (state.selected === row.id ? ' selected' : '');
    el.innerHTML = `
      <div class="wl-cust"><b>${row.name}</b><small>${row.id}</small></div>
      <div class="wl-group">${row.customer_group}</div>
      <div class="wl-collector">${row.collector}</div>
      <div class="wl-amt">${money(row.past_due)}</div>
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
    <div class="why-block"><h5>Eligibility</h5><p>${row.why_eligibility}</p></div>
    <div class="why-block"><h5>Cooldown</h5><p>${row.why_cooldown}</p></div>
    <div class="why-block"><h5>Prioritization</h5><p>${row.why_prioritization}</p></div>
    <div class="why-block"><h5>Allocation</h5><p>${row.why_allocation}</p></div>
    <div class="why-block"><h5>Actions</h5><p>${row.why_actions}</p></div>
    <div class="why-block"><h5>Worklist Placement</h5><p>${row.why_worklist}</p></div>
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

document.getElementById('wl-sim-toggle').addEventListener('change', e => { state.sim = e.target.checked; render(); });
document.getElementById('wl-search').addEventListener('input', e => { state.search = e.target.value; render(); });
document.getElementById('wl-group-filter').addEventListener('change', e => { state.group = e.target.value; render(); });
document.getElementById('wl-band-filter').addEventListener('change', e => { state.band = e.target.value; render(); });
document.getElementById('wl-cooldown-filter').addEventListener('change', e => { state.cooldownOnly = e.target.checked; render(); });
document.getElementById('wl-shared-filter').addEventListener('change', e => { state.sharedOnly = e.target.checked; render(); });
document.getElementById('wl-why-close').addEventListener('click', () => {
  document.getElementById('wl-why').classList.remove('open');
  state.selected = null;
  render();
});

document.querySelectorAll('.toplevel-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.toplevel-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const view = tab.dataset.view;
    document.getElementById('view-worklist').hidden = view !== 'worklist';
    document.getElementById('view-model').hidden = view !== 'model';
  });
});

document.getElementById('fullscreen-btn').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
});

load();
