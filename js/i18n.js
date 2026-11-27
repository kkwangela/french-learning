/**
 * i18n.js — Clean UI Language Switcher (中文 / English)
 * Switches all UI chrome, labels, navigation, buttons, tutorials, and prompts
 * between Chinese ('zh') and English ('en'), while keeping French word meanings
 * and linguistic explanations in English.
 */

(function () {
  const STORAGE_KEY = 'french_ui_lang';

  const TRANSLATIONS = {
    zh: {
      page_title: '我要去巴黎 • 法语词汇与动词变位学习',
      brand_title: '我要去巴黎',
      lang_toggle_label: 'EN',
      lang_toggle_title: 'Switch UI to English',

      // Sidebar sections
      nav_sec_practice: '核心练习',
      nav_sec_notebooks: '记忆本与词库',
      nav_sec_progress: '进度与同步',

      // Sidebar & Topbar nav labels
      nav_srs: '闪卡复习',
      nav_drill: '变位速练',
      nav_listening: '听力听写',
      nav_sentences: '例句填空',
      nav_mistakes: '错题本',
      nav_uservocab: '单词本',
      nav_dictionary: '查词典',
      nav_verbs: '动词变位表',
      nav_vocab: '高频词库',
      nav_tips: '记忆规律',
      nav_stats: '统计与备份',

      // Topbar controls
      sidebar_toggle_title: '展开/收起侧边栏',
      sidebar_close_title: '关闭菜单',
      voice_picker_title: '选择法语朗读语音',
      voice_default_opt: '法语语音...',
      voice_online_opt: '🌐 在线法语语音 (推荐手机)',
      voice_system_opt: '📱 系统默认法语 (fr-FR)',
      header_backup_btn: '备份/迁移',
      header_backup_title: '跨设备迁移学习记录与数据恢复',
      audio_toggle_title: '开启/关闭音效',
      theme_toggle_title: '切换浅色/深色主题',

      // Top Stats Ribbon
      stat_due: '今日待复习',
      stat_memory: '已学卡片',
      stat_streak: '当前连对',
      stat_accuracy: '记忆准确率',

      // 1. SRS Flashcards
      srs_deck_title: '间隔重复闪卡',
      srs_filter_all: '全部内容（动词 + 词汇）',
      srs_filter_a2: '🎓 DELF A2 备考词汇',
      srs_filter_b1: '🎓 DELF B1 备考词汇',
      srs_filter_verb: '仅动词变位',
      srs_filter_vocab: '全部词汇（A2 + B1）',
      srs_filter_uservocab: '📒 我的单词本',
      srs_loading: '正在加载卡片...',
      srs_flip_hint_html: '点击卡片或按 <strong>Space</strong> 翻面',
      srs_front_hint: '点击卡片或按空格键查看释义与变位',
      srs_back_badge: '释义与例句',
      srs_card_progress: '第 {current} / {total} 张卡片',
      srs_all_done_title: '太棒了！🎉',
      srs_all_done_desc: '当前筛选下的待复习卡片已全部完成。',
      srs_all_done_badge: '已完成',
      srs_all_done_progress: '今日已清空',
      srs_practice_ahead_btn: '🔄 提前复习下一批 (20张)',
      srs_rate_again: '重来 (1)',
      srs_rate_again_sub: '< 10 分钟',
      srs_rate_hard: '较难 (2)',
      srs_rate_hard_sub: '1-2 天',
      srs_rate_good: '记住 (3)',
      srs_rate_good_sub: '3-4 天',
      srs_rate_easy: '简单 (4)',
      srs_rate_easy_sub: '7+ 天',
      srs_uservocab_badge: '📒 单词本',
      srs_uservocab_default_tag: '个人单词本收藏',

      // 2. Conjugation Drill
      drill_title: '⚡ 动词变位速练',
      drill_subtitle: '高频训练法语动词词尾与词干变化，形成肌肉记忆',
      drill_group_all: '全部动词组',
      drill_group_irregular: '不规则动词（高频重点）',
      drill_group_er: '第一组规则动词 (-er)',
      drill_group_ir: '第二组规则动词 (-ir)',
      drill_group_re: '第三组规则动词 (-re)',
      drill_tense_all: '全部核心时态',
      drill_tense_present: '现在时 (Présent)',
      drill_tense_passe: '复合过去时 (Passé Composé)',
      drill_tense_imparfait: '未完成过去时 (Imparfait)',
      drill_tense_futur: '简单将来时 (Futur Simple)',
      drill_conjugate_in: '请写出以下时态的变位：',
      drill_input_placeholder: '输入正确的变位形式...',
      drill_audio_btn: '🔊 听原形读音',
      drill_check_btn: '检查答案 ↵',
      drill_next_btn: '下一题 ↵',

      // 3. Listening & Dictation
      listening_title: '🎧 听力与听写训练',
      listening_subtitle: '训练耳朵分辨法语动词变位、连诵陷阱与日常句子',
      listening_mode_verbs: '🔤 动词听写',
      listening_mode_liaisons: '⚡ 连诵辨音',
      listening_mode_sentences: '📝 句子听写',
      listening_play_normal: '正常语速',
      listening_play_slow: '慢速 (0.65x)',
      listening_repeat: '重播',
      listening_show_hint: '💡 显示提示',
      listening_hide_hint: '🙈 隐藏提示',
      listening_dictation_prompt: '仔细听并拼写出你听到的内容：',
      listening_input_placeholder: '输入你听到的法语...',
      listening_check_btn: '检查听写 ↵',
      listening_next_btn: '下一题 ↵',
      listening_liaison_prompt: '你听到的是哪一句话？（注意 [z] 与 [s] 的连诵区别）',
      listening_liaison_next: '下一题 ↵',

      // 4. Mistake Notebook
      mistakes_title: '📕 错题本',
      mistakes_subtitle: '自动收录变位、听写、例句填空和闪卡中做错的题目，支持专项重练',
      mistakes_start_btn: '专攻错题',
      mistakes_clear_btn: '清理已掌握',
      mistakes_arena_title: '🎯 错题专项强化训练',
      mistakes_input_placeholder: '重新输入正确答案...',
      mistakes_audio_btn: '🔊 听读音',
      mistakes_check_btn: '验证答案 ↵',
      mistakes_next_btn: '下一道错题 ↵',
      mistakes_type_all: '全部题型',
      mistakes_type_conj: '动词变位',
      mistakes_type_listen: '听力听写',
      mistakes_type_sentence: '例句填空',
      mistakes_type_vocab: '词汇闪卡',
      mistakes_status_unresolved: '待掌握错题',
      mistakes_status_all: '全部记录',
      mistakes_status_resolved: '已掌握错题',
      mistakes_search_placeholder: '搜索错题关键词...',
      mistakes_empty_title: '错题本目前是空的！',
      mistakes_empty_desc: '没有符合筛选条件的错题。平时练习做错的题目会自动收录到这里。',
      mistakes_your_wrong: '你的作答：',
      mistakes_correct_ans: '正确答案：',
      mistakes_retry_btn: '🎯 重练',
      mistakes_mark_unresolved: '↩ 标记待练',
      mistakes_mark_resolved: '✓ 标记已掌握',
      mistakes_count_tag: '错 {count} 次',
      mistakes_resolved_tag: '已掌握',
      mistakes_confirm_clear: '确定清理所有已掌握的错题记录吗？',
      mistakes_none_left: '目前没有待复习的错题，干得漂亮！',
      mistakes_session_done: '🎉 太棒了！本轮错题专项训练已全部完成！',

      // 5. Verb Explorer
      verbs_title: '📖 动词变位表',
      verbs_subtitle: '点击任意动词查看各时态完整变位并朗读发音',
      verbs_search_placeholder: '搜索法语或英文动词...',
      verbs_group_all: '全部分组',
      verbs_group_irregular: '不规则动词',
      verbs_group_er: '-er（第一组）',
      verbs_group_ir: '-ir（第二组）',
      verbs_group_re: '-re（第三组）',
      verbs_listen_all: '🔊 朗读全部',
      verbs_col_pronoun: '人称代词',
      verbs_col_form: '变位形式',

      // 6. Sentences (In Context)
      sentences_title: '🧩 例句语境填空',
      sentences_subtitle: '在真实日常法语例句中填入正确的动词变位',
      sentences_complete_label: '补全句子：',
      sentences_click_tip: '💡 点击例句中的任意单词可查释义并加入单词本',
      sentences_input_placeholder: '输入正确的动词变位...',
      sentences_check_btn: '提交答案 ↵',
      sentences_next_btn: '下一句 ↵',

      // 7. Vocabulary Explorer
      vocab_title: '📚 高频词库',
      vocab_subtitle: '精选常用法语单词，标注词性、阴阳性、音标与关联动词（点击例句单词可加入单词本）',
      vocab_search_placeholder: '搜索单词...',
      vocab_level_all: '全部等级 (A2 + B1)',
      vocab_level_a2: 'DELF A2',
      vocab_level_b1: 'DELF B1',
      vocab_cat_all: '全部分类',
      vocab_cat_a2_work: 'A2 • 工作与学习',
      vocab_cat_a2_housing: 'A2 • 住房与日常',
      vocab_cat_a2_health: 'A2 • 健康与就医',
      vocab_cat_a2_leisure: 'A2 • 休闲与文化',
      vocab_cat_b1_debate: 'B1 • 观点论证与连接词',
      vocab_cat_b1_society: 'B1 • 社会与媒体',
      vocab_cat_b1_env: 'B1 • 环境与科技',
      vocab_cat_b1_abstract: 'B1 • 高频抽象动词与形容词',
      vocab_cat_verbs: '核心动词',
      vocab_cat_life: '日常生活',
      vocab_cat_food: '饮食餐桌',
      vocab_cat_travel: '出行与城市',
      vocab_cat_time: '时间与频率',
      vocab_cat_adj: '形容词',
      vocab_cat_conn: '连接词',
      vocab_col_word: '法语与阴阳性',
      vocab_col_meaning: '英文释义',
      vocab_col_phonetic: '音标',
      vocab_col_example: '语境例句',
      vocab_col_audio: '发音',

      // 8. Memory Rules
      tips_title: '💡 动词变位记忆规律',
      tips_subtitle: '掌握高频不规则动词背后的核心规律',

      // 9. User Vocab Notebook
      uv_title: '📒 我的单词本',
      uv_subtitle: '在例句或查词典中收藏的法语单词都会保存在这里，随时朗读或用闪卡复习',
      uv_count: '{count} 个单词',
      uv_lookup_new_btn: '🔍 查新词',
      uv_practice_srs_btn: '🧠 闪卡复习单词本',
      uv_clear_btn: '🗑 清空',
      uv_tip_html: '💡 <strong>使用提示：</strong>在「查词典」中搜索任意法语词，或在例句中点击单词，即可一键收藏到单词本。',

      // 9B. Dictionary Lookup
      dict_title: '🔍 法语查词典',
      dict_subtitle: '输入任意法语或英文单词查询释义、发音与变位，一键加入单词本',
      dict_dir_fr_en: '法语 → 英文',
      dict_dir_en_fr: '英文 → 法语',
      dict_input_placeholder: '输入法语或英文单词（如 croissant, parler, water）...',
      dict_search_btn: '查询 ↵',
      dict_recent_label: '最近查询：',
      dict_clear_recent: '清空历史',
      dict_searching: '正在查询词典...',
      dict_source_local: '本地内置词库（离线可用）',
      dict_source_online: '在线词典（Wiktionary / 翻译）',
      dict_source_custom: '自定义词条',
      dict_listen_normal: '🔊 朗读',
      dict_listen_slow: '🐢 慢速',
      dict_add_btn: '➕ 加入单词本',
      dict_saved_btn: '✅ 已在单词本',
      dict_conj_preview: '常用现在时变位：',
      dict_local_matches: '本地词库匹配结果',
      dict_not_found_title: '暂未在线查到该词（可能处于离线状态或拼写有误）',
      dict_not_found_desc: '你可以直接在下方手动填写英文释义并保存到单词本：',
      dict_custom_title: '✏️ 手动添加自定义单词到单词本',
      dict_custom_toggle: '✏️ 手动添加生词',
      dict_custom_fr_ph: '法语单词（如 le parapluie）',
      dict_custom_en_ph: 'English meaning (e.g. umbrella)',
      dict_custom_pos_ph: '词性（可选，如 noun / verb）',
      dict_custom_ex_ph: '例句（可选）',
      dict_custom_save_btn: '➕ 保存到单词本',
      dict_custom_missing: '请至少填写法语单词和英文释义。',
      dict_empty_prompt_title: '输入任意法语单词开始查询',
      dict_empty_prompt_desc: '支持内置词库离线秒查 + 联网查询任意法语词汇（支持法→英 / 英→法）',
      dict_examples_label: '快捷试查：',
      uv_search_placeholder: '🔍 搜索已收藏的单词或释义...',
      uv_empty_title: '你的单词本还是空的',
      uv_empty_desc: '在例句中点击任意法语单词，然后点击「加入单词本」即可收藏。',
      uv_no_match: '没有找到匹配「{query}」的单词',
      uv_go_srs: '🧠 去闪卡复习',
      uv_add_srs: '➕ 加入闪卡复习',
      uv_delete: '🗑 删除',
      uv_empty_alert: '单词本目前还是空的！请先在例句中点击单词并点击「加入单词本」。',
      uv_confirm_clear: '确定要清空单词本里的所有收藏单词吗？',

      // Word Tooltip
      tooltip_close: '关闭',
      tooltip_listen: '🔊 朗读',
      tooltip_add: '➕ 加入单词本',
      tooltip_saved: '✅ 已在单词本',
      tooltip_click_hint: '点击查词 / 加入单词本',
      tooltip_toast_added: '已将「{word}」加入单词本 📒',

      // 10. Stats & Backup
      stats_title: '📊 学习统计与数据备份',
      stats_subtitle: '追踪你的记忆留存率、复习次数与长期掌握进度',
      stats_learned: '已练习卡片数',
      stats_mature: '已进入长期记忆',
      stats_reviews: '累计复习次数',
      stats_retention: '记忆准确率',

      mig_title: '学习数据迁移与备份恢复',
      mig_subtitle: '跨电脑、跨手机同步学习进度，一键导出与导入，复习曲线、错题本与单词本永不丢失。',
      mig_autosave: '✓ 本地自动保存中',
      mig_export_title: '1. 导出备份文件',
      mig_export_desc_html: '将当前设备的复习记忆曲线、错题本、单词本与最高连对记录打包下载为 <code>.json</code> 文件。',
      mig_export_btn: '立即下载备份 (.json)',
      mig_import_title: '2. 恢复 / 导入学习记录',
      mig_import_desc_html: '选择从其他电脑或手机导出的 <code>.json</code> 备份文件，一键还原全部进度！',
      mig_import_btn: '选择备份文件并恢复',
      mig_tut_title: '跨设备迁移教程',
      mig_step1_num: '步骤 1',
      mig_step1_title: '在原设备导出备份',
      mig_step1_desc_html: '点击上方 <strong>「立即下载备份」</strong>，浏览器会下载一个 <code>french_learning_backup_YYYY-MM-DD.json</code> 文件。',
      mig_step2_num: '步骤 2',
      mig_step2_title: '发送到另一台设备',
      mig_step2_desc_html: '通过隔空投送 (AirDrop)、微信文件传输助手、邮件或网盘，把 <code>.json</code> 文件发到你的手机或新电脑。',
      mig_step3_num: '步骤 3',
      mig_step3_title: '在新设备点击恢复',
      mig_step3_desc_html: '在新设备打开本页面，点击 <strong>「选择备份文件并恢复」</strong>，选中文件即可完成迁移！',
      mig_footer_tip: '💡 提示：备份文件仅几十 KB，包含全部复习曲线、错题本与单词本，建议定期备份。',
      mig_refresh_btn: '🔄 检查更新（不丢进度）',
      mig_reset_btn: '清空 / 重置本设备数据',
      mig_confirm_reset: '确定重置本设备的所有间隔复习进度吗？',
      mig_reset_done: '学习进度已重置。',
      mig_import_ok: '学习进度、错题本与单词本已成功恢复！',
      mig_import_fail: '导入失败：无效或损坏的 JSON 备份文件。'
    },

    en: {
      page_title: 'Je veux aller à Paris • French Vocabulary & Conjugation',
      brand_title: 'Je veux aller à Paris',
      lang_toggle_label: '中文',
      lang_toggle_title: '切换界面为中文',

      // Sidebar sections
      nav_sec_practice: 'Core Practice',
      nav_sec_notebooks: 'Notebooks & Reference',
      nav_sec_progress: 'Progress & Sync',

      // Sidebar & Topbar nav labels
      nav_srs: 'Flashcards (SRS)',
      nav_drill: 'Conjugation Drill',
      nav_listening: 'Listening & Dictation',
      nav_sentences: 'In Context',
      nav_mistakes: 'Mistake Notebook',
      nav_uservocab: 'Word Notebook',
      nav_dictionary: 'Dictionary',
      nav_verbs: 'Verb Explorer',
      nav_vocab: 'Vocabulary',
      nav_tips: 'Memory Rules',
      nav_stats: 'Stats & Backup',

      // Topbar controls
      sidebar_toggle_title: 'Toggle sidebar',
      sidebar_close_title: 'Close menu',
      voice_picker_title: 'Select French speech voice',
      voice_default_opt: 'French voice...',
      voice_online_opt: '🌐 Online French HD (Best for Mobile)',
      voice_system_opt: '📱 System Default (fr-FR)',
      header_backup_btn: 'Backup',
      header_backup_title: 'Backup & restore learning progress across devices',
      audio_toggle_title: 'Toggle sound effects',
      theme_toggle_title: 'Toggle light/dark theme',

      // Top Stats Ribbon
      stat_due: 'Cards Due Today',
      stat_memory: 'Items In Memory',
      stat_streak: 'Drill Streak',
      stat_accuracy: 'Accuracy Rate',

      // 1. SRS Flashcards
      srs_deck_title: 'Spaced Repetition Deck',
      srs_filter_all: 'Everything (Verbs + Vocab)',
      srs_filter_a2: '🎓 DELF A2 Exam Vocab',
      srs_filter_b1: '🎓 DELF B1 Exam Vocab',
      srs_filter_verb: 'Verb Conjugations Only',
      srs_filter_vocab: 'All Vocabulary (A2 + B1)',
      srs_filter_uservocab: '📒 My Word Notebook',
      srs_loading: 'Loading cards...',
      srs_flip_hint_html: 'Click card or press <strong>Space</strong> to flip',
      srs_front_hint: 'Click or press Space to reveal meaning & conjugation',
      srs_back_badge: 'Meaning & Examples',
      srs_card_progress: 'Card {current} of {total}',
      srs_all_done_title: 'Félicitations ! 🎉',
      srs_all_done_desc: 'All due cards in this deck are up to date!',
      srs_all_done_badge: 'Complete',
      srs_all_done_progress: 'All caught up',
      srs_practice_ahead_btn: '🔄 Practice Ahead (Next 20 Cards)',
      srs_rate_again: 'Again (1)',
      srs_rate_again_sub: '< 10 min',
      srs_rate_hard: 'Hard (2)',
      srs_rate_hard_sub: '1-2 days',
      srs_rate_good: 'Good (3)',
      srs_rate_good_sub: '3-4 days',
      srs_rate_easy: 'Easy (4)',
      srs_rate_easy_sub: '7+ days',
      srs_uservocab_badge: '📒 Word Notebook',
      srs_uservocab_default_tag: 'Saved in Word Notebook',

      // 2. Conjugation Drill
      drill_title: '⚡ Rapid Conjugation Drill',
      drill_subtitle: 'Train muscle memory for French verb endings and stem changes',
      drill_group_all: 'All Verb Groups',
      drill_group_irregular: 'Irregular Verbs (Top Priority)',
      drill_group_er: 'Regular -er (Group 1)',
      drill_group_ir: 'Regular -ir (Group 2)',
      drill_group_re: 'Regular -re (Group 3)',
      drill_tense_all: 'All Essential Tenses',
      drill_tense_present: 'Présent',
      drill_tense_passe: 'Passé Composé',
      drill_tense_imparfait: 'Imparfait',
      drill_tense_futur: 'Futur Simple',
      drill_conjugate_in: 'Conjugate in ',
      drill_input_placeholder: 'Type conjugated form here...',
      drill_audio_btn: '🔊 Listen Verb',
      drill_check_btn: 'Check ↵',
      drill_next_btn: 'Next Question ↵',

      // 3. Listening & Dictation
      listening_title: '🎧 Listening & Dictation',
      listening_subtitle: 'Train your ear to recognize French verb conjugations, liaisons, and spoken sentences',
      listening_mode_verbs: '🔤 Verb Dictation',
      listening_mode_liaisons: '⚡ Liaison Traps',
      listening_mode_sentences: '📝 Sentence Dictation',
      listening_play_normal: 'Normal Speed',
      listening_play_slow: 'Slow (0.65x)',
      listening_repeat: 'Repeat',
      listening_show_hint: '💡 Show Hint',
      listening_hide_hint: '🙈 Hide Hint',
      listening_dictation_prompt: 'Listen carefully and type exactly what you hear:',
      listening_input_placeholder: 'Type what you hear in French...',
      listening_check_btn: 'Check Dictation ↵',
      listening_next_btn: 'Next ↵',
      listening_liaison_prompt: 'Which sentence did you hear? (Listen closely for [z] vs [s] liaisons)',
      listening_liaison_next: 'Next Question ↵',

      // 4. Mistake Notebook
      mistakes_title: '📕 Mistake Notebook',
      mistakes_subtitle: 'Automatically logs mistakes from drills, dictation, context sentences, and flashcards for targeted review',
      mistakes_start_btn: 'Re-drill Mistakes',
      mistakes_clear_btn: 'Clear Mastered',
      mistakes_arena_title: '🎯 Targeted Mistake Practice',
      mistakes_input_placeholder: 'Type the correct form...',
      mistakes_audio_btn: '🔊 Listen',
      mistakes_check_btn: 'Check Answer ↵',
      mistakes_next_btn: 'Next Mistake ↵',
      mistakes_type_all: 'All Types',
      mistakes_type_conj: 'Conjugation',
      mistakes_type_listen: 'Listening',
      mistakes_type_sentence: 'In Context',
      mistakes_type_vocab: 'Vocabulary',
      mistakes_status_unresolved: 'Needs Review',
      mistakes_status_all: 'All Records',
      mistakes_status_resolved: 'Mastered',
      mistakes_search_placeholder: 'Search mistakes...',
      mistakes_empty_title: 'No mistakes here!',
      mistakes_empty_desc: 'No matching mistakes found. Any missed answers during practice will automatically be saved here.',
      mistakes_your_wrong: 'Your answer: ',
      mistakes_correct_ans: 'Correct answer: ',
      mistakes_retry_btn: '🎯 Retry',
      mistakes_mark_unresolved: '↩ Mark to Review',
      mistakes_mark_resolved: '✓ Mark Mastered',
      mistakes_count_tag: 'Missed {count}x',
      mistakes_resolved_tag: 'Mastered',
      mistakes_confirm_clear: 'Delete all mistakes marked as mastered?',
      mistakes_none_left: 'No unresolved mistakes to practice. Great job!',
      mistakes_session_done: '🎉 Congratulations! You finished your targeted mistake review session!',

      // 5. Verb Explorer
      verbs_title: '📖 Verb Matrix & Conjugation Explorer',
      verbs_subtitle: 'Select any verb to inspect its conjugations across all tenses and listen to pronunciation',
      verbs_search_placeholder: 'Search verb in French or English...',
      verbs_group_all: 'All Groups',
      verbs_group_irregular: 'Irregular Verbs',
      verbs_group_er: '-er (1st Group)',
      verbs_group_ir: '-ir (2nd Group)',
      verbs_group_re: '-re (3rd Group)',
      verbs_listen_all: '🔊 Listen All',
      verbs_col_pronoun: 'Pronoun',
      verbs_col_form: 'Conjugated Form',

      // 6. Sentences (In Context)
      sentences_title: '🧩 Conjugations in Real Context',
      sentences_subtitle: 'Fill in the blank with the correct conjugated verb to complete everyday French sentences',
      sentences_complete_label: 'Complete the sentence:',
      sentences_click_tip: '💡 Click any word in the sentence to view its meaning and save to your notebook',
      sentences_input_placeholder: 'Type the conjugated verb...',
      sentences_check_btn: 'Submit ↵',
      sentences_next_btn: 'Next Sentence ↵',

      // 7. Vocabulary Explorer
      vocab_title: '📚 French Vocabulary & Expressions',
      vocab_subtitle: 'High-frequency French words linked to their root verbs and genders (click example words to look up & save)',
      vocab_search_placeholder: 'Search word...',
      vocab_level_all: 'All Levels (A2 + B1)',
      vocab_level_a2: 'DELF A2',
      vocab_level_b1: 'DELF B1',
      vocab_cat_all: 'All Categories',
      vocab_cat_a2_work: 'A2 • Work & Study',
      vocab_cat_a2_housing: 'A2 • Housing & Daily',
      vocab_cat_a2_health: 'A2 • Health & Body',
      vocab_cat_a2_leisure: 'A2 • Leisure & Culture',
      vocab_cat_b1_debate: 'B1 • Opinions & Debate',
      vocab_cat_b1_society: 'B1 • Society & Media',
      vocab_cat_b1_env: 'B1 • Environment & Tech',
      vocab_cat_b1_abstract: 'B1 • Abstract Verbs & Adj',
      vocab_cat_verbs: 'Core Verbs',
      vocab_cat_life: 'Everyday Life',
      vocab_cat_food: 'Food & Dining',
      vocab_cat_travel: 'Travel & City',
      vocab_cat_time: 'Time & Frequency',
      vocab_cat_adj: 'Adjectives',
      vocab_cat_conn: 'Connectors',
      vocab_col_word: 'French & Gender',
      vocab_col_meaning: 'English Meaning',
      vocab_col_phonetic: 'Phonetic',
      vocab_col_example: 'Example in Context',
      vocab_col_audio: 'Audio',

      // 8. Memory Rules
      tips_title: '💡 French Conjugation Rules & Mnemonics',
      tips_subtitle: 'Master the hidden patterns behind irregular verbs',

      // 9. User Vocab Notebook
      uv_title: '📒 My Word Notebook',
      uv_subtitle: 'Words saved from the Dictionary or example sentences appear here for audio review and SRS flashcards',
      uv_count: '{count} words',
      uv_lookup_new_btn: '🔍 Look Up Word',
      uv_practice_srs_btn: '🧠 Practice in Flashcards',
      uv_clear_btn: '🗑 Clear All',
      uv_tip_html: '💡 <strong>Tip:</strong> Search any word in <em>Dictionary</em> or click any French word inside an example sentence to save it here.',

      // 9B. Dictionary Lookup
      dict_title: '🔍 French Dictionary',
      dict_subtitle: 'Look up any French or English word for definitions, pronunciation, and conjugations, then save to your Word Notebook',
      dict_dir_fr_en: 'French → English',
      dict_dir_en_fr: 'English → French',
      dict_input_placeholder: 'Type a French or English word (e.g. croissant, parler, water)...',
      dict_search_btn: 'Search ↵',
      dict_recent_label: 'Recent:',
      dict_clear_recent: 'Clear',
      dict_searching: 'Looking up word...',
      dict_source_local: 'Built-in Dictionary (Offline Ready)',
      dict_source_online: 'Online Dictionary (Wiktionary / Translation)',
      dict_source_custom: 'Custom Entry',
      dict_listen_normal: '🔊 Listen',
      dict_listen_slow: '🐢 Slow',
      dict_add_btn: '➕ Add to Notebook',
      dict_saved_btn: '✅ Saved in Notebook',
      dict_conj_preview: 'Present Tense Conjugation:',
      dict_local_matches: 'Local Dictionary Matches',
      dict_not_found_title: 'No online definition found (offline or check spelling)',
      dict_not_found_desc: 'You can enter an English meaning below and save it to your Word Notebook anyway:',
      dict_custom_title: '✏️ Add a Custom Word to Notebook',
      dict_custom_toggle: '✏️ Add Custom Word',
      dict_custom_fr_ph: 'French word (e.g. le parapluie)',
      dict_custom_en_ph: 'English meaning (e.g. umbrella)',
      dict_custom_pos_ph: 'Part of speech (optional, e.g. noun / verb)',
      dict_custom_ex_ph: 'Example sentence (optional)',
      dict_custom_save_btn: '➕ Save to Notebook',
      dict_custom_missing: 'Please enter both the French word and its English meaning.',
      dict_empty_prompt_title: 'Search any French word to get started',
      dict_empty_prompt_desc: 'Instant offline lookup for built-in words + online lookup for any French or English word',
      dict_examples_label: 'Try searching:',
      uv_search_placeholder: '🔍 Search saved words or meanings...',
      uv_empty_title: 'Your Word Notebook is empty',
      uv_empty_desc: 'Click any French word inside an example sentence and choose "Add to Notebook".',
      uv_no_match: 'No saved words match "{query}"',
      uv_go_srs: '🧠 Practice in SRS',
      uv_add_srs: '➕ Add to SRS',
      uv_delete: '🗑 Delete',
      uv_empty_alert: 'Your Word Notebook is empty! Click any word in an example sentence and add it first.',
      uv_confirm_clear: 'Clear all saved words from your Word Notebook?',

      // Word Tooltip
      tooltip_close: 'Close',
      tooltip_listen: '🔊 Listen',
      tooltip_add: '➕ Add to Notebook',
      tooltip_saved: '✅ Saved',
      tooltip_click_hint: 'Click to look up / save',
      tooltip_toast_added: 'Saved "{word}" to Word Notebook 📒',

      // 10. Stats & Backup
      stats_title: '📊 Memory Mastery & Analytics',
      stats_subtitle: 'Track your retention rates, review counts, and long-term memory progress',
      stats_learned: 'Cards Actively Practiced',
      stats_mature: 'Mature Cards (Long-Term)',
      stats_reviews: 'Total Review Repetitions',
      stats_retention: 'Retention Accuracy Rate',

      mig_title: 'Backup & Cross-Device Migration',
      mig_subtitle: 'Sync your SRS schedule, Mistake Notebook, and Word Notebook across devices with one-click JSON export & restore.',
      mig_autosave: '✓ Auto-saved in LocalStorage',
      mig_export_title: '1. Export Backup File',
      mig_export_desc_html: 'Download all spaced-repetition intervals, mistakes, saved words, and best streak as a <code>.json</code> file.',
      mig_export_btn: 'Download Backup (.json)',
      mig_import_title: '2. Restore Progress',
      mig_import_desc_html: 'Pick a <code>.json</code> backup file exported from another device to seamlessly restore all progress.',
      mig_import_btn: 'Choose Backup File to Restore',
      mig_tut_title: 'How to Migrate Across Devices',
      mig_step1_num: 'Step 1',
      mig_step1_title: 'Export on Original Device',
      mig_step1_desc_html: 'Click <strong>"Download Backup (.json)"</strong> above to save <code>french_learning_backup_YYYY-MM-DD.json</code>.',
      mig_step2_num: 'Step 2',
      mig_step2_title: 'Send File to New Device',
      mig_step2_desc_html: 'Transfer the <code>.json</code> file to your phone or other computer via AirDrop, email, cloud drive, or messaging.',
      mig_step3_num: 'Step 3',
      mig_step3_title: 'Restore on New Device',
      mig_step3_desc_html: 'Open this app on your new device, click <strong>"Choose Backup File to Restore"</strong>, and select the file.',
      mig_footer_tip: '💡 Tip: The backup file is only a few KB and includes all SRS cards, mistakes, and saved words.',
      mig_refresh_btn: '🔄 Refresh App (Keeps Progress)',
      mig_reset_btn: 'Reset Local Progress',
      mig_confirm_reset: 'Are you sure you want to reset all spaced repetition progress on this device?',
      mig_reset_done: 'Progress reset successfully.',
      mig_import_ok: 'Progress, Mistake Notebook, and Word Notebook restored successfully!',
      mig_import_fail: 'Import failed: invalid or corrupted JSON backup file.'
    }
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || 'zh';
  if (!TRANSLATIONS[currentLang]) currentLang = 'zh';

  function t(key, params) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.zh;
    let str = dict[key] !== undefined ? dict[key] : (TRANSLATIONS.en[key] || key);
    if (params) {
      Object.keys(params).forEach(k => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), params[k]);
      });
    }
    return str;
  }

  function apply(root = document) {
    // Plain text
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    // HTML text (for bold/code tags)
    root.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });
    // Placeholders
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });
    // Tooltips / titles
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key));
    });

    // Update page title & html lang
    document.title = t('page_title');
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';

    // Update language toggle button text if present
    const langBtnLabel = document.getElementById('langToggleLabel');
    if (langBtnLabel) langBtnLabel.textContent = t('lang_toggle_label');
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.title = t('lang_toggle_title');
  }

  function setLang(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply(document);
    window.dispatchEvent(new CustomEvent('french-ui-lang-changed', { detail: { lang } }));
  }

  function toggleLang() {
    setLang(currentLang === 'zh' ? 'en' : 'zh');
  }

  function getLang() {
    return currentLang;
  }

  window.I18N = {
    t,
    apply,
    setLang,
    toggleLang,
    getLang,
    TRANSLATIONS
  };
})();
