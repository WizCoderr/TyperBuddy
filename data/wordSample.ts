const commonWords = [
    'a', 'an', 'as', 'at', 'be', 'by', 'do', 'go', 'he', 'if', 'in', 'is', 'it', 'me', 'my', 'no',
    'of', 'on', 'or', 'so', 'to', 'up', 'us', 'we', 'am', 'are', 'can', 'did', 'for', 'get', 'got',
    'had', 'has', 'her', 'him', 'his', 'how', 'its', 'let', 'man', 'new', 'now', 'old', 'our', 'out',
    'see', 'she', 'the', 'too', 'try', 'use', 'was', 'way', 'who', 'why', 'yes', 'you', 'able', 'acid',
    'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'bank', 'base', 'bath', 'beam', 'bean',
    'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'bend', 'best', 'bike', 'bird', 'bite', 'blue', 'boat',
    'body', 'book', 'born', 'both', 'bowl', 'burn', 'busy', 'bust', 'cake', 'call', 'came', 'camp', 'care',
    'cars', 'case', 'cash', 'cast', 'cats', 'chef', 'chip', 'city', 'clap', 'clay', 'club', 'coat', 'code',
    'cold', 'come', 'cook', 'cool', 'cope', 'core', 'cost', 'crop', 'dark', 'data', 'date', 'dead', 'dear',
    'deep', 'desk', 'dial', 'diet', 'disk', 'dock', 'does', 'done', 'door', 'dose', 'down', 'draw',
    'drop', 'drug', 'drum', 'duel', 'duke', 'dust', 'duty', 'ease', 'east', 'easy', 'edge', 'else', 'even',
    'ever', 'evil', 'exam', 'exit', 'face', 'fact', 'fall', 'farm', 'fast', 'fear', 'feed', 'feel', 'file',
    'film', 'find', 'fire', 'firm', 'fish', 'five', 'flag', 'flat', 'flow', 'fold', 'food', 'foot', 'form',
    'four', 'free', 'from', 'fuel', 'full', 'fund', 'game', 'gate', 'girl', 'give', 'glad', 'glow', 'goal',
    'good', 'grab', 'gray', 'grow', 'hair', 'half', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head',
    'hear', 'heat', 'help', 'here', 'hide', 'high', 'hill', 'hold', 'hole', 'home', 'hope', 'horn', 'host',
    'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'join', 'jump', 'jury',
    'just', 'keep', 'kick', 'kill', 'kind', 'king', 'kiss', 'knee', 'knew', 'know', 'lack', 'lady', 'lake',
    'land', 'lane', 'last', 'late', 'lead', 'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list',
    'live', 'load', 'loan', 'lock', 'long', 'look', 'lose', 'lost', 'love', 'luck', 'made', 'make', 'male',
    'many', 'mark', 'mass', 'mate', 'mean', 'meat', 'meet', 'menu', 'mile', 'milk', 'mind', 'mine', 'miss',
    'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'near', 'neck', 'need', 'news', 'next', 'nice',
    'nine', 'none', 'nose', 'note', 'okay', 'once', 'only', 'open', 'oral', 'over', 'pace', 'pack', 'page',
    'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pile', 'pink', 'plan',
    'play', 'plot', 'plus', 'poll', 'pool', 'poor', 'port', 'post', 'pull', 'pure', 'push', 'race', 'rail',
    'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rest', 'rich', 'ride', 'ring', 'rise', 'rock',
    'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'rule', 'rush', 'safe', 'said', 'sail', 'sale',
    'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'self', 'sell', 'send', 'sent', 'ship',
    'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'sing', 'sink', 'site', 'size', 'skin', 'slip',
    'slow', 'snow', 'soap', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'soup',
    'spin', 'star', 'stay', 'step', 'stop', 'such', 'suit', 'sure', 'swim', 'tale', 'talk', 'tape', 'task',
    'team', 'tear', 'tell', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this',
    'thus', 'till', 'time', 'tiny', 'told', 'tone', 'took', 'tool', 'tops', 'torn', 'town', 'trap', 'tree',
    'trip', 'true', 'turn', 'type', 'unit', 'upon', 'user', 'vast', 'very', 'view', 'vote', 'wait', 'walk',
    'wall', 'want', 'warm', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'what',
    'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wipe', 'wire', 'wise', 'wish',
    'with', 'wolf', 'wood', 'word', 'wore', 'work', 'wrap', 'yard', 'yeah', 'year', 'your', 'zero', 'zone',
    'abide', 'about', 'above', 'abuse', 'actor', 'adapt', 'adopt', 'adult', 'after', 'again', 'agent', 'agree',
    'ahead', 'alarm', 'album', 'alert', 'alike', 'alive', 'allow', 'alone', 'along', 'alter', 'amaze', 'among',
    'anger', 'angle', 'angry', 'ankle', 'annoy', 'antic', 'anymore', 'apart', 'apple', 'apply', 'arena', 'argue',
    'arise', 'array', 'arrow', 'aside', 'asset', 'audio', 'audit', 'avoid', 'award', 'aware', 'awful', 'badge',
    'baker', 'ballet', 'banjo', 'basic', 'batch', 'bathe', 'beach', 'began', 'begin', 'being', 'belly', 'below',
    'bench', 'bible', 'birth', 'black', 'blade', 'blend', 'bless', 'blind', 'block', 'blond', 'blood', 'bloom',
    'board', 'bonus', 'boost', 'booth', 'bound', 'brace', 'brand', 'brave', 'bread', 'break', 'breed', 'brick',
    'bride', 'brief', 'bring', 'broad', 'broken', 'brook', 'brown', 'brush', 'buddy', 'build', 'built', 'bunch',
    'burst', 'cabin', 'cable', 'cage', 'cake', 'camp', 'can', 'cap', 'car', 'card', 'case', 'cast', 'cat',
    'cell', 'chair', 'chase', 'chef', 'chest', 'chief', 'chin', 'chip', 'city', 'clay', 'club', 'coal', 'code',
    'coin', 'cold', 'come', 'cook', 'cool', 'copy', 'core', 'cost', 'coup', 'crew', 'crop', 'cure', 'cute',
    'cyc', 'cycle', 'dare', 'dark', 'data', 'date', 'dawn', 'dead', 'deal', 'dean', 'dear', 'debt', 'deep',
    'deny', 'desk', 'dial', 'dice', 'dine', 'disk', 'dive', 'dock', 'does', 'dog', 'doll', 'done', 'door',
    'dot', 'down', 'dozen', 'draft', 'drag', 'draw', 'dress', 'drew', 'dried', 'drill', 'drink', 'drive', 'drop',
    'drum', 'dry', 'duck', 'dude', 'due', 'dust', 'duty', 'each', 'eager', 'eagle', 'ear', 'earth', 'east',
    'easy', 'eat', 'echo', 'edge', 'edit', 'eerie', 'egg', 'elf', 'else', 'end', 'enjoy', 'enough', 'entry',
    'envy', 'equal', 'erase', 'error', 'essay', 'etc', 'evade', 'even', 'event', 'evil', 'excess', 'exit',
    'extra', 'eye', 'face', 'fact', 'fade', 'fail', 'fair', 'false', 'fame', 'fan', 'fare', 'farm', 'fast',
    'fax', 'fear', 'feast', 'feed', 'feel', 'few', 'fiber', 'film', 'final', 'fit', 'fix', 'flag', 'flame',
    'flat', 'flaw', 'flex', 'flip', 'flow', 'flu', 'flux', 'fly', 'foam', 'focus', 'fog', 'foil', 'fold',
    'folk', 'food', 'fool', 'for', 'force', 'fork', 'form', 'fox', 'frame', 'freeze', 'fresh', 'frog', 'from',
    'front', 'frost', 'frown', 'fruit', 'fuel', 'fun', 'fury', 'gadget', 'gain', 'game', 'gap', 'garlic',
    'gas', 'gear', 'genius', 'get', 'gift', 'gig', 'girl', 'give', 'glad', 'glide', 'glove', 'glow', 'goat',
    'gold', 'gone', 'good', 'goose', 'got', 'grab', 'grade', 'grain', 'grant', 'gray', 'green', 'greet', 'grid',
    'grief', 'grit', 'groom', 'gross', 'group', 'grow', 'guard', 'guess', 'guest', 'guide', 'gulf', 'gulp',
    'gun', 'guru', 'gut', 'guy', 'gym', 'habit', 'hair', 'half', 'hall', 'halt', 'hand', 'happy', 'hard',
    'harm', 'harsh', 'hat', 'hate', 'haul', 'have', 'hawk', 'haze', 'head', 'heal', 'heap', 'heart', 'heat',
    'heir', 'help', 'her', 'here', 'hero', 'hike', 'hint', 'hip', 'hire', 'hit', 'hold', 'holy', 'home',
    'honey', 'hood', 'hope', 'horn', 'horse', 'host', 'hot', 'hotel', 'hour', 'huge', 'hug', 'human', 'humble',
    'humor', 'hunt', 'hurry', 'hurt', 'ice', 'icon', 'idea', 'idle', 'idol', 'ill', 'image', 'impact', 'imply',
    'inch', 'index', 'info', 'ink', 'inn', 'input', 'into', 'ion', 'iron', 'island', 'item', 'jazz', 'jet',
    'job', 'join', 'joke', 'joy', 'judo', 'juice', 'july', 'jump', 'june', 'jury', 'just', 'keen', 'keep',
    'kept', 'kick', 'kid', 'kill', 'kind', 'king', 'kiss', 'kit', 'kite', 'knee', 'knew', 'knit', 'knob',
    'know', 'lab', 'lack', 'lady', 'laid', 'lake', 'lamb', 'lamp', 'land', 'lane', 'lap', 'last', 'late',
    'lava', 'law', 'lay', 'lazy', 'lead', 'leaf', 'lean', 'learn', 'led', 'left', 'leg', 'let', 'level',
    'lid', 'lie', 'life', 'lift', 'light', 'like', 'line', 'lip', 'list', 'live', 'load', 'loaf', 'loan',
    'lob', 'lock', 'log', 'lonely', 'long', 'look', 'loop', 'lord', 'lose', 'loss', 'lost', 'lot', 'loud',
    'love', 'low', 'luck', 'lunch', 'lung', 'lure', 'lush', 'lyric', 'mad', 'magic', 'maid', 'mail', 'main',
    'major', 'make', 'malt', 'map', 'march', 'mare', 'mark', 'mask', 'mass', 'match', 'mate', 'max', 'may',
    'meal', 'mean', 'meant', 'meat', 'meet', 'menu', 'merit', 'mesh', 'mess', 'met', 'mild', 'mile', 'milk',
    'mill', 'mimic', 'min', 'mind', 'mint', 'minus', 'mist', 'mix', 'moan', 'mobil', 'mode', 'mold', 'moon',
    'more', 'most', 'motor', 'mount', 'mourn', 'mouse', 'move', 'much', 'muff', 'mule', 'multiply', 'murmur',
    'muse', 'music', 'mute', 'mutter', 'myth', 'nail', 'name', 'nape', 'napkin', 'narrow', 'near', 'neat',
    'neck', 'need', 'nephew', 'nest', 'net', 'new', 'nice', 'nickel', 'night', 'noble', 'nose', 'note', 'noun',
    'nurse', 'nylon', 'oar', 'odd', 'oil', 'old', 'olive', 'omit', 'one', 'only', 'open', 'opt', 'orange',
    'orbit', 'organ', 'other', 'ouch', 'our', 'out', 'oval', 'oven', 'over', 'owl', 'own', 'pace', 'pack',
    'pact', 'pad', 'page', 'paid', 'pain', 'paint', 'pair', 'pal', 'palm', 'panel', 'panic', 'paper', 'pap',
    'parade', 'park', 'part', 'party', 'pass', 'past', 'patch', 'patrol', 'pause', 'paw', 'pay', 'peace',
    'peach', 'peak', 'pear', 'peck', 'peek', 'pen', 'penny', 'pep', 'perch', 'peril', 'pet', 'phase', 'phone',
    'photo', 'piano', 'pick', 'pie', 'pig', 'pin', 'pine', 'ping', 'pink', 'pint', 'pipe', 'pitch', 'pit',
    'pity', 'plank', 'plate', 'play', 'plow', 'plug', 'plum', 'plus', 'poem', 'poet', 'poison', 'poke', 'pole',
    'poll', 'polo', 'pond', 'pony', 'pool', 'poor', 'pop', 'porch', 'pore', 'pork', 'port', 'pose', 'post',
    'pot', 'pouch', 'pound', 'pour', 'pray', 'preach', 'press', 'prey', 'price', 'pride', 'prime', 'print',
    'prior', 'prize', 'probe', 'prod', 'proof', 'prop', 'pry', 'pub', 'puff', 'pull', 'pulp', 'punch', 'punk',
    'pup', 'pure', 'purse', 'push', 'put', 'quack', 'quad', 'quart', 'queer', 'quest', 'quick', 'quiet',
    'quilt', 'quit', 'quiz', 'quorum', 'race', 'rack', 'radio', 'raft', 'rag', 'rage', 'raid', 'rail', 'rain',
    'rake', 'ram', 'rank', 'rant', 'rap', 'rash', 'rat', 'rate', 'raw', 'ray', 'razor', 'reach', 'read',
    'real', 'ream', 'rear', 'reb', 'red', 'reed', 'reef', 'reel', 'refer', 'reign', 'rein', 'rent', 'rest',
    'rib', 'rice', 'rich', 'ride', 'ridge', 'rifle', 'right', 'rigid', 'ring', 'rink', 'rip', 'rise', 'risk',
    'rite', 'rival', 'road', 'roam', 'roar', 'roast', 'robe', 'rock', 'rod', 'role', 'roll', 'roof', 'rook',
    'room', 'root', 'rope', 'rose', 'rot', 'rough', 'round', 'route', 'row', 'rub', 'rude', 'rug', 'ruin',
    'rule', 'rum', 'run', 'rune', 'rung', 'runt', 'rush', 'rust', 'sack', 'sad', 'safe', 'sail', 'saint',
    'sake', 'sale', 'salt', 'same', 'sand', 'sap', 'sash', 'sat', 'save', 'saw', 'say', 'scam', 'scan',
    'scar', 'scare', 'scarf', 'scary', 'scene', 'scent', 'scheme', 'scholar', 'school', 'scoff', 'scold',
    'scope', 'score', 'scorn', 'scout', 'scowl', 'scrap', 'screw', 'script', 'scrub', 'scum', 'sea', 'seal',
    'seam', 'sear', 'season', 'seat', 'second', 'secret', 'see', 'seed', 'seek', 'seem', 'seen', 'seize',
    'self', 'sell', 'send', 'sense', 'sent', 'serve', 'set', 'settle', 'seven', 'shack', 'shade', 'shady',
    'shaft', 'shake', 'shall', 'sham', 'shape', 'share', 'sharp', 'shave', 'shear', 'shed', 'sheen', 'sheer',
    'sheet', 'shelf', 'shell', 'shelve', 'shepherd', 'shield', 'shift', 'shine', 'shiny', 'ship', 'shirt',
    'shock', 'shoe', 'shook', 'shoot', 'shop', 'shore', 'short', 'shot', 'shout', 'show', 'shrank', 'shred',
    'shrew', 'shriek', 'shrink', 'shrub', 'shrug', 'shun', 'shush', 'shut', 'shy', 'sick', 'side', 'siege',
    'sigh', 'sight', 'sign', 'silk', 'silly', 'silver', 'simple', 'since', 'sing', 'sink', 'sip', 'sir',
    'sister', 'sit', 'site', 'six', 'sixth', 'size', 'skate', 'sketch', 'skew', 'ski', 'skill', 'skin', 'skip',
    'skirt', 'skull', 'slam', 'slap', 'slay', 'sled', 'sleep', 'sleet', 'slept', 'slice', 'slide', 'slim',
    'sling', 'slip', 'slit', 'slow', 'slug', 'slum', 'slump', 'smack', 'small', 'smart', 'smash', 'smell',
    'smile', 'smoke', 'snack', 'snap', 'snarl', 'snatch', 'sneak', 'sneer', 'sniff', 'snip', 'snob', 'snoop',
    'snot', 'snout', 'snow', 'snub', 'snuff', 'soak', 'soap', 'sober', 'soccer', 'sock', 'sod', 'soft',
    'soil', 'solar', 'sold', 'sole', 'solid', 'solo', 'solve', 'some', 'son', 'song', 'soon', 'soot', 'sore',
    'sort', 'soul', 'sound', 'soup', 'sour', 'south', 'space', 'spade', 'spare', 'spark', 'spat', 'speak',
    'spear', 'spell', 'spend', 'spent', 'spice', 'spicy', 'spill', 'spin', 'spine', 'spit', 'spite', 'splat',
    'split', 'spoil', 'spoke', 'sponge', 'spook', 'spool', 'spoon', 'sport', 'spot', 'spouse', 'spray', 'spree',
    'spring', 'sprout', 'spud', 'spun', 'spur', 'spy', 'squad', 'square', 'squash', 'squid', 'stab', 'stack',
    'staff', 'stag', 'stage', 'stain', 'stair', 'stake', 'stale', 'stamp', 'stand', 'stare', 'starve', 'state',
    'stay', 'steak', 'steal', 'steam', 'steed', 'steel', 'steep', 'steer', 'stem', 'step', 'stern', 'stick',
    'stiff', 'still', 'sting', 'stint', 'stir', 'stock', 'stole', 'stomp', 'stone', 'stony', 'stood', 'stool',
    'stoop', 'stop', 'store', 'storm', 'story', 'stout', 'stove', 'strain', 'straw', 'stray', 'streak',
    'stream', 'street', 'strew', 'strife', 'strike', 'string', 'strip', 'strive', 'stroll', 'struck', 'strum',
    'strung', 'stuck', 'stud', 'study', 'stuff', 'stump', 'stung', 'stunt', 'style', 'sub', 'such', 'suck',
    'sue', 'suit', 'sum', 'summit', 'sun', 'sunk', 'sure', 'surf', 'surge', 'swab', 'swag', 'swam', 'swamp',
    'swan', 'swarm', 'swat', 'sway', 'swear', 'sweat', 'sweep', 'sweet', 'swell', 'swept', 'swift', 'swim',
    'swing', 'swipe', 'swirl', 'swish', 'switch', 'sword', 'swore', 'sworn', 'swung', 'syrup', 'table',
    'taboo', 'tack', 'tact', 'tail', 'take', 'tale', 'talk', 'tall', 'tame', 'tank', 'tap', 'tape', 'taps',
    'tar', 'target', 'task', 'taste', 'taunt', 'tax', 'teach', 'team', 'tear', 'tease', 'tech', 'teem', 'teen',
    'tell', 'tend', 'tense', 'tent', 'term', 'tern', 'test', 'text', 'thank', 'that', 'theft', 'theme',
    'then', 'there', 'they', 'thick', 'thin', 'thing', 'think', 'third', 'this', 'thorn', 'those', 'thou',
    'though', 'thread', 'threat', 'three', 'threw', 'throb', 'thru', 'thud', 'thumb', 'thump', 'thus', 'tick',
    'tide', 'tidy', 'tie', 'tied', 'tier', 'tiff', 'tiger', 'tile', 'till', 'tilt', 'time', 'tin', 'tint',
    'tiny', 'tip', 'tire', 'tired', 'tissue', 'title', 'toad', 'toast', 'today', 'toe', 'toil', 'token',
    'told', 'toll', 'tom', 'tomato', 'tomb', 'tone', 'tongue', 'ton', 'tony', 'took', 'tool', 'tooth',
    'top', 'topic', 'torch', 'tore', 'torn', 'toss', 'total', 'touch', 'tough', 'tour', 'tout', 'towel',
    'tower', 'town', 'toy', 'trace', 'track', 'trade', 'trail', 'train', 'trait', 'tram', 'tramp', 'trap',
    'trash', 'travel', 'tray', 'tread', 'treat', 'tree', 'trek', 'trend', 'trial', 'tribe', 'trick', 'tried',
    'trim', 'trio', 'trip', 'trite', 'trod', 'troop', 'trot', 'trout', 'troy', 'truck', 'true', 'trunk',
    'truss', 'trust', 'truth', 'try', 'tube', 'tuck', 'tune', 'turf', 'turn', 'tusk', 'tutor', 'twin', 'twist',
    'tycoon', 'type', 'ugly', 'ultra', 'uncle', 'under', 'undo', 'unify', 'union', 'unit', 'unity', 'urge',
    'use', 'usher', 'usual', 'vain', 'valid', 'value', 'vast', 'vat', 'veal', 'veil', 'vein', 'venom', 'vent',
    'verb', 'verge', 'verse', 'versus', 'vessel', 'vest', 'vex', 'via', 'vial', 'vice', 'video', 'view', 'vigil',
    'vile', 'vine', 'visa', 'vise', 'visit', 'visor', 'vocal', 'vodka', 'vogue', 'voice', 'void', 'volt',
    'voter', 'vowel', 'vow', 'wad', 'wade', 'wage', 'wag', 'wage', 'wage', 'wag', 'wagon', 'wait', 'walk',
    'wall', 'wallet', 'wall', 'walnut', 'walnut', 'waltz', 'wand', 'want', 'war', 'ward', 'warn', 'warp',
    'wars', 'war', 'wart', 'wash', 'waste', 'watch', 'water', 'wave', 'wavy', 'wax', 'way', 'weak', 'weal',
    'wean', 'wear', 'web', 'wed', 'weed', 'week', 'weep', 'weld', 'well', 'welt', 'went', 'wept', 'were',
    'west', 'wet', 'whale', 'wharf', 'what', 'wheat', 'wheel', 'when', 'whip', 'whir', 'whisk', 'white',
    'whole', 'whom', 'whore', 'wick', 'widow', 'width', 'wield', 'wife', 'wild', 'will', 'wilt', 'wimp',
    'wind', 'wine', 'wing', 'wink', 'win', 'wipe', 'wire', 'wiry', 'wise', 'wish', 'wisp', 'with', 'wit',
    'wok', 'woke', 'wolf', 'woman', 'won', 'wont', 'wood', 'wool', 'word', 'work', 'worm', 'worn', 'worry',
    'worse', 'worth', 'wound', 'woven', 'wrap', 'wreck', 'wren', 'wring', 'wrist', 'write', 'wrong', 'wrote',
    'yard', 'yawn', 'year', 'yes', 'yet', 'yield', 'yolk', 'young', 'youth', 'zap', 'zeal', 'zebra', 'zero',
    'zest', 'zinc', 'zip', 'zone', 'zoom'
];

