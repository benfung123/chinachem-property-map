// 華懋集團物業數據
// Chinachem Group Property Data

const properties = [
    // 商業辦公 Commercial
    {
        id: 1,
        name: "如心廣場",
        nameEn: "Nina Tower",
        category: "commercial",
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
        name: "華懋廣場 II期",
        nameEn: "Chinachem Plaza Phase 2",
        category: "commercial",
        address: "荃灣",
        addressEn: "Tsuen Wan",
        coordinates: [22.3680, 114.1160],
        description: "荃灣商業大廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 8,
        name: "華懋禮頓廣場",
        nameEn: "Chinachem Leighton Plaza",
        category: "commercial",
        address: "銅鑼灣禮頓道",
        addressEn: "Leighton Road, Causeway Bay",
        coordinates: [22.2775, 114.1850],
        description: "銅鑼灣商業大廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 9,
        name: "華懋荷李活中心",
        nameEn: "Chinachem Hollywood Centre",
        category: "commercial",
        address: "上環荷李活道",
        addressEn: "Hollywood Road, Sheung Wan",
        coordinates: [22.2850, 114.1510],
        description: "上環商業大廈",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 10,
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
    {
        id: 11,
        name: "華懋荃灣廣場",
        nameEn: "Chinachem Tsuen Wan Plaza",
        category: "commercial",
        address: "荃灣大壩街",
        addressEn: "Tai Pa Street, Tsuen Wan",
        coordinates: [22.3705, 114.1120],
        description: "荃灣商業大廈",
        year: null,
        floors: null,
        area: null
    },

    // 零售商場 Retail
    {
        id: 21,
        name: "如心廣場商場",
        nameEn: "Nina Mall",
        category: "retail",
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
        description: "大型購物商場",
        year: null,
        floors: null,
        area: null
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

    // 住宅項目 Residential
    {
        id: 31,
        name: "瑜一 (In One)",
        nameEn: "In One",
        category: "residential",
        address: "何文田忠孝街",
        addressEn: "Chung Hau Street, Ho Man Tin",
        coordinates: [22.3160, 114.1830],
        description: "何文田豪宅項目",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 32,
        name: "瑜悅",
        nameEn: "Nina's Residence",
        category: "residential",
        address: "荃灣",
        addressEn: "Tsuen Wan",
        coordinates: [22.3710, 114.1150],
        description: "荃灣住宅項目",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 33,
        name: "WHITESAND COVE",
        nameEn: "WHITESAND COVE",
        category: "residential",
        address: "西貢白沙灣",
        addressEn: "Pak Sha Wan, Sai Kung",
        coordinates: [22.3830, 114.2660],
        description: "西貢低密度尊貴住宅，40戶臨海洋房",
        year: null,
        floors: null,
        area: "833-3,162平方呎"
    },
    {
        id: 34,
        name: "東涌牽引配電站住宅發展項目",
        nameEn: "Tung Chung Traction Substation Residential",
        category: "residential",
        address: "東涌新市鎮東部",
        addressEn: "Eastern Tung Chung",
        coordinates: [22.2890, 113.9450],
        description: "香港最大規模MiC住宅發展項目，1,982個單位",
        year: null,
        floors: null,
        area: "1,982個單位"
    },

    // 酒店 Hotels
    {
        id: 41,
        name: "荃灣西如心酒店",
        nameEn: "Nina Hotel Tsuen Wan West",
        category: "hotel",
        address: "荃灣楊屋道8號",
        addressEn: "8 Yeung Uk Road, Tsuen Wan",
        coordinates: [22.3700, 114.1150],
        description: "五星級酒店，1,608間客房",
        year: 2006,
        floors: null,
        area: "1,608間客房"
    },
    {
        id: 42,
        name: "銅鑼灣如心酒店",
        nameEn: "Nina Hotel Causeway Bay",
        category: "hotel",
        address: "銅鑼灣",
        addressEn: "Causeway Bay",
        coordinates: [22.2780, 114.1820],
        description: "如心酒店集團旗下酒店",
        year: null,
        floors: null,
        area: null
    },

    // 醫療護理 Healthcare
    {
        id: 61,
        name: "松齡護老院舍 - 荃灣",
        nameEn: "Pine Care Elderly Home - Tsuen Wan",
        category: "healthcare",
        address: "荃灣",
        addressEn: "Tsuen Wan",
        coordinates: [22.3720, 114.1150],
        description: "松齡護理集團旗下院舍，提供專業長者護理服務",
        year: null,
        floors: null,
        area: null
    },
    {
        id: 62,
        name: "松齡護老院舍 - 深水埗",
        nameEn: "Pine Care Elderly Home - Sham Shui Po",
        category: "healthcare",
        address: "深水埗",
        addressEn: "Sham Shui Po",
        coordinates: [22.3310, 114.1620],
        description: "松齡護理集團旗下院舍，提供專業長者護理服務",
        year: null,
        floors: null,
        area: null
    },

    // 其他 Others
    {
        id: 52,
        name: "如心園",
        nameEn: "Nina Park",
        category: "other",
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

// 导出數據（如果在模塊環境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { properties, categoryConfig };
}
