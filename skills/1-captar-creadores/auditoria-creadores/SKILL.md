---
name: "auditoria-creadores"
description: "Genera auditorías de monetización personalizadas para creadores (slides de Gamma con fotos reales, testimonios con foto y ficha en Notion). Úsalo con \"hazme la auditoría de X\", \"analiza este perfil\" o al compartir métricas o un CSV de un creador."
---

# Skill: Auditoría de Monetización de Creadores — Shivalink

Genera auditorías de monetización personalizadas que muestran al creador la oportunidad que está dejando encima de la mesa. El objetivo no es analizar — es despertar. La auditoría es una carta de amor estratégica: "te he visto de verdad, y lo que veo vale dinero."

El hilo emocional que atraviesa toda la auditoría: **Dani invierte en el proyecto del creador.** Pone su equipo y su conocimiento, no cobra nada por adelantado y van 50/50 en ingresos y gastos. Lo que el creador de verdad arriesga es seguir dejando dinero sobre la mesa un día más. Ese es el verdadero costo. Toda la auditoría debe respirar esa idea.

---

## Reglas de Dani que mandan sobre el resto de la skill (oct 2026)

1. **Se empieza siempre por el porqué.** Justo después de la portada va «Por qué te grabo esta auditoría»: en la voz de Dani, 2–3 frases cortas y personales. Qué ha visto en su contenido y en sus comentarios que le ha hecho parar, y que solo trabaja con 4 creadores al mes, así que antes de proponer nada quiere enseñarle con sus propios números lo que ve.
2. **Nunca un precio fijo. Siempre un rango.** Producto para cliente final: entre 1.000 y 1.500 (€ o $). Certificación o programa para profesionales: entre 1.500 y 2.500. Continuidad o membresía: entre 47 y 97 al mes. Las proyecciones también van en rango (personas × precio mínimo – precio máximo), igual que el retorno para el alumno y el coste de la inacción. La simulación de la página de venta muestra el rango, no un precio cerrado.
3. **Nada de Alex Hormozi en lo que ve el creador.** Se puede pensar la oferta con criterio de negocio (resultado soñado, confianza, menos tiempo y esfuerzo, escalera de productos), pero en la auditoría y en las slides no se nombra a Hormozi, no se habla de «ecuación de valor» ni de fórmulas de valor, ni de «oferta que da vergüenza rechazar». La slide de bonos se titula «Todo lo que incluye». El sistema de lanzamiento se presenta como «Así lo validamos», sin llamarlo «fórmula».
4. **Sin garantías.** No se propone garantía de ningún tipo.
5. **Testimonios siempre con foto.** Cada caso de Shivalink que se nombre (David Bodhi, Vero de Lima, Karen Luna…) va con su foto real, su cifra y el titular de su caso. Ver «Testimonios con foto».
6. **El entregable son las slides de Gamma abiertas en el navegador** para que Dani las mejore. No hace falta entregar documento .md: el texto de la auditoría es el guion interno y el resumen va a la ficha de Notion.
7. **Si el creador ya tiene producto**, la auditoría parte de lo que ya vende (precio actual, formato, qué dicen sus alumnos) y propone cómo subirlo de nivel: mejor oferta, más valor percibido, rango de precio más alto, escalera y continuidad. Nunca se ignora lo que ya existe.

---

## Paso 0 · Las reglas del juego (siempre, antes que nada)
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

---

## Inputs que necesitas del usuario

**Obligatorios:**
- Nombre y handle de Instagram del creador
- Un CSV de reels o 3 a 7 posts/reels top con sus métricas reales (likes + comentarios + views)
- Número total de seguidores (si no lo da, se toma de `vidiq_ig_profile`)

**Opcionales:** web, Linktree, libros, podcasts, comunidades de pago, productos actuales.

Con esos inputs, tú haces la investigación completa antes de escribir nada. Si falta información clave que no puedas encontrar tú mismo, pregunta. Nunca inventes datos ni métricas.

---

## ⚠️ REGLA DE ORO — Jerarquía de fuentes de datos (NUNCA violar)

Los datos numéricos que proporciona el usuario (o su CSV) son SIEMPRE la fuente de verdad. La búsqueda web es contexto y nunca los sobreescribe. Antes de redactar, comprobar que ningún dato del usuario se alteró durante la investigación. Si hay una discrepancia grande, usar el dato del usuario y mencionárselo a Dani.

