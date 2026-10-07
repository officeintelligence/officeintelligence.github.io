(() => {
  "use strict";

  const intro = document.querySelector(".intro");
  const canvas = document.querySelector("#work-scene");
  const toggle = document.querySelector(".scene-toggle");
  const context = canvas?.getContext("2d");
  if (!intro || !context || !toggle) return;

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const colors = {
    blue: "#507d9d",
    green: "#57826a",
    clay: "#b07658",
    teal: "#4f8c8b",
    rose: "#a56e87",
    violet: "#807097",
  };
  const files = [
    {
      x: 52,
      y: 63,
      w: 103,
      h: 129,
      type: "document",
      label: "BRIEF",
      color: "blue",
    },
    {
      x: 237,
      y: 17,
      w: 145,
      h: 103,
      type: "slides",
      label: "SLIDES",
      color: "clay",
    },
    {
      x: 445,
      y: 80,
      w: 111,
      h: 122,
      type: "image",
      label: "DESIGN",
      color: "teal",
    },
    {
      x: 244,
      y: 175,
      w: 141,
      h: 128,
      type: "sheet",
      label: "FORECAST",
      color: "green",
    },
    {
      x: 441,
      y: 282,
      w: 139,
      h: 111,
      type: "cad",
      label: "CAD",
      color: "teal",
    },
    {
      x: 94,
      y: 356,
      w: 148,
      h: 98,
      type: "video",
      label: "TIMELINE",
      color: "rose",
    },
    {
      x: 5,
      y: 231,
      w: 129,
      h: 97,
      type: "code",
      label: "CODE",
      color: "violet",
    },
    {
      x: 289,
      y: 375,
      w: 117,
      h: 78,
      type: "audio",
      label: "AUDIO",
      color: "blue",
    },
  ];
  const routes = [
    [0, 1],
    [0, 6],
    [6, 3],
    [3, 1],
    [1, 2],
    [3, 4],
    [2, 4],
    [6, 5],
    [5, 7],
    [7, 4],
    [3, 5],
  ];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let time = 0;
  let frameId = 0;
  let lastFrame = 0;
  let inView = true;
  let paused = motionPreference.matches;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function line(x1, y1, x2, y2, color, lineWidth = 1) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
  }

  function rect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  }

  function preview(type, color, phase) {
    switch (type) {
      case "document":
        rect(0, 0, 66, 4, `${color}b0`);
        rect(0, 11, 45, 3, `${color}60`);
        for (let i = 0; i < 5; i++) {
          rect(0, 26 + i * 8, i === 4 ? 57 : 94 - (i % 2) * 10, 2, "#aebcb4a0");
        }
        rect(0, 26 + Math.floor((phase * 0.35) % 5) * 8, 73, 3, `${color}60`);
        break;
      case "slides":
        rect(0, 2, 41, 4, `${color}c0`);
        rect(0, 13, 29, 3, `${color}65`);
        rect(0, 31, 34, 2, "#bac3bcd0");
        rect(0, 39, 27, 2, "#bac3bcd0");
        [23, 36, 49].forEach((value, i) => {
          rect(
            53 + i * 16,
            56 - value,
            10,
            value,
            `${color}${["55", "88", "bb"][i]}`,
          );
        });
        line(49, 57, 100, 57, `${color}55`);
        rect(0, 66, 22, 2, `${color}55`);
        rect(28, 66, 22, 2, "#c9d0ca");
        rect(56, 66, 22, 2, "#c9d0ca");
        break;
      case "image":
        rect(0, 0, 100, 65, "#edf2ed");
        context.beginPath();
        context.moveTo(0, 65);
        context.lineTo(39, 11);
        context.lineTo(70, 65);
        context.fillStyle = "#8fbbb5";
        context.fill();
        context.beginPath();
        context.moveTo(39, 65);
        context.lineTo(74, 24);
        context.lineTo(100, 65);
        context.fillStyle = "#608e89";
        context.fill();
        rect(69, 7, 16, 10, "#d1b180");
        [color, "#8fbbb5", "#d1b180", "#e3e9e2"].forEach((swatch, i) => {
          rect(i * 14, 73, 9, 5, swatch);
        });
        break;
      case "sheet":
        rect(0, 0, 100, 10, `${color}20`);
        for (let x = 0; x <= 100; x += 25) line(x, 0, x, 47, `${color}35`);
        for (let y = 0; y <= 48; y += 12) line(0, y, 100, y, `${color}35`);
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 4; x++)
            rect(4 + x * 25, 17 + y * 12, 13, 2, `${color}65`);
        }
        rect(25 * (Math.floor(phase * 0.45) % 4), 24, 25, 12, `${color}25`);
        context.beginPath();
        [75, 70, 72, 59, 62, 54, 57, 48].forEach((y, i) => {
          if (i === 0) context.moveTo(i * 14, y);
          else context.lineTo(i * 14, y);
        });
        context.strokeStyle = `${color}b0`;
        context.lineWidth = 1.4;
        context.stroke();
        break;
      case "cad":
        context.strokeStyle = `${color}b0`;
        context.lineWidth = 1.2;
        context.strokeRect(19, 9, 66, 43);
        line(50, 9, 50, 38, `${color}b0`);
        line(19, 33, 42, 33, `${color}b0`);
        line(64, 33, 85, 33, `${color}b0`);
        context.beginPath();
        context.arc(50, 52, 14, -Math.PI / 2, 0);
        context.stroke();
        line(50, 38, 50, 52, `${color}b0`);
        [
          [19, 61, 85, 61],
          [9, 9, 9, 52],
        ].forEach((points) => line(...points, `${color}65`));
        [19, 85].forEach((x) => line(x, 57, x, 65, `${color}85`));
        [9, 52].forEach((y) => line(5, y, 13, y, `${color}85`));
        line(94, 0, 94, 13, `${color}65`);
        line(88, 7, 100, 7, `${color}65`);
        break;
      case "video":
        for (let i = 0; i < 3; i++) {
          rect(i * 35, 0, 30, 28, `${color}${["20", "35", "50"][i]}`);
        }
        context.beginPath();
        context.moveTo(45, 7);
        context.lineTo(45, 21);
        context.lineTo(55, 14);
        context.closePath();
        context.fillStyle = `${color}b0`;
        context.fill();
        [43, 54, 65].forEach((y, i) => {
          line(0, y + 3, 100, y + 3, `${color}25`);
          rect(i * 13, y, 42, 6, `${color}80`);
          rect(47 + i * 8, y, 23, 6, `${color}40`);
        });
        line((phase * 9) % 100, 35, (phase * 9) % 100, 73, "#9c637ddd");
        break;
      case "code":
        [56, 74, 37, 65, 42, 77, 51].forEach((length, i) => {
          const indent = [0, 9, 18, 18, 9, 0, 0][i];
          rect(indent, i * 10, 12, 3, `${color}b0`);
          rect(
            indent + 17,
            i * 10,
            length - 17,
            3,
            i % 3 === 0 ? "#80a38e" : "#b6bfbb",
          );
        });
        break;
      case "audio":
        for (let i = 0; i < 28; i++) {
          const amplitude = 5 + 18 * Math.abs(Math.sin(i * 0.65 + phase * 0.7));
          rect(
            i * 3.6,
            35 - amplitude,
            1.6,
            amplitude * 2,
            `${color}${i % 3 ? "80" : "bb"}`,
          );
        }
        break;
    }
  }

  function file(node, index) {
    const color = colors[node.color];
    context.save();
    context.translate(node.px, node.py);
    context.rotate(Math.sin(time * 0.26 + index * 2) * 0.014);
    context.shadowColor = "#304f3910";
    context.shadowBlur = 14;
    context.shadowOffsetY = 4;
    context.beginPath();
    context.roundRect(-node.w / 2, -node.h / 2, node.w, node.h, 4);
    context.fillStyle = "#ffffffed";
    context.fill();
    context.shadowColor = "transparent";
    context.strokeStyle = `${color}65`;
    context.lineWidth = 0.9;
    context.stroke();
    context.translate(-node.w / 2 + 12, -node.h / 2 + 12);
    rect(0, 0, 4, 7, `${color}bb`);
    context.font = '500 8px "DM Sans", sans-serif';
    context.fillStyle = color;
    context.fillText(node.label, 10, 6);
    line(0, 16, node.w - 24, 16, `${color}20`);
    context.translate(0, 25);
    context.scale((node.w - 24) / 100, (node.h - 49) / 80);
    preview(node.type, color, time + index);
    context.restore();
  }

  function curve(a, b, progress) {
    const middleX = (a.px + b.px) / 2;
    const inverse = 1 - progress;
    return {
      x:
        inverse ** 3 * a.px +
        3 * inverse ** 2 * progress * middleX +
        3 * inverse * progress ** 2 * middleX +
        progress ** 3 * b.px,
      y:
        inverse ** 3 * a.py +
        3 * inverse ** 2 * progress * a.py +
        3 * inverse * progress ** 2 * b.py +
        progress ** 3 * b.py,
    };
  }

  function draw() {
    if (!width || !height) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const shell = intro.querySelector(".intro-content").getBoundingClientRect();
    const mobile = width <= 620;
    const origin = mobile ? width * 0.3 : shell.left + shell.width * 0.49;
    const scale = mobile ? 0.76 : Math.min(1, (width - origin - 20) / 620);
    context.save();
    context.translate(
      origin + pointer.x,
      Math.max(18, (height - 485 * scale) / 2) + pointer.y,
    );
    context.scale(scale, scale);

    for (let x = -65; x < 660; x += 30) {
      for (let y = 8; y < 480; y += 30) rect(x, y, 1.3, 1.3, "#64897722");
    }
    files.forEach((node, index) => {
      node.px = node.x + node.w / 2 + Math.sin(time * 0.45 + index * 1.7) * 5;
      node.py = node.y + node.h / 2 + Math.cos(time * 0.5 + index * 1.3) * 7;
    });
    routes.forEach(([from, to], index) => {
      const a = files[from];
      const b = files[to];
      const color = colors[b.color];
      const middleX = (a.px + b.px) / 2;
      context.beginPath();
      context.moveTo(a.px, a.py);
      context.bezierCurveTo(middleX, a.py, middleX, b.py, b.px, b.py);
      context.lineWidth = 1;
      context.strokeStyle = `${color}45`;
      context.stroke();

      const progress = (time * (0.1 + (index % 3) * 0.02) + index * 0.21) % 1;
      context.beginPath();
      for (let step = 0; step <= 12; step++) {
        const point = curve(a, b, Math.max(0, progress - 0.12 + step * 0.01));
        if (step === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      context.lineWidth = 1.7;
      context.strokeStyle = `${color}a0`;
      context.stroke();
      const point = curve(a, b, progress);
      rect(point.x - 1.5, point.y - 1.5, 3, 3, color);
    });
    files.forEach(file);
    context.restore();
  }

  function frame(now) {
    if (!lastFrame) lastFrame = now;
    const elapsed = now - lastFrame;
    if (elapsed >= 1000 / 30) {
      time += Math.min(elapsed / 1000, 0.08);
      lastFrame = now;
      pointer.x += (pointer.targetX - pointer.x) * 0.08;
      pointer.y += (pointer.targetY - pointer.y) * 0.08;
      draw();
    }
    frameId = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = 0;
  }

  function syncPlayback() {
    stop();
    if (!paused && inView && !document.hidden)
      frameId = requestAnimationFrame(frame);
  }

  function updateToggle() {
    toggle.hidden = false;
    toggle.setAttribute(
      "aria-label",
      `${paused ? "Play" : "Pause"} background animation`,
    );
    toggle.setAttribute("aria-pressed", String(paused));
    toggle.dataset.tooltip = `${paused ? "Play" : "Pause"} animation`;
    const icon = document.createElement("i");
    icon.dataset.lucide = paused ? "play" : "pause";
    icon.setAttribute("aria-hidden", "true");
    toggle.replaceChildren(icon);
    window.lucide?.createIcons();
  }

  function resize() {
    const bounds = intro.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    draw();
  }

  toggle.addEventListener("click", () => {
    paused = !paused;
    updateToggle();
    syncPlayback();
  });
  motionPreference.addEventListener("change", (event) => {
    paused = event.matches;
    updateToggle();
    syncPlayback();
  });
  intro.addEventListener(
    "pointermove",
    (event) => {
      if (paused || !finePointer.matches) return;
      const bounds = intro.getBoundingClientRect();
      pointer.targetX =
        ((event.clientX - bounds.left) / bounds.width - 0.5) * 13;
      pointer.targetY =
        ((event.clientY - bounds.top) / bounds.height - 0.5) * 9;
    },
    { passive: true },
  );
  intro.addEventListener("pointerleave", () => {
    pointer.targetX = 0;
    pointer.targetY = 0;
  });
  new ResizeObserver(resize).observe(intro);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }).observe(intro);
  document.addEventListener("visibilitychange", syncPlayback);
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", () => {
    resize();
    syncPlayback();
  });
  document.fonts.ready.then(draw);
  resize();
  updateToggle();
  syncPlayback();
})();
