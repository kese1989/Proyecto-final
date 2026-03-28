// ==================== DATOS DE PLANTAS COLOMBIANAS ====================
const plantas = {
    ituango: { nombre: "Hidroituango", anio: 2018, capacidad: "2400 MW", ciudades: "Antioquia", importancia: "La más grande de Colombia", imagen: "imagenes/hidroituango.jpg" },
    guatape: { nombre: "Guatapé", anio: 1979, capacidad: "560 MW", ciudades: "Antioquia", importancia: "Regulación eléctrica", imagen: "imagenes/guatape.jpg" },
    chivor: { nombre: "Chivor", anio: 1982, capacidad: "1000 MW", ciudades: "Cundinamarca", importancia: "Energía central", imagen: "imagenes/chivor.jpg" },
    sancarlos: { nombre: "San Carlos", anio: 1984, capacidad: "1240 MW", ciudades: "Antioquia", importancia: "Clave nacional", imagen: "imagenes/san-carlos.jpg" },
    betania: { nombre: "Betania", anio: 1987, capacidad: "540 MW", ciudades: "Huila", importancia: "Región sur", imagen: "imagenes/betania.jpg" },
    porce: { nombre: "Porce III", anio: 2011, capacidad: "660 MW", ciudades: "Antioquia", importancia: "Moderna", imagen: "imagenes/porce.jpg" }
};

// ==================== FUNCIONES DE NAVEGACIÓN ====================
function showSection(id) {
    const sections = document.querySelectorAll(".tab");
    if (sections.length > 0) {
        sections.forEach(e => e.classList.remove("active"));
    }
    const targetSection = document.getElementById(id);
    if (targetSection) {
        targetSection.classList.add("active");
    }
}

function showPlant(key) {
    const p = plantas[key];
    const plantInfo = document.getElementById("plantInfo");
    if (plantInfo && p) {
        plantInfo.innerHTML = `
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                <div style="flex: 1;">
                    <h4 style="margin-bottom: 20px;">💧 ${p.nombre}</h4>
                    <p><strong>Año de operación:</strong> ${p.anio}</p>
                    <p><strong>Capacidad instalada:</strong> ${p.capacidad}</p>
                    <p><strong>Ubicación:</strong> ${p.ciudades}</p>
                    <p><strong>Importancia:</strong> ${p.importancia}</p>
                </div>
                <div style="flex-shrink: 0;">
                    <img src="${p.imagen}" alt="${p.nombre}" style="
                        width: 320px;
                        height: auto;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    ">
                </div>
            </div>
            <hr>
            <small>💡 La hidroenergía representa el 70% de la matriz eléctrica colombiana</small>
        `;
    }
}

// ==================== DATOS HIDROENERGÍA DESDE 1965 ====================
const datosBarra = {
    hidro: 4280,
    eolica: 2100,
    solar: 1300,
    bio: 680,
    geotermica: 95
};

const datosCapacidad = {
    años: [1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022],
    hidro: [210, 320, 380, 480, 540, 620, 690, 780, 870, 980, 1100, 1320, 1410],
    eolica: [0, 0, 0, 0.5, 1, 2, 4, 17, 59, 198, 432, 733, 906],
    solar: [0, 0, 0, 0, 0, 0.1, 0.2, 1, 5, 40, 227, 707, 1053]
};

const datosArea = {
    años: [1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022],
    hidro: [780, 1050, 1180, 1350, 1580, 1850, 2150, 2550, 2850, 3280, 3750, 4150, 4280],
    otrasRenovables: [15, 50, 65, 80, 95, 150, 180, 250, 380, 520, 1050, 2050, 2820],
    convencional: [5200, 7800, 8900, 9200, 10100, 11500, 12500, 12800, 13800, 14800, 16200, 15800, 15600]
};

const datosParticipacionGlobal = {
    hidro: 16.2,
    eolica: 7.2,
    solar: 4.0,
    otrasRenovables: 2.1,
    convencionales: 70.5
};

