---
name: "expert-acquisition-calls"
description: "Genera el guión + las slides en Gamma para el VÍDEO DE LOOM de cierre de partnership con un creador, leyendo el contexto del tracker de Notion. Úsalo con \"créame el cierre de [creador]\", \"prepara el Loom de cierre de [nombre]\" o \"voy a grabar el cierre de [experto]\". Output: guión del Loom, Gamma y ficha de Notion actualizada."
---

# Skill: Vídeo de Cierre de Partnership (Loom + Gamma) — Shivalink

Genera el guión y las slides para el **vídeo de Loom de cierre** que Dani graba y envía al creador tras la auditoría. El input se lee del tracker de Notion; no se le pide a Dani que lo pegue.

## Cómo cambió el proceso (contexto crítico)

Antes esto eran llamadas en vivo (descubrimiento + cierre). Ya no. El cierre es ahora un **vídeo de Loom grabado** que refuerza la oportunidad y plantea el partnership. El producto concreto NO se define aquí — se define después, en la llamada de partnership.

La diferencia clave: es un monólogo grabado, no una conversación. Dani controla el mensaje de principio a fin. El guión se escribe para hablarse a cámara compartiendo la pantalla con la auditoría/Gamma. Cada "pausa" es para que la idea aterrice en el vídeo, no para esperar respuesta. El vídeo termina SIEMPRE con una llamada a la acción clara (que el creador responda y agende).

---

## FASE 0 — Leer el contexto desde Notion (SIEMPRE primero)

Cuando Dani diga "créame el cierre de [creador]", ANTES de escribir nada:

1. Buscar la ficha del creador en el tracker **"📋 Creadores en Prospección"** (data source `collection://67ec9f1f-34e3-491e-a76b-613d66fed753`), por nombre o handle, usando `notion-fetch` o búsqueda.
2. Abrir la página del creador y leer **el cuerpo completo de la página** — ahí vive la transcripción de la llamada y las notas. NO basta con leer las propiedades.
3. De las propiedades, extraer: Nicho, Seguidores IG, Handle de Instagram, Precio (si está), y cualquier dato del avatar disponible.
4. Con la transcripción + las propiedades, construir el guión y las slides. Personalizar con datos reales del creador — nunca genérico.

Si la ficha no tiene transcripción ni datos suficientes, decírselo a Dani y pedir lo que falte antes de generar. Nunca inventar métricas ni citas.

La conexión a Notion es por API y ya está activa. No pedir a Dani que pegue la info.

---

## Reglas de negocio actuales (NUNCA usar datos viejos)

- **Reparto: 50/50.** El creador no invierte nada. (Ignorar cualquier mención antigua a "30%".)
- **Plataforma: Whop.** El creador abre **su propio negocio** en Whop (su email, su marca: es el dueño). Dani entra como admin y el **reparto automático 50/50** queda configurado: cada venta se divide sola, el dinero no pasa por nadie primero. Los dos mensajes de oro: "el producto es tuyo" y "yo no toco tu parte". **Nunca mencionar Hotmart:** es la plataforma antigua. Si `references/guion-loom-cierre.md` dice Hotmart, se lee como Whop.
- **Fase 1 — El lanzamiento:** 14 días de captación por WhatsApp, una clase en vivo y 5 días de carrito. Objetivo: **superar los 10.000€** (o $ si es Latinoamérica). Es el semáforo: si se supera, se continúa; si no, cierre limpio sin drama.
- **Pruebas:** solo cifras que Dani confirme o que estén documentadas (casos de `auditoria-creadores/references/casos-exito.md`, +7 años, +8,6M€). Una estadística como "el 92% supera los 10.000€" solo se usa si Dani la confirma en el chat; si no, se sustituye por los casos.
- **Fase 2 — Tres lanzamientos hacia los 500.000€ (12 meses):** ya NO se habla de VSL ni de fecha de noviembre. Se plantean tres lanzamientos escalonados, **con una previsión por cada uno calculada según las métricas reales del creador** (no hay patrón fijo — uno pequeño escala distinto a uno grande). La suma apunta a una proyección de ~500.000€.
- **El producto se define en la llamada de partnership**, no en el Loom. En el Loom solo se plantea el marco.
- **Regla de moneda:** € para España/Europa hispanohablante, $ para Latinoamérica.
- **Techo de realismo:** ninguna proyección supera ~1M€/$; si la matemática se dispara, capar y decirlo.

---

## Las 4 palancas Hormozi (el corazón persuasivo del Loom)

Estas cuatro palancas son obligatorias y vertebran el guión:

**1. Garantía con nombre.** Empaquetar "solo gano si tú ganas" como una garantía con etiqueta memorable que el creador pueda repetir (ej: **"Garantía Riesgo Cero"** o **"Solo Ganamos Juntos"** — ofrecer 2-3 nombres a Dani para elegir). Una oferta que el creador puede explicar en una frase se vende sola.

**2. Urgencia honesta — plazas limitadas.** Es verdad y por eso se usa: Dani pone todo el equipo e infraestructura sin cobrar por adelantado, así que es imposible llevar a muchos creadores a la vez. Decirlo con calma, como un hecho, sin dramatizar ni cuenta atrás falsa. "Solo puedo trabajar con un número limitado de creadores a la vez, porque pongo a todo mi equipo en cada uno."

