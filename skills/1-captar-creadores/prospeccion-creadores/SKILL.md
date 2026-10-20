---
name: "prospeccion-creadores"
description: "Busca creadores de Instagram cualificados (50K+, fans reales, da la cara, nicho específico, sin producto caro) y los añade sin duplicados al tracker de Notion para Samantha. Úsala con \"prospección\", \"busca creadores\" o \"llena el tracker\"."
---

# Prospección de creadores · Shivalink

Objetivo: llenar el tracker **📋 Creadores en Prospección** (collection://67ec9f1f-34e3-491e-a76b-613d66fed753) con creadores nuevos y cualificados para que Samantha los contacte. Meta diaria de Dani: 100 fichas nuevas, pero la calidad y la seguridad de su cuenta de Instagram van primero. Mejor 80 fichas que pasen el filtro que 100 flojas.

**Analogía guía:** no buscamos gente, buscamos peces que ya saltan. Los comentarios que piden ayuda son el agua que hierve. Y no pagamos por pescar peces que ya están en la nevera.

**Mentalidad Hormozi:** la meta no son las fichas, son los partnerships. Cada día se mide qué fuente da más fichas por perfil cargado y, cuando Samantha marque respuestas en el tracker, qué fuente da más respuestas y cierres. El tiempo se reparte en proporción a lo que rinde cada fuente.

## Reglas que nunca se rompen
- Solo buscar y añadir. No se contacta a nadie: ni DMs, ni follows, ni likes, ni comentarios. El contacto lo hace Samantha.
- No se abren stories ni destacados (el creador vería que @danischepers los miró).
- Cero duplicados.
- Nunca se inventan métricas ni detalles: si falta un dato, «s/d».
- Nunca se deduce la cara: si no se puede comprobar, no entra (se apunta en una lista de pendientes).
- Si Instagram muestra actividad inusual, verificación, captcha o bloqueo: parar de navegar al instante y avisar a Dani.
- **Señales previas de limitación** (tratarlas como aviso aunque no haya bloqueo): el panel de similares da «Error al cargar», las rejillas de hashtag cargan solo 3 publicaciones, respuestas 429. Con una señal: pausa larga y ritmo de 40/h. Con dos: se deja Instagram el resto del día.

## Presupuesto diario (tope absoluto)
- **Apify: máximo 10 $ al día.** Nunca se supera, aunque falten fichas para llegar a 100. Mejor 70 fichas buenas dentro del presupuesto que 100 pagando de más.
- **vidIQ: máximo ~100 créditos al día**, y solo para finalistas (comprobar la cara o un dato que falte). Las búsquedas de outliers salen sesgadas a política y noticias: no usarlas para descubrir.
- Antes de lanzar cualquier tirada de pago, comprobar lo gastado ese día. Apuntar el gasto en el log.

## España primero
- **Al menos 7 de cada 10 fichas del día tienen que ser de España.**
- Latinoamérica solo entra si es una 🔥 A clara.
- Señales de España: menciona ciudades o comunidades, euros, Seguridad Social, Hacienda, autónomos, oposiciones, MIR/EIR, selectividad (PAU/EBAU), ESO, Mercadona, «en España».

## El filtro Hormozi: mercado hambriento
Antes de mirar números, cuatro preguntas: ¿tiene **dolor o urgencia** real? ¿su público tiene **poder adquisitivo**? ¿es **fácil de encontrar** (nicho concreto)? ¿es un **mercado en crecimiento**? Un escaparate enorme con la tienda vacía no vende: los seguidores son el tamaño del escaparate; el dolor y los comentarios son la gente que entra a comprar.

### Filtros obligatorios
1. 50.000 seguidores o más.
2. Mediana de comentarios ≥ 15 en las últimas 12 publicaciones (sin fijados ni sorteos). Siempre mediana, nunca media (la «media de comentarios» de Apify engaña).
3. ≥ 2 comentarios por cada 10.000 seguidores (con esa mediana).
4. Mediana de reproducciones de reels ≥ 10 % de los seguidores.
5. Da la cara: sale hablando a cámara (importante: el programa es en vivo). Comprobado, nunca deducido. Voz en off, tarjetas de texto o fotos de lugares no cuentan.
6. Activo en los últimos 30 días.
7. En español, con prioridad España (ver arriba).
8. Sin producto digital o con producto barato (< ~100 €). Fuera si ya vende un programa > 500 €, tiene embudo de llamada o VSL.
9. Nicho monetizable con pericia, cuanto más específico mejor. Fuera: humor, noticias, memes, marcas, tiendas, despachos, clínicas, academias, negocios (restaurantes, peluquerías, bares), celebridades, lifestyle sin pericia, network marketing principal, pseudociencia peligrosa, perfiles hechos con IA.
10. **Dolor ≥ 1 obligatorio.** Un nicho de pura afición sin un problema que resolver (dolor 0) no entra, aunque tenga muy buenas métricas.

**Suman (no obligatorios):** comentarios que preguntan («cómo», «precio», «curso», «quiero», «info») o uso de «comenta X»; ya vende algo barato (guía, ebook, comunidad de pago barata): su gente ya compra y le falta el escalón caro. El crecimiento de 90 días no se usa.

## Puntuación (0–10, entran ≥ 6)
Dolor/urgencia (0–2) · poder adquisitivo (0–2) · especificidad (0–2) · fans reales (0–2) · autoridad (0–2).
- **🔥 A:** 8 o más **y** (dolor 2 o poder adquisitivo 2).
- **B:** 6–7, o 8+ sin dolor 2 ni poder adquisitivo 2.
- Con dolor 0 no entra, sea cual sea la nota.

## Proceso
### Paso 0 · Deduplicar primero
El tracker tiene miles de fichas (~8.650 en oct-2026) y más de la mitad de los candidatos ya están. Exportar con SQL (por páginas) todas las columnas «Handle de Instagram» y «Creador», normalizar el handle (minúsculas, sin URL, sin ?utm, sin @ ni barras) y guardarlo en un archivo local. Revisar cada candidato contra ese archivo **antes de abrir su perfil o de pagar por él**. Justo antes de crear una ficha, búsqueda rápida con notion-search por el handle (puede haber otros procesos añadiendo fichas a la vez).

### Paso 0.5 · Cribar fuera de la cuenta de Dani
Antes de abrir ningún perfil en el navegador de Dani, pasar cada lista de candidatos por la página embed pública de Instagram (seguidores y comentarios de los últimos posts) desde fuera de su sesión. Solo se carga en su cuenta lo que ya pasa seguidores y comentarios. Así se gastan muchas menos cargas y se protege la cuenta.

### Paso 1 · Descubrir (en este orden, según lo que más rinde)
Empezar temprano: las fuentes buenas tienen cupo diario.
1. **Gratis · Cuentas similares de Instagram (la favorita de Dani y la que más rinde).** Panel «Cuentas similares» de semillas españolas grandes (≥ 100K). Semillas preferentes: creadores ya lanzados por Shivalink (psicologo_teayudoaeducar, protocolo.y.etiqueta, lidialestegasmatrona, elaborarte_sevilla, vidaenvela, allthesehumans, davidbodhi, vivirdelaterapia, jessicagarciabyb, anagomezpsico, viajandoconarequipe; no se crea ficha de ellos) y fichas 🔥 A españolas del tracker, incluidas las del día anterior. Tirar del hilo: cada nueva A española se convierte en semilla. **Máximo 1 apertura de panel cada 15–20 min.** Si el panel da «Error al cargar» dos veces seguidas, se deja el resto del día (Instagram limita esa función).
2. **De pago, a primera hora · Apify lookalikes** (actor de perfiles relacionados en el ordenador de Dani): **profundidad 1** (nunca 2), solo con semillas 🔥 A españolas, **≤ 5 $ por tirada y máximo 2 tiradas al día**, sin pasar nunca de 10 $ en total. Al recibir los resultados, deduplicar contra el tracker antes de mirar nada (suele estar ya dentro ~la mitad). Junto con similares, es la fuente que más fichas da por carga.
3. **Gratis · Hashtags muy de nicho** (#tdahadulto, #educacioncanina y parecidos; nunca genéricos, que tiran a Latinoamérica o a entretenimiento) y palabras muy españolas (Mercadona, autónomos, Hacienda, oposiciones, MIR, EIR, EBAU, ciudades). Una sola carga del hashtag en el navegador de Dani; los autores se sacan de las páginas públicas de los posts y se criban con el embed (Paso 0.5). Rinde poco (~2 fichas por 300 autores), pero es gratis. También los coautores de reels («colaboración con…») de los perfiles que ya se cargan.
4. **Por probar · Hotmart, Udemy y Teachable en español:** creadores con cursos de < ~100 € y 50K+ en Instagram. **Minería de comentarios:** priorizar perfiles cuyos reels tienen muchos «¿tienes curso?», «precio», «info».
5. **Bajo rendimiento (solo si sobra tiempo):**
   - Pódcasts: el oro está en los invitados expertos, pero los RSS no traen el handle de Instagram y adivinarlo por el nombre falla. Solo sirven uno a uno, cuando el episodio o la web del invitado enlaza su Instagram. Los pódcasts generalistas grandes traen sobre todo entretenimiento.
   - Biblioteca de anuncios de Meta: casi todos los anunciantes tienen < 50K (pagan porque su orgánico es pequeño) o son academias y marcas; los que anuncian masterclass suelen vender caro. Sirve para encontrar negocios, no creadores.
   - WebSearch de listas de divulgadores: casi nunca devuelve enlaces de Instagram.
- Apuntar cada día en el log de fuentes: perfiles cargados, cualificados y fichas escritas por fuente.

### Nichos que mejor rinden
- **Lanzamientos Shivalink que mejor han ido:** psicología infantil y crianza, protocolo/etiqueta/presencia, viajes con voluntariados, salud metabólica y fuerza 40+, tiroides, cultivo de hongos, matrona y embarazo, autosuficiencia rural, artesanía.
- **También rinden en prospección:** TDAH y altas capacidades en adultos, conducta canina, sanitarios que emigran, condiciones laborales de médicos, salud femenina de especialista, derecho de familia y extranjería, veterinaria, oficios, temas muy españoles (oposiciones, autónomos, fiscalidad, inversión inmobiliaria). Aficiones muy concretas solo si resuelven un problema (dolor ≥ 1).
- **Peor resultado:** negocios de belleza y maquillaje (no priorizar). Salud general y fitness en España ya están muy trabajados. Las cuentas de veterinaria y matronas que salen por hashtag suelen ser clínicas pequeñas.

### Paso 2 · Métricas gratis desde el navegador
Leer los datos que trae la propia página del perfil (seguidores, bio, enlace, últimos posts con comentarios y reproducciones), sin llamar a la API interna (/api/v1, da 429). Comprobar la cara con las miniaturas de los reels (si la ventana de la app está minimizada, las capturas fallan: avisar a Dani para que la restaure; mientras, la cara se comprueba con vidIQ solo en finalistas y, si tampoco se puede, va a pendientes y no se añade).
**Ritmo seguro:** máximo ~40–70 perfiles por hora (40 si Instagram ha dado algún error ese día), pausas de 20–60 s entre perfiles y descansos de 5–10 min cada 40. Al terminar, borrar cualquier script o clave temporal guardada en el navegador de Instagram (localStorage).
vidIQ solo para finalistas a los que les falte un dato.

### Paso 3 · Abridor personalizado (estilo Chris Voss)
Cada ficha lleva un abridor listo para que Samantha lo copie y lo pegue. La personalización es la clave.
Formato: «Hola [nombre], [un detalle REAL y concreto de su contenido, en una frase corta]. ¿[pregunta sencilla orientada al «no», sobre ese mismo tema]?»
Arranques para rotar (preguntas que rompen la barrera del no):
- «¿Sería una locura pensar que…?»
- «¿Sería descabellado preguntarte si…?»
- «¿Has descartado alguna vez…?»
- «¿Te parecería raro que te pregunte si…?»
- «¿Es mala idea preguntarte si…?»
Reglas: el detalle sale de su perfil o de sus reels, nunca inventado; una sola pregunta; máximo ~30 palabras; sin mencionar auditoría, agencia, Shivalink ni dinero; nunca el mismo arranque dos veces seguidas.
Ejemplo: «Hola Arsenio, vi cómo resuelves las dudas de custodia compartida en tus reels. ¿Sería una locura preguntarte si tienes algo para padres que están en pleno proceso?»

### Paso 4 · Crear la ficha (en cuanto un creador pasa el filtro, no al final)
- Creador · Handle de Instagram (https://www.instagram.com/<handle>/) · Nicho concreto · Seguidores IG
- Tier: «🛩️ Avión» (< 150.000) o «🚀 Cohete» (≥ 150.000)
- Fuente: «Claude Cowork» · Responsable: «Samantha Schepers» (es un desplegable, no un campo de persona) · Equipo: ["Samantha"] · Paso actual: «📋 Por contactar»
- Producto: lo que vende y su precio, o «Sin producto digital»
- Notas, una línea que empieza por la prioridad: «🔥 A · Métricas (mes-año): X seg · mediana N comentarios (12 posts) · N por cada 10K · mediana de reproducciones N (N %) · último post hace N días · da la cara: sí · Contacto: email / web · País · 🎯 N/10 (desglose) · Por qué encaja · Ángulo de producto · Abridor sugerido: "…"».
- Sin fechas de contacto.

## Entrega a Dani
- Avances cada 10 fichas con las URL de Instagram (nicho · seguidores · mediana de comentarios · país · prioridad).
- Al final: total añadido (España / Latinoamérica y % de España, A / B), URL de las A, **gasto del día en Apify (sobre el tope de 10 $) y en vidIQ**, qué fuente dio más fichas, ritmo real y qué frenó.
- **Aprendizaje del día:** una o dos líneas sobre qué funcionó y qué no, para actualizar esta skill cuando el patrón esté claro.
- Solo se añaden fichas al tracker: sin páginas de resumen ni columnas nuevas, salvo que Dani lo pida.