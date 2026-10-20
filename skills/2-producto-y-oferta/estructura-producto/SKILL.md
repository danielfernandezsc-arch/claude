---
name: "estructura-producto"
description: "Genera el programa de un creador Shivalink, en vivo (12 sesiones) o grabado (4 módulos con clases cortas): módulos con objetivo y resultado, guion, slides en Gamma y plantillas con su branding de Lovable, y Whop completo. Úsala con \"estructura del programa de X\" o \"diseña el programa de X\"."
---

# Programa del creador — la clase lista para dar o para grabar

**Analogía.** Un programa es un viaje en tren. Los módulos son las estaciones: cada una tiene nombre, un motivo para bajarse y algo que te llevas. Las sesiones o las clases son los vagones que te llevan de una a otra. Si una estación no tiene motivo, el pasajero se baja antes de tiempo.

Entrega al creador el programa completo y listo para impartir o grabar: cada módulo definido (objetivo, de qué va, qué tiene el alumno al terminar y cuánto le pide), y dentro, sus sesiones en vivo o sus clases grabadas, con guion, slides en Gamma (con él como editor) y plantilla del alumno. Todo con **su branding**, ya montado en Whop. Abre la sesión o la clase de hoy y no hay un "¿y ahora qué digo?".

Norte: que el alumno que complete el programa logre la promesa.

**Dos formatos** (se lee de la oferta v1; si no está, se pregunta a Dani):

| | 🔴 En vivo | 🎬 Grabado |
|---|---|---|
| **Estructura** | 4 módulos × 3 sesiones = 12 sesiones | 4 módulos × 5–8 clases |
| **Duración de cada pieza** | 60–90 min | 5–15 min (una idea por clase) |
| **Ritmo** | Una sesión por semana, emitida dentro de Whop (nunca Zoom ni enlaces sueltos) | Un módulo nuevo cada semana en Whop (contenido por goteo) |
| **Empieza** | S01 el D+7 | Módulo 1 el D+7 |
| **Slides** | Un deck por sesión | Un deck por módulo, con una sección por clase |
| **Plantillas** | Una por sesión | Una por módulo (o por clase si el ejercicio lo pide) |
| **Calendario** | 12 eventos en Whop y en su Google Calendar | Fechas de apertura de cada módulo |

**Programa listo el D−7** en los dos casos, porque el webinar lo promete. En grabado, el creador graba el módulo 1 antes del D+7 y cada módulo siguiente antes de que se abra.

**Estructura ≠ oferta.** La oferta la define `oferta-creador` y aquí no se toca. De ella solo se leen la promesa y el método, que son la brújula.

Referencia visual: "Ejemplo · Noelia García · Programa y guion de sesiones" (`3f4ee17cdf7e81bb9baeef7cf9da0618`, en el SOP 6.3).

## Antes de todo · Las reglas del juego (siempre, antes que nada)
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## Paso 0 — Branding primero (obligatorio)
La landing del creador en Lovable es la fuente de verdad de su marca. **Sin branding no se produce nada.**
1. Busca el proyecto de Lovable: enlace "editor Lovable" en la ficha o `list_projects`.
2. Lee `src/styles.css`, y `tailwind.config` o `index.css` si existen, con `read_file`.
3. Extrae:
   - **Colores:** fondo, texto, primario, acento, suave y realce. Si vienen en `oklch`, conviértelos a hex con un script.
   - **Tipografías:** títulos y cuerpo.
   - **Estilo** en 3 palabras.
   - **Fotos del creador** (`src/assets`) para referencia.
4. Guárdalo en la ficha como bloque **"🎨 Branding"** (paleta en hex con muestras, fuentes y estilo). Lo reutilizan todas las skills.
5. Si no hay landing, se para y se avisa a Dani: primero la landing.

## Paso 1 — Inputs y brújula
- Oferta v1 (promesa y método) y tono de voz, de la ficha.
- Avatar y expertise, de las transcripciones.
- Día 0, día y hora fijos de las sesiones y pausas (festivos).
- **Emails:** creador y equipo.

Si falta algo, se pregunta. No se inventa.

