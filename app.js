/**
 * 華懋集團物業地圖應用程序
 * Chinachem Group Property Map Application
 */

// 全局變量
let map;
let markers = [];
let currentFilter = {
    category: 'all',
    districts: [],
    regions: [],
    yearRange: null,
    availability: 'all'
};
let currentLang = localStorage.getItem('preferredLang') || 'zh';
let categoryChart = null;
let districtChart = null;

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
            placeholder: '搜尋物業名稱或地址...'
        },
        legend: {
            title: '圖例',
            category: '物業類型',
            availability: '可用狀態',
            commercial: '商業辦公',
            retail: '零售商場',
            residential: '住宅項目',
            hotel: '酒店服務',
            healthcare: '醫療護理',
            other: '其他設施',
            statusAvailable: '可租售',
            statusLeased: '已滿租',
            statusComingSoon: '即將到期'
        },
        popup: {
            type: '類型',
            address: '地址',
            year: '落成年份',
            floors: '層數',
            area: '面積',
            description: '描述',
            overview: '概覽',
            details: '詳情',
            nearby: '周邊',
            copyAddress: '複製地址',
            navigate: '導航',
            share: '分享',
            availability: '可用狀態',
            amenities: '設施',
            complex: '同項目物業'
        },
        dashboard: {
            title: '📊 資產儀表板',
            total: '總物業數',
            districts: '覆蓋區域',
            categoryChart: '物業類型分佈',
            districtChart: '地區分佈',
            newest: '最新落成'
        },
        advancedFilter: {
            title: '🔍 進階篩選',
            district: '📍 地區',
            year: '📅 落成年份',
            availability: '✅ 可用狀態',
            category: '🏢 物業類型',
            allRegions: '全部地區',
            newTerritories: '新界',
            kowloon: '九龍',
            hongKongIsland: '港島',
            clearAll: '清除所有篩選',
            all: '全部'
        },
        footer: {
            text: '© 2026 POC Demo - 華懋集團物業地圖 | Data collected from public sources'
        },
        yearSuffix: '年',
        status: {
            available: '可租售',
            leased: '已滿租',
            coming_soon: '即將到期',
            na: '不適用'
        }
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
            placeholder: 'Search property name or address...'
        },
        legend: {
            title: 'Legend',
            category: 'Property Type',
            availability: 'Availability',
            commercial: 'Commercial',
            retail: 'Retail',
            residential: 'Residential',
            hotel: 'Hotels',
            healthcare: 'Healthcare',
            other: 'Others',
            statusAvailable: 'Available',
            statusLeased: 'Leased',
            statusComingSoon: 'Coming Soon'
        },
        popup: {
            type: 'Type',
            address: 'Address',
            year: 'Year',
            floors: 'Floors',
            area: 'Area',
            description: 'Description',
            overview: 'Overview',
            details: 'Details',
            nearby: 'Nearby',
            copyAddress: 'Copy Address',
            navigate: 'Navigate',
            share: 'Share',
            availability: 'Availability',
            amenities: 'Amenities',
            complex: 'Same Complex'
        },
        dashboard: {
            title: '📊 Portfolio Dashboard',
            total: 'Total Properties',
            districts: 'Districts',
            categoryChart: 'Properties by Category',
            districtChart: 'District Distribution',
            newest: 'Newest'
        },
        advancedFilter: {
            title: '🔍 Advanced Filter',
            district: '📍 District',
            year: '📅 Year Completed',
            availability: '✅ Availability',
            category: '🏢 Property Type',
            allRegions: 'All Regions',
            newTerritories: 'New Territories',
            kowloon: 'Kowloon',
            hongKongIsland: 'Hong Kong Island',
            clearAll: 'Clear All Filters',
            all: 'All'
        },
        footer: {
            text: '© 2026 POC Demo - Chinachem Group Property Map | Data collected from public sources'
        },
        yearSuffix: '',
        status: {
            available: 'Available',
            leased: 'Leased',
            coming_soon: 'Coming Soon',
            na: 'N/A'
        }
    }
};

