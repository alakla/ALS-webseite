// تحميل العناصر المشتركة (header + footer)
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

        // ✅ افتح/اغلق القائمة الجانبية (menu)
        if (menuToggle && headerNav) {
          menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            headerNav.classList.toggle('open');
          });
        }

        // ✅ افتح/اغلق القائمة المنسدلة (dropdown)
        if (dropdown && dropdownToggle) {
  dropdownToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');

    // ✅ تحقق مما إذا كانت القائمة مفتوحة أو مغلقة
    /* if (dropdown.classList.contains('open')) {
      dropdown.classList.remove('open');  // أغلقها
    } else {
      dropdown.classList.add('open');     // افتحها
    } */
  });
}


        // ✅ إغلاق أي قائمة عند الضغط خارجها
        document.addEventListener('click', (e) => {
          // إذا لم يتم الضغط داخل القائمة الجانبية، أغلقها
          if (headerNav && !headerNav.contains(e.target)) {
            headerNav.classList.remove('open');
          }

          // إذا لم يتم الضغط داخل القائمة المنسدلة، أغلقها
          if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
          }
        });

        // ✅ دعم اللمس على الهاتف (مهم لهواتف أندرويد وآيفون)
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

  // تحميل الفوتر كالعادة
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
    // عناصر كل مجموعة
    const spans = document.querySelectorAll('.span');
    const serviceBoxes = document.querySelectorAll('.service-box');

    // دالة عامة لمراقبة مجموعة معينة
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
            // لإعادة تشغيل الأنيميشن عند كل Scroll
            el.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.2
      });

      // راقب كل عنصر في المجموعة
      elements.forEach(el => observer.observe(el));
    }

    // تطبيق المراقبة لكل مجموعة
    observeWithDelay(spans, 200);         // عناصر .span بتأخير 200ms
    observeWithDelay(serviceBoxes, 300);  // عناصر .service-box بتأخير 300ms
  });


  
// Observer لبدء ظهور عناصر عند Scroll
/* const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.3
});

// تطبيقه على personalservice-content
const section = document.querySelector('.personalservice-content');
observer.observe(section);

 */

/* 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // لإعادة الأنميشن عند الخروج
      }
    });
  }, {
    threshold: 0.1,
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

 */

    // Smooth Scrolling
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

    // افراغ الحقول وتصفير العداد عند تحديث الصفحة
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

  // ✅ إعادة تعيين عداد الأحرف بعد الإفراغ
  updateCharCount?.();
});


// اظهار اسم ملف السيرة الذاتية عند اختياره
/* document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("lebenslauf");
  const filenameDisplay = document.getElementById("filenameDisplay");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    filenameDisplay.textContent = file ? file.name : "Keine Datei ausgewählt (PDF, DOC, DOCX – max. 1 MB)";
  });
});
 */


// Formular-Handling für Bewerber
/* document.getElementById("bewerberForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const fileInput = document.getElementById("lebenslauf");
  const file = fileInput.files[0];

  const allowedTypes = ['application/pdf', 'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  if (!name || !email || !file) {
    alert("Bitte füllen Sie alle Felder aus und laden Sie Ihren Lebenslauf hoch.");
    return;
  }

  if (!allowedTypes.includes(file.type)) {
    alert("Bitte laden Sie eine gültige Datei hoch (PDF, DOC, DOCX).");
    return;
  }

   // Formularverarbeitung mit Erfolgsmeldung
    const form = document.getElementById('bewerberForm');
    const successMessage = document.getElementById('dankeNachricht');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // verhindert das Neuladen der Seite

        // Optional: Hier können Validierungen erfolgen oder AJAX-Anfragen

        // Zeige Erfolgsmeldung
        successMessage.style.display = 'block';

        // Formular zurücksetzen
        form.reset();
    });
}); */


/* document.querySelectorAll(".input-container input").forEach(input => {
  input.addEventListener("input", () => {
    // استخدم .value أو .valueAsNumber حسب نوع الحقل
    if (input.type === "number") {
      // استخدم input.value (حتى لو لم يقبل الرقم بعد)
      if (input.value.trim() !== "") {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
      }
    } else {
        input.classList.remove("has-value");
      
    }
  });
}); */

/* document.querySelectorAll(".input-container input, .input-container textarea, .input-container select").forEach(element => {
  const toggleLabel = () => {
    // أي قيمة غير فارغة تفعّل label، حتى لو غير صالحة
    if (element.value !== "") {
      element.classList.add("has-value");
    } else {
      element.classList.remove("has-value");
    }
  };

  element.addEventListener("input", toggleLabel);
  element.addEventListener("change", toggleLabel);

  // فحص أولي عند تحميل الصفحة
  toggleLabel();
});
 */


/* document.getElementById('bewerberForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("تم تشغيل حدث submit على الموبايل ✅");
}); */


//Bewerberformular
 document.addEventListener("DOMContentLoaded", () => {
 const form = document.getElementById('bewerberForm');
  const danke = document.getElementById('dankeNachricht');

if (form && danke) {
  form.addEventListener('submit', function (e) {
    e.preventDefault(); // 🟥 منع الإرسال التلقائي

    // 🧹 إزالة رسائل الخطأ السابقة
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

    
console.log("Formular wird abgeschickt...");


    
    const data = Object.fromEntries(new FormData(form)); // للتحقق
    const formData = new FormData(form); // للإرسال
    const lebenslaufDatei = form.querySelector('input[name="lebenslauf"]').files[0]; // ⬅️ استخراج الملف


    const validation = validateBewerberForm(data, lebenslaufDatei);
  console.log(validation);
   if (!validation.isValid) {
        // ❌ عرض الأخطاء تحت الحقول
      Object.values(validation.errors).flat().forEach(err => {

      const msg = err;

      // محاولة مطابقة الخطأ مع اسم الحقل الصحيح
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

    return; // 🛑 لا ترسل النموذج إذا كان هناك أخطاء
  }  

    fetch('/bewerbung', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        form.reset(); // ✅ إفراغ الحقول
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

/* document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('bewerberForm'); // أو id فورمِك
  const danke = document.getElementById('dankeNachricht');

  if (!form) return;

  // ======== دوال مساعدة لإدارة الأخطاء =========

  // إزالة كل رسائل الخطأ والـ classes في الفورم
  function clearAllErrors() {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    // إن لديك رسالة عامة احتياطية:
    const gen = form.querySelector('.form-general-error');
    if (gen) gen.remove();
  }

  // إزالة رسالة الخطأ عن حقل واحد (عن طريق عنصر الـ input نفسه أو name)
  function removeFieldErrorByElement(el) {
    if (!el) return;
    el.classList.remove('input-error');
    // أفضل مكان لإظهار الرسالة عادةً هو ضمن نفس الـ container
    const container = el.closest('.input-container') || el.parentElement;
    const old = container.querySelector('.error-message');
    if (old) old.remove();
  }
  function removeFieldErrorByName(fieldName) {
    const el = form.querySelector(`[name="${fieldName}"]`);
    removeFieldErrorByElement(el);
  }

  // إضافة رسالة خطأ لحقل معيّن (نزيل أي رسالة قديمة لذلك الحقل أولاً)
  function addFieldError(fieldName, message) {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input) {
      // إذا لم نجد الحقل، نعرض رسالة عامة في أعلى الفورم
      let gen = form.querySelector('.form-general-error');
      if (!gen) {
        gen = document.createElement('div');
        gen.className = 'form-general-error';
        form.prepend(gen);
      }
      gen.textContent = message;
      return;
    }
    // إزالة أي رسالة سابقة لهذا الحقل
    removeFieldErrorByElement(input);

    // تمييز الحقل
    input.classList.add('input-error');

    // إدراج رسالة خطأ داخل container أو بعد الحقل
    const container = input.closest('.input-container') || input.parentElement;
    const err = document.createElement('div');
    err.className = 'error-message';
    err.textContent = message;
    container.appendChild(err);
  }

  // ======== مستمعات لحذف رسالة الحقل بمجرد التعديل (live clearing) =========

  // نطبق على كل حقل يدخل المستخدم فيه أو يغيِّره
  form.querySelectorAll('input, textarea, select').forEach(el => {
    const ev = (el.type === 'checkbox' || el.type === 'radio' || el.tagName.toLowerCase() === 'select') ? 'change' : 'input';
    el.addEventListener(ev, () => {
      removeFieldErrorByElement(el);
    });
    // للـ file input استخدم change لتحديد الملف الجديد
    if (el.type === 'file') {
      el.addEventListener('change', () => {
        removeFieldErrorByElement(el);
        // إن أردت: تحديث نص يظهر اسم الملف
        const labelForFile = form.querySelector(`label[for="${el.id}"]`);
        if (labelForFile) {
          const f = el.files[0];
          labelForFile.dataset.filename = f ? f.name : '';
        }
      });
    }
  });

  // ======== المعالج الرئيسي لإرسال الفورم (submit) =========

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // تقييد الإرسال التقليدي لأننا نتحقق أولاً

    // 1) نزيل كل الأخطاء القديمة (تضمن إزالة أي رسائل متبقية)
    clearAllErrors();

    // 2) تحقق HTML5 مدمج (اختياري) — يمكنك تفعيله أو تعطيله حسب احتياجك
    // إذا أردت استخدامه: لو checkValidity() false نعرض رسالة ميدانية للحقول غير الصالحة
    if (!form.checkValidity()) {
      // عرض الأخطاء الأصلية بشكل واضح: نجمع الحقول غير الصالحة ونُظهر رسائل مخصصة
      const invalidEls = Array.from(form.querySelectorAll(':invalid'));
      invalidEls.forEach(el => {
        // استخدم رسالة المتصفح إن أردت: const msg = el.validationMessage;
        // أو رسالة مخصصة:
        let msg = el.validationMessage || 'Bitte füllen Sie dieses Feld korrekt aus.';
        // أضف رسالة ألمانية مُبسطة حسب النوع
        if (el.required && !el.value) msg = 'Dieses Feld ist erforderlich.';
        addFieldError(el.name || el.id || 'general', msg);
      });
      // ركِّز على أول حقل خاطئ
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        try { firstInvalid.focus({ preventScroll: true }); } catch (err) { firstInvalid.focus(); }
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // لا نتابع الإرسال
    }

    // 3) تحقق مخصص: استدعاء الدالة التي لديك validateBewerberForm
    const data = Object.fromEntries(new FormData(form));
    const lebenslaufFile = form.querySelector('input[name="lebenslauf"]')?.files?.[0];

    const validation = validateBewerberForm(data, lebenslaufFile);
    if (!validation.isValid) {
      // validation.errors مفترض أن يكون كائن { fieldName: [messages...] }
      Object.entries(validation.errors).forEach(([field, messages]) => {
        const msg = Array.isArray(messages) ? messages[0] : messages;
        addFieldError(field, msg);
      });

      // ركز على أول حقل به خطأ مخصص
      const firstErr = form.querySelector('.input-error');
      if (firstErr) {
        try { firstErr.focus({ preventScroll: true }); } catch (err) { firstErr.focus(); }
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return; // لا نتابع الإرسال
    }

    // 4) كل شيء صحيح: ننشئ formData ونرسل عبر fetch أو نُرسِل تقليديًا
    const formData = new FormData(form);
    fetch('/bewerbung', { method: 'POST', body: formData })
      .then(res => {
        if (res.ok) {
          form.reset();
          clearAllErrors();
          if (danke) {
            danke.textContent = 'Vielen Dank für Ihre Bewerbung! Wir melden uns in Kürze.';
            danke.style.display = 'block';
            danke.style.color = '';
          }
        } else {
          // إظهار رسالة عامة عند فشل الإرسال من السيرفر
          let gen = form.querySelector('.form-general-error');
          if (!gen) {
            gen = document.createElement('div');
            gen.className = 'form-general-error';
            form.prepend(gen);
          }
          gen.textContent = 'Fehler beim Senden. Bitte versuchen Sie es später.';
        }
      })
      .catch(err => {
        console.error(err);
        let gen = form.querySelector('.form-general-error');
        if (!gen) {
          gen = document.createElement('div');
          gen.className = 'form-general-error';
          form.prepend(gen);
        }
        gen.textContent = 'Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.';
      });

  }); // end submit

}); // end DOMContentLoaded
 */

// Personalanfrage-Formular
  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('personalForm');
  const dankeBox = document.getElementById('dankeNachricht2');
  const anforderungen = document.getElementById('anforderungen');
  const charCount = document.getElementById('charCount');
  const maxLength = 1000;
  // const fehlerDiv = document.getElementById("fehlerListe");
  
  // تحديد حد اعلى لمحارف حقل عدد الموظفين بمحرفين
  const anzahlInput = document.querySelector('input[name="anzahl"]');
anzahlInput.addEventListener("input", () => {
  if (anzahlInput.value.length > 2) {
    anzahlInput.value = anzahlInput.value.slice(0, 2);
  }
});

  // 🟦 وظيفة لتحديث عداد الأحرف// Charzähler
  function updateCharCount() {
    const currentLength = anforderungen?.value?.length || 0;
    const remaining = maxLength - currentLength;
    if (charCount) {
      charCount.textContent = `${remaining} Zeichen verbleibend`;
      charCount.style.color = remaining <= 0 ? "red" : "white";
    }
    // ❌ قطع النص إذا تجاوز الحد الأقصى
  if (currentLength >= maxLength) {
    anforderungen.value = anforderungen.value.slice(0, maxLength);
  }
  }

  // 🟦 تفعيل العداد إذا كان الحقل موجودًا
  if (anforderungen) {
    anforderungen.setAttribute("maxlength", maxLength);// ⛔️ يمنع من المتصفح أيضا
    anforderungen.addEventListener("input", updateCharCount);
    updateCharCount(); // التحديث عند التحميل الأول
  }

  // 🟦 إرسال النموذج
  if (form && dankeBox) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      /* fehlerDiv.innerHTML = "";  */// مسح الأخطاء السابقة

          const data = Object.fromEntries(new FormData(form)); // للتحقق
          const formData = new FormData(form); // للإرسال
          /* const fehler = []; */


          // 🧹 إزالة رسائل الخطأ السابقة
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

      // ✅ تحقق من صحة البيانات
        const validation = validatePersonalForm(data);

           if (!validation.isValid) {
        // ❌ عرض الأخطاء تحت الحقول
      validation.errors.forEach(err => {
      const msg = err;

      // محاولة مطابقة الخطأ مع اسم الحقل الصحيح
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

    return; // 🛑 لا ترسل النموذج إذا كان هناك أخطاء
  } 
  

      fetch("/personal-anfrage", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.ok) {
            form.reset(); // ✅ إفراغ النموذج
            updateCharCount(); // ✅ إعادة تعيين عداد الأحرف

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
  // const fehlerDiv = document.getElementById("fehlerListe");
  


  // 🟦 وظيفة لتحديث عداد الأحرف// Charzähler
  function updateCharCount() {
    const currentLength = gegenstaende?.value?.length || 0;
    const remaining = maxLength - currentLength;
    if (charCount) {
      charCount.textContent = `${remaining} Zeichen verbleibend`;
      charCount.style.color = remaining <= 0 ? "red" : "white";
    }
    // ❌ قطع النص إذا تجاوز الحد الأقصى
  if (currentLength >= maxLength) {
    gegenstaende.value = gegenstaende.value.slice(0, maxLength);
  }
  }

  // 🟦 تفعيل العداد إذا كان الحقل موجودًا
  if (gegenstaende) {
    gegenstaende.setAttribute("maxlength", maxLength);// ⛔️ يمنع من المتصفح أيضا
    gegenstaende.addEventListener("input", updateCharCount);
    updateCharCount(); // التحديث عند التحميل الأول
  }



  // 🟦 إرسال النموذج
  if (form && dankeBox) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      /* fehlerDiv.innerHTML = "";  */// مسح الأخطاء السابقة

          const data = Object.fromEntries(new FormData(form)); // للتحقق
          const formData = new FormData(form); // للإرسال
          /* const fehler = []; */


          // 🧹 إزالة رسائل الخطأ السابقة
      form.querySelectorAll(".error-message").forEach(el => el.remove());
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

      // ✅ تحقق من صحة البيانات
        const validation = validateTransportForm(data);

           if (!validation.isValid) {
        // ❌ عرض الأخطاء تحت الحقول
      validation.errors.forEach(err => {
      const msg = err;

      // محاولة مطابقة الخطأ مع اسم الحقل الصحيح
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

    return; // 🛑 لا ترسل النموذج إذا كان هناك أخطاء
  }  


      fetch("/transport", {
        method: "POST",
        body: formData
      })
        .then(response => {
          if (response.ok) {
            form.reset(); // ✅ إفراغ النموذج
            updateCharCount(); // ✅ إعادة تعيين عداد الأحرف

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




/////////////دالة التحقق من بيانات  ال personalanfrage في السكريبت/////////////////////
function validatePersonalForm(data) {
const errors = [];
const heute = new Date();
heute.setHours(0, 0, 0, 0); // وقت اليوم للتأكد من المقارنة فقط على التاريخ
const startDate = parseDate(data.starttermin);
const bisDate = parseDate(data.bis);

  const textIsValid = (val, min = 1, max = 50) =>
  val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;


  const regex = {
    plz: /^\d{5}$/,
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/,
    anzahl: /^(?:[1-9]|[1-9][0-9])$/, // يقبل فقط القيم من 1 إلى 99
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

/////////////دالة التحقق من بيانات  ال bewerber في السكريبت/////////////////////
 function validateBewerberForm(data, lebenslaufDatei) {
  const errors = [];

  const textIsValid = (val, min = 1, max = 50) =>
  val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;


  const regex = {
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/,
  };
  // ✅ التحقق من الحقول
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
heute.setHours(0, 0, 0, 0); // وقت اليوم للتأكد من المقارنة فقط على التاريخ

// Starttermin prüfen
if (!istGueltigesDatum(data.verfuegbar)) {
  errors.push("Starttermin ist kein gültiges Datum.");
} else {
  const startDate = parseDate(data.verfuegbar);
  if (startDate < heute) {
    errors.push("Starttermin darf nicht in der Vergangenheit liegen.");
  }
}
  // تحقق من قبول Datenschutz
  if (data.datenschutz !== "on") {
    errors.push("Datenschutz muss akzeptiert werden.");
  }


    if (!lebenslaufDatei) {
  errors.push("Bitte laden Sie einen Lebenslauf hoch.");
} else{

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExt = lebenslaufDatei.name.toLowerCase().match(/\.\w+$/);
    const maxSize = 1 * 1024 * 1024; // 1MB

    // تحقق من الامتداد
    if (!fileExt || !allowedExtensions.includes(fileExt[0])) {
    errors.push("Lebenslauf darf nur PDF, DOC oder DOCX-Datei sein.");
    }

    // تحقق من الحجم
    if (lebenslaufDatei.size > maxSize) {
      errors.push("Lebenslauf darf maximal 1MB groß sein.");
    }
    }


  return {
    isValid: errors.length === 0,
    errors,
  };
} 

/* function validateBewerberForm(data, lebenslaufDatei) {
  const errors = {};

  const textIsValid = (val, min = 1, max = 50) =>
    val && typeof val === "string" && val.trim().length >= min && val.trim().length <= max;

  const regex = {
    email: /^[\w.-]+@[\w.-]+\.\w+$/,
    telefon: /^(\+49|0)[1-9][0-9]{6,13}$/,
    datum: /^\d{2}\.\d{2}\.\d{4}$/
  };

  // Anrede
  if (!["Herr", "Frau"].includes(data.anrede)) {
    errors.anrede = ["Ungültige Anrede."];
  }

  // Vorname
  if (!textIsValid(data.vorname, 2, 50)) {
    errors.vorname = ["Vorname muss zwischen 2 und 50 Zeichen lang sein."];
  }

  // Nachname
  if (!textIsValid(data.nachname, 2, 50)) {
    errors.nachname = ["Nachname muss zwischen 2 und 50 Zeichen lang sein."];
  }

  // Beruf
  if (!textIsValid(data.beruf, 2, 100)) {
    errors.beruf = ["Beruf muss zwischen 2 und 100 Zeichen lang sein."];
  }

  // E-Mail
  if (!regex.email.test(data.email)) {
    errors.email = ["E-Mail ist ungültig."];
  }

  // Telefonnummer
  if (data.telefon) {
    const telefon = data.telefon.replace(/\s|-/g, "");
    if (!regex.telefon.test(telefon)) {
      errors.telefon = ["Telefonnummer ist ungültig."];
    }
  }

  // Starttermin
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  if (!istGueltigesDatum(data.verfuegbar)) {
    errors.verfuegbar = ["Starttermin ist kein gültiges Datum."];
  } else {
    const startDate = parseDate(data.verfuegbar);
    if (startDate < heute) {
      errors.verfuegbar = ["Starttermin darf nicht in der Vergangenheit liegen."];
    }
  }

  // Datenschutz
  if (data.datenschutz !== "on") {
    errors.datenschutz = ["Datenschutz muss akzeptiert werden."];
  }

  // Lebenslauf
  if (!lebenslaufDatei) {
    errors.lebenslauf = ["Bitte laden Sie einen Lebenslauf hoch."];
  } else {
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExt = lebenslaufDatei.name.toLowerCase().match(/\.\w+$/);
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!fileExt || !allowedExtensions.includes(fileExt[0])) {
      errors.lebenslauf = ["Lebenslauf darf nur PDF, DOC oder DOCX-Datei sein."];
    } else if (lebenslaufDatei.size > maxSize) {
      errors.lebenslauf = ["Lebenslauf darf maximal 1MB groß sein."];
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
 */

///////////////دالة التحقق من بيانات Transportanfrage في السكريبت/////////////////////
function validateTransportForm(data) {
const errors = [];
const heute = new Date();
heute.setHours(0, 0, 0, 0); // وقت اليوم للتأكد من المقارنة فقط على التاريخ

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





/* console.log("✅ Skript geladen"); */

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return; // ✅ لا تتابع إذا لم يوجد عنصر dropdown

  const toggle = dropdown.querySelector('.dropdown-toggle');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // إغلاق عند النقر خارج القائمة
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});



/* document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    // لمس
    toggle.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }, { passive: false });

    // نقر
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
  });

  // إغلاق عند النقر خارج القائمة
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
});
 */



/* document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = dropdownToggle.closest('.dropdown');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');

  let isTouchDevice = false;

  // دالة تبديل عرض القائمة
  function toggleDropdown() {
    const isOpen = dropdown.classList.contains('open');

    // إغلاق كل القوائم المفتوحة (لو لديك أكثر من واحدة لاحقًا)
    document.querySelectorAll('.dropdown.open').forEach(d => {
      d.classList.remove('open');
    });

    // إذا لم تكن مفتوحة، افتحها
    if (!isOpen) {
      dropdown.classList.add('open');
    }
  }

  // التعامل مع اللمس
  dropdownToggle.addEventListener('touchstart', (e) => {
    isTouchDevice = true;
    e.preventDefault();
    toggleDropdown();
  }, { passive: false });

  // التعامل مع النقر
  dropdownToggle.addEventListener('click', (e) => {
    if (isTouchDevice) return;
    e.preventDefault();
    toggleDropdown();
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
}); */