```
PROMESA: [oferta v1]
MÉTODO: [nombre] · pilares: [1] [2] [3] [4]
AVATAR: [quién es y qué le frena]
FORMATO: en vivo · 12 sesiones · [día] [hora] · S01 [fecha] → S12 [fecha]
     o  grabado · 4 módulos · [n] clases · M1 se abre [fecha] → M4 [fecha]
```

## Paso 2 — Diseñar hacia atrás
Se define la **prueba de la promesa**: qué tiene, hace o siente el alumno al terminar. Desde ahí se construye hacia atrás, sesión a sesión.

## Paso 3 — Arquitectura: 4 módulos
| Módulo | En vivo | Grabado | Papel | Color |
|---|---|---|---|---|
| M1 · Base y primera victoria | S01–S03 | 5–8 clases | **Victoria tangible en la primera semana** | 🟦 |
| M2 | S04–S06 | 5–8 clases | Un obstáculo del avatar por sesión o clase | 🟧 |
| M3 | S07–S09 | 5–8 clases | Profundizar y aplicar | 🟪 |
| M4 · Consolidación | S10–S12 | 5–8 clases | **Prueba de la promesa al final** | 🟩 |

**La ficha de cada módulo (obligatoria, en los dos formatos):**
```
🟦 Módulo [n] · [nombre con gancho]
🎯 Objetivo: [qué cambia en el alumno, en una frase]
📖 De qué va: [2 líneas, en lenguaje del avatar]
🏁 Al terminar el módulo tiene: [entregables concretos, que se puedan ver o fotografiar]
⏱️ Dedicación: [semanas] · [sesión o clases] + [deberes por semana]
🧩 Sesiones o clases: [lista]
📎 Plantillas: [lista]
```
Regla del buen módulo: el "🏁 al terminar tiene" se puede comprobar (una foto, una plantilla rellena, una cifra). Si no se puede comprobar, el módulo no está bien definido.

Cada sesión o clase empieza donde acabó la anterior y tiene un resultado concreto.

## Paso 4 — Guion de cada sesión (las 12)
```
S0X · [Título de acción] · [fecha] · [duración]
🎯 Al terminar, el alumno: [resultado]
✅ ANTES: abrir slides y plantilla · preparar [ejemplo] · entrar en Whop 10 min antes y activar en vivo
🧭 GUION
0:00 Apertura (5')     gancho + victorias de los deberes en el chat (en la S01: bienvenida, calendario y normas del chat)
0:05 Enseñanza (25')   3 puntos → cada uno con su ejemplo + error típico
0:30 Ejercicio (15')   lo hacen ahora + pregunta para el chat
0:45 Casos (20')       2 alumnos, el creador corrige en vivo
1:05 Cierre (5')       resumen en 1 frase + deberes + puente
📎 Entregable: [plantilla]  ·  ✅ Deberes: [acción de la semana]
📤 DESPUÉS: grabación a Whop en menos de 24 h, en "Clases en vivo grabadas" (S0X · fecha · título)
```
Títulos de acción. Guion en bullets, con frases del creador. Misma numeración S01…S12 en Notion, Drive, Gamma, Whop y Calendar.

**Si es grabado, guion de cada clase (5–15 min, una sola idea):**
```
M[n].[c] · [Título de acción] · [duración]
🎯 Al terminar la clase, el alumno: [resultado]
🎬 Cómo grabarla: a cámara o con pantalla compartida · [qué tener delante]
🧭 GUION
0:00 Gancho (30")      la pregunta o el error que resuelve esta clase
0:30 La idea (60–70 %) 1 concepto → ejemplo → error típico
…    Hazlo ahora (20 %) el ejercicio en la plantilla, paso a paso
Final  Puente (30")    qué consigue en la siguiente clase
📎 Plantilla: [nombre] · ✅ Tarea: [acción concreta]
```
Numeración `M1.1 … M4.8` igual en Notion, Drive, Gamma y Whop. Cada módulo cierra con una clase de "🏁 tu resultado del módulo" que revisa el entregable.

## Paso 5 — Material de cada sesión o módulo (con el branding)

