// ============================================
// ARQUIVO: js/data.js - VEGANO 
// Gerado para o Receitafit.App (vegano).
// Categorias: Café da Manhã | Almoço/Janta | Lanches | Sobremesas | Sucos
// Imagens: placeholders via source.unsplash.com (troque pelo seu repositório futuro quando quiser)
// ============================================

const RECIPES = [{
    id: 1,
    name: 'Overnight Oats Proteico',
    category: 'Café da Manhã',
    calories: 420,
    protein: 18,
    carbs: 62,
    fats: 12,
    fiber: 10,
    time: 8,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Aveia e chia com pasta de amendoim e frutas, alto teor de fibras e saciedade.',
    tags: [
      'Proteico',
      'Rápido',
      'Sem açúcar refinado',
      'Fibras'
    ],
    benefits: [
      'Alta saciedade pela fibra',
      'Energia estável',
      'Bom pré ou pós-treino leve'
    ],
    allergens: [
      'Oleaginosas (pasta de amendoim)'
    ],
	
	
    image: 'image/overnight-oats-proteico.webp',
	
	
    ingredients: [
      {
        icon: 'wheat',
        quantity: '5 colheres sopa',
        text: 'aveia em flocos'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'chia'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'bebida vegetal (aveia/amêndoas/coco)'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'pasta de amendoim',
        optional: true
      },
      {
        icon: 'banana',
        quantity: '1/2 unidade',
        text: 'banana em rodelas'
      },
      {
        icon: 'strawberry',
        quantity: 'a gosto',
        text: 'morangos ou frutas vermelhas'
      }
    ],
    instructions: [
      'Misture aveia, chia e a bebida vegetal em um pote.',
      'Adicione canela (opcional) e mexa bem.',
      'Leve à geladeira por pelo menos 4 horas (ideal: noite inteira).',
      'Finalize com banana e frutas vermelhas.',
      'Se quiser, coloque pasta de amendoim por cima.',
      'Sirva gelado.'
    ],
    tips: [
      '💡 Ajuste a textura: mais bebida vegetal deixa mais cremoso.',
      '🔥 Para mais proteína: adicione 1 scoop de proteína vegetal (opcional).',
      '🍓 Use frutas congeladas para ficar mais refrescante.'
    ],
	
	
    images: {
      hero: 'image/overnight-oats-proteico.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '17% proteína, 59% carboidratos, 26% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 2,
    name: 'Tofu Mexido',
    category: 'Café da Manhã',
    calories: 290,
    protein: 22,
    carbs: 10,
    fats: 18,
    fiber: 4,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Tofu temperado e dourado, versão vegana do “ovo mexido”, rico em proteína.',
    tags: [
      'Proteico',
      'Sem glúten',
      'Rápido',
      'Salgado'
    ],
    benefits: [
      'Boa proteína vegetal',
      'Rápido e prático',
      'Ótimo para sanduíches'
    ],
    allergens: [
      'Soja'
    ],
	
	
    image: 'image/tofu-mexido.webp',
	
	
    ingredients: [
      {
        icon: 'square',
        quantity: '150g',
        text: 'tofu firme amassado'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'azeite'
      },
      {
        icon: 'sparkles',
        quantity: '1/2 colher chá',
        text: 'cúrcuma'
      },
      {
        icon: 'leaf',
        quantity: '1 colher sopa',
        text: 'cebolinha picada'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e pimenta'
      },
      {
        icon: 'flame',
        quantity: '1 colher sopa',
        text: 'levedura nutricional',
        optional: true
      }
    ],
    instructions: [
      'Aqueça o azeite na frigideira.',
      'Adicione o tofu amassado e refogue 2 minutos.',
      'Tempere com cúrcuma, sal e pimenta.',
      'Doure por 4–5 minutos, mexendo para não grudar.',
      'Finalize com cebolinha e levedura nutricional (opcional).',
      'Sirva quente.'
    ],
    tips: [
      '🥪 Fica ótimo em pão integral com tomate.',
      '🌶️ Para mais sabor: use páprica defumada.',
      '🍄 Adicione cogumelos para uma versão mais completa.'
    ],
	
	
    images: {
      hero: 'image/tofu-mexido.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '30% proteína, 14% carboidratos, 56% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 3,
    name: 'Panqueca Vegana de Banana e Aveia',
    category: 'Café da Manhã',
    calories: 360,
    protein: 10,
    carbs: 62,
    fats: 8,
    fiber: 9,
    time: 15,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Panqueca macia sem ovos, com banana madura e aveia.',
    tags: [
      'Sem ovo',
      'Rápida',
      'Doce natural',
      'Fibras'
    ],
    benefits: [
      'Sem açúcar refinado',
      'Boa energia para manhã',
      'Ajuda no controle de fome'
    ],
    allergens: [
      'Glúten (se aveia não certificada)'
    ],
	
	
    image: 'image/panqueca-vegana-de-banana-e-aveia.webp',
	
	
    ingredients: [
      {
        icon: 'banana',
        quantity: '1 unidade',
        text: 'banana madura'
      },
      {
        icon: 'wheat',
        quantity: '4 colheres sopa',
        text: 'aveia'
      },
      {
        icon: 'droplets',
        quantity: '80ml',
        text: 'bebida vegetal'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'fermento químico'
      },
      {
        icon: 'circle',
        quantity: '1/2 colher chá',
        text: 'canela',
        optional: true
      }
    ],
    instructions: [
      'Amasse a banana em uma tigela.',
      'Misture a aveia e a bebida vegetal até virar massa.',
      'Adicione canela e fermento e misture delicadamente.',
      'Aqueça uma frigideira antiaderente levemente untada.',
      'Cozinhe por 2 minutos de cada lado.',
      'Sirva com frutas ou pasta de amendoim (opcional).'
    ],
    tips: [
      '🥞 Se quiser mais fofinha: deixe a massa descansar 5 min.',
      '🍓 Top: morangos + canela.',
      '🧊 Banana bem madura dá mais doçura.'
    ],
	
	
    images: {
      hero: 'image/panqueca-vegana-de-banana-e-aveia.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '11% proteína, 69% carboidratos, 20% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 4,
    name: 'Vitamina Proteica de Morango',
    category: 'Café da Manhã',
    calories: 260,
    protein: 8,
    carbs: 45,
    fats: 4,
    fiber: 6,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Vitamina cremosa com morango, banana e proteína vegetal (opcional).',
    tags: [
      'Rápido',
      'Pós-treino',
      'Refrescante',
      'Sem lactose'
    ],
    benefits: [
      'Rápida digestão',
      'Boa para energia',
      'Alta saciedade se adicionar proteína'
    ],
    allergens: [
      'Pode conter soja (dependendo da proteína)'
    ],
	
	
    image: 'image/vitamina-proteica-de-morango.webp',
	
	
    ingredients: [
      {
        icon: 'strawberry',
        quantity: '1 xícara',
        text: 'morangos'
      },
      {
        icon: 'banana',
        quantity: '1/2 unidade',
        text: 'banana'
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'bebida vegetal'
      },
      {
        icon: 'sparkles',
        quantity: '1 scoop',
        text: 'proteína vegetal (opcional)',
        optional: true
      },
      {
        icon: 'snowflake',
        quantity: 'a gosto',
        text: 'gelo',
        optional: true
      }
    ],
    instructions: [
      'Bata todos os ingredientes no liquidificador.',
      'Ajuste a consistência com mais bebida vegetal, se necessário.',
      'Sirva na hora.',
      'Se quiser mais gelada, adicione gelo.',
      'Finalize com canela (opcional).'
    ],
    tips: [
      '💪 Proteína vegetal de ervilha costuma ficar bem cremosa.',
      '🍌 Banana congelada melhora textura.',
      '🍯 Se precisar de mais doce, use tâmaras em vez de açúcar.'
    ],
	
	
    images: {
      hero: 'image/vitamina-proteica-de-morango.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '12% proteína, 69% carboidratos, 14% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 5,
    name: 'Tapioca com Homus e Tomate',
    category: 'Café da Manhã',
    calories: 310,
    protein: 9,
    carbs: 55,
    fats: 6,
    fiber: 7,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Tapioca recheada com homus e tomate, prática e salgada.',
    tags: [
      'Sem glúten',
      'Rápida',
      'Salgada',
      'Vegana'
    ],
    benefits: [
      'Boa energia',
      'Fonte de proteína do grão-de-bico',
      'Leve'
    ],
    allergens: [
      'Gergelim (se homus tiver tahine)'
    ],
	
	
    image: 'image/tapioca-com-homus-e-tomate.webp',
	
	
    ingredients: [
      {
        icon: 'circle',
        quantity: '3 colheres sopa',
        text: 'goma de tapioca'
      },
      {
        icon: 'beans',
        quantity: '3 colheres sopa',
        text: 'homus'
      },
      {
        icon: 'tomato',
        quantity: '4 fatias',
        text: 'tomate'
      },
      {
        icon: 'leaf',
        quantity: 'a gosto',
        text: 'rúcula',
        optional: true
      }
    ],
    instructions: [
      'Aqueça a frigideira e espalhe a goma de tapioca.',
      'Deixe firmar (cerca de 1 minuto) e vire.',
      'Recheie com homus e tomate.',
      'Adicione rúcula (opcional).',
      'Dobre e sirva.'
    ],
    tips: [
      '🌶️ Acrescente páprica ao homus.',
      '🥒 Pepino fatiado deixa mais crocante.',
      '🧂 Sal apenas se necessário (homus já costuma ter).'
    ],
	
	
    images: {
      hero: 'image/tapioca-com-homus-e-tomate.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '12% proteína, 71% carboidratos, 17% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 6,
    name: 'Pão de Queijo Vegano de Mandioquinha',
    category: 'Café da Manhã',
    calories: 240,
    protein: 6,
    carbs: 38,
    fats: 8,
    fiber: 4,
    time: 30,
    servings: 6,
    difficulty: 'Fácil',
    featured: false,
    description: 'Versão vegana com mandioquinha e polvilho, crocante por fora e macio por dentro.',
    tags: [
      'Sem lactose',
      'Assado',
      'Conforto',
      'Vegano'
    ],
    benefits: [
      'Boa opção para lanche ou café',
      'Sem ingredientes animais',
      'Congela bem'
    ],
    allergens: [ ],
	
	
    image: 'image/pao-de-queijo-vegano-de-mandioquinha.webp',
	
	
    ingredients: [
      {
        icon: 'potato',
        quantity: '1 xícara',
        text: 'mandioquinha cozida e amassada'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'polvilho azedo'
      },
      {
        icon: 'droplets',
        quantity: '2 colheres sopa',
        text: 'azeite'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'sal'
      },
      {
        icon: 'flame',
        quantity: '1 colher sopa',
        text: 'levedura nutricional',
        optional: true
      }
    ],
    instructions: [
      'Misture mandioquinha, azeite e sal.',
      'Adicione o polvilho aos poucos, até dar ponto de enrolar.',
      'Se usar, misture levedura nutricional.',
      'Modele bolinhas.',
      'Asse a 200°C por 20–25 minutos.',
      'Sirva quente.'
    ],
    tips: [
      '❄️ Congele as bolinhas cruas e asse direto do freezer.',
      '🧀 Levedura nutricional dá sabor “queijinho”.',
      '🔥 Não abra o forno nos primeiros 15 minutos.'
    ],
	
	
    images: {
      hero: 'image/pao-de-queijo-vegano-de-mandioquinha.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '10% proteína, 63% carboidratos, 30% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 7,
    name: 'Creme de Abacate com Cacau',
    category: 'Café da Manhã',
    calories: 280,
    protein: 5,
    carbs: 28,
    fats: 16,
    fiber: 8,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Creme doce com abacate e cacau, tipo mousse rápida.',
    tags: [
      'Sem açúcar refinado',
      'Gorduras boas',
      'Rápido',
      'Doce natural'
    ],
    benefits: [
      'Gorduras boas e saciedade',
      'Antioxidantes do cacau',
      'Sem lactose'
    ],
    allergens: [ ],
	
	
    image: 'image/creme-de-abacate-com-cacau.webp',
	
	
    ingredients: [
      {
        icon: 'leaf',
        quantity: '1/2 unidade',
        text: 'abacate maduro'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'cacau em pó 100%'
      },
      {
        icon: 'circle',
        quantity: '2 unidades',
        text: 'tâmaras sem caroço'
      },
      {
        icon: 'droplets',
        quantity: '1–2 colheres sopa',
        text: 'água (para bater)',
        optional: true
      }
    ],
    instructions: [
      'Bata o abacate, cacau e tâmaras no processador.',
      'Se necessário, adicione 1 colher de água para ajudar a bater.',
      'Prove e ajuste o doce com mais tâmaras.',
      'Leve à geladeira por 15 minutos.',
      'Sirva gelado.'
    ],
    tips: [
      '🍓 Combina com morango por cima.',
      '🧊 Abacate bem maduro evita gosto “verde”.',
      '🍫 Use cacau, não achocolatado.'
    ],
	
	
    images: {
      hero: 'image/creme-de-abacate-com-cacau.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '7% proteína, 40% carboidratos, 51% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 8,
    name: 'Granola Caseira Crocante',
    category: 'Café da Manhã',
    calories: 210,
    protein: 6,
    carbs: 30,
    fats: 8,
    fiber: 5,
    time: 30,
    servings: 8,
    difficulty: 'Fácil',
    featured: false,
    description: 'Granola vegana assada com aveia, sementes e coco.',
    tags: [
      'Meal prep',
      'Crocante',
      'Fibras',
      'Café da manhã'
    ],
    benefits: [
      'Economiza na semana',
      'Boa para iogurte vegetal',
      'Rica em fibras'
    ],
    allergens: [
      'Oleaginosas'
    ],
	
	
    image: 'image/granola-caseira-crocante.webp',
	
	
    ingredients: [
      {
        icon: 'wheat',
        quantity: '2 xícaras',
        text: 'aveia'
      },
      {
        icon: 'sparkles',
        quantity: '1/2 xícara',
        text: 'sementes (chia/linhaça/girassol)'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'coco em lascas'
      },
      {
        icon: 'droplets',
        quantity: '2 colheres sopa',
        text: 'óleo de coco ou azeite suave'
      },
      {
        icon: 'circle',
        quantity: '2 colheres sopa',
        text: 'melado de cana',
        optional: true
      }
    ],
    instructions: [
      'Misture aveia, sementes e coco.',
      'Adicione óleo e, se usar, melado.',
      'Espalhe em assadeira.',
      'Asse a 170°C por 20 minutos, mexendo na metade.',
      'Deixe esfriar para ficar crocante.',
      'Guarde em pote fechado.'
    ],
    tips: [
      '🔥 Granola só fica crocante depois de esfriar.',
      '🥜 Adicione castanhas depois de assar para não queimar.',
      '🧂 Pitada de sal realça o sabor.'
    ],
 	
	
    images: {
      hero: 'image/granola-caseira-crocante.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '11% proteína, 57% carboidratos, 34% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 9,
    name: 'Pudim de Chia com Manga',
    category: 'Café da Manhã',
    calories: 230,
    protein: 7,
    carbs: 28,
    fats: 10,
    fiber: 12,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Pudim de chia com bebida vegetal e manga, leve e refrescante.',
    tags: [
      'Sem açúcar refinado',
      'Fibras',
      'Refrescante',
      'Prático'
    ],
    benefits: [
      'Alta saciedade',
      'Ômega-3 (chia)',
      'Ótimo para levar'
    ],
    allergens: [ ],
	
	
    image: 'image/pudim-de-chia-com-manga.webp',
	
	
    ingredients: [
      {
        icon: 'sparkles',
        quantity: '2 colheres sopa',
        text: 'chia'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'bebida vegetal'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'manga picada'
      },
      {
        icon: 'circle',
        quantity: '1 colher chá',
        text: 'baunilha',
        optional: true
      }
    ],
    instructions: [
      'Misture chia com bebida vegetal e baunilha (opcional).',
      'Leve à geladeira por 2 horas (ou de um dia pro outro).',
      'Mexa uma vez após 10 minutos para não empelotar.',
      'Finalize com manga por cima.',
      'Sirva gelado.'
    ],
    tips: [
      '🥭 Qualquer fruta funciona: morango, banana, kiwi.',
      '🥄 Se quiser mais doce: use 1 tâmara batida.',
      '🧊 Faça em potes individuais para a semana.'
    ],
	
	
    images: {
      hero: 'image/pudim-de-chia-com-manga.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '12% proteína, 49% carboidratos, 39% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 10,
    name: 'Cuscuz de Milho com Legumes',
    category: 'Café da Manhã',
    calories: 320,
    protein: 7,
    carbs: 62,
    fats: 6,
    fiber: 6,
    time: 18,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Cuscuz nordestino vegano com legumes salteados, simples e bem brasileiro.',
    tags: [
      'Sem lactose',
      'Rápido',
      'Salgado',
      'Conforto'
    ],
    benefits: [
      'Boa energia',
      'Versátil para variar legumes',
      'Ótimo com tofu mexido'
    ],
    allergens: [ ],
	
	
    image: 'image/cuscuz-de-milho-com-legumes.webp',
	
	
    ingredients: [
      {
        icon: 'wheat',
        quantity: '1/2 xícara',
        text: 'flocão de milho (cuscuz)'
      },
      {
        icon: 'droplets',
        quantity: '1/2 xícara',
        text: 'água'
      },
      {
        icon: 'sparkles',
        quantity: '1 pitada',
        text: 'sal'
      },
      {
        icon: 'carrot',
        quantity: '1/3 xícara',
        text: 'legumes picados (cenoura, ervilha, milho)'
      },
      {
        icon: 'droplets',
        quantity: '1 colher chá',
        text: 'azeite',
        optional: true
      }
    ],
    instructions: [
      'Hidrate o flocão com água e sal por 5 minutos.',
      'Cozinhe no cuscuzeiro por 8–10 minutos.',
      'Salteie os legumes com um fio de azeite (opcional).',
      'Misture os legumes ao cuscuz e sirva.'
    ],
    tips: [
      '🌶️ Um toque de pimenta é opcional.',
      '🥗 Sirva com folhas para equilibrar.',
      '🧊 Dá pra deixar o cuscuz pronto e só aquecer.'
    ],
	
	
    images: {
      hero: 'image/cuscuz-de-milho-com-legumes.webp',
      steps: [ ]
    },
	
	
    macros: {
      breakfast: '9% proteína, 78% carboidratos, 17% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 11,
    name: 'Strogonoff Vegano de Grão-de-Bico',
    category: 'Almoço/Janta',
    calories: 520,
    protein: 20,
    carbs: 70,
    fats: 16,
    fiber: 13,
    time: 20,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Strogonoff cremoso com grão-de-bico e creme vegetal, pronto em 20 min.',
    tags: [
      'Proteico',
      'Conforto',
      'Rápido',
      'Sem lactose'
    ],
    benefits: [
      'Boa proteína vegetal',
      'Saciedade',
      'Ótimo para marmita'
    ],
    allergens: [
      'Pode conter soja (creme vegetal)'
    ],
	
	
image: 'image/strogonoff-vegano-de-grao-de-bico.webp',


    ingredients: [
      {
        icon: 'beans',
        quantity: '1 xícara',
        text: 'grão-de-bico cozido'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'azeite'
      },
      {
        icon: 'circle',
        quantity: '1/2 unidade',
        text: 'cebola picada'
      },
      {
        icon: 'circle',
        quantity: '2 dentes',
        text: 'alho'
      },
      {
        icon: 'sparkles',
        quantity: '2 colheres sopa',
        text: 'extrato de tomate'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'creme vegetal (aveia/castanha)'
      }
    ],
    instructions: [
      'Refogue cebola e alho no azeite.',
      'Adicione o extrato de tomate e mexa por 1 minuto.',
      'Junte o grão-de-bico e misture.',
      'Acrescente o creme vegetal e ajuste o sal.',
      'Cozinhe por 5 minutos em fogo baixo.',
      'Sirva com arroz e batata palha.'
    ],
    tips: [
      '🍄 Adicione cogumelos para mais sabor.',
      '🌶️ Páprica defumada dá um toque especial.',
      '🥣 Para reduzir calorias, use creme de aveia caseiro.'
    ],
	
	
    images: {
      hero: 'image/strogonoff-vegano-de-grao-de-bico.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '15% proteína, 54% carboidratos, 28% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 12,
    name: 'Curry de Legumes com Lentilha',
    category: 'Almoço/Janta',
    calories: 560,
    protein: 22,
    carbs: 78,
    fats: 18,
    fiber: 14,
    time: 30,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Curry aromático com lentilhas e legumes, perfeito para dias frios.',
    tags: [
      'Rico em fibras',
      'Meal prep',
      'Proteico',
      'Sem lactose'
    ],
    benefits: [
      'Ajuda saciedade',
      'Fonte de ferro (lentilha)',
      'Congela bem'
    ],
    allergens: [ ],
	
	
image: 'image/curry-de-legumes-com-lentilha.webp',


    ingredients: [
      {
        icon: 'beans',
        quantity: '1 xícara',
        text: 'lentilha cozida'
      },
      {
        icon: 'carrot',
        quantity: '1 unidade',
        text: 'cenoura em cubos'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'brócolis'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'leite de coco light'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'curry em pó'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e pimenta'
      }
    ],
    instructions: [
      'Refogue os legumes em um fio de azeite.',
      'Adicione o curry e mexa para liberar aroma.',
      'Junte a lentilha e misture.',
      'Acrescente o leite de coco e ajuste sal.',
      'Cozinhe 8–10 minutos.',
      'Sirva com arroz integral.'
    ],
    tips: [
      '🍋 Finalize com limão para realçar.',
      '🌿 Coentro é opcional, mas combina muito.',
      '❄️ Ótimo para congelar em porções.'
    ],
	
	
    images: {
      hero: 'image/curry-de-legumes-com-lentilha.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '16% proteína, 56% carboidratos, 29% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 13,
    name: 'Chili Vegano',
    category: 'Almoço/Janta',
    calories: 480,
    protein: 18,
    carbs: 78,
    fats: 8,
    fiber: 15,
    time: 25,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Chili apimentado com feijão, milho e tomate.',
    tags: [
      'Proteico',
      'Sem lactose',
      'Picante',
      'Marmita'
    ],
    benefits: [
      'Alta saciedade',
      'Fonte de fibras',
      'Ótimo custo-benefício'
    ],
    allergens: [ ],
	
	
image: 'image/chili-vegano.webp',


    ingredients: [
      {
        icon: 'beans',
        quantity: '1 e 1/2 xícara',
        text: 'feijão cozido'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'milho'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'tomate picado ou pelado'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'cominho'
      },
      {
        icon: 'flame',
        quantity: 'a gosto',
        text: 'pimenta',
        optional: true
      }
    ],
    instructions: [
      'Refogue cebola e alho (opcional).',
      'Adicione tomate e temperos.',
      'Junte feijão e milho.',
      'Cozinhe 10 minutos.',
      'Ajuste sal e pimenta.',
      'Sirva com arroz ou tortilha.'
    ],
    tips: [
      '🥑 Guacamole combina muito bem.',
      '🧄 Alho e cebola elevam o sabor.',
      '🌶️ Ajuste a pimenta ao seu paladar.'
    ],
	
	
    images: {
      hero: 'image/chili-vegano.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '15% proteína, 65% carboidratos, 15% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 14,
    name: 'Bowl de Tofu Grelhado',
    category: 'Almoço/Janta',
    calories: 620,
    protein: 28,
    carbs: 72,
    fats: 22,
    fiber: 12,
    time: 20,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Bowl completo com tofu, arroz, feijão e salada.',
    tags: [
      'Completo',
      'Proteico',
      'Marmita',
      'Balanceado'
    ],
    benefits: [
      'Refeição equilibrada',
      'Boa proteína',
      'Ótimo pós-treino'
    ],
    allergens: [
      'Soja'
    ],
	
	
image: 'image/bowl-de-tofu-grelhado.webp',


    ingredients: [
      {
        icon: 'square',
        quantity: '180g',
        text: 'tofu em cubos'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'shoyu ou tamari'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'arroz cozido'
      },
      {
        icon: 'beans',
        quantity: '1/2 xícara',
        text: 'feijão cozido'
      },
      {
        icon: 'leaf',
        quantity: '1 xícara',
        text: 'salada variada'
      }
    ],
    instructions: [
      'Tempere o tofu com shoyu e deixe 5 min.',
      'Grelhe em frigideira antiaderente até dourar.',
      'Monte o bowl com arroz, feijão e salada.',
      'Coloque o tofu por cima.',
      'Finalize com limão e azeite (opcional).'
    ],
    tips: [
      '🔥 Use tamari para versão sem glúten.',
      '🥗 Varie folhas e legumes para não enjoar.',
      '🧊 Tofu firme grelha melhor.'
    ],
	
	
    images: {
      hero: 'image/bowl-de-tofu-grelhado.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '18% proteína, 46% carboidratos, 32% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 15,
    name: 'Macarrão ao Molho de Castanha',
    category: 'Almoço/Janta',
    calories: 690,
    protein: 18,
    carbs: 92,
    fats: 24,
    fiber: 9,
    time: 25,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Molho cremoso de castanha (tipo branco), sem lactose.',
    tags: [
      'Conforto',
      'Cremoso',
      'Sem lactose',
      'Rápido'
    ],
    benefits: [
      'Sabor de comida afetiva',
      'Boa energia',
      'Ótimo para família'
    ],
    allergens: [
      'Oleaginosas'
    ],
	
	
image: 'image/macarrao-ao-molho-de-castanha.webp',


    ingredients: [
      {
        icon: 'circle',
        quantity: '80g',
        text: 'macarrão (integral opcional)'
      },
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'castanha de caju hidratada'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'água'
      },
      {
        icon: 'circle',
        quantity: '1 dente',
        text: 'alho'
      },
      {
        icon: 'sparkles',
        quantity: 'a gosto',
        text: 'sal e noz-moscada',
        optional: true
      }
    ],
    instructions: [
      'Cozinhe o macarrão e reserve.',
      'Bata castanhas com água e alho até virar creme.',
      'Aqueça o creme na panela e tempere.',
      'Misture o macarrão ao molho.',
      'Finalize com salsinha (opcional).'
    ],
    tips: [
      '🥦 Acrescente brócolis para ficar completo.',
      '🧄 Alho assado deixa mais suave.',
      '💧 Ajuste a consistência com água do cozimento.'
    ],
	
	
    images: {
      hero: 'image/macarrao-ao-molho-de-castanha.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '10% proteína, 53% carboidratos, 31% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 16,
    name: 'Hambúrguer de Feijão Preto',
    category: 'Almoço/Janta',
    calories: 410,
    protein: 18,
    carbs: 62,
    fats: 10,
    fiber: 14,
    time: 25,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Hambúrguer vegano caseiro, ótimo para congelar.',
    tags: [
      'Proteico',
      'Meal prep',
      'Sem lactose',
      'Sanduíche'
    ],
    benefits: [
      'Boa proteína e fibra',
      'Congela bem',
      'Substitui carne com dignidade'
    ],
    allergens: [ ],
	
	
image: 'image/hamburguer-de-feijao-preto.webp',


    ingredients: [
      {
        icon: 'beans',
        quantity: '1 xícara',
        text: 'feijão preto cozido e amassado'
      },
      {
        icon: 'wheat',
        quantity: '3 colheres sopa',
        text: 'farinha de aveia'
      },
      {
        icon: 'circle',
        quantity: '1/4 unidade',
        text: 'cebola picada'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'cominho e páprica'
      }
    ],
    instructions: [
      'Misture feijão, farinha, cebola e temperos.',
      'Modele 2 hambúrgueres.',
      'Grelhe 4 minutos de cada lado.',
      'Sirva no pão com salada e molho.',
      'Ou congele cru para a semana.'
    ],
    tips: [
      '❄️ Congele separando com papel manteiga.',
      '🍞 Use pão integral para versão mais fit.',
      '🌶️ Páprica defumada dá toque de churrasco.'
    ],
	
	
    images: {
      hero: 'image/hamburguer-de-feijao-preto.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '18% proteína, 60% carboidratos, 22% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 17,
    name: 'Moqueca Vegana de Palmito',
    category: 'Almoço/Janta',
    calories: 540,
    protein: 10,
    carbs: 48,
    fats: 34,
    fiber: 8,
    time: 25,
    servings: 3,
    difficulty: 'Fácil',
    featured: false,
    description: 'Moqueca leve com palmito, tomate e leite de coco.',
    tags: [
      'Sem lactose',
      'Brasileira',
      'Saborosa',
      'Rápida'
    ],
    benefits: [
      'Rica em minerais',
      'Conforto',
      'Ótima para almoço em família'
    ],
    allergens: [ ],
	
	
image: 'image/moqueca-vegana-de-palmito.webp',


    ingredients: [
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'palmito em rodelas'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'tomate em cubos'
      },
      {
        icon: 'circle',
        quantity: '1/2 unidade',
        text: 'pimentão fatiado'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'leite de coco'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'azeite de dendê',
        optional: true
      }
    ],
    instructions: [
      'Refogue tomate e pimentão em panela.',
      'Adicione palmito e misture.',
      'Acrescente leite de coco e ajuste sal.',
      'Se usar, coloque dendê.',
      'Cozinhe 10 minutos.',
      'Finalize com coentro (opcional) e sirva.'
    ],
    tips: [
      '🍋 Limão no final realça muito.',
      '🌿 Coentro é opcional.',
      '🍚 Sirva com arroz integral.'
    ],
	
	
    images: {
      hero: 'image/moqueca-vegana-de-palmito.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '7% proteína, 36% carboidratos, 57% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 18,
    name: 'Escondidinho de Lentilha',
    category: 'Almoço/Janta',
    calories: 650,
    protein: 24,
    carbs: 92,
    fats: 18,
    fiber: 18,
    time: 45,
    servings: 3,
    difficulty: 'Fácil',
    featured: false,
    description: 'Escondidinho com purê e recheio de lentilha temperada.',
    tags: [
      'Marmita',
      'Conforto',
      'Proteico',
      'Meal prep'
    ],
    benefits: [
      'Boa saciedade',
      'Fonte de ferro',
      'Rende bem'
    ],
    allergens: [ ],
	
image: 'image/escondidinho-de-lentilha.webp',

    ingredients: [
      {
        icon: 'potato',
        quantity: '2 xícaras',
        text: 'batata ou mandioquinha cozida e amassada'
      },
      {
        icon: 'beans',
        quantity: '1 xícara',
        text: 'lentilha cozida'
      },
      {
        icon: 'circle',
        quantity: '1/2 unidade',
        text: 'cebola'
      },
      {
        icon: 'sparkles',
        quantity: 'a gosto',
        text: 'sal, pimenta, páprica'
      }
    ],
    instructions: [
      'Faça o purê com a batata e ajuste sal.',
      'Refogue cebola e temperos e junte a lentilha.',
      'Em um refratário, faça camada de purê, recheio e purê.',
      'Leve ao forno 200°C por 15 minutos.',
      'Sirva.'
    ],
    tips: [
      '🧀 Levedura nutricional por cima fica ótimo.',
      '❄️ Congela super bem em porções.',
      '🥗 Acompanhe com salada para equilibrar.'
    ],
	
	
    images: {
      hero: 'image/escondidinho-de-lentilha.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '15% proteína, 57% carboidratos, 25% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 19,
    name: 'Berinjela à Parmegiana Vegana',
    category: 'Almoço/Janta',
    calories: 520,
    protein: 16,
    carbs: 68,
    fats: 18,
    fiber: 14,
    time: 45,
    servings: 3,
    difficulty: 'Fácil',
    featured: false,
    description: 'Berinjela assada com molho de tomate e “queijo” vegano de castanhas (opcional).',
    tags: [
      'Sem lactose',
      'Saborosa',
      'Forno',
      'Jantar'
    ],
    benefits: [
      'Vegetais em alta',
      'Boa para família',
      'Versão saudável'
    ],
    allergens: [
      'Oleaginosas (opcional)'
    ],
	
	
image: 'image/berinjela-a-parmegiana-vegana.webp',


    ingredients: [
      {
        icon: 'leaf',
        quantity: '1 unidade',
        text: 'berinjela fatiada'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'molho de tomate'
      },
      {
        icon: 'sparkles',
        quantity: 'a gosto',
        text: 'orégano e sal'
      },
      {
        icon: 'circle',
        quantity: '2 colheres sopa',
        text: 'castanha triturada (opcional)',
        optional: true
      }
    ],
    instructions: [
      'Asse as fatias de berinjela 10 min a 200°C.',
      'Em refratário, alterne berinjela e molho.',
      'Tempere com orégano e sal.',
      'Se quiser, finalize com castanha triturada.',
      'Leve ao forno mais 10–15 min.',
      'Sirva.'
    ],
    tips: [
      '🍅 Molho caseiro fica mais saboroso.',
      '🔥 Berinjela assada evita excesso de óleo.',
      '🧄 Alho no molho eleva muito.'
    ],
	
	
    images: {
      hero: 'image/berinjela-a-parmegiana-vegana.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '12% proteína, 52% carboidratos, 31% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 20,
    name: 'Arroz de Brócolis com Grão-de-Bico',
    category: 'Almoço/Janta',
    calories: 560,
    protein: 20,
    carbs: 86,
    fats: 14,
    fiber: 12,
    time: 20,
    servings: 3,
    difficulty: 'Fácil',
    featured: false,
    description: 'Arroz soltinho com brócolis e grão-de-bico, ótimo para marmita.',
    tags: [
      'Marmita',
      'Rápido',
      'Fibras',
      'Completo'
    ],
    benefits: [
      'Refeição simples e nutritiva',
      'Boa proteína',
      'Ótimo custo-benefício'
    ],
    allergens: [ ],
image: 'image/arroz-de-brocolis-com-grao-de-bico.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'arroz cozido'
      },
      {
        icon: 'circle',
        quantity: '1 xícara',
        text: 'brócolis picado'
      },
      {
        icon: 'beans',
        quantity: '1/2 xícara',
        text: 'grão-de-bico cozido'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'azeite'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e pimenta'
      }
    ],
    instructions: [
      'Refogue o brócolis no azeite por 3 minutos.',
      'Adicione o grão-de-bico e misture.',
      'Junte o arroz cozido e mexa.',
      'Ajuste sal e pimenta.',
      'Sirva.'
    ],
    tips: [
      '🥗 Combine com salada para ficar completo.',
      '🧄 Alho e cebola são opcionais.',
      '❄️ Ótimo para marmitas.'
    ],
	
	
    images: {
      hero: 'image/arroz-de-brocolis-com-grao-de-bico.webp',
      steps: [ ]
    },
	
	
    macros: {
      lunch: '14% proteína, 61% carboidratos, 22% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 21,
    name: 'Homus Tradicional',
    category: 'Lanches',
    calories: 260,
    protein: 9,
    carbs: 24,
    fats: 14,
    fiber: 7,
    time: 10,
    servings: 4,
    difficulty: 'Fácil',
    featured: false,
    description: 'Patê de grão-de-bico com tahine, ótimo para lanches e sanduíches.',
    tags: [
      'Proteico',
      'Fibras',
      'Meal prep',
      'Versátil'
    ],
    benefits: [
      'Boa saciedade',
      'Fonte de proteína vegetal',
      'Dura vários dias'
    ],
    allergens: [
      'Gergelim'
    ],
image: 'image/homus-tradicional.webp',
    ingredients: [
      {
        icon: 'beans',
        quantity: '1 xícara',
        text: 'grão-de-bico cozido'
      },
      {
        icon: 'droplets',
        quantity: '2 colheres sopa',
        text: 'tahine'
      },
      {
        icon: 'circle',
        quantity: '1 dente',
        text: 'alho'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'limão'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e cominho',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo no processador.',
      'Ajuste a textura com água aos poucos.',
      'Prove e ajuste sal/limão.',
      'Guarde por até 4 dias.',
      'Sirva com legumes ou pão.'
    ],
    tips: [
      '🥕 Cenoura e pepino são ótimos para mergulhar.',
      '🌶️ Páprica por cima fica perfeito.',
      '🧊 Dura bem na geladeira.'
    ],
	
	
    images: {
      hero: 'image/homus-tradicional.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '14% proteína, 37% carboidratos, 48% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 22,
    name: 'Bolinha Energética de Tâmara e Cacau',
    category: 'Lanches',
    calories: 140,
    protein: 3,
    carbs: 26,
    fats: 3,
    fiber: 4,
    time: 10,
    servings: 10,
    difficulty: 'Fácil',
    featured: false,
    description: 'Docinho rápido com tâmara, aveia e cacau.',
    tags: [
      'Sem açúcar refinado',
      'Pré-treino',
      'Prático',
      'Doce'
    ],
    benefits: [
      'Energia rápida',
      'Boa para levar',
      'Sem forno'
    ],
    allergens: [
      'Oleaginosas (se usar pasta)'
    ],
image: 'image/bolinha-energetica-de-tamara-e-cacau.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '8 unidades',
        text: 'tâmaras sem caroço'
      },
      {
        icon: 'wheat',
        quantity: '3 colheres sopa',
        text: 'aveia'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'cacau em pó'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'pasta de amendoim',
        optional: true
      }
    ],
    instructions: [
      'Bata tâmaras no processador.',
      'Adicione aveia e cacau.',
      'Se precisar, pingue água.',
      'Modele bolinhas.',
      'Gele por 15 min.'
    ],
    tips: [
      '❄️ Duram 5 dias na geladeira.',
      '🍫 Use cacau 100%.',
      '🥜 Pasta deixa mais macia.'
    ],
	
	
    images: {
      hero: 'image/bolinha-energetica-de-tamara-e-cacau.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '9% proteína, 74% carboidratos, 19% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 23,
    name: 'Guacamole Express',
    category: 'Lanches',
    calories: 220,
    protein: 3,
    carbs: 12,
    fats: 18,
    fiber: 9,
    time: 5,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Guacamole rápida com abacate e limão.',
    tags: [
      'Gorduras boas',
      'Rápido',
      'Sem glúten',
      'Salgado'
    ],
    benefits: [
      'Saciedade',
      'Gorduras boas',
      'Ótimo para controlar fome'
    ],
    allergens: [ ],
image: 'image/guacamole-express.webp',
    ingredients: [
      {
        icon: 'leaf',
        quantity: '1/2 unidade',
        text: 'abacate'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'limão'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e pimenta'
      },
      {
        icon: 'leaf',
        quantity: 'a gosto',
        text: 'coentro',
        optional: true
      }
    ],
    instructions: [
      'Amasse o abacate.',
      'Misture limão e temperos.',
      'Finalize com coentro (opcional).',
      'Sirva na hora.'
    ],
    tips: [
      '🍋 Limão evita escurecer.',
      '🌶️ Pimenta é opcional.',
      '🥒 Pepino combina.'
    ],
	
	
    images: {
      hero: 'image/guacamole-express.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '5% proteína, 22% carboidratos, 74% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 24,
    name: 'Pipoca com Levedura Nutricional',
    category: 'Lanches',
    calories: 190,
    protein: 6,
    carbs: 22,
    fats: 8,
    fiber: 5,
    time: 8,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Pipoca com sabor “queijinho” vegano, leve.',
    tags: [
      'Sem lactose',
      'Rápido',
      'Crocante',
      'Snack'
    ],
    benefits: [
      'Alternativa melhor que salgadinhos',
      'Boa fibra',
      'Mata vontade'
    ],
    allergens: [ ],
image: 'image/pipoca-com-levedura-nutricional.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/3 xícara',
        text: 'milho de pipoca'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'azeite'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'levedura nutricional'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal'
      }
    ],
    instructions: [
      'Estoure a pipoca.',
      'Transfira para tigela.',
      'Tempere com levedura e sal.',
      'Misture e sirva.'
    ],
    tips: [
      '🧂 Sal fino adere melhor.',
      '🔥 Mexa a panela para não queimar.',
      '🌶️ Páprica é um plus.'
    ],
	
	
    images: {
      hero: 'image/pipoca-com-levedura-nutricional.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '13% proteína, 46% carboidratos, 38% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 25,
    name: 'Wrap Vegano de Legumes',
    category: 'Lanches',
    calories: 330,
    protein: 10,
    carbs: 48,
    fats: 10,
    fiber: 8,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Wrap rápido com legumes e homus.',
    tags: [
      'Rápido',
      'Leve',
      'Prático',
      'Para levar'
    ],
    benefits: [
      'Boa opção para trabalho',
      'Fácil de variar',
      'Equilibrado'
    ],
    allergens: [
      'Glúten (se tortilha comum)'
    ],
image: 'image/wrap-vegano-de-legumes.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1 unidade',
        text: 'tortilha/wrap'
      },
      {
        icon: 'circle',
        quantity: '3 colheres sopa',
        text: 'homus'
      },
      {
        icon: 'leaf',
        quantity: '1 xícara',
        text: 'mix de folhas'
      },
      {
        icon: 'carrot',
        quantity: '1/2 unidade',
        text: 'cenoura ralada'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'limão'
      }
    ],
    instructions: [
      'Passe homus na tortilha.',
      'Adicione folhas e cenoura.',
      'Regue com limão.',
      'Enrole e corte.',
      'Sirva.'
    ],
    tips: [
      '🥒 Pepino deixa mais refrescante.',
      '🧊 Embale para levar.',
      '🌶️ Molho picante é opcional.'
    ],
	
	
    images: {
      hero: 'image/wrap-vegano-de-legumes.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '12% proteína, 58% carboidratos, 27% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 26,
    name: 'Iogurte Vegano com Frutas e Sementes',
    category: 'Lanches',
    calories: 260,
    protein: 8,
    carbs: 34,
    fats: 10,
    fiber: 6,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Lanche rápido com iogurte vegetal, frutas e sementes.',
    tags: [
      'Rápido',
      'Fibras',
      'Leve',
      'Prático'
    ],
    benefits: [
      'Saciedade',
      'Boa energia',
      'Fácil de montar'
    ],
    allergens: [
      'Pode conter soja'
    ],
image: 'image/iogurte-vegano-com-frutas-e-sementes.webp',
    ingredients: [
      {
        icon: 'droplets',
        quantity: '170g',
        text: 'iogurte vegetal'
      },
      {
        icon: 'strawberry',
        quantity: '1/2 xícara',
        text: 'frutas'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'sementes (chia/linhaça)'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'granola',
        optional: true
      }
    ],
    instructions: [
      'Coloque o iogurte em um pote.',
      'Adicione frutas.',
      'Finalize com sementes e granola (opcional).',
      'Sirva.'
    ],
    tips: [
      '🍯 Adoce com tâmara se precisar.',
      '🥣 Ótimo para tarde.',
      '❄️ Fruta congelada refresca.'
    ],
	
	
    images: {
      hero: 'image/iogurte-vegano-com-frutas-e-sementes.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '12% proteína, 52% carboidratos, 35% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 27,
    name: 'Mix Crocante de Sementes',
    category: 'Lanches',
    calories: 220,
    protein: 8,
    carbs: 10,
    fats: 16,
    fiber: 6,
    time: 20,
    servings: 6,
    difficulty: 'Fácil',
    featured: false,
    description: 'Mix assado de sementes para snack.',
    tags: [
      'Meal prep',
      'Crocante',
      'Fibras',
      'Sem glúten'
    ],
    benefits: [
      'Gorduras boas',
      'Alta saciedade',
      'Versátil'
    ],
    allergens: [
      'Oleaginosas (se incluir castanhas)'
    ],
image: 'image/mix-crocante-de-sementes.webp',
    ingredients: [
      {
        icon: 'sparkles',
        quantity: '1/2 xícara',
        text: 'sementes (girassol/abóbora)'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'gergelim'
      },
      {
        icon: 'droplets',
        quantity: '1 colher chá',
        text: 'azeite'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'sal e páprica',
        optional: true
      }
    ],
    instructions: [
      'Misture sementes com temperos.',
      'Espalhe na assadeira.',
      'Asse 160°C por 12–15 min.',
      'Esfrie e guarde.'
    ],
    tips: [
      '🔥 Queima rápido: olho no forno!',
      '🥗 Excelente em saladas.',
      '🧊 Dura 2 semanas em pote.'
    ],
	
	
    images: {
      hero: 'image/mix-crocante-de-sementes.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '15% proteína, 18% carboidratos, 65% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 28,
    name: 'Sanduíche de Tofu com Mostarda',
    category: 'Lanches',
    calories: 390,
    protein: 20,
    carbs: 42,
    fats: 14,
    fiber: 7,
    time: 15,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Sanduíche proteico com tofu grelhado e folhas.',
    tags: [
      'Proteico',
      'Rápido',
      'Salgado',
      'Para levar'
    ],
    benefits: [
      'Boa proteína',
      'Sacia bem',
      'Ótimo pós-treino'
    ],
    allergens: [
      'Soja',
      'Glúten (se pão comum)'
    ],
image: 'image/sanduiche-de-tofu-com-mostarda.webp',
    ingredients: [
      {
        icon: 'square',
        quantity: '120g',
        text: 'tofu grelhado'
      },
      {
        icon: 'circle',
        quantity: '2 fatias',
        text: 'pão integral'
      },
      {
        icon: 'leaf',
        quantity: 'a gosto',
        text: 'alface e tomate'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'mostarda',
        optional: true
      }
    ],
    instructions: [
      'Grelhe o tofu.',
      'Monte o sanduíche.',
      'Adicione mostarda (opcional).',
      'Sirva.'
    ],
    tips: [
      '🥒 Pepino combina.',
      '🔥 Tamari para sem glúten.',
      '🧊 Bom para marmita fria.'
    ],
	
	
    images: {
      hero: 'image/sanduiche-de-tofu-com-mostarda.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '21% proteína, 43% carboidratos, 32% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 29,
    name: 'Salada no Pote',
    category: 'Lanches',
    calories: 310,
    protein: 12,
    carbs: 34,
    fats: 14,
    fiber: 10,
    time: 15,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Salada em camadas para levar, com grão-de-bico e legumes.',
    tags: [
      'Para levar',
      'Fresco',
      'Fibras',
      'Proteico'
    ],
    benefits: [
      'Ajuda na rotina',
      'Saciedade',
      'Evita beliscar'
    ],
    allergens: [ ],
image: 'image/salada-no-pote.webp',
    ingredients: [
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'azeite + limão'
      },
      {
        icon: 'beans',
        quantity: '1/2 xícara',
        text: 'grão-de-bico cozido'
      },
      {
        icon: 'carrot',
        quantity: '1/2 unidade',
        text: 'cenoura ralada'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'tomate e pepino'
      },
      {
        icon: 'leaf',
        quantity: '1 xícara',
        text: 'folhas'
      }
    ],
    instructions: [
      'Coloque azeite+limão no fundo.',
      'Adicione grão-de-bico e legumes.',
      'Coloque folhas por cima.',
      'Tampe e leve.',
      'Agite na hora de comer.'
    ],
    tips: [
      '🥗 Faça 2–3 potes de uma vez.',
      '🧂 Tempere na hora se preferir.',
      '🍋 Limão ajuda a conservar.'
    ],
	
	
    images: {
      hero: 'image/salada-no-pote.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '15% proteína, 44% carboidratos, 41% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 30,
    name: 'Chips de Batata Doce (Airfryer)',
    category: 'Lanches',
    calories: 180,
    protein: 2,
    carbs: 36,
    fats: 3,
    fiber: 5,
    time: 18,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Chips crocantes de batata doce, snack fit vegano.',
    tags: [
      'Crocante',
      'Airfryer',
      'Sem lactose',
      'Snack'
    ],
    benefits: [
      'Mata vontade de crocância',
      'Ingrediente simples',
      'Ótimo acompanhamento'
    ],
    allergens: [ ],
image: 'image/chips-de-batata-doce-airfryer.webp',
    ingredients: [
      {
        icon: 'potato',
        quantity: '1 unidade',
        text: 'batata doce fatiada'
      },
      {
        icon: 'droplets',
        quantity: '1 colher chá',
        text: 'azeite',
        optional: true
      },
      {
        icon: 'sparkles',
        quantity: 'a gosto',
        text: 'sal e páprica'
      }
    ],
    instructions: [
      'Fatie bem fino.',
      'Misture com temperos.',
      'Asse na airfryer 180°C por 12–15 min, mexendo.',
      'Sirva.'
    ],
    tips: [
      '🔥 Fatiar fino é o segredo.',
      '🧂 Tempere depois se preferir.',
      '⏱️ Cada airfryer varia: ajuste tempo.'
    ],
	
	
    images: {
      hero: 'image/chips-de-batata-doce-airfryer.webp',
      steps: [ ]
    },
	
	
    macros: {
      snack: '4% proteína, 80% carboidratos, 15% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 31,
    name: 'Mousse de Chocolate com Abacate',
    category: 'Sobremesas',
    calories: 260,
    protein: 4,
    carbs: 22,
    fats: 17,
    fiber: 7,
    time: 10,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Mousse cremosa com abacate e cacau, sem lactose e sem açúcar refinado.',
    tags: [
      'Sem lactose',
      'Rápido',
      'Doce',
      'Fit'
    ],
    benefits: [
      'Antioxidantes do cacau',
      'Gorduras boas',
      'Doce sem culpa'
    ],
    allergens: [ ],
image: 'image/mousse-de-chocolate-com-abacate.webp',
    ingredients: [
      {
        icon: 'leaf',
        quantity: '1/2 unidade',
        text: 'abacate maduro'
      },
      {
        icon: 'sparkles',
        quantity: '2 colheres sopa',
        text: 'cacau 100%'
      },
      {
        icon: 'circle',
        quantity: '2 unidades',
        text: 'tâmaras'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'água',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo até ficar cremoso.',
      'Ajuste o doce.',
      'Gele 20 minutos.',
      'Sirva.'
    ],
    tips: [
      '🍓 Finalize com frutas vermelhas.',
      '🍫 Cacau 100% é essencial.',
      '🧊 Fica ótimo gelado.'
    ],
	
	
    images: {
      hero: 'image/mousse-de-chocolate-com-abacate.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '6% proteína, 34% carboidratos, 59% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 32,
    name: 'Pudim de Chia com Cacau',
    category: 'Sobremesas',
    calories: 230,
    protein: 6,
    carbs: 24,
    fats: 10,
    fiber: 12,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Pudim de chia com cacau e bebida vegetal, sobremesa leve.',
    tags: [
      'Sem lactose',
      'Fibras',
      'Gelado',
      'Prático'
    ],
    benefits: [
      'Ômega-3',
      'Alta saciedade',
      'Boa digestão'
    ],
    allergens: [ ],
image: 'image/pudim-de-chia-com-cacau.webp',
    ingredients: [
      {
        icon: 'sparkles',
        quantity: '2 colheres sopa',
        text: 'chia'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'bebida vegetal'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'cacau em pó'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'melado',
        optional: true
      }
    ],
    instructions: [
      'Misture tudo.',
      'Mexa após 10 min.',
      'Gele por 2 horas.',
      'Sirva com frutas.'
    ],
    tips: [
      '🍌 Banana por cima combina.',
      '🥣 Faça em potinhos.',
      '🍯 Melado é opcional.'
    ],
	
	
    images: {
      hero: 'image/pudim-de-chia-com-cacau.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '10% proteína, 42% carboidratos, 39% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 33,
    name: 'Brownie Vegano de Banana',
    category: 'Sobremesas',
    calories: 190,
    protein: 5,
    carbs: 32,
    fats: 4,
    fiber: 5,
    time: 30,
    servings: 8,
    difficulty: 'Fácil',
    featured: true,
    description: 'Brownie úmido com banana, cacau e aveia.',
    tags: [
      'Assado',
      'Sem açúcar refinado',
      'Fit',
      'Cacau'
    ],
    benefits: [
      'Mata vontade de doce',
      'Ingredientes simples',
      'Boa fibra'
    ],
    allergens: [
      'Glúten (se aveia não certificada)'
    ],
image: 'image/brownie-vegano-de-banana.webp',
    ingredients: [
      {
        icon: 'banana',
        quantity: '2 unidades',
        text: 'banana madura'
      },
      {
        icon: 'sparkles',
        quantity: '3 colheres sopa',
        text: 'cacau em pó'
      },
      {
        icon: 'wheat',
        quantity: '1/2 xícara',
        text: 'aveia'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'fermento'
      }
    ],
    instructions: [
      'Amasse a banana.',
      'Misture os secos.',
      'Asse 180°C por 18–22 min.',
      'Esfrie e corte.'
    ],
    tips: [
      '🔥 Não asse demais.',
      '🍫 Use cacau 100%.',
      '🥜 Castanhas são opcionais.'
    ],
	
	
    images: {
      hero: 'image/brownie-vegano-de-banana-16-9.png',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '11% proteína, 67% carboidratos, 19% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 34,
    name: 'Sorbet de Manga e Limão',
    category: 'Sobremesas',
    calories: 150,
    protein: 2,
    carbs: 36,
    fats: 0,
    fiber: 4,
    time: 5,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Sorbet 2 ingredientes: manga congelada e limão.',
    tags: [
      'Sem lactose',
      'Refrescante',
      'Sem açúcar',
      'Rápido'
    ],
    benefits: [
      'Ótimo para calor',
      'Sem ultraprocessados',
      'Leve'
    ],
    allergens: [ ],
image: 'image/sorbet-de-manga-e-limao.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '2 xícaras',
        text: 'manga congelada'
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'suco de limão'
      },
      {
        icon: 'droplets',
        quantity: '1–2 colheres sopa',
        text: 'água',
        optional: true
      }
    ],
    instructions: [
      'Bata a manga.',
      'Adicione limão.',
      'Ajuste com água.',
      'Sirva.'
    ],
    tips: [
      '❄️ Manga bem congelada dá textura.',
      '🍋 Limão realça.',
      '🍓 Troque por morango.'
    ],
	
	
    images: {
      hero: 'image/sorbet-de-manga-e-limao.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '5% proteína, 96% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 35,
    name: 'Brigadeiro Vegano de Biomassa',
    category: 'Sobremesas',
    calories: 120,
    protein: 2,
    carbs: 22,
    fats: 3,
    fiber: 4,
    time: 20,
    servings: 10,
    difficulty: 'Fácil',
    featured: false,
    description: 'Brigadeiro leve com biomassa de banana verde e cacau.',
    tags: [
      'Sem lactose',
      'Doce',
      'Fit',
      'Chocolate'
    ],
    benefits: [
      'Menos açúcar',
      'Boa fibra',
      'Sacia'
    ],
    allergens: [ ],
image: 'image/brigadeiro-vegano-de-biomassa.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'biomassa de banana verde'
      },
      {
        icon: 'sparkles',
        quantity: '2 colheres sopa',
        text: 'cacau em pó'
      },
      {
        icon: 'circle',
        quantity: '2 colheres sopa',
        text: 'melado',
        optional: true
      },
      {
        icon: 'droplets',
        quantity: '1 colher sopa',
        text: 'óleo de coco',
        optional: true
      }
    ],
    instructions: [
      'Misture em fogo baixo.',
      'Mexa até encorpar.',
      'Esfrie.',
      'Enrole (opcional).'
    ],
    tips: [
      '🍫 Cacau 100% dá melhor sabor.',
      '🧊 Geladeira firma.',
      '🥥 Coco ralado é ótimo.'
    ],
	
	
    images: {
      hero: 'image/brigadeiro-vegano-de-biomassa.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '7% proteína, 73% carboidratos, 22% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 36,
    name: 'Cookie Vegano de Aveia',
    category: 'Sobremesas',
    calories: 110,
    protein: 2,
    carbs: 22,
    fats: 2,
    fiber: 3,
    time: 20,
    servings: 10,
    difficulty: 'Fácil',
    featured: false,
    description: 'Cookie com aveia e banana, sem ovos.',
    tags: [
      'Assado',
      'Sem açúcar refinado',
      'Fácil',
      'Snack doce'
    ],
    benefits: [
      'Boa fibra',
      'Ótimo para lanche',
      'Ingredientes simples'
    ],
    allergens: [
      'Glúten (se aveia não certificada)'
    ],
image: 'image/cookie-vegano-de-aveia.webp',
    ingredients: [
      {
        icon: 'banana',
        quantity: '1 unidade',
        text: 'banana madura'
      },
      {
        icon: 'wheat',
        quantity: '1 xícara',
        text: 'aveia'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'canela',
        optional: true
      },
      {
        icon: 'circle',
        quantity: '2 colheres sopa',
        text: 'uvas-passas',
        optional: true
      }
    ],
    instructions: [
      'Amasse banana.',
      'Misture aveia e canela.',
      'Modele e achate.',
      'Asse 180°C por 12–15 min.',
      'Esfrie.'
    ],
    tips: [
      '🔥 Esfria e fica crocante.',
      '🍫 Chocolate vegano opcional.',
      '🥜 Castanhas opcionais.'
    ],
	
	
    images: {
      hero: 'image/cookie-vegano-de-aveia.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '7% proteína, 80% carboidratos, 16% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 37,
    name: 'Maçã Assada com Canela',
    category: 'Sobremesas',
    calories: 140,
    protein: 1,
    carbs: 30,
    fats: 2,
    fiber: 5,
    time: 15,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Sobremesa rápida: maçã assada com canela.',
    tags: [
      'Leve',
      'Rápida',
      'Conforto',
      'Sem lactose'
    ],
    benefits: [
      'Doce natural',
      'Ajuda na saciedade',
      'Boa para noite'
    ],
    allergens: [
      'Oleaginosas (opcional)'
    ],
image: 'image/maca-assada-com-canela.webp',
    ingredients: [
      {
        icon: 'apple',
        quantity: '1 unidade',
        text: 'maçã'
      },
      {
        icon: 'sparkles',
        quantity: '1/2 colher chá',
        text: 'canela'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'castanhas picadas',
        optional: true
      }
    ],
    instructions: [
      'Corte a maçã.',
      'Polvilhe canela.',
      'Asse/airfryer 180°C por 12–15 min.',
      'Finalize (opcional).'
    ],
    tips: [
      '🍯 Use 1 fio de melado se quiser.',
      '🔥 Airfryer é rápida.',
      '🍦 Sorvete vegano opcional.'
    ],
	
	
    images: {
      hero: 'image/maca-assada-com-canela.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '3% proteína, 86% carboidratos, 13% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 38,
    name: 'Gelatina Natural de Frutas',
    category: 'Sobremesas',
    calories: 90,
    protein: 1,
    carbs: 22,
    fats: 0,
    fiber: 2,
    time: 10,
    servings: 4,
    difficulty: 'Fácil',
    featured: false,
    description: 'Gelatina com agar-agar e suco natural.',
    tags: [
      'Sem açúcar',
      'Leve',
      'Natural',
      'Refrescante'
    ],
    benefits: [
      'Sem ultraprocessados',
      'Fácil',
      'Boa para dieta leve'
    ],
    allergens: [ ],
image: 'image/gelatina-natural-de-frutas.webp',
    ingredients: [
      {
        icon: 'droplets',
        quantity: '300ml',
        text: 'suco natural (uva/laranja)'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher chá',
        text: 'agar-agar'
      },
      {
        icon: 'circle',
        quantity: 'a gosto',
        text: 'frutas picadas',
        optional: true
      }
    ],
    instructions: [
      'Dissolva agar-agar no suco.',
      'Ferva 2 min mexendo.',
      'Despeje em potes.',
      'Gele 2 horas.'
    ],
    tips: [
      '🍇 Suco integral funciona bem.',
      '🧊 Dura 3 dias.',
      '🍊 Ajuste acidez com água.'
    ],
	
	
    images: {
      hero: 'image/gelatina-natural-de-frutas.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '4% proteína, 98% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 39,
    name: 'Bolo de Caneca Vegano',
    category: 'Sobremesas',
    calories: 220,
    protein: 5,
    carbs: 34,
    fats: 7,
    fiber: 4,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Bolo de caneca rápido (micro-ondas) com cacau e aveia.',
    tags: [
      'Rápido',
      'Porção individual',
      'Doce',
      'Prático'
    ],
    benefits: [
      'Mata vontade sem exagero',
      'Ingredientes simples',
      'Sem lactose'
    ],
    allergens: [
      'Glúten (se aveia não certificada)'
    ],
image: 'image/bolo-de-caneca-vegano.webp',
    ingredients: [
      {
        icon: 'wheat',
        quantity: '4 colheres sopa',
        text: 'farinha/aveia'
      },
      {
        icon: 'sparkles',
        quantity: '1 colher sopa',
        text: 'cacau'
      },
      {
        icon: 'droplets',
        quantity: '4 colheres sopa',
        text: 'bebida vegetal'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'melado',
        optional: true
      },
      {
        icon: 'sparkles',
        quantity: '1/2 colher chá',
        text: 'fermento'
      }
    ],
    instructions: [
      'Misture secos.',
      'Adicione bebida vegetal.',
      'Micro-ondas 60–90s.',
      'Espere 1 min e sirva.'
    ],
    tips: [
      '🔥 Ajuste o tempo do micro.',
      '🍫 Chocolate vegano opcional.',
      '🥜 Pasta por cima fica ótimo.'
    ],
 	
	
    images: {
      hero: 'image/bolo-de-caneca-vegano.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '9% proteína, 62% carboidratos, 29% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 40,
    name: 'Mousse de Maracujá Vegana',
    category: 'Sobremesas',
    calories: 240,
    protein: 2,
    carbs: 28,
    fats: 14,
    fiber: 3,
    time: 10,
    servings: 4,
    difficulty: 'Fácil',
    featured: false,
    description: 'Mousse com maracujá e creme de coco, bem refrescante.',
    tags: [
      'Refrescante',
      'Sem lactose',
      'Doce',
      'Rápida'
    ],
    benefits: [
      'Sobremesa leve',
      'Boa para calor',
      'Sem ingredientes animais'
    ],
    allergens: [ ],
image: 'image/mousse-de-maracuja-vegana.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'polpa de maracujá'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'creme de coco'
      },
      {
        icon: 'circle',
        quantity: '1–2 colheres sopa',
        text: 'melado',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo.',
      'Coloque em potes.',
      'Gele 2 horas.',
      'Sirva gelado.'
    ],
    tips: [
      '🥥 Creme de coco bem gelado firma mais.',
      '🍯 Ajuste o doce com melado.',
      '🍋 Toque de limão opcional.'
    ],
	
	
    images: {
      hero: 'image/mousse-de-maracuja-vegana.webp',
      steps: [ ]
    },
	
	
    macros: {
      dessert: '3% proteína, 47% carboidratos, 52% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 41,
    name: 'Suco Verde Clássico',
    category: 'Sucos',
    calories: 110,
    protein: 2,
    carbs: 26,
    fats: 0,
    fiber: 4,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Couve, limão, maçã e gengibre — refrescante e leve.',
    tags: [
      'Detox',
      'Refrescante',
      'Fibras',
      'Imunidade'
    ],
    benefits: [
      'Ajuda hidratação',
      'Rico em vitamina C',
      'Leve para o dia a dia'
    ],
    allergens: [ ],
image: 'image/suco-verde-classico.webp',
    ingredients: [
      {
        icon: 'leaf',
        quantity: '1 folha',
        text: 'couve'
      },
      {
        icon: 'apple',
        quantity: '1/2 unidade',
        text: 'maçã'
      },
      {
        icon: 'droplets',
        quantity: '1/2 unidade',
        text: 'limão espremido'
      },
      {
        icon: 'sparkles',
        quantity: '1 pedaço',
        text: 'gengibre',
        optional: true
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'água gelada'
      }
    ],
    instructions: [
      'Bata tudo.',
      'Coe se preferir (opcional).',
      'Sirva com gelo.'
    ],
    tips: [
      '🧊 Use água bem gelada.',
      '🥬 Comece com pouca couve.',
      '🍋 Ajuste limão ao gosto.'
    ],
	
	
    images: {
      hero: 'image/suco-verde-classico.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '7% proteína, 95% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 42,
    name: 'Suco de Abacaxi com Hortelã',
    category: 'Sucos',
    calories: 120,
    protein: 1,
    carbs: 30,
    fats: 0,
    fiber: 2,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Clássico digestivo e super refrescante.',
    tags: [
      'Digestivo',
      'Refrescante',
      'Sem açúcar',
      'Verão'
    ],
    benefits: [
      'Ajuda digestão',
      'Hidrata',
      'Leve'
    ],
    allergens: [ ],
image: 'image/suco-de-abacaxi-com-hortela.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '2 fatias',
        text: 'abacaxi'
      },
      {
        icon: 'leaf',
        quantity: '6 folhas',
        text: 'hortelã'
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'água gelada'
      },
      {
        icon: 'snowflake',
        quantity: 'a gosto',
        text: 'gelo',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo.',
      'Coe se preferir.',
      'Sirva na hora.'
    ],
    tips: [
      '🍍 Abacaxi doce dispensa adoçar.',
      '🍃 Hortelã dá frescor.',
      '🧊 Sirva gelado.'
    ],
	
	
    images: {
      hero: 'image/suco-de-abacaxi-com-hortela.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '3% proteína, 100% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 43,
    name: 'Suco de Beterraba com Laranja',
    category: 'Sucos',
    calories: 160,
    protein: 3,
    carbs: 38,
    fats: 0,
    fiber: 4,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Suco energizante com beterraba e laranja.',
    tags: [
      'Energético',
      'Pré-treino',
      'Imunidade',
      'Natural'
    ],
    benefits: [
      'Ajuda circulação',
      'Rico em vitamina C',
      'Bom pré-treino'
    ],
    allergens: [ ],
image: 'image/suco-de-beterraba-com-laranja.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/2 unidade',
        text: 'beterraba pequena'
      },
      {
        icon: 'droplets',
        quantity: '2 unidades',
        text: 'laranja espremida'
      },
      {
        icon: 'droplets',
        quantity: '150ml',
        text: 'água',
        optional: true
      }
    ],
    instructions: [
      'Bata beterraba com suco de laranja.',
      'Adicione água se quiser mais leve.',
      'Sirva.'
    ],
    tips: [
      '🥤 Ótimo pré-treino.',
      '🍊 Laranja doce ajuda.',
      '🧊 Gelado é melhor.'
    ],
	
	
    images: {
      hero: 'image/suco-de-beterraba-com-laranja.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '8% proteína, 95% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 44,
    name: 'Suco de Melancia com Limão',
    category: 'Sucos',
    calories: 100,
    protein: 1,
    carbs: 25,
    fats: 0,
    fiber: 1,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Hidratante e refrescante, ideal para dias quentes.',
    tags: [
      'Hidratação',
      'Refrescante',
      'Verão',
      'Leve'
    ],
    benefits: [
      'Hidratante',
      'Poucas calorias',
      'Fácil'
    ],
    allergens: [ ],
image: 'image/suco-de-melancia-com-limao.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '2 xícaras',
        text: 'melancia em cubos'
      },
      {
        icon: 'droplets',
        quantity: '1/2 unidade',
        text: 'limão espremido'
      },
      {
        icon: 'snowflake',
        quantity: 'a gosto',
        text: 'gelo',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo.',
      'Sirva sem coar.'
    ],
    tips: [
      '🍋 Limão dá contraste.',
      '🧊 Muito bom com gelo.',
      '🍃 Hortelã combina.'
    ],
	
	
    images: {
      hero: 'image/suco-de-melancia-com-limao.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '4% proteína, 100% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 45,
    name: 'Suco de Maracujá com Cenoura',
    category: 'Sucos',
    calories: 140,
    protein: 2,
    carbs: 34,
    fats: 0,
    fiber: 3,
    time: 8,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Mistura diferente: maracujá + cenoura, doce e cítrico.',
    tags: [
      'Imunidade',
      'Vitamina A',
      'Natural',
      'Diferente'
    ],
    benefits: [
      'Rico em vitamina A',
      'Refrescante',
      'Boa digestão'
    ],
    allergens: [ ],
image: 'image/suco-de-maracuja-com-cenoura.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/2 xícara',
        text: 'polpa de maracujá'
      },
      {
        icon: 'carrot',
        quantity: '1/2 unidade',
        text: 'cenoura'
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'água'
      },
      {
        icon: 'circle',
        quantity: '1 colher sopa',
        text: 'melado',
        optional: true
      }
    ],
    instructions: [
      'Bata a cenoura com água.',
      'Adicione maracujá e bata rápido.',
      'Coe se preferir.',
      'Adoce (opcional).'
    ],
    tips: [
      '🥕 Bata bem.',
      '🍯 Melado é opcional.',
      '🧊 Sirva gelado.'
    ],
	
	
    images: {
      hero: 'image/suco-de-maracuja-com-cenoura.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '6% proteína, 97% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 46,
    name: 'Suco de Morango com Banana',
    category: 'Sucos',
    calories: 220,
    protein: 4,
    carbs: 44,
    fats: 2,
    fiber: 6,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Vitamina simples e deliciosa com frutas.',
    tags: [
      'Cremoso',
      'Energético',
      'Pós-treino',
      'Rápido'
    ],
    benefits: [
      'Boa energia',
      'Sacia',
      'Muito prático'
    ],
    allergens: [ ],
image: 'image/suco-de-morango-com-banana.webp',
    ingredients: [
      {
        icon: 'strawberry',
        quantity: '1 xícara',
        text: 'morangos'
      },
      {
        icon: 'banana',
        quantity: '1 unidade',
        text: 'banana'
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'bebida vegetal'
      },
      {
        icon: 'snowflake',
        quantity: 'a gosto',
        text: 'gelo',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo.',
      'Sirva.'
    ],
    tips: [
      '🍌 Banana congelada melhora.',
      '🍓 Morango maduro adoça.',
      '💪 Proteína vegetal opcional.'
    ],
	
	
    images: {
      hero: 'image/suco-de-morango-com-banana.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '7% proteína, 80% carboidratos, 8% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 47,
    name: 'Suco de Uva Integral com Limão',
    category: 'Sucos',
    calories: 170,
    protein: 1,
    carbs: 42,
    fats: 0,
    fiber: 1,
    time: 2,
    servings: 1,
    difficulty: 'Fácil',
    featured: true,
    description: 'Suco de uva com toque cítrico, sem açúcar adicionado.',
    tags: [
      'Antioxidante',
      'Imunidade',
      'Rápido',
      'Natural'
    ],
    benefits: [
      'Rico em antioxidantes',
      'Prático',
      'Bom para recuperação'
    ],
    allergens: [ ],
image: 'image/suco-de-uva-integral-com-limao.webp',
    ingredients: [
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'suco de uva integral'
      },
      {
        icon: 'droplets',
        quantity: '1/4 unidade',
        text: 'limão espremido'
      },
      {
        icon: 'snowflake',
        quantity: 'a gosto',
        text: 'gelo',
        optional: true
      }
    ],
    instructions: [
      'Misture o suco com limão.',
      'Sirva com gelo.'
    ],
    tips: [
      '🍇 Prefira 100% integral.',
      '🍋 Limão evita enjoar.',
      '🧊 Bem gelado fica ótimo.'
    ],
	
	
    images: {
      hero: 'image/suco-de-uva-integral-com-limao-16-9.png',
      steps: [ ]
    },
	
	
    macros: {
      juice: '2% proteína, 99% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 48,
    name: 'Suco de Laranja com Gengibre',
    category: 'Sucos',
    calories: 140,
    protein: 2,
    carbs: 32,
    fats: 0,
    fiber: 1,
    time: 3,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Clássico com gengibre para dar energia.',
    tags: [
      'Imunidade',
      'Vitamina C',
      'Energético',
      'Rápido'
    ],
    benefits: [
      'Vitamina C',
      'Ajuda imunidade',
      'Acorda o corpo'
    ],
    allergens: [ ],
image: 'image/suco-de-laranja-com-gengibre.webp',
    ingredients: [
      {
        icon: 'droplets',
        quantity: '300ml',
        text: 'suco de laranja'
      },
      {
        icon: 'sparkles',
        quantity: '1 pedaço',
        text: 'gengibre',
        optional: true
      }
    ],
    instructions: [
      'Misture o suco com gengibre.',
      'Coe se preferir.',
      'Sirva.'
    ],
    tips: [
      '🫚 Use pouco gengibre.',
      '🧊 Sirva gelado.',
      '🍊 Laranja doce dispensa adoçar.'
    ],
	
	
    images: {
      hero: 'image/suco-de-laranja-com-gengibre.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '6% proteína, 91% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 49,
    name: 'Suco de Pepino com Limão',
    category: 'Sucos',
    calories: 60,
    protein: 1,
    carbs: 14,
    fats: 0,
    fiber: 1,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Suco ultra refrescante e leve.',
    tags: [
      'Refrescante',
      'Leve',
      'Hidratação',
      'Detox'
    ],
    benefits: [
      'Hidrata',
      'Poucas calorias',
      'Ótimo para calor'
    ],
    allergens: [ ],
image: 'image/suco-de-pepino-com-limao.webp',
    ingredients: [
      {
        icon: 'circle',
        quantity: '1/2 unidade',
        text: 'pepino'
      },
      {
        icon: 'droplets',
        quantity: '1/2 unidade',
        text: 'limão'
      },
      {
        icon: 'droplets',
        quantity: '250ml',
        text: 'água'
      },
      {
        icon: 'leaf',
        quantity: 'a gosto',
        text: 'hortelã',
        optional: true
      }
    ],
    instructions: [
      'Bata tudo.',
      'Coe se preferir.',
      'Sirva gelado.'
    ],
    tips: [
      '🥒 Sem casca fica mais suave.',
      '🍃 Hortelã é opcional.',
      '🧊 Muito bom com gelo.'
    ],
 	
	
    images: {
      hero: 'image/suco-de-pepino-com-limao.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '7% proteína, 93% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
    id: 50,
    name: 'Suco de Maçã com Cenoura',
    category: 'Sucos',
    calories: 150,
    protein: 2,
    carbs: 34,
    fats: 0,
    fiber: 4,
    time: 6,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Suco doce natural: maçã + cenoura.',
    tags: [
      'Vitamina A',
      'Natural',
      'Doce',
      'Rápido'
    ],
    benefits: [
      'Boa energia',
      'Rico em vitamina A',
      'Ótimo para manhã'
    ],
    allergens: [ ],
image: 'image/suco-de-maca-com-cenoura.webp',
    ingredients: [
      {
        icon: 'apple',
        quantity: '1 unidade',
        text: 'maçã'
      },
      {
        icon: 'carrot',
        quantity: '1 unidade',
        text: 'cenoura'
      },
      {
        icon: 'droplets',
        quantity: '200ml',
        text: 'água'
      }
    ],
    instructions: [
      'Bata tudo até ficar liso.',
      'Coe se preferir.',
      'Sirva.'
    ],
    tips: [
      '🥕 Bata bem.',
      '🍎 Maçã madura adoça.',
      '🧊 Sirva gelado.'
    ],
	
	
    images: {
      hero: 'image/suco-de-maca-com-cenoura.webp',
      steps: [ ]
    },
	
	
    macros: {
      juice: '5% proteína, 91% carboidratos, 0% gorduras',
      vegan: '100% vegetal'
    }
 },

{
	 
 id: 51,
    name: 'Panquecas de Aveia e Banana',
    category: 'Café da Manhã',
    calories: 285,
    protein: 12,
    carbs: 42,
    fats: 8,
    fiber: 6,
    time: 15,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Panquecas fofinhas 100% veganas, sem glúten e naturalmente doces',
    
    tags: ['Vegano', 'Sem Glúten', 'Sem Açúcar Refinado', 'Proteico'],
    
    benefits: [
        'Rica em fibras para saciedade prolongada',
        'Fonte de energia de liberação lenta',
        'Sem picos de insulina',
        'Alto teor de potássio e magnésio'
    ],
    
    allergens: ['Aveia'],
    
image: 'image/panquecas-de-aveia-e-banana.webp',
    
    ingredients: [
        { icon: 'banana', quantity: '2 unidades', text: 'bananas maduras' },
        { icon: 'wheat', quantity: '1 xícara (100g)', text: 'de aveia em flocos' },
        { icon: 'milk', quantity: '1/2 xícara', text: 'de leite vegetal' },
        { icon: 'sparkles', quantity: '1 colher chá', text: 'de fermento em pó' },
        { icon: 'droplet', quantity: '1 colher chá', text: 'de essência de baunilha' },
        { icon: 'sparkles', quantity: '1 pitada', text: 'de canela em pó' }
    ],
    
    instructions: [
        'Bata a aveia no liquidificador até virar farinha',
        'Adicione as bananas, leite vegetal, fermento e baunilha',
        'Bata até formar massa homogênea',
        'Aqueça frigideira antiaderente em fogo médio',
        'Despeje pequenas porções de massa',
        'Quando surgirem bolhas, vire a panqueca',
        'Doure por 1-2 minutos do outro lado',
        'Sirva com frutas frescas e mel ou pasta de amendoim'
    ],
    
    tips: [
        'Bananas bem maduras deixam mais doce naturalmente',
        'Fogo médio-baixo evita queimar',
        'Congele extras e reaqueça na airfryer',
        'Adicione cacau para versão chocolate'
    ],
    
	
	
    images: {
      hero: 'image/panquecas-de-aveia-e-banana.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['banana', 'aveia'],
        objectives: ['energia', 'saciedade'],
        dishType: ['panqueca', 'breakfast'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha'],
        keywords: ['panqueca', 'banana', 'aveia', 'facil', 'rapida']
    }
},

{
    id: 52,
    name: 'Smoothie Verde Detox',
    category: 'Café da Manhã',
    calories: 180,
    protein: 8,
    carbs: 32,
    fats: 4,
    fiber: 8,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Vitamina verde energizante com espinafre, abacaxi e gengibre',
    
    tags: ['Vegano', 'Detox', 'Energético', 'Antioxidante'],
    
    benefits: [
        'Desintoxica naturalmente o organismo',
        'Rico em vitaminas A, C e K',
        'Melhora digestão e imunidade',
        'Hidratação e energia instantânea'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/smoothie-verde-detox.webp',
    
    ingredients: [
        { icon: 'leaf', quantity: '2 xícaras', text: 'de espinafre fresco' },
        { icon: 'banana', quantity: '1 unidade', text: 'banana congelada' },
        { icon: 'apple', quantity: '1 xícara', text: 'de abacaxi picado' },
        { icon: 'leaf', quantity: '1 pedaço (2cm)', text: 'de gengibre fresco' },
        { icon: 'droplet', quantity: '1 xícara', text: 'de água de coco' },
        { icon: 'droplet', quantity: '1 colher sopa', text: 'de suco de limão' }
    ],
    
    instructions: [
        'Adicione todos os ingredientes no liquidificador',
        'Comece com líquidos na base',
        'Bata em potência alta por 60 segundos',
        'Ajuste consistência com mais água de coco se necessário',
        'Sirva imediatamente bem gelado'
    ],
    
    tips: [
        'Banana congelada deixa cremoso sem gelo',
        'Gengibre acelera o metabolismo',
        'Adicione chia ou linhaça para mais fibras',
        'Prepare na noite anterior e armazene na geladeira'
    ],
    
	
	
    images: {
      hero: 'image/smoothie-verde-detox.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['espinafre', 'abacaxi', 'banana', 'gengibre'],
        objectives: ['detox', 'energia', 'saude'],
        dishType: ['smoothie', 'vitamina'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: true,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche'],
        keywords: ['smoothie', 'verde', 'detox', 'rapido', 'saudavel']
    }
},

{
    id: 53,
    name: 'Overnight Oats Chocolate',
    category: 'Café da Manhã',
    calories: 340,
    protein: 14,
    carbs: 48,
    fats: 12,
    fiber: 10,
    time: 5,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Aveia preparada na noite anterior com cacau e manteiga de amendoim',
    
    tags: ['Vegano', 'Preparo Antecipado', 'Rico em Fibras', 'Sem Cozimento'],
    
    benefits: [
        'Pronto ao acordar - zero preparo',
        'Estabiliza açúcar no sangue',
        'Melhora saúde intestinal',
        'Saciedade por horas'
    ],
    
    allergens: ['Aveia', 'Amendoim'],
    
image: 'image/overnight-oats-chocolate.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1/2 xícara (50g)', text: 'de aveia em flocos' },
        { icon: 'milk', quantity: '3/4 xícara', text: 'de leite de amêndoas' },
        { icon: 'candy', quantity: '2 colheres sopa', text: 'de cacau em pó 100%' },
        { icon: 'nut', quantity: '1 colher sopa', text: 'de manteiga de amendoim' },
        { icon: 'sparkles', quantity: '1 colher chá', text: 'de sementes de chia' },
        { icon: 'droplet', quantity: '1 colher chá', text: 'de xarope de maple' }
    ],
    
    instructions: [
        'Em um pote de vidro, misture aveia, cacau e chia',
        'Adicione leite vegetal e manteiga de amendoim',
        'Mexa bem até incorporar tudo',
        'Adicione adoçante natural a gosto',
        'Tampe e leve à geladeira por 4-8 horas',
        'Pela manhã, mexa e sirva gelado',
        'Finalize com frutas e granola se desejar'
    ],
    
    tips: [
        'Prepare na noite anterior para manhãs práticas',
        'Dura 3-4 dias na geladeira',
        'Varie com frutas vermelhas ou banana',
        'Adicione proteína vegetal em pó para mais proteína'
    ],
	
	
    images: {
      hero: 'image/overnight-oats-chocolate.webp',
      steps: [ ]
    },
	
	
    searchMeta: {
        mainIngredients: ['aveia', 'cacau', 'manteiga-amendoim'],
        objectives: ['praticidade', 'saciedade', 'energia'],
        dishType: ['overnight-oats'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: false,
            raw: true,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha'],
        keywords: ['overnight', 'aveia', 'chocolate', 'pratico']
    }
},

{
    id: 54,
    name: 'Torradas de Abacate com Tomate',
    category: 'Café da Manhã',
    calories: 280,
    protein: 8,
    carbs: 32,
    fats: 15,
    fiber: 9,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Torradas crocantes com guacamole caseiro e tomates frescos',
    
    tags: ['Vegano', 'Rico em Gorduras Boas', 'Rápido', 'Instagram Worthy'],
    
    benefits: [
        'Gorduras boas para saciedade',
        'Rico em fibras e antioxidantes',
        'Vitaminas E, K e potássio',
        'Melhora absorção de nutrientes'
    ],
    
    allergens: ['Glúten (use pão sem glúten se necessário)'],
    
image: 'image/torradas-de-abacate-com-tomate.webp',
    ingredients: [
        { icon: 'wheat', quantity: '2 fatias', text: 'de pão integral' },
        { icon: 'leaf', quantity: '1 unidade', text: 'abacate maduro' },
        { icon: 'circle-dot', quantity: '6 unidades', text: 'tomates cereja' },
        { icon: 'droplet', quantity: '1/2 unidade', text: 'limão (suco)' },
        { icon: 'flower-2', quantity: '1 dente', text: 'de alho picado' },
        { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e flocos de pimenta' }
    ],
    
    instructions: [
        'Torrar as fatias de pão até ficarem crocantes',
        'Amassar o abacate com garfo em uma tigela',
        'Adicionar suco de limão, alho, sal e pimenta',
        'Misturar bem até formar um creme',
        'Espalhar generosamente sobre as torradas',
        'Cortar os tomates cereja ao meio',
        'Distribuir sobre o abacate',
        'Finalizar com sal marinho e flocos de pimenta'
    ],
    
    tips: [
        'Abacate maduro é essencial para cremosidade',
        'Limão evita que o abacate escureça',
        'Adicione gergelim ou sementes de girassol',
        'Versão gourmet: adicione rúcula e azeite'
    ],
    
	
	
    images: {
      hero: 'image/torradas-de-abacate-com-tomate.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['abacate', 'tomate', 'pao'],
        objectives: ['saciedade', 'saude', 'praticidade'],
        dishType: ['torrada', 'toast'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: false,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche'],
        keywords: ['abacate', 'toast', 'torrada', 'rapido', 'saudavel']
    }
},

{
    id: 55,
    name: 'Bowl de Açaí Tropical',
    category: 'Café da Manhã',
    calories: 320,
    protein: 10,
    carbs: 52,
    fats: 9,
    fiber: 12,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Açaí cremoso com frutas tropicais e granola caseira',
    
    tags: ['Vegano', 'Energético', 'Antioxidante', 'Pós-Treino'],
    
    benefits: [
        'Rico em antioxidantes naturais',
        'Energia imediata e duradoura',
        'Combate radicais livres',
        'Fortalece o sistema imunológico'
    ],
    
    allergens: ['Oleaginosas (granola)'],
    
image: 'image/bowl-de-acai-tropical.webp',
    
    ingredients: [
        { icon: 'droplets', quantity: '200g', text: 'de polpa de açaí puro' },
        { icon: 'banana', quantity: '1 unidade', text: 'banana congelada' },
        { icon: 'apple', quantity: '1/2 xícara', text: 'de manga picada' },
        { icon: 'apple', quantity: '1/2 xícara', text: 'de morango' },
        { icon: 'wheat', quantity: '3 colheres sopa', text: 'de granola' },
        { icon: 'circle', quantity: '2 colheres sopa', text: 'de coco ralado' }
    ],
    
    instructions: [
        'Bata a polpa de açaí com banana congelada',
        'Adicione 2-3 colheres de água se necessário',
        'Bata até consistência cremosa (tipo sorvete)',
        'Despeje em uma tigela',
        'Decore metade com manga e metade com morango',
        'Adicione granola por cima',
        'Finalize com coco ralado',
        'Sirva imediatamente'
    ],
    
    tips: [
        'Banana congelada dá cremosidade sem gelo',
        'Não adicione muito líquido - deve ficar grosso',
        'Varie as frutas: kiwi, abacaxi, maracujá',
        'Adicione pasta de amendoim para mais proteína'
    ],
    
	
	
    images: {
      hero: 'image/bowl-de-acai-tropical.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['acai', 'banana', 'frutas'],
        objectives: ['energia', 'pos-treino', 'antioxidante'],
        dishType: ['bowl', 'acai'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: false,
            raw: true,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche'],
        keywords: ['acai', 'bowl', 'tropical', 'energetico']
    }
},

{
    id: 56,
    name: 'Tapioca Recheada de Cogumelos',
    category: 'Café da Manhã',
    calories: 240,
    protein: 10,
    carbs: 38,
    fats: 6,
    fiber: 4,
    time: 15,
    servings: 1,
    difficulty: 'Médio',
    featured: false,
    description: 'Tapioca quentinha com recheio salgado de cogumelos refogados',
    
    tags: ['Vegano', 'Sem Glúten', 'Brasileiro', 'Salgado'],
    
    benefits: [
        'Sem glúten naturalmente',
        'Fácil digestão',
        'Baixo índice glicêmico',
        'Versátil e saborosa'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/tapioca-recheada-de-cogumelos.webp',
    
    ingredients: [
        { icon: 'circle', quantity: '4 colheres sopa', text: 'de goma de tapioca' },
        { icon: 'leaf', quantity: '200g', text: 'de cogumelos fatiados' },
        { icon: 'circle', quantity: '1/2 unidade', text: 'de cebola picada' },
        { icon: 'flower-2', quantity: '2 dentes', text: 'de alho' },
        { icon: 'droplets', quantity: '1 colher sopa', text: 'de azeite' },
        { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e salsinha' }
    ],
    
    instructions: [
        'Refogue cebola e alho no azeite até dourar',
        'Adicione os cogumelos e cozinhe até soltarem água',
        'Tempere com sal, pimenta e salsinha',
        'Reserve o recheio',
        'Aqueça frigideira antiaderente em fogo médio',
        'Espalhe a goma formando disco fino',
        'Quando as bordas soltarem, vire a tapioca',
        'Coloque o recheio em uma metade',
        'Dobre ao meio e sirva quente'
    ],
    
    tips: [
        'Tapioca hidratada fica mais macia',
        'Fogo médio evita queimar',
        'Adicione tomate e rúcula para variar',
        'Versão doce: banana com canela'
    ],
	
	
    images: {
      hero: 'image/tapioca-recheada-de-cogumelos.webp',
      steps: [ ]
    },
	
	
    searchMeta: {
        mainIngredients: ['tapioca', 'cogumelos'],
        objectives: ['praticidade', 'sem-gluten'],
        dishType: ['tapioca', 'salgado'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche', 'jantar'],
        keywords: ['tapioca', 'cogumelos', 'sem-gluten', 'brasileiro']
    }
},

{
    id: 57,
    name: 'Mingau de Aveia com Frutas Vermelhas',
    category: 'Café da Manhã',
    calories: 260,
    protein: 10,
    carbs: 42,
    fats: 6,
    fiber: 8,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Mingau cremoso e reconfortante com antioxidantes das frutas vermelhas',
    
    tags: ['Vegano', 'Reconfortante', 'Rico em Fibras', 'Antioxidante'],
    
    benefits: [
        'Regula colesterol naturalmente',
        'Melhora trânsito intestinal',
        'Rico em antioxidantes',
        'Aquece e satisfaz'
    ],
    
    allergens: ['Aveia'],
    
image: 'image/mingau-de-aveia-com-frutas-vermelhas.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1/2 xícara (50g)', text: 'de aveia em flocos' },
        { icon: 'milk', quantity: '1 xícara', text: 'de leite vegetal' },
        { icon: 'apple', quantity: '1/2 xícara', text: 'de frutas vermelhas mistas' },
        { icon: 'droplet', quantity: '1 colher sopa', text: 'de xarope de agave' },
        { icon: 'sparkles', quantity: '1 pitada', text: 'de canela' },
        { icon: 'droplet', quantity: '1 colher chá', text: 'de essência de baunilha' }
    ],
    
    instructions: [
        'Em uma panela, aqueça o leite vegetal',
        'Adicione a aveia e mexa bem',
        'Cozinhe em fogo médio por 5-7 minutos mexendo',
        'Adicione essência de baunilha e canela',
        'Ajuste consistência com mais leite se necessário',
        'Adoce com agave a gosto',
        'Sirva em tigela',
        'Finalize com frutas vermelhas por cima'
    ],
    
    tips: [
        'Aveia em flocos finos cozinha mais rápido',
        'Mexa constantemente para não grudar',
        'Frutas congeladas funcionam perfeitamente',
        'Adicione sementes de chia para mais fibras'
    ],
	
	
    images: {
      hero: 'image/mingau-de-aveia-com-frutas-vermelhas.webp',
      steps: [ ]
    },
	
	
    searchMeta: {
        mainIngredients: ['aveia', 'frutas-vermelhas'],
        objectives: ['saciedade', 'saude', 'conforto'],
        dishType: ['mingau', 'porridge'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha'],
        keywords: ['mingau', 'aveia', 'frutas-vermelhas', 'cremoso']
    }
},

{
    id: 58,
    name: 'Crepioca de Espinafre',
    category: 'Café da Manhã',
    calories: 220,
    protein: 12,
    carbs: 32,
    fats: 5,
    fiber: 4,
    time: 12,
    servings: 1,
    difficulty: 'Fácil',
    featured: true,
    description: 'Crepe de tapioca e grão-de-bico com espinafre - proteico e sem glúten',
    
    tags: ['Vegano', 'Sem Glúten', 'Alto em Proteína', 'Verde'],
    
    benefits: [
        'Combina proteína e carboidrato',
        'Rico em ferro e cálcio',
        'Sem glúten e lactose',
        'Energia sustentada'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/crepioca-de-espinafre.webp',
    
    ingredients: [
        { icon: 'circle', quantity: '3 colheres sopa', text: 'de goma de tapioca' },
        { icon: 'circle', quantity: '2 colheres sopa', text: 'de farinha de grão-de-bico' },
        { icon: 'leaf', quantity: '1/2 xícara', text: 'de espinafre picado' },
        { icon: 'droplet', quantity: '4 colheres sopa', text: 'de água' },
        { icon: 'sparkles', quantity: 'a gosto', text: 'sal e orégano' },
        { icon: 'circle-dot', quantity: '1/2 unidade', text: 'tomate picado' }
    ],
    
    instructions: [
        'Em uma tigela, misture tapioca e farinha de grão-de-bico',
        'Adicione água aos poucos até formar massa lisa',
        'Adicione espinafre picado, sal e orégano',
        'Mexa bem para distribuir o espinafre',
        'Aqueça frigideira antiaderente',
        'Despeje a massa formando disco fino',
        'Cozinhe por 2-3 minutos de cada lado',
        'Recheie com tomate picado e dobre',
        'Sirva quente'
    ],
    
    tips: [
        'Farinha de grão-de-bico adiciona proteína',
        'Espinafre fresco é melhor que congelado',
        'Recheie com hummus para mais sabor',
        'Versão fitness: adicione proteína vegetal em pó'
    ],
    
	
	
    images: {
      hero: 'image/crepioca-de-espinafre-16-9.png',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['tapioca', 'grao-de-bico', 'espinafre'],
        objectives: ['proteina', 'sem-gluten', 'verde'],
        dishType: ['crepioca', 'crepe'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche'],
        keywords: ['crepioca', 'espinafre', 'proteico', 'sem-gluten']
    }
},

{
    id: 59,
    name: 'Granola Caseira Crocante',
    category: 'Café da Manhã',
    calories: 350,
    protein: 10,
    carbs: 45,
    fats: 16,
    fiber: 7,
    time: 40,
    servings: 10,
    difficulty: 'Fácil',
    featured: false,
    description: 'Granola artesanal assada com mel, castanhas e frutas secas',
    
    tags: ['Vegano', 'Meal Prep', 'Sem Açúcar Refinado', 'Crocante'],
    
    benefits: [
        'Dura 1 mês em pote fechado',
        'Sem conservantes artificiais',
        'Rico em gorduras boas',
        'Energia de qualidade'
    ],
    
    allergens: ['Oleaginosas', 'Aveia'],
    
image: 'image/granola-caseira-crocante.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '3 xícaras', text: 'de aveia em flocos' },
        { icon: 'nut', quantity: '1 xícara', text: 'de mix de castanhas picadas' },
        { icon: 'droplet', quantity: '1/3 xícara', text: 'de mel ou xarope de maple' },
        { icon: 'droplets', quantity: '1/4 xícara', text: 'de óleo de coco derretido' },
        { icon: 'sparkles', quantity: '1 colher chá', text: 'de canela' },
        { icon: 'circle', quantity: '1/2 xícara', text: 'de frutas secas picadas' }
    ],
    
    instructions: [
        'Preaqueça o forno a 160°C',
        'Misture aveia, castanhas e canela',
        'Em outra tigela, misture mel e óleo de coco',
        'Despeje sobre a aveia e mexa bem',
        'Espalhe em assadeira forrada',
        'Asse por 25-30min mexendo a cada 10min',
        'Deixe esfriar completamente (fica crocante)',
        'Adicione frutas secas após esfriar',
        'Guarde em pote hermético'
    ],
    
    tips: [
        'Mexa durante o cozimento para dourar uniforme',
        'Esfria completamente antes de guardar',
        'Varie as castanhas: amêndoas, nozes, macadâmia',
        'Dura 1 mês em temperatura ambiente'
    ],
	
	
    images: {
      hero: 'image/granola-caseira-crocante.webp',
      steps: [ ]
    },
	
	
    searchMeta: {
        mainIngredients: ['aveia', 'castanhas', 'mel'],
        objectives: ['meal-prep', 'praticidade'],
        dishType: ['granola', 'cereal'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: false,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche'],
        keywords: ['granola', 'caseira', 'crocante', 'meal-prep']
    }
},

{
    id: 60,
    name: 'Wrap de Hummus e Vegetais',
    category: 'Café da Manhã',
    calories: 290,
    protein: 12,
    carbs: 40,
    fats: 10,
    fiber: 8,
    time: 10,
    servings: 1,
    difficulty: 'Fácil',
    featured: false,
    description: 'Wrap vegano recheado com hummus cremoso e vegetais frescos',
    
    tags: ['Vegano', 'Proteico', 'Fresco', 'Portátil'],
    
    benefits: [
        'Proteína completa do grão-de-bico',
        'Rico em vegetais crus',
        'Fácil de transportar',
        'Refeição balanceada'
    ],
    
    allergens: ['Glúten', 'Gergelim (tahine)'],
    
image: 'image/wrap-de-hummus-e-vegetais.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1 unidade', text: 'de tortilha integral' },
        { icon: 'circle', quantity: '4 colheres sopa', text: 'de hummus' },
        { icon: 'leaf', quantity: '1/2 xícara', text: 'de mix de folhas' },
        { icon: 'circle-dot', quantity: '1/2 unidade', text: 'tomate fatiado' },
        { icon: 'circle', quantity: '1/4 unidade', text: 'pepino em tiras' },
        { icon: 'circle', quantity: '1/4 unidade', text: 'cenoura ralada' }
    ],
    
    instructions: [
        'Aqueça levemente a tortilha (opcional)',
        'Espalhe hummus generosamente',
        'Distribua as folhas verdes',
        'Adicione tomate, pepino e cenoura',
        'Tempere com sal e pimenta',
        'Enrole firmemente dobrando as laterais',
        'Corte ao meio na diagonal',
        'Sirva imediatamente ou embrulhe para viagem'
    ],
    
    tips: [
        'Hummus caseiro fica mais saboroso',
        'Seque bem os vegetais para não encharcar',
        'Adicione abacate para cremosidade',
        'Embrulhe em papel alumínio para transportar'
    ],
    
	
	
    images: {
      hero: 'image/wrap-de-hummus-e-vegetais.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['hummus', 'vegetais', 'tortilha'],
        objectives: ['proteina', 'praticidade', 'leve'],
        dishType: ['wrap', 'sanduiche'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: false,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['cafe-da-manha', 'lanche', 'almoco'],
        keywords: ['wrap', 'hummus', 'vegetais', 'portatil']
    }
},

{
    id: 61,
    name: 'Buddha Bowl Mediterrâneo',
    category: 'Almoço',
    calories: 420,
    protein: 18,
    carbs: 52,
    fats: 16,
    fiber: 12,
    time: 30,
    servings: 2,
    difficulty: 'Médio',
    featured: false,
    description: 'Bowl completo com quinoa, grão-de-bico assado, vegetais e molho tahine',
    
    tags: ['Vegano', 'Sem Glúten', 'Completo', 'Mediterrâneo'],
    
    benefits: [
        'Refeição nutricionalmente completa',
        'Alto teor de fibras',
        'Proteína completa',
        'Antioxidantes abundantes'
    ],
    
    allergens: ['Gergelim (tahine)'],
    
image: 'image/buddha-bowl-mediterraneo.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1 xícara', text: 'de quinoa cozida' },
        { icon: 'circle', quantity: '1 xícara', text: 'de grão-de-bico cozido' },
        { icon: 'leaf', quantity: '2 xícaras', text: 'de mix de folhas' },
        { icon: 'circle-dot', quantity: '1/2 xícara', text: 'tomates cereja' },
        { icon: 'circle', quantity: '1/2 unidade', text: 'pepino em cubos' },
        { icon: 'leaf', quantity: '1/4 xícara', text: 'azeitonas pretas' },
        { icon: 'droplets', quantity: '3 colheres sopa', text: 'molho tahine' }
    ],
    
    instructions: [
        'Asse grão-de-bico: tempere com cominho, páprica e azeite, asse 25min a 200°C',
        'Cozinhe quinoa conforme embalagem',
        'Prepare molho tahine: 3 col tahine + suco 1 limão + 2 col água + 1 dente alho',
        'Monte bowl: base de folhas verdes',
        'Adicione quinoa de um lado',
        'Distribua grão-de-bico, tomates, pepino e azeitonas',
        'Regue com molho tahine',
        'Finalize com azeite e ervas frescas'
    ],
    
    tips: [
        'Grão-de-bico bem seco assa mais crocante',
        'Tahine grosso? Adicione água até cremoso',
        'Meal prep: componentes separados, monte na hora',
        'Adicione hortelã fresca para toque autêntico'
    ],
	
	
    images: {
      hero: 'image/buddha-bowl-mediterraneo.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['quinoa', 'grao-de-bico', 'tahine'],
        objectives: ['refeicao-completa', 'saciedade'],
        dishType: ['bowl', 'salada'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['buddha-bowl', 'mediterraneo', 'completo', 'saudavel']
    }
},

{
    id: 62,
    name: 'Curry de Lentilha e Coco',
    category: 'Almoço',
    calories: 380,
    protein: 16,
    carbs: 48,
    fats: 14,
    fiber: 12,
    time: 35,
    servings: 4,
    difficulty: 'Médio',
    featured: false,
    description: 'Curry indiano aromático com lentilha, leite de coco e especiarias',
    
    tags: ['Vegano', 'Sem Glúten', 'Indiano', 'Reconfortante'],
    
    benefits: [
        'Rico em proteína vegetal',
        'Anti-inflamatório natural',
        'Ferro e fibras abundantes',
        'Aquece e satisfaz'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/curry-de-lentilha-e-coco.webp',
    ingredients: [
        { icon: 'circle', quantity: '1 xícara', text: 'de lentilha vermelha' },
        { icon: 'milk', quantity: '1 lata (400ml)', text: 'leite de coco' },
        { icon: 'circle', quantity: '1 unidade', text: 'cebola picada' },
        { icon: 'flower-2', quantity: '4 dentes', text: 'alho picado' },
        { icon: 'leaf', quantity: '2 col sopa', text: 'gengibre ralado' },
        { icon: 'circle-dot', quantity: '2 unidades', text: 'tomates picados' },
        { icon: 'sparkles', quantity: '2 col sopa', text: 'curry em pó' },
        { icon: 'droplets', quantity: '2 col sopa', text: 'óleo de coco' }
    ],
    
    instructions: [
        'Refogue cebola em óleo de coco até dourar',
        'Adicione alho e gengibre, refogue 1min',
        'Adicione curry em pó, mexa por 30seg',
        'Adicione tomates, cozinhe 5min',
        'Adicione lentilha e 2 xícaras de água',
        'Cozinhe 20min até lentilha amolecer',
        'Adicione leite de coco, cozinhe mais 5min',
        'Ajuste sal e pimenta',
        'Sirva com arroz basmati ou naan'
    ],
    
    tips: [
        'Lentilha vermelha cozinha rápido (20min)',
        'Leite de coco integral fica mais cremoso',
        'Adicione espinafre nos últimos minutos',
        'Congela perfeitamente - faça lote grande'
    ],
    
	
	
    images: {
      hero: 'image/curry-de-lentilha-e-coco.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['lentilha', 'leite-coco', 'curry'],
        objectives: ['refeicao-completa', 'conforto'],
        dishType: ['curry', 'indiano'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['curry', 'lentilha', 'indiano', 'cremoso']
    }
},

{
    id: 63,
    name: 'Macarrão ao Pesto de Manjericão',
    category: 'Almoço',
    calories: 450,
    protein: 14,
    carbs: 58,
    fats: 18,
    fiber: 6,
    time: 20,
    servings: 2,
    difficulty: 'Fácil',
    featured: false,
    description: 'Massa integral com pesto caseiro vegano de manjericão e castanhas',
    
    tags: ['Vegano', 'Italiano', 'Aromático', 'Rápido'],
    
    benefits: [
        'Rico em gorduras boas',
        'Antioxidantes do manjericão',
        'Energia sustentada',
        'Sabor intenso e fresco'
    ],
    
    allergens: ['Glúten', 'Castanhas'],
    
image: 'image/macarrao-ao-pesto-de-manjericao.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '200g', text: 'de macarrão integral' },
        { icon: 'leaf', quantity: '2 xícaras', text: 'de manjericão fresco' },
        { icon: 'nut', quantity: '1/3 xícara', text: 'de castanhas do Pará' },
        { icon: 'flower-2', quantity: '2 dentes', text: 'de alho' },
        { icon: 'droplets', quantity: '1/3 xícara', text: 'de azeite extra-virgem' },
        { icon: 'droplet', quantity: '2 col sopa', text: 'de suco de limão' },
        { icon: 'sparkles', quantity: 'a gosto', text: 'sal e pimenta' }
    ],
    
    instructions: [
        'Cozinhe a massa conforme embalagem',
        'No liquidificador: manjericão, castanhas, alho',
        'Bata adicionando azeite aos poucos',
        'Adicione limão, sal e pimenta',
        'Bata até consistência cremosa',
        'Escorra a massa reservando 1/2 xícara da água',
        'Misture o pesto na massa',
        'Adicione água do cozimento se necessário',
        'Sirva com tomates cereja e manjericão fresco'
    ],
    
    tips: [
        'Manjericão fresco faz toda diferença',
        'Castanhas podem ser substituídas por pinhões',
        'Pesto dura 5 dias na geladeira',
        'Congele pesto em forminhas de gelo'
    ],
    
	
	
    images: {
      hero: 'image/macarrao-ao-pesto-de-manjericao.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['massa', 'manjericao', 'castanhas'],
        objectives: ['praticidade', 'sabor'],
        dishType: ['massa', 'italiano'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: false,
            dairyFree: true,
            soyFree: true,
            nutFree: false,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['macarrao', 'pesto', 'italiano', 'rapido']
    }
},

{
    id: 64,
    name: 'Falafel Assado com Salada Árabe',
    category: 'Almoço',
    calories: 390,
    protein: 16,
    carbs: 48,
    fats: 14,
    fiber: 14,
    time: 40,
    servings: 3,
    difficulty: 'Médio',
    featured: false,
    description: 'Bolinhos crocantes de grão-de-bico assados com salada fresca',
    
    tags: ['Vegano', 'Sem Glúten', 'Árabe', 'Proteico'],
    
    benefits: [
        'Versão assada - menos gordura',
        'Rica em proteína vegetal',
        'Fibras abundantes',
        'Sabor autêntico árabe'
    ],
    
    allergens: ['Gergelim'],
    
image: 'image/falafel-assado-com-salada-arabe.webp',
    
    ingredients: [
        { icon: 'circle', quantity: '2 xícaras', text: 'grão-de-bico cru (deixe de molho 12h)' },
        { icon: 'circle', quantity: '1 unidade', text: 'cebola picada' },
        { icon: 'flower-2', quantity: '4 dentes', text: 'alho' },
        { icon: 'leaf', quantity: '1 xícara', text: 'salsinha e coentro' },
        { icon: 'sparkles', quantity: '2 col chá', text: 'cominho' },
        { icon: 'sparkles', quantity: '1 col chá', text: 'coentro em pó' },
        { icon: 'wheat', quantity: '3 col sopa', text: 'farinha de grão-de-bico' }
    ],
    
    instructions: [
        'Escorra grão-de-bico e seque bem',
        'No processador: grão-de-bico, cebola, alho, ervas',
        'Pulse até textura granulada (não vire pasta)',
        'Adicione especiarias, farinha, sal',
        'Pulse mais algumas vezes',
        'Refrigere 30min',
        'Modele bolinhas e achate levemente',
        'Disponha em assadeira forrada',
        'Pincele com azeite e asse 25min a 200°C',
        'Vire na metade do tempo',
        'Sirva com molho tahine e salada'
    ],
    
    tips: [
        'Grão-de-bico CRU é essencial (não use cozido)',
        'Textura deve ser granulada, não pastosa',
        'Refrigerar antes ajuda a firmar',
        'Congele crus e asse quando quiser'
    ],
	
	
    images: {
      hero: 'image/falafel-assado-com-salada-arabe.webp',
      steps: [ ]
    },
	
	
    searchMeta: {
        mainIngredients: ['grao-de-bico', 'ervas', 'especiarias'],
        objectives: ['proteina', 'sabor', 'tradicional'],
        dishType: ['falafel', 'arabe'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['falafel', 'grao-de-bico', 'arabe', 'assado']
    }
},

{
    id: 65,
    name: 'Risoto de Cogumelos',
    category: 'Almoço',
    calories: 360,
    protein: 10,
    carbs: 54,
    fats: 12,
    fiber: 4,
    time: 40,
    servings: 2,
    difficulty: 'Médio',
    featured: false,
    description: 'Risoto cremoso vegano com mix de cogumelos e vinho branco',
    
    tags: ['Vegano', 'Italiano', 'Gourmet', 'Cremoso'],
    
    benefits: [
        'Cremoso sem laticínios',
        'Rico em umami natural',
        'Fonte de vitamina D',
        'Conforto gastronômico'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/risoto-de-cogumelos.JPEG',
    
    ingredients: [
        { icon: 'wheat', quantity: '1 xícara', text: 'arroz arbóreo' },
        { icon: 'leaf', quantity: '300g', text: 'mix de cogumelos' },
        { icon: 'circle', quantity: '1 unidade', text: 'cebola picada' },
        { icon: 'flower-2', quantity: '3 dentes', text: 'alho picado' },
        { icon: 'droplet', quantity: '1/2 xícara', text: 'vinho branco seco' },
        { icon: 'droplet', quantity: '4 xícaras', text: 'caldo de legumes quente' },
        { icon: 'droplets', quantity: '3 col sopa', text: 'azeite' },
        { icon: 'leaf', quantity: 'a gosto', text: 'tomilho e salsinha' }
    ],
    
    instructions: [
        'Refogue cogumelos no azeite até dourar, reserve',
        'Na mesma panela, refogue cebola até transparente',
        'Adicione alho e arroz, torre 2min mexendo',
        'Adicione vinho, mexa até evaporar',
        'Adicione 1 concha de caldo, mexa até absorver',
        'Continue adicionando caldo aos poucos',
        'Mexa constantemente por 18-20min',
        'Quando cremoso, adicione cogumelos reservados',
        'Finalize com azeite, ervas e pimenta',
        'Sirva imediatamente'
    ],
    
    tips: [
        'Paciência é essencial - mexa constantemente',
        'Caldo sempre quente para não interromper cozimento',
        'Arroz deve ficar al dente no centro',
        'Adicione fermento nutricional para sabor queijo'
    ],
    
	
	
    images: {
      hero: 'image/risoto-de-cogumelos.JPEG',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['arroz-arboreo', 'cogumelos', 'vinho'],
        objectives: ['gourmet', 'cremoso', 'especial'],
        dishType: ['risoto', 'italiano'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['risoto', 'cogumelos', 'cremoso', 'gourmet']
    }
},

{
    id: 66,
    name: 'Strogonoff de Palmito',
    category: 'Almoço',
    calories: 320,
    protein: 8,
    carbs: 38,
    fats: 14,
    fiber: 6,
    time: 25,
    servings: 3,
    difficulty: 'Fácil',
    featured: false,
    description: 'Strogonoff vegano cremoso com palmito e champignon',
    
    tags: ['Vegano', 'Brasileiro', 'Cremoso', 'Clássico Veganizado'],
    
    benefits: [
        'Versão vegana do clássico',
        'Baixo em calorias',
        'Rico em fibras',
        'Sabor nostálgico'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/strogonoff-de-palmito.webp',
    
    ingredients: [
        { icon: 'circle', quantity: '2 vidros (300g)', text: 'palmito em rodelas' },
        { icon: 'leaf', quantity: '200g', text: 'champignon fatiado' },
        { icon: 'circle', quantity: '1 unidade', text: 'cebola picada' },
        { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
        { icon: 'circle-dot', quantity: '3 col sopa', text: 'molho de tomate' },
        { icon: 'milk', quantity: '1 lata', text: 'creme de leite de coco' },
        { icon: 'droplet', quantity: '1 col sopa', text: 'mostarda' },
        { icon: 'droplets', quantity: '2 col sopa', text: 'azeite' }
    ],
    
    instructions: [
        'Refogue cebola e alho no azeite',
        'Adicione champignon, cozinhe até murchar',
        'Adicione palmito em rodelas',
        'Refogue por 3 minutos',
        'Adicione molho de tomate e mostarda',
        'Cozinhe 5 minutos',
        'Adicione creme de leite de coco',
        'Mexa bem e aqueça sem ferver',
        'Ajuste sal e pimenta',
        'Sirva com arroz e batata palha'
    ],
    
    tips: [
        'Creme de leite de coco não pode ferver',
        'Palmito em rodelas tem melhor textura',
        'Adicione páprica defumada para mais sabor',
        'Batata palha vegana finaliza perfeitamente'
    ],
    
	
	
    images: {
      hero: 'image/strogonoff-de-palmito.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['palmito', 'cogumelos', 'creme-coco'],
        objectives: ['praticidade', 'sabor', 'tradicional'],
        dishType: ['strogonoff', 'brasileiro'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['strogonoff', 'palmito', 'cremoso', 'brasileiro']
    }
},

{
    id: 67,
    name: 'Burrito Bowl Mexicano',
    category: 'Almoço',
    calories: 440,
    protein: 16,
    carbs: 58,
    fats: 14,
    fiber: 14,
    time: 30,
    servings: 2,
    difficulty: 'Médio',
    featured: false,
    description: 'Bowl completo com arroz, feijão preto, guacamole e pico de gallo',
    
    tags: ['Vegano', 'Sem Glúten', 'Mexicano', 'Completo'],
    
    benefits: [
        'Proteína completa (arroz + feijão)',
        'Altíssimo teor de fibras',
        'Rico em antioxidantes',
        'Refeição balanceada'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/burrito-bowl-mexicano.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1 xícara', text: 'arroz integral cozido' },
        { icon: 'circle', quantity: '1 xícara', text: 'feijão preto temperado' },
        { icon: 'leaf', quantity: '1 unidade', text: 'abacate (guacamole)' },
        { icon: 'circle-dot', quantity: '1/2 xícara', text: 'tomate picado' },
        { icon: 'circle', quantity: '1/4', text: 'cebola roxa picada' },
        { icon: 'leaf', quantity: '1/2 xícara', text: 'milho cozido' },
        { icon: 'droplet', quantity: '1', text: 'limão' },
        { icon: 'leaf', quantity: 'a gosto', text: 'coentro fresco' }
    ],
    
    instructions: [
        'Prepare guacamole: amasse abacate com limão, sal, coentro',
        'Prepare pico de gallo: tomate, cebola, limão, coentro, sal',
        'Aqueça feijão preto temperado',
        'Monte bowl: base de arroz integral',
        'Adicione feijão de um lado',
        'Distribua milho, guacamole e pico de gallo',
        'Finalize com molho de pimenta (opcional)',
        'Decore com coentro fresco'
    ],
    
    tips: [
        'Abacate maduro é essencial para guacamole',
        'Feijão caseiro é mais saboroso',
        'Adicione jalapeños para picante',
        'Sirva com chips de tortilha'
    ],
    
	
	
    images: {
      hero: 'image/burrito-bowl-mexicano.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['arroz', 'feijao', 'abacate'],
        objectives: ['refeicao-completa', 'proteina'],
        dishType: ['bowl', 'mexicano'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: true,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['burrito-bowl', 'mexicano', 'completo', 'colorido']
    }
},

{
    id: 68,
    name: 'Pad Thai Vegano',
    category: 'Almoço',
    calories: 410,
    protein: 12,
    carbs: 62,
    fats: 12,
    fiber: 6,
    time: 25,
    servings: 2,
    difficulty: 'Médio',
    featured: false,
    description: 'Macarrão tailandês com tofu, broto de feijão e molho tamarindo',
    
    tags: ['Vegano', 'Tailandês', 'Asiático', 'Agridoce'],
    
    benefits: [
        'Equilíbrio de sabores (doce, salgado, azedo)',
        'Rica em vegetais',
        'Proteína do tofu',
        'Autêntico sabor asiático'
    ],
    
    allergens: ['Soja', 'Amendoim'],
    
image: 'image/pad-thai-vegano.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '200g', text: 'macarrão de arroz' },
        { icon: 'square', quantity: '200g', text: 'tofu firme em cubos' },
        { icon: 'leaf', quantity: '1 xícara', text: 'broto de feijão' },
        { icon: 'circle', quantity: '2 unidades', text: 'cebolinha picada' },
        { icon: 'nut', quantity: '1/4 xícara', text: 'amendoim torrado' },
        { icon: 'droplet', quantity: '3 col sopa', text: 'molho de soja (shoyu)' },
        { icon: 'droplet', quantity: '2 col sopa', text: 'açúcar de coco' },
        { icon: 'droplet', quantity: '2 col sopa', text: 'suco de limão' }
    ],
    
    instructions: [
        'Deixe macarrão de arroz de molho em água quente 10min',
        'Prepare molho: shoyu, açúcar, limão, 1 col água',
        'Frite tofu em wok ou frigideira até dourar',
        'Reserve tofu',
        'No mesmo wok, salteie broto de feijão',
        'Escorra macarrão e adicione ao wok',
        'Adicione molho e misture bem',
        'Adicione tofu e cebolinha',
        'Salteie por 2-3min',
        'Sirva com amendoim e limão'
    ],
    
    tips: [
        'Não deixe macarrão de molho demais (fica mole)',
        'Wok bem quente é essencial',
        'Tamarindo pode substituir limão (mais autêntico)',
        'Adicione pimenta a gosto'
    ],
    
	
	
    images: {
      hero: 'image/pad-thai-vegano.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['macarrao-arroz', 'tofu', 'amendoim'],
        objectives: ['sabor', 'internacional'],
        dishType: ['pad-thai', 'asiatico'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: false,
            nutFree: false,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['pad-thai', 'tailandes', 'asiatico', 'tofu']
    }
},

{
    id: 69,
    name: 'Quiche de Brócolis Sem Glúten',
    category: 'Almoço',
    calories: 280,
    protein: 14,
    carbs: 28,
    fats: 12,
    fiber: 6,
    time: 50,
    servings: 6,
    difficulty: 'Médio',
    featured: true,
    description: 'Quiche vegana com massa de grão-de-bico e recheio cremoso',
    
    tags: ['Vegano', 'Sem Glúten', 'Proteico', 'Meal Prep'],
    
    benefits: [
        'Ideal para meal prep',
        'Rica em proteína',
        'Sem glúten e lactose',
        'Dura 4 dias na geladeira'
    ],
    
    allergens: ['Nenhum'],
    
image: 'image/quiche-de-brocolis-sem-gluten.webp',
    
    ingredients: [
        { icon: 'wheat', quantity: '1 xícara', text: 'farinha de grão-de-bico' },
        { icon: 'droplets', quantity: '3 col sopa', text: 'azeite' },
        { icon: 'leaf', quantity: '2 xícaras', text: 'brócolis picado' },
        { icon: 'square', quantity: '200g', text: 'tofu silken' },
        { icon: 'milk', quantity: '1/2 xícara', text: 'leite vegetal' },
        { icon: 'sparkles', quantity: '2 col sopa', text: 'fermento nutricional' },
        { icon: 'sparkles', quantity: '1 col chá', text: 'cúrcuma' }
    ],
    
    instructions: [
        'Massa: misture farinha, azeite, sal, 4 col água',
        'Amasse até formar bola',
        'Abra em forma untada',
        'Preaqueça forno 180°C',
        'Cozinhe brócolis no vapor 5min',
        'Bata tofu, leite, fermento, cúrcuma, sal',
        'Distribua brócolis na massa',
        'Despeje mistura de tofu',
        'Asse 35-40min até firmar',
        'Deixe esfriar 10min antes de cortar'
    ],
    
    tips: [
        'Tofu silken deixa mais cremoso',
        'Cúrcuma dá cor amarela',
        'Fermento nutricional imita sabor queijo',
        'Congele fatias e reaqueça'
    ],
    
	
	
    images: {
      hero: 'image/quiche-de-brocolis-sem-gluten-16-9.png',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['grao-de-bico', 'brocolis', 'tofu'],
        objectives: ['meal-prep', 'proteina', 'sem-gluten'],
        dishType: ['quiche', 'torta'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: false,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar', 'lanche'],
        keywords: ['quiche', 'brocolis', 'sem-gluten', 'meal-prep']
    }
},

{
    id: 70,
    name: 'Escondidinho de Mandioca com Proteína de Soja',
    category: 'Almoço',
    calories: 380,
    protein: 20,
    carbs: 48,
    fats: 12,
    fiber: 8,
    time: 45,
    servings: 4,
    difficulty: 'Médio',
    featured: false,
    description: 'Escondidinho vegano com purê cremoso e proteína texturizada',
    
    tags: ['Vegano', 'Sem Glúten', 'Brasileiro', 'Proteico'],
    
    benefits: [
        'Alto teor de proteína (20g)',
        'Receita reconfortante',
        'Sem glúten naturalmente',
        'Ótimo para família'
    ],
    
    allergens: ['Soja'],
    
image: 'image/escondidinho-de-mandioca-com-proteina-de-soja.webp',
    
    ingredients: [
        { icon: 'circle', quantity: '1kg', text: 'mandioca descascada' },
        { icon: 'square', quantity: '1 xícara', text: 'proteína de soja texturizada' },
        { icon: 'circle', quantity: '1 unidade', text: 'cebola picada' },
        { icon: 'circle-dot', quantity: '3 col sopa', text: 'molho de tomate' },
        { icon: 'milk', quantity: '1/2 xícara', text: 'leite de coco' },
        { icon: 'droplets', quantity: '3 col sopa', text: 'azeite' },
        { icon: 'sparkles', quantity: 'a gosto', text: 'sal, alho, cominho' }
    ],
    
    instructions: [
        'Hidrate proteína de soja em caldo quente 15min',
        'Cozinhe mandioca até macia',
        'Refogue cebola e alho',
        'Esprema proteína e adicione à panela',
        'Tempere com cominho, sal, pimenta',
        'Adicione molho de tomate, cozinhe 10min',
        'Amasse mandioca com leite de coco',
        'Em refratário: camada de proteína',
        'Cubra com purê de mandioca',
        'Asse 20min a 200°C até dourar'
    ],
    
    tips: [
        'Mandioca cozida deve estar bem macia',
        'Esprema bem a proteína para tirar excesso',
        'Leite de coco deixa purê cremoso',
        'Rende bem e pode congelar'
    ],
    
	
	
    images: {
      hero: 'image/escondidinho-de-mandioca-com-proteina-de-soja.webp',
      steps: [ ]
    },
	
	
    
    searchMeta: {
        mainIngredients: ['mandioca', 'proteina-soja'],
        objectives: ['proteina', 'conforto', 'familia'],
        dishType: ['escondidinho', 'brasileiro'],
        dietary: {
            vegetarian: true,
            vegan: true,
            glutenFree: true,
            dairyFree: true,
            soyFree: false,
            nutFree: true,
            raw: false,
            lowCarb: false
        },
        mealTime: ['almoco', 'jantar'],
        keywords: ['escondidinho', 'mandioca', 'proteina-soja', 'brasileiro']
    }
},



{
  id: 73,
  name: 'Bowl de Frutas com Pasta de Amendoim',
  category: 'Café da Manhã',
  calories: 420,
  protein: 14,
  carbs: 52,
  fats: 18,
  fiber: 10,
  time: 8,
  servings: 1,
  difficulty: 'Fácil',
  featured: false,
  description: 'Bowl cremoso de frutas com pasta de amendoim, granola e sementes. Perfeito para energia e saciedade.',
  tags: ['Rápido', 'Energético', 'Fibras', 'Sem lactose'],
  benefits: ['Boa saciedade', 'Ótimo pré/pós-treino', 'Rico em micronutrientes'],
  allergens: ['Amendoim (pasta)', 'Oleaginosas (se usar granola)'],
  
  
image: 'image/bowl-de-frutas-com-pasta-de-amendoim.webp',



  ingredients: [
    { icon: 'banana', quantity: '1 unidade', text: 'banana' },
    { icon: 'strawberry', quantity: '1/2 xícara', text: 'frutas (morango/manga/uva)' },
    { icon: 'droplets', quantity: '2 colheres sopa', text: 'pasta de amendoim' },
    { icon: 'circle', quantity: '2 colheres sopa', text: 'granola', optional: true },
    { icon: 'sparkles', quantity: '1 colher sopa', text: 'chia ou linhaça', optional: true }
  ],
  instructions: [
    'Amasse a banana (ou bata com as frutas para ficar mais cremoso).',
    'Coloque em uma tigela.',
    'Finalize com pasta de amendoim por cima.',
    'Adicione granola e sementes (opcional).',
    'Sirva na hora.'
  ],
  tips: [
    '🧊 Banana congelada deixa textura tipo sorvete.',
    '🥜 Use pasta 100% amendoim para melhor perfil nutricional.',
    '🍯 Se precisar adoçar, use tâmara ou um fio de melado.'
  ],
	
	
    images: {
      hero: 'image/bowl-de-frutas-com-pasta-de-amendoim.webp',
      steps: [ ]
    },
	
	
  macros: { breakfast: '13% proteína, 50% carboidratos, 37% gorduras', vegan: '100% vegetal' }
},

{
  id: 74,
  name: 'Mingau de Aveia com Canela',
  category: 'Café da Manhã',
  calories: 320,
  protein: 12,
  carbs: 50,
  fats: 8,
  fiber: 9,
  time: 10,
  servings: 1,
  difficulty: 'Fácil',
  featured: false,
  description: 'Mingau cremoso de aveia com canela e fruta. Conforto e saciedade em poucos minutos.',
  tags: ['Reconfortante', 'Rápido', 'Fibras', 'Sem lactose'],
  benefits: ['Ajuda na saciedade', 'Boa energia para manhã', 'Ótimo para dias frios'],
  allergens: ['Aveia'],
  
  
image: 'image/mingau-de-aveia-com-canela.webp',
  
  
  
  ingredients: [
    { icon: 'wheat', quantity: '1/2 xícara', text: 'aveia em flocos' },
    { icon: 'milk', quantity: '250ml', text: 'leite vegetal' },
    { icon: 'sparkles', quantity: '1/2 colher chá', text: 'canela' },
    { icon: 'banana', quantity: '1/2 unidade', text: 'banana fatiada (opcional)', optional: true },
    { icon: 'circle', quantity: '1 colher chá', text: 'melado (opcional)', optional: true }
  ],
  instructions: [
    'Aqueça o leite vegetal em uma panela.',
    'Adicione a aveia e mexa por 5–7 minutos.',
    'Tempere com canela.',
    'Finalize com banana e/ou melado (opcional).',
    'Sirva quente.'
  ],
  tips: [
    '🥣 Mexer sempre evita grudar.',
    '🍎 Maçã picada cozinha junto e fica ótimo.',
    '💪 Dá pra adicionar 1 colher de pasta de amendoim para mais proteína.'
  ],
	
	
    images: {
      hero: 'image/mingau-de-aveia-com-canela.webp',
      steps: [ ]
    },
	
	
  macros: { breakfast: '15% proteína, 62% carboidratos, 23% gorduras', vegan: '100% vegetal' }
},

{
  id: 75,
  name: 'Smoothie de Banana com Amendoim',
  category: 'Café da Manhã',
  calories: 380,
  protein: 16,
  carbs: 46,
  fats: 14,
  fiber: 7,
  time: 5,
  servings: 1,
  difficulty: 'Fácil',
  featured: false,
  description: 'Smoothie cremoso de banana com pasta de amendoim. Rápido, saciante e perfeito para treino.',
  tags: ['Rápido', 'Cremoso', 'Proteico', 'Pós-treino'],
  benefits: ['Boa proteína', 'Energia rápida', 'Prático para rotina'],
  allergens: ['Amendoim'],
  
  
image: 'image/smoothie-de-banana-com-amendoim.webp',
  
  
  
  ingredients: [
    { icon: 'banana', quantity: '1 unidade', text: 'banana congelada' },
    { icon: 'milk', quantity: '250ml', text: 'leite vegetal' },
    { icon: 'droplets', quantity: '1 a 2 colheres sopa', text: 'pasta de amendoim' },
    { icon: 'sparkles', quantity: '1 colher sopa', text: 'chia (opcional)', optional: true },
    { icon: 'snowflake', quantity: 'a gosto', text: 'gelo (opcional)', optional: true }
  ],
  instructions: [
    'Coloque tudo no liquidificador.',
    'Bata por 45–60 segundos até ficar liso.',
    'Ajuste a textura com mais leite vegetal, se necessário.',
    'Sirva imediatamente.'
  ],
  tips: [
    '🧊 Banana congelada dispensa gelo.',
    '🍫 Cacau em pó combina muito.',
    '💪 Se quiser mais proteína, adicione proteína vegetal em pó.'
  ],
  	
    images: {
      hero: 'image/smoothie-de-banana-com-amendoim.webp',
      steps: [ ]
    },
	
  macros: { breakfast: '17% proteína, 48% carboidratos, 33% gorduras', vegan: '100% vegetal' }
},

{
  id: 76,
  name: 'Iogurte Vegano com Granola e Frutas',
  category: 'Lanches',
  calories: 290,
  protein: 10,
  carbs: 38,
  fats: 10,
  fiber: 7,
  time: 4,
  servings: 1,
  difficulty: 'Fácil',
  featured: false,
  description: 'Lanche prático com iogurte vegetal, frutas e granola crocante.',
  tags: ['Prático', 'Rápido', 'Fibras', 'Leve'],
  benefits: ['Boa saciedade', 'Ótimo para tarde', 'Fácil de montar'],
  allergens: ['Pode conter soja (iogurte)', 'Oleaginosas (granola)'],
  
  
  image: 'image/iogurte-vegano-com-granola-e-frutas.webp',
  
  
  ingredients: [
    { icon: 'droplets', quantity: '170g', text: 'iogurte vegetal' },
    { icon: 'strawberry', quantity: '1/2 xícara', text: 'frutas picadas' },
    { icon: 'wheat', quantity: '2 colheres sopa', text: 'granola' },
    { icon: 'sparkles', quantity: '1 colher sopa', text: 'chia/linhaça (opcional)', optional: true }
  ],
  instructions: [
    'Coloque o iogurte em um pote ou tigela.',
    'Adicione as frutas.',
    'Finalize com granola.',
    'Acrescente sementes (opcional) e sirva.'
  ],
  tips: [
    '🫐 Frutas vermelhas deixam mais “premium”.',
    '❄️ Pode usar fruta congelada.',
    '🍯 Se precisar, adoçe com um fio de melado.'
  ],
	
	
    images: {
      hero: 'image/iogurte-vegano-com-granola-e-frutas.webp',
      steps: [ ]
    },
	
	
  macros: { snack: '14% proteína, 52% carboidratos, 31% gorduras', vegan: '100% vegetal' }
},

{
  id: 77,
  name: 'Torrada Integral com Guacamole',
  category: 'Café da Manhã',
  calories: 330,
  protein: 9,
  carbs: 36,
  fats: 18,
  fiber: 11,
  time: 10,
  servings: 1,
  difficulty: 'Fácil',
  featured: false,
  description: 'Torrada integral crocante com guacamole temperado e tomate. Simples e muito gostoso.',
  tags: ['Rápido', 'Gorduras boas', 'Salgado', 'Fibras'],
  benefits: ['Saciedade alta', 'Gorduras boas', 'Ótimo para manhã'],
  allergens: ['Glúten (pão)'],
  
  
image: 'image/torrada-integral-com-guacamole.webp',
  
  
  ingredients: [
    { icon: 'wheat', quantity: '2 fatias', text: 'pão integral' },
    { icon: 'leaf', quantity: '1/2 unidade', text: 'abacate' },
    { icon: 'droplets', quantity: '1/2 unidade', text: 'limão espremido' },
    { icon: 'circle', quantity: 'a gosto', text: 'sal e pimenta' },
    { icon: 'circle-dot', quantity: '6 unidades', text: 'tomates-cereja (opcional)', optional: true }
  ],
  instructions: [
    'Torre o pão até ficar crocante.',
    'Amasse o abacate com limão, sal e pimenta.',
    'Espalhe o guacamole nas torradas.',
    'Finalize com tomates (opcional) e sirva.'
  ],
  tips: [
    '🌶️ Flocos de pimenta dão um toque ótimo.',
    '🥒 Pepino fatiado combina muito.',
    '🍋 Limão evita escurecer.'
  ],
	
	
    images: {
      hero: 'image/torrada-integral-com-guacamole.webp',
      steps: [ ]
    },
	
	
  macros: { breakfast: '11% proteína, 43% carboidratos, 46% gorduras', vegan: '100% vegetal' }
},

{
  id: 78,
  name: 'Salada Morna de Quinoa e Legumes',
  category: 'Almoço/Janta',
  calories: 460,
  protein: 18,
  carbs: 62,
  fats: 14,
  fiber: 12,
  time: 25,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Salada morna com quinoa, legumes salteados e molho de limão. Leve e completa.',
  tags: ['Completa', 'Fibras', 'Marmita', 'Sem glúten'],
  benefits: ['Boa proteína vegetal', 'Ótima para meal prep', 'Leve e nutritiva'],
  allergens: [],
  
  
image: 'image/salada-morna-de-quinoa-e-legumes.webp',
  
  
  ingredients: [
    { icon: 'wheat', quantity: '1 xícara', text: 'quinoa cozida' },
    { icon: 'carrot', quantity: '1/2 unidade', text: 'cenoura em cubos' },
    { icon: 'circle', quantity: '1 xícara', text: 'brócolis' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'abobrinha em cubos' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' },
    { icon: 'droplets', quantity: '1 unidade', text: 'limão (suco)' }
  ],
  instructions: [
    'Cozinhe a quinoa e reserve.',
    'Salteie os legumes no azeite por 5–7 minutos.',
    'Misture quinoa com os legumes.',
    'Tempere com limão, sal e pimenta.',
    'Sirva morna ou fria.'
  ],
  tips: [
    '🌿 Hortelã ou salsinha elevam o sabor.',
    '🥗 Ótima base: dá pra variar legumes sempre.',
    '❄️ Dura 3 dias na geladeira.'
  ],
	
	
    images: {
      hero: 'image/salada-morna-de-quinoa-e-legumes.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '16% proteína, 54% carboidratos, 27% gorduras', vegan: '100% vegetal' }
},

{
  id: 79,
  name: 'Feijoada Vegana Fit',
  category: 'Almoço/Janta',
  calories: 540,
  protein: 22,
  carbs: 78,
  fats: 14,
  fiber: 18,
  time: 40,
  servings: 3,
  difficulty: 'Médio',
  featured: false,
  description: 'Feijoada vegana mais leve com feijão preto, legumes e defumado vegetal. Sabor de domingo, sem pesar.',
  tags: ['Brasileira', 'Conforto', 'Rica em fibras', 'Marmita'],
  benefits: ['Saciedade alta', 'Ótimo custo-benefício', 'Rende bem'],
  allergens: ['Pode conter soja (defumado vegetal)'],
  
  
  image: 'image/feijoada-vegana-fit.webp',
  
  
  ingredients: [
    { icon: 'beans', quantity: '2 xícaras', text: 'feijão preto cozido' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
    { icon: 'carrot', quantity: '1/2 unidade', text: 'cenoura em cubos (opcional)', optional: true },
    { icon: 'leaf', quantity: '1 xícara', text: 'couve fatiada' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'páprica defumada, louro, sal e pimenta' }
  ],
  instructions: [
    'Refogue cebola e alho.',
    'Adicione temperos (louro e páprica) e misture.',
    'Junte o feijão cozido e cozinhe 15–20 minutos para engrossar.',
    'Ajuste sal e pimenta.',
    'Finalize com couve refogada à parte ou misturada no final.',
    'Sirva com arroz e laranja (opcional).'
  ],
  tips: [
    '🔥 Páprica defumada é o segredo do sabor.',
    '🥓 Se usar proteína vegetal defumada, adicione no refogado.',
    '❄️ Congela muito bem em porções.'
  ],
	
	
    images: {
      hero: 'image/feijoada-vegana-fit.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '16% proteína, 58% carboidratos, 24% gorduras', vegan: '100% vegetal' }
},

{
  id: 80,
  name: 'Moqueca Vegana de Banana-da-Terra',
  category: 'Almoço/Janta',
  calories: 510,
  protein: 8,
  carbs: 66,
  fats: 24,
  fiber: 10,
  time: 25,
  servings: 3,
  difficulty: 'Fácil',
  featured: false,
  description: 'Moqueca cremosa com banana-da-terra, pimentões e leite de coco. Sabor marcante e brasileiro.',
  tags: ['Brasileira', 'Sem lactose', 'Saborosa', 'Rápida'],
  benefits: ['Conforto', 'Boa saciedade', 'Ótima para almoço em família'],
  allergens: [],
  
  
image: 'image/moqueca-vegana-de-banana-da-terra.webp',
  
  
  
  ingredients: [
    { icon: 'circle', quantity: '2 unidades', text: 'banana-da-terra em rodelas' },
    { icon: 'circle', quantity: '1 unidade', text: 'tomate em rodelas' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'pimentão fatiado' },
    { icon: 'droplets', quantity: '200ml', text: 'leite de coco' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite de dendê (opcional)', optional: true },
    { icon: 'leaf', quantity: 'a gosto', text: 'coentro (opcional)', optional: true }
  ],
  instructions: [
    'Em uma panela, faça camadas de tomate, pimentão e banana-da-terra.',
    'Tempere com sal e pimenta.',
    'Adicione o leite de coco e (se quiser) o dendê.',
    'Cozinhe tampado por 10–12 minutos em fogo baixo.',
    'Finalize com coentro (opcional) e sirva com arroz.'
  ],
  tips: [
    '🍋 Limão no final realça MUITO.',
    '🌶️ Pimenta dedo-de-moça é opcional.',
    '🍚 Vai muito bem com arroz integral.'
  ],
	
	
    images: {
      hero: 'image/moqueca-vegana-de-banana-da-terra.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '6% proteína, 52% carboidratos, 42% gorduras', vegan: '100% vegetal' }
},

{
  id: 81,
  name: 'Hambúrguer de Grão-de-Bico',
  category: 'Almoço/Janta',
  calories: 430,
  protein: 18,
  carbs: 62,
  fats: 12,
  fiber: 14,
  time: 25,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Hambúrguer vegano firme e saboroso de grão-de-bico. Ótimo para congelar e montar sanduíches.',
  tags: ['Proteico', 'Meal prep', 'Sanduíche', 'Sem lactose'],
  benefits: ['Boa fibra e proteína', 'Congela bem', 'Ótimo custo-benefício'],
  allergens: [],
  
  
  
image: 'image/hamburguer-de-grao-de-bico.webp',
  
  
  
  ingredients: [
    { icon: 'beans', quantity: '1 e 1/2 xícara', text: 'grão-de-bico cozido e amassado' },
    { icon: 'circle', quantity: '1/4 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '1 dente', text: 'alho (opcional)', optional: true },
    { icon: 'wheat', quantity: '3 colheres sopa', text: 'farinha de aveia' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, cominho e páprica' },
    { icon: 'droplets', quantity: '1 colher chá', text: 'azeite (para grelhar)' }
  ],
  instructions: [
    'Amasse o grão-de-bico (deixe alguns pedacinhos).',
    'Misture cebola, temperos e farinha até dar liga.',
    'Modele 2 hambúrgueres.',
    'Grelhe 4–5 min de cada lado em frigideira antiaderente.',
    'Sirva no pão ou com salada.'
  ],
  tips: [
    '❄️ Congele separando com papel manteiga.',
    '🔥 Se a massa estiver mole, adicione mais 1 colher de farinha.',
    '🥗 No prato, fica ótimo com salada e molho de tahine.'
  ],
	
	
    images: {
      hero: 'image/hamburguer-de-grao-de-bico.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '17% proteína, 58% carboidratos, 25% gorduras', vegan: '100% vegetal' }
},

{
  id: 82,
  name: 'Macarrão Integral ao Pesto Vegano',
  category: 'Almoço/Janta',
  calories: 610,
  protein: 18,
  carbs: 78,
  fats: 24,
  fiber: 9,
  time: 20,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Macarrão integral com pesto vegano de manjericão e castanhas. Rápido e com cara de prato gourmet.',
  tags: ['Italiano', 'Rápido', 'Cremoso', 'Sem lactose'],
  benefits: ['Gorduras boas', 'Sabor marcante', 'Boa energia'],
  allergens: ['Glúten', 'Oleaginosas (castanhas)'],
  
  
  
image: 'image/macarrao-integral-ao-pesto-vegano.webp',
  
  
  
  ingredients: [
    { icon: 'circle', quantity: '180g', text: 'macarrão integral' },
    { icon: 'leaf', quantity: '2 xícaras', text: 'manjericão fresco' },
    { icon: 'nut', quantity: '1/3 xícara', text: 'castanhas (caju/pará)' },
    { icon: 'flower-2', quantity: '1 dente', text: 'alho (opcional)', optional: true },
    { icon: 'droplets', quantity: '3 colheres sopa', text: 'azeite' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'limão (suco)' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal e pimenta' }
  ],
  instructions: [
    'Cozinhe o macarrão e reserve um pouco da água do cozimento.',
    'Bata manjericão, castanhas, azeite, limão, sal e pimenta até virar pesto.',
    'Misture o pesto no macarrão.',
    'Ajuste cremosidade com 2–4 colheres da água do cozimento.',
    'Sirva.'
  ],
  tips: [
    '🍅 Tomate-cereja por cima fica perfeito.',
    '🧄 Alho assado deixa mais suave.',
    '❄️ Pesto dura 4–5 dias na geladeira.'
  ],
	
	
    images: {
      hero: 'image/macarrao-integral-ao-pesto-vegano.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '12% proteína, 51% carboidratos, 35% gorduras', vegan: '100% vegetal' }
},

{
  id: 83,
  name: 'Risoto Fit de Cogumelos',
  category: 'Almoço/Janta',
  calories: 520,
  protein: 18,
  carbs: 74,
  fats: 16,
  fiber: 9,
  time: 30,
  servings: 2,
  difficulty: 'Médio',
  featured: false,
  description: 'Risoto cremoso e leve com cogumelos e temperos, com textura de restaurante e preparo simples.',
  tags: ['Cremoso', 'Conforto', 'Sem carne', 'Gourmet'],
  benefits: ['Boa saciedade', 'Sabor marcante', 'Ótimo para ocasiões especiais'],
  allergens: ['Pode conter glúten (dependendo do caldo)'],
  
  
image: 'image/',
  
  
  ingredients: [
    { icon: 'circle', quantity: '1 xícara', text: 'arroz arbóreo (ou arroz comum)' },
    { icon: 'circle', quantity: '200g', text: 'cogumelos (champignon/shiitake)' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
    { icon: 'droplets', quantity: '700ml', text: 'caldo de legumes quente' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e ervas' }
  ],
  instructions: [
    'Refogue cebola e alho no azeite.',
    'Adicione os cogumelos e refogue até dourar.',
    'Junte o arroz e mexa por 1 minuto.',
    'Adicione caldo aos poucos, mexendo até ficar cremoso.',
    'Ajuste sal e pimenta e finalize com ervas.'
  ],
  tips: [
    '🍄 Misture 2 tipos de cogumelos para mais sabor.',
    '🥄 Mexer bastante deixa mais cremoso.',
    '🌿 Salsinha e cebolinha combinam muito.'
  ],
	
	
    images: {
      hero: 'image/',
      steps: [ ]
    },
	
	
  macros: { lunch: '14% proteína, 57% carboidratos, 29% gorduras', vegan: 'Pode ser vegano' }
},

{
  id: 84,
  name: 'Bowl de Lentilha com Vegetais',
  category: 'Almoço/Janta',
  calories: 470,
  protein: 22,
  carbs: 64,
  fats: 12,
  fiber: 16,
  time: 25,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Bowl nutritivo com lentilha, legumes e tempero cítrico. Excelente para marmita e rotina.',
  tags: ['Marmita', 'Proteico', 'Vegano', 'Fibras'],
  benefits: ['Alta saciedade', 'Boa proteína vegetal', 'Ótimo custo-benefício'],
  allergens: [],
  
  
  
image: 'image/bowl-de-lentilha-com-vegetais.webp',
  
  
  
  ingredients: [
    { icon: 'beans', quantity: '1 e 1/2 xícara', text: 'lentilha cozida' },
    { icon: 'carrot', quantity: '1/2 unidade', text: 'cenoura ralada' },
    { icon: 'leaf', quantity: '1 xícara', text: 'folhas (alface/rúcula)' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'tomate picado' },
    { icon: 'droplets', quantity: '1 unidade', text: 'limão (suco)' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e cominho' }
  ],
  instructions: [
    'Misture a lentilha com o tomate e a cenoura.',
    'Tempere com limão, azeite, sal e pimenta.',
    'Monte o bowl com folhas por baixo.',
    'Finalize com a lentilha temperada por cima.',
    'Sirva morno ou frio.'
  ],
  tips: [
    '🌶️ Páprica ou pimenta calabresa dá um toque ótimo.',
    '🥒 Pepino combina muito bem.',
    '❄️ Dura até 3 dias na geladeira.'
  ],
	
	
    images: {
      hero: 'image/bowl-de-lentilha-com-vegetais.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '19% proteína, 55% carboidratos, 23% gorduras', vegan: '100% vegetal' }
},

{
  id: 85,
  name: 'Curry de Grão-de-Bico Fit',
  category: 'Almoço/Janta',
  calories: 560,
  protein: 20,
  carbs: 74,
  fats: 18,
  fiber: 14,
  time: 30,
  servings: 3,
  difficulty: 'Fácil',
  featured: false,
  description: 'Curry cremoso e aromático de grão-de-bico com leite de coco e especiarias.',
  tags: ['Cremoso', 'Temperado', 'Vegano', 'Conforto'],
  benefits: ['Rende bem', 'Sabor intenso', 'Ótimo para marmitas'],
  allergens: [],
  
  
  
image: 'image/curry-de-grao-de-bico.webp',
  
  
  
  ingredients: [
    { icon: 'beans', quantity: '2 xícaras', text: 'grão-de-bico cozido' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
    { icon: 'droplets', quantity: '200ml', text: 'leite de coco' },
    { icon: 'circle', quantity: '1/2 xícara', text: 'molho de tomate' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'curry, cúrcuma, sal e pimenta' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' }
  ],
  instructions: [
    'Refogue cebola e alho no azeite.',
    'Adicione curry e cúrcuma e mexa por 30 segundos.',
    'Junte molho de tomate e leite de coco.',
    'Adicione o grão-de-bico e cozinhe 10–12 minutos.',
    'Ajuste temperos e sirva com arroz.'
  ],
  tips: [
    '🍚 Arroz integral combina demais.',
    '🥦 Pode adicionar brócolis no final.',
    '🌿 Coentro ou cebolinha dão frescor.'
  ],
	
	
    images: {
      hero: 'image/curry-de-grao-de-bico.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '14% proteína, 52% carboidratos, 34% gorduras', vegan: '100% vegetal' }
},

{
  id: 86,
  name: 'Tofu Grelhado com Legumes',
  category: 'Almoço/Janta',
  calories: 440,
  protein: 26,
  carbs: 32,
  fats: 22,
  fiber: 8,
  time: 20,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Tofu bem temperado e grelhado com legumes salteados. Refeição leve e proteica.',
  tags: ['Proteico', 'Leve', 'Sem carne', 'Rápido'],
  benefits: ['Boa proteína', 'Boa saciedade', 'Ótimo para dieta'],
  allergens: ['Soja (tofu)'],
  
  
image: 'image/tofu-grelhado-com-legumes.webp',
  
  
  ingredients: [
    { icon: 'square', quantity: '250g', text: 'tofu firme' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'shoyu (ou sal)', optional: true },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' },
    { icon: 'circle', quantity: '1 xícara', text: 'brócolis' },
    { icon: 'carrot', quantity: '1/2 unidade', text: 'cenoura fatiada' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'abobrinha em tiras' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'pimenta, limão e ervas' }
  ],
  instructions: [
    'Corte o tofu em fatias e tempere.',
    'Grelhe o tofu até dourar dos dois lados.',
    'Salteie os legumes rapidamente no azeite.',
    'Sirva tofu com os legumes.',
    'Finalize com limão e pimenta.'
  ],
  tips: [
    '🔥 Tofu douradinho = fogo médio e paciência.',
    '🍋 Limão no final muda tudo.',
    '🧄 Alho em pó ajuda muito no sabor.'
  ],
	
	
    images: {
      hero: 'image/tofu-grelhado-com-legumes.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '24% proteína, 29% carboidratos, 45% gorduras', vegan: '100% vegetal' }
},

{
  id: 87,
  name: 'Wrap Integral de Falafel Fit',
  category: 'Lanches',
  calories: 480,
  protein: 18,
  carbs: 62,
  fats: 18,
  fiber: 12,
  time: 20,
  servings: 1,
  difficulty: 'Fácil',
  featured: true,
  description: 'Wrap integral recheado com falafel assado, folhas e molho leve. Lanche completo e prático.',
  tags: ['Sanduíche', 'Proteico', 'Fibras', 'Marmita'],
  benefits: ['Completo e equilibrado', 'Boa proteína vegetal', 'Ótimo para levar'],
  allergens: ['Glúten (wrap)', 'Gergelim (se usar tahine)', 'Grão-de-bico'],
  
  
image: 'image/wrap-integral-de-falafel.webp',
  
  
  ingredients: [
    { icon: 'wheat', quantity: '1 unidade', text: 'wrap integral' },
    { icon: 'circle', quantity: '4 unidades', text: 'falafel assado' },
    { icon: 'leaf', quantity: '1 xícara', text: 'folhas verdes' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'tomate em rodelas' },
    { icon: 'droplets', quantity: '2 colheres sopa', text: 'molho (iogurte vegano ou tahine)', optional: true }
  ],
  instructions: [
    'Aqueça o wrap rapidamente.',
    'Coloque folhas e tomate.',
    'Adicione os falafels.',
    'Finalize com molho (opcional).',
    'Enrole e sirva.'
  ],
  tips: [
    '🌯 Enrolar com papel manteiga facilita comer.',
    '🥒 Pepino dá crocância.',
    '🔥 Falafel na airfryer fica perfeito.'
  ],
	
	
    images: {
      hero: 'image/wrap-integral-de-falafel-16-9.png',
      steps: [ ]
    },
	
	
  macros: { snack: '15% proteína, 52% carboidratos, 33% gorduras', vegan: 'Pode ser vegano' }
},

{
  id: 88,
  name: 'Sopa Detox de Abóbora',
  category: 'Almoço/Janta',
  calories: 320,
  protein: 8,
  carbs: 46,
  fats: 12,
  fiber: 9,
  time: 25,
  servings: 3,
  difficulty: 'Fácil',
  featured: false,
  description: 'Sopa cremosa de abóbora com temperos simples e nutritivos. Leve e perfeita para a noite.',
  tags: ['Leve', 'Conforto', 'Sem lactose', 'Rápida'],
  benefits: ['Boa digestão', 'Leve para jantar', 'Ajuda na saciedade'],
  allergens: [],
  
  
image: 'image/sopa-detox-de-abobora.webp',
  
  
  ingredients: [
    { icon: 'circle', quantity: '3 xícaras', text: 'abóbora em cubos' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho' },
    { icon: 'droplets', quantity: '700ml', text: 'água ou caldo de legumes' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e cúrcuma' }
  ],
  instructions: [
    'Refogue cebola e alho no azeite.',
    'Adicione a abóbora e mexa por 2 minutos.',
    'Coloque água/caldo e cozinhe até amaciar.',
    'Bata tudo até ficar cremoso.',
    'Ajuste os temperos e sirva.'
  ],
  tips: [
    '🥥 Um pouco de leite de coco deixa mais cremoso (opcional).',
    '🌶️ Pimenta dá um toque ótimo.',
    '🍞 Combina com torrada integral.'
  ],
	
	
    images: {
      hero: 'image/sopa-detox-de-abobora.webp',
      steps: [ ]
    },
	
	
  macros: { dinner: '10% proteína, 57% carboidratos, 33% gorduras', vegan: '100% vegetal' }
},

{
  id: 89,
  name: 'Salada Caesar Vegana Fit',
  category: 'Almoço/Janta',
  calories: 410,
  protein: 16,
  carbs: 34,
  fats: 22,
  fiber: 10,
  time: 15,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Salada Caesar vegana com molho cremoso e crocante. Leve, gostosa e com cara de restaurante.',
  tags: ['Leve', 'Cremosa', 'Sem carne', 'Rápida'],
  benefits: ['Boa saciedade', 'Ótimo para almoço leve', 'Molho irresistível'],
  allergens: ['Oleaginosas (se usar castanhas)', 'Glúten (croutons)'],
  
  
image: 'image/salada-caesar-vegana.webp',
  
  
  ingredients: [
    { icon: 'leaf', quantity: '1 pé', text: 'alface romana' },
    { icon: 'wheat', quantity: '1/2 xícara', text: 'croutons integrais (opcional)', optional: true },
    { icon: 'droplets', quantity: '2 colheres sopa', text: 'molho caesar vegano' },
    { icon: 'circle', quantity: '1/2 xícara', text: 'grão-de-bico crocante (opcional)', optional: true },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal e pimenta' }
  ],
  instructions: [
    'Lave e rasgue a alface.',
    'Misture o molho caesar vegano.',
    'Adicione croutons (opcional).',
    'Finalize com grão-de-bico crocante (opcional).',
    'Sirva na hora.'
  ],
  tips: [
    '🧄 Molho com alho e limão fica incrível.',
    '🥗 Melhor montar na hora pra não murchar.',
    '🔥 Grão-de-bico na airfryer vira “crouton proteico”.'
  ],
	
	
    images: {
      hero: 'image/salada-caesar-vegana.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '16% proteína, 33% carboidratos, 48% gorduras', vegan: 'Pode ser vegano' }
},

{
  id: 90,
  name: 'Strogonoff Vegano de Cogumelos',
  category: 'Almoço/Janta',
  calories: 540,
  protein: 18,
  carbs: 62,
  fats: 22,
  fiber: 10,
  time: 25,
  servings: 3,
  difficulty: 'Fácil',
  featured: false,
  description: 'Strogonoff cremoso com cogumelos e molho leve. Sabor de comida afetiva sem pesar.',
  tags: ['Cremoso', 'Conforto', 'Marmita', 'Sem carne'],
  benefits: ['Muito sabor', 'Rende bastante', 'Ótimo para congelar'],
  allergens: ['Pode conter soja (creme vegetal)'],
  
  
image: 'image/strogonoff-vegano-de-cogumelos.webp',
  
  
  ingredients: [
    { icon: 'circle', quantity: '300g', text: 'cogumelos fatiados' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
    { icon: 'circle', quantity: '1/2 xícara', text: 'molho de tomate' },
    { icon: 'droplets', quantity: '200ml', text: 'creme vegetal (ou leite de coco leve)' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e páprica' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' }
  ],
  instructions: [
    'Refogue cebola e alho no azeite.',
    'Adicione os cogumelos e doure bem.',
    'Junte molho de tomate e tempere.',
    'Adicione o creme vegetal e cozinhe 5 minutos.',
    'Sirva com arroz e batata palha (opcional).'
  ],
  tips: [
    '🍄 Dourar bem o cogumelo deixa o sabor “carneado”.',
    '🥔 Batata palha fit: assada na airfryer.',
    '❄️ Congela por até 30 dias.'
  ],
	
	
    images: {
      hero: 'image/strogonoff-vegano-de-cogumelos.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '13% proteína, 46% carboidratos, 37% gorduras', vegan: 'Pode ser vegano' }
},

{
  id: 91,
  name: 'Bolinho Assado de Quinoa',
  category: 'Lanches',
  calories: 360,
  protein: 16,
  carbs: 44,
  fats: 12,
  fiber: 8,
  time: 30,
  servings: 2,
  difficulty: 'Fácil',
  featured: false,
  description: 'Bolinho assado de quinoa com temperos e legumes. Ótimo para lanche ou acompanhamento.',
  tags: ['Assado', 'Marmita', 'Sem fritura', 'Proteico'],
  benefits: ['Boa proteína', 'Prático', 'Congela bem'],
  allergens: [],
  
  
image: 'image/bolinho-assado-de-quinoa.webp',
  
  
  
  ingredients: [
    { icon: 'wheat', quantity: '1 xícara', text: 'quinoa cozida' },
    { icon: 'carrot', quantity: '1/2 unidade', text: 'cenoura ralada' },
    { icon: 'circle', quantity: '1/4 unidade', text: 'cebola picada' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'sal, pimenta e ervas' },
    { icon: 'wheat', quantity: '2 colheres sopa', text: 'farinha de aveia (para dar liga)' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' }
  ],
  instructions: [
    'Misture quinoa, cenoura, cebola e temperos.',
    'Adicione farinha até dar ponto de modelar.',
    'Modele bolinhos pequenos.',
    'Asse a 200°C por 18–22 minutos.',
    'Vire na metade do tempo para dourar.'
  ],
  tips: [
    '🔥 Airfryer também funciona muito bem.',
    '🧄 Alho em pó dá um toque ótimo.',
    '❄️ Congele antes de assar e faça depois.'
  ],
	
	
    images: {
      hero: 'image/bolinho-assado-de-quinoa.webp',
      steps: [ ]
    },
	
	
  macros: { snack: '18% proteína, 49% carboidratos, 30% gorduras', vegan: '100% vegetal' }
},

{
  id: 92,
  name: 'Chili Vegano Fit',
  category: 'Almoço/Janta',
  calories: 590,
  protein: 24,
  carbs: 78,
  fats: 18,
  fiber: 18,
  time: 35,
  servings: 3,
  difficulty: 'Fácil',
  featured: false,
  description: 'Chili vegano encorpado com feijão, milho e temperos. Perfeito para marmita e muito saciante.',
  tags: ['Temperado', 'Marmita', 'Rico em fibras', 'Sem carne'],
  benefits: ['Alta saciedade', 'Ótimo para semana', 'Rende bastante'],
  allergens: [],
  
  
image: 'image/chili-vegano.webp',
  
  
  ingredients: [
    { icon: 'beans', quantity: '2 xícaras', text: 'feijão cozido (vermelho/preto)' },
    { icon: 'circle', quantity: '1/2 xícara', text: 'milho' },
    { icon: 'circle', quantity: '1/2 unidade', text: 'cebola picada' },
    { icon: 'flower-2', quantity: '2 dentes', text: 'alho picado' },
    { icon: 'circle', quantity: '1 xícara', text: 'molho de tomate' },
    { icon: 'sparkles', quantity: 'a gosto', text: 'cominho, páprica, pimenta e sal' },
    { icon: 'droplets', quantity: '1 colher sopa', text: 'azeite' }
  ],
  instructions: [
    'Refogue cebola e alho no azeite.',
    'Adicione os temperos e mexa por 30 segundos.',
    'Junte o molho de tomate, feijão e milho.',
    'Cozinhe por 15–20 minutos até encorpar.',
    'Sirva com arroz ou tortilla (opcional).'
  ],
  tips: [
    '🌶️ Ajuste a pimenta ao seu gosto.',
    '🥑 Abacate por cima fica incrível.',
    '❄️ Congela perfeito em porções.'
  ],
	
	
    images: {
      hero: 'image/chili-vegano.webp',
      steps: [ ]
    },
	
	
  macros: { lunch: '16% proteína, 52% carboidratos, 27% gorduras', vegan: '100% vegetal' }
}





];

window.RECIPES = RECIPES;

