<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ศูนย์รับบริจาคโลหิต โรงพยาบาลเจ้าพระยาอภัยภูเบศร</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Sarabun', sans-serif; -webkit-font-smoothing: antialiased; }
        .tab-active { background-color: #fef2f2; color: #b91c1c; }
        .tab-inactive { color: #6b7280; }
        .tab-inactive:hover { background-color: #f3f4f6; }
        .filter-active { background-color: #dc2626; color: white; border-color: #dc2626; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .filter-inactive { background-color: white; color: #4b5563; border-color: #d1d5db; }
        .filter-inactive:hover { background-color: #fef2f2; color: #dc2626; border-color: #fca5a5; }
        input[type="date"] { cursor: pointer; border: 1px solid #e5e7eb; border-radius: 0.5rem; padding: 0.25rem 0.5rem; outline: none; }
        input[type="date"]:focus { border-color: #fca5a5; box-shadow: 0 0 0 2px #fee2e2; }
    </style>
</head>
<body class="bg-gray-50 text-gray-800 min-h-screen">

    <header class="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i data-lucide="droplet" class="w-8 h-8 text-red-600 fill-current"></i>
                <h1 class="text-xl font-bold text-gray-900 hidden sm:block">ศูนย์รับบริจาคโลหิต โรงพยาบาลเจ้าพระยาอภัยภูเบศร</h1>
                <h1 class="text-xl font-bold text-gray-900 sm:hidden">ศูนย์รับบริจาคโลหิตฯ</h1>
            </div>
            <nav class="flex space-x-2 sm:space-x-4 items-center">
                <button id="btn-tab-dashboard" onclick="switchTab('dashboard')" class="px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-active flex items-center gap-1.5">
                     <span class="hidden md:inline">สถานะคลังเลือดประจำวัน</span>
                </button>
                <button id="btn-tab-analytics" onclick="switchTab('analytics')" class="px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-inactive flex items-center gap-1.5">
                     <span class="hidden md:inline">สถิติ & พยากรณ์</span>
                </button>
                
                <div class="flex items-center gap-2 border-l border-gray-200 pl-2 sm:pl-4 ml-1 sm:ml-2">
                    <button id="btn-autoplay" onclick="toggleAutoPlay()" class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                        <i data-lucide="play" class="w-4 h-4"></i> <span class="hidden lg:inline">เล่นอัตโนมัติ</span>
                    </button>
                    <select id="autoplay-interval" class="text-xs border border-gray-300 rounded-md py-1.5 px-2 text-gray-600 outline-none focus:ring-2 focus:ring-red-100 bg-white cursor-pointer" onchange="updateAutoPlayInterval()">
                        <option value="5000">5 วิ</option>
                        <option value="10000" selected>10 วิ</option>
                        <option value="30000">30 วิ</option>
                    </select>
                </div>
            </nav>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div id="page-dashboard" class="space-y-6 animate-fade-in">
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-6 flex-wrap">
                    <div class="flex items-center gap-3">
                        <span class="font-bold text-gray-700">วันที่:</span>
                        <div class="relative inline-block min-w-[160px] group">
                            <input type="date" id="reportDate" onchange="handleDateChange(this.value)" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                            <div class="flex items-center justify-between bg-white border border-gray-300 group-hover:border-red-400 group-hover:ring-2 group-hover:ring-red-100 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-700 shadow-sm transition-all pointer-events-none">
                                <div class="flex items-center gap-2">
                                    <i data-lucide="calendar" class="w-4 h-4 text-red-500"></i>
                                    <span id="custom-date-display">--</span>
                                </div>
                                <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 ml-2"></i>
                            </div>
                        </div>
                    </div>

                    <div class="hidden md:block h-8 w-px bg-gray-200"></div>

                    <div class="flex items-center gap-3">
                        <span class="font-semibold text-gray-700 hidden sm:inline">กรุ๊ปเลือด:</span>
                        <div class="flex space-x-2" id="filter-container"></div>
                    </div>
                    
                    <div class="hidden sm:block h-8 w-px bg-gray-200"></div>
                    
                    <div class="flex items-center gap-3">
                        <input type="file" id="csvFileInput" multiple class="hidden" onchange="processFiles(event)" accept=".csv" />
                        <button onclick="document.getElementById('csvFileInput').click()" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                            <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                            อัปโหลดข้อมูล <span class="hidden sm:inline">(CSV)</span>
                        </button>
                    </div>
                </div>

                <div class="text-sm text-gray-500 flex items-center gap-2 font-medium w-full sm:w-auto mt-2 sm:mt-0">
                    <span class="relative flex h-2.5 w-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    อัปเดตข้อมูลล่าสุด: <span id="last-update-time">-</span>
                </div>
            </div>

            <div id="upload-alert-container" class="hidden animate-fade-in transition-all"></div>

            <div id="no-data-warning" class="hidden bg-yellow-50 border border-yellow-200 p-6 rounded-xl text-center shadow-sm">
                <i data-lucide="database-zap" class="w-10 h-10 text-yellow-500 mx-auto mb-2"></i>
                <p class="text-yellow-800 font-bold">ไม่พบข้อมูลของวันที่เลือก</p>
                <p class="text-yellow-600 text-sm mt-1">กรุณาอัปโหลดไฟล์ข้อมูล CSV ทั้งหมด เพื่อบันทึกข้อมูลเข้าสู่วันที่ <span id="no-data-date" class="font-semibold"></span></p>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i data-lucide="pie-chart" class="w-5 h-5 text-red-500"></i> ยอดประจำวันรับ-จ่ายโลหิต
                </h3>
                <div id="kpi-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"></div>
            </div>

            <div class="grid grid-cols-1 gap-6">
                <!-- ปริมาณเลือดแดง (แก้ไขชื่อใหม่ LPPRC, LDPPRC อย่างแม่นยำ) -->
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-red-500"></i> ปริมาณเลือดแดง (PRC, LPPRC, LDPPRC)
                    </h3>
                    <div id="rbc-blocks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1"></div>
                </div>

                <!-- ปริมาณเกล็ดเลือด -->
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-yellow-500"></i> ปริมาณเกล็ดเลือด (Platelets)
                    </h3>
                    <div id="plt-blocks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1"></div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="shield-alert" class="w-5 h-5 text-blue-500"></i> ปริมาณหมู่เลือดหายาก (Rh Negative)
                    </h3>
                    <div id="rh-blocks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1"></div>
                </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i data-lucide="clipboard-list" class="w-5 h-5 text-yellow-500"></i> สถิติการรับ-จองเลือด <span id="yesterday-reserve-date">เมื่อวาน</span>
                </h3>
                <div id="yesterday-reserve-container-wrapper" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
            </div>
        </div>

        <div id="page-analytics" class="space-y-6 hidden">
            
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i data-lucide="calendar" class="w-5 h-5 text-gray-500"></i> สถิติการรับ-จ่ายเลือด <span id="yesterday-chart-date">เมื่อวาน</span>
                </h3>
                <div id="yesterday-container-wrapper" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"></div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                <div class="flex flex-wrap gap-4 justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <i data-lucide="info" class="w-6 h-6 text-indigo-600"></i> คำแนะนำการตัดสินใจบริหารคลังเลือด
                    </h3>
                    <button id="btn-send-email" onclick="sendEmailImageAlert()" class="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm">
                        <i data-lucide="image" class="w-4 h-4"></i>
                        ส่งรูปภาพแจ้งเตือนเข้า LINE
                    </button>
                </div>
                <div id="recommendation-container" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
                <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i data-lucide="trending-up" class="w-5 h-5 text-indigo-500"></i> 
                    กราฟแสดงการตัดสินใจ (ภาพรวมปริมาณเลือด รับ-จ่าย-จอง และแนวโน้มย้อนหลัง)
                </h3>
                
                <div class="h-96 w-full relative">
                    <canvas id="forecastChart"></canvas>
                </div>
                <div class="mt-6 text-sm text-gray-600 flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div class="flex items-center gap-1"><span class="inline-block w-4 h-4 bg-indigo-100 border border-indigo-300"></span> พื้นที่แรเงา = สต๊อกคงเหลือรวม</div>
                    <div class="flex items-center gap-1"><span class="inline-block w-4 h-4 bg-green-400"></span> แท่งสีเขียว = ปริมาณรับเข้า</div>
                    <div class="flex items-center gap-1"><span class="inline-block w-4 h-4 bg-red-500"></span> แท่งสีแดง = ปริมาณจ่ายออก</div>
                    <div class="flex items-center gap-1"><span class="inline-block w-4 h-1 bg-yellow-500"></span> เส้นทึบสีเหลือง = การจองเลือด</div>
                </div>
            </div>

        </div>
    </main>

    <script>
        const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwB7TQec1R2GCngCGxs240P2ZviKjq2BGRVtkbhkXh2rqb1mCKLkPKOelEwuGf8IUEqWQ/exec"; 

        let dataStore = {}; 
        let currentStock = [];
        let todayStats = [];
        let yesterdayStats = []; 

        let forecastData = [];

        let activeTab = 'dashboard';
        let filterGroup = 'All';
        const groups = ['All', 'A', 'B', 'O', 'AB'];
        
        let forecastChartInst = null;
        let yesterdayChartsInst = [];
        let yesterdayReserveChartsInst = [];
        let todayChartsInst = []; 

        const thresholdsMap = {
            'A': { PRC: [7, 35, 50], LPPRC: [6, 30, 41], LDPPRC: [2, 7, 9] },
            'B': { PRC: [12, 65, 90], LPPRC: [8, 41, 57], LDPPRC: [2, 7, 9] },
            'O': { PRC: [13, 70, 98], LPPRC: [10, 53, 94], LDPPRC: [2, 7, 9] },
            'AB': { PRC: [4, 18, 26], LPPRC: [4, 18, 26], LDPPRC: [2, 7, 9] }
        };

        let autoPlayTimer = null;
        let isAutoPlaying = false;
        let autoPlayInterval = 10000; 

        // สร้างโครงสร้างข้อมูลเปล่าที่เป็น 0 ทั้งหมดเพื่อรองรับการอัปโหลด
        function initTempStore(store, dateStr) {
            if (!store[dateStr]) {
                const emptyGroups = ['A', 'B', 'O', 'AB'];
                store[dateStr] = {
                    stock: emptyGroups.map(g => ({ group: g, PRC: 0, LPPRC: 0, LDPPRC: 0, PC: 0, LDPPC: 0, SDPPAS: 0, FFP: 0, RhPos: 0, RhNeg: 0 })),
                    stats: emptyGroups.map(g => ({ group: g, receive: 0, issue: 0, reserve: 0 }))
                };
            }
        }

        const getEmptyStock = () => ['A', 'B', 'O', 'AB'].map(g => ({ group: g, PRC: 0, LPPRC: 0, LDPPRC: 0, PC: 0, LDPPC: 0, SDPPAS: 0, FFP: 0, RhPos: 0, RhNeg: 0 }));
        const getEmptyStats = () => ['A', 'B', 'O', 'AB'].map(g => ({ group: g, receive: 0, issue: 0, reserve: 0 }));

        function init() {
            const savedData = localStorage.getItem('bloodBankDataStore');
            if (savedData) {
                try {
                    let loadedData = JSON.parse(savedData);
                    dataStore = loadedData;
                } catch(e) {
                    console.error("Error parsing saved data", e);
                }
            }

            const availableDates = Object.keys(dataStore).sort();
            let initialDate = '';

            if (availableDates.length > 0) {
                initialDate = availableDates[availableDates.length - 1]; 
            } else {
                const today = new Date();
                const yYear = today.getFullYear();
                const yMonth = String(today.getMonth() + 1).padStart(2, '0');
                const yDay = String(today.getDate()).padStart(2, '0');
                initialDate = `${yYear}-${yMonth}-${yDay}`;
            }

            document.getElementById('reportDate').value = initialDate;
            renderFilters();
            handleDateChange(initialDate); 
            lucide.createIcons();
        }

        function showUploadAlert(title, message, type = 'warning') {
            const container = document.getElementById('upload-alert-container');
            let icon = type === 'error' ? 'alert-octagon' : (type === 'success' ? 'check-circle' : 'alert-triangle');
            let bgClass = type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : (type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800');
            let iconColor = type === 'error' ? 'text-red-500' : (type === 'success' ? 'text-green-500' : 'text-yellow-500');

            container.innerHTML = `
                <div class="flex items-start gap-3 p-4 rounded-xl border ${bgClass} shadow-sm relative">
                    <i data-lucide="${icon}" class="w-6 h-6 flex-shrink-0 mt-0.5 ${iconColor}"></i>
                    <div class="pr-6">
                        <h4 class="font-bold text-base">${title}</h4>
                        <p class="text-sm mt-1 opacity-90 leading-relaxed">${message}</p>
                    </div>
                    <button onclick="document.getElementById('upload-alert-container').classList.add('hidden')" class="absolute top-4 right-4 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
            `;
            container.classList.remove('hidden');
            lucide.createIcons();
            
            if (type === 'success') {
                setTimeout(() => { container.classList.add('hidden'); }, 9000); 
            }
        }

        function toggleAutoPlay() {
            isAutoPlaying = !isAutoPlaying;
            const btn = document.getElementById('btn-autoplay');
            if (isAutoPlaying) {
                btn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i> <span class="hidden lg:inline">หยุดเล่น</span>`;
                btn.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
                btn.classList.add('bg-red-100', 'text-red-600', 'hover:bg-red-200');
                startAutoPlay();
            } else {
                btn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> <span class="hidden lg:inline">เล่นอัตโนมัติ</span>`;
                btn.classList.remove('bg-red-100', 'text-red-600', 'hover:bg-red-200');
                btn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
                stopAutoPlay();
            }
            lucide.createIcons();
        }

        function startAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(() => {
                const nextTab = activeTab === 'dashboard' ? 'analytics' : 'dashboard';
                switchTab(nextTab);
            }, autoPlayInterval);
        }

        function stopAutoPlay() {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }

        function updateAutoPlayInterval() {
            autoPlayInterval = parseInt(document.getElementById('autoplay-interval').value);
            if (isAutoPlaying) {
                startAutoPlay();
            }
        }

        function loadDataForDate(dateStr) {
            const d = new Date(dateStr);
            d.setDate(d.getDate() - 1);
            const yYear = d.getFullYear();
            const yMonth = String(d.getMonth() + 1).padStart(2, '0');
            const yDay = String(d.getDate()).padStart(2, '0');
            const yesterdayDateStr = `${yYear}-${yMonth}-${yDay}`;

            if (dataStore[dateStr]) {
                currentStock = JSON.parse(JSON.stringify(dataStore[dateStr].stock));
                todayStats = JSON.parse(JSON.stringify(dataStore[dateStr].stats));
            } else {
                currentStock = getEmptyStock();
                todayStats = getEmptyStats();
            }

            if (dataStore[yesterdayDateStr]) {
                yesterdayStats = JSON.parse(JSON.stringify(dataStore[yesterdayDateStr].stats));
            } else {
                yesterdayStats = getEmptyStats();
            }

            const hasData = (dataStore[dateStr] && (
                            dataStore[dateStr].stock.some(s => s.PRC > 0 || s.RhPos > 0 || s.LPPRC > 0 || s.LDPPRC > 0 || s.PC > 0 || s.LDPPC > 0 || s.SDPPAS > 0 || s.FFP > 0) || 
                            dataStore[dateStr].stats.some(s => s.receive > 0 || s.issue > 0 || s.reserve > 0)
                          ));
                            
            if (hasData) {
                document.getElementById('no-data-warning').classList.add('hidden');
            } else {
                const thaiOptions = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' };
                document.getElementById('no-data-date').innerText = new Date(dateStr).toLocaleDateString('th-TH', thaiOptions);
                document.getElementById('no-data-warning').classList.remove('hidden');
            }
        }

        function handleDateChange(val) {
            const d = new Date(val);
            const thaiOptions = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' };
            const formattedDate = d.toLocaleDateString('th-TH', thaiOptions);
            
            document.getElementById('custom-date-display').innerText = formattedDate;

            const yesterday = new Date(d);
            yesterday.setDate(yesterday.getDate() - 1);
            const formattedYesterday = yesterday.toLocaleDateString('th-TH', thaiOptions);

            const reserveTitle = document.getElementById('yesterday-reserve-date');
            if (reserveTitle) reserveTitle.innerText = `เมื่อวาน (${formattedYesterday})`;
            const chartTitle = document.getElementById('yesterday-chart-date');
            if (chartTitle) chartTitle.innerText = `เมื่อวาน (${formattedYesterday})`;
            
            loadDataForDate(val);
            
            renderDashboard();
            if (activeTab === 'analytics') {
                renderForecastChart();
                renderYesterdayChart();
                renderRecommendations();
            }
        }

        function switchTab(tab) {
            activeTab = tab;
            document.getElementById('page-dashboard').classList.toggle('hidden', tab !== 'dashboard');
            document.getElementById('page-analytics').classList.toggle('hidden', tab !== 'analytics');
            
            const btnDash = document.getElementById('btn-tab-dashboard');
            const btnAnal = document.getElementById('btn-tab-analytics');
            
            if (tab === 'dashboard') {
                btnDash.className = "px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-active flex items-center gap-1.5";
                btnAnal.className = "px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-inactive flex items-center gap-1.5";
                renderDashboard(); 
            } else {
                btnDash.className = "px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-inactive flex items-center gap-1.5";
                btnAnal.className = "px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-active flex items-center gap-1.5";
                renderForecastChart(); 
                renderYesterdayChart(); 
                renderRecommendations();
            }

            if (isAutoPlaying) {
                startAutoPlay();
            }
        }

        function setFilter(group) {
            filterGroup = group;
            renderFilters();
            renderDashboard();
        }

        function getFiltered(dataArr) {
            return filterGroup === 'All' ? dataArr : dataArr.filter(d => d.group === filterGroup);
        }

        function renderFilters() {
            const container = document.getElementById('filter-container');
            container.innerHTML = groups.map(grp => `
                <button onclick="setFilter('${grp}')" 
                        class="px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filterGroup === grp ? 'filter-active' : 'filter-inactive'}">
                    ${grp}
                </button>
            `).join('');
        }

        function renderDashboard() {
            const filteredStats = getFiltered(todayStats);
            const filteredStock = getFiltered(currentStock);

            todayChartsInst.forEach(c => c.destroy());
            todayChartsInst = [];

            document.getElementById('kpi-container').innerHTML = filteredStats.map(stat => `
                <div class="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col items-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-3 border-b border-red-200 pb-2">
                        <span class="text-sm font-bold text-red-800">Group ${stat.group}</span>
                        <i data-lucide="droplet" class="w-4 h-4 text-red-500 opacity-60"></i>
                    </div>
                    <div class="w-24 h-24 mb-4 relative">
                        <canvas id="todayChart-${stat.group}"></canvas>
                    </div>
                    <div class="grid grid-cols-2 gap-2 w-full">
                        <div class="bg-white p-2 rounded-lg border border-red-50 shadow-sm flex flex-col items-center">
                            <span class="text-[10px] font-bold text-green-600">รับ</span>
                            <span class="text-sm font-black text-gray-800">${stat.receive} <span class="text-[8px] font-normal">Unit</span></span>
                        </div>
                        <div class="bg-white p-2 rounded-lg border border-red-50 shadow-sm flex flex-col items-center">
                            <span class="text-[10px] font-bold text-red-500">จ่าย</span>
                            <span class="text-sm font-black text-gray-800">${stat.issue} <span class="text-[8px] font-normal">Unit</span></span>
                        </div>
                    </div>
                </div>
            `).join('');

            filteredStats.forEach(stat => {
                const ctx = document.getElementById(`todayChart-${stat.group}`).getContext('2d');
                todayChartsInst.push(new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['รับเข้า', 'จ่ายออก'],
                        datasets: [{ data: [stat.receive, stat.issue], backgroundColor: ['#4ade80', '#ef4444'], borderWidth: 2, borderColor: '#fff' }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(context) { return ' ' + context.label + ': ' + context.raw + ' Unit'; } } } } }
                }));
            });

            renderYesterdayReserveChart();
            renderRBCBlocks(filteredStock);
            renderPltBlocks(filteredStock);
            renderRhBlocks(filteredStock);
            lucide.createIcons();
        }

        function renderRBCBlocks(data) {
            document.getElementById('rbc-blocks').innerHTML = data.map(d => {
                // 🟢 ใช้ตัวแปร LPPRC และ LDPPRC ที่ถูกต้อง 🟢
                const totalRBC = (d.PRC || 0) + (d.LPPRC || 0) + (d.LDPPRC || 0);
                const t = thresholdsMap[d.group] || thresholdsMap['A'];
                
                const getAlertBar = (amount, thresholds) => {
                    const [t1, t2, t3] = thresholds;
                    const visualMax = t3 * 1.15; 
                    const pct = Math.min((amount / visualMax) * 100, 100);
                    
                    let colorClass = amount < t1 ? 'bg-red-700' : amount < t2 ? 'bg-red-500' : amount <= t3 ? 'bg-blue-500' : 'bg-green-500';
                    let textColorClass = amount < t1 ? 'text-red-800' : amount < t2 ? 'text-red-600' : amount <= t3 ? 'text-blue-600' : 'text-green-600';
                    let statusText = amount < t1 ? 'วิกฤต (ขาด)' : amount < t2 ? 'เสี่ยงขาดเลือด' : amount <= t3 ? 'ปกติ' : 'เลือดเกิน';

                    const p1 = (t1 / visualMax) * 100, p2 = (t2 / visualMax) * 100, p3 = (t3 / visualMax) * 100;

                    return `
                        <div class="w-full px-1 py-1 mt-1">
                            <div class="flex justify-center items-center text-[9px] mb-1.5 h-3">
                                <span class="font-bold ${textColorClass} leading-tight">${statusText}</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2 relative shadow-inner mb-3">
                                <div class="absolute left-0 top-0 h-full bg-red-200 rounded-l-full opacity-80" style="width: ${p1}%"></div>
                                <div class="absolute top-0 h-full bg-red-100 opacity-80" style="left: ${p1}%; width: ${p2 - p1}%"></div>
                                <div class="absolute top-0 h-full bg-blue-100 opacity-80" style="left: ${p2}%; width: ${p3 - p2}%"></div>
                                <div class="absolute top-0 h-full bg-green-100 rounded-r-full opacity-80" style="left: ${p3}%; width: ${100 - p3}%"></div>
                                
                                <div class="${colorClass} h-full rounded-full absolute left-0 top-0 transition-all duration-500" style="width: ${pct}%"></div>
                                
                                <div class="absolute top-0 h-full w-[2px] bg-gray-500 z-10" style="left: ${p1}%;"><span class="absolute top-2.5 -translate-x-1/2 text-[7.5px] text-gray-600 font-bold">${t1}</span></div>
                                <div class="absolute top-0 h-full w-[2px] bg-gray-500 z-10" style="left: ${p2}%;"><span class="absolute top-2.5 -translate-x-1/2 text-[7.5px] text-gray-600 font-bold">${t2}</span></div>
                                <div class="absolute top-0 h-full w-[2px] bg-gray-500 z-10" style="left: ${p3}%;"><span class="absolute top-2.5 -translate-x-1/2 text-[7.5px] text-gray-600 font-bold">${t3}</span></div>
                            </div>
                        </div>
                    `;
                };

                return `
                <div class="bg-red-50 p-4 pb-8 rounded-xl border border-red-200 flex flex-col items-center justify-center text-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-2 border-b border-red-200 pb-2">
                        <span class="text-sm font-bold text-red-800">Group ${d.group}</span>
                        <i data-lucide="droplet" class="w-4 h-4 text-red-500"></i>
                    </div>
                    <div class="grid grid-cols-3 gap-1 w-full">
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-600 mb-0.5">PRC</span><span class="text-lg font-black text-red-700 leading-none">${d.PRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.PRC || 0, t.PRC || [0,0,0])}</div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-700 mb-0.5">LPPRC</span><span class="text-lg font-black text-red-800 leading-none">${d.LPPRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.LPPRC || 0, t.LPPRC || [0,0,0])}</div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-800 mb-0.5">LDPPRC</span><span class="text-lg font-black text-red-900 leading-none">${d.LDPPRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.LDPPRC || 0, t.LDPPRC || [0,0,0])}</div>
                    </div>
                    <div class="absolute bottom-2 right-3 bg-red-100 border border-red-200 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">รวม: ${totalRBC} Unit</div>
                </div>`;
            }).join('');
        }

        // 🟢 แสดงผลข้อมูล Platelets ที่แยก 3 หมวดหมู่อย่างชัดเจน 🟢
        function renderPltBlocks(data) {
            document.getElementById('plt-blocks').innerHTML = data.map(d => `
                <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col items-center justify-center text-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-3 border-b border-amber-200 pb-2"><span class="text-sm font-bold text-amber-800">Group ${d.group}</span><i data-lucide="droplet" class="w-4 h-4 text-amber-500"></i></div>
                    <div class="grid grid-cols-3 gap-1 w-full">
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-amber-100 shadow-sm"><span class="text-[9px] font-bold text-amber-700 mb-0.5 whitespace-nowrap">Platelet Conc.</span><span class="text-lg font-black text-amber-800">${d.PC || 0}</span></div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-amber-100 shadow-sm"><span class="text-[9px] font-bold text-amber-700 mb-0.5">LDPPC</span><span class="text-lg font-black text-amber-800">${d.LDPPC || 0}</span></div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-amber-100 shadow-sm"><span class="text-[9px] font-bold text-amber-700 mb-0.5 whitespace-nowrap">SDP PAS-C</span><span class="text-lg font-black text-amber-800">${d.SDPPAS || 0}</span></div>
                    </div>
                </div>`).join('');
        }

        function renderRhBlocks(data) {
            document.getElementById('rh-blocks').innerHTML = data.map(d => `
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 flex flex-col items-center justify-center text-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-3 border-b border-blue-200 pb-2"><span class="text-sm font-bold text-blue-800">Group ${d.group}</span><i data-lucide="droplet" class="w-4 h-4 text-blue-500"></i></div>
                    <div class="flex justify-center w-full">
                        <div class="flex flex-col items-center bg-white p-4 rounded-lg border border-blue-100 shadow-sm w-full max-w-[200px]">
                            <span class="text-sm font-bold text-blue-700 mb-2">Rh (-)</span>
                            <span class="text-3xl font-black text-blue-800">${d.RhNeg || 0}<span class="text-xs font-normal ml-1">Unit</span></span>
                        </div>
                    </div>
                </div>`).join('');
        }

        function renderYesterdayReserveChart() {
            yesterdayReserveChartsInst.forEach(c => c.destroy());
            yesterdayReserveChartsInst = [];
            const stats = getFiltered(yesterdayStats);
            document.getElementById('yesterday-reserve-container-wrapper').innerHTML = stats.map(stat => `
                <div class="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <div class="w-full flex justify-center items-center mb-3"><span class="text-base font-bold text-gray-800">Group ${stat.group}</span></div>
                    <div class="w-28 h-28 relative mb-4"><canvas id="yesterdayReserveChart-${stat.group}"></canvas></div>
                    <div class="flex w-full justify-around text-sm font-semibold border-t border-gray-200 pt-3">
                        <div class="text-green-600 flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-green-400"></span> รับ: ${stat.receive} Unit</div>
                        <div class="text-yellow-600 flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> จอง: ${stat.reserve} Unit</div>
                    </div>
                </div>`).join('');

            stats.forEach(stat => {
                const ctx = document.getElementById(`yesterdayReserveChart-${stat.group}`).getContext('2d');
                yesterdayReserveChartsInst.push(new Chart(ctx, {
                    type: 'doughnut',
                    data: { labels: ['รับเข้า', 'จองเลือด'], datasets: [{ data: [stat.receive, stat.reserve], backgroundColor: ['#4ade80', '#eab308'], borderWidth: 2, borderColor: '#fff' }] },
                    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(context) { return ' ' + context.label + ': ' + context.raw + ' Unit'; } } } } }
                }));
            });
        }

        function renderYesterdayChart() {
            yesterdayChartsInst.forEach(c => c.destroy());
            yesterdayChartsInst = [];
            const stats = getFiltered(yesterdayStats);
            document.getElementById('yesterday-container-wrapper').innerHTML = stats.map(stat => `
                <div class="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <div class="w-full flex justify-center items-center mb-3"><span class="text-base font-bold text-gray-800">Group ${stat.group}</span></div>
                    <div class="w-28 h-28 relative mb-4"><canvas id="yesterdayChart-${stat.group}"></canvas></div>
                    <div class="flex w-full justify-around text-sm font-semibold border-t border-gray-200 pt-3">
                        <div class="text-green-600 flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-green-400"></span> รับ: ${stat.receive} Unit</div>
                        <div class="text-red-600 flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> จ่าย: ${stat.issue} Unit</div>
                    </div>
                </div>`).join('');

            stats.forEach(stat => {
                const ctx = document.getElementById(`yesterdayChart-${stat.group}`).getContext('2d');
                yesterdayChartsInst.push(new Chart(ctx, {
                    type: 'doughnut',
                    data: { labels: ['รับเข้า', 'จ่ายออก'], datasets: [{ data: [stat.receive, stat.issue], backgroundColor: ['#4ade80', '#ef4444'], borderWidth: 2, borderColor: '#fff' }] },
                    options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(context) { return ' ' + context.label + ': ' + context.raw + ' Unit'; } } } } }
                }));
            });
        }

        function renderRecommendations() {
            const container = document.getElementById('recommendation-container');
            if (!container) return;

            container.innerHTML = currentStock.map(stock => {
                const t = thresholdsMap[stock.group] || thresholdsMap['A'];
                
                const getRecDetails = (amount, thresholds) => {
                    const [t1, t2, t3] = thresholds;
                    const target = Math.ceil(t3 * 1.2); 
                    
                    let needed = amount < target ? Math.ceil(target - amount) : 0;
                    let excess = amount > target ? Math.ceil(amount - target) : 0;

                    if (amount > target) {
                        return { status: 'เลือดเกิน', msg: 'แนะนำชะลอรับบริจาคเพื่อลดความเสี่ยงหมดอายุ', color: 'text-green-700', bg: 'bg-green-100', hexColor: '#15803d', hexBg: '#dcfce7', hexBorder: '#bbf7d0', needed, excess };
                    } else if (amount < t1) {
                        return { status: 'วิกฤต', msg: 'สำรองเหลือไม่เพียงพอสำหรับ 1 วัน ควรประกาศรับบริจาคเพิ่มด่วน', color: 'text-red-700', bg: 'bg-red-100', hexColor: '#b91c1c', hexBg: '#fee2e2', hexBorder: '#fecaca', needed, excess };
                    } else if (amount >= t1 && amount < t2) {
                        return { status: 'เสี่ยงขาด', msg: 'ควรจัดหาเลือดเพิ่มตามแผนสำรอง 7 วัน', color: 'text-orange-600', bg: 'bg-orange-100', hexColor: '#ea580c', hexBg: '#ffedd5', hexBorder: '#fed7aa', needed, excess };
                    } else {
                        let normalMsg = needed > 0 ? 'ปริมาณเพียงพอสำหรับ 5 วัน แต่ควรจัดหาตามแผนสำรอง 7 วัน' : 'ปริมาณเพียงพอสำหรับการสำรองตามแผน 7 วัน';
                        return { status: 'ปกติ', msg: normalMsg, color: 'text-blue-700', bg: 'bg-blue-100', hexColor: '#1d4ed8', hexBg: '#dbeafe', hexBorder: '#bfdbfe', needed, excess };
                    }
                };

                const prcRec = getRecDetails(stock.PRC || 0, t.PRC || [0,0,0]);
                const lpprcRec = getRecDetails(stock.LPPRC || 0, t.LPPRC || [0,0,0]);
                const ldpprcRec = getRecDetails(stock.LDPPRC || 0, t.LDPPRC || [0,0,0]);

                if (prcRec.status !== 'ปกติ' || lpprcRec.status !== 'ปกติ' || ldpprcRec.status !== 'ปกติ') {
                    let cardBg = '#f9fafb', cardBorder = '#e5e7eb';
                    if (prcRec.status==='วิกฤต' || lpprcRec.status==='วิกฤต' || ldpprcRec.status==='วิกฤต') { cardBg = '#fef2f2'; cardBorder = '#fecaca'; }
                    else if (prcRec.status==='เสี่ยงขาด' || lpprcRec.status==='เสี่ยงขาด' || ldpprcRec.status==='เสี่ยงขาด') { cardBg = '#fff7ed'; cardBorder = '#fed7aa'; }
                    else if (prcRec.status==='เลือดเกิน' || lpprcRec.status==='เลือดเกิน' || ldpprcRec.status==='เลือดเกิน') { cardBg = '#f0fdf4'; cardBorder = '#bbf7d0'; }

                    let snapshotHtml = `
                        <div style="background-color: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 12px; padding: 16px;">
                            <h4 style="font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">Group ${stock.group}</h4>
                    `;

                    const addLineHtml = (name, rec) => {
                        let displayAmount = '';
                        if (rec.needed > 0) {
                            displayAmount = `(ต้องการจัดหาเพิ่ม: <span style="color: #dc2626; font-weight: bold;">${rec.needed} Unit</span>)`;
                        } else if (rec.excess > 0) {
                            displayAmount = `(เกินความต้องการ: <span style="color: #16a34a; font-weight: bold;">${rec.excess} Unit</span>)`;
                        } else {
                            displayAmount = `(<span style="color: #2563eb; font-weight: bold;">ไม่ต้องจัดหาเพิ่ม</span>)`;
                        }

                        snapshotHtml += `
                            <div style="margin-top: 8px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <span style="font-size: 14px; font-weight: bold; color: #1f2937;">${name} <span style="font-weight: normal; color: #6b7280; font-size: 13px;">${displayAmount}</span></span>
                                    <span style="font-size: 12px; font-weight: bold; background-color: ${rec.bg}; color: ${rec.color}; border: 1px solid ${rec.hexBorder}; padding: 2px 8px; border-radius: 9999px;">${rec.status}</span>
                                </div>
                                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.4;">${rec.msg}</p>
                            </div>
                        `;
                    };

                    addLineHtml('PRC', prcRec);
                    addLineHtml('LPPRC', lpprcRec);
                    addLineHtml('LDPPRC', ldpprcRec);

                    snapshotHtml += `</div>`;
                    return snapshotHtml;
                }
                return '';
            }).join('');

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function renderForecastChart() {
            if(forecastChartInst) forecastChartInst.destroy();
            
            const sortedDates = Object.keys(dataStore).sort();
            let labels = [], stockData = [], receiveData = [], issueData = [], requestData = [];

            sortedDates.forEach(d => {
                let [y, m, day] = d.split('-'); 
                labels.push(`${day}/${m}`);
                
                let ds = dataStore[d];
                stockData.push(ds.stock.reduce((sum, item) => sum + item.PRC + item.LPPRC + item.LDPPRC, 0));
                receiveData.push(ds.stats.reduce((sum, item) => sum + item.receive, 0));
                issueData.push(ds.stats.reduce((sum, item) => sum + item.issue, 0));
                requestData.push(ds.stats.reduce((sum, item) => sum + item.reserve, 0));
            });

            if (labels.length === 0) {
                labels = ['ไม่มีข้อมูล'];
                stockData = [0]; receiveData = [0]; issueData = [0]; requestData = [0];
            }

            forecastChartInst = new Chart(document.getElementById('forecastChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        { type: 'line', label: 'ยอดจองเลือด', data: requestData, borderColor: '#eab308', borderWidth: 3, yAxisID: 'y' },
                        { type: 'bar', label: 'ปริมาณรับเข้า', data: receiveData, backgroundColor: '#4ade80', yAxisID: 'y' },
                        { type: 'bar', label: 'ปริมาณจ่ายออก', data: issueData, backgroundColor: '#ef4444', yAxisID: 'y' },
                        { type: 'line', label: 'ปริมาณคลังรวม', data: stockData, borderColor: '#818cf8', backgroundColor: 'rgba(224, 231, 255, 0.4)', borderWidth: 2, fill: true, pointRadius: 4, yAxisID: 'y_stock' }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false } },
                        y: { type: 'linear', position: 'left', title: { display: true, text: 'รับ / จ่าย / จอง (Unit)' }, beginAtZero: true },
                        y_stock: { type: 'linear', position: 'right', title: { display: true, text: 'ปริมาณคลังรวม (Unit)' }, suggestedMin: 0, grid: { drawOnChartArea: false } }
                    }
                }
            });
        }

        function sendEmailImageAlert(isAutoTrigger = false) {
            const dateStr = document.getElementById('custom-date-display').innerText;
            let hasIssue = false;

            currentStock.forEach(stock => {
                const t = thresholdsMap[stock.group] || thresholdsMap['A'];
                const getRecDetails = (amount, thresholds) => {
                    const [t1, t2, t3] = thresholds;
                    const maxStock = Math.ceil(t3 * 1.2); 
                    if (amount > maxStock || amount < t1 || (amount >= t1 && amount < t2)) return true;
                    return false;
                };
                if (getRecDetails(stock.PRC||0, t.PRC) || getRecDetails(stock.LPPRC||0, t.LPPRC) || getRecDetails(stock.LDPPRC||0, t.LDPPRC)) {
                    hasIssue = true;
                }
            });

            if (!hasIssue) {
                if (!isAutoTrigger) showUploadAlert('สถานะปกติ', '✅ สถานะคลังเลือดปกติ ไม่มีรายการขาดแคลนหรือเกินที่ต้องแจ้งเตือน', 'success');
                return;
            }

            const btn = document.getElementById('btn-send-email');
            if(btn && !isAutoTrigger) {
                btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> กำลังสร้างรูปภาพ...`;
                btn.disabled = true;
                lucide.createIcons();
            }

            let snapshotHtml = `
                <div style="background: white; padding: 32px; width: 800px; font-family: 'Sarabun', sans-serif; color: #1f2937;">
                    <div style="border-bottom: 2px solid #ef4444; padding-bottom: 12px; margin-bottom: 24px;">
                        <h2 style="font-size: 24px; font-weight: bold; margin: 0; color: #b91c1c;">🚨 สรุปสถานะคลังเลือดที่ต้องตัดสินใจบริหารจัดการ</h2>
                        <p style="color: #6b7280; font-size: 16px; margin: 4px 0 0 0;">ประจำวันที่: ${dateStr}</p>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            `;

            currentStock.forEach(stock => {
                const t = thresholdsMap[stock.group] || thresholdsMap['A'];
                
                const getRecDetails = (amount, thresholds) => {
                    const [t1, t2, t3] = thresholds;
                    const target = Math.ceil(t3 * 1.2); 
                    
                    let needed = amount < target ? Math.ceil(target - amount) : 0;
                    let excess = amount > target ? Math.ceil(amount - target) : 0;

                    if (amount > target) {
                        return { status: 'เลือดเกิน', msg: 'แนะนำชะลอรับบริจาคเพื่อลดความเสี่ยงหมดอายุ', hexColor: '#15803d', hexBg: '#dcfce7', hexBorder: '#bbf7d0', needed, excess };
                    } else if (amount < t1) {
                        return { status: 'วิกฤต', msg: 'สำรองเหลือไม่เพียงพอสำหรับ 1 วัน ควรประกาศรับบริจาคเพิ่มด่วน', hexColor: '#b91c1c', hexBg: '#fee2e2', hexBorder: '#fecaca', needed, excess };
                    } else if (amount >= t1 && amount < t2) {
                        return { status: 'เสี่ยงขาด', msg: 'ควรจัดหาเลือดเพิ่มตามแผนสำรอง 7 วัน', hexColor: '#ea580c', hexBg: '#ffedd5', hexBorder: '#fed7aa', needed, excess };
                    } else {
                        let normalMsg = needed > 0 ? 'ปริมาณเพียงพอสำหรับ 5 วัน แต่ควรจัดหาตามแผนสำรอง 7 วัน' : 'ปริมาณเพียงพอสำหรับการสำรองตามแผน 7 วัน';
                        return { status: 'ปกติ', msg: normalMsg, hexColor: '#1d4ed8', hexBg: '#dbeafe', hexBorder: '#bfdbfe', needed, excess };
                    }
                };

                const prcRec = getRecDetails(stock.PRC || 0, t.PRC || [0,0,0]);
                const lpprcRec = getRecDetails(stock.LPPRC || 0, t.LPPRC || [0,0,0]);
                const ldpprcRec = getRecDetails(stock.LDPPRC || 0, t.LDPPRC || [0,0,0]);

                if (prcRec.status !== 'ปกติ' || lpprcRec.status !== 'ปกติ' || ldpprcRec.status !== 'ปกติ') {
                    let cardBg = '#f9fafb', cardBorder = '#e5e7eb';
                    if (prcRec.status==='วิกฤต' || lpprcRec.status==='วิกฤต' || ldpprcRec.status==='วิกฤต') { cardBg = '#fef2f2'; cardBorder = '#fecaca'; }
                    else if (prcRec.status==='เสี่ยงขาด' || lpprcRec.status==='เสี่ยงขาด' || ldpprcRec.status==='เสี่ยงขาด') { cardBg = '#fff7ed'; cardBorder = '#fed7aa'; }
                    else if (prcRec.status==='เลือดเกิน' || lpprcRec.status==='เลือดเกิน' || ldpprcRec.status==='เลือดเกิน') { cardBg = '#f0fdf4'; cardBorder = '#bbf7d0'; }

                    snapshotHtml += `
                        <div style="background-color: ${cardBg}; border: 1px solid ${cardBorder}; border-radius: 12px; padding: 16px;">
                            <h4 style="font-size: 18px; font-weight: bold; margin: 0 0 12px 0;">Group ${stock.group}</h4>
                    `;

                    const addLineHtml = (name, rec) => {
                        let displayAmount = '';
                        if (rec.needed > 0) {
                            displayAmount = `(ต้องการจัดหาเพิ่ม: <span style="color: #dc2626; font-weight: bold;">${rec.needed} Unit</span>)`;
                        } else if (rec.excess > 0) {
                            displayAmount = `(เกินความต้องการ: <span style="color: #16a34a; font-weight: bold;">${rec.excess} Unit</span>)`;
                        } else {
                            displayAmount = `(<span style="color: #2563eb; font-weight: bold;">ไม่ต้องจัดหาเพิ่ม</span>)`;
                        }

                        snapshotHtml += `
                            <div style="margin-top: 8px; border-top: 1px solid rgba(0,0,0,0.05); padding-top: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                    <span style="font-size: 14px; font-weight: bold; color: #1f2937;">${name} <span style="font-weight: normal; color: #6b7280; font-size: 13px;">${displayAmount}</span></span>
                                    <span style="font-size: 12px; font-weight: bold; background-color: ${rec.bg}; color: ${rec.color}; border: 1px solid ${rec.hexBorder}; padding: 2px 8px; border-radius: 9999px;">${rec.status}</span>
                                </div>
                                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.4;">${rec.msg}</p>
                            </div>
                        `;
                    };

                    addLineHtml('PRC', prcRec);
                    addLineHtml('LPPRC', lpprcRec);
                    addLineHtml('LDPPRC', ldpprcRec);

                    snapshotHtml += `</div>`;
                }
            });

            snapshotHtml += `</div></div>`;

            const offscreen = document.createElement('div');
            offscreen.style.position = 'absolute';
            offscreen.style.left = '-9999px';
            offscreen.innerHTML = snapshotHtml;
            document.body.appendChild(offscreen);

            html2canvas(offscreen.firstElementChild, { scale: 1.5 }).then(canvas => {
                document.body.removeChild(offscreen);
                const base64Image = canvas.toDataURL('image/jpeg', 0.85);

                if(btn && !isAutoTrigger) {
                    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> กำลังส่งเข้า LINE...`;
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                }

                const lineMessage = `🚨 แจ้งเตือนสถานะคลังเลือดเสี่ยงขาด/เกิน\nประจำวันที่ ${dateStr}\nโปรดตรวจสอบตารางสรุปที่แนบมาครับ`;

                if (WEBHOOK_URL && WEBHOOK_URL.trim() !== "") {
                    fetch(WEBHOOK_URL, {
                        method: 'POST',
                        mode: 'no-cors', 
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({
                            action: 'send_line',
                            message: lineMessage,
                            imageBase64: base64Image
                        })
                    })
                    .then(() => {
                        if(!isAutoTrigger && btn) {
                            btn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> แจ้งเตือน LINE สำเร็จ!`;
                            btn.classList.replace('bg-blue-50', 'bg-emerald-50');
                            btn.classList.replace('text-blue-700', 'text-emerald-700');
                            btn.classList.replace('border-blue-200', 'border-emerald-200');
                            if (typeof lucide !== 'undefined') lucide.createIcons();
                            setTimeout(() => {
                                btn.innerHTML = `<i data-lucide="image" class="w-4 h-4"></i> ส่งรูปภาพแจ้งเตือนเข้า LINE`;
                                btn.disabled = false;
                                btn.classList.replace('bg-emerald-50', 'bg-blue-50');
                                btn.classList.replace('text-emerald-700', 'text-blue-700');
                                btn.classList.replace('border-emerald-200', 'border-blue-200');
                                if (typeof lucide !== 'undefined') lucide.createIcons();
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.error('Line Error:', error);
                        if(!isAutoTrigger && btn) { 
                            btn.innerHTML = `<i data-lucide="image" class="w-4 h-4"></i> ส่งรูปภาพแจ้งเตือนเข้า LINE`; 
                            btn.disabled = false; 
                            if (typeof lucide !== 'undefined') lucide.createIcons(); 
                        }
                    });
                }
            });
        }

        // --- 🟢 ฟังก์ชันคัดแยกหมวดหมู่หมู่เลือด 🟢 ---
        function getBloodGroup(str) {
            if (!str) return '';
            let bgStr = String(str).toUpperCase();
            if(/\bAB\b/.test(bgStr) || bgStr.includes('AB+') || bgStr.includes('AB-') || bgStr.includes('GROUP AB')) return 'AB';
            if(/\bA\b/.test(bgStr) || bgStr.includes('A+') || bgStr.includes('A-') || bgStr.includes('GROUP A')) return 'A';
            if(/\bB\b/.test(bgStr) || bgStr.includes('B+') || bgStr.includes('B-') || bgStr.includes('GROUP B')) return 'B';
            if(/\bO\b/.test(bgStr) || bgStr.includes('O+') || bgStr.includes('O-') || bgStr.includes('GROUP O')) return 'O';
            return '';
        }

        // --- 🟢 ฟังก์ชันคัดแยกหมวดหมู่ผลิตภัณฑ์ (Product Type) แม่นยำ 100% 🟢 ---
        function getProductType(rawStr) {
            if (!rawStr) return '';
            
            // ลบช่องว่างและอักขระพิเศษออกทั้งหมดให้เหลือแต่ตัวหนังสือล้วนๆ เพื่อการค้นหาที่แม่นยำ 100%
            let s = String(rawStr).toLowerCase().replace(/[^a-z0-9]/gi, ''); 

            // 1. เกล็ดเลือด (Platelets) 
            if (s === 'leukocytedepletedpooledplateletconcentrate' || s === 'ldppc') {
                return 'LDPPC';
            }
            if (s.includes('singledonorplatelet') && s.includes('pas')) { // ครอบคลุม Single Donor Platelets PAS-C
                return 'SDPPAS';
            }
            if (s === 'plateletconcentrate' || s === 'pc') {
                return 'PC';
            }
            
            // 2. เลือดแดง (Red Blood Cells)
            if (s === 'leukocytedepletedprc' || s === 'ldpprc') {
                return 'LDPPRC';
            }
            if (s === 'leukocytepoorprc' || s === 'lpprc') {
                return 'LPPRC';
            }
            if (s === 'packedredcell' || s === 'prc') {
                return 'PRC';
            }
            
            // 3. พลาสมา
            if (s === 'freshfrozenplasma' || s === 'ffp') {
                return 'FFP';
            }
            
            if (s === 'rhnegative') {
                return 'RHNEG';
            }

            return '';
        }

        function extractDateFromFilename(filename) {
            const regex = /(\d{1,2})[\.\-\/](\d{1,2})[\.\-\/](\d{2,4})/g;
            let match, lastMatch = null;
            while ((match = regex.exec(filename)) !== null) lastMatch = match;
            if (lastMatch) {
                let day = lastMatch[1].padStart(2, '0');
                let month = lastMatch[2].padStart(2, '0');
                let year = parseInt(lastMatch[3]);
                if (year < 100) year += 2500; 
                if (year > 2400) year -= 543; 
                return `${year}-${month}-${day}`;
            }
            return null;
        }

        function extractDateFromText(text) {
            const regex = /(?:ระหว่างวันที่|ตั้งแต่วันที่|วันที่)\s*(\d{1,2})[\s\-\/\.]+([A-Za-z]+|ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.|\d{1,2})[\s\-\/\.]+(\d{2,4})/;
            const match = text.match(regex);
            if (match) {
                let day = match[1].padStart(2, '0');
                let monthStr = match[2];
                let year = parseInt(match[3]);
                const monthMap = {
                    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
                    'ม.ค.': '01', 'ก.พ.': '02', 'มี.ค.': '03', 'เม.ย.': '04', 'พ.ค.': '05', 'มิ.ย.': '06', 'ก.ค.': '07', 'ส.ค.': '08', 'ก.ย.': '09', 'ต.ค.': '10', 'พ.ย.': '11', 'ธ.ค.': '12'
                };
                let month = monthMap[monthStr] || (monthStr.match(/^\d{1,2}$/) ? monthStr.padStart(2, '0') : '01');
                if (year < 100) year += 2500;
                if (year > 2400) year -= 543;
                return `${year}-${month}-${day}`;
            }
            return null;
        }

        function processFiles(event) {
            const files = Array.from(event.target.files);
            if (!files.length) return;

            const invalidFiles = files.filter(f => !f.name.toLowerCase().endsWith('.csv'));
            if (invalidFiles.length > 0) {
                const invalidNames = invalidFiles.map(f => f.name).join(', ');
                showUploadAlert('อัปโหลดล้มเหลว: พบไฟล์ผิดประเภท', `ระบบรองรับเฉพาะไฟล์นามสกุล .csv เท่านั้น (ตรวจพบ: ${invalidNames}) กรุณาตรวจสอบไฟล์อีกครั้ง`, 'error');
                event.target.value = ''; 
                return;
            }

            const defaultDateStr = document.getElementById('reportDate').value;
            let tempStore = JSON.parse(JSON.stringify(dataStore));
            let processedCount = 0;
            let clearedDates = {}; 
            
            let detectedFileTypes = new Set(); 

            files.forEach(file => {
                Papa.parse(file, {
                    header: false, 
                    skipEmptyLines: true,
                    complete: function(results) {
                        const data = results.data;
                        const name = file.name.toLowerCase();

                        // --- 🟢 การตรวจจับประเภทไฟล์ 🟢 ---
                        let fileType = '';
                        
                        if (name.includes('issue') || name.includes('จ่าย')) fileType = 'issue';
                        else if (name.includes('reserve') || name.includes('จอง') || name.includes('ขอเลือด')) fileType = 'reserve';
                        else if (name.includes('receive') || name.includes('รับเข้า') || name.includes('รับเลือด')) fileType = 'receive';
                        else if (name.includes('stock') || name.includes('คลัง') || name.includes('คงเหลือ') || name.includes('เหลือ')) fileType = 'stock';

                        if (!fileType && data.length > 0) {
                            let sampleContent = data.slice(0, 15).map(r => r.join('').toLowerCase()).join('');
                            let cleanSampleContent = sampleContent.replace(/ศูนย์รับบริจาคโลหิต/g, '').replace(/ศูนย์รับ/g, '');
                            
                            if (cleanSampleContent.includes('ที่จ่าย') || cleanSampleContent.includes('จ่ายออก') || cleanSampleContent.includes('การจ่าย')) {
                                fileType = 'issue';
                            } else if (cleanSampleContent.includes('ที่จอง') || cleanSampleContent.includes('ขอเลือด') || cleanSampleContent.includes('การจอง')) {
                                fileType = 'reserve';
                            } else if (cleanSampleContent.includes('รับเข้า') || cleanSampleContent.includes('รับเลือด') || cleanSampleContent.includes('donor')) {
                                fileType = 'receive';
                            } else if (cleanSampleContent.includes('คงเหลือ') || cleanSampleContent.includes('ในคลัง') || cleanSampleContent.includes('stock')) {
                                fileType = 'stock';
                            } else {
                                if (cleanSampleContent.includes('จ่าย')) fileType = 'issue';
                                else if (cleanSampleContent.includes('จอง')) fileType = 'reserve';
                                else if (cleanSampleContent.includes('รับ') || cleanSampleContent.includes('บริจาค')) fileType = 'receive';
                                else fileType = 'stock'; 
                            }
                        }
                        
                        detectedFileTypes.add(fileType);

                        let fallbackDateStr = extractDateFromFilename(file.name) || defaultDateStr;
                        let currDate = fallbackDateStr; 
                        
                        // 🟢 เคลียร์ข้อมูลเก่าทิ้งเฉพาะวันนั้นๆ (จะกลับเป็น 0 ทันที เพื่อรับยอดใหม่) 🟢
                        if (!clearedDates[currDate]) clearedDates[currDate] = { stock: false, receive: false, issue: false, reserve: false };
                        
                        initTempStore(tempStore, currDate);
                        
                        if (!clearedDates[currDate][fileType]) {
                            if (fileType === 'stock') {
                                tempStore[currDate].stock.forEach(s => { s.PRC=0; s.LPPRC=0; s.LDPPRC=0; s.PC=0; s.LDPPC=0; s.SDPPAS=0; s.FFP=0; s.RhPos=0; s.RhNeg=0; });
                            } else {
                                tempStore[currDate].stats.forEach(s => s[fileType] = 0);
                            }
                            clearedDates[currDate][fileType] = true;
                        }

                        if (fileType === 'stock') {
                            // 🟢 การอ่านข้อมูลจากไฟล์คลังเลือดตามตารางที่ผู้ใช้ให้มา 🟢
                            let hRowIdx = data.findIndex(r => r.some(c => typeof c === 'string' && c.includes('Available Component')));
                            if (hRowIdx === -1) hRowIdx = data.findIndex(r => r.some(c => typeof c === 'string' && c.includes('Row Labels')));
                            if (hRowIdx === -1) hRowIdx = data.findIndex(r => r.includes('A') && r.includes('B'));

                            if (hRowIdx !== -1) {
                                let hRow = data[hRowIdx];
                                let cleanHRow = hRow.map(c => typeof c === 'string' ? c.toLowerCase().replace(/\s+/g, '') : '');
                                
                                let iA = cleanHRow.findIndex(c => c === 'availablea' || c === 'a' || c === 'groupa');
                                let iB = cleanHRow.findIndex(c => c === 'availableb' || c === 'b' || c === 'groupb');
                                let iO = cleanHRow.findIndex(c => c === 'availableo' || c === 'o' || c === 'groupo');
                                let iAB = cleanHRow.findIndex(c => c === 'availableab' || c === 'ab' || c === 'groupab');
                                let iComp = cleanHRow.findIndex(c => c === 'availablecomponent' || c.includes('component') || c.includes('rowlabel'));
                                if (iComp === -1) iComp = 0;

                                let yA = cleanHRow.findIndex(c => c === 'yesterdaya');
                                let yB = cleanHRow.findIndex(c => c === 'yesterdayb');
                                let yO = cleanHRow.findIndex(c => c === 'yesterdayo');
                                let yAB = cleanHRow.findIndex(c => c === 'yesterdayab');

                                let yesterdayDateStr = null;
                                if (yA !== -1 && yB !== -1) {
                                    let dDate = new Date(currDate);
                                    dDate.setDate(dDate.getDate() - 1);
                                    yesterdayDateStr = `${dDate.getFullYear()}-${String(dDate.getMonth() + 1).padStart(2, '0')}-${String(dDate.getDate()).padStart(2, '0')}`;
                                    
                                    initTempStore(tempStore, yesterdayDateStr);
                                    if (!clearedDates[yesterdayDateStr]) clearedDates[yesterdayDateStr] = { stock: false, receive: false, issue: false, reserve: false };
                                    if (!clearedDates[yesterdayDateStr].stock) {
                                        tempStore[yesterdayDateStr].stock.forEach(s => { s.PRC=0; s.LPPRC=0; s.LDPPRC=0; s.PC=0; s.LDPPC=0; s.SDPPAS=0; s.FFP=0; s.RhPos=0; s.RhNeg=0; });
                                        clearedDates[yesterdayDateStr].stock = true;
                                    }
                                }

                                for (let i = hRowIdx + 1; i < data.length; i++) {
                                    let row = data[i];
                                    let rawComp = String(row[iComp] || '').trim();
                                    if (!rawComp || rawComp.toLowerCase().includes('total') || rawComp.toLowerCase().includes('รวม')) continue;

                                    let type = getProductType(rawComp);

                                    if (type && type !== 'RHNEG' && iA !== -1 && iB !== -1) {
                                        let vA = parseInt(String(row[iA]).replace(/,/g,'')) || 0;
                                        let vB = parseInt(String(row[iB]).replace(/,/g,'')) || 0;
                                        let vO = parseInt(String(row[iO]).replace(/,/g,'')) || 0;
                                        let vAB = parseInt(String(row[iAB]).replace(/,/g,'')) || 0;

                                        tempStore[currDate].stock.find(s => s.group === 'A')[type] += vA;
                                        tempStore[currDate].stock.find(s => s.group === 'B')[type] += vB;
                                        tempStore[currDate].stock.find(s => s.group === 'O')[type] += vO;
                                        tempStore[currDate].stock.find(s => s.group === 'AB')[type] += vAB;

                                        if (yesterdayDateStr && yA !== -1) {
                                            let yvA = parseInt(String(row[yA]).replace(/,/g,'')) || 0;
                                            let yvB = parseInt(String(row[yB]).replace(/,/g,'')) || 0;
                                            let yvO = parseInt(String(row[yO]).replace(/,/g,'')) || 0;
                                            let yvAB = parseInt(String(row[yAB]).replace(/,/g,'')) || 0;

                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'A')[type] += yvA;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'B')[type] += yvB;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'O')[type] += yvO;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'AB')[type] += yvAB;
                                        }
                                    } else if (type === 'RHNEG') {
                                        let vA = parseInt(String(row[iA]).replace(/,/g,'')) || 0;
                                        let vB = parseInt(String(row[iB]).replace(/,/g,'')) || 0;
                                        let vO = parseInt(String(row[iO]).replace(/,/g,'')) || 0;
                                        let vAB = parseInt(String(row[iAB]).replace(/,/g,'')) || 0;

                                        tempStore[currDate].stock.find(s => s.group === 'A').RhNeg += vA;
                                        tempStore[currDate].stock.find(s => s.group === 'B').RhNeg += vB;
                                        tempStore[currDate].stock.find(s => s.group === 'O').RhNeg += vO;
                                        tempStore[currDate].stock.find(s => s.group === 'AB').RhNeg += vAB;

                                        if (yesterdayDateStr && yA !== -1) {
                                            let yvA = parseInt(String(row[yA]).replace(/,/g,'')) || 0;
                                            let yvB = parseInt(String(row[yB]).replace(/,/g,'')) || 0;
                                            let yvO = parseInt(String(row[yO]).replace(/,/g,'')) || 0;
                                            let yvAB = parseInt(String(row[yAB]).replace(/,/g,'')) || 0;

                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'A').RhNeg += yvA;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'B').RhNeg += yvB;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'O').RhNeg += yvO;
                                            tempStore[yesterdayDateStr].stock.find(s => s.group === 'AB').RhNeg += yvAB;
                                        }
                                    }
                                }
                            }
                        } else {
                            // 🟢 การอ่านข้อมูลรับ-จ่าย-จอง 🟢
                            let isPivot = false;
                            let cols = { A: -1, B: -1, O: -1, AB: -1, comp: -1, bg: -1, rh: -1, qty: -1 };
                            let headerFound = false;

                            for (let i = 0; i < Math.min(data.length, 20); i++) {
                                let cleanRow = data[i].map(c => typeof c === 'string' ? c.toLowerCase().replace(/[\s\.\-\_\(\)\[\]]+/g, '') : '');
                                let cA = cleanRow.findIndex(c => c === 'a' || c.includes('groupa') || c.includes('กรุ๊ปa') || c.includes('หมู่a'));
                                let cB = cleanRow.findIndex(c => c === 'b' || c.includes('groupb') || c.includes('กรุ๊ปb') || c.includes('หมู่b'));
                                let cO = cleanRow.findIndex(c => c === 'o' || c.includes('groupo') || c.includes('กรุ๊ปo') || c.includes('หมู่o'));
                                let cAB = cleanRow.findIndex(c => c === 'ab' || c.includes('groupab') || c.includes('กรุ๊ปab') || c.includes('หมู่ab'));
                                
                                if (cA >= 0 && cB >= 0 && cO >= 0 && cAB >= 0) {
                                    isPivot = true; headerFound = true;
                                    cols.A = cA; cols.B = cB; cols.O = cO; cols.AB = cAB;
                                    cols.comp = cleanRow.findIndex(c => c.includes('comp') || c.includes('prod') || c.includes('ชนิด') || c.includes('รายการ') || c === 'rowlabels');
                                    if(cols.comp === -1) cols.comp = 0; 
                                    break; 
                                }

                                let cComp = cleanRow.findIndex(c => c.includes('comp') || c.includes('prod') || c.includes('ชนิด') || c.includes('ส่วนประกอบ') || c.includes('รายการ') || c === 'เลือด' || c === 'โลหิต');
                                let cBg = cleanRow.findIndex(c => c.includes('blood') || c.includes('group') || c.includes('abo') || c.includes('หมู่') || c.includes('กรุ๊ป'));
                                
                                if (cComp >= 0 || cBg >= 0) {
                                    isPivot = false; headerFound = true;
                                    cols.comp = cComp >= 0 ? cComp : 0;
                                    cols.bg = cBg >= 0 ? cBg : 1;
                                    cols.rh = cleanRow.findIndex(c => c.includes('rh') || c.includes('ผล'));
                                    cols.qty = cleanRow.findIndex(c => c.includes('qty') || c.includes('quan') || c.includes('จำนวน') || c.includes('amount') || c.includes('unit') || c.includes('ปริมาณ') || c.includes('รวม'));
                                    break; 
                                }
                            }

                            data.forEach((row) => {
                                let rowStr = row.join(' ');
                                if (!headerFound) {
                                    let cleanRow = row.map(c => typeof c === 'string' ? c.toLowerCase().replace(/[\s\.\-\_\(\)\[\]]+/g, '') : '');
                                    let foundBg = cleanRow.findIndex(c => ['a','b','o','ab'].includes(c));
                                    let foundComp = cleanRow.findIndex(c => c.includes('prc') || c.includes('lprc') || c.includes('sdp') || c.includes('ffp') || c.includes('pc') || c.includes('เลือด'));
                                    let foundQty = cleanRow.findIndex(c => !isNaN(parseInt(c)) && parseInt(c) > 0 && parseInt(c) < 10000);
                                    if (foundBg >= 0 && foundComp >= 0) { cols.bg = foundBg; cols.comp = foundComp; cols.qty = foundQty; isPivot = false; } else { return; }
                                }

                                let rawComp = isPivot ? (row[cols.comp] || '') : (cols.comp >= 0 ? (row[cols.comp] || '') : '');
                                if (!rawComp && isPivot) return;
                                if (rawComp && (rawComp.toLowerCase().includes('total') || rawComp.toLowerCase().includes('รวม'))) return;

                                let type = getProductType(rawComp);

                                if (isPivot) {
                                    let vA = parseInt(String(row[cols.A] || '').replace(/,/g, '')) || 0;
                                    let vB = parseInt(String(row[cols.B] || '').replace(/,/g, '')) || 0;
                                    let vO = parseInt(String(row[cols.O] || '').replace(/,/g, '')) || 0;
                                    let vAB = parseInt(String(row[cols.AB] || '').replace(/,/g, '')) || 0;

                                    if (vA > 0 || vB > 0 || vO > 0 || vAB > 0) {
                                        tempStore[currDate].stats.find(s => s.group === 'A')[fileType] += vA;
                                        tempStore[currDate].stats.find(s => s.group === 'B')[fileType] += vB;
                                        tempStore[currDate].stats.find(s => s.group === 'O')[fileType] += vO;
                                        tempStore[currDate].stats.find(s => s.group === 'AB')[fileType] += vAB;
                                    }
                                } else {
                                    let rawBg = cols.bg >= 0 ? (row[cols.bg] || '') : '';
                                    let qtyStr = cols.qty >= 0 ? String(row[cols.qty]).trim() : '1';
                                    if (qtyStr === '') qtyStr = '1';
                                    let parsedQty = parseInt(qtyStr.replace(/,/g, '')) || 1;
                                    let qty = isNaN(parsedQty) ? 1 : parsedQty;
                                    if (qtyStr === '0') qty = 0;

                                    let bg = getBloodGroup(rawBg);
                                    if (bg) {
                                        tempStore[currDate].stats.find(s => s.group === bg)[fileType] += qty;
                                    }
                                }
                            });
                        }

                        if (++processedCount === files.length) {
                            
                            dataStore = tempStore;
                            localStorage.setItem('bloodBankDataStore', JSON.stringify(dataStore));

                            const finalDates = Object.keys(dataStore).sort();
                            const latestDate = finalDates[finalDates.length - 1];
                            
                            document.getElementById('reportDate').value = latestDate;
                            handleDateChange(latestDate);
                            
                            const thaiTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' };
                            const timeString = new Date().toLocaleTimeString('th-TH', thaiTimeOptions);
                            const formattedDateText = document.getElementById('custom-date-display').innerText;
                            
                            document.getElementById('last-update-time').innerText = `${formattedDateText} (อัปเดตเวลา ${timeString} น.)`;
                            
                            const foundDates = Object.keys(clearedDates).sort().map(d => new Date(d).toLocaleDateString('th-TH', {day: 'numeric', month:'short', timeZone: 'Asia/Bangkok'})).join(', ');
                            
                            let typeNames = [];
                            if (detectedFileTypes.has('stock')) typeNames.push('คลังเลือด (Stock)');
                            if (detectedFileTypes.has('receive')) typeNames.push('รับโลหิต');
                            if (detectedFileTypes.has('issue')) typeNames.push('จ่ายโลหิต');
                            if (detectedFileTypes.has('reserve')) typeNames.push('จองโลหิต');

                            if (true) {
                                showUploadAlert('อัปโหลดข้อมูลสำเร็จ!', `อัปเดตข้อมูลของวันที่: <b>${foundDates}</b><br><span class="text-xs">ระบบตรวจพบข้อมูลหมวด: <b class="text-indigo-600">${typeNames.join(', ')}</b> (เลื่อนดูข้อมูลได้ในส่วนที่เกี่ยวข้อง)</span>`, 'success');
                            }
                            
                            event.target.value = '';
                            
                            if (WEBHOOK_URL && WEBHOOK_URL.trim() !== "") {
                                setTimeout(() => { sendEmailImageAlert(true); }, 500);
                            }
                        }
                    }
                });
            });
        }

        window.switchTab = switchTab;
        window.toggleAutoPlay = toggleAutoPlay;
        window.updateAutoPlayInterval = updateAutoPlayInterval;
        window.handleDateChange = handleDateChange;
        window.processFiles = processFiles;
        window.setFilter = setFilter;
        window.sendEmailImageAlert = sendEmailImageAlert;

        window.addEventListener('DOMContentLoaded', init);

    </script>
</body>
</html>