// ==================== VARIABLES DE GRÁFICOS ====================
let barChart, pieChart, lineChart, areaChart;

// ==================== INICIALIZACIÓN DE GRÁFICOS ====================
function inicializarGraficos() {
    const barCanvas = document.getElementById('barChart');
    const pieCanvas = document.getElementById('pieChart');
    const lineCanvas = document.getElementById('lineChart');
    const areaCanvas = document.getElementById('areaChart');
    
    if (!barCanvas || !pieCanvas || !lineCanvas || !areaCanvas) {
        console.error("No se encontraron los canvas para los gráficos");
        return;
    }
    
    barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ['💧 Hidroeléctrica', '🌬️ Eólica', '☀️ Solar', '🔥 Biocombustibles', '🌋 Geotérmica'],
            datasets: [{
                label: 'Producción mundial (TWh) - 2022',
                data: [datosBarra.hidro, datosBarra.eolica, datosBarra.solar, datosBarra.bio, datosBarra.geotermica],
                backgroundColor: ['#1e3a8a', '#22c55e', '#facc15', '#ef4444', '#8b5cf6'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: { callbacks: { label: (ctx) => `${ctx.raw.toLocaleString()} TWh` } }
            },
            scales: { y: { title: { display: true, text: 'Teravatios-hora (TWh)' } } }
        }
    });

    pieChart = new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: ['💧 Hidroeléctrica (16.2%)', '🌬️ Eólica (7.2%)', '☀️ Solar (4.0%)', '🔥 Otras (2.1%)', '⚫ Convencionales (70.5%)'],
            datasets: [{
                data: [datosParticipacionGlobal.hidro, datosParticipacionGlobal.eolica, datosParticipacionGlobal.solar, datosParticipacionGlobal.otrasRenovables, datosParticipacionGlobal.convencionales],
                backgroundColor: ['#1e3a8a', '#22c55e', '#facc15', '#ef4444', '#64748b']
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'right' } }
        }
    });

    lineChart = new Chart(lineCanvas, {
        type: 'line',
        data: {
            labels: datosCapacidad.años.map(a => a.toString()),
            datasets: [
                { label: '💧 Hidroeléctrica (GW)', data: datosCapacidad.hidro, borderColor: '#1e3a8a', tension: 0.3, borderWidth: 3, fill: false },
                { label: '🌬️ Eólica (GW)', data: datosCapacidad.eolica, borderColor: '#22c55e', tension: 0.3, fill: false },
                { label: '☀️ Solar (GW)', data: datosCapacidad.solar, borderColor: '#facc15', tension: 0.3, fill: false }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} GW` } }
            }
        }
    });

    areaChart = new Chart(areaCanvas, {
        type: 'line',
        data: {
            labels: datosArea.años.map(a => a.toString()),
            datasets: [
                { label: '💧 Hidroenergía (TWh)', data: datosArea.hidro, borderColor: '#1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.3)', fill: true, tension: 0.3 },
                { label: '🌱 Otras Renovables (TWh)', data: datosArea.otrasRenovables, borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.2)', fill: true, tension: 0.3 },
                { label: '⚫ Convencional (TWh)', data: datosArea.convencional, borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', fill: true, tension: 0.3 }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toLocaleString()} TWh` } }
            }
        }
    });
    
    console.log("✅ Gráficos inicializados");
}

// ==================== DATOS HISTÓRICOS POR PAÍS ====================
let datosConsumo = {};
let datosParticipacionPais = {};
let paisesLista = [];
let datosCargados = 0;

