/** Guide du Meneur enrichi — contenu partagé pour les 8 langues (browser-safe). */
import type { Lang } from "@/lib/i18n";

export type GuideChapter = {
  title: string;
  spirit: string;
  mech: string[];
  tip: string;
  chant?: string;
};

export type GuideCopy = {
  labels: { mech: string; tip: string; chant: string; chapter: string };
  chapters: GuideChapter[];
};

const fr: GuideCopy = {
  labels: {
    mech: "Mécanique de l'app",
    tip: "Secret d'ambiance",
    chant: "Phrase rituelle",
    chapter: "Chapitre",
  },
  chapters: [
    {
      title: "Le Sanctuaire & l'Appel des Âmes",
      spirit:
        "Le Meneur n'est pas un joueur : c'est le metteur en scène du cauchemar. Il tient le téléphone et dicte le tempo.",
      mech: [
        "Ajoutez les joueurs, réglez le chrono de débat et composez la meute.",
        "Validez la roue de placement pour qu'elle reflète le vrai cercle autour de la table.",
        "Le Meneur désigné ne reçoit aucune carte.",
      ],
      tip: "Cercle fermé, lumières tamisées, un seul téléphone sur la table : le vôtre.",
      chant: "« Ce soir, le village de Mourad s'endort pour la dernière fois dans l'innocence... »",
    },
    {
      title: "Le Murmure des Secrets",
      spirit: "L'instant où le destin de chacun bascule dans le secret absolu.",
      mech: [
        "Le téléphone fait le tour de la table dans l'ordre des sièges.",
        "Chaque joueur touche pour révéler sa carte, la mémorise, puis la masque avant de passer.",
      ],
      tip: "Exigez un silence total. Ricanements et regards fuyants sont les premiers indices des Loups.",
    },
    {
      title: "L'Orchestre des Ombres",
      spirit: "La danse nocturne : chaque geste doit rester invisible et inaudible.",
      mech: [
        "Suivez strictement l'ordre d'appel affiché à l'écran.",
        "Loup Rouge : gèle les pouvoirs d'un joueur pour la nuit ❄️.",
        "Pyromane : imbibe 1 ou 2 cibles 🔥, ou déclenche son unique incendie.",
        "Alien : devine un rôle exact ; trois erreurs et il disparaît.",
      ],
      tip: "Parlez en tournant autour du cercle pour couvrir les bruits, et chuchotez vers des angles au hasard.",
      chant: "« Fermez les yeux... Que seuls ceux qu'appelle le destin osent affronter la nuit. »",
    },
    {
      title: "L'Aube & le Tribunal du Débat",
      spirit: "Le réveil brutal et la confrontation des esprits.",
      mech: [
        "Lisez le rapport de nuit : morts, sauvetages, odeur d'essence.",
        "Le Capitaine choisit le sens, puis la roue donne à chacun son chrono.",
        "Touchez l'étoile ⭐ pour récompenser un bluff ou une déduction brillante.",
      ],
      tip: "Annoncez les victimes sans émotion : impartial, impitoyable, précis comme une lame.",
      chant:
        "« Le soleil se lève sur une terre souillée de sang. Réveillez-vous et contemplez vos pertes. »",
    },
    {
      title: "Le Bûcher & les Derniers Souffles",
      spirit: "L'heure du jugement populaire et des réactions en chaîne.",
      mech: [
        "Recueillez les votes dans le sens de la roue ; le Capitaine tranche les égalités.",
        "Bébé Loup ou Chasseur abattu : leur vengeance s'ouvre avant toute victoire.",
        "Le bouton d'élimination du Meneur retire un ou plusieurs joueurs d'un coup.",
        "Une erreur de saisie ? Le bouton Annuler vous ramène en arrière.",
      ],
      tip: "Laissez au condamné quelques secondes de dernières paroles : c'est là que naît le doute.",
      chant: "« Le verdict est sans appel. Que le condamné parle avant le silence éternel. »",
    },
    {
      title: "L'Apothéose & les Titres de Gloire",
      spirit: "Le dénouement épique, quand les masques tombent enfin.",
      mech: [
        "L'écran final révèle toutes les cartes et la précision des votes.",
        "Étoiles récoltées et badges d'honneur couronnent les meilleurs.",
      ],
      tip: "Laissez la table débriefer ses trahisons à chaud : c'est là que naissent les légendes.",
      chant: "« Le village a parlé. Que les survivants racontent cette nuit pour toujours. »",
    },
  ],
};

