# Shivalink · el recetario

Aquí vive el método Shivalink convertido en skills de Claude. Cada carpeta es una receta: le das el nombre de un creador y Claude ejecuta esa parte del proceso.

Notion es la agenda (quién, cuándo, en qué paso va cada creador). Drive es el almacén (vídeos, fotos, contratos). Este repo es el recetario: guarda cómo se hace cada cosa y el historial de cada cambio, para poder volver atrás si una skill empieza a fallar.

## El método, por fases

**1 · Captar creadores** · `skills/1-captar-creadores`

| Skill | Qué hace | Cómo se pide |
|---|---|---|
| prospeccion-creadores | Busca creadores cualificados y los mete en el tracker de Notion | "prospección", "busca creadores" |
| auditoria-creadores | Auditoría de monetización con slides de Gamma y ficha en Notion | "hazme la auditoría de X" |
| llamada-descubrimiento | Guion y slides del Loom que propone el partnership 50/50 | "llamada descubrimiento de X" |
| expert-acquisition-calls | Guion y slides del Loom de cierre de partnership | "créame el cierre de X" |
| crm-post-llamada | Convierte la transcripción de una llamada en la nota CRM | "nota de la llamada", "CRM de X" |

**2 · Producto y oferta** · `skills/2-producto-y-oferta`

| Skill | Qué hace | Cómo se pide |
|---|---|---|
| onboarding-creador | Drive, ficha de Notion, tono, oferta, marca, kick-off, contrato y accesos | "hemos cerrado a X", "onboarding de X" |
| oferta-creador | Oferta irresistible con el método Jason Fladlien | "oferta de X" |
| estructura-producto | Programa en vivo o grabado, con guion, Gamma y Whop | "estructura del programa de X" |
| pagina-venta | Página de venta en Lovable con bono de acción rápida | "página de venta de X" |

**3 · Lanzamiento** · `skills/3-lanzamiento`

| Skill | Qué hace | Cómo se pide |
|---|---|---|
| carruseles-captacion | Reels, 6 carruseles y guía de stories para los 14 días previos | "carruseles de X" |
| ilf-copies | Instagram Launch Fórmula: copies de 14 días, paneles, clase y cuaderno | "ILF de X" |
| whatsapp-lanzamiento | Todos los mensajes de la comunidad de WhatsApp | "WhatsApp de X" |
| masterclass-venta | Guion del webinar y 60 slides en Gamma | "masterclass de X" |

**4 · Cierre** · `skills/4-cierre`

| Skill | Qué hace | Cómo se pide |
|---|---|---|
| debriefing-lanzamiento | Datos de Whop y WhatsApp, página de resultados y permiso de YouTube | "debriefing de X" |
| resultados-lanzamiento | Página de resultados desde el CSV de Whop y petición de testimonio | "resultados de X" |

**5 · Contenido de Dani** · `skills/5-contenido-dani`

| Skill | Qué hace | Cómo se pide |
|---|---|---|
| publicar-video-youtube | Títulos, descripción, etiquetas con vidIQ y correo del vídeo | pegar la transcripción |
| email-video-javi-pastor | Correo conversacional que lleva al vídeo | "el copy de este vídeo" |
| email | Correo de vídeo, live o lanzamiento con el método Gamboa | "email", "estilo Gamboa" |
| newsletter | Newsletter semanal estilo 5 Nuggets, subida a Notion | "newsletter" |
| live-martes-incubadora | Script, guion en bullets y página de Notion del live | "prepara el live de [tema]" |
| correos-live-martes | Correo del lunes, del replay y tres WhatsApps del live | pegar la transcripción del live |

**9 · Sin uso** · `skills/9-sin-uso`

Las dos skills de webs estáticas para Hostinger. No se usan; se guardan por si acaso.

## Pendiente de decidir

Hay dos parejas de skills que se pisan. Cuando dos recetas responden a la misma frase, Claude puede elegir la que no toca:

- **llamada-descubrimiento** y **expert-acquisition-calls**: las dos se activan con "créame el cierre de X" y hacen el mismo Loom con Gamma.
- **debriefing-lanzamiento** y **resultados-lanzamiento**: las dos cierran el lanzamiento con la página de resultados en Lovable y se activan con "resultados de X".

Lo sano es quedarse con una de cada pareja y mover la otra a `9-sin-uso`.

## Cómo se mantiene

Las skills se editan en Claude, que es donde se usan. Este repo es la copia con historial: cuando cambies una skill importante, pide a Claude "sube las skills al repo" y guarda la versión nueva con una frase que diga qué cambió.

## Archivo

Lo que había antes en este repo está guardado en ramas, sin borrar nada:

- `archivo/landings-de-prueba`: Bruma y The Gambit, las landings de prueba de junio.
- `archivo/ritualist`: la extensión de Chrome de rituales de presencia y bloques de foco.
- `archivo/migracion-lanzate-y-maquilla`: el guion de la migración Hotmart → Whop del curso de Andrea (terminada en octubre).