// Función para unificar países (versión mejorada con más nombres)
function unificarPais(nombre) {
    const unificaciones = {
        // África
        "Africa": "África",
        "Africa (BP)": "África",
        
        // Estados Unidos
        "United States": "Estados Unidos",
        "United States of America": "Estados Unidos",
        "USA": "Estados Unidos",
        
        // Reino Unido
        "UK": "Reino Unido",
        "United Kingdom": "Reino Unido",
        
        // Argentina
        "Argentine": "Argentina",
        "Argentine Republic": "Argentina",
        
        // Brasil
        "Brazil": "Brasil",
        
        // México
        "Mexico": "México",
        
        // Alemania
        "Germany": "Alemania",
        "Federal Republic of Germany": "Alemania",
        
        // Francia
        "France": "Francia",
        
        // España
        "Spain": "España",
        
        // China
        "China": "China",
        "People's Republic of China": "China",
        
        // India
        "India": "India",
        
        // Canadá
        "Canada": "Canadá",
        
        // Australia
        "Australia": "Australia",
        
        // Japón
        "Japan": "Japón",
        
        // Corea del Sur
        "South Korea": "Corea del Sur",
        "Korea": "Corea del Sur",
        
        // Rusia
        "Russia": "Rusia",
        "Russian Federation": "Rusia",
        
        // Italia
        "Italy": "Italia",
        
        // Países Bajos
        "Netherlands": "Países Bajos",
        
        // Suecia
        "Sweden": "Suecia",
        
        // Noruega
        "Norway": "Noruega",
        
        // Suiza
        "Switzerland": "Suiza",
        
        // Turquía
        "Turkey": "Turquía",
        
        // Indonesia
        "Indonesia": "Indonesia",
        
        // Pakistán
        "Pakistan": "Pakistán",
        
        // Nigeria
        "Nigeria": "Nigeria",
        
        // Egipto
        "Egypt": "Egipto",
        
        // Sudáfrica
        "South Africa": "Sudáfrica"
    };
    
    return unificaciones[nombre] || nombre;
}

// Cargar archivos CSV con los nombres correctos
function cargarDatosCSV() {
    console.log("📂 Intentando cargar archivos CSV...");
    
    const selector = document.getElementById("paisSelector");
    if (selector) {
        selector.innerHTML = '<option value="">Cargando países...</option>';
    }
    
    const rutaConsumo = "data/05 hydropower-consumption.csv";
    const rutaParticipacion = "data/07 share-electricity-hydro.csv";
    
    console.log("🔍 Buscando:", rutaConsumo);
    console.log("🔍 Buscando:", rutaParticipacion);
    
    Papa.parse(rutaConsumo, {
        download: true,
        header: true,
        complete: function(results) {
            console.log("✅ Archivo encontrado:", rutaConsumo);
            console.log("📄 Filas:", results.data.length);
            procesarDatosConsumo(results.data);
            datosCargados++;
            verificarCargaCompleta();
        },
        error: function(error) {
            console.error("❌ No se encontró:", rutaConsumo);
            mostrarErrorSelector();
        }
    });
    
    Papa.parse(rutaParticipacion, {
        download: true,
        header: true,
        complete: function(results) {
            console.log("✅ Archivo encontrado:", rutaParticipacion);
            console.log("📄 Filas:", results.data.length);
            procesarDatosParticipacionPais(results.data);
            datosCargados++;
            verificarCargaCompleta();
        },
        error: function(error) {
            console.error("❌ No se encontró:", rutaParticipacion);
            mostrarErrorSelector();
        }
    });
}

function verificarCargaCompleta() {
    if (datosCargados === 2) {
        console.log("✅ Ambos archivos cargados correctamente");
        actualizarListaPaises();
    }
}

function mostrarErrorSelector() {
    const selector = document.getElementById("paisSelector");
    if (selector && selector.innerHTML === '<option value="">Cargando países...</option>') {
        selector.innerHTML = '<option value="">Error: No se encontraron los archivos CSV</option>';
    }
}