const en: GuideCopy = {
  labels: {
    mech: "App mechanics",
    tip: "Atmosphere secret",
    chant: "Ritual line",
    chapter: "Chapter",
  },
  chapters: [
    {
      title: "The Sanctuary & the Calling of Souls",
      spirit:
        "The Game Master is not a player — they direct the nightmare. They hold the phone and set the pace.",
      mech: [
        "Add players, set the debate timer and build the pack.",
        "Confirm the seating wheel so it matches the real circle around the table.",
        "The chosen Game Master receives no card.",
      ],
      tip: "Closed circle, dimmed lights, only one phone on the table: yours.",
      chant: "“Tonight, Mourad's village falls asleep in innocence for the very last time...”",
    },
    {
      title: "The Whisper of Secrets",
      spirit: "The moment every fate tips into absolute secrecy.",
      mech: [
        "The phone travels around the table in seating order.",
        "Each player taps to reveal their card, memorizes it, then hides it before passing.",
      ],
      tip: "Demand total silence. Smirks and darting eyes are the Wolves' first tells.",
    },
    {
      title: "The Orchestra of Shadows",
      spirit: "The night dance: every move must stay unseen and unheard.",
      mech: [
        "Follow the on-screen call order strictly.",
        "Red Wolf: freezes one player's powers for the night ❄️.",
        "Pyromaniac: douses 1 or 2 targets 🔥, or triggers their single blaze.",
        "Alien: guesses an exact role; three misses and it vanishes.",
      ],
      tip: "Keep talking while circling the table to mask noises, and whisper toward random corners.",
      chant: "“Close your eyes... Only those called by fate may dare to face the night.”",
    },
    {
      title: "Dawn & the Debate Tribunal",
      spirit: "The brutal awakening and the clash of minds.",
      mech: [
        "Read the night report: deaths, rescues, the smell of fuel.",
        "The Captain picks the direction, then the wheel gives each player their timer.",
        "Tap the star ⭐ to reward a great bluff or brilliant deduction.",
      ],
      tip: "Announce victims without emotion: impartial, ruthless, sharp as a blade.",
      chant: "“The sun rises over blood-stained ground. Wake up and behold your losses.”",
    },
    {
      title: "The Pyre & the Last Breaths",
      spirit: "The hour of public judgment and chain reactions.",
      mech: [
        "Collect votes following the wheel; the Captain breaks ties.",
        "Baby Wolf or Hunter killed: their revenge opens before any victory check.",
        "The GM elimination button removes one or several players at once.",
        "Input mistake? The Undo button takes you back.",
      ],
      tip: "Give the condemned a few seconds of last words — that's where doubt is born.",
      chant: "“The verdict is final. Let the condemned speak before eternal silence.”",
    },
    {
      title: "The Apotheosis & Titles of Glory",
      spirit: "The epic finale, when the masks finally fall.",
      mech: [
        "The final screen reveals every card and each player's vote accuracy.",
        "Earned stars and honor badges crown the best.",
      ],
      tip: "Let the table debrief its betrayals while it's hot — that's where legends are born.",
      chant: "“The village has spoken. May the survivors tell of this night forever.”",
    },
  ],
};

