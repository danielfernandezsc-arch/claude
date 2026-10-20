---
name: "onboarding-creador"
description: "Onboarding completo de un creador recién cerrado. Úsala cuando Dani diga \"hemos cerrado a X\", \"onboarding de X\" o \"prepara todo para X\". Crea Drive, ficha Notion fechada desde el Día 0, tono, oferta (método Jason), marca y landing, kick-off, contrato, pipeline, agenda y accesos."
---

# Onboarding del creador — de "sí" a "listo para lanzar" en una sesión

**Analogía.** El cierre es la llave y el onboarding es encender el coche. Si el coche ya tiene gasolina, GPS y ruta, el creador solo tiene que conducir.

**Una sola entrada:** el nombre del creador y el Día 0 (fecha del webinar). Todo lo demás sale de las transcripciones o se calcula. Precio, cuotas y garantía se acuerdan en la llamada: se toman de ahí y no se cambian.

---

## Antes de todo · Las reglas del juego
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## 1 · Reunir los datos (no se inventa nada)

Fuentes, en este orden:
1. **Transcripciones de Loom.** Auditoría, llamada de cierre, propuesta y sesión de partnership. Se buscan en Wispr Flow (`search_meetings`), en Drive (`fullText contains '[nombre]'`) y en la fila del Pipeline. Si no aparecen, se pide a Dani que las pegue. Es lo único que se pide.
2. **Entrevista del creador** (agencia.shivalink.com/entrevista).
3. **Fila del Pipeline** (`collection://67ec9f1f-34e3-491e-a76b-613d66fed753`).
4. **Instagram del creador:** bio, seguidores y temas de los reels top.

Con esto se rellena la **Hoja de datos del creador**:

| Bloque | Campos |
|---|---|
| Identidad | Nombre, marca, nicho, país, email, WhatsApp, Instagram, seguidores |
| Legal (solo contrato) | Nombre legal, DNI/pasaporte, dirección. **Nunca a memoria ni a Notion visible.** |
| Avatar | Quién es, dolor nº 1, deseo, qué ha probado y le falló, objeciones literales |
| Producto | Resultado que da, método, casos/testimonios reales con cifras |
| Lanzamiento | Día 0, precio, cuotas, garantía y presupuesto de ads (acordados en la llamada) |

Un dato que falta se marca `[PENDIENTE]`. No se para el flujo por un dato.

## 2 · Calendario y objetivos (con el Día 0 se calcula todo)

| Hito | Día |
|---|---|
| Onboarding / firma | D−25 |
| Landing en Lovable (branding definido) | D−21 |
| Inicio captación (14 días) | D−14 |
| Programa listo (`estructura-producto`) | D−7 |
| Kit del creador | D−4 |
| QA de pagos | D−3 |
| Ensayo técnico con Carina (StreamYard) | D−2 |
| **Webinar** | **D0** |
| Carrito abierto | D0 (abre en el directo) → D+4 23:59 |
| Resultados y testimonio (`resultados-lanzamiento`) | D+5 → D+7 |

Si D0 − hoy < 25 días, se avisa a Dani ("calendario comprimido: X días") y se sigue.

**Objetivos del lanzamiento** (informativos, se miden los jueves y en la página de resultados). Ratios reales de `claude/aprendizajes-4-lanzamientos.md`:

| Ticket | Conversión de registros |
|---|---|
| ~300 € | 1,5–2 % |
| 1.000–2.500 € | 0,3–0,5 % |

Cuentas:
- Ventas para pasar 10.000 € = 10.000 / precio.
- Registros = ventas / conversión.
- En directo = 10–40 % de los registros.

Se guardan en la ficha como "🎯 Objetivos".

## 3 · Carpeta de Drive consecutiva

- Carpeta madre: `1XBy_RlZlicvuM_4yV_Hj6w6FYHGwiL0A`.
- Se listan las hijas, se toma el número más alto y se suma 1, con dos dígitos.
- Nombre: `NN. Nombre Apellido l Marca` (ej.: `32. Laura Pérez l Yoga Hormonal`).
- Subcarpetas fijas: `00. Contrato y transcripciones` · `01. Branding (logo + colores)` · `02. Fotos (autoridad + looks)` · `03. Creativos (stories + landing)` · `04. Clases del programa (grabaciones)` · `05. Testimonios (capturas + DMs)` · `06. WhatsApp audios y videos` · `07. Anuncios` · `08. Carruseles`
- Se comparte con el creador (editor) y con Ange (angelicamcr9715@gmail.com, editora).
- Si la carpeta ya existe, se reutiliza y no se duplica.