**3. Anclaje de precio antes del cero.** ANTES de revelar que el creador no paga nada, hacer visible lo que costaría montar todo esto por su cuenta: equipo de diseño, copywriter, técnico de plataforma, estratega de lanzamiento — fácilmente varios miles de euros al mes. Poner la cifra de mercado y LUEGO revelar el cero. El contraste hace que el cero se sienta como un regalo, no como lo normal.

**4. "Lo poco que haces tú" como momento estrella.** No enterrar el reparto de responsabilidades en una lista al final. Elevarlo a un momento de "espera… ¿eso es todo lo que tengo que hacer?". El contraste entre el medio millón proyectado y lo poquísimo que el creador mueve (solo grabar su conocimiento y publicar/aprobar) es lo que cierra. Reducir el esfuerzo percibido casi a cero es tan potente como inflar el sueño.

---

## Continuidad con la auditoría (el Loom de cierre es el capítulo 2)
El creador ya vio su auditoría. El cierre la retoma, no la repite:
- Abre con una frase de su auditoría ("en tu auditoría vimos que el 99% de tu audiencia no te compra…").
- Reutiliza **el espejo de mercado** (el referente que ya factura en su nicho) como gancho emocional antes de los números: "[Referente] ya lo está haciendo. La diferencia entre tú y él no es el talento, es la ejecución."
- Mismo tema visual de Gamma que la auditoría, para que se sienta una sola historia.

## Output: tres fases seguidas

### FASE 1 — Guión del vídeo de Loom
Genera el guión completo para grabar, hablado a cámara, personalizado con los datos reales del creador leídos de Notion. Sigue la estructura de `references/guion-loom-cierre.md`. El orden Hormozi: primero inflar la oportunidad y los números al máximo, LUEGO revelar el mecanismo (cómo trabajamos). Nunca enfriar el deseo metiendo logística en medio.

### FASE 2 — Presentación en Gamma (estilo Apple — REGLA CRÍTICA)

⚠️ El estándar visual NO es negociable: **estética Apple keynote con FOTOGRAFÍA REALISTA, nunca dibujos ni ilustraciones.** El problema histórico es que Gamma, si no se le insiste, devuelve clipart y dibujos planos que abaratan la marca. Eso arruina el cierre: un creador premium no se cierra con slides que parecen de plantilla gratuita.

Parámetros fijos de la llamada `generate`:
- `themeId`: **el mismo tema que se usó en su auditoría** (está en la ficha o en el chat). Si no se sabe, se elige con `get_themes` según su estética, igual que en `auditoria-creadores`. El tema personal de Dani (`gk40a3w31xghw0k`) solo si nada encaja.
- `imageOptions.model`: modelo fotográfico de alta calidad (por ejemplo `flux-2-pro`); si da error de plan, se omite.
- Cada slide lleva en el `inputText` su línea de imagen con una escena concreta del mundo del creador, no una foto genérica.
- `textMode: preserve`
- `format: presentation`
- `imageOptions.source: aiGenerated`
- `imageOptions.stylePreset: photorealistic` ← ESTE es el parámetro que evita los dibujos. Verificar SIEMPRE que se pasa.
- `imageOptions.style`: descripción de fotografía premium cinematográfica — "cinematic photography, natural light, shallow depth of field, rich editorial tones, high-end magazine quality". NUNCA ilustración, clipart, cartoon ni flat icons.
- `additionalInstructions`: exigir explícitamente estética Apple keynote — fotografías realistas a sangre (full-bleed), dinámicas y de alto impacto, una sola idea por slide, números gigantes y limpios, muchísimo espacio en blanco, cero saturación de texto, nada de dibujos ni iconos infantiles.

**Diagnóstico:** si Dani ve dibujos en el resultado, casi siempre es porque `stylePreset` no se pasó como `photorealistic`. Es el primer sitio donde mirar.

Estructura de slides en `references/guion-loom-cierre.md` (sección Gamma). Compartir el `gammaUrl` con Dani al terminar.

### FASE 3 — Actualizar Notion (cerrar el ciclo)
Una vez generados guión y slides, actualizar la ficha del creador con `notion-update-page` (`command: update_properties`):
- Pegar el enlace del Loom de cierre en la propiedad **"Llamada de cierre"** (tipo URL). Si Dani aún no tiene el enlace porque va a grabarlo después, dejar este paso pendiente y recordárselo: "Cuando tengas el Loom grabado, dame el enlace y lo dejo en la ficha."
- Cuando el Loom está enviado: **"Paso actual"** → **"📝 Propuesta enviada"** y **"Fecha último paso"** = hoy (el dashboard cuenta con esa fecha).
- **"✅ Cerrado" solo cuando el creador dice que sí.** Entonces se lanza `onboarding-creador` ("hemos cerrado a X").
- Si no responde en 3–4 días, se le recuerda a Dani hacer el seguimiento.
Confirmar a Dani lo actualizado.

---

## Reglas de estilo y tono

- Directo, seguro, cercano, sin presión. Nunca comercial ni desesperado.
- La palabra clave no es "producto", es **"ejecución"**.
- Números SIEMPRE con "aunque el 99% no compre" — nunca "si el 1% compra".
- Inversión de riesgo en el centro: el único que arriesga es Dani.
- Explicar qué es un producto digital con metáforas simples si el perfil lo necesita.
- Anclajes de confianza sembrados con naturalidad: +7 años de experiencia, +8,6M€ generados a clientes.

---

## Referencias

- `references/guion-loom-cierre.md` — estructura completa del guión, las slides de Gamma y la checklist.
- `references/material-antiguo-llamadas.md` — guiones de las dos llamadas en vivo originales. OBSOLETO, solo cantera de frases.