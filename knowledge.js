/**
 * Daily Companion - 晨间知识库
 * 包含：英文单词、科技动态、历史知识、影视动画
 */

const KnowledgeDB = {
  // ========== 英文单词 ==========
  words: [
    { word: "Serendipity", phonetic: "/ˌserənˈdɪpəti/", meaning: "意外发现美好事物的运气", example: "Finding this café was pure serendipity." },
    { word: "Ephemeral", phonetic: "/ɪˈfemərəl/", meaning: "短暂的、转瞬即逝的", example: "Social media trends are often ephemeral." },
    { word: "Resilience", phonetic: "/rɪˈzɪliəns/", meaning: "韧性、恢复力", example: "Her resilience after failure inspired everyone." },
    { word: "Eloquent", phonetic: "/ˈeləkwənt/", meaning: "雄辩的、有说服力的", example: "He gave an eloquent speech at the ceremony." },
    { word: "Luminous", phonetic: "/ˈluːmɪnəs/", meaning: "发光的、明亮的", example: "The luminous moon lit up the night sky." },
    { word: "Solitude", phonetic: "/ˈsɒlɪtjuːd/", meaning: "独处、孤独", example: "She cherished the solitude of early mornings." },
    { word: "Petrichor", phonetic: "/ˈpetrɪkɔːr/", meaning: "雨后泥土的芳香", example: "I love the smell of petrichor after summer rain." },
    { word: "Mellifluous", phonetic: "/meˈlɪfluəs/", meaning: "甜美流畅的（声音）", example: "Her mellifluous voice calmed the audience." },
    { word: "Ineffable", phonetic: "/ɪnˈefəbl/", meaning: "难以言喻的", example: "The ineffable beauty left us speechless." },
    { word: "Sonder", phonetic: "/ˈsɒndə/", meaning: "意识到每个路人都有复杂人生的感觉", example: "Walking through the city, I felt a deep sonder." },
    { word: "Ethereal", phonetic: "/ɪˈθɪəriəl/", meaning: "超凡脱俗的、空灵的", example: "The ethereal music seemed to float in the air." },
    { word: "Halcyon", phonetic: "/ˈhælsiən/", meaning: "宁静幸福的（往昔时光）", example: "I often recall the halcyon days of my childhood." },
    { word: "Sonder", phonetic: "/ˈsɒndər/", meaning: "顿悟每个陌生人都有如自己般复杂人生", example: "On the subway, a feeling of sonder washed over me." },
    { word: "Vellichor", phonetic: "/ˈvelɪkɔːr/", meaning: "旧书店特有的时光沉淀感", example: "The vellichor of the dusty shelves was comforting." },
    { word: "Aquiver", phonetic: "/əˈkwɪvər/", meaning: "颤抖的、微微震动的", example: "She stood aquiver with excitement." },
    { word: "Nefarious", phonetic: "/nɪˈfeəriəs/", meaning: "邪恶的、极坏的", example: "The villain had a nefarious plan." },
    { word: "Somnambulist", phonetic: "/sɒmˈnæmbjʊlɪst/", meaning: "梦游者", example: "The somnambulist wandered through the house at midnight." },
    { word: "Epoch", phonetic: "/ˈiːpɒk/", meaning: "纪元、时代", example: "The invention marked a new epoch in human history." },
    { word: "Sonorous", phonetic: "/ˈsɒnərəs/", meaning: "洪亮的、浑厚的", example: "The bell made a sonorous sound across the valley." },
    { word: "Limerence", phonetic: "/ˈlɪmərəns/", meaning: "痴迷之恋、迷恋状态", example: "His limerence for her lasted for years." },
    { word: "Effervescent", phonetic: "/ˌefəˈvesnt/", meaning: "活泼欢快的、冒泡的", example: "Her effervescent personality lit up the room." },
    { word: "Petrichor", phonetic: "/ˈpetrɪkɔːr/", meaning: "雨后泥土的清新气味", example: "The petrichor after the storm was refreshing." },
    { word: "Silhouette", phonetic: "/ˌsɪluˈet/", meaning: "剪影、轮廓", example: "The sunset cast a beautiful silhouette of the mountain." },
    { word: "Supine", phonetic: "/ˈsuːpaɪn/", meaning: "仰卧的、懒散的", example: "He lay supine on the grass, gazing at clouds." },
    { word: "Labyrinth", phonetic: "/ˈlæbərɪnθ/", meaning: "迷宫、错综复杂的事物", example: "The old city was a labyrinth of narrow streets." },
    { word: "Aurora", phonetic: "/ɔːˈrɔːrə/", meaning: "极光、曙光", example: "The aurora borealis painted the northern sky." },
    { word: "Cynosure", phonetic: "/ˈsɪnəzʊə/", meaning: "众人瞩目的焦点", example: "She was the cynosure of all eyes at the party." },
    { word: "Hiraeth", phonetic: "/ˈhɪraɪθ/", meaning: "对无法归去的故乡的怀念", example: "A deep hiraeth for his childhood home never left him." },
    { word: "Numinous", phonetic: "/ˈnjuːmɪnəs/", meaning: "神圣的、令人敬畏的", example: "Standing before the ancient temple, he felt something numinous." },
    { word: "Saudade", phonetic: "/sawˈda.dɨ/", meaning: "对失去之物的甜蜜忧伤", example: "Listening to that song filled her with saudade." }
  ],

  // ========== 科技动态 ==========
  tech: [
    { title: "量子计算的新里程碑", content: "2025年，谷歌的Willow量子芯片实现了低于阈值的量子纠错，这意味着量子计算机向实用化迈出了关键一步。量子比特在增加的同时，错误率反而下降，打破了长期的 scaling 瓶颈。", source: "Nature / Google Quantum AI" },
    { title: "AI 智能体的自主协作", content: "多智能体系统（Multi-Agent Systems）正在崛起。多个 AI 智能体可以分工协作，自主规划、使用工具、互相验证结果，大幅提升了复杂任务的完成质量。", source: "Anthropic / AutoGPT" },
    { title: "固态电池商业化加速", content: "丰田和 QuantumScape 宣布固态电池量产计划提前至2027年。固态电池能量密度可达现有锂电池的2-3倍，充电时间缩短至10分钟，将彻底改变电动汽车行业。", source: "Toyota / QuantumScape" },
    { title: "脑机接口进入临床试验", content: "Neuralink 的 N1 芯片已获准进行人体临床试验，首位受试者实现了通过意念控制电脑光标。这标志着人机融合时代的正式开启。", source: "Neuralink FDA" },
    { title: "室温超导的追寻", content: "韩国团队声称发现 LK-99 室温超导体引发全球复现热潮。虽然最终被证伪，但这场科学辩论加速了超导材料研究，新型氢化物超导温度已接近室温。", source: "Science / Nature" },
    { title: "可解释 AI（XAI）", content: "随着 AI 在医疗、司法等关键领域的应用，模型的可解释性变得至关重要。SHAP、LIME 等技术帮助人类理解 AI 的决策逻辑，建立信任。", source: "MIT Technology Review" },
    { title: "6G 通信预研启动", content: "6G 预计2030年左右商用，峰值速率将达1Tbps，支持全息通信、数字孪生等场景。太赫兹通信和智能超表面（RIS）是核心关键技术。", source: "ITU-R / 3GPP" },
    { title: "合成生物学突破", content: "科学家成功创造了具有最小基因组的合成细胞 JCVI-syn3.0，仅含473个基因。这为理解生命本质和定向设计生物功能奠定了基础。", source: "Science Journal" },
    { title: "空间计算时代来临", content: "Apple Vision Pro 引领了空间计算浪潮。混合现实（MR）将数字内容无缝融入物理空间，手势、眼动、语音成为新的交互范式。", source: "Apple / Meta" },
    { title: "可控核聚变进展", content: "2022年，美国 NIF 首次实现核聚变能量净增益（Q>1）。2024年，中国的 EAST 装置创造了403秒高约束模等离子体运行世界纪录。", source: "DOE / 中科院" },
    { title: "边缘 AI 的崛起", content: "随着大模型的小型化（如 TinyLlama、Phi-3），AI 推理正从云端向手机、IoT 设备迁移。端侧 AI 保护隐私、降低延迟、节省带宽。", source: "Edge AI Summit" },
    { title: "DNA 数据存储", content: "1克 DNA 可存储约215 PB数据，保存时间可达数千年。微软和华盛顿大学正在开发全自动 DNA 存储系统，有望解决大数据时代的存储危机。", source: "Microsoft Research" },
    { title: "自动驾驶 L4 落地", content: "Waymo 在旧金山和凤凰城提供完全无人驾驶的出租车服务。百度 Apollo 在武汉部署了千辆级 Robotaxi。L4 级自动驾驶正从测试走向商业运营。", source: "Waymo / 百度" },
    { title: "基因编辑疗法获批", content: "CRISPR-Cas9 基因编辑疗法 Casgevy 获 FDA 批准，用于治疗镰状细胞病。这是基因编辑从实验室走向临床的历史性时刻。", source: "FDA / Vertex" },
    { title: "碳捕获技术规模化", content: "Climeworks 的 Orca 工厂每年可从空气中捕获4000吨 CO₂。直接空气捕获（DAC）技术成本正从每吨600美元向100美元迈进。", source: "Climeworks / IEA" },
    { title: "光子芯片革命", content: "用光代替电子传输数据的光子芯片，速度提升1000倍、能耗降低90%。Lightmatter 和 Ayar Labs 正推动光子互连在数据中心的应用。", source: "Nature Photonics" },
    { title: "联邦学习的隐私保护", content: "联邦学习让数据「不动」而模型「动」，在保护用户隐私的前提下实现多方协作训练。这成为金融、医疗行业 AI 应用的重要基础。", source: "Google AI / IEEE" },
    { title: "数字孪生城市", content: "新加坡、杭州等城市构建了1:1的数字孪生体，实时映射交通、能源、环境状态，辅助城市治理和应急响应决策。", source: "Smart City World" },
    { title: "mRNA 疫苗技术延伸", content: "mRNA 技术平台正拓展至癌症疫苗、自身免疫疾病和罕见病治疗。Moderna 和 BioNTech 的个性化肿瘤疫苗已进入三期临床。", source: "Moderna / BioNTech" },
    { title: "自愈合材料", content: "受生物体启发，科学家开发出可自主修复裂纹的自愈合混凝土、聚合物和电子材料，有望显著延长基础设施和电子产品的使用寿命。", source: "Advanced Materials" }
  ],

  // ========== 历史知识 ==========
  history: [
    { title: "丝绸之路的文明交汇", content: "公元前114年，张骞出使西域开辟丝绸之路。这条横贯欧亚的贸易通道不仅运送丝绸、香料，更促进了佛教东传、造纸术西传和多元文明的深度对话。", era: "汉代" },
    { title: "文艺复兴的人文觉醒", content: "14-17世纪的文艺复兴以意大利为中心，达芬奇、米开朗基罗、拉斐尔掀起艺术革命。其核心是人文主义——将人从神权束缚中解放，肯定人的价值与尊严。", era: "14-17世纪" },
    { title: "郑和下西洋", content: "1405-1433年，郑和七下西洋，率世界最庞大的船队到达东南亚、印度洋乃至东非。这比哥伦布发现新大陆早87年，展现了大明帝国的海洋雄心。", era: "明代" },
    { title: "启蒙运动与理性之光", content: "17-18世纪的启蒙运动倡导理性、科学、自由和平等。伏尔泰、卢梭、孟德斯鸠的思想直接影响了美国独立和法国大革命，奠定了现代民主政治的基础。", era: "17-18世纪" },
    { title: "工业革命的巨变", content: "1760年代始于英国的工业革命，蒸汽机、纺织机械和铁路彻底重塑了人类生产方式。社会从农业文明跃入工业文明，城市化进程由此加速。", era: "1760-1840" },
    { title: "丝绸之路的敦煌", content: "敦煌莫高窟保存了从4世纪到14世纪的735个洞窟、4.5万平方米壁画。它见证了佛教艺术的中国化历程，是丝绸之路上最璀璨的文化明珠。", era: "4-14世纪" },
    { title: "玛雅文明的数学与天文学", content: "玛雅人在公元前2000年就建立了复杂历法，精确计算出一年为365.2420天（与现代值仅差0.0002天）。他们还独立发明了零的概念。", era: "公元前2000-16世纪" },
    { title: "黑死病与欧洲重塑", content: "1347-1351年，黑死病席卷欧洲，造成约2500万人死亡（占欧洲人口1/3）。这场灾难动摇了教会权威，加速了农奴制瓦解，间接催生了文艺复兴。", era: "14世纪" },
    { title: "活字印刷的发明", content: "1040年，毕昇发明胶泥活字印刷术，比古腾堡早400年。印刷术极大降低了知识传播成本，被誉为「文明之母」，推动了宗教改革和科学革命。", era: "北宋" },
    { title: "大航海时代的开启", content: "1492年哥伦布到达美洲，1498年达·伽马开辟印度航路，1519年麦哲伦环球航行。大航海时代将原本孤立的大陆连为一体，开启了全球化序幕。", era: "15-16世纪" },
    { title: "科举制度的影响", content: "隋朝创立的科举制（605年）打破了贵族世袭，以考试选拔人才。这一制度延续1300年，并影响了英国文官制度和现代公务员考试体系。", era: "隋-清" },
    { title: "轴心时代的思想爆发", content: "公元前800-200年，孔子、佛陀、苏格拉底几乎同时出现。雅斯贝尔斯称之为「轴心时代」——人类各大文明独立实现了哲学的突破。", era: "公元前800-200年" },
    { title: "丝绸之路的造纸术西传", content: "751年怛罗斯之战后，造纸术传入阿拉伯世界，12世纪进入欧洲。此前欧洲人主要在羊皮纸上书写，纸张的普及为知识传播和文艺复兴奠定了物质基础。", era: "8-12世纪" },
    { title: "古巴比伦的汉谟拉比法典", content: "公元前1754年颁布的《汉谟拉比法典》是现存最完整的古代法典，以「以眼还眼」为原则。它被刻在黑色玄武岩石柱上，体现了法治思想的早期萌芽。", era: "公元前1754年" },
    { title: "雅典民主的实验", content: "公元前5世纪，雅典创造了人类历史上第一个民主政体。公民大会、陪审团制度、轮番而治等设计，至今仍是现代民主的重要源头。", era: "公元前5世纪" },
    { title: "丝绸之路的香料贸易", content: "中世纪欧洲对东方香料的渴求推动了地理大发现。胡椒、肉桂等香料不仅是调味品，更是防腐剂和身份象征，其价值一度堪比黄金。", era: "中世纪" },
    { title: "火药改变战争形态", content: "火药于9世纪在中国发明，13世纪传入欧洲。火炮摧毁了封建城堡，火枪淘汰了骑士阶层，最终推动了中央集权民族国家的形成。", era: "9-15世纪" },
    { title: "巴黎公社的尝试", content: "1871年，巴黎工人建立了自己的政权——巴黎公社，实施普选制、政教分离和工人自治。虽然仅存在72天，但成为无产阶级革命的重要参照。", era: "1871年" },
    { title: "图灵与计算机时代", content: "1936年，艾伦·图灵提出「图灵机」理论模型，奠定了计算机科学的数学基础。二战期间他破译恩尼格玛密码，拯救了约1400万人的生命。", era: "20世纪" },
    { title: "登月与人类的太空梦", content: "1969年7月20日，阿姆斯特朗踏上月球，说出「这是我的一小步，却是人类的一大步」。阿波罗计划汇集了40万人、2万家企业的智慧结晶。", era: "1969年" }
  ],

  // ========== 影视动画 ==========
  movies: [
    { title: "《千与千寻》", content: "宫崎骏的巅峰之作，获2003年奥斯卡最佳动画长片。影片以汤屋为舞台，讲述少女千寻在神灵世界的成长。它不仅是一部奇幻冒险，更是对贪婪、环保和童真的深刻反思。", quote: "「不能吃太胖哦，会被杀掉的。」" },
    { title: "《星际穿越》", content: "诺兰将硬科幻推向新高度。影片基于基普·索恩的黑洞理论，用科学精确度呈现时间膨胀、五维空间。汉斯·季默的管风琴配乐将孤独与浩瀚诠释得淋漓尽致。", quote: "「爱是唯一可以超越时间与空间的事物。」" },
    { title: "《肖申克的救赎》", content: "常年位居IMDb榜首。银行家安迪蒙冤入狱，用19年时间和一把小石锤完成自我救赎。影片关于希望、自由与体制化的思考，每次重温都有新感悟。", quote: "「希望是美好的，也许是人间至善。」" },
    { title: "《霸王别姬》", content: "陈凯歌执导，张国荣主演，获戛纳金棕榈奖。程蝶衣「不疯魔不成活」的一生，映射了中国半个世纪的历史变迁。人戏不分，达到了艺术与生命的极致融合。", quote: "「说的是一辈子！差一年，一个月，一天，一个时辰，都不算一辈子！」" },
    { title: "《攻壳机动队》(1995)", content: "押井守的这部动画电影预言了网络时代的身份危机。素子对自身存在意义的追问——「灵魂是什么？」——在AI时代愈发振聋发聩，深刻影响了《黑客帝国》。", quote: "「网络是无限宽广的。」" },
    { title: "《寻梦环游记》", content: "皮克斯以墨西哥亡灵节为灵感，讲述小男孩米格尔的音乐梦想与家族和解。影片对死亡的诗意诠释——「真正的死亡是被遗忘」——让无数观众泪洒影院。", quote: "「在爱的记忆消失以前，请记住我。」" },
    { title: "《大话西游》", content: "周星驰的无厘头喜剧外壳下，藏着对爱情的终极追问。至尊宝戴上金箍就不能爱你，放下金箍就不能救你。这种悲剧性的宿命感让影片成为华语影史的经典。", quote: "「曾经有一份真诚的爱情放在我面前……」" },
    { title: "《EVA 新世纪福音战士》", content: "庵野秀明的这部动画颠覆了整个业界。它以机甲为壳，深入探讨了存在主义、人际隔阂与自我认同。意识流结局和宗教隐喻开启了动画作为严肃艺术的大门。", quote: "「不能逃避，不能逃避，不能逃避。」" },
    { title: "《阿甘正传》", content: "汤姆·汉克斯塑造的智障跑者阿甘，以纯真视角见证了美国30年的风云变幻。影片传递的「傻人有傻福」哲学，实则是对执着与善良的最高礼赞。", quote: "「生活就像一盒巧克力，你永远不知道下一颗是什么。」" },
    { title: "《疯狂动物城》", content: "迪士尼用动物寓言解构了偏见与歧视。兔子朱迪和狐狸尼克的搭档，打破了「捕食者/猎物」的刻板印象。影片的幽默之下，是对多元社会的美好期许。", quote: "「在动物城，任何动物都能成就无限可能。」" },
    { title: "《让子弹飞》", content: "姜文的这部寓言式电影，台词密集、隐喻丰富。张麻子与黄四郎的博弈，既是黑色幽默，也是对权力、公平与革命的深刻戏谑。站着把钱挣了，是理想主义的倔强。", quote: "「公平，公平，还是他妈的公平！」" },
    { title: "《机器人总动员 WALL·E》", content: "皮克斯用前40分钟的无对白段落，讲述了一个捡垃圾机器人的孤独与浪漫。影片对消费主义和环境破坏的批判，在2008年就发出了今天的警报。", quote: "「我不想只是生存，我想活着。」" },
    { title: "《无间道》", content: "港片巅峰，双卧底设定成为类型片的教科书。刘建明「我想做个好人」的挣扎，陈永仁「三年又三年」的隐忍，将身份认同的困境推向极致。美版《无间道风云》获奥斯卡最佳影片。", quote: "「往往都是事情改变人，人却改变不了事情。」" },
    { title: "《瑞克和莫蒂》", content: "这部成人动画以科幻冒险为壳，探讨了虚无主义与存在意义。瑞克的全知全能与内心孤独形成强烈反差，无数金句让观众在爆笑后陷入沉思。", quote: "「 nobody exists on purpose, nobody belongs anywhere. 」" },
    { title: "《海上钢琴师》", content: "托纳多雷「时空三部曲」之一。1900从未踏足陆地，却在船上用钢琴奏出整个世界。他的选择——「琴键有始有终，而世界没有尽头」——是对无限恐惧的诗意表达。", quote: "「陆上的人喜欢寻根问底，虚度了大好光阴。」" },
    { title: "《楚门的世界》", content: "彼得·威尔预言了真人秀和 surveillance society。楚门从出生起就活在镜头中，当他发现真相选择出走时，那句「假如再也见不到你，祝你早安、午安、晚安」震撼人心。", quote: "「Good morning, and in case I don't see you...」" },
    { title: "《你的名字》", content: "新海诚以彗星灾难为背景，讲述跨越时空的身体互换与爱情。影片将日本传统文化（结绳、口嚼酒）与科幻设定融合，画面每一帧都是壁纸级的美学。", quote: "「重要的人，不想忘记的人，绝不能忘记！」" },
    { title: "《美丽人生》", content: "罗伯托·贝尼尼用喜剧讲述纳粹集中营的悲剧。父亲圭多用谎言为儿子构筑了一个「游戏世界」，保护了孩子的童真。这是父爱与幽默对抗暴政的极致演绎。", quote: "「早安！公主！」" },
    { title: "《盗梦空间》", content: "诺兰将梦境嵌套成四层迷宫，探讨了现实与虚幻的边界。旋转的陀螺成为影史最开放的结局之一。影片的叙事结构和视觉奇观重新定义了科幻动作片。", quote: "「既然做梦，就做大点。」" },
    { title: "《进击的巨人》", content: "谏山创用「墙」的意象展开宏大的反战叙事。从人类对抗巨人，到发现世界的真相，再到地鸣灭世的道德困境，作品的深度和完成度堪称动漫史上的杰作。", quote: "「我要把巨人一匹不留地驱逐出去！」" }
  ],

  // 获取今日知识（基于日期做伪随机选择，保证每天一样）
  getToday(category) {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const items = this[category];
    const index = seed % items.length;
    return { ...items[index], category, date: today.toISOString().split('T')[0] };
  },

  // 获取全部四类今日知识
  getAllToday() {
    return {
      word: this.getToday('words'),
      tech: this.getToday('tech'),
      history: this.getToday('history'),
      movie: this.getToday('movies')
    };
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KnowledgeDB;
}
