/**
 * 華懋集團物業地圖應用程序
 * Chinachem Group Property Map Application
 */

// 全局變量
let map;
let markers = [];
let currentFilter = 'all';

// 初始化地圖
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    initFilters();
    initSearch();
    renderPropertyList();
    updateTotalCount();
});

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
    const config = categoryConfig[property.category];
    
    return `
        <div class="popup-content">
            <div class="popup-header ${property.category}">
                <h3>${config.icon} ${property.name}</h3>
            </div>
            <div class="popup-body">
                <div class="info-row">
                    <span class="label">類型</span>
                    <span class="value">${config.label}</span>
                </div>
                <div class="info-row">
                    <span class="label">地址</span>
                    <span class="value">${property.address}</span>
                </div>
                ${property.year ? `
                <div class="info-row">
                    <span class="label">落成年份</span>
                    <span class="value">${property.year}</span>
                </div>
                ` : ''}
                ${property.floors ? `
                <div class="info-row">
                    <span class="label">層數</span>
                    <span class="value">${property.floors}層</span>
                </div>
                ` : ''}
                ${property.area ? `
                <div class="info-row">
                    <span class="label">面積</span>
                    <span class="value">${property.area}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="label">描述</span>
                    <span class="value">${property.description}</span>
                </div>
            </div>
        </div>
    `;
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
            
            // 更新地圖標記
            filterMarkers();
            
            // 更新列表
            renderPropertyList();
        });
    });
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
                p.address.toLowerCase().includes(query)
            );
            renderPropertyList(filtered);
        }
    });
}

// 渲染物業列表
function renderPropertyList(propertiesToRender = null) {
    const listContainer = document.getElementById('property-list');
    let displayProperties = propertiesToRender || properties;
    
    // 如果沒有指定篩選，應用當前篩選
    if (!propertiesToRender && currentFilter !== 'all') {
        displayProperties = properties.filter(p => p.category === currentFilter);
    }
    
    // 清空列表
    listContainer.innerHTML = '';
    
    // 生成列表項
    displayProperties.forEach(property => {
        const config = categoryConfig[property.category];
        
        const item = document.createElement('div');
        item.className = 'property-item';
        item.innerHTML = `
            <div class="name">${config.icon} ${property.name}</div>
            <div class="address">${property.address}</div>
            <div class="tags">
                <span class="tag ${property.category}">${config.label}</span>
                ${property.year ? `<span class="tag">${property.year}年</span>` : ''}
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