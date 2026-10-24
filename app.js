/* ==========================================================================
   Meridiano — interactions
   ========================================================================== */

(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------------
     The cabinet
     ------------------------------------------------------------------------ */

  const objects = [
    {
      id: '01',
      name: 'The bracelet',
      maker: 'Cross',
      family: 'gold',
      familyLabel: 'Gold',
      image: 'assets/object-bracelet-gold.webp',
      alt: 'A gold-tone bracelet watch with a champagne dial and applied numeral at twelve.',
      spec: 'Gold-tone · champagne dial',
      desc:
        'A gold-tone bracelet watch with a champagne dial and an applied numeral at twelve. Quiet on the wrist, warmer than steel.',
      specs: [
        ['Maker', 'Cross'],
        ['Case', 'Gold-tone'],
        ['Dial', 'Champagne'],
        ['Bracelet', 'Gold-tone link'],
      ],
    },
    {
      id: '02',
      name: 'The chronograph',
      maker: 'Seiko',
      family: 'complications',
      familyLabel: 'Complications',
      image: 'assets/object-two-tone-chrono.webp',
      alt: 'A two-tone chronograph with a black dial, gold bezel and three sub-dials.',
      spec: 'Two-tone · black dial · 100 m',
      desc:
        'A two-tone chronograph with a black dial and three registers. The kind of watch that looks better after a decade, not a season.',
      specs: [
        ['Maker', 'Seiko'],
        ['Case', 'Steel and gold-tone'],
        ['Dial', 'Black'],
        ['Function', 'Chronograph'],
        ['Water resistance', '100 m'],
      ],
    },
    {
      id: '03',
      name: 'The steel chronograph',
      maker: 'Hamilton',
      family: 'complications',
      familyLabel: 'Complications',
      image: 'assets/object-steel-chrono.webp',
      alt:
        'A steel automatic chronograph with a black dial, day-date window and tan leather strap, photographed upright.',
      spec: 'Steel · black dial · automatic',
      desc:
        'A steel automatic chronograph with a black dial, day-date, tachymeter scale and a tan leather strap. Built to be read at a glance.',
      specs: [
        ['Maker', 'Hamilton'],
        ['Case', 'Steel'],
        ['Dial', 'Black'],
        ['Function', 'Chronograph, day-date'],
        ['Strap', 'Leather'],
      ],
    },
    {
      id: '04',
      name: 'The silver dial',
      maker: 'Rado',
      family: 'steel',
      familyLabel: 'Steel',
      image: 'assets/object-silver-dial.webp',
      alt: 'A slim steel watch with a brushed silver dial, diamond hour markers and a date window.',
      spec: 'Steel · silver dial · diamonds',
      desc:
        'A slim steel watch with a brushed silver dial, diamond markers and a date at three. Restraint with a little light in it.',
      specs: [
        ['Maker', 'Rado'],
        ['Case', 'Steel'],
        ['Dial', 'Brushed silver'],
        ['Markers', 'Diamond'],
        ['Function', 'Date'],
      ],
    },
    {
      id: '05',
      name: 'The sports automatic',
      maker: 'Reef Tiger',
      family: 'steel',
      familyLabel: 'Steel',
      image: 'assets/object-sports-auto.webp',
      alt: 'A steel automatic watch with a black dial, gold-tone indices and a date window.',
      spec: 'Steel · black dial · automatic',
      desc:
        'A steel automatic with a black dial, gold indices and a date. A practical watch that has decided not to be plain.',
      specs: [
        ['Maker', 'Reef Tiger'],
        ['Case', 'Steel'],
        ['Dial', 'Black'],
        ['Movement', 'Automatic'],
        ['Function', 'Date'],
      ],
    },
    {
      id: '06',
      name: 'The jewel',
      maker: 'Bulgari',
      family: 'jewellery',
      familyLabel: 'High jewellery',
      image: 'assets/object-jewel.webp',
      alt:
        'A rose-gold high-jewellery watch set with diamonds and pink sapphires on a tapered bracelet.',
      spec: 'Rose gold · diamonds · sapphires',
      desc:
        'A rose-gold high-jewellery watch set with diamonds and pink sapphires. Made to be worn, not stored. The hour is almost beside the point.',
      specs: [
        ['Maker', 'Bulgari'],
        ['Case', 'Rose gold'],
        ['Stones', 'Diamonds, pink sapphires'],
        ['Function', 'Hours, minutes'],
      ],
    },
    {
      id: '07',
      name: 'The pavé',
      maker: 'Unmarked',
      family: 'gold',
      familyLabel: 'Gold',
      image: 'assets/object-pave.webp',
      alt: 'A gold-tone statement watch with a pavé-set case, dial and bracelet.',
      spec: 'Gold-tone · pavé set',
      desc:
        'A pavé-set gold-tone statement watch. Ostentatious in the best sense — the sort of thing that ends a conversation, or starts one.',
      specs: [
        ['Maker', 'Unmarked'],
        ['Case', 'Gold-tone'],
        ['Dial', 'Pavé-set'],
        ['Bracelet', 'Gold-tone link'],
      ],
    },
    {
      id: '08',
      name: 'The two-tone',
      maker: 'Diamond',
      family: 'gold',
      familyLabel: 'Gold',
      image: 'assets/object-two-tone-auto.webp',
      alt:
        'A two-tone automatic watch with a silver dial, diamond hour markers and Roman numerals.',
      spec: 'Two-tone · silver dial · automatic',
      desc:
        'A two-tone automatic with diamond markers and Roman numerals. A softer take on gold, and the easier one to wear every day.',
      specs: [
        ['Maker', 'Diamond'],
        ['Case', 'Two-tone steel'],
        ['Dial', 'Silver'],
        ['Markers', 'Diamond'],
        ['Movement', 'Automatic'],
      ],
    },
  ];

  const byId = new Map(objects.map((object) => [object.id, object]));

  const grid = $('[data-object-grid]');
  const resultCount = $('[data-result-count]');
  const filterButtons = $$('[data-filter]');

  const familyNames = {
    all: 'all',
    complications: 'Complications',
    steel: 'Steel',
    gold: 'Gold',
    jewellery: 'High jewellery',
  };

  function cardMarkup(object, index) {
    return `
      <button
        class="object-card"
        type="button"
        data-object="${object.id}"
        data-animate
        style="--i:${index}"
        aria-label="View Object ${object.id}, ${object.name} by ${object.maker}"
      >
        <span class="object-frame">
          <span class="object-index">${object.id}</span>
          <img src="${object.image}" alt="${object.alt}" loading="lazy" decoding="async" width="400" height="500" />
          <span class="object-open" aria-hidden="true">
            <svg viewBox="0 0 16 16"><path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7"/></svg>
          </span>
        </span>
        <span class="object-meta">
          <span class="object-meta-text">
            <span class="object-maker">${object.maker}</span>
            <span class="object-name">${object.name}</span>
            <span class="object-spec">${object.spec}</span>
          </span>
          <span class="object-onrequest">On request</span>
        </span>
      </button>
    `;
  }

  let activeFamily = 'all';

  function renderGrid(family = activeFamily) {
    const visible = objects.filter((object) => family === 'all' || object.family === family);
    activeFamily = family;

    grid.innerHTML = visible.map(cardMarkup).join('');

    if (resultCount) {
      resultCount.textContent =
        family === 'all'
          ? `Showing all ${visible.length}`
          : `Showing ${String(visible.length).padStart(2, '0')} in ${familyNames[family]}`;
    }

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === family;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function syncCounts() {
    const total = $('[data-count]');
    if (total) total.textContent = String(objects.length).padStart(2, '0');

    filterButtons.forEach((button) => {
      const family = button.dataset.filter;
      const count = $('span', button);
      if (!count) return;
      const value =
        family === 'all'
          ? objects.length
          : objects.filter((object) => object.family === family).length;
      count.textContent = String(value).padStart(2, '0');
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      renderGrid(button.dataset.filter);
    });
  });

  syncCounts();
  renderGrid('all');

  /* ------------------------------------------------------------------------
     Loupe
     ------------------------------------------------------------------------ */

  const stage = $('[data-loupe-stage]');
  const loupe = $('[data-loupe]');
  const loupeSource = $('[data-loupe-source]');

  if (stage && loupe && loupeSource) {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let loupeActive = false;
    const zoom = 2;

    const positionLoupe = (event) => {
      const sourceRect = loupeSource.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const size = loupe.offsetWidth;
      const loupeImage = $('img', loupe);

      if (!loupeImage || !size) return;

      const x = event.clientX - stageRect.left;
      const y = event.clientY - stageRect.top;
      const relativeX = event.clientX - sourceRect.left;
      const relativeY = event.clientY - sourceRect.top;

      loupeImage.style.width = `${sourceRect.width * zoom}px`;
      loupeImage.style.height = `${sourceRect.height * zoom}px`;
      loupeImage.style.left = `${size / 2 - relativeX * zoom}px`;
      loupeImage.style.top = `${size / 2 - relativeY * zoom}px`;

      loupe.style.left = `${x}px`;
      loupe.style.top = `${y}px`;
    };

    const enableLoupe = () => {
      if (!finePointer.matches || reduceMotion.matches) return;
      loupeActive = true;
    };

    stage.addEventListener('pointerenter', enableLoupe);
    stage.addEventListener('pointerenter', () => {
      if (loupeActive) stage.classList.add('is-louping');
    });
    stage.addEventListener('pointermove', (event) => {
      if (!loupeActive) {
        enableLoupe();
        if (!loupeActive) return;
        stage.classList.add('is-louping');
      }
      positionLoupe(event);
    });
    stage.addEventListener('pointerleave', () => {
      loupeActive = false;
      stage.classList.remove('is-louping');
    });
  }

  /* ------------------------------------------------------------------------
     Dialogs — shared behaviour
     ------------------------------------------------------------------------ */

  const allDialogs = $$('dialog');
  const objectDialog = $('#object-dialog');
  const bookingDialog = $('#booking-dialog');
  const menuDialog = $('#site-menu');
  const menuToggle = $('[data-open-menu]');

  const syncScrollLock = () => {
    const anyOpen = allDialogs.some((dialog) => dialog.open);
    document.documentElement.classList.toggle('is-locked', anyOpen);
  };

  allDialogs.forEach((dialog) => {
    dialog.addEventListener('close', syncScrollLock);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  /* ------------------------------------------------------------------------
     Object dialog
     ------------------------------------------------------------------------ */

  let lastObjectTrigger = null;
  let currentObject = null;

  const openObject = (object, trigger) => {
    if (!objectDialog) return;

    currentObject = object;
    lastObjectTrigger = trigger || document.activeElement;

    $('[data-object-index]', objectDialog).textContent = `Object ${object.id}`;
    $('[data-object-maker]', objectDialog).textContent = object.maker;
    $('[data-object-title]', objectDialog).textContent = object.name;
    $('[data-object-desc]', objectDialog).textContent = object.desc;

    const image = $('[data-object-image]', objectDialog);
    image.src = object.image;
    image.alt = object.alt;

    const specs = $('[data-object-specs]', objectDialog);
    specs.innerHTML = object.specs
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
      .join('');

    objectDialog.showModal();
    syncScrollLock();
  };

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('[data-object]');
    if (!card) return;
    const object = byId.get(card.dataset.object);
    if (object) openObject(object, card);
  });

  $$('[data-object]').forEach((button) => {
    if (button.closest('[data-object-grid]')) return;
    button.addEventListener('click', () => {
      const object = byId.get(button.dataset.object);
      if (object) openObject(object, button);
    });
  });

  const closeObject = $('[data-close-object]');
  if (closeObject && objectDialog) {
    closeObject.addEventListener('click', () => objectDialog.close());
  }

  if (objectDialog) {
    objectDialog.addEventListener('close', () => {
      if (lastObjectTrigger) lastObjectTrigger.focus({ preventScroll: true });
    });
  }

  /* ------------------------------------------------------------------------
     Booking dialog
     ------------------------------------------------------------------------ */

  const bookingForm = $('[data-booking-form]');
  const bookingReady = $('[data-booking-ready]');
  const bookingSummary = $('[data-booking-summary]');
  const bookingError = $('[data-booking-error]');
  const bookingObjectSelect = $('[data-booking-object]');
  const copyStatus = $('[data-copy-status]');

  let lastBookingTrigger = null;
  let preparedNote = '';

  if (bookingObjectSelect) {
    objects.forEach((object) => {
      const option = document.createElement('option');
      option.value = object.id;
      option.textContent = `${object.id} — ${object.name} (${object.maker})`;
      bookingObjectSelect.append(option);
    });
  }

  const dateField = $('#booking-date');
  if (dateField) {
    try {
      const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Africa/Luanda',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date());
      dateField.min = today;
    } catch {
      /* noop */
    }
  }

  const resetBookingUi = () => {
    if (!bookingForm || !bookingReady) return;
    bookingForm.hidden = false;
    bookingReady.hidden = true;
    preparedNote = '';
    if (bookingError) {
      bookingError.hidden = true;
      bookingError.textContent = '';
    }
    if (copyStatus) copyStatus.textContent = '';
  };

  const openBooking = ({ interest = '', objectId = '', trigger = null } = {}) => {
    if (!bookingDialog) return;

    const active = trigger || document.activeElement;
    if (active && active.closest('dialog') && active.closest('dialog') !== bookingDialog) {
      lastBookingTrigger = lastObjectTrigger || menuToggle;
    } else {
      lastBookingTrigger = active;
    }

    resetBookingUi();
    bookingForm.reset();

    const interestSelect = $('#booking-interest');
    if (interestSelect) {
      const options = Array.from(interestSelect.options);
      const match = options.find(
        (option) => option.value.toLowerCase() === String(interest).toLowerCase()
      );
      interestSelect.value = match ? match.value : 'A viewing';
    }
    if (bookingObjectSelect) bookingObjectSelect.value = objectId;

    bookingDialog.showModal();
    syncScrollLock();
    window.setTimeout(() => {
      const first = $('#booking-name');
      if (first) first.focus({ preventScroll: true });
    }, 60);
  };

  $$('[data-open-booking]').forEach((button) => {
    button.addEventListener('click', () => {
      const inMenu = Boolean(button.closest('#site-menu'));
      if (inMenu && menuDialog && menuDialog.open) {
        menuDialog.close();
      }
      openBooking({
        interest: button.dataset.interest || '',
        objectId: '',
        trigger: inMenu ? menuToggle : button,
      });
    });
  });

  const objectBookingButton = $('[data-object-booking]');
  if (objectBookingButton) {
    objectBookingButton.addEventListener('click', () => {
      const id = currentObject ? currentObject.id : '';
      const trigger = lastObjectTrigger || objectBookingButton;
      if (objectDialog && objectDialog.open) objectDialog.close();
      openBooking({ interest: 'A viewing', objectId: id, trigger });
    });
  }

  const closeBooking = $('[data-close-booking]');
  if (closeBooking && bookingDialog) {
    closeBooking.addEventListener('click', () => bookingDialog.close());
  }

  if (bookingDialog) {
    bookingDialog.addEventListener('close', () => {
      if (lastBookingTrigger && document.contains(lastBookingTrigger)) {
        lastBookingTrigger.focus({ preventScroll: true });
      }
    });
  }

  const showFieldError = (field, message) => {
    if (field) field.setAttribute('aria-invalid', 'true');
    if (bookingError) {
      bookingError.textContent = message;
      bookingError.hidden = false;
    }
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameField = $('#booking-name');
      const emailField = $('#booking-email');
      const name = nameField ? nameField.value.trim() : '';
      const email = emailField ? emailField.value.trim() : '';

      $$('[aria-invalid]', bookingForm).forEach((field) =>
        field.removeAttribute('aria-invalid')
      );

      if (!name) {
        showFieldError(nameField, 'Please add your name.');
        nameField?.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError(emailField, 'Please add a working email address.');
        emailField?.focus();
        return;
      }
      if (dateField && dateField.value) {
        const today = dateField.min;
        if (today && dateField.value < today) {
          showFieldError(dateField, 'Please choose a day from today onwards.');
          dateField.focus();
          return;
        }
      }

      if (bookingError) {
        bookingError.hidden = true;
        bookingError.textContent = '';
      }

      const interest = $('#booking-interest')?.value || 'A viewing';
      const objectId = bookingObjectSelect?.value || '';
      const object = objectId ? byId.get(objectId) : null;
      const notes = $('#booking-message')?.value.trim() || '';
      let dayLabel = 'Not specified';

      if (dateField && dateField.value) {
        try {
          dayLabel = new Date(`${dateField.value}T12:00:00`).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        } catch {
          dayLabel = dateField.value;
        }
      }

      preparedNote = [
        'MERIDIANO — APPOINTMENT REQUEST',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Reason: ${interest}`,
        `Object: ${object ? `Object ${object.id} — ${object.name} (${object.maker})` : 'No particular object'}`,
        `Preferred day: ${dayLabel}`,
        `Notes: ${notes || '—'}`,
        '',
        'Prepared on the Meridiano concept site. Not sent automatically.',
      ].join('\n');

      if (bookingSummary) bookingSummary.textContent = preparedNote;
      if (bookingForm) bookingForm.hidden = true;
      if (bookingReady) {
        bookingReady.hidden = false;
        $('h3', bookingReady)?.focus?.();
        const copyButton = $('[data-copy-request]', bookingReady);
        if (copyButton) copyButton.focus({ preventScroll: true });
      }
      if (copyStatus) copyStatus.textContent = '';
    });
  }

  const copyRequest = $('[data-copy-request]');
  if (copyRequest) {
    copyRequest.addEventListener('click', async () => {
      if (!preparedNote) return;
      let copied = false;

      try {
        await navigator.clipboard.writeText(preparedNote);
        copied = true;
      } catch {
        const helper = document.createElement('textarea');
        helper.value = preparedNote;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.append(helper);
        helper.select();
        try {
          copied = document.execCommand('copy');
        } catch {
          copied = false;
        }
        helper.remove();
      }

      if (copied) {
        if (copyStatus) copyStatus.textContent = 'Copied. Paste it into an email or a message.';
        copyRequest.textContent = 'Copied';
        window.setTimeout(() => {
          copyRequest.textContent = 'Copy the note';
        }, 2200);
      } else if (bookingSummary) {
        const range = document.createRange();
        range.selectNodeContents(bookingSummary);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        if (copyStatus) {
          copyStatus.textContent = 'Selected — press Ctrl or Cmd + C to copy.';
        }
      }
    });
  }

  const bookingReset = $('[data-booking-reset]');
  if (bookingReset) {
    bookingReset.addEventListener('click', () => {
      resetBookingUi();
      window.setTimeout(() => $('#booking-name')?.focus(), 30);
    });
  }

  /* ------------------------------------------------------------------------
     Menu
     ------------------------------------------------------------------------ */

  if (menuToggle && menuDialog) {
    menuToggle.addEventListener('click', () => {
      menuDialog.showModal();
      syncScrollLock();
    });
  }

  const closeMenu = $('[data-close-menu]');
  if (closeMenu && menuDialog) {
    closeMenu.addEventListener('click', () => menuDialog.close());
  }

  $$('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      if (menuDialog && menuDialog.open) menuDialog.close();
      window.setTimeout(() => {
        if (!href) return;
        window.location.hash = href;
      }, 20);
    });
  });

  /* ------------------------------------------------------------------------
     Header
     ------------------------------------------------------------------------ */

  const header = $('[data-header]');

  if (header) {
    let ticking = false;
    const updateHeader = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    };
    updateHeader();
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
  }

  /* ------------------------------------------------------------------------
     Clocks and dial
     ------------------------------------------------------------------------ */

  const clockFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Luanda',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const dialTicks = $('[data-dial-ticks]');

  if (dialTicks) {
    const ns = 'http://www.w3.org/2000/svg';
    for (let index = 0; index < 60; index += 1) {
      const angle = (index * 6 * Math.PI) / 180;
      const isMajor = index % 5 === 0;
      const outer = 140;
      const inner = isMajor ? 130 : 135;
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', String(160 + Math.sin(angle) * inner));
      line.setAttribute('y1', String(160 - Math.cos(angle) * inner));
      line.setAttribute('x2', String(160 + Math.sin(angle) * outer));
      line.setAttribute('y2', String(160 - Math.cos(angle) * outer));
      if (isMajor) line.classList.add('is-major');
      dialTicks.append(line);
    }
  }

  const hourHand = $('[data-hand-hour]');
  const minuteHand = $('[data-hand-minute]');
  const secondHand = $('[data-hand-second]');

  function luandaParts() {
    const parts = clockFormatter.formatToParts(new Date());
    const find = (type) => Number(parts.find((part) => part.type === type)?.value || 0);
    return {
      hours: find('hour') % 24,
      minutes: find('minute'),
      seconds: find('second'),
      milliseconds: new Date().getMilliseconds(),
    };
  }

  function updateClocks() {
    const { hours, minutes, seconds } = luandaParts();
    const label = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
    $$('[data-clock]').forEach((clock) => {
      clock.textContent = label;
      clock.setAttribute('dateTime', new Date().toISOString());
    });
  }

  function updateHands() {
    if (!hourHand || !minuteHand || !secondHand) return;
    const now = luandaParts();
    const exactSeconds = now.seconds + now.milliseconds / 1000;
    const exactMinutes = now.minutes + exactSeconds / 60;
    const exactHours = (now.hours % 12) + exactMinutes / 60;

    secondHand.setAttribute('transform', `rotate(${exactSeconds * 6} 160 160)`);
    minuteHand.setAttribute('transform', `rotate(${exactMinutes * 6} 160 160)`);
    hourHand.setAttribute('transform', `rotate(${exactHours * 30} 160 160)`);
  }

  updateClocks();
  updateHands();

  if (reduceMotion.matches) {
    window.setInterval(() => {
      updateClocks();
      updateHands();
    }, 1000);
  } else {
    window.setInterval(updateClocks, 1000);
    const tick = () => {
      updateHands();
      window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  }

  reduceMotion.addEventListener?.('change', () => {
    updateHands();
  });

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */

  const revealItems = $$('.reveal');

  if (revealItems.length) {
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      revealItems.forEach((item) => item.classList.add('in'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealItems.forEach((item) => observer.observe(item));
    }
  }
})();
