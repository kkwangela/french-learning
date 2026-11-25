/**
 * wordtooltip.js — Word Tooltip & 单词本 (User Vocab Notebook)
 * Clicking any French word inside example sentences shows a floating popup
 * with bilingual meaning, phonetics, grammar/conjugation notes, pronunciation,
 * and one-click saving to the user's personal vocabulary notebook (单词本).
 */

/* ───────────────────── Built-in Common French Dictionary ───────────────────── */
// Covers pronouns, articles, prepositions, adverbs, adjectives, nouns, numbers,
// and everyday words appearing across all example sentences & listening exercises.
const FRENCH_COMMON_DICT = {
  // Pronouns & Articles
  "je": { french: "je", chinese: "我", english: "I", phonetic: "[ʒə]", partOfSpeech: "pronoun" },
  "tu": { french: "tu", chinese: "你", english: "you (singular, informal)", phonetic: "[ty]", partOfSpeech: "pronoun" },
  "il": { french: "il", chinese: "他 / 它", english: "he / it", phonetic: "[il]", partOfSpeech: "pronoun" },
  "elle": { french: "elle", chinese: "她 / 它", english: "she / it", phonetic: "[ɛl]", partOfSpeech: "pronoun" },
  "on": { french: "on", chinese: "我们 / 人们", english: "one / we (informal)", phonetic: "[ɔ̃]", partOfSpeech: "pronoun" },
  "nous": { french: "nous", chinese: "我们", english: "we / us", phonetic: "[nu]", partOfSpeech: "pronoun" },
  "vous": { french: "vous", chinese: "您 / 你们", english: "you (plural or formal)", phonetic: "[vu]", partOfSpeech: "pronoun" },
  "ils": { french: "ils", chinese: "他们", english: "they (masculine/mixed)", phonetic: "[il]", partOfSpeech: "pronoun" },
  "elles": { french: "elles", chinese: "她们", english: "they (feminine)", phonetic: "[ɛl]", partOfSpeech: "pronoun" },
  "moi": { french: "moi", chinese: "我（重读人称代词）", english: "me", phonetic: "[mwa]", partOfSpeech: "pronoun" },
  "me": { french: "me", chinese: "我（宾语/自反代词）", english: "me / myself", phonetic: "[mə]", partOfSpeech: "pronoun" },
  "te": { french: "te", chinese: "你（宾语/自反代词）", english: "you / yourself", phonetic: "[tə]", partOfSpeech: "pronoun" },
  "se": { french: "se", chinese: "自己（自反代词）", english: "oneself / himself / herself", phonetic: "[sə]", partOfSpeech: "pronoun" },
  "le": { french: "le", chinese: "这/那（阳性定冠词）", english: "the (masculine) / him", phonetic: "[lə]", partOfSpeech: "article" },
  "la": { french: "la", chinese: "这/那（阴性定冠词）", english: "the (feminine) / her", phonetic: "[la]", partOfSpeech: "article" },
  "les": { french: "les", chinese: "这些/那些（复数定冠词）", english: "the (plural) / them", phonetic: "[le]", partOfSpeech: "article" },
  "un": { french: "un", chinese: "一个（阳性不定冠词）", english: "a / an / one (masc.)", phonetic: "[œ̃]", partOfSpeech: "article" },
  "une": { french: "une", chinese: "一个（阴性不定冠词）", english: "a / an / one (fem.)", phonetic: "[yn]", partOfSpeech: "article" },
  "des": { french: "des", chinese: "一些（复数不定冠词）", english: "some / of the (pl.)", phonetic: "[de]", partOfSpeech: "article" },
  "du": { french: "du", chinese: "一些 / 的（de + le 缩合）", english: "some / of the (masc.)", phonetic: "[dy]", partOfSpeech: "article" },
  "au": { french: "au", chinese: "去/在（à + le 缩合）", english: "to the / at the (masc.)", phonetic: "[o]", partOfSpeech: "preposition" },
  "aux": { french: "aux", chinese: "去/在（à + les 缩合）", english: "to the / at the (pl.)", phonetic: "[o]", partOfSpeech: "preposition" },
  "ce": { french: "ce", chinese: "这个", english: "this / that / it", phonetic: "[sə]", partOfSpeech: "determiner" },
  "cet": { french: "cet", chinese: "这个（用于元音开头的阳性名词前）", english: "this / that (masc. before vowel)", phonetic: "[sɛt]", partOfSpeech: "determiner" },
  "cette": { french: "cette", chinese: "这个（阴性）", english: "this / that (fem.)", phonetic: "[sɛt]", partOfSpeech: "determiner" },
  "ces": { french: "ces", chinese: "这些 / 那些", english: "these / those", phonetic: "[se]", partOfSpeech: "determiner" },
  "mon": { french: "mon", chinese: "我的（阳性）", english: "my (masc.)", phonetic: "[mɔ̃]", partOfSpeech: "possessive" },
  "ma": { french: "ma", chinese: "我的（阴性）", english: "my (fem.)", phonetic: "[ma]", partOfSpeech: "possessive" },
  "mes": { french: "mes", chinese: "我的（复数）", english: "my (plural)", phonetic: "[me]", partOfSpeech: "possessive" },
  "son": { french: "son", chinese: "他/她的（阳性）", english: "his / her (masc.)", phonetic: "[sɔ̃]", partOfSpeech: "possessive" },
  "sa": { french: "sa", chinese: "他/她的（阴性）", english: "his / her (fem.)", phonetic: "[sa]", partOfSpeech: "possessive" },
  "ses": { french: "ses", chinese: "他/她的（复数）", english: "his / her (plural)", phonetic: "[se]", partOfSpeech: "possessive" },
  "notre": { french: "notre", chinese: "我们的（单数）", english: "our (singular)", phonetic: "[nɔtʁ]", partOfSpeech: "possessive" },
  "nos": { french: "nos", chinese: "我们的（复数）", english: "our (plural)", phonetic: "[no]", partOfSpeech: "possessive" },
  "votre": { french: "votre", chinese: "您/你们的（单数）", english: "your (singular)", phonetic: "[vɔtʁ]", partOfSpeech: "possessive" },
  "vos": { french: "vos", chinese: "您/你们的（复数）", english: "your (plural)", phonetic: "[vo]", partOfSpeech: "possessive" },
  "leur": { french: "leur", chinese: "他们的", english: "their", phonetic: "[lœʁ]", partOfSpeech: "possessive" },
  "qui": { french: "qui", chinese: "谁 / ……的人", english: "who / that / which", phonetic: "[ki]", partOfSpeech: "pronoun" },
  "que": { french: "que", chinese: "什么 / （关系代词/连词）", english: "that / whom / what", phonetic: "[kə]", partOfSpeech: "conjunction" },
  "quel": { french: "quel", chinese: "哪个 / 什么（阳性）", english: "which / what (masc.)", phonetic: "[kɛl]", partOfSpeech: "interrogative" },
  "quelle": { french: "quelle", chinese: "哪个 / 什么（阴性）", english: "which / what (fem.)", phonetic: "[kɛl]", partOfSpeech: "interrogative" },

  // Contractions & Fixed Expressions
  "c'est": { french: "c'est", chinese: "这是 / 它是", english: "it is / this is", phonetic: "[sɛ]", partOfSpeech: "expression" },
  "qu'est": { french: "qu'est-ce que", chinese: "是什么（疑问句型）", english: "what is", phonetic: "[kɛs]", partOfSpeech: "expression" },
  "qu'il": { french: "qu'il", chinese: "（连词）他……", english: "that he / that it", phonetic: "[kil]", partOfSpeech: "contraction" },
  "s'il": { french: "s'il", chinese: "如果他 / 请（s'il vous plaît）", english: "if he / if it (in 's'il vous plaît' = please)", phonetic: "[sil]", partOfSpeech: "expression" },
  "aujourd'hui": { french: "aujourd'hui", chinese: "今天", english: "today", phonetic: "[o.ʒuʁ.dɥi]", partOfSpeech: "adverb" },
  "d'habitude": { french: "d'habitude", chinese: "通常 / 习惯上", english: "usually / normally", phonetic: "[da.bi.tyd]", partOfSpeech: "expression" },
  "d'une": { french: "d'une", chinese: "一个……的（de + une）", english: "of a / from a (fem.)", phonetic: "[dyn]", partOfSpeech: "contraction" },
  "d'amis": { french: "d'amis", chinese: "朋友们的（de + amis）", english: "of friends", phonetic: "[da.mi]", partOfSpeech: "noun", gender: "m" },
  "d'eau": { french: "d'eau", chinese: "水的（de + eau）", english: "of water", phonetic: "[do]", partOfSpeech: "noun", gender: "f" },
  "d'été": { french: "d'été", chinese: "夏天的（de + été）", english: "of summer / summer", phonetic: "[de.te]", partOfSpeech: "noun", gender: "m" },
  "d'hiver": { french: "d'hiver", chinese: "冬天的（de + hiver）", english: "of winter / winter", phonetic: "[di.vɛʁ]", partOfSpeech: "noun", gender: "m" },
  "d'accorder": { french: "accorder", chinese: "配合 / 使一致（语法性数配合）", english: "to agree (grammar) / to grant", phonetic: "[a.kɔʁ.de]", partOfSpeech: "verb" },
  "rendez": { french: "rendez-vous", chinese: "约会 / 预约 / 碰面", english: "appointment / meeting", phonetic: "[ʁɑ̃.de.vu]", partOfSpeech: "noun", gender: "m" },
  "plaît": { french: "s'il vous plaît", chinese: "请（原形 plaire：使喜欢）", english: "please (from plaire: to please)", phonetic: "[plɛ]", partOfSpeech: "expression" },
  "week": { french: "week-end", chinese: "周末", english: "weekend", phonetic: "[wi.kɛnd]", partOfSpeech: "noun", gender: "m" },
  "end": { french: "week-end", chinese: "周末", english: "weekend", phonetic: "[wi.kɛnd]", partOfSpeech: "noun", gender: "m" },

  // Prepositions, Conjunctions, Adverbs
  "à": { french: "à", chinese: "在 / 去 / 向", english: "to / at / in", phonetic: "[a]", partOfSpeech: "preposition" },
  "de": { french: "de", chinese: "的 / 从 / 关于", english: "of / from / about", phonetic: "[də]", partOfSpeech: "preposition" },
  "dans": { french: "dans", chinese: "在……里面", english: "in / inside", phonetic: "[dɑ̃]", partOfSpeech: "preposition" },
  "en": { french: "en", chinese: "在…… / 用…… / 处于……", english: "in / by / of it", phonetic: "[ɑ̃]", partOfSpeech: "preposition" },
  "avec": { french: "avec", chinese: "和……一起", english: "with", phonetic: "[a.vɛk]", partOfSpeech: "preposition" },
  "pour": { french: "pour", chinese: "为了 / 给", english: "for / in order to", phonetic: "[puʁ]", partOfSpeech: "preposition" },
  "par": { french: "par", chinese: "通过 / 每 / 被", english: "by / through / per", phonetic: "[paʁ]", partOfSpeech: "preposition" },
  "sur": { french: "sur", chinese: "在……上面", english: "on / upon", phonetic: "[syʁ]", partOfSpeech: "preposition" },
  "devant": { french: "devant", chinese: "在……前面", english: "in front of", phonetic: "[də.vɑ̃]", partOfSpeech: "preposition" },
  "avant": { french: "avant", chinese: "在……之前", english: "before", phonetic: "[a.vɑ̃]", partOfSpeech: "preposition" },
  "après": { french: "après", chinese: "在……之后", english: "after", phonetic: "[a.pʁɛ]", partOfSpeech: "preposition" },
  "depuis": { french: "depuis", chinese: "自从 / 已经……时间", english: "since / for (time)", phonetic: "[də.pɥi]", partOfSpeech: "preposition" },
  "et": { french: "et", chinese: "和 / 并且", english: "and", phonetic: "[e]", partOfSpeech: "conjunction" },
  "ou": { french: "ou", chinese: "或者", english: "or", phonetic: "[u]", partOfSpeech: "conjunction" },
  "où": { french: "où", chinese: "哪里 / 在……的地方", english: "where", phonetic: "[u]", partOfSpeech: "adverb" },
  "mais": { french: "mais", chinese: "但是", english: "but", phonetic: "[mɛ]", partOfSpeech: "conjunction" },
  "si": { french: "si", chinese: "如果 / 如此", english: "if / so", phonetic: "[si]", partOfSpeech: "conjunction" },
  "quand": { french: "quand", chinese: "当……时候 / 什么时候", english: "when", phonetic: "[kɑ̃]", partOfSpeech: "conjunction" },
  "parce": { french: "parce que", chinese: "因为", english: "because", phonetic: "[paʁs.kə]", partOfSpeech: "conjunction" },
  "comment": { french: "comment", chinese: "如何 / 怎样", english: "how", phonetic: "[kɔ.mɑ̃]", partOfSpeech: "adverb" },
  "ne": { french: "ne ... pas", chinese: "不（否定副词前半部分）", english: "not (first half of negation)", phonetic: "[nə]", partOfSpeech: "adverb" },
  "pas": { french: "pas", chinese: "不（否定副词后半部分）", english: "not (second half of negation)", phonetic: "[pa]", partOfSpeech: "adverb" },
  "très": { french: "très", chinese: "非常 / 很", english: "very", phonetic: "[tʁɛ]", partOfSpeech: "adverb" },
  "bien": { french: "bien", chinese: "好 / 很好地", english: "well / good", phonetic: "[bjɛ̃]", partOfSpeech: "adverb" },
  "beaucoup": { french: "beaucoup", chinese: "很多 / 非常", english: "a lot / much / many", phonetic: "[bo.ku]", partOfSpeech: "adverb" },
  "peu": { french: "peu", chinese: "少 / 一点点", english: "little / few", phonetic: "[pø]", partOfSpeech: "adverb" },
  "plus": { french: "plus", chinese: "更 / 更多 / 不再", english: "more / no longer", phonetic: "[ply]", partOfSpeech: "adverb" },
  "assez": { french: "assez", chinese: "足够 / 相当", english: "enough / quite", phonetic: "[a.se]", partOfSpeech: "adverb" },
  "tellement": { french: "tellement", chinese: "如此 / 太……了", english: "so / so much", phonetic: "[tɛl.mɑ̃]", partOfSpeech: "adverb" },
  "absolument": { french: "absolument", chinese: "绝对地 / 完全地", english: "absolutely", phonetic: "[ap.sɔ.ly.mɑ̃]", partOfSpeech: "adverb" },
  "couramment": { french: "couramment", chinese: "流利地", english: "fluently", phonetic: "[ku.ʁa.mɑ̃]", partOfSpeech: "adverb" },
  "paisiblement": { french: "paisiblement", chinese: "平静地 / 安详地", english: "peacefully", phonetic: "[pe.zi.blə.mɑ̃]", partOfSpeech: "adverb" },
  "sérieusement": { french: "sérieusement", chinese: "认真地 / 严肃地", english: "seriously", phonetic: "[se.ʁjøz.mɑ̃]", partOfSpeech: "adverb" },
  "ensemble": { french: "ensemble", chinese: "一起", english: "together", phonetic: "[ɑ̃.sɑ̃bl]", partOfSpeech: "adverb" },
  "enfin": { french: "enfin", chinese: "终于 / 最后", english: "finally / at last", phonetic: "[ɑ̃.fɛ̃]", partOfSpeech: "adverb" },
  "maintenant": { french: "maintenant", chinese: "现在", english: "now", phonetic: "[mɛ̃t.nɑ̃]", partOfSpeech: "adverb" },
  "tôt": { french: "tôt", chinese: "早", english: "early", phonetic: "[to]", partOfSpeech: "adverb" },
  "tard": { french: "tard", chinese: "晚", english: "late", phonetic: "[taʁ]", partOfSpeech: "adverb" },
  "hier": { french: "hier", chinese: "昨天", english: "yesterday", phonetic: "[jɛʁ]", partOfSpeech: "adverb" },
  "demain": { french: "demain", chinese: "明天", english: "tomorrow", phonetic: "[də.mɛ̃]", partOfSpeech: "adverb" },
  "toujours": { french: "toujours", chinese: "总是 / 一直", english: "always / still", phonetic: "[tu.ʒuʁ]", partOfSpeech: "adverb" },
  "voici": { french: "voici", chinese: "这就是 / 给你", english: "here is / here are", phonetic: "[vwa.si]", partOfSpeech: "preposition" },
  "pile": { french: "pile", chinese: "整点 / 正好（à l'heure pile）", english: "sharp / on the dot", phonetic: "[pil]", partOfSpeech: "adverb" },
  "tout": { french: "tout", chinese: "所有 / 全部 / 很", english: "all / everything / very", phonetic: "[tu]", partOfSpeech: "determiner" },
  "tous": { french: "tous", chinese: "所有的（阳性复数）", english: "all / every (masc. pl.)", phonetic: "[tu / tus]", partOfSpeech: "determiner" },
  "chaque": { french: "chaque", chinese: "每一个", english: "each / every", phonetic: "[ʃak]", partOfSpeech: "determiner" },

  // Numbers & Time
  "deux": { french: "deux", chinese: "二", english: "two", phonetic: "[dø]", partOfSpeech: "number" },
  "trois": { french: "trois", chinese: "三", english: "three", phonetic: "[tʁwa]", partOfSpeech: "number" },
  "cinq": { french: "cinq", chinese: "五", english: "five", phonetic: "[sɛ̃k]", partOfSpeech: "number" },
  "sept": { french: "sept", chinese: "七", english: "seven", phonetic: "[sɛt]", partOfSpeech: "number" },
  "huit": { french: "huit", chinese: "八", english: "eight", phonetic: "[ɥit]", partOfSpeech: "number" },
  "neuf": { french: "neuf", chinese: "九 / 新的", english: "nine / brand new", phonetic: "[nœf]", partOfSpeech: "number" },
  "dix": { french: "dix", chinese: "十", english: "ten", phonetic: "[dis]", partOfSpeech: "number" },
  "vingt": { french: "vingt", chinese: "二十", english: "twenty", phonetic: "[vɛ̃]", partOfSpeech: "number" },
  "premier": { french: "premier", chinese: "第一", english: "first", phonetic: "[pʁə.mje]", partOfSpeech: "adjective" },
  "heure": { french: "une heure", chinese: "小时 / 点钟 / 时间", english: "hour / time / o'clock", phonetic: "[œʁ]", partOfSpeech: "noun", gender: "f" },
  "heures": { french: "heures", chinese: "小时 / ……点钟", english: "hours / o'clock", phonetic: "[œʁ]", partOfSpeech: "noun", gender: "f" },
  "h": { french: "h (heures)", chinese: "点（小时缩写）", english: "hour / o'clock (abbr.)", phonetic: "[œʁ]", partOfSpeech: "noun", gender: "f" },
  "minute": { french: "une minute", chinese: "分钟", english: "minute", phonetic: "[mi.nyt]", partOfSpeech: "noun", gender: "f" },
  "minutes": { french: "minutes", chinese: "分钟（复数）", english: "minutes", phonetic: "[mi.nyt]", partOfSpeech: "noun", gender: "f" },
  "midi": { french: "midi", chinese: "中午（12点）", english: "noon / midday", phonetic: "[mi.di]", partOfSpeech: "noun", gender: "m" },
  "minuit": { french: "minuit", chinese: "午夜（半夜12点）", english: "midnight", phonetic: "[mi.nɥi]", partOfSpeech: "noun", gender: "m" },
  "matin": { french: "le matin", chinese: "早晨 / 上午", english: "morning", phonetic: "[ma.tɛ̃]", partOfSpeech: "noun", gender: "m" },
  "matins": { french: "les matins", chinese: "早晨（复数）", english: "mornings", phonetic: "[ma.tɛ̃]", partOfSpeech: "noun", gender: "m" },
  "soir": { french: "le soir", chinese: "晚上 / 傍晚", english: "evening", phonetic: "[swaʁ]", partOfSpeech: "noun", gender: "m" },
  "nuit": { french: "la nuit", chinese: "夜晚", english: "night", phonetic: "[nɥi]", partOfSpeech: "noun", gender: "f" },
  "jour": { french: "le jour", chinese: "天 / 白天", english: "day", phonetic: "[ʒuʁ]", partOfSpeech: "noun", gender: "m" },
  "jours": { french: "jours", chinese: "天（复数）", english: "days", phonetic: "[ʒuʁ]", partOfSpeech: "noun", gender: "m" },
  "semaine": { french: "la semaine", chinese: "星期 / 周", english: "week", phonetic: "[sə.mɛn]", partOfSpeech: "noun", gender: "f" },
  "samedi": { french: "samedi", chinese: "星期六", english: "Saturday", phonetic: "[sam.di]", partOfSpeech: "noun", gender: "m" },
  "dimanche": { french: "dimanche", chinese: "星期日", english: "Sunday", phonetic: "[di.mɑ̃ʃ]", partOfSpeech: "noun", gender: "m" },
  "ans": { french: "an / ans", chinese: "年 / 岁", english: "year / years old", phonetic: "[ɑ̃]", partOfSpeech: "noun", gender: "m" },
  "été": { french: "l'été / été", chinese: "夏天；être的过去分词", english: "summer / been (past participle of être)", phonetic: "[e.te]", partOfSpeech: "noun / verb", gender: "m" },
  "hiver": { french: "l'hiver", chinese: "冬天", english: "winter", phonetic: "[i.vɛʁ]", partOfSpeech: "noun", gender: "m" },

  // Adjectives
  "bon": { french: "bon", chinese: "好的 / 美味的", english: "good / nice", phonetic: "[bɔ̃]", partOfSpeech: "adjective" },
  "bonne": { french: "bonne", chinese: "好的（阴性）", english: "good (fem.)", phonetic: "[bɔn]", partOfSpeech: "adjective" },
  "beau": { french: "beau", chinese: "美丽的 / 漂亮的（阳性）", english: "beautiful / handsome / nice", phonetic: "[bo]", partOfSpeech: "adjective" },
  "belle": { french: "belle", chinese: "美丽的（阴性）", english: "beautiful (fem.)", phonetic: "[bɛl]", partOfSpeech: "adjective" },
  "grand": { french: "grand", chinese: "大的 / 高的", english: "big / tall / great", phonetic: "[ɡʁɑ̃]", partOfSpeech: "adjective" },
  "petit": { french: "petit", chinese: "小的", english: "small / little", phonetic: "[pə.ti]", partOfSpeech: "adjective" },
  "petite": { french: "petite", chinese: "小的（阴性）", english: "small / little (fem.)", phonetic: "[pə.tit]", partOfSpeech: "adjective" },
  "jeune": { french: "jeune", chinese: "年轻的", english: "young", phonetic: "[ʒœn]", partOfSpeech: "adjective" },
  "nouveau": { french: "nouveau", chinese: "新的", english: "new", phonetic: "[nu.vo]", partOfSpeech: "adjective" },
  "nouvel": { french: "nouvel", chinese: "新的（元音开头的阳性名词前）", english: "new (masc. before vowel)", phonetic: "[nu.vɛl]", partOfSpeech: "adjective" },
  "nouvelle": { french: "nouvelle", chinese: "新的（阴性）/ 消息", english: "new (fem.) / news", phonetic: "[nu.vɛl]", partOfSpeech: "adjective" },
  "nouveaux": { french: "nouveaux", chinese: "新的（阳性复数）", english: "new (masc. pl.)", phonetic: "[nu.vo]", partOfSpeech: "adjective" },
  "chaud": { french: "chaud", chinese: "热的 / 温暖的", english: "hot / warm", phonetic: "[ʃo]", partOfSpeech: "adjective" },
  "fraîche": { french: "frais / fraîche", chinese: "新鲜的 / 凉爽的（阴性）", english: "fresh / cool (fem.)", phonetic: "[fʁɛʃ]", partOfSpeech: "adjective" },
  "délicieux": { french: "délicieux", chinese: "美味的", english: "delicious", phonetic: "[de.li.sjø]", partOfSpeech: "adjective" },
  "excellent": { french: "excellent", chinese: "极好的 / 优秀的", english: "excellent", phonetic: "[ɛk.sɛ.lɑ̃]", partOfSpeech: "adjective" },
  "excellente": { french: "excellente", chinese: "极好的（阴性）", english: "excellent (fem.)", phonetic: "[ɛk.sɛ.lɑ̃t]", partOfSpeech: "adjective" },
  "magnifique": { french: "magnifique", chinese: "壮丽的 / 极美的", english: "magnificent / gorgeous", phonetic: "[ma.ɲi.fik]", partOfSpeech: "adjective" },
  "splendide": { french: "splendide", chinese: "华丽的 / 极佳的", english: "splendid / stunning", phonetic: "[splɑ̃.did]", partOfSpeech: "adjective" },
  "passionnant": { french: "passionnant", chinese: "引人入胜的 / 令人激动的", english: "exciting / fascinating", phonetic: "[pa.sjɔ.nɑ̃]", partOfSpeech: "adjective" },
  "calme": { french: "calme", chinese: "安静的 / 平静的", english: "calm / quiet", phonetic: "[kalm]", partOfSpeech: "adjective" },
  "heureux": { french: "heureux", chinese: "幸福的 / 开心的", english: "happy", phonetic: "[ø.ʁø]", partOfSpeech: "adjective" },
  "ravi": { french: "ravi", chinese: "非常高兴的 / 欣喜的", english: "delighted / thrilled", phonetic: "[ʁa.vi]", partOfSpeech: "adjective" },
  "surpris": { french: "surpris", chinese: "惊讶的", english: "surprised", phonetic: "[syʁ.pʁi]", partOfSpeech: "adjective" },
  "gentils": { french: "gentil / gentils", chinese: "友善的 / 和蔼的", english: "kind / nice", phonetic: "[ʒɑ̃.ti]", partOfSpeech: "adjective" },
  "reconnaissant": { french: "reconnaissant", chinese: "感激的 / 感谢的", english: "grateful / thankful", phonetic: "[ʁə.kɔ.nɛ.sɑ̃]", partOfSpeech: "adjective" },
  "difficile": { french: "difficile", chinese: "困难的", english: "difficult", phonetic: "[di.fi.sil]", partOfSpeech: "adjective" },
  "difficiles": { french: "difficiles", chinese: "困难的（复数）", english: "difficult (pl.)", phonetic: "[di.fi.sil]", partOfSpeech: "adjective" },
  "irréguliers": { french: "irrégulier / irréguliers", chinese: "不规则的", english: "irregular", phonetic: "[i.ʁe.ɡy.lje]", partOfSpeech: "adjective" },
  "classique": { french: "classique", chinese: "古典的 / 经典的", english: "classical / classic", phonetic: "[kla.sik]", partOfSpeech: "adjective" },
  "français": { french: "français", chinese: "法语 / 法国的", english: "French", phonetic: "[fʁɑ̃.sɛ]", partOfSpeech: "noun / adj", gender: "m" },
  "française": { french: "française", chinese: "法国的（阴性）", english: "French (fem.)", phonetic: "[fʁɑ̃.sɛz]", partOfSpeech: "adjective" },
  "anglais": { french: "anglais", chinese: "英语 / 英国的", english: "English", phonetic: "[ɑ̃.ɡlɛ]", partOfSpeech: "noun / adj", gender: "m" },
  "parisien": { french: "parisien", chinese: "巴黎的 / 巴黎人", english: "Parisian", phonetic: "[pa.ʁi.zjɛ̃]", partOfSpeech: "adjective" },
  "bleue": { french: "bleu / bleue", chinese: "蓝色的（阴性）", english: "blue (fem.)", phonetic: "[blø]", partOfSpeech: "adjective" },
  "vert": { french: "vert", chinese: "绿色的", english: "green", phonetic: "[vɛʁ]", partOfSpeech: "adjective" },
  "gris": { french: "gris", chinese: "灰色的", english: "gray", phonetic: "[ɡʁi]", partOfSpeech: "adjective" },
  "minérale": { french: "minéral / minérale", chinese: "矿物的（eau minérale 矿泉水）", english: "mineral (fem.)", phonetic: "[mi.ne.ʁal]", partOfSpeech: "adjective" },
  "proche": { french: "proche", chinese: "近的 / 亲近的", english: "near / close", phonetic: "[pʁɔʃ]", partOfSpeech: "adjective" },
  "seule": { french: "seul / seule", chinese: "独自的 / 唯一的（阴性）", english: "alone / only (fem.)", phonetic: "[sœl]", partOfSpeech: "adjective" },
  "gauche": { french: "gauche", chinese: "左边的（à gauche 向左）", english: "left", phonetic: "[ɡoʃ]", partOfSpeech: "noun / adj", gender: "f" },
  "prévue": { french: "prévu / prévue", chinese: "预定的 / 计划的", english: "scheduled / planned", phonetic: "[pʁe.vy]", partOfSpeech: "adjective" },
  "bienvenue": { french: "bienvenue", chinese: "欢迎", english: "welcome", phonetic: "[bjɛ̃.və.ny]", partOfSpeech: "interjection" },

  // Nouns
  "ami": { french: "un ami", chinese: "朋友（男）", english: "friend (masc.)", phonetic: "[a.mi]", partOfSpeech: "noun", gender: "m" },
  "amie": { french: "une amie", chinese: "朋友（女）", english: "friend (fem.)", phonetic: "[a.mi]", partOfSpeech: "noun", gender: "f" },
  "amis": { french: "les amis", chinese: "朋友们", english: "friends", phonetic: "[a.mi]", partOfSpeech: "noun", gender: "m" },
  "famille": { french: "la famille", chinese: "家庭 / 家人", english: "family", phonetic: "[fa.mij]", partOfSpeech: "noun", gender: "f" },
  "enfant": { french: "un enfant", chinese: "孩子", english: "child", phonetic: "[ɑ̃.fɑ̃]", partOfSpeech: "noun", gender: "m/f" },
  "enfants": { french: "les enfants", chinese: "孩子们", english: "children", phonetic: "[ɑ̃.fɑ̃]", partOfSpeech: "noun", gender: "m/f" },
  "collègue": { french: "un/une collègue", chinese: "同事", english: "colleague", phonetic: "[kɔ.lɛɡ]", partOfSpeech: "noun", gender: "m/f" },
  "professeur": { french: "le professeur", chinese: "老师 / 教授", english: "teacher / professor", phonetic: "[pʁɔ.fɛ.sœʁ]", partOfSpeech: "noun", gender: "m" },
  "prénom": { french: "le prénom", chinese: "名字（名）", english: "first name", phonetic: "[pʁe.nɔ̃]", partOfSpeech: "noun", gender: "m" },
  "chats": { french: "un chat / des chats", chinese: "猫", english: "cats", phonetic: "[ʃa]", partOfSpeech: "noun", gender: "m" },
  "faim": { french: "la faim", chinese: "饥饿（avoir faim = 饿了）", english: "hunger (avoir faim = to be hungry)", phonetic: "[fɛ̃]", partOfSpeech: "noun", gender: "f" },
  "baguette": { french: "la baguette", chinese: "法棍面包", english: "baguette (French bread)", phonetic: "[ba.ɡɛt]", partOfSpeech: "noun", gender: "f" },
  "croissants": { french: "un croissant", chinese: "牛角包 / 可颂", english: "croissants", phonetic: "[kʁwa.sɑ̃]", partOfSpeech: "noun", gender: "m" },
  "dessert": { french: "le dessert", chinese: "甜点", english: "dessert", phonetic: "[de.sɛʁ]", partOfSpeech: "noun", gender: "m" },
  "déjeuner": { french: "le déjeuner", chinese: "午餐 / 吃午饭", english: "lunch / to have lunch", phonetic: "[de.ʒœ.ne]", partOfSpeech: "noun / verb", gender: "m" },
  "thé": { french: "le thé", chinese: "茶", english: "tea", phonetic: "[te]", partOfSpeech: "noun", gender: "m" },
  "menthe": { french: "la menthe", chinese: "薄荷（thé à la menthe 薄荷茶）", english: "mint", phonetic: "[mɑ̃t]", partOfSpeech: "noun", gender: "f" },
  "miel": { french: "le miel", chinese: "蜂蜜", english: "honey", phonetic: "[mjɛl]", partOfSpeech: "noun", gender: "m" },
  "sucre": { french: "le sucre", chinese: "糖", english: "sugar", phonetic: "[sykʁ]", partOfSpeech: "noun", gender: "m" },
  "tasse": { french: "la tasse", chinese: "杯子（茶杯/咖啡杯）", english: "cup", phonetic: "[tas]", partOfSpeech: "noun", gender: "f" },
  "verre": { french: "le verre", chinese: "玻璃杯", english: "glass", phonetic: "[vɛʁ]", partOfSpeech: "noun", gender: "m" },
  "table": { french: "la table", chinese: "桌子", english: "table", phonetic: "[tabl]", partOfSpeech: "noun", gender: "f" },
  "terrasse": { french: "la terrasse", chinese: "露天座位 / 露台", english: "terrace / outdoor patio", phonetic: "[te.ʁas]", partOfSpeech: "noun", gender: "f" },
  "bistrot": { french: "le bistrot", chinese: "法式小餐馆 / 小酒馆", english: "bistro", phonetic: "[bis.tʁo]", partOfSpeech: "noun", gender: "m" },
  "restaurant": { french: "le restaurant", chinese: "餐厅 / 饭店", english: "restaurant", phonetic: "[ʁɛs.tɔ.ʁɑ̃]", partOfSpeech: "noun", gender: "m" },
  "appartement": { french: "un appartement", chinese: "公寓", english: "apartment", phonetic: "[a.paʁ.tə.mɑ̃]", partOfSpeech: "noun", gender: "m" },
  "cour": { french: "la cour", chinese: "院子 / 庭院", english: "courtyard / yard", phonetic: "[kuʁ]", partOfSpeech: "noun", gender: "f" },
  "quartier": { french: "le quartier", chinese: "街区 / 社区", english: "neighborhood / district", phonetic: "[kaʁ.tje]", partOfSpeech: "noun", gender: "m" },
  "campagne": { french: "la campagne", chinese: "乡村 / 乡下", english: "countryside", phonetic: "[kɑ̃.paɲ]", partOfSpeech: "noun", gender: "f" },
  "château": { french: "le château", chinese: "城堡", english: "castle / chateau", phonetic: "[ʃɑ.to]", partOfSpeech: "noun", gender: "m" },
  "musée": { french: "le musée", chinese: "博物馆", english: "museum", phonetic: "[my.ze]", partOfSpeech: "noun", gender: "m" },
  "louvre": { french: "le Louvre", chinese: "卢浮宫", english: "the Louvre Museum", phonetic: "[luvʁ]", partOfSpeech: "proper noun", gender: "m" },
  "paris": { french: "Paris", chinese: "巴黎", english: "Paris", phonetic: "[pa.ʁi]", partOfSpeech: "proper noun" },
  "lyon": { french: "Lyon", chinese: "里昂（法国城市）", english: "Lyon", phonetic: "[ljɔ̃]", partOfSpeech: "proper noun" },
  "bretagne": { french: "la Bretagne", chinese: "布列塔尼（法国地区）", english: "Brittany", phonetic: "[bʁə.taɲ]", partOfSpeech: "proper noun", gender: "f" },
  "cinéma": { french: "le cinéma", chinese: "电影院", english: "cinema / movie theater", phonetic: "[si.ne.ma]", partOfSpeech: "noun", gender: "m" },
  "concert": { french: "le concert", chinese: "音乐会", english: "concert", phonetic: "[kɔ̃.sɛʁ]", partOfSpeech: "noun", gender: "m" },
  "film": { french: "le film", chinese: "电影", english: "film / movie", phonetic: "[film]", partOfSpeech: "noun", gender: "m" },
  "musique": { french: "la musique", chinese: "音乐", english: "music", phonetic: "[my.zik]", partOfSpeech: "noun", gender: "f" },
  "pharmacie": { french: "la pharmacie", chinese: "药店", english: "pharmacy", phonetic: "[faʁ.ma.si]", partOfSpeech: "noun", gender: "f" },
  "marché": { french: "le marché", chinese: "市场 / 集市", english: "market", phonetic: "[maʁ.ʃe]", partOfSpeech: "noun", gender: "m" },
  "bus": { french: "le bus", chinese: "公交车", english: "bus", phonetic: "[bys]", partOfSpeech: "noun", gender: "m" },
  "métro": { french: "le métro", chinese: "地铁", english: "metro / subway", phonetic: "[me.tʁo]", partOfSpeech: "noun", gender: "m" },
  "train": { french: "le train", chinese: "火车", english: "train", phonetic: "[tʁɛ̃]", partOfSpeech: "noun", gender: "m" },
  "école": { french: "l'école", chinese: "学校", english: "school", phonetic: "[e.kɔl]", partOfSpeech: "noun", gender: "f" },
  "université": { french: "l'université", chinese: "大学", english: "university", phonetic: "[y.ni.vɛʁ.si.te]", partOfSpeech: "noun", gender: "f" },
  "examen": { french: "un examen", chinese: "考试", english: "exam", phonetic: "[ɛɡ.za.mɛ̃]", partOfSpeech: "noun", gender: "m" },
  "devoirs": { french: "les devoirs", chinese: "作业", english: "homework", phonetic: "[də.vwaʁ]", partOfSpeech: "noun", gender: "m" },
  "grammaire": { french: "la grammaire", chinese: "语法", english: "grammar", phonetic: "[ɡʁa.mɛʁ]", partOfSpeech: "noun", gender: "f" },
  "règle": { french: "la règle", chinese: "规则 / 尺子", english: "rule / ruler", phonetic: "[ʁɛɡl]", partOfSpeech: "noun", gender: "f" },
  "règles": { french: "les règles", chinese: "规则（复数）", english: "rules", phonetic: "[ʁɛɡl]", partOfSpeech: "noun", gender: "f" },
  "terminaison": { french: "la terminaison", chinese: "词尾（动词变位词尾）", english: "word ending / conjugation ending", phonetic: "[tɛʁ.mi.nɛ.zɔ̃]", partOfSpeech: "noun", gender: "f" },
  "participe": { french: "le participe", chinese: "分词（如 participe passé 过去分词）", english: "participle", phonetic: "[paʁ.ti.sip]", partOfSpeech: "noun", gender: "m" },
  "passé": { french: "passé", chinese: "过去的 / 过去时", english: "past", phonetic: "[pa.se]", partOfSpeech: "noun / adj", gender: "m" },
  "verbes": { french: "un verbe / des verbes", chinese: "动词", english: "verbs", phonetic: "[vɛʁb]", partOfSpeech: "noun", gender: "m" },
  "mots": { french: "un mot / des mots", chinese: "单词 / 词语", english: "words", phonetic: "[mo]", partOfSpeech: "noun", gender: "m" },
  "phrase": { french: "la phrase", chinese: "句子", english: "sentence", phonetic: "[fʁaz]", partOfSpeech: "noun", gender: "f" },
  "langue": { french: "la langue", chinese: "语言 / 舌头", english: "language / tongue", phonetic: "[lɑ̃ɡ]", partOfSpeech: "noun", gender: "f" },
  "langues": { french: "les langues", chinese: "语言（复数）", english: "languages", phonetic: "[lɑ̃ɡ]", partOfSpeech: "noun", gender: "f" },
  "explication": { french: "une explication", chinese: "解释 / 说明", english: "explanation", phonetic: "[ɛk.spli.ka.sjɔ̃]", partOfSpeech: "noun", gender: "f" },
  "réponse": { french: "la réponse", chinese: "回答 / 答案", english: "answer / reply", phonetic: "[ʁe.pɔ̃s]", partOfSpeech: "noun", gender: "f" },
  "histoire": { french: "une histoire", chinese: "故事 / 历史", english: "story / history", phonetic: "[is.twaʁ]", partOfSpeech: "noun", gender: "f" },
  "culture": { french: "la culture", chinese: "文化", english: "culture", phonetic: "[kyl.tyʁ]", partOfSpeech: "noun", gender: "f" },
  "roman": { french: "le roman", chinese: "小说", english: "novel", phonetic: "[ʁɔ.mɑ̃]", partOfSpeech: "noun", gender: "m" },
  "journal": { french: "le journal", chinese: "报纸 / 日记", english: "newspaper / journal", phonetic: "[ʒuʁ.nal]", partOfSpeech: "noun", gender: "m" },
  "courriel": { french: "le courriel", chinese: "电子邮件", english: "email", phonetic: "[ku.ʁjɛl]", partOfSpeech: "noun", gender: "m" },
  "projet": { french: "le projet", chinese: "项目 / 计划", english: "project / plan", phonetic: "[pʁɔ.ʒɛ]", partOfSpeech: "noun", gender: "m" },
  "pause": { french: "la pause", chinese: "休息 / 暂停", english: "break / pause", phonetic: "[poz]", partOfSpeech: "noun", gender: "f" },
  "vacances": { french: "les vacances", chinese: "假期 / 度假", english: "vacation / holidays", phonetic: "[va.kɑ̃s]", partOfSpeech: "noun", gender: "f" },
  "santé": { french: "la santé", chinese: "健康", english: "health", phonetic: "[sɑ̃.te]", partOfSpeech: "noun", gender: "f" },
  "chance": { french: "la chance", chinese: "运气 / 机会", english: "luck / chance", phonetic: "[ʃɑ̃s]", partOfSpeech: "noun", gender: "f" },
  "vérité": { french: "la vérité", chinese: "真相 / 真理", english: "truth", phonetic: "[ve.ʁi.te]", partOfSpeech: "noun", gender: "f" },
  "rêves": { french: "un rêve / des rêves", chinese: "梦想 / 梦", english: "dreams", phonetic: "[ʁɛv]", partOfSpeech: "noun", gender: "m" },
  "ciel": { french: "le ciel", chinese: "天空", english: "sky / heaven", phonetic: "[sjɛl]", partOfSpeech: "noun", gender: "m" },
  "clés": { french: "une clé / des clés", chinese: "钥匙", english: "keys", phonetic: "[kle]", partOfSpeech: "noun", gender: "f" },
  "manteau": { french: "le manteau", chinese: "大衣 / 外套", english: "coat", phonetic: "[mɑ̃.to]", partOfSpeech: "noun", gender: "m" },
  "robe": { french: "la robe", chinese: "连衣裙", english: "dress", phonetic: "[ʁɔb]", partOfSpeech: "noun", gender: "f" },
  "machine": { french: "la machine", chinese: "机器", english: "machine", phonetic: "[ma.ʃin]", partOfSpeech: "noun", gender: "f" },

  // Verbs & common verb forms not in main 20-verb table
  "aider": { french: "aider", chinese: "帮助", english: "to help", phonetic: "[e.de]", partOfSpeech: "verb" },
  "adorer": { french: "adorer", chinese: "非常喜欢 / 热爱", english: "to love / to adore", phonetic: "[a.dɔ.ʁe]", partOfSpeech: "verb" },
  "adore": { french: "adore (adorer)", chinese: "非常喜欢（adorer 的现在时）", english: "love / adore (from adorer)", phonetic: "[a.dɔʁ]", partOfSpeech: "verb" },
  "aimer": { french: "aimer", chinese: "喜欢 / 爱", english: "to like / to love", phonetic: "[e.me]", partOfSpeech: "verb" },
  "aime": { french: "aime (aimer)", chinese: "喜欢 / 爱（aimer 的现在时）", english: "like / love (from aimer)", phonetic: "[ɛm]", partOfSpeech: "verb" },
  "aimerais": { french: "aimerais (aimer)", chinese: "想要 / 希望能（aimer 条件式）", english: "would like (conditional of aimer)", phonetic: "[ɛ.mə.ʁɛ]", partOfSpeech: "verb" },
  "arriver": { french: "arriver", chinese: "到达 / 发生", english: "to arrive / to happen", phonetic: "[a.ʁi.ve]", partOfSpeech: "verb" },
  "arrive": { french: "arrive (arriver)", chinese: "到达（arriver 的现在时）", english: "arrive / arrives (from arriver)", phonetic: "[a.ʁiv]", partOfSpeech: "verb" },
  "attendre": { french: "attendre", chinese: "等待", english: "to wait (for)", phonetic: "[a.tɑ̃dʁ]", partOfSpeech: "verb" },
  "attends": { french: "attends (attendre)", chinese: "等待（attendre 现在时 je/tu）", english: "wait (from attendre)", phonetic: "[a.tɑ̃]", partOfSpeech: "verb" },
  "attendu": { french: "attendu (attendre)", chinese: "等待（attendre 过去分词）", english: "waited (past participle of attendre)", phonetic: "[a.tɑ̃.dy]", partOfSpeech: "verb" },
  "commencer": { french: "commencer", chinese: "开始", english: "to start / to begin", phonetic: "[kɔ.mɑ̃.se]", partOfSpeech: "verb" },
  "commence": { french: "commence (commencer)", chinese: "开始（commencer 现在时）", english: "starts / begins (from commencer)", phonetic: "[kɔ.mɑ̃s]", partOfSpeech: "verb" },
  "coucher": { french: "se coucher", chinese: "睡觉 / 躺下", english: "to go to bed", phonetic: "[ku.ʃe]", partOfSpeech: "verb" },
  "couché": { french: "couché (se coucher)", chinese: "上床睡觉（过去分词）", english: "went to bed (past participle of se coucher)", phonetic: "[ku.ʃe]", partOfSpeech: "verb" },
  "dîner": { french: "dîner", chinese: "吃晚饭", english: "to have dinner", phonetic: "[di.ne]", partOfSpeech: "verb" },
  "dîne": { french: "dîne (dîner)", chinese: "吃晚饭（dîner 现在时）", english: "have/has dinner (from dîner)", phonetic: "[din]", partOfSpeech: "verb" },
  "étudier": { french: "étudier", chinese: "学习 / 研究", english: "to study", phonetic: "[e.ty.dje]", partOfSpeech: "verb" },
  "étudie": { french: "étudie (étudier)", chinese: "学习（étudier 现在时）", english: "study / studies (from étudier)", phonetic: "[e.ty.di]", partOfSpeech: "verb" },
  "étudies": { french: "étudies (étudier)", chinese: "学习（tu étudies）", english: "you study (from étudier)", phonetic: "[e.ty.di]", partOfSpeech: "verb" },
  "fonctionner": { french: "fonctionner", chinese: "运转 / 工作", english: "to work / to function", phonetic: "[fɔ̃k.sjɔ.ne]", partOfSpeech: "verb" },
  "fonctionne": { french: "fonctionne (fonctionner)", chinese: "运转 / 工作（现在时）", english: "works / functions (from fonctionner)", phonetic: "[fɔ̃k.sjɔn]", partOfSpeech: "verb" },
  "garder": { french: "garder", chinese: "保持 / 保存 / 看管", english: "to keep / to guard", phonetic: "[ɡaʁ.de]", partOfSpeech: "verb" },
  "garde": { french: "garde (garder)", chinese: "保持 / 看管（garder 现在时）", english: "keep / keeps (from garder)", phonetic: "[ɡaʁd]", partOfSpeech: "verb" },
  "garer": { french: "garer", chinese: "停车", english: "to park", phonetic: "[ɡa.ʁe]", partOfSpeech: "verb" },
  "garé": { french: "garé (garer)", chinese: "停好车（garer 过去分词）", english: "parked (past participle of garer)", phonetic: "[ɡa.ʁe]", partOfSpeech: "verb" },
  "lever": { french: "se lever", chinese: "起床 / 站起", english: "to get up / to rise", phonetic: "[lə.ve]", partOfSpeech: "verb" },
  "lève": { french: "lève (se lever)", chinese: "起床（se lever 现在时）", english: "get up / gets up (from se lever)", phonetic: "[lɛv]", partOfSpeech: "verb" },
  "levés": { french: "levés (se lever)", chinese: "起床了（复数过去分词）", english: "got up (pl. past participle of se lever)", phonetic: "[lə.ve]", partOfSpeech: "verb" },
  "oublie": { french: "oublie (oublier)", chinese: "忘记（oublier 现在时/命令式）", english: "forget / forgets (from oublier)", phonetic: "[u.bli]", partOfSpeech: "verb" },
  "passer": { french: "passer", chinese: "度过 / 经过 / 通过", english: "to spend (time) / to pass", phonetic: "[pa.se]", partOfSpeech: "verb" },
  "passera": { french: "passera (passer)", chinese: "将会经过/度过（简单将来时）", english: "will pass / will spend (futur of passer)", phonetic: "[pa.sə.ʁa]", partOfSpeech: "verb" },
  "penser": { french: "penser", chinese: "思考 / 认为", english: "to think", phonetic: "[pɑ̃.se]", partOfSpeech: "verb" },
  "pense": { french: "pense (penser)", chinese: "认为 / 想（penser 现在时）", english: "think / thinks (from penser)", phonetic: "[pɑ̃s]", partOfSpeech: "verb" },
  "pleuvoir": { french: "pleuvoir", chinese: "下雨", english: "to rain", phonetic: "[plø.vwaʁ]", partOfSpeech: "verb" },
  "pleut": { french: "pleut (pleuvoir)", chinese: "下雨（il pleut = 下雨了）", english: "it rains / is raining (from pleuvoir)", phonetic: "[plø]", partOfSpeech: "verb" },
  "pratiquer": { french: "pratiquer", chinese: "练习 / 实践", english: "to practice", phonetic: "[pʁa.ti.ke]", partOfSpeech: "verb" },
  "profiter": { french: "profiter", chinese: "享受 / 利用", english: "to enjoy / to take advantage of", phonetic: "[pʁɔ.fi.te]", partOfSpeech: "verb" },
  "profitez": { french: "profitez (profiter)", chinese: "尽情享受吧（vous/命令式）", english: "enjoy! (from profiter)", phonetic: "[pʁɔ.fi.te]", partOfSpeech: "verb" },
  "rencontrer": { french: "rencontrer", chinese: "遇见 / 认识", english: "to meet", phonetic: "[ʁɑ̃.kɔ̃.tʁe]", partOfSpeech: "verb" },
  "reposer": { french: "se reposer", chinese: "休息", english: "to rest", phonetic: "[ʁə.po.ze]", partOfSpeech: "verb" },
  "réserver": { french: "réserver", chinese: "预订 / 保留", english: "to reserve / to book", phonetic: "[ʁe.zɛʁ.ve]", partOfSpeech: "verb" },
  "retenir": { french: "retenir", chinese: "记住 / 留住", english: "to remember / to retain", phonetic: "[ʁə.tə.niʁ]", partOfSpeech: "verb" },
  "réussir": { french: "réussir", chinese: "成功 / 通过（考试）", english: "to succeed / to pass (an exam)", phonetic: "[ʁe.y.siʁ]", partOfSpeech: "verb" },
  "revoir": { french: "revoir", chinese: "再见 / 复习", english: "to see again / to review", phonetic: "[ʁə.vwaʁ]", partOfSpeech: "verb" },
  "souvenir": { french: "se souvenir", chinese: "记得 / 回忆", english: "to remember", phonetic: "[su.və.niʁ]", partOfSpeech: "verb" },
  "souviens": { french: "souviens (se souvenir)", chinese: "记得（je/tu 现在时）", english: "remember (from se souvenir)", phonetic: "[su.vjɛ̃]", partOfSpeech: "verb" },
  "souvenez": { french: "souvenez (se souvenir)", chinese: "您/你们记得（vous 现在时）", english: "you remember (from se souvenir)", phonetic: "[su.və.ne]", partOfSpeech: "verb" },
  "apprennent": { french: "apprennent (apprendre)", chinese: "他们学习（ils/elles 现在时）", english: "they learn (from apprendre)", phonetic: "[a.pʁɛn]", partOfSpeech: "verb" },
  "tourner": { french: "tourner", chinese: "转弯 / 旋转", english: "to turn", phonetic: "[tuʁ.ne]", partOfSpeech: "verb" },
  "tournez": { french: "tournez (tourner)", chinese: "请转弯（vous/命令式）", english: "turn (from tourner)", phonetic: "[tuʁ.ne]", partOfSpeech: "verb" },
  "traiter": { french: "traiter", chinese: "探讨 / 处理 / 对待", english: "to deal with / to treat", phonetic: "[tʁe.te]", partOfSpeech: "verb" },
  "traite": { french: "traite (traiter)", chinese: "涉及 / 探讨（traiter 现在时）", english: "deals with / treats (from traiter)", phonetic: "[tʁɛt]", partOfSpeech: "verb" },
  "traverser": { french: "traverser", chinese: "穿过 / 横渡", english: "to cross", phonetic: "[tʁa.vɛʁ.se]", partOfSpeech: "verb" },
  "traversez": { french: "traversez (traverser)", chinese: "请穿过（vous/命令式）", english: "cross (from traverser)", phonetic: "[tʁa.vɛʁ.se]", partOfSpeech: "verb" },
  "trouver": { french: "trouver", chinese: "找到 / 觉得", english: "to find / to think", phonetic: "[tʁu.ve]", partOfSpeech: "verb" },
  "trouve": { french: "trouve (trouver)", chinese: "找到 / 位于（se trouve）", english: "find / is located (from trouver)", phonetic: "[tʁuv]", partOfSpeech: "verb" },
  "visiter": { french: "visiter", chinese: "参观 / 游览", english: "to visit (a place)", phonetic: "[vi.zi.te]", partOfSpeech: "verb" },
  "visité": { french: "visité (visiter)", chinese: "参观过（visiter 过去分词）", english: "visited (past participle of visiter)", phonetic: "[vi.zi.te]", partOfSpeech: "verb" },
  "faut": { french: "il faut (falloir)", chinese: "必须 / 需要", english: "it is necessary / one must (from falloir)", phonetic: "[fo]", partOfSpeech: "verb" },
  "faudrait": { french: "il faudrait (falloir)", chinese: "应该 / 最好需要（falloir 条件式）", english: "it would be necessary / should (from falloir)", phonetic: "[fo.dʁɛ]", partOfSpeech: "verb" },
  "choisir": { french: "choisir", chinese: "选择", english: "to choose", phonetic: "[ʃwa.ziʁ]", partOfSpeech: "verb" },
  "choisi": { french: "choisi (choisir)", chinese: "选择了（choisir 过去分词）", english: "chosen (past participle of choisir)", phonetic: "[ʃwa.zi]", partOfSpeech: "verb" },
  "choisissez": { french: "choisissez (choisir)", chinese: "你们选择 / 请选择", english: "you choose / choose! (from choisir)", phonetic: "[ʃwa.zi.se]", partOfSpeech: "verb" },
  "mangeons": { french: "mangeons (manger)", chinese: "我们吃（manger 现在时）", english: "we eat (from manger)", phonetic: "[mɑ̃.ʒɔ̃]", partOfSpeech: "verb" },
  "mangé": { french: "mangé (manger)", chinese: "吃过（manger 过去分词）", english: "eaten (past participle of manger)", phonetic: "[mɑ̃.ʒe]", partOfSpeech: "verb" },
  "connaître": { french: "connaître", chinese: "认识 / 熟悉", english: "to know (person/place)", phonetic: "[kɔ.nɛtʁ]", partOfSpeech: "verb" },
  "connais": { french: "connais (connaître)", chinese: "认识 / 熟悉（je/tu 现在时）", english: "know (from connaître)", phonetic: "[kɔ.nɛ]", partOfSpeech: "verb" },
  "connus": { french: "connu / connus", chinese: "著名的 / 认识过", english: "known / famous", phonetic: "[kɔ.ny]", partOfSpeech: "adjective / verb" },
  "croire": { french: "croire", chinese: "相信 / 认为", english: "to believe", phonetic: "[kʁwaʁ]", partOfSpeech: "verb" },
  "crois": { french: "crois (croire)", chinese: "相信 / 认为（je/tu 现在时）", english: "believe (from croire)", phonetic: "[kʁwa]", partOfSpeech: "verb" },
  "cru": { french: "cru (croire)", chinese: "相信过（croire 过去分词）", english: "believed (past participle of croire)", phonetic: "[kʁy]", partOfSpeech: "verb" },
  "dormir": { french: "dormir", chinese: "睡觉", english: "to sleep", phonetic: "[dɔʁ.miʁ]", partOfSpeech: "verb" },
  "dort": { french: "dort (dormir)", chinese: "睡觉（il/elle 现在时）", english: "sleeps (from dormir)", phonetic: "[dɔʁ]", partOfSpeech: "verb" },
  "dormi": { french: "dormi (dormir)", chinese: "睡过（dormir 过去分词）", english: "slept (past participle of dormir)", phonetic: "[dɔʁ.mi]", partOfSpeech: "verb" },
  "allée": { french: "allée (aller)", chinese: "去了（aller 阴性过去分词）", english: "went / gone (fem. past participle of aller)", phonetic: "[a.le]", partOfSpeech: "verb" },
  "partis": { french: "partis (partir)", chinese: "出发了 / 离开了（复数过去分词）", english: "left / departed (pl. past participle of partir)", phonetic: "[paʁ.ti]", partOfSpeech: "verb" },
  "venus": { french: "venus (venir)", chinese: "来了（venir 复数过去分词）", english: "came / arrived (pl. past participle of venir)", phonetic: "[və.ny]", partOfSpeech: "verb" },
  "comprends": { french: "comprends (comprendre)", chinese: "理解 / 明白（je/tu 现在时）", english: "understand (from comprendre)", phonetic: "[kɔ̃.pʁɑ̃]", partOfSpeech: "verb" },
  "comprenez": { french: "comprenez (comprendre)", chinese: "您/你们理解（vous 现在时）", english: "you understand (from comprendre)", phonetic: "[kɔ̃.pʁə.ne]", partOfSpeech: "verb" },
  "compris": { french: "compris (comprendre)", chinese: "明白了（comprendre 过去分词）", english: "understood (past participle of comprendre)", phonetic: "[kɔ̃.pʁi]", partOfSpeech: "verb" },
  "apprends": { french: "apprends (apprendre)", chinese: "学习（je/tu 现在时）", english: "learn (from apprendre)", phonetic: "[a.pʁɑ̃]", partOfSpeech: "verb" }
};