---

## ⚠️ REGLA DE REALISMO — Techo de proyección (NUNCA violar)

Ninguna proyección puede superar **1.000.000 € o $1.000.000**. Si el extremo alto del rango lo supera, se topa en 1.000.000 con una nota breve: «lo topo en 1 millón para mantenernos en terreno realista y creíble». Un número que el creador no se cree mata toda la auditoría.

---

## Fase 0 — Investigación previa (SIEMPRE antes de escribir)

Obligatoria y sin esperar más instrucciones:

- **Perfil:** `vidiq_ig_profile` (seguidores, bio, enlace externo).
- **Comentarios reales:** desde una pestaña de instagram.com en el navegador (Dani tiene sesión) se leen con `fetch('/api/v1/media/<id>/comments/?can_support_threading=true&permalink_enabled=false', {headers:{'X-IG-App-ID':'936619743392459'}})`, donde `<id>` es el shortcode del reel decodificado en el alfabeto base64 de Instagram. La respuesta trae también el caption. Buscar patrones de demanda («¿dónde estás?», «¿de dónde es?», «¿qué fórmula usaste?», «por más que lo intento no lo logro») y guardar frases textuales para las slides. Ojo: si el CSV trae reels con palabra clave («comenta GRANNY»), muchos comentarios son la palabra clave; cuentan como demanda de tutorial, no como conversación.
- **Web, Linktree, productos actuales y precios, prensa, libros, podcasts, comunidades.**
- **Fotos reales del creador:** abrir su perfil en el navegador, leer `img.currentSrc` de los posts de más de 700 px y descargarlas desde el contenedor con curl (el CDN de Instagram sí responde desde el contenedor). Las de su web también valen. Elegir 3–4: retrato para portada, una de su mundo, una en acción.
- **Espejo de mercado:** 1 o 2 referentes que ya facturan vendiendo algo parecido (mismo nicho y mercado → otro país hispanohablante → EE. UU.). Para cada uno: nombre, qué vende, precio público y evidencia pública de ingresos o alumnos, siempre como estimación con su fuente. Si no hay evidencia de ingresos, se cita solo el precio público. Nunca se inventa una cifra.
- **Análisis visual:** paleta (2–3 hex), luz y ambiente, su mundo visual y tono. Con eso se elige el tema de Gamma.
- **Moneda:** € si su audiencia es de España/Europa; $ si es latinoamericana (mirar el castellano de los comentarios: «seca», «regia», «bárbaro», voseo…).

---

## Fase 0b — Semáforo de entrada (interno, solo para Dani)

Los seguidores son el tamaño del escaparate; la autoridad es si la gente entra a comprar. Puntuar de 0 a 2 cada criterio (los seguidores no puntúan):

| Criterio | 0 | 1 | 2 |
|---|---|---|---|
| **Autoridad en el sector** | Sin respaldo visible | Formación o experiencia, poco visible | Referente reconocido |
| **Demanda probada** (comentarios con preguntas) | Vacíos o genéricos | Algunas preguntas | Le piden ayuda de forma constante |
| **Ya le han pagado** | Nunca ha vendido | Algo puntual o barato | Clientes recurrentes |
| **Audiencia que responde** (reels recientes) | Alcance inflado por virales antiguos | Media | Alta y reciente |
| **Disponibilidad** (12 sesiones en vivo + stories diarias) | No puede | Dudoso | Lo tiene claro |

🟢 7–10 adelante · 🟡 5–6 con condiciones (qué falta y cómo compensarlo, sin bajar de 1.000) · 🔴 0–4 no se hace (→ «⏳ Futuro» o «🚫 No cualificado» con el motivo).

El semáforo nunca aparece en la auditoría. Se enseña a Dani en el chat y se guarda en la ficha: `🚦 Semáforo de entrada: [puntos]/10 · [motivo]`.

---

## FASE 1 — Guion de la auditoría (interno)

Es el texto que Dani cuenta en el Loom y que alimenta las slides y la ficha de Notion. Orden:

