/**
 * KOTOBA LAB - App Logic & Interactive Dynamic Content Engine
 */

(function () {
  'use strict';

  // --- 1. State & Storage Keys ---
  const STORAGE_KEYS = {
    CUSTOM_TERMS: 'kotoba_custom_terms_v1',
    BOOKMARKS: 'kotoba_bookmarks_v1',
    VIEWED: 'kotoba_viewed_v1',
    THEME: 'kotoba_theme_v1',
    VIEW_MODE: 'kotoba_view_mode_v1'
  };

  const state = {
    terms: [],
    bookmarks: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]')),
    viewed: new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.VIEWED) || '[]')),
    currentCategory: 'all',
    currentTag: 'all',
    searchQuery: '',
    sortBy: 'popular',
    viewMode: localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'grid',
    showOnlyBookmarks: false,
    currentModalTerm: null,
    // Quiz state
    quiz: {
      questions: [],
      currentIndex: 0,
      score: 0,
      answered: false
    }
  };

  // --- 2. DOM Elements Cache ---
  const dom = {
    // Theme & Navigation
    html: document.documentElement,
    themeToggleBtn: document.getElementById('btn-toggle-theme'),
    themeIcon: document.getElementById('theme-icon'),
    bookmarkToggleBtn: document.getElementById('btn-toggle-bookmarks'),
    bookmarkBadge: document.getElementById('bookmark-badge-count'),
    brandHomeLink: document.getElementById('brand-home-link'),
    
    // Metrics & Learning Tracker
    metricTotalTerms: document.getElementById('metric-total-terms'),
    trackerPercentText: document.getElementById('tracker-percent-text'),
    trackerProgressFill: document.getElementById('tracker-progress-fill'),
    trackerViewedCount: document.getElementById('tracker-viewed-count'),
    trackerBookmarkedCount: document.getElementById('tracker-bookmarked-count'),

    // Search & Filter Toolbar
    searchInput: document.getElementById('glossary-search'),
    clearSearchBtn: document.getElementById('btn-clear-search'),
    categoryTabs: document.getElementById('category-tabs'),
    tagChipsContainer: document.getElementById('tag-filter-chips'),
    sortSelect: document.getElementById('sort-select'),
    btnViewGrid: document.getElementById('btn-view-grid'),
    btnViewList: document.getElementById('btn-view-list'),
    resultsCount: document.getElementById('results-count'),
    btnResetFilters: document.getElementById('btn-reset-filters'),
    glossaryGrid: document.getElementById('glossary-grid'),

    // Detail Modal Elements
    detailDialog: document.getElementById('term-detail-dialog'),
    detailCategoryTag: document.getElementById('detail-category-tag'),
    detailLevelTag: document.getElementById('detail-level-tag'),
    detailFurigana: document.getElementById('detail-furigana'),
    detailTitle: document.getElementById('detail-dialog-title'),
    detailEnTitle: document.getElementById('detail-en-title'),
    detailBtnFav: document.getElementById('detail-btn-fav'),
    btnCloseDetail: document.getElementById('btn-close-detail'),
    btnCloseDetailFooter: document.getElementById('btn-close-detail-footer'),
    btnPlaySpeech: document.getElementById('btn-play-speech'),
    audioSoundwave: document.getElementById('audio-soundwave'),
    detailFullDefinition: document.getElementById('detail-full-definition'),
    detailPracticalUse: document.getElementById('detail-practical-use'),
    detailAdvantagesList: document.getElementById('detail-advantages-list'),
    detailChallengesList: document.getElementById('detail-challenges-list'),
    detailCodeBlockWrapper: document.getElementById('detail-code-block-wrapper'),
    detailCodeContent: document.getElementById('detail-code-content'),
    detailRelatedCloud: document.getElementById('detail-related-cloud'),
    detailViewsCount: document.getElementById('detail-views-count'),
    btnCopyTermMarkdown: document.getElementById('btn-copy-term-markdown'),

    // Quiz Elements
    quizBtn: document.getElementById('btn-open-quiz'),
    quizDialog: document.getElementById('quiz-dialog'),
    btnCloseQuiz: document.getElementById('btn-close-quiz'),
    quizProgressText: document.getElementById('quiz-progress-text'),
    quizScoreText: document.getElementById('quiz-score-text'),
    quizQuestionContent: document.getElementById('quiz-question-content'),
    quizOptionsContainer: document.getElementById('quiz-options-container'),
    quizFeedback: document.getElementById('quiz-feedback'),
    btnQuizNext: document.getElementById('btn-quiz-next'),
    btnQuizRestart: document.getElementById('btn-quiz-restart'),
    footerQuizTrigger: document.getElementById('footer-quiz-trigger'),
    footerAllCategories: document.getElementById('footer-all-categories'),

    // Add Term Modal Elements
    btnAddTermOpen: document.getElementById('btn-open-add-modal'),
    addTermDialog: document.getElementById('add-term-dialog'),
    addTermForm: document.getElementById('add-term-form'),
    btnCloseAddModal: document.getElementById('btn-close-add-modal'),
    btnCancelAdd: document.getElementById('btn-cancel-add'),

    // Toast Container
    toastContainer: document.getElementById('toast-container')
  };

  // --- 3. Initialization ---
  function init() {
    loadSavedTheme();
    loadTermsData();
    renderCategoryTabs();
    applyViewMode(state.viewMode);
    setupEventListeners();
    updateUI();
  }

  // --- 4. Data Loading & Persistence ---
  function loadTermsData() {
    const customTerms = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_TERMS) || '[]');
    // Combine base dataset with custom terms
    state.terms = [...INITIAL_GLOSSARY_DATA, ...customTerms];
  }

  function saveBookmarks() {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([...state.bookmarks]));
    updateBookmarkBadge();
    updateLearningTracker();
  }

  function saveViewed() {
    localStorage.setItem(STORAGE_KEYS.VIEWED, JSON.stringify([...state.viewed]));
    updateLearningTracker();
  }

  function saveCustomTerm(newTerm) {
    const customTerms = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_TERMS) || '[]');
    customTerms.unshift(newTerm);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TERMS, JSON.stringify(customTerms));
    state.terms.unshift(newTerm);
    updateUI();
    showToast(`用語「${newTerm.title}」を正常に追加しました！`);
  }

  // --- 5. Theme Handling ---
  function loadSavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    dom.html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (dom.themeIcon) {
      dom.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  function toggleTheme() {
    const current = dom.html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // --- 6. View Mode Switching ---
  function applyViewMode(mode) {
    state.viewMode = mode;
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
    if (mode === 'list') {
      dom.glossaryGrid.classList.add('view-list');
      dom.btnViewList.classList.add('active');
      dom.btnViewGrid.classList.remove('active');
    } else {
      dom.glossaryGrid.classList.remove('view-list');
      dom.btnViewGrid.classList.add('active');
      dom.btnViewList.classList.remove('active');
    }
  }

  // --- 7. Category & Tag Rendering ---
  function renderCategoryTabs() {
    if (!dom.categoryTabs) return;
    dom.categoryTabs.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `tab-btn ${state.currentCategory === cat.id ? 'active' : ''}`;
      button.dataset.category = cat.id;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', state.currentCategory === cat.id ? 'true' : 'false');

      // Count terms for this category
      const count = cat.id === 'all' 
        ? state.terms.length 
        : state.terms.filter(t => t.category === cat.id).length;

      button.innerHTML = `
        <span aria-hidden="true">${cat.icon}</span>
        <span>${cat.name}</span>
        <span class="tab-count-badge">${count}</span>
      `;

      button.addEventListener('click', () => {
        state.currentCategory = cat.id;
        state.showOnlyBookmarks = false;
        dom.bookmarkToggleBtn.classList.remove('btn-action-primary');
        updateCategoryTabsState();
        filterAndRenderCards();
      });

      dom.categoryTabs.appendChild(button);
    });
  }

  function updateCategoryTabsState() {
    const tabs = dom.categoryTabs.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      const isActive = tab.dataset.category === state.currentCategory && !state.showOnlyBookmarks;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // --- 8. Filter, Search, and Sort Logic ---
  function getFilteredTerms() {
    let result = [...state.terms];

    // Bookmark filter
    if (state.showOnlyBookmarks) {
      result = result.filter(item => state.bookmarks.has(item.id));
    }

    // Category filter
    if (state.currentCategory !== 'all') {
      result = result.filter(item => item.category === state.currentCategory);
    }

    // Tag filter
    if (state.currentTag !== 'all') {
      result = result.filter(item => item.tags && item.tags.some(tag => tag.includes(state.currentTag)));
    }

    // Search query filter (normalizing hiragana / katakana / romaji / english)
    const query = state.searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(item => {
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const furiganaMatch = (item.furigana || '').toLowerCase().includes(query);
        const enMatch = (item.enTitle || '').toLowerCase().includes(query);
        const summaryMatch = (item.summary || '').toLowerCase().includes(query);
        const defMatch = (item.definition || '').toLowerCase().includes(query);
        const tagMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(query));
        return titleMatch || furiganaMatch || enMatch || summaryMatch || defMatch || tagMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (state.sortBy === 'popular') {
        return (b.views || 0) - (a.views || 0);
      }
      if (state.sortBy === 'furigana') {
        return (a.furigana || a.title).localeCompare(b.furigana || b.title, 'ja');
      }
      if (state.sortBy === 'recent') {
        return -1; // Keep custom terms at top
      }
      return 0;
    });

    return result;
  }

  // --- 9. Render Glossary Cards ---
  function filterAndRenderCards() {
    const filtered = getFilteredTerms();
    dom.resultsCount.textContent = filtered.length;

    // Check if any filter is active
    const isFiltered = state.currentCategory !== 'all' || 
                       state.currentTag !== 'all' || 
                       state.searchQuery.trim() !== '' || 
                       state.showOnlyBookmarks;

    dom.btnResetFilters.style.display = isFiltered ? 'inline-block' : 'none';

    if (filtered.length === 0) {
      renderEmptyState();
      return;
    }

    dom.glossaryGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    filtered.forEach(term => {
      const card = document.createElement('article');
      card.className = 'term-card';
      card.dataset.id = term.id;
      card.dataset.category = term.category;
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `${term.title} の詳細を表示`);

      const isBookmarked = state.bookmarks.has(term.id);

      // Build tags markup
      const tagsMarkup = (term.tags || []).slice(0, 3).map(tag => 
        `<span class="tag-mini">#${escapeHtml(tag)}</span>`
      ).join('');

      card.innerHTML = `
        <div class="card-header-meta">
          <span class="card-category-tag">${escapeHtml(term.categoryName || 'テクノロジー')}</span>
          <div class="card-actions-inline">
            <span class="tag-mini">${escapeHtml(term.level || '中級')}</span>
            <button type="button" class="btn-card-fav ${isBookmarked ? 'bookmarked' : ''}" 
                    aria-label="${isBookmarked ? 'お気に入りから削除' : 'お気に入りに追加'}" 
                    title="お気に入り切り替え" data-id="${term.id}">
              ♥
            </button>
          </div>
        </div>

        <div class="term-main-info">
          <p class="term-furigana">${escapeHtml(term.furigana || '')}</p>
          <h2 class="term-title">${escapeHtml(term.title)}</h2>
          <p class="term-en-title">${escapeHtml(term.enTitle || '')}</p>
        </div>

        <p class="term-summary">${escapeHtml(term.summary)}</p>

        <div class="card-footer-tags">
          <div class="tag-list-chips">
            ${tagsMarkup}
          </div>
          <span class="card-click-hint">詳細を見る →</span>
        </div>
      `;

      // Event listener for favorite button click (stopPropagation to avoid opening modal)
      const favBtn = card.querySelector('.btn-card-fav');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(term.id, favBtn);
      });

      // Card click opens modal
      card.addEventListener('click', () => {
        openTermDetail(term);
      });

      // Keyboard accessible Enter / Space key
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openTermDetail(term);
        }
      });

      fragment.appendChild(card);
    });

    dom.glossaryGrid.appendChild(fragment);
  }

  function renderEmptyState() {
    dom.glossaryGrid.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-state-icon" aria-hidden="true">🔍</div>
        <h3 class="empty-state-title">該当する用語が見つかりませんでした</h3>
        <p class="empty-state-desc">
          検索キーワードを変更するか、フィルター条件をリセットしてみてください。<br>
          「用語を追加」ボタンから新しい用語をご自身で登録することも可能です。
        </p>
        <button type="button" class="btn-action btn-action-primary" id="btn-empty-reset">
          すべての条件をクリアする
        </button>
      </div>
    `;

    document.getElementById('btn-empty-reset')?.addEventListener('click', resetAllFilters);
  }

  // --- 10. Bookmarks Handling ---
  function toggleBookmark(termId, btnElement = null) {
    if (state.bookmarks.has(termId)) {
      state.bookmarks.delete(termId);
      showToast('お気に入りから解除しました');
    } else {
      state.bookmarks.add(termId);
      showToast('お気に入りに保存しました ♥');
    }

    saveBookmarks();

    if (btnElement) {
      btnElement.classList.toggle('bookmarked', state.bookmarks.has(termId));
    }

    if (dom.detailBtnFav && state.currentModalTerm && state.currentModalTerm.id === termId) {
      dom.detailBtnFav.classList.toggle('bookmarked', state.bookmarks.has(termId));
    }

    if (state.showOnlyBookmarks) {
      filterAndRenderCards();
    }
  }

  function updateBookmarkBadge() {
    dom.bookmarkBadge.textContent = state.bookmarks.size;
  }

  // --- 11. Learning Tracker Calculation ---
  function updateLearningTracker() {
    const total = state.terms.length;
    if (total === 0) return;

    dom.metricTotalTerms.textContent = total;
    dom.trackerViewedCount.textContent = state.viewed.size;
    dom.trackerBookmarkedCount.textContent = state.bookmarks.size;

    // Calculate percentage based on unique terms interacted with
    const interacted = new Set([...state.viewed, ...state.bookmarks]).size;
    const percent = Math.min(100, Math.round((interacted / total) * 100));

    dom.trackerPercentText.textContent = `${percent}%`;
    dom.trackerProgressFill.style.width = `${percent}%`;
  }

  // --- 12. Term Detail Modal Native HTML Dialog ---
  function openTermDetail(term) {
    if (!term) return;
    state.currentModalTerm = term;

    // Mark as viewed
    state.viewed.add(term.id);
    term.views = (term.views || 0) + 1;
    saveViewed();

    // Populate modal elements
    dom.detailCategoryTag.textContent = term.categoryName || 'テクノロジー';
    dom.detailLevelTag.textContent = term.level || '中級';
    dom.detailFurigana.textContent = term.furigana || '';
    dom.detailTitle.textContent = term.title;
    dom.detailEnTitle.textContent = term.enTitle || '';
    dom.detailViewsCount.textContent = (term.views || 1).toLocaleString('ja-JP');

    // Favorite button state
    dom.detailBtnFav.classList.toggle('bookmarked', state.bookmarks.has(term.id));

    // Texts
    dom.detailFullDefinition.textContent = term.definition || term.summary;
    dom.detailPracticalUse.textContent = term.practicalUse || '現場での標準的な活用プラクティスに基づきます。';

    // Advantages
    dom.detailAdvantagesList.innerHTML = '';
    const advantages = term.advantages && term.advantages.length ? term.advantages : ['運用の効率化と品質向上に寄与'];
    advantages.forEach(adv => {
      const li = document.createElement('li');
      li.textContent = adv;
      dom.detailAdvantagesList.appendChild(li);
    });

    // Challenges
    dom.detailChallengesList.innerHTML = '';
    const challenges = term.challenges && term.challenges.length ? term.challenges : ['環境に応じた適切な設計とチューニングが必要'];
    challenges.forEach(ch => {
      const li = document.createElement('li');
      li.textContent = ch;
      dom.detailChallengesList.appendChild(li);
    });

    // Code Snippet
    if (term.codeSnippet) {
      dom.detailCodeBlockWrapper.style.display = 'block';
      dom.detailCodeContent.textContent = term.codeSnippet;
    } else {
      dom.detailCodeBlockWrapper.style.display = 'none';
    }

    // Related Terms Links
    dom.detailRelatedCloud.innerHTML = '';
    const relatedList = term.relatedIds || [];
    if (relatedList.length > 0) {
      relatedList.forEach(relId => {
        const relatedItem = state.terms.find(t => t.id === relId);
        if (relatedItem) {
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'related-term-chip';
          chip.innerHTML = `<span>🔗</span> ${escapeHtml(relatedItem.title)}`;
          chip.addEventListener('click', () => {
            openTermDetail(relatedItem);
          });
          dom.detailRelatedCloud.appendChild(chip);
        }
      });
    } else {
      dom.detailRelatedCloud.innerHTML = '<span style="font-size: 0.85rem; color: var(--text-tertiary);">関連用語はありません</span>';
    }

    // Open native dialog
    if (typeof dom.detailDialog.showModal === 'function') {
      dom.detailDialog.showModal();
    } else {
      dom.detailDialog.setAttribute('open', '');
    }
  }

  function closeDetailModal() {
    stopSpeechSynthesis();
    if (typeof dom.detailDialog.close === 'function') {
      dom.detailDialog.close();
    } else {
      dom.detailDialog.removeAttribute('open');
    }
  }

  // --- 13. Web Speech API Japanese Pronunciation ---
  let speechSynth = window.speechSynthesis;
  let activeUtterance = null;

  function playJapanesePronunciation() {
    if (!speechSynth) {
      showToast('お使いのブラウザは音声合成に対応していません');
      return;
    }

    if (speechSynth.speaking) {
      stopSpeechSynthesis();
      return;
    }

    const term = state.currentModalTerm;
    if (!term) return;

    // Speech text: title followed by furigana reading
    const textToSpeak = `${term.title}。${term.furigana || ''}`;
    activeUtterance = new SpeechSynthesisUtterance(textToSpeak);
    activeUtterance.lang = 'ja-JP';
    activeUtterance.rate = 0.95; // Slightly slower for clarity
    activeUtterance.pitch = 1.0;

    dom.audioSoundwave.classList.add('playing');
    dom.btnPlaySpeech.innerHTML = `<span aria-hidden="true">⏹</span> 発音を停止`;

    activeUtterance.onend = () => {
      stopSpeechSynthesis();
    };

    activeUtterance.onerror = () => {
      stopSpeechSynthesis();
    };

    speechSynth.speak(activeUtterance);
  }

  function stopSpeechSynthesis() {
    if (speechSynth) {
      speechSynth.cancel();
    }
    if (dom.audioSoundwave) {
      dom.audioSoundwave.classList.remove('playing');
    }
    if (dom.btnPlaySpeech) {
      dom.btnPlaySpeech.innerHTML = `<span aria-hidden="true">🔊</span> 日本語音声を発音`;
    }
  }

  // --- 14. 1-Minute Quiz Engine ---
  function openQuiz() {
    // Generate 5 random questions
    const shuffled = [...state.terms].sort(() => 0.5 - Math.random());
    state.quiz.questions = shuffled.slice(0, Math.min(5, shuffled.length));
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.answered = false;

    renderCurrentQuizQuestion();
    dom.btnQuizRestart.style.display = 'none';

    if (typeof dom.quizDialog.showModal === 'function') {
      dom.quizDialog.showModal();
    } else {
      dom.quizDialog.setAttribute('open', '');
    }
  }

  function renderCurrentQuizQuestion() {
    const qIndex = state.quiz.currentIndex;
    const questions = state.quiz.questions;

    if (qIndex >= questions.length) {
      // Quiz completed!
      renderQuizSummary();
      return;
    }

    state.quiz.answered = false;
    dom.btnQuizNext.style.display = 'none';
    dom.quizFeedback.className = 'quiz-feedback-box';
    dom.quizFeedback.innerHTML = '';

    const currentTarget = questions[qIndex];
    dom.quizProgressText.textContent = `${qIndex + 1} / ${questions.length}`;
    dom.quizScoreText.textContent = `${state.quiz.score} 点`;

    dom.quizQuestionContent.textContent = `【説明】${currentTarget.summary}`;

    // Generate 4 choices (1 correct, 3 wrong distractors)
    const distractors = state.terms
      .filter(t => t.id !== currentTarget.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const choices = [currentTarget, ...distractors].sort(() => 0.5 - Math.random());

    dom.quizOptionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="quiz-option-marker">${letters[idx]}</span>
        <span>${escapeHtml(choice.title)} <span style="font-size: 0.8rem; color: var(--text-tertiary);">(${escapeHtml(choice.categoryName || '')})</span></span>
      `;

      btn.addEventListener('click', () => {
        handleQuizAnswer(choice.id === currentTarget.id, currentTarget, btn);
      });

      dom.quizOptionsContainer.appendChild(btn);
    });
  }

  function handleQuizAnswer(isCorrect, targetTerm, clickedBtn) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;

    const allButtons = dom.quizOptionsContainer.querySelectorAll('.quiz-option-btn');
    allButtons.forEach(btn => (btn.disabled = true));

    if (isCorrect) {
      state.quiz.score += 20;
      clickedBtn.classList.add('correct');
      dom.quizFeedback.className = 'quiz-feedback-box active is-correct';
      dom.quizFeedback.innerHTML = `
        <strong>🎉 正解です！</strong><br>
        「${escapeHtml(targetTerm.title)}」: ${escapeHtml(targetTerm.definition.slice(0, 80))}...
      `;
    } else {
      clickedBtn.classList.add('wrong');
      // Highlight the correct one
      allButtons.forEach(b => {
        if (b.textContent.includes(targetTerm.title)) {
          b.classList.add('correct');
        }
      });
      dom.quizFeedback.className = 'quiz-feedback-box active is-wrong';
      dom.quizFeedback.innerHTML = `
        <strong>✕ 残念、不正解です</strong><br>
        正解は「<strong>${escapeHtml(targetTerm.title)}</strong>」でした。
      `;
    }

    dom.quizScoreText.textContent = `${state.quiz.score} 点`;
    dom.btnQuizNext.style.display = 'inline-block';
  }

  function renderQuizSummary() {
    dom.quizQuestionContent.textContent = 'お疲れ様でした！クイズ完了です。';
    dom.quizOptionsContainer.innerHTML = '';
    dom.btnQuizNext.style.display = 'none';
    dom.btnQuizRestart.style.display = 'inline-block';

    const finalScore = state.quiz.score;
    let comment = '素晴らしい！先端テクノロジーへの深い理解をお持ちです。';
    if (finalScore < 60) {
      comment = 'もう一歩！気になる用語を復習して再挑戦してみましょう。';
    }

    dom.quizFeedback.className = 'quiz-feedback-box active is-correct';
    dom.quizFeedback.innerHTML = `
      <div style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
        あなたのスコア: ${finalScore} 点 / 100点
      </div>
      <p style="line-height: 1.6;">${comment}</p>
    `;
  }

  // --- 15. Add Custom Term Handler ---
  function openAddModal() {
    dom.addTermForm.reset();
    if (typeof dom.addTermDialog.showModal === 'function') {
      dom.addTermDialog.showModal();
    } else {
      dom.addTermDialog.setAttribute('open', '');
    }
  }

  function closeAddModal() {
    if (typeof dom.addTermDialog.close === 'function') {
      dom.addTermDialog.close();
    } else {
      dom.addTermDialog.removeAttribute('open');
    }
  }

  function handleAddTermSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('new-term-title').value.trim();
    const furigana = document.getElementById('new-term-furigana').value.trim();
    const enTitle = document.getElementById('new-term-en').value.trim();
    const category = document.getElementById('new-term-category').value;
    const level = document.getElementById('new-term-level').value;
    const rawTags = document.getElementById('new-term-tags').value.trim();
    const summary = document.getElementById('new-term-summary').value.trim();
    const definition = document.getElementById('new-term-definition').value.trim();
    const practicalUse = document.getElementById('new-term-practical').value.trim();

    if (!title || !furigana || !summary || !definition) {
      alert('必須項目をすべて入力してください。');
      return;
    }

    const categoryMap = {
      ai: 'AI・機械学習',
      web: 'モダンWeb・クラウド',
      design: 'UI/UXデザイン',
      trend: '次世代トレンド'
    };

    const tags = rawTags ? rawTags.split(',').map(t => t.trim()).filter(Boolean) : ['カスタム登録'];

    const newTerm = {
      id: 'custom-' + Date.now(),
      title,
      furigana,
      enTitle,
      category,
      categoryName: categoryMap[category] || 'カスタム',
      level,
      tags,
      views: 1,
      isPopular: false,
      summary,
      definition,
      practicalUse: practicalUse || 'ユーザー自身によるカスタム追加ナレッジです。',
      advantages: ['自社固有のナレッジを自由に一元化可能'],
      challenges: ['継続的な情報アップデートが推奨されます'],
      relatedIds: []
    };

    saveCustomTerm(newTerm);
    closeAddModal();
  }

  // --- 16. Markdown Copy & Share ---
  function copyTermMarkdown() {
    const term = state.currentModalTerm;
    if (!term) return;

    const md = `### ${term.title} (${term.enTitle || ''})
**読みがな**: ${term.furigana || ''} | **カテゴリ**: ${term.categoryName}

**概要**:
${term.summary}

**詳細定義**:
${term.definition}

**ユースケース**:
${term.practicalUse}

*(出典: KOTOBA LAB 用語図鑑)*`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(() => {
        showToast('Markdown形式でクリップボードにコピーしました！');
      }).catch(() => {
        fallbackCopy(md);
      });
    } else {
      fallbackCopy(md);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('クリップボードにコピーしました！');
    } catch (err) {
      showToast('コピーに失敗しました');
    }
    document.body.removeChild(textarea);
  }

  // --- 17. Toast System ---
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  // --- 18. Filter Reset Helper ---
  function resetAllFilters() {
    state.currentCategory = 'all';
    state.currentTag = 'all';
    state.searchQuery = '';
    state.showOnlyBookmarks = false;
    dom.searchInput.value = '';
    dom.clearSearchBtn.classList.remove('active');

    // Reset Tag Chips
    dom.tagChipsContainer.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.tag === 'all');
    });

    dom.bookmarkToggleBtn.classList.remove('btn-action-primary');
    updateCategoryTabsState();
    filterAndRenderCards();
  }

  // --- 19. Event Listeners ---
  function setupEventListeners() {
    // Theme Switcher
    dom.themeToggleBtn.addEventListener('click', toggleTheme);

    // Bookmarks Toggle
    dom.bookmarkToggleBtn.addEventListener('click', () => {
      state.showOnlyBookmarks = !state.showOnlyBookmarks;
      dom.bookmarkToggleBtn.classList.toggle('btn-action-primary', state.showOnlyBookmarks);
      updateCategoryTabsState();
      filterAndRenderCards();
    });

    // Brand Home Link
    dom.brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Search Input Real-time
    dom.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      dom.clearSearchBtn.classList.toggle('active', !!state.searchQuery);
      filterAndRenderCards();
    });

    dom.clearSearchBtn.addEventListener('click', () => {
      dom.searchInput.value = '';
      state.searchQuery = '';
      dom.clearSearchBtn.classList.remove('active');
      filterAndRenderCards();
      dom.searchInput.focus();
    });

    // Tag Filter Chips
    dom.tagChipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      dom.tagChipsContainer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      state.currentTag = chip.dataset.tag;
      filterAndRenderCards();
    });

    // Sort Dropdown
    dom.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      filterAndRenderCards();
    });

    // View Switcher (Grid / List)
    dom.btnViewGrid.addEventListener('click', () => applyViewMode('grid'));
    dom.btnViewList.addEventListener('click', () => applyViewMode('list'));

    // Filter Reset Button
    dom.btnResetFilters.addEventListener('click', resetAllFilters);

    // Detail Modal Events
    dom.btnCloseDetail.addEventListener('click', closeDetailModal);
    dom.btnCloseDetailFooter.addEventListener('click', closeDetailModal);
    dom.detailBtnFav.addEventListener('click', () => {
      if (state.currentModalTerm) {
        toggleBookmark(state.currentModalTerm.id);
      }
    });
    dom.btnPlaySpeech.addEventListener('click', playJapanesePronunciation);
    dom.btnCopyTermMarkdown.addEventListener('click', copyTermMarkdown);

    // Light-dismiss dialog on backdrop click
    dom.detailDialog.addEventListener('click', (e) => {
      const rect = dom.detailDialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        closeDetailModal();
      }
    });

    // Quiz Events
    dom.quizBtn.addEventListener('click', openQuiz);
    dom.footerQuizTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openQuiz();
    });
    dom.btnCloseQuiz.addEventListener('click', () => {
      if (typeof dom.quizDialog.close === 'function') dom.quizDialog.close();
    });
    dom.btnQuizNext.addEventListener('click', () => {
      state.quiz.currentIndex++;
      renderCurrentQuizQuestion();
    });
    dom.btnQuizRestart.addEventListener('click', openQuiz);

    dom.quizDialog.addEventListener('click', (e) => {
      const rect = dom.quizDialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        dom.quizDialog.close();
      }
    });

    // Add Term Events
    dom.btnAddTermOpen.addEventListener('click', openAddModal);
    dom.btnCloseAddModal.addEventListener('click', closeAddModal);
    dom.btnCancelAdd.addEventListener('click', closeAddModal);
    dom.addTermForm.addEventListener('submit', handleAddTermSubmit);

    dom.addTermDialog.addEventListener('click', (e) => {
      const rect = dom.addTermDialog.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        closeAddModal();
      }
    });

    // Footer categories trigger
    dom.footerAllCategories.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
      dom.categoryTabs.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --- 20. Helpers & Utilities ---
  function updateUI() {
    updateBookmarkBadge();
    updateLearningTracker();
    filterAndRenderCards();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Start app on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
