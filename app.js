/**
 * Daily Companion — 主应用逻辑
 * 全天候主动陪伴 · 晨间知识 · 待办追踪 · 晚间复盘
 */

// 音效系统兜底（防止 sound.js 加载失败导致崩溃）
if (typeof SoundSystem === 'undefined') {
  window.SoundSystem = {
    enabled: false,
    init() {}, resume() {}, toggle() { return false; },
    playChime() {}, playMessage() {}, playSend() {},
    playSuccess() {}, playCheck() {}, playOpen() {},
    playClose() {}, playError() {}, playAmbient() {}
  };
}

const App = {
  // ========== 状态 ==========
  state: {
    currentFlow: null,     // 当前对话流程: morning | todo | evening | idle
    flowStep: 0,           // 流程中的步骤
    todayTodos: [],        // 今日待办
    history: [],           // 聊天记录
    knowledgeLearned: [],  // 今日已学知识
    growthNotes: [],       // 成长记录
    morningDone: false,
    todoDone: false,
    eveningDone: false,
    lastDate: null,
    firstUseDate: null,    // 首次使用日期，用于阅读难度递增
  },

  // ========== 初始化 ==========
  init() {
    this.loadState();
    this.checkNewDay();
    this.initUI();
    this.initEvents();
    this.startScheduler();
    this.updateLiveTime();
    setInterval(() => this.updateLiveTime(), 1000);

    // 初始化阅读专区
    this.initReading();

    // 首次音效初始化（需用户交互后）
    const initSound = () => {
      SoundSystem.init();
      SoundSystem.resume();
    };
    document.addEventListener('click', initSound, { once: true });
    document.addEventListener('keydown', initSound, { once: true });

    // 延迟欢迎
    setTimeout(() => {
      this.showWelcomeBack();
    }, 800);
  },

  // ========== 数据持久化 ==========
  loadState() {
    const saved = localStorage.getItem('dc_state');
    if (saved) {
      const data = JSON.parse(saved);
      this.state = { ...this.state, ...data };
    }
  },

  saveState() {
    localStorage.setItem('dc_state', JSON.stringify(this.state));
  },

  checkNewDay() {
    const today = new Date().toISOString().split('T')[0];
    if (this.state.lastDate !== today) {
      // 新的一天，重置当日状态
      this.state.lastDate = today;
      this.state.morningDone = false;
      this.state.todoDone = false;
      this.state.eveningDone = false;
      this.state.knowledgeLearned = [];
      this.state.growthNotes = [];
      // 待办保留，但标记为昨日
      this.state.todayTodos = this.state.todayTodos || [];

      // 首次使用日期记录（用于阅读难度递增）
      if (!this.state.firstUseDate) {
        this.state.firstUseDate = today;
      }

      this.saveState();
    }
    // 确保首次使用日期已记录（兼容老用户）
    if (!this.state.firstUseDate) {
      this.state.firstUseDate = today;
      this.saveState();
    }
  },

  // 计算当前学习周数（从0开始）
  getLearningWeek() {
    if (!this.state.firstUseDate) return 0;
    const first = new Date(this.state.firstUseDate);
    const now = new Date();
    const diffMs = now - first;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7);
  },

  // ========== UI 初始化 ==========
  initUI() {
    // 音效开关
    const soundBtn = document.getElementById('soundToggle');
    if (typeof SoundSystem !== 'undefined') {
      if (!SoundSystem.enabled) soundBtn.classList.remove('active');
      else soundBtn.classList.add('active');
    }

    // 渲染待办
    this.renderTodos();

    // 更新时间轴状态
    this.updateTimeline();
  },

  initEvents() {
    // 发送消息
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('btnSend');

    sendBtn.addEventListener('click', () => this.handleUserInput());
    // 移动端兼容：同时监听 touchend 防止点击失效
    sendBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.handleUserInput();
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleUserInput();
    });

    // 音效开关
    document.getElementById('soundToggle').addEventListener('click', (e) => {
      const on = SoundSystem.toggle();
      e.currentTarget.classList.toggle('active', on);
      this.showToast(on ? '🔔 音效已开启' : '🔕 音效已关闭');
    });

    // 主题切换
    document.getElementById('themeToggle').addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('dc_theme', isDark ? 'light' : 'dark');
    });
    const savedTheme = localStorage.getItem('dc_theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

    // 待办弹窗
    document.getElementById('btnAddTodo').addEventListener('click', () => this.openTodoModal());
    document.getElementById('btnCloseTodo').addEventListener('click', () => this.closeTodoModal());
    document.getElementById('btnCancelTodo').addEventListener('click', () => this.closeTodoModal());
    document.getElementById('btnConfirmTodo').addEventListener('click', () => this.confirmAddTodo());

    // 优先级选择
    document.querySelectorAll('.priority-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // 复盘弹窗
    document.getElementById('btnReview').addEventListener('click', () => this.openReviewModal());
    document.getElementById('btnCloseReview').addEventListener('click', () => this.closeReviewModal());

    // 复盘标签页
    document.querySelectorAll('.review-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.review-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderReviewContent(tab.dataset.tab);
      });
    });

    // 移动端侧边栏切换
    const btnMenu = document.getElementById('btnMenu');
    const sidePanel = document.getElementById('sidePanel');
    const sidePanelOverlay = document.getElementById('sidePanelOverlay');
    if (btnMenu && sidePanel && sidePanelOverlay) {
      btnMenu.addEventListener('click', () => {
        sidePanel.classList.toggle('open');
        sidePanelOverlay.classList.toggle('show');
      });
      sidePanelOverlay.addEventListener('click', () => {
        sidePanel.classList.remove('open');
        sidePanelOverlay.classList.remove('show');
      });
    }

    // 点击遮罩关闭弹窗
    document.getElementById('todoModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeTodoModal();
    });
    document.getElementById('reviewModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeReviewModal();
    });

    // 移动端键盘弹出适配
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    if (chatInput && chatMessages) {
      chatInput.addEventListener('focus', () => {
        // 输入框聚焦时，延迟滚动到底部，确保键盘弹出后消息可见
        setTimeout(() => {
          this.scrollToBottom();
          // iOS 上滚动输入框到可视区域
          if ('visualViewport' in window) {
            const vv = window.visualViewport;
            const inputRect = chatInput.getBoundingClientRect();
            const keyboardTop = vv.height + vv.offsetTop;
            if (inputRect.bottom > keyboardTop - 20) {
              window.scrollBy(0, inputRect.bottom - keyboardTop + 80);
            }
          }
        }, 300);
      });
    }

    // 阅读面板事件
    document.getElementById('btnOpenReading').addEventListener('click', () => this.openReadingModal());
    document.getElementById('btnCloseReading').addEventListener('click', () => this.closeReadingModal());
    document.getElementById('btnBackToList').addEventListener('click', () => this.showStoryList());
    document.getElementById('readingModal').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) this.closeReadingModal();
    });

    // 单词发音按钮
    const tooltipSpeaker = document.getElementById('tooltipSpeaker');
    if (tooltipSpeaker) {
      tooltipSpeaker.addEventListener('click', () => this.speakTooltipWord());
    }

    // 点击页面其他地方关闭查词卡片
    document.addEventListener('click', (e) => {
      const tooltip = document.getElementById('wordTooltip');
      if (tooltip && !tooltip.contains(e.target) && !e.target.classList.contains('story-word')) {
        tooltip.classList.remove('show');
      }
    });
  },

  // ========== 定时调度器 ==========
  startScheduler() {
    // 每分钟检查一次
    setInterval(() => this.checkSchedule(), 60000);
    // 启动时立即检查
    this.checkSchedule();
  },

  checkSchedule() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // 09:00 晨间知识（如果页面正好开着）
    if (hour === 9 && minute === 0 && !this.state.morningDone) {
      this.sendAIMessage('🌅 早上九点啦！小咪来陪你开启今天的学习时光～');
      setTimeout(() => this.proactivePush(hour), 1500);
    }

    // 12:00 午间问候（如果页面正好开着）
    if (hour === 12 && minute === 0) {
      this.sendAIMessage('☀️ 中午十二点啦！上午过得怎么样？记得休息一下哦～');
    }

    // 15:00 下午提醒（如果页面正好开着）
    if (hour === 15 && minute === 0) {
      const todoCount = this.state.todayTodos.length;
      const doneCount = this.state.todayTodos.filter(t => t.done).length;
      if (todoCount > 0 && doneCount < todoCount) {
        this.sendAIMessage(`🌤️ 下午三点啦！今日待办还有 <strong>${todoCount - doneCount}</strong> 项未完成，加油！`);
      }
    }

    // 18:00 晚间复盘（如果页面正好开着）
    if (hour === 18 && minute === 0 && !this.state.eveningDone) {
      this.sendAIMessage('🌙 晚上六点啦！来做一下晚间复盘吧～');
      setTimeout(() => this.triggerEveningFlow(), 2000);
    }

    // 22:00 晚安提醒（如果页面正好开着）
    if (hour === 22 && minute === 0) {
      this.sendAIMessage('🌙 晚上十点啦！该准备休息咯，明天见～');
    }

    this.updateTimeline();
  },

  updateTimeline() {
    const hour = new Date().getHours();

    // 更新时间点状态
    const setStatus = (id, done, active) => {
      const el = document.getElementById(id);
      const dot = document.getElementById(id.replace('status', 'dot'));
      if (!el || !dot) return;
      el.textContent = done ? '已完成' : active ? '进行中' : '待开始';
      el.classList.toggle('done', done);
      dot.classList.toggle('done', done);
      dot.classList.toggle('active', active && !done);
    };

    setStatus('status9', this.state.morningDone, hour >= 9 && hour < 12);
    setStatus('status9sub', this.state.todoDone, this.state.currentFlow === 'todo');
    setStatus('status18', this.state.eveningDone, hour >= 18);
  },

  updateLiveTime() {
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const liveTimeEl = document.getElementById('liveTime');
      const currentTimeEl = document.getElementById('currentTime');
      if (liveTimeEl) liveTimeEl.textContent = timeStr;
      if (currentTimeEl) currentTimeEl.textContent = timeStr;
    } catch (e) {
      // 静默处理，避免定时器崩溃
    }
  },

  // ========== 欢迎回来 ==========
  showWelcomeBack() {
    const hour = new Date().getHours();
    let greeting = '你好呀';
    if (hour < 6) greeting = '晚上好';
    else if (hour < 12) greeting = '早上好';
    else if (hour < 18) greeting = '下午好';
    else greeting = '晚上好';

    // 基础欢迎语
    this.sendAIMessage(`${greeting}！我是 <strong>小咪</strong>，你的全天候陪伴助手 ✨<br>现在时间是 <strong>${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</strong>，让我们一起度过美好的一天吧～`, { delay: 500 });
    SoundSystem.playAmbient();

    // 根据时间段主动推送内容
    setTimeout(() => this.proactivePush(hour), 1800);
  },

  // 根据时间段主动推送
  proactivePush(hour) {
    // 早上 6-11点：推送晨间知识（如果还没做过）
    if (hour >= 6 && hour < 12 && !this.state.morningDone) {
      this.sendAIMessage('🌅 新的一天开始啦！我为你准备了今日的知识卡片，一起来看看吧～');
      setTimeout(() => {
        const knowledge = KnowledgeDB.getAllToday();
        this.showKnowledgeCard(knowledge.word);
        this.state.knowledgeLearned = Object.values(knowledge);
        this.state.morningDone = true;
        this.saveState();
      }, 1200);
      setTimeout(() => {
        this.showKnowledgeCard(KnowledgeDB.getAllToday().tech);
      }, 3500);
      setTimeout(() => {
        this.sendAIMessage('还想继续学习吗？我可以再给你推送历史或影视知识，也可以去左侧面板看看今日的英文小故事 📚');
        this.setQuickReplies(['历史知识', '影视动画', '看看故事', '先忙了']);
      }, 5500);
      return;
    }

    // 中午 12-14点：推送知识 + 问候
    if (hour >= 12 && hour < 15) {
      const todoCount = this.state.todayTodos.length;
      const doneCount = this.state.todayTodos.filter(t => t.done).length;
      if (todoCount > 0 && doneCount < todoCount) {
        this.sendAIMessage(`☀️ 中午好！上午过得怎么样？你今日还有 <strong>${todoCount - doneCount}</strong> 项待办没完成哦，加油！`);
      } else {
        this.sendAIMessage('☀️ 中午好！上午过得怎么样？来学点新知识提提神吧～');
        setTimeout(() => {
          const history = KnowledgeDB.getToday('history');
          this.showKnowledgeCard(history);
        }, 1500);
      }
      return;
    }

    // 下午 15-17点：推送知识 + 待办提醒
    if (hour >= 15 && hour < 18) {
      const todoCount = this.state.todayTodos.length;
      const doneCount = this.state.todayTodos.filter(t => t.done).length;
      if (todoCount === 0) {
        this.sendAIMessage('🌤️ 下午好！今天还没有添加待办事项呢，要不要现在规划一下？');
        this.setQuickReplies(['添加待办', '先学知识', '待会儿再说']);
      } else if (doneCount < todoCount) {
        this.sendAIMessage(`🌤️ 下午好！今日待办完成了 <strong>${doneCount}/${todoCount}</strong> 项，继续加油！学点新知识放松一下？`);
        setTimeout(() => {
          const movie = KnowledgeDB.getToday('movies');
          this.showKnowledgeCard(movie);
        }, 2000);
      } else {
        this.sendAIMessage('🌤️ 下午好！今天的待办都完成了，太棒了！来学点新知识奖励一下自己～');
        setTimeout(() => {
          const movie = KnowledgeDB.getToday('movies');
          this.showKnowledgeCard(movie);
        }, 1500);
      }
      return;
    }

    // 晚上 18-21点：晚间复盘（如果还没做过）
    if (hour >= 18 && hour < 22 && !this.state.eveningDone) {
      this.sendAIMessage('🌙 晚上好！忙碌的一天快要结束了，来做一下晚间复盘吧～');
      setTimeout(() => {
        this.triggerEveningFlow();
      }, 2000);
      return;
    }

    // 深夜 22-5点：晚安问候
    if (hour >= 22 || hour < 6) {
      this.sendAIMessage('🌙 夜深了，早点休息吧！明天小咪还会准时来陪你～晚安 ✨');
      return;
    }

    // 如果晨间已做但用户再次打开（比如刷新页面），给点新内容
    if (this.state.morningDone && hour < 18) {
      this.sendAIMessage('欢迎回来！今天想聊点什么？我可以给你推送知识、讲英文故事，或者帮你记录待办～');
      this.setQuickReplies(['推送知识', '英文故事', '添加待办', '随便聊聊']);
    }
  },

  // ========== 晨间流程 ==========
  triggerMorningFlow() {
    this.state.currentFlow = 'morning';
    this.state.flowStep = 0;
    this.state.morningDone = true;
    this.saveState();

    const knowledge = KnowledgeDB.getAllToday();
    this.state.knowledgeLearned = Object.values(knowledge);
    this.saveState();

    // 主动发起对话
    setTimeout(() => {
      this.sendAIMessage('🌅 早上好！新的一天开始了，小咪来陪你开启晨间学习时光～');
      SoundSystem.playMessage();
    }, 500);

    setTimeout(() => {
      this.sendAIMessage('今天为你准备了四个领域的知识卡片，我们一起来看看吧！');
    }, 2000);

    // 依次展示四类知识
    const categories = [
      { key: 'word', label: '英文单词', emoji: '📖' },
      { key: 'tech', label: '前沿科技', emoji: '🚀' },
      { key: 'history', label: '历史知识', emoji: '🏛️' },
      { key: 'movie', label: '影视动画', emoji: '🎬' }
    ];

    let delay = 3500;
    categories.forEach((cat, i) => {
      setTimeout(() => {
        this.showKnowledgeCard(knowledge[cat.key]);
        SoundSystem.playChime(600 + i * 100);
      }, delay);
      delay += 3500;
    });

    // 知识展示完毕后，进入待办登记
    setTimeout(() => {
      this.sendAIMessage('晨间知识推送完毕！你对哪一条最感兴趣呢？可以随时和我聊聊～');
      this.setQuickReplies(['学到了！', '很有趣', '继续吧']);
    }, delay + 1000);

    // 延迟后询问待办
    setTimeout(() => {
      this.triggerTodoFlow();
    }, delay + 5000);
  },

  showKnowledgeCard(item) {
    const tags = { words: 'word', tech: 'tech', history: 'history', movies: 'movie' };
    const emojis = { words: '📖', tech: '🚀', history: '🏛️', movies: '🎬' };
    const tag = tags[item.category] || item.category;
    const emoji = emojis[item.category] || '✨';

    let html = `<div class="knowledge-card">`;
    html += `<span class="card-tag ${tag}">${emoji} ${this.getCategoryName(item.category)}</span>`;

    if (item.word) {
      html += `<h4>${item.word}</h4>`;
      html += `<div class="phonetic">${item.phonetic}</div>`;
      html += `<div class="meaning">${item.meaning}</div>`;
      html += `<div class="example">${item.example}</div>`;
    } else if (item.title) {
      html += `<h4>${item.title}</h4>`;
      html += `<div class="meaning">${item.content}</div>`;
      if (item.quote) html += `<div class="quote">${item.quote}</div>`;
      if (item.source) html += `<div class="source">来源：${item.source}</div>`;
      if (item.era) html += `<div class="era">年代：${item.era}</div>`;
    }

    html += `</div>`;

    this.sendAIMessage(html, { isHTML: true });
  },

  getCategoryName(cat) {
    const names = { words: '英文单词', tech: '前沿科技', history: '历史知识', movies: '影视动画' };
    return names[cat] || cat;
  },

  // ========== 待办流程 ==========
  triggerTodoFlow() {
    this.state.currentFlow = 'todo';
    this.state.flowStep = 0;
    this.saveState();

    this.sendAIMessage('📋 接下来，我们来记录一下今天的重要待办事项吧！');
    setTimeout(() => {
      this.sendAIMessage('你今天有什么重要的事情需要完成吗？可以告诉我，我会帮你记下来。');
      this.setQuickReplies(['没有特别的', '有，我来说说', '稍后再记']);
    }, 1500);
  },

  handleTodoInput(text) {
    if (text.includes('没有') || text.includes('暂无') || text.includes('没')) {
      this.sendAIMessage('好的，那今天就轻松度过吧～如果想到什么待办，随时可以在侧边栏添加哦！');
      this.state.todoDone = true;
      this.state.currentFlow = 'idle';
      this.saveState();
      this.setQuickReplies([]);
      return;
    }

    if (text.includes('稍后') || text.includes('等会')) {
      this.sendAIMessage('没问题，待办登记随时可以进行。侧边栏有「添加待办」按钮，想记的时候点一下就好～');
      this.state.currentFlow = 'idle';
      this.saveState();
      this.setQuickReplies([]);
      return;
    }

    // 解析待办
    const todos = text.split(/[,，;；、]/).map(t => t.trim()).filter(t => t.length > 0);
    if (todos.length === 0) {
      this.sendAIMessage('我好像没听清楚，可以再说一遍你的待办事项吗？');
      return;
    }

    todos.forEach(todo => {
      this.addTodo(todo, 'normal');
    });

    this.sendAIMessage(`已记录 <strong>${todos.length}</strong> 条待办事项！你可以在左侧面板查看和管理。`);
    SoundSystem.playSuccess();

    // 提示下半年复盘
    const now = new Date();
    if (now.getMonth() >= 6) { // 下半年
      this.sendAIMessage('📅 对了，现在是下半年了，我会定期帮你回顾待办的完成情况，确保重要事项不遗漏。');
    }

    this.state.todoDone = true;
    this.state.currentFlow = 'idle';
    this.saveState();
    this.setQuickReplies(['谢谢小咪！', '查看待办']);
  },

  // ========== 晚间复盘流程 ==========
  triggerEveningFlow() {
    this.state.currentFlow = 'evening';
    this.state.flowStep = 0;
    this.state.eveningDone = true;
    this.saveState();

    const hour = new Date().getHours();
    const greeting = hour >= 18 ? '晚上好' : '下午好';

    setTimeout(() => {
      this.sendAIMessage(`🌙 ${greeting}！忙碌的一天即将结束，是时候做个小小的复盘了。`);
      SoundSystem.playMessage();
    }, 500);

    setTimeout(() => {
      this.sendAIMessage('今天有什么让你感到开心或有所收获的事情吗？可以和我分享一下～');
      this.setQuickReplies(['学到了新知识', '完成了目标', '度过了平静的一天']);
    }, 2500);
  },

  handleEveningInput(text) {
    // 记录成长
    this.state.growthNotes.push({
      text: text,
      time: new Date().toISOString()
    });
    this.saveState();

    if (this.state.flowStep === 0) {
      this.state.flowStep = 1;
      this.saveState();

      this.sendAIMessage('很棒！记录成长是自我提升的重要一步 ✨');
      setTimeout(() => {
        // 回顾今日知识
        if (this.state.knowledgeLearned.length > 0) {
          const randomKnowledge = this.state.knowledgeLearned[Math.floor(Math.random() * this.state.knowledgeLearned.length)];
          this.sendAIMessage('来做个知识巩固吧！还记得今天学的这条内容吗？');
          this.showKnowledgeCard(randomKnowledge);
        }
      }, 1500);

      setTimeout(() => {
        this.sendAIMessage('今天的陪伴就到这里啦。好好休息，明天见！🌟');
        this.setQuickReplies(['明天见！', '晚安小咪']);
      }, 5000);
    } else {
      this.sendAIMessage('晚安！愿你有个好梦，明天我们继续一起进步～ 🌙');
      this.state.currentFlow = 'idle';
      this.saveState();
      this.setQuickReplies([]);
    }
  },

  // ========== 用户输入处理 ==========
  handleUserInput() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) {
      this.showToast('请先输入内容再发送哦～');
      input.focus();
      return;
    }

    input.value = '';
    this.sendUserMessage(text);
    SoundSystem.playSend();

    // 根据当前流程处理
    if (this.state.currentFlow === 'todo') {
      this.handleTodoInput(text);
    } else if (this.state.currentFlow === 'evening') {
      this.handleEveningInput(text);
    } else {
      this.handleFreeChat(text);
    }
  },

  handleFreeChat(text) {
    // ===== 语义意图识别（按优先级排序）=====

    // 1. 天气查询
    if (/天气|气温|温度|下雨|下雪|雾霾|空气质量/.test(text)) {
      this.sendAIMessage('☁️ 抱歉，我目前还没有接入实时天气数据，没法帮你查天气～推荐用系统天气 App 或搜索引擎查看哦！');
      return;
    }

    // 2. 时间/日期查询
    if (/几点|现在时间|今天几号|星期几|日期/.test(text)) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
      this.sendAIMessage(`🕐 现在是 <strong>${timeStr}</strong>，${dateStr}。`);
      return;
    }

    // 3. 问候/打招呼
    if (/^(你好|您好|嗨|hello|hi|在吗|在嘛)\s*[.!?！？]*$/i.test(text)) {
      this.sendAIMessage('你好呀！我是小咪，有什么我可以帮你的吗？😊');
      return;
    }

    // 4. 询问能力/身份
    if (/你能做什么|你是谁|你有什么功能|你会什么/.test(text)) {
      this.sendAIMessage('我是 <strong>小咪</strong>，你的全天候陪伴助手！我可以：<br>📖 每天推送知识卡片（单词、科技、历史、影视）<br>📝 帮你记录和管理待办事项<br>🌙 晚间陪你复盘成长<br>💬 随时陪你聊天<br><br>试试输入「知识」或「待办」体验一下吧～');
      return;
    }

    // 5. 表达感谢
    if (/谢谢|感谢|多谢/.test(text)) {
      this.sendAIMessage('不客气呀！能帮到你我很开心～随时找我 ✨');
      return;
    }

    // 6. 表达负面情绪
    if (/难过|伤心|累|烦|不开心|郁闷|焦虑/.test(text)) {
      this.sendAIMessage('抱抱你 🤗 每个人都有低落的时候，允许自己休息一会儿。如果想聊聊，我随时在听；如果想转移注意力，我可以给你推送一条有趣的知识～');
      this.setQuickReplies(['推送知识', '我想静静', '谢谢小咪']);
      return;
    }

    // ===== 关键词回应（按优先级排序）=====

    // 1. 具体领域知识（必须在"知识"之前，避免"历史知识"被"知识"拦截）
    if (text.includes('单词') || text.includes('英语')) {
      const word = KnowledgeDB.getToday('words');
      this.showKnowledgeCard(word);
      return;
    }
    if (text.includes('科技')) {
      const tech = KnowledgeDB.getToday('tech');
      this.showKnowledgeCard(tech);
      return;
    }
    if (text.includes('历史')) {
      const history = KnowledgeDB.getToday('history');
      this.showKnowledgeCard(history);
      return;
    }
    if (text.includes('电影') || text.includes('动画')) {
      const movie = KnowledgeDB.getToday('movies');
      this.showKnowledgeCard(movie);
      return;
    }

    // 2. 解释/科普请求
    if (/解释|什么意思|什么含义|给我讲讲|科普一下/.test(text)) {
      this.sendAIMessage('你想了解哪个词或哪个知识点呢？可以直接告诉我具体内容，比如「Vellichor 是什么意思」，或者点击下方的快捷回复选择类型～');
      this.setQuickReplies(['英文单词', '科技资讯', '历史知识', '影视动画']);
      return;
    }

    // 3. 阅读/故事
    if (text.includes('故事') || text.includes('阅读') || text.includes('英文故事')) {
      this.sendAIMessage('📚 好呀！我为你准备了今日的趣味英文小故事，点击左侧面板的「开始阅读」或下方的按钮即可进入阅读专区～');
      this.setQuickReplies(['开始阅读', '待会儿再看']);
      return;
    }

    // 4. 泛指学习/知识
    if (text.includes('知识') || text.includes('学习')) {
      this.sendAIMessage('想学习的话，我可以随时为你推送知识卡片！想学什么类型的？');
      this.setQuickReplies(['英文单词', '科技资讯', '历史知识', '影视动画']);
      return;
    }

    // 5. 待办/复盘
    if (text.includes('待办') || text.includes('todo')) {
      this.sendAIMessage('待办事项在左侧面板可以看到，也可以直接在这里告诉我新的待办哦！');
      return;
    }
    if (text.includes('复盘') || text.includes('总结')) {
      this.sendAIMessage('复盘记录可以在右上角 📋 按钮查看。需要我现在帮你总结一下吗？');
      return;
    }

    // ===== 兜底回复 =====
    this.sendAIMessage('我在听呢 👂 不过这个问题我暂时还没学会怎么回答～你可以试试问我「天气」「时间」「知识」「待办」「故事」相关的内容，或者点击下方的快捷回复按钮。');
  },

  // ========== 消息系统 ==========
  sendAIMessage(content, options = {}) {
    const container = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai';
    msgDiv.style.animationDelay = `${options.delay || 0}ms`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble glass';

    if (options.isHTML) {
      bubble.innerHTML = content;
    } else {
      // 打字机效果
      bubble.innerHTML = '<span class="typing-indicator"><span></span><span></span><span></span></span>';
      msgDiv.appendChild(bubble);
      container.appendChild(msgDiv);
      this.scrollToBottom();

      setTimeout(() => {
        bubble.innerHTML = content;
        SoundSystem.playMessage();
      }, 800 + (options.delay || 0));
      return;
    }

    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    this.scrollToBottom();
  },

  sendUserMessage(content) {
    const container = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = content;

    msgDiv.appendChild(bubble);
    container.appendChild(msgDiv);
    this.scrollToBottom();

    // 保存记录
    this.state.history.push({ role: 'user', text: content, time: new Date().toISOString() });
    this.saveState();
  },

  scrollToBottom() {
    const container = document.getElementById('chatMessages');
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 50);
  },

  setQuickReplies(replies) {
    const container = document.getElementById('quickReplies');
    container.innerHTML = '';
    replies.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'quick-reply';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        document.getElementById('chatInput').value = text;
        this.handleUserInput();
      });
      container.appendChild(btn);
    });
  },

  // ========== 待办系统 ==========
  addTodo(text, priority = 'normal') {
    const todo = {
      id: Date.now() + Math.random(),
      text,
      priority,
      done: false,
      createdAt: new Date().toISOString()
    };
    this.state.todayTodos.push(todo);
    this.saveState();
    this.renderTodos();
  },

  toggleTodo(id) {
    const todo = this.state.todayTodos.find(t => t.id === id);
    if (todo) {
      todo.done = !todo.done;
      this.saveState();
      this.renderTodos();
      if (todo.done) SoundSystem.playCheck();
    }
  },

  deleteTodo(id) {
    this.state.todayTodos = this.state.todayTodos.filter(t => t.id !== id);
    this.saveState();
    this.renderTodos();
  },

  renderTodos() {
    const list = document.getElementById('todoList');
    const count = document.getElementById('todoCount');

    count.textContent = this.state.todayTodos.filter(t => !t.done).length;

    if (this.state.todayTodos.length === 0) {
      list.innerHTML = '<div class="empty-state">暂无待办事项</div>';
      return;
    }

    list.innerHTML = '';
    this.state.todayTodos.forEach(todo => {
      const item = document.createElement('div');
      item.className = `todo-item ${todo.done ? 'done' : ''}`;
      item.innerHTML = `
        <div class="todo-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="todo-text">${this.escapeHtml(todo.text)}</span>
        <span class="todo-priority ${todo.priority}"></span>
      `;
      item.addEventListener('click', () => this.toggleTodo(todo.id));
      list.appendChild(item);
    });
  },

  openTodoModal() {
    document.getElementById('todoModal').classList.add('show');
    document.getElementById('todoInput').value = '';
    document.getElementById('todoInput').focus();
    SoundSystem.playOpen();
  },

  closeTodoModal() {
    document.getElementById('todoModal').classList.remove('show');
    SoundSystem.playClose();
  },

  confirmAddTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;

    const priorityBtn = document.querySelector('.priority-btn.active');
    const priority = priorityBtn ? priorityBtn.dataset.p : 'normal';

    this.addTodo(text, priority);
    this.closeTodoModal();
    this.showToast('✅ 待办已添加');
    SoundSystem.playSuccess();
  },

  // ========== 复盘系统 ==========
  openReviewModal() {
    document.getElementById('reviewModal').classList.add('show');
    this.renderReviewContent('today');
    SoundSystem.playOpen();
  },

  closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('show');
    SoundSystem.playClose();
  },

  renderReviewContent(tab) {
    const container = document.getElementById('reviewContent');
    container.innerHTML = '';

    if (tab === 'today') {
      // 今日数据
      const today = new Date().toISOString().split('T')[0];
      const todayTodos = this.state.todayTodos;
      const doneCount = todayTodos.filter(t => t.done).length;
      const growthCount = this.state.growthNotes.length;

      let html = '<div class="review-item">';
      html += `<div class="review-date">📅 ${today}</div>`;
      html += `<div class="review-text">`;
      html += `今日待办：${doneCount}/${todayTodos.length} 项完成<br>`;
      html += `成长记录：${growthCount} 条<br>`;
      html += `知识学习：${this.state.knowledgeLearned.length} 条`;
      html += `</div></div>`;

      if (this.state.growthNotes.length > 0) {
        this.state.growthNotes.forEach(note => {
          html += '<div class="review-item">';
          html += `<div class="review-date">🌱 ${new Date(note.time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>`;
          html += `<div class="review-text">${this.escapeHtml(note.text)}</div>`;
          html += '</div>';
        });
      }

      container.innerHTML = html;
    } else if (tab === 'week') {
      container.innerHTML = '<div class="empty-state">本周回顾功能开发中，敬请期待 ✨</div>';
    } else {
      container.innerHTML = '<div class="empty-state">历史记录功能开发中，敬请期待 ✨</div>';
    }
  },

  // ========== 工具方法 ==========
  showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✨</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // ========== 阅读专区 ==========
  initReading() {
    if (typeof StoriesDB === 'undefined') return;
    const week = this.getLearningWeek();
    const stories = StoriesDB.getTodayStories(week);
    const weekInfo = StoriesDB.getWeekInfo(week);

    document.getElementById('storyCount').textContent = stories.length;

    // 更新侧边栏难度徽章
    const badge = document.getElementById('storyWeekBadge');
    if (badge) badge.textContent = weekInfo.label;

    this.renderSideStoryList(stories);
  },

  renderSideStoryList(stories) {
    const container = document.getElementById('storyList');
    if (!stories || stories.length === 0) {
      container.innerHTML = '<div class="empty-state">今日暂无故事</div>';
      return;
    }
    container.innerHTML = stories.map((s, i) => `
      <div class="story-item" data-index="${i}">
        <div class="story-item-title">${i + 1}. ${s.titleCn}</div>
        <div class="story-item-meta">${s.level} · ${s.wordCount}词</div>
      </div>
    `).join('');
    container.querySelectorAll('.story-item').forEach((el, i) => {
      el.addEventListener('click', () => {
        this.openReadingModal();
        this.showStory(i);
      });
    });
  },

  openReadingModal() {
    document.getElementById('readingModal').classList.add('show');
    const week = this.getLearningWeek();
    this.renderStoryList(week);
    SoundSystem.playOpen();
  },

  closeReadingModal() {
    document.getElementById('readingModal').classList.remove('show');
    document.getElementById('wordTooltip').classList.remove('show');
    SoundSystem.playClose();
  },

  renderStoryList(week = 0) {
    if (typeof StoriesDB === 'undefined') return;
    const stories = StoriesDB.getTodayStories(week);
    const weekInfo = StoriesDB.getWeekInfo(week);
    const grid = document.getElementById('readingStoriesGrid');

    // 更新介绍文字
    const intro = document.querySelector('.reading-intro');
    if (intro) {
      intro.innerHTML = `
        <p>${weekInfo.description}</p>
        <p class="reading-tip">第 ${weekInfo.week} 周 · ${weekInfo.label} · 点击任意单词即可查看释义和发音</p>
      `;
    }

    grid.innerHTML = stories.map((s, i) => `
      <div class="story-card" data-index="${i}">
        <div class="story-card-title">${s.title}</div>
        <div class="story-card-title-cn">${s.titleCn}</div>
        <div class="story-card-meta">
          <span class="story-level">${s.level}</span>
          <span class="story-words">${s.wordCount} 词</span>
        </div>
      </div>
    `).join('');
    grid.querySelectorAll('.story-card').forEach((el, i) => {
      el.addEventListener('click', () => this.showStory(i));
    });
  },

  showStoryList() {
    document.getElementById('readingStoryList').style.display = 'block';
    document.getElementById('readingStoryView').style.display = 'none';
  },

  showStory(index) {
    if (typeof StoriesDB === 'undefined') return;
    const stories = StoriesDB.getTodayStories();
    const story = stories[index];
    if (!story) return;

    this.currentStoryIndex = index;
    this.currentStory = story;

    document.getElementById('readingStoryList').style.display = 'none';
    document.getElementById('readingStoryView').style.display = 'block';

    document.getElementById('storyMeta').innerHTML = `
      <h2>${story.title}</h2>
      <div class="story-meta-line">
        <span class="story-badge level">${story.level}</span>
        <span class="story-badge words">${story.wordCount} 词</span>
        <span class="story-badge index">${index + 1} / ${stories.length}</span>
      </div>
    `;

    this.renderStoryContent(story.content);
    this.updateStoryProgress(0);
  },

  renderStoryContent(text) {
    const container = document.getElementById('storyContent');
    // 将文本按句子分割，每句一个段落
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    container.innerHTML = sentences.map(sentence => {
      const trimmed = sentence.trim();
      // 将句子中的每个单词包裹为可点击元素
      const wordsHtml = trimmed.split(/\s+/).map(word => {
        const clean = word.replace(/[^a-zA-Z']/g, '');
        const punct = word.replace(/[a-zA-Z']/g, '');
        const hasVocab = clean && StoriesDB.lookup(clean);
        const cls = hasVocab ? 'story-word has-vocab' : 'story-word';
        return `<span class="${cls}" data-word="${clean}">${word}</span>${punct ? '<span class="story-punct">' + punct + '</span>' : ''}`;
      }).join(' ');
      return `<p class="story-paragraph">${wordsHtml}</p>`;
    }).join('');

    // 绑定单词点击事件
    container.querySelectorAll('.story-word').forEach(el => {
      el.addEventListener('click', (e) => this.onWordClick(e));
    });

    // 滚动监听更新进度
    container.onscroll = () => {
      const scrollPercent = container.scrollTop / (container.scrollHeight - container.clientHeight);
      this.updateStoryProgress(Math.round(scrollPercent * 100));
    };
  },

  onWordClick(e) {
    e.stopPropagation();
    const word = e.target.dataset.word;
    if (!word) return;

    const info = StoriesDB.lookup(word);
    const tooltip = document.getElementById('wordTooltip');
    const wordEl = document.getElementById('tooltipWord');
    const phoneticEl = document.getElementById('tooltipPhonetic');
    const meaningEl = document.getElementById('tooltipMeaning');

    wordEl.textContent = word;

    if (info) {
      phoneticEl.textContent = info.phonetic;
      meaningEl.textContent = info.meaning;
      tooltip.classList.add('has-data');
    } else {
      phoneticEl.textContent = '';
      meaningEl.textContent = '暂无释义，建议查阅词典';
      tooltip.classList.remove('has-data');
    }

    this.currentTooltipWord = word;

    // 定位浮动卡片
    const rect = e.target.getBoundingClientRect();
    const tooltipHeight = 100;
    let top = rect.top - tooltipHeight - 8;
    if (top < 10) top = rect.bottom + 8;

    tooltip.style.left = `${Math.max(10, Math.min(window.innerWidth - 220, rect.left + rect.width / 2 - 110))}px`;
    tooltip.style.top = `${top + window.scrollY}px`;
    tooltip.classList.add('show');
  },

  speakTooltipWord() {
    const word = this.currentTooltipWord;
    if (!word) return;
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } else {
      this.showToast('您的设备不支持语音播放');
    }
  },

  updateStoryProgress(percent) {
    const fill = document.getElementById('storyProgressFill');
    const text = document.getElementById('storyProgressText');
    if (fill) fill.style.width = `${Math.min(100, percent)}%`;
    if (text) text.textContent = `阅读进度 ${Math.min(100, percent)}%`;
  }
};

// 启动应用
document.addEventListener('DOMContentLoaded', () => App.init());
