# Lánzate y Maquilla · Hotmart → Whop · guion de ejecución

Estado a 5 sep 2026 (sesión remota 012vtmt94, rama `claude/lanzate-maquilla-whop-migration-3gdsvg`).

## Lo que ya existe en Whop (cuenta andreanmakeup.com · biz_Q96zSuaHHEbFU4)

| Elemento | ID | Notas |
|---|---|---|
| Experiencia Courses | exp_1Qt6DP7uAx282B | |
| Curso oculto "Lánzate y Maquilla" | cors_yV0wRT7QL0ArF | idioma es |
| Módulo 1 · La base del maquillaje y el kit mínimo | chap_xdLAIMQM3rSzJ | contiene placeholder oculto lesn_CTQZXR6DsFGDi |
| Módulo 2 · Los looks para ganar 10 clientas en tiempo récord | chap_bg9mVJrOj8wSh | vacío |
| Módulo 4 · Look completo I | chap_qTzThWjBcMDbM | vacío |
| Módulo 5 · Look completo II | chap_wzQduDGMTfbSX | vacío |

Módulos 3 y 6 **no se migran** (decisión de Andrea, 27 ago).

## Por qué no se puede hacer desde la nube

1. La Biblioteca de Vídeos de Hotmart está detrás del login de Andrea/Dani. Solo existe en el Chrome local.
2. La API de Whop no permite crear el asset Mux (subir vídeo). Solo acepta `mux_asset_id` en `course-lessons_update`.
   El mp4 se sube desde el panel web: Courses › Lánzate y Maquilla › lección › Upload video.
3. No hay conector de navegador ni de Hotmart en la sesión remota.

## Procedimiento (sesión local con Chrome, 15 clases)

Para cada clase, en este orden:

1. **Hotmart** → Biblioteca de Vídeos → localizar el vídeo de la clase → Descargar (mp4).
   Guardar como `MM-CC · Título.mp4` (MM = módulo, CC = número de clase).
2. **Whop API** (MCP `course-lessons_create`):
   - `chapter_id`: el del módulo correspondiente (tabla de arriba)
   - `lesson_type`: `video`
   - `title`: título real de la clase tal y como aparece en Hotmart
   - Para la clase 1 del Módulo 1 **no crear**: renombrar el placeholder con `course-lessons_update`
     (`id: lesn_CTQZXR6DsFGDi`, `title: <título real>`).
3. **Panel de Whop** → abrir la lección recién creada → subir el mp4 → esperar a que Mux termine de procesar.
4. Marcar en la tabla de seguimiento de abajo.

Dejar todas las lecciones **ocultas** hasta que las 15 estén subidas. Después, poner visibles por drop:
semana 1 = Módulos 1-2 · semana 2 = Módulos 4-5.

## Seguimiento

| # | Módulo | Clase (título Hotmart) | lesn_ | mp4 descargado | vídeo subido |
|---|---|---|---|---|---|
| 1 | M1 | Sesión en vivo: Kit básico para tus primeras 10 clientas | lesn_CTQZXR6DsFGDi | ☐ | ☐ (renombrada 5 sep 12:37 desde la sesión local; vídeo pendiente) |
| 2 | M1 | | | ☐ | ☐ |
| 3 | M1 | | | ☐ | ☐ |
| 4 | M2 | | | ☐ | ☐ |
| 5 | M2 | | | ☐ | ☐ |
| 6 | M2 | | | ☐ | ☐ |
| 7 | M4 | | | ☐ | ☐ |
| 8 | M4 | | | ☐ | ☐ |
| 9 | M4 | | | ☐ | ☐ |
| 10 | M5 | | | ☐ | ☐ |
| 11 | M5 | | | ☐ | ☐ |
| 12 | M5 | | | ☐ | ☐ |
| 13 | | | | ☐ | ☐ |
| 14 | | | | ☐ | ☐ |
| 15 | | | | ☐ | ☐ |

El reparto real de las 15 clases por módulo se rellena con lo que muestre Hotmart; la tabla es orientativa.

## Vía alternativa si se quiere hacer desde la nube

Si Dani prefiere que la sesión remota lo ejecute, hace falta que le llegue una sesión de navegador válida
(estado de sesión de Chrome para hotmart.com y whop.com). Sin eso, la sesión remota solo puede crear
las lecciones vía API una vez conozca los 15 títulos.
