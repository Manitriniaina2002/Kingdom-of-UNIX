/**
 * Leçons UNIX en Français – Kingdom of UNIX
 * 10 chapitres, 30 leçons couvrant UNIX des bases à l'administration
 */

export const CHAPTERS = [
  { id: 'ch1', title: 'Introduction à UNIX', description: 'Comprendre le monde UNIX', icon: '🌍', color: '#22C55E', order: 1 },
  { id: 'ch2', title: 'Naviguer dans le système de fichiers', description: 'Se déplacer dans les répertoires', icon: '🧭', color: '#3B82F6', order: 2 },
  { id: 'ch3', title: 'Travailler avec les fichiers', description: 'Créer, afficher et gérer les fichiers', icon: '📄', color: '#8B5CF6', order: 3 },
  { id: 'ch4', title: 'Permissions et propriété', description: "Contrôler l'accès aux fichiers", icon: '🔐', color: '#A855F7', order: 4 },
  { id: 'ch5', title: 'Traitement de texte', description: 'Rechercher et transformer du texte', icon: '📝', color: '#EC4899', order: 5 },
  { id: 'ch6', title: 'Gestion des processus', description: 'Contrôler les programmes en cours', icon: '⚙️', color: '#10B981', order: 6 },
  { id: 'ch7', title: 'Tubes et redirections', description: 'Connecter les commandes entre elles', icon: '🔗', color: '#F59E0B', order: 7 },
  { id: 'ch8', title: 'Bases du scripting Shell', description: 'Automatiser avec des scripts', icon: '📜', color: '#EF4444', order: 8 },
  { id: 'ch9', title: 'Bases du réseau', description: 'Se connecter au monde', icon: '🌐', color: '#6366F1', order: 9 },
  { id: 'ch10', title: 'Administration système', description: 'Gérer le système', icon: '🛡️', color: '#14B8A6', order: 10 },
];