const character = 'abcdefghijklmnopqrstuvwxyz'
const punctuation = '.,!?;:"\'-_';
const brackets = '{}[]()'
const numbers = '0123456789'


function random(to: number) {
    return Math.floor(Math.random() * to)
}

export function generateSentence(count: number, addPunctuation: boolean, addCapital: boolean, addBracket: boolean = false, addNumber: boolean = false) {
    let sentence = ''
    for (let index = 0; index < count; index++) {

        // get random word
        const word = commonWords[random((commonWords.length - 1))]

        // calculating word mixing count
        const wordMixCount = random(3)
        let mixWord = ''

        // word mix probability is 50%
        if (Math.random() > 0.5) {
            for (let index2 = 0; index2 < wordMixCount; index2++) {
                mixWord += character[random(character.length - 1)]
            }
        }


        // word mix position
        const wordMixIndex = random(word.length - 1)

        // generating new word
        const left = word.slice(0, wordMixIndex)
        const right = word.slice(wordMixIndex, word.length)
        let newWord = left + mixWord + right


        // add capital
        if (addCapital) {
            if (Math.random() > 0.5) {        // capital add probability
                newWord = newWord[0].toUpperCase() + newWord.slice(1, newWord.length)
            }
        }

        // add bracket
        if (addBracket) {
            if (Math.random() > 0.5) {        // add probability
                newWord = newWord.slice(1, newWord.length) + brackets[random(brackets.length - 1)]
            }
        }

        // add number
        if (addNumber) {
            if (Math.random() > 0.5) {        // add probability
                newWord = newWord.slice(1, newWord.length) + numbers[random(numbers.length - 1)]
            }
        }



        // add punctuation
        if (addPunctuation) {
            if (Math.random() > 0.5) {            // punctuation add probability
                sentence += newWord + punctuation[random(punctuation.length - 1)] + ' '
            } else {
                sentence += newWord + ' '
            }
        } else {
            sentence += newWord + ' '
        }
    }

    return sentence
}