/* ─────────────────────────── UserVocabNotebook ─────────────────────────── */

class UserVocabNotebook {
  constructor() {
    this.STORAGE_KEY = 'french_user_vocab_v1';
    this.words = {}; // keyed by normalized French word
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.words = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this.words = {};
    }
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.words));
    } catch (e) {
      console.error('Failed to save user vocab notebook:', e);
    }
    this.notifyUpdate();
  }

  notifyUpdate() {
    const evt = new CustomEvent('french-user-vocab-updated', { detail: this.words });
    document.dispatchEvent(evt);
    window.dispatchEvent(evt);
  }

  _key(entry) {
    if (typeof entry === 'string') return entry.toLowerCase().trim();
    return (entry.saveKey || entry.french || entry.word || '').toLowerCase().trim();
  }

  has(entry) {
    return !!this.words[this._key(entry)];
  }

  addWord(entry) {
    const key = this._key(entry);
    if (!key) return null;
    const saved = {
      key,
      french: entry.french || entry.word || key,
      chinese: entry.chinese || '',
      english: entry.english || entry.meaning || '',
      phonetic: entry.phonetic || '',
      partOfSpeech: entry.partOfSpeech || entry.type || '',
      gender: entry.gender || '',
      category: entry.category || '',
      conjugationNote: entry.conjugationNote || '',
      exampleFr: entry.exampleFr || '',
      addedAt: Date.now()
    };
    this.words[key] = saved;
    this.save();
    return saved;
  }

  removeWord(key) {
    delete this.words[key];
    this.save();
  }

  getAll() {
    return Object.values(this.words).sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
  }

  clear() {
    this.words = {};
    this.save();
  }

  get count() {
    return Object.keys(this.words).length;
  }
}

