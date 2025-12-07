import { Prompt, CategoryNode } from './types';
import { PenTool, Code, Palette, Briefcase, MessageSquare, LayoutGrid, Video } from 'lucide-react';

const TEXT_MODELS = [
  'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', // International & Hot
  '豆包', '文心一言', 'Kimi', '通义千问', '智谱AI', '秘塔' // Chinese
];

const IMAGE_MODELS = [
  'Midjourney', 'Stable Diffusion', 'DALL-E', 'Flux', '即梦AI'
];

const VIDEO_MODELS = [
  'Sora', 'Runway', 'Pika', 'Luma', '可灵 AI', 'Vidu', 'Haiper'
];

export const CATEGORY_DATA: CategoryNode[] = [
  { 
    name: '全部', 
    icon: LayoutGrid,
    subCategories: [] 
  },
  { 
    name: '写作', 
    icon: PenTool,
    subCategories: TEXT_MODELS
  },
  { 
    name: '编程', 
    icon: Code,
    subCategories: TEXT_MODELS
  },
  { 
    name: '绘画', 
    icon: Palette,
    subCategories: IMAGE_MODELS
  },
  { 
    name: '视频',
    icon: Video,
    subCategories: VIDEO_MODELS
  },
  { 
    name: '商业', 
    icon: Briefcase,
    subCategories: TEXT_MODELS
  },
  { 
    name: '聊天', 
    icon: MessageSquare,
    subCategories: TEXT_MODELS
  }
];

