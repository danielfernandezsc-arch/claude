---
name: "crm-post-llamada"
description: "Convierte la transcripción de una llamada con un creador (descubrimiento o sesión de partnership) en la nota CRM y la guarda en su ficha del tracker de Notion, actualizando paso y fechas. Úsalo con \"nota de la llamada\", \"CRM de X\" o \"guarda la llamada de X\"."
---

# CRM post-llamada — la nota vive en Notion

**Analogía.** Una llamada sin nota es una semilla que se queda en el bolsillo. La nota la planta en la ficha del creador, donde la recogen después la propuesta, el onboarding y la oferta.

**Notion es el CRM.** Todo va a la ficha del creador en el tracker **📋 Creadores en Prospección** (`collection://67ec9f1f-34e3-491e-a76b-613d66fed753`). Nada se pega en otra herramienta.

## Antes de todo · Las reglas del juego
Leer con `notion-fetch` la sección "⚙️ Reglas que leen las skills" de **📜 Reglas del juego** (`3f4ee17cdf7e81e1a301ececd78e87c6`). Si algo de esta skill choca con esa página, gana la página. Si no carga, se sigue con esta skill y se avisa a Dani.

## Los dos tipos de llamada

| Llamada | Cuándo | Para qué |
|---|---|---|
| **Llamada de descubrimiento** (30 min) | Después de la auditoría | Conocer al creador, validar el producto y preparar la propuesta |
| **Sesión de partnership** | Después del sí | Cerrar precio, plazos, garantía, Día 0 y reparto. Es la transcripción más importante para el onboarding |

El tipo se identifica por la transcripción. Si no está claro, se pregunta.

## Paso 1 — Encontrar la ficha
- Buscar al creador en el tracker por nombre o handle (`notion-search` dentro del data source o SQL por `Creador`).
- Si no existe, se crea la fila con nombre, handle, nicho y seguidores, y se avisa a Dani.

## Paso 2 — La nota (formato fijo)
```
📞 [Llamada de descubrimiento / Sesión de partnership] · [fecha]

👤 PERFIL
[Nombre completo] · 📍 [ciudad, país] · 📩 [email] · 📸 [red principal] · 🌐 [web]

🎯 NICHO
[1–2 líneas] ([subnichos])

📊 MÉTRICAS
▸ [Plataforma]: [seguidores]
▸ Story views: [mínimo – máximo]
▸ [Newsletter, podcast, libros, ventas previas, precio actual…]

🧠 CÓMO ES
[3–5 líneas: quién es, su relación con lo digital, qué le mueve y qué frena, con sus palabras. Solo lo que dijo o mostró en la llamada; nada de diagnósticos.]

🎯 AVATAR
▸ Principal ([B2C/B2B]): [descripción] → precio estimado [rango]
▸ Secundario: [descripción] → precio estimado [rango]

💡 PRODUCTO
▸ [Lo que ya tiene o la oportunidad detectada]
▸ [Formato, precio actual, estado]

🚧 OBJECIONES (literales)
▸ "[frase del creador]"

✅ ACUERDOS
▸ Creador: [tarea]
▸ Shivalink: [tarea]

⏭️ PRÓXIMO PASO
[Qué y cuándo] · 📅 [día, hora España / hora Colombia]
```
En la sesión de partnership, además: **precio, plazos, garantía, Día 0 y reparto acordados**, tal cual se dijeron.

## Paso 3 — Guardar en Notion
1. **Cuerpo de la ficha:** la nota con formato Notion (encabezado de color `📞 [tipo] · [fecha]`, secciones y ▸) y debajo un **toggle "Transcripción"** con el texto completo. Las skills `llamada-descubrimiento` y `onboarding-creador` leen de aquí.
2. **Propiedades** (`update_properties`, nombres exactos):
   - **Llamada de descubrimiento** o **Llamada de partnership**: enlace del Loom o de la grabación, si Dani lo da.
   - **Nicho**, **Seguidores IG**, **Producto**, **Precio** (si se acordó): solo si están vacíos o han cambiado.
   - **Notas:** una línea con el próximo paso.
   - **Fecha último contacto** = hoy · **Fecha último paso** = hoy.
   - **Paso actual:** descubrimiento → "📞 Llamada agendada" si queda otra llamada, o se deja como está si toca preparar la propuesta. Partnership con un sí → "✅ Cerrado".
3. Comprobar con `notion-fetch` que la nota y las propiedades quedaron guardadas.

## Reglas
- **No inventar.** Si un dato no aparece, se omite el campo.
- **Precios en rango,** salvo que se haya acordado uno exacto.
- **Datos legales** (documento de identidad, dirección): nunca en Notion visible ni en la memoria. Solo para el contrato.
- Sin mayúsculas sostenidas.

## Al terminar
Una línea a Dani:
```
📞 Nota de [creador] guardada en su ficha · Paso: [paso actual] · Próximo: [qué y cuándo]
```
Si fue la sesión de partnership con un sí: "¿Lanzo `onboarding-creador`?"