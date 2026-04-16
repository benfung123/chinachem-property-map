/**
 * 華懋集團物業地圖應用程序
 * Chinachem Group Property Map Application
 */

// 全局變量
let map;
let markers = [];
let currentFilter = 'all';
let currentLang = localStorage.getItem('preferredLang') || 'zh';

// 多語言翻譯對象
const i18n = {
    zh: {
        site: {
            title: '華懋集團物業地圖',
            subtitle: 'Chinachem Group Property Portfolio'
        },
        stats: {
            total: '總物業數'
        },
        filter: {
            title: '🏷️ 物業類型篩選',
            all: '全部顯示',
            commercial: '商業辦公',
            retail: '零售商場',
            residential: '住宅項目',
            hotel: '酒店服務',
            healthcare: '醫療護理',
            other: '其他設施'
        },
        list: {
            title: '📑 物業列表'
        },
        search: {
            placeholder: '搜尋物業名稱...'
        },
        legend: {
            title: '圖例',
            commercial: '商業辦公',
            retail: '零售商場',
            residential: '住宅項目',
            hotel: '酒店服務',
            healthcare: '醫療護理',
            other: '其他設施'
        },
        popup: {
            type: '類型',
            address: '地址',
            year: '落成年份',
            floors: '層數',
            area: '面積',
            description: '描述'
        },
        footer: {
            text: '© 2026 POC Demo - 華懋集團物業地圖 | Data collected from public sources'
        },
        yearSuffix: '年'
    },
    en: {
        site: {
            title: 'Chinachem Group Property Map',
            subtitle: 'Chinachem Group Property Portfolio'
        },
        stats: {
            total: 'Total Properties'
        },
        filter: {
            title: '🏷️ Filter by Category',
            all: 'Show All',
            commercial: 'Commercial',
            retail: 'Retail',
            residential: 'Residential',
            hotel: 'Hotels',
            healthcare: 'Healthcare',
            other: 'Others'
        },
        list: {
            title: '📑 Property List'
        },
        search: {
            placeholder: 'Search property name...'
        },
        legend: {
            title: 'Legend',
            commercial: 'Commercial',
            retail: 'Retail',
            residential: 'Residential',
            hotel: 'Hotels',
            healthcare: 'Healthcare',
            other: 'Others'
        },
        popup: {
            type: 'Type',
            address: 'Address',
            year: 'Year Completed',
            floors: 'Floors',
            area: 'Area',
            description: 'Description'
        },
        footer: {
            text: '© 2026 POC Demo - Chinachem Group Property Map | Data collected from public sources'
        },
        yearSuffix: ''
    }
};

// 初始化地圖
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initMap();
    initFilters();
    initSearch();
    initLanguageToggle();
    initFilterCollapse();
    renderPropertyList();
    updateTotalCount();
});

// 初始化語言
function initLanguage() {
    applyLanguage(currentLang);
}

// 應用語言
function applyLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang];
    
    // 更新所有帶有 data-i18n 屬性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        if (value) {
            // 保留圖標（emoji）
            const icon = el.querySelector('.icon');
            if (icon) {
                const textSpan = el.querySelector('span:not(.icon)');
                if (textSpan) {
                    textSpan.textContent = value;
                } else {
                    el.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = ' ' + value;
                        }
                    });
                }
            } else {
                el.textContent = value;
            }
        }
    });
    
    // 更新 placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getNestedValue(t, key);
        if (value) {
            el.placeholder = value;
        }
    });
    
    // 更新語言切換按鈕
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const currentSpan = langToggle.querySelector('.lang-current');
        const otherSpan = langToggle.querySelector('.lang-other');
        if (currentSpan && otherSpan) {
            currentSpan.textContent = lang === 'zh' ? '繁' : 'EN';
            otherSpan.textContent = lang === 'zh' ? 'EN' : '繁';
        }
    }
    
    // 更新網頁語言屬性
    document.documentElement.lang = lang === 'zh' ? 'zh-HK' : 'en';
    
    // 重新渲染物業列表以更新類別標籤
    renderPropertyList();
    
    // 更新選中篩選標籤
    updateSelectedFilterBadge();
    
    // 更新所有彈出窗口
    updateAllPopups();
}

// 獲取嵌套對象值
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// 初始化語言切換
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            localStorage.setItem('preferredLang', newLang);
            applyLanguage(newLang);
        });
    }
}

// 初始化篩選區域收起功能
function initFilterCollapse() {
    const collapseBtn = document.getElementById('collapse-filter');
    const filterSection = document.getElementById('filter-section');
    
    if (collapseBtn && filterSection) {
        // Check saved state
        const isCollapsed = localStorage.getItem('filterCollapsed') === 'true';
        if (isCollapsed) {
            filterSection.classList.add('collapsed');
        }
        
        collapseBtn.addEventListener('click', () => {
            filterSection.classList.toggle('collapsed');
            const collapsed = filterSection.classList.contains('collapsed');
            localStorage.setItem('filterCollapsed', collapsed);
        });
    }
}

// 獲取當前語言的類別標籤
function getCategoryLabel(category) {
    // Use categoryConfig from properties-data.js
    const config = categoryConfig[category];
    if (!config) return category;
    return currentLang === 'zh' ? config.label : config.labelEn;
}

// 初始化地圖
function initMap() {
    // 創建地圖，中心點設在香港
    map = L.map('map').setView([22.3193, 114.1694], 11);

    // 添加 OpenStreetMap 圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // 添加物業標記
    addPropertyMarkers();
}

// 添加物業標記
function addPropertyMarkers() {
    properties.forEach(property => {
        const config = categoryConfig[property.category];
        
        // 創建自定義圖標
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: ${config.color};
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            ">${config.icon}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
            popupAnchor: [0, -15]
        });

        // 創建標記
        const marker = L.marker(property.coordinates, { icon: customIcon })
            .addTo(map)
            .bindPopup(createPopupContent(property));

        // 保存標記引用
        property.marker = marker;
        markers.push(marker);
    });
}

// 創建彈出窗口內容
function createPopupContent(property) {
    const t = i18n[currentLang];
    const displayName = currentLang === 'zh' ? property.name : property.nameEn;
    const displayAddress = currentLang === 'zh' ? property.address : property.addressEn;
    
    return `
        <div class="popup-content">
            <div class="popup-header ${property.category}">
                <h3>${displayName}</h3>
            </div>
            <div class="popup-body">
                <div class="info-row">
                    <span class="label">${t.popup.type}</span>
                    <span class="value">${getCategoryLabel(property.category)}</span>
                </div>
                <div class="info-row">
                    <span class="label">${t.popup.address}</span>
                    <span class="value">${displayAddress}</span>
                </div>
                ${property.year ? `
                <div class="info-row">
                    <span class="label">${t.popup.year}</span>
                    <span class="value">${property.year}</span>
                </div>
                ` : ''}
                ${property.floors ? `
                <div class="info-row">
                    <span class="label">${t.popup.floors}</span>
                    <span class="value">${property.floors}${currentLang === 'zh' ? '層' : 'F'}</span>
                </div>
                ` : ''}
                ${property.area ? `
                <div class="info-row">
                    <span class="label">${t.popup.area}</span>
                    <span class="value">${property.area}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="label">${t.popup.description}</span>
                    <span class="value">${property.description}</span>
                </div>
            </div>
        </div>
    `;
}

// 更新所有彈出窗口
function updateAllPopups() {
    properties.forEach(property => {
        if (property.marker) {
            property.marker.setPopupContent(createPopupContent(property));
        }
    });
}

// 初始化篩選功能
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按鈕狀態
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 獲取篩選類別
            currentFilter = this.dataset.category;
            
            // 更新選中標籤顯示
            updateSelectedFilterBadge();
            
            // 更新地圖標記
            filterMarkers();
            
            // 更新列表
            renderPropertyList();
        });
    });
    
    // 初始化選中標籤
    updateSelectedFilterBadge();
}

// 更新選中篩選標籤顯示
function updateSelectedFilterBadge() {
    const badge = document.getElementById('selected-filter-badge');
    if (!badge) return;
    
    if (currentFilter === 'all') {
        badge.textContent = '';
        badge.style.display = 'none';
    } else {
        const config = categoryConfig[currentFilter];
        if (config) {
            const label = currentLang === 'zh' ? config.label : config.labelEn;
            const count = properties.filter(p => p.category === currentFilter).length;
            badge.textContent = config.icon + ' ' + label + ' (' + count + ')';
            badge.style.display = 'inline-block';
            badge.style.backgroundColor = config.color;
        }
    }
}

// 篩選標記
function filterMarkers() {
    properties.forEach(property => {
        const marker = property.marker;
        
        if (currentFilter === 'all' || property.category === currentFilter) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query === '') {
            renderPropertyList();
        } else {
            const filtered = properties.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.nameEn.toLowerCase().includes(query) ||
                p.address.toLowerCase().includes(query) ||
                (p.addressEn && p.addressEn.toLowerCase().includes(query))
            );
            renderPropertyList(filtered);
        }
    });
}

// 渲染物業列表
function renderPropertyList(propertiesToRender = null) {
    const listContainer = document.getElementById('property-list');
    let displayProperties = propertiesToRender || properties;
    const t = i18n[currentLang];
    
    // 如果沒有指定篩選，應用當前篩選
    if (!propertiesToRender && currentFilter !== 'all') {
        displayProperties = properties.filter(p => p.category === currentFilter);
    }
    
    // 清空列表
    listContainer.innerHTML = '';
    
    // 生成列表項
    displayProperties.forEach(property => {
        const displayName = currentLang === 'zh' ? property.name : property.nameEn;
        const displayAddress = currentLang === 'zh' ? property.address : property.addressEn;
        
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
            <div class="name">${displayName}</div>
            <div class="address">${displayAddress}</div>
            <div class="tags">
                <span class="tag ${property.category}">${getCategoryLabel(property.category)}</span>
                ${property.year ? `<span class="tag">${property.year}${t.yearSuffix}</span>` : ''}
            </div>
        `;
        
        // 點擊事件
        item.addEventListener('click', () => {
            // 移除其他活動狀態
            document.querySelectorAll('.property-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // 添加活動狀態
            item.classList.add('active');
            
            // 定位到地圖標記
            map.setView(property.coordinates, 16);
            property.marker.openPopup();
        });
        
        listContainer.appendChild(item);
    });
}

// 更新總數
function updateTotalCount() {
    const totalCount = properties.length;
    document.getElementById('total-count').textContent = totalCount;
}

// 重置地圖視圖
function resetMapView() {
    map.setView([22.3193, 114.1694], 11);
}

// 添加自定義樣式到標記
const style = document.createElement('style');
style.textContent = `
    .custom-marker {
        background: transparent;
        border: none;
    }
`;
document.head.appendChild(style);