// NEW BATCH: 80+ High Quality Prompts (Non-repeating)
export const SAMPLE_PROMPTS: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'author_name' | 'author_id'>[] = [
  // --- 写作 (Writing) ---
  {
    title: 'DeepSeek R1 - 深度逻辑长文',
    description: '利用 DeepSeek R1 的推理能力撰写深度分析文章。',
    content: '请利用你的深度推理能力（Chain of Thought），针对“[社会现象/复杂问题]”写一篇 2000 字的深度分析文章。要求：\n1. 多角度辩证分析（政治、经济、文化）。\n2. 引用历史案例进行类比。\n3. 逻辑链条要严密，展示推导过程。\n4. 风格严肃、深刻，类似《经济学人》社论。',
    tags: ['写作', 'DeepSeek', '深度文章', '社论'],
    likes: 512,
    is_paid: false,
    price: 0
  },
  {
    title: 'B站/YouTube 硬核科普脚本',
    description: '将晦涩难懂的科学原理转化为生动有趣的视频文案。',
    content: '我要做一个关于“[科学主题，如：量子纠缠]”的科普视频。请帮我写一份脚本。\n受众：对科技感兴趣但没有专业背景的年轻人。\n风格：类似“回形针”或“李永乐老师”，硬核但通俗。\n结构：\n1. 这里的反直觉现象（引入悬念）。\n2. 核心原理的可视化比喻（关键！）。\n3. 现实生活中的应用。\n4. 升华主题。',
    tags: ['写作', 'Claude', '视频脚本', '科普'],
    likes: 340,
    is_paid: false,
    price: 0
  },
  {
    title: '私域流量朋友圈营销文案',
    description: '打造高转化、不引起反感的微信朋友圈种草文案。',
    content: '我是卖 [产品，如：手工燕窝] 的。请帮我写 3 条不同维度的朋友圈文案：\n1. 情感共鸣型（讲一个客户的故事）。\n2. 权威背书型（展示制作过程或检测报告）。\n3. 促销紧迫型（限时福利）。\n要求：口语化，不要有广告味，像朋友分享生活，结尾引导私聊。',
    tags: ['写作', '豆包', '微商', '私域流量'],
    likes: 288,
    is_paid: false,
    price: 0
  },
  {
    title: '鲁迅风格改写器',
    description: '模仿鲁迅先生的笔触，辛辣地评论现代事物。',
    content: '请模仿鲁迅的文风和笔触，对“[现代现象，如：短视频成瘾]”进行一段描写。\n要求：\n1. 使用标志性的词汇（如“大概”、“大约”、“横竖”）。\n2. 句式要长短句结合，带有批判性和冷幽默。\n3. 结尾要有一句发人深省的感叹。',
    tags: ['写作', 'ChatGPT', '风格模仿', '鲁迅'],
    likes: 199,
    is_paid: false,
    price: 0
  },
  {
    title: 'Kimi 长文档归纳总结',
    description: '利用 Kimi 的长上下文能力总结复杂的财报或研报。',
    content: '（此处需上传长文本）\n请阅读这份长达 50 页的行业研究报告。帮我提取以下核心信息：\n1. 行业未来的年复合增长率 (CAGR)。\n2. 报告中提到的 3 个主要风险点。\n3. 竞争格局的象限分析。\n请用 Markdown 表格形式输出。',
    tags: ['写作', 'Kimi', '总结', '研报'],
    likes: 405,
    is_paid: false,
    price: 0
  },
  {
    title: '网文小说“黄金三章”大纲',
    description: '设计这让读者欲罢不能的网文开头。',
    content: '我想写一本 [类型，如：玄幻/系统流] 小说。请帮我设计“黄金三章”的细纲。\n第一章：主角遭遇极致的压抑或危机（金手指觉醒）。\n第二章：小试牛刀，震惊路人，产生爽点。\n第三章：引出更大的矛盾，留下钩子。\n要求：节奏极快，情绪调动强烈。',
    tags: ['写作', '文心一言', '网文', '大纲'],
    likes: 276,
    is_paid: false,
    price: 0
  },
  {
    title: '法律文书：律师函生成',
    description: '生成专业、严谨的律师函草稿。',
    content: '我是一名律师。我的委托人 [姓名] 发现 [侵权方] 在未经许可的情况下使用了其摄影作品。请帮我起草一份《律师函》。\n内容需包含：\n1. 事实陈述。\n2. 法律依据（著作权法相关条款）。\n3. 严正要求（停止侵权、赔礼道歉、赔偿损失）。\n语气要强硬且专业。',
    tags: ['写作', '智谱AI', '法律', '文书'],
    likes: 150,
    is_paid: false,
    price: 0
  },
  {
    title: '脱口秀 (Stand-up) 段子创作',
    description: '将生活琐事转化为幽默的脱口秀段子。',
    content: '请把“上班挤地铁”这个主题写成一段脱口秀段子。\n技巧要求：\n1. 使用“预期违背” (Call back)。\n2. 夸张的观察式幽默 (Observational comedy)。\n3. 模仿不同人的反应。\n4. 包含 3 个爆笑梗（Punchline）。',
    tags: ['写作', 'Grok', '幽默', '脱口秀'],
    likes: 220,
    is_paid: false,
    price: 0
  },
  {
    title: '英文邮件润色 - 商务委婉',
    description: '将直接的中文意思转化为地道、委婉的商务英语邮件。',
    content: '请把这句话翻译成地道的商务英语，语气要委婉、专业，不要太生硬：\n“你给的价格太低了，我们没法做。除非你加钱，或者减少功能要求。”\n请提供 3 种不同程度的委婉表达。',
    tags: ['写作', 'Claude', '英语', '邮件'],
    likes: 310,
    is_paid: false,
    price: 0
  },
  {
    title: '小红书标题党 (Emo 版)',
    description: '针对年轻女性用户群体的情绪化标题生成。',
    content: '生成 5 个小红书标题，关于“[主题]”。\n风格：emo、破碎感、清醒大女主、人间清醒。\n句式参考：“这就...”、“关于...”、“没人告诉我...”。\n加上对应的 Emoji，如 🥀 💔 🕯️。',
    tags: ['写作', '小红书', 'ChatGPT', '标题'],
    likes: 180,
    is_paid: false,
    price: 0
  },

  // --- 编程 (Coding) ---
  {
    title: 'DeepSeek 代码逻辑漏洞检测',
    description: '利用 DeepSeek 强大的代码审计能力发现安全隐患。',
    content: '请作为一名安全专家审计以下 PHP/Java 代码：\n```\n[插入代码]\n```\n请寻找：\n1. SQL 注入漏洞。\n2. XSS 跨站脚本攻击风险。\n3. 逻辑越权漏洞。\n并给出修复后的代码示例。',
    tags: ['编程', 'DeepSeek', '安全', '审计'],
    likes: 390,
    is_paid: false,
    price: 0
  },
  {
    title: 'Flutter 跨平台 UI 布局',
    description: '生成 Flutter 的 Widget 树代码。',
    content: '请用 Flutter 编写一个[电商详情页]的 UI。\n要求：\n1. 顶部是大图轮播 (Carousel)。\n2. 中间是价格和标题，包含 Hero 动画。\n3. 底部是固定的“立即购买”栏。\n4. 使用 CustomScrollView 和 Slivers 实现滚动效果。',
    tags: ['编程', 'Gemini', 'Flutter', '移动端'],
    likes: 145,
    is_paid: false,
    price: 0
  },
  {
    title: 'Rust 内存安全解释与代码',
    description: '解释 Rust 所有权机制并生成示例。',
    content: '我是 Rust 初学者。请用通俗易懂的例子解释“借用 (Borrowing)”和“生命周期 (Lifetimes)”。\n然后，写一段代码演示：如何在多个线程之间安全地共享一个可变的 HashMap (使用 Arc 和 Mutex)。',
    tags: ['编程', 'Claude', 'Rust', '并发'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: 'Nginx 高性能配置生成',
    description: '为高并发网站生成 Nginx 配置文件。',
    content: '请生成一份生产环境可用的 `nginx.conf` 配置。\n需求：\n1. 启用 Gzip 压缩。\n2. 配置 HTTPS (SSL) 及 HTTP/2。\n3. 设置静态资源缓存 (Cache-Control)。\n4. 简单的防 DDOS 限制 (limit_req)。\n5. 负载均衡到两个后端服务器 (upstream)。',
    tags: ['编程', 'ChatGPT', 'Nginx', '运维'],
    likes: 175,
    is_paid: false,
    price: 0
  },
  {
    title: 'Unity 游戏脚本 - 角色控制器',
    description: '生成 Unity C# 脚本，控制角色移动。',
    content: '请写一个 Unity C# 脚本 `PlayerController.cs`。\n功能：\n1. 使用 CharacterController 组件。\n2. 实现 WASD 移动。\n3. 实现空格键跳跃 (考虑重力)。\n4. 鼠标控制视角旋转 (FPS 模式)。\n代码要有详细注释。',
    tags: ['编程', 'Grok', 'Unity', '游戏开发'],
    likes: 160,
    is_paid: false,
    price: 0
  },
  {
    title: 'Vue 3 + Pinia 状态管理',
    description: '演示如何在 Vue 3 中使用 Pinia Store。',
    content: '请创建一个 Vue 3 Pinia Store，用于管理“购物车”状态。\n需要实现：\n1. State: 商品列表。\n2. Getters: 计算总价、总数量。\n3. Actions: 添加商品、移除商品、清空购物车。\n使用 TypeScript 和 Setup Store 语法。',
    tags: ['编程', '通义千问', 'Vue', '前端'],
    likes: 130,
    is_paid: false,
    price: 0
  },
  {
    title: 'Python Pandas 数据清洗',
    description: '使用 Pandas 处理脏数据。',
    content: '我有一个 DataFrame `df`，包含字段 `price` (字符串，含符号), `date` (格式混乱), `category` (有缺失值)。\n请写代码：\n1. 将 `price` 转为浮点数。\n2. 将 `date` 统一转为 datetime 格式。\n3. 用众数填充 `category` 的缺失值。\n4. 删除重复行。',
    tags: ['编程', 'DeepSeek', 'Python', '数据分析'],
    likes: 245,
    is_paid: false,
    price: 0
  },
  {
    title: 'Smart Contract (Solidity) 智能合约',
    description: '编写一个简单的 ERC-20 代币合约。',
    content: '请用 Solidity 编写一个基本的 ERC-20 代币合约。\n特性：\n1. 代币名称：MyToken (MTK)。\n2. 总供应量：100万。\n3. 包含 Mint 和 Burn 功能（仅管理员可操作）。\n4. 使用 OpenZeppelin 库。',
    tags: ['编程', 'ChatGPT', '区块链', 'Solidity'],
    likes: 110,
    is_paid: false,
    price: 0
  },
  {
    title: 'Arduino / ESP32 点灯代码',
    description: '物联网开发基础代码。',
    content: '请为 ESP32 写一段 Arduino C++ 代码。\n功能：\n1. 连接 WiFi。\n2. 每隔 1 秒闪烁板载 LED。\n3. 启动一个简单的 Web Server，访问 IP 时显示 "Hello ESP32"。',
    tags: ['编程', 'Kimi', 'IoT', '嵌入式'],
    likes: 95,
    is_paid: false,
    price: 0
  },
  {
    title: 'VS Code 正则替换技巧',
    description: '使用正则表达式在编辑器中批量修改代码。',
    content: '我有大量代码格式如下：`var name = "value";`\n我想在 VS Code 中批量替换为：`const name = "value";` 并且把变量名变成大写。\n请给出“查找”和“替换”的正则表达式。',
    tags: ['编程', 'ChatGPT', '工具', '正则'],
    likes: 140,
    is_paid: false,
    price: 0
  },

  // --- 绘画 (Art) ---
  {
    title: 'Flux.1 - 完美文字渲染',
    description: '利用 Flux 模型强大的文字生成能力制作海报。',
    content: 'A movie poster design with the big bold text "CYBER 2077" in the center. The text is made of glowing neon circuits. Background is a dark futuristic city. High contrast, vector style, clean typography, correct spelling.',
    tags: ['绘画', 'Flux', '海报', '文字'],
    likes: 420,
    is_paid: false,
    price: 0
  },
  {
    title: 'Midjourney - 极简主义包豪斯',
    description: 'Bauhaus 风格的几何艺术设计。',
    content: 'Bauhaus style poster design, geometric shapes, circles and triangles, minimal composition, primary colors (red, blue, yellow) on beige background, vintage texture, swiss design typography, abstract --ar 3:4',
    tags: ['绘画', 'Midjourney', '设计', '抽象'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: '即梦AI - 唯美古风插画',
    description: '生成中国古风小说封面图。',
    content: '中国古风，一位白衣少年站在桃花树下，长发飘飘，手中持剑，花瓣飘落，背景是烟雨江南的远山，水墨画质感，留白意境，高分辨率。',
    tags: ['绘画', '即梦AI', '国风', '插画'],
    likes: 330,
    is_paid: false,
    price: 0
  },
  {
    title: '3D 等轴测房间 (Isometric Room)',
    description: '生成可爱的 3D 游戏房间模型图。',
    content: 'Isometric view of a gamer\'s room, low poly style 3d render, purple neon lighting, multiple monitors, gaming chair, messy desk with pizza boxes, cozy atmosphere, soft shadows, blender render --ar 1:1',
    tags: ['绘画', 'Midjourney', '3D', '游戏'],
    likes: 275,
    is_paid: false,
    price: 0
  },
  {
    title: 'Stable Diffusion - 写实人像摄影',
    description: '模拟 85mm 镜头拍摄的写实人像。',
    content: 'Raw photo, closeup portrait of a young japanese woman, natural skin texture, pores visible, light freckles, soft daylight window lighting, shot on Sony A7R IV, 85mm f1.4 lens, shallow depth of field, sharp focus on eyes.',
    tags: ['绘画', 'Stable Diffusion', '摄影', '写实'],
    likes: 360,
    is_paid: false,
    price: 0
  },
  {
    title: '矢量扁平插画 (Corporate Memphis)',
    description: '科技公司官网常用的扁平化人物插画。',
    content: 'Corporate memphis style illustration, a team of diverse people building a giant rocket together, flat colors, purple and blue palette, vector art, exaggerated limbs, minimal background, tech startup vibes.',
    tags: ['绘画', 'DALL-E', '插画', '扁平化'],
    likes: 155,
    is_paid: false,
    price: 0
  },
  {
    title: '像素艺术 (Pixel Art) 城市',
    description: '生成 16-bit 风格的复古游戏背景。',
    content: 'Pixel art animation frame, cyberpunk city street at night, rain falling, neon signs in japanese, 16-bit style, snes graphics, detailed shading, dithering --ar 16:9',
    tags: ['绘画', 'Midjourney', '像素', '复古'],
    likes: 230,
    is_paid: false,
    price: 0
  },
  {
    title: 'UI 界面设计 - 玻璃拟态',
    description: '生成 Glassmorphism 风格的 App 界面。',
    content: 'Mobile app UI design for a weather app, glassmorphism style, frosted glass cards, blurred background, vibrant gradients, clean white icons, modern typography, dribbble trending --ar 9:16',
    tags: ['绘画', 'Midjourney', 'UI', '设计'],
    likes: 290,
    is_paid: false,
    price: 0
  },
  {
    title: '塔罗牌卡面设计',
    description: '设计一张神秘的塔罗牌“命运之轮”。',
    content: 'Tarot card design, The Wheel of Fortune, art nouveau style, intricate gold details, mystical symbols, celestial background, vintage paper texture, highly detailed illustration --ar 2:3',
    tags: ['绘画', 'Flux', '艺术', '塔罗'],
    likes: 180,
    is_paid: false,
    price: 0
  },
  {
    title: '无缝纹理材质 (Texture)',
    description: '生成可用于 3D 建模的无缝贴图。',
    content: 'Seamless texture of old cracked concrete wall, moss growing in cracks, realistic, high detail, 4k, top down view, flat lighting --tile',
    tags: ['绘画', 'Midjourney', '素材', '3D'],
    likes: 120,
    is_paid: false,
    price: 0
  },

  // --- 视频 (Video) ---
  {
    title: '可灵 AI - 舌尖上的中国风格',
    description: '生成美食纪录片风格的烹饪视频。',
    content: '特写镜头，慢动作展示一块红烧肉在锅中翻滚，色泽红亮，油脂滋滋作响，热气腾腾。背景是模糊的传统中式厨房，暖色调灯光，极具食欲感。High quality, 4k, cinematic lighting.',
    tags: ['视频', '可灵 AI', '美食', '纪录片'],
    likes: 410,
    is_paid: false,
    price: 0
  },
  {
    title: 'Sora - 历史重现：古罗马',
    description: '生成逼真的古罗马广场生活场景。',
    content: 'Drone shot flying over the ancient Roman Forum, people in togas walking, marble statues, sunlight hitting the columns, realistic textures, historical accuracy, cinematic movie scene.',
    tags: ['视频', 'Sora', '历史', '电影'],
    likes: 350,
    is_paid: false,
    price: 0
  },
  {
    title: 'Vidu - 动漫变身特效',
    description: '生成二次元角色魔法变身的炫酷视频。',
    content: 'A high school girl transforms into a magical warrior, glowing ribbons of light wrap around her, outfit changes instantly, particle effects, dynamic camera angle, anime style, sakuga animation.',
    tags: ['视频', 'Vidu', '动漫', '特效'],
    likes: 220,
    is_paid: false,
    price: 0
  },
  {
    title: 'Runway Gen-3 - 超现实液体雕塑',
    description: '生成抽象的流体艺术视频。',
    content: 'Abstract liquid gold morphing into different geometric shapes, zero gravity, floating in a white void, studio lighting, reflections, slow motion, satisfying video.',
    tags: ['视频', 'Runway', '抽象', '艺术'],
    likes: 190,
    is_paid: false,
    price: 0
  },
  {
    title: 'Luma - 恐怖片氛围',
    description: '生成阴森恐怖的走廊场景。',
    content: 'POV walking down a dark abandoned hospital hallway, flickering lights, paint peeling off walls, eerie atmosphere, handheld camera movement, found footage style.',
    tags: ['视频', 'Luma', '恐怖', '氛围'],
    likes: 165,
    is_paid: false,
    price: 0
  },
  {
    title: 'Haiper - 可爱宠物定格动画',
    description: '生成类似定格动画质感的宠物视频。',
    content: 'Stop motion animation style, a felt wool puppy jumping over a mushroom, cute, soft lighting, depth of field, handmade texture.',
    tags: ['视频', 'Haiper', '可爱', '定格'],
    likes: 280,
    is_paid: false,
    price: 0
  },
  {
    title: '无人机穿越 (FPV) - 火山',
    description: '生成惊险的穿越火山口视频。',
    content: 'FPV drone diving into an active volcano, lava bubbling, smoke, extreme heat distortion, fast motion, dynamic acrobatics, 4k.',
    tags: ['视频', 'Runway', '风景', 'FPV'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: '电商产品展示 - 旋转',
    description: '生成高端手表的 360 度展示视频。',
    content: 'Cinematic product shot, a luxury silver watch rotating 360 degrees, levitating, sparks of light reflecting on the bezel, dark background, commercial quality.',
    tags: ['视频', 'Pika', '商业', '产品'],
    likes: 145,
    is_paid: false,
    price: 0
  },
  {
    title: '水墨动画 - 鲤鱼跃龙门',
    description: '生成中国传统水墨风格的动画。',
    content: 'Traditional Chinese ink wash animation, a koi fish jumping out of the water, splashing ink droplets, transforming into a dragon, heavy brush strokes, artistic.',
    tags: ['视频', '可灵 AI', '国风', '水墨'],
    likes: 310,
    is_paid: false,
    price: 0
  },
  {
    title: '赛博朋克城市雨夜',
    description: '生成银翼杀手风格的城市循环视频。',
    content: 'Cyberpunk city street at night, heavy rain, neon signs reflecting in puddles, flying cars passing by overhead, atmospheric fog, blade runner vibes, seamless loop.',
    tags: ['视频', 'Sora', '赛博朋克', '循环'],
    likes: 295,
    is_paid: false,
    price: 0
  },

  // --- 商业 (Business) ---
  {
    title: 'Excel / Google Sheets 复杂公式',
    description: '生成处理复杂数据的 Spreadsheet 公式。',
    content: '我有一列全名 (A列)，如 "John A. Doe"。请给我一个 Excel 公式，提取中间名（如果存在），如果没有中间名则返回空。考虑到名字可能有 2 个或 3 个部分的情况。',
    tags: ['商业', 'ChatGPT', 'Excel', '工具'],
    likes: 135,
    is_paid: false,
    price: 0
  },
  {
    title: '麦肯锡风格 PPT 大纲',
    description: '为战略咨询项目生成金字塔原理的 PPT 结构。',
    content: '主题：传统零售企业数字化转型战略。\n请用麦肯锡“金字塔原理”生成 PPT 故事线 (Storyline)。\n1. 现状 (Situation)\n2. 冲突 (Complication)\n3. 问题 (Question)\n4. 答案 (Answer - 核心论点)\n5. 支撑论据 (3个 Key Pillars)',
    tags: ['商业', 'Claude', 'PPT', '咨询'],
    likes: 260,
    is_paid: false,
    price: 0
  },
  {
    title: '绩效考核 (KPI) 设定',
    description: '为特定岗位制定合理的 KPI 指标。',
    content: '请为“新媒体运营经理”这个职位制定季度 KPI。\n维度：\n1. 结果指标 (粉丝增长、转化率)。\n2. 过程指标 (发文频率、互动率)。\n请给出具体的计算公式和权重建议。',
    tags: ['商业', '通义千问', '管理', 'HR'],
    likes: 120,
    is_paid: false,
    price: 0
  },
  {
    title: '合同风险审查',
    description: '快速扫描合同草案中的潜在风险。',
    content: '（此处粘贴合同条款）\n请作为法务专家审查这段“租赁合同”条款。\n请指出对承租方（我方）不利的条款，特别是关于“提前退租违约金”和“装修免租期”的陷阱，并给出修改建议。',
    tags: ['商业', 'DeepSeek', '法律', '合同'],
    likes: 195,
    is_paid: false,
    price: 0
  },
  {
    title: '品牌命名 (Brand Naming)',
    description: '为新品牌生成富有创意且未注册的名字。',
    content: '我要做一个面向 Z 世代的无糖气泡水品牌。\n品牌调性：活力、搞怪、健康。\n请提供 10 个中文品牌名 + 对应的英文名。\n要求：2-3 个字，朗朗上口，带有社交属性（适合玩梗）。',
    tags: ['商业', 'Kimi', '品牌', '创意'],
    likes: 155,
    is_paid: false,
    price: 0
  },
  {
    title: '活动策划方案 (SOP)',
    description: '生成详细的线下活动执行流程表。',
    content: '我们要举办一场 200 人的线下“AI 开发者沙龙”。请帮我列一份执行 SOP (标准作业程序)。\n包含：\n1. 筹备期 (前 2 周)\n2. 宣传期\n3. 活动当天 (按小时的时间表)\n4. 应急预案 (断网、设备故障)',
    tags: ['商业', '文心一言', '活动', '策划'],
    likes: 140,
    is_paid: false,
    price: 0
  },
  {
    title: '竞品分析报告框架',
    description: '生成系统的竞争对手分析维度。',
    content: '请对比“瑞幸咖啡”和“星巴克中国”。\n分析维度：\n1. 产品定价策略。\n2. 选址逻辑。\n3. 用户画像差异。\n4. 数字化运营能力。\n请以表格形式输出对比结论。',
    tags: ['商业', '智谱AI', '分析', '调研'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: '销售话术：处理异议',
    description: '针对客户拒绝购买的常见理由生成回击话术。',
    content: '我在推销 SaaS 软件。客户说：“你们的产品很好，但是今年预算已经花完了，明年再说吧。”\n请提供 3 种回应策略：\n1. 强调早用的 ROI（投资回报）。\n2. 提供分期或试用方案。\n3. 挖掘隐性痛点。',
    tags: ['商业', 'ChatGPT', '销售', '话术'],
    likes: 185,
    is_paid: false,
    price: 0
  },

  // --- 聊天 (Chat) ---
  {
    title: 'MBTI 恋爱匹配分析',
    description: '分析两个 MBTI 人格类型的恋爱兼容性。',
    content: '我是 INFJ (提倡者)，我的伴侣是 ENTP (辩论家)。\n请分析我们的恋爱关系：\n1. 最吸引对方的点是什么？\n2. 潜在的冲突点在哪里？\n3. 如何更好地沟通？\n请用心理学角度分析。',
    tags: ['聊天', 'Grok', '情感', 'MBTI'],
    likes: 310,
    is_paid: false,
    price: 0
  },
  {
    title: '病历解读/医学科普',
    description: '用通俗语言解释复杂的体检报告。',
    content: '我的体检报告上写着“甲状腺结节 TI-RADS 3类”。\n请用通俗的语言告诉我：\n1. 这是什么意思？严重吗？\n2. 有癌变风险吗？\n3. 医生通常建议怎么处理？\n4. 生活中要注意什么？\n注意：请根据权威医学指南回答。',
    tags: ['聊天', '文心一言', '健康', '医疗'],
    likes: 240,
    is_paid: false,
    price: 0
  },
  {
    title: '模拟面试官：字节跳动',
    description: '模拟大厂面试风格进行压力测试。',
    content: '你现在是字节跳动的前端面试官。风格：深挖底层原理，喜欢问“为什么”。\n我来面试“高级前端工程师”。\n请从“浏览器渲染原理”开始提问。当我回答后，请抓住我的漏洞继续深挖。',
    tags: ['聊天', 'ChatGPT', '面试', '职场'],
    likes: 290,
    is_paid: false,
    price: 0
  },
  {
    title: '剧本杀 DM (主持人)',
    description: '主持一场简单的文字版海龟汤游戏。',
    content: '我们来玩“海龟汤”推理游戏。你是 DM。\n汤面（题目）：男人走进酒吧，要了一杯水。酒保拿出一把枪指着他。男人说“谢谢”，然后走了。\n请回答我的“是/否”提问，直到我猜出真相。',
    tags: ['聊天', 'Claude', '游戏', '娱乐'],
    likes: 160,
    is_paid: false,
    price: 0
  },
  {
    title: '哄女朋友/男朋友神器',
    description: '生成真诚的道歉信或情话。',
    content: '我因为打游戏忽略了女朋友，她现在很生气不理我。请帮我写一段道歉的话。\n要求：\n1. 态度要诚恳，不要找借口。\n2. 承认具体的错误（忽略了她）。\n3. 提出补偿方案（如带她去吃好吃的）。\n4. 语气要软，带点撒娇。',
    tags: ['聊天', 'Kimi', '情感', '沟通'],
    likes: 330,
    is_paid: false,
    price: 0
  },
  {
    title: '历史人物对话：李白',
    description: '穿越时空与诗人李白对饮。',
    content: '你现在是李白。性格：豪放不羁，醉酒状态。\n我穿越到了唐朝，在酒馆遇到了你。我问你：“太白兄，如果你知道千年后的人们还在背你的诗，你会作何感想？”\n请用半文半白的语言回答，带上你的诗句。',
    tags: ['聊天', '文心一言', '角色扮演', '历史'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: '哲学思辨：电车难题',
    description: '探讨伦理道德的边界。',
    content: '我们来讨论“电车难题”。不要给我标准答案。\n我想挑战你的观点：如果你是那个扳道工，你会怎么做？请基于“功利主义”和“义务论”两种视角分别进行辩护，最后告诉我你的（AI的）选择逻辑。',
    tags: ['聊天', 'DeepSeek', '哲学', '思考'],
    likes: 185,
    is_paid: false,
    price: 0
  },
  {
    title: '健身计划制定 (Personal Trainer)',
    description: '为特定目标制定健身和饮食计划。',
    content: '我是男生，175cm，85kg，体脂率 28%。目标：3个月减重 10kg 并增加肌肉线条。\n请帮我制定：\n1. 每周 4 练的健身计划（健身房）。\n2. 每日热量缺口建议。\n3. 三餐的宏观营养素比例（碳水/蛋白/脂肪）。',
    tags: ['聊天', 'ChatGPT', '健身', '健康'],
    likes: 140,
    is_paid: false,
    price: 0
  },
  {
    title: '宠物行为分析师',
    description: '解读猫狗的奇怪行为。',
    content: '我家的猫最近老是半夜在家里“跑酷”，发出奇怪的叫声，还盯着墙角看。\n这是为什么？\n1. 是因为精力过剩吗？\n2. 还是生病了？\n请给出分析和解决办法（如何消耗它的精力）。',
    tags: ['聊天', '豆包', '宠物', '科普'],
    likes: 195,
    is_paid: false,
    price: 0
  },
  {
    title: '每日星座运势 (Horoscope)',
    description: '生成带有神秘感的星座运势。',
    content: '我是天蝎座。请告诉我今天的运势。\n包含：\n1. 整体运势（星级）。\n2. 爱情运（给单身和有伴侣的建议）。\n3. 事业财运。\n4. 今日幸运色和幸运数字。\n风格要神秘、准确感。',
    tags: ['聊天', 'Gemini', '星座', '玄学'],
    likes: 270,
    is_paid: false,
    price: 0
  }
];

// Fallback for UI before DB load (empty now as we prefer DB data)
export const MOCK_PROMPTS: Prompt[] = [];