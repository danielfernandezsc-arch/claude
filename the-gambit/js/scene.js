/* ============================================================
   scene.js — Tablero de ajedrez 3D con Three.js (r128)
   Cámara ligada al scroll. Degradación elegante si falla.
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('scene');
  if (!canvas || typeof THREE === 'undefined') {
    // Si Three.js no cargó (CDN caído), el sitio sigue siendo legible.
    if (canvas) canvas.style.display = 'none';
    return;
  }

  var isMobile = window.innerWidth < 900;

  // --- Renderer ---
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !isMobile,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!isMobile) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // --- Escena ---
  var scene = new THREE.Scene();
  var FOG = 0x0a0805;
  scene.fog = new THREE.FogExp2(FOG, 0.052);

  var camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 7, 11);
  camera.lookAt(0, 0, 0);

  // --- Paleta ---
  var LIGHT = 0xf0e4c8;
  var DARK = 0x1a120a;
  var SQ_LIGHT = '#d8c39a';
  var SQ_DARK = '#5a3d24';

  // --- Textura de madera procedural ---
  function woodTexture(base, streak, seed) {
    var c = document.createElement('canvas');
    c.width = 128; c.height = 128;
    var ctx = c.getContext('2d');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 128, 128);
    for (var i = 0; i < 46; i++) {
      var y = ((i * 17.3 + seed * 9) % 128);
      var amp = 3 + ((i * seed) % 5);
      ctx.strokeStyle = streak;
      ctx.globalAlpha = 0.05 + ((i % 4) * 0.03);
      ctx.lineWidth = 0.6 + (i % 3) * 0.5;
      ctx.beginPath();
      for (var x = 0; x <= 128; x += 4) {
        var yy = y + Math.sin((x + seed * 20) * 0.06 + i) * amp;
        if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    return tex;
  }

  var texLight = woodTexture(SQ_LIGHT, '#a8895c', 1);
  var texDark = woodTexture(SQ_DARK, '#2e1d10', 4);

  // --- Grupo del tablero ---
  var board = new THREE.Group();
  scene.add(board);

  // Casillas
  var sqGeo = new THREE.BoxGeometry(1, 0.22, 1);
  for (var r = 0; r < 8; r++) {
    for (var f = 0; f < 8; f++) {
      var isLight = (r + f) % 2 === 0;
      var mat = new THREE.MeshStandardMaterial({
        map: isLight ? texLight : texDark,
        roughness: 0.72,
        metalness: 0.05
      });
      var sq = new THREE.Mesh(sqGeo, mat);
      sq.position.set(f - 3.5, 0, r - 3.5);
      sq.receiveShadow = !isMobile;
      board.add(sq);
    }
  }

  // Marco
  var frameMat = new THREE.MeshStandardMaterial({ color: 0x120c07, roughness: 0.6, metalness: 0.2 });
  var frameGeo = new THREE.BoxGeometry(9.4, 0.34, 9.4);
  var frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.y = -0.07;
  frame.receiveShadow = !isMobile;
  board.add(frame);

  // Bisel dorado
  var bevelMat = new THREE.MeshStandardMaterial({ color: 0xc9a961, roughness: 0.35, metalness: 0.65 });
  var bevel = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.12, 8.5), bevelMat);
  bevel.position.y = 0.07;
  board.add(bevel);

  // --- Materiales de piezas ---
  function pieceMat(color) {
    return new THREE.MeshStandardMaterial({ color: color, roughness: 0.34, metalness: 0.12 });
  }
  var matLight = pieceMat(LIGHT);
  var matDark = pieceMat(DARK);

  // --- Constructores de piezas con primitivas ---
  function base(group, mat, h, rTop, rBot) {
    var b = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, 18), mat);
    b.position.y = h / 2;
    group.add(b);
    return h;
  }

  function pawn(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.18, 0.26, 0.34);
    var neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 0.34, 16), mat);
    neck.position.y = y + 0.17; g.add(neck); y += 0.34;
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), mat);
    head.position.y = y + 0.12; g.add(head);
    return finish(g, mat);
  }

  function rook(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.2, 0.28, 0.36);
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.55, 16), mat);
    body.position.y = y + 0.27; g.add(body); y += 0.55;
    var top = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.16, 16), mat);
    top.position.y = y + 0.08; g.add(top);
    return finish(g, mat);
  }

  function knight(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.2, 0.28, 0.36);
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 0.4, 16), mat);
    body.position.y = y + 0.2; g.add(body); y += 0.4;
    var headGeo = new THREE.BoxGeometry(0.22, 0.42, 0.5);
    var head = new THREE.Mesh(headGeo, mat);
    head.position.set(0, y + 0.18, 0.06);
    head.rotation.x = -0.3; g.add(head);
    var snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.26), mat);
    snout.position.set(0, y + 0.28, 0.28);
    snout.rotation.x = -0.5; g.add(snout);
    return finish(g, mat);
  }

  function bishop(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.2, 0.26, 0.34);
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.26, 0.62, 16), mat);
    body.position.y = y + 0.31; g.add(body); y += 0.62;
    var head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 16), mat);
    head.position.y = y + 0.13; g.add(head); y += 0.26;
    var tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), mat);
    tip.position.y = y + 0.04; g.add(tip);
    return finish(g, mat);
  }

  function queen(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.22, 0.3, 0.4);
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.3, 0.78, 18), mat);
    body.position.y = y + 0.39; g.add(body); y += 0.78;
    var collar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.18, 0.14, 18), mat);
    collar.position.y = y + 0.07; g.add(collar); y += 0.14;
    var crown = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), mat);
    crown.position.y = y + 0.1; g.add(crown);
    return finish(g, mat);
  }

  function king(mat) {
    var g = new THREE.Group();
    var y = base(g, mat, 0.22, 0.32, 0.42);
    var body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.32, 0.86, 18), mat);
    body.position.y = y + 0.43; g.add(body); y += 0.86;
    var collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 0.14, 18), mat);
    collar.position.y = y + 0.07; g.add(collar); y += 0.14;
    var v = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.26, 0.1), mat);
    v.position.y = y + 0.13; g.add(v);
    var h = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.1), mat);
    h.position.y = y + 0.16; g.add(h);
    return finish(g, mat);
  }

  function finish(g, mat) {
    g.traverse(function (m) {
      if (m.isMesh) { m.castShadow = !isMobile; m.material = mat; }
    });
    return g;
  }

  function place(builder, mat, file, rank) {
    var p = builder(mat);
    p.position.x = file - 3.5;
    p.position.z = rank - 3.5;
    p.position.y = 0.18;
    board.add(p);
  }

  // Disposición inicial parcial — suficiente para leer el tablero de fondo
  var backRow = [rook, knight, bishop, queen, king, bishop, knight, rook];
  for (var i = 0; i < 8; i++) {
    place(backRow[i], matLight, i, 0);
    place(pawn, matLight, i, 1);
    place(pawn, matDark, i, 6);
    place(backRow[i], matDark, i, 7);
  }

  // --- Iluminación de 3 puntos ---
  scene.add(new THREE.AmbientLight(0x3a2f22, 0.6));

  var key = new THREE.DirectionalLight(0xffe6b8, 1.5);
  key.position.set(6, 11, 5);
  if (!isMobile) {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 40;
    key.shadow.camera.left = -8;
    key.shadow.camera.right = 8;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -8;
    key.shadow.radius = 4;
    key.shadow.bias = -0.0004;
  }
  scene.add(key);

  var fill = new THREE.DirectionalLight(0x6e84b0, 0.5);
  fill.position.set(-8, 5, -4);
  scene.add(fill);

  var rim = new THREE.PointLight(0xc9a961, 0.9, 30);
  rim.position.set(-4, 3, -8);
  scene.add(rim);

  // --- Cámara ligada al scroll ---
  var scrollT = 0;      // objetivo 0..1
  var camT = 0;         // valor suavizado

  function updateScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollT = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();

    // Suavizado de la posición de scroll
    camT += (scrollT - camT) * 0.05;

    // Órbita lenta: baja de altura y rodea el tablero al hacer scroll
    var angle = t * 0.06 + camT * Math.PI * 1.1;
    var radius = 11 - camT * 3.2;
    var height = 8.2 - camT * 5.4;

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = Math.max(height, 1.6);
    camera.lookAt(0, camT * 0.6, 0);

    // Rotación continua sutil del tablero
    board.rotation.y = t * 0.04;

    renderer.render(scene, camera);
  }
  animate();

  // --- Resize ---
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
    }, 150);
  });
})();
