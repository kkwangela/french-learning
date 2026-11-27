// French Learning Database: Verbs, Conjugations, Vocabulary & Context Drills
const FRENCH_DATA = {
  pronouns: [
    { key: "je", label: "Je (J')", alt: "J'" },
    { key: "tu", label: "Tu" },
    { key: "il", label: "Il / Elle / On" },
    { key: "nous", label: "Nous" },
    { key: "vous", label: "Vous" },
    { key: "ils", label: "Ils / Elles" }
  ],

  tenses: [
    { key: "present", name: "Présent", desc: "Present tense (e.g. I speak, I am speaking)" },
    { key: "passeCompose", name: "Passé Composé", desc: "Past tense / completed action (e.g. I spoke, I have spoken)" },
    { key: "imparfait", name: "Imparfait", desc: "Imperfect past / ongoing or habitual action (e.g. I was speaking, I used to speak)" },
    { key: "futur", name: "Futur Simple", desc: "Future tense (e.g. I will speak)" },
    { key: "conditionnel", name: "Conditionnel", desc: "Conditional (e.g. I would speak)" },
    { key: "subjonctif", name: "Subjonctif Présent", desc: "Subjunctive mood for wishes, doubt, necessity (e.g. que je parle)" }
  ],

  verbs: [
    {
      id: "etre",
      infinitive: "être",
      english: "to be",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "été",
      tip: "The most essential verb in French. Highly irregular. In the imperfect, uses stem 'ét-'.",
      conjugations: {
        present: { je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont" },
        passeCompose: { je: "ai été", tu: "as été", il: "a été", nous: "avons été", vous: "avez été", ils: "ont été" },
        imparfait: { je: "étais", tu: "étais", il: "était", nous: "étions", vous: "étiez", ils: "étaient" },
        futur: { je: "serai", tu: "seras", il: "sera", nous: "serons", vous: "serez", ils: "seront" },
        conditionnel: { je: "serais", tu: "serais", il: "serait", nous: "serions", vous: "seriez", ils: "seraient" },
        subjonctif: { je: "sois", tu: "sois", il: "soit", nous: "soyons", vous: "soyez", ils: "soient" }
      },
      examples: [
        { fr: "Je suis ravi de vous rencontrer.", en: "I am delighted to meet you.", tense: "present" },
        { fr: "Nous avons été surpris par cette nouvelle.", en: "We were surprised by this news.", tense: "passeCompose" },
        { fr: "Quand j'étais jeune, je lisais beaucoup.", en: "When I was young, I read a lot.", tense: "imparfait" },
        { fr: "Demain, il sera à Paris.", en: "Tomorrow, he will be in Paris.", tense: "futur" }
      ]
    },
    {
      id: "avoir",
      infinitive: "avoir",
      english: "to have",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "eu",
      tip: "Auxiliary verb for most French compound tenses. Also used for age, hunger, thirst, cold, hot (e.g., J'ai faim).",
      conjugations: {
        present: { je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont" },
        passeCompose: { je: "ai eu", tu: "as eu", il: "a eu", nous: "avons eu", vous: "avez eu", ils: "ont eu" },
        imparfait: { je: "avais", tu: "avais", il: "avait", nous: "avions", vous: "aviez", ils: "avaient" },
        futur: { je: "aurai", tu: "auras", il: "aura", nous: "aurons", vous: "aurez", ils: "auront" },
        conditionnel: { je: "aurais", tu: "aurais", il: "aurait", nous: "aurions", vous: "auriez", ils: "auraient" },
        subjonctif: { je: "aie", tu: "aies", il: "ait", nous: "ayons", vous: "ayez", ils: "aient" }
      },
      examples: [
        { fr: "J'ai vingt-cinq ans.", en: "I am twenty-five years old.", tense: "present" },
        { fr: "Nous avons eu beaucoup de chance.", en: "We were very lucky (had a lot of luck).", tense: "passeCompose" },
        { fr: "Elle avait une belle maison de campagne.", en: "She had a beautiful country house.", tense: "imparfait" },
        { fr: "Demain, nous aurons plus de temps libre.", en: "Tomorrow, we will have more free time.", tense: "futur" }
      ]
    },
    {
      id: "aller",
      infinitive: "aller",
      english: "to go",
      group: "irregular",
      auxiliary: "être",
      participlePass: "allé",
      tip: "Irregular verb of movement; takes 'être' in compound tenses (Je suis allé). Uses 'ir-' stem in future & conditional.",
      conjugations: {
        present: { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" },
        passeCompose: { je: "suis allé", tu: "es allé", il: "est allé", nous: "sommes allés", vous: "êtes allés", ils: "sont allés" },
        imparfait: { je: "allais", tu: "allais", il: "allait", nous: "allions", vous: "alliez", ils: "allaient" },
        futur: { je: "irai", tu: "iras", il: "ira", nous: "irons", vous: "irez", ils: "iront" },
        conditionnel: { je: "irais", tu: "irais", il: "irait", nous: "irions", vous: "iriez", ils: "iraient" },
        subjonctif: { je: "aille", tu: "ailles", il: "aille", nous: "allions", vous: "alliez", ils: "aillent" }
      },
      examples: [
        { fr: "Comment allez-vous aujourd'hui ?", en: "How are you doing today?", tense: "present" },
        { fr: "Elle est allée au marché ce matin.", en: "She went to the market this morning.", tense: "passeCompose" },
        { fr: "Nous irons en vacances en Bretagne cet été.", en: "We will go on vacation to Brittany this summer.", tense: "futur" },
        { fr: "Autrefois, j'allais souvent au cinéma le vendredi.", en: "In the past, I often went to the cinema on Fridays.", tense: "imparfait" }
      ]
    },
    {
      id: "faire",
      infinitive: "faire",
      english: "to do / to make",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "fait",
      tip: "Used for weather (Il fait beau), sports (faire du vélo), and cooking. Note 'vous faites' and 'ils font' in present!",
      conjugations: {
        present: { je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font" },
        passeCompose: { je: "ai fait", tu: "as fait", il: "a fait", nous: "avons fait", vous: "avez fait", ils: "ont fait" },
        imparfait: { je: "faisais", tu: "faisais", il: "faisait", nous: "faisions", vous: "faisiez", ils: "faisaient" },
        futur: { je: "ferai", tu: "feras", il: "fera", nous: "ferons", vous: "ferez", ils: "feront" },
        conditionnel: { je: "ferais", tu: "ferais", il: "ferait", nous: "ferions", vous: "feriez", ils: "feraient" },
        subjonctif: { je: "fasse", tu: "fasses", il: "fasse", nous: "fassions", vous: "fassiez", ils: "fassent" }
      },
      examples: [
        { fr: "Qu'est-ce que vous faites ce week-end ?", en: "What are you doing this weekend?", tense: "present" },
        { fr: "Il a fait très beau hier.", en: "The weather was very nice yesterday.", tense: "passeCompose" },
        { fr: "Je ferais bien une petite pause.", en: "I would gladly take a short break.", tense: "conditionnel" },
        { fr: "Chaque dimanche, nous faisions une promenade dans le parc.", en: "Every Sunday, we used to take a walk in the park.", tense: "imparfait" },
        { fr: "Demain, je ferai un gâteau au chocolat.", en: "Tomorrow, I will make a chocolate cake.", tense: "futur" }
      ]
    },
    {
      id: "pouvoir",
      infinitive: "pouvoir",
      english: "to be able to / can",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "pu",
      tip: "Modal verb. In present: je peux (or formal je puis), tu peux, il peut. Stem in future is 'pourr-'.",
      conjugations: {
        present: { je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent" },
        passeCompose: { je: "ai pu", tu: "as pu", il: "a pu", nous: "avons pu", vous: "avez pu", ils: "ont pu" },
        imparfait: { je: "pouvais", tu: "pouvais", il: "pouvait", nous: "pouvions", vous: "pouviez", ils: "pouvaient" },
        futur: { je: "pourrai", tu: "pourras", il: "pourra", nous: "pourrons", vous: "pourrez", ils: "pourront" },
        conditionnel: { je: "pourrais", tu: "pourrais", il: "pourrait", nous: "pourrions", vous: "pourriez", ils: "pourraient" },
        subjonctif: { je: "puisse", tu: "puisses", il: "puisse", nous: "puissions", vous: "puissiez", ils: "puissent" }
      },
      examples: [
        { fr: "Est-ce que je peux vous aider ?", en: "Can I help you?", tense: "present" },
        { fr: "Nous pourrions réserver une table pour ce soir.", en: "We could reserve a table for tonight.", tense: "conditionnel" },
        { fr: "Hier, je n'ai pas pu finir mon travail à temps.", en: "Yesterday, I could not finish my work on time.", tense: "passeCompose" },
        { fr: "Quand j'étais enfant, je pouvais nager pendant des heures.", en: "When I was a child, I could swim for hours.", tense: "imparfait" },
        { fr: "La semaine prochaine, vous pourrez visiter le musée.", en: "Next week, you will be able to visit the museum.", tense: "futur" }
      ]
    },
    {
      id: "vouloir",
      infinitive: "vouloir",
      english: "to want",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "voulu",
      tip: "'Je voudrais' (conditional) is standard polite French for 'I would like'. Future stem is 'voudr-'.",
      conjugations: {
        present: { je: "veux", tu: "veux", il: "veut", nous: "voulons", vous: "voulez", ils: "veulent" },
        passeCompose: { je: "ai voulu", tu: "as voulu", il: "a voulu", nous: "avons voulu", vous: "avez voulu", ils: "ont voulu" },
        imparfait: { je: "voulais", tu: "voulais", il: "voulait", nous: "voulions", vous: "vouliez", ils: "voulaient" },
        futur: { je: "voudrai", tu: "voudras", il: "voudra", nous: "voudrons", vous: "voudrez", ils: "voudront" },
        conditionnel: { je: "voudrais", tu: "voudrais", il: "voudrait", nous: "voudrions", vous: "voudriez", ils: "voudraient" },
        subjonctif: { je: "veuille", tu: "veuilles", il: "veuille", nous: "voulions", vous: "vouliez", ils: "veuillent" }
      },
      examples: [
        { fr: "Je voudrais un café s'il vous plaît.", en: "I would like a coffee, please.", tense: "conditionnel" },
        { fr: "Ils veulent apprendre la langue française.", en: "They want to learn the French language.", tense: "present" },
        { fr: "Elle a voulu apprendre le français avant son voyage.", en: "She wanted to learn French before her trip.", tense: "passeCompose" },
        { fr: "Avant, nous voulions habiter près de la mer.", en: "Before, we wanted to live near the sea.", tense: "imparfait" },
        { fr: "Tu voudras sûrement revenir à Paris un jour.", en: "You will surely want to come back to Paris one day.", tense: "futur" }
      ]
    },
    {
      id: "devoir",
      infinitive: "devoir",
      english: "must / to have to / to owe",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "dû",
      tip: "Notice the circumflex on past participle 'dû' to differentiate from 'du' (article). Future stem: 'devr-'.",
      conjugations: {
        present: { je: "dois", tu: "dois", il: "doit", nous: "devons", vous: "devez", ils: "doivent" },
        passeCompose: { je: "ai dû", tu: "as dû", il: "a dû", nous: "avons dû", vous: "avez dû", ils: "ont dû" },
        imparfait: { je: "devais", tu: "devais", il: "devait", nous: "devions", vous: "deviez", ils: "devaient" },
        futur: { je: "devrai", tu: "devras", il: "devra", nous: "devrons", vous: "devrez", ils: "devront" },
        conditionnel: { je: "devrais", tu: "devrais", il: "devrait", nous: "devrions", vous: "devriez", ils: "devraient" },
        subjonctif: { je: "doive", tu: "doives", il: "doive", nous: "devions", vous: "deviez", ils: "doivent" }
      },
      examples: [
        { fr: "Vous devez partir avant minuit.", en: "You must leave before midnight.", tense: "present" },
        { fr: "Tu devrais te reposer un peu.", en: "You should rest a bit.", tense: "conditionnel" },
        { fr: "J'ai dû prendre le train très tôt ce matin.", en: "I had to take the train very early this morning.", tense: "passeCompose" },
        { fr: "À l'école, nous devions étudier tous les soirs.", en: "At school, we had to study every evening.", tense: "imparfait" },
        { fr: "Demain, il devra préparer sa valise pour le voyage.", en: "Tomorrow, he will have to pack his suitcase for the trip.", tense: "futur" }
      ]
    },
    {
      id: "savoir",
      infinitive: "savoir",
      english: "to know (facts, how to do something)",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "su",
      tip: "'Savoir' means knowing a fact or skill. 'Connaître' means being familiar with people, places, or things.",
      conjugations: {
        present: { je: "sais", tu: "sais", il: "sait", nous: "savons", vous: "savez", ils: "savent" },
        passeCompose: { je: "ai su", tu: "as su", il: "a su", nous: "avons su", vous: "avez su", ils: "ont su" },
        imparfait: { je: "savais", tu: "savais", il: "savait", nous: "savions", vous: "saviez", ils: "savaient" },
        futur: { je: "saurai", tu: "sauras", il: "saura", nous: "saurons", vous: "saurez", ils: "sauront" },
        conditionnel: { je: "saurais", tu: "saurais", il: "saurait", nous: "saurions", vous: "sauriez", ils: "sauraient" },
        subjonctif: { je: "sache", tu: "saches", il: "sache", nous: "sachions", vous: "sachiez", ils: "sachent" }
      },
      examples: [
        { fr: "Je ne sais pas la réponse.", en: "I do not know the answer.", tense: "present" },
        { fr: "Elle sait parler trois langues.", en: "She knows how to speak three languages.", tense: "present" },
        { fr: "Hier, j'ai su la bonne nouvelle par téléphone.", en: "Yesterday, I found out the good news by phone.", tense: "passeCompose" },
        { fr: "À cette époque, je ne savais pas encore parler français.", en: "At that time, I did not know how to speak French yet.", tense: "imparfait" },
        { fr: "Bientôt, tu sauras conjuguer tous les verbes.", en: "Soon, you will know how to conjugate all the verbs.", tense: "futur" }
      ]
    },
    {
      id: "prendre",
      infinitive: "prendre",
      english: "to take / to have (food/drink)",
      group: "re",
      auxiliary: "avoir",
      participlePass: "pris",
      tip: "Note the stem change: nous prenons, vous prenez, ils prennent (double 'n'). Model for apprendre & comprendre.",
      conjugations: {
        present: { je: "prends", tu: "prends", il: "prend", nous: "prenons", vous: "prenez", ils: "prennent" },
        passeCompose: { je: "ai pris", tu: "as pris", il: "a pris", nous: "avons pris", vous: "avez pris", ils: "ont pris" },
        imparfait: { je: "prenais", tu: "prenais", il: "prenait", nous: "prenions", vous: "preniez", ils: "prenaient" },
        futur: { je: "prendrai", tu: "prendras", il: "prendra", nous: "prendrons", vous: "prendrez", ils: "prendront" },
        conditionnel: { je: "prendrais", tu: "prendrais", il: "prendrait", nous: "prendrions", vous: "prendriez", ils: "prendraient" },
        subjonctif: { je: "prenne", tu: "prennes", il: "prenne", nous: "prenions", vous: "preniez", ils: "prennent" }
      },
      examples: [
        { fr: "Je prends le métro chaque matin.", en: "I take the subway every morning.", tense: "present" },
        { fr: "Nous avons pris un café en terrasse.", en: "We had a coffee on the terrace.", tense: "passeCompose" },
        { fr: "En été, nous prenions toujours notre petit-déjeuner sur le balcon.", en: "In summer, we always used to have breakfast on the balcony.", tense: "imparfait" },
        { fr: "Demain matin, je prendrai le premier train pour Lyon.", en: "Tomorrow morning, I will take the first train to Lyon.", tense: "futur" }
      ]
    },
    {
      id: "venir",
      infinitive: "venir",
      english: "to come",
      group: "ir",
      auxiliary: "être",
      participlePass: "venu",
      tip: "Takes 'être' auxiliary (Je suis venu). In present: viens, viens, vient, venons, venez, viennent. Future stem: 'viendr-'.",
      conjugations: {
        present: { je: "viens", tu: "viens", il: "vient", nous: "venons", vous: "venez", ils: "viennent" },
        passeCompose: { je: "suis venu", tu: "es venu", il: "est venu", nous: "sommes venus", vous: "êtes venus", ils: "sont venus" },
        imparfait: { je: "venais", tu: "venais", il: "venait", nous: "venions", vous: "veniez", ils: "venaient" },
        futur: { je: "viendrai", tu: "viendras", il: "viendra", nous: "viendrons", vous: "viendrez", ils: "viendront" },
        conditionnel: { je: "viendrais", tu: "viendrais", il: "viendrait", nous: "viendrions", vous: "viendriez", ils: "viendraient" },
        subjonctif: { je: "vienne", tu: "viennes", il: "vienne", nous: "venions", vous: "veniez", ils: "viennent" }
      },
      examples: [
        { fr: "Tu viens avec nous au restaurant ?", en: "Are you coming with us to the restaurant?", tense: "present" },
        { fr: "Ils sont venus de Lyon.", en: "They came from Lyon.", tense: "passeCompose" },
        { fr: "Avant, nos amis venaient dîner chez nous chaque samedi.", en: "Before, our friends used to come over for dinner every Saturday.", tense: "imparfait" },
        { fr: "L'année prochaine, elle viendra nous voir à Paris.", en: "Next year, she will come to see us in Paris.", tense: "futur" }
      ]
    },
    {
      id: "voir",
      infinitive: "voir",
      english: "to see",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "vu",
      tip: "In future: stem is 'verr-' (je verrai). Present: je vois, nous voyons, ils voient.",
      conjugations: {
        present: { je: "vois", tu: "vois", il: "voit", nous: "voyons", vous: "voyez", ils: "voient" },
        passeCompose: { je: "ai vu", tu: "as vu", il: "a vu", nous: "avons vu", vous: "avez vu", ils: "ont vu" },
        imparfait: { je: "voyais", tu: "voyais", il: "voyait", nous: "voyions", vous: "voyiez", ils: "voyaient" },
        futur: { je: "verrai", tu: "verras", il: "verra", nous: "verrons", vous: "verrez", ils: "verront" },
        conditionnel: { je: "verrais", tu: "verrais", il: "verrait", nous: "verrions", vous: "verriez", ils: "verraient" },
        subjonctif: { je: "voie", tu: "voies", il: "voie", nous: "voyions", vous: "voyiez", ils: "voient" }
      },
      examples: [
        { fr: "Je vois ce que tu veux dire.", en: "I see what you mean.", tense: "present" },
        { fr: "On verra bien ce qui se passera.", en: "We shall see what happens.", tense: "futur" },
        { fr: "Hier soir, nous avons vu un film magnifique.", en: "Last night, we saw a wonderful movie.", tense: "passeCompose" },
        { fr: "De sa fenêtre, il voyait la tour Eiffel tous les jours.", en: "From his window, he could see the Eiffel Tower every day.", tense: "imparfait" }
      ]
    },
    {
      id: "dire",
      infinitive: "dire",
      english: "to say / to tell",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "dit",
      tip: "Watch out for 'vous dites' (NOT vous disez)! Present: dis, dis, dit, disons, dites, disent.",
      conjugations: {
        present: { je: "dis", tu: "dis", il: "dit", nous: "disons", vous: "dites", ils: "disent" },
        passeCompose: { je: "ai dit", tu: "as dit", il: "a dit", nous: "avons dit", vous: "avez dit", ils: "ont dit" },
        imparfait: { je: "disais", tu: "disais", il: "disait", nous: "disions", vous: "disiez", ils: "disaient" },
        futur: { je: "dirai", tu: "diras", il: "dira", nous: "dirons", vous: "direz", ils: "diront" },
        conditionnel: { je: "dirais", tu: "dirais", il: "dirait", nous: "dirions", vous: "diriez", ils: "diraient" },
        subjonctif: { je: "dise", tu: "dises", il: "dise", nous: "disions", vous: "disiez", ils: "disent" }
      },
      examples: [
        { fr: "Qu'est-ce que vous dites ?", en: "What are you saying?", tense: "present" },
        { fr: "Il a dit la vérité.", en: "He told the truth.", tense: "passeCompose" },
        { fr: "Ma grand-mère disait toujours qu'il faut rester patient.", en: "My grandmother always used to say that one must stay patient.", tense: "imparfait" },
        { fr: "Je te dirai toute l'histoire demain.", en: "I will tell you the whole story tomorrow.", tense: "futur" }
      ]
    },
    {
      id: "mettre",
      infinitive: "mettre",
      english: "to put / to place / to wear",
      group: "re",
      auxiliary: "avoir",
      participlePass: "mis",
      tip: "Single 't' in singular present (mets, mets, met), double 't' in plural (mettons, mettez, mettent).",
      conjugations: {
        present: { je: "mets", tu: "mets", il: "met", nous: "mettons", vous: "mettez", ils: "mettent" },
        passeCompose: { je: "ai mis", tu: "as mis", il: "a mis", nous: "avons mis", vous: "avez mis", ils: "ont mis" },
        imparfait: { je: "mettais", tu: "mettais", il: "mettait", nous: "mettions", vous: "mettiez", ils: "mettaient" },
        futur: { je: "mettrai", tu: "mettras", il: "mettra", nous: "mettrons", vous: "mettrez", ils: "mettront" },
        conditionnel: { je: "mettrais", tu: "mettrais", il: "mettrait", nous: "mettrions", vous: "mettriez", ils: "mettraient" },
        subjonctif: { je: "mette", tu: "mettes", il: "mette", nous: "mettions", vous: "mettiez", ils: "mettent" }
      },
      examples: [
        { fr: "Où as-tu mis les clés ?", en: "Where did you put the keys?", tense: "passeCompose" },
        { fr: "Elle met son manteau chaud.", en: "She puts on her warm coat.", tense: "present" },
        { fr: "En hiver, je mettais toujours une écharpe rouge.", en: "In winter, I always used to wear a red scarf.", tense: "imparfait" },
        { fr: "Nous mettrons les livres sur la grande table.", en: "We will put the books on the big table.", tense: "futur" }
      ]
    },
    {
      id: "parler",
      infinitive: "parler",
      english: "to speak / to talk",
      group: "er",
      auxiliary: "avoir",
      participlePass: "parlé",
      tip: "The quintessential regular 1st-group verb (-er). Endings: -e, -es, -e, -ons, -ez, -ent.",
      conjugations: {
        present: { je: "parle", tu: "parles", il: "parle", nous: "parlons", vous: "parlez", ils: "parlent" },
        passeCompose: { je: "ai parlé", tu: "as parlé", il: "a parlé", nous: "avons parlé", vous: "avez parlé", ils: "ont parlé" },
        imparfait: { je: "parlais", tu: "parlais", il: "parlait", nous: "parlions", vous: "parliez", ils: "parlaient" },
        futur: { je: "parlerai", tu: "parleras", il: "parlera", nous: "parlerons", vous: "parlerez", ils: "parleront" },
        conditionnel: { je: "parlerais", tu: "parlerais", il: "parlerait", nous: "parlerions", vous: "parleriez", ils: "parleraient" },
        subjonctif: { je: "parle", tu: "parles", il: "parle", nous: "parlions", vous: "parliez", ils: "parlent" }
      },
      examples: [
        { fr: "Nous parlons français et anglais.", en: "We speak French and English.", tense: "present" },
        { fr: "J'ai parlé avec mon professeur.", en: "I spoke with my teacher.", tense: "passeCompose" },
        { fr: "Quand j'habitais à Paris, je parlais français tous les jours.", en: "When I lived in Paris, I spoke French every day.", tense: "imparfait" },
        { fr: "Bientôt, tu parleras français couramment !", en: "Soon, you will speak French fluently!", tense: "futur" }
      ]
    },
    {
      id: "aimer",
      infinitive: "aimer",
      english: "to like / to love",
      group: "er",
      auxiliary: "avoir",
      participlePass: "aimé",
      tip: "Regular -er verb. J'aime (elision with J'). Aimer bien = to like; aimer (a person) = to love.",
      conjugations: {
        present: { je: "aime", tu: "aimes", il: "aime", nous: "aimons", vous: "aimez", ils: "aiment" },
        passeCompose: { je: "ai aimé", tu: "as aimé", il: "a aimé", nous: "avons aimé", vous: "avez aimé", ils: "ont aimé" },
        imparfait: { je: "aimais", tu: "aimais", il: "aimait", nous: "aimions", vous: "aimiez", ils: "aimaient" },
        futur: { je: "aimerai", tu: "aimeras", il: "aimera", nous: "aimerons", vous: "aimerez", ils: "aimeront" },
        conditionnel: { je: "aimerais", tu: "aimerais", il: "aimerait", nous: "aimerions", vous: "aimeriez", ils: "aimeraient" },
        subjonctif: { je: "aime", tu: "aimes", il: "aime", nous: "aimions", vous: "aimiez", ils: "aiment" }
      },
      examples: [
        { fr: "J'aime la musique classique.", en: "I like classical music.", tense: "present" },
        { fr: "J'aimerais visiter le musée du Louvre.", en: "I would like to visit the Louvre museum.", tense: "conditionnel" },
        { fr: "Nous avons beaucoup aimé ce petit café parisien.", en: "We really liked that little Parisian café.", tense: "passeCompose" },
        { fr: "Quand elle était petite, elle aimait dessiner des chats.", en: "When she was little, she loved drawing cats.", tense: "imparfait" },
        { fr: "Tu aimeras certainement ce nouveau restaurant.", en: "You will certainly love this new restaurant.", tense: "futur" }
      ]
    },
    {
      id: "manger",
      infinitive: "manger",
      english: "to eat",
      group: "er",
      auxiliary: "avoir",
      participlePass: "mangé",
      tip: "Verbs in -ger keep the 'e' before 'o' and 'a': 'nous mangeons', 'je mangeais' to keep soft 'g' sound.",
      conjugations: {
        present: { je: "mange", tu: "manges", il: "mange", nous: "mangeons", vous: "mangez", ils: "mangent" },
        passeCompose: { je: "ai mangé", tu: "as mangé", il: "a mangé", nous: "avons mangé", vous: "avez mangé", ils: "ont mangé" },
        imparfait: { je: "mangeais", tu: "mangeais", il: "mangeait", nous: "mangions", vous: "mangiez", ils: "mangeaient" },
        futur: { je: "mangerai", tu: "mangeras", il: "mangera", nous: "mangerons", vous: "mangerez", ils: "mangeront" },
        conditionnel: { je: "mangerais", tu: "mangerais", il: "mangerait", nous: "mangerions", vous: "mangeriez", ils: "mangeraient" },
        subjonctif: { je: "mange", tu: "manges", il: "mange", nous: "mangions", vous: "mangiez", ils: "mangent" }
      },
      examples: [
        { fr: "Nous mangeons des croissants le dimanche.", en: "We eat croissants on Sundays.", tense: "present" },
        { fr: "Ils ont mangé dans un bistrot parisien.", en: "They ate at a Parisian bistro.", tense: "passeCompose" },
        { fr: "Chez mes parents, nous mangions souvent de la soupe le soir.", en: "At my parents' house, we often ate soup in the evening.", tense: "imparfait" },
        { fr: "Ce soir, nous mangerons dans une crêperie.", en: "Tonight, we will eat at a crêperie.", tense: "futur" }
      ]
    },
    {
      id: "finir",
      infinitive: "finir",
      english: "to finish",
      group: "ir",
      auxiliary: "avoir",
      participlePass: "fini",
      tip: "Regular 2nd group verb (-ir). Characterized by '-iss-' in plural: finissons, finissez, finissent.",
      conjugations: {
        present: { je: "finis", tu: "finis", il: "finit", nous: "finissons", vous: "finissez", ils: "finissent" },
        passeCompose: { je: "ai fini", tu: "as fini", il: "a fini", nous: "avons fini", vous: "avez fini", ils: "ont fini" },
        imparfait: { je: "finissais", tu: "finissais", il: "finissait", nous: "finissions", vous: "finissiez", ils: "finissaient" },
        futur: { je: "finirai", tu: "finiras", il: "finira", nous: "finirons", vous: "finirez", ils: "finiront" },
        conditionnel: { je: "finirais", tu: "finirais", il: "finirait", nous: "finirions", vous: "finiriez", ils: "finiraient" },
        subjonctif: { je: "finisse", tu: "finisses", il: "finisse", nous: "finissions", vous: "finissiez", ils: "finissent" }
      },
      examples: [
        { fr: "Je finis mes devoirs et j'arrive.", en: "I finish my homework and I'm coming.", tense: "present" },
        { fr: "Nous avons enfin fini le projet.", en: "We finally finished the project.", tense: "passeCompose" },
        { fr: "Avant, il finissait toujours son travail à dix-huit heures.", en: "Before, he always finished his work at six p.m.", tense: "imparfait" },
        { fr: "Je finirai ce livre avant la fin de la semaine.", en: "I will finish this book before the end of the week.", tense: "futur" }
      ]
    },
    {
      id: "choisir",
      infinitive: "choisir",
      english: "to choose",
      group: "ir",
      auxiliary: "avoir",
      participlePass: "choisi",
      tip: "Follows same regular 2nd group pattern as finir with '-iss-' insertion in plural.",
      conjugations: {
        present: { je: "choisis", tu: "choisis", il: "choisit", nous: "choisissons", vous: "choisissez", ils: "choisissent" },
        passeCompose: { je: "ai choisi", tu: "as choisi", il: "a choisi", nous: "avons choisi", vous: "avez choisi", ils: "ont choisi" },
        imparfait: { je: "choisissais", tu: "choisissais", il: "choisissait", nous: "choisissions", vous: "choisissiez", ils: "choisissaient" },
        futur: { je: "choisirai", tu: "choisiras", il: "choisira", nous: "choisirons", vous: "choisirez", ils: "choisiront" },
        conditionnel: { je: "choisirais", tu: "choisirais", il: "choisirait", nous: "choisirions", vous: "choisiriez", ils: "choisiraient" },
        subjonctif: { je: "choisisse", tu: "choisisses", il: "choisisse", nous: "choisissions", vous: "choisissiez", ils: "choisissent" }
      },
      examples: [
        { fr: "Quel dessert choisissez-vous ?", en: "Which dessert are you choosing?", tense: "present" },
        { fr: "Elle a choisi la robe bleue.", en: "She chose the blue dress.", tense: "passeCompose" },
        { fr: "Chaque matin, nous choisissions des croissants tout chauds.", en: "Every morning, we used to choose warm croissants.", tense: "imparfait" },
        { fr: "Demain, vous choisirez votre destination de vacances.", en: "Tomorrow, you will choose your vacation destination.", tense: "futur" }
      ]
    },
    {
      id: "attendre",
      infinitive: "attendre",
      english: "to wait (for)",
      group: "re",
      auxiliary: "avoir",
      participlePass: "attendu",
      tip: "Regular 3rd group -re verb. Notice 'il attend' has no added ending consonant (ends on stem -d).",
      conjugations: {
        present: { je: "attends", tu: "attends", il: "attend", nous: "attendons", vous: "attendez", ils: "attendent" },
        passeCompose: { je: "ai attendu", tu: "as attendu", il: "a attendu", nous: "avons attendu", vous: "avez attendu", ils: "ont attendu" },
        imparfait: { je: "attendais", tu: "attendais", il: "attendait", nous: "attendions", vous: "attendiez", ils: "attendaient" },
        futur: { je: "attendrai", tu: "attendras", il: "attendra", nous: "attendrons", vous: "attendrez", ils: "attendront" },
        conditionnel: { je: "attendrais", tu: "attendrais", il: "attendrait", nous: "attendrions", vous: "attendriez", ils: "attendraient" },
        subjonctif: { je: "attende", tu: "attendes", il: "attende", nous: "attendions", vous: "attendiez", ils: "attendent" }
      },
      examples: [
        { fr: "J'attends le bus depuis dix minutes.", en: "I have been waiting for the bus for ten minutes.", tense: "present" },
        { fr: "Nous avons attendu nos amis à la gare.", en: "We waited for our friends at the station.", tense: "passeCompose" },
        { fr: "Autrefois, j'attendais longtemps le bus sous la pluie.", en: "In the past, I used to wait a long time for the bus in the rain.", tense: "imparfait" },
        { fr: "Je t'attendrai devant l'entrée du musée.", en: "I will wait for you in front of the museum entrance.", tense: "futur" }
      ]
    },
    {
      id: "comprendre",
      infinitive: "comprendre",
      english: "to understand / to comprise",
      group: "re",
      auxiliary: "avoir",
      participlePass: "compris",
      tip: "Conjugates identically to 'prendre' (comprends, comprenez, comprennent). Past participle is 'compris'.",
      conjugations: {
        present: { je: "comprends", tu: "comprends", il: "comprend", nous: "comprenons", vous: "comprenez", ils: "comprennent" },
        passeCompose: { je: "ai compris", tu: "as compris", il: "a compris", nous: "avons compris", vous: "avez compris", ils: "ont compris" },
        imparfait: { je: "comprenais", tu: "comprenais", il: "comprenait", nous: "comprenions", vous: "compreniez", ils: "comprenaient" },
        futur: { je: "comprendrai", tu: "comprendras", il: "comprendra", nous: "comprendrons", vous: "comprendrez", ils: "comprendront" },
        conditionnel: { je: "comprendrais", tu: "comprendrais", il: "comprendrait", nous: "comprendrions", vous: "comprendriez", ils: "comprendraient" },
        subjonctif: { je: "comprenne", tu: "comprennes", il: "comprenne", nous: "comprenions", vous: "compreniez", ils: "comprennent" }
      },
      examples: [
        { fr: "Est-ce que vous comprenez cette phrase ?", en: "Do you understand this sentence?", tense: "present" },
        { fr: "J'ai tout à fait compris votre explication.", en: "I completely understood your explanation.", tense: "passeCompose" },
        { fr: "Au début, je ne comprenais pas quand les Français parlaient vite.", en: "At first, I did not understand when French people spoke fast.", tense: "imparfait" },
        { fr: "Avec de la pratique, vous comprendrez tout facilement.", en: "With practice, you will understand everything easily.", tense: "futur" }
      ]
    },
    {
      id: "partir",
      infinitive: "partir",
      english: "to leave / to depart",
      group: "ir",
      auxiliary: "être",
      participlePass: "parti",
      tip: "Takes 'être' in compound tenses. Drop final stem consonant in singular present: pars, pars, part, partons.",
      conjugations: {
        present: { je: "pars", tu: "pars", il: "part", nous: "partons", vous: "partez", ils: "partent" },
        passeCompose: { je: "suis parti", tu: "es parti", il: "est parti", nous: "sommes partis", vous: "êtes partis", ils: "sont partis" },
        imparfait: { je: "partais", tu: "partais", il: "partait", nous: "partions", vous: "partiez", ils: "partaient" },
        futur: { je: "partirai", tu: "partiras", il: "partira", nous: "partirons", vous: "partirez", ils: "partiront" },
        conditionnel: { je: "partirais", tu: "partirais", il: "partirait", nous: "partirions", vous: "partiriez", ils: "partiraient" },
        subjonctif: { je: "parte", tu: "partes", il: "parte", nous: "partions", vous: "partiez", ils: "partent" }
      },
      examples: [
        { fr: "Le train part à huit heures pile.", en: "The train leaves at eight o'clock sharp.", tense: "present" },
        { fr: "Ils sont partis en voyage ce matin.", en: "They left on a trip this morning.", tense: "passeCompose" },
        { fr: "Chaque été, notre famille partait en vacances en août.", en: "Every summer, our family used to leave on vacation in August.", tense: "imparfait" },
        { fr: "Demain matin, nous partirons très tôt pour l'aéroport.", en: "Tomorrow morning, we will leave very early for the airport.", tense: "futur" }
      ]
    },
    {
      id: "écrire",
      infinitive: "écrire",
      english: "to write",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "écrit",
      tip: "Stem adds 'v' in plural present: écrivons, écrivez, écrivent. Same for imparfait: écrivais.",
      conjugations: {
        present: { je: "écris", tu: "écris", il: "écrit", nous: "écrivons", vous: "écrivez", ils: "écrivent" },
        passeCompose: { je: "ai écrit", tu: "as écrit", il: "a écrit", nous: "avons écrit", vous: "avez écrit", ils: "ont écrit" },
        imparfait: { je: "écrivais", tu: "écrivais", il: "écrivait", nous: "écrivions", vous: "écriviez", ils: "écrivaient" },
        futur: { je: "écrirai", tu: "écriras", il: "écrira", nous: "écrirons", vous: "écrirez", ils: "écriront" },
        conditionnel: { je: "écrirais", tu: "écrirais", il: "écrirait", nous: "écririons", vous: "écririez", ils: "écriraient" },
        subjonctif: { je: "écrive", tu: "écrives", il: "écrive", nous: "écrivions", vous: "écriviez", ils: "écrivent" }
      },
      examples: [
        { fr: "J'écris un courriel à mon collègue.", en: "I am writing an email to my colleague.", tense: "present" },
        { fr: "Elle a écrit un roman passionnant.", en: "She wrote a gripping novel.", tense: "passeCompose" },
        { fr: "Autrefois, les gens écrivaient souvent des lettres à la main.", en: "In the past, people often wrote letters by hand.", tense: "imparfait" },
        { fr: "Je t'écrirai dès que j'arriverai à Paris.", en: "I will write to you as soon as I arrive in Paris.", tense: "futur" }
      ]
    },
    {
      id: "lire",
      infinitive: "lire",
      english: "to read",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "lu",
      tip: "Plural stem adds 's': lisons, lisez, lisent. Past participle is short: 'lu'.",
      conjugations: {
        present: { je: "lis", tu: "lis", il: "lit", nous: "lisons", vous: "lisez", ils: "lisent" },
        passeCompose: { je: "ai lu", tu: "as lu", il: "a lu", nous: "avons lu", vous: "avez lu", ils: "ont lu" },
        imparfait: { je: "lisais", tu: "lisais", il: "lisait", nous: "lisions", vous: "lisiez", ils: "lisaient" },
        futur: { je: "lirai", tu: "liras", il: "lira", nous: "lirons", vous: "lirez", ils: "liront" },
        conditionnel: { je: "lirais", tu: "lirais", il: "lirait", nous: "lirions", vous: "liriez", ils: "liraient" },
        subjonctif: { je: "lise", tu: "lises", il: "lise", nous: "lisions", vous: "lisiez", ils: "lisent" }
      },
      examples: [
        { fr: "Tu lis quel journal d'habitude ?", en: "Which newspaper do you usually read?", tense: "present" },
        { fr: "J'ai lu ce livre d'une seule traite.", en: "I read this book in one sitting.", tense: "passeCompose" },
        { fr: "Enfant, je lisais une histoire chaque soir avant de dormir.", en: "As a child, I used to read a story every night before sleeping.", tense: "imparfait" },
        { fr: "Pendant le vol, elle lira un roman français.", en: "During the flight, she will read a French novel.", tense: "futur" }
      ]
    },
    {
      id: "boire",
      infinitive: "boire",
      english: "to drink",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "bu",
      tip: "Multiple stem changes: je bois, nous buvons, ils boivent. Past participle: 'bu'.",
      conjugations: {
        present: { je: "bois", tu: "bois", il: "boit", nous: "buvons", vous: "buvez", ils: "boivent" },
        passeCompose: { je: "ai bu", tu: "as bu", il: "a bu", nous: "avons bu", vous: "avez bu", ils: "ont bu" },
        imparfait: { je: "buvais", tu: "buvais", il: "buvait", nous: "buvions", vous: "buviez", ils: "buvaient" },
        futur: { je: "boirai", tu: "boiras", il: "boira", nous: "boirons", vous: "boirez", ils: "boiront" },
        conditionnel: { je: "boirais", tu: "boirais", il: "boirait", nous: "boirions", vous: "boiriez", ils: "boiraient" },
        subjonctif: { je: "boive", tu: "boives", il: "boive", nous: "buvions", vous: "buviez", ils: "boivent" }
      },
      examples: [
        { fr: "Je bois de l'eau minérale chaque jour.", en: "I drink mineral water every day.", tense: "present" },
        { fr: "Nous avons bu un bon thé à la menthe.", en: "We drank a good mint tea.", tense: "passeCompose" },
        { fr: "Avant, nous buvions du café ensemble après le déjeuner.", en: "Before, we used to drink coffee together after lunch.", tense: "imparfait" },
        { fr: "Ce soir, je boirai une tasse de tisane chaude.", en: "Tonight, I will drink a cup of hot herbal tea.", tense: "futur" }
      ]
    },
    {
      id: "croire",
      infinitive: "croire",
      english: "to believe / to think",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "cru",
      tip: "Present: crois, crois, croit, croyons, croyez, croient. Note 'y' in nous & vous.",
      conjugations: {
        present: { je: "crois", tu: "crois", il: "croit", nous: "croyons", vous: "croyez", ils: "croient" },
        passeCompose: { je: "ai cru", tu: "as cru", il: "a cru", nous: "avons cru", vous: "avez cru", ils: "ont cru" },
        imparfait: { je: "croyais", tu: "croyais", il: "croyait", nous: "croyions", vous: "croyiez", ils: "croyaient" },
        futur: { je: "croirai", tu: "croiras", il: "croira", nous: "croirons", vous: "croirez", ils: "croiront" },
        conditionnel: { je: "croirais", tu: "croirais", il: "croirait", nous: "croirions", vous: "croiriez", ils: "croiraient" },
        subjonctif: { je: "croie", tu: "croies", il: "croie", nous: "croyions", vous: "croyiez", ils: "croient" }
      },
      examples: [
        { fr: "Je crois qu'il va faire beau demain.", en: "I think the weather will be nice tomorrow.", tense: "present" },
        { fr: "Elle a toujours cru en ses rêves.", en: "She always believed in her dreams.", tense: "passeCompose" },
        { fr: "Quand j'étais jeune, je croyais que le français était trop difficile.", en: "When I was young, I used to think French was too hard.", tense: "imparfait" },
        { fr: "Tu ne croiras jamais ce qui m'est arrivé aujourd'hui !", en: "You will never believe what happened to me today!", tense: "futur" }
      ]
    },
    {
      id: "dormir",
      infinitive: "dormir",
      english: "to sleep",
      group: "ir",
      auxiliary: "avoir",
      participlePass: "dormi",
      tip: "Drops 'm' in singular: dors, dors, dort; keeps 'm' in plural: dormons, dormez, dorment.",
      conjugations: {
        present: { je: "dors", tu: "dors", il: "dort", nous: "dormons", vous: "dormez", ils: "dorment" },
        passeCompose: { je: "ai dormi", tu: "as dormi", il: "a dormi", nous: "avons dormi", vous: "avez dormi", ils: "ont dormi" },
        imparfait: { je: "dormais", tu: "dormais", il: "dormait", nous: "dormions", vous: "dormiez", ils: "dormaient" },
        futur: { je: "dormirai", tu: "dormiras", il: "dormira", nous: "dormirons", vous: "dormirez", ils: "dormiront" },
        conditionnel: { je: "dormirais", tu: "dormirais", il: "dormirait", nous: "dormirions", vous: "dormiriez", ils: "dormiraient" },
        subjonctif: { je: "dorme", tu: "dormes", il: "dorme", nous: "dormions", vous: "dormiez", ils: "dorment" }
      },
      examples: [
        { fr: "L'enfant dort paisiblement.", en: "The child is sleeping peacefully.", tense: "present" },
        { fr: "J'ai très bien dormi cette nuit.", en: "I slept very well last night.", tense: "passeCompose" },
        { fr: "Le chat dormait paisiblement près de la fenêtre.", en: "The cat was sleeping peacefully near the window.", tense: "imparfait" },
        { fr: "Ce soir, nous dormirons tôt après ce long voyage.", en: "Tonight, we will sleep early after this long trip.", tense: "futur" }
      ]
    },
    {
      id: "connaitre",
      infinitive: "connaître",
      english: "to know (a person, place, or thing)",
      group: "re",
      auxiliary: "avoir",
      participlePass: "connu",
      tip: "Double 's' in plural: connaissons, connaissez, connaissent. Circumflex appears before 't': il connaît.",
      conjugations: {
        present: { je: "connais", tu: "connais", il: "connaît", nous: "connaissons", vous: "connaissez", ils: "connaissent" },
        passeCompose: { je: "ai connu", tu: "as connu", il: "a connu", nous: "avons connu", vous: "avez connu", ils: "ont connu" },
        imparfait: { je: "connaissais", tu: "connaissais", il: "connaissait", nous: "connaissions", vous: "connaissiez", ils: "connaissaient" },
        futur: { je: "connaîtrai", tu: "connaîtras", il: "connaîtra", nous: "connaîtrons", vous: "connaîtrez", ils: "connaîtront" },
        conditionnel: { je: "connaîtrais", tu: "connaîtrais", il: "connaîtrait", nous: "connaîtrions", vous: "connaîtriez", ils: "connaîtraient" },
        subjonctif: { je: "connaisse", tu: "connaisses", il: "connaisse", nous: "connaissions", vous: "connaissiez", ils: "connaissent" }
      },
      examples: [
        { fr: "Est-ce que tu connais ce quartier ?", en: "Do you know this neighborhood?", tense: "present" },
        { fr: "Nous nous sommes connus à l'université.", en: "We met each other at university.", tense: "passeCompose" },
        { fr: "Avant mon voyage, je ne connaissais personne en France.", en: "Before my trip, I did not know anyone in France.", tense: "imparfait" },
        { fr: "Bientôt, tu connaîtras tous les meilleurs cafés du quartier.", en: "Soon, you will know all the best cafés in the neighborhood.", tense: "futur" }
      ]
    },
    {
      id: "se-lever",
      infinitive: "se lever",
      english: "to get up / to rise",
      group: "er",
      auxiliary: "être",
      participlePass: "levé",
      tip: "Reflexive verb (pronominal). Stem changes 'e' to 'è' in singular and 3rd plural (je me lève). Takes 'être'!",
      conjugations: {
        present: { je: "me lève", tu: "te lèves", il: "se lève", nous: "nous levons", vous: "vous levez", ils: "se lèvent" },
        passeCompose: { je: "me suis levé", tu: "t'es levé", il: "s'est levé", nous: "nous sommes levés", vous: "vous êtes levés", ils: "se sont levés" },
        imparfait: { je: "me levais", tu: "te levais", il: "se levait", nous: "nous levions", vous: "vous leviez", ils: "se levaient" },
        futur: { je: "me lèverai", tu: "te lèveras", il: "se lèvera", nous: "nous lèverons", vous: "vous lèverez", ils: "se lèveront" },
        conditionnel: { je: "me lèverais", tu: "te lèverais", il: "se lèverait", nous: "nous lèverions", vous: "vous lèveriez", ils: "se lèveraient" },
        subjonctif: { je: "me lève", tu: "te lèves", il: "se lève", nous: "nous levions", vous: "vous leviez", ils: "se lèvent" }
      },
      examples: [
        { fr: "Je me lève à sept heures en semaine.", en: "I get up at seven o'clock on weekdays.", tense: "present" },
        { fr: "Ils se sont levés très tôt ce matin.", en: "They got up very early this morning.", tense: "passeCompose" },
        { fr: "Pendant les vacances, je me levais toujours vers dix heures.", en: "During vacation, I always used to get up around ten o'clock.", tense: "imparfait" },
        { fr: "Demain, nous nous lèverons à six heures pour prendre le train.", en: "Tomorrow, we will get up at six o'clock to catch the train.", tense: "futur" }
      ]
    },
    {
      id: "se-souvenir",
      infinitive: "se souvenir",
      english: "to remember",
      group: "ir",
      auxiliary: "être",
      participlePass: "souvenu",
      tip: "Reflexive verb conjugated like venir with 'de' (se souvenir de quelque chose). Takes 'être' auxiliary.",
      conjugations: {
        present: { je: "me souviens", tu: "te souviens", il: "se souvient", nous: "nous souvenons", vous: "vous souvenez", ils: "se souviennent" },
        passeCompose: { je: "me suis souvenu", tu: "t'es souvenu", il: "s'est souvenu", nous: "nous sommes souvenus", vous: "vous êtes souvenus", ils: "se sont souvenus" },
        imparfait: { je: "me souvenais", tu: "te souvenais", il: "se souvenait", nous: "nous souvenions", vous: "vous souveniez", ils: "se souvenaient" },
        futur: { je: "me souviendrai", tu: "te souviendras", il: "se souviendra", nous: "nous souviendrons", vous: "vous souviendrez", ils: "se souviendront" },
        conditionnel: { je: "me souviendrais", tu: "te souviendrais", il: "se souviendrait", nous: "nous souviendrions", vous: "vous souviendriez", ils: "se souviendraient" },
        subjonctif: { je: "me souvienne", tu: "te souviennes", il: "se souvienne", nous: "nous souvenions", vous: "vous souveniez", ils: "se souviennent" }
      },
      examples: [
        { fr: "Je me souviens très bien de nos vacances.", en: "I remember our vacation very well.", tense: "present" },
        { fr: "Est-ce que tu te souviens de son prénom ?", en: "Do you remember their first name?", tense: "present" },
        { fr: "Hier, je me suis souvenu de cette belle chanson française.", en: "Yesterday, I remembered that lovely French song.", tense: "passeCompose" },
        { fr: "Elle se souvenait encore de son premier jour à Paris.", en: "She still remembered her first day in Paris.", tense: "imparfait" },
        { fr: "Nous nous souviendrons toujours de ce voyage inoubliable.", en: "We will always remember this unforgettable trip.", tense: "futur" }
      ]
    },
    {
      id: "falloir",
      infinitive: "falloir",
      english: "to be necessary / must (impersonal)",
      group: "irregular",
      auxiliary: "avoir",
      participlePass: "fallu",
      tip: "Impersonal verb: only conjugates with 'il' (Il faut = It is necessary / One must).",
      conjugations: {
        present: { je: "-", tu: "-", il: "faut", nous: "-", vous: "-", ils: "-" },
        passeCompose: { je: "-", tu: "-", il: "a fallu", nous: "-", vous: "-", ils: "-" },
        imparfait: { je: "-", tu: "-", il: "fallait", nous: "-", vous: "-", ils: "-" },
        futur: { je: "-", tu: "-", il: "faudra", nous: "-", vous: "-", ils: "-" },
        conditionnel: { je: "-", tu: "-", il: "faudrait", nous: "-", vous: "-", ils: "-" },
        subjonctif: { je: "-", tu: "-", il: "faille", nous: "-", vous: "-", ils: "-" }
      },
      examples: [
        { fr: "Il faut pratiquer tous les jours.", en: "It is necessary to practice every day.", tense: "present" },
        { fr: "Il faudrait partir maintenant.", en: "We ought to / should leave now.", tense: "conditionnel" },
        { fr: "Hier, il a fallu attendre presque une heure.", en: "Yesterday, we had to wait almost an hour.", tense: "passeCompose" },
        { fr: "À cette époque, il fallait réserver plusieurs semaines à l'avance.", en: "At that time, it was necessary to book several weeks in advance.", tense: "imparfait" },
        { fr: "Demain, il faudra apporter un parapluie.", en: "Tomorrow, it will be necessary to bring an umbrella.", tense: "futur" }
      ]
    }
  ],

  vocabulary: [
    // Verbs & Actions
    {
      id: "v-parler",
      french: "parler",
      english: "to speak, to talk",
      category: "Core Verbs",
      gender: null,
      partOfSpeech: "verb",
      associatedVerb: "parler",
      phonetic: "[paʁ.le]",
      exampleFr: "Elle parle couramment français.",
      exampleEn: "She speaks French fluently."
    },
    {
      id: "v-apprendre",
      french: "apprendre",
      english: "to learn / to teach",
      category: "Core Verbs",
      gender: null,
      partOfSpeech: "verb",
      associatedVerb: "prendre",
      phonetic: "[a.pʁɑ̃dʁ]",
      exampleFr: "J'apprends de nouveaux mots chaque jour.",
      exampleEn: "I learn new words every day."
    },
    {
      id: "v-comprendre",
      french: "comprendre",
      english: "to understand",
      category: "Core Verbs",
      gender: null,
      partOfSpeech: "verb",
      associatedVerb: "comprendre",
      phonetic: "[kɔ̃.pʁɑ̃dʁ]",
      exampleFr: "Je comprends les règles de grammaire.",
      exampleEn: "I understand the grammar rules."
    },
    {
      id: "v-se-souvenir",
      french: "se souvenir",
      english: "to remember",
      category: "Core Verbs",
      gender: null,
      partOfSpeech: "verb",
      associatedVerb: "se-souvenir",
      phonetic: "[sə su.və.niʁ]",
      exampleFr: "Je me souviens de cette terminaison.",
      exampleEn: "I remember this ending."
    },
    {
      id: "v-oublier",
      french: "oublier",
      english: "to forget",
      category: "Core Verbs",
      gender: null,
      partOfSpeech: "verb",
      associatedVerb: "parler",
      phonetic: "[u.bli.je]",
      exampleFr: "N'oublie pas d'accorder le participe passé !",
      exampleEn: "Don't forget to agree the past participle!"
    },

    // Daily Life & Home
    {
      id: "w-maison",
      french: "la maison",
      english: "the house / home",
      category: "Everyday Life",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "habiter",
      phonetic: "[mɛ.zɔ̃]",
      exampleFr: "Bienvenue dans notre maison.",
      exampleEn: "Welcome to our house."
    },
    {
      id: "w-travail",
      french: "le travail",
      english: "the work / job",
      category: "Everyday Life",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "faire",
      phonetic: "[tʁa.vaj]",
      exampleFr: "Il commence son travail à neuf heures.",
      exampleEn: "He starts his work at nine o'clock."
    },
    {
      id: "w-livre",
      french: "le livre",
      english: "the book",
      category: "Everyday Life",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "lire",
      phonetic: "[livʁ]",
      exampleFr: "J'adore lire un bon livre le soir.",
      exampleEn: "I love reading a good book in the evening."
    },
    {
      id: "w-temps",
      french: "le temps",
      english: "the time / weather",
      category: "Everyday Life",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "faire",
      phonetic: "[tɑ̃]",
      exampleFr: "Nous n'avons pas assez de temps.",
      exampleEn: "We don't have enough time."
    },
    {
      id: "w-ami",
      french: "un ami / une amie",
      english: "a friend (m / f)",
      category: "Relationships",
      gender: "m/f",
      partOfSpeech: "noun",
      associatedVerb: "aimer",
      phonetic: "[a.mi]",
      exampleFr: "Je dîne avec une amie ce soir.",
      exampleEn: "I am having dinner with a friend tonight."
    },

    // Food & Dining
    {
      id: "w-repas",
      french: "le repas",
      english: "the meal",
      category: "Food & Dining",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "manger",
      phonetic: "[ʁə.pɑ]",
      exampleFr: "Le repas était absolument délicieux.",
      exampleEn: "The meal was absolutely delicious."
    },
    {
      id: "w-pain",
      french: "le pain",
      english: "the bread",
      category: "Food & Dining",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "manger",
      phonetic: "[pɛ̃]",
      exampleFr: "Une baguette de pain fraîche, s'il vous plaît.",
      exampleEn: "A fresh baguette of bread, please."
    },
    {
      id: "w-eau",
      french: "l'eau",
      english: "the water",
      category: "Food & Dining",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "boire",
      phonetic: "[o]",
      exampleFr: "Je bois un grand verre d'eau fraîche.",
      exampleEn: "I drink a large glass of cool water."
    },
    {
      id: "w-cafe",
      french: "le café",
      english: "the coffee / café",
      category: "Food & Dining",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "prendre",
      phonetic: "[ka.fe]",
      exampleFr: "Prenons un café ensemble demain matin.",
      exampleEn: "Let's have a coffee together tomorrow morning."
    },
    {
      id: "w-pomme",
      french: "la pomme",
      english: "the apple",
      category: "Food & Dining",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "manger",
      phonetic: "[pɔm]",
      exampleFr: "Une pomme par jour est excellente pour la santé.",
      exampleEn: "An apple a day is great for your health."
    },

    // Travel & City
    {
      id: "w-voyage",
      french: "le voyage",
      english: "the trip / journey",
      category: "Travel & City",
      gender: "m",
      partOfSpeech: "noun",
      associatedVerb: "partir",
      phonetic: "[vwa.jaʒ]",
      exampleFr: "Bon voyage et profitez bien !",
      exampleEn: "Have a good trip and enjoy!"
    },
    {
      id: "w-gare",
      french: "la gare",
      english: "the train station",
      category: "Travel & City",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "attendre",
      phonetic: "[ɡaʁ]",
      exampleFr: "Rendez-vous devant la gare à midi.",
      exampleEn: "Meet in front of the station at noon."
    },
    {
      id: "w-rue",
      french: "la rue",
      english: "the street",
      category: "Travel & City",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "aller",
      phonetic: "[ʁy]",
      exampleFr: "Traversez la rue et tournez à gauche.",
      exampleEn: "Cross the street and turn left."
    },
    {
      id: "w-ville",
      french: "la ville",
      english: "the city / town",
      category: "Travel & City",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "vivre",
      phonetic: "[vil]",
      exampleFr: "Paris est une ville magnifique.",
      exampleEn: "Paris is a magnificent city."
    },
    {
      id: "w-voiture",
      french: "la voiture",
      english: "the car",
      category: "Travel & City",
      gender: "f",
      partOfSpeech: "noun",
      associatedVerb: "prendre",
      phonetic: "[vwa.tyʁ]",
      exampleFr: "Nous avons garé la voiture dans la cour.",
      exampleEn: "We parked the car in the courtyard."
    },

    // Time & Frequency
    {
      id: "w-aujourdhui",
      french: "aujourd'hui",
      english: "today",
      category: "Time & Frequency",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: "être",
      phonetic: "[o.ʒuʁ.dɥi]",
      exampleFr: "Aujourd'hui, il fait un temps splendide.",
      exampleEn: "Today, the weather is splendid."
    },
    {
      id: "w-demain",
      french: "demain",
      english: "tomorrow",
      category: "Time & Frequency",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: "aller",
      phonetic: "[də.mɛ̃]",
      exampleFr: "À demain matin !",
      exampleEn: "See you tomorrow morning!"
    },
    {
      id: "w-hier",
      french: "hier",
      english: "yesterday",
      category: "Time & Frequency",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: "avoir",
      phonetic: "[jɛʁ]",
      exampleFr: "Hier, nous avons visité un château.",
      exampleEn: "Yesterday, we visited a castle."
    },
    {
      id: "w-toujours",
      french: "toujours",
      english: "always / still",
      category: "Time & Frequency",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: "croire",
      phonetic: "[tu.ʒuʁ]",
      exampleFr: "Il garde toujours son calme.",
      exampleEn: "He always stays calm."
    },
    {
      id: "w-souvent",
      french: "souvent",
      english: "often",
      category: "Time & Frequency",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: "aller",
      phonetic: "[su.vɑ̃]",
      exampleFr: "Nous allons souvent au cinéma.",
      exampleEn: "We often go to the movies."
    },

    // High Yield Adjectives & Expressions
    {
      id: "w-heureux",
      french: "heureux / heureuse",
      english: "happy (m / f)",
      category: "Adjectives",
      gender: "m/f",
      partOfSpeech: "adj",
      associatedVerb: "être",
      phonetic: "[ø.ʁø] / [ø.ʁøz]",
      exampleFr: "Je suis tellement heureux de te revoir.",
      exampleEn: "I am so happy to see you again."
    },
    {
      id: "w-beau",
      french: "beau / belle",
      english: "beautiful / handsome",
      category: "Adjectives",
      gender: "m/f",
      partOfSpeech: "adj",
      associatedVerb: "être",
      phonetic: "[bo] / [bɛl]",
      exampleFr: "C'est une très belle histoire.",
      exampleEn: "It is a very beautiful story."
    },
    {
      id: "w-nouveau",
      french: "nouveau / nouvelle",
      english: "new (m / f)",
      category: "Adjectives",
      gender: "m/f",
      partOfSpeech: "adj",
      associatedVerb: "avoir",
      phonetic: "[nu.vo] / [nu.vɛl]",
      exampleFr: "Voici notre nouvel appartement.",
      exampleEn: "Here is our new apartment."
    },
    {
      id: "w-facile",
      french: "facile",
      english: "easy",
      category: "Adjectives",
      gender: null,
      partOfSpeech: "adj",
      associatedVerb: "être",
      phonetic: "[fa.sil]",
      exampleFr: "Cette règle est facile à retenir.",
      exampleEn: "This rule is easy to remember."
    },
    {
      id: "w-difficile",
      french: "difficile",
      english: "difficult / hard",
      category: "Adjectives",
      gender: null,
      partOfSpeech: "adj",
      associatedVerb: "être",
      phonetic: "[di.fi.sil]",
      exampleFr: "Les verbes irréguliers ne sont pas si difficiles.",
      exampleEn: "Irregular verbs are not so difficult."
    },

    // Connectors & Essential Words
    {
      id: "w-parce-que",
      french: "parce que",
      english: "because",
      category: "Connectors",
      gender: null,
      partOfSpeech: "conj",
      associatedVerb: null,
      phonetic: "[paʁs kə]",
      exampleFr: "J'étudie parce que j'adore cette culture.",
      exampleEn: "I study because I love this culture."
    },
    {
      id: "w-cependant",
      french: "cependant",
      english: "however / nevertheless",
      category: "Connectors",
      gender: null,
      partOfSpeech: "adv",
      associatedVerb: null,
      phonetic: "[sə.pɑ̃.dɑ̃]",
      exampleFr: "Le ciel est gris, cependant il ne pleut pas.",
      exampleEn: "The sky is gray, however it is not raining."
    },
    {
      id: "w-donc",
      french: "donc",
      english: "therefore / so",
      category: "Connectors",
      gender: null,
      partOfSpeech: "conj",
      associatedVerb: null,
      phonetic: "[dɔ̃k]",
      exampleFr: "Je pense, donc je suis.",
      exampleEn: "I think, therefore I am."
    },
    {
      id: "w-avec",
      french: "avec",
      english: "with",
      category: "Connectors",
      gender: null,
      partOfSpeech: "prep",
      associatedVerb: null,
      phonetic: "[a.vɛk]",
      exampleFr: "Viens avec moi au musée.",
      exampleEn: "Come with me to the museum."
    },
    {
      id: "w-sans",
      french: "sans",
      english: "without",
      category: "Connectors",
      gender: null,
      partOfSpeech: "prep",
      associatedVerb: null,
      phonetic: "[sɑ̃]",
      exampleFr: "Un café sans sucre, s'il vous plaît.",
      exampleEn: "A coffee without sugar, please."
    }
  ],

  // Real-world contextual sentences for cloze drills
  sentenceDrills: [
    {
      id: "s1",
      sentence: "Tous les matins, nous ________ (prendre) un bon petit-déjeuner.",
      verbId: "prendre",
      tense: "present",
      pronoun: "nous",
      correct: "prenons",
      english: "Every morning, we have a good breakfast.",
      ruleHint: "Remember: 'prendre' drops the 'd' in plural and uses 'prenons'."
    },
    {
      id: "s2",
      sentence: "Hier soir, elle ________ (aller) au concert de musique classique.",
      verbId: "aller",
      tense: "passeCompose",
      pronoun: "il",
      correct: "est allée",
      english: "Yesterday evening, she went to the classical music concert.",
      ruleHint: "Movement verb taking 'être': Elle est allée (agreement with feminine subject)."
    },
    {
      id: "s3",
      sentence: "Qu'est-ce que vous ________ (faire) pour les vacances d'été ?",
      verbId: "faire",
      tense: "present",
      pronoun: "vous",
      correct: "faites",
      english: "What are you doing for summer vacation?",
      ruleHint: "Attention: 'vous faites' ends in -tes, never -ez!"
    },
    {
      id: "s4",
      sentence: "Si tu étudies sérieusement, tu ________ (pouvoir) réussir l'examen.",
      verbId: "pouvoir",
      tense: "futur",
      pronoun: "tu",
      correct: "pourras",
      english: "If you study seriously, you will be able to pass the exam.",
      ruleHint: "Future stem for pouvoir is 'pourr-': tu pourras."
    },
    {
      id: "s5",
      sentence: "Je ________ (vouloir) une tasse de thé vert avec du miel.",
      verbId: "vouloir",
      tense: "conditionnel",
      pronoun: "je",
      correct: "voudrais",
      english: "I would like a cup of green tea with honey.",
      ruleHint: "Standard polite formula: 'Je voudrais'."
    },
    {
      id: "s6",
      sentence: "Quand nous étions enfants, nous ________ (finir) l'école à 16h.",
      verbId: "finir",
      tense: "imparfait",
      pronoun: "nous",
      correct: "finissions",
      english: "When we were children, we used to finish school at 4pm.",
      ruleHint: "2nd group -ir verbs keep the '-iss-' in the imperfect: finissions."
    },
    {
      id: "s7",
      sentence: "Ils ne ________ (savoir) pas où se trouve la pharmacie la plus proche.",
      verbId: "savoir",
      tense: "present",
      pronoun: "ils",
      correct: "savent",
      english: "They do not know where the closest pharmacy is located.",
      ruleHint: "Present 3rd person plural of savoir is 'savent'."
    },
    {
      id: "s8",
      sentence: "À quelle heure est-ce que tu te ________ (se lever) le samedi ?",
      verbId: "se-lever",
      tense: "present",
      pronoun: "tu",
      correct: "lèves",
      english: "What time do you get up on Saturdays?",
      ruleHint: "Stem changes 'e' to 'è': tu te lèves."
    },
    {
      id: "s9",
      sentence: "Nous ________ (manger) toujours ensemble en famille le dimanche.",
      verbId: "manger",
      tense: "present",
      pronoun: "nous",
      correct: "mangeons",
      english: "We always eat together as a family on Sundays.",
      ruleHint: "Keeps the 'e' before -ons: 'mangeons' to maintain the soft 'g'."
    },
    {
      id: "s10",
      sentence: "Est-ce que vous ________ (se souvenir) de notre premier voyage ?",
      verbId: "se-souvenir",
      tense: "present",
      pronoun: "vous",
      correct: "souvenez",
      english: "Do you remember our first trip?",
      ruleHint: "Vous vous souvenez (like venir: vous venez)."
    },
    {
      id: "s11",
      sentence: "Demain, nous ________ (être) à l'heure pour le rendez-vous.",
      verbId: "etre",
      tense: "futur",
      pronoun: "nous",
      correct: "serons",
      english: "Tomorrow, we will be on time for the appointment.",
      ruleHint: "Future stem for être is 'ser-': nous serons."
    },
    {
      id: "s12",
      sentence: "Ils ________ (avoir) beaucoup d'amis dans le quartier.",
      verbId: "avoir",
      tense: "present",
      pronoun: "ils",
      correct: "ont",
      english: "They have a lot of friends in the neighborhood.",
      ruleHint: "Pronunciation note: 'ils ont' [il.zɔ̃] with liaison."
    }
  ],

  // Common conjugation memory rules / mnemonic cards
  mnemonicTips: [
    {
      title: "The 'Boot' Verbs (Verbes de la botte)",
      category: "Patterns",
      description: "In irregular verbs like 'venir', 'prendre', 'vouloir', the forms for Je, Tu, Il, and Ils (the boot shape in a conjugation grid) share the same root vowel change, while Nous and Vous keep the regular infinitive stem!",
      example: "Je viens, Tu viens, Il vient, [Nous venons, Vous venez], Ils viennent."
    },
    {
      title: "The Big 3 Odd 'Vous' Forms",
      category: "Traps & Exceptions",
      description: "Only three common French verbs do NOT end in '-ez' with 'vous' in the present tense: être (vous êtes), faire (vous faites), and dire (vous dites).",
      example: "Vous êtes • Vous faites • Vous dites (NEVER vous disez or vous faisez!)."
    },
    {
      title: "Auxiliary Choice: DR MRS VANDERTRAMP",
      category: "Passé Composé",
      description: "Most verbs use 'avoir', but verbs of movement, change of state, and all reflexive verbs take 'être'. In compound tenses with 'être', the past participle agrees in gender and number with the subject!",
      example: "Elle est venue (adds 'e') • Ils sont partis (adds 's') • Elles sont allées (adds 'es')."
    },
    {
      title: "-ger and -cer Spelling Safeguards",
      category: "Orthography",
      description: "To keep the 'soft' pronunciation of 'g' and 'c' before 'a' or 'o': add an 'e' for -ger (nous mangeons, je mangeais) and add a cédille 'ç' for -cer (nous commençons, je commençais).",
      example: "Manger ➔ Nous mangeons • Commencer ➔ Nous commençons."
    }
  ],

  // Listening Comprehension & Dictation Exercises
  listeningExercises: {
    // 1. Verb Dictation: Focus on recognizing conjugated verb forms by ear
    verbDictations: [
      {
        id: "vd1",
        audio: "nous prenons",
        target: "nous prenons",
        english: "we take / we have",
        verb: "prendre",
        tense: "présent",
        hint: "Present tense of 'prendre' with 'nous'."
      },
      {
        id: "vd2",
        audio: "ils vont",
        target: "ils vont",
        english: "they go / they are going",
        verb: "aller",
        tense: "présent",
        hint: "Highly irregular 3rd person plural of 'aller'."
      },
      {
        id: "vd3",
        audio: "elle est allée",
        target: "elle est allée",
        english: "she went",
        verb: "aller",
        tense: "passé composé",
        hint: "Auxiliary 'être' with feminine agreement (+e)."
      },
      {
        id: "vd4",
        audio: "vous faites",
        target: "vous faites",
        english: "you do / you make",
        verb: "faire",
        tense: "présent",
        hint: "Special 'vous' ending in -tes (never -ez)."
      },
      {
        id: "vd5",
        audio: "je voudrais",
        target: "je voudrais",
        english: "I would like",
        verb: "vouloir",
        tense: "conditionnel",
        hint: "Polite conditional form of 'vouloir'."
      },
      {
        id: "vd6",
        audio: "nous mangeons",
        target: "nous mangeons",
        english: "we eat / we are eating",
        verb: "manger",
        tense: "présent",
        hint: "Keeps 'e' to preserve soft 'g' sound."
      },
      {
        id: "vd7",
        audio: "ils apprennent",
        target: "ils apprennent",
        english: "they learn",
        verb: "apprendre",
        tense: "présent",
        hint: "Double 'n' before silent ending -ent."
      },
      {
        id: "vd8",
        audio: "tu devrais",
        target: "tu devrais",
        english: "you should / you ought to",
        verb: "devoir",
        tense: "conditionnel",
        hint: "Conditional of 'devoir' for giving advice."
      },
      {
        id: "vd9",
        audio: "nous sommes venus",
        target: "nous sommes venus",
        english: "we came / we have arrived",
        verb: "venir",
        tense: "passé composé",
        hint: "Auxiliary 'être' with plural agreement (+s)."
      },
      {
        id: "vd10",
        audio: "vous dites la vérité",
        target: "vous dites la vérité",
        english: "you tell the truth",
        verb: "dire",
        tense: "présent",
        hint: "Irregular 'vous dites' (not vous disez)."
      },
      {
        id: "vd11",
        audio: "j'avais faim",
        target: "j'avais faim",
        english: "I was hungry",
        verb: "avoir",
        tense: "imparfait",
        hint: "Imparfait with elision (j')."
      },
      {
        id: "vd12",
        audio: "ils boivent de l'eau",
        target: "ils boivent de l'eau",
        english: "they drink water",
        verb: "boire",
        tense: "présent",
        hint: "Stem changes to 'boiv-' for 3rd person plural."
      }
    ],

    // 2. Liaison & Homophone Ear Discrimination Traps
    liaisonChallenges: [
      {
        id: "lc1",
        audio: "Ils ont deux chats.",
        target: "Ils ont deux chats.",
        options: ["Ils ont deux chats.", "Ils sont deux chats."],
        english: "They have two cats.",
        phoneticFocus: "Liaison [z] in 'ils ont' [il.zɔ̃] vs no liaison [s] in 'ils sont' [il.sɔ̃].",
        explanation: "Because 'ont' begins with a vowel, 'ils' links with a [z] sound. 'Ils sont' has a sharp [s] sound."
      },
      {
        id: "lc2",
        audio: "Ils sont très gentils.",
        target: "Ils sont très gentils.",
        options: ["Ils ont très gentils.", "Ils sont très gentils."],
        english: "They are very kind.",
        phoneticFocus: "Sharp [s] sound = verbe être (sont).",
        explanation: "'Sont' starts with [s], so you hear [il.sɔ̃], not [il.zɔ̃]."
      },
      {
        id: "lc3",
        audio: "Vous avez une belle maison.",
        target: "Vous avez une belle maison.",
        options: ["Vous avez une belle maison.", "Vous savez une belle maison."],
        english: "You have a beautiful house.",
        phoneticFocus: "Liaison [z] in 'vous‿avez' vs [s] in 'vous savez'.",
        explanation: "'Vous avez' links with [z] from the 's' in 'vous' into the vowel 'a'."
      },
      {
        id: "lc4",
        audio: "Elle est allée à Paris.",
        target: "Elle est allée à Paris.",
        options: ["Elle est allée à Paris.", "Elle a parlé à Paris."],
        english: "She went to Paris.",
        phoneticFocus: "Liaison 'est‿allée' [ɛ.ta.le].",
        explanation: "Notice the liaison between 'est' (ending in t) and 'allée' producing [ɛ.ta.le]."
      },
      {
        id: "lc5",
        audio: "Nous allons au restaurant.",
        target: "Nous allons au restaurant.",
        options: ["Nous allons au restaurant.", "Nous avons au restaurant."],
        english: "We are going to the restaurant.",
        phoneticFocus: "Liaison [z] with 'allons' [nu.za.lɔ̃] vs 'avons' [nu.za.vɔ̃].",
        explanation: "Listen closely to the middle consonant: 'l' in 'allons' vs 'v' in 'avons'."
      },
      {
        id: "lc6",
        audio: "Quand j'étais jeune, je parlais français.",
        target: "Quand j'étais jeune, je parlais français.",
        options: ["Quand j'étais jeune, je parlais français.", "Quand j'étais jeune, j'ai parlé français."],
        english: "When I was young, I used to speak French.",
        phoneticFocus: "Vowel distinction: Imparfait '-ais' [ɛ] vs Passé composé '-é' [e].",
        explanation: "Imparfait 'parlais' is pronounced with an open [ɛ] sound, indicating habitual past."
      }
    ],

    // 3. Sentence Dictation: Real conversational French
    sentenceDictations: [
      {
        id: "sd1",
        audio: "Tous les matins, nous prenons un bon café ensemble.",
        target: "Tous les matins, nous prenons un bon café ensemble.",
        english: "Every morning, we have a good coffee together.",
        difficulty: "Facile",
        hint: "Pay attention to 'tous' with an 's', and 'prenons' with 'nous'."
      },
      {
        id: "sd2",
        audio: "Hier soir, je me suis couché très tard après le film.",
        target: "Hier soir, je me suis couché très tard après le film.",
        english: "Yesterday evening, I went to bed very late after the movie.",
        difficulty: "Intermédiaire",
        hint: "Reflexive verb 'se coucher' with auxiliary 'être'."
      },
      {
        id: "sd3",
        audio: "Qu'est-ce que vous faites pour les vacances d'hiver ?",
        target: "Qu'est-ce que vous faites pour les vacances d'hiver ?",
        english: "What are you doing for winter vacation?",
        difficulty: "Intermédiaire",
        hint: "Remember 'vous faites' ends in -tes, with apostrophe in 'd'hiver'."
      },
      {
        id: "sd4",
        audio: "Elle veut comprendre comment fonctionne cette machine.",
        target: "Elle veut comprendre comment fonctionne cette machine.",
        english: "She wants to understand how this machine works.",
        difficulty: "Intermédiaire",
        hint: "Veut (vouloir) followed by infinitive 'comprendre'."
      },
      {
        id: "sd5",
        audio: "Nous avons fini notre travail avant l'heure prévue.",
        target: "Nous avons fini notre travail avant l'heure prévue.",
        english: "We finished our work before the scheduled time.",
        difficulty: "Avancé",
        hint: "Passé composé of 'finir' with auxiliary 'avoir' (no agreement on fini)."
      },
      {
        id: "sd6",
        audio: "Si vous pouvez m'aider, j'en serais très reconnaissant.",
        target: "Si vous pouvez m'aider, j'en serais très reconnaissant.",
        english: "If you can help me, I would be very grateful.",
        difficulty: "Avancé",
        hint: "Conditional 'serais' and adjective 'reconnaissant'."
      }
    ]
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.FRENCH_DATA = FRENCH_DATA;
}