// Procesar datos de consumo (formato: Entity, Code, Year, Electricity from hydro (TWh))
function procesarDatosConsumo(data) {
    if (!data || data.length === 0) {
        console.warn("⚠️ No hay datos en hydropower-consumption.csv");
        return;
    }
    
    console.log("📄 Procesando archivo de consumo...");
    
    data.forEach(row => {
        let pais = row.Entity;
        const año = row.Year;
        const valor = parseFloat(row["Electricity from hydro (TWh)"]);
        
        if (!pais || !año) return;
        
        // Unificar países
        pais = unificarPais(pais);
        
        if (!datosConsumo[pais]) {
            datosConsumo[pais] = {};
        }
        
        if (!isNaN(valor) && valor > 0) {
            // Si ya existe un valor para ese año, tomar el mayor
            if (datosConsumo[pais][año] !== undefined) {
                if (valor > datosConsumo[pais][año]) {
                    datosConsumo[pais][año] = valor;
                }
            } else {
                datosConsumo[pais][año] = valor;
            }
        }
    });
    
    console.log("🌍 Países con datos de consumo:", Object.keys(datosConsumo).length);
}

// Procesar datos de participación (formato: Entity, Code, Year, Hydro (% electricity))
function procesarDatosParticipacionPais(data) {
    if (!data || data.length === 0) {
        console.warn("⚠️ No hay datos en share-electricity-hydro.csv");
        return;
    }
    
    console.log("📄 Procesando archivo de participación...");
    
    data.forEach(row => {
        let pais = row.Entity;
        const año = row.Year;
        const valor = parseFloat(row["Hydro (% electricity)"]);
        
        if (!pais || !año) return;
        
        // Unificar países
        pais = unificarPais(pais);
        
        if (!datosParticipacionPais[pais]) {
            datosParticipacionPais[pais] = {};
        }
        
        if (!isNaN(valor) && valor > 0) {
            // Si ya existe un valor para ese año, tomar el mayor
            if (datosParticipacionPais[pais][año] !== undefined) {
                if (valor > datosParticipacionPais[pais][año]) {
                    datosParticipacionPais[pais][año] = valor;
                }
            } else {
                datosParticipacionPais[pais][año] = valor;
            }
        }
    });
    
    console.log("🌍 Países con datos de participación:", Object.keys(datosParticipacionPais).length);
}

// Actualizar lista de países en el selector
function actualizarListaPaises() {
    const paisesConsumo = Object.keys(datosConsumo);
    const paisesParticipacion = Object.keys(datosParticipacionPais);
    
    const todosPaises = [...new Set([...paisesConsumo, ...paisesParticipacion])];
    todosPaises.sort();
    
    paisesLista = todosPaises;
    
    const selector = document.getElementById("paisSelector");
    if (selector) {
        if (paisesLista.length > 0) {
            selector.innerHTML = '<option value="">-- Selecciona un país --</option>' +
                paisesLista.map(pais => `<option value="${pais}">${pais}</option>`).join('');
            console.log(`✅ ${paisesLista.length} países disponibles`);
        } else {
            selector.innerHTML = '<option value="">No se encontraron datos</option>';
            console.error("❌ No se encontraron países");
        }
    }
}