const es: GuideCopy = {
  labels: {
    mech: "Mecánica de la app",
    tip: "Secreto de ambiente",
    chant: "Frase ritual",
    chapter: "Capítulo",
  },
  chapters: [
    {
      title: "El Santuario y la Llamada de las Almas",
      spirit:
        "El Narrador no es un jugador: dirige la pesadilla. Sostiene el teléfono y marca el ritmo.",
      mech: [
        "Añade jugadores, ajusta el temporizador de debate y forma la manada.",
        "Confirma la rueda de asientos para que refleje el círculo real.",
        "El Narrador elegido no recibe carta.",
      ],
      tip: "Círculo cerrado, luces tenues y un solo teléfono en la mesa: el tuyo.",
      chant: "«Esta noche, el pueblo de Mourad se duerme inocente por última vez...»",
    },
    {
      title: "El Susurro de los Secretos",
      spirit: "El instante en que cada destino cae en el secreto absoluto.",
      mech: [
        "El teléfono recorre la mesa en el orden de los asientos.",
        "Cada jugador toca para ver su carta, la memoriza y la oculta antes de pasarla.",
      ],
      tip: "Exige silencio total. Risitas y miradas huidizas son las primeras pistas de los Lobos.",
    },
    {
      title: "La Orquesta de las Sombras",
      spirit: "La danza nocturna: cada gesto debe ser invisible e inaudible.",
      mech: [
        "Sigue estrictamente el orden de llamada en pantalla.",
        "Lobo Rojo: congela los poderes de un jugador esa noche ❄️.",
        "Pirómano: rocía 1 o 2 objetivos 🔥 o provoca su único incendio.",
        "Alien: adivina un rol exacto; tres fallos y desaparece.",
      ],
      tip: "Habla mientras rodeas el círculo para tapar ruidos y susurra hacia rincones al azar.",
      chant:
        "«Cerrad los ojos... Que solo los llamados por el destino se atrevan a enfrentar la noche.»",
    },
    {
      title: "El Alba y el Tribunal del Debate",
      spirit: "El despertar brutal y el choque de mentes.",
      mech: [
        "Lee el informe nocturno: muertes, rescates, olor a gasolina.",
        "El Capitán elige el sentido y la rueda da a cada uno su tiempo.",
        "Toca la estrella ⭐ para premiar un gran farol o una deducción brillante.",
      ],
      tip: "Anuncia a las víctimas sin emoción: imparcial, implacable, preciso como una hoja.",
      chant:
        "«El sol sale sobre una tierra manchada de sangre. Despertad y contemplad vuestras pérdidas.»",
    },
    {
      title: "La Hoguera y los Últimos Alientos",
      spirit: "La hora del juicio popular y las reacciones en cadena.",
      mech: [
        "Recoge los votos siguiendo la rueda; el Capitán desempata.",
        "Si cae el Bebé Lobo o el Cazador, su venganza se abre antes de la victoria.",
        "El botón de eliminación del Narrador retira uno o varios jugadores a la vez.",
        "¿Error al marcar? El botón Deshacer te devuelve atrás.",
      ],
      tip: "Concede al condenado unos segundos de últimas palabras: ahí nace la duda.",
      chant: "«El veredicto es inapelable. Que el condenado hable antes del silencio eterno.»",
    },
    {
      title: "La Apoteosis y los Títulos de Gloria",
      spirit: "El desenlace épico, cuando por fin caen las máscaras.",
      mech: [
        "La pantalla final revela todas las cartas y la precisión de los votos.",
        "Estrellas e insignias de honor coronan a los mejores.",
      ],
      tip: "Deja que la mesa comente sus traiciones en caliente: así nacen las leyendas.",
      chant: "«El pueblo ha hablado. Que los supervivientes cuenten esta noche para siempre.»",
    },
  ],
};

