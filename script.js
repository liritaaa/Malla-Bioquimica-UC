const malla = [
  {
    semestre: "1º Semestre",
    ramos: [
      { id: "BIO101B", nombre: "Tópicos de Bioquímica" },
      { id: "BIO141C", nombre: "Biología de la Célula" },
      { id: "QIM101L", nombre: "Laboratorio de Química General" },
      { id: "QIM100L", nombre: "Química General I" },
      { id: "MAT1000", nombre: "Pre Cálculo" },
      { id: "FIL2001", nombre: "Filosofía: ¿Para qué?" },
      { id: "VRA2000", nombre: "Test de Inglés" },
      { id: "VRA1000", nombre: "Test de Comunicación" }
    ]
  },
  {
    semestre: "2º Semestre",
    ramos: [
      { id: "FIS109C", nombre: "Física para Ciencias" },
      { id: "FIS0109", nombre: "Laboratorio Física para Ciencias", prereq: ["FIS109C"] },
      { id: "QIM100B", nombre: "Química General II", prereq: ["QIM100L", "QIM101L"] },
      { id: "MAT1100", nombre: "Cálculo I", prereq: ["MAT1000"] },
      { id: "EFG1", nombre: "EFG 1" },
      { id: "EFG2", nombre: "EFG 2" }
    ]
  },
  {
    semestre: "3º Semestre",
    ramos: [
      { id: "BIO152C", nombre: "Bases Físicas de los Procesos Biológicos", prereq: ["FIS109C", "MAT1000", "QIM100L", "BIO141C"] },
      { id: "BIO242C", nombre: "Bioestadística", prereq: ["MAT1000"] },
      { id: "QIM102B", nombre: "Química Orgánica I", prereq: ["QIM100B"] },
      { id: "QIM109B", nombre: "Química Analítica I", prereq: ["QIM100B", "BIO242C"] },
      { id: "EFG3", nombre: "EFG 3" }
    ]
  },
  {
    semestre: "4º Semestre",
    ramos: [
      { id: "BIO151E", nombre: "Biología de los microrganismos", prereq: ["BIO141C"] },
      { id: "QIM103A", nombre: "Química Orgánica II", prereq: ["QIM102B"] },
      { id: "QIM111", nombre: "Análisis Instrumental", prereq: ["QIM109B"] },
      { id: "EFG4", nombre: "EFG 4" },
      { id: "EFG5", nombre: "EFG 5" }
    ]
  },
  {
    semestre: "5º Semestre",
    ramos: [
      { id: "BIO226E", nombre: "Genética y Evolución", prereq: ["BIO141C", "BIO242C"] },
      { id: "BIO225C", nombre: "Fisiología y Bioquímica Vegetal", prereq: ["BIO152C", "BIO151E"] },
      { id: "BIO274E", nombre: "Biología y Fisiología Celular", prereq: ["BIO152C", "BIO151E"] },
      { id: "BIO257C", nombre: "Bioquímica", prereq: ["BIO151E", "QIM103A"] },
      { id: "BIO266D", nombre: "Laboratorio Bioquímica I y Biología Celular", prereq: ["BIO151E", "QIM103A", "QIM111"] },
      { id: "QIM104A", nombre: "Laboratorio Química Orgánica", prereq: ["QIM103A"] },
      { id: "EFG6", nombre: "EFG 6" }
    ]
  },
  {
    semestre: "6º Semestre",
    ramos: [
      { id: "BIO288C", nombre: "Genética Molecular", prereq: ["BIO257C"] },
      { id: "BIO256C", nombre: "Laboratorio Bioquímica II Genética Molecular", prereq: ["BIO288C", "BIO257C", "BIO266D"] },
      { id: "BIO299E", nombre: "Fisiología", prereq: ["BIO152C", "BIO257C"] },
      { id: "BIO299L", nombre: "Laboratorio de Fisiología", prereq: ["BIO299E"] },
      { id: "QIM114B", nombre: "Química Física I", prereq: ["MAT1100"] },
      { id: "EFG7", nombre: "EFG 7" }
    ]
  },
  {
    semestre: "7º Semestre",
    ramos: [
      { id: "QIM115", nombre: "Química Física II", prereq: ["QIM114B"] },
      { id: "MEB176B", nombre: "Laboratorio Clínico", prereq: ["BIO266D", "BIO266E"] },
      { id: "BIO259A", nombre: "OPR Experiencia de Investigación", prereq: ["BIO266D"] },
      { id: "OPT", nombre: "Curso Optativo Licenciatura" }
    ]
  },
  {
    semestre: "8º Semestre",
    ramos: [
      { id: "OPT2", nombre: "Curso Optativo Licenciatura 2" }
    ]
  },
  {
    semestre: "9º Semestre",
    ramos: [
      { id: "BIO3319", nombre: "Técnicas Avanzadas en Bioquímica" },
      { id: "OPT5", nombre: "Curso Optativos de profundización para Título " }
    ]
  },
  {
    semestre: "10º Semestre",
    ramos: [
      { id: "BIO285D", nombre: "Memoria de Investigación" },
      { id: "BIO285E", nombre: "Memoria Profesional" }
    ]
  }
];

const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

function actualizarEstado() {
  document.querySelector("#malla").innerHTML = "";

  malla.forEach(semestre => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${semestre.semestre}</h2>`;

    semestre.ramos.forEach(ramo => {
      const r = document.createElement("div");
      r.className = "ramo";
      r.textContent = ramo.nombre;

      const tienePrerreq = ramo.prereq && ramo.prereq.some(id => !aprobados.has(id));
      if (aprobados.has(ramo.id)) {
        r.classList.add("aprobado");
      } else if (tienePrerreq) {
        r.classList.add("bloqueado");
      }

      r.onclick = () => {
        if (tienePrerreq) return;
        if (aprobados.has(ramo.id)) {
          aprobados.delete(ramo.id);
        } else {
          aprobados.add(ramo.id);
        }
        localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
        actualizarEstado();
      };

      div.appendChild(r);
    });

    document.querySelector("#malla").appendChild(div);
  });
}

actualizarEstado();
