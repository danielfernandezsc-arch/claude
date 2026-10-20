---
name: publicar-video-youtube
description: Convierte la transcripción de un vídeo de YouTube de Dani en el paquete completo de publicación — títulos, descripción optimizada, etiquetas con keyword research real de vidIQ, y el correo de lanzamiento estilo Isra Bravo para GoHighLevel. Úsalo SIEMPRE que Dani pegue la transcripción de un vídeo, o diga "dame el título y las etiquetas de este vídeo", "prepara la publicación de este vídeo", "SEO de este vídeo", "etiquetas y descripción con vidIQ", "el correo de este vídeo", "voy a subir este vídeo", o cualquier combinación de transcripción/vídeo + título/descripción/etiquetas/correo. Actívalo también si solo pega el transcript sin pedir nada concreto — eso es la señal de entrada de este flujo. Devuelve en una sola pasada los títulos, las etiquetas, la descripción y el correo estilo Isra Bravo.
---

# Publicar vídeo de YouTube

Este skill cierra el hueco entre "ya he grabado el vídeo" y "ya está publicado y enviado a la lista".

Dani graba en una sola toma y sin guion cerrado, así que la transcripción es materia prima: hay historias personales, metáforas y frases sueltas que valen oro. El trabajo aquí es extraerlas y convertirlas en el paquete de publicación. **Nunca inventes historias ni datos que no estén en la transcripción** — todo el material sale de ahí.

## Entrada

Lo único imprescindible es la **transcripción**. Si además da la URL del vídeo, úsala en el correo; si no, deja `[URL]` como marcador y avísale al final.

No pidas más contexto antes de empezar. Si tiene el transcript, ejecuta.

## Antes de nada: lee la transcripción entera y extrae

Antes de tocar ninguna herramienta, saca de la transcripción:

- **El tema central** en una frase.
- **Las historias personales** (Burger King, viajes, familia, negocio…). Estas son el combustible del correo.
- **Las metáforas** (el globo bajo el agua, el Face ID, las olas…). Suelen ser lo mejor del vídeo y casi siempre son el mejor asunto de correo.
- **Las frases zas** — las que resumen todo en una línea.
- **La estructura**, para los capítulos de la descripción.

Si la transcripción viene de auto-subtítulos, estará llena de erratas y repeticiones. Interpreta la intención, no copies el error literal.

---

# FASE 1 · Investigación con vidIQ

**Esta fase requiere datos reales. No inventes volúmenes de búsqueda ni títulos de la competencia.**

## 1a · Keyword research

Llama a `vidiq_keyword_research` **mínimo dos veces**, con semillas distintas:

1. La keyword más obvia del tema (ej. "como ganar dinero").
2. Un ángulo lateral o más profundo del mismo tema (ej. "libertad financiera").

Parámetros: `mode: "research"`, `country: "ES"`, `includeRelated: true`.

Si el tema tiene un tercer ángulo claramente distinto, haz una tercera llamada. Más de tres es gastar créditos sin ganar nada.

Lo que importa es la **puntuación general** (`overall`), no el volumen a secas. Un término con 300.000 búsquedas y competencia de 60 es peor apuesta que uno con 100.000 y competencia de 34.

- **Volumen alto + competencia baja** = la oportunidad. Va primero en las etiquetas y, si se puede, en el título.
- **Volumen 0** = descártalo, aunque suene perfecto. Aquí se cuelan los términos que "parecen" buenos y no busca nadie. **Dilo explícitamente en la respuesta**: a Dani le sirve tanto saber qué usar como qué no.
- Ojo con las tildes: a veces la versión sin tilde puntúa mejor que la correcta. Usa la que puntúe.

## 1b · Outliers (qué está funcionando ya)

Llama a `vidiq_outliers` para ver qué vídeos del nicho están rompiendo por encima de la media de su canal.

Parámetros: `keyword` = el tema en lenguaje natural, **`language: "es"`** (crítico — si lo omites busca títulos en inglés y los resultados no sirven de nada), `contentType: "long"`, `publishedWithin: "threeMonths"` (para español está capado ahí), `limit: 20`.

**Lo que buscas es la ESTRUCTURA del título, no el tema.** Los temas no se copian; los patrones sí. Fíjate en:

- Estructuras que se repiten en canales distintos — si dos canales sin relación revientan con el mismo molde, el molde funciona.
- El `breakoutScore` alto en canales pequeños (`subscriberCount` bajo). Eso indica que el nicho premia el contenido, no el tamaño del canal — dato útil y motivador para Dani.
- Qué ángulos están saturados y cuáles no. Si el 60% de los outliers son audiolibros de sabiduría oriental, ese hueco está lleno y no es su terreno.

En la respuesta, resume en 3-5 líneas qué patrones has visto y **cuál has usado para el título recomendado**. Dani quiere saber por qué, no solo qué.

Nunca copies un título ajeno. Extrae el molde y méteselo su contenido.

---

# FASE 2 · Títulos

Da **5 títulos**, ordenados de más a menos recomendado, y explica en una línea por qué el primero es el primero.