const pt: GuideCopy = {
  labels: {
    mech: "Mecânica do app",
    tip: "Segredo de ambiente",
    chant: "Frase ritual",
    chapter: "Capítulo",
  },
  chapters: [
    {
      title: "O Santuário e o Chamado das Almas",
      spirit: "O Narrador não é jogador: ele dirige o pesadelo. Segura o telefone e dita o ritmo.",
      mech: [
        "Adicione os jogadores, ajuste o cronômetro de debate e monte a matilha.",
        "Confirme a roda de assentos para refletir o círculo real.",
        "O Narrador escolhido não recebe carta.",
      ],
      tip: "Círculo fechado, luzes baixas e um só telefone na mesa: o seu.",
      chant: "“Esta noite, a vila de Mourad adormece inocente pela última vez...”",
    },
    {
      title: "O Sussurro dos Segredos",
      spirit: "O instante em que cada destino mergulha no segredo absoluto.",
      mech: [
        "O telefone percorre a mesa na ordem dos assentos.",
        "Cada jogador toca para ver a carta, memoriza e esconde antes de passar.",
      ],
      tip: "Exija silêncio total. Risinhos e olhares fugidios são as primeiras pistas dos Lobos.",
    },
    {
      title: "A Orquestra das Sombras",
      spirit: "A dança noturna: cada gesto deve ser invisível e inaudível.",
      mech: [
        "Siga rigorosamente a ordem de chamada na tela.",
        "Lobo Vermelho: congela os poderes de um jogador nesta noite ❄️.",
        "Piromaníaco: encharca 1 ou 2 alvos 🔥 ou provoca seu único incêndio.",
        "Alien: adivinha um papel exato; três erros e ele desaparece.",
      ],
      tip: "Fale enquanto circula a mesa para cobrir ruídos e sussurre para cantos aleatórios.",
      chant: "“Fechem os olhos... Só os chamados pelo destino ousem enfrentar a noite.”",
    },
    {
      title: "A Aurora e o Tribunal do Debate",
      spirit: "O despertar brutal e o choque das mentes.",
      mech: [
        "Leia o relatório da noite: mortes, salvamentos, cheiro de gasolina.",
        "O Capitão escolhe o sentido e a roda dá a cada um seu tempo.",
        "Toque na estrela ⭐ para premiar um grande blefe ou dedução brilhante.",
      ],
      tip: "Anuncie as vítimas sem emoção: imparcial, implacável, preciso como uma lâmina.",
      chant: "“O sol nasce sobre uma terra manchada de sangue. Acordem e contemplem suas perdas.”",
    },
    {
      title: "A Fogueira e os Últimos Suspiros",
      spirit: "A hora do julgamento popular e das reações em cadeia.",
      mech: [
        "Recolha os votos seguindo a roda; o Capitão desempata.",
        "Bebê Lobo ou Caçador abatido: a vingança abre antes de qualquer vitória.",
        "O botão de eliminação do Narrador remove um ou vários jogadores de uma vez.",
        "Errou? O botão Desfazer leva você de volta.",
      ],
      tip: "Dê ao condenado alguns segundos de últimas palavras: é aí que nasce a dúvida.",
      chant: "“O veredito é final. Que o condenado fale antes do silêncio eterno.”",
    },
    {
      title: "A Apoteose e os Títulos de Glória",
      spirit: "O desfecho épico, quando as máscaras finalmente caem.",
      mech: [
        "A tela final revela todas as cartas e a precisão dos votos.",
        "Estrelas e medalhas de honra coroam os melhores.",
      ],
      tip: "Deixe a mesa comentar as traições a quente: é aí que nascem as lendas.",
      chant: "“A vila falou. Que os sobreviventes contem esta noite para sempre.”",
    },
  ],
};

const de: GuideCopy = {
  labels: {
    mech: "App-Mechanik",
    tip: "Atmosphäre-Geheimnis",
    chant: "Ritualsatz",
    chapter: "Kapitel",
  },
  chapters: [
    {
      title: "Das Heiligtum & der Ruf der Seelen",
      spirit:
        "Der Spielleiter spielt nicht mit – er inszeniert den Albtraum. Er hält das Handy und bestimmt das Tempo.",
      mech: [
        "Spieler hinzufügen, Diskussionstimer einstellen und das Rudel zusammenstellen.",
        "Das Sitzrad bestätigen, damit es dem echten Kreis entspricht.",
        "Der gewählte Spielleiter erhält keine Karte.",
      ],
      tip: "Geschlossener Kreis, gedimmtes Licht, nur ein Handy auf dem Tisch: deins.",
      chant: "„Heute Nacht schläft Mourads Dorf zum letzten Mal in Unschuld ein...“",
    },
    {
      title: "Das Flüstern der Geheimnisse",
      spirit: "Der Moment, in dem jedes Schicksal ins absolute Geheimnis kippt.",
      mech: [
        "Das Handy wandert in Sitzreihenfolge um den Tisch.",
        "Jeder tippt, um seine Karte zu sehen, merkt sie sich und verdeckt sie vor dem Weitergeben.",
      ],
      tip: "Verlange völlige Stille. Grinsen und ausweichende Blicke verraten die Wölfe zuerst.",
    },
    {
      title: "Das Orchester der Schatten",
      spirit: "Der nächtliche Tanz: Jede Bewegung bleibt unsichtbar und unhörbar.",
      mech: [
        "Folge strikt der Aufrufreihenfolge auf dem Bildschirm.",
        "Roter Wolf: friert die Kräfte eines Spielers für die Nacht ein ❄️.",
        "Pyromane: tränkt 1 oder 2 Ziele 🔥 oder entfacht seinen einzigen Brand.",
        "Alien: rät eine exakte Rolle; nach drei Fehlern verschwindet es.",
      ],
      tip: "Sprich weiter, während du den Kreis umrundest, und flüstere in zufällige Richtungen.",
      chant: "„Schließt die Augen... Nur wen das Schicksal ruft, wage es, der Nacht zu trotzen.“",
    },
    {
      title: "Die Dämmerung & das Tribunal",
      spirit: "Das brutale Erwachen und der Kampf der Köpfe.",
      mech: [
        "Lies den Nachtbericht vor: Tote, Rettungen, Benzingeruch.",
        "Der Kapitän wählt die Richtung, das Rad gibt jedem seine Redezeit.",
        "Tippe auf den Stern ⭐, um einen starken Bluff oder eine brillante Schlussfolgerung zu belohnen.",
      ],
      tip: "Verkünde die Opfer ohne Regung: unparteiisch, gnadenlos, scharf wie eine Klinge.",
      chant: "„Die Sonne geht über blutgetränkter Erde auf. Erwacht und seht eure Verluste.“",
    },
    {
      title: "Der Scheiterhaufen & die letzten Atemzüge",
      spirit: "Die Stunde des Volksurteils und der Kettenreaktionen.",
      mech: [
        "Stimmen entlang des Rads sammeln; der Kapitän entscheidet bei Gleichstand.",
        "Fällt Babywolf oder Jäger, öffnet sich ihre Rache vor jeder Siegprüfung.",
        "Der Eliminierungsknopf des Spielleiters entfernt einen oder mehrere Spieler zugleich.",
        "Vertippt? Der Rückgängig-Knopf bringt dich zurück.",
      ],
      tip: "Gönne dem Verurteilten ein paar letzte Worte – dort entsteht der Zweifel.",
      chant: "„Das Urteil ist endgültig. Der Verurteilte spreche vor der ewigen Stille.“",
    },
    {
      title: "Die Apotheose & die Ruhmestitel",
      spirit: "Das epische Finale, wenn endlich die Masken fallen.",
      mech: [
        "Der Endbildschirm enthüllt alle Karten und die Treffsicherheit der Stimmen.",
        "Gesammelte Sterne und Ehrenabzeichen krönen die Besten.",
      ],
      tip: "Lass die Runde ihre Verrätereien sofort aufarbeiten – so entstehen Legenden.",
      chant: "„Das Dorf hat gesprochen. Mögen die Überlebenden ewig von dieser Nacht erzählen.“",
    },
  ],
};

