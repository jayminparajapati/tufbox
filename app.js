// Simple front-end booking demo: stores bookings in localStorage and shows them.
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('bookingForm');
  const bookingsList = document.getElementById('bookingsList');
  const confirmation = document.getElementById('confirmation');
  const clearBtn = document.getElementById('clearBookings');

  function loadBookings() {
    const raw = localStorage.getItem('tufbox_bookings');
    return raw ? JSON.parse(raw) : [];
  }

  function saveBookings(items) {
    localStorage.setItem('tufbox_bookings', JSON.stringify(items));
  }

  function renderBookings() {
    const items = loadBookings();
    bookingsList.innerHTML = '';
    if (items.length === 0) {
      bookingsList.innerHTML = '<p class="muted">No bookings yet.</p>';
      return;
    }
    items.forEach((b, idx) => {
      const div = document.createElement('div');
      div.className = 'booking-item';
      div.innerHTML = `<strong>${escapeHtml(b.name)}</strong> — ${escapeHtml(b.date)} ${escapeHtml(b.time)} (${escapeHtml(b.duration)}h)<br><small>${escapeHtml(b.email)}</small>`;
      bookingsList.appendChild(div);
    });
  }

  function escapeHtml(s){ return (s+'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];}); }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      date: form.date.value,
      time: form.time.value,
      duration: form.duration.value
    };
    if (!data.name || !data.email || !data.date || !data.time) {
      confirmation.hidden = false;
      confirmation.textContent = 'Please fill all required fields.';
      confirmation.className = 'confirmation';
      return;
    }

    const items = loadBookings();
    items.push(data);
    saveBookings(items);
    renderBookings();

    confirmation.hidden = false;
    confirmation.textContent = 'Booking confirmed — thank you!';
    confirmation.className = 'confirmation';
    form.reset();
  });

  clearBtn.addEventListener('click', function () {
    if (!confirm('Clear all bookings?')) return;
    localStorage.removeItem('tufbox_bookings');
    renderBookings();
    confirmation.hidden = false;
    confirmation.textContent = 'All bookings cleared.';
  });

  // Fill year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderBookings();
});