Convenciones de Dani (respétalas):

- Frases directas o acusatorias, apuntando al espectador.
- Listas numeradas con promesa concreta.
- Urgencia específica, no genérica.
- Paradojas sin resolver, que obligan a hacer clic para cerrarlas.
- **Evita** preguntas genéricas y promesas vagas ("¿Cómo gestionar tus emociones?" es exactamente lo que no queremos).

Mete la keyword principal en el título solo si cabe sin romper el gancho. Un título con keyword y sin gancho no lo ve nadie.

---

# FASE 3 · Etiquetas

Usa los datos que ya sacaste en la Fase 1. Menciona en la respuesta las 2-3 mejores oportunidades con sus cifras antes de dar la lista.

## Cómo montar la lista

- **Entre 22 y 26 etiquetas.**
- **Máximo 500 caracteres contando las comas.** Cuéntalos de verdad antes de entregar y di el total.
- **El orden importa**: primero las de mayor puntuación, después las de coincidencia exacta con el tema, después la cola larga específica del vídeo, y al final siempre las de marca (`no sufras mas`, `dani schepers`).
- Todo en minúsculas, separado por comas.
- Incluye 3-5 etiquetas de cola larga sacadas del contenido concreto del vídeo (conceptos, historias, dicotomías) — no salen del keyword research, salen de la transcripción.

---

# FASE 4 · Descripción

Estructura fija:

```
[Línea 1 · la frase más fuerte del vídeo. NO un resumen.]

[2-4 párrafos cortos que abren el bucle sin cerrarlo.
Nombran el problema, la metáfora principal y una historia.
Escritos en su voz: frases cortas, saltos de línea, cero jerga.]

━━━━━━━━━━━━━━━━━━━━━━━━

CAPÍTULOS

00:00 · [gancho, no tema]
0X:XX · [gancho, no tema]
...

━━━━━━━━━━━━━━━━━━━━━━━━

MI LIBRO · NO SUFRAS MÁS
40 cartas que le escribí a mi hija.
→ [enlace]

━━━━━━━━━━━━━━━━━━━━━━━━

[Párrafo de cierre que mete 3-4 keywords en prosa natural.]

[3 hashtags]
```

Reglas que hacen la diferencia:

- **Las dos primeras líneas son un segundo thumbnail.** En móvil es lo único que se ve antes del "…más". Van la frase más potente del vídeo, no "En este vídeo te hablo de…".
- **Nunca cierres el bucle.** La descripción plantea; el vídeo resuelve. Si cuentas la solución, has matado el clic.
- **Las keywords van en prosa**, integradas en frases reales. Nada de bloques de términos sueltos al pie: ya no aportan y quedan fatal.
- **Los capítulos se titulan por el gancho, no por el tema.** "La mancha de kétchup" retiene; "Introducción" no. Deja los minutos como `0X:XX` para que los rellene él, y avísale.

---

# FASE 5 · Correo estilo Isra Bravo

Entrega **dos variantes** con el tool de composición de mensajes (`message_compose_v1`, `kind: "email"`), etiquetadas de forma que se entienda la diferencia estratégica:

- **Variante A · historia**: entra por la anécdota personal más concreta del vídeo. Más larga. Para lista fría o gente que lleva tiempo sin abrir.
- **Variante B · metáfora**: entra por la imagen más potente del vídeo. Corta y seca. Para lista caliente.

Las reglas de voz están en `references/voz-isra-bravo.md`. **Léelo antes de escribir el correo** — es la parte del skill donde es más fácil salirse del tono y sonar a newsletter corporativa.

Personalización de GoHighLevel: la variable es `{{contact.first_name}}`. Va **dos veces**: como saludo suelto en la primera línea (sin "Hola") y otra vez en mitad del texto, justo en la frase donde aprieta. Recuérdale que filtre o ponga valor por defecto para los contactos sin nombre — en este estilo el nombre está tan expuesto que un email que empieza con una coma sola canta muchísimo.

---

## Orden de entrega

Investiga primero (Fase 1) y luego entrega todo en una sola pasada, en este orden — hallazgos de vidIQ (keywords + patrones de outliers) → títulos → etiquetas → descripción → correos.

No pares a preguntar entre fases. Dani prefiere ver el paquete entero y luego pedir cambios.

Al final, en dos o tres líneas como mucho, dile: qué le falta rellenar (minutos de los capítulos, enlace del libro, URL si no la dio) y qué se puede hacer después (thumbnail con vidIQ, outliers de la competencia, correo de reenvío a 48h para los que no abrieron).

---

## Ejemplo completo

`references/ejemplo-completo.md` tiene el paquete entero para el vídeo de las emociones ("¿Por qué las emociones controlan tu vida?"): el transcript de partida resumido, los datos que devolvió vidIQ, las etiquetas finales con su recuento de caracteres, la descripción y los dos correos.

**Léelo antes de la Fase 5 como mínimo.** Es la referencia de calidad: si lo que estás escribiendo no suena como eso, todavía no está.
