var fortunes = [
  { label: '大吉', cls: 'fortune-daikichi', texts: [
    '今日はすべてが順調に流れる一日。積極的に行動すると吉。思い切って一歩踏み出してみましょう。',
    '待ち望んでいたことが実現しそうな予感。笑顔でいると良い縁が引き寄せられます。',
    '運気は最高潮！新しいことを始めるのに最適な日。チャンスを逃さないで。'
  ]},
  { label: '中吉', cls: 'fortune-chuukichi', texts: [
    '着実に物事が進む日。焦らず丁寧に取り組むことで、良い結果がついてきます。',
    '人との縁が深まりそう。感謝の気持ちを言葉にすると関係が豊かになります。',
    '地道な努力が報われる兆し。今日は基礎を固めることに集中しましょう。'
  ]},
  { label: '小吉', cls: 'fortune-shokichi', texts: [
    '小さな幸せが積み重なる一日。身近なことに目を向けると、見落としていた喜びが見つかります。',
    '焦らなくて大丈夫。ゆっくりと確実に前へ進む日。休息も大切にして。',
    '穏やかな一日になりそう。無理せず、自分のペースで過ごすことが開運の鍵。'
  ]},
  { label: '吉', cls: 'fortune-kichi', texts: [
    '普通の一日に見えても、どこかに小さな幸運が隠れています。アンテナを張っておきましょう。',
    '心が穏やかであれば、周りにも良い影響を与えられる日。笑顔を忘れずに。',
    'ゆとりを持って行動すると物事がスムーズに進みます。余裕が運を呼び込みます。'
  ]},
  { label: '末吉', cls: 'fortune-suekichi', texts: [
    '今は種まきの時期。すぐに結果を求めず、じっくり育てていきましょう。',
    '少し慎重に行動する日。大きな決断は少し後回しにするのが無難かも。',
    '今日は準備と計画に専念するとよい日。未来への投資が実を結びます。'
  ]},
  { label: '凶', cls: 'fortune-kyo', texts: [
    '今日は無理をしない日。焦らず、できることから一歩一歩。明日はきっと好転します。',
    '思い通りにいかないことがあるかも。でも、壁は成長のチャンス。踏ん張りどきです。',
    '気持ちが沈みやすい日かも。でも大丈夫、凶の後には必ず吉が来ます。'
  ]},
  { label: '大凶', cls: 'fortune-daikyo', texts: [
    '今日は守りの日。無謀な挑戦は控え、身の回りを整えることに集中しましょう。明日への準備の日です。',
    '大凶は運気の底。ここからは上がるだけ！今日は休息に充て、英気を養いましょう。',
    '試練の日ですが、これを乗り越えた先に大きな成長が待っています。焦らず、丁寧に。'
  ]}
];

var segments = [
  { fortune: 0, color: '#ffd700' },
  { fortune: 1, color: '#4a90d9' },
  { fortune: 2, color: '#5aaa5a' },
  { fortune: 3, color: '#ff8c00' },
  { fortune: 4, color: '#888' },
  { fortune: 1, color: '#4a90d9' },
  { fortune: 2, color: '#5aaa5a' },
  { fortune: 5, color: '#cc4444' },
  { fortune: 3, color: '#ff8c00' },
  { fortune: 1, color: '#4a90d9' },
  { fortune: 2, color: '#5aaa5a' },
  { fortune: 6, color: '#440000' }
];

var canvas = document.getElementById('wheel');
var ctx = canvas.getContext('2d');
var total = segments.length;
var arc = (2 * Math.PI) / total;
var currentAngle = 0;
var spinning = false;

function drawWheel(angle) {
  ctx.clearRect(0, 0, 280, 280);
  var cx = 140, cy = 140, r = 135;
  for (var i = 0; i < total; i++) {
    var start = angle + i * arc;
    var end = start + arc;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = segments[i].color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Noto Sans JP';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    ctx.fillText(fortunes[segments[i].fortune].label, r - 10, 5);
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
}

function spin() {
  if (spinning) return;
  spinning = true;
  document.getElementById('spinBtn').disabled = true;
  document.getElementById('fortuneBadge').className = 'fortune-badge hidden';
  document.getElementById('fortuneText').className = 'fortune-text hidden';
  var extraSpins = (5 + Math.random() * 5) * 2 * Math.PI;
  var targetAngle = currentAngle + extraSpins;
  var duration = 4000;
  var start = performance.now();
  var startAngle = currentAngle;
  function animate(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    currentAngle = startAngle + (targetAngle - startAngle) * ease;
    drawWheel(currentAngle);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentAngle = targetAngle;
      spinning = false;
      document.getElementById('spinBtn').disabled = false;
      document.getElementById('spinBtn').textContent = 'もう一度引く';
      showResult();
    }
  }
  requestAnimationFrame(animate);
}

function showResult() {
  var normalizedAngle = ((-currentAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  var idx = Math.floor(normalizedAngle / arc) % total;
  var fortune = fortunes[segments[idx].fortune];
  var text = fortune.texts[Math.floor(Math.random() * fortune.texts.length)];
  var badge = document.getElementById('fortuneBadge');
  badge.textContent = fortune.label;
  badge.className = 'fortune-badge ' + fortune.cls;
  var textEl = document.getElementById('fortuneText');
  textEl.textContent = text;
  textEl.className = 'fortune-text';
}

drawWheel(0);