const ru: GuideCopy = {
  labels: {
    mech: "Механика приложения",
    tip: "Секрет атмосферы",
    chant: "Ритуальная фраза",
    chapter: "Глава",
  },
  chapters: [
    {
      title: "Святилище и Зов Душ",
      spirit: "Ведущий — не игрок, а режиссёр кошмара. Он держит телефон и задаёт темп.",
      mech: [
        "Добавьте игроков, настройте таймер дебатов и соберите стаю.",
        "Подтвердите колесо рассадки, чтобы оно совпадало с реальным кругом.",
        "Выбранный Ведущий не получает карту.",
      ],
      tip: "Закрытый круг, приглушённый свет и лишь один телефон на столе — ваш.",
      chant: "«Сегодня деревня Мурада в последний раз засыпает в невинности...»",
    },
    {
      title: "Шёпот Тайн",
      spirit: "Миг, когда судьба каждого погружается в абсолютную тайну.",
      mech: [
        "Телефон идёт по кругу в порядке рассадки.",
        "Каждый касается, чтобы увидеть карту, запоминает и скрывает её перед передачей.",
      ],
      tip: "Требуйте полной тишины. Ухмылки и бегающие глаза — первые улики Волков.",
    },
    {
      title: "Оркестр Теней",
      spirit: "Ночной танец: каждое движение должно быть невидимым и неслышным.",
      mech: [
        "Строго следуйте порядку вызова на экране.",
        "Красный Волк: замораживает силы игрока на ночь ❄️.",
        "Поджигатель: обливает 1 или 2 цели 🔥 или устраивает свой единственный пожар.",
        "Пришелец: угадывает точную роль; после трёх ошибок исчезает.",
      ],
      tip: "Говорите, обходя круг, чтобы скрыть шорохи, и шепчите в случайные стороны.",
      chant: "«Закройте глаза... Лишь те, кого зовёт судьба, посмеют встретить ночь.»",
    },
    {
      title: "Рассвет и Трибунал",
      spirit: "Жестокое пробуждение и схватка умов.",
      mech: [
        "Прочтите ночной отчёт: смерти, спасения, запах бензина.",
        "Капитан выбирает направление, колесо даёт каждому его время.",
        "Нажмите звезду ⭐, чтобы наградить блестящий блеф или вывод.",
      ],
      tip: "Объявляйте жертв без эмоций: беспристрастно, безжалостно, точно как клинок.",
      chant: "«Солнце встаёт над залитой кровью землёй. Проснитесь и узрите свои потери.»",
    },
    {
      title: "Костёр и Последние Вздохи",
      spirit: "Час народного суда и цепных реакций.",
      mech: [
        "Собирайте голоса по колесу; при ничьей решает Капитан.",
        "Погибли Волчонок или Охотник — их месть открывается до проверки победы.",
        "Кнопка устранения Ведущего убирает одного или нескольких игроков сразу.",
        "Ошиблись? Кнопка «Отменить» вернёт назад.",
      ],
      tip: "Дайте осуждённому пару секунд последних слов — именно там рождается сомнение.",
      chant: "«Приговор окончателен. Пусть осуждённый скажет слово перед вечной тишиной.»",
    },
    {
      title: "Апофеоз и Титулы Славы",
      spirit: "Эпичная развязка, когда маски наконец падают.",
      mech: [
        "Финальный экран раскрывает все карты и точность голосов.",
        "Собранные звёзды и почётные значки венчают лучших.",
      ],
      tip: "Дайте столу обсудить предательства по горячим следам — так рождаются легенды.",
      chant: "«Деревня сказала своё слово. Пусть выжившие вечно рассказывают об этой ночи.»",
    },
  ],
};

