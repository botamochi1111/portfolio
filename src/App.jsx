import { Routes, Route, Link } from "react-router-dom";
import Background from "./Background";

/**
 * 1. プロジェクト詳細テンプレート
 */
function ProjectLayout({ title, video, role, env, duration, team, description, links }) {
  const isImage = video && /\.(jpg|jpeg|png|gif|webp)$/i.test(video);
  const isVideo = video && /\.(mp4|webm|ogg)$/i.test(video);

  const cleanPath = video ? video.replace(/^\//, "") : "";
  const mediaUrl = `${import.meta.env.BASE_URL}${cleanPath}`;

  return (
    <div className="menu project-detail">
      <div className="title">{title}</div>
      
      {/* メインビジュアル表示エリア */}
      <div className="project-visual">
        {video ? (
          isImage ? (
            <img src={mediaUrl} alt={title} className="project-image" />
          ) : isVideo ? (
            <video 
              src={mediaUrl} 
              className="project-video" 
              controls
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="video-placeholder">【ファイル: {video}】</div>
          )
        ) : (
          <div className="image-placeholder">No Image/Video Available</div>
        )}
      </div>

      {/* スペック表 */}
      <div className="project-spec">
        <table>
          <tbody>
            <tr><th>役職</th><td>{role}</td></tr>
            <tr><th>開発環境</th><td>{env}</td></tr>
            <tr><th>開発期間</th><td>{duration}</td></tr>
            <tr><th>チーム人数</th><td>{team}</td></tr>
          </tbody>
        </table>
      </div>

      {/* 概要・複数リンク */}
      <div className="project-content">
        <h3>Overview</h3>
        <p className="description">{description}</p>
        
        {links && links.length > 0 && (
          <div className="project-links-container">
            {links.map((item, index) => (
              <div key={index} className="project-link">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.label} →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/works" className="menu-item back-link">← Back to Works</Link>
    </div>
  );
}

/**
 * 2. 1つの作品カードを表すコンポーネント
 */
function WorkCard({ title, image, genreTags = [], roleTags = [], envTags = [], date, description, link }) {
  const cleanImagePath = image ? image.replace(/^\//, "") : "";
  const imageUrl = `${import.meta.env.BASE_URL}${cleanImagePath}`;

  return (
    <Link to={link} className="work-card-link">
      <div className="work-card">
        {/* 画像エリア（16:9固定サイズ枠） */}
        <div className="work-card-visual">
          <img src={imageUrl} alt={title} />
        </div>
        
        {/* テキストコンテンツエリア */}
        <div className="work-card-info">
          <h3 className="work-card-title">{title}</h3>
          
          <div className="work-card-meta">
            <span className="work-meta-date">{date}</span>
            <span className="work-meta-desc">{description}</span>
          </div>

          {/* 各タググループ */}
          <div className="work-tags-container">
            {genreTags && genreTags.length > 0 && (
              <div className="tag-group genre">
                {genreTags.map((tag, index) => (
                  <span key={index} className="work-tag tag-genre">{tag}</span>
                ))}
              </div>
            )}

            {roleTags && roleTags.length > 0 && (
              <div className="tag-group role">
                {roleTags.map((tag, index) => (
                  <span key={index} className="work-tag tag-role">{tag}</span>
                ))}
              </div>
            )}

            {envTags && envTags.length > 0 && (
              <div className="tag-group env">
                {envTags.map((tag, index) => (
                  <span key={index} className="work-tag tag-env">{tag}</span>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}

/**
 * 3. ホーム画面
 */
function Home() {
  return (
    <div className="menu">
      <div className="title">星野 大 ポートフォリオ</div>
      <div className="subtitle">Tai Hoshino Portfolio</div>
      
      {/* 簡易プロフィール */}
      <div className="text-frame-box" style={{ marginTop: "30px", marginBottom: "50px", maxWidth: "100%" }}>
        <h3 style={{ margin: "0 0 15px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px", color: "#c084fc" }}>Greeting</h3>
        <p style={{ margin: 0, lineHeight: "1.8", fontSize: "0.95rem" }}>
          星野 大（Tai Hoshino）/ 2004年6月3日生まれ。会津大学にてコンピュータ理工学を専攻。<br />
          Siv3D（C++）やUnity（C#）を用いたPC向けゲームの開発、Studio One 6でのゲームBGM・効果音（SE）の作曲など、精力的にインディーゲームの制作活動を行っています。
        </p>
      </div>
      
      <h2 className="section-title">Featured Works</h2>
      <div className="works-grid home-grid">
        <WorkCard title="PixelPileリメイク" image="pixelpile-remake.png" date="2025年 12月~" description="2025年夏コミで配布したパズルゲーム PixelPile のリメイク版" genreTags={["落ちものパズル"]} roleTags={["チームリーダー", "プログラマー"]} envTags={["C#", "Unity", "Clean Architecture"]} link="/pixelpile-remake" />
        <WorkCard title="サークルPandD(WIP)" image="circlepandd.png" date="2026年 2月~" description="ゲーム開発ゲーム" genreTags={["チーム制作体験"]} roleTags={["コンポーザー"]} envTags={["Studio One", "Unity"]} link="/circlepandd" />
        <WorkCard title="Artificial" image="artificial.png" date="2025年 8月 ~ 12月" description="2025年夏にSiv3Dを用いて制作したシューティングゲーム" genreTags={["シューティング"]} roleTags={["チームリーダー", "プログラマー", "コンポーザー"]} envTags={["C++", "Siv3D", "Studio One"]} link="/artificial" />
        <WorkCard title="会津大学オリエンテーションゲーム" image="orientation2025.png" date="2025年 3月" description="2025年春にUnityを用いて開発したすごろくパーティゲーム" genreTags={["パーティ"]} roleTags={["コンポーザー", "プログラマー"]} envTags={["Studio One", "C#", "Unity", "FMOD"]} link="/orientation2025" />
        </div>

      {/* 下部簡易連絡先 */}
      <div className="text-frame-box" style={{ maxWidth: "100%", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#26a69a" }}>Get In Touch</h3>
        <p style={{ margin: "0 0 15px 0", fontSize: "0.92rem", color: "#cbd5e1" }}>
          お問い合わせ等ございましたら下記メールアドレスよりお気軽にご連絡ください。
        </p>
        <div style={{ fontSize: "1.05rem", fontWeight: "bold", color: "#38bdf8", letterSpacing: "0.5px" }}>
          Email : aizukonnichiha@gmail.com
        </div>
        <Link to="/contact" style={{ display: "inline-block", marginTop: "15px", color: "#aaa", textDecoration: "none", fontSize: "0.85rem", borderBottom: "1px solid #666" }}>
          詳細な連絡先・外部リンク一覧はこちら →
        </Link>
      </div>
    </div>
  );
}

/**
 * 4. About Me 画面
 */
function AboutMe() {
  return (
    <div className="menu text-frame-box">
      <div className="title">About Me</div>
      <div className="subtitle">Profile / Education / Biography / Skills</div>
      
      {/* プロフィール */}
      <div className="about-section">
        <h3>Profile</h3>
        <table className="about-table">
          <tbody>
            <tr>
              <th style={{ width: "120px", fontWeight: "bold", color: "#c084fc", textAlign: "left", padding: "10px 12px" }}>名前</th>
              <td>星野 大（Tai Hoshino）</td>
            </tr>
            <tr>
              <th style={{ fontWeight: "bold", color: "#c084fc", textAlign: "left", padding: "10px 12px" }}>生年月日</th>
              <td>2004年 6月 3日</td>
            </tr>
            <tr>
              <th style={{ fontWeight: "bold", color: "#c084fc", textAlign: "left", padding: "10px 12px" }}>趣味</th>
              <td>ゲーム制作、作曲、楽器演奏(ピアノ、ドラム), 野球観戦、ゲーム、音楽鑑賞</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 学歴 */}
      <div className="about-section">
        <h3>Education</h3>
        <table className="about-table">
          <tbody>
            <tr>
              <td className="about-date">2020年 4月</td>
              <td>新潟県立十日町高校 普通科 入学</td>
            </tr>
            <tr>
              <td className="about-date">2023年 3月</td>
              <td>新潟県立十日町高校 普通科 卒業</td>
            </tr>
            <tr>
              <td className="about-date">2023年 4月 ~ 現在</td>
              <td>会津大学 コンピュータ理工学部 在学</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 活動要約 */}
      <div className="about-section">
        <h3>Biography</h3>
        <p style={{ marginBottom: "15px", color: "#e2e8f0", fontSize: "0.98rem", lineHeight: "1.8" }}>
          大学以前は学業に専念する傍ら、中学時代には卓球部の部長を務めるなど、集団を牽引し組織をまとめる経験を積む。その後高校を経て、情報工学およびゲーム開発の道を志し会津大学へと進学する。
        </p>
        <p style={{ color: "#e2e8f0", fontSize: "0.98rem", lineHeight: "1.8" }}>
          2023年の会津大学入学後は、同学のゲーム制作サークル「企画開発部」に所属。プログラマーおよびコンポーザーとして多角的な開発プロジェクトに従事する。3年時にはサークルのサウンド幹部に就任し新入生への勉強会を開催するなどした。個人・チーム開発を問わず、主にSiv3D（C++）やUnity（C#）を用いたPC向けインディーゲームの制作をはじめ、大学の課外プロジェクトにおけるゲームの開発に参加するなど、精力的に活動を行っている。
        </p>
      </div>

      {/* スキルセクション */}
      <div className="about-section">
        <h3>Skills</h3>
        
        {/* 言語カテゴリー */}
        <div className="skill-group-container">
          <h4 className="skill-sub-title">Programming Languages</h4>
          <div className="about-skill-list">
            <div className="about-skill-row">
              <span className="about-oval-badge lang-main main-size">C#</span>
              <span className="about-skill-desc">Unityでのゲーム制作にて使用</span>
              <span className="about-skill-duration">2年</span>
            </div>
            <div className="about-skill-row">
              <span className="about-oval-badge lang-main main-size">C++</span>
              <span className="about-skill-desc">主にSiv3Dを用いた2Dゲーム制作に使用</span>
              <span className="about-skill-duration">2年</span>
            </div>
          </div>
          
          <div className="about-skill-others-title">Others...</div>
          <div className="about-skill-badges-flex">
            <span className="about-oval-badge lang-sub">C Language : 3年</span>
            <span className="about-oval-badge lang-sub">GML (GameMaker) : 4ヶ月</span>
            <span className="about-oval-badge lang-sub">Java : 5ヶ月</span>
            <span className="about-oval-badge lang-sub">JavaScript : 3ヶ月</span>
          </div>
        </div>

        {/* ツールカテゴリー */}
        <div className="skill-group-container">
          <h4 className="skill-sub-title">Software & Tools</h4>
          <div className="about-skill-list">
            <div className="about-skill-row">
              <span className="about-oval-badge tool-main main-size">Unity</span>
              <span className="about-skill-desc">メインで使用しているゲーム開発エンジン</span>
              <span className="about-skill-duration">2年</span>
            </div>
            <div className="about-skill-row">
              <span className="about-oval-badge tool-main main-size">Siv3D</span>
              <span className="about-skill-desc">ゲーム制作向けC++フレームワーク</span>
              <span className="about-skill-duration">2年</span>
            </div>
            <div className="about-skill-row">
              <span className="about-oval-badge tool-main main-size">Studio One 6</span>
              <span className="about-skill-desc">ゲームBGM・効果音（SE）の作曲</span>
              <span className="about-skill-duration">2年</span>
            </div>
            <div className="about-skill-row">
              <span className="about-oval-badge tool-main main-size">Rider</span>
              <span className="about-skill-desc">メインIDE。主にUnityプロジェクトの制作活動にて使用</span>
              <span className="about-skill-duration">1年</span>
            </div>
            <div className="about-skill-row">
              <span className="about-oval-badge tool-main main-size">Git / GitHub</span>
              <span className="about-skill-desc">Gitを用いたリポジトリ管理、チーム開発でのブランチ・リベース運用</span>
              <span className="about-skill-duration">3年</span>
            </div>
          </div>

          <div className="about-skill-others-title">Others...</div>
          <div className="about-skill-badges-flex">
            <span className="about-oval-badge tool-sub">FMOD Studio : 2ヶ月</span>
            <span className="about-oval-badge tool-sub">GameMaker : 4ヶ月</span>
            <span className="about-oval-badge tool-sub">MatLab : 1年</span>
            <span className="about-oval-badge tool-sub">Visual Studio : 2年</span>
            <span className="about-oval-badge tool-sub">Visual Studio Code : 2年</span>
            <span className="about-oval-badge tool-sub">PureData : 2ヶ月</span>
            <span className="about-oval-badge tool-sub">CakeWalk : 6ヶ月</span>
            <span className="about-oval-badge tool-sub">FireAlpaca : 1年</span>
          </div>
        </div>

      </div>
    </div>
  );
}

/**
 * 5. Works 一覧画面
 */
function Works() {
  return (
    <div className="menu">
      <div className="title">Works</div>
      
      <div className="works-grid">
        <WorkCard title="PixelPileリメイク" image="pixelpile-remake.png" date="2025年 12月~" description="2025年夏コミで配布したパズルゲーム PixelPile のリメイク版" genreTags={["落ちものパズル"]} roleTags={["チームリーダー", "プログラマー"]} envTags={["C#", "Unity", "Clean Architecture"]} link="/pixelpile-remake" />
        <WorkCard title="サークルPandD(WIP)" image="circlepandd.png" date="2026年 2月~" description="ゲーム開発ゲーム" genreTags={["チーム制作体験"]} roleTags={["コンポーザー"]} envTags={["Studio One", "Unity"]} link="/circlepandd" />
        <WorkCard title="ナリアRPG-Reborn(WIP)" image="nariarpg.jpg" date="2026年 2月~" description="過去に構想していたRPGゲームの新Project" genreTags={["RPG"]} roleTags={["チームリーダー", "プログラマー", "コンポーザー"]} envTags={["GameMaker", "Studio One"]} link="/nariarpg-reborn" />
        <WorkCard title="パズルナイツ リメイク(WIP)" image="puzzlenights-remake.png" date="2025年 12月~" description="2025年春に制作されたゲーム パズルナイツ のリメイク" genreTags={["タワーディフェンス"]} roleTags={["グラフィッカ―"]} envTags={["FireAlpaca", "Unity"]} link="/puzzlenights-remake" />
        <WorkCard title="Artificial" image="artificial.png" date="2025年 8月 ~ 12月" description="2025年夏にSiv3Dを用いて制作したシューティングゲーム" genreTags={["シューティング"]} roleTags={["チームリーダー", "プログラマー", "コンポーザー"]} envTags={["C++", "Siv3D", "Studio One"]} link="/artificial" />
        <WorkCard title="動物RPG(WIP)" image="animalrpg.png" date="2025年 6月~" description="2025年6月に製作開始したRPGゲーム" genreTags={["RPG", "アドベンチャー"]} roleTags={["プログラマー", "コンポーザー"]} envTags={["C#", "Unity", "FMOD", "Studio One"]} link="/animalrpg" />
        <WorkCard title="Pixel Pile" image="pixelpile.png" date="2025年 2月 ~ 8月" description="2025年春にSiv3Dを用いて制作したパズルゲーム" genreTags={["落ちものパズル"]} roleTags={["チームリーダー", "プログラマー", "コンポーザー"]} envTags={["C++", "Siv3D", "Studio One"]} link="/pixelpile" />
        <WorkCard title="会津大学オリエンテーションゲーム" image="orientation2025.png" date="2025年 3月" description="2025年春にUnityを用いて開発したすごろくパーティゲーム" genreTags={["パーティ"]} roleTags={["コンポーザー", "プログラマー"]} envTags={["Studio One", "C#", "Unity", "FMOD"]} link="/orientation2025" />
        <WorkCard title="会津大学案内ゲーム.xz" image="kapuro-out-kapuro.png" date="2024年 8月 ~ 9月" description="課外講義の延長講座にて制作したワンボタンゲーム" genreTags={["ワンボタンゲーム"]} roleTags={["プログラマー"]} envTags={["C#", "Unity"]} link="/kapuro-guide" />
        <WorkCard title="劇場版ぱんドドドード・ドードド デストロイ of アイヅゆにばーしてぃ the ファイナル" image="minge2024summer.png" date="2024年 8月 ~ 10月" description="2025年春にSiv3Dを用いて制作した育成・アクションゲーム" genreTags={["育成", "アクション"]} roleTags={["プログラマー", "コンポーザー"]} envTags={["C++", "Siv3D", "Studio One"]} link="/pandodo-destroy" />
        <WorkCard title="くらづくり" image="kapuro2024.png" date="2024年 4月 ~ 7月" description="会津大学の2024年前期の課外講義にて制作したゲーム" genreTags={["蔵作成ゲーム"]} roleTags={["プログラマー"]} envTags={["C#", "Unity"]} link="/kurazukuri" />
        <WorkCard title="マップtar.xz" image="map-tar-xz.png" date="2024年 2月 ~ 4月" description="2024年春に制作したローグライクゲーム" genreTags={["ローグライク"]} roleTags={["コンポーザー"]} envTags={["CakeWalk", "Siv3D"]} link="/map-tar-xz" />
        <WorkCard title="帰奇廻怪" image="kikikaikai.jpg" date="2023年 8月 ~ 12月" description="2023年夏に制作したローグライクゲーム" genreTags={["ローグライク"]} roleTags={["コンポーザー"]} envTags={["CakeWalk", "Siv3D"]} link="/kikikaikai" />
      </div>
    </div>
  );
}

/**
 * 6. Contact 画面
 */
function Contact() {
  return (
    <div className="menu text-frame-box" style={{ maxWidth: "750px" }}>
      <div className="title">Contact</div>
      <div className="subtitle">Connect with Developer</div>
      
      <p style={{ marginBottom: "25px", color: "#cbd5e1", fontSize: "0.95rem" }}>
        お問い合わせ等ございましたら下記メールアドレスよりお気軽にご連絡ください。
      </p>

      <div className="about-section">
        <h3 style={{ color: "#c084fc", marginBottom: "20px" }}>Contact Information</h3>
        <table className="about-table">
          <tbody>
            <tr>
              <th style={{ width: "150px", fontWeight: "bold", color: "#38bdf8", textAlign: "left", padding: "12px" }}>Email</th>
              <td style={{ fontWeight: "bold", color: "#fff" }}>aizukonnichiha@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="about-section" style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#26a69a", marginBottom: "15px" }}>Developer Links</h3>
        <div className="project-links-container" style={{ gap: "14px" }}>
          <div className="project-link">
            <a href="https://github.com/PandD-Aizu" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              GitHub (サークル) →
            </a>
          </div>
          <div className="project-link">
            <a href="https://github.com/botamochi1111" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
              GitHub (個人) →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 7. Other 画面（💥末尾へ移動）
 */
function Other() {
  return (
    <div className="menu text-frame-box">
      <div className="title">Other</div>
      <div className="subtitle">Update Logs & General Info</div>
      
      {/* 更新履歴セクション */}
      <div className="about-section">
        <h3 style={{ color: "#38bdf8" }}>Update Logs</h3>
        <table className="about-table">
          <tbody>
            <tr>
              <td className="about-date">2026.05.26</td>
              <td>初期バージョン完成</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * メインエントリコンポーネント（ルーティング・グローバルナビ）
 */
function App() {
  return (
    <>
      <Background />
      {/* 💥ナビゲーションバー内リンク順序を、Contact -> Other に変更いたしました */}
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/works" className="nav-link">Works</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/other" className="nav-link">Other</Link>
      </nav>

      {/* 💥Routes内の定義順序も揃えて最下部にOtherを配置しております */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/other" element={<Other />} />
        
        {/* 詳細ルーティング群 */}
        <Route path="/pixelpile-remake" element={<ProjectLayout title="Pixel Pile リメイク" video="pixelpile-remake.mp4" role="チームリーダー / プログラマー" env="Unity / C# / FMOD" duration="2025年 12月~" team="5人" description="Currently in Development" links={[{ label: "GitHubリンク", url: "https://github.com/PandD-Aizu/PixelPile_UnityRemake" }, { label: "ストアページ", url: "https://store.steampowered.com/app/4496270/Pixel_Pile/" }, { url: "https://koto-thing.github.io/pixelpile_homepage/", label: "公式ページ" }]} />} />
        <Route path="/circlepandd" element={<ProjectLayout title="サークルPandD(WIP)" video="circlepandd.png" role="コンポーザー" env="Studio One / Unity" duration="2026年 2月~" team="5人" description="Currently in Development" />} />
        <Route path="/nariarpg-reborn" element={<ProjectLayout title="ナリアRPG-Reborn(WIP)" video="nariarpg.jpg" role="チームリーダー / プログラマー / コンポーザー" env="GameMaker / Studio One" duration="2026年 2月~" team="3人" description="Currently in Development" />} />
        <Route path="/puzzlenights-remake" element={<ProjectLayout title="パズルナイツ リメイク(WIP)" video="puzzlenights-remake.png" role="グラフィッカ―" env="FireAlpaca / Unity" duration="2025年 12月~" team="4人" description="Currently in Development" />} />
        <Route path="/artificial" element={<ProjectLayout title="Artificial" video="artificial.mp4" role="チームリーダー / プログラマー / コンポーザー" env="C++ / Siv3D / Studio One" duration="2025年 8月 ~ 12月" team="7人" description="Completed Project" />} />
        <Route path="/animalrpg" element={<ProjectLayout title="動物RPG(WIP)" video="animalrpg.png" role="プログラマー / コンポーザー" env="C# / Unity / FMOD / Studio One" duration="2025年 6月~" team="9人" description="Currently in Development" />} />
        <Route path="/pixelpile" element={<ProjectLayout title="Pixel Pile" video="pixelpile.png" role="チームリーダー / プログラマー / コンポーザー" env="C++ / Siv3D / Studio One" duration="2025年 2月 ~ 8月" team="7人" description="Completed Project" />} />
        <Route path="/orientation2025" element={<ProjectLayout title="会津大学オリエンテーションゲーム" video="orientation2025.png" role="コンポーザー / プログラマー" env="Studio One / C# / Unity / FMOD" duration="2025年 3月" team="10人" description="Completed Project" />} />
        <Route path="/kapuro-guide" element={<ProjectLayout title="会津大学案内ゲーム.xz" video="kapuro-out-kapuro.png" role="プログラマー" env="C# / Unity" duration="2024年 8月 ~ 9月" team="1人" description="Completed Project" />} />
        <Route path="/pandodo-destroy" element={<ProjectLayout title="劇場版ぱんドドドード・ドードド デストロイ of アイヅゆにばーしてぃ the ファイナル" video="minge2024summer.png" role="プログラマー / コンポーザー" env="C++ / Siv3D / Studio One" duration="2024年 8月 ~ 10月" team="6人" description="Completed Project" />} />
        <Route path="/kurazukuri" element={<ProjectLayout title="くらづくり" video="kapuro2024.png" role="プログラマー" env="C# / Unity" duration="2024年 4月 ~ 7月" team="4人" description="Completed Project" />} />
        <Route path="/map-tar-xz" element={<ProjectLayout title="マップtar.xz" video="map-tar-xz.png" role="コンポーザー" env="CakeWalk / Siv3D" duration="2024年 2月 ~ 4月" team="4人" description="Completed Project" />} />
        <Route path="/kikikaikai" element={<ProjectLayout title="帰奇廻怪" video="kikikaikai.jpg" role="コンポーザー" env="CakeWalk / Siv3D" duration="2023年 8月 ~ 12月" team="6人" description="Completed Project" />} />
      </Routes>
    </>
  );
}

export default App;