## 4 · Ficha en Notion

1. **Fila en Lanzamientos** (`collection://bef6ac7e-8301-4de1-833a-f32c67eebd0b`): nombre, Día 0, estado, precio y enlace a Drive.
2. **Ficha:** duplicar la plantilla `3f4ee17cdf7e810ab139fdbe9d558f32` dentro de la fila de 🚀 Lanzamientos (nunca bajo el Pipeline de prospección), y pegar su URL en la propiedad *Ficha* de esa fila. Título: `NN. Nombre l Marca`.
3. **Tareas** (`collection://edd91046-eb13-47c7-9c1d-07a14ddf2926`): cada tarea se relaciona con el Lanzamiento. Fecha y Semáforo se calculan solos desde el Día 0, así que nunca se escribe una fecha a mano.
4. **Responsables:** el creador (con email; responsable solo de sus tareas y con edición solo en su ficha), Dani, Carina, Ange y **Samantha** (closer: llamadas de cierre de D0 a D+4).
5. **Checklist interno:** aplicar `3f4ee17cdf7e8147b915f3dc58f0876b`. Las tareas privadas (contrato, regalo, repesca, retro) solo viven ahí.
6. Rellenar todos los `[corchetes]` con la Hoja de datos. La plantilla ya trae las 7 subpáginas creadas y en orden: se rellenan, no se crean nuevas.
7. **Orden fijo de la ficha** (siempre el mismo, para que el creador nunca busque):
   1. Callout de cabecera: producto, Día 0, precio y estado.
   2. 🔗 Enlaces (Drive, landing, Whop y grupo).
   3. 🧭 Índice con las subpáginas, en este orden: 🎙️ Tono · 💎 Oferta · 🎨 Marca y diseño · 📞 Kick-off · 🏗️ Programa · 🎓 Masterclass · 💬 WhatsApp.
   4. 🎯 Objetivos.
   5. 📋 Tabla de tareas.

   Lo privado (contrato, planes de Whop, reparto, regalo) solo vive en el checklist interno.

## 4b · Proyecto en Claude del creador (paquete listo para Dani)
Cada creador tiene su propio proyecto en Claude, desde el que se gestiona todo, Whop incluido, sin entrar en Whop. La API no permite crear proyectos, así que la skill deja el paquete listo y Dani lo crea en 2 minutos.

1. **Instrucciones del proyecto,** listas para pegar, en la página interna del lanzamiento (la fila de 🚀 Lanzamientos, donde vive el checklist interno). Incluyen:
   - quién es el creador y su producto;
   - tono de voz y líneas rojas;
   - oferta v1 y fechas clave (D0, carrito y S01);
   - reparto;
   - **ID del negocio en Whop** (o `[PENDIENTE]` hasta que el creador dé acceso de administrador);
   - reglas: "toda consulta o acción de Whop se hace sobre este negocio"; "los cambios de precio o de planes se confirman con Dani antes de ejecutarlos".
2. **Documentos** en `00. Contrato y transcripciones/Claude`, para subirlos al proyecto: transcripciones, hoja de datos (sin datos legales), tono, oferta y branding, en `.md`.
3. **Tarea para Dani** en el checklist: crear el proyecto `NN. Nombre l Marca`, pegar las instrucciones y subir los documentos.
4. **Comprobación:** en el proyecto se pregunta "¿cuántas ventas lleva [creador]?" y tiene que responder con datos de Whop.

## 5 · Tono de voz → subpágina "🎙️ Tono de voz"

Se extrae de las transcripciones con frases literales:
- **Cómo habla:** tú o usted, país y modismos, energía, longitud de frase.
- **Sus palabras:** 10 expresiones que repite.
- **Palabras prohibidas** y **líneas rojas** (promesas y temas que no toca, nivel de urgencia que acepta).
- **Emojis:** cuáles sí y cuántos.

