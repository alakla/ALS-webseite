
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(response => response.text())
    .then(data => {
      const header = document.getElementById("header");
      if (header) {
        header.innerHTML = data;

        const dropdown = header.querySelector('.dropdown');
        const dropdownToggle = dropdown?.querySelector('.dropdown-toggle');
        const menuToggle = header.querySelector('.menu-toggle');
        const headerNav = header.querySelector('.header-nav');

        if (menuToggle && headerNav) {
          menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            headerNav.classList.toggle('open');
          });
        }

        
        if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
}


      
        document.addEventListener('click', (e) => {
        
          if (headerNav && !headerNav.contains(e.target)) {
            headerNav.classList.remove('open');
          }

          
          if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
          }
        });

        
        document.addEventListener('touchstart', (e) => {
          if (headerNav && !headerNav.contains(e.target)) {
            headerNav.classList.remove('open');
          }
          if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
          }
        }, { passive: true });
      }
    });

  
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      const footer = document.getElementById("footer");
      if (footer) {
        footer.innerHTML = data;
      }
    });
});


  document.addEventListener('DOMContentLoaded', () => {
    
    const spans = document.querySelectorAll('.span');
    const serviceBoxes = document.querySelectorAll('.service-box');

    
    function observeWithDelay(elements, delayStep = 200) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            const index = Array.from(elements).indexOf(el);
            const delay = index * delayStep/4;

            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
          } else {
            
            el.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.2
      });

      
      elements.forEach(el => observer.observe(el));
    }


    observeWithDelay(spans, 200);         // عناصر .span بتأخير 200ms
    observeWithDelay(serviceBoxes, 300);  // عناصر .service-box بتأخير 300ms
  });

    document.querySelectorAll('.menu li a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

  
    document.addEventListener("DOMContentLoaded", () => {
  const personalForm = document.getElementById("personalForm");
  const bewerberForm = document.getElementById("bewerberForm");
  const transportForm = document.getElementById("transportformular");
  if (personalForm) {
    personalForm.reset();
  }

  if (bewerberForm) {
    bewerberForm.reset();
  }

  if (transportForm) {
    transportForm.reset();
  }

  
  updateCharCount?.();
});



//Bewerberformular
 document.addEventListener("DOMContentLoaded", () => {
 const form = document.getElementById('bewerberForm');
  const danke = document.getElementById('dankeNachricht');

if (form && danke) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

  
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

    
console.log("Formular wird abgeschickt...");


    
    const data = Object.fromEntries(new FormData(form)); 
    const formData = new FormData(form);
    const lebenslaufDatei = form.querySelector('input[name="lebenslauf"]').files[0];


    const validation = validateBewerberForm(data, lebenslaufDatei);
  console.log(validation);
   if (!validation.isValid) {
      Object.values(validation.errors).flat().forEach(err => {

      const msg = err;
      const keywordsToField = [
        { keyword: "Anrede", name: "anrede" },
        { keyword: "Vorname", name: "vorname" },
        { keyword: "Nachname", name: "nachname" },
        { keyword: "E-Mail", name: "email" },
        { keyword: "Telefonnummer", name: "telefon" },
         { keyword: "Beruf", name: "beruf" },
        { keyword: "Starttermin", name: "verfuegbar" },
        { keyword: "Lebenslauf", name: "lebenslauf" },
        { keyword: "Datenschutz", name: "datenschutz" }
      ];

      const match = keywordsToField.find(k => msg.includes(k.keyword));
      if (match) {
        const input = form.querySelector(`[name="${match.name}"]`);
        if (input) {
          input.classList.add("input-error");
          const errorMsg = document.createElement("div");
          errorMsg.className = "error-message";
          errorMsg.textContent = msg;
          input.insertAdjacentElement("afterend", errorMsg);
        }
      }
    });

    return;
  }  

    fetch('/bewerbung', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        danke.textContent = 'Vielen Dank für Ihre Bewerbung! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.';
        danke.style.display = 'block';
        danke.style.color = "";
      } else {
        danke.textContent = 'Fehler beim Senden der Bewerbung.';
        danke.style.display = 'block';
        danke.style.color = 'red';
      }
    })
    .catch(error => {
      console.error('Fehler:', error);
      danke.textContent = 'Fehler beim Senden der Bewerbung.';
      danke.style.display = 'block';
      danke.style.color = 'red';
    });
  }); 
}

});

// Personalanfrage-Formular
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('personalForm');
  const dankeBox = document.getElementById('dankeNachricht2');
  const anforderungen = document.getElementById('anforderungen');
  const charCount = document.getElementById('charCount');
  const maxLength = 1000;
  
  const anzahlInput = document.querySelector('input[name="anzahl"]');
anzahlInput.addEventListener("input", () => {
  if (anzahlInput.value.length > 2) {
    anzahlInput.value = anzahlInput.value.slice(0, 2);
  }
});

  function updateCharCount() {
    const currentLength = anforderungen?.value?.length || 0;
    const remaining = maxLength - currentLength;
    if (charCount) {
      charCount.textContent = `${remaining} Zeichen verbleibend`;
      charCount.style.color = remaining <= 0 ? "red" : "white";
    }
  
  if (currentLength >= maxLength) {
    anforderungen.value = anforderungen.value.slice(0, maxLength);
  }
  }

  if (anforderungen) {
    anforderungen.setAttribute("maxlength", maxLength);
    anforderungen.addEventListener("input", updateCharCount);
    updateCharCount(); 
  }

  if (form && dankeBox) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

          const data = Object.fromEntries(new FormData(form));
          const formData = new FormData(form);
      
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

        const validation = validatePersonalForm(data);

           if (!validation.isValid) {
      validation.errors.forEach(err => {
      const msg = err;
      const keywordsToField = [
        { keyword: "Anrede", name: "anrede" },
        { keyword: "Vorname", name: "vorname" },
        { keyword: "Nachname", name: "nachname" },
        { keyword: "Firmenname", name: "firma" },
        { keyword: "Straße", name: "strasse" },
        { keyword: "PLZ", name: "plz" },
        { keyword: "Ort", name: "ort" },
        { keyword: "E-Mail", name: "email" },
        { keyword: "Telefonnummer", name: "telefon" },
        { keyword: "Stellentitel", name: "titel" },
        { keyword: "Anzahl", name: "anzahl" },
        { keyword: "Starttermin", name: "starttermin" },
        { keyword: "Enddatum", name: "bis" },
        { keyword: "Anforderungen", name: "anforderungen" },
        { keyword: "Datenschutz", name: "datenschutz" }
      ];

      const match = keywordsToField.find(k => msg.includes(k.keyword));
      if (match) {
        const input = form.querySelector(`[name="${match.name}"]`);
        if (input) {
          input.classList.add("input-error");
          const errorMsg = document.createElement("div");
          errorMsg.className = "error-message";
          errorMsg.textContent = msg;
          input.insertAdjacentElement("afterend", errorMsg);
        }
      }
    });

    return;
  } 
  

      fetch("/personal-anfrage", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.ok) {
            form.reset();
            updateCharCount();

            dankeBox.textContent = "Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.";
            dankeBox.style.display = "block";
            dankeBox.style.color = "";
          } else {
            throw new Error("Fehler beim Senden");
          }
        })
        .catch(error => {
          console.error("Fehler:", error);
          dankeBox.textContent = "Fehler beim Senden der Anfrage.";
          dankeBox.style.display = "block";
          dankeBox.style.color = "red";
        });
    });
  }
});


// Transportanfrage-Formular
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('transportformular');
  const dankeBox = document.getElementById('dankeNachricht3');
  const gegenstaende = document.getElementById('gegenstaende');
  const charCount = document.getElementById('charCount');
  const maxLength = 1000;
  
  function updateCharCount() {
    const currentLength = gegenstaende?.value?.length || 0;
    const remaining = maxLength - currentLength;
    if (charCount) {
      charCount.textContent = `${remaining} Zeichen verbleibend`;
      charCount.style.color = remaining <= 0 ? "red" : "white";
    }
  
  if (currentLength >= maxLength) {
    gegenstaende.value = gegenstaende.value.slice(0, maxLength);
  }
  }

  if (gegenstaende) {
    gegenstaende.setAttribute("maxlength", maxLength);
    gegenstaende.addEventListener("input", updateCharCount);
    updateCharCount();
  }



  if (form && dankeBox) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

          const data = Object.fromEntries(new FormData(form));
          const formData = new FormData(form); 
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

        const validation = validateTransportForm(data);

           if (!validation.isValid) {
      validation.errors.forEach(err => {
      const msg = err;
      const keywordsToField = [
        { keyword: "Anrede", name: "anrede" },
        { keyword: "Vorname", name: "vorname" },
        { keyword: "Nachname", name: "nachname" },
        { keyword: "E-Mail", name: "email" },
        { keyword: "Telefonnummer", name: "telefon" },
        { keyword: "Adresse(von)", name: "von" },
        { keyword: "Adresse(nach)", name: "nach" },
        { keyword: "Datum", name: "datum" },
        { keyword: "Gegenstände", name: "gegenstaende" },
        { keyword: "Datenschutz", name: "datenschutz" }
      ];

      const match = keywordsToField.find(k => msg.includes(k.keyword));
      if (match) {
        const input = form.querySelector(`[name="${match.name}"]`);
        if (input) {
          input.classList.add("input-error");
          const errorMsg = document.createElement("div");
          errorMsg.className = "error-message";
          errorMsg.textContent = msg;
          input.insertAdjacentElement("afterend", errorMsg);
        }
      }
    });

    return;
  }  


      fetch("/transport", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.ok) {
            form.reset();
            updateCharCount();

            dankeBox.textContent = "Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.";
            dankeBox.style.display = "block";
            dankeBox.style.color = "";
          } else {
            throw new Error("Fehler beim Senden");
          }
        })
        .catch(error => {
          console.error("Fehler:", error);
          dankeBox.textContent = "Fehler beim Senden der Anfrage.";
          dankeBox.style.display = "block";
          dankeBox.style.color = "red";
        });
    });
  }
});


function validatePersonalForm(data) {
const errors = [];
const heute = new Date();
heute.setHours(0, 0, 0, 0);
const startDate = parseDate(data.starttermin);
const bisDate = parseDate(data.bis);

  const textIsValid = (val, min = 1, max = 50) =>
  val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;


  const regex = {
    plz: /^\d{5}$/,
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/,
    anzahl: /^(?:[1-9]|[1-9][0-9])$/,
  };

  // Anrede
  if (!["Herr", "Frau"].includes(data.anrede)) {
    errors.push("Ungültige Anrede.");
  }

// Textfelder
  if (!textIsValid(data.vorname, 2, 50)) errors.push("Vorname muss zwischen 2 und 50 Zeichen lang sein.");
  if (!textIsValid(data.nachname, 2, 50)) errors.push("Nachname muss zwischen 2 und 50 Zeichen lang sein.");
  if (!textIsValid(data.firma, 2, 100)) errors.push("Firmenname muss zwischen 2 und 100 Zeichen lang sein.");
  if (!textIsValid(data.strasse, 2, 100)) errors.push("Straße muss zwischen 2 und 100 Zeichen lang sein.");
  if (!textIsValid(data.ort, 2, 50)) errors.push("Ort muss zwischen 2 und 50 Zeichen lang sein.");
  if (!textIsValid(data.titel, 2, 100)) errors.push("Stellentitel muss zwischen 2 und 100 Zeichen lang sein.");

  // PLZ
  if (!regex.plz.test(data.plz)) {
    errors.push("PLZ muss genau 5 Ziffern enthalten.");
  }

  // E-Mail
  if (!regex.email.test(data.email)) {
    errors.push("E-Mail ist ungültig.");
  }

  // Telefonnummer
  if(data.telefon){
  const telefon = data.telefon.replace(/\s|-/g, "");
  if (!regex.telefon.test(telefon)) {
    errors.push("Telefonnummer ist ungültig.");
   }
  }

  // Anzahl der Mitarbeiter (jetzt Text mit Pattern-Prüfung für 1–99)
if (!regex.anzahl.test(data.anzahl.trim())) {
  errors.push("Anzahl der Mitarbeiter muss eine Zahl zwischen 1 und 99 sein.");
}



// Starttermin prüfen
if (!istGueltigesDatum(data.starttermin)) {
  errors.push("Starttermin ist kein gültiges Datum.");
} else if (startDate < heute) {
    errors.push("Starttermin darf nicht in der Vergangenheit liegen.");
  }

// Bis prüfen (optional)
if (data.bis) {
  
  if (!istGueltigesDatum(data.bis)) {
    errors.push("Enddatum (bis) ist kein gültiges Datum.");
  }
  else if (bisDate < heute) {
    errors.push("Enddatum (bis) darf nicht in der Vergangenheit liegen.");
  }
  else if (bisDate < startDate) {
    errors.push("Enddatum (bis) darf nicht vor dem Startdatum liegen.");
  }
}

  // Anforderungen
  if (!textIsValid(data.anforderungen, 10, 1000)) {
    errors.push("Anforderungen muss zwischen 10 und 1000 Zeichen lang sein.");
  }

  // Datenschutz
  if (data.datenschutz !== "on") {
    errors.push("Datenschutz muss akzeptiert werden.");
  }

  // Ergebnis zurückgeben
  return {
    isValid: errors.length === 0,
    errors,
  };
}

 function validateBewerberForm(data, lebenslaufDatei) {
  const errors = [];

  const textIsValid = (val, min = 1, max = 50) =>
  val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;


  const regex = {
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/,
  };

  if (!["Herr", "Frau"].includes(data.anrede)) {errors.push("Ungültige Anrede.");}
  if (!textIsValid(data.vorname, 2, 50)) {errors.push("Vorname muss zwischen 2 und 50 Zeichen lang sein.");}
  if (!textIsValid(data.nachname, 2, 50)) {errors.push("Nachname muss zwischen 2 und 50 Zeichen lang sein.");}
  if (!textIsValid(data.beruf, 2, 100)) errors.push("Beruf muss zwischen 2 und 100 Zeichen lang sein.");
  if (!regex.email.test(data.email)) {
    errors.push("E-Mail ist ungültig.");
  }
  // Telefonnummer
  if(data.telefon){
  const telefon = data.telefon.replace(/\s|-/g, "");
  if (!regex.telefon.test(telefon)) {
    errors.push("Telefonnummer ist ungültig.");
   }
  }

const heute = new Date();
heute.setHours(0, 0, 0, 0);

// Starttermin prüfen
if (!istGueltigesDatum(data.verfuegbar)) {
  errors.push("Starttermin ist kein gültiges Datum.");
} else {
  const startDate = parseDate(data.verfuegbar);
  if (startDate < heute) {
    errors.push("Starttermin darf nicht in der Vergangenheit liegen.");
  }
}
  if (data.datenschutz !== "on") {
    errors.push("Datenschutz muss akzeptiert werden.");
  }


    if (!lebenslaufDatei) {
  errors.push("Bitte laden Sie einen Lebenslauf hoch.");
} else{

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExt = lebenslaufDatei.name.toLowerCase().match(/\.\w+$/);
    const maxSize = 1 * 1024 * 1024; // 1MB

  
    if (!fileExt || !allowedExtensions.includes(fileExt[0])) {
    errors.push("Lebenslauf darf nur PDF, DOC oder DOCX-Datei sein.");
    }

  
    if (lebenslaufDatei.size > maxSize) {
      errors.push("Lebenslauf darf maximal 1MB groß sein.");
    }
    }


  return {
    isValid: errors.length === 0,
    errors,
  };
} 


function validateTransportForm(data) {
const errors = [];
const heute = new Date();
heute.setHours(0, 0, 0, 0);

  const textIsValid = (val, min = 1, max = 50) =>
  val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;


  const regex = {
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/,
  };

  // Anrede
  if (!["Herr", "Frau"].includes(data.anrede)) {
    errors.push("Ungültige Anrede.");
  }

  // Textfelder
  if (!textIsValid(data.vorname, 2, 50)) errors.push("Vorname muss zwischen 2 und 50 Zeichen lang sein.");
  if (!textIsValid(data.nachname, 2, 50)) errors.push("Nachname muss zwischen 2 und 50 Zeichen lang sein.");
  if (!textIsValid(data.von, 2, 100)) errors.push("Adresse(von) muss zwischen 2 und 100 Zeichen lang sein.");
  if (!textIsValid(data.nach, 2, 100)) errors.push("Adresse(nach) muss zwischen 2 und 100 Zeichen lang sein.");

  // E-Mail
  if (!regex.email.test(data.email)) {
    errors.push("E-Mail ist ungültig.");
  }

  // Telefonnummer
  if(data.telefon){
  const telefon = data.telefon.replace(/\s|-/g, "");
  if (!regex.telefon.test(telefon)) {
    errors.push("Telefonnummer ist ungültig.");
   }
  }


// Datum prüfen
if (!istGueltigesDatum(data.datum)) {
  errors.push("Datum ist ungültig.");
} else {
  const date = parseDate(data.datum);
  if (date < heute) {
    errors.push("Datum darf nicht in der Vergangenheit liegen.");
    }
  }

  // Gegenstände
  if (!textIsValid(data.gegenstaende, 10, 1000)) {
    errors.push("Die Gegenstände muss zwischen 10 und 1000 Zeichen lang sein.");
  }

  // Datenschutz
  if (data.datenschutz !== "on") {
    errors.push("Datenschutz muss akzeptiert werden.");
  }

  // Ergebnis zurückgeben
  return {
    isValid: errors.length === 0,
    errors,
  };
}


function istGueltigesDatum(datumStr) {

  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(datumStr)) return false;

  const [tag, monat, jahr] = datumStr.split('.').map(Number);

  if (monat < 1 || monat > 12 || tag < 1 || jahr < 1000) return false;

  const tageImMonat = new Date(jahr, monat, 0).getDate();
  return tag <= tageImMonat;
}

function parseDate(datumStr) {
  const [tag, monat, jahr] = datumStr.split('.').map(Number);
  return new Date(jahr, monat - 1, tag);
}


document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;

  const toggle = dropdown.querySelector('.dropdown-toggle');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});