### Slides (Gamma)
- `generate` con `cardSplit: inputTextBreaks`, `textMode: preserve`, idioma del creador y 16x9.
- **Tema = su proyecto de Lovable.** Las slides tienen que parecer hechas por el mismo diseñador que su landing: mismos colores, misma tipografía.
  - Se busca en `get_themes` el tema custom **"[Creador]"** (lo crea Dani en el paso 18 del checklist interno con los hex y las fuentes del bloque 🎨 Branding, que salen de `src/styles.css` de Lovable).
  - Si no existe, **se para y se pide a Dani que lo cree** (2 min). Solo si Dani dice "sigue sin tema", se usa el estándar más parecido con `additionalInstructions` que fijen los hex exactos y las fuentes de títulos y cuerpo.
  - Siempre, también con tema custom, en `additionalInstructions`: "Títulos en [fuente de títulos], texto en [fuente de cuerpo], colores [hex]. Igual que su web [dominio]."
- **Imágenes:** generadas con IA en el estilo de su marca, o `placeholder` para poner sus fotos reales.
- 12–18 slides, una idea por slide, sin mayúsculas sostenidas, en el orden del guion: portada → lo que te llevas → 3 puntos → ejercicio → casos → deberes → plantilla → la semana que viene.
- Título: `S0X · [título] · [programa]`.

### Plantillas del alumno (Google Docs o Sheets) — preciosas, siempre
La plantilla es lo que el alumno toca cada semana: es la cara del programa.
- **Formato:** Docs para ejercicios, fichas y reflexiones; **Sheets** para trackers, cálculos, presupuestos o checklists con progreso.
- **Diseño con el branding:**
  - **Cabecera:** banda con el color de fondo de la marca, programa · sesión en pequeño y espaciado, y un título grande en la fuente de titulares con una palabra destacada en el color suave o de acento.
  - **Pasos:** numerados grandes (`01`, `02`…) en el color de acento, con el tiempo de cada uno.
  - **Tablas:** cabecera en el color suave, bordes finos y la columna clave resaltada.
  - **Huecos:** fotos antes y después, líneas para escribir y casillas ☐.
  - **Cierre:** caja con borde de acento, los deberes y una frase firmada por el creador.
  - **Fuentes:** las de la marca con alternativa segura (por ejemplo `'Cormorant Garamond', Georgia` / `'Manrope', Arial`).
  - **Primera línea:** "Archivo → Hacer una copia. Esta plantilla es tuya."
  - Sin mayúsculas sostenidas, salvo la línea pequeña de la cabecera.
- **Cómo se crean:**
  - **Docs:** HTML con estilos inline, subido con `create_file` (`contentMimeType: text/html`) a `04. Clases del programa`.
  - **Sheets:** `.xlsx` con openpyxl (rellenos de marca, anchos, validaciones, fórmulas y barras de progreso con formato condicional), subido con el `contentMimeType` de xlsx. Se convierte en Google Sheets.
  - Título: `S0X · Plantilla · [nombre]`.

### Lovable
Solo si el método pide una herramienta interactiva (calculadora, planificador): como mucho una por programa y con el OK de Dani.

## Paso 6 — QA visual antes de producir en serie
1. Genera primero **S01** o el **módulo 1** (slides + plantilla).
2. Revísala: exporta las slides a PNG o PDF (`export_gamma`) y abre la plantilla. Comprueba colores, fuentes, legibilidad, que no haya slides vacías y que no haya mayúsculas.
3. Si algo falla, corrige el prompt o el HTML **una vez** y aplícalo a todo.
4. Después produce el resto (S02–S12, o los módulos 2–4) con el mismo diseño.

## Paso 7 — Accesos de editor automáticos (nadie tiene que compartir nada a mano)
| Dónde | Quién | Cómo |
|---|---|---|
| **Gamma** (cada deck) | Creador como editor; Dani (danielfernandezsc@gmail.com) como editor si no es el propietario | `sharingOptions.emailOptions = {recipients: [creador, Dani], access: "edit"}` en el mismo `generate` |
| **Drive** (cada plantilla y la carpeta `04`) | Creador como editor; Ange como editora | `share_file` con `role: writer` |
| **Notion** (ficha del creador) | Creador con edición solo en su ficha | Si aún no tiene acceso, queda como tarea de Dani en la ficha (la API no invita a usuarios) |

## Paso 8 — Whop completo: producto, banners, planes y enlaces de pago
El escaparate tiene que estar a la altura de lo que se vende: un alumno que paga 1.000 € y entra a un curso sin portada siente que compró una fotocopia. Todo con el branding de Lovable.

