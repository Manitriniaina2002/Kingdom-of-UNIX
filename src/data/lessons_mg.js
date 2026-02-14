/**
 * Lesona UNIX amin'ny teny Malagasy – UNIX Kingdom
 * 10 toko, 30 lesona manaraka ny UNIX hatramin'ny fototra ka hatramin'ny fitantanana
 */

export const CHAPTERS = [
  { id: 'ch1', title: 'Fampidirana amin\'ny UNIX', description: 'Fahatakarana ny tontolo UNIX', icon: '🌍', color: '#22C55E', order: 1 },
  { id: 'ch2', title: 'Fikarohana ao amin\'ny rafi-drakitra', description: 'Fivezivezena anatin\'ny lahatahiry', icon: '🧭', color: '#3B82F6', order: 2 },
  { id: 'ch3', title: 'Miasa amin\'ny rakitra', description: 'Mamorona, mijery ary mitantana ny rakitra', icon: '📄', color: '#8B5CF6', order: 3 },
  { id: 'ch4', title: 'Fahazoan-dalana sy fananan-tany', description: 'Mifehy ny fidirana amin\'ny rakitra', icon: '🔐', color: '#A855F7', order: 4 },
  { id: 'ch5', title: 'Fanodinana lahatsoratra', description: 'Fikarohana sy fanovana lahatsoratra', icon: '📝', color: '#EC4899', order: 5 },
  { id: 'ch6', title: 'Fitantanana ny dingana', description: 'Mifehy ny programa mandeha', icon: '⚙️', color: '#10B981', order: 6 },
  { id: 'ch7', title: 'Fantsona sy fanorenana', description: 'Mampifandray ny baiko', icon: '🔗', color: '#F59E0B', order: 7 },
  { id: 'ch8', title: 'Fototry ny Shell Scripting', description: 'Manao automatique amin\'ny script', icon: '📜', color: '#EF4444', order: 8 },
  { id: 'ch9', title: 'Fototry ny tambajotra', description: 'Mifandray amin\'ny tontolo', icon: '🌐', color: '#6366F1', order: 9 },
  { id: 'ch10', title: 'Fitantanana ny rafitra', description: 'Mitantana ny rafitra', icon: '🛡️', color: '#14B8A6', order: 10 },
];

