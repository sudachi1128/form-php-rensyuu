<?php
session_start();
// 変数を定義
$error = ['name' => '', 'email' => '', 'content' => ''];
$post = ['name' => '', 'email' => '', 'content' => ''];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $post = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
  // フォーム送信時のエラーチェック
  if ($post['name'] === '') {
    $error['name'] = 'blank';
  } else {
    $error['name'] = 'ok';
  }
  if ($post['email'] === '') {
    $error['email'] = 'blank';
  } elseif (!filter_var($post['email'], FILTER_VALIDATE_EMAIL)) {
    $error['email'] = 'email';
  } else {
    $error['email'] = 'ok';
  }
  if ($post['content'] === '') {
    $error['content'] = 'blank';
  } else {
    $error['content'] = 'ok';
  }
  if ($error['name'] === 'ok' && $error['email'] === 'ok' && $error['content'] === 'ok') {
    $_SESSION['form'] = $post;
    header('Location: confirm.php');
    exit();
  }
} else {
  if (isset($_SESSION['form'])) {
    $post = $_SESSION['form'];
  }
}
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio | Sutou Daichi</title>
  <meta name="description" content="Sutou Daichiのポートフォリオサイトです。" />
  <link rel="icon" href="images/neptuneblack.png" />
  <script src="https://kit.fontawesome.com/443f34d4d4.js" crossorigin="anonymous"></script>
  <link href="main.css" rel="stylesheet">
</head>

