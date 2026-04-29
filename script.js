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
                    📊 <span class="hidden md:inline">สถานะคลังเลือดประจำวัน</span>
                </button>
                <button id="btn-tab-analytics" onclick="switchTab('analytics')" class="px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors tab-inactive flex items-center gap-1.5">
                    📈 <span class="hidden md:inline">สถิติ & พยากรณ์</span>
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
                        <input type="file" id="csvFileInput" multiple class="hidden" onchange="processFiles(event)" />
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
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-red-500"></i> Stock เลือดแดง (PRC, LPRC, LDPRC)
                    </h3>
                    <div id="rbc-blocks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1"></div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-yellow-500"></i> Stock เกล็ดเลือด (Platelets)
                    </h3>
                    <div id="plt-blocks" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1"></div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-blue-500"></i> Stock Rh
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

        <!-- ANALYTICS TAB -->
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
                    <button id="btn-send-line" onclick="sendLineImageAlert()" class="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                        ส่งแจ้งเตือนผ่าน LINE
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

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // =====================================================================
        // URL ของ API Google Apps Script 
        // =====================================================================
        const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwB7TQec1R2GCngCGxs240P2ZviKjq2BGRVtkbhkXh2rqb1mCKLkPKOelEwuGf8IUEqWQ/exec"; 

        let dataStore = {}; 
        let currentStock = [];
        let todayStats = [];
        let yesterdayStats = []; 

        let activeTab = 'dashboard';
        let filterGroup = 'All';
        const groups = ['All', 'A', 'B', 'O', 'AB'];
        
        let forecastChartInst = null;
        let yesterdayChartsInst = [];
        let yesterdayReserveChartsInst = [];
        let todayChartsInst = []; 

        // =====================================================================
        // ⚙️ การตั้งค่า: เกณฑ์การสำรองโลหิต (Thresholds)
        // หมายเหตุตามนโยบาย:
        // 1) จำนวน unit แต่ละแผน (1 วัน, 5 วัน, 7 วัน) จะถูกตั้งค่าเริ่มต้นให้คงที่ไว้ก่อน 
        //    (เนื่องจากมีข้อมูลตั้งต้นแค่ 3 วัน)
        // 2) เกณฑ์จะเปลี่ยนอัตโนมัติก็ต่อเมื่อ "มีการอัปโหลดไฟล์ยอดจองเลือดรวมกันตั้งแต่ 90 วัน (3 เดือน) ขึ้นไป"
        // 3) สูตรคำนวณใหม่: ปริมาณสำรอง = (ค่าเฉลี่ยจองเลือดต่อวัน * N วัน) + 15% (Safety stock)
        // =====================================================================
        
        // ค่าเริ่มต้นตามตัวเลขที่กำหนดไว้เป๊ะๆ
        let thresholdsMap = {
            'A':  { PRC: [7, 35, 50], LPRC: [6, 30, 41], LDPRC: [2, 7, 9] },
            'B':  { PRC: [12, 65, 90], LPRC: [8, 41, 57], LDPRC: [2, 7, 9] },
            'O':  { PRC: [13, 70, 98], LPRC: [10, 53, 94], LDPRC: [2, 7, 9] },
            'AB': { PRC: [4, 18, 26], LPRC: [4, 18, 26], LDPRC: [2, 7, 9] }
        };

        // สัดส่วนค่าเฉลี่ยตั้งต้น เพื่อใช้คำนวณสัดส่วนแยก PRC, LPRC, LDPRC ในอนาคตเมื่อมีข้อมูลยอดจองเลือด > 90 วัน
        const baseRatioForCalc = {
            'A':  { PRC: 6.0,  LPRC: 5.0,  LDPRC: 1.0 },
            'B':  { PRC: 10.8, LPRC: 6.8,  LDPRC: 1.0 },
            'O':  { PRC: 11.7, LPRC: 11.2, LDPRC: 1.0 },
            'AB': { PRC: 3.0,  LPRC: 3.0,  LDPRC: 1.0 }
        };

        function checkAndUpdateThresholds() {
            const dates = Object.keys(dataStore);
            let reserveDays = 0;
            let sumReserve = { 'A': 0, 'B': 0, 'O': 0, 'AB': 0 };

            // นับจำนวนวันที่มีข้อมูลยอดจองเลือด
            dates.forEach(d => {
                let hasReserveData = false;
                dataStore[d].stats.forEach(s => {
                    if (s.reserve > 0) {
                        hasReserveData = true;
                        sumReserve[s.group] += s.reserve;
                    }
                });
                if (hasReserveData) reserveDays++;
            });

            // เปลี่ยนแปลงเกณฑ์เมื่อมีข้อมูลครบ 90 วัน (3 เดือน)
            if (reserveDays >= 90) {
                ['A', 'B', 'O', 'AB'].forEach(group => {
                    let avgDailyReserve = sumReserve[group] / reserveDays; // ค่าเฉลี่ยจองเลือดต่อวันรวม
                    
                    // กระจายค่ายอดจองรวม ไปเป็นสัดส่วนของแต่ละผลิตภัณฑ์อิงจากข้อมูล Base ในอดีต
                    let baseSum = baseRatioForCalc[group].PRC + baseRatioForCalc[group].LPRC + baseRatioForCalc[group].LDPRC;
                    let prcAvg = avgDailyReserve * (baseRatioForCalc[group].PRC / baseSum);
                    let lprcAvg = avgDailyReserve * (baseRatioForCalc[group].LPRC / baseSum);
                    let ldprcAvg = avgDailyReserve * (baseRatioForCalc[group].LDPRC / baseSum);

                    // ปริมาณสำรอง = (ค่าเฉลี่ยจองเลือดต่อวัน * N วัน) + 15% (คูณ 1.15 แล้วปัดเศษขึ้น)
                    thresholdsMap[group] = {
                        PRC: [
                            Math.ceil(prcAvg * 1 * 1.15),
                            Math.ceil(prcAvg * 5 * 1.15),
                            Math.ceil(prcAvg * 7 * 1.15)
                        ],
                        LPRC: [
                            Math.ceil(lprcAvg * 1 * 1.15),
                            Math.ceil(lprcAvg * 5 * 1.15),
                            Math.ceil(lprcAvg * 7 * 1.15)
                        ],
                        LDPRC: [
                            Math.ceil(ldprcAvg * 1 * 1.15),
                            Math.ceil(ldprcAvg * 5 * 1.15),
                            Math.ceil(ldprcAvg * 7 * 1.15)
                        ]
                    };
                });
                console.log(`[Auto Adjust] เปลี่ยนเกณฑ์แผน 1, 5, 7 วันใหม่ จากข้อมูลย้อนหลัง ${reserveDays} วัน`);
            }
        }

        let autoPlayTimer = null;
        let isAutoPlaying = false;
        let autoPlayInterval = 10000; 

        function initTempStore(store, dateStr) {
            if (!store[dateStr]) {
                const emptyGroups = ['A', 'B', 'O', 'AB'];
                store[dateStr] = {
                    stock: emptyGroups.map(g => ({ group: g, PRC: 0, LPRC: 0, LDPRC: 0, PC: 0, SDP: 0, FFP: 0, RhPos: 0, RhNeg: 0 })),
                    stats: emptyGroups.map(g => ({ group: g, receive: 0, issue: 0, reserve: 0 }))
                };
            }
        }

        const getEmptyStock = () => ['A', 'B', 'O', 'AB'].map(g => ({ group: g, PRC: 0, LPRC: 0, LDPRC: 0, PC: 0, SDP: 0, FFP: 0, RhPos: 0, RhNeg: 0 }));
        const getEmptyStats = () => ['A', 'B', 'O', 'AB'].map(g => ({ group: g, receive: 0, issue: 0, reserve: 0 }));

        // --- ระบบคลาวด์ (Cloud Realtime Sync) ---
        let db, auth, appId, user;

        async function initApp() {
            const firebaseConfigStr = typeof __firebase_config !== 'undefined' ? __firebase_config : null;
            if (firebaseConfigStr) {
                try {
                    const firebaseConfig = JSON.parse(firebaseConfigStr);
                    const app = initializeApp(firebaseConfig);
                    auth = getAuth(app);
                    db = getFirestore(app);
                    appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }

                    onAuthStateChanged(auth, (currentUser) => {
                        user = currentUser;
                        if (user) {
                            setupRealtimeSync();
                        }
                    });
                } catch (e) {
                    console.error("เชื่อมต่อคลาวด์ล้มเหลว จะใช้ข้อมูลในเครื่องแทน", e);
                    initLocalApp();
                }
            } else {
                initLocalApp();
            }
        }

        function setupRealtimeSync() {
            if (!user) return;
            const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'bloodbank_system', 'main_store');
            
            // รอรับข้อมูลแบบ Real-time ถ้ามีใครอัปโหลดใหม่ หน้าจอทุกคนจะเปลี่ยนตามทันที
            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    try {
                        const data = docSnap.data();
                        if (data && data.storeData) {
                            dataStore = JSON.parse(data.storeData);
                            localStorage.setItem('bloodBankDataStore', data.storeData);
                            refreshUIWithLatestData();
                        }
                    } catch (e) {
                        console.error("เกิดข้อผิดพลาดในการอ่านข้อมูลจากคลาวด์", e);
                    }
                } else {
                    // หากไม่มีข้อมูลบนคลาวด์ (เปิดใช้งานครั้งแรก) ให้ดึงจากเครื่องผู้ใช้อัปขึ้นไปสร้างไว้
                    initLocalApp();
                    saveToCloud();
                }
            }, (error) => {
                console.error("Sync error:", error);
                initLocalApp();
            });
        }

        function saveToCloud() {
            if (!user || !db) return;
            const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'bloodbank_system', 'main_store');
            setDoc(docRef, { storeData: JSON.stringify(dataStore), updatedAt: new Date().toISOString() })
                .catch(err => console.error("บันทึกข้อมูลขึ้นคลาวด์ล้มเหลว:", err));
        }

        function refreshUIWithLatestData() {
            // ทำความสะอาดข้อมูล: ลบ "วันที่ว่างเปล่า (Ghost dates)" 
            for (let dateKey in dataStore) {
                const hasRealData = dataStore[dateKey].stock.some(s => s.PRC > 0 || s.RhPos > 0 || s.LPRC > 0 || s.LDPRC > 0 || s.PC > 0 || s.FFP > 0) || 
                                    dataStore[dateKey].stats.some(s => s.receive > 0 || s.issue > 0 || s.reserve > 0);
                if (!hasRealData) {
                    delete dataStore[dateKey];
                }
            }

            const availableDates = Object.keys(dataStore).sort();
            let initialDate = '';

            if (availableDates.length > 0) {
                initialDate = availableDates[availableDates.length - 1]; // ยึดข้อมูลวันล่าสุดของระบบส่วนรวม
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

        function initLocalApp() {
            // โหลดข้อมูลจากเครื่องคอมพิวเตอร์ (กรณีไม่ได้ต่อเน็ตหรือคลาวด์มีปัญหา)
            const savedData = localStorage.getItem('bloodBankDataStore');
            if (savedData) {
                try {
                    dataStore = JSON.parse(savedData);
                } catch(e) {
                    console.error("Error parsing saved data", e);
                }
            }
            refreshUIWithLatestData();
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
                setTimeout(() => { container.classList.add('hidden'); }, 7000);
            }
        }

        // ==========================================
        //  ระบบสร้างรูปภาพคำแนะนำเฉพาะกรุ๊ปที่ผิดปกติ แล้วยิงผ่าน LINE
        // ==========================================
        function sendLineImageAlert(isAutoTrigger = false) {
            const dateStr = document.getElementById('custom-date-display').innerText;
            let hasIssue = false;

            currentStock.forEach(stock => {
                const t = thresholdsMap[stock.group] || thresholdsMap['A'];
                const getRecDetails = (amount, thresholds) => {
                    const [t1, t2, t3] = thresholds;
                    const target = Math.ceil(t3 * 1.2); 
                    if (amount > target || amount < t1 || (amount >= t1 && amount < t2)) return true;
                    return false;
                };
                if (getRecDetails(stock.PRC||0, t.PRC) || getRecDetails(stock.LPRC||0, t.LPRC) || getRecDetails(stock.LDPRC||0, t.LDPRC)) {
                    hasIssue = true;
                }
            });

            if (!hasIssue) {
                if (!isAutoTrigger) showUploadAlert('สถานะปกติ', '✅ สถานะคลังเลือดปกติ ไม่มีรายการขาดแคลนหรือเกินที่ต้องแจ้งเตือน', 'success');
                return;
            }

            const btn = document.getElementById('btn-send-line');
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
                        return { status: 'เลือดเกิน', msg: 'แนะนำชะลอการรับบริจาคโลหิต', hexColor: '#15803d', hexBg: '#dcfce7', hexBorder: '#bbf7d0', needed, excess };
                    } else if (amount < t1) {
                        return { status: 'วิกฤต', msg: 'สำรองเหลือไม่เพียงพอสำหรับ 1 วัน ควรเตรียมประกาศรับบริจาคเพิ่ม', hexColor: '#b91c1c', hexBg: '#fee2e2', hexBorder: '#fecaca', needed, excess };
                    } else if (amount >= t1 && amount < t2) {
                        return { status: 'เสี่ยงขาด', msg: 'ควรจัดหาเลือดเพิ่มตามแผนสำรอง 7 วัน', hexColor: '#b91c1c', hexBg: '#fecaca', hexBorder: '#fca5a5', needed, excess };
                    } else {
                        return { status: 'ปกติ', msg: 'ปริมาณเพียงพอสำหรับการสำรองตามแผน 7 วัน', hexColor: '#1d4ed8', hexBg: '#dbeafe', hexBorder: '#bfdbfe', needed, excess };
                    }
                };

                const prcRec = getRecDetails(stock.PRC || 0, t.PRC);
                const lprcRec = getRecDetails(stock.LPRC || 0, t.LPRC);
                const ldprcRec = getRecDetails(stock.LDPRC || 0, t.LDPRC);

                if (prcRec.status !== 'ปกติ' || lprcRec.status !== 'ปกติ' || ldprcRec.status !== 'ปกติ') {
                    let cardBg = '#f9fafb', cardBorder = '#e5e7eb';
                    if (prcRec.status==='วิกฤต' || lprcRec.status==='วิกฤต' || ldprcRec.status==='วิกฤต') { cardBg = '#fef2f2'; cardBorder = '#fecaca'; }
                    else if (prcRec.status==='เสี่ยงขาด' || lprcRec.status==='เสี่ยงขาด' || ldprcRec.status==='เสี่ยงขาด') { cardBg = '#fff7ed'; cardBorder = '#fed7aa'; }
                    else if (prcRec.status==='เลือดเกิน' || lprcRec.status==='เลือดเกิน' || ldprcRec.status==='เลือดเกิน') { cardBg = '#f0fdf4'; cardBorder = '#bbf7d0'; }

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
                                    <span style="font-size: 12px; font-weight: bold; background-color: ${rec.hexBg}; color: ${rec.hexColor}; border: 1px solid ${rec.hexBorder}; padding: 2px 8px; border-radius: 9999px;">${rec.status}</span>
                                </div>
                                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 1.4;">${rec.msg}</p>
                            </div>
                        `;
                    };

                    addLineHtml('PRC', prcRec);
                    addLineHtml('LPRC', lprcRec);
                    addLineHtml('LDPRC', ldprcRec);

                    snapshotHtml += `</div>`;
                }
            });

            snapshotHtml += `</div></div>`;

            const offscreen = document.createElement('div');
            offscreen.style.position = 'absolute';
            offscreen.style.top = '0px';
            offscreen.style.left = '0px';
            offscreen.style.zIndex = '-9999';
            offscreen.style.opacity = '0.01';
            offscreen.style.pointerEvents = 'none';
            offscreen.innerHTML = snapshotHtml;
            document.body.appendChild(offscreen);

            html2canvas(offscreen.firstElementChild, { scale: 1.5 }).then(canvas => {
                document.body.removeChild(offscreen);
                const base64Image = canvas.toDataURL('image/jpeg', 0.85);

                if(btn && !isAutoTrigger) {
                    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> กำลังส่งเข้า LINE...`;
                    lucide.createIcons();
                }

                const lineMessage = `🚨 แจ้งเตือนสถานะคลังเลือดเสี่ยงขาด/เกิน\nประจำวันที่ ${dateStr}\nโปรดตรวจสอบตารางสรุปที่แนบมาครับ`;

                if (WEBHOOK_URL && WEBHOOK_URL.trim() !== "") {
                    fetch(WEBHOOK_URL, {
                        method: 'POST',
                        mode: 'no-cors', 
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({
                            message: lineMessage,
                            imageBase64: base64Image
                        })
                    })
                    .then(() => {
                        if(!isAutoTrigger) {
                            if(btn) {
                                btn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> แจ้งเตือน LINE สำเร็จ!`;
                                btn.classList.replace('bg-green-50', 'bg-emerald-50');
                                btn.classList.replace('text-green-700', 'text-emerald-700');
                                btn.classList.replace('border-green-200', 'border-emerald-200');
                                lucide.createIcons();
                                setTimeout(() => {
                                    btn.innerHTML = `<i data-lucide="message-circle" class="w-4 h-4"></i> ส่งแจ้งเตือนผ่าน LINE`;
                                    btn.disabled = false;
                                    btn.classList.replace('bg-emerald-50', 'bg-green-50');
                                    btn.classList.replace('text-emerald-700', 'text-green-700');
                                    btn.classList.replace('border-emerald-200', 'border-green-200');
                                    lucide.createIcons();
                                }, 3000);
                            }
                            showUploadAlert('ส่งข้อความสำเร็จ!', `ส่งรูปภาพแจ้งเตือนไปยังแชท LINE เรียบร้อยแล้ว`, 'success');
                        } else {
                            showUploadAlert('แจ้งเตือนอัตโนมัติสำเร็จ!', `ระบบตรวจพบรายการผิดปกติ และส่งรูปภาพรายงานเข้า LINE อัตโนมัติแล้ว`, 'success');
                        }
                    })
                    .catch(error => {
                        if(!isAutoTrigger) showUploadAlert('เกิดข้อผิดพลาดในการส่ง', `มีปัญหาการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง`, 'error');
                        if(btn) { btn.innerHTML = `<i data-lucide="message-circle" class="w-4 h-4"></i> ส่งแจ้งเตือนผ่าน LINE`; btn.disabled = false; lucide.createIcons(); }
                    });
                }
            });
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

            // อ่านข้อมูลจาก dataStore อย่างเดียว ห้ามแทรกวันที่หลอกๆ (Mutate) ลงไปตอนกดปฏิทินเด็ดขาด!
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
                            dataStore[dateStr].stock.some(s => s.PRC > 0 || s.RhPos > 0) || 
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
            document.getElementById('last-update-time').innerText = formattedDate;

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

        // --- UI Renderers ---

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
                const totalRBC = (d.PRC || 0) + (d.LPRC || 0) + (d.LDPRC || 0);
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
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-600 mb-0.5">PRC</span><span class="text-lg font-black text-red-700 leading-none">${d.PRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.PRC || 0, t.PRC)}</div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-700 mb-0.5">LPRC</span><span class="text-lg font-black text-red-800 leading-none">${d.LPRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.LPRC || 0, t.LPRC)}</div>
                        <div class="flex flex-col items-center bg-white pt-1.5 px-1 rounded-lg border border-red-100 shadow-sm"><span class="text-[10px] font-semibold text-red-800 mb-0.5">LDPRC</span><span class="text-lg font-black text-red-900 leading-none">${d.LDPRC || 0}<span class="text-[8px] font-normal ml-0.5">Unit</span></span>${getAlertBar(d.LDPRC || 0, t.LDPRC)}</div>
                    </div>
                    <div class="absolute bottom-2 right-3 bg-red-100 border border-red-200 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">รวม: ${totalRBC} Unit</div>
                </div>`;
            }).join('');
        }

        function renderPltBlocks(data) {
            document.getElementById('plt-blocks').innerHTML = data.map(d => `
                <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col items-center justify-center text-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-3 border-b border-amber-200 pb-2"><span class="text-sm font-bold text-amber-800">Group ${d.group}</span><i data-lucide="droplet" class="w-4 h-4 text-amber-500"></i></div>
                    <div class="grid grid-cols-2 gap-2 w-full">
                        <div class="flex flex-col items-center bg-white p-2 rounded-lg border border-amber-100 shadow-sm"><span class="text-[10px] font-semibold text-amber-600 mb-1">Platelet Conc.</span><span class="text-xl font-black text-amber-700">${d.PC || 0}<span class="text-[10px] font-normal ml-1">Unit</span></span></div>
                        <div class="flex flex-col items-center bg-white p-2 rounded-lg border border-amber-100 shadow-sm"><span class="text-[10px] font-semibold text-amber-700 mb-1">Single LPPC</span><span class="text-xl font-black text-amber-800">${d.SDP || 0}<span class="text-[10px] font-normal ml-1">Unit</span></span></div>
                    </div>
                </div>`).join('');
        }

        function renderRhBlocks(data) {
            document.getElementById('rh-blocks').innerHTML = data.map(d => `
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 flex flex-col items-center justify-center text-center shadow-sm relative">
                    <div class="w-full flex justify-between items-center mb-3 border-b border-blue-200 pb-2"><span class="text-sm font-bold text-blue-800">Group ${d.group}</span><i data-lucide="droplet" class="w-4 h-4 text-blue-500"></i></div>
                    <div class="grid grid-cols-1 gap-2 w-full">
                        <div class="flex flex-col items-center bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                            <span class="text-sm font-bold text-blue-700 mb-1">Rh (-)</span>
                            <span class="text-2xl font-black text-blue-800">${d.RhNeg || 0}<span class="text-xs font-normal ml-1">Unit</span></span>
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
                    // เป้าหมายคือแผน 7 วัน (ซึ่งสูตรคำนวณบวก Safety Stock 15% ไว้ให้แล้วใน t3)
                    const target = t3; 
                    
                    let needed = amount < target ? (target - amount) : 0;
                    let excess = amount > target ? (amount - target) : 0;

                    if (amount > target) {
                        return { status: 'เลือดเกิน', msg: 'แนะนำชะลอการรับบริจาคโลหิต', color: 'text-green-700', bg: 'bg-green-100', needed, excess };
                    } else if (amount < t1) {
                        return { status: 'วิกฤต', msg: 'สำรองเหลือไม่เพียงพอสำหรับ 1 วัน ควรประกาศรับบริจาคเพิ่มด่วน', color: 'text-red-700', bg: 'bg-red-100', needed, excess };
                    } else if (amount >= t1 && amount < t2) {
                        return { status: 'เสี่ยงขาด', msg: 'ควรจัดหาโลหิตเพิ่มเพื่อให้เพียงพอสำหรับการสำรอง 7 วัน', color: 'text-orange-600', bg: 'bg-orange-100', needed, excess };
                    } else {
                        let normalMsg = needed > 0 ? 'ปริมาณเพียงพอสำหรับการสำรอง 5 วัน แต่ควรจัดหาเพิ่มตามแผนการสำรอง 7 วัน' : 'ปริมาณเพียงพอสำหรับการสำรอง 7 วัน';
                        return { status: 'ปกติ', msg: normalMsg, color: 'text-blue-700', bg: 'bg-blue-100', needed, excess };
                    }
                };

                const prcRec = getRecDetails(stock.PRC || 0, t.PRC);
                const lprcRec = getRecDetails(stock.LPRC || 0, t.LPRC);
                const ldprcRec = getRecDetails(stock.LDPRC || 0, t.LDPRC);

                let cardStyle = 'bg-blue-50 border-blue-200';
                let overallIcon = 'check-circle';
                let iconColor = 'text-blue-600';

                const statuses = [prcRec.status, lprcRec.status, ldprcRec.status];
                if (statuses.includes('วิกฤต')) {
                    cardStyle = 'bg-red-50 border-red-200';
                    overallIcon = 'alert-octagon';
                    iconColor = 'text-red-600';
                } else if (statuses.includes('เสี่ยงขาด')) {
                    cardStyle = 'bg-orange-50 border-orange-200';
                    overallIcon = 'alert-triangle';
                    iconColor = 'text-orange-600';
                } else if (statuses.includes('เลือดเกิน')) {
                    cardStyle = 'bg-green-50 border-green-200';
                    overallIcon = 'info';
                    iconColor = 'text-green-600';
                }

                const renderProductLine = (name, rec) => {
                    let displayAmount = '';
                    if (rec.needed > 0) {
                        displayAmount = `(ต้องการจัดหาเพิ่ม: <span class="text-red-600 font-bold">${rec.needed} Unit</span>)`;
                    } else if (rec.excess > 0) {
                        displayAmount = `(เกินความต้องการ: <span class="text-green-600 font-bold">${rec.excess} Unit</span>)`;
                    } else {
                        displayAmount = `(<span class="text-blue-600 font-bold">ไม่ต้องจัดหาเพิ่ม</span>)`;
                    }

                    return `
                        <div class="mt-2.5 flex flex-col gap-1 border-t border-gray-200 border-opacity-60 pt-2.5">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-black text-gray-800">${name} <span class="text-gray-500 font-medium ml-0.5">${displayAmount}</span></span>
                                <span class="text-[9px] font-bold px-2 py-0.5 rounded-full ${rec.bg} ${rec.color} border border-current opacity-80">${rec.status}</span>
                            </div>
                            <p class="text-[11.5px] text-gray-700 leading-tight">${rec.msg}</p>
                        </div>
                    `;
                };

                return `
                    <div class="p-4 rounded-xl border flex flex-col shadow-sm transition-all ${cardStyle}">
                        <div class="flex items-center gap-2 mb-1">
                            <div class="bg-white p-1.5 rounded-full shadow-sm flex-shrink-0">
                                <i data-lucide="${overallIcon}" class="w-5 h-5 ${iconColor}"></i>
                            </div>
                            <h4 class="font-bold text-lg text-gray-900">Group ${stock.group}</h4>
                        </div>
                        <div class="flex flex-col">
                            ${renderProductLine('PRC', prcRec)}
                            ${renderProductLine('LPRC', lprcRec)}
                            ${renderProductLine('LDPRC', ldprcRec)}
                        </div>
                    </div>
                `;
            }).join('');

            lucide.createIcons();
        }

        function renderForecastChart() {
            if(forecastChartInst) forecastChartInst.destroy();
            
            const sortedDates = Object.keys(dataStore).sort();
            let labels = [], stockData = [], receiveData = [], issueData = [], requestData = [];

            sortedDates.forEach(d => {
                let [y, m, day] = d.split('-'); 
                labels.push(`${day}/${m}`);
                
                let ds = dataStore[d];
                stockData.push(ds.stock.reduce((sum, item) => sum + item.PRC + item.LPRC + item.LDPRC, 0));
                receiveData.push(ds.stats.reduce((sum, item) => sum + item.receive, 0));
                issueData.push(ds.stats.reduce((sum, item) => sum + item.issue, 0));
                requestData.push(ds.stats.reduce((sum, item) => sum + item.reserve, 0));
            });

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

            let detectedTypes = { stock: false, receive: false, issue: false, reserve: false };
            files.forEach(file => {
                const name = file.name;
                if (name.includes('คลังเลือด')) detectedTypes.stock = true;
                else if (name.includes('Donor') || name.includes('รับ')) detectedTypes.receive = true;
                else if (name.includes('จ่าย')) detectedTypes.issue = true;
                else if (name.includes('จอง') || name.includes('ขอ')) detectedTypes.reserve = true;
            });

            let missingCategories = [];
            if (!detectedTypes.stock) missingCategories.push('คลังเลือด (Stock)');
            if (!detectedTypes.receive) missingCategories.push('รับเลือด (Donor)');
            if (!detectedTypes.issue) missingCategories.push('จ่ายเลือด (Issue)');
            if (!detectedTypes.reserve) missingCategories.push('จอง/ขอเลือด (Reserve)');

            if (missingCategories.length > 0) {
                showUploadAlert('คำเตือน: ข้อมูลอาจไม่ครบถ้วน', `ขาดไฟล์ข้อมูลประเภท: <b>${missingCategories.join(', ')}</b> ระบบจะทำการอัปเดตเฉพาะข้อมูลที่ได้รับมาเท่านั้น`, 'warning');
            } else {
                document.getElementById('upload-alert-container').classList.add('hidden');
            }

            const defaultDateStr = document.getElementById('reportDate').value;

            let tempStore = JSON.parse(JSON.stringify(dataStore));
            let processedCount = 0;
            let clearedDates = {}; 

            files.forEach(file => {
                Papa.parse(file, {
                    header: false, 
                    skipEmptyLines: true,
                    complete: function(results) {
                        const data = results.data;
                        const name = file.name;

                        let fileType = '';
                        if (name.includes('คลังเลือด')) fileType = 'stock';
                        else if (name.includes('Donor') || name.includes('รับ')) fileType = 'receive';
                        else if (name.includes('จ่าย')) fileType = 'issue';
                        else if (name.includes('จอง') || name.includes('ขอ/จอง')) fileType = 'reserve';

                        let fallbackDateStr = extractDateFromFilename(name) || defaultDateStr;
                        let currDate = fallbackDateStr; 
                        let cols = { A: -1, B: -1, O: -1, AB: -1, comp: -1, bg: -1, rh: -1 };

                        if (fileType === 'stock') {
                            initTempStore(tempStore, currDate);
                            if (!clearedDates[currDate]) clearedDates[currDate] = {};
                            if (!clearedDates[currDate].stock) {
                                tempStore[currDate].stock.forEach(s => { s.PRC=0; s.LPRC=0; s.LDPRC=0; s.PC=0; s.SDP=0; s.FFP=0; s.RhPos=0; s.RhNeg=0; });
                                clearedDates[currDate].stock = true;
                            }
                        }

                        data.forEach((row) => {
                            let rowStr = row.join(' ');
                            
                            if (rowStr.includes('ระหว่างวันที่') || rowStr.includes('ตั้งแต่วันที่') || rowStr.includes('วันที่')) {
                                let extractedDate = extractDateFromText(rowStr);
                                if (extractedDate) {
                                    currDate = extractedDate;
                                }
                            }

                            initTempStore(tempStore, currDate);
                            if (!clearedDates[currDate]) clearedDates[currDate] = {};

                            if (fileType === 'receive') {
                                if (!clearedDates[currDate].receive) {
                                    tempStore[currDate].stats.forEach(s => s.receive = 0);
                                    clearedDates[currDate].receive = true;
                                }
                                if (row.some(c => typeof c === 'string' && c.includes('ProductType')) && rowStr.includes('A') && rowStr.includes('B')) {
                                    cols.A = row.findIndex(c => typeof c === 'string' && c.replace(/\s+/g, '') === 'A');
                                    cols.B = row.findIndex(c => typeof c === 'string' && c.replace(/\s+/g, '') === 'B');
                                    cols.O = row.findIndex(c => typeof c === 'string' && c.replace(/\s+/g, '') === 'O');
                                    cols.AB = row.findIndex(c => typeof c === 'string' && c.replace(/\s+/g, '') === 'AB');
                                } else if (cols.A >= 0 && row.length > cols.A) {
                                    if (/\d/.test(rowStr)) { 
                                        tempStore[currDate].stats.find(s => s.group === 'A').receive += parseInt(row[cols.A]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'B').receive += parseInt(row[cols.B]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'O').receive += parseInt(row[cols.O]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'AB').receive += parseInt(row[cols.AB]) || 0;
                                    }
                                }
                            } else if (fileType === 'issue') {
                                if (!clearedDates[currDate].issue) {
                                    tempStore[currDate].stats.forEach(s => s.issue = 0);
                                    clearedDates[currDate].issue = true;
                                }
                                if (row.some(c => typeof c === 'string' && (c.includes('Component ที่จ่าย') || c.includes('Component'))) && rowStr.includes('Group A')) {
                                    cols.A = row.findIndex(c => typeof c === 'string' && c.includes('Group A'));
                                    cols.B = row.findIndex(c => typeof c === 'string' && c.includes('Group B'));
                                    cols.O = row.findIndex(c => typeof c === 'string' && c.includes('Group O'));
                                    cols.AB = row.findIndex(c => typeof c === 'string' && c.includes('Group AB'));
                                } else if (cols.A >= 0 && row.length > cols.A) {
                                    if (/\d/.test(rowStr)) {
                                        tempStore[currDate].stats.find(s => s.group === 'A').issue += parseInt(row[cols.A]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'B').issue += parseInt(row[cols.B]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'O').issue += parseInt(row[cols.O]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'AB').issue += parseInt(row[cols.AB]) || 0;
                                    }
                                }
                            } else if (fileType === 'reserve') {
                                if (!clearedDates[currDate].reserve) {
                                    tempStore[currDate].stats.forEach(s => s.reserve = 0);
                                    clearedDates[currDate].reserve = true;
                                }
                                if (row.some(c => typeof c === 'string' && (c.includes('Component ที่ขอ/จอง') || c.includes('Component'))) && rowStr.includes('Group A')) {
                                    cols.A = row.findIndex(c => typeof c === 'string' && c.includes('Group A'));
                                    cols.B = row.findIndex(c => typeof c === 'string' && c.includes('Group B'));
                                    cols.O = row.findIndex(c => typeof c === 'string' && c.includes('Group O'));
                                    cols.AB = row.findIndex(c => typeof c === 'string' && c.includes('Group AB'));
                                } else if (cols.A >= 0 && row.length > cols.A) {
                                    if (/\d/.test(rowStr)) {
                                        tempStore[currDate].stats.find(s => s.group === 'A').reserve += parseInt(row[cols.A]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'B').reserve += parseInt(row[cols.B]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'O').reserve += parseInt(row[cols.O]) || 0;
                                        tempStore[currDate].stats.find(s => s.group === 'AB').reserve += parseInt(row[cols.AB]) || 0;
                                    }
                                }
                            } else if (fileType === 'stock') {
                                if (row.some(c => typeof c === 'string' && c.includes('Component')) && rowStr.includes('BloodGroup')) {
                                    cols.comp = row.findIndex(c => typeof c === 'string' && c.includes('Component'));
                                    cols.bg = row.findIndex(c => typeof c === 'string' && c.includes('BloodGroup'));
                                    cols.rh = row.findIndex(c => typeof c === 'string' && c.includes('Rh'));
                                } else if (cols.comp >= 0 && row.length > Math.max(cols.comp, cols.bg)) {
                                    let bg = (row[cols.bg] || '').trim();
                                    let comp = (row[cols.comp] || '').trim();
                                    let rh = (row[cols.rh] || '').trim();

                                    if (['A', 'B', 'O', 'AB'].includes(bg)) {
                                        let type = '';
                                        if(comp.includes('Packed Red Cell') && !comp.includes('Leukocyte')) type = 'PRC';
                                        else if(comp.includes('Leukocyte Poor PRC')) type = 'LPRC';
                                        else if(comp.includes('Leukocyte Depleted PRC')) type = 'LDPRC';
                                        else if(comp.includes('Platelet Concentrate')) type = 'PC';
                                        else if(comp.includes('Single Donor Platelet')) type = 'SDP';
                                        else if(comp.includes('Fresh Frozen Plasma')) type = 'FFP';

                                        let targetGroup = tempStore[currDate].stock.find(s => s.group === bg);
                                        if (type && targetGroup) targetGroup[type] += 1;
                                        if (rh.includes('Positive') && targetGroup) targetGroup.RhPos += 1;
                                        if (rh.includes('Negative') && targetGroup) targetGroup.RhNeg += 1;
                                    }
                                }
                            }
                        });

                        if (++processedCount === files.length) {
                            
                            const allDates = Object.keys(tempStore).sort();
                            
                            for (let i = 0; i < allDates.length - 1; i++) {
                                let currD = allDates[i];
                                let nextD = allDates[i+1];
                                
                                if (tempStore[currD].stock.some(s => s.PRC > 0 || s.RhPos > 0) && !tempStore[nextD].stock.some(s => s.PRC > 0 || s.RhPos > 0)) {
                                    tempStore[nextD].stock = tempStore[currD].stock.map(ns => {
                                        let stat = tempStore[nextD].stats.find(s => s.group === ns.group) || {receive: 0, issue: 0};
                                        let diff = stat.receive - stat.issue; 
                                        return {
                                            ...ns,
                                            PRC: Math.max(0, ns.PRC + Math.floor(diff * 0.5)),
                                            LPRC: Math.max(0, ns.LPRC + Math.ceil(diff * 0.5)),
                                            RhPos: Math.max(0, ns.RhPos + diff)
                                        };
                                    });
                                }
                            }

                            for (let i = allDates.length - 2; i >= 0; i--) {
                                let currD = allDates[i];
                                let nextD = allDates[i+1];
                                
                                if (!tempStore[currD].stock.some(s => s.PRC > 0 || s.RhPos > 0) && tempStore[nextD].stock.some(s => s.PRC > 0 || s.RhPos > 0)) {
                                    tempStore[currD].stock = tempStore[nextD].stock.map(ns => {
                                        let stat = tempStore[nextD].stats.find(s => s.group === ns.group) || {receive: 0, issue: 0};
                                        let diff = stat.issue - stat.receive; 
                                        return {
                                            ...ns,
                                            PRC: Math.max(0, ns.PRC + Math.floor(diff * 0.5)),
                                            LPRC: Math.max(0, ns.LPRC + Math.ceil(diff * 0.5)),
                                            RhPos: Math.max(0, ns.RhPos + diff)
                                        };
                                    });
                                }
                            }
                            // ตรวจสอบและอัปเดตเกณฑ์แผน 1, 5, 7 วัน
                            checkAndUpdateThresholds();

                            // บันทึกข้อมูลลงในเครื่อง (Local Storage)
                            localStorage.setItem('bloodBankDataStore', JSON.stringify(dataStore));

                            // 🚀 บันทึกข้อมูลขึ้นคลาวด์ เพื่อกระจายข้อมูลให้เครื่องอื่นๆ เห็นตรงกัน
                            saveToCloud();

                            // หาวันที่ล่าสุดที่เพิ่งอัปโหลดเสร็จ
                            const finalDates = Object.keys(dataStore).sort();
                            const latestDate = finalDates[finalDates.length - 1];
                            
                            // เปลี่ยนหน้าเว็บให้แสดงข้อมูลของวันที่ล่าสุดอัตโนมัติ
                            document.getElementById('reportDate').value = latestDate;
                            handleDateChange(latestDate);
                            
                            const thaiTimeOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' };
                            const timeString = new Date().toLocaleTimeString('th-TH', thaiTimeOptions);
                            const formattedDateText = document.getElementById('custom-date-display').innerText;
                            
                            document.getElementById('last-update-time').innerText = `${formattedDateText} (อัปเดตเวลา ${timeString} น.)`;
                            
                            const foundDates = Object.keys(clearedDates).sort().map(d => new Date(d).toLocaleDateString('th-TH', {day: 'numeric', month:'short', timeZone: 'Asia/Bangkok'})).join(', ');
                            
                            if (missingCategories.length === 0) {
                                showUploadAlert('อัปโหลดข้อมูลสำเร็จ!', `อัปเดตและบันทึกข้อมูลของวันที่: <b>${foundDates}</b> เรียบร้อยแล้ว`, 'success');
                            }
                            
                            event.target.value = '';
                            
                            if (WEBHOOK_URL && WEBHOOK_URL.trim() !== "") {
                                setTimeout(() => { sendLineImageAlert(true); }, 500);
                            }
                        }
                    }
                });
            });
        }

        // ==========================================
        // ส่งต่อฟังก์ชันให้ใช้งานผ่าน HTML แบบคลิก (Global Scope)
        // ==========================================
        window.switchTab = switchTab;
        window.toggleAutoPlay = toggleAutoPlay;
        window.updateAutoPlayInterval = updateAutoPlayInterval;
        window.handleDateChange = handleDateChange;
        window.processFiles = processFiles;
        window.setFilter = setFilter;
        window.sendLineImageAlert = sendLineImageAlert;

        window.addEventListener('DOMContentLoaded', initApp);

    </script>
</body>
</html>