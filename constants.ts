import { Prompt, CategoryNode } from './types';
import { PenTool, Code, Palette, Briefcase, MessageSquare, LayoutGrid, Video } from 'lucide-react';

const TEXT_MODELS = [
  'ChatGPT', 'Gemini', 'Claude', 'Grok', 'DeepSeek', // International
  '豆包', '文心一言', 'Kimi', '通义千问', '智谱AI' // Chinese
];

const IMAGE_MODELS = [
  'Midjourney', 'Stable Diffusion', 'DALL-E', 'Flux', '即梦AI'
];

const VIDEO_MODELS = [
  'Sora', 'Runway', 'Pika', 'Luma', '可灵 AI', 'Vidu'
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

// High quality seed data for database population (50 Free Prompts)
export const SAMPLE_PROMPTS: Omit<Prompt, 'id' | 'created_at' | 'comments' | 'author_name' | 'author_id'>[] = [
  // --- 写作 (Writing) ---
  {
    title: '小红书爆款文案生成器',
    description: '一键生成吸引眼球的小红书风格种草文案，包含Emoji和标签。',
    content: '你现在是小红书爆款文案写手。请针对 [产品/主题] 写一篇种草笔记。要求：\n1. 标题要足够吸引人，使用感叹号和夸张语气。\n2. 正文多使用Emoji表情，段落短小精悍。\n3. 语气亲切活泼，像闺蜜聊天。\n4. 结尾加上相关的热门标签 #。\n5. 重点突出产品的 [核心卖点]。',
    tags: ['写作', 'ChatGPT', '小红书', '营销'],
    likes: 342,
    is_paid: false,
    price: 0
  },
  {
    title: '学术论文润色 (Academic Polishing)',
    description: '将草稿修改为符合学术标准的英语论文，提升用词专业度。',
    content: 'I want you to act as an academic journal editor. I will provide you with my paragraph and you will rewrite it to make it more academic and professional. Use sophisticated vocabulary and complex sentence structures where appropriate, but ensure clarity. Here is the paragraph: [Insert Text]',
    tags: ['写作', 'Claude', '学术', '英语'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: 'SEO 优化博客大纲',
    description: '为特定关键词生成符合搜索引擎优化结构的文章大纲。',
    content: '请根据关键词 "[关键词]" 生成一份详细的博客文章大纲。要求：\n1. 包含引人注目的 H1 标题。\n2. 包含至少 4 个 H2 副标题，涵盖用户搜索意图。\n3. 建议每个部分的重点内容。\n4. 包含 FAQ 部分以增加长尾词覆盖。',
    tags: ['写作', 'Gemini', 'SEO', '博客'],
    likes: 156,
    is_paid: false,
    price: 0
  },
  {
    title: '知乎高赞回答风格',
    description: '模拟知乎大V的语气，用讲故事和数据结合的方式回答问题。',
    content: '请以知乎高赞回答的风格回答这个问题："[问题内容]"。\n要求：\n1. 开头使用“谢邀”或“刚下飞机”。\n2. 运用“先说结论”的结构。\n3. 穿插个人经历或故事（Storytelling）。\n4. 引用数据或理论支持观点。\n5. 语气要理性、客观但略带犀利。',
    tags: ['写作', 'DeepSeek', '知乎', '社媒'],
    likes: 189,
    is_paid: false,
    price: 0
  },
  {
    title: '短视频分镜脚本生成',
    description: '将一个主题转化为带画面描述和台词的短视频脚本。',
    content: '请帮我为一个关于 [主题] 的 60秒短视频编写分镜脚本。输出格式为表格：\n| 序号 | 景别 | 画面描述 | 台词/旁白 | 时长 |\n要求节奏紧凑，前3秒必须有黄金开场（Hook）。',
    tags: ['写作', 'ChatGPT', '短视频', '脚本'],
    likes: 275,
    is_paid: false,
    price: 0
  },
  {
    title: '微信公众号爆款标题党',
    description: '为文章生成 10 个高点击率的公众号标题。',
    content: '请为主题是 "[文章主题]" 的公众号文章生成 10 个标题。\n要求使用以下心理学技巧：\n1. 制造悬念（“从来没见过...”）\n2. 引发焦虑（“再不看就...”）\n3. 数字量化（“3个步骤...”）\n4. 强烈的对比。\n请确保标题不超过 20 个字。',
    tags: ['写作', '文心一言', '公众号', '标题'],
    likes: 132,
    is_paid: false,
    price: 0
  },
  {
    title: '科幻小说世界观设定',
    description: '构建一个独特的科幻背景设定，包括社会结构和科技水平。',
    content: '请为一部科幻小说创建一个世界观设定。背景设定在 2150 年的地球。需要包含：\n1. 核心科技（如：意识上传、反重力）。\n2. 社会阶层结构。\n3. 主要的政治势力。\n4. 环境状况。\n风格偏向赛博朋克或反乌托邦。',
    tags: ['写作', 'Claude', '小说', '创意'],
    likes: 98,
    is_paid: false,
    price: 0
  },
  {
    title: '日报/周报生成器',
    description: '根据简单的任务列表，扩写成专业的职场日报或周报。',
    content: '请根据以下工作内容，帮我写一份正式的日报。\n工作内容：[列出简单的工作点]\n要求：\n1. 使用专业的职场术语（如：赋能、闭环、落地）。\n2. 分为“今日完成”、“遇到问题”、“明日计划”三个部分。\n3. 语气积极向上。',
    tags: ['写作', '通义千问', '职场', '效率'],
    likes: 412,
    is_paid: false,
    price: 0
  },
  {
    title: '产品发布会演讲稿',
    description: '模仿乔布斯风格，撰写激动人心的产品发布演讲。',
    content: '请模仿史蒂夫·乔布斯的风格，为我们的新产品 [产品名称] 写一段 3 分钟的开场演讲稿。强调“创新”、“革命性”和“用户体验”。使用短句，充满激情和自信。',
    tags: ['写作', 'ChatGPT', '演讲', '商业'],
    likes: 145,
    is_paid: false,
    price: 0
  },
  {
    title: '儿童绘本故事',
    description: '创作适合 3-6 岁儿童阅读的富有教育意义的绘本故事。',
    content: '请写一个关于“分享”主题的儿童绘本故事。主角是一只叫“嘟嘟”的小熊。故事要简单易懂，包含重复的句式（方便儿童记忆），结局要温馨。',
    tags: ['写作', '豆包', '儿童', '故事'],
    likes: 167,
    is_paid: false,
    price: 0
  },

  // --- 编程 (Coding) ---
  {
    title: 'React + Tailwind 组件生成',
    description: '快速生成美观、响应式的 React UI 组件代码。',
    content: '请使用 React (TypeScript) 和 Tailwind CSS 编写一个 [组件名称，如：登录卡片]。\n要求：\n1. 界面现代简洁，黑白灰配色。\n2. 包含响应式设计 (Mobile First)。\n3. 使用 Lucide React 图标。\n4. 代码完全模块化，可以直接复制使用。\n5. 不要使用额外的 CSS 文件。',
    tags: ['编程', 'ChatGPT', 'React', 'Frontend'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: 'Python 全能爬虫脚本',
    description: '基于 Scrapy 或 BeautifulSoup 的通用网页爬虫框架代码。',
    content: '请写一个 Python 爬虫脚本，用于抓取 [目标网站 URL] 的数据。要求：\n1. 使用 requests 和 BeautifulSoup 库。\n2. 包含 User-Agent 伪装，防止被反爬。\n3. 将抓取到的 [具体字段] 保存为 CSV 文件。\n4. 添加异常处理机制 (try-except)。\n5. 代码需要有详细的中文注释。',
    tags: ['编程', 'DeepSeek', 'Python', '爬虫'],
    likes: 89,
    is_paid: false,
    price: 0
  },
  {
    title: 'SQL 查询优化专家',
    description: '分析复杂的 SQL 查询并提供性能优化建议。',
    content: '我有一个运行缓慢的 SQL 查询：\n```sql\n[插入 SQL 代码]\n```\n请分析这段代码可能存在的性能问题（如全表扫描、索引失效），并提供优化后的版本。请解释优化的原理。',
    tags: ['编程', 'Grok', 'SQL', '数据库'],
    likes: 145,
    is_paid: false,
    price: 0
  },
  {
    title: '正则表达式生成器',
    description: '根据自然语言描述生成复杂的 Regex 表达式。',
    content: '我需要一个正则表达式来匹配 [描述需求，例如：中国大陆手机号码]。\n请提供：\n1. 正则表达式模式。\n2. 在 Python/JavaScript 中使用的代码示例。\n3. 对表达式各部分的详细解释。',
    tags: ['编程', 'ChatGPT', 'Regex', '工具'],
    likes: 178,
    is_paid: false,
    price: 0
  },
  {
    title: 'Git Commit Message 规范化',
    description: '将随意的代码提交信息转换为符合 Conventional Commits 规范的格式。',
    content: '我刚刚修改了代码：[描述修改内容]。\n请帮我生成一个符合 Conventional Commits 规范的 Git 提交信息。\n格式应为：<type>(<scope>): <subject>',
    tags: ['编程', 'DeepSeek', 'Git', '开发'],
    likes: 88,
    is_paid: false,
    price: 0
  },
  {
    title: 'TypeScript 接口定义生成',
    description: '根据 JSON 数据自动生成 TypeScript Interface。',
    content: '请根据以下 JSON 数据，生成对应的 TypeScript Interface 定义。\nJSON:\n[插入 JSON]\n要求：\n1. 使用 PascalCase 命名接口。\n2. 能够处理嵌套对象。\n3. 尽可能推断具体的类型。',
    tags: ['编程', 'Claude', 'TypeScript', '工具'],
    likes: 120,
    is_paid: false,
    price: 0
  },
  {
    title: '代码 Code Review 助手',
    description: '作为资深工程师审查代码，寻找 Bug 和 坏味道。',
    content: '请作为一名资深全栈工程师 Review 以下代码：\n```\n[代码片段]\n```\n请指出：\n1. 潜在的 Bug 或安全漏洞。\n2. 代码风格问题（Code Smell）。\n3. 性能优化建议。\n4. 可读性改进建议。',
    tags: ['编程', 'Gemini', 'CodeReview', '质量'],
    likes: 230,
    is_paid: false,
    price: 0
  },
  {
    title: 'Vue 3 组合式 API 转换器',
    description: '将 Vue 2 的 Options API 代码重构为 Vue 3 Composition API。',
    content: '请将以下 Vue 2 Options API 代码重构为 Vue 3 使用 `<script setup>` 的 Composition API 写法：\n```javascript\n[插入 Vue 2 代码]\n```',
    tags: ['编程', '通义千问', 'Vue', '前端'],
    likes: 110,
    is_paid: false,
    price: 0
  },
  {
    title: 'Docker Compose 配置生成',
    description: '为常见的开发栈生成 docker-compose.yml 文件。',
    content: '请帮我写一个 docker-compose.yml 文件。技术栈包括：\n1. Node.js (Express) 后端。\n2. PostgreSQL 数据库。\n3. Redis 缓存。\n要求配置好网络连接，设置数据卷持久化，并包含环境变量配置示例。',
    tags: ['编程', 'ChatGPT', 'Docker', 'DevOps'],
    likes: 95,
    is_paid: false,
    price: 0
  },
  {
    title: 'LeetCode 解题助手',
    description: '提供算法题的解题思路和多语言实现。',
    content: '我正在解决 LeetCode 题目：[题目名称/描述]。请提供：\n1. 解题思路分析（包括暴力解法和最优解法）。\n2. 时间复杂度和空间复杂度分析。\n3. Java 和 Python 的代码实现。',
    tags: ['编程', 'Claude', '算法', '面试'],
    likes: 180,
    is_paid: false,
    price: 0
  },

  // --- 绘画 (Art/Image) ---
  {
    title: 'Midjourney 赛博朋克少女',
    description: '生成高质量、电影感的赛博朋克风格人物肖像。',
    content: '/imagine prompt: A futuristic cyberpunk girl with neon glowing hair, standing in a rainy Tokyo street at night, reflection in puddles, cinematic lighting, volumetric fog, high detail, 8k resolution, photorealistic, unreal engine 5 render, cyberpunk 2077 style --ar 9:16 --v 6.0',
    tags: ['绘画', 'Midjourney', '赛博朋克', '人像'],
    likes: 520,
    is_paid: false,
    price: 0
  },
  {
    title: 'Logo 设计灵感生成',
    description: '为初创公司生成极简风格的 Logo 设计提示词。',
    content: 'Minimalist logo design for a tech startup named "Nebula", abstract geometric shape representing a cloud and a star, clean lines, vector style, flat design, blue and white color palette, white background --no text, realistic, shadows',
    tags: ['绘画', 'DALL-E', 'Logo', '设计'],
    likes: 310,
    is_paid: false,
    price: 0
  },
  {
    title: '皮克斯风格 3D 角色',
    description: '生成类似迪士尼/皮克斯动画风格的可爱 3D 角色。',
    content: 'A cute 3D rendered character in the style of Pixar, a fluffy orange cat wearing a space suit, big expressive eyes, soft studio lighting, 3d render, blender, c4d, octane render, clay material, high quality --ar 1:1',
    tags: ['绘画', 'Midjourney', '3D', '可爱'],
    likes: 445,
    is_paid: false,
    price: 0
  },
  {
    title: '水墨山水画风格',
    description: '生成中国传统水墨风格的风景画。',
    content: 'Traditional Chinese ink wash painting, shanshui style, misty mountains, twisting pine trees, a small boat on the river, negative space, black ink on rice paper, elegant brushstrokes, zen atmosphere --ar 16:9',
    tags: ['绘画', '即梦AI', '中国风', '水墨'],
    likes: 298,
    is_paid: false,
    price: 0
  },
  {
    title: '室内设计效果图',
    description: '生成现代极简风格的客厅室内设计渲染图。',
    content: 'Interior design photography of a modern minimalist living room, beige sofa, floor-to-ceiling windows, natural sunlight, indoor plants, marble coffee table, warm wood flooring, architectural digest style, 8k, photorealistic --ar 4:3',
    tags: ['绘画', 'Stable Diffusion', '室内设计', '建筑'],
    likes: 367,
    is_paid: false,
    price: 0
  },
  {
    title: '复古 80年代 蒸汽波',
    description: '生成 80年代复古未来主义/蒸汽波风格的插画。',
    content: 'Retrowave aesthetic, 1980s style, sunset with grid lines, palm trees silhouettes, purple and pink neon gradient, vhs glitch effect, synthwave vibe, digital art --ar 16:9',
    tags: ['绘画', 'Flux', '复古', '蒸汽波'],
    likes: 220,
    is_paid: false,
    price: 0
  },
  {
    title: '产品摄影 - 香水瓶',
    description: '生成高端商业级的产品摄影图。',
    content: 'Professional product photography of a luxury perfume bottle, glass texture, gold cap, placed on a black reflective surface, moody lighting, water droplets, bokeh background, macro shot, 8k resolution --ar 4:5',
    tags: ['绘画', 'Midjourney', '摄影', '商业'],
    likes: 190,
    is_paid: false,
    price: 0
  },
  {
    title: '游戏图标 - 魔法药水',
    description: '生成游戏用的 UI 图标素材。',
    content: 'Game icon asset, a magical blue potion bottle, glowing liquid, fantasy style, mobile game UI, clean background, vector illustration style, detailed shading --no text',
    tags: ['绘画', 'DALL-E', '游戏', '素材'],
    likes: 155,
    is_paid: false,
    price: 0
  },
  {
    title: '日式动漫风格场景',
    description: '生成新海诚风格的动漫背景图。',
    content: 'Anime style background art by Makoto Shinkai, a train station at sunset, lens flare, vibrant blue and orange sky, cumulus clouds, highly detailed, emotional atmosphere, 4k wallpaper --ar 16:9',
    tags: ['绘画', 'Midjourney', '动漫', '壁纸'],
    likes: 280,
    is_paid: false,
    price: 0
  },
  {
    title: '贴纸/表情包设计',
    description: '设计可爱的一套表情包贴纸。',
    content: 'A sticker sheet design of a cute chubby corgi dog doing different activities (sleeping, eating, playing), white border, flat vector style, pastel colors, high quality, isolated on white background',
    tags: ['绘画', '即梦AI', '设计', '贴纸'],
    likes: 140,
    is_paid: false,
    price: 0
  },

  // --- 视频 (Video) ---
  {
    title: 'Sora 电影级 - 东京街头',
    description: 'OpenAI Sora 官方演示案例，生成逼真的东京街头漫步视频。',
    content: 'A stylish woman walks down a Tokyo street filled with warm glowing neon and animated city signage. She wears a black leather jacket, a long red dress, and black boots, and carries a black purse. She wears sunglasses and red lipstick. She walks confidently and casually. The street is damp and reflective, creating a mirror effect of the colorful lights. Many pedestrians walk about.',
    tags: ['视频', 'Sora', '电影感', '写实'],
    likes: 888,
    is_paid: false,
    price: 0
  },
  {
    title: '可灵 AI - 熊猫太极',
    description: '生成中国风武侠动作视频的提示词。',
    content: '一只穿着中国古代侠客长袍的熊猫，在竹林中练习太极拳。动作流畅自然，竹叶随风飘落，光影斑驳。高画质，电影级构图，特写镜头捕捉熊猫的眼神和手部动作，背景虚化。4k resolution, highly detailed.',
    tags: ['视频', '可灵 AI', '国潮', '动画'],
    likes: 330,
    is_paid: false,
    price: 0
  },
  {
    title: 'Runway Gen-2 - 云海穿梭',
    description: '生成第一人称视角的飞行视频。',
    content: 'FPV drone shot, flying through fluffy white clouds at sunset, golden hour lighting, cinematic motion, hyper-realistic, 4k, smooth transition, dreamlike atmosphere.',
    tags: ['视频', 'Runway', '风景', '航拍'],
    likes: 210,
    is_paid: false,
    price: 0
  },
  {
    title: 'Pika Labs - 融化的冰淇淋',
    description: '生成物体物理变化的视频效果。',
    content: 'Close up shot of a strawberry ice cream cone melting under the hot sun, droplets running down, creamy texture, time-lapse style, high quality, 3d animation style.',
    tags: ['视频', 'Pika', '美食', '特写'],
    likes: 180,
    is_paid: false,
    price: 0
  },
  {
    title: 'Luma Dream Machine - 老照片动起来',
    description: '让静止的历史老照片变成动态视频。',
    content: 'An old black and white photo of a 1920s jazz band playing in a club. The musicians start moving, playing their instruments, smoke fills the room, camera slowly zooms in. Realistic motion, preserving the vintage grain.',
    tags: ['视频', 'Luma', '复古', '动态照片'],
    likes: 250,
    is_paid: false,
    price: 0
  },
  {
    title: 'Vidu - 赛博朋克赛车',
    description: '生成高速运动的赛车追逐场景。',
    content: 'High speed cybernetic car chase on a futuristic highway, neon lights streaking, motion blur, sparks flying, camera following the lead car low to the ground, intense action, cinematic look.',
    tags: ['视频', 'Vidu', '赛博朋克', '汽车'],
    likes: 195,
    is_paid: false,
    price: 0
  },
  {
    title: '微距延时摄影 - 花开',
    description: '模拟微距镜头拍摄花朵绽放的过程。',
    content: 'Macro timelapse video of a pink rose blooming, black background, studio lighting, dew drops on petals, 4k resolution, smooth motion, high detail.',
    tags: ['视频', 'Runway', '自然', '延时'],
    likes: 160,
    is_paid: false,
    price: 0
  },
  {
    title: '水下世界探险',
    description: '生成深海潜水的第一人称视角视频。',
    content: 'POV underwater diving in a coral reef, colorful fish swimming by, sun rays penetrating the water surface, crystal clear blue water, 4k, realistic texture.',
    tags: ['视频', 'Sora', '自然', '探险'],
    likes: 220,
    is_paid: false,
    price: 0
  },
  {
    title: '未来城市航拍',
    description: '生成科幻风格的未来城市俯瞰视频。',
    content: 'Aerial drone shot of a futuristic sci-fi city with flying cars, towering skyscrapers with holographic ads, night time, rain, blade runner vibe, cinematic lighting.',
    tags: ['视频', 'Luma', '科幻', '城市'],
    likes: 275,
    is_paid: false,
    price: 0
  },
  {
    title: '卡通角色跳舞',
    description: '生成 3D 卡通角色跳舞的动画视频。',
    content: 'A cute 3D cartoon robot dancing on a disco floor, colorful lights, smooth animation, pixar style, loopable, 4k resolution.',
    tags: ['视频', 'Pika', '动画', '趣味'],
    likes: 145,
    is_paid: false,
    price: 0
  },

  // --- 商业 (Business) ---
  {
    title: '商业计划书 (BP) 撰写助手',
    description: '为创业项目生成专业的商业计划书大纲和核心内容。',
    content: '作为一名资深投资经理，请帮我为 [项目名称] 写一份商业计划书大纲。项目属于 [行业领域]。请包含以下部分：\n1. 项目痛点与解决方案\n2. 市场规模分析 (TAM/SAM/SOM)\n3. 核心商业模式\n4. 竞争对手分析\n5. 融资计划与资金用途\n请用专业、客观的商业语言撰写。',
    tags: ['商业', 'Claude', '创业', 'BP'],
    likes: 156,
    is_paid: false,
    price: 0
  },
  {
    title: 'SWOT 分析专家',
    description: '对任何公司、产品或个人进行深度 SWOT 分析。',
    content: '请对 [公司/产品名称] 进行详细的 SWOT 分析。\n- Strengths (优势): 列出内部核心竞争力。\n- Weaknesses (劣势): 列出内部短板。\n- Opportunities (机会): 列出外部市场机会。\n- Threats (威胁): 列出外部竞争威胁。\n最后请给出基于分析的 3 条战略建议。',
    tags: ['商业', '通义千问', '分析', '策略'],
    likes: 95,
    is_paid: false,
    price: 0
  },
  {
    title: '冷邮件 (Cold Email) 营销模版',
    description: '生成高转化率的 B2B 销售开发邮件。',
    content: '请帮我写一封 Cold Email 给 [目标公司] 的 [职位，如 CTO]。我们的产品是 [产品描述]。\n要求：\n1. 标题要吸引打开。\n2. 开头简短表明来意并赞美对方公司。\n3. 指出对方可能面临的问题。\n4. 提出我们的解决方案。\n5. 结尾包含明确的 CTA (Call to Action)。',
    tags: ['商业', 'ChatGPT', '营销', '邮件'],
    likes: 130,
    is_paid: false,
    price: 0
  },
  {
    title: '面试模拟官 (面试者视角)',
    description: '模拟面试官提问，帮助准备面试。',
    content: '我正在准备 [职位，如：产品经理] 的面试。请作为面试官，向我提出 5 个常见的、具有挑战性的面试问题（包含行为面试题和专业技能题）。每问完一个问题，等待我回答，然后对我的回答进行点评。',
    tags: ['商业', 'Gemini', '面试', '职场'],
    likes: 280,
    is_paid: false,
    price: 0
  },
  {
    title: 'OKRs 制定助手',
    description: '帮助制定符合 SMART 原则的季度目标和关键结果。',
    content: '请帮我为 [部门/团队] 制定本季度的 OKRs (Objectives and Key Results)。我们的核心重点是 [核心目标，如：用户增长]。请给出 1 个 O 和 3-4 个 KRs，确保 KRs 是可量化的、有挑战性但可实现的。',
    tags: ['商业', 'DeepSeek', '管理', 'OKR'],
    likes: 110,
    is_paid: false,
    price: 0
  },
  {
    title: '危机公关声明生成',
    description: '针对突发负面事件生成得体的官方回应声明。',
    content: '假设公司发生了 [危机事件描述]。请以公关总监的身份起草一份对外声明。\n原则：\n1. 态度诚恳，第一时间道歉。\n2. 不推卸责任，说明事实真相（或调查中）。\n3. 给出具体的整改措施或赔偿方案。\n4. 语气庄重、负责。',
    tags: ['商业', 'Kimi', '公关', '危机处理'],
    likes: 175,
    is_paid: false,
    price: 0
  },
  {
    title: '用户画像 (Persona) 构建',
    description: '根据产品定位生成详细的目标用户画像。',
    content: '我们的产品是 [产品描述]。请帮我构建 3 个典型的目标用户画像 (User Persona)。每个画像包含：姓名、年龄、职业、性格特征、痛点、需求、使用场景。',
    tags: ['商业', 'Claude', '产品', '用户研究'],
    likes: 125,
    is_paid: false,
    price: 0
  },
  {
    title: 'Slogan 标语生成器',
    description: '为品牌生成朗朗上口、令人印象深刻的标语。',
    content: '请为品牌 [品牌名称] 生成 10 个 Slogan。品牌定位是 [定位]。要求：简短有力、易于传播、朗朗上口。可以尝试押韵、双关等修辞手法。',
    tags: ['商业', '文心一言', '营销', '创意'],
    likes: 90,
    is_paid: false,
    price: 0
  },

  // --- 聊天 (Chat) ---
  {
    title: '私人英语口语教练',
    description: '模拟雅思/托福口语考试场景，进行一对一对话练习。',
    content: '你现在是我的英语口语私教。请以 [话题，如：旅游] 为主题与我进行对话。\n规则：\n1. 你先问我一个问题。\n2. 等我回答后，指出我的语法错误（如果有）并给出更地道的表达方式。\n3. 然后继续问下一个问题。\n4. 保持对话轻松自然，但富有教育意义。',
    tags: ['聊天', 'Gemini', '英语学习', '教育'],
    likes: 78,
    is_paid: false,
    price: 0
  },
  {
    title: '塔罗牌占卜师',
    description: '神秘风格的塔罗牌解读，提供心理暗示和指引。',
    content: '你是一位神秘的塔罗牌占卜师。我心里默念的问题是：[输入问题]。\n请随机抽取三张牌（过去、现在、未来），并为我详细解读牌面含义。解读风格需要神秘、充满隐喻，同时给出积极的心理暗示和生活指引。',
    tags: ['聊天', 'Claude', '占卜', '娱乐'],
    likes: 112,
    is_paid: false,
    price: 0
  },
  {
    title: '苏格拉底式导师',
    description: '通过不断的提问引导用户进行深度思考。',
    content: '请扮演苏格拉底。不要直接给我答案。当我提出一个观点或问题时，请通过一系列反问（苏格拉底产婆术）来引导我审视自己的假设，发现逻辑漏洞，并最终自己得出结论。我的第一个观点是：[输入观点]。',
    tags: ['聊天', 'ChatGPT', '哲学', '思维'],
    likes: 190,
    is_paid: false,
    price: 0
  },
  {
    title: '哄睡故事生成器',
    description: '为孩子生成温馨、治愈的睡前故事。',
    content: '请讲一个适合 5 岁小朋友听的睡前故事。主角是一只 [动物，如：害羞的小兔子]。故事主题关于 [主题，如：勇气]。语气要温柔、舒缓，多用叠词。故事结尾要温馨，能引导孩子入睡。',
    tags: ['聊天', '豆包', '故事', '儿童'],
    likes: 255,
    is_paid: false,
    price: 0
  },
  {
    title: 'MBTI 人格分析师',
    description: '基于用户的描述分析其可能的人格类型。',
    content: '我将描述我在某些情况下的反应和想法。请据此分析我可能属于 MBTI 16型人格中的哪一种，并解释原因。\n场景：[描述场景，如：在大型聚会中感到疲惫，喜欢提前规划行程...]。',
    tags: ['聊天', '通义千问', '心理学', 'MBTI'],
    likes: 160,
    is_paid: false,
    price: 0
  },
  {
    title: '吵架/辩论模拟器',
    description: '模拟反方辩手，锻炼用户的逻辑思维和辩论能力。',
    content: '我想练习辩论。我是正方，观点是：[输入观点]。你是反方。请针对我的观点进行反驳，找出逻辑漏洞，并提出有力的反方论点。请保持理性、犀利，不要进行人身攻击。',
    tags: ['聊天', 'Grok', '辩论', '逻辑'],
    likes: 85,
    is_paid: false,
    price: 0
  },
  {
    title: '高情商回复助手',
    description: '帮助应对尴尬的社交场景，提供得体的回复。',
    content: '别人对我说："[尴尬的话，如：你怎么又胖了]"。\n请帮我生成 3 个高情商的回复：\n1. 幽默化解型。\n2. 礼貌回怼型。\n3. 转移话题型。',
    tags: ['聊天', 'Kimi', '情商', '社交'],
    likes: 320,
    is_paid: false,
    price: 0
  },
  {
    title: '旅行规划向导',
    description: '为特定目的地生成详细的旅行攻略。',
    content: '我想去 [目的地，如：成都] 玩 3 天。请帮我规划一份详细的行程。\n要求：\n1. 包含必打卡的美食和景点。\n2. 路线安排要合理，不要绕路。\n3. 推荐适合年轻人的小众玩法。\n4. 列出大概的预算。',
    tags: ['聊天', '智谱AI', '旅行', '攻略'],
    likes: 205,
    is_paid: false,
    price: 0
  },
  {
    title: '梦境解析师',
    description: '根据弗洛伊德或荣格心理学解析梦境。',
    content: '我昨晚做了一个梦：[描述梦境内容]。\n请从心理学角度（荣格原型或潜意识）帮我分析这个梦可能代表的含义，以及它反映了我最近什么样的心理状态。',
    tags: ['聊天', 'ChatGPT', '心理学', '解梦'],
    likes: 140,
    is_paid: false,
    price: 0
  },
  {
    title: '厨艺小助手',
    description: '根据冰箱里的剩余食材生成菜谱。',
    content: '我冰箱里剩下：[食材列表，如：两个鸡蛋、半个洋葱、一包方便面]。\n请帮我设计一道简单好吃的晚餐食谱。给出详细的烹饪步骤。',
    tags: ['聊天', '豆包', '美食', '菜谱'],
    likes: 188,
    is_paid: false,
    price: 0
  }
];

// Fallback for UI before DB load (empty now as we prefer DB data)
export const MOCK_PROMPTS: Prompt[] = [];