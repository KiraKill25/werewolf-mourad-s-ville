/* Shared localized copy for the four additional roles. */
export const NEW_ROLE_LOCALES = {
  en: {
    ui: {
      redWolfFreezePrompt: "Freeze a player’s powers tonight.",
      newWolfPackPrompt: "Choose the pack’s victim.",
      pyroDouse: "Douse",
      pyroIgnite: "Ignite all fuel-covered players",
      pyroMatchUsed: "Match already used",
      pyroLimit: "Douse up to {n} player(s).",
      fuelStatus: "Covered in fuel",
      frozenStatus: "Powers frozen tonight",
      alienGuessRole: "Guess the exact role",
      alienCharges: "Error chances: {n} / 3",
      babyRevengeTitle: "Baby Wolf’s revenge",
      babyRevengeDesc: "{name} was eliminated. Choose one living player to take down.",
      babyRevengeConfirm: "Confirm revenge",
      fuelNotice: "{name} is covered in fuel.",
      causeFire: "Burned in the blaze",
      causeAlien: "Killed by the Alien",
      causeAlienFailure: "Alien’s third incorrect guess",
      causeBabyRevenge: "Baby Wolf’s revenge",
    },
    events: {
      redWolfFrozen: "{name}’s powers are frozen for this night.",
      redWolfWasted: "{name} has no available power: freeze wasted.",
      pyroDoused: "Fuel applied to: {names}.",
      pyroIgnited: "The Pyromaniac ignites: {names}.",
      alienCorrect: "Correct guess: {name} is {role} and is eliminated.",
      alienWrong: "Incorrect guess. Error chances remaining: {n}.",
      alienFailed: "The Alien made a third incorrect guess and is eliminated.",
      alienImmuneWolves: "The wolves attacked the Alien, but it is immune: their shot is lost tonight.",
      winPyromaniac: "{name} wins as the Pyromaniac: at most 3 survivors remain.",
      winAlien: "{name} wins as the Alien: no opposing power holders remain.",
      nightPowerUnavailable: "{name}’s night action is unavailable.",
      cause_FIRE: "Burned in the blaze",
      cause_ALIEN: "Killed by the Alien",
      cause_ALIEN_FAILURE: "Alien’s third incorrect guess",
      cause_BABY_WOLF_REVENGE: "Baby Wolf’s revenge",
    },
    roles: {
      "loup-rouge": {
        name: "Red Wolf",
        description: "A cunning wolf who hunts with the pack and freezes powers from the shadows.",
        power:
          "Hunt with the pack, or alone. Separately freeze one player’s active and passive powers for this night. A powerless target wastes the action.",
      },
      "bébé-loup": {
        name: "Baby Wolf",
        description: "A young pack wolf whose death triggers a vengeful last strike.",
        power:
          "Hunt with the pack, or alone. On elimination by any cause, immediately choose one living player to take down with you.",
      },
      pyromaniac: {
        name: "Pyromaniac",
        description: "A solitary arsonist who douses the village before a catastrophic blaze.",
        power:
          "Each night douse 1 player if the village started with at most 10, or up to 2 otherwise. Once per game, ignite all doused players instead. Win alive with 3 or fewer total survivors.",
      },
      alien: {
        name: "Alien",
        description: "An otherworldly hunter seeking to eliminate all opposing power holders.",
        power:
          "Guess a player’s exact role each night: correct kills immediately; wrong costs one of 3 error chances. The third failure kills you. Win when no opposing power holders remain.",
      },
    },
    prompts: {
      "loup-rouge": "Freeze a player’s powers tonight.",
      "bébé-loup": "Choose the pack’s victim.",
      pyromaniac:
        "Each night douse 1 player if the village started with at most 10, or up to 2 otherwise. Once per game, ignite all doused players instead. Win alive with 3 or fewer total survivors.",
      alien:
        "Guess a player’s exact role each night: correct kills immediately; wrong costs one of 3 error chances. The third failure kills you. Win when no opposing power holders remain.",
    },
  },
  fr: {
    ui: {
      redWolfFreezePrompt: "Gèle les pouvoirs d’un joueur pour cette nuit.",
      newWolfPackPrompt: "Choisis la victime de la meute.",
      pyroDouse: "Asperger",
      pyroIgnite: "Embraser tous les joueurs aspergés",
      pyroMatchUsed: "Allumette déjà utilisée",
      pyroLimit: "Asperge jusqu’à {n} joueur(s).",
      fuelStatus: "Couvert de carburant",
      frozenStatus: "Pouvoirs gelés cette nuit",
      alienGuessRole: "Devine le rôle exact",
      alienCharges: "Chances d’erreur : {n} / 3",
      babyRevengeTitle: "Vengeance du Bébé Loup",
      babyRevengeDesc: "{name} est éliminé. Choisis un vivant à emporter avec lui.",
      babyRevengeConfirm: "Valider la vengeance",
      fuelNotice: "{name} est couvert de carburant.",
      causeFire: "Mort dans le brasier",
      causeAlien: "Tué par l’Alien",
      causeAlienFailure: "Troisième erreur de l’Alien",
      causeBabyRevenge: "Vengeance du Bébé Loup",
    },
    events: {
      redWolfFrozen: "Les pouvoirs de {name} sont gelés pour cette nuit.",
      redWolfWasted: "{name} n’a aucun pouvoir disponible : gel gaspillé.",
      pyroDoused: "Carburant versé sur : {names}.",
      pyroIgnited: "Le Pyromane embrase : {names}.",
      alienCorrect: "Bonne réponse : {name} est {role} et est éliminé.",
      alienWrong: "Mauvaise réponse. Chances restantes : {n}.",
      alienFailed: "L’Alien commet sa troisième erreur et est éliminé.",
      alienImmuneWolves: "Les loups ont attaqué l’Alien, mais il est immunisé : leur tir est perdu cette nuit.",
      winPyromaniac: "{name} gagne comme Pyromane : au plus 3 survivants.",
      winAlien: "{name} gagne comme Alien : aucun adversaire doté de pouvoirs ne survit.",
      nightPowerUnavailable: "L’action nocturne de {name} est indisponible.",
      cause_FIRE: "Mort dans le brasier",
      cause_ALIEN: "Tué par l’Alien",
      cause_ALIEN_FAILURE: "Troisième erreur de l’Alien",
      cause_BABY_WOLF_REVENGE: "Vengeance du Bébé Loup",
    },
    roles: {
      "loup-rouge": {
        name: "Loup Rouge",
        description: "Un loup rusé qui chasse avec la meute et gèle les pouvoirs dans l’ombre.",
        power:
          "Chasse avec la meute, ou seul. Séparément, gèle les pouvoirs actifs et passifs d’un joueur pour cette nuit. Une cible sans pouvoir gaspille l’action.",
      },
      "bébé-loup": {
        name: "Bébé Loup",
        description: "Un jeune loup de la meute dont la mort déclenche une ultime vengeance.",
        power:
          "Chasse avec la meute, ou seul. Éliminé pour n’importe quelle cause, choisit immédiatement un vivant à emporter avec lui.",
      },
      pyromaniac: {
        name: "Pyromane",
        description:
          "Un incendiaire solitaire qui asperge le village avant un brasier catastrophique.",
        power:
          "Chaque nuit, asperge 1 joueur si le village comptait au départ 10 joueurs ou moins, sinon jusqu’à 2. Une fois par partie, embrase tous les joueurs aspergés au lieu d’asperger. Gagne vivant avec au plus 3 survivants au total.",
      },
      alien: {
        name: "Alien",
        description: "Une entité extraterrestre qui traque tous les adversaires dotés de pouvoirs.",
        power:
          "Devine le rôle exact d’un joueur chaque nuit : réponse juste, mort immédiate ; erreur, perte d’une des 3 chances. La troisième erreur le tue. Gagne lorsqu’aucun adversaire doté de pouvoirs ne reste vivant.",
      },
    },
    prompts: {
      "loup-rouge": "Gèle les pouvoirs d’un joueur pour cette nuit.",
      "bébé-loup": "Choisis la victime de la meute.",
      pyromaniac:
        "Chaque nuit, asperge 1 joueur si le village comptait au départ 10 joueurs ou moins, sinon jusqu’à 2. Une fois par partie, embrase tous les joueurs aspergés au lieu d’asperger. Gagne vivant avec au plus 3 survivants au total.",
      alien:
        "Devine le rôle exact d’un joueur chaque nuit : réponse juste, mort immédiate ; erreur, perte d’une des 3 chances. La troisième erreur le tue. Gagne lorsqu’aucun adversaire doté de pouvoirs ne reste vivant.",
    },
  },
  es: {
    ui: {
      redWolfFreezePrompt: "Congela los poderes de un jugador esta noche.",
      newWolfPackPrompt: "Elige la víctima de la manada.",
      pyroDouse: "Empapar",
      pyroIgnite: "Incendiar a todos los empapados",
      pyroMatchUsed: "Cerilla ya utilizada",
      pyroLimit: "Empapa hasta {n} jugador(es).",
      fuelStatus: "Cubierto de combustible",
      frozenStatus: "Poderes congelados esta noche",
      alienGuessRole: "Adivina el rol exacto",
      alienCharges: "Oportunidades de error: {n} / 3",
      babyRevengeTitle: "Venganza del Lobo Bebé",
      babyRevengeDesc: "{name} fue eliminado. Elige a un jugador vivo para llevarse consigo.",
      babyRevengeConfirm: "Confirmar venganza",
      fuelNotice: "{name} está cubierto de combustible.",
      causeFire: "Muerto en el incendio",
      causeAlien: "Eliminado por el Alienígena",
      causeAlienFailure: "Tercer fallo del Alienígena",
      causeBabyRevenge: "Venganza del Lobo Bebé",
    },
    events: {
      redWolfFrozen: "Los poderes de {name} están congelados esta noche.",
      redWolfWasted: "{name} no tiene poderes disponibles: acción desperdiciada.",
      pyroDoused: "Combustible aplicado a: {names}.",
      pyroIgnited: "El Pirómano incendia a: {names}.",
      alienCorrect: "Acierto: {name} es {role} y queda eliminado.",
      alienWrong: "Fallo. Oportunidades restantes: {n}.",
      alienFailed: "El Alienígena comete su tercer fallo y queda eliminado.",
      alienImmuneWolves: "Los lobos atacaron al Alienígena, pero es inmune: su ataque se pierde esta noche.",
      winPyromaniac: "{name} gana como Pirómano: quedan como máximo 3 supervivientes.",
      winAlien: "{name} gana como Alienígena: no quedan rivales con poderes.",
      nightPowerUnavailable: "La acción nocturna de {name} no está disponible.",
      cause_FIRE: "Muerto en el incendio",
      cause_ALIEN: "Eliminado por el Alienígena",
      cause_ALIEN_FAILURE: "Tercer fallo del Alienígena",
      cause_BABY_WOLF_REVENGE: "Venganza del Lobo Bebé",
    },
    roles: {
      "loup-rouge": {
        name: "Lobo Rojo",
        description: "Un lobo astuto que caza con la manada y congela poderes desde las sombras.",
        power:
          "Caza con la manada o solo. Por separado, congela los poderes activos y pasivos de un jugador esta noche. Un objetivo sin poderes desperdicia la acción.",
      },
      "bébé-loup": {
        name: "Lobo Bebé",
        description: "Un joven lobo cuya muerte desencadena una última venganza.",
        power:
          "Caza con la manada o solo. Al morir por cualquier causa, elige inmediatamente a un jugador vivo para llevarse consigo.",
      },
      pyromaniac: {
        name: "Pirómano",
        description:
          "Un incendiario solitario que empapa la aldea antes de un incendio devastador.",
        power:
          "Cada noche empapa a 1 jugador si al inicio había 10 o menos; en otro caso, hasta 2. Una vez por partida, prende fuego a todos los empapados en lugar de empapar. Gana vivo cuando quedan 3 supervivientes o menos en total.",
      },
      alien: {
        name: "Alienígena",
        description: "Un ser extraterrestre que persigue a todos los rivales con poderes.",
        power:
          "Adivina el rol exacto cada noche: acierto, muerte inmediata; fallo, pierde una de 3 oportunidades. El tercer fallo lo mata. Gana cuando no queda ningún rival vivo con poderes.",
      },
    },
    prompts: {
      "loup-rouge": "Congela los poderes de un jugador esta noche.",
      "bébé-loup": "Elige la víctima de la manada.",
      pyromaniac:
        "Cada noche empapa a 1 jugador si al inicio había 10 o menos; en otro caso, hasta 2. Una vez por partida, prende fuego a todos los empapados en lugar de empapar. Gana vivo cuando quedan 3 supervivientes o menos en total.",
      alien:
        "Adivina el rol exacto cada noche: acierto, muerte inmediata; fallo, pierde una de 3 oportunidades. El tercer fallo lo mata. Gana cuando no queda ningún rival vivo con poderes.",
    },
  },
  pt: {
    ui: {
      redWolfFreezePrompt: "Congela os poderes de um jogador nesta noite.",
      newWolfPackPrompt: "Escolhe a vítima da matilha.",
      pyroDouse: "Encharcar",
      pyroIgnite: "Incendiar todos os encharcados",
      pyroMatchUsed: "Fósforo já usado",
      pyroLimit: "Encharca até {n} jogador(es).",
      fuelStatus: "Coberto de combustível",
      frozenStatus: "Poderes congelados nesta noite",
      alienGuessRole: "Adivinha o papel exato",
      alienCharges: "Oportunidades de erro: {n} / 3",
      babyRevengeTitle: "Vingança do Lobo Bebé",
      babyRevengeDesc: "{name} foi eliminado. Escolhe um jogador vivo para levar consigo.",
      babyRevengeConfirm: "Confirmar vingança",
      fuelNotice: "{name} está coberto de combustível.",
      causeFire: "Morto no incêndio",
      causeAlien: "Eliminado pelo Alienígena",
      causeAlienFailure: "Terceiro erro do Alienígena",
      causeBabyRevenge: "Vingança do Lobo Bebé",
    },
    events: {
      redWolfFrozen: "Os poderes de {name} estão congelados nesta noite.",
      redWolfWasted: "{name} não tem poderes disponíveis: ação desperdiçada.",
      pyroDoused: "Combustível aplicado a: {names}.",
      pyroIgnited: "O Pirómano incendeia: {names}.",
      alienCorrect: "Acerto: {name} é {role} e foi eliminado.",
      alienWrong: "Erro. Oportunidades restantes: {n}.",
      alienFailed: "O Alienígena comete o terceiro erro e é eliminado.",
      alienImmuneWolves: "Os lobos atacaram o Alienígena, mas ele é imune: o ataque é perdido esta noite.",
      winPyromaniac: "{name} vence como Pirómano: restam no máximo 3 sobreviventes.",
      winAlien: "{name} vence como Alienígena: não restam adversários com poderes.",
      nightPowerUnavailable: "A ação noturna de {name} está indisponível.",
      cause_FIRE: "Morto no incêndio",
      cause_ALIEN: "Eliminado pelo Alienígena",
      cause_ALIEN_FAILURE: "Terceiro erro do Alienígena",
      cause_BABY_WOLF_REVENGE: "Vingança do Lobo Bebé",
    },
    roles: {
      "loup-rouge": {
        name: "Lobo Vermelho",
        description: "Um lobo astuto que caça com a matilha e congela poderes nas sombras.",
        power:
          "Caça com a matilha ou sozinho. Separadamente, congela os poderes ativos e passivos de um jogador nesta noite. Um alvo sem poderes desperdiça a ação.",
      },
      "bébé-loup": {
        name: "Lobo Bebé",
        description: "Um jovem lobo cuja morte desencadeia uma última vingança.",
        power:
          "Caça com a matilha ou sozinho. Ao morrer por qualquer causa, escolhe imediatamente um jogador vivo para levar consigo.",
      },
      pyromaniac: {
        name: "Pirómano",
        description:
          "Um incendiário solitário que encharca a aldeia antes de um incêndio devastador.",
        power:
          "Cada noite encharca 1 jogador se inicialmente havia 10 ou menos; caso contrário, até 2. Uma vez por jogo, incendeia todos os encharcados em vez de encharcar. Vence vivo com no máximo 3 sobreviventes no total.",
      },
      alien: {
        name: "Alienígena",
        description: "Um ser extraterrestre que persegue todos os adversários com poderes.",
        power:
          "Adivinha o papel exato cada noite: acerto, morte imediata; erro, perde uma de 3 oportunidades. O terceiro erro mata-o. Vence quando nenhum adversário com poderes permanece vivo.",
      },
    },
    prompts: {
      "loup-rouge": "Congela os poderes de um jogador nesta noite.",
      "bébé-loup": "Escolhe a vítima da matilha.",
      pyromaniac:
        "Cada noite encharca 1 jogador se inicialmente havia 10 ou menos; caso contrário, até 2. Uma vez por jogo, incendeia todos os encharcados em vez de encharcar. Vence vivo com no máximo 3 sobreviventes no total.",
      alien:
        "Adivinha o papel exato cada noite: acerto, morte imediata; erro, perde uma de 3 oportunidades. O terceiro erro mata-o. Vence quando nenhum adversário com poderes permanece vivo.",
    },
  },
  de: {
    ui: {
      redWolfFreezePrompt: "Friere die Kräfte eines Spielers diese Nacht ein.",
      newWolfPackPrompt: "Wähle das Opfer des Rudels.",
      pyroDouse: "Übergießen",
      pyroIgnite: "Alle Brennstoffopfer entzünden",
      pyroMatchUsed: "Streichholz bereits benutzt",
      pyroLimit: "Übergieße bis zu {n} Spieler.",
      fuelStatus: "Mit Brennstoff bedeckt",
      frozenStatus: "Kräfte diese Nacht eingefroren",
      alienGuessRole: "Genaue Rolle erraten",
      alienCharges: "Fehlerchancen: {n} / 3",
      babyRevengeTitle: "Rache des Babywolfs",
      babyRevengeDesc: "{name} wurde eliminiert. Wähle einen lebenden Spieler für die Rache.",
      babyRevengeConfirm: "Rache bestätigen",
      fuelNotice: "{name} ist mit Brennstoff bedeckt.",
      causeFire: "Im Feuer verbrannt",
      causeAlien: "Vom Alien getötet",
      causeAlienFailure: "Dritter Fehler des Aliens",
      causeBabyRevenge: "Rache des Babywolfs",
    },
    events: {
      redWolfFrozen: "Die Kräfte von {name} sind diese Nacht eingefroren.",
      redWolfWasted: "{name} hat keine verfügbare Kraft: Zug verschwendet.",
      pyroDoused: "Mit Brennstoff übergossen: {names}.",
      pyroIgnited: "Der Brandstifter entzündet: {names}.",
      alienCorrect: "Richtig: {name} ist {role} und wird eliminiert.",
      alienWrong: "Falsch. Verbleibende Fehlerchancen: {n}.",
      alienFailed: "Das Alien macht den dritten Fehler und wird eliminiert.",
      alienImmuneWolves: "Die Wölfe griffen das Alien an, doch es ist immun: ihr Angriff ist diese Nacht verloren.",
      winPyromaniac: "{name} gewinnt als Brandstifter: höchstens 3 Überlebende.",
      winAlien: "{name} gewinnt als Alien: kein Gegner mit Kräften lebt mehr.",
      nightPowerUnavailable: "Die Nachtaktion von {name} ist nicht verfügbar.",
      cause_FIRE: "Im Feuer verbrannt",
      cause_ALIEN: "Vom Alien getötet",
      cause_ALIEN_FAILURE: "Dritter Fehler des Aliens",
      cause_BABY_WOLF_REVENGE: "Rache des Babywolfs",
    },
    roles: {
      "loup-rouge": {
        name: "Roter Wolf",
        description:
          "Ein listiger Wolf, der mit dem Rudel jagt und Kräfte aus dem Schatten einfriert.",
        power:
          "Jagt mit dem Rudel oder allein. Friert in einem eigenen Zug die aktiven und passiven Kräfte eines Spielers für diese Nacht ein. Ein machtloses Ziel verschwendet den Zug.",
      },
      "bébé-loup": {
        name: "Babywolf",
        description: "Ein junger Wolf, dessen Tod einen letzten Racheangriff auslöst.",
        power:
          "Jagt mit dem Rudel oder allein. Wählt bei jeder Todesursache sofort einen lebenden Spieler, den er mit in den Tod nimmt.",
      },
      pyromaniac: {
        name: "Brandstifter",
        description:
          "Ein einsamer Brandstifter, der das Dorf vor einem verheerenden Feuer mit Brennstoff übergießt.",
        power:
          "Übergießt jede Nacht 1 Spieler bei anfangs höchstens 10 Spielern, sonst bis zu 2. Kann einmal pro Spiel statt Übergießen alle Brennstoffopfer entzünden. Gewinnt lebend bei insgesamt höchstens 3 Überlebenden.",
      },
      alien: {
        name: "Alien",
        description: "Ein außerirdischer Jäger, der alle Gegner mit Fähigkeiten ausschalten will.",
        power:
          "Errät jede Nacht die genaue Rolle: richtig bedeutet sofortigen Tod des Ziels; falsch kostet eine von 3 Fehlerchancen. Der dritte Fehler tötet das Alien. Gewinnt, wenn kein Gegner mit Kräften mehr lebt.",
      },
    },
    prompts: {
      "loup-rouge": "Friere die Kräfte eines Spielers diese Nacht ein.",
      "bébé-loup": "Wähle das Opfer des Rudels.",
      pyromaniac:
        "Übergießt jede Nacht 1 Spieler bei anfangs höchstens 10 Spielern, sonst bis zu 2. Kann einmal pro Spiel statt Übergießen alle Brennstoffopfer entzünden. Gewinnt lebend bei insgesamt höchstens 3 Überlebenden.",
      alien:
        "Errät jede Nacht die genaue Rolle: richtig bedeutet sofortigen Tod des Ziels; falsch kostet eine von 3 Fehlerchancen. Der dritte Fehler tötet das Alien. Gewinnt, wenn kein Gegner mit Kräften mehr lebt.",
    },
  },
  ru: {
    ui: {
      redWolfFreezePrompt: "Заморозьте способности игрока на эту ночь.",
      newWolfPackPrompt: "Выберите жертву стаи.",
      pyroDouse: "Облить",
      pyroIgnite: "Поджечь всех облитых",
      pyroMatchUsed: "Спичка уже использована",
      pyroLimit: "Облейте до {n} игроков.",
      fuelStatus: "Облит топливом",
      frozenStatus: "Способности заморожены этой ночью",
      alienGuessRole: "Угадайте точную роль",
      alienCharges: "Шансы на ошибку: {n} / 3",
      babyRevengeTitle: "Месть Волчонка",
      babyRevengeDesc: "{name} погибает. Выберите живого игрока для мести.",
      babyRevengeConfirm: "Подтвердить месть",
      fuelNotice: "{name} облит топливом.",
      causeFire: "Сгорел в пожаре",
      causeAlien: "Убит Пришельцем",
      causeAlienFailure: "Третья ошибка Пришельца",
      causeBabyRevenge: "Месть Волчонка",
    },
    events: {
      redWolfFrozen: "Способности {name} заморожены на эту ночь.",
      redWolfWasted: "У {name} нет доступных способностей: ход потрачен впустую.",
      pyroDoused: "Топливом облиты: {names}.",
      pyroIgnited: "Поджигатель поджигает: {names}.",
      alienCorrect: "Верно: {name} — {role}, цель устранена.",
      alienWrong: "Ошибка. Осталось шансов: {n}.",
      alienFailed: "Пришелец совершает третью ошибку и погибает.",
      alienImmuneWolves: "Волки напали на Пришельца, но он неуязвим: их удар этой ночью потерян.",
      winPyromaniac: "{name} побеждает как Поджигатель: осталось не более 3 выживших.",
      winAlien: "{name} побеждает как Пришелец: противников со способностями не осталось.",
      nightPowerUnavailable: "Ночное действие {name} недоступно.",
      cause_FIRE: "Сгорел в пожаре",
      cause_ALIEN: "Убит Пришельцем",
      cause_ALIEN_FAILURE: "Третья ошибка Пришельца",
      cause_BABY_WOLF_REVENGE: "Месть Волчонка",
    },
    roles: {
      "loup-rouge": {
        name: "Красный Волк",
        description: "Хитрый волк, который охотится со стаей и замораживает способности из тени.",
        power:
          "Охотится со стаей или один. Отдельным ходом замораживает активные и пассивные способности игрока на эту ночь. Цель без способностей тратит ход впустую.",
      },
      "bébé-loup": {
        name: "Волчонок",
        description: "Юный волк, чья смерть вызывает последний удар мести.",
        power:
          "Охотится со стаей или один. При гибели по любой причине немедленно выбирает живого игрока, которого забирает с собой.",
      },
      pyromaniac: {
        name: "Поджигатель",
        description:
          "Одинокий поджигатель, обливающий деревню топливом перед разрушительным пожаром.",
        power:
          "Каждую ночь обливает 1 игрока при начальном количестве до 10 включительно, иначе до 2. Раз за игру вместо обливания поджигает всех облитых. Побеждает живым, когда всего остаётся не более 3 выживших.",
      },
      alien: {
        name: "Пришелец",
        description:
          "Инопланетный охотник, стремящийся устранить всех противников со способностями.",
        power:
          "Каждую ночь угадывает точную роль: верно — немедленная гибель цели; ошибка отнимает один из 3 шансов. Третья ошибка убивает Пришельца. Побеждает, когда не осталось живых противников со способностями.",
      },
    },
    prompts: {
      "loup-rouge": "Заморозьте способности игрока на эту ночь.",
      "bébé-loup": "Выберите жертву стаи.",
      pyromaniac:
        "Каждую ночь обливает 1 игрока при начальном количестве до 10 включительно, иначе до 2. Раз за игру вместо обливания поджигает всех облитых. Побеждает живым, когда всего остаётся не более 3 выживших.",
      alien:
        "Каждую ночь угадывает точную роль: верно — немедленная гибель цели; ошибка отнимает один из 3 шансов. Третья ошибка убивает Пришельца. Побеждает, когда не осталось живых противников со способностями.",
    },
  },
  zh: {
    ui: {
      redWolfFreezePrompt: "冻结一名玩家今夜的技能。",
      newWolfPackPrompt: "选择狼群的袭击目标。",
      pyroDouse: "泼洒燃料",
      pyroIgnite: "点燃所有沾有燃料的玩家",
      pyroMatchUsed: "火柴已使用",
      pyroLimit: "最多泼洒 {n} 名玩家。",
      fuelStatus: "沾有燃料",
      frozenStatus: "今夜技能被冻结",
      alienGuessRole: "猜测确切身份",
      alienCharges: "容错机会：{n} / 3",
      babyRevengeTitle: "幼狼的复仇",
      babyRevengeDesc: "{name} 被淘汰。选择一名存活玩家一同淘汰。",
      babyRevengeConfirm: "确认复仇",
      fuelNotice: "{name} 身上沾有燃料。",
      causeFire: "在大火中死亡",
      causeAlien: "被外星人淘汰",
      causeAlienFailure: "外星人第三次猜错",
      causeBabyRevenge: "幼狼复仇",
    },
    events: {
      redWolfFrozen: "{name} 今夜的技能被冻结。",
      redWolfWasted: "{name} 没有可用技能：冻结行动浪费。",
      pyroDoused: "燃料泼洒目标：{names}。",
      pyroIgnited: "纵火者点燃：{names}。",
      alienCorrect: "猜对：{name} 是 {role}，立即被淘汰。",
      alienWrong: "猜错。剩余容错机会：{n}。",
      alienFailed: "外星人第三次猜错，被淘汰。",
      alienImmuneWolves: "狼人袭击了外星人，但它免疫：今晚的袭击作废。",
      winPyromaniac: "{name} 作为纵火者获胜：总存活人数不超过3人。",
      winAlien: "{name} 作为外星人获胜：没有拥有技能的对手存活。",
      nightPowerUnavailable: "{name} 的夜间行动不可用。",
      cause_FIRE: "在大火中死亡",
      cause_ALIEN: "被外星人淘汰",
      cause_ALIEN_FAILURE: "外星人第三次猜错",
      cause_BABY_WOLF_REVENGE: "幼狼复仇",
    },
    roles: {
      "loup-rouge": {
        name: "红狼",
        description: "与狼群一同狩猎，并从暗处冻结技能的狡猾狼人。",
        power:
          "与狼群狩猎，独狼时独自袭击。在独立回合冻结一名玩家今夜的主动及被动技能。无技能目标会浪费行动。",
      },
      "bébé-loup": {
        name: "幼狼",
        description: "与狼群狩猎，死亡时发动最后复仇的幼狼。",
        power: "与狼群狩猎，独狼时独自袭击。因任何原因死亡时，立即选择一名存活玩家一同淘汰。",
      },
      pyromaniac: {
        name: "纵火者",
        description: "每晚泼洒燃料，准备以一场灾难性大火取胜的独行纵火者。",
        power:
          "初始人数不超过10人时每晚泼洒1人，否则最多2人。每局可用一次火柴，代替泼洒并同时烧死所有沾有燃料的玩家。包括自己在内存活总人数不超过3人时获胜。",
      },
      alien: {
        name: "外星人",
        description: "通过精确推理消灭所有拥有技能的对手的外星猎手。",
        power:
          "每晚猜测目标的确切身份。猜对则立即淘汰目标，猜错消耗3次容错机会之一。第三次猜错自己死亡。没有拥有技能的对手存活时单独获胜。",
      },
    },
    prompts: {
      "loup-rouge": "冻结一名玩家今夜的技能。",
      "bébé-loup": "选择狼群的袭击目标。",
      pyromaniac:
        "初始人数不超过10人时每晚泼洒1人，否则最多2人。每局可用一次火柴，代替泼洒并同时烧死所有沾有燃料的玩家。包括自己在内存活总人数不超过3人时获胜。",
      alien:
        "每晚猜测目标的确切身份。猜对则立即淘汰目标，猜错消耗3次容错机会之一。第三次猜错自己死亡。没有拥有技能的对手存活时单独获胜。",
    },
  },
  ar: {
    ui: {
      redWolfFreezePrompt: "جمّد قدرات لاعب لهذه الليلة.",
      newWolfPackPrompt: "اختر ضحية القطيع.",
      pyroDouse: "غمر بالوقود",
      pyroIgnite: "إشعال جميع المغمورين بالوقود",
      pyroMatchUsed: "استُخدم عود الثقاب",
      pyroLimit: "اغمر حتى {n} لاعب بالوقود.",
      fuelStatus: "مغطى بالوقود",
      frozenStatus: "القدرات مجمّدة الليلة",
      alienGuessRole: "خمّن الدور الدقيق",
      alienCharges: "فرص الخطأ: {n} / 3",
      babyRevengeTitle: "انتقام الذئب الصغير",
      babyRevengeDesc: "أُقصي {name}. اختر لاعبًا حيًا ليأخذه معه.",
      babyRevengeConfirm: "تأكيد الانتقام",
      fuelNotice: "{name} مغطى بالوقود.",
      causeFire: "مات في الحريق",
      causeAlien: "قتله الكائن الفضائي",
      causeAlienFailure: "الخطأ الثالث للكائن الفضائي",
      causeBabyRevenge: "انتقام الذئب الصغير",
    },
    events: {
      redWolfFrozen: "قدرات {name} مجمّدة لهذه الليلة.",
      redWolfWasted: "لا يملك {name} قدرة متاحة: أُهدر التجميد.",
      pyroDoused: "غُمر بالوقود: {names}.",
      pyroIgnited: "يشعل الحارق: {names}.",
      alienCorrect: "تخمين صحيح: {name} هو {role} وقد أُقصي.",
      alienWrong: "تخمين خاطئ. الفرص المتبقية: {n}.",
      alienFailed: "ارتكب الكائن الفضائي خطأه الثالث وأُقصي.",
      alienImmuneWolves: "هاجمت الذئاب الكائن الفضائي لكنه محصّن: ضاعت ضربتهم هذه الليلة.",
      winPyromaniac: "يفوز {name} بصفته الحارق: بقي ثلاثة أحياء أو أقل.",
      winAlien: "يفوز {name} بصفته الكائن الفضائي: لا خصوم أحياء ذوو قدرات.",
      nightPowerUnavailable: "فعل {name} الليلي غير متاح.",
      cause_FIRE: "مات في الحريق",
      cause_ALIEN: "قتله الكائن الفضائي",
      cause_ALIEN_FAILURE: "الخطأ الثالث للكائن الفضائي",
      cause_BABY_WOLF_REVENGE: "انتقام الذئب الصغير",
    },
    roles: {
      "loup-rouge": {
        name: "الذئب الأحمر",
        description: "ذئب ماكر يصطاد مع القطيع ويجمّد القدرات من الظلال.",
        power:
          "يصطاد مع القطيع أو منفردًا. يستيقظ في خطوة منفصلة لتجميد قدرات لاعب النشطة والسلبية لهذه الليلة. استهداف لاعب بلا قدرات يهدر الفعل.",
      },
      "bébé-loup": {
        name: "الذئب الصغير",
        description: "ذئب صغير يؤدي موته إلى ضربة انتقام أخيرة.",
        power: "يصطاد مع القطيع أو منفردًا. عند موته لأي سبب، يختار فورًا لاعبًا حيًا ليأخذه معه.",
      },
      pyromaniac: {
        name: "مُشعل الحرائق",
        description: "حارق منفرد يغمر القرية بالوقود قبل إشعال حريق كارثي.",
        power:
          "كل ليلة يغمر لاعبًا واحدًا إذا بدأت القرية بعشرة لاعبين أو أقل، وإلا حتى لاعبين. مرة في اللعبة يشعل جميع المغمورين بدل الغمر. يفوز حيًا عندما يبقى ثلاثة أحياء أو أقل إجمالًا بمن فيهم هو.",
      },
      alien: {
        name: "الكائن الفضائي",
        description: "صياد فضائي يسعى للقضاء على جميع الخصوم أصحاب القدرات.",
        power:
          "يخمّن الدور الدقيق كل ليلة: الصحيح يقتل الهدف فورًا؛ الخطأ يستهلك فرصة من ثلاث. الخطأ الثالث يقتله. يفوز حين لا يبقى أي خصم حي صاحب قدرات.",
      },
    },
    prompts: {
      "loup-rouge": "جمّد قدرات لاعب لهذه الليلة.",
      "bébé-loup": "اختر ضحية القطيع.",
      pyromaniac:
        "كل ليلة يغمر لاعبًا واحدًا إذا بدأت القرية بعشرة لاعبين أو أقل، وإلا حتى لاعبين. مرة في اللعبة يشعل جميع المغمورين بدل الغمر. يفوز حيًا عندما يبقى ثلاثة أحياء أو أقل إجمالًا بمن فيهم هو.",
      alien:
        "يخمّن الدور الدقيق كل ليلة: الصحيح يقتل الهدف فورًا؛ الخطأ يستهلك فرصة من ثلاث. الخطأ الثالث يقتله. يفوز حين لا يبقى أي خصم حي صاحب قدرات.",
    },
  },
};