export const LESSONS = {
  // ═══════════════════════ CHAPITRE 1 : Introduction ═══════════════════════
  lesson_ch1_01: {
    id: 'lesson_ch1_01', chapterId: 'ch1', title: "Qu'est-ce qu'UNIX ?", order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Un bref historique' },
      { type: 'paragraph', text: "UNIX a été créé aux laboratoires Bell en 1969 par Ken Thompson et Dennis Ritchie. Il est devenu la base de nombreux systèmes d'exploitation modernes, notamment Linux, macOS et les variantes BSD." },
      { type: 'heading', text: 'La philosophie UNIX' },
      { type: 'paragraph', text: "UNIX suit des principes de conception clés : faire une seule chose et bien la faire, tout est un fichier, et les programmes doivent fonctionner ensemble via des flux de texte. Cela rend UNIX incroyablement puissant et flexible." },
      { type: 'list', items: ["Écrire des programmes qui font une seule chose et la font bien", "Écrire des programmes qui fonctionnent ensemble", "Écrire des programmes qui gèrent des flux de texte comme interface universelle", "Tout est un fichier (périphériques, processus, sockets)"] },
      { type: 'heading', text: 'UNIX vs Linux' },
      { type: 'paragraph', text: "Linux est un système d'exploitation de type UNIX créé par Linus Torvalds en 1991. Bien que techniquement pas UNIX, il suit les mêmes principes et supporte les mêmes commandes. La plupart des serveurs dans le monde fonctionnent sous Linux." },
      { type: 'tip', text: "Quand on parle de « commandes UNIX », on désigne généralement des commandes qui fonctionnent à la fois sur UNIX et Linux." },
    ],
    examples: [
      { input: 'uname -s', output: 'Linux', description: "Vérifier le nom de votre système d'exploitation" },
      { input: 'uname -a', output: 'Linux hostname 5.15.0 #1 SMP x86_64 GNU/Linux', description: 'Afficher toutes les informations système' },
    ],
    practiceExercises: [
      { instruction: "Vérifiez quel système d'exploitation vous utilisez", expectedCommand: 'uname', hint: 'La commande uname affiche les informations système' },
      { instruction: "Affichez toutes les informations système d'un coup", expectedCommand: 'uname -a', hint: "Utilisez le drapeau -a pour toutes les informations" },
    ],
  },

  lesson_ch1_02: {
    id: 'lesson_ch1_02', chapterId: 'ch1', title: 'Le terminal et le Shell', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['echo', 'whoami'],
    content: [
      { type: 'heading', text: "Qu'est-ce qu'un terminal ?" },
      { type: 'paragraph', text: "Un terminal (ou émulateur de terminal) est un programme qui fournit une interface textuelle pour interagir avec votre ordinateur. Il affiche une invite où vous tapez des commandes et montre le résultat." },
      { type: 'heading', text: "Qu'est-ce qu'un Shell ?" },
      { type: 'paragraph', text: "Le shell est le programme qui interprète vos commandes. Les shells populaires incluent Bash (Bourne Again Shell), Zsh et Fish. Le shell lit ce que vous tapez, l'exécute et affiche le résultat." },
      { type: 'heading', text: "L'invite de commande" },
      { type: 'paragraph', text: "L'invite affiche généralement votre nom d'utilisateur, le nom de la machine et le répertoire actuel. Elle se termine par $ pour les utilisateurs normaux ou # pour root (administrateur)." },
      { type: 'code', command: 'echo $SHELL', output: '/bin/bash' },
      { type: 'tip', text: "Vous pouvez découvrir quel shell vous utilisez avec echo $SHELL. La plupart des distributions Linux utilisent Bash par défaut." },
      { type: 'heading', text: 'Vos premières commandes' },
      { type: 'code', command: 'whoami', output: 'adventurer' },
    ],
    examples: [
      { input: 'echo "Hello, World!"', output: 'Hello, World!', description: 'Afficher du texte dans le terminal' },
      { input: 'whoami', output: 'adventurer', description: "Afficher le nom d'utilisateur actuel" },
    ],
    practiceExercises: [
      { instruction: "Affichez votre nom d'utilisateur à l'écran", expectedCommand: 'whoami', hint: "whoami affiche l'utilisateur actuellement connecté" },
      { instruction: 'Affichez le texte "Hello UNIX" dans le terminal', expectedCommand: 'echo Hello UNIX', hint: 'Utilisez echo suivi du texte que vous voulez afficher' },
    ],
  },

  lesson_ch1_03: {
    id: 'lesson_ch1_03', chapterId: 'ch1', title: "Structure d'une commande", order: 3,
    estimatedReadTime: '5 min', keyCommands: ['man', 'help'],
    content: [
      { type: 'heading', text: "Anatomie d'une commande" },
      { type: 'paragraph', text: "Chaque commande UNIX suit le schéma : commande [options] [arguments]. La commande est ce que vous voulez faire, les options modifient son fonctionnement, et les arguments sont sur quoi elle travaille." },
      { type: 'code', command: 'ls -la /home', output: 'total 4\ndrwxr-xr-x 3 root root 4096 Jan 1 00:00 .' },
      { type: 'paragraph', text: "Dans « ls -la /home » : ls est la commande, -la sont les options (l=format long, a=tous les fichiers), et /home est l'argument (quel répertoire lister)." },
      { type: 'heading', text: 'Options et drapeaux' },
      { type: 'list', items: ['Les options courtes utilisent un seul tiret : -l, -a, -h', 'Les options courtes peuvent être combinées : -la équivaut à -l -a', 'Les options longues utilisent un double tiret : --all, --help', 'Certaines options prennent des valeurs : --color=auto'] },
      { type: 'heading', text: "Obtenir de l'aide" },
      { type: 'paragraph', text: "Utilisez man (manual) pour lire la documentation de n'importe quelle commande. Appuyez sur q pour quitter le manuel, et utilisez les flèches ou espace pour défiler." },
      { type: 'code', command: 'man ls', output: 'LS(1)\nNAME\n  ls - list directory contents\n...' },
      { type: 'tip', text: "La plupart des commandes supportent --help pour un résumé rapide. Essayez : ls --help" },
    ],
    examples: [
      { input: 'ls --help', output: 'Usage: ls [OPTION]... [FILE]...\nList information about the FILEs...', description: "Aide rapide pour la commande ls" },
      { input: 'man pwd', output: 'PWD(1)\nNAME\n  pwd - print name of current/working directory', description: 'Lire le manuel de pwd' },
    ],
    practiceExercises: [
      { instruction: "Obtenez l'aide de la commande ls", expectedCommand: 'ls --help', hint: "Utilisez --help après le nom de la commande" },
      { instruction: 'Lisez la page de manuel de la commande echo', expectedCommand: 'man echo', hint: 'Utilisez man suivi du nom de la commande' },
    ],
  },

  // ═══════════════════════ CHAPITRE 2 : Navigation ═══════════════════════
  lesson_ch2_01: {
    id: 'lesson_ch2_01', chapterId: 'ch2', title: 'Structure des répertoires', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: "L'arborescence du système de fichiers UNIX" },
      { type: 'paragraph', text: "UNIX organise tout dans une arborescence hiérarchique à partir du répertoire racine /. Chaque fichier et répertoire se trouve sous cette racine unique, contrairement à Windows qui a des lettres de lecteur séparées." },
      { type: 'heading', text: 'Répertoires clés' },
      { type: 'table', headers: ['Répertoire', 'Utilité'], rows: [
        ['/', 'Racine - sommet du système de fichiers'],
        ['/home', 'Répertoires personnels des utilisateurs'],
        ['/etc', 'Fichiers de configuration système'],
        ['/var', 'Données variables (journaux, courrier, temp)'],
        ['/tmp', 'Fichiers temporaires (effacés au redémarrage)'],
        ['/usr', 'Programmes et utilitaires utilisateur'],
        ['/bin', 'Binaires de commandes essentiels'],
        ['/dev', 'Fichiers de périphériques (matériel)'],
      ]},
      { type: 'tip', text: "Vos fichiers personnels se trouvent dans /home/votrenom. Le symbole ~ est un raccourci pour votre répertoire personnel." },
      { type: 'heading', text: 'Fichiers cachés' },
      { type: 'paragraph', text: "Les fichiers commençant par un point (.) sont cachés par défaut. Les fichiers de configuration comme .bashrc, .profile et .ssh sont cachés pour garder les répertoires propres." },
    ],
    examples: [
      { input: 'ls /', output: 'bin  dev  etc  home  lib  tmp  usr  var', description: 'Lister le contenu du répertoire racine' },
      { input: 'ls -a ~', output: '.  ..  .bashrc  .profile  Documents  Downloads', description: 'Lister tous les fichiers y compris les cachés dans le répertoire personnel' },
    ],
    practiceExercises: [
      { instruction: 'Listez le contenu du répertoire racine', expectedCommand: 'ls /', hint: 'Utilisez ls avec / comme chemin' },
      { instruction: 'Affichez les fichiers cachés dans le répertoire actuel', expectedCommand: 'ls -a', hint: 'Le drapeau -a affiche tous les fichiers, y compris les cachés' },
    ],
  },

  lesson_ch2_02: {
    id: 'lesson_ch2_02', chapterId: 'ch2', title: 'Naviguer avec pwd, cd, ls', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['pwd', 'cd', 'ls'],
    content: [
      { type: 'heading', text: 'Où suis-je ? (pwd)' },
      { type: 'paragraph', text: "pwd (print working directory) affiche votre emplacement actuel dans le système de fichiers. Utilisez-le toujours quand vous n'êtes pas sûr d'où vous êtes." },
      { type: 'code', command: 'pwd', output: '/home/adventurer' },
      { type: 'heading', text: 'Se déplacer (cd)' },
      { type: 'paragraph', text: "cd (change directory) vous déplace vers un autre répertoire. Utilisez-le avec un chemin pour aller à un endroit précis." },
      { type: 'code', command: 'cd /tmp', output: '' },
      { type: 'heading', text: 'Lister le contenu (ls)' },
      { type: 'paragraph', text: "ls liste les fichiers et répertoires. Il possède de nombreux drapeaux utiles pour différents formats." },
      { type: 'list', items: ['ls -l : format long avec permissions, taille, date', 'ls -a : afficher les fichiers cachés (commençant par .)', 'ls -h : tailles de fichiers lisibles (Ko, Mo)', 'ls -t : trier par date de modification', 'ls -R : lister les sous-répertoires récursivement'] },
      { type: 'tip', text: "Combinez les drapeaux : ls -lah vous donne une liste détaillée de tous les fichiers avec des tailles lisibles." },
    ],
    examples: [
      { input: 'ls -lh', output: 'total 8.0K\ndrwxr-xr-x 2 user user 4.0K Jan 1 notes.txt\n-rw-r--r-- 1 user user 1.2K Jan 1 readme.md', description: 'Liste détaillée avec tailles lisibles' },
      { input: 'cd .. && pwd', output: '/home', description: "Remonter d'un répertoire et afficher l'emplacement" },
    ],
    practiceExercises: [
      { instruction: 'Affichez votre répertoire de travail actuel', expectedCommand: 'pwd', hint: 'pwd affiche le chemin complet de votre emplacement' },
      { instruction: 'Listez tous les fichiers en format détaillé', expectedCommand: 'ls -la', hint: 'Combinez -l (long) et -a (tous) les drapeaux' },
    ],
  },

  lesson_ch2_03: {
    id: 'lesson_ch2_03', chapterId: 'ch2', title: 'Chemins et raccourcis', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['cd', 'tree'],
    content: [
      { type: 'heading', text: 'Chemins absolus vs relatifs' },
      { type: 'paragraph', text: "Un chemin absolu commence depuis la racine (/), comme /home/user/docs. Un chemin relatif commence depuis votre répertoire actuel, comme docs/notes.txt. Utilisez les chemins absolus quand vous avez besoin d'être précis." },
      { type: 'heading', text: 'Raccourcis de chemin' },
      { type: 'table', headers: ['Raccourci', 'Signification'], rows: [
        ['~', 'Votre répertoire personnel (/home/nomutilisateur)'],
        ['.', 'Répertoire actuel'],
        ['..', 'Répertoire parent (un niveau au-dessus)'],
        ['-', "Répertoire précédent (d'où vous venez)"],
      ]},
      { type: 'code', command: 'cd ~', output: '' },
      { type: 'heading', text: 'Auto-complétion avec Tab' },
      { type: 'paragraph', text: "Appuyez sur Tab pour auto-compléter les noms de fichiers et répertoires. Appuyez sur Tab deux fois pour voir toutes les possibilités. Cela économise beaucoup de frappe et prévient les erreurs." },
      { type: 'tip', text: 'Utilisez cd - pour basculer rapidement entre deux répertoires. Très pratique quand vous travaillez à deux endroits.' },
    ],
    examples: [
      { input: 'cd ~/Documents', output: '', description: 'Aller dans Documents dans votre répertoire personnel' },
      { input: 'tree -L 2', output: '.\n├── docs\n│   ├── readme.md\n│   └── notes.txt\n└── src\n    └── main.js', description: "Afficher l'arborescence sur 2 niveaux" },
    ],
    practiceExercises: [
      { instruction: 'Naviguez vers votre répertoire personnel en utilisant le raccourci', expectedCommand: 'cd ~', hint: 'Le caractère ~ représente votre répertoire personnel' },
      { instruction: "Remontez d'un niveau de répertoire", expectedCommand: 'cd ..', hint: 'Deux points (..) signifient le répertoire parent' },
    ],
  },

  // ═══════════════════════ CHAPITRE 3 : Fichiers ═══════════════════════
  lesson_ch3_01: {
    id: 'lesson_ch3_01', chapterId: 'ch3', title: 'Créer et afficher des fichiers', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['touch', 'mkdir', 'cat', 'less', 'head', 'tail'],
    content: [
      { type: 'heading', text: 'Créer des fichiers et des répertoires' },
      { type: 'paragraph', text: "touch crée des fichiers vides ou met à jour les horodatages. mkdir crée des répertoires. Utilisez mkdir -p pour créer des répertoires imbriqués en une seule commande." },
      { type: 'code', command: 'touch newfile.txt', output: '' },
      { type: 'code', command: 'mkdir -p projects/web/css', output: '' },
      { type: 'heading', text: 'Afficher le contenu des fichiers' },
      { type: 'paragraph', text: 'Plusieurs commandes permettent de visualiser les fichiers de différentes manières :' },
      { type: 'list', items: ["cat : afficher le fichier entier d'un coup", 'less : parcourir un fichier page par page (q pour quitter)', 'head : afficher les 10 premières lignes (utilisez -n pour un nombre personnalisé)', 'tail : afficher les 10 dernières lignes (utilisez -f pour suivre les mises à jour en direct)'] },
      { type: 'code', command: 'cat /etc/hostname', output: 'kingdom-server' },
      { type: 'tip', text: "Utilisez tail -f pour surveiller les fichiers journaux en temps réel. Très utile pour le débogage." },
    ],
    examples: [
      { input: 'head -5 /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin\nbin:x:2:2:bin:/usr/bin\nsys:x:3:3:sys:/dev\nsync:x:4:65534:sync:/bin', description: "Afficher les 5 premières lignes d'un fichier" },
      { input: 'tail -3 /var/log/syslog', output: 'Jan 1 12:00:01 server systemd[1]: Started Session\nJan 1 12:00:02 server sshd[1234]: Accepted\nJan 1 12:00:03 server kernel: info', description: "Afficher les 3 dernières lignes d'un fichier journal" },
    ],
    practiceExercises: [
      { instruction: 'Créez un nouveau fichier vide appelé notes.txt', expectedCommand: 'touch notes.txt', hint: 'Utilisez la commande touch suivie du nom de fichier' },
      { instruction: 'Créez une structure de répertoires imbriqués projects/src', expectedCommand: 'mkdir -p projects/src', hint: 'Utilisez mkdir avec le drapeau -p pour les répertoires imbriqués' },
    ],
  },

  lesson_ch3_02: {
    id: 'lesson_ch3_02', chapterId: 'ch3', title: 'Copier, déplacer et renommer', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['cp', 'mv'],
    content: [
      { type: 'heading', text: 'Copier des fichiers (cp)' },
      { type: 'paragraph', text: "cp copie des fichiers et des répertoires. Utilisez -r (récursif) pour copier des répertoires entiers avec leur contenu." },
      { type: 'code', command: 'cp file.txt backup.txt', output: '' },
      { type: 'code', command: 'cp -r mydir/ mydir_backup/', output: '' },
      { type: 'heading', text: 'Déplacer et renommer (mv)' },
      { type: 'paragraph', text: "mv déplace des fichiers vers un nouvel emplacement OU les renomme. Il n'y a pas de commande rename séparée sous UNIX - mv fait les deux." },
      { type: 'code', command: 'mv oldname.txt newname.txt', output: '' },
      { type: 'code', command: 'mv file.txt /tmp/', output: '' },
      { type: 'warning', text: "mv écrase la destination sans demander. Utilisez mv -i (interactif) pour obtenir une confirmation avant d'écraser." },
      { type: 'tip', text: 'Pour copier en préservant les permissions et les horodatages, utilisez cp -a (mode archive).' },
    ],
    examples: [
      { input: 'cp -r src/ src_backup/', output: '', description: 'Copier un répertoire entier récursivement' },
      { input: 'mv *.txt documents/', output: '', description: 'Déplacer tous les fichiers .txt dans le répertoire documents' },
    ],
    practiceExercises: [
      { instruction: 'Copiez file.txt dans un nouveau fichier appelé backup.txt', expectedCommand: 'cp file.txt backup.txt', hint: 'Utilisez cp avec source et destination' },
      { instruction: 'Renommez old.txt en new.txt', expectedCommand: 'mv old.txt new.txt', hint: 'Utilisez mv pour renommer les fichiers' },
    ],
  },

  lesson_ch3_03: {
    id: 'lesson_ch3_03', chapterId: 'ch3', title: 'Supprimer des fichiers et jokers', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['rm', 'rmdir'],
    content: [
      { type: 'heading', text: 'Supprimer des fichiers (rm)' },
      { type: 'paragraph', text: "rm supprime des fichiers de façon permanente. Il n'y a pas de corbeille sous UNIX - les fichiers supprimés sont perdus à jamais. Utilisez -r pour les répertoires et -f pour forcer sans confirmation." },
      { type: 'code', command: 'rm unwanted.txt', output: '' },
      { type: 'code', command: 'rm -r old_directory/', output: '' },
      { type: 'warning', text: "N'exécutez jamais rm -rf / ou rm -rf * sans vérifier. Ces commandes peuvent détruire tout votre système. Vérifiez toujours votre chemin avec pwd." },
      { type: 'heading', text: 'Jokers (Globbing)' },
      { type: 'paragraph', text: 'Les jokers permettent de correspondre à plusieurs fichiers à la fois :' },
      { type: 'table', headers: ['Motif', 'Correspond à'], rows: [
        ['*', "N'importe quel nombre de caractères"],
        ['?', 'Exactement un caractère'],
        ['[abc]', "N'importe quel caractère de l'ensemble"],
        ['[0-9]', "N'importe quel chiffre"],
        ['*.txt', 'Tous les fichiers se terminant par .txt'],
      ]},
      { type: 'tip', text: "Utilisez rmdir pour supprimer uniquement les répertoires vides - c'est plus sûr que rm -r car il refusera de supprimer les répertoires avec du contenu." },
    ],
    examples: [
      { input: 'ls *.js', output: 'app.js  index.js  utils.js', description: 'Lister tous les fichiers JavaScript' },
      { input: 'rm -i *.log', output: "rm: remove regular file 'error.log'?", description: 'Supprimer les fichiers log avec confirmation' },
    ],
    practiceExercises: [
      { instruction: 'Supprimez un fichier appelé temp.txt', expectedCommand: 'rm temp.txt', hint: 'Utilisez rm suivi du nom de fichier' },
      { instruction: 'Listez tous les fichiers se terminant par .txt', expectedCommand: 'ls *.txt', hint: 'Utilisez le joker * avant .txt' },
    ],
  },

  // ═══════════════════════ CHAPITRE 4 : Permissions ═══════════════════════
  lesson_ch4_01: {
    id: 'lesson_ch4_01', chapterId: 'ch4', title: 'Comprendre les permissions', order: 1,
    estimatedReadTime: '7 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: 'Le système de permissions' },
      { type: 'paragraph', text: "Chaque fichier sous UNIX possède trois ensembles de permissions pour trois catégories d'utilisateurs : le propriétaire (u), le groupe (g) et les autres (o). Chaque ensemble contrôle la lecture (r), l'écriture (w) et l'exécution (x)." },
      { type: 'heading', text: 'Lire les chaînes de permissions' },
      { type: 'code', command: 'ls -l myfile.txt', output: '-rw-r--r-- 1 user group 1024 Jan 1 myfile.txt' },
      { type: 'paragraph', text: "La chaîne -rw-r--r-- se décompose ainsi : - (type de fichier), rw- (propriétaire : lecture+écriture), r-- (groupe : lecture seule), r-- (autres : lecture seule)." },
      { type: 'table', headers: ['Caractère', 'Signification', 'Numérique'], rows: [
        ['r', 'Lecture (voir le contenu)', '4'],
        ['w', 'Écriture (modifier le contenu)', '2'],
        ['x', 'Exécution (lancer comme programme)', '1'],
        ['-', 'Permission refusée', '0'],
      ]},
      { type: 'heading', text: 'Types de fichiers' },
      { type: 'list', items: ['- : fichier normal', 'd : répertoire', 'l : lien symbolique', 'b : périphérique bloc', 'c : périphérique caractère'] },
      { type: 'tip', text: "Les répertoires ont besoin de la permission d'exécution (x) pour y entrer (cd), et de lecture (r) pour lister leur contenu." },
    ],
    examples: [
      { input: 'ls -la', output: 'drwxr-xr-x 2 user user 4096 Jan 1 Documents\n-rwxr-x--- 1 user user 8192 Jan 1 script.sh\n-rw-r--r-- 1 user user 1024 Jan 1 readme.md', description: 'Voir les permissions de tous les fichiers' },
      { input: 'stat myfile.txt', output: 'Access: (0644/-rw-r--r--)  Uid: (1000/user)  Gid: (1000/user)', description: 'Statut détaillé du fichier avec les permissions' },
    ],
    practiceExercises: [
      { instruction: 'Affichez les permissions détaillées de tous les fichiers', expectedCommand: 'ls -la', hint: 'Utilisez ls -la pour la liste détaillée de tous les fichiers' },
      { instruction: "Vérifiez le statut détaillé d'un fichier", expectedCommand: 'stat myfile.txt', hint: 'La commande stat affiche les informations détaillées du fichier' },
    ],
  },

  lesson_ch4_02: {
    id: 'lesson_ch4_02', chapterId: 'ch4', title: 'Modifier les permissions (chmod)', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['chmod'],
    content: [
      { type: 'heading', text: 'Mode numérique (octal)' },
      { type: 'paragraph', text: "La méthode la plus courante pour définir les permissions. Additionnez les valeurs : r=4, w=2, x=1. Trois chiffres représentent le propriétaire, le groupe et les autres." },
      { type: 'table', headers: ['Commande', 'Résultat', 'Signification'], rows: [
        ['chmod 755', 'rwxr-xr-x', 'Propriétaire : tout, Groupe/Autres : lecture+exécution'],
        ['chmod 644', 'rw-r--r--', 'Propriétaire : lecture+écriture, Groupe/Autres : lecture seule'],
        ['chmod 700', 'rwx------', 'Propriétaire : tout, Groupe/Autres : rien'],
        ['chmod 600', 'rw-------', "Propriétaire : lecture+écriture, personne d'autre"],
      ]},
      { type: 'heading', text: 'Mode symbolique' },
      { type: 'paragraph', text: "Méthode plus lisible utilisant des lettres : u (utilisateur/propriétaire), g (groupe), o (autres), a (tous). Actions : + (ajouter), - (retirer), = (définir exactement)." },
      { type: 'code', command: 'chmod u+x script.sh', output: '' },
      { type: 'code', command: 'chmod go-w file.txt', output: '' },
      { type: 'tip', text: '755 est le standard pour les répertoires et scripts. 644 est le standard pour les fichiers normaux. Mémorisez ces deux-là.' },
      { type: 'warning', text: "N'utilisez jamais chmod 777 en production. Cela donne un accès complet à tout le monde et constitue un risque de sécurité." },
    ],
    examples: [
      { input: 'chmod 755 deploy.sh', output: '', description: 'Rendre un script exécutable par tous' },
      { input: 'chmod u+x,g-w file.txt', output: '', description: "Ajouter l'exécution pour le propriétaire, retirer l'écriture pour le groupe" },
    ],
    practiceExercises: [
      { instruction: 'Rendez script.sh exécutable pour le propriétaire', expectedCommand: 'chmod u+x script.sh', hint: "Utilisez u+x pour ajouter la permission d'exécution pour l'utilisateur/propriétaire" },
      { instruction: 'Définissez les permissions en lecture/écriture pour le propriétaire uniquement', expectedCommand: 'chmod 600 file.txt', hint: '6 = lecture(4) + écriture(2), 0 = aucune permission' },
    ],
  },

  lesson_ch4_03: {
    id: 'lesson_ch4_03', chapterId: 'ch4', title: 'Propriété et permissions spéciales', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['chown', 'chgrp'],
    content: [
      { type: 'heading', text: 'Changer la propriété (chown)' },
      { type: 'paragraph', text: "chown change le propriétaire d'un fichier. Vous pouvez changer le propriétaire, le groupe, ou les deux à la fois. Nécessite généralement les privilèges root/sudo." },
      { type: 'code', command: 'chown user:group file.txt', output: '' },
      { type: 'code', command: 'chown -R www-data:www-data /var/www/', output: '' },
      { type: 'heading', text: 'Changer le groupe (chgrp)' },
      { type: 'paragraph', text: "chgrp change uniquement le groupe propriétaire. Utile quand vous avez juste besoin de partager un fichier avec un groupe spécifique." },
      { type: 'heading', text: 'Bits de permissions spéciaux' },
      { type: 'table', headers: ['Bit', 'Numérique', 'Effet'], rows: [
        ['setuid', '4000', "Le fichier s'exécute en tant que propriétaire, pas l'utilisateur qui le lance"],
        ['setgid', '2000', "Le fichier s'exécute en tant que groupe. Sur les répertoires, les nouveaux fichiers héritent du groupe"],
        ['sticky', '1000', 'Sur les répertoires, seul le propriétaire peut supprimer ses propres fichiers (ex: /tmp)'],
      ]},
      { type: 'tip', text: 'Le répertoire /tmp a le bit sticky défini pour que les utilisateurs ne puissent pas supprimer les fichiers temporaires des autres.' },
    ],
    examples: [
      { input: 'chown alice:devs project/', output: '', description: 'Changer le propriétaire en alice, le groupe en devs' },
      { input: 'chmod 1777 /tmp', output: '', description: 'Définir le bit sticky sur un répertoire partagé' },
    ],
    practiceExercises: [
      { instruction: "Changez le propriétaire de file.txt à l'utilisateur bob", expectedCommand: 'chown bob file.txt', hint: 'Utilisez chown suivi du nouveau propriétaire et du nom de fichier' },
      { instruction: 'Changez le groupe de file.txt à developers', expectedCommand: 'chgrp developers file.txt', hint: 'Utilisez chgrp suivi du nom de groupe et du nom de fichier' },
    ],
  },

  // ═══════════════════════ CHAPITRE 5 : Traitement de texte ═══════════════════════
  lesson_ch5_01: {
    id: 'lesson_ch5_01', chapterId: 'ch5', title: 'Rechercher avec grep', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['grep'],
    content: [
      { type: 'heading', text: "Qu'est-ce que grep ?" },
      { type: 'paragraph', text: "grep (Global Regular Expression Print) recherche des motifs dans du texte et affiche les lignes correspondantes. C'est l'une des commandes UNIX les plus utilisées." },
      { type: 'code', command: 'grep "error" /var/log/syslog', output: 'Jan 1 12:00 error: disk full\nJan 1 13:00 error: connection timeout' },
      { type: 'heading', text: 'Drapeaux courants de grep' },
      { type: 'list', items: ['-i : recherche insensible à la casse', '-r : recherche récursive dans les répertoires', '-n : afficher les numéros de ligne', '-v : inverser la correspondance (afficher les lignes qui NE correspondent PAS)', '-c : compter les lignes correspondantes', '-l : afficher uniquement les noms de fichiers contenant des correspondances'] },
      { type: 'heading', text: 'Expressions régulières de base' },
      { type: 'paragraph', text: "grep supporte les motifs regex : ^ (début de ligne), $ (fin de ligne), . (n'importe quel caractère), * (zéro ou plus du précédent)." },
      { type: 'tip', text: 'Utilisez grep -rn pour rechercher efficacement dans le code - il cherche dans tous les fichiers récursivement et affiche les numéros de ligne.' },
    ],
    examples: [
      { input: 'grep -rn "TODO" src/', output: 'src/app.js:15:// TODO: add validation\nsrc/utils.js:42:// TODO: refactor', description: 'Trouver tous les commentaires TODO dans le code source' },
      { input: 'grep -c "error" logfile.txt', output: '23', description: 'Compter combien de lignes contiennent "error"' },
    ],
    practiceExercises: [
      { instruction: 'Recherchez le mot "hello" dans file.txt (insensible à la casse)', expectedCommand: 'grep -i "hello" file.txt', hint: 'Utilisez le drapeau -i pour la recherche insensible à la casse' },
      { instruction: 'Recherchez récursivement "config" dans le répertoire actuel', expectedCommand: 'grep -r "config" .', hint: 'Utilisez -r pour la recherche récursive et . pour le répertoire actuel' },
    ],
  },

  lesson_ch5_02: {
    id: 'lesson_ch5_02', chapterId: 'ch5', title: 'Tri et comptage', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['sort', 'uniq', 'wc', 'cut'],
    content: [
      { type: 'heading', text: 'Trier avec sort' },
      { type: 'paragraph', text: "sort organise les lignes alphabétiquement par défaut. Drapeaux courants : -n (tri numérique), -r (inverse), -k (trier par champ spécifique), -u (unique - supprimer les doublons)." },
      { type: 'code', command: 'sort -n numbers.txt', output: '1\n5\n10\n42\n100' },
      { type: 'heading', text: 'Compter avec wc' },
      { type: 'paragraph', text: 'wc (word count) compte les lignes, mots et caractères. Utilisez -l pour les lignes seulement, -w pour les mots seulement, -c pour les octets.' },
      { type: 'code', command: 'wc -l /etc/passwd', output: '32 /etc/passwd' },
      { type: 'heading', text: 'Lignes uniques avec uniq' },
      { type: 'paragraph', text: "uniq supprime les lignes dupliquées adjacentes. Triez toujours d'abord car uniq ne supprime que les doublons consécutifs. Utilisez -c pour compter les occurrences." },
      { type: 'heading', text: 'Extraire des champs avec cut' },
      { type: 'paragraph', text: 'cut extrait des colonnes spécifiques du texte. Utilisez -d pour le délimiteur et -f pour les numéros de champ.' },
      { type: 'code', command: 'cut -d: -f1 /etc/passwd', output: 'root\ndaemon\nbin\nuser' },
    ],
    examples: [
      { input: 'sort names.txt | uniq -c | sort -rn', output: '   5 alice\n   3 bob\n   1 charlie', description: "Compter et trier les occurrences de noms" },
      { input: 'wc -lwc file.txt', output: '  100   450  3200 file.txt', description: 'Compter les lignes, mots et caractères' },
    ],
    practiceExercises: [
      { instruction: "Comptez le nombre de lignes dans un fichier", expectedCommand: 'wc -l file.txt', hint: 'Utilisez wc avec le drapeau -l pour le comptage de lignes' },
      { instruction: 'Triez un fichier numériquement en ordre inverse', expectedCommand: 'sort -rn numbers.txt', hint: 'Utilisez -n pour numérique et -r pour inverse' },
    ],
  },

  lesson_ch5_03: {
    id: 'lesson_ch5_03', chapterId: 'ch5', title: 'Édition de flux (sed & awk)', order: 3,
    estimatedReadTime: '7 min', keyCommands: ['sed', 'awk', 'tr'],
    content: [
      { type: 'heading', text: "sed - Éditeur de flux" },
      { type: 'paragraph', text: "sed effectue des transformations de texte sur un flux d'entrée. L'utilisation la plus courante est le rechercher-remplacer avec la commande s." },
      { type: 'code', command: "sed 's/old/new/g' file.txt", output: '(contenu du fichier avec old remplacé par new)' },
      { type: 'paragraph', text: 'Le drapeau g signifie global (remplacer toutes les occurrences par ligne). Sans g, seule la première occurrence de chaque ligne est remplacée.' },
      { type: 'heading', text: 'awk - Traitement par motifs' },
      { type: 'paragraph', text: "awk est un outil puissant de traitement de texte qui fonctionne sur les champs (colonnes). Par défaut, il découpe sur les espaces. $1 est le premier champ, $2 le deuxième, etc." },
      { type: 'code', command: "awk '{print $1, $3}' data.txt", output: 'alice 90\nbob 85\ncharlie 92' },
      { type: 'heading', text: 'tr - Traduire des caractères' },
      { type: 'paragraph', text: 'tr traduit ou supprime des caractères. Utile pour la conversion de casse et la suppression de caractères spécifiques.' },
      { type: 'code', command: 'echo "HELLO" | tr A-Z a-z', output: 'hello' },
      { type: 'tip', text: "sed -i modifie les fichiers sur place (modifie le fichier original). Utilisez sed -i.bak pour créer une sauvegarde d'abord." },
    ],
    examples: [
      { input: "sed 's/http/https/g' urls.txt", output: 'https://example.com\nhttps://google.com', description: 'Remplacer http par https dans toutes les URLs' },
      { input: "awk -F: '{print $1}' /etc/passwd", output: 'root\ndaemon\nuser', description: "Afficher le premier champ d'un fichier séparé par des deux-points" },
    ],
    practiceExercises: [
      { instruction: 'Remplacez toutes les occurrences de "foo" par "bar" dans file.txt', expectedCommand: "sed 's/foo/bar/g' file.txt", hint: 'Utilisez sed avec s/motif/remplacement/g' },
      { instruction: 'Convertissez du texte en minuscules', expectedCommand: 'echo "TEXT" | tr A-Z a-z', hint: 'Utilisez tr pour traduire les plages majuscules en minuscules' },
    ],
  },

  // ═══════════════════════ CHAPITRE 6 : Processus ═══════════════════════
  lesson_ch6_01: {
    id: 'lesson_ch6_01', chapterId: 'ch6', title: 'Voir les processus', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ps', 'top'],
    content: [
      { type: 'heading', text: "Qu'est-ce qu'un processus ?" },
      { type: 'paragraph', text: "Un processus est une instance en cours d'exécution d'un programme. Chaque commande que vous lancez crée un processus avec un identifiant de processus (PID) unique. Le noyau système gère tous les processus." },
      { type: 'heading', text: 'Lister les processus (ps)' },
      { type: 'code', command: 'ps aux', output: 'USER  PID %CPU %MEM   COMMAND\nroot    1  0.0  0.1   /sbin/init\nuser 1234  2.5  1.0   /usr/bin/node app.js\nuser 1235  0.0  0.0   bash' },
      { type: 'list', items: ['ps : afficher vos propres processus', 'ps aux : afficher tous les processus de tous les utilisateurs', 'ps -ef : autre format montrant les lignes de commande complètes'] },
      { type: 'heading', text: 'Surveillance en temps réel (top)' },
      { type: 'paragraph', text: "top montre une vue mise à jour en direct des processus triés par utilisation CPU. Appuyez sur q pour quitter, k pour tuer un processus, M pour trier par mémoire." },
      { type: 'tip', text: 'Utilisez ps aux | grep nomprocessus pour trouver rapidement un processus spécifique en cours.' },
    ],
    examples: [
      { input: 'ps aux | grep node', output: 'user 1234 2.5 1.0 node app.js', description: 'Trouver tous les processus Node.js' },
      { input: 'ps -ef --forest', output: 'UID  PID PPID CMD\n  0    1    0 init\n  0  100    1  \\_ sshd\n1000  200  100      \\_ bash', description: "Afficher la hiérarchie de l'arbre de processus" },
    ],
    practiceExercises: [
      { instruction: "Listez tous les processus en cours d'exécution", expectedCommand: 'ps aux', hint: 'Utilisez ps avec les drapeaux aux pour voir tous les processus' },
      { instruction: 'Ouvrez le moniteur de processus en temps réel', expectedCommand: 'top', hint: 'top affiche les informations de processus en direct' },
    ],
  },

  lesson_ch6_02: {
    id: 'lesson_ch6_02', chapterId: 'ch6', title: 'Contrôler les processus', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['kill', 'killall'],
    content: [
      { type: 'heading', text: 'Envoyer des signaux avec kill' },
      { type: 'paragraph', text: "kill envoie des signaux aux processus. Malgré son nom, il ne tue pas toujours - il envoie un signal spécifié que le processus peut gérer." },
      { type: 'heading', text: 'Signaux courants' },
      { type: 'table', headers: ['Signal', 'Numéro', 'Effet'], rows: [
        ['SIGTERM', '15', 'Terminaison gracieuse (par défaut)'],
        ['SIGKILL', '9', 'Tuer de force immédiatement (ne peut pas être intercepté)'],
        ['SIGHUP', '1', 'Raccrocher - souvent utilisé pour recharger la configuration'],
        ['SIGSTOP', '19', 'Mettre le processus en pause'],
        ['SIGCONT', '18', 'Reprendre un processus en pause'],
      ]},
      { type: 'code', command: 'kill 1234', output: '' },
      { type: 'code', command: 'kill -9 1234', output: '' },
      { type: 'warning', text: "Essayez toujours kill (SIGTERM) d'abord. N'utilisez kill -9 (SIGKILL) qu'en dernier recours car il ne permet pas au processus de faire le ménage." },
      { type: 'paragraph', text: 'killall tue tous les processus par nom au lieu du PID, et pkill supporte la correspondance par motifs.' },
    ],
    examples: [
      { input: 'kill -15 1234', output: '', description: 'Terminer gracieusement le processus 1234' },
      { input: 'killall firefox', output: '', description: 'Tuer tous les processus Firefox par nom' },
    ],
    practiceExercises: [
      { instruction: 'Arrêtez gracieusement le processus avec le PID 5678', expectedCommand: 'kill 5678', hint: 'Utilisez kill suivi du PID (le signal par défaut est SIGTERM)' },
      { instruction: 'Forcez la fermeture d\'un processus bloqué avec le PID 9999', expectedCommand: 'kill -9 9999', hint: 'Utilisez -9 pour SIGKILL (tuer de force)' },
    ],
  },

  lesson_ch6_03: {
    id: 'lesson_ch6_03', chapterId: 'ch6', title: 'Arrière-plan et premier plan', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['bg', 'fg', 'jobs'],
    content: [
      { type: 'heading', text: "Exécuter en arrière-plan" },
      { type: 'paragraph', text: "Ajoutez & à la fin d'une commande pour l'exécuter en arrière-plan. Cela vous permet de continuer à utiliser le terminal pendant que le processus tourne." },
      { type: 'code', command: 'long_running_task &', output: '[1] 1234' },
      { type: 'heading', text: 'Contrôle des tâches' },
      { type: 'list', items: ["Ctrl+Z : mettre en pause (suspendre) le processus en premier plan actuel", "bg : reprendre un processus en pause en arrière-plan", "fg : ramener un processus d'arrière-plan au premier plan", "jobs : lister toutes les tâches en arrière-plan et suspendues"] },
      { type: 'code', command: 'jobs', output: '[1]+  Running    long_running_task &\n[2]-  Stopped    vim file.txt' },
      { type: 'heading', text: 'Garder les processus en vie' },
      { type: 'paragraph', text: "nohup exécute une commande immunisée contre les raccrochages, donc elle continue même après la fermeture du terminal. Utilisez disown pour détacher une tâche déjà en cours." },
      { type: 'code', command: 'nohup ./server.sh &', output: 'nohup: appending output to nohup.out' },
      { type: 'tip', text: "Utilisez screen ou tmux pour des sessions de terminal persistantes qui survivent à la déconnexion. Mieux que nohup pour le travail interactif." },
    ],
    examples: [
      { input: 'sleep 100 &', output: '[1] 5678', description: "Exécuter sleep en arrière-plan" },
      { input: 'fg %1', output: 'sleep 100', description: 'Ramener la tâche 1 au premier plan' },
    ],
    practiceExercises: [
      { instruction: "Exécutez une commande en arrière-plan", expectedCommand: 'sleep 60 &', hint: "Ajoutez & à la fin pour exécuter en arrière-plan" },
      { instruction: "Listez les tâches en arrière-plan actuelles", expectedCommand: 'jobs', hint: "La commande jobs affiche toutes les tâches en arrière-plan/suspendues" },
    ],
  },

  // ═══════════════════════ CHAPITRE 7 : Tubes et redirections ═══════════════════════
  lesson_ch7_01: {
    id: 'lesson_ch7_01', chapterId: 'ch7', title: 'Flux standards', order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Les trois flux standards' },
      { type: 'paragraph', text: "Chaque processus UNIX possède trois flux d'E/S standards qui le connectent au monde extérieur :" },
      { type: 'table', headers: ['Flux', 'Descripteur de fichier', 'Par défaut'], rows: [
        ["stdin (entrée standard)", '0', 'Clavier'],
        ["stdout (sortie standard)", '1', "Écran du terminal"],
        ["stderr (erreur standard)", '2', "Écran du terminal"],
      ]},
      { type: 'heading', text: 'Pourquoi trois flux ?' },
      { type: 'paragraph', text: "Séparer les flux de sortie et d'erreur permet de les traiter différemment. Vous pouvez sauvegarder la sortie dans un fichier tout en voyant les erreurs à l'écran, ou inversement." },
      { type: 'heading', text: 'Comment les données circulent' },
      { type: 'paragraph', text: "L'entrée arrive dans un programme par stdin. La sortie normale sort par stdout. Les messages d'erreur sortent par stderr. Cette séparation est fondamentale pour le système de tubes." },
      { type: 'tip', text: "Les programmes qui lisent depuis stdin et écrivent vers stdout sont appelés « filtres » et sont conçus pour être enchaînés avec des tubes." },
    ],
    examples: [
      { input: 'echo "hello" 1>/dev/null', output: '', description: 'Supprimer stdout (aucune sortie visible)' },
      { input: 'ls nonexistent 2>/dev/null', output: '', description: "Supprimer les messages d'erreur" },
    ],
    practiceExercises: [
      { instruction: 'Affichez le texte "hello world" (utilise stdout)', expectedCommand: 'echo "hello world"', hint: 'echo envoie du texte vers stdout' },
      { instruction: "Essayez de lister un fichier inexistant pour voir stderr", expectedCommand: 'ls nonexistent_file', hint: "ls affichera une erreur sur stderr pour les fichiers manquants" },
    ],
  },

  lesson_ch7_02: {
    id: 'lesson_ch7_02', chapterId: 'ch7', title: 'Redirections', order: 2,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Redirection de la sortie' },
      { type: 'paragraph', text: "Redirigez stdout vers un fichier avec > (écraser) ou >> (ajouter). C'est comme ça que vous sauvegardez la sortie des commandes." },
      { type: 'code', command: 'echo "line 1" > output.txt', output: '' },
      { type: 'code', command: 'echo "line 2" >> output.txt', output: '' },
      { type: 'heading', text: "Redirection des erreurs" },
      { type: 'paragraph', text: "Redirigez stderr avec 2>. Combinez stdout et stderr avec &> ou 2>&1." },
      { type: 'code', command: 'command 2> errors.log', output: '' },
      { type: 'code', command: 'command > output.log 2>&1', output: '' },
      { type: 'heading', text: "Redirection de l'entrée" },
      { type: 'paragraph', text: "Redirigez stdin depuis un fichier avec <. Le programme lit depuis le fichier au lieu d'attendre la saisie clavier." },
      { type: 'code', command: 'sort < unsorted.txt', output: 'alice\nbob\ncharlie' },
      { type: 'heading', text: 'Le périphérique null' },
      { type: 'paragraph', text: '/dev/null est un fichier spécial qui supprime tout ce qui y est écrit. Utilisez-le pour supprimer la sortie : command > /dev/null 2>&1' },
      { type: 'warning', text: 'Utiliser > écrase le fichier complètement. Utilisez toujours >> si vous voulez ajouter au contenu existant.' },
    ],
    examples: [
      { input: 'ls /etc > filelist.txt 2> errors.txt', output: '', description: 'Sauvegarder la sortie et les erreurs dans des fichiers séparés' },
      { input: 'cat < input.txt > output.txt', output: '', description: "Lire depuis un fichier, écrire dans un autre" },
    ],
    practiceExercises: [
      { instruction: 'Sauvegardez la sortie de ls dans un fichier appelé listing.txt', expectedCommand: 'ls > listing.txt', hint: 'Utilisez > pour rediriger stdout vers un fichier' },
      { instruction: 'Ajoutez la date actuelle à un fichier journal', expectedCommand: 'date >> log.txt', hint: "Utilisez >> pour ajouter au lieu d'écraser" },
    ],
  },

  lesson_ch7_03: {
    id: 'lesson_ch7_03', chapterId: 'ch7', title: 'Tubes et enchaînement', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['tee', 'xargs'],
    content: [
      { type: 'heading', text: "L'opérateur tube (|)" },
      { type: 'paragraph', text: "Les tubes connectent le stdout d'une commande au stdin de la suivante. Cela vous permet d'enchaîner des commandes pour construire de puissants pipelines de traitement de données." },
      { type: 'code', command: 'cat access.log | grep "404" | wc -l', output: '47' },
      { type: 'heading', text: 'La commande tee' },
      { type: 'paragraph', text: "tee divise la sortie vers un fichier ET stdout. Utile quand vous voulez sauvegarder la sortie tout en la voyant ou en la passant à un autre tube." },
      { type: 'code', command: 'ls | tee filelist.txt | wc -l', output: '12' },
      { type: 'heading', text: 'Enchaînement de commandes' },
      { type: 'table', headers: ['Opérateur', 'Comportement'], rows: [
        ['cmd1 && cmd2', 'Exécuter cmd2 SEULEMENT si cmd1 réussit'],
        ['cmd1 || cmd2', 'Exécuter cmd2 SEULEMENT si cmd1 échoue'],
        ['cmd1 ; cmd2', 'Exécuter cmd2 quel que soit le résultat de cmd1'],
      ]},
      { type: 'heading', text: "xargs - Construire des commandes à partir de l'entrée" },
      { type: 'paragraph', text: "xargs lit des éléments depuis stdin et les passe comme arguments à une autre commande." },
      { type: 'code', command: 'find . -name "*.log" | xargs rm', output: '' },
      { type: 'tip', text: "Les pipelines complexes sont l'essence de la puissance d'UNIX. Commencez simplement et ajoutez des étapes une par une." },
    ],
    examples: [
      { input: 'ps aux | sort -rk 3 | head -5', output: 'USER PID %CPU... (top 5 CPU-hungry processes)', description: "Trouver les 5 processus les plus gourmands en CPU" },
      { input: 'mkdir build && cd build && cmake ..', output: '', description: 'Enchaîner des commandes qui dépendent les unes des autres' },
    ],
    practiceExercises: [
      { instruction: 'Comptez le nombre de fichiers dans le répertoire actuel en utilisant un tube', expectedCommand: 'ls | wc -l', hint: 'Envoyez la sortie de ls vers wc -l pour compter les lignes' },
      { instruction: 'Trouvez les lignes contenant "error" et sauvegardez dans un fichier tout en affichant', expectedCommand: 'grep "error" log.txt | tee errors.txt', hint: "Utilisez tee pour diviser la sortie vers le fichier et l'écran" },
    ],
  },

  // ═══════════════════════ CHAPITRE 8 : Scripting Shell ═══════════════════════
  lesson_ch8_01: {
    id: 'lesson_ch8_01', chapterId: 'ch8', title: "Variables et environnement", order: 1,
    estimatedReadTime: '6 min', keyCommands: ['export', 'env'],
    content: [
      { type: 'heading', text: 'Variables shell' },
      { type: 'paragraph', text: "Les variables stockent des valeurs. Assignez avec NOM=valeur (pas d'espaces autour du =). Accédez avec $NOM ou ${NOM}." },
      { type: 'code', command: 'NAME="Kingdom"', output: '' },
      { type: 'code', command: 'echo "Welcome to $NAME"', output: 'Welcome to Kingdom' },
      { type: 'heading', text: "Variables d'environnement" },
      { type: 'paragraph', text: "Les variables d'environnement sont disponibles pour tous les processus enfants. Utilisez export pour rendre une variable disponible globalement." },
      { type: 'list', items: ['$PATH : répertoires où chercher les commandes', '$HOME : votre répertoire personnel', "$USER : nom d'utilisateur actuel", '$PWD : répertoire de travail actuel', '$SHELL : votre shell par défaut'] },
      { type: 'code', command: 'export PATH="$PATH:/usr/local/bin"', output: '' },
      { type: 'heading', text: 'Fichiers de configuration' },
      { type: 'paragraph', text: "~/.bashrc s'exécute à chaque nouveau terminal. ~/.profile s'exécute à la connexion. Ajoutez des instructions export à ces fichiers pour rendre les variables permanentes." },
      { type: 'tip', text: "Utilisez env pour voir toutes les variables d'environnement actuelles. Utilisez printenv VAR pour en voir une spécifique." },
    ],
    examples: [
      { input: 'echo $PATH', output: '/usr/local/bin:/usr/bin:/bin', description: 'Voir le chemin de recherche des commandes' },
      { input: 'env | grep HOME', output: 'HOME=/home/adventurer', description: 'Trouver la variable de votre répertoire personnel' },
    ],
    practiceExercises: [
      { instruction: 'Créez une variable appelée GREETING avec la valeur "Hello"', expectedCommand: 'GREETING="Hello"', hint: "Utilisez la syntaxe NOM=valeur (pas d'espaces autour du =)" },
      { instruction: 'Affichez la valeur de la variable PATH', expectedCommand: 'echo $PATH', hint: 'Utilisez $ pour accéder aux valeurs des variables' },
    ],
  },

  lesson_ch8_02: {
    id: 'lesson_ch8_02', chapterId: 'ch8', title: 'Flux de contrôle', order: 2,
    estimatedReadTime: '7 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'If / Else' },
      { type: 'paragraph', text: "L'instruction if teste des conditions. Utilisez [[ ]] pour l'expression de test (préféré à l'ancienne syntaxe [ ])." },
      { type: 'code', command: 'if [[ -f "config.txt" ]]; then\n  echo "Config found"\nelse\n  echo "Config missing"\nfi', output: 'Config found' },
      { type: 'heading', text: 'Opérateurs de test courants' },
      { type: 'table', headers: ['Test', 'Signification'], rows: [
        ['-f file', 'Le fichier existe et est un fichier normal'],
        ['-d dir', 'Le répertoire existe'],
        ['-z "$var"', 'La variable est vide'],
        ['-n "$var"', "La variable n'est pas vide"],
        ['$a -eq $b', 'Les nombres sont égaux'],
        ['$a == $b', 'Les chaînes sont égales'],
      ]},
      { type: 'heading', text: 'Boucles for' },
      { type: 'code', command: 'for file in *.txt; do\n  echo "Processing $file"\ndone', output: 'Processing notes.txt\nProcessing readme.txt' },
      { type: 'heading', text: 'Boucles while' },
      { type: 'code', command: 'count=1\nwhile [[ $count -le 5 ]]; do\n  echo "Count: $count"\n  ((count++))\ndone', output: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5' },
      { type: 'tip', text: 'Utilisez "set -e" en haut des scripts pour quitter en cas d\'erreur. Cela empêche les scripts de continuer après un échec.' },
    ],
    examples: [
      { input: 'for i in 1 2 3; do echo $i; done', output: '1\n2\n3', description: 'Boucle simple sur une liste' },
      { input: '[[ -d /tmp ]] && echo "exists"', output: 'exists', description: 'Test conditionnel rapide en une ligne' },
    ],
    practiceExercises: [
      { instruction: 'Vérifiez si un fichier appelé test.txt existe', expectedCommand: '[[ -f test.txt ]] && echo "exists"', hint: "Utilisez [[ -f nomfichier ]] pour tester l'existence du fichier" },
      { instruction: 'Faites une boucle sur les nombres 1 à 3', expectedCommand: 'for i in 1 2 3; do echo $i; done', hint: 'Utilisez une boucle for avec une liste de valeurs' },
    ],
  },

  lesson_ch8_03: {
    id: 'lesson_ch8_03', chapterId: 'ch8', title: 'Fonctions et arguments', order: 3,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Arguments de script' },
      { type: 'paragraph', text: 'Les scripts reçoivent des arguments via des variables spéciales :' },
      { type: 'table', headers: ['Variable', 'Signification'], rows: [
        ['$0', 'Nom du script'],
        ['$1, $2, ...', 'Premier, deuxième, ... argument'],
        ['$@', 'Tous les arguments comme mots séparés'],
        ['$#', "Nombre d'arguments"],
        ['$?', 'Code de sortie de la dernière commande'],
      ]},
      { type: 'heading', text: 'Définir des fonctions' },
      { type: 'code', command: 'greet() {\n  echo "Hello, $1! Welcome to $2."\n}\ngreet "Adventurer" "Kingdom"', output: 'Hello, Adventurer! Welcome to Kingdom.' },
      { type: 'heading', text: 'Codes de sortie' },
      { type: 'paragraph', text: "Chaque commande renvoie un code de sortie : 0 signifie succès, toute autre valeur signifie échec. Utilisez $? pour vérifier le dernier code de sortie. Utilisez exit N dans les scripts pour renvoyer un code spécifique." },
      { type: 'code', command: 'ls /nonexistent\necho $?', output: 'ls: cannot access /nonexistent\n2' },
      { type: 'tip', text: 'Vérifiez toujours les codes de sortie dans les scripts. Utilisez "set -e" pour quitter automatiquement en cas d\'erreur, ou vérifiez $? après les commandes critiques.' },
    ],
    examples: [
      { input: 'echo $?', output: '0', description: 'Vérifier si la dernière commande a réussi (0 = succès)' },
      { input: 'add() { echo $(($1 + $2)); }; add 5 3', output: '8', description: 'Définir et appeler une fonction simple' },
    ],
    practiceExercises: [
      { instruction: 'Vérifiez le code de sortie de la dernière commande', expectedCommand: 'echo $?', hint: '$? contient le code de sortie de la commande précédemment exécutée' },
      { instruction: "Affichez le nombre d'arguments passés au shell actuel", expectedCommand: 'echo $#', hint: '$# contient le nombre de paramètres positionnels' },
    ],
  },

  // ═══════════════════════ CHAPITRE 9 : Réseau ═══════════════════════
  lesson_ch9_01: {
    id: 'lesson_ch9_01', chapterId: 'ch9', title: 'Bases du réseau', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ping', 'hostname', 'ip'],
    content: [
      { type: 'heading', text: 'Vérifier la connectivité (ping)' },
      { type: 'paragraph', text: "ping envoie des paquets ICMP pour tester si un hôte est joignable et mesure le temps aller-retour. Utilisez Ctrl+C pour arrêter." },
      { type: 'code', command: 'ping -c 3 google.com', output: '64 bytes from google.com: time=12.3 ms\n64 bytes from google.com: time=11.8 ms\n64 bytes from google.com: time=12.1 ms' },
      { type: 'heading', text: 'Votre identité réseau' },
      { type: 'code', command: 'hostname', output: 'kingdom-server' },
      { type: 'code', command: 'ip addr show', output: 'inet 192.168.1.100/24 ...' },
      { type: 'heading', text: 'Recherche DNS' },
      { type: 'paragraph', text: "Le DNS traduit les noms de domaine en adresses IP. Utilisez nslookup ou dig pour interroger le DNS." },
      { type: 'code', command: 'nslookup google.com', output: 'Name: google.com\nAddress: 142.250.80.46' },
      { type: 'heading', text: 'Tracer les routes' },
      { type: 'paragraph', text: "traceroute montre le chemin que prennent les paquets pour atteindre une destination, listant chaque saut en chemin." },
      { type: 'tip', text: "Utilisez ping -c N pour envoyer exactement N paquets au lieu de pinger indéfiniment." },
    ],
    examples: [
      { input: 'ping -c 1 localhost', output: '64 bytes from 127.0.0.1: time=0.03 ms', description: 'Se pinger soi-même (localhost = 127.0.0.1)' },
      { input: 'hostname -I', output: '192.168.1.100', description: 'Afficher votre adresse IP' },
    ],
    practiceExercises: [
      { instruction: 'Pingez localhost une fois pour tester le réseau', expectedCommand: 'ping -c 1 localhost', hint: "Utilisez ping -c 1 pour envoyer exactement un paquet" },
      { instruction: "Affichez votre nom d'hôte", expectedCommand: 'hostname', hint: "La commande hostname affiche le nom du système" },
    ],
  },

  lesson_ch9_02: {
    id: 'lesson_ch9_02', chapterId: 'ch9', title: 'Télécharger et transférer', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['curl', 'wget', 'scp'],
    content: [
      { type: 'heading', text: 'curl - Transférer des données' },
      { type: 'paragraph', text: "curl transfère des données depuis/vers des URLs. Il supporte HTTP, HTTPS, FTP et de nombreux autres protocoles. C'est le couteau suisse des outils réseau." },
      { type: 'code', command: 'curl -O https://example.com/file.zip', output: '% Total    % Received  Speed\n100 1024k  100 1024k   500k  0:00:02' },
      { type: 'heading', text: 'wget - Télécharger des fichiers' },
      { type: 'paragraph', text: "wget est conçu pour télécharger des fichiers. Il supporte les téléchargements récursifs, la reprise des téléchargements interrompus et la mise en miroir de sites." },
      { type: 'code', command: 'wget https://example.com/data.csv', output: 'Saving to: data.csv\ndata.csv    100%[========>] 1.02M  500KB/s' },
      { type: 'heading', text: 'scp - Copie sécurisée' },
      { type: 'paragraph', text: "scp copie des fichiers entre machines via SSH. La syntaxe est comme cp mais avec des préfixes d'hôte distant." },
      { type: 'code', command: 'scp file.txt user@server:/home/user/', output: 'file.txt     100%  1024   500.0KB/s  00:00' },
      { type: 'heading', text: 'rsync - Synchronisation intelligente' },
      { type: 'paragraph', text: "rsync synchronise les fichiers efficacement en ne transférant que les différences. Idéal pour les sauvegardes et les déploiements." },
      { type: 'tip', text: "curl -I récupère uniquement les en-têtes HTTP. Utile pour vérifier si une URL est valide sans télécharger tout le contenu." },
    ],
    examples: [
      { input: 'curl -I https://example.com', output: 'HTTP/2 200\ncontent-type: text/html\ncontent-length: 1256', description: "Vérifier les en-têtes HTTP d'une URL" },
      { input: 'wget -c https://example.com/large-file.zip', output: 'Continuing at byte position 512000...', description: 'Reprendre un téléchargement interrompu' },
    ],
    practiceExercises: [
      { instruction: "Téléchargez un fichier depuis une URL avec wget", expectedCommand: 'wget https://example.com/file.txt', hint: "Utilisez wget suivi de l'URL" },
      { instruction: "Vérifiez les en-têtes HTTP d'un site web", expectedCommand: 'curl -I https://example.com', hint: "Utilisez curl avec le drapeau -I pour les en-têtes seulement" },
    ],
  },

  lesson_ch9_03: {
    id: 'lesson_ch9_03', chapterId: 'ch9', title: 'Accès distant (SSH)', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['ssh'],
    content: [
      { type: 'heading', text: "Qu'est-ce que SSH ?" },
      { type: 'paragraph', text: "SSH (Secure Shell) fournit un accès distant chiffré à d'autres machines. Il remplace les anciens protocoles non sécurisés comme telnet et rlogin." },
      { type: 'code', command: 'ssh user@hostname', output: 'user@hostname:~$' },
      { type: 'heading', text: 'Authentification par clé SSH' },
      { type: 'paragraph', text: "L'authentification par mot de passe est pratique mais les clés sont plus sécurisées. Générez une paire de clés avec ssh-keygen et copiez la clé publique sur le serveur." },
      { type: 'code', command: 'ssh-keygen -t ed25519', output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in ~/.ssh/id_ed25519' },
      { type: 'code', command: 'ssh-copy-id user@server', output: 'Number of key(s) added: 1' },
      { type: 'heading', text: 'Fichier de configuration SSH' },
      { type: 'paragraph', text: "Créez ~/.ssh/config pour sauvegarder les paramètres de connexion. Connectez-vous ensuite avec juste ssh monserveur au lieu de taper la commande complète." },
      { type: 'tip', text: "Utilisez toujours l'authentification par clé SSH en production. Désactivez l'authentification par mot de passe sur les serveurs pour une meilleure sécurité." },
      { type: 'warning', text: "Ne partagez jamais votre clé privée (~/.ssh/id_ed25519). Partagez uniquement la clé publique (fichier .pub)." },
    ],
    examples: [
      { input: 'ssh -p 2222 admin@192.168.1.50', output: 'admin@server:~$', description: 'Se connecter en SSH sur un port non standard' },
      { input: 'ssh user@server "ls /var/log"', output: 'syslog\nauth.log\ndpkg.log', description: 'Exécuter une commande distante sans shell interactif' },
    ],
    practiceExercises: [
      { instruction: 'Générez une nouvelle paire de clés SSH', expectedCommand: 'ssh-keygen', hint: 'ssh-keygen génère une paire de clés publique/privée' },
      { instruction: 'Connectez-vous à un serveur distant à 10.0.0.1 en tant que admin', expectedCommand: 'ssh admin@10.0.0.1', hint: 'Utilisez le format ssh utilisateur@nomhôte' },
    ],
  },

  // ═══════════════════════ CHAPITRE 10 : Administration ═══════════════════════
  lesson_ch10_01: {
    id: 'lesson_ch10_01', chapterId: 'ch10', title: 'Gestion des utilisateurs', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['sudo', 'useradd', 'passwd'],
    content: [
      { type: 'heading', text: "L'utilisateur Root et sudo" },
      { type: 'paragraph', text: "Root (UID 0) est le super-utilisateur avec un accès illimité. Ne vous connectez jamais directement en tant que root. Utilisez plutôt sudo pour exécuter des commandes individuelles avec les privilèges root." },
      { type: 'code', command: 'sudo apt update', output: 'Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done' },
      { type: 'heading', text: 'Gérer les utilisateurs' },
      { type: 'list', items: ['useradd : créer un nouvel utilisateur', 'userdel : supprimer un utilisateur', 'usermod : modifier les propriétés utilisateur', 'passwd : changer le mot de passe', "groups : afficher les appartenances aux groupes"] },
      { type: 'code', command: 'sudo useradd -m -s /bin/bash newuser', output: '' },
      { type: 'code', command: 'sudo passwd newuser', output: 'New password:\nRetype new password:\npasswd: password updated' },
      { type: 'heading', text: "Fichiers d'information utilisateur" },
      { type: 'paragraph', text: "/etc/passwd contient les comptes utilisateurs, /etc/shadow contient les mots de passe hachés, et /etc/group contient les définitions de groupes." },
      { type: 'warning', text: 'Soyez très prudent avec sudo. Vérifiez deux fois chaque commande avant de la lancer en tant que root, surtout les commandes rm.' },
    ],
    examples: [
      { input: 'id', output: 'uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)', description: "Afficher votre identifiant utilisateur et groupes" },
      { input: 'sudo usermod -aG docker user', output: '', description: 'Ajouter un utilisateur au groupe docker' },
    ],
    practiceExercises: [
      { instruction: "Affichez votre identifiant utilisateur et vos appartenances aux groupes", expectedCommand: 'id', hint: 'La commande id affiche votre UID, GID et groupes' },
      { instruction: "Listez tous les groupes auxquels vous appartenez", expectedCommand: 'groups', hint: 'La commande groups affiche vos appartenances aux groupes' },
    ],
  },

  lesson_ch10_02: {
    id: 'lesson_ch10_02', chapterId: 'ch10', title: 'Gestion des paquets', order: 2,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: "Qu'est-ce qu'un gestionnaire de paquets ?" },
      { type: 'paragraph', text: "Les gestionnaires de paquets installent, mettent à jour et suppriment des logiciels. Ils gèrent les dépendances automatiquement. Différentes distributions utilisent différents gestionnaires." },
      { type: 'heading', text: 'Gestionnaires de paquets courants' },
      { type: 'table', headers: ['Distribution', 'Gestionnaire', "Exemple d'installation"], rows: [
        ['Ubuntu/Debian', 'apt', 'sudo apt install nginx'],
        ['Fedora/RHEL', 'dnf/yum', 'sudo dnf install nginx'],
        ['Arch', 'pacman', 'sudo pacman -S nginx'],
        ['Alpine', 'apk', 'sudo apk add nginx'],
      ]},
      { type: 'heading', text: 'Opérations de base avec apt' },
      { type: 'list', items: ['sudo apt update : rafraîchir la liste des paquets', 'sudo apt upgrade : mettre à jour les paquets installés', 'sudo apt install nompaquet : installer un paquet', 'sudo apt remove nompaquet : désinstaller un paquet', 'apt search motclé : rechercher des paquets'] },
      { type: 'tip', text: "Exécutez toujours apt update avant apt install pour vous assurer d'obtenir la dernière version d'un paquet." },
    ],
    examples: [
      { input: 'apt search editor', output: 'vim - Vi IMproved\nnano - small friendly text editor\nemacs - GNU Emacs editor', description: 'Rechercher les paquets disponibles' },
      { input: 'sudo apt install -y htop', output: 'Setting up htop (3.2.1) ...\nProcessing triggers...', description: 'Installer htop sans demande de confirmation' },
    ],
    practiceExercises: [
      { instruction: 'Mettez à jour la liste des paquets', expectedCommand: 'sudo apt update', hint: 'Utilisez sudo apt update pour rafraîchir les listes de paquets' },
      { instruction: 'Recherchez les paquets liés à "git"', expectedCommand: 'apt search git', hint: "Utilisez apt search suivi d'un mot-clé" },
    ],
  },

  lesson_ch10_03: {
    id: 'lesson_ch10_03', chapterId: 'ch10', title: 'Surveillance du système', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['df', 'du', 'free', 'uptime'],
    content: [
      { type: 'heading', text: "Utilisation du disque" },
      { type: 'paragraph', text: "df montre l'utilisation de l'espace disque du système de fichiers. du montre l'utilisation d'espace d'un répertoire. Les deux supportent -h pour des tailles lisibles." },
      { type: 'code', command: 'df -h', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%\n/dev/sda2   200G  120G   72G  63%' },
      { type: 'code', command: 'du -sh /var/log', output: '1.2G\t/var/log' },
      { type: 'heading', text: 'Utilisation de la mémoire' },
      { type: 'code', command: 'free -h', output: '              total   used   free   available\nMem:           16G    8.5G   3.2G   7.1G\nSwap:          4G     0.5G   3.5G' },
      { type: 'heading', text: 'Disponibilité et charge du système' },
      { type: 'code', command: 'uptime', output: ' 14:30:00 up 45 days, 3:12,  2 users,  load average: 0.15, 0.10, 0.05' },
      { type: 'paragraph', text: "La charge moyenne montre la charge du système sur 1, 5 et 15 minutes. Des valeurs supérieures au nombre de CPU indiquent que le système est surchargé." },
      { type: 'heading', text: 'Tâches planifiées (cron)' },
      { type: 'paragraph', text: "crontab planifie des tâches récurrentes. Éditez avec crontab -e. Format : minute heure jour mois jour_semaine commande." },
      { type: 'code', command: 'crontab -l', output: '0 2 * * * /usr/local/bin/backup.sh\n*/5 * * * * /usr/bin/check-health.sh' },
      { type: 'tip', text: "Utilisez du -sh * | sort -rh | head -10 pour trouver les 10 plus gros fichiers/répertoires." },
    ],
    examples: [
      { input: 'df -h /', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%', description: "Vérifier l'espace du système de fichiers racine" },
      { input: 'free -h', output: 'Mem:  16G  8.5G  3.2G\nSwap: 4G   0.5G  3.5G', description: "Vérifier l'utilisation de la mémoire et du swap" },
    ],
    practiceExercises: [
      { instruction: "Vérifiez l'utilisation de l'espace disque en format lisible", expectedCommand: 'df -h', hint: "Utilisez df -h pour l'utilisation disque en format lisible" },
      { instruction: "Vérifiez depuis combien de temps le système fonctionne", expectedCommand: 'uptime', hint: "uptime affiche la disponibilité du système et les charges moyennes" },
    ],
  },
};

// ──────────────────────── FONCTIONS UTILITAIRES ────────────────────────

export function getAllLessons() {
  const chapterOrder = {};
  CHAPTERS.forEach(ch => { chapterOrder[ch.id] = ch.order; });

  return Object.values(LESSONS).sort((a, b) => {
    const chapterDiff = (chapterOrder[a.chapterId] || 0) - (chapterOrder[b.chapterId] || 0);
    if (chapterDiff !== 0) return chapterDiff;
    return a.order - b.order;
  });
}

export function getLessonsByChapter(chapterId) {
  return Object.values(LESSONS)
    .filter(l => l.chapterId === chapterId)
    .sort((a, b) => a.order - b.order);
}

export function getChapterProgress(chapterId, completedLessonIds = []) {
  const chapterLessons = getLessonsByChapter(chapterId);
  const completed = chapterLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const total = chapterLessons.length;
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}