// Cargar datos del país seleccionado
function cargarDatosPais() {
    const selector = document.getElementById("paisSelector");
    const pais = selector.value;
    const tbody = document.querySelector("#dataTable tbody");
    
    if (!pais || !tbody) return;
    
    console.log(`🔍 Cargando datos para: "${pais}"`);
    
    // Mostrar información de depuración
    console.log(`📊 ¿Tiene datos de consumo?`, datosConsumo[pais] ? `SÍ (${Object.keys(datosConsumo[pais]).length} años)` : "NO");
    console.log(`📊 ¿Tiene datos de participación?`, datosParticipacionPais[pais] ? `SÍ (${Object.keys(datosParticipacionPais[pais]).length} años)` : "NO");
    
    // LIMPIAR la tabla antes de cargar nuevos datos
    tbody.innerHTML = '<tr><td colspan="3" class="text-center">Cargando datos...</td></tr>';
    
    const añosConsumo = datosConsumo[pais] ? Object.keys(datosConsumo[pais]) : [];
    const añosParticipacion = datosParticipacionPais[pais] ? Object.keys(datosParticipacionPais[pais]) : [];
    const todosAños = [...new Set([...añosConsumo, ...añosParticipacion])];
    todosAños.sort((a, b) => parseInt(a) - parseInt(b));
    
    if (todosAños.length === 0) {
        // Buscar nombres similares para sugerir
        const nombresSimilares = paisesLista.filter(p => 
            p.toLowerCase().includes(pais.toLowerCase()) || 
            pais.toLowerCase().includes(p.toLowerCase())
        );
        
        let mensaje = `No hay datos disponibles para "${pais}"`;
        if (nombresSimilares.length > 0 && nombresSimilares[0] !== pais) {
            mensaje += `. ¿Quisiste decir: ${nombresSimilares.slice(0, 3).join(", ")}?`;
        }
        
        tbody.innerHTML = `<tr><td colspan="3" class="text-center">${mensaje}</td></tr>`;
        console.warn(`⚠️ No hay datos para "${pais}"`);
        if (nombresSimilares.length > 0) {
            console.log(`💡 Posibles alternativas:`, nombresSimilares.slice(0, 5));
        }
        return;
    }
    
    let filas = "";
    
    todosAños.forEach(año => {
        const consumo = datosConsumo[pais] ? datosConsumo[pais][año] : null;
        const participacion = datosParticipacionPais[pais] ? datosParticipacionPais[pais][año] : null;
        
        filas += `
            <tr>
                <td><strong>${año}</strong></td>
                <td class="text-primary fw-bold">${consumo !== null ? consumo.toLocaleString() + " TWh" : "—"}</td>
                <td class="text-primary fw-bold">${participacion !== null ? participacion.toFixed(2) + "%" : "—"}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = filas;
    console.log(`✅ ${todosAños.length} años de datos cargados para "${pais}"`);
}

// ==================== CALCULADORA ====================
function calcularHidroenergia() {
    const consumoInput = document.getElementById("consumoInput");
    const resultadoDiv = document.getElementById("resultadoCalculadora");
    
    const consumo = parseFloat(consumoInput.value);
    
    if (isNaN(consumo) || consumo <= 0) {
        resultadoDiv.innerHTML = `<strong>⚠️ Error:</strong> Ingresa un valor válido mayor a 0.`;
        resultadoDiv.className = "alert alert-danger";
        return;
    }
    
    const porcentajeHidroMundial = 16.2;
    const porcentajeHidroColombia = 70;
    const coberturaMundial = (consumo * porcentajeHidroMundial) / 100;
    const coberturaColombia = (consumo * porcentajeHidroColombia) / 100;
    
    resultadoDiv.innerHTML = `
        <div class="text-center">
            <h5 class="text-primary">💧 Energía Hidroeléctrica</h5>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="card p-3 bg-light border-primary">
                        <strong>🌎 Promedio mundial</strong>
                        <span class="display-6 text-primary">${porcentajeHidroMundial}%</span>
                        <hr>
                        <strong>💧 Energía necesaria:</strong>
                        <span class="h3 text-primary">${coberturaMundial.toFixed(0)} kWh/mes</span>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card p-3 bg-success bg-opacity-10 border-success">
                        <strong>🇨🇴 Colombia</strong>
                        <span class="display-6 text-success">${porcentajeHidroColombia}%</span>
                        <hr>
                        <strong>💧 Energía necesaria:</strong>
                        <span class="h3 text-success">${coberturaColombia.toFixed(0)} kWh/mes</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    resultadoDiv.className = "alert alert-light border-primary";
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Inicializando proyecto Hidroenergía...");
    
    inicializarGraficos();
    cargarDatosCSV();
    showSection('historia');
    
    console.log("✅ Proyecto listo");
});