const zh: GuideCopy = {
  labels: { mech: "应用机制", tip: "氛围秘诀", chant: "仪式台词", chapter: "章节" },
  chapters: [
    {
      title: "圣所与灵魂召唤",
      spirit: "法官不是玩家，而是这场噩梦的导演。他手握手机，掌控节奏。",
      mech: [
        "添加玩家，设置发言计时并组建狼群。",
        "确认座位轮盘与真实座位一致。",
        "被选中的法官不会拿到身份牌。",
      ],
      tip: "围成闭合的圆，调暗灯光，桌上只留一部手机：你的。",
      chant: "“今夜，穆拉德村最后一次在纯真中入睡……”",
    },
    {
      title: "秘密的低语",
      spirit: "每个人的命运坠入绝对秘密的一刻。",
      mech: ["手机按座位顺序在桌上传递。", "每位玩家点击查看身份，记住后遮挡再传给下一位。"],
      tip: "要求绝对安静。偷笑和躲闪的眼神是狼人最早的破绽。",
    },
    {
      title: "暗影交响曲",
      spirit: "夜之舞：每个动作都必须无形无声。",
      mech: [
        "严格按照屏幕上的唤醒顺序进行。",
        "红狼：冻结一名玩家当晚的能力 ❄️。",
        "纵火者：浇油 1 或 2 名目标 🔥，或发动唯一一次纵火。",
        "外星人：猜测确切身份；猜错三次即消失。",
      ],
      tip: "绕着圆圈边走边说以掩盖声响，并朝随机方向低语。",
      chant: "“闭上眼睛……只有被命运召唤的人，才敢直面黑夜。”",
    },
    {
      title: "黎明与辩论法庭",
      spirit: "残酷的苏醒与思想的交锋。",
      mech: [
        "宣读夜间报告：死亡、救援、汽油的气味。",
        "队长选择方向，轮盘为每人分配发言时间。",
        "点击星星 ⭐ 奖励精彩的伪装或推理。",
      ],
      tip: "宣布死者时不带感情：公正、冷酷、如刀锋般精准。",
      chant: "“太阳升起在血染的大地上。醒来吧，看看你们的损失。”",
    },
    {
      title: "火刑与最后的气息",
      spirit: "公众审判与连锁反应的时刻。",
      mech: [
        "按轮盘顺序收集投票；平票由队长决定。",
        "幼狼或猎人倒下时，复仇会在判定胜负前开启。",
        "法官淘汰按钮可一次移除一名或多名玩家。",
        "输错了？撤销按钮带你回退。",
      ],
      tip: "给被处决者几秒遗言——怀疑就在此刻诞生。",
      chant: "“判决已定。让被判者在永恒沉默前发言。”",
    },
    {
      title: "终章与荣耀称号",
      spirit: "史诗般的结局，面具终于落下。",
      mech: ["结算界面揭示所有身份与投票准确率。", "获得的星星与荣誉徽章为最佳者加冕。"],
      tip: "让大家趁热复盘彼此的背叛——传奇就此诞生。",
      chant: "“村庄已作出裁决。愿幸存者永远讲述这一夜。”",
    },
  ],
};

