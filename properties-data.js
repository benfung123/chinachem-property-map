// 華懋集團物業數據
// Chinachem Group Property Data

const properties = [
    // 商業辦公 Commercial
    {
        id: 1,
        name: "如心廣場 (商業)",
        nameEn: "Nina Tower (Office)",
        category: "commercial",
        complex: "Nina Tower",
        address: "荃灣楊屋道8號",
        addressEn: "8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3697, 114.1146],
        description: "新界最高建築，88層甲級寫字樓 + 商場 + 酒店",
        year: 2006,
        floors: 88,
        area: "357,000平方呎"
    },
    {
        id: 2,
        name: "華懋中心一期",
        nameEn: "One Chinachem Central",
        category: "commercial",
        address: "中環德輔道中26號",
        addressEn: "26 Des Voeux Road Central, Central",
        coordinates: [22.2831, 114.1565],
        description: "中環甲級商廈，16層，2016年落成",
        year: 2016,
        floors: 16,
        area: "38,000平方呎"
    },
    {
        id: 3,
        name: "華懋中心二期",
        nameEn: "Two Chinachem Central",
        category: "commercial",
        address: "中環德輔道中26號",
        addressEn: "26 Des Voeux Road Central, Central",
        coordinates: [22.2829, 114.1563],
        description: "中環甲級商廈，22層，2017年落成",
        year: 2017,
        floors: 22,
        area: "60,000平方呎"
    },
    {
        id: 4,
        name: "華懋大廈",
        nameEn: "Chinachem Tower",
        category: "commercial",
        address: "中環干諾道中34-37號",
        addressEn: "34-37 Connaught Road Central, Central",
        coordinates: [22.2850, 114.1570],
        description: "中環核心商業區單一業權商廈，鄰近中環港鐵站",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 5,
        name: "華懋世紀廣場",
        nameEn: "Chinachem Century Tower",
        category: "commercial",
        address: "灣仔告士打道178號",
        addressEn: "178 Gloucester Road, Wan Chai",
        coordinates: [22.2785, 114.1725],
        description: "灣仔單一業權商廈，1994年落成，26層辦公樓",
        year: 1994,
        floors: 26,
        area: "93,000平方呎"
    },
    {
        id: 6,
        name: "One Hennessy",
        nameEn: "One Hennessy",
        category: "commercial",
        address: "灣仔軒尼詩道1號",
        addressEn: "1 Hennessy Road, Wan Chai",
        coordinates: [22.2769, 114.1715],
        description: "灣仔甲級商廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 7,
        name: "華懋中心 I期",
        nameEn: "Chinachem Centre Phase 1",
        category: "commercial",
        address: "尖沙咀麼地道",
        addressEn: "Cameron Road, Tsim Sha Tsui",
        coordinates: [22.2995, 114.1735],
        description: "尖沙咀商業中心",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 8,
        name: "華懋中心 II期",
        nameEn: "Chinachem Centre Phase 2",
        category: "commercial",
        address: "尖沙咀麼地道",
        addressEn: "Cameron Road, Tsim Sha Tsui",
        coordinates: [22.2990, 114.1740],
        description: "尖沙咀商業中心二期",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 9,
        name: "華懋金馬倫中心",
        nameEn: "Chinachem Cameron Centre",
        category: "commercial",
        address: "尖沙咀麼地道",
        addressEn: "Cameron Road, Tsim Sha Tsui",
        coordinates: [22.2985, 114.1730],
        description: "尖沙咀商業大廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 10,
        name: "華懋333廣場",
        nameEn: "Chinachem 333 Plaza",
        category: "commercial",
        address: "何文田窩打老道",
        addressEn: "Waterloo Road, Ho Man Tin",
        coordinates: [22.3165, 114.1735],
        description: "何文田商業大廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 11,
        name: "利園八期",
        nameEn: "Lee Garden Eight",
        category: "commercial",
        address: "銅鑼灣加路連山道",
        addressEn: "Caroline Hill Road, Causeway Bay",
        coordinates: [22.2794, 114.1861],
        description: "華懋與希慎興業合作，綠色商業地標，總面積逾100萬平方呎",
        year: 2026,
        floors: null,
        area: "1,000,000+平方呎"
    },

    // 零售商場 Retail
    {
        id: 21,
        name: "如心廣場商場",
        nameEn: "Nina Mall",
        category: "retail",
        complex: "Nina Tower",
        address: "荃灣楊屋道8號",
        addressEn: "8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3695, 114.1140],
        description: "如心廣場基層商場",
        year: 2006,
        floors: 3,
        area: null
    },
    {
        id: 22,
        name: "D·PARK愉景新城",
        nameEn: "D·PARK Discovery Park",
        category: "retail",
        address: "荃灣青山公路",
        addressEn: "Castle Peak Road, Tsuen Wan",
        coordinates: [22.3760, 114.1115],
        description: "大型購物商場，2024年6月收購",
        year: null,
        floors: null,
        area: "630,000平方呎"
    },
    {
        id: 23,
        name: "中環街市",
        nameEn: "Central Market",
        category: "retail",
        address: "中環皇后大道中",
        addressEn: "Queen's Road Central, Central",
        coordinates: [22.2840, 114.1560],
        description: "保育活化項目，飲食購物體驗",
        year: 2021,
        floors: null,
        area: null
    },
    {
        id: 24,
        name: "NINA MALL 1",
        nameEn: "NINA MALL 1",
        category: "retail",
        complex: "Nina Tower",
        address: "荃灣楊屋道8號",
        addressEn: "8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3685, 114.1135],
        description: "如心廣場一期商場，170,000平方呎，55間商舖",
        year: null,
        floors: null,
        area: "170,000平方呎"
    },
    {
        id: 25,
        name: "NINA MALL 2",
        nameEn: "NINA MALL 2",
        category: "retail",
        complex: "Nina Tower",
        address: "荃灣西站",
        addressEn: "Tsuen Wan West",
        coordinates: [22.3710, 114.1160],
        description: "如心廣場二期商場，100,000平方呎，44間商舖",
        year: null,
        floors: null,
        area: "100,000平方呎"
    },

    // 住宅項目 Residential (Currently Available Only)
    {
        id: 31,
        name: "瑜一 (In One)",
        nameEn: "In One",
        category: "residential",
        address: "何文田忠孝街1號",
        addressEn: "1 Chung Hau Street, Ho Man Tin",
        coordinates: [22.3160, 114.1830],
        description: "何文田豪宅項目，現正發售",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 32,
        name: "WHITESAND COVE",
        nameEn: "WHITESAND COVE",
        category: "residential",
        address: "西貢白沙灣162號",
        addressEn: "162 Hiram's Highway, Hebe Haven, Sai Kung",
        coordinates: [22.3830, 114.2660],
        description: "西貢低密度尊貴住宅，40戶臨海洋房，現正發售",
        year: null,
        floors: null,
        area: "833-3,162平方呎"
    },

    // 酒店 Hotels
    {
        id: 41,
        name: "荃灣西如心酒店",
        nameEn: "Nina Hotel Tsuen Wan West",
        category: "hotel",
        complex: "Nina Tower",
        address: "荃灣楊屋道8號",
        addressEn: "8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3700, 114.1150],
        description: "五星級酒店，1,608間客房及套房，新界最高建築。設施包括RÚ中餐廳、Café Circles自助餐廳、室外泳池、健身中心。3,617平方米會議場地（全港最大）。",
        year: 2006,
        floors: 88,
        area: "1,608間客房",
        contact: "+852 2280 2898",
        email: "info.tww@ninahotelgroup.com",
        website: "https://www.ninahotelgroup.com/en/nina-hotel-tsuen-wan-west"
    },
    {
        id: 42,
        name: "銅鑼灣如心酒店",
        nameEn: "Nina Hotel Causeway Bay",
        category: "hotel",
        address: "銅鑼灣英皇道18號",
        addressEn: "18 King's Road, Causeway Bay",
        coordinates: [22.2780, 114.1920],
        description: "37層都會酒店，275間客房，鄰近天后港鐵站。設有室外泳池、健身室、阿翁小館粵菜餐廳、Nina Patisserie。",
        year: null,
        floors: 37,
        area: "275間客房",
        contact: "+852 3968 8388",
        email: "info.cwb@ninahotelgroup.com",
        website: "https://www.ninahotelgroup.com/en/nina-hotel-causeway-bay"
    },
    {
        id: 43,
        name: "如心酒店 · 南灣",
        nameEn: "Nina Hotel Island South",
        category: "hotel",
        address: "香港仔黃竹坑道55號",
        addressEn: "55 Wong Chuk Hang Road, Aberdeen",
        coordinates: [22.2480, 114.1550],
        description: "精品酒店，位於黃竹坑商貿區，鄰近港鐵黃竹坑站",
        year: null,
        floors: null,
        area: null,
        website: "https://www.ninahotelgroup.com/en/nina-hotel-island-south"
    },
    {
        id: 44,
        name: "如心酒店 · 東九龍",
        nameEn: "Nina Hotel Kowloon East",
        category: "hotel",
        address: "九龍灣創業街38號",
        addressEn: "38 Chung Yiu Street, Kowloon Bay",
        coordinates: [22.3190, 114.2140],
        description: "商務酒店，位於九龍東商貿區",
        year: null,
        floors: null,
        area: null,
        website: "https://www.ninahotelgroup.com/en/nina-hotel-kowloon-east"
    },
    {
        id: 45,
        name: "木的地酒店 · 旺角",
        nameEn: "Lodgewood by Nina Mong Kok",
        category: "hotel",
        address: "旺角廣東道1131號",
        addressEn: "1131 Canton Road, Mong Kok",
        coordinates: [22.3160, 114.1700],
        description: "精品服務式住宅，位於旺角核心地帶",
        year: null,
        floors: null,
        area: null,
        website: "https://www.ninahotelgroup.com/en/lodgewood-mong-kok"
    },
    {
        id: 46,
        name: "薈賢居 · 灣仔",
        nameEn: "Lodgewood by Nina Wan Chai",
        category: "hotel",
        address: "灣仔莊士敦道60號",
        addressEn: "60 Johnston Road, Wan Chai",
        coordinates: [22.2760, 114.1750],
        description: "服務式住宅，位於灣仔商業區",
        year: null,
        floors: null,
        area: null,
        website: "https://www.ninahotelgroup.com/en/lodgewood-wan-chai"
    },
    {
        id: 47,
        name: "The Lily",
        nameEn: "The Lily",
        category: "hotel",
        address: "淺水灣道129號",
        addressEn: "129 Repulse Bay Road, Repulse Bay",
        coordinates: [22.2340, 114.1980],
        description: "淺水灣豪華住宅項目，由Nina Hospitality管理",
        year: null,
        floors: null,
        area: null,
        website: "https://www.ninahotelgroup.com/en/the-lily"
    },

    // 醫療護理 Healthcare - 松齡護老集團 (12間院舍)
    {
        id: 61,
        name: "松心薈",
        nameEn: "Pine Residence",
        category: "healthcare",
        address: "銅鑼灣禮頓道1號",
        addressEn: "1 Leighton Road, Causeway Bay",
        coordinates: [22.2775, 114.1850],
        description: "松齡旗艦院舍，尚耆·賢居系列，188床位",
        year: null,
        floors: 3,
        area: "35,000平方呎"
    },
    {
        id: 62,
        name: "松齡康輝護老中心",
        nameEn: "Pine Care Hong Fai Elderly Centre",
        category: "healthcare",
        address: "西灣河筲箕灣道143-145號",
        addressEn: "143-145 Shau Kei Wan Road, Sai Wan Ho",
        coordinates: [22.2820, 114.2200],
        description: "港島區護老院舍",
        year: null,
        floors: 3,
        area: null
    },
    {
        id: 63,
        name: "松暉護老中心",
        nameEn: "Pinecrest Elderly Centre",
        category: "healthcare",
        address: "觀塘通明街36號益利洋樓",
        addressEn: "Elly House, 36 Tung Ming Street, Kwun Tong",
        coordinates: [22.3130, 114.2240],
        description: "觀塘區護老院舍",
        year: null,
        floors: 2,
        area: null
    },
    {
        id: 64,
        name: "新松齡護老中心",
        nameEn: "New Pine Care Centre",
        category: "healthcare",
        address: "觀塘順利邨順利商場2期",
        addressEn: "Shun Lee Shopping Centre Phase 2, Shun Lee Estate, Kwun Tong",
        coordinates: [22.3260, 114.2245],
        description: "順利邨護老院舍",
        year: null,
        floors: 3,
        area: null
    },
    {
        id: 65,
        name: "松齡(利富)護老中心",
        nameEn: "Pine Care (Lee Foo) Elderly Centre",
        category: "healthcare",
        address: "觀塘順利邨利富樓1樓",
        addressEn: "Lee Foo House, Shun Lee Estate, Kwun Tong",
        coordinates: [22.3250, 114.2250],
        description: "順利邨護老院舍",
        year: null,
        floors: 1,
        area: null
    },
    {
        id: 66,
        name: "松齡樂軒",
        nameEn: "Pine Care Point",
        category: "healthcare",
        address: "石硤尾南昌街223-239號名都廣場",
        addressEn: "Maintown Plaza, 223-239 Nam Cheong Street, Shek Kip Mei",
        coordinates: [22.3310, 114.1620],
        description: "認知障礙主題護老院舍",
        year: null,
        floors: 3,
        area: null
    },
    {
        id: 67,
        name: "松齡(萬年)護老中心",
        nameEn: "Pine Care (Manning) Elderly Centre",
        category: "healthcare",
        address: "慈雲山毓華街68-72號貫華里1號",
        addressEn: "1 Koon Wah Lane, 68-72 Yuk Wah Street, Tsz Wan Shan",
        coordinates: [22.3480, 114.2000],
        description: "慈雲山護老院舍",
        year: null,
        floors: 4,
        area: null
    },
    {
        id: 68,
        name: "松齡(德豐)護老中心",
        nameEn: "Pine Care (Tak Fung) Elderly Centre",
        category: "healthcare",
        address: "旺角荔枝角道85-91號德豐大廈",
        addressEn: "Tak Fung Building, 85-91 Lai Chi Kok Road, Mongkok",
        coordinates: [22.3230, 114.1670],
        description: "旺角護老院舍",
        year: null,
        floors: 3,
        area: null
    },
    {
        id: 69,
        name: "松齡雅苑",
        nameEn: "Pine Care Place",
        category: "healthcare",
        address: "元朗朗日路9號形點I",
        addressEn: "Yoho Mall I, 9 Long Yat Road, Yuen Long",
        coordinates: [22.4450, 114.0350],
        description: "尚耆·賢居系列，豪華院舍，68床位，33,000平方呎",
        year: null,
        floors: 4,
        area: "33,000平方呎"
    },
    {
        id: 70,
        name: "松齡(保德)護老中心",
        nameEn: "Pine Care (Po Tak) Elderly Centre",
        category: "healthcare",
        address: "葵涌興芳路180號運芳洋樓",
        addressEn: "Wan Fong Building, 180 Hing Fong Road, Kwai Chung",
        coordinates: [22.3580, 114.1270],
        description: "葵芳護老院舍",
        year: null,
        floors: 2,
        area: null
    },
    {
        id: 71,
        name: "松齡俊景護老中心",
        nameEn: "Pine Care Tsuen Wan",
        category: "healthcare",
        address: "荃灣西樓角路218-220號豪輝商業中心1座",
        addressEn: "Goodview Commercial Building, 218-220 Sai Lau Kok Road, Tsuen Wan",
        coordinates: [22.3720, 114.1150],
        description: "荃灣區護老院舍",
        year: null,
        floors: 2,
        area: null
    },
    {
        id: 72,
        name: "松齡翠軒",
        nameEn: "Pine Care Jade Maison",
        category: "healthcare",
        address: "上水古洞北柏壽路6號福利服務綜合大樓4樓",
        addressEn: "4/F, Welfare Services Complex, 6 Pak Sau Road, Kwu Tung North, Sheung Shui",
        coordinates: [22.5020, 114.1030],
        description: "政府合約院舍，松齡首間政府合約院舍",
        year: null,
        floors: 1,
        area: null
    },

    // 其他 Others
    {
        id: 52,
        name: "如心園",
        nameEn: "Nina Park",
        category: "other",
        complex: "Nina Tower",
        address: "荃灣楊屋道8號旁",
        addressEn: "Next to 8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3685, 114.1135],
        description: "香港唯一木化石公園，佔地約7萬平方呎",
        year: 2023,
        floors: null,
        area: "70,000平方呎"
    }
];

// 類別配置
const categoryConfig = {
    commercial: {
        label: "商業辦公",
        labelEn: "Commercial",
        color: "#3182ce",
        icon: "🏢"
    },
    retail: {
        label: "零售商場",
        labelEn: "Retail",
        color: "#38a169",
        icon: "🛍️"
    },
    residential: {
        label: "住宅項目",
        labelEn: "Residential",
        color: "#e53e3e",
        icon: "🏠"
    },
    hotel: {
        label: "酒店服務",
        labelEn: "Hotel",
        color: "#805ad5",
        icon: "🏨"
    },
    healthcare: {
        label: "醫療護理",
        labelEn: "Healthcare",
        color: "#e91e63",
        icon: "🏥"
    },
    other: {
        label: "其他設施",
        labelEn: "Others",
        color: "#718096",
        icon: "📍"
    }
};

// 導出數據（如果在模塊環境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { properties, categoryConfig };
}