export const LESSONS = {
  // ═══════════════════════ TOKO 1: Fampidirana ═══════════════════════
  lesson_ch1_01: {
    id: 'lesson_ch1_01', chapterId: 'ch1', title: 'Inona ny UNIX?', order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Tantara fohy' },
      { type: 'paragraph', text: 'UNIX dia noforonina tao amin\'ny laboratoara Bell tamin\'ny 1969 nataon\'i Ken Thompson sy Dennis Ritchie. Lasa fototra ho an\'ny rafitra fandidiana maoderina maro izy, ao anatin\'izany ny Linux, macOS, ary ny karazana BSD.' },
      { type: 'heading', text: 'Ny filozofia UNIX' },
      { type: 'paragraph', text: 'Ny UNIX dia manaraka fitsipika fototra: manao zavatra iray tsara, ny zava-drehetra dia rakitra, ary ny programa dia tokony hiara-miasa amin\'ny alalan\'ny fikorianan\'ny lahatsoratra. Izany no mahatonga ny UNIX ho matanjaka sy mora ampiasaina.' },
      { type: 'list', items: ['Manoratra programa izay manao zavatra iray ary manao izany tsara', 'Manoratra programa izay miara-miasa', 'Manoratra programa izay mitantana ny fikorianan\'ny lahatsoratra ho interface iombonana', 'Ny zava-drehetra dia rakitra (fitaovana, dingana, sockets)'] },
      { type: 'heading', text: 'UNIX vs Linux' },
      { type: 'paragraph', text: 'Linux dia rafitra fandidiana mitovy amin\'ny UNIX noforonin\'i Linus Torvalds tamin\'ny 1991. Na dia tsy UNIX ara-teknika aza, dia manaraka ny fitsipika mitovy izy ary manohana baiko mitovy. Ny ankamaroan\'ny lohamilina eran-tany dia mampiasa Linux.' },
      { type: 'tip', text: 'Rehefa milaza "baiko UNIX" ny olona, dia matetika midika baiko izay miasa amin\'ny UNIX sy Linux.' },
    ],
    examples: [
      { input: 'uname -s', output: 'Linux', description: 'Jereo ny anaran\'ny rafitra fandidiana' },
      { input: 'uname -a', output: 'Linux hostname 5.15.0 #1 SMP x86_64 GNU/Linux', description: 'Asehoy ny fampahalalana rehetra momba ny rafitra' },
    ],
    practiceExercises: [
      { instruction: 'Jereo ny rafitra fandidiana ampiasainao', expectedCommand: 'uname', hint: 'Ny baiko uname dia mampiseho ny fampahalalana momba ny rafitra' },
      { instruction: 'Asehoy ny fampahalalana rehetra momba ny rafitra indray miaraka', expectedCommand: 'uname -a', hint: 'Ampiasao ny drapeau -a ho an\'ny fampahalalana rehetra' },
    ],
  },

  lesson_ch1_02: {
    id: 'lesson_ch1_02', chapterId: 'ch1', title: 'Ny Terminal sy Shell', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['echo', 'whoami'],
    content: [
      { type: 'heading', text: 'Inona ny terminal?' },
      { type: 'paragraph', text: 'Ny terminal (na terminal emulator) dia programa izay manome interface mifototra amin\'ny lahatsoratra hifandraisana amin\'ny solosainao. Mampiseho prompt izy izay hanoritanao baiko ary mampiseho ny vokatra.' },
      { type: 'heading', text: 'Inona ny Shell?' },
      { type: 'paragraph', text: 'Ny shell dia programa izay mandika ny baikonao. Ny shell malaza dia Bash (Bourne Again Shell), Zsh, ary Fish. Ny shell dia mamaky izay soratanao, manatanteraka izany, ary mampiseho ny vokatra.' },
      { type: 'heading', text: 'Ny prompt baiko' },
      { type: 'paragraph', text: 'Ny prompt dia matetika mampiseho ny anaran\'ny mpampiasa, ny anaran\'ny milina, ary ny lahatahiry ankehitriny. Mifarana amin\'ny $ ho an\'ny mpampiasa mahazatra na # ho an\'ny root (mpitantana).' },
      { type: 'code', command: 'echo $SHELL', output: '/bin/bash' },
      { type: 'tip', text: 'Azonao fantarina ny shell ampiasainao amin\'ny echo $SHELL. Ny ankamaroan\'ny fizarana Linux dia mampiasa Bash ho default.' },
      { type: 'heading', text: 'Ny baikonao voalohany' },
      { type: 'code', command: 'whoami', output: 'adventurer' },
    ],
    examples: [
      { input: 'echo "Hello, World!"', output: 'Hello, World!', description: 'Mampiseho lahatsoratra ao amin\'ny terminal' },
      { input: 'whoami', output: 'adventurer', description: 'Mampiseho ny anaran\'ny mpampiasa ankehitriny' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny anaran\'ny mpampiasanao eo amin\'ny ecran', expectedCommand: 'whoami', hint: 'whoami dia mampiseho ny mpampiasa tafiditra ankehitriny' },
      { instruction: 'Soraty ny lahatsoratra "Hello UNIX" eo amin\'ny terminal', expectedCommand: 'echo Hello UNIX', hint: 'Ampiasao echo arahin\'ny lahatsoratra tianao haseho' },
    ],
  },

  lesson_ch1_03: {
    id: 'lesson_ch1_03', chapterId: 'ch1', title: 'Firafitry ny baiko', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['man', 'help'],
    content: [
      { type: 'heading', text: 'Anatominan\'ny baiko' },
      { type: 'paragraph', text: 'Ny baiko UNIX rehetra dia manaraka ny modely: baiko [safidy] [argument]. Ny baiko dia ny zavatra tianao atao, ny safidy dia manova ny fomba fiasany, ary ny argument dia ny zavatra iasany.' },
      { type: 'code', command: 'ls -la /home', output: 'total 4\ndrwxr-xr-x 3 root root 4096 Jan 1 00:00 .' },
      { type: 'paragraph', text: 'Ao amin\'ny "ls -la /home": ls no baiko, -la no safidy (l=endrika lava, a=rakitra rehetra), ary /home no argument (lahatahiry hojerena).' },
      { type: 'heading', text: 'Safidy sy drapeau' },
      { type: 'list', items: ['Safidy fohy dia mampiasa tiret tokana: -l, -a, -h', 'Safidy fohy dia azo atambatra: -la dia mitovy amin\'ny -l -a', 'Safidy lava dia mampiasa tiret roa: --all, --help', 'Safidy sasany dia mandray sanda: --color=auto'] },
      { type: 'heading', text: 'Mahazo fanampiana' },
      { type: 'paragraph', text: 'Ampiasao man (manual) hamakiana ny tahirin-kevitra ho an\'ny baiko rehetra. Tsindrio q hialana amin\'ny manual, ary ampiasao ny zana-tsipika na ny espace hihodinana.' },
      { type: 'code', command: 'man ls', output: 'LS(1)\nNAME\n  ls - list directory contents\n...' },
      { type: 'tip', text: 'Ny baiko maro dia manohana --help ho famintinana haingana. Andramo: ls --help' },
    ],
    examples: [
      { input: 'ls --help', output: 'Usage: ls [OPTION]... [FILE]...\nList information about the FILEs...', description: 'Fanampiana haingana ho an\'ny baiko ls' },
      { input: 'man pwd', output: 'PWD(1)\nNAME\n  pwd - print name of current/working directory', description: 'Mamaky ny manual ho an\'ny pwd' },
    ],
    practiceExercises: [
      { instruction: 'Makà fanampiana ho an\'ny baiko ls', expectedCommand: 'ls --help', hint: 'Ampiasao --help aorian\'ny anaran\'ny baiko' },
      { instruction: 'Vakio ny pejin\'ny manual ho an\'ny baiko echo', expectedCommand: 'man echo', hint: 'Ampiasao man arahin\'ny anaran\'ny baiko' },
    ],
  },

  // ═══════════════════════ TOKO 2: Fikarohana ═══════════════════════
  lesson_ch2_01: {
    id: 'lesson_ch2_01', chapterId: 'ch2', title: 'Firafitry ny lahatahiry', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: 'Ny hazon\'ny rafi-drakitra UNIX' },
      { type: 'paragraph', text: 'Ny UNIX dia mandamina ny zava-drehetra anatin\'ny hazo ambaratonga manomboka amin\'ny lahatahiry fototra /. Ny rakitra sy lahatahiry rehetra dia ao ambany ity fototra tokana ity, tsy mitovy amin\'ny Windows izay manana litera drive samihafa.' },
      { type: 'heading', text: 'Lahatahiry fototra' },
      { type: 'table', headers: ['Lahatahiry', 'Antony'], rows: [
        ['/', 'Fototra - tampony amin\'ny rafi-drakitra'],
        ['/home', 'Lahatahiry manokana ho an\'ny mpampiasa'],
        ['/etc', 'Rakitry ny fanamboarana ny rafitra'],
        ['/var', 'Angona miovaova (tahirin-kevitra, mailaka, temp)'],
        ['/tmp', 'Rakitra vonjimaika (voafafa rehefa averina)'],
        ['/usr', 'Programa sy fitaovana mpampiasa'],
        ['/bin', 'Binary baiko tsy azo avela'],
        ['/dev', 'Rakitry ny fitaovana (hardware)'],
      ]},
      { type: 'tip', text: 'Ny rakitrao manokana dia ao amin\'ny /home/anaranao. Ny marika ~ dia hafohezana ho an\'ny lahatahiry manaokana.' },
      { type: 'heading', text: 'Rakitra miafina' },
      { type: 'paragraph', text: 'Ny rakitra manomboka amin\'ny teboka (.) dia miafina amin\'ny alàlan\'ny default. Ny rakitra fanamboarana toy ny .bashrc, .profile, ary .ssh dia miafina mba hitazonana ny lahatahiry madio.' },
    ],
    examples: [
      { input: 'ls /', output: 'bin  dev  etc  home  lib  tmp  usr  var', description: 'Lisitry ny votoatin\'ny lahatahiry fototra' },
      { input: 'ls -a ~', output: '.  ..  .bashrc  .profile  Documents  Downloads', description: 'Lisitry ny rakitra rehetra ao anatin\'izay ny miafina ao an-trano' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny votoatin\'ny lahatahiry fototra', expectedCommand: 'ls /', hint: 'Ampiasao ls miaraka amin\'ny / ho lalana' },
      { instruction: 'Asehoy ny rakitra miafina ao amin\'ny lahatahiry ankehitriny', expectedCommand: 'ls -a', hint: 'Ny drapeau -a dia mampiseho ny rakitra rehetra, ao anatin\'izay ny miafina' },
    ],
  },

  lesson_ch2_02: {
    id: 'lesson_ch2_02', chapterId: 'ch2', title: 'Fikarohana amin\'ny pwd, cd, ls', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['pwd', 'cd', 'ls'],
    content: [
      { type: 'heading', text: 'Aiza aho? (pwd)' },
      { type: 'paragraph', text: 'pwd (print working directory) dia mampiseho ny toeranao ankehitriny ao amin\'ny rafi-drakitra. Ampiasao foana izany rehefa tsy matoky hoe aiza ianao.' },
      { type: 'code', command: 'pwd', output: '/home/adventurer' },
      { type: 'heading', text: 'Mivezivezy (cd)' },
      { type: 'paragraph', text: 'cd (change directory) dia mamindra anao mankany amin\'ny lahatahiry hafa. Ampiasao miaraka amin\'ny lalana iray mankany amin\'ny toerana manokana.' },
      { type: 'code', command: 'cd /tmp', output: '' },
      { type: 'heading', text: 'Manisa ny votoatiny (ls)' },
      { type: 'paragraph', text: 'ls dia manisa ny rakitra sy lahatahiry. Manana drapeau mahasoa maro izy ho an\'ny endrika samihafa.' },
      { type: 'list', items: ['ls -l: endrika lava miaraka amin\'ny fahazoan-dalana, habe, daty', 'ls -a: mampiseho ny rakitra miafina (manomboka amin\'ny .)', 'ls -h: haben\'ny rakitra azo vakina (Ko, Mo)', 'ls -t: mandahatra araka ny datin\'ny fanovana', 'ls -R: manisa ny zana-lahatahiry amin\'ny fomba recursive'] },
      { type: 'tip', text: 'Atambaro ny drapeau: ls -lah dia manome lisitra feno ny rakitra rehetra miaraka amin\'ny habe azo vakina.' },
    ],
    examples: [
      { input: 'ls -lh', output: 'total 8.0K\ndrwxr-xr-x 2 user user 4.0K Jan 1 notes.txt\n-rw-r--r-- 1 user user 1.2K Jan 1 readme.md', description: 'Lisitra feno miaraka amin\'ny habe azo vakina' },
      { input: 'cd .. && pwd', output: '/home', description: 'Miakatra lahatahiry iray ary mampiseho ny toerana' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny lahatahiry fiasanao ankehitriny', expectedCommand: 'pwd', hint: 'pwd dia mampiseho ny lalana feno amin\'ny toeranao' },
      { instruction: 'Asehoy ny rakitra rehetra amin\'ny endrika feno', expectedCommand: 'ls -la', hint: 'Atambaro -l (lava) sy -a (rehetra) ny drapeau' },
    ],
  },

  lesson_ch2_03: {
    id: 'lesson_ch2_03', chapterId: 'ch2', title: 'Lalana sy hafohezana', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['cd', 'tree'],
    content: [
      { type: 'heading', text: 'Lalana tanteraka vs relatif' },
      { type: 'paragraph', text: 'Ny lalana tanteraka dia manomboka amin\'ny fototra (/), toy ny /home/user/docs. Ny lalana relatif dia manomboka amin\'ny lahatahiry ankehitriny, toy ny docs/notes.txt. Ampiasao ny lalana tanteraka rehefa mila marina.' },
      { type: 'heading', text: 'Hafohezana lalana' },
      { type: 'table', headers: ['Hafohezana', 'Dikany'], rows: [
        ['~', 'Ny lahatahiry manaokana (/home/anaranampampiasa)'],
        ['.', 'Lahatahiry ankehitriny'],
        ['..', 'Lahatahiry ray (iray ambony)'],
        ['-', 'Lahatahiry teo aloha (izay vao nisy anao)'],
      ]},
      { type: 'code', command: 'cd ~', output: '' },
      { type: 'heading', text: 'Auto-complétion amin\'ny Tab' },
      { type: 'paragraph', text: 'Tsindrio Tab hamitana automatique ny anaran\'ny rakitra sy lahatahiry. Tsindrio Tab indroa hahitana ny mety rehetra. Manatsara ny fandikana ary misoroka ny fahadisoana.' },
      { type: 'tip', text: 'Ampiasao cd - hivadihana haingana eo anelanelan\'ny lahatahiry roa. Mahasoa rehefa miasa amin\'ny toerana roa.' },
    ],
    examples: [
      { input: 'cd ~/Documents', output: '', description: 'Mankany amin\'ny Documents ao amin\'ny lahatahiry manaokana' },
      { input: 'tree -L 2', output: '.\n├── docs\n│   ├── readme.md\n│   └── notes.txt\n└── src\n    └── main.js', description: 'Mampiseho ny hazon\'ny lahatahiry 2 ambaratonga' },
    ],
    practiceExercises: [
      { instruction: 'Mandehana mankany amin\'ny lahatahiry manaokana amin\'ny hafohezana', expectedCommand: 'cd ~', hint: 'Ny ~ dia maneho ny lahatahiry manaokana' },
      { instruction: 'Miakara lahatahiry iray', expectedCommand: 'cd ..', hint: 'Teboka roa (..) dia midika ny lahatahiry ray' },
    ],
  },

  // ═══════════════════════ TOKO 3: Rakitra ═══════════════════════
  lesson_ch3_01: {
    id: 'lesson_ch3_01', chapterId: 'ch3', title: 'Mamorona sy mijery rakitra', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['touch', 'mkdir', 'cat', 'less', 'head', 'tail'],
    content: [
      { type: 'heading', text: 'Mamorona rakitra sy lahatahiry' },
      { type: 'paragraph', text: 'touch dia mamorona rakitra banga na manavao ny fotoana. mkdir dia mamorona lahatahiry. Ampiasao mkdir -p hamoronana lahatahiry mifandimby amin\'ny baiko iray.' },
      { type: 'code', command: 'touch newfile.txt', output: '' },
      { type: 'code', command: 'mkdir -p projects/web/css', output: '' },
      { type: 'heading', text: 'Mijery ny votoatin\'ny rakitra' },
      { type: 'paragraph', text: 'Baiko maro no ahafahanao mijery rakitra amin\'ny fomba samihafa:' },
      { type: 'list', items: ['cat: mampiseho ny rakitra manontolo indray mandeha', 'less: manodina ny rakitra pejy tsirairay (q hialana)', 'head: mampiseho ny andalana 10 voalohany (ampiasao -n ho an\'ny isa manokana)', 'tail: mampiseho ny andalana 10 farany (ampiasao -f hanaraka ny fanavaozana mivantana)'] },
      { type: 'code', command: 'cat /etc/hostname', output: 'kingdom-server' },
      { type: 'tip', text: 'Ampiasao tail -f hijerena ny rakitry ny tahirin-kevitra miova mivantana amin\'ny fotoana tena izy. Tena mahasoa ho an\'ny debugging.' },
    ],
    examples: [
      { input: 'head -5 /etc/passwd', output: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin\nbin:x:2:2:bin:/usr/bin\nsys:x:3:3:sys:/dev\nsync:x:4:65534:sync:/bin', description: 'Asehoy ny andalana 5 voalohan\'ny rakitra' },
      { input: 'tail -3 /var/log/syslog', output: 'Jan 1 12:00:01 server systemd[1]: Started Session\nJan 1 12:00:02 server sshd[1234]: Accepted\nJan 1 12:00:03 server kernel: info', description: 'Asehoy ny andalana 3 faran\'ny tahirin-kevitra' },
    ],
    practiceExercises: [
      { instruction: 'Mamorona rakitra banga vaovao antsoina hoe notes.txt', expectedCommand: 'touch notes.txt', hint: 'Ampiasao ny baiko touch arahin\'ny anaran-drakitra' },
      { instruction: 'Mamorona rafitra lahatahiry mifandimby projects/src', expectedCommand: 'mkdir -p projects/src', hint: 'Ampiasao mkdir miaraka amin\'ny drapeau -p ho an\'ny lahatahiry mifandimby' },
    ],
  },

  lesson_ch3_02: {
    id: 'lesson_ch3_02', chapterId: 'ch3', title: 'Mandika, mamindra sy manova anarana', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['cp', 'mv'],
    content: [
      { type: 'heading', text: 'Mandika rakitra (cp)' },
      { type: 'paragraph', text: 'cp dia mandika rakitra sy lahatahiry. Ampiasao -r (recursive) handikana lahatahiry manontolo miaraka amin\'ny votoatiny.' },
      { type: 'code', command: 'cp file.txt backup.txt', output: '' },
      { type: 'code', command: 'cp -r mydir/ mydir_backup/', output: '' },
      { type: 'heading', text: 'Mamindra sy manova anarana (mv)' },
      { type: 'paragraph', text: 'mv dia mamindra rakitra mankany amin\'ny toerana vaovao NA manova ny anarany. Tsy misy baiko rename mitokana ao amin\'ny UNIX - mv dia manao ny roa.' },
      { type: 'code', command: 'mv oldname.txt newname.txt', output: '' },
      { type: 'code', command: 'mv file.txt /tmp/', output: '' },
      { type: 'warning', text: 'mv dia manoratra eo ambonin\'ny tanjona tsy manontany. Ampiasao mv -i (interactive) hahazoana fanamafisana alohan\'ny manoratra eo amboniny.' },
      { type: 'tip', text: 'Handikana miaraka amin\'ny fitahirizana ny fahazoan-dalana sy ny fotoana, ampiasao cp -a (mode archive).' },
    ],
    examples: [
      { input: 'cp -r src/ src_backup/', output: '', description: 'Mandika lahatahiry manontolo amin\'ny fomba recursive' },
      { input: 'mv *.txt documents/', output: '', description: 'Mamindra ny rakitra .txt rehetra mankany amin\'ny lahatahiry documents' },
    ],
    practiceExercises: [
      { instruction: 'Adikao file.txt ho rakitra vaovao antsoina hoe backup.txt', expectedCommand: 'cp file.txt backup.txt', hint: 'Ampiasao cp miaraka amin\'ny loharano sy tanjona' },
      { instruction: 'Ovay ny anaran\'ny old.txt ho new.txt', expectedCommand: 'mv old.txt new.txt', hint: 'Ampiasao mv hanovana anaran-drakitra' },
    ],
  },

  lesson_ch3_03: {
    id: 'lesson_ch3_03', chapterId: 'ch3', title: 'Mamafa rakitra sy joker', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['rm', 'rmdir'],
    content: [
      { type: 'heading', text: 'Mamafa rakitra (rm)' },
      { type: 'paragraph', text: 'rm dia mamafa rakitra tanteraka. Tsy misy corbeille ao amin\'ny UNIX - ny rakitra voafafa dia very mandrakizay. Ampiasao -r ho an\'ny lahatahiry ary -f hanery tsy misy fanamafisana.' },
      { type: 'code', command: 'rm unwanted.txt', output: '' },
      { type: 'code', command: 'rm -r old_directory/', output: '' },
      { type: 'warning', text: 'Aza manatanteraka rm -rf / na rm -rf * raha tsy efa nojerena tsara. Ireo baiko ireo dia afaka mandrava ny rafitrao manontolo. Hamarino foana ny lalanao amin\'ny pwd.' },
      { type: 'heading', text: 'Joker (Globbing)' },
      { type: 'paragraph', text: 'Ny joker dia ahafahana mifanandrify amin\'ny rakitra maro indray mandeha:' },
      { type: 'table', headers: ['Modely', 'Mifanandrify amin\'ny'], rows: [
        ['*', 'Tarehimarika isan-karazany'],
        ['?', 'Tarehimarika iray tokana'],
        ['[abc]', 'Tarehimarika iray avy amin\'ny vondrona'],
        ['[0-9]', 'Isa iray na inona na inona'],
        ['*.txt', 'Rakitra rehetra mifarana amin\'ny .txt'],
      ]},
      { type: 'tip', text: 'Ampiasao rmdir hamafana lahatahiry banga ihany - azo antoka kokoa noho ny rm -r satria mandà hamafa lahatahiry misy votoatiny.' },
    ],
    examples: [
      { input: 'ls *.js', output: 'app.js  index.js  utils.js', description: 'Lisitry ny rakitra JavaScript rehetra' },
      { input: 'rm -i *.log', output: "rm: remove regular file 'error.log'?", description: 'Mamafa ny rakitra log miaraka amin\'ny fanamafisana' },
    ],
    practiceExercises: [
      { instruction: 'Fafao ny rakitra antsoina hoe temp.txt', expectedCommand: 'rm temp.txt', hint: 'Ampiasao rm arahin\'ny anaran-drakitra' },
      { instruction: 'Asehoy ny rakitra rehetra mifarana amin\'ny .txt', expectedCommand: 'ls *.txt', hint: 'Ampiasao ny joker * alohan\'ny .txt' },
    ],
  },

  // ═══════════════════════ TOKO 4: Fahazoan-dalana ═══════════════════════
  lesson_ch4_01: {
    id: 'lesson_ch4_01', chapterId: 'ch4', title: 'Fahatakarana ny fahazoan-dalana', order: 1,
    estimatedReadTime: '7 min', keyCommands: ['ls'],
    content: [
      { type: 'heading', text: 'Ny rafitra fahazoan-dalana' },
      { type: 'paragraph', text: 'Ny rakitra tsirairay ao amin\'ny UNIX dia manana andiana fahazoan-dalana telo ho an\'ny sokajin\'ny mpampiasa telo: ny tompony (u), ny vondrona (g), ary ny hafa (o). Ny andiana tsirairay dia mifehy ny famakiana (r), ny fanoratana (w), ary ny fanatanterahana (x).' },
      { type: 'heading', text: 'Mamaky ny tady fahazoan-dalana' },
      { type: 'code', command: 'ls -l myfile.txt', output: '-rw-r--r-- 1 user group 1024 Jan 1 myfile.txt' },
      { type: 'paragraph', text: 'Ny tady -rw-r--r-- dia zaraina toy izao: - (karazana rakitra), rw- (tompony: mamaky+manoratra), r-- (vondrona: mamaky ihany), r-- (hafa: mamaky ihany).' },
      { type: 'table', headers: ['Tarehimarika', 'Dikany', 'Isa'], rows: [
        ['r', 'Mamaky (mijery ny votoatiny)', '4'],
        ['w', 'Manoratra (manova ny votoatiny)', '2'],
        ['x', 'Manatanteraka (mampandeha ho programa)', '1'],
        ['-', 'Nolavina ny fahazoan-dalana', '0'],
      ]},
      { type: 'heading', text: 'Karazana rakitra' },
      { type: 'list', items: ['- : rakitra mahazatra', 'd : lahatahiry', 'l : rohy ara-tsimboly', 'b : fitaovana block', 'c : fitaovana tarehimarika'] },
      { type: 'tip', text: 'Ny lahatahiry dia mila fahazoan-dalana fanatanterahana (x) hidirana ao aminy (cd), ary famakiana (r) hanisana ny votoatiny.' },
    ],
    examples: [
      { input: 'ls -la', output: 'drwxr-xr-x 2 user user 4096 Jan 1 Documents\n-rwxr-x--- 1 user user 8192 Jan 1 script.sh\n-rw-r--r-- 1 user user 1024 Jan 1 readme.md', description: 'Jereo ny fahazoan-dalana amin\'ny rakitra rehetra' },
      { input: 'stat myfile.txt', output: 'Access: (0644/-rw-r--r--)  Uid: (1000/user)  Gid: (1000/user)', description: 'Sanda feno ny rakitra miaraka amin\'ny fahazoan-dalana' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny fahazoan-dalana feno amin\'ny rakitra rehetra', expectedCommand: 'ls -la', hint: 'Ampiasao ls -la ho an\'ny lisitra feno amin\'ny rakitra rehetra' },
      { instruction: 'Jereo ny sanda feno amin\'ny rakitra iray', expectedCommand: 'stat myfile.txt', hint: 'Ny baiko stat dia mampiseho ny fampahalalana feno momba ny rakitra' },
    ],
  },

  lesson_ch4_02: {
    id: 'lesson_ch4_02', chapterId: 'ch4', title: 'Manova fahazoan-dalana (chmod)', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['chmod'],
    content: [
      { type: 'heading', text: 'Mode isa (octal)' },
      { type: 'paragraph', text: 'Ny fomba mahazatra indrindra hamaritana ny fahazoan-dalana. Atambaro ny sanda: r=4, w=2, x=1. Tarehintsoratra telo no maneho ny tompony, vondrona, hafa.' },
      { type: 'table', headers: ['Baiko', 'Vokatra', 'Dikany'], rows: [
        ['chmod 755', 'rwxr-xr-x', 'Tompony: rehetra, Vondrona/Hafa: mamaky+manatanteraka'],
        ['chmod 644', 'rw-r--r--', 'Tompony: mamaky+manoratra, Vondrona/Hafa: mamaky ihany'],
        ['chmod 700', 'rwx------', 'Tompony: rehetra, Vondrona/Hafa: tsinontsinona'],
        ['chmod 600', 'rw-------', 'Tompony: mamaky+manoratra, tsy misy hafa'],
      ]},
      { type: 'heading', text: 'Mode ara-tsimboly' },
      { type: 'paragraph', text: 'Fomba azo vakina kokoa mampiasa litera: u (mpampiasa/tompony), g (vondrona), o (hafa), a (rehetra). Hetsika: + (manampy), - (manala), = (mamaritra marina).' },
      { type: 'code', command: 'chmod u+x script.sh', output: '' },
      { type: 'code', command: 'chmod go-w file.txt', output: '' },
      { type: 'tip', text: '755 dia fenitra ho an\'ny lahatahiry sy script. 644 dia fenitra ho an\'ny rakitra mahazatra. Tadidio ireo roa ireo.' },
      { type: 'warning', text: 'Aza mampiasa chmod 777 amin\'ny production mihitsy. Manome fidirana feno ho an\'ny rehetra izany ary loza amin\'ny fiarovana.' },
    ],
    examples: [
      { input: 'chmod 755 deploy.sh', output: '', description: 'Mahatonga script ho azo tanterahina amin\'ny rehetra' },
      { input: 'chmod u+x,g-w file.txt', output: '', description: 'Manampy fanatanterahana ho an\'ny tompony, manala fanoratana ho an\'ny vondrona' },
    ],
    practiceExercises: [
      { instruction: 'Ataovy azo tanterahina ho an\'ny tompony ny script.sh', expectedCommand: 'chmod u+x script.sh', hint: 'Ampiasao u+x hanampy fahazoan-dalana fanatanterahana ho an\'ny mpampiasa/tompony' },
      { instruction: 'Ataovy fahazoan-dalana mamaky/manoratra ho an\'ny tompony ihany', expectedCommand: 'chmod 600 file.txt', hint: '6 = mamaky(4) + manoratra(2), 0 = tsy misy fahazoan-dalana' },
    ],
  },

  lesson_ch4_03: {
    id: 'lesson_ch4_03', chapterId: 'ch4', title: 'Fananan-tany sy fahazoan-dalana manokana', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['chown', 'chgrp'],
    content: [
      { type: 'heading', text: 'Manova ny fananan-tany (chown)' },
      { type: 'paragraph', text: 'chown dia manova ny tompon\'ny rakitra. Azonao ovaina ny tompony, ny vondrona, na ny roa miaraka. Matetika mitaky tombon-tsoa root/sudo.' },
      { type: 'code', command: 'chown user:group file.txt', output: '' },
      { type: 'code', command: 'chown -R www-data:www-data /var/www/', output: '' },
      { type: 'heading', text: 'Manova ny vondrona (chgrp)' },
      { type: 'paragraph', text: 'chgrp dia manova ny fananan-tany vondrona ihany. Mahasoa rehefa mila mizara rakitra amin\'ny vondrona manokana.' },
      { type: 'heading', text: 'Bit fahazoan-dalana manokana' },
      { type: 'table', headers: ['Bit', 'Isa', 'Vokatra'], rows: [
        ['setuid', '4000', 'Ny rakitra dia mandeha ho toy ny tompon\'ny rakitra, fa tsy ny mpampiasa izay mampandeha azy'],
        ['setgid', '2000', 'Ny rakitra dia mandeha ho toy ny vondrona. Amin\'ny lahatahiry, ny rakitra vaovao dia mandova ny vondrona'],
        ['sticky', '1000', 'Amin\'ny lahatahiry, ny tompony ihany no afaka mamafa ny rakitrany manokana (ohatra: /tmp)'],
      ]},
      { type: 'tip', text: 'Ny lahatahiry /tmp dia manana ny bit sticky voatondro mba tsy hahafahanin\'ny mpampiasa mamafa ny rakitra vonjimaika an\'ny hafa.' },
    ],
    examples: [
      { input: 'chown alice:devs project/', output: '', description: 'Ovay ny tompony ho alice, ny vondrona ho devs' },
      { input: 'chmod 1777 /tmp', output: '', description: 'Mametraka bit sticky amin\'ny lahatahiry iombonana' },
    ],
    practiceExercises: [
      { instruction: 'Ovay ny tompon\'ny file.txt ho mpampiasa bob', expectedCommand: 'chown bob file.txt', hint: 'Ampiasao chown arahin\'ny tompony vaovao sy ny anaran-drakitra' },
      { instruction: 'Ovay ny vondron\'ny file.txt ho developers', expectedCommand: 'chgrp developers file.txt', hint: 'Ampiasao chgrp arahin\'ny anaran-kevitra sy anaran-drakitra' },
    ],
  },

  // ═══════════════════════ TOKO 5: Fanodinana lahatsoratra ═══════════════════════
  lesson_ch5_01: {
    id: 'lesson_ch5_01', chapterId: 'ch5', title: 'Mikaroka amin\'ny grep', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['grep'],
    content: [
      { type: 'heading', text: 'Inona ny grep?' },
      { type: 'paragraph', text: 'grep (Global Regular Expression Print) dia mikaroka modely amin\'ny lahatsoratra ary mampiseho ny andalana mifanandrify. Iray amin\'ny baiko UNIX ampiasaina matetika indrindra izy.' },
      { type: 'code', command: 'grep "error" /var/log/syslog', output: 'Jan 1 12:00 error: disk full\nJan 1 13:00 error: connection timeout' },
      { type: 'heading', text: 'Drapeau mahazatra amin\'ny grep' },
      { type: 'list', items: ['-i: fikarohana tsy manavaka ny sora-baventy sy sora-madinika', '-r: mikaroka amin\'ny fomba recursive amin\'ny lahatahiry', '-n: mampiseho ny laharan-dalana', '-v: manodina ny fifanandraisana (mampiseho ny andalana TSY mifanandrify)', '-c: manisa ny andalana mifanandrify', '-l: mampiseho ny anaran-drakitra misy fifanandraisana ihany'] },
      { type: 'heading', text: 'Fanehoana mahazatra fototra' },
      { type: 'paragraph', text: 'grep dia manohana modely regex: ^ (fiandohan\'ny andalana), $ (fiafaran\'ny andalana), . (tarehimarika na inona na inona), * (aotra na mihoatra amin\'ny teo aloha).' },
      { type: 'tip', text: 'Ampiasao grep -rn hikaroana amin\'ny kaody amin\'ny fomba mahomby - mikaroka ny rakitra rehetra amin\'ny fomba recursive izy ary mampiseho ny laharan-dalana.' },
    ],
    examples: [
      { input: 'grep -rn "TODO" src/', output: 'src/app.js:15:// TODO: add validation\nsrc/utils.js:42:// TODO: refactor', description: 'Hahitana ny hevitra TODO rehetra ao amin\'ny kaody loharano' },
      { input: 'grep -c "error" logfile.txt', output: '23', description: 'Isao firy ny andalana misy "error"' },
    ],
    practiceExercises: [
      { instruction: 'Karohy ny teny "hello" ao amin\'ny file.txt (tsy manavaka sora-baventy)', expectedCommand: 'grep -i "hello" file.txt', hint: 'Ampiasao ny drapeau -i ho an\'ny fikarohana tsy manavaka sora-baventy' },
      { instruction: 'Karohy amin\'ny fomba recursive "config" ao amin\'ny lahatahiry ankehitriny', expectedCommand: 'grep -r "config" .', hint: 'Ampiasao -r ho an\'ny fikarohana recursive ary . ho an\'ny lahatahiry ankehitriny' },
    ],
  },

  lesson_ch5_02: {
    id: 'lesson_ch5_02', chapterId: 'ch5', title: 'Fandaharana sy fanisana', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['sort', 'uniq', 'wc', 'cut'],
    content: [
      { type: 'heading', text: 'Mandahatra amin\'ny sort' },
      { type: 'paragraph', text: 'sort dia mandahatra ny andalana amin\'ny fomba abidy amin\'ny default. Drapeau mahazatra: -n (fandaharana isa), -r (miverina), -k (mandahatra araka ny saha manokana), -u (tokana - manala diplikà).' },
      { type: 'code', command: 'sort -n numbers.txt', output: '1\n5\n10\n42\n100' },
      { type: 'heading', text: 'Manisa amin\'ny wc' },
      { type: 'paragraph', text: 'wc (word count) dia manisa ny andalana, teny sy tarehimarika. Ampiasao -l ho an\'ny andalana ihany, -w ho an\'ny teny ihany, -c ho an\'ny bytes.' },
      { type: 'code', command: 'wc -l /etc/passwd', output: '32 /etc/passwd' },
      { type: 'heading', text: 'Andalana tokana amin\'ny uniq' },
      { type: 'paragraph', text: 'uniq dia manala ny andalana diplikà mifanila. Mandahara aloha foana satria ny uniq dia manala ny diplikà mifanesy ihany. Ampiasao -c hanisana ny isan\'ny fisehona.' },
      { type: 'heading', text: 'Manala saha amin\'ny cut' },
      { type: 'paragraph', text: 'cut dia manala tsanganana manokana amin\'ny lahatsoratra. Ampiasao -d ho an\'ny delimiter ary -f ho an\'ny laharan\'ny saha.' },
      { type: 'code', command: 'cut -d: -f1 /etc/passwd', output: 'root\ndaemon\nbin\nuser' },
    ],
    examples: [
      { input: 'sort names.txt | uniq -c | sort -rn', output: '   5 alice\n   3 bob\n   1 charlie', description: 'Manisa sy mandahatra ny fisehon\'ny anarana' },
      { input: 'wc -lwc file.txt', output: '  100   450  3200 file.txt', description: 'Manisa ny andalana, teny sy tarehimarika' },
    ],
    practiceExercises: [
      { instruction: 'Isao ny isan\'ny andalana ao amin\'ny rakitra', expectedCommand: 'wc -l file.txt', hint: 'Ampiasao wc miaraka amin\'ny drapeau -l ho an\'ny fanisana andalana' },
      { instruction: 'Daharo ny rakitra amin\'ny fomba isa amin\'ny filaharan\'ny miverina', expectedCommand: 'sort -rn numbers.txt', hint: 'Ampiasao -n ho an\'ny isa ary -r ho an\'ny miverina' },
    ],
  },

  lesson_ch5_03: {
    id: 'lesson_ch5_03', chapterId: 'ch5', title: 'Fanovana fikorianan-drakitra (sed & awk)', order: 3,
    estimatedReadTime: '7 min', keyCommands: ['sed', 'awk', 'tr'],
    content: [
      { type: 'heading', text: 'sed - Mpanova fikorianan-drakitra' },
      { type: 'paragraph', text: 'sed dia manatanteraka fanovana lahatsoratra amin\'ny fikorianan-drakitra miditra. Ny fampiasana mahazatra indrindra dia ny mikaroka-sy-manova amin\'ny baiko s.' },
      { type: 'code', command: "sed 's/old/new/g' file.txt", output: '(votoatin-drakitra miaraka amin\'ny old nosoloina new)' },
      { type: 'paragraph', text: 'Ny drapeau g dia midika global (manova ny fisehona rehetra isaky ny andalana). Raha tsy misy g, ny fisehona voalohany isaky ny andalana ihany no soloina.' },
      { type: 'heading', text: 'awk - Fanodinana amin\'ny modely' },
      { type: 'paragraph', text: 'awk dia fitaovana mahery vaika amin\'ny fanodinana lahatsoratra izay miasa amin\'ny saha (tsanganana). Amin\'ny alàlan\'ny default dia mizara amin\'ny habaka izy. $1 ny saha voalohany, $2 ny faharoa, sns.' },
      { type: 'code', command: "awk '{print $1, $3}' data.txt", output: 'alice 90\nbob 85\ncharlie 92' },
      { type: 'heading', text: 'tr - Mandika tarehimarika' },
      { type: 'paragraph', text: 'tr dia mandika na mamafa tarehimarika. Mahasoa ho an\'ny fiovam-panahy sy ny fanesorana tarehimarika manokana.' },
      { type: 'code', command: 'echo "HELLO" | tr A-Z a-z', output: 'hello' },
      { type: 'tip', text: 'sed -i dia manova ny rakitra eo amin\'ny toerana (manova ny rakitra tany am-boalohany). Ampiasao sed -i.bak hamoronana tahiry aloha.' },
    ],
    examples: [
      { input: "sed 's/http/https/g' urls.txt", output: 'https://example.com\nhttps://google.com', description: 'Manova http ho https amin\'ny URL rehetra' },
      { input: "awk -F: '{print $1}' /etc/passwd", output: 'root\ndaemon\nuser', description: 'Mampiseho ny saha voalohany amin\'ny rakitra misaraka amin\'ny teboka roa' },
    ],
    practiceExercises: [
      { instruction: 'Soloina ny fisehona rehetra "foo" amin\'ny "bar" ao amin\'ny file.txt', expectedCommand: "sed 's/foo/bar/g' file.txt", hint: 'Ampiasao sed amin\'ny s/modely/solon/g' },
      { instruction: 'Ovay ny lahatsoratra ho sora-madinika', expectedCommand: 'echo "TEXT" | tr A-Z a-z', hint: 'Ampiasao tr handikana ny faritra sora-baventy ho sora-madinika' },
    ],
  },

  // ═══════════════════════ TOKO 6: Dingana ═══════════════════════
  lesson_ch6_01: {
    id: 'lesson_ch6_01', chapterId: 'ch6', title: 'Mijery ny dingana', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ps', 'top'],
    content: [
      { type: 'heading', text: 'Inona ny dingana?' },
      { type: 'paragraph', text: 'Ny dingana dia fandidiana mandeha amin\'ny programa. Ny baiko tsirairay ataonao dia mamorona dingana manana Process ID (PID) tokana. Ny kernel ny rafitra dia mitantana ny dingana rehetra.' },
      { type: 'heading', text: 'Manisa ny dingana (ps)' },
      { type: 'code', command: 'ps aux', output: 'USER  PID %CPU %MEM   COMMAND\nroot    1  0.0  0.1   /sbin/init\nuser 1234  2.5  1.0   /usr/bin/node app.js\nuser 1235  0.0  0.0   bash' },
      { type: 'list', items: ['ps: mampiseho ny dingana anao manokana', 'ps aux: mampiseho ny dingana rehetra ho an\'ny mpampiasa rehetra', 'ps -ef: endrika hafa mampiseho ny andalana baiko feno'] },
      { type: 'heading', text: 'Fanaraha-maso amin\'ny fotoana tena izy (top)' },
      { type: 'paragraph', text: 'top dia mampiseho endrika miova mivantana amin\'ny dingana voalahatra araka ny fampiasana CPU. Tsindrio q hialana, k hamonoana dingana, M handaharana araka ny fitadidiana.' },
      { type: 'tip', text: 'Ampiasao ps aux | grep anarandingana hahitana haingana dingana mandeha manokana.' },
    ],
    examples: [
      { input: 'ps aux | grep node', output: 'user 1234 2.5 1.0 node app.js', description: 'Hahitana ny dingana Node.js rehetra' },
      { input: 'ps -ef --forest', output: 'UID  PID PPID CMD\n  0    1    0 init\n  0  100    1  \\_ sshd\n1000  200  100      \\_ bash', description: 'Mampiseho ny hazon\'ny ambaratonga dingana' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny dingana rehetra mandeha', expectedCommand: 'ps aux', hint: 'Ampiasao ps miaraka amin\'ny drapeau aux hahitana dingana rehetra' },
      { instruction: 'Sokafy ny fanaraha-maso dingana amin\'ny fotoana tena izy', expectedCommand: 'top', hint: 'top dia mampiseho ny fampahalalana dingana mivantana' },
    ],
  },

  lesson_ch6_02: {
    id: 'lesson_ch6_02', chapterId: 'ch6', title: 'Mifehy ny dingana', order: 2,
    estimatedReadTime: '5 min', keyCommands: ['kill', 'killall'],
    content: [
      { type: 'heading', text: 'Mandefa famantarana amin\'ny kill' },
      { type: 'paragraph', text: 'kill dia mandefa famantarana mankany amin\'ny dingana. Na dia eo aza ny anarany, tsy mamono foana izy - mandefa famantarana voafaritra izay azon\'ny dingana tantanana.' },
      { type: 'heading', text: 'Famantarana mahazatra' },
      { type: 'table', headers: ['Famantarana', 'Laharana', 'Vokatra'], rows: [
        ['SIGTERM', '15', 'Fanapahana amin\'ny fomba tsara (default)'],
        ['SIGKILL', '9', 'Mamono an-tery avy hatrany (tsy azo samborina)'],
        ['SIGHUP', '1', 'Fanapahana - matetika ampiasaina hamerenana ny fanamboarana'],
        ['SIGSTOP', '19', 'Mampitsahatra ny dingana'],
        ['SIGCONT', '18', 'Mamerina ny dingana natsahatra'],
      ]},
      { type: 'code', command: 'kill 1234', output: '' },
      { type: 'code', command: 'kill -9 1234', output: '' },
      { type: 'warning', text: 'Andramo foana kill (SIGTERM) aloha. Ampiasao kill -9 (SIGKILL) ho famerenan-toetra farany ihany satria tsy mamela ny dingana handamina.' },
      { type: 'paragraph', text: 'killall dia mamono ny dingana rehetra amin\'ny anarana fa tsy PID, ary pkill dia manohana fifanandraisana amin\'ny modely.' },
    ],
    examples: [
      { input: 'kill -15 1234', output: '', description: 'Manapaka amin\'ny fomba tsara ny dingana 1234' },
      { input: 'killall firefox', output: '', description: 'Mamono ny dingana Firefox rehetra amin\'ny anarana' },
    ],
    practiceExercises: [
      { instruction: 'Ajanony amin\'ny fomba tsara ny dingana miaraka amin\'ny PID 5678', expectedCommand: 'kill 5678', hint: 'Ampiasao kill arahin\'ny PID (ny famantarana default dia SIGTERM)' },
      { instruction: 'Tereo ho faty ny dingana reraka amin\'ny PID 9999', expectedCommand: 'kill -9 9999', hint: 'Ampiasao -9 ho an\'ny SIGKILL (mamono an-tery)' },
    ],
  },

  lesson_ch6_03: {
    id: 'lesson_ch6_03', chapterId: 'ch6', title: 'Ambadika sy aloha', order: 3,
    estimatedReadTime: '5 min', keyCommands: ['bg', 'fg', 'jobs'],
    content: [
      { type: 'heading', text: 'Mampandeha ambadika' },
      { type: 'paragraph', text: 'Ampio & eo amin\'ny faran\'ny baiko hampiasana azy ambadika. Izany dia mamela anao hanohy mampiasa ny terminal raha mbola mandeha ny dingana.' },
      { type: 'code', command: 'long_running_task &', output: '[1] 1234' },
      { type: 'heading', text: 'Fifehezan-tasa' },
      { type: 'list', items: ['Ctrl+Z: mampitsahatra (suspend) ny dingana aloha ankehitriny', 'bg: mamerina ny dingana natsahatra ambadika', 'fg: mitondra ny dingana ambadika mankany aloha', 'jobs: manisa ny asa ambadika sy natsahatra rehetra'] },
      { type: 'code', command: 'jobs', output: '[1]+  Running    long_running_task &\n[2]-  Stopped    vim file.txt' },
      { type: 'heading', text: 'Mitahiry ny dingana velona' },
      { type: 'paragraph', text: 'nohup dia mampandeha baiko tsy misy akon\'ny fanapahana, ka mbola manohy na dia akatona aza ny terminal. Ampiasao disown hanafoanana ny asa efa mandeha.' },
      { type: 'code', command: 'nohup ./server.sh &', output: 'nohup: appending output to nohup.out' },
      { type: 'tip', text: 'Ampiasao screen na tmux ho an\'ny fotoam-pitaovana terminal maharitra izay maharitra amin\'ny fanapahana. Tsara kokoa noho ny nohup ho an\'ny asa interactive.' },
    ],
    examples: [
      { input: 'sleep 100 &', output: '[1] 5678', description: 'Mampandeha sleep ambadika' },
      { input: 'fg %1', output: 'sleep 100', description: 'Mitondra ny asa 1 mankany aloha' },
    ],
    practiceExercises: [
      { instruction: 'Mandehana baiko ambadika', expectedCommand: 'sleep 60 &', hint: 'Ampio & eo amin\'ny farany hampiasana ambadika' },
      { instruction: 'Asehoy ny asa ambadika ankehitriny', expectedCommand: 'jobs', hint: 'Ny baiko jobs dia mampiseho ny asa ambadika/natsahatra rehetra' },
    ],
  },

  // ═══════════════════════ TOKO 7: Fantsona sy fanorenana ═══════════════════════
  lesson_ch7_01: {
    id: 'lesson_ch7_01', chapterId: 'ch7', title: 'Fikorianan-drakitra mahazatra', order: 1,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Ny fikorianan-drakitra telo mahazatra' },
      { type: 'paragraph', text: 'Ny dingana UNIX tsirairay dia manana fikorianan-drakitra E/S telo mahazatra izay mampifandray azy amin\'ny tontolo ivelany:' },
      { type: 'table', headers: ['Fikorianan-drakitra', 'File Descriptor', 'Default'], rows: [
        ['stdin (fidirana mahazatra)', '0', 'Keyboard'],
        ['stdout (fivoahana mahazatra)', '1', 'Efijery terminal'],
        ['stderr (fahadisoana mahazatra)', '2', 'Efijery terminal'],
      ]},
      { type: 'heading', text: 'Nahoana no telo ny fikorianan-drakitra?' },
      { type: 'paragraph', text: 'Ny fisarahana ny fivoahana sy ny fikorianan-drakitry ny fahadisoana dia mamela anao hitantana azy ireo amin\'ny fomba samy hafa. Azonao tehirizina ny fivoahana amin\'ny rakitra kanefa mbola mahita ny fahadisoana eo amin\'ny efijery, na mifamadika.' },
      { type: 'heading', text: 'Ahoana ny fikorianan\'ny angona' },
      { type: 'paragraph', text: 'Ny fidirana dia miditra amin\'ny programa amin\'ny alalan\'ny stdin. Ny fivoahana mahazatra dia mivoaka amin\'ny alalan\'ny stdout. Ny hafatra fahadisoana mivoaka amin\'ny alalan\'ny stderr. Io fisarahana io dia fototra ho an\'ny rafitry ny fantsona.' },
      { type: 'tip', text: 'Ny programa izay mamaky avy amin\'ny stdin ary manoratra mankany amin\'ny stdout dia antsoina hoe "filtre" ary natao hifandray amin\'ny fantsona.' },
    ],
    examples: [
      { input: 'echo "hello" 1>/dev/null', output: '', description: 'Manala stdout (tsy misy fivoahana hita)' },
      { input: 'ls nonexistent 2>/dev/null', output: '', description: 'Manala ny hafatra fahadisoana' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny lahatsoratra "hello world" (mampiasa stdout)', expectedCommand: 'echo "hello world"', hint: 'echo dia mandefa lahatsoratra mankany amin\'ny stdout' },
      { instruction: 'Andramo manisa rakitra tsy misy hahitanao stderr', expectedCommand: 'ls nonexistent_file', hint: 'ls dia mampiseho fahadisoana amin\'ny stderr ho an\'ny rakitra tsy hita' },
    ],
  },

  lesson_ch7_02: {
    id: 'lesson_ch7_02', chapterId: 'ch7', title: 'Fanorenana', order: 2,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Fanorenana fivoahana' },
      { type: 'paragraph', text: 'Amindrao ny stdout mankany amin\'ny rakitra amin\'ny > (manoratra eo amboniny) na >> (manampy). Izany no fomba hitahirizanao ny fivoahan\'ny baiko.' },
      { type: 'code', command: 'echo "line 1" > output.txt', output: '' },
      { type: 'code', command: 'echo "line 2" >> output.txt', output: '' },
      { type: 'heading', text: 'Fanorenana fahadisoana' },
      { type: 'paragraph', text: 'Amindrao ny stderr amin\'ny 2>. Atambaro ny stdout sy stderr amin\'ny &> na 2>&1.' },
      { type: 'code', command: 'command 2> errors.log', output: '' },
      { type: 'code', command: 'command > output.log 2>&1', output: '' },
      { type: 'heading', text: 'Fanorenana fidirana' },
      { type: 'paragraph', text: 'Amindrao ny stdin avy amin\'ny rakitra amin\'ny <. Ny programa dia mamaky avy amin\'ny rakitra fa tsy miandry ny fidirana keyboard.' },
      { type: 'code', command: 'sort < unsorted.txt', output: 'alice\nbob\ncharlie' },
      { type: 'heading', text: 'Ny fitaovana null' },
      { type: 'paragraph', text: '/dev/null dia rakitra manokana izay manary ny zava-drehetra soratana aminy. Ampiasao izany hamanginana ny fivoahana: command > /dev/null 2>&1' },
      { type: 'warning', text: 'Ny fampiasana > dia manoratra eo ambonin\'ny rakitra tanteraka. Ampiasao >> foana raha tianao ny manampy amin\'ny votoatiny efa misy.' },
    ],
    examples: [
      { input: 'ls /etc > filelist.txt 2> errors.txt', output: '', description: 'Tehirizina ny fivoahana sy fahadisoana amin\'ny rakitra samihafa' },
      { input: 'cat < input.txt > output.txt', output: '', description: 'Mamaky avy amin\'ny rakitra iray, manoratra amin\'ny hafa' },
    ],
    practiceExercises: [
      { instruction: 'Tehirizina ny fivoahan\'ny ls amin\'ny rakitra antsoina hoe listing.txt', expectedCommand: 'ls > listing.txt', hint: 'Ampiasao > hamindrana stdout mankany amin\'ny rakitra' },
      { instruction: 'Ampio ny daty ankehitriny amin\'ny rakitry ny tahirin-kevitra', expectedCommand: 'date >> log.txt', hint: 'Ampiasao >> hanampy fa tsy manoratra eo amboniny' },
    ],
  },

  lesson_ch7_03: {
    id: 'lesson_ch7_03', chapterId: 'ch7', title: 'Fantsona sy fampifandraisana', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['tee', 'xargs'],
    content: [
      { type: 'heading', text: 'Ny operateur fantsona (|)' },
      { type: 'paragraph', text: 'Ny fantsona dia mampifandray ny stdout amin\'ny baiko iray amin\'ny stdin amin\'ny manaraka. Izany dia mamela anao hampifandray baiko hanorenana pipelines mahery vaika amin\'ny fanodinana angona.' },
      { type: 'code', command: 'cat access.log | grep "404" | wc -l', output: '47' },
      { type: 'heading', text: 'Ny baiko tee' },
      { type: 'paragraph', text: 'tee dia mizara fivoahana mankany amin\'ny rakitra SY stdout. Mahasoa rehefa tianao tehirizina ny fivoahana ary mbola mahita azy na mandefa azy amin\'ny fantsona hafa.' },
      { type: 'code', command: 'ls | tee filelist.txt | wc -l', output: '12' },
      { type: 'heading', text: 'Fampifandraisana baiko' },
      { type: 'table', headers: ['Operateur', 'Fitondran-tena'], rows: [
        ['cmd1 && cmd2', 'Mandefa cmd2 RAHA MAHOMBY cmd1 ihany'],
        ['cmd1 || cmd2', 'Mandefa cmd2 RAHA TSY MAHOMBY cmd1 ihany'],
        ['cmd1 ; cmd2', 'Mandefa cmd2 na inona na inona vokatra avy amin\'ny cmd1'],
      ]},
      { type: 'heading', text: 'xargs - Mamorona baiko avy amin\'ny fidirana' },
      { type: 'paragraph', text: 'xargs dia mamaky singa avy amin\'ny stdin ary mandefa azy ho argument amin\'ny baiko hafa.' },
      { type: 'code', command: 'find . -name "*.log" | xargs rm', output: '' },
      { type: 'tip', text: 'Ny pipelines sarotra dia ny fototra amin\'ny herin\'ny UNIX. Atombohy tsotra ary ampio dingana iray isaky ny mandeha.' },
    ],
    examples: [
      { input: 'ps aux | sort -rk 3 | head -5', output: 'USER PID %CPU... (top 5 CPU-hungry processes)', description: 'Hahitana ny dingana 5 tena mampiasa CPU' },
      { input: 'mkdir build && cd build && cmake ..', output: '', description: 'Mampifandray baiko izay mifampiankin-doha' },
    ],
    practiceExercises: [
      { instruction: 'Isao ny isan\'ny rakitra ao amin\'ny lahatahiry ankehitriny mampiasa fantsona', expectedCommand: 'ls | wc -l', hint: 'Alefaso ny fivoahan\'ny ls mankany amin\'ny wc -l hanisana andalana' },
      { instruction: 'Tadiavo ny andalana misy "error" ary tehirizo amin\'ny rakitra miaraka amin\'ny fampisehoana', expectedCommand: 'grep "error" log.txt | tee errors.txt', hint: 'Ampiasao tee hizarana fivoahana mankany amin\'ny rakitra sy efijery' },
    ],
  },

  // ═══════════════════════ TOKO 8: Shell Scripting ═══════════════════════
  lesson_ch8_01: {
    id: 'lesson_ch8_01', chapterId: 'ch8', title: 'Ny variables sy ny tontolo', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['export', 'env'],
    content: [
      { type: 'heading', text: 'Variables Shell' },
      { type: 'paragraph', text: 'Ny variables dia mitahiry sanda. Ampio amin\'ny ANARANA=sanda (tsy misy habaka manodidina ny =). Midira amin\'ny $ANARANA na ${ANARANA}.' },
      { type: 'code', command: 'NAME="Kingdom"', output: '' },
      { type: 'code', command: 'echo "Welcome to $NAME"', output: 'Welcome to Kingdom' },
      { type: 'heading', text: 'Variables tontolo' },
      { type: 'paragraph', text: 'Ny variables tontolo dia misy ho an\'ny dingana zanaka rehetra. Ampiasao export hanaovana variable ho misy amin\'ny ankapobeny.' },
      { type: 'list', items: ['$PATH: lahatahiry ikarohan-baiko', '$HOME: ny lahatahiry manaokana', '$USER: anaran\'ny mpampiasa ankehitriny', '$PWD: lahatahiry fiasana ankehitriny', '$SHELL: ny shell default anao'] },
      { type: 'code', command: 'export PATH="$PATH:/usr/local/bin"', output: '' },
      { type: 'heading', text: 'Rakitry ny fanamboarana' },
      { type: 'paragraph', text: '~/.bashrc dia mandeha isaky ny terminal vaovao. ~/.profile dia mandeha amin\'ny fidirana. Ampio fehezanteny export amin\'ireo rakitra ireo hanaovana variables maharitra.' },
      { type: 'tip', text: 'Ampiasao env hahitana ny variables tontolo rehetra ankehitriny. Ampiasao printenv VAR hahitana iray manokana.' },
    ],
    examples: [
      { input: 'echo $PATH', output: '/usr/local/bin:/usr/bin:/bin', description: 'Jereo ny lalan\'ny fikarohan\'ny baiko' },
      { input: 'env | grep HOME', output: 'HOME=/home/adventurer', description: 'Tadiavo ny variable lahatahiry manaokana' },
    ],
    practiceExercises: [
      { instruction: 'Mamorona variable antsoina hoe GREETING miaraka amin\'ny sanda "Hello"', expectedCommand: 'GREETING="Hello"', hint: 'Ampiasao ny syntaxe ANARANA=sanda (tsy misy habaka manodidina ny =)' },
      { instruction: 'Asehoy ny sandan\'ny variable PATH', expectedCommand: 'echo $PATH', hint: 'Ampiasao $ hidirana amin\'ny sandan\'ny variables' },
    ],
  },

  lesson_ch8_02: {
    id: 'lesson_ch8_02', chapterId: 'ch8', title: 'Fikorianan\'ny fifehezan-tasa', order: 2,
    estimatedReadTime: '7 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'If / Else' },
      { type: 'paragraph', text: 'Ny fehezanteny if dia manandrana fepetra. Ampiasao [[ ]] ho an\'ny fanehoana fitsapana (tsara indrindra noho ny syntaxe tranainy [ ]).' },
      { type: 'code', command: 'if [[ -f "config.txt" ]]; then\n  echo "Config found"\nelse\n  echo "Config missing"\nfi', output: 'Config found' },
      { type: 'heading', text: 'Operateur fitsapana mahazatra' },
      { type: 'table', headers: ['Fitsapana', 'Dikany'], rows: [
        ['-f file', 'Misy ny rakitra ary rakitra mahazatra'],
        ['-d dir', 'Misy ny lahatahiry'],
        ['-z "$var"', 'Banga ny variable'],
        ['-n "$var"', 'Tsy banga ny variable'],
        ['$a -eq $b', 'Mitovy ny isa'],
        ['$a == $b', 'Mitovy ny tady'],
      ]},
      { type: 'heading', text: 'Boucle for' },
      { type: 'code', command: 'for file in *.txt; do\n  echo "Processing $file"\ndone', output: 'Processing notes.txt\nProcessing readme.txt' },
      { type: 'heading', text: 'Boucle while' },
      { type: 'code', command: 'count=1\nwhile [[ $count -le 5 ]]; do\n  echo "Count: $count"\n  ((count++))\ndone', output: 'Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5' },
      { type: 'tip', text: 'Ampiasao "set -e" eo amin\'ny tampony amin\'ny scripts hialana amin\'ny fahadisoana. Izany dia misakana ny scripts tsy hanohy aorian\'ny fahadisoana.' },
    ],
    examples: [
      { input: 'for i in 1 2 3; do echo $i; done', output: '1\n2\n3', description: 'Boucle tsotra amin\'ny lisitra' },
      { input: '[[ -d /tmp ]] && echo "exists"', output: 'exists', description: 'Fitsapana fepetra haingana amin\'ny andalana iray' },
    ],
    practiceExercises: [
      { instruction: 'Jereo raha misy ny rakitra antsoina hoe test.txt', expectedCommand: '[[ -f test.txt ]] && echo "exists"', hint: 'Ampiasao [[ -f anarandrakitra ]] hitsapana ny fisian\'ny rakitra' },
      { instruction: 'Ataovy boucle amin\'ny isa 1 ka hatramin\'ny 3', expectedCommand: 'for i in 1 2 3; do echo $i; done', hint: 'Ampiasao boucle for miaraka amin\'ny lisitry ny sanda' },
    ],
  },

  lesson_ch8_03: {
    id: 'lesson_ch8_03', chapterId: 'ch8', title: 'Fonctions sy arguments', order: 3,
    estimatedReadTime: '6 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Argumentin\'ny script' },
      { type: 'paragraph', text: 'Ny scripts dia mandray arguments amin\'ny alalan\'ny variables manokana:' },
      { type: 'table', headers: ['Variable', 'Dikany'], rows: [
        ['$0', 'Anaran\'ny script'],
        ['$1, $2, ...', 'Argument voalohany, faharoa, ...'],
        ['$@', 'Arguments rehetra ho teny samihafa'],
        ['$#', 'Isan\'ny arguments'],
        ['$?', 'Kaody fivoahana avy amin\'ny baiko farany'],
      ]},
      { type: 'heading', text: 'Mamaritra fonctions' },
      { type: 'code', command: 'greet() {\n  echo "Hello, $1! Welcome to $2."\n}\ngreet "Adventurer" "Kingdom"', output: 'Hello, Adventurer! Welcome to Kingdom.' },
      { type: 'heading', text: 'Kaody fivoahana' },
      { type: 'paragraph', text: 'Ny baiko tsirairay dia mamerina kaody fivoahana: 0 dia midika fahombiazana, sanda hafa dia midika tsy fahombiazana. Ampiasao $? hijerena ny kaody fivoahana farany. Ampiasao exit N amin\'ny scripts hamerenana kaody manokana.' },
      { type: 'code', command: 'ls /nonexistent\necho $?', output: 'ls: cannot access /nonexistent\n2' },
      { type: 'tip', text: 'Jereo foana ny kaody fivoahana ao amin\'ny scripts. Ampiasao "set -e" hialana automatique amin\'ny fahadisoana, na jereo $? aorian\'ny baiko lehibe.' },
    ],
    examples: [
      { input: 'echo $?', output: '0', description: 'Jereo raha nahomby ny baiko farany (0 = fahombiazana)' },
      { input: 'add() { echo $(($1 + $2)); }; add 5 3', output: '8', description: 'Mamaritra sy miantso fonction tsotra' },
    ],
    practiceExercises: [
      { instruction: 'Jereo ny kaody fivoahana avy amin\'ny baiko farany', expectedCommand: 'echo $?', hint: '$? dia mitahiry ny kaody fivoahana avy amin\'ny baiko natao teo aloha' },
      { instruction: 'Asehoy ny isan\'ny arguments nalefa tamin\'ny shell ankehitriny', expectedCommand: 'echo $#', hint: '$# dia misy ny isan\'ny paramètres positionnels' },
    ],
  },

  // ═══════════════════════ TOKO 9: Tambajotra ═══════════════════════
  lesson_ch9_01: {
    id: 'lesson_ch9_01', chapterId: 'ch9', title: 'Fototry ny tambajotra', order: 1,
    estimatedReadTime: '5 min', keyCommands: ['ping', 'hostname', 'ip'],
    content: [
      { type: 'heading', text: 'Manamarina ny fifandraisana (ping)' },
      { type: 'paragraph', text: 'ping dia mandefa paquet ICMP hitsapana raha azo tratrarina ny host iray ary mandrefy ny fotoana mandeha-miverina. Ampiasao Ctrl+C hijanonana.' },
      { type: 'code', command: 'ping -c 3 google.com', output: '64 bytes from google.com: time=12.3 ms\n64 bytes from google.com: time=11.8 ms\n64 bytes from google.com: time=12.1 ms' },
      { type: 'heading', text: 'Ny maha-izy anao eo amin\'ny tambajotra' },
      { type: 'code', command: 'hostname', output: 'kingdom-server' },
      { type: 'code', command: 'ip addr show', output: 'inet 192.168.1.100/24 ...' },
      { type: 'heading', text: 'Fikarohana DNS' },
      { type: 'paragraph', text: 'Ny DNS dia mandika ny anaran-tsehatra ho adiresy IP. Ampiasao nslookup na dig hanontaniana ny DNS.' },
      { type: 'code', command: 'nslookup google.com', output: 'Name: google.com\nAddress: 142.250.80.46' },
      { type: 'heading', text: 'Manaraka ny lalana' },
      { type: 'paragraph', text: 'traceroute dia mampiseho ny lalana izay entin\'ny paquet hahatongavana amin\'ny tanjona, manisa ny saut tsirairay eo amin\'ny lalana.' },
      { type: 'tip', text: 'Ampiasao ping -c N handefasana paquet N marina fa tsy ping tsy misy fetra.' },
    ],
    examples: [
      { input: 'ping -c 1 localhost', output: '64 bytes from 127.0.0.1: time=0.03 ms', description: 'Mangina anao manokana (localhost = 127.0.0.1)' },
      { input: 'hostname -I', output: '192.168.1.100', description: 'Asehoy ny adiresy IP anao' },
    ],
    practiceExercises: [
      { instruction: 'Ping-eo ny localhost indray mandeha hitsapana ny tambajotra', expectedCommand: 'ping -c 1 localhost', hint: 'Ampiasao ping -c 1 handefa paquet iray tokana' },
      { instruction: 'Asehoy ny anaran\'ny hostanao', expectedCommand: 'hostname', hint: 'Ny baiko hostname dia mampiseho ny anaran\'ny rafitra' },
    ],
  },

  lesson_ch9_02: {
    id: 'lesson_ch9_02', chapterId: 'ch9', title: 'Misintona sy mamindra', order: 2,
    estimatedReadTime: '6 min', keyCommands: ['curl', 'wget', 'scp'],
    content: [
      { type: 'heading', text: 'curl - Mamindra angona' },
      { type: 'paragraph', text: 'curl dia mamindra angona avy amin\'ny/mankany amin\'ny URLs. Manohana HTTP, HTTPS, FTP sy protokola maro hafa. Izy no couteau suisse amin\'ny fitaovan\'ny tambajotra.' },
      { type: 'code', command: 'curl -O https://example.com/file.zip', output: '% Total    % Received  Speed\n100 1024k  100 1024k   500k  0:00:02' },
      { type: 'heading', text: 'wget - Misintona rakitra' },
      { type: 'paragraph', text: 'wget dia natao hisintona rakitra. Manohana ny fisintona recursive, ny famerenana ny fisintona tapaka ary ny fanaovana miroir tranonkala.' },
      { type: 'code', command: 'wget https://example.com/data.csv', output: 'Saving to: data.csv\ndata.csv    100%[========>] 1.02M  500KB/s' },
      { type: 'heading', text: 'scp - Kopia azo antoka' },
      { type: 'paragraph', text: 'scp dia mandika rakitra eo amin\'ny milina amin\'ny alalan\'ny SSH. Ny syntaxe dia toy ny cp nefa miaraka amin\'ny prefix host lavitra.' },
      { type: 'code', command: 'scp file.txt user@server:/home/user/', output: 'file.txt     100%  1024   500.0KB/s  00:00' },
      { type: 'heading', text: 'rsync - Synchronisation marani-tsaina' },
      { type: 'paragraph', text: 'rsync dia mampifanentana rakitra amin\'ny fomba mahomby amin\'ny alalan\'ny famindrana ny fahasamihafana ihany. Tsara ho an\'ny tahiry sy ny deployment.' },
      { type: 'tip', text: 'curl -I dia maka ny en-tête HTTP ihany. Mahasoa hijerena raha mety ny URL tsy misintona ny votoatiny manontolo.' },
    ],
    examples: [
      { input: 'curl -I https://example.com', output: 'HTTP/2 200\ncontent-type: text/html\ncontent-length: 1256', description: 'Jereo ny en-tête HTTP amin\'ny URL' },
      { input: 'wget -c https://example.com/large-file.zip', output: 'Continuing at byte position 512000...', description: 'Avereno ny fisintona tapaka' },
    ],
    practiceExercises: [
      { instruction: 'Sintonina rakitra avy amin\'ny URL amin\'ny wget', expectedCommand: 'wget https://example.com/file.txt', hint: 'Ampiasao wget arahin\'ny URL' },
      { instruction: 'Jereo ny en-tête HTTP amin\'ny tranokala', expectedCommand: 'curl -I https://example.com', hint: 'Ampiasao curl miaraka amin\'ny drapeau -I ho an\'ny en-tête ihany' },
    ],
  },

  lesson_ch9_03: {
    id: 'lesson_ch9_03', chapterId: 'ch9', title: 'Fidirana lavitra (SSH)', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['ssh'],
    content: [
      { type: 'heading', text: 'Inona ny SSH?' },
      { type: 'paragraph', text: 'SSH (Secure Shell) dia manome fidirana lavitra voasifotra amin\'ny milina hafa. Manova ny protokola tranainy tsy azo antoka toy ny telnet sy rlogin.' },
      { type: 'code', command: 'ssh user@hostname', output: 'user@hostname:~$' },
      { type: 'heading', text: 'Fanamarinana amin\'ny fanalahidy SSH' },
      { type: 'paragraph', text: 'Ny fanamarinana amin\'ny teny miafina dia mora fa ny fanalahidy dia azo antoka kokoa. Mamorona andian-tanalahidy amin\'ny ssh-keygen ary adikao ny fanalahidy iombonana mankany amin\'ny lohamilina.' },
      { type: 'code', command: 'ssh-keygen -t ed25519', output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in ~/.ssh/id_ed25519' },
      { type: 'code', command: 'ssh-copy-id user@server', output: 'Number of key(s) added: 1' },
      { type: 'heading', text: 'Rakitry ny fanamboarana SSH' },
      { type: 'paragraph', text: 'Mamorona ~/.ssh/config hitahirizana ny parametin\'ny fifandraisana. Dia mifandray amin\'ny ssh serveurko ihany fa tsy manoratra ny baiko feno.' },
      { type: 'tip', text: 'Ampiasao foana ny fanamarinana amin\'ny fanalahidy SSH amin\'ny production. Esory ny fanamarinana teny miafina amin\'ny lohamilina ho an\'ny fiarovana tsara kokoa.' },
      { type: 'warning', text: 'Aza zaraina mihitsy ny fanalahidy tsy iombonana (~/.ssh/id_ed25519). Ny fanalahidy iombonana ihany no zarao (rakitra .pub).' },
    ],
    examples: [
      { input: 'ssh -p 2222 admin@192.168.1.50', output: 'admin@server:~$', description: 'Mifandray amin\'ny SSH amin\'ny port tsy mahazatra' },
      { input: 'ssh user@server "ls /var/log"', output: 'syslog\nauth.log\ndpkg.log', description: 'Mandefa baiko lavitra tsy misy shell interactive' },
    ],
    practiceExercises: [
      { instruction: 'Mamorona andian-tanalahidy SSH vaovao', expectedCommand: 'ssh-keygen', hint: 'ssh-keygen dia mamorona andian-tanalahidy iombonana/tsy iombonana' },
      { instruction: 'Midira amin\'ny lohamilina lavitra amin\'ny 10.0.0.1 ho admin', expectedCommand: 'ssh admin@10.0.0.1', hint: 'Ampiasao ny endrika ssh mpampiasa@anaranan-host' },
    ],
  },

  // ═══════════════════════ TOKO 10: Fitantanana ═══════════════════════
  lesson_ch10_01: {
    id: 'lesson_ch10_01', chapterId: 'ch10', title: 'Fitantanana mpampiasa', order: 1,
    estimatedReadTime: '6 min', keyCommands: ['sudo', 'useradd', 'passwd'],
    content: [
      { type: 'heading', text: 'Ny mpampiasa Root sy sudo' },
      { type: 'paragraph', text: 'Root (UID 0) dia ny super-mpampiasa manana fidirana tsy voafetra. Aza miditra mivantana ho root mihitsy. Ampiasao sudo kosa handefa baiko tsirairay amin\'ny tombon-tsoa root.' },
      { type: 'code', command: 'sudo apt update', output: 'Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done' },
      { type: 'heading', text: 'Mitantana mpampiasa' },
      { type: 'list', items: ['useradd: mamorona mpampiasa vaovao', 'userdel: mamafa mpampiasa', 'usermod: manova ny toetran\'ny mpampiasa', 'passwd: manova ny teny miafina', 'groups: mampiseho ny mombamomba ny vondrona'] },
      { type: 'code', command: 'sudo useradd -m -s /bin/bash newuser', output: '' },
      { type: 'code', command: 'sudo passwd newuser', output: 'New password:\nRetype new password:\npasswd: password updated' },
      { type: 'heading', text: 'Rakitry ny fampahalalana mpampiasa' },
      { type: 'paragraph', text: '/etc/passwd dia misy ny kaonty mpampiasa, /etc/shadow dia misy ny teny miafina voahashed, ary /etc/group dia misy ny famaritana vondrona.' },
      { type: 'warning', text: 'Mitandrema tsara amin\'ny sudo. Jereo ny baiko tsirairay indroa alohan\'ny handefa azy ho root, indrindra ny baiko rm.' },
    ],
    examples: [
      { input: 'id', output: 'uid=1000(user) gid=1000(user) groups=1000(user),27(sudo)', description: 'Asehoy ny ID mpampiasa sy vondrona' },
      { input: 'sudo usermod -aG docker user', output: '', description: 'Manampy mpampiasa ao amin\'ny vondrona docker' },
    ],
    practiceExercises: [
      { instruction: 'Asehoy ny ID mpampiasa sy ny mombamomba ny vondrona', expectedCommand: 'id', hint: 'Ny baiko id dia mampiseho ny UID, GID sy vondrona' },
      { instruction: 'Asehoy ny vondrona rehetra misy anao', expectedCommand: 'groups', hint: 'Ny baiko groups dia mampiseho ny mombamomba ny vondrona' },
    ],
  },

  lesson_ch10_02: {
    id: 'lesson_ch10_02', chapterId: 'ch10', title: 'Fitantanana ny paquet', order: 2,
    estimatedReadTime: '5 min', keyCommands: [],
    content: [
      { type: 'heading', text: 'Inona ny mpitantana paquet?' },
      { type: 'paragraph', text: 'Ny mpitantana paquet dia mametraka, manavao ary mamafa rindrambaiko. Mitantana ny fiantehana automatique izy. Fizarana samihafa dia mampiasa mpitantana samihafa.' },
      { type: 'heading', text: 'Mpitantana paquet mahazatra' },
      { type: 'table', headers: ['Fizarana', 'Mpitantana', 'Ohatra fametrahana'], rows: [
        ['Ubuntu/Debian', 'apt', 'sudo apt install nginx'],
        ['Fedora/RHEL', 'dnf/yum', 'sudo dnf install nginx'],
        ['Arch', 'pacman', 'sudo pacman -S nginx'],
        ['Alpine', 'apk', 'sudo apk add nginx'],
      ]},
      { type: 'heading', text: 'Hetsika fototra amin\'ny apt' },
      { type: 'list', items: ['sudo apt update: manavao ny lisitry ny paquet', 'sudo apt upgrade: manavao ny paquet efa nametraha', 'sudo apt install anaranpaquet: mametraka paquet', 'sudo apt remove anaranpaquet: mamafa paquet', 'apt search motclé: mikaroka paquet'] },
      { type: 'tip', text: 'Mandehana apt update foana alohan\'ny apt install mba hitompoana fa mahazo ny dikan-teny farany amin\'ny paquet.' },
    ],
    examples: [
      { input: 'apt search editor', output: 'vim - Vi IMproved\nnano - small friendly text editor\nemacs - GNU Emacs editor', description: 'Mikaroka ny paquet hita' },
      { input: 'sudo apt install -y htop', output: 'Setting up htop (3.2.1) ...\nProcessing triggers...', description: 'Mametraka htop tsy misy fangatahana fanamafisana' },
    ],
    practiceExercises: [
      { instruction: 'Manavao ny lisitry ny paquet', expectedCommand: 'sudo apt update', hint: 'Ampiasao sudo apt update hanavao ny lisitry ny paquet' },
      { instruction: 'Karohy ny paquet mifandray amin\'ny "git"', expectedCommand: 'apt search git', hint: 'Ampiasao apt search arahin\'ny motclé' },
    ],
  },

  lesson_ch10_03: {
    id: 'lesson_ch10_03', chapterId: 'ch10', title: 'Fanaraha-maso ny rafitra', order: 3,
    estimatedReadTime: '6 min', keyCommands: ['df', 'du', 'free', 'uptime'],
    content: [
      { type: 'heading', text: 'Fampiasana ny kapila' },
      { type: 'paragraph', text: 'df dia mampiseho ny fampiasana habaky ny kapila amin\'ny rafi-drakitra. du dia mampiseho ny fampiasana habaka amin\'ny lahatahiry. Ny roa dia manohana -h ho an\'ny habe azo vakina.' },
      { type: 'code', command: 'df -h', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%\n/dev/sda2   200G  120G   72G  63%' },
      { type: 'code', command: 'du -sh /var/log', output: '1.2G\t/var/log' },
      { type: 'heading', text: 'Fampiasana ny fitadidiana' },
      { type: 'code', command: 'free -h', output: '              total   used   free   available\nMem:           16G    8.5G   3.2G   7.1G\nSwap:          4G     0.5G   3.5G' },
      { type: 'heading', text: 'Fotoana miasa sy enta-mavesatra' },
      { type: 'code', command: 'uptime', output: ' 14:30:00 up 45 days, 3:12,  2 users,  load average: 0.15, 0.10, 0.05' },
      { type: 'paragraph', text: 'Ny enta-mavesatra amin\'ny salan-disa dia mampiseho ny enta-mavesatry ny rafitra amin\'ny 1, 5, ary 15 minitra. Sanda ambonin\'ny isan\'ny CPU anao dia milaza fa mavesatra loatra ny rafitra.' },
      { type: 'heading', text: 'Asa voalamina (cron)' },
      { type: 'paragraph', text: 'crontab dia mandamina ny asa miverimberina. Ovay amin\'ny crontab -e. Endrika: minitra ora andro volana andron-kerinandro baiko.' },
      { type: 'code', command: 'crontab -l', output: '0 2 * * * /usr/local/bin/backup.sh\n*/5 * * * * /usr/bin/check-health.sh' },
      { type: 'tip', text: 'Ampiasao du -sh * | sort -rh | head -10 hahitana ny rakitra/lahatahiry 10 lehibe indrindra.' },
    ],
    examples: [
      { input: 'df -h /', output: 'Filesystem  Size  Used Avail Use%\n/dev/sda1    50G   30G   18G  63%', description: 'Jereo ny habaky ny rafi-drakitra fototra' },
      { input: 'free -h', output: 'Mem:  16G  8.5G  3.2G\nSwap: 4G   0.5G  3.5G', description: 'Jereo ny fampiasana ny fitadidiana sy swap' },
    ],
    practiceExercises: [
      { instruction: 'Jereo ny fampiasana habaky ny kapila amin\'ny endrika azo vakina', expectedCommand: 'df -h', hint: 'Ampiasao df -h ho an\'ny fampiasana kapila amin\'ny endrika azo vakina' },
      { instruction: 'Jereo ny fotoana niasan\'ny rafitra', expectedCommand: 'uptime', hint: 'uptime dia mampiseho ny fotoana niasan\'ny rafitra sy ny enta-mavesatra amin\'ny salan-disa' },
    ],
  },
};

// ──────────────────────── ASA FANAMPIANA ────────────────────────

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