Todo copy posterior se valida contra esta página.

## 6 · Oferta → skill `oferta-creador`
Se lanza la skill `oferta-creador` con lo acordado en la llamada (precio, cuotas, garantía) y las transcripciones. Construye con el método Jason:
- promesa;
- vehículo único;
- núcleo con nombre;
- bonos contra objeciones;
- precio con anclas y facilidades de pago;
- tres cierres reales (bono del directo, bono de acción rápida y precio de lanzamiento);
- garantía;
- objeciones y mapa del carrito;
- llamadas de cierre de Samantha.

También deja el título del webinar y la palabra clave de Flap Class.

Resultado:
- la subpágina "💎 Oferta", con "🎤 La oferta contada" dentro;
- la ficha de planes de Whop en el checklist interno;
- los datos del contrato.

⛔ **Único checkpoint:** Dani da el OK. La oferta queda como v1 aprobada y congelada antes del contrato.

## 6b · Marca y diseño → subpágina "🎨 Marca y diseño" (branding, landing, brief y carrusel en una sola página)
La marca se define una vez y todo sale de ahí: landing, slides, plantillas, stories y carruseles.
1. **Propuesta de branding:** a partir de `01. Branding`, su Instagram y sus fotos, se proponen:
   - paleta de 5 colores en hex (fondo, texto, acento, suave y realce);
   - 2 fuentes (títulos y cuerpo);
   - estilo en 3 palabras.
2. **Prompt de landing para Lovable,** listo para pegar. Lleva el branding, la oferta v1 (promesa, método, para quién es, webinar, fecha y registro) y las fotos reales del creador. Incluye la página **`/clase`** (`[dominio-del-creador]/clase`) con el botón "activar recordatorio" (Google Calendar, Apple y Outlook) y la fecha en las dos zonas: es el enlace al que llevan todos los WhatsApp antes del webinar. Dani crea la landing.
3. **Branding confirmado:** cuando la landing existe, se leen los colores y fuentes reales del proyecto de Lovable (`src/styles.css`) y se actualiza el bloque "🎨 Branding" de esta página, que es la fuente de verdad para todas las skills.

## 7 · Guion de kick-off → subpágina "📞 Kick-off"