0. **Por qué te grabo esta auditoría** (regla 1).
1. **Quién eres:** nicho, audiencia, autoridad, lo que ya vende y la transformación oculta (lo que su audiencia busca de verdad).
2. **El patrón oculto:** los temas que más funcionan, con métricas reales y comentarios textuales, y un veredicto de 1–2 frases.
3. **Los números:** «el 99 % no te compra, solo el 1 %». Cálculo en rango: seguidores × % × precio mínimo – máximo. En audiencias grandes, el 0,1 % como escenario base y el 0,05 % como prudente; en pequeñas (< 50.000), hasta el 1–2 %. Topar en 1 M. Nunca metas fijas de facturación.
4. **El espejo de mercado:** admiración, nunca ataque; cifras siempre «se estima» + fuente. «Lo que allí ya funciona, aquí está empezando. Llegar primero es la ventaja.»
5. **Casos de Shivalink con foto** (ver abajo).
6. **Propuesta principal:** la mejor oportunidad para ese creador (cliente final o profesionales, según dónde estén la demanda y la autoridad). Nombre en borrador con resultado y plazo, para quién, estructura por semanas o pilares, primera edición en vivo, rango de precio, retorno para el alumno en rango, plazas limitadas por capacidad real y proyección en rango. Si ya tiene producto, partir de él (regla 7).
7. **Todo lo que incluye:** 3–4 bonos hechos con lo que el creador ya tiene (sus plantillas, sus fórmulas, su manera de grabar) y uno que nadie más puede dar (por ejemplo, derivar a sus alumnos la demanda que él no puede atender con un mapa o directorio de certificados).
8. **No es un lanzamiento, es un negocio:** escalera con rangos — clase gratis → producto de entrada → producto principal → continuidad mensual → VIP — con la proyección de la continuidad en rango.
9. **Propuesta secundaria** (la otra cara: cliente final o profesionales), como segunda fase si encaja.
10. **Por qué ahora:** cuatro razones con datos reales del creador.
11. **Yo invierto en tu proyecto:** camino actual vs. camino de escala, coste de la inacción al mes en rango, y «Yo invierto en tu proyecto: pongo mi equipo, mi conocimiento y más de 7 años de experiencia, y vamos 50/50 en ingresos y gastos. Solo gano si tú ganas.»
12. **Así lo validamos:** las 4 fases en una línea cada una (landing · grupo de WhatsApp · clase en vivo · carrito abierto 4 días). «El cómo exacto lo vemos juntos en el café. Esto no se improvisa.»
13. **Tres caminos:** lo haces tú · te cedo esta auditoría para tu equipo · lo hacemos juntos (+7 años, +8,6 M€ generados, nada por adelantado). Cerrar con una frase del propio creador si la hay. Invitar al café de 15–20 minutos.

**Objeciones disueltas sin nombrarlas:** «ya tienes el 90 % del contenido en tu cabeza; la primera edición se hace en vivo», «no pierdes la esencia, la escalas», «ya validaste la demanda en Instagram», «cobrar filtra a quien está comprometido». Nunca «probablemente estás pensando…». Más frases y metáforas en `references/ejemplos-auditoria.md` (ignorar cualquier precio fijo de ese archivo).

**Tono:** conversacional y cercano, como Dani en un café; adaptado al nicho. Al menos tres referencias concretas de la investigación (un reel con su copy, un comentario textual, algo de su web). Sin mayúsculas sostenidas. Nunca inventar testimonios ni cifras.

---

## Testimonios con foto (obligatorio cuando se nombra un caso)

- Elegir 2–3 casos del nicho más parecido en `references/casos-exito.md` y comprobarlos en shivalink.com/testimonios (tiene filtros por nicho: Belleza, Psicología, Docencia, Negocios Digitales…). Priorizar parecido sobre cifra. Si el banner y el texto del caso no coinciden, usar la cifra del texto del caso y avisar a Dani.
- Foto: `https://shivalink.com/testimonials/testimonial-banner-<slug>.webp` (ej.: `david-bodhi`, `vero-de-lima`, `karen`). Recortar el círculo de la cara (zona aproximada 66,87 → 612,633 en el banner de 1280×720).
- Montar una slide de tarjetas en HTML + Playwright con la paleta de la presentación: foto circular, nombre, nicho, cifra grande y el titular del caso tal como sale en la web (sin comillas: no es una cita suya). Pie: «Todos los casos, en vídeo, en shivalink.com/testimonios · +100 clientes · +8,6 M€ generados».
- Subirla a una URL pública (Whop `files_create` público + PUT) y meterla en Gamma como slide de imagen a pantalla completa.

