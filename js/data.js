/**
 * KOTOBA LAB - 現代デジタル用語・テクノロジー図鑑 データセット
 * カテゴリ: AI・機械学習, モダンWeb・クラウド, UI/UXデザイン, 次世代テクノロジー
 */

const INITIAL_GLOSSARY_DATA = [
  {
    id: "rag",
    title: "RAG（検索拡張生成）",
    furigana: "けんさくかくちょうせいせい",
    enTitle: "Retrieval-Augmented Generation",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "中級",
    tags: ["トレンド", "実践的", "LLM活用"],
    views: 4820,
    isPopular: true,
    summary: "外部データベースや社内文書から関連情報を検索し、その文脈をLLMに渡して回答を生成させる技術。",
    definition: "RAG（Retrieval-Augmented Generation）は、大規模言語モデル（LLM）が持つ静的な知識の限界を克服するためのフレームワークです。事前学習済みのモデル自体を再学習（ファインチューニング）することなく、最新の情報や社内プライベートデータ、専門文書をリアルタイムに検索エンジン（ベクトルDB等）から引き出し、プロンプトのコンテキストとして結合して正確な回答を生成させます。",
    practicalUse: "【社内ナレッジボット・カスタマーサポート】\n最新の製品マニュアル、PDF規程、NotionやSlackの過去ログをベクトル化して格納。ユーザーからの問い合わせに対して該当ページを自動引用しながら、ハルシネーション（嘘の回答）のない正確な回答と出典リンクを提示します。",
    advantages: [
      "事前学習後に発生した最新情報や非公開データを即座に反映可能",
      "莫大なコストと時間がかかるモデル再学習が不要",
      "回答の根拠となる出典（ドキュメント名やページ番号）を明示できるため信頼性が高い"
    ],
    challenges: [
      "ドキュメントの分割（チャンキング）や検索アルゴリズムの設計難易度が高い",
      "検索処理が挟まるため、純粋なLLM応答よりもレスポンス遅延（レイテンシ）が増える"
    ],
    codeSnippet: `// RAGアーキテクチャの基本概念フロー
1. 質問入力 (Query)
2. ベクトル化 (Embedding) -> ベクトルDB検索 (Top-K documents)
3. プロンプト合成: "以下の参考資料に基づいて回答せよ:\\n" + docs + query
4. LLM推論 -> 出典付き回答の生成`,
    relatedIds: ["vector-db", "hallucination", "prompt-engineering", "ai-agent"]
  },
  {
    id: "ai-agent",
    title: "AIエージェント",
    furigana: "えーあいえーじぇんと",
    enTitle: "Autonomous AI Agent",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "上級",
    tags: ["トレンド", "自律型システム", "注目"],
    views: 5240,
    isPopular: true,
    summary: "目標を与えられると、自らタスクを細分化・計画し、外部ツールを使って実行・内省を繰り返す自律システム。",
    definition: "従来のチャットボットが「質問に対する単発の回答」を行うのに対し、AIエージェントは「目標達成に向けた自律的な意思決定」を行います。知覚（Perception）、計画（Planning）、記憶（Memory）、ツール実行（Tool Use / Function Calling）を組み合わせ、試行錯誤しながら複数ステップの複雑な作業を完遂します。",
    practicalUse: "【自律型リサーチ＆コーディング】\n「競合他社5社の最新価格とAPI機能を調査し、比較表のマークダウンとサンプル実装コードを作成せよ」という1つの指示から、ブラウザでWeb検索、スクレイピング、コード生成、ローカル実行テスト、エラー自己修正まで自動でやり遂げます。",
    advantages: [
      "人間の介在を最小限に抑え、多段階の複雑なワークフローを自動化",
      "実行結果がエラーになった場合でも、自己反省（Reflection）して代替手段を自ら考案",
      "API連携によりSlack、GitHub、カレンダーなど様々な実世界ツールを操作可能"
    ],
    challenges: [
      "無限ループや意図しないツール実行（過剰課金や誤削除）を防ぐガードレールの設計が必要",
      "長期的なコンテキスト維持におけるメモリ管理とコストの増大"
    ],
    codeSnippet: `// エージェントの思考ループ (ReActパターン)
Thought: 目的達成のために必要な最初のステップを推論
Action: WebSearch("2026 AI Agent trends")
Observation: 検索結果を受信
Thought: 追加でコードを検証する必要がある
Action: RunCodeTest()
... (目標達成までループ)`,
    relatedIds: ["rag", "prompt-engineering", "multimodal-ai"]
  },
  {
    id: "hallucination",
    title: "ハルシネーション（幻覚）",
    furigana: "はるしねーしょん",
    enTitle: "Hallucination in LLMs",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "初級",
    tags: ["重要基礎", "品質管理", "必修"],
    views: 3910,
    isPopular: false,
    summary: "AIが事実に基づかない情報や完全に架空の内容を、あたかも真実であるかのように流暢に出力してしまう現象。",
    definition: "言語モデルは「文脈において統計的に最も確率の高い単語」を順次予測して文章を紡いでいるため、真偽の概念を本質的には理解していません。その結果、存在しない学術論文、架空の人物経歴、誤った法令条文などを極めて自然で説得力のある日本語で捏造してしまう問題が生じます。",
    practicalUse: "【法務・医療・学術での品質リスク】\n社内の規約チェックAIが、実在しない過去の判例や架空のガイドラインを引用してしまうリスク。これを防ぐためにRAG（検索拡張生成）によるグラウンディング（根拠付け）や温度（Temperature）パラメータの低減、検証レイヤーが導入されます。",
    advantages: [
      "創造的な物語やファンタジー小説の執筆、アイデアブレインストーミングにおいては好都合な特性"
    ],
    challenges: [
      "企業での実務導入における最大の障壁",
      "一見すると論理的で文章が整っているため、人間がファクトチェックしないと見抜けない"
    ],
    codeSnippet: `// 抑制のための代表的対策
1. System Promptで "不明な点は「分かりません」と回答せよ" と厳命
2. Temperature を 0.0〜0.2 に設定して決定論的出力を促進
3. RAGを導入し、提示したコンテキスト外の回答を禁止する`,
    relatedIds: ["rag", "prompt-engineering", "vector-db"]
  },
  {
    id: "prompt-engineering",
    title: "プロンプトエンジニアリング",
    furigana: "ぷろんぷとえんじにありんぐ",
    enTitle: "Prompt Engineering",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "初級",
    tags: ["実践的", "必修", "生産性向上"],
    views: 4310,
    isPopular: true,
    summary: "LLMから最高精度の回答や意図通りの構造化データを引き出すための、指示文の体系的な設計技術。",
    definition: "単に自然言語で話しかけるだけでなく、役割の付与（ロールプレイ）、具体的な制約条件、思考プロセスの指定（Few-Shot例示、Chain-of-Thought / 思考の連鎖）、JSONスキーマなどの出力形式定義を組み合わせてモデルの推論能力を最大限に引き出す手法です。",
    practicalUse: "【構造化データ抽出】\n非構造化の面談メモやメール本文から、氏名・商談確度・次回アクション・予定日を正確に抽出してJSON形式で返すプロンプトを組み、CRMへ自動同期します。",
    advantages: [
      "モデルの追加学習やインフラ変更なしに、即座に出力精度と信頼性を劇的に改善可能",
      "エンジニア以外のビジネス職でも習得しやすく、業務の自動化に直結する"
    ],
    challenges: [
      "モデルのバージョンアップによって効き目や挙動が変化する脆弱性（プロンプトの壊れやすさ）",
      "プロンプトインジェクション攻撃へのセキュリティ対策が必要"
    ],
    codeSnippet: `## 指示:
あなたはシニアWebセキュリティ診断士です。
以下のコードの脆弱性を特定し、必ず以下のJSON形式のみで出力してください:
{
  "vulnerability": string,
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "fixSuggestion": string
}`,
    relatedIds: ["ai-agent", "rag", "hallucination"]
  },
  {
    id: "lora",
    title: "LoRA（低ランク適応）",
    furigana: "ろーら / ていらんくてきおう",
    enTitle: "Low-Rank Adaptation",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "上級",
    tags: ["機械学習", "最適化", "省リソース"],
    views: 2950,
    isPopular: false,
    summary: "巨大モデルの元の重みを固定し、小さな追加行列のみを学習させることで超低コストに特化モデルを作る手法。",
    definition: "パラメータ数が数十億〜数百億に及ぶLLMや画像生成モデルを全結合層ごとフルファインチューニングするには莫大なGPUメモリと計算費が必要です。LoRAは、重みの更新差分が「本質的に低い固有ランクを持つ」という性質に着目し、低ランクの分解行列のみを追加学習させることで、メモリ使用量を数分の一に激減させます。",
    practicalUse: "【特定画風の画像生成・業界特化LLM】\n自社ブランドキャラクターのイラスト画風や、医療・法律分野の独特な専門用語に特化したアダプタを、通常の民生用GPUや短時間のクラウド環境で効率よく作成・切り替え配備できます。",
    advantages: [
      "学習に必要なGPUメモリを大幅削減（民生用GPUでも実行可能）",
      "元モデルの重みとLoRA差分ウェイト（数十MB〜数百MB程度）を分離して配布・差し替え可能",
      "推論時に元の重みと行列合成できるため、推論遅延がゼロ"
    ],
    challenges: [
      "フルファインチューニングと比較して、極端に異なるドメイン知識の獲得には限界がある",
      "最適なランク（r）や学習率ハイパーパラメータの選定ノウハウが必要"
    ],
    codeSnippet: `// 原理の数式イメージ
W_new = W_base + (B * A) * (alpha / r)
// W_base (固定): d x k
// B: d x r, A: r x k  (r ≪ min(d, k))`,
    relatedIds: ["multimodal-ai", "rag"]
  },
  {
    id: "multimodal-ai",
    title: "マルチモーダルAI",
    furigana: "まるちもーだるえーあい",
    enTitle: "Multimodal AI",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "中級",
    tags: ["トレンド", "注目", "次世代基盤"],
    views: 4590,
    isPopular: true,
    summary: "テキストだけでなく、画像・音声・動画・センサーデータなどを統合的に理解し相互変換できるAI技術。",
    definition: "従来のテキスト専門モデルや画像分類モデルの垣根を越え、共有の潜在空間（Embedding Space）を用いて複数の異なる感覚・メディア（モダリティ）を同時に処理します。Google GeminiやGPT-4oなどのフロンティアモデルが代表例です。",
    practicalUse: "【リアルタイム動画解説・図面診断】\nスマートフォンのカメラで撮影した機械の配管や手書きの回路図を見せながら、音声で「この接続部の異音の原因は？」と尋ねると、リアルタイムに映像と音声を解析して修正指示を音声で返します。",
    advantages: [
      "人間の認知に近い形で、視覚・聴覚・言語をシームレスに結合した直感的な対話が可能",
      "UIスクリーンショットからのHTML/CSS自動コード生成や、医療画像診断の自動所見生成など広範な応用"
    ],
    challenges: [
      "長尺動画や高解像度画像のトークン消費量と計算コストの急増",
      "視覚的な細部の見落としや、動画内の時間軸推論における精度のばらつき"
    ],
    codeSnippet: `// マルチモーダルAPIリクエストのイメージ
const response = await ai.models.generateContent({
  model: 'gemini-1.5-pro',
  contents: [
    { text: "この手書きワイヤーフレームをモダンなHTML/CSSコードに変換して" },
    { inlineData: { mimeType: "image/png", data: base64Image } }
  ]
});`,
    relatedIds: ["ai-agent", "lora", "spatial-computing"]
  },
  {
    id: "vector-db",
    title: "ベクターデータベース（ベクトルDB）",
    furigana: "べくたーでーたべーす",
    enTitle: "Vector Database",
    category: "ai",
    categoryName: "AI・機械学習",
    level: "中級",
    tags: ["インフラ", "実践的", "RAG必須"],
    views: 3780,
    isPopular: false,
    summary: "文章や画像を多次元の意味ベクトルとして保存し、意味的な近さ（類似度）を超高速に検索できるDB。",
    definition: "従来のSQLデータベースがキーワードの完全一致や部分一致で検索するのに対し、ベクトルDBは文章の意味内容を数百〜数千次元の浮動小数点数値配列（Embedding）として格納し、コサイン類似度や近似最近傍探索（HNSWアルゴリズム等）を用いて「意味が近いデータ」をミリ秒単位で検索します。",
    practicalUse: "【セマンティック検索とレコメンデーション】\n「夏に涼しいカジュアルな服」と検索した際に、タイトルにその単語が含まれていなくても「接触冷感 リネンシャツ」や「吸汗速乾 半袖Tシャツ」を意味的に探知して推薦します。",
    advantages: [
      "表記ゆれ（「PC」「パソコン」「コンピューター」）や多言語間の意味の一致を自動吸収",
      "数千万件の大規模ベクトルデータに対してもインデックスにより超高速な近似探索が可能"
    ],
    challenges: [
      "型番や商品コードなどの厳密な文字列完全一致検索は苦手なため、ハイブリッド検索が必要",
      "高次元インデックスのメモリ（RAM）消費量が大きく運用コストが高め"
    ],
    codeSnippet: `// ベクトル類似度計算 (コサイン類似度)
cos(theta) = (A・B) / (||A|| * ||B||)
// 類似度が 1.0 に近いほど意味が同一、0.0 に近いほど無関係`,
    relatedIds: ["rag", "hallucination"]
  },
  {
    id: "edge-computing",
    title: "エッジコンピューティング",
    furigana: "えっじこんぴゅーてぃんぐ",
    enTitle: "Edge Computing",
    category: "web",
    categoryName: "モダンWeb・クラウド",
    level: "中級",
    tags: ["インフラ", "高速化", "クラウド"],
    views: 3120,
    isPopular: false,
    summary: "中央の大規模データセンターではなく、ユーザーの最も近くに位置するCDNエッジ拠点で処理を行う技術。",
    definition: "世界中に分散された数百箇所のPoP（Point of Presence）や基地局・IoTゲートウェイで軽量なJavaScript/Wasmランタイムを動かすアーキテクチャです。Cloudflare Workers、Fastly Compute、Vercel Edge Functionsなどが代表例です。",
    practicalUse: "【グローバル超低遅延パーソナライズ & A/Bテスト】\nユーザーのアクセス元の国やデバイスに応じて、エッジ上で数ミリ秒以内にHTMLを動的書き換えしたり、認証トークンを検証して不正トラフィックを即座にブロックします。",
    advantages: [
      "物理的な距離による往復遅延（RTT）を劇的に短縮（数十msから数msへ）",
      "オリジンサーバーへのトラフィック集中を防ぎ、耐障害性とスケーラビリティを向上",
      "データが国外に出ることを防ぐデータ主権・GDPRコンプライアンスにも有利"
    ],
    challenges: [
      "実行時間の制限（数ミリ秒〜数十秒）やメモリ制限などの制約がある",
      "分散データベースとの一貫性担保（結果整合性）の設計が複雑"
    ],
    codeSnippet: `// Cloudflare Workers の基本構造
export default {
  async fetch(request, env, ctx) {
    const country = request.cf.country;
    return new Response(\`日本を含む世界中の最寄りエッジから配信中: \${country}\`);
  }
};`,
    relatedIds: ["wasm", "zero-trust", "islands-arch"]
  },
  {
    id: "wasm",
    title: "WebAssembly（Wasm）",
    furigana: "うぇぶあせんばり / わずむ",
    enTitle: "WebAssembly (Wasm)",
    category: "web",
    categoryName: "モダンWeb・クラウド",
    level: "上級",
    tags: ["高速化", "標準規格", "Web進化"],
    views: 3420,
    isPopular: false,
    summary: "ブラウザ上でC/C++、Rust、Goなどのコードをネイティブに近い驚異的な速度で動かせるバイナリ形式規格。",
    definition: "JavaScriptの弱点である重い数値計算やリアルタイム画像・動画処理、ゲームエンジンなどをブラウザ上で高速実行するためにW3Cによって策定されたオープン規格です。スタックベースの仮想マシン上でサンドボックス化されて安全に動作します。",
    practicalUse: "【FigmaやPhotoshop Web版、ブラウザ内動画編集】\nFigmaの超高速グラフィックス描画エンジン（C++）や、ブラウザ上だけで動画のトランスコードを行うFFmpeg.wasm、クライアントサイドで動くSQLite (SQL.js) などで使われています。",
    advantages: [
      "ネイティブバイナリに近い実行速度（JavaScriptの数倍〜十数倍）",
      "既存のC++/Rust等の莫大なライブラリ資産をブラウザに移植可能",
      "サンドボックス化されたメモリ空間による強固なセキュリティ"
    ],
    challenges: [
      "DOMの直接操作にはJavaScriptとのブリッジが必要でオーバーヘッドがある",
      "デバッグ難易度が高く、バイナリサイズが大きくなりがち"
    ],
    codeSnippet: `// RustからWasmをビルドしてJSで呼び出す
#[wasm_bindgen]
pub fn calculate_fractal(width: u32, height: u32) -> Vec<u8> {
    // 激重のマンデルブロ集合計算をネイティブ速度で処理
}`,
    relatedIds: ["edge-computing", "islands-arch"]
  },
  {
    id: "islands-arch",
    title: "アイランドアーキテクチャ",
    furigana: "あいらんどあーきてくちゃ",
    enTitle: "Islands Architecture",
    category: "web",
    categoryName: "モダンWeb・クラウド",
    level: "中級",
    tags: ["フロントエンド", "パフォーマンス", "軽量化"],
    views: 2840,
    isPopular: false,
    summary: "静的なHTMLの海に、インタラクティブが必要な部分だけ「島（アイランド）」としてJSを読み込む設計。",
    definition: "従来のSPA（シングルページアプリケーション）がページ全体を一括してハイドレーション（JavaScriptによる活性化）するのに対し、静的なコンテンツ部分は純粋な軽量HTMLとして即時表示し、動的な検索窓やカルーセルなどのコンポーネントだけを独立して遅延ハイドレーションする手法です（Astroなどが先駆者）。",
    practicalUse: "【メディアサイト・ECカタログのCWV高速化】\n記事本文や画像リストはJavaScriptゼロで爆速表示させ、記事下部の「いいねボタン」や「コメント欄」だけを独立したReact/Vueコンポーネントとして動かします。",
    advantages: [
      "JavaScriptバンドルサイズを劇的に削減（First Load JSを80%以上削減可能）",
      "Core Web VitalsのINP（Interaction to Next Paint）とLCPを最大化",
      "1つのページ内でReact、Svelte、Vueなどの異なるフレームワークを混在可能"
    ],
    challenges: [
      "ページ全体で複雑なグローバルステート（共通カートや動画プレイヤーの連続再生）を共有する際の設計工夫が必要"
    ],
    codeSnippet: `<!-- Astroでのアイランド記述例 -->
<header><Header /></header> <!-- 静的HTML (0kb JS) -->
<article><PostContent /></article> <!-- 静的HTML -->

<!-- クライアントで見えた時だけJSを読み込む "島" -->
<InteractiveCommentSection client:visible />`,
    relatedIds: ["view-transitions", "edge-computing"]
  },
  {
    id: "view-transitions",
    title: "View Transitions API",
    furigana: "びゅーとらんじしょんえーぴーあい",
    enTitle: "View Transitions API",
    category: "web",
    categoryName: "モダンWeb・クラウド",
    level: "中級",
    tags: ["アニメーション", "モダンUI", "標準規格"],
    views: 3180,
    isPopular: true,
    summary: "DOMの更新やページ遷移の前後をブラウザが自動撮影し、滑らかなモーフィングやクロスフェードを行うWeb標準API。",
    definition: "これまでは複雑なCSSアニメーションライブラリやFLIPテクニックを駆使して行っていた「一覧カードから詳細画面への要素拡大」や「タブ切り替え時の滑らかなアニメーション」を、ブラウザ標準のシンプルなAPI呼び出しでネイティブアプリ並みの質感で実現します。",
    practicalUse: "【SPA・MPAでのアプリ風ページ遷移】\nサムネイル画像をクリックした際、次の詳細ページでメイン画像としてスッと滑らかに拡大しながら移動する没入感の高い画面遷移を実現します。",
    advantages: [
      "JavaScript側は状態変更関数を1行渡すだけで、アニメーション合成はブラウザのGPUコンポジタが処理",
      "SPAだけでなく、通常のマルチページサイト（MPA）でもスムーズな画面遷移が可能",
      "ユーザーの「視線の連続性」を保ち、UXの心地よさを格段に高める"
    ],
    challenges: [
      "Safariや古いブラウザ向けのプログレッシブエンハンスメント（フォールバック）の考慮が必要",
      "要素のview-transition-nameの重複に注意が必要"
    ],
    codeSnippet: `// SPAでのView Transitionの基本呼び出し
if (document.startViewTransition) {
  document.startViewTransition(() => {
    // DOMを同期的に更新 (例: 次の画面を描画)
    updateDOM();
  });
} else {
  updateDOM();
}`,
    relatedIds: ["micro-interactions", "glassmorphism", "islands-arch"]
  },
  {
    id: "zero-trust",
    title: "ゼロトラストアーキテクチャ",
    furigana: "ぜろとらすとあーきてくちゃ",
    enTitle: "Zero Trust Architecture",
    category: "web",
    categoryName: "モダンWeb・クラウド",
    level: "上級",
    tags: ["セキュリティ", "必須", "インフラ"],
    views: 3510,
    isPopular: false,
    summary: "「社内ネットワークだから安全」という境界防御を捨て、すべてのアクセスを「常に検証・暗号化」するセキュリティ思想。",
    definition: "「Never Trust, Always Verify（決して信頼せず、常に検証せよ）」を原則とし、ユーザーの認証、デバイスの健全性、アクセスのコンテキスト（位置・時間・異常行動）をリクエストごとに動的に検証します。クラウドとリモートワークが一般化した現代の不可欠な基盤です。",
    practicalUse: "【テレワーク環境での社内システム保護】\nVPN（仮想専用線）を廃止し、IdP（OktaやGoogle Workspace等）とデバイス証明書を用いたコンテキスト認識アクセスにより、安全な端末からのみ特定のクラウドSaaSへアクセスを許可します。",
    advantages: [
      "万が一社内LANに侵入されても、ラテラルムーブメント（横方向の不正アクセス拡大）を防止",
      "場所を選ばずセキュアに働けるため、リモートワークやBYOD（私物端末利用）に最適"
    ],
    challenges: [
      "全社的なID基盤の刷新と運用ポリシーの策定に時間とコストがかかる",
      "多要素認証（MFA）の頻度が高すぎると従業員の利便性（UX）を損ねる恐れがある"
    ],
    codeSnippet: `// ゼロトラストの3大原則 (NIST SP 800-207)
1. 明示的な検証 (Verify explicitly)
2. 最小権限アクセスの付与 (Use least privilege)
3. 侵害の想定 (Assume breach)`,
    relatedIds: ["edge-computing"]
  },
  {
    id: "glassmorphism",
    title: "グラスモフィズム",
    furigana: "ぐらすもふぃずむ",
    enTitle: "Glassmorphism",
    category: "design",
    categoryName: "UI/UXデザイン",
    level: "初級",
    tags: ["デザイン", "トレンド", "UI表現"],
    views: 4680,
    isPopular: true,
    summary: "すりガラスのような半透明の背景ぼかしと繊細な光の輪郭を重ね、多層的な奥行きと未来感を演出するデザイン。",
    definition: "CSSの `backdrop-filter: blur()` や半透明の背景色、境界線（`border: 1px solid rgba(255,255,255,0.15)`）、微細なボックスシャドウを組み合わせて、曇りガラス越しに背景が透けて見えるような質感を生み出す現代的なビジュアルスタイルです。macOS Big SurやWindows 11、iOSで広く採用されています。",
    practicalUse: "【モーダルウィンドウ・ナビゲーションバー・HUD】\n背景のコンテンツを完全に隠さずに、浮かび上がるダイアログやヘッダーを配置することで、ユーザーに現在位置を見失わせずに洗練されたプレミアムな印象を与えます。",
    advantages: [
      "画面のレイヤー構造（階層関係）が視覚的に直感的に伝わる",
      "ダークモードや鮮やかなグラデーション背景と組み合わせると極めて高い美観（WOW効果）を生む"
    ],
    challenges: [
      "コントラスト比が不足すると文字が読みにくくなりアクセシビリティ（WCAG）違反になるリスク",
      "低スペックスマホではブラウザのGPUぼかし描画コストによるスクロールの引っかかりに注意"
    ],
    codeSnippet: `.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
    relatedIds: ["micro-interactions", "spatial-computing", "design-system"]
  },
  {
    id: "micro-interactions",
    title: "マイクロインタラクション",
    furigana: "まいくろいんたらくしょん",
    enTitle: "Micro-interactions",
    category: "design",
    categoryName: "UI/UXデザイン",
    level: "初級",
    tags: ["UI演出", "実践的", "UX向上"],
    views: 4120,
    isPopular: false,
    summary: "ボタンのホバー、スイッチの切替、完了時の跳ねるアニメなど、ユーザー操作に対する微細で心地よい動的フィードバック。",
    definition: "トリガー（操作）、ルール（何が起きるか）、フィードバック（どう視覚化されるか）、ループ・モード（その後の状態）の4要素で構成される微小なUI体験です。機能性だけでなく、プロダクトに「手触り感」と「愛着」を生み出します。",
    practicalUse: "【Twitterのいいねハート・パスワード強度バー】\nお気に入りアイコンを押した時にポンと弾けるパーティクル演出や、引っ張って更新（Pull to Refresh）のバウンスアニメーション、フォーム送信完了のチェックマーク変化など。",
    advantages: [
      "システムの現在の状態（処理中、成功、エラー）をユーザーが言語を介さず感覚的に理解できる",
      "操作の気持ちよさ（Delight）を高め、ユーザーのエンゲージメントと継続利用率を向上"
    ],
    challenges: [
      "過剰で派手すぎる演出は逆にユーザーを苛立たせ、タスク完了を遅らせる",
      "`prefers-reduced-motion`（視覚過敏・前庭覚障がい者向けのアニメーション軽減）への配慮が不可欠"
    ],
    codeSnippet: `@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
    relatedIds: ["glassmorphism", "view-transitions", "accessibility-a11y"]
  },
  {
    id: "design-system",
    title: "デザインシステム",
    furigana: "でざいんしすてむ",
    enTitle: "Design System",
    category: "design",
    categoryName: "UI/UXデザイン",
    level: "中級",
    tags: ["設計思想", "開発効率化", "組織連携"],
    views: 4950,
    isPopular: true,
    summary: "デザイン原則、デザイントークン（色・余白）、再利用可能なコンポーネントコードを一元化したUIの設計基準基盤。",
    definition: "単なる「スタイルガイド」や「FigmaのUIキット」にとどまらず、デザイナーとエンジニアが共通の言語（Single Source of Truth）でUIを構築・保守するための包括的な仕組みです。デジタル庁デザインシステムやShopify Polarisなどが有名です。",
    practicalUse: "【マルチプラットフォームでの品質統一】\nWeb、iOS、Androidにまたがる大規模サービスにおいて、ボタンやフォーム、配色をデザイントークン経由で一元管理し、開発速度を倍増させながらブランドの統一感を維持します。",
    advantages: [
      "車輪の再発明（似たようなボタンを何度も作る無駄）を撲滅し、実装速度を劇的に高速化",
      "アクセシビリティ基準（WCAG）をコンポーネント単位で担保できるため品質が底上げされる"
    ],
    challenges: [
      "立ち上げと継続的なガバナンス・メンテナンスに専任チームのリソースが必要",
      "厳格にしすぎると個別の機能要件に対する柔軟性が損なわれるジレンマ"
    ],
    codeSnippet: `:root {
  /* デザイントークン (Design Tokens) */
  --color-primary-500: #6366f1;
  --spacing-base: 0.25rem;
  --radius-card: 1rem;
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}`,
    relatedIds: ["accessibility-a11y", "dark-patterns", "micro-interactions"]
  },
  {
    id: "dark-patterns",
    title: "ダークパターン（デセプティブデザイン）",
    furigana: "だーくぱたーん",
    enTitle: "Dark Patterns / Deceptive Design",
    category: "design",
    categoryName: "UI/UXデザイン",
    level: "初級",
    tags: ["UX倫理", "法規制", "重要知識"],
    views: 3660,
    isPopular: false,
    summary: "ユーザーを意図的に欺き、望まない購入や契約更新、個人情報提供へと誘導する不誠実なUI/UX手法。",
    definition: "ユーザーの認知バイアス（惰性や焦燥感、見落とし）を悪用し、事業者の利益のためにユーザーの自律的意思決定を歪めるデザインです。欧米（EU DSAや米FTC）を中心に法規制が急速に進んでおり、ブランド価値の失墜につながります。",
    practicalUse: "【典型例と規制対象】\n「定期購入の解約ボタンが何階層も奥深くに隠されている（ローチモーテル）」「タイマーで偽の残り時間をカウントダウンする（偽りの緊急性）」「チェックボックスが初期状態でオンになっている（プレチェック）」など。",
    advantages: [
      "短期的なKPI（一時的なコンバージョン率）は微増することがあるが、長期的には害悪のみ"
    ],
    challenges: [
      "短期売上を求めるビジネス部門との倫理的な意見衝突",
      "ユーザーの解約率や信頼度の低下、法的ペナルティのリスク"
    ],
    codeSnippet: `// 避けるべきダークパターン例 vs 誠実なデザイン
× 解約リンクを灰色文字でフッター最下部に紛れ込ませる
◯ アカウント設定から1クリックで明確に解約手順を完了できる`,
    relatedIds: ["design-system", "accessibility-a11y"]
  },
  {
    id: "accessibility-a11y",
    title: "Webアクセシビリティ（a11y）",
    furigana: "うぇぶあくせしびりてぃ",
    enTitle: "Web Accessibility (a11y)",
    category: "design",
    categoryName: "UI/UXデザイン",
    level: "初級",
    tags: ["必須基準", "WCAG", "法令遵守"],
    views: 4050,
    isPopular: true,
    summary: "高齢者や障がい者を含むあらゆる人々が、あらゆる環境でWeb上の情報やサービスを快適に利用できるようにすること。",
    definition: "「a11y（エイティーン）」とも略され、スクリーンリーダーでの適切な読み上げ（セマンティックHTML、適切なARIA）、キーボードのみでの全操作、十分な色コントラスト比（4.5:1以上）、適切なフォーカスリングの可視化などを指します。日本でも改正障害者差別解消法により民間事業者の合理的配慮が義務化されました。",
    practicalUse: "【誰でも使える公共・商用サービス】\n視覚障がい者が音声読み上げソフトでECサイトの買い物を完結できることや、マウスが使えない環境でキーボードのTabキーのみでフォームを迷わず送信できること。",
    advantages: [
      "利用可能な潜在ユーザー層が拡大し、SEO（検索エンジン最適化）の評価も直結して向上",
      "法令リスクの回避と企業の社会的責任（CSR/ESG）の確立"
    ],
    challenges: [
      "開発初期から考慮しないと、後からの改修工数が膨大になる",
      "視覚的な見た目の美しさとフォーカスインジケーターの視認性の両立"
    ],
    codeSnippet: `<!-- アクセシブルなボタン実装例 -->
<button 
  type="button" 
  aria-expanded="false" 
  aria-controls="menu-dropdown" 
  id="menu-btn"
>
  メニューを開く
</button>`,
    relatedIds: ["design-system", "micro-interactions", "dark-patterns"]
  },
  {
    id: "spatial-computing",
    title: "空間コンピューティング",
    furigana: "くうかんこんぴゅーてぃんぐ",
    enTitle: "Spatial Computing",
    category: "trend",
    categoryName: "次世代トレンド",
    level: "上級",
    tags: ["トレンド", "次世代UI", "XR"],
    views: 4210,
    isPopular: true,
    summary: "ディスプレイの枠組みを脱し、現実の3次元物理空間の中にデジタル情報やUIを自然に配置・操作する新パラダイム。",
    definition: "Apple Vision ProやMeta Questなどに代表される技術で、ユーザーの目線追跡（アイトラッキング）、手指のジェスチャー、空間オーディオ、LiDARセンサーによる環境マッピングを融合させ、目の前の空間全体を無限のデスクトップとして活用します。",
    practicalUse: "【医療手術シミュレーション & 建築設計】\n医師が患者の3D臓器モデルを空中に投影して患部を立体検証したり、建築家が施工前の現場空間に実物大の配管や家具の3Dホログラムを配置して設計整合性を確認します。",
    advantages: [
      "物理的なモニタサイズに縛られない無限の作業領域と驚異的な没入感",
      "目線とピンチ操作による直感的で魔法のようなインタラクション"
    ],
    challenges: [
      "デバイスの重量・バッテリー駆動時間（2〜3時間）と価格の高さ",
      "VR酔い・眼精疲労の低減や、空間用アプリのエコシステム成熟が必要"
    ],
    codeSnippet: `// 空間UIのインタラクション基本
1. Eye Tracking: ユーザーが注視した要素に自動フォーカス (Hover)
2. Tap Gesture: 人差し指と親指をつまむ (Pinch) ことで Click 判定
3. Depth Layering: Z軸の距離感で情報の重要度を表現`,
    relatedIds: ["glassmorphism", "multimodal-ai"]
  },
  {
    id: "quantum-computing",
    title: "量子コンピューティング",
    furigana: "りょうしこんぴゅーてぃんぐ",
    enTitle: "Quantum Computing",
    category: "trend",
    categoryName: "次世代トレンド",
    level: "上級",
    tags: ["最先端科学", "暗号", "最適化"],
    views: 3340,
    isPopular: false,
    summary: "量子力学の「重ね合わせ」と「もつれ」を利用し、従来のコンピュータでは何万年もかかる特定計算を短時間で解く技術。",
    definition: "従来のビット（0または1）に対し、0と1の両方の状態を同時に保持できる量子ビット（qubit）を用います。創薬における分子シミュレーション、金融ポートフォリオ最適化、配送ルートの組合せ最適化、暗号解読など、指数関数的な計算量を要する分野で革命をもたらすと期待されています。",
    practicalUse: "【新薬開発・新バッテリー素材探索】\n数千億通りの化学結合パターンをシミュレーションし、効率的な触媒や高密度リチウム硫黄電池の分子構造を、実験室での試作を待たずに超高速で特定します。",
    advantages: [
      "組合せ爆発を起こす特定問題に対する圧倒的な計算力（量子超越性）",
      "エネルギー効率：従来の超巨大スパコンと同等の特定計算を低消費電力で実現する可能性"
    ],
    challenges: [
      "極低温（絶対零度近く）の維持が必要なハードウェアの過酷な制約",
      "ノイズによる量子誤り（エラー）の訂正技術（FTQC）の実用化にまだ歳月を要する点"
    ],
    codeSnippet: `// 量子重ね合わせ (アダマールゲート H の作用)
|0> ---[ H ]---> (|0> + |1>) / sqrt(2)
// 観測するまで0と1の両方の可能性を同時に探索`,
    relatedIds: ["zero-trust"]
  },
  {
    id: "digital-twin",
    title: "デジタルツイン",
    furigana: "でじたるついん",
    enTitle: "Digital Twin",
    category: "trend",
    categoryName: "次世代トレンド",
    level: "中級",
    tags: ["IoT", "スマートシティ", "製造DX"],
    views: 3100,
    isPopular: false,
    summary: "現実世界の工場、都市、人体などのリアルタイムデータをセンサーで収集し、仮想空間上に双子のように忠実再現する技術。",
    definition: "IoTセンサーやカメラからの膨大なストリーミングデータ、3D CADモデル、物理シミュレーションを組み合わせ、現在の状態の可視化だけでなく、「今後どのような故障が起きるか」「信号制御を変えたら渋滞はどう解消するか」といった未来予測と予防保全を可能にします。",
    practicalUse: "【スマートファクトリーと都市計画】\n自動車工場の組み立てライン全体の摩耗度を監視し、ライン停止前に部品交換を自動発注したり、国土交通省の「PLATEAU（プラトー）」のように日本全国の3D都市モデルを構築して水害シミュレーションに役立てます。",
    advantages: [
      "現実世界では危険・高コストすぎて行えない破壊実験や極限テストを仮想空間で何度でも試行可能",
      "設備故障によるダウンタイムの最小化と運用効率の最大化"
    ],
    challenges: [
      "無数のIoTセンサーの設置・メンテナンスと超大量データの通信・ストレージコスト",
      "シミュレーションモデルの精度が実世界と乖離すると誤った判断につながるリスク"
    ],
    codeSnippet: `// デジタルツインのデータパイプライン
物理設備 (IoT Sensors / 振動・温度)
  ↓ MQTT / WebSocket (ミリ秒同期)
クラウド基盤 (時系列DB + 3Dモデル + 物理エンジン)
  ↓ AI故障予知アルゴリズム
制御指示のフィードバック (アクチュエータへ自動介入)`,
    relatedIds: ["spatial-computing", "green-tech", "edge-computing"]
  },
  {
    id: "green-tech",
    title: "グリーントランスフォーメーション（GX / Green Tech）",
    furigana: "ぐりーんとらんすふぉーめーしょん",
    enTitle: "Green Transformation & Clean Tech",
    category: "trend",
    categoryName: "次世代トレンド",
    level: "初級",
    tags: ["ESG", "サステナビリティ", "脱炭素"],
    views: 2980,
    isPopular: false,
    summary: "デジタル技術を活用してCO2排出量の可視化・削減を進め、環境保護と経済成長の好循環を目指す取り組み。",
    definition: "AIによるデータセンターの電力消費最適化、サプライチェーン全体のScope 1〜3温室効果ガス（GHG）排出量の自動算定クラウド、Webサイトのデジタルカーボンフットプリント削減（Green Web）など、IT業界自身が持続可能性を牽引する総合的シフトです。",
    practicalUse: "【データセンターのAI省エネ冷却】\nGoogleのデータセンターでは、DeepMindの強化学習AIが気象条件やサーバー負荷を予測して冷却システムを自律制御し、冷却エネルギーを40%削減しています。",
    advantages: [
      "グローバルなESG投資の呼び込みと企業ブランド価値の向上",
      "エネルギー効率化による光熱費・クラウドインフラ費用の直接的コスト削減"
    ],
    challenges: [
      "生成AIの爆発的普及に伴うデータセンターの消費電力・水消費の急増という矛盾の解決",
      "サプライチェーン全体の正確な排出量データ収集の難しさ"
    ],
    codeSnippet: `// Webサイトのエコ設計 (Green Web原則)
1. ページのデータ転送量を最小化 (アイランドアーキテクチャ, 次世代画像AVIF/WebP)
2. クライアント側の不要なJSループを廃止してバッテリー消耗を低減
3. ダークモード対応によりOLED画面の消費電力を抑制`,
    relatedIds: ["islands-arch", "edge-computing", "digital-twin"]
  }
];

// カテゴリメタデータ
const CATEGORIES = [
  { id: "all", name: "すべて", icon: "❖" },
  { id: "ai", name: "AI・機械学習", icon: "🧠" },
  { id: "web", name: "モダンWeb・クラウド", icon: "⚡" },
  { id: "design", name: "UI/UXデザイン", icon: "🎨" },
  { id: "trend", name: "次世代トレンド", icon: "🚀" }
];