const ar: GuideCopy = {
  labels: { mech: "آلية التطبيق", tip: "سرّ الأجواء", chant: "عبارة الطقوس", chapter: "الفصل" },
  chapters: [
    {
      title: "المعبد ونداء الأرواح",
      spirit: "الراوي ليس لاعبًا، بل مخرج الكابوس. يمسك الهاتف ويتحكم في الإيقاع.",
      mech: [
        "أضف اللاعبين، واضبط مؤقت النقاش، وكوّن القطيع.",
        "أكّد عجلة الجلوس لتطابق الدائرة الحقيقية حول الطاولة.",
        "الراوي المختار لا يحصل على بطاقة.",
      ],
      tip: "دائرة مغلقة، إضاءة خافتة، وهاتف واحد فقط على الطاولة: هاتفك.",
      chant: "«الليلة، تنام قرية مراد في براءتها للمرة الأخيرة...»",
    },
    {
      title: "همس الأسرار",
      spirit: "اللحظة التي يسقط فيها مصير كل واحد في السر المطلق.",
      mech: [
        "يدور الهاتف حول الطاولة حسب ترتيب الجلوس.",
        "يلمس كل لاعب لكشف بطاقته، يحفظها ثم يخفيها قبل التمرير.",
      ],
      tip: "اطلب صمتًا تامًا. الضحكات المكتومة والنظرات الهاربة أولى علامات الذئاب.",
    },
    {
      title: "أوركسترا الظلال",
      spirit: "رقصة الليل: كل حركة يجب أن تبقى خفية وصامتة.",
      mech: [
        "اتبع ترتيب النداء على الشاشة بدقة.",
        "الذئب الأحمر: يجمّد قدرات لاعب لهذه الليلة ❄️.",
        "مُشعل الحرائق: يرشّ هدفًا أو هدفين 🔥 أو يُشعل حريقه الوحيد.",
        "الفضائي: يخمّن دورًا محددًا؛ ثلاثة أخطاء ويختفي.",
      ],
      tip: "تكلّم وأنت تدور حول الدائرة لتغطية الأصوات، واهمس نحو زوايا عشوائية.",
      chant: "«أغمضوا أعينكم... لا يجرؤ على مواجهة الليل إلا من يناديه القدر.»",
    },
    {
      title: "الفجر ومحكمة النقاش",
      spirit: "الاستيقاظ القاسي وصراع العقول.",
      mech: [
        "اقرأ تقرير الليل: الوفيات، النجاة، ورائحة الوقود.",
        "يختار القائد الاتجاه، وتمنح العجلة كل لاعب وقته.",
        "المس النجمة ⭐ لمكافأة خدعة رائعة أو استنتاج لامع.",
      ],
      tip: "أعلن الضحايا بلا عاطفة: محايد، لا يرحم، دقيق كالنصل.",
      chant: "«تشرق الشمس على أرض ملطخة بالدماء. استيقظوا وتأملوا خسائركم.»",
    },
    {
      title: "المحرقة والأنفاس الأخيرة",
      spirit: "ساعة الحكم الشعبي والتفاعلات المتسلسلة.",
      mech: [
        "اجمع الأصوات باتجاه العجلة؛ القائد يحسم التعادل.",
        "إن سقط الذئب الصغير أو الصياد، يُفتح انتقامهما قبل فحص الفوز.",
        "زر الإقصاء للراوي يزيل لاعبًا أو أكثر دفعة واحدة.",
        "خطأ في الإدخال؟ زر التراجع يعيدك.",
      ],
      tip: "امنح المحكوم ثوانيَ لكلماته الأخيرة؛ هناك يولد الشك.",
      chant: "«الحكم نهائي. ليتكلم المحكوم قبل الصمت الأبدي.»",
    },
    {
      title: "الذروة وألقاب المجد",
      spirit: "الخاتمة الملحمية، حين تسقط الأقنعة أخيرًا.",
      mech: ["تكشف الشاشة النهائية كل البطاقات ودقة التصويت.", "النجوم وشارات الشرف تتوّج الأفضل."],
      tip: "دع الطاولة تناقش خياناتها فورًا؛ هكذا تولد الأساطير.",
      chant: "«لقد قالت القرية كلمتها. فليروِ الناجون هذه الليلة إلى الأبد.»",
    },
  ],
};

export const GM_GUIDE: Record<Lang, GuideCopy> = { fr, en, es, pt, de, ru, zh, ar };