---

## FASE 2 — Presentación en Gamma (el entregable)

**Diseño (lo que le gusta a Dani):**
- Una idea por slide y como mucho unas 25 palabras. Nada de párrafos.
- Números gigantes como protagonistas: seguidores, reproducciones, el rango anual, el rango de precio.
- Fotos reales del creador ocupando media slide o la slide entera en portada, quién eres, propuesta y cierre. Sin imágenes genéricas de IA cuando hay fotos reales.
- Alternar fondos claros y oscuros de su paleta. Títulos en serif elegante, nunca en mayúsculas.
- Un tema distinto en cada auditoría que encaje con su marca (`get_themes`), pasando sus hex en `additionalInstructions`. El tema personal de Dani (`gk40a3w31xghw0k`) solo si nada encaja.

**Imágenes:**
- Fotos del creador, simulación de página y tarjetas de testimonios: subirlas a URL pública y meterlas con `![descripción](url)`.
- Con `imageOptions.source: noImages` Gamma descarta las fotos enlazadas. Usar `aiGenerated` (`photorealistic`) sin líneas «Imagen:» o añadir las fotos después con `edit_gamma` indicando slide y posición.
- **Simulación de la página de venta:** HTML + Playwright (escritorio + móvil) con sus fotos, su paleta, el nombre del programa, sus pilares y el **rango de precio**.

**Parámetros fijos:** `textMode: preserve` · `cardSplit: inputTextBreaks` · `format: presentation` · `cardOptions.dimensions: 16x9` · idioma del creador (`es-es` o `es-419`).

**Estructura (19 slides):**
1. Portada: «[Nombre], tu oportunidad está aquí.» + foto.
2. Por qué te grabo esta auditoría.
3. Quién eres (número grande + 2–3 datos + foto).
4. Tus números te están diciendo qué vender (reproducciones + 3 reels top).
5. Lo que te piden en los comentarios (cita gigante + veredicto).
6. Lo que estás dejando encima de la mesa (rango anual gigante + «el 99 % no te compra»).
7. Alguien como tú ya lo está haciendo (espejo).
8. Testimonios con foto.
9. Propuesta principal (nombre + promesa + estructura + foto).
10. Así se vería tu página (simulación grande).
11. Todo lo que incluye.
12. Rango de precio + retorno del alumno + plazas.
13. No es un lanzamiento, es un negocio (escalera con rangos).
14. Propuesta secundaria (si aplica).
15. [Año en curso] es tu año: cuatro razones.
16. Yo invierto en tu proyecto.
17. Así lo validamos.
18. Tres caminos (+ frase del creador).
19. ¿Un café de 15 minutos? (+ foto).

**Revisión antes de entregar:** exportar a PDF (`export_gamma`), hacer una hoja de contactos con `pdftoppm` y mirarla. Corregir con `edit_gamma` fotos que falten o salgan recortadas, texto diminuto, mayúsculas, precios fijos colados o menciones a Hormozi o a fórmulas.

**Entrega:** abrir la presentación en el navegador de Dani (pestaña nueva) y decirle en dos líneas qué tema eligió y por qué. Avisar si quedan pocos créditos de Gamma (una generación gasta unos 60–100).

---

## FASE 3 — Notion (ficha del creador)

Al entregar: en el tracker (📋 Creadores en Prospección) actualizar «Seguidores IG» y «Producto» (con el rango), y escribir en el cuerpo el semáforo, la oferta, los números en rango, los referentes, los casos usados y el enlace al Gamma con el tema elegido.

Cuando Dani vuelva con el Loom:
- Hacer `notion-fetch` de la ficha para confirmar el esquema, pegar la URL en «Auditoría Loom», poner «Paso actual» = «🎬 Auditoría enviada» y «Fecha último paso» = hoy (`notion-update-page`, `update_properties`).
- Redactar el WhatsApp para el equipo (Samantha) avisando de que la auditoría está lista, con el enlace: primera frase en negrita y el resto normal, con emojis, en versión completa y concisa.
- Confirmar a Dani: «Listo — pegué el Loom en la ficha de [creador] y moví "Paso actual" a 🎬 Auditoría enviada.»