<body>
  <div class="loading loading__active">
    <div class="loading__eclipse">Loading</div>
  </div>
  <header class="header">
    <h1 class="header__logo">
      <img class="header__icon" src="images/neptune.png" alt="サイトロゴ" />
      Suto Website
    </h1>
    <nav class="header__nav pc-only">
      <ul class="header__list">
        <li class="header__item">
          <a class="header__link" href="#about" data-text="自己紹介"><span>About</span></a>
        </li>
        <li class="header__item">
          <a class="header__link" href="#skill" data-text="できること"><span>Skills</span></a>
        </li>
        <li class="header__item">
          <a class="header__link" href="#work" data-text="実績紹介"><span>Works</span></a>
        </li>
        <li class="header__item">
          <a class="header__link" href="#contact" data-text="お問い合わせ"><span>Contact</span></a>
        </li>
      </ul>
    </nav>
    <div class="header__hamburger-memu mobile-only">
      <div class="header__hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li class="header__menu-item"><a href="#about">About</a></li>
          <li class="header__menu-item"><a href="#skill">Skills</a></li>
          <li class="header__menu-item"><a href="#work">Works</a></li>
          <li class="header__menu-item"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <section class="top">
    <canvas class="top__canvas"></canvas>
    <h1 class="top__title" data-text="Welcome to my portfolio">
      Welcome to my portfolio
    </h1>
    <div class="top__scroll"><span>Scroll</span></div>
  </section>
  <main class="container">
    <section class="about" id="about">
      <h2 class="about__title js-title" data-text="About me"></h2>
      <div class="about__wrapper">
        <h3 class="about__img js-float">
          <img src="images/gulp.png" alt="自画像" />
        </h3>
        <dl class="about__text js-float">
          <div class="about__item">
            <dt class="about__name">須藤 太一</dt>
            <dd class="about__name-description">Sutou Daichi</dd>
          </div>
          <div class="about__item">
            <dt class="about__term">生年月日</dt>
            <dd class="about__description">1993年11月28日</dd>
          </div>
          <div class="about__item">
            <dt class="about__term">出身地</dt>
            <dd class="about__description">群馬県安中市</dd>
          </div>
          <div class="about__item">
            <dt class="about__term">最終学歴</dt>
            <dd class="about__description">
              金沢工業大学 バイオ/化学部 応用化学科
            </dd>
          </div>
          <div class="about__item">
            <dt class="about__term">趣味</dt>
            <dd class="about__description">
              キャンプ/音楽/漫画/筋トレ(最近)
            </dd>
          </div>
          <div class="about__item">
            <dt class="about__term">座右の銘</dt>
            <dd class="about__description">思い立ったが吉日</dd>
          </div>
        </dl>
      </div>
    </section>
    <section class="skill" id="skill">
      <h2 class="skill__title js-title" data-text="Skills"></h2>
      <div class="skill__wrapper">
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/HTML.png" alt="HTML" />
            </div>
            <h3 class="skill__name">HTML</h3>
            <div class="skill__text">
              Emmetを用いてできる限りスピーディーなコーディングを心がけています。また「Markup
              Validation
              Service」を用いてW3Cの仕様に基づいたコードを書くように心掛けています。
            </div>
          </div>
        </div>
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/css.png" alt="CSS" />
            </div>
            <h3 class="skill__name">CSS</h3>
            <div class="skill__text">
              変数、mixin、関数を用いたコーディングが可能です。また管理がしやすいディレクトリ構造にも心掛けています。BEMの考え方をベースにしてコーディングを行なっています。
            </div>
          </div>
        </div>
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/javascript.png" alt="javascript" />
            </div>
            <h3 class="skill__name">JavaScript</h3>
            <div class="skill__text">
              簡単なアニメーション、inputタグを利用した絞り込み検索やスライダーなどのUIであれば生のJavascriptで作成できます。またAPIを使った非同期処理(Async/await)の実装も可能です。
            </div>
          </div>
        </div>
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/git.png" alt="git" />
            </div>
            <h3 class="skill__name">git</h3>
            <div class="skill__text">
              Git、Githubを用いたバージョン管理が可能です。現在、複数人での使用を円滑にするため勉強中です。
            </div>
          </div>
        </div>
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/webpack.png" alt="webpack" />
            </div>
            <h3 class="skill__name">webpack</h3>
            <div class="skill__text">
              webpackの環境設定については完全には理解できていないです。WEB制作において必要最低限なローダーやライブラリのインストール/設定を行い利用しています。
            </div>
          </div>
        </div>
        <div class="skill__box js-float">
          <div class="skill__items">
            <div class="skill__circle">
              <img class="skill__img" src="images/wordpress.png" alt="wordpress" />
            </div>
            <h3 class="skill__name">Wordpress</h3>
            <div class="skill__text">
              ここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入ります。ここにはテキストが入ります。
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="work" id="work">
      <h2 class="work__title js-title" data-text="Works"></h2>
      <div class="work__container js-float">
        <div class="work__wrapper">
          <button class="work__btn-prev fas fa-chevron-circle-left"></button>
          <div class="work__slider">
            <ul class="work__list"></ul>
          </div>
          <button class="work__btn-next fas fa-chevron-circle-right"></button>
        </div>
        <div class="work__pager"></div>
      </div>
    </section>
    <section class="contact" id="contact">
      <h2 class="contact__title js-title" data-text="Contact"></h2>
      <form class="contact__wrapper" action="index.php" method="post">
        <div class="contact__item js-float">
          <label class="contact__label" for="name">お名前</label>
          <?php if ($error['name'] === 'blank') : ?>
            <p>お名前をご記入ください</p>
          <?php endif; ?>
          <input class="contact__input" type="text" name="name" id="name" value="<?php echo htmlspecialchars($post['name']) ?>" />
        </div>
        <div class="contact__item js-float">
          <label class="contact__label" for="email">メールアドレス</label>
          <?php if ($error['email'] === 'blank') : ?>
            <p>メールアドレスをご記入ください</p>
          <?php endif; ?>
          <?php if ($error['email'] === 'email') : ?>
            <p>メールアドレスを正しくご記入ください</p>
          <?php endif; ?>
          <input class="contact__input" type="email" name="email" id="email" value="<?php echo htmlspecialchars($post['email']) ?>" />
        </div>
        <div class="contact__item js-float">
          <label class="contact__label" for="type">お問い合わせ内容</label>
          <?php if ($error['content'] === 'blank') : ?>
            <p>お問い合わせ内容をご記入ください</p>
          <?php endif; ?>
          <textarea class="contact__text" name="content" id="content" cols="30" rows="10"><?php echo htmlspecialchars($post['content']) ?></textarea>
        </div>
        <div class="contact__item js-float">
          <button class="contact__btn">
            <input type="submit" value="送信" />
          </button>
        </div>
      </form>
    </section>
  </main>
  <footer class="footer">
    <h1 class="footer__logo">
      <img class="footer__icon" src="images/neptune.png" alt="サイトロゴ" />Suto
      Website
    </h1>
    <p class="footer__reserve">© 2021 All Suto Portfolio Rights Reserved.</p>
    <button class="footer__btn" id="footer__btn">
      <img class="footer__btn-img" src="images/rocket.png" alt="ロケットの画像" />
    </button>
  </footer>
  <script defer src="main.js"></script>
</body>

</html>