Llamada de 50 min:
1. **Su lanzamiento en una página** (5'): fechas, objetivos y quién hace qué.
2. **La oferta en su boca** (15'): se valida la oferta v1 y se recogen sus líneas rojas. Después, el creador dice la oferta contada en voz alta en 60 segundos, sobre todo **el porqué del precio**, hasta que le sale natural. "Si tú no crees en lo que vendes, no lo puedes vender." Si no se lo cree, se ajusta el porqué, nunca el precio.
3. **FAQ operativa** (15'):
   - dónde llega el dinero y cuándo;
   - impuestos;
   - reembolsos (los lleva Carina desde D0);
   - cuotas;
   - comunidad;
   - StreamYard y grabaciones;
   - "hasta dónde llegamos nosotros".
4. **Sus deberes de la semana** (5'), con fecha.
5. **Preguntas** (10').

La FAQ queda escrita en su ficha.

## 8 · Accesos y material → tareas del creador en la ficha

Cada punto es una tarea con fecha (todo antes del D−20):
- Fotos (autoridad y looks) en `02`.
- Testimonios en `05`.
- Logo y colores en `01`.
- Acceso a Instagram / Meta Business para anuncios.
- Cuenta de StreamYard.
- Registro en Whop (shivalink.com/registro-whop).
- Datos legales para el contrato.
- Vídeo de bienvenida para WhatsApp (30–45 s), antes del D−16. El guion lo deja `whatsapp-lanzamiento` en la subpágina 💬 WhatsApp.

## 9 · Brief de diseño para Ange → sección en "🎨 Marca y diseño"

Ange empieza el primer día sin preguntar nada. El brief recoge:
- Paleta, tipografía y estilo del bloque "🎨 Branding".
- Las 5 mejores fotos elegidas de `02`, o una lista de las que faltan.
- Textos clave: promesa, nombre del método, título del webinar, fechas y palabra clave.
- Piezas a producir: landing, stories del creador, miniatura del webinar y creativos de anuncios, cada una con su fecha.

## 10 · Prompt de carrusel → sección en "🎨 Marca y diseño"

Prompt listo para pegar en ChatGPT junto con las fotos del creador. Incluye:
- Tono de voz y paleta.
- 5 ideas de carrusel (dolor, creencia rota, caso real, método y llamada al webinar), cada una con su texto slide a slide.
- Formato 4:5, sin mayúsculas sostenidas y con la palabra clave al final.

Los resultados se guardan en `08. Carruseles`.

## 11 · Contrato

- Leer `claude/contrato-build.js` y rellenar los marcadores:
  - Datos del creador.
  - Producto, promesa, precio, cuotas y garantía (de la oferta v1).
  - `BONO_ACCION_RAPIDA`: los tres cierres con su fecha (bono del directo D0, bono de acción rápida de 24 h hasta el D+1 23:59 y precio de lanzamiento D+4).
  - Fechas: `INICIO_CAPTACION`=D−14 · `CIERRE_CARRITO`=D+4 · `INICIO_PROGRAMA`=D+7 · `FECHA_DEBRIEFING`=D+7 (en el contrato se llama "Resultados de la Fase 1") · `FECHA_ENVIO`=hoy · `FECHA_FIRMA`=hoy+2.
  - Presupuesto de publicidad.
- Generar el .docx, subirlo a `00` y adjuntarlo en la ficha.
- Crear un **borrador de Gmail** para el creador con el contrato y el enlace a su ficha. Lo envía Dani.

## 12 · Pipeline y agenda

- **Pipeline:** la fila del creador pasa a `✅ Cerrado` y se enlaza con el Lanzamiento.
- **Google Calendar** (con el creador invitado si hay email):
  - kick-off;
  - ensayo técnico con Carina D−2 (StreamYard);
  - webinar D0 (España: Carina; LatAm: Dani);
  - llamadas de cierre de Samantha (D0 → D+4, franjas reservables);
  - resultados y testimonio D+7 (sin reunión: página de resultados, vídeo de Dani y petición de testimonio);
  - reunión de los jueves hasta D+7.

---

Al terminar, se dan a Dani los enlaces (Drive, ficha, oferta, contrato y paquete del proyecto de Claude) y la lista de `[PENDIENTE]`.

**La cadena que sigue** (cada skill lee de la ficha lo que dejó la anterior):

| Paso | Skill | Para |
|---|---|---|
| 1 | Landing en Lovable (Dani, con el prompt) | D−21 |
| 2 | `whatsapp-lanzamiento` | D−18 |
| 3 | `carruseles-captacion` | D−16 |
| 4 | `estructura-producto` | D−7 |
| 5 | `masterclass-venta` | D−6 |
| 6 | `pagina-venta` | D−4 |
| 7 | `resultados-lanzamiento` | D+5 → D+7 |

Cada paso se deja como tarea en la ficha con su fecha.

**Cambio de fecha:** "cambia el Día 0 de X" → se cambia un solo campo, las tareas se recalculan solas y se mueven los eventos de Calendar.

## 🎨 Estándar Notion (todas las páginas)
- **Arriba, un callout de resumen** con lo esencial en 2–3 líneas.
- **Encabezados de color** con emoji (`## 🎯 Título {color="blue"}`).
- **Tablas** para comparar y **toggles** para lo largo: nunca muros de texto.
- **Callouts con propósito:** azul para información, amarillo para entregables o avisos, verde para lo listo y gris para notas.
- Una idea por bloque, frases cortas y sin mayúsculas sostenidas.

## Principios

- **Una fuente de verdad:** el dato vive en la ficha. Si un dato cambia, gana el último.
- **Fechas calculadas, nunca escritas.**
- **El creador ve su camino, no nuestras tripas:** reparto, reglas internas, regalo, repesca y datos legales nunca aparecen en su ficha.
- **Lo aprobado se congela:** los cambios van con versión y aviso.
- **Velocidad antes que perfección:** el borrador de hoy vale más que la oferta perfecta de la semana que viene.