/* ─────────────────────────── WordTooltipManager ────────────────────────── */

class WordTooltipManager {
  constructor(vocabNotebook, audioManager, srsManager = null) {
    this.notebook = vocabNotebook;
    this.audio = audioManager;
    this.srs = srsManager;
    this.currentEntry = null;
    this.tooltipEl = document.getElementById('wordTooltip');
    this._map = null;
    this._setupEvents();
  }

  /* ── Build comprehensive lookup map from dict + FRENCH_DATA ── */
  buildWordMap() {
    const map = {};

    // 1. Seed with built-in common French dictionary
    Object.entries(FRENCH_COMMON_DICT).forEach(([k, v]) => {
      map[k.toLowerCase()] = { ...v, saveKey: (v.french || k).toLowerCase() };
    });

    if (window.FRENCH_DATA) {
      // 2. Index ALL verbs + their past participles + ALL conjugated forms
      const tenseLabels = {
        present: 'Présent (现在时)',
        passeCompose: 'Passé composé (复合过去时)',
        imparfait: 'Imparfait (未完成过去时)',
        futur: 'Futur simple (简单将来时)',
        conditionnel: 'Conditionnel (条件式)',
        subjonctif: 'Subjonctif (虚拟式)'
      };

      (window.FRENCH_DATA.verbs || []).forEach(verb => {
        const inf = (verb.infinitive || '').toLowerCase().trim();
        if (!inf) return;

        // Infinitive entry
        map[inf] = {
          french: verb.infinitive,
          chinese: '',
          english: verb.english,
          phonetic: verb.phonetic || '',
          partOfSpeech: `verb (${verb.group || ''})`,
          gender: '',
          category: 'Verb',
          conjugationNote: `助动词: ${verb.auxiliary || 'avoir'} · 过去分词: ${verb.participlePass || ''}`,
          saveKey: inf,
          isVerb: true
        };

        // Past participle
        if (verb.participlePass) {
          const pp = verb.participlePass.toLowerCase().trim();
          if (!map[pp]) {
            map[pp] = {
              french: `${verb.participlePass} (${verb.infinitive})`,
              chinese: '',
              english: `${verb.english}`,
              phonetic: '',
              partOfSpeech: 'past participle',
              gender: '',
              conjugationNote: `动词 ${verb.infinitive} 的过去分词`,
              saveKey: inf,
              audioWord: verb.participlePass
            };
          }
        }

        // Conjugated forms across every tense
        if (verb.conjugations) {
          Object.entries(verb.conjugations).forEach(([tenseKey, formsObj]) => {
            if (!formsObj) return;
            const tenseName = tenseLabels[tenseKey] || tenseKey;
            Object.entries(formsObj).forEach(([pronoun, rawForm]) => {
              if (!rawForm) return;
              // Extract single-word forms and last word of compound forms (like "suis allé(e)")
              const cleanForm = rawForm.replace(/\(e\)|\(s\)|\(es\)/g, '').trim().toLowerCase();
              const parts = cleanForm.split(/\s+/);
              // Index single-word conjugated form (keep first/most common tense, e.g. Présent)
              if (parts.length === 1 && parts[0]) {
                const token = parts[0];
                if (!map[token]) {
                  map[token] = {
                    french: rawForm,
                    chinese: '',
                    english: `${verb.english}`,
                    phonetic: '',
                    partOfSpeech: 'verb',
                    gender: '',
                    conjugationNote: `${verb.infinitive} · ${tenseName} (${pronoun})`,
                    saveKey: inf,
                    audioWord: rawForm,
                    isConjugatedAuto: true
                  };
                }
              }
            });
          });
        }
      });

      // 3. Index FRENCH_DATA.vocabulary (highest priority for nouns/vocab)
      (window.FRENCH_DATA.vocabulary || []).forEach(item => {
        const raw = (item.french || '').trim();
        if (!raw) return;

        const baseEntry = {
          french: raw,
          chinese: item.chinese || '',
          english: item.english || '',
          phonetic: item.phonetic || '',
          partOfSpeech: item.partOfSpeech || 'word',
          gender: item.gender || '',
          category: item.category || '',
          conjugationNote: item.associatedVerb ? `关联动词: ${item.associatedVerb}` : '',
          exampleFr: item.exampleFr || '',
          saveKey: raw.toLowerCase()
        };

        // Handle slash-separated forms like "un ami / une amie"
        const variants = raw.split('/').map(s => s.trim()).filter(Boolean);
        variants.forEach(variant => {
          const lower = variant.toLowerCase();
          const prevExact = map[lower];
          map[lower] = {
            ...baseEntry,
            chinese: baseEntry.chinese || (prevExact && prevExact.chinese) || ''
          };

          // Strip leading French articles / reflexive pronoun: le, la, les, l', un, une, des, se, s'
          const stripped = lower.replace(/^(le\s+|la\s+|les\s+|l'|un\s+|une\s+|des\s+|se\s+|s')/, '').trim();
          if (stripped && stripped !== lower) {
            // Preserve Chinese meaning from common dict if available
            const existing = map[stripped];
            map[stripped] = {
              ...baseEntry,
              chinese: baseEntry.chinese || (existing && existing.chinese) || ''
            };
          }
        });
      });
    }

    return map;
  }

  _getMap() {
    if (!this._map) this._map = this.buildWordMap();
    return this._map;
  }

  /* ── Look up a clicked word token ── */
  lookup(rawWord, contextSentence = '') {
    const map = this._getMap();

    // Clean surrounding punctuation (keep internal apostrophes & hyphens)
    const clean = rawWord
      .replace(/^[«»"'`“”‘’.,;:!?()[\]{}\-–—]+|[«»"'`“”‘’.,;:!?()[\]{}\-–—]+$/g, '')
      .trim();

    if (!clean || /^_+$/.test(clean) || /^\d+$/.test(clean)) return null;

    const lower = clean.toLowerCase();
    let found = null;

    // 1. Exact match
    if (map[lower]) {
      found = map[lower];
    }

    // 2. Elision handling: j'adore, l'école, d'eau, n'oublie, m'aider, s'il, qu'il, c'est
    if (!found && /^[jlndsmtcq]'|^(qu|jusqu)'/i.test(lower)) {
      const afterApostrophe = lower.replace(/^(qu|jusqu|[jlndsmtc])'/i, '');
      if (map[afterApostrophe]) {
        found = map[afterApostrophe];
      } else if (afterApostrophe.endsWith('s') && map[afterApostrophe.slice(0, -1)]) {
        found = map[afterApostrophe.slice(0, -1)];
      } else if (afterApostrophe.endsWith('e') && map[afterApostrophe.slice(0, -1)]) {
        found = map[afterApostrophe.slice(0, -1)];
      }
    }

    // 3. Simple plural / feminine stripping
    if (!found && lower.endsWith('s') && map[lower.slice(0, -1)]) {
      found = map[lower.slice(0, -1)];
    }
    if (!found && lower.endsWith('x') && map[lower.slice(0, -1)]) {
      found = map[lower.slice(0, -1)];
    }
    if (!found && lower.endsWith('es') && map[lower.slice(0, -2)]) {
      found = map[lower.slice(0, -2)];
    }
    if (!found && lower.endsWith('e') && map[lower.slice(0, -1)]) {
      found = map[lower.slice(0, -1)];
    }

    // 4. Hyphenated parts (e.g. rendez-vous, petit-déjeuner, week-end)
    if (!found && lower.includes('-')) {
      const firstPart = lower.split('-')[0];
      if (map[firstPart]) found = map[firstPart];
    }

    // 5. Graceful fallback so EVERY clicked French word still opens a useful popup
    if (!found) {
      found = {
        french: clean,
        chinese: '',
        english: '点击朗读听发音，或加入单词本加深记忆',
        phonetic: '',
        partOfSpeech: '法语单词',
        gender: '',
        saveKey: lower,
        isFallback: true
      };
    }

    return {
      ...found,
      clickedWord: clean,
      exampleFr: contextSentence || found.exampleFr || ''
    };
  }

  /* ── Wrap every French word inside containerEl with clickable spans ── */
  makeTextClickable(containerEl, contextSentence = '') {
    if (!containerEl) return;

    const sentenceText = contextSentence || containerEl.textContent.trim();

    const walker = document.createTreeWalker(containerEl, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentNode;
      if (parent && parent.classList && parent.classList.contains('clickable-word')) continue;
      if (parent && ['BUTTON', 'INPUT', 'SELECT', 'SCRIPT', 'STYLE'].includes(parent.tagName)) continue;
      if (node.textContent.trim()) textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      const parent = textNode.parentNode;
      if (!parent) return;

      const text = textNode.textContent;
      const frag = document.createDocumentFragment();
      // Split by whitespace preserving spaces
      const parts = text.split(/(\s+)/);

      parts.forEach(part => {
        if (!part || /^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }

        // Skip cloze blanks like "________" or pure punctuation
        const stripped = part.replace(/^[«»"'`“”‘’.,;:!?()[\]{}\-–—]+|[«»"'`“”‘’.,;:!?()[\]{}\-–—]+$/g, '');
        if (!stripped || /^_+$/.test(stripped) || !/[A-Za-zÀ-ÖØ-öø-ÿœŒæÆçÇ]/.test(stripped)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }

        const span = document.createElement('span');
        span.className = 'clickable-word';
        span.textContent = part;
        span.title = '点击查词 / 加入单词本';
        span.addEventListener('click', (e) => this._onWordClick(e, part, sentenceText));
        frag.appendChild(span);
      });

      parent.replaceChild(frag, textNode);
    });
  }

  /* ── Handle click on a word span ── */
  _onWordClick(e, rawWord, contextSentence) {
    e.stopPropagation();
    const entry = this.lookup(rawWord, contextSentence);
    if (!entry) return;

    // Highlight active word
    document.querySelectorAll('.clickable-word.word-active').forEach(el => el.classList.remove('word-active'));
    e.target.classList.add('word-active');

    this.currentEntry = entry;
    this._showTooltip(entry, e.target);
  }

  /* ── Render and position the floating tooltip near anchorEl ── */
  _showTooltip(entry, anchorEl) {
    if (!this.tooltipEl) return;
    const el = this.tooltipEl;

    const wordEl = el.querySelector('.tooltip-word');
    const phoneticEl = el.querySelector('.tooltip-phonetic');
    const posEl = el.querySelector('.tooltip-pos-gender');
    const chineseEl = el.querySelector('.tooltip-chinese');
    const meaningEl = el.querySelector('.tooltip-meaning');
    const conjEl = el.querySelector('.tooltip-conjugation-note');

    if (wordEl) wordEl.textContent = entry.french || entry.clickedWord || '';
    if (phoneticEl) {
      const ph = entry.phonetic || '';
      phoneticEl.textContent = ph ? (ph.startsWith('[') || ph.startsWith('/') ? ph : `[${ph}]`) : '';
      phoneticEl.style.display = ph ? 'block' : 'none';
    }

    const genderLabel = entry.gender === 'm' ? '阳性 (m.)' : entry.gender === 'f' ? '阴性 (f.)' : entry.gender || '';
    const posGender = [entry.partOfSpeech, genderLabel].filter(Boolean).join(' · ');
    if (posEl) {
      posEl.textContent = posGender;
      posEl.style.display = posGender ? 'block' : 'none';
    }

    if (chineseEl) {
      chineseEl.textContent = entry.chinese || '';
      chineseEl.style.display = entry.chinese ? 'block' : 'none';
    }
    if (meaningEl) {
      meaningEl.textContent = entry.english || '';
    }
    if (conjEl) {
      conjEl.textContent = entry.conjugationNote || '';
      conjEl.style.display = entry.conjugationNote ? 'block' : 'none';
    }

    // Update add-to-notebook button state
    const addBtn = el.querySelector('#tooltipAddVocabBtn');
    if (addBtn) {
      const already = this.notebook && this.notebook.has(entry);
      addBtn.textContent = already ? '✅ 已在单词本' : '➕ 加入单词本';
      addBtn.disabled = already;
      addBtn.classList.toggle('saved', already);
    }

    // Show off-screen briefly to measure true width/height
    el.style.display = 'block';
    el.style.opacity = '0';

    const rect = anchorEl.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewW = document.documentElement.clientWidth;
    const viewH = document.documentElement.clientHeight;
    const tipW = el.offsetWidth || 290;
    const tipH = el.offsetHeight || 190;

    // Horizontal clamp
    let left = rect.left + scrollX + rect.width / 2 - tipW / 2;
    if (left + tipW > viewW + scrollX - 12) left = viewW + scrollX - tipW - 12;
    if (left < scrollX + 12) left = scrollX + 12;

    // Vertical: prefer below, flip above if near bottom of viewport
    let top = rect.bottom + scrollY + 10;
    if (rect.bottom + tipH + 16 > viewH && rect.top - tipH - 12 > 0) {
      top = rect.top + scrollY - tipH - 10;
    }

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;

    requestAnimationFrame(() => {
      el.style.opacity = '1';
    });
  }

  hideTooltip() {
    document.querySelectorAll('.clickable-word.word-active').forEach(el => el.classList.remove('word-active'));
    if (this.tooltipEl && this.tooltipEl.style.display !== 'none') {
      this.tooltipEl.style.opacity = '0';
      setTimeout(() => {
        if (this.tooltipEl && this.tooltipEl.style.opacity === '0') {
          this.tooltipEl.style.display = 'none';
        }
      }, 150);
    }
    this.currentEntry = null;
  }

  /* ── Wire up tooltip's own buttons & global dismiss ── */
  _setupEvents() {
    if (!this.tooltipEl) return;

    // Stop clicks inside tooltip from bubbling (e.g. don't flip flashcards!)
    this.tooltipEl.addEventListener('click', (e) => e.stopPropagation());

    const closeBtn = this.tooltipEl.querySelector('#tooltipCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.hideTooltip());

    const audioBtn = this.tooltipEl.querySelector('#tooltipAudioBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentEntry && this.audio) {
          const speakText = this.currentEntry.audioWord || this.currentEntry.clickedWord || this.currentEntry.french || '';
          this.audio.speak(speakText);
        }
      });
    }

    const addBtn = this.tooltipEl.querySelector('#tooltipAddVocabBtn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.currentEntry && this.notebook) {
          const saved = this.notebook.addWord(this.currentEntry);
          addBtn.textContent = '✅ 已在单词本';
          addBtn.disabled = true;
          addBtn.classList.add('saved');

          // Also auto-add into SRS deck so user can review it with flashcards immediately
          if (saved && this.srs) {
            this._ensureSrsCard(saved);
          }

          this._showToast(`已将「${saved ? saved.french : ''}」加入单词本 📒`);
        }
      });
    }

    // Dismiss on outside click
    document.addEventListener('click', (e) => {
      if (this.tooltipEl && this.tooltipEl.style.display !== 'none') {
        if (!this.tooltipEl.contains(e.target) && !e.target.classList.contains('clickable-word')) {
          this.hideTooltip();
        }
      }
    });

    // Dismiss on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.hideTooltip();
    });

    // Dismiss on scroll
    window.addEventListener('scroll', () => this.hideTooltip(), { passive: true });
  }

  _ensureSrsCard(word) {
    if (!this.srs || !word) return;
    const cardId = `uservocab_${word.key}`;
    if (!this.srs.cards[cardId]) {
      this.srs.cards[cardId] = {
        id: cardId,
        refId: word.key,
        type: 'uservocab',
        french: word.french,
        chinese: word.chinese || '',
        english: word.english || '',
        phonetic: word.phonetic || '',
        partOfSpeech: word.partOfSpeech || '',
        gender: word.gender || '',
        conjugationNote: word.conjugationNote || '',
        exampleFr: word.exampleFr || '',
        reps: 0,
        interval: 0,
        ef: 2.5,
        due: Date.now() - 1000, // Due immediately!
        history: [],
        lastReviewed: null
      };
      this.srs.save();
    }
  }

  _showToast(msg) {
    let toast = document.getElementById('wordTooltipToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wordTooltipToast';
      toast.className = 'word-tooltip-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
  }
}

