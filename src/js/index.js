import "../css/app.scss";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// THREE.jsを用いた3D表現
window.addEventListener("load", () => {
  const canvasElement = document.querySelector(".top__canvas");
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  // シーンを作成
  const scene = new THREE.Scene();
  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.position.set(0, 0, 1000);
  // カメラコントローラーを作成
  const controls = new OrbitControls(camera, canvasElement);
  // 滑らかにカメラコントローラーを制御
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;
  controls.enableZoom = false;
  controls.enablePan = false;
  // 平行光源を作成
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(-1, -0.5, -0.4);
  scene.add(directionalLight);
  // マテリアルを作成
  const material = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("images/moon.jpg"),
  });
  // 球体の形状を作成
  const geometry = new THREE.SphereGeometry(380, 99, 99);
  // 形状とマテリアルからメッシュを作成
  const moonMesh = new THREE.Mesh(geometry, material);
  // シーンにメッシュを追加します
  scene.add(moonMesh);
  // 星屑を作成 (カメラの動きをわかりやすくするため)
  const createStarField = () => {
    // 頂点情報を格納する配列
    const vertices = [];
    // 配置する範囲
    const SIZE = 4000;
    // 配置する個数
    const LENGTH = 1000;
    for (let i = 0; i < LENGTH; i++) {
      const x = SIZE * (Math.random() - 0.5);
      const y = SIZE * (Math.random() - 0.5);
      const z = SIZE * (Math.random() - 0.5);
      vertices.push(x, y, z);
    }
    // 形状データを作成
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    //テクスチャ準備
    const loader = new THREE.TextureLoader();
    const texture = loader.load("images/particle.png");
    // マテリアルを作成
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 10, //サイズ
      opacity: 0.7, //透過性の数値
      map: texture,
      alphaMap: texture,
      transparent: true,
      // depthTest: false,
      // blending: THREE.AdditiveBlending,
    });
    // 物体を作成
    const particle = new THREE.Points(geometry, material);
    // シーンに追加
    scene.add(particle);
    // 毎フレーム時に実行されるループイベント
    const tick = () => {
      // 地球は常に回転
      moonMesh.rotation.y += 0.001;
      particle.rotation.y += 0.001;
      controls.update();
      // レンダリング
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();
  };
  createStarField();
  // リサイズイベント発生時に実行
  const onResize = () => {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;
    // レンダラーのサイズを調整
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // カメラのアスペクト比を正す
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", onResize);
  onResize();
});

// ローディング画面の消滅
window.addEventListener("load", () => {
  setTimeout(() => {
    const loading = document.querySelector(".loading");
    loading.classList.remove("loading__active");
  }, 2000);
});

setTimeout(() => {
  const active = document.querySelector(".loading");
  active.classList.remove("loading__active");
}, 7500);

// ローディング文字のアニメーション
document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.querySelector(".loading__eclipse");
  const loadingString = loadingText.innerHTML.trim().split("");
  loadingText.innerHTML = loadingString.reduce((acc, curr) => {
    return `${acc}<span class = "loading__char">${curr}</span>`;
  }, "");
});

// ヘッダーの設定 明滅
document.addEventListener("scroll", () => {
  const headerElement = document.querySelector(".header");
  const canvasBottom = document
    .querySelector(".top__canvas")
    .getBoundingClientRect().bottom;
  if (canvasBottom < 70) {
    headerElement.classList.add("header-active");
  } else {
    headerElement.classList.remove("header-active");
  }
});

// スライダー
const sliderList = document.querySelector(".work__list");

const btnPrev = document.querySelector(".work__btn-prev");

const btnNext = document.querySelector(".work__btn-next");

const pager = document.querySelector(".work__pager");

const imageElements = [
  "images/noimage.jpg",
  "images/noimage.jpg",
  "images/noimage.jpg",
  "images/noimage.jpg",
];

imageElements.forEach((image) => {
  const liElement = document.createElement("li");
  liElement.classList.add("work__item");
  const imgElement = document.createElement("img");
  imgElement.classList.add("work__img");
  imgElement.setAttribute("src", image);
  sliderList.appendChild(liElement);
  liElement.appendChild(imgElement);
  const pagerDot = document.createElement("span");
  pagerDot.classList.add("work__pager-dot");
  pager.appendChild(pagerDot);
});

const width = sliderList.clientWidth;

let slideCounter = 0;

btnNext.addEventListener("click", () => {
  if (slideCounter === imageElements.length - 1) {
    slideCounter = 0;
  } else {
    slideCounter++;
  }
  slideImage();
  dotInactive();
  dotActive();
});

btnPrev.addEventListener("click", () => {
  if (slideCounter === 0) {
    slideCounter = imageElements.length - 1;
  } else {
    slideCounter--;
  }
  slideImage();
  dotInactive();
  dotActive();
});

const slideImage = () => {
  sliderList.style.transform = `translateX(${-width * slideCounter}px)`;
};

const dotActive = () => {
  pager.childNodes[slideCounter].classList.add("work__pager-dot-active");
};
dotActive();

const dotInactive = () => {
  pager.childNodes.forEach((dot) => {
    dot.classList.remove("work__pager-dot-active");
  });
};

const pagerDotArray = document.querySelectorAll(".work__pager-dot");
pagerDotArray.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    slideCounter = index;
    slideImage();
    dotInactive();
    dotActive();
  });
});

// ふわっと要素が出現
document.addEventListener("scroll", () => {
  const floatElement = document.querySelectorAll(".js-float");
  floatElement.forEach((element) => {
    const getElementDistance =
      element.getBoundingClientRect().top + element.clientHeight * 0.5;
    if (window.innerHeight > getElementDistance) {
      element.classList.add("js-float-active");
    }
  });
});

// スムーススクロール
const linkElement = document.querySelectorAll('a[href ^= "#"]');
linkElement.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.hash);
    const offsetTop =
      window.pageYOffset + target.getBoundingClientRect().top - 150;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// タイピングタイトル
const options = {
  root: null,
  rootMargin: "0px 0px -300px 0px",
  threshold: 0,
};

const intersectionObserver = new IntersectionObserver(typeWriter, options);

const titleElements = document.querySelectorAll(".js-title");

titleElements.forEach((titleElement) => {
  intersectionObserver.observe(titleElement);
});

function typeWriter(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const string = entry.target.dataset.text.split("");
      string.forEach((char, index) => {
        setTimeout(() => {
          entry.target.textContent += char;
        }, 390 * index);
      });
      observer.unobserve(entry.target);
    }
    // entry.target.classList.remove("js-title");
  });
}

// トップへスクロール
const topPageBtn = document.querySelector(".footer__btn");

document.addEventListener("scroll", () => {
  const canvasBottom = document
    .querySelector(".top__canvas")
    .getBoundingClientRect().bottom;
  if (canvasBottom < 70) {
    topPageBtn.classList.add("footer__btn-active");
  } else {
    topPageBtn.classList.remove("footer__btn-active");
  }
});

topPageBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ハンバーガーメニュー
document
  .querySelector(".header__hamburger")
  .addEventListener("click", function () {
    this.classList.toggle("header__hamburger-active");
    document
      .querySelector(".header__menu")
      .classList.toggle("header__menu-active");
  });