**8.1 · El producto (la página que ve el comprador)**
- Nombre del programa y descripción corta y larga, sacadas de "💎 Oferta" (promesa, para quién es, qué incluye, bonos y garantía). Sin precio en el texto.
- **Banners con su marca**, generados con `generate_image` de Gamma (o `media_generate` de Whop), fotorrealistas, con los colores de su Lovable y sin texto deformado:
  - portada del producto (horizontal);
  - miniatura cuadrada para el listado;
  - una portada por módulo (M1–M4) y una miniatura por sesión (S01–S12), todas con el mismo estilo.
- Se suben a Whop y a Drive `03. Creativos`. Si una imagen sale con texto raro o parece dibujo, se regenera.

**8.2 · El curso y las clases**
- **En vivo:** curso con 12 lecciones `S01 · [título]…S12`, cada una con su miniatura, descripción, objetivo, deberes y el enlace a la plantilla.
- **Grabado:** curso con 4 capítulos (los módulos, con su objetivo y "al terminar tienes" en la descripción) y dentro sus lecciones `M1.1 · [título]…`, cada una con el vídeo, la plantilla y la tarea. Cada capítulo se abre por goteo una semana después del anterior.
- **Lección 0 · Empieza aquí** (la primera que ve, ver 8.7).
- Apps: contenido, live streaming, calendario de eventos, chat y anuncios.
- **En vivo:** 12 eventos en el calendario de Whop (localización web, anfitrión el creador, fecha y hora) y la sección *Clases en vivo grabadas*. **Grabado:** sin eventos; las fechas de apertura de cada módulo van en la lección 0.
- Mensaje de bienvenida en español.

**8.3 · La oferta: planes y enlaces de pago** (de la ficha de planes del checklist interno)
- Si los planes ya se crearon en el paso 20 del checklist (D−16), aquí solo se verifican importe, moneda, impuestos y enlace. Si no existen, se crean ahora.
- Un solo producto con varios planes. Nunca un producto por precio.
- Planes con el importe exacto de la oferta v1: **pago único** y **plazos** (el número de cuotas de la oferta, 3 o 6). Nada más: no hay VIP. Moneda correcta (EUR o USD).
- **Regla de los 997 €:** los planes se crean igual. Con < 997 € el enlace va en la página de venta; con ≥ 997 € lo envía Samantha tras la llamada.
- Los tres cierres (bono del directo D0, bono de acción rápida D+1 y precio de lanzamiento hasta D+4) se escriben en la descripción del producto y de cada plan, con su fecha y hora. Cada bono se retira a su hora (pasos 36 y 40 del checklist) y el precio de lanzamiento se cierra el D+4 a las 23:59.
- Un **enlace de pago por plan** (`checkout-configurations`), con el teléfono obligatorio en el checkout.

**8.4 · Impuestos (los gestionamos nosotros)**
- Por defecto el producto va como **no sujeto a impuestos añadidos**: el alumno paga exactamente el precio de la página.
- Se revisa plan por plan (único y plazos). Si el negocio necesita otro tratamiento fiscal, lo decide Dani: ante la duda, no se toca y se pregunta.
- Se apunta en el checklist interno cómo quedó el IVA y la fecha (SOP *Configurar el IVA en Whop*).

**8.5 · Reparto y prueba**
- Reparto automático activo según el contrato (se comprueba, no se cambia).
- Cada enlace se abre en incógnito: el precio no cambia y el checkout pide teléfono.
- La compra de prueba la hace Carina el D−3.

**8.6 · Dónde quedan los enlaces**
- En la ficha del creador → "🗓️ Fechas y enlaces" (Whop · pago único / plazos) en cuanto se crean.
- En el checklist interno, paso 20, con los ID de los planes.
- A Dani para la página de venta y a Samantha si es ≥ 997 €. WhatsApp no lleva enlaces de Whop: siempre la página de venta.