// 初始化地圖
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    initMap();
    initDashboard();
    initAdvancedFilters();
    initSearch();
    initLanguageToggle();
    initDashboardCollapse();
    initAdvancedFilterCollapse();
    renderPropertyList();
    updateTotalCount();
    updateDashboard();
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
                // 處理包含HTML的情況
                if (key.includes('newest') || key.includes('status')) {
                    const span = el.querySelector('span');
                    if (span) {
                        span.textContent = value;
                    } else {
                        el.textContent = value;
                    }
                } else {
                    el.textContent = value;
                }
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
    
    // 更新篩選標籤
    updateActiveFilterBadge();
    
    // 更新所有彈出窗口
    updateAllPopups();
    
    // 重新生成篩選器
    generateAdvancedFilters();
    
    // 更新圖表
    updateDashboard();
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

// 初始化儀表板收起功能
function initDashboardCollapse() {
    const collapseBtn = document.getElementById('collapse-dashboard');
    const dashboardSection = document.getElementById('dashboard-section');
    
    if (collapseBtn && dashboardSection) {
        const isCollapsed = localStorage.getItem('dashboardCollapsed') === 'true';
        if (isCollapsed) {
            dashboardSection.classList.add('collapsed');
        }
        
        collapseBtn.addEventListener('click', () => {
            dashboardSection.classList.toggle('collapsed');
            const collapsed = dashboardSection.classList.contains('collapsed');
            localStorage.setItem('dashboardCollapsed', collapsed);
        });
    }
}

// 初始化進階篩選收起功能
function initAdvancedFilterCollapse() {
    const collapseBtn = document.getElementById('collapse-advanced-filter');
    const filterSection = document.getElementById('advanced-filter-section');
    
    if (collapseBtn && filterSection) {
        const isCollapsed = localStorage.getItem('advancedFilterCollapsed') !== 'false';
        if (isCollapsed) {
            filterSection.classList.add('collapsed');
        }
        
        collapseBtn.addEventListener('click', () => {
            filterSection.classList.toggle('collapsed');
            const collapsed = filterSection.classList.contains('collapsed');
            localStorage.setItem('advancedFilterCollapsed', collapsed);
        });
    }
}

// 獲取當前語言的類別標籤
function getCategoryLabel(category) {
    const config = categoryConfig[category];
    if (!config) return category;
    return currentLang === 'zh' ? config.label : config.labelEn;
}

// 獲取地區標籤
function getDistrictLabel(district) {
    const config = districtConfig[district];
    if (!config) return district;
    return currentLang === 'zh' ? config.label : config.labelEn;
}

// 獲取可用狀態標籤
function getAvailabilityLabel(status) {
    const config = availabilityConfig[status];
    if (!config) return status;
    return currentLang === 'zh' ? config.label : config.labelEn;
}

// 獲取區域標籤
function getRegionLabel(region) {
    const config = regionConfig[region];
    if (!config) return region;
    return currentLang === 'zh' ? config.label : config.labelEn;
}

// 初始化地圖
function initMap() {
    map = L.map('map').setView([22.3193, 114.1694], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    addPropertyMarkers();
}

// 添加物業標記
function addPropertyMarkers() {
    properties.forEach(property => {
        const config = categoryConfig[property.category];
        const availConfig = availabilityConfig[property.availability || 'na'];
        
        // 創建自定義圖標 - 添加狀態邊框
        const hasBorder = property.availability && property.availability !== 'na';
        const borderColor = hasBorder ? availConfig.color : 'white';
        const borderWidth = hasBorder ? '4px' : '3px';
        
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-inner" style="
                background-color: ${config.color};
                border: ${borderWidth} solid ${borderColor};
            ">${config.icon}</div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            popupAnchor: [0, -18]
        });

        const marker = L.marker(property.coordinates, { icon: customIcon })
            .addTo(map)
            .bindPopup(createPopupContent(property), { maxWidth: 320, minWidth: 280 });

        property.marker = marker;
        markers.push(marker);
    });
}

// 創建彈出窗口內容 - 使用分頁界面
function createPopupContent(property) {
    const t = i18n[currentLang];
    const displayName = currentLang === 'zh' ? property.name : property.nameEn;
    const displayAddress = currentLang === 'zh' ? property.address : property.addressEn;
    const config = categoryConfig[property.category];
    const availConfig = availabilityConfig[property.availability || 'na'];
    
    // 獲取同項目其他物業
    let complexPropertiesHtml = '';
    if (property.complex) {
        const complexProps = properties.filter(p => p.complex === property.complex && p.id !== property.id);
        if (complexProps.length > 0) {
            complexPropertiesHtml = `
                <div class="popup-complex">
                    <h4>${t.popup.complex}</h4>
                    <ul>
                        ${complexProps.map(p => {
                            const name = currentLang === 'zh' ? p.name : p.nameEn;
                            return `<li><a href="#" onclick="focusProperty(${p.id}); return false;">${name}</a></li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }
    }
    
    // 設施標籤
    let amenitiesHtml = '';
    if (property.amenities && property.amenities.length > 0) {
        const amenityLabels = {
            'MTR': '🚇 MTR', 'Parking': '🅿️ Parking', 'Pool': '🏊 Pool', 
            'Gym': '💪 Gym', 'Food': '🍽️ Dining', 'Retail': '🛍️ Retail'
        };
        amenitiesHtml = `
            <div class="popup-amenities">
                <h4>${t.popup.amenities}</h4>
                <div class="amenity-tags">
                    ${property.amenities.map(a => `<span class="amenity-tag">${amenityLabels[a] || a}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // 周邊設施
    let nearbyHtml = '';
    if (property.nearby && property.nearby.length > 0) {
        nearbyHtml = `
            <div class="popup-nearby">
                <h4>${t.popup.nearby}</h4>
                <ul>
                    ${property.nearby.map(n => `<li>${n.name} (${n.distance})</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // 詳情標籤內容 - 注意：不包含外層tab-content wrapper，由調用處統一包裹
    const detailsContent = `
        <div class="popup-details">
            ${property.year ? `
            <div class="detail-row">
                <span class="detail-label">${t.popup.year}</span>
                <span class="detail-value">${property.year}${currentLang === 'zh' ? '年' : ''}</span>
            </div>` : ''}
            ${property.floors ? `
            <div class="detail-row">
                <span class="detail-label">${t.popup.floors}</span>
                <span class="detail-value">${property.floors}${currentLang === 'zh' ? '層' : ' floors'}</span>
            </div>` : ''}
            ${property.area ? `
            <div class="detail-row">
                <span class="detail-label">${t.popup.area}</span>
                <span class="detail-value">${property.area}</span>
            </div>` : ''}
            ${property.contact ? `
            <div class="detail-row">
                <span class="detail-label">📞</span>
                <span class="detail-value">${property.contact}</span>
            </div>` : ''}
            ${property.email ? `
            <div class="detail-row">
                <span class="detail-label">✉️</span>
                <span class="detail-value">${property.email}</span>
            </div>` : ''}
            ${amenitiesHtml}
        </div>
    `;
    
    // 周邊標籤內容 - 只返回內容HTML，不包含wrapper
    const nearbyContentHtml = nearbyHtml || '<p class="no-data">-</p>';
    
    return `
        <div class="popup-content tabbed-popup">
            <div class="popup-header" style="background: ${config.color};">
                <h3>${displayName}</h3>
                <div class="popup-status-badge" style="background: ${availConfig.color};">
                    ${getAvailabilityLabel(property.availability || 'na')}
                </div>
            </div>
            <div class="popup-tabs">
                <button class="popup-tab active" onclick="switchTab(${property.id}, 'overview')" id="tab-btn-overview-${property.id}">${t.popup.overview}</button>
                <button class="popup-tab" onclick="switchTab(${property.id}, 'details')" id="tab-btn-details-${property.id}">${t.popup.details}</button>
                <button class="popup-tab" onclick="switchTab(${property.id}, 'nearby')" id="tab-btn-nearby-${property.id}">${t.popup.nearby}</button>
            </div>
            <div class="tab-contents">
                <div class="tab-content active" id="tab-overview-${property.id}">
                    <div class="popup-body">
                        <div class="info-row">
                            <span class="label">${t.popup.type}</span>
                            <span class="value">${getCategoryLabel(property.category)}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">${t.popup.address}</span>
                            <span class="value">${displayAddress}</span>
                        </div>
                        <div class="info-row description">
                            <span class="label">${t.popup.description}</span>
                            <span class="value">${property.description}</span>
                        </div>
                        ${complexPropertiesHtml}
                    </div>
                    <div class="popup-actions">
                        <button class="action-btn" onclick="copyAddress('${displayAddress.replace(/'/g, "\\'")}')">
                            📋 ${t.popup.copyAddress}
                        </button>
                        <button class="action-btn" onclick="navigate(${property.coordinates[0]}, ${property.coordinates[1]})">
                            🗺️ ${t.popup.navigate}
                        </button>
                        <button class="action-btn" onclick="shareProperty(${property.id})">
                            📤 ${t.popup.share}
                        </button>
                    </div>
                </div>
                ${detailsContent}
                <div class="tab-content" id="tab-nearby-${property.id}">
                    ${nearbyHtml || '<p class="no-data">-</p>'}
                </div>
            </div>
        </div>
    `;
}

// 切換分頁
function switchTab(propertyId, tabName) {
    // 隱藏所有分頁內容
    document.querySelectorAll(`#tab-overview-${propertyId}, #tab-details-${propertyId}, #tab-nearby-${propertyId}`).forEach(el => {
        el.classList.remove('active');
    });
    // 移除所有按鈕的active狀態
    document.querySelectorAll(`#tab-btn-overview-${propertyId}, #tab-btn-details-${propertyId}, #tab-btn-nearby-${propertyId}`).forEach(el => {
        el.classList.remove('active');
    });
    // 顯示選中的分頁
    document.getElementById(`tab-${tabName}-${propertyId}`).classList.add('active');
    document.getElementById(`tab-btn-${tabName}-${propertyId}`).classList.add('active');
}

// 聚焦物業
function focusProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (property && property.marker) {
        map.setView(property.coordinates, 16);
        property.marker.openPopup();
    }
}

// 複製地址
function copyAddress(address) {
    navigator.clipboard.writeText(address).then(() => {
        alert(currentLang === 'zh' ? '地址已複製到剪貼簿' : 'Address copied to clipboard');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert(currentLang === 'zh' ? '地址已複製到剪貼簿' : 'Address copied to clipboard');
    });
}

// 導航
function navigate(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// 分享物業
function shareProperty(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    const name = currentLang === 'zh' ? property.name : property.nameEn;
    const address = currentLang === 'zh' ? property.address : property.addressEn;
    const shareText = `${name} - ${address}`;
    
    if (navigator.share) {
        navigator.share({
            title: name,
            text: shareText,
            url: window.location.href
        }).catch(() => {});
    } else {
        copyAddress(shareText);
    }
}

// 更新所有彈出窗口
function updateAllPopups() {
    properties.forEach(property => {
        if (property.marker) {
            property.marker.setPopupContent(createPopupContent(property));
        }
    });
}

// 初始化儀表板
function initDashboard() {
    generateAdvancedFilters();
}

// 更新儀表板數據
function updateDashboard() {
    const filteredProps = getFilteredProperties();
    
    // 基本統計
    document.getElementById('dashboard-total').textContent = filteredProps.length;
    
    const uniqueDistricts = [...new Set(filteredProps.map(p => p.district).filter(Boolean))];
    document.getElementById('dashboard-districts').textContent = uniqueDistricts.length;
    
    // 最新落成
    const propsWithYear = filteredProps.filter(p => p.year);
    if (propsWithYear.length > 0) {
        const newest = propsWithYear.reduce((max, p) => p.year > max.year ? p : max);
        const newestName = currentLang === 'zh' ? newest.name : newest.nameEn;
        document.getElementById('newest-property').textContent = `${newestName} (${newest.year})`;
    } else {
        document.getElementById('newest-property').textContent = '-';
    }
    
    // 更新圖表
    updateCharts(filteredProps);
}

// 更新圖表
function updateCharts(filteredProps) {
    const t = i18n[currentLang];
    
    // 類型分佈數據
    const categoryCounts = {};
    filteredProps.forEach(p => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    
    const categoryData = Object.keys(categoryConfig).map(cat => ({
        label: currentLang === 'zh' ? categoryConfig[cat].label : categoryConfig[cat].labelEn,
        value: categoryCounts[cat] || 0,
        color: categoryConfig[cat].color
    })).filter(d => d.value > 0);
    
    // 地區分佈數據
    const districtCounts = {};
    filteredProps.forEach(p => {
        if (p.district) {
            districtCounts[p.district] = (districtCounts[p.district] || 0) + 1;
        }
    });
    
    const districtData = Object.keys(districtConfig).map(dist => ({
        label: currentLang === 'zh' ? districtConfig[dist].label : districtConfig[dist].labelEn,
        value: districtCounts[dist] || 0
    })).filter(d => d.value > 0).sort((a, b) => b.value - a.value).slice(0, 6);
    
    // 類型柱狀圖
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        if (categoryChart) {
            categoryChart.destroy();
        }
        categoryChart = new Chart(categoryCtx, {
            type: 'bar',
            data: {
                labels: categoryData.map(d => d.label),
                datasets: [{
                    data: categoryData.map(d => d.value),
                    backgroundColor: categoryData.map(d => d.color),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    },
                    x: {
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
    
    // 地區圓餅圖
    const districtCtx = document.getElementById('districtChart');
    if (districtCtx) {
        if (districtChart) {
            districtChart.destroy();
        }
        districtChart = new Chart(districtCtx, {
            type: 'doughnut',
            data: {
                labels: districtData.map(d => d.label),
                datasets: [{
                    data: districtData.map(d => d.value),
                    backgroundColor: [
                        '#3182ce', '#38a169', '#805ad5', '#e53e3e', '#e91e63', '#718096'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            font: { size: 11 }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
}

// 生成進階篩選器
function generateAdvancedFilters() {
    const t = i18n[currentLang];
    
    // 生成地區chips
    const districtChipsContainer = document.getElementById('district-chips');
    if (districtChipsContainer) {
        districtChipsContainer.innerHTML = Object.keys(districtConfig).map(district => `
            <button class="district-chip" data-district="${district}">
                ${currentLang === 'zh' ? districtConfig[district].label : districtConfig[district].labelEn}
            </button>
        `).join('');
    }
    
    // 生成年份chips
    const yearChipsContainer = document.getElementById('year-chips');
    if (yearChipsContainer) {
        yearChipsContainer.innerHTML = yearRanges.map((range, index) => `
            <button class="year-chip" data-year-index="${index}">
                ${currentLang === 'zh' ? range.label : range.labelEn}
            </button>
        `).join('');
    }
    
    // 生成可用狀態chips
    const availabilityChipsContainer = document.getElementById('availability-chips');
    if (availabilityChipsContainer) {
        availabilityChipsContainer.innerHTML = Object.keys(availabilityConfig).map(status => `
            <button class="availability-chip ${status === 'all' ? 'active' : ''}" data-availability="${status}">
                <span class="status-dot" style="background: ${availabilityConfig[status].color};"></span>
                ${currentLang === 'zh' ? availabilityConfig[status].label : availabilityConfig[status].labelEn}
            </button>
        `).join('');
    }
    
    // 生成類別chips
    const categoryChipsContainer = document.getElementById('category-chips');
    if (categoryChipsContainer) {
        categoryChipsContainer.innerHTML = `
            <button class="category-chip active" data-category="all">${t.advancedFilter.all}</button>
        ` + Object.keys(categoryConfig).map(cat => `
            <button class="category-chip" data-category="${cat}">
                <span class="category-icon" style="color: ${categoryConfig[cat].color};">${categoryConfig[cat].icon}</span>
                ${currentLang === 'zh' ? categoryConfig[cat].label : categoryConfig[cat].labelEn}
            </button>
        `).join('');
    }
    
    // 綁定事件
    bindAdvancedFilterEvents();
}

// 綁定進階篩選事件
function bindAdvancedFilterEvents() {
    // 區域篩選
    document.querySelectorAll('.region-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const region = this.dataset.region;
            
            if (region === 'all') {
                currentFilter.regions = [];
                currentFilter.districts = [];
                document.querySelectorAll('.region-chip').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.district-chip').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            } else {
                document.querySelector('.region-chip[data-region="all"]').classList.remove('active');
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    if (!currentFilter.regions.includes(region)) {
                        currentFilter.regions.push(region);
                    }
                } else {
                    currentFilter.regions = currentFilter.regions.filter(r => r !== region);
                }
                
                // 如果沒有選中任何區域，選中"全部"
                if (currentFilter.regions.length === 0) {
                    document.querySelector('.region-chip[data-region="all"]').classList.add('active');
                }
            }
            
            applyFilters();
        });
    });
    
    // 地區篩選
    document.querySelectorAll('.district-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const district = this.dataset.district;
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                if (!currentFilter.districts.includes(district)) {
                    currentFilter.districts.push(district);
                }
            } else {
                currentFilter.districts = currentFilter.districts.filter(d => d !== district);
            }
            
            applyFilters();
        });
    });
    
    // 年份篩選
    document.querySelectorAll('.year-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const yearIndex = parseInt(this.dataset.yearIndex);
            
            document.querySelectorAll('.year-chip').forEach(b => b.classList.remove('active'));
            
            if (currentFilter.yearRange === yearIndex) {
                currentFilter.yearRange = null;
            } else {
                this.classList.add('active');
                currentFilter.yearRange = yearIndex;
            }
            
            applyFilters();
        });
    });
    
    // 可用狀態篩選
    document.querySelectorAll('.availability-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const availability = this.dataset.availability;
            
            document.querySelectorAll('.availability-chip').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter.availability = availability;
            
            applyFilters();
        });
    });
    
    // 類別篩選
    document.querySelectorAll('.category-chip').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            document.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter.category = category;
            
            applyFilters();
        });
    });
    
    // 清除所有篩選
    const clearBtn = document.getElementById('clear-filters-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFilters);
    }
}

// 初始化進階篩選
function initAdvancedFilters() {
    // 已經在generateAdvancedFilters中綁定事件
}

// 清除所有篩選
function clearAllFilters() {
    currentFilter = {
        category: 'all',
        districts: [],
        regions: [],
        yearRange: null,
        availability: 'all'
    };
    
    // 重置UI
    document.querySelectorAll('.region-chip').forEach(b => b.classList.remove('active'));
    document.querySelector('.region-chip[data-region="all"]').classList.add('active');
    document.querySelectorAll('.district-chip').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.year-chip').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.availability-chip').forEach(b => b.classList.remove('active'));
    document.querySelector('.availability-chip[data-availability="all"]').classList.add('active');
    document.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
    document.querySelector('.category-chip[data-category="all"]').classList.add('active');
    
    applyFilters();
}

// 獲取已篩選的物業
function getFilteredProperties() {
    return properties.filter(property => {
        // 類別篩選
        if (currentFilter.category !== 'all' && property.category !== currentFilter.category) {
            return false;
        }
        
        // 地區篩選
        if (currentFilter.districts.length > 0) {
            if (!currentFilter.districts.includes(property.district)) {
                return false;
            }
        }
        
        // 區域篩選
        if (currentFilter.regions.length > 0) {
            const propertyRegion = property.district ? districtConfig[property.district]?.region : null;
            if (!propertyRegion || !currentFilter.regions.includes(propertyRegion)) {
                return false;
            }
        }
        
        // 年份篩選
        if (currentFilter.yearRange !== null) {
            const range = yearRanges[currentFilter.yearRange];
            if (!property.year) return false;
            if (range.min !== null && property.year < range.min) return false;
            if (range.max !== null && property.year > range.max) return false;
        }
        
        // 可用狀態篩選
        if (currentFilter.availability !== 'all') {
            const propAvail = property.availability || 'na';
            if (propAvail !== currentFilter.availability) {
                return false;
            }
        }
        
        return true;
    });
}

// 應用篩選
function applyFilters() {
    const filteredProps = getFilteredProperties();
    
    // 更新地圖標記
    properties.forEach(property => {
        const marker = property.marker;
        const isVisible = filteredProps.includes(property);
        
        if (isVisible) {
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
        } else {
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
    
    // 更新列表
    renderPropertyList(filteredProps);
    
    // 更新儀表板
    updateDashboard();
    
    // 更新篩選標籤
    updateActiveFilterBadge();
}

// 更新活動篩選標籤
function updateActiveFilterBadge() {
    const badge = document.getElementById('active-filter-badge');
    if (!badge) return;
    
    let activeCount = 0;
    if (currentFilter.category !== 'all') activeCount++;
    if (currentFilter.districts.length > 0) activeCount++;
    if (currentFilter.regions.length > 0) activeCount++;
    if (currentFilter.yearRange !== null) activeCount++;
    if (currentFilter.availability !== 'all') activeCount++;
    
    badge.textContent = activeCount;
    badge.style.display = activeCount > 0 ? 'inline-flex' : 'none';
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.toLowerCase().trim();
        
        if (query === '') {
            applyFilters();
            return;
        }
        
        const filtered = properties.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.nameEn.toLowerCase().includes(query) ||
            p.address.toLowerCase().includes(query) ||
            (p.addressEn && p.addressEn.toLowerCase().includes(query))
        );
        
        renderPropertyList(filtered);
        
        // 更新地圖標記
        properties.forEach(property => {
            const marker = property.marker;
            const isVisible = filtered.includes(property);
            
            if (isVisible) {
                if (!map.hasLayer(marker)) {
                    marker.addTo(map);
                }
            } else {
                if (map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            }
        });
    }, 300));
}

// 防抖函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 渲染物業列表
function renderPropertyList(propertiesToRender = null) {
    const listContainer = document.getElementById('property-list');
    const displayProperties = propertiesToRender || properties;
    const t = i18n[currentLang];
    
    listContainer.innerHTML = '';
    
    if (displayProperties.length === 0) {
        listContainer.innerHTML = `<div class="no-results">${currentLang === 'zh' ? '沒有符合條件的物業' : 'No properties match the criteria'}</div>`;
        return;
    }
    
    displayProperties.forEach(property => {
        const displayName = currentLang === 'zh' ? property.name : property.nameEn;
        const displayAddress = currentLang === 'zh' ? property.address : property.addressEn;
        const availConfig = availabilityConfig[property.availability || 'na'];
        
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
            <div class="property-item-header">
                <div class="name">${displayName}</div>
                ${property.availability && property.availability !== 'na' ? `
                <span class="availability-indicator" style="background: ${availConfig.color};" title="${getAvailabilityLabel(property.availability)}"></span>
                ` : ''}
            </div>
            <div class="address">${displayAddress}</div>
            <div class="tags">
                <span class="tag ${property.category}">${getCategoryLabel(property.category)}</span>
                ${property.complex ? `<span class="tag complex">${property.complex}</span>` : ''}
                ${property.year ? `<span class="tag">${property.year}${t.yearSuffix}</span>` : ''}
            </div>
        `;
        
        item.addEventListener('click', () => {
            document.querySelectorAll('.property-item').forEach(el => {
                el.classList.remove('active');
            });
            item.classList.add('active');
            map.setView(property.coordinates, 16);
            property.marker.openPopup();
        });
        
        listContainer.appendChild(item);
    });
}

// 更新總數
function updateTotalCount() {
    const filteredProps = getFilteredProperties();
    document.getElementById('total-count').textContent = filteredProps.length;
}

// 重置地圖視圖
function resetMapView() {
    map.setView([22.3193, 114.1694], 11);
}
