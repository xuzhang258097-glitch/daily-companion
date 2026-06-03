/**
 * Daily Companion — 趣味英文小故事阅读专区
 * 每日推送10篇短篇趣味故事，提升英文阅读能力
 */

const StoriesDB = {
  // 故事库
  stories: [
    {
      id: 1,
      title: "The Clever Fox",
      titleCn: "聪明的狐狸",
      level: "初级",
      wordCount: 128,
      content: `Once upon a time, there was a clever fox living in a big green forest. He was very hungry one hot summer day. He walked around looking for food. Suddenly, he saw a crow sitting on a tall tree branch. The crow had a big piece of cheese in her beak. The fox wanted that cheese very much. He looked up at the crow and said, "Good morning, beautiful bird! Your feathers are so shiny today. You must have the most lovely voice in the whole forest. Could you sing a song for me?" The silly crow opened her beak to sing. Down fell the cheese! The clever fox caught it and ran away with a big smile.`
    },
    {
      id: 2,
      title: "A Lucky Penny",
      titleCn: "幸运便士",
      level: "初级",
      wordCount: 135,
      content: `Little Tom was walking home from school on a rainy afternoon. He felt sad because he failed his math test. As he kicked a stone along the road, something shiny caught his eye. It was a bright copper penny lying in a small puddle. Tom picked it up and wiped it clean. "Find a penny, pick it up, and all day long you'll have good luck," he whispered the old rhyme. The next morning, Tom studied hard for his spelling test. He remembered every single word! When the teacher gave back the papers, Tom got a perfect score. He smiled and touched the lucky penny in his pocket.`
    },
    {
      id: 3,
      title: "The Lost Kitten",
      titleCn: "迷路的小猫",
      level: "初级",
      wordCount: 142,
      content: `Emily heard a soft crying sound behind the garden fence. She tiptoed closer and found a tiny orange kitten with big scared eyes. It was shivering in the cold wind. "Don't be afraid, little one," Emily said gently. She wrapped the kitten in her warm scarf and carried it home. Her mother helped her make a cozy bed from an old shoebox and a soft towel. Emily gave the kitten some warm milk. The kitten purred happily and fell asleep in her lap. Three days later, they found the owner, but the kind lady said Emily could keep the kitten. Emily named him Pumpkin, and they became best friends forever.`
    },
    {
      id: 4,
      title: "The Magic Seed",
      titleCn: "魔法的种子",
      level: "中级",
      wordCount: 156,
      content: `Old Mr. Green gave his grandson Ben a small brown seed. "Plant this in your garden and water it every day," he said with a mysterious smile. "But you must be patient." Ben dug a little hole and placed the seed carefully in the soil. Every morning, he watered it and watched. A week passed, then two. Nothing happened. Ben wanted to give up, but his grandfather's words echoed in his mind. On the twenty-first day, a tiny green sprout pushed through the earth! Ben jumped with joy. By summer, the seed had grown into a tall sunflower taller than Ben himself. "Patience is magic," Grandpa said, patting his shoulder.`
    },
    {
      id: 5,
      title: "The Best Gift",
      titleCn: "最好的礼物",
      level: "初级",
      wordCount: 118,
      content: `It was Mother's Day, and Lucy wanted to give her mom the best gift ever. She checked her piggy bank, but she only had two dollars. That was not enough for a fancy present from the store. Lucy sat at her desk and thought hard. Then she had a wonderful idea. She took out her crayons and drew a beautiful picture of her family having a picnic under a rainbow. Below the picture, she wrote in her best handwriting: "I love you more than all the stars in the sky." When her mother opened the handmade card, tears of happiness filled her eyes. She hugged Lucy tightly. "This is the most precious gift I have ever received," she said.`
    },
    {
      id: 6,
      title: "The Kind Robot",
      titleCn: "善良的机器人",
      level: "中级",
      wordCount: 148,
      content: `In a bright laboratory, scientist Dr. Lee built a small robot named Bolt. Bolt had shiny metal arms and glowing blue eyes. His job was to help clean the lab. One rainy evening, Bolt noticed a little sparrow with a broken wing hiding under the lab door. The bird could not fly away. Bolt gently picked up the tiny creature and placed it in a warm cardboard box. Every day, Bolt brought seeds and water to the sparrow. Dr. Lee watched this and smiled. "You were built to clean," he said, "but you learned to care. That makes you truly special." After two weeks, the sparrow spread its wings and flew into the blue sky. Bolt waved goodbye, feeling warm inside his metal chest.`
    },
    {
      id: 7,
      title: "The Little Star",
      titleCn: "小星星",
      level: "初级",
      wordCount: 132,
      content: `High up in the night sky, there lived a little star named Twinkle. She was the smallest star in the entire galaxy, and she felt invisible. All the big bright stars shone so beautifully, while her own light was faint and weak. One dark night, a lonely ship sailed on a vast ocean. The captain could not see anything in the thick fog. "If only we had some light to guide us," he sighed. Suddenly, the captain spotted a tiny but steady glow in the sky. It was Twinkle! Following her gentle light, the ship found its way safely home. Twinkle realized that even the smallest light can make a big difference when someone needs it most.`
    },
    {
      id: 8,
      title: "The Brave Mouse",
      titleCn: "勇敢的小老鼠",
      level: "中级",
      wordCount: 162,
      content: `In an old country house, a tiny mouse named Milo lived quietly behind the kitchen wall. All the other mice were terrified of Whiskers, the fierce farm cat. One autumn morning, the farmer's little daughter accidentally dropped her golden locket down a deep crack in the floor. The girl cried bitterly because the locket held her grandmother's photo. The crack was too narrow for any human hand. Milo watched from his hole. His heart beat fast, but he scurried forward bravely. He squeezed his small body into the dark crack. Down, down he climbed until his whiskers touched something cold and smooth. It was the locket! With great effort, Milo pushed it back up to the light. The girl squealed with delight and gave Milo a whole piece of cheese. From that day, Whiskers was told to leave Milo alone.`
    },
    {
      id: 9,
      title: "The Rainbow Bridge",
      titleCn: "彩虹桥",
      level: "中级",
      wordCount: 145,
      content: `After a heavy summer storm, the village children ran outside to play. They stopped and gasped at the sight before them. A magnificent rainbow arched across the sky, its colors vivid and bright. Little Mei pointed at the hill beyond the river. "Look! The rainbow ends right there! Let's find the treasure!" The children raced across the meadow, their feet splashing through puddles. When they reached the foot of the hill, they found no pot of gold. Instead, they discovered something even better. The storm had washed away an old stone wall, revealing a hidden grove of wild strawberry bushes heavy with sweet red fruit. The children laughed and shared the delicious berries. Mei smiled. "The real treasure was the adventure itself."`
    },
    {
      id: 10,
      title: "The Secret Garden",
      titleCn: "秘密花园",
      level: "中级",
      wordCount: 158,
      content: `Behind her grandmother's cottage, Anna found a rusty iron key under an old stone. Curious, she searched the overgrown backyard until she found a small wooden door covered in thick ivy. The key fit perfectly! Behind the door lay a forgotten garden. Wild roses climbed the crumbling walls, lavender filled the air with sweetness, and butterflies danced in the afternoon sun. But the garden was dry and thirsty. Every day that summer, Anna carried water from the well and pulled out weeds. Slowly, the flowers perked up and bloomed brighter than ever. On Grandmother's birthday, Anna led her through the ivy door. The old woman gasped with wonder. "This was my secret garden when I was a girl," she whispered, tears in her eyes. "I thought I had lost it forever."`
    }
  ],

  // 词汇表：覆盖所有故事中的重点词汇
  vocabulary: {
    // A
    "accidentally": { phonetic: "/ˌæksɪˈdentəli/", meaning: "意外地，偶然地" },
    "adventure": { phonetic: "/ədˈventʃə(r)/", meaning: "冒险，奇遇" },
    "arched": { phonetic: "/ɑːtʃt/", meaning: "呈拱形的" },
    // B
    "beak": { phonetic: "/biːk/", meaning: "鸟喙" },
    "beat": { phonetic: "/biːt/", meaning: "（心脏）跳动" },
    "bitterly": { phonetic: "/ˈbɪtəli/", meaning: "痛苦地，悲痛地" },
    "bloomed": { phonetic: "/bluːmd/", meaning: "开花" },
    "branch": { phonetic: "/brɑːntʃ/", meaning: "树枝，分支" },
    "brave": { phonetic: "/breɪv/", meaning: "勇敢的" },
    "bravely": { phonetic: "/ˈbreɪvli/", meaning: "勇敢地" },
    "bright": { phonetic: "/braɪt/", meaning: "明亮的，鲜艳的" },
    "broken": { phonetic: "/ˈbrəʊkən/", meaning: "破碎的，折断的" },
    "built": { phonetic: "/bɪlt/", meaning: "建造（build 的过去式）" },
    "bushes": { phonetic: "/ˈbʊʃɪz/", meaning: "灌木丛" },
    // C
    "cabin": { phonetic: "/ˈkæbɪn/", meaning: "小屋，船舱" },
    "cardboard": { phonetic: "/ˈkɑːdbɔːd/", meaning: "纸板，硬纸板" },
    "carefully": { phonetic: "/ˈkeəfəli/", meaning: "小心地，仔细地" },
    "caught": { phonetic: "/kɔːt/", meaning: "抓住（catch 的过去式）" },
    "century": { phonetic: "/ˈsentʃəri/", meaning: "世纪" },
    "cheese": { phonetic: "/tʃiːz/", meaning: "奶酪" },
    "climbed": { phonetic: "/klaɪmd/", meaning: "攀爬" },
    "cozy": { phonetic: "/ˈkəʊzi/", meaning: "舒适的，温暖的" },
    "copper": { phonetic: "/ˈkɒpə(r)/", meaning: "铜的" },
    "cottage": { phonetic: "/ˈkɒtɪdʒ/", meaning: "小屋，村舍" },
    "crack": { phonetic: "/kræk/", meaning: "裂缝，缝隙" },
    "creature": { phonetic: "/ˈkriːtʃə(r)/", meaning: "生物，动物" },
    "crumbling": { phonetic: "/ˈkrʌmblɪŋ/", meaning: "坍塌的，破碎的" },
    "curious": { phonetic: "/ˈkjʊəriəs/", meaning: "好奇的" },
    "crayons": { phonetic: "/ˈkreɪənz/", meaning: "蜡笔" },
    // D
    "delicious": { phonetic: "/dɪˈlɪʃəs/", meaning: "美味的" },
    "difference": { phonetic: "/ˈdɪfrəns/", meaning: "区别，不同" },
    "discovered": { phonetic: "/dɪˈskʌvəd/", meaning: "发现" },
    // E
    "echoed": { phonetic: "/ˈekəʊd/", meaning: "回响，回荡" },
    "effort": { phonetic: "/ˈefət/", meaning: "努力" },
    "entire": { phonetic: "/ɪnˈtaɪə(r)/", meaning: "整个的，全部的" },
    "ever": { phonetic: "/ˈevə(r)/", meaning: "曾经，永远" },
    // F
    "faint": { phonetic: "/feɪnt/", meaning: "微弱的，模糊的" },
    "failed": { phonetic: "/feɪld/", meaning: "失败，不及格" },
    "fancy": { phonetic: "/ˈfænsi/", meaning: "精致的，花哨的" },
    "farm": { phonetic: "/fɑːm/", meaning: "农场" },
    "feathers": { phonetic: "/ˈfeðəz/", meaning: "羽毛" },
    "fell": { phonetic: "/fel/", meaning: "落下（fall 的过去式）" },
    "fence": { phonetic: "/fens/", meaning: "栅栏，篱笆" },
    "fierce": { phonetic: "/fɪəs/", meaning: "凶猛的，激烈的" },
    "following": { phonetic: "/ˈfɒləʊɪŋ/", meaning: "跟随" },
    "forgotten": { phonetic: "/fəˈɡɒtn/", meaning: "被遗忘的" },
    // G
    "galaxy": { phonetic: "/ˈɡæləksi/", meaning: "星系，银河" },
    "garden": { phonetic: "/ˈɡɑːdn/", meaning: "花园" },
    "gasped": { phonetic: "/ɡɑːspt/", meaning: "倒吸一口气，喘息" },
    "generation": { phonetic: "/ˌdʒenəˈreɪʃn/", meaning: "一代人，代" },
    "gentle": { phonetic: "/ˈdʒentl/", meaning: "温柔的，轻柔的" },
    "gently": { phonetic: "/ˈdʒentli/", meaning: "温柔地" },
    "glow": { phonetic: "/ɡləʊ/", meaning: "光亮，发光" },
    "glowing": { phonetic: "/ˈɡləʊɪŋ/", meaning: "发光的" },
    "grandson": { phonetic: "/ˈɡrænsʌn/", meaning: "孙子" },
    "grandmother": { phonetic: "/ˈɡrænmʌðə(r)/", meaning: "祖母，外祖母" },
    "grove": { phonetic: "/ɡrəʊv/", meaning: "小树林，果园" },
    "guide": { phonetic: "/ɡaɪd/", meaning: "引导，指引" },
    // H
    "handmade": { phonetic: "/ˈhændmeɪd/", meaning: "手工制作的" },
    "happily": { phonetic: "/ˈhæpɪli/", meaning: "开心地" },
    "heavy": { phonetic: "/ˈhevi/", meaning: "沉重的，大量的" },
    "hiding": { phonetic: "/ˈhaɪdɪŋ/", meaning: "躲藏" },
    "hill": { phonetic: "/hɪl/", meaning: "小山，丘陵" },
    "hole": { phonetic: "/həʊl/", meaning: "洞，孔" },
    "ivy": { phonetic: "/ˈaɪvi/", meaning: "常春藤" },
    // I
    "invisible": { phonetic: "/ɪnˈvɪzəbl/", meaning: "看不见的，隐形的" },
    // J
    "joy": { phonetic: "/dʒɔɪ/", meaning: "喜悦，欢乐" },
    "jumped": { phonetic: "/dʒʌmpt/", meaning: "跳跃" },
    // K
    "kitten": { phonetic: "/ˈkɪtn/", meaning: "小猫" },
    // L
    "laboratory": { phonetic: "/ləˈbɒrətri/", meaning: "实验室" },
    "lap": { phonetic: "/læp/", meaning: "大腿（坐着时的）" },
    "lavender": { phonetic: "/ˈlævəndə(r)/", meaning: "薰衣草" },
    "lightning": { phonetic: "/ˈlaɪtnɪŋ/", meaning: "闪电" },
    "locket": { phonetic: "/ˈlɒkɪt/", meaning: "小盒式吊坠" },
    "lonely": { phonetic: "/ˈləʊnli/", meaning: "孤独的" },
    "lovely": { phonetic: "/ˈlʌvli/", meaning: "可爱的，美好的" },
    // M
    "magnificent": { phonetic: "/mæɡˈnɪfɪsnt/", meaning: "壮丽的，宏伟的" },
    "meadow": { phonetic: "/ˈmedəʊ/", meaning: "草地，牧场" },
    "mysterious": { phonetic: "/mɪˈstɪəriəs/", meaning: "神秘的" },
    // N
    "narrow": { phonetic: "/ˈnærəʊ/", meaning: "狭窄的" },
    "noticed": { phonetic: "/ˈnəʊtɪst/", meaning: "注意到" },
    // O
    "ocean": { phonetic: "/ˈəʊʃn/", meaning: "海洋" },
    "old": { phonetic: "/əʊld/", meaning: "老的，旧的" },
    "overgrown": { phonetic: "/ˌəʊvəˈɡrəʊn/", meaning: "杂草丛生的" },
    "owner": { phonetic: "/ˈəʊnə(r)/", meaning: "主人" },
    // P
    "patient": { phonetic: "/ˈpeɪʃnt/", meaning: "耐心的" },
    "patience": { phonetic: "/ˈpeɪʃns/", meaning: "耐心" },
    "perfect": { phonetic: "/ˈpɜːfɪkt/", meaning: "完美的" },
    "precious": { phonetic: "/ˈpreʃəs/", meaning: "珍贵的" },
    "puddle": { phonetic: "/ˈpʌdl/", meaning: "水坑，水洼" },
    "purred": { phonetic: "/pɜːd/", meaning: "（猫）发出咕噜声" },
    "pushed": { phonetic: "/pʊʃt/", meaning: "推" },
    // Q
    "quietly": { phonetic: "/ˈkwaɪətli/", meaning: "安静地" },
    // R
    "rainbow": { phonetic: "/ˈreɪnbəʊ/", meaning: "彩虹" },
    "reached": { phonetic: "/riːtʃt/", meaning: "到达，触及" },
    "received": { phonetic: "/rɪˈsiːvd/", meaning: "收到" },
    "revealing": { phonetic: "/rɪˈviːlɪŋ/", meaning: "揭示，显露" },
    "rhyme": { phonetic: "/raɪm/", meaning: "押韵，儿歌" },
    "rusty": { phonetic: "/ˈrʌsti/", meaning: "生锈的" },
    // S
    "sad": { phonetic: "/sæd/", meaning: "悲伤的" },
    "scared": { phonetic: "/skeəd/", meaning: "害怕的" },
    "scientist": { phonetic: "/ˈsaɪəntɪst/", meaning: "科学家" },
    "score": { phonetic: "/skɔː(r)/", meaning: "分数，得分" },
    "scurried": { phonetic: "/ˈskʌrid/", meaning: "小跑，急赶" },
    "secret": { phonetic: "/ˈsiːkrət/", meaning: "秘密" },
    "seed": { phonetic: "/siːd/", meaning: "种子" },
    "shiny": { phonetic: "/ˈʃaɪni/", meaning: "闪亮的" },
    "shivering": { phonetic: "/ˈʃɪvərɪŋ/", meaning: "颤抖的" },
    "shoulder": { phonetic: "/ˈʃəʊldə(r)/", meaning: "肩膀" },
    "sighed": { phonetic: "/saɪd/", meaning: "叹气" },
    "silly": { phonetic: "/ˈsɪli/", meaning: "愚蠢的，傻的" },
    "single": { phonetic: "/ˈsɪŋɡl/", meaning: "单一的，单个的" },
    "soil": { phonetic: "/sɔɪl/", meaning: "土壤" },
    "sparrow": { phonetic: "/ˈspærəʊ/", meaning: "麻雀" },
    "splashing": { phonetic: "/ˈsplæʃɪŋ/", meaning: "溅水，泼溅" },
    "spread": { phonetic: "/spred/", meaning: "展开，张开" },
    "sprout": { phonetic: "/spraʊt/", meaning: "嫩芽，幼苗" },
    "squealed": { phonetic: "/skwiːld/", meaning: "尖叫，欢呼" },
    "steady": { phonetic: "/ˈstedi/", meaning: "稳定的，平稳的" },
    "storm": { phonetic: "/stɔːm/", meaning: "暴风雨" },
    "suddenly": { phonetic: "/ˈsʌdənli/", meaning: "突然地" },
    "sunflower": { phonetic: "/ˈsʌnflaʊə(r)/", meaning: "向日葵" },
    "sweater": { phonetic: "/ˈswetə(r)/", meaning: "毛衣" },
    "sweet": { phonetic: "/swiːt/", meaning: "甜的，可爱的" },
    "sweetness": { phonetic: "/ˈswiːtnəs/", meaning: "甜蜜，芳香" },
    "squeezed": { phonetic: "/skwiːzd/", meaning: "挤压" },
    // T
    "terrified": { phonetic: "/ˈterɪfaɪd/", meaning: " terrified 的" },
    "test": { phonetic: "/test/", meaning: "测试，考试" },
    "tiptoed": { phonetic: "/ˈtɪptəʊd/", meaning: "踮着脚走" },
    "tiny": { phonetic: "/ˈtaɪni/", meaning: "极小的" },
    "towel": { phonetic: "/ˈtaʊəl/", meaning: "毛巾" },
    "treasure": { phonetic: "/ˈtreʒə(r)/", meaning: "宝藏，珍宝" },
    // V
    "vast": { phonetic: "/vɑːst/", meaning: "广阔的，巨大的" },
    "village": { phonetic: "/ˈvɪlɪdʒ/", meaning: "村庄" },
    "vivid": { phonetic: "/ˈvɪvɪd/", meaning: "生动的，鲜艳的" },
    "voice": { phonetic: "/vɔɪs/", meaning: "声音，嗓音" },
    // W
    "waved": { phonetic: "/weɪvd/", meaning: "挥手" },
    "weak": { phonetic: "/wiːk/", meaning: "微弱的，虚弱的" },
    "weed": { phonetic: "/wiːd/", meaning: "杂草" },
    "whispered": { phonetic: "/ˈwɪspəd/", meaning: "低语，耳语" },
    "whiskers": { phonetic: "/ˈwɪskəz/", meaning: "胡须，触须" },
    "wonderful": { phonetic: "/ˈwʌndəfl/", meaning: "精彩的，极好的" },
    "wooden": { phonetic: "/ˈwʊdn/", meaning: "木制的" },
    "wrapped": { phonetic: "/ræpt/", meaning: "包裹" }
  },

  // 根据日期伪随机选取10篇故事
  getTodayStories() {
    const today = new Date().toDateString();
    const seed = this._hashString(today);
    const shuffled = this._shuffleWithSeed([...this.stories], seed);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  },

  // 查词
  lookup(word) {
    const clean = word.toLowerCase().replace(/[^a-z']/g, '');
    return this.vocabulary[clean] || null;
  },

  // 字符串哈希（用于伪随机）
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  },

  // Fisher-Yates 洗牌（带种子）
  _shuffleWithSeed(array, seed) {
    const result = [...array];
    let s = seed;
    for (let i = result.length - 1; i > 0; i--) {
      s = (s * 16807 + 0) % 2147483647;
      const j = s % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
};

// 兼容模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesDB;
}