/* ─────────────────────────── renderUserVocabView ───────────────────────── */
function renderUserVocabView(notebook, audioManager, srsManager, searchQuery = '', onPracticeWord = null) {
  const container = document.getElementById('userVocabList');
  const countPill = document.getElementById('userVocabCount');
  if (!container) return;

  const allWords = notebook.getAll();
  if (countPill) countPill.textContent = `${allWords.length} 个单词`;

  const q = (searchQuery || '').trim().toLowerCase();
  const words = q
    ? allWords.filter(w =>
        (w.french || '').toLowerCase().includes(q) ||
        (w.english || '').toLowerCase().includes(q) ||
        (w.chinese || '').toLowerCase().includes(q) ||
        (w.exampleFr || '').toLowerCase().includes(q)
      )
    : allWords;

  if (allWords.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align:center; padding: 3rem 1rem;">
        <div style="font-size:3rem;margin-bottom:0.75rem;">📒</div>
        <p style="font-weight:700; font-size:1.1rem; margin-bottom:0.4rem;">你的单词本还是空的</p>
        <p style="color:var(--text-secondary);font-size:0.9rem;">在「In Context 例句」、「Flashcard 闪卡」或「Vocabulary 词表」中点击任意法语单词，弹出释义窗后点击「➕ 加入单词本」即可收藏！</p>
      </div>`;
    return;
  }

  if (words.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1; text-align:center; padding: 2rem 1rem;">
        <p style="color:var(--text-secondary);">没有找到匹配「${searchQuery}」的单词</p>
      </div>`;
    return;
  }

  container.innerHTML = words.map(w => {
    const key = w.key || (w.french || '').toLowerCase();
    const cardId = `uservocab_${key}`;
    const inSrs = srsManager && !!srsManager.cards[cardId];
    const genderLabel = w.gender === 'm' ? 'm.' : w.gender === 'f' ? 'f.' : w.gender || '';
    const metaText = [w.partOfSpeech, genderLabel].filter(Boolean).join(' · ');

    return `
    <div class="user-vocab-card" data-key="${key.replace(/"/g, '&quot;')}">
      <div class="uvc-top">
        <span class="uvc-french">${w.french}</span>
        <span class="uvc-phonetic">${w.phonetic || ''}</span>
        <button class="uvc-audio-btn" data-word="${(w.french || '').replace(/"/g, '&quot;')}" title="朗读法语发音">🔊</button>
      </div>
      ${metaText ? `<div class="uvc-meta">${metaText}</div>` : ''}
      ${w.chinese ? `<div class="uvc-chinese">${w.chinese}</div>` : ''}
      <div class="uvc-english">${w.english || ''}</div>
      ${w.conjugationNote ? `<div class="uvc-note">${w.conjugationNote}</div>` : ''}
      ${w.exampleFr ? `<div class="uvc-example">💬 ${w.exampleFr}</div>` : ''}
      <div class="uvc-actions">
        <button class="btn-sm ${inSrs ? 'btn-ghost' : 'btn-primary'} uvc-srs-btn" data-key="${key.replace(/"/g, '&quot;')}">
          ${inSrs ? '🧠 去闪卡复习' : '➕ 加入闪卡复习'}
        </button>
        <button class="btn-sm btn-danger uvc-delete-btn" data-key="${key.replace(/"/g, '&quot;')}">🗑 删除</button>
      </div>
    </div>`;
  }).join('');

  // Audio buttons
  container.querySelectorAll('.uvc-audio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (audioManager) audioManager.speak(btn.dataset.word);
    });
  });

  // Delete buttons
  container.querySelectorAll('.uvc-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      notebook.removeWord(key);
      // Also remove its SRS card if present
      if (srsManager && srsManager.cards[`uservocab_${key}`]) {
        delete srsManager.cards[`uservocab_${key}`];
        srsManager.save();
      }
      renderUserVocabView(notebook, audioManager, srsManager, searchQuery, onPracticeWord);
    });
  });

  // SRS practice buttons
  container.querySelectorAll('.uvc-srs-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const word = notebook.words[key];
      if (!word || !srsManager) return;
      const cardId = `uservocab_${key}`;
      if (!srsManager.cards[cardId]) {
        srsManager.cards[cardId] = {
          id: cardId,
          refId: key,
          type: 'uservocab',
          french: word.french,
          chinese: word.chinese || '',
          english: word.english || '',
          phonetic: word.phonetic || '',
          partOfSpeech: word.partOfSpeech || '',
          gender: word.gender || '',
          conjugationNote: word.conjugationNote || '',
          exampleFr: word.exampleFr || '',
          reps: 0,
          interval: 0,
          ef: 2.5,
          due: Date.now() - 1000,
          history: [],
          lastReviewed: null
        };
      } else {
        // Make it due immediately so user can practice right away!
        srsManager.cards[cardId].due = Date.now() - 1000;
      }
      srsManager.save();
      if (typeof onPracticeWord === 'function') {
        onPracticeWord();
      }
    });
  });
}

// Export globally
window.UserVocabNotebook = UserVocabNotebook;
window.WordTooltipManager = WordTooltipManager;
window.renderUserVocabView = renderUserVocabView;