**8.7 · La bienvenida al comprador (menos de 1 h)**
El momento de más ilusión del alumno es justo después de pagar. Si ahí hay silencio, aparece el arrepentimiento. Como en un buen hotel: la llave, el desayuno y la hora de la cena, nada más entrar.
- **Lección 0 · Empieza aquí** (primera del curso en Whop):
  1. **Vídeo de bienvenida del creador** (1–2 min, grabado el D−7: tarea "Grabar tu vídeo de bienvenida para alumnos"). La skill deja el guion: gracias → qué va a pasar → la fecha de la S01 → "empieza por aquí".
  2. **Tu primera victoria en 15 minutos:** un ejercicio corto con su plantilla, que da un resultado el mismo día (sale de la S01).
  3. **Tus bonos:** cada bono comprado, entregado o con su fecha y cómo se reclama.
  4. **Tu calendario:** S01 → S12 con día y hora (España / LatAm) y cómo entrar al directo en Whop.
  5. **Normas del chat y a quién escribir** (Carina).
- **Mensaje de bienvenida de Whop** en español, con el enlace a la lección 0.
- **WhatsApp de Carina en menos de 1 h** (plantilla del checklist interno, primera frase en negrita): bienvenida personal, enlace a la lección 0 y fecha de la S01. Del D0 al D+4, también en la noche del directo.
- Se prueba con la compra de prueba del D−3: el mensaje de Whop llega y la lección 0 se ve.

Si el conector de Whop falla, se deja todo como tarea de Dani con los textos, los banners y los importes listos para pegar.

**Google Calendar (el del creador):** en vivo, 12 eventos (día y hora fijos), con el creador invitado y en la descripción el guion resumido y los enlaces a slides y plantilla; las pausas, sin evento. En grabado, un evento por módulo con la fecha límite para tenerlo grabado (3 días antes de que se abra).

## Paso 9 — Verificación
Se comprueba que la primera semana da una victoria, que cada obstáculo tiene su sesión o clase, que cada módulo tiene un "🏁 al terminar tiene" comprobable y que el final entrega la prueba de la promesa. Se muestra una línea de verificación.

## Paso 10 — Publicar en Notion (tras el OK de Dani)
Subpágina `🏗️ Programa · Guion de sesiones` en la ficha:
1. **Callout de cabecera:** promesa, día y hora, S01 → S12, pausas, Whop y prueba de la promesa. Nunca precio ni reparto.
2. **📍 Esta semana:** la sesión que toca, con botones a slides y plantilla.
3. **🗺️ Tu programa en una página:** tabla S01…S12 · fecha · título · entregable.
4. **Un encabezado de color por módulo** con su **ficha del módulo** en un callout del mismo color (🎯 objetivo · 📖 de qué va · 🏁 al terminar tiene · ⏱️ dedicación), y debajo un toggle por sesión o clase: 🎯 objetivo · ✅ antes · 🧭 guion · 📎 entregable con enlace · ✅ deberes · 📤 después.
   - Si el formato es en vivo y Dani quiere tener la versión grabada preparada, se añade en cada módulo un toggle "🎬 Si es grabado: las clases del módulo" con la lista de clases y su duración (como en el ejemplo de Noelia).
5. **Pausas** como callout gris. **Verificación** en un callout verde al final.

El creador valida en 48 h. Sus cambios de experto mandan; los de estructura los decide Dani.

## Resumen final
```
🏗️ PROGRAMA · [Creador] · [en vivo: S01 → S12 | grabado: M1 → M4, n clases] · [fechas]
🧭 Módulos ..... 4 con objetivo, de qué va, al terminar tiene y dedicación ✅
🎨 Branding .... leído de Lovable · tema Gamma: [nombre]
🎞️ Slides ...... [12 decks | 4 decks por módulo] · creador editor ✅
📄 Plantillas .. [n] (Docs/Sheets) en Drive 04 · compartidas ✅
🛒 Whop ........ producto + banners · lección 0 + [12 lecciones y 12 eventos | 4 capítulos por goteo] ✅
👋 Bienvenida .. vídeo del creador · primera victoria 15 min · WhatsApp de Carina < 1 h ✅
💳 Planes ...... único [€] · plazos [n × €] · IVA: sin impuestos añadidos ✅
🔗 Enlaces ..... en la ficha y en el checklist ✅ / tarea para Dani
📅 Calendar .... [12 eventos | 4 fechas límite de grabación] ✅
```

## Estándar
Simple, ordenado y paso a paso. Todas las sesiones con la misma forma y todo con la marca del creador. Sin datos internos